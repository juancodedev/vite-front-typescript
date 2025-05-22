import { Stack, Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import { OrderFlowChart } from '../../pages/admin/dashboard/order-flow-chart'
import { PaymentSummaryChart } from '../../pages/admin/dashboard/payment-summary-chart'
import { TableStatusChart } from '../../pages/admin/tables/table-status-chart'

export const Charts = () => {
    return (
        <Stack direction="row" spacing={3} alignItems="center">
            <Card sx={{
                width: "400px",
                borderRadius: "8px",
                boxShadow: "0px 0px 10px rgb(222, 222, 222)",
            }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Estado de Mesas
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Distribución actual de mesas por estado
                    </Typography>
                    <TableStatusChart />
                </CardContent>
            </Card>
            <Card
                sx={{
                    width: "400px",
                    borderRadius: "8px",
                    boxShadow: "0px 0px 10px rgb(222, 222, 222)",
                }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Flujo de Pedidos
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Estado actual de los pedidos
                    </Typography>
                    <OrderFlowChart />
                </CardContent>
            </Card>
            <Card sx={{
                width: "400px",
                borderRadius: "8px",
                boxShadow: "0px 0px 10px rgb(222, 222, 222)",
            }}
            >
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Resumen de Pagos
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Ventas de la última semana
                    </Typography>
                    <PaymentSummaryChart />
                </CardContent>
            </Card>
        </Stack>
    )
}
