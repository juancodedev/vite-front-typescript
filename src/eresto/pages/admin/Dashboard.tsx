import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupIcon from '@mui/icons-material/Group';
import FlatwareIcon from '@mui/icons-material/Flatware';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import Box from '@mui/material/Box';
import { CardHeader, Typography } from '@mui/material';
import { TableStatusChart } from './tables/table-status-chart';
import { OrderFlowChart } from './dashboard/order-flow-chart';
import { PaymentSummaryChart } from './dashboard/payment-summary-chart';

export const Dashboard = () => {
    const summaryData = {
        ventas: "€4,550.50",
        pedidos: "124",
        clientes: "38",
        mesasOcupadas: "8/15",
        tiempoPromedio: "45 min",
        platosPopulares: ["Hamburguesa", "Paella", "Pasta Carbonara"],
        ventasSemana: "+12.5%",
        pedidosPendientes: "5",
    }
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center" >
                <h1 className='text-2xl font-bold text-gray-800'>
                    Dashboard
                </h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                <Card>
                    <CardContent className='p-6'>
                        <div className="flex items-center justify-between space-y-0">
                            <div>
                                <p className='text-sm font-medium text-muted-foreground'> Ventas Totales</p>
                                <h3 className='text-2xl font-bold tracking-tight'>{summaryData.ventas}</h3>
                                <p className='text-xs text-green-500 flex items-center mt-1'>
                                    <TrendingUpIcon className='mr-1' />
                                    {summaryData.ventasSemana} esta semana
                                </p>
                            </div>
                            <div className="p-2 bg-primary/10 rounded-full">
                                <AttachMoneyRoundedIcon fontSize="large" className='text-primary' />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className='p-6'>
                        <div className="flex items-center justify-between space-y-0">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Pedidos Hoy</p>
                                <h3 className="text-2xl font-bold tracking-tight">{summaryData.pedidos}</h3>
                                <p className="text-xs text-amber-500 flex items-center mt-1">
                                    <AccessTimeIcon fontSize="large" className="mr-1" />
                                    {summaryData.pedidosPendientes} pendientes
                                </p>
                            </div>
                            <div className="p-2 bg-amber-500/10 rounded-full">
                                <ShoppingBagIcon className="text-amber-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between space-y-0">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Clientes Atendidos</p>
                                <h3 className="text-2xl font-bold tracking-tight">{summaryData.clientes}</h3>
                                <p className="text-xs text-blue-500 flex items-center mt-1">
                                    <CalendarMonthIcon fontSize="large" className="mr-1" />
                                    Hoy
                                </p>
                            </div>
                            <div className="p-2 bg-blue-500/10 rounded-full">
                                <GroupIcon fontSize="large" className="text-blue-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between space-y-0">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Mesas Ocupadas</p>
                                <h3 className="text-2xl font-bold tracking-tight">{summaryData.mesasOcupadas}</h3>
                                <p className="text-xs text-purple-500 flex items-center mt-1">
                                    <AccessTimeIcon className="mr-1" />
                                    {summaryData.tiempoPromedio} promedio
                                </p>
                            </div>
                            <div className="p-2 bg-purple-500/10 rounded-full">
                                <FlatwareIcon fontSize="large" className="text-purple-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Gráficos" value="charts" />
                            <Tab label="Actividad" value="activity" />
                            <Tab label="Más Populares" value="popular" />
                        </TabList>
                    </Box>
                    <TabPanel value="charts" className="space-y-4">          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <Card>
                            <CardHeader>
                                <Typography gutterBottom variant="h5" component="div">
                                    Estado de Mesas
                                </Typography>

                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Distribución actual de mesas por estado
                                </Typography>
                            </CardHeader>
                            <CardContent>
                                <TableStatusChart />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <Typography gutterBottom variant="h5" component="div">
                                    Estado de Mesas
                                </Typography>

                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Distribución actual de mesas por estado
                                </Typography>
                                <Typography gutterBottom variant="h5" component="div">
                                    Flujo de Pedidos
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Estado actual de los pedidos
                                </Typography>
                            </CardHeader>
                            <CardContent>
                                <OrderFlowChart />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <Typography gutterBottom variant="h5" component="div">
                                    Resumen de Pagos
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Ventas de la última semana
                                </Typography>
                            </CardHeader>
                            <CardContent>
                                <PaymentSummaryChart />
                            </CardContent>
                        </Card>
                    </div>
                    </TabPanel>
                    <TabPanel value="activity">Item Two</TabPanel>
                    <TabPanel value="popular">Item Three</TabPanel>
                </TabContext>
            </Box>
        </div>
    );
};
