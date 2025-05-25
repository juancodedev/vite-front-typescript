import React, { useState, useEffect } from "react"
// import { useOrder } from "../context/OrderContext"
import ProductList from "./ProductList"
import Cart from "./Cart"
import CategoryNav from "./CategoryNav"
import { getTableById } from '../actions/table-actions'
import Skeleton from '@mui/material/Skeleton';

import { Alert, AlertTitle } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';




// Tipo para los productos
type Product = {
    id: number
    name: string
    description: string
    price: number
    image: string
    category: string
}

export default function TableOrdersClients({ params }: { readonly params: { readonly id: string } }) {
    const [selectedCategory, setSelectedCategory] = useState("all")
    // const { orderPlaced } = useOrder()
    type TableData = {
        number: number
        capacity: number
    }

    const [tableData, setTableData] = useState<TableData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchTableData = async () => {
            try {
                setLoading(true)
                const table = await getTableById(params.id)
                if (table) {
                    setTableData(table)
                    setError(null)
                } else {
                    setError("Mesa no encontrada")
                }
            } catch (err) {
                console.error("Error fetching table:", err)
                setError("No se pudo cargar la información de la mesa")
            } finally {
                setLoading(false)
            }
        }

        fetchTableData()
    }, [params.id])

    // En una aplicación real, estas categorías y productos vendrían de una API o base de datos
    const categories = ["all", "appetizers", "main courses", "desserts", "drinks"]
    const products: Product[] = [
        {
            id: 1,
            name: "Ensalada César",
            description: "Lechuga fresca con aderezo César",
            price: 8.99,
            image: "/placeholder.svg?height=200&width=200",
            category: "appetizers",
        },
        {
            id: 2,
            name: "Pasta Alfredo",
            description: "Pasta con salsa Alfredo cremosa",
            price: 12.99,
            image: "/placeholder.svg?height=200&width=200",
            category: "main courses",
        },
        {
            id: 3,
            name: "Tiramisú",
            description: "Postre italiano clásico",
            price: 6.99,
            image: "/placeholder.svg?height=200&width=200",
            category: "desserts",
        },
        {
            id: 4,
            name: "Limonada",
            description: "Refrescante limonada casera",
            price: 3.99,
            image: "/placeholder.svg?height=200&width=200",
            category: "drinks",
        },
    ]

    const filteredProducts =
        selectedCategory === "all" ? products : products.filter((product) => product.category === selectedCategory)

    if (loading) {
        return (
            <div className="container mx-auto p-4">
                <Skeleton className="h-8 w-64 mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {Array(5)
                                .fill(0)
                                .map(() => (
                                    <Skeleton key={uuidv4()} className="h-10 w-24" />
                                ))}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Array(4)
                                .fill(0)
                                .map(() => (
                                    <Skeleton key={uuidv4()} className="h-64 w-full" />
                                ))}
                        </div>
                    </div>
                    <Skeleton className="h-96 w-full" />
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container mx-auto p-4">
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {error}
                </Alert>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">
                Mesa {tableData.number} - Capacidad: {tableData.capacity} personas
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                    <CategoryNav
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onSelectCategory={setSelectedCategory}
                    />
                    <ProductList products={filteredProducts} />
                </div>
                <div>
                    <Cart tableId={params.id} />
                </div>
            </div>
        </div>
    )
}

