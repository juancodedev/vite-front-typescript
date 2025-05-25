import React, { useState } from 'react'
import { useOrder } from '../context/OrderContext'
import { Button, DialogContent, DialogTitle, Dialog } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

type Product = {
    img: string;
    id: number
    name: string
    description: string
    price: number
    image: string
    category: string
}

export default function ProductModal({ product, isOpen, onClose }: Readonly<{ product: Product, isOpen: boolean, onClose: () => void }>) {
    const { addToCart } = useOrder()
    const [quantity, setQuantity] = useState(1)

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product)
        }
        onClose()
    }

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogTitle>{product.name}</DialogTitle>
                <div>${product.price.toFixed(2)}</div>
                <div className="grid gap-4 py-4">
                    <div className="relative w-full h-[200px]">
                        <img
                            src={product.img}
                            alt={product.name}
                            style={{ objectFit: 'cover' }}
                            className="rounded-md"
                        />
                    </div>
                    <p>{product.description}</p>
                    <div className="flex items-center justify-between">
                        <Button variant="outlined" size="small" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                            <RemoveIcon className="h-4 w-4" />
                        </Button>
                        <span className="text-2xl font-bold">{quantity}</span>
                        <Button variant="outlined" size="small" onClick={() => setQuantity(quantity + 1)}>
                            <AddIcon className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                <Button onClick={handleAddToCart} className="w-full">
                    Agregar al carrito
                </Button>
            </DialogContent>
        </Dialog>
    )
}

