import React, { useState, useEffect } from "react"
import { useOrder } from "../context/OrderContext"
import { Dialog, DialogContent, DialogTitle, Button, Input, Badge, Select, Alert } from "@mui/material"
import { AlertCircle } from "lucide-react" // Ensure this is the correct library or path for AlertCircle
import { Label } from "recharts"
// Ensure this path is correct or update it to the actual location of the alert component.

type CartItem = {
    id: number
    name: string
    price: number
    quantity: number
}

type BillSplit = {
    items: Array<{ itemId: number; quantity: number }>
    paymentMethod: "debit" | "credit" | "cash"
    total: number
}

type AssignedQuantities = Record<number, number> // itemId -> cantidad asignada total

export default function BillSplitModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const { cart, total: cartTotal } = useOrder()
    const [splits, setSplits] = useState<BillSplit[]>([{ items: [], paymentMethod: "cash", total: 0 }])
    const [numberOfSplits, setNumberOfSplits] = useState(1)
    const [assignedQuantities, setAssignedQuantities] = useState<AssignedQuantities>({})
    const [tipPercentage, setTipPercentage] = useState(10)
    const [isPaying, setIsPaying] = useState(false)
    const [paymentComplete, setPaymentComplete] = useState(false)

    // Calcular el total con propina
    const tipAmount = (cartTotal * tipPercentage) / 100
    const totalWithTip = cartTotal + tipAmount

    // Calcular el total asignado
    const assignedTotal = splits.reduce((sum, split) => sum + split.total, 0)
    const isFullyAssigned = Math.abs(assignedTotal - cartTotal) < 0.01 // Usar una pequeña tolerancia para evitar problemas de punto flotante

    // Inicializar el estado de cantidades asignadas
    useEffect(() => {
        if (isOpen) {
            // Reiniciar estados
            setSplits([{ items: [], paymentMethod: "cash", total: 0 }])
            setNumberOfSplits(1)

            // Inicializar cantidades asignadas a 0 para cada ítem
            const initialAssignedQuantities: AssignedQuantities = {}
            cart.forEach((item) => {
                initialAssignedQuantities[item.id] = 0
            })
            setAssignedQuantities(initialAssignedQuantities)

            setIsPaying(false)
            setPaymentComplete(false)
        }
    }, [isOpen, cart])

    const handleNumberOfSplitsChange = (value: number) => {
        const newNumber = Math.max(1, Math.min(10, value)) // Limitar entre 1 y 10
        setNumberOfSplits(newNumber)

        // Ajustar el array de splits
        if (newNumber > splits.length) {
            // Añadir nuevos splits
            setSplits([
                ...splits,
                ...Array(newNumber - splits.length)
                    .fill(0)
                    .map(() => ({ items: [], paymentMethod: "cash" as const, total: 0 })),
            ])
        } else if (newNumber < splits.length) {
            // Remover splits y reasignar sus items
            const newSplits = splits.slice(0, newNumber)
            const newAssignedQuantities = { ...assignedQuantities }

            // Restar las cantidades de los splits eliminados
            for (let i = newNumber; i < splits.length; i++) {
                splits[i].items.forEach(({ itemId, quantity }) => {
                    newAssignedQuantities[itemId] -= quantity
                })
            }

            setSplits(newSplits)
            setAssignedQuantities(newAssignedQuantities)
        }
    }

    const getItemQuantityForSplit = (splitIndex: number, itemId: number): number => {
        const split = splits[splitIndex]
        const itemInSplit = split.items.find((item) => item.itemId === itemId)
        return itemInSplit ? itemInSplit.quantity : 0
    }

    const getRemainingQuantity = (itemId: number): number => {
        const item = cart.find((item) => item.id === itemId)
        if (!item) return 0
        return item.quantity - (assignedQuantities[itemId] || 0)
    }

    const handleQuantityChange = (splitIndex: number, itemId: number, newQuantity: number) => {
        const item = cart.find((item) => item.id === itemId)
        if (!item) return

        const currentQuantityInSplit = getItemQuantityForSplit(splitIndex, itemId)
        const maxAvailable = getRemainingQuantity(itemId) + currentQuantityInSplit

        // Asegurar que la nueva cantidad esté entre 0 y el máximo disponible
        newQuantity = Math.max(0, Math.min(newQuantity, maxAvailable))

        const newSplits = [...splits]
        const newAssignedQuantities = { ...assignedQuantities }

        // Actualizar la cantidad asignada total
        newAssignedQuantities[itemId] = (assignedQuantities[itemId] || 0) - currentQuantityInSplit + newQuantity

        // Actualizar el split
        const splitItems = [...newSplits[splitIndex].items]
        const itemIndex = splitItems.findIndex((item) => item.itemId === itemId)

        if (newQuantity === 0 && itemIndex !== -1) {
            // Eliminar el ítem si la cantidad es 0
            splitItems.splice(itemIndex, 1)
        } else if (newQuantity > 0) {
            if (itemIndex !== -1) {
                // Actualizar cantidad si el ítem ya existe
                splitItems[itemIndex].quantity = newQuantity
            } else {
                // Añadir el ítem si no existe
                splitItems.push({ itemId, quantity: newQuantity })
            }
        }

        newSplits[splitIndex].items = splitItems

        // Recalcular el total para este split
        newSplits[splitIndex].total = splitItems.reduce((sum, { itemId, quantity }) => {
            const item = cart.find((item) => item.id === itemId)
            return sum + (item ? item.price * quantity : 0)
        }, 0)

        setSplits(newSplits)
        setAssignedQuantities(newAssignedQuantities)
    }

    const handlePaymentMethodChange = (splitIndex: number, method: "debit" | "credit" | "cash") => {
        const newSplits = [...splits]
        newSplits[splitIndex].paymentMethod = method
        setSplits(newSplits)
    }

    const handleSplitBill = () => {
        setIsPaying(true)
        // Simular procesamiento de pago
        setTimeout(() => {
            setPaymentComplete(true)
        }, 2000)
    }

    return (
        <Dialog open={isOpen} onClose={() => !isPaying && onClose()}>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                <div>
                    <DialogTitle>Dividir la cuenta</DialogTitle>
                </div>

                {paymentComplete ? (
                    <div className="py-8 text-center">
                        <h3 className="text-xl font-bold text-green-600 mb-4">¡Pago completado con éxito!</h3>
                        <p className="mb-6">Gracias por su visita. ¡Esperamos verle pronto!</p>
                        <Button onClick={onClose}>Cerrar</Button>
                    </div>
                ) : (
                    <div className="grid gap-4 py-4">
                        {!isPaying && (
                            <>
                                <div className="flex items-center gap-4">
                                    <div className="flex-1">
                                        <Label htmlFor="splits">Número de comensales</Label>
                                        <Input
                                            id="splits"
                                            type="number"
                                            value={numberOfSplits}
                                            onChange={(e) => handleNumberOfSplitsChange(Number.parseInt(e.target.value))}
                                            min={1}
                                            max={10}
                                            disabled={isPaying}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <Label htmlFor="tip">Propina (%)</Label>
                                        <Input
                                            id="tip"
                                            type="number"
                                            value={tipPercentage}
                                            onChange={(e) => setTipPercentage(Number.parseInt(e.target.value))}
                                            min={0}
                                            disabled={isPaying}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {splits.map((split, splitIndex) => (
                                        <div key={splitIndex} className="border p-4 rounded-md">
                                            <div className="flex justify-between items-center mb-2">
                                                <h3 className="font-bold">Comensal {splitIndex + 1}</h3>
                                                <Badge variant="outline">${split.total.toFixed(2)}</Badge>
                                            </div>

                                            <Select
                                                onValueChange={(value) =>
                                                    handlePaymentMethodChange(splitIndex, value as "debit" | "credit" | "cash")
                                                }
                                                defaultValue={split.paymentMethod}
                                                disabled={isPaying}
                                            >
                                                <SelectTrigger className="mb-2">
                                                    <SelectValue placeholder="Método de pago" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="debit">Débito</SelectItem>
                                                    <SelectItem value="credit">Crédito</SelectItem>
                                                    <SelectItem value="cash">Efectivo</SelectItem>
                                                </SelectContent>
                                            </Select>

                                            <div className="mt-2 space-y-3 max-h-40 overflow-y-auto">
                                                {cart.map((item) => {
                                                    const quantityInSplit = getItemQuantityForSplit(splitIndex, item.id)
                                                    const remainingQuantity = getRemainingQuantity(item.id)
                                                    const isAvailable = remainingQuantity > 0 || quantityInSplit > 0

                                                    return (
                                                        <div
                                                            key={item.id}
                                                            className={`p-2 rounded ${isAvailable ? "bg-gray-50" : "bg-gray-100 opacity-60"}`}
                                                        >
                                                            <div className="flex justify-between items-center mb-1">
                                                                <span className="font-medium">{item.name}</span>
                                                                <span className="text-sm">${item.price.toFixed(2)} c/u</span>
                                                            </div>

                                                            <div className="flex items-center justify-between">
                                                                <div className="text-sm text-gray-500">
                                                                    {isAvailable ? (
                                                                        <>
                                                                            Disponible: {remainingQuantity + quantityInSplit} de {item.quantity}
                                                                        </>
                                                                    ) : (
                                                                        <>Asignado completamente</>
                                                                    )}
                                                                </div>

                                                                <div className="flex items-center">
                                                                    <Button
                                                                        variant="outline"
                                                                        size="icon"
                                                                        className="h-7 w-7"
                                                                        onClick={() => handleQuantityChange(splitIndex, item.id, quantityInSplit - 1)}
                                                                        disabled={quantityInSplit === 0 || isPaying}
                                                                    >
                                                                        <Minus className="h-3 w-3" />
                                                                    </Button>
                                                                    <span className="mx-2 w-6 text-center">{quantityInSplit}</span>
                                                                    <Button
                                                                        variant="outline"
                                                                        size="icon"
                                                                        className="h-7 w-7"
                                                                        onClick={() => handleQuantityChange(splitIndex, item.id, quantityInSplit + 1)}
                                                                        disabled={remainingQuantity === 0 || isPaying}
                                                                    >
                                                                        <Plus className="h-3 w-3" />
                                                                    </Button>
                                                                </div>
                                                            </div>

                                                            {quantityInSplit > 0 && (
                                                                <div className="text-right text-sm mt-1">
                                                                    Subtotal: ${(item.price * quantityInSplit).toFixed(2)}
                                                                </div>
                                                            )}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-2 space-y-2">
                                    <div className="flex justify-between">
                                        <span>Subtotal:</span>
                                        <span>${cartTotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Propina ({tipPercentage}%):</span>
                                        <span>${tipAmount.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between font-bold">
                                        <span>Total:</span>
                                        <span>${totalWithTip.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Asignado:</span>
                                        <span>${assignedTotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Por asignar:</span>
                                        <span>${(cartTotal - assignedTotal).toFixed(2)}</span>
                                    </div>
                                </div>

                                {!isFullyAssigned && (
                                    <Alert variant="warning" className="mt-2">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription>
                                            Aún quedan ítems por asignar. Por favor, asigne todos los ítems antes de continuar.
                                        </AlertDescription>
                                    </Alert>
                                )}
                            </>
                        )}

                        {isPaying ? (
                            <div className="py-4 text-center">
                                <div className="animate-pulse mb-4">Procesando pago...</div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div
                                        className="bg-primary h-2.5 rounded-full animate-[progress_2s_ease-in-out]"
                                        style={{ width: "100%" }}
                                    ></div>
                                </div>
                            </div>
                        ) : (
                            <Button onClick={handleSplitBill} className="w-full" disabled={!isFullyAssigned}>
                                Pagar
                            </Button>
                        )}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}