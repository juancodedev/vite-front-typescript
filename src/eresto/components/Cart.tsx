import React, { useState } from 'react'
import { useOrder } from './../context/OrderContext'
import { Button, TextField } from '@mui/material';

import BillSplitModal from './BillSplitModal'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


export default function Cart({ tableId }: { readonly tableId: string }) {
    const { cart, removeFromCart, updateQuantity, total, orderPlaced, placeOrder } = useOrder()
    const [tipPercentage, setTipPercentage] = useState(10)
    const [isBillSplitModalOpen, setIsBillSplitModalOpen] = useState(false)

    const tipAmount = (total * tipPercentage) / 100
    const totalWithTip = total + tipAmount

    const handlePlaceOrder = () => {
        placeOrder()
        // Aquí iría la lógica para enviar el pedido al servidor
    }

    const handleRequestBill = () => {
        setIsBillSplitModalOpen(true)
    }

    return (
        <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Carrito - Mesa {tableId}</h2>
            {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center mb-2">
                    <span>{item.name}</span>
                    <div className="flex items-center">
                        <Button variant="outlined" size="small" onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>
                            <RemoveIcon className="h-4 w-4" />
                        </Button>
                        <span className="mx-2">{item.quantity}</span>
                        <Button variant="outlined" size="small" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            <AddIcon className="h-4 w-4" />
                        </Button>
                        <Button onClick={() => removeFromCart(item.id)} variant="outlined" size="small" className="ml-2">
                            Eliminar
                        </Button>
                    </div>
                </div>
            ))}
            <div className="mt-4">
                <p className="font-bold">Total: ${total.toFixed(2)}</p>
                <div className="mt-2">
                    {/* <Label htmlFor="tip"></Label> */}
                    <TextField id="outlined-basic" label="Propina (%)" variant="outlined" />
                    {/* <Input
                        id="tip"
                        type="number"
                        value={tipPercentage}
                        onChange={(e) => setTipPercentage(parseInt(e.target.value))}
                        className="w-full mt-1"

                    /> */}
                </div>
                <p className="mt-2">Propina: ${tipAmount.toFixed(2)}</p>
                <p className="font-bold mt-2">Total con propina: ${totalWithTip.toFixed(2)}</p>
            </div>
            {!orderPlaced ? (
                <Button onClick={handlePlaceOrder} className="w-full mt-4">
                    Realizar pedido
                </Button>
            ) : (
                <Button onClick={handleRequestBill} className="w-full mt-4">
                    Pedir cuenta
                </Button>
            )}
            {/* <BillSplitModal isOpen={isBillSplitModalOpen} onClose={() => setIsBillSplitModalOpen(false)} /> */}
        </div>
    )
}

