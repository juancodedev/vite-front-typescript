import React, { useState } from 'react';
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
    Chip,
    Stack,
    Card,
    Button,
} from '@mui/material';
import { OrderFilters, Order, OrderItem } from '../../types/order';
import OrdersFilter from '../../components/orders/OrdersFilter';
// Mock data
const mockOrders: Order[] = [
    {
        id: '1',
        ref: 'ORD-001',
        amount: 30.50,
        customer: {
            name: 'Juan Pérez',
            email: 'juan@example.com'
        },
        tableNumber: 1,
        items: [
            { id: '1', name: 'Pasta Carbonara', quantity: 1, unitPrice: 15.50 },
            { id: '2', name: 'Caesar Salad', quantity: 1, unitPrice: 15.00 }
        ],
        status: 'pending',
        total: 30.50,
        createdAt: '2023-04-28T14:00:00',
        paymentMethod: 'credit_card'
    },
    {
        id: '2',
        ref: 'ORD-002',
        amount: 30.50,
        customer: {
            name: 'Pedro González',
            email: 'pgonzales@gmail.com'
        },
        tableNumber: 1,
        items: [
            { id: '1', name: 'Sour', quantity: 1, unitPrice: 8.50 },
            { id: '2', name: 'Chorrillana', quantity: 1, unitPrice: 15.00 }
        ],
        status: 'in-progress',
        total: 23.50,
        createdAt: '2023-04-29T14:00:00',
        paymentMethod: 'credit_card'
    }
];


export const Orders: React.FC = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState<OrderFilters>({
        status: 'all',
        dateFrom: null,
        dateTo: null
    });
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    // Handle rows per page change
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Get status chip color
    const getStatusChipColor = (status: Order['status']): any => {
        const colors = {
            pending: { color: 'warning', label: 'Pendiente' },
            'in-progress': { color: 'info', label: 'En Progreso' },
            completed: { color: 'success', label: 'Completada' },
            cancelled: { color: 'error', label: 'Cancelada' }
        };
        return colors[status];
    };

    // Handle filter changes
    const handleFiltersChange = (newFilters: OrderFilters) => {
        setFilters(newFilters);
        setPage(0);
    };

    // Handle search
    const handleSearch = (term: string) => {
        setSearchTerm(term);
        setPage(0);
    };

    // Filter orders based on search term and filters
    const filteredOrders = mockOrders.filter(order => {
        // Text search filter
        const matchesSearch = searchTerm === '' ||
            order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            order.id.includes(searchTerm) ||
            order.tableNumber.toString().includes(searchTerm);

        // Status filter
        const matchesStatus = filters.status === 'all' || order.status === filters.status;

        // Date range filter
        const orderDate = new Date(order.createdAt);
        const matchesDateFrom = !filters.dateFrom || orderDate >= filters.dateFrom;
        const matchesDateTo = !filters.dateTo || orderDate <= filters.dateTo;

        return matchesSearch && matchesStatus && matchesDateFrom && matchesDateTo;
    });

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
                Órdenes
            </Typography>

            <Stack spacing={3} sx={{ mb: 3 }}>
                <OrdersFilter
                    filters={filters}
                    onFiltersChange={handleFiltersChange}
                />
            </Stack>

            <Card>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Orden</TableCell>
                                <TableCell>Mesa</TableCell>
                                <TableCell>Productos</TableCell>
                                <TableCell>Total</TableCell>
                                <TableCell>Estado</TableCell>
                                <TableCell>Fecha</TableCell>
                                <TableCell align="right">Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredOrders
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((order) => {
                                    const statusConfig = getStatusChipColor(order.status);
                                    return (
                                        <TableRow hover key={order.id}>
                                            <TableCell>{order.ref}</TableCell>
                                            <TableCell>{order.tableNumber}</TableCell>
                                            <TableCell>
                                                {order.items.map((item: OrderItem) => (
                                                    <Box key={item.id} sx={{ mb: 1 }}>
                                                        <Typography variant="body2">
                                                            {item.name} x {item.quantity}
                                                        </Typography>
                                                    </Box>
                                                ))}
                                            </TableCell>
                                            <TableCell>${order.total.toFixed(2)}</TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={statusConfig.label}
                                                    color={statusConfig.color}
                                                    size="small"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                {new Date(order.createdAt).toLocaleString('es-CL')}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex justify-end space-x-2">
                                                    <Button
                                                        onClick={() => updateOrderStatus(order.id, "PENDING")}
                                                        variant={order.status === "PENDING" ? "default" : "outline"}
                                                        size="sm"
                                                    >
                                                        Pendiente
                                                    </Button>
                                                    <Button
                                                        onClick={() => updateOrderStatus(order.id, "DELIVERED")}
                                                        variant={order.status === "DELIVERED" ? "default" : "outline"}
                                                        size="sm"
                                                    >
                                                        Entregado
                                                    </Button>
                                                    <Button
                                                        onClick={() => updateOrderStatus(order.id, "DELAYED")}
                                                        variant={order.status === "DELAYED" ? "default" : "outline"}
                                                        size="sm"
                                                    >
                                                        Atrasado
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                    <TablePagination
                        component="div"
                        count={filteredOrders.length}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        rowsPerPageOptions={[5, 10, 25]}
                        labelRowsPerPage="Filas por página"
                    />
                </TableContainer>
            </Card>
        </Box>
    );
};