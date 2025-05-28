import { useState } from 'react'
import ProductModal from './ProductModal'
import { Card, CardHeader, CardContent, Button } from '@mui/material'

type Product = {
    id: number
    name: string
    description: string
    price: number
    image: string
    img: string // Added missing property
    category: string // Added missing property
}

export default function ProductList({ products }: Readonly<{ products: Product[] }>) {
    // const { addToCart } = useOrder()
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((product) => (
                <Card key={product.id} className="flex flex-col">
                    <CardHeader className="flex-row gap-4 items-center">
                        <div className="relative w-[100px] h-[100px]">
                            <img
                                src={product.image}
                                alt={product.name}
                                // fill
                                style={{ objectFit: 'cover' }}
                                className="rounded-md"
                            />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold">{product.name}</h3>
                            <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p>{product.description}</p>
                    </CardContent>
                    <div className="mt-auto">
                        <Button onClick={() => setSelectedProduct(product)} className="w-full">Ver detalles</Button>
                    </div>
                </Card>
            ))}
            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    isOpen={!!selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </div>
    )
}

