import { useTable } from '@/eresto/hooks/useTable';
import { Box, Button, Container, Typography } from '@mui/material'
import React, { useCallback, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export const ClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { tableNumber } = useParams<{ tableNumber: string }>();
    const navigate = useNavigate();
    const { isExistTable } = useTable();

    const closeTable = useCallback(() => {
        navigate("/");
    }, [navigate]);

    useEffect(() => {
        (async () => {
            const exist = tableNumber ? await isExistTable(Number(tableNumber)) : false;
            if (!exist) closeTable();
        })();
    }, [closeTable, isExistTable, tableNumber]);

    const goToCart = () => {
        navigate(`/client/${tableNumber}/cart`);
    };

    const goToOrders = () => {
        navigate(`/client/${tableNumber}/orders`);
    };

    return (
        <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
            <Container sx={{ py: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Link to={`/client/${tableNumber}`}>
                        <Typography variant="h4">ERestó</Typography>
                    </Link>
                    <Typography variant='h6'>Mesa {tableNumber} </Typography>
                </Box>
                <Button 
                    variant='contained' 
                    onClick={goToCart}
                    startIcon={<ShoppingCartIcon />}
                />
                <Button variant="contained" onClick={goToOrders}>Órdenes</Button>
                <Button variant="contained" color="error" onClick={closeTable}>Cerrar</Button>
                <Box>
                    {children}
                </Box>
            </Container>
        </Box>

    )
}
