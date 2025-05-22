export interface Order {
    id: string;
    ref: string;
    amount: number;
    customer: {
        name: string;
        email: string;
    };
    tableNumber: number;
    items: OrderItem[];
    status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
    total: number;
    createdAt: string;
    paymentMethod: string;
}

export interface OrderItem {
    id: string;
    name: string;
    quantity: number;
    unitPrice: number;
}

export interface OrderStats {
    total: number;
    pending: number;
    completed: number;
    cancelled: number;
}

export type OrderStatus = Order['status'];

export interface OrderFilters {
    status: OrderStatus | 'all';
    dateFrom: Date | null;
    dateTo: Date | null;
}