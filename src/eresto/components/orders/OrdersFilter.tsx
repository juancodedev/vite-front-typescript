import React from 'react';
import {
    Box,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Grid,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { OrderFilters, OrderStatus } from '../../types/order';

interface OrdersFilterProps {
    filters: OrderFilters;
    onFiltersChange: (filters: OrderFilters) => void;
    onSearch: (term: string) => void;
}

const OrdersFilter: React.FC<OrdersFilterProps> = ({
    filters,
    onFiltersChange,
    onSearch,
}) => {
    return (
        <Card>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                            onChange={(e) => onSearch(e.target.value)}
                            placeholder="Buscar orden"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <FormControl fullWidth>
                            <InputLabel>Estado</InputLabel>
                            <Select
                                value={filters.status}
                                label="Estado"
                                onChange={(e) => onFiltersChange({
                                    ...filters,
                                    status: e.target.value as OrderStatus | 'all'
                                })}
                            >
                                <MenuItem value="all">Todos</MenuItem>
                                <MenuItem value="pending">Pendiente</MenuItem>
                                <MenuItem value="in-progress">En Progreso</MenuItem>
                                <MenuItem value="completed">Completada</MenuItem>
                                <MenuItem value="cancelled">Cancelada</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <DatePicker
                            label="Desde"
                            value={filters.dateFrom}
                            onChange={(date) => onFiltersChange({
                                ...filters,
                                dateFrom: date
                            })}
                            slotProps={{ textField: { fullWidth: true } }}
                        />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <DatePicker
                        label="Hasta"
                        value={filters.dateTo}
                        onChange={(date) => onFiltersChange({
                            ...filters,
                            dateTo: date
                        })}
                        slotProps={{ textField: { fullWidth: true } }}
                    />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Button
                        fullWidth
                        color="primary"
                        variant="contained"
                        sx={{ height: '56px' }}
                    >
                            Filtrar
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default OrdersFilter;