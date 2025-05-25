import { useState } from 'react'
import { useOrder } from '../context/OrderContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import ProductModal from './ProductModal'


type Product = {
    id: number
    name: string
    description: string
    price: number
    image: string
}

export default function ProductList({ products }: { products: Product[] }) {
    const { addToCart } = useOrder()
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((product) => (
                <Card key={product.id} className="flex flex-col">
                    <CardHeader className="flex-row gap-4 items-center">
                        <div className="relative w-[100px] h-[100px]">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                style={{ objectFit: 'cover' }}
                                className="rounded-md"
                            />
                        </div>
                        <div>
                            <CardTitle>{product.name}</CardTitle>
                            <CardDescription>${product.price.toFixed(2)}</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p>{product.description}</p>
                    </CardContent>
                    <CardFooter className="mt-auto">
                        <Button onClick={() => setSelectedProduct(product)} className="w-full">Ver detalles</Button>
                    </CardFooter>
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

