import React, { createContext, useContext, useState, useEffect } from 'react';

// Define types for products and cart items
type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
};

type CartItem = Product & { quantity: number };

type BillSplit = {
    items: CartItem[];
    paymentMethod: 'debit' | 'credit' | 'cash';
    total: number;
};

// Define the context type
type OrderContextType = {
    cart: CartItem[];
    addToCart: (item: Product) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
    total: number;
    orderPlaced: boolean;
    placeOrder: () => void;
    splitBill: (splits: BillSplit[]) => void;
    billSplits: BillSplit[];
};

// Create and export the context with a default value
export const OrderContext = createContext<OrderContextType | undefined>(undefined);

// Custom hook to use the context
export const useOrder = (): OrderContextType => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('useOrder must be used within an OrderProvider');
    }
    return context;
};

// Props type for the provider component
interface OrderProviderProps {
    children: React.ReactNode;
}

// Provider component
export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [total, setTotal] = useState(0);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [billSplits, setBillSplits] = useState<BillSplit[]>([]);

    useEffect(() => {
        const newTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotal(newTotal);
    }, [cart]);

    const addToCart = (product: Product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (id: number) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    const updateQuantity = (id: number, quantity: number) => {
        setCart((prevCart) =>
            prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const placeOrder = () => {
        setOrderPlaced(true);
        // Aquí iría la lógica para enviar el pedido al servidor
    };

    const splitBill = (splits: BillSplit[]) => {
        setBillSplits(splits);
        // Aquí iría la lógica para procesar el pago dividido
    };

    // Create the context value object
    const contextValue: OrderContextType = {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        orderPlaced,
        placeOrder,
        splitBill,
        billSplits
    };

    return (
        <OrderContext.Provider value={contextValue}>
            {children}
        </OrderContext.Provider>
    );
};

