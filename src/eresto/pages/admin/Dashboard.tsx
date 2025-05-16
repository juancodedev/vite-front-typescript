import React from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { Box, Card, CardContent, Typography, Grid, Avatar, Stack, CardHeader } from '@mui/material';
import { Euro, ShoppingCart, People, RestaurantMenu, AccessTime } from '@mui/icons-material';

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
    const [value, setValue] = React.useState('charts');

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
            {/* <div className="flex flex-wrap gap-4">

                <Card className="flex-1 min-w-[250px]">
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
            </div> */}
            <Box sx={{ flexGrow: 1, p: 2 }}>
                <Grid container spacing={2}>
                    {/* Ventas Totales */}
                    <Grid>
                        <Card variant="outlined">
                            <CardContent>
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Box>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Ventas Totales
                                        </Typography>
                                        <Typography variant="h5" fontWeight="bold">
                                            €4,550.50
                                        </Typography>
                                        <Typography variant="caption" color="green">
                                            +12.5% esta semana
                                        </Typography>
                                    </Box>
                                    <Avatar sx={{ bgcolor: '#e0e0e0' }}>
                                        <Euro />
                                    </Avatar>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Pedidos Hoy */}
                    <Grid >
                        <Card variant="outlined">
                            <CardContent>
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Box>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Pedidos Hoy
                                        </Typography>
                                        <Typography variant="h5" fontWeight="bold">
                                            124
                                        </Typography>
                                        <Typography variant="caption" color="orange">
                                            ⏱ 5 pendientes
                                        </Typography>
                                    </Box>
                                    <Avatar sx={{ bgcolor: '#ffe0b2' }}>
                                        <ShoppingCart />
                                    </Avatar>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Clientes Atendidos */}
                    <Grid >
                        <Card variant="outlined">
                            <CardContent>
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Box>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Clientes Atendidos
                                        </Typography>
                                        <Typography variant="h5" fontWeight="bold">
                                            38
                                        </Typography>
                                        <Typography variant="caption" color="primary">
                                            📅 Hoy
                                        </Typography>
                                    </Box>
                                    <Avatar sx={{ bgcolor: '#bbdefb' }}>
                                        <People />
                                    </Avatar>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Mesas Ocupadas */}
                    <Grid>
                        <Card variant="outlined">
                            <CardContent>
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Box>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Mesas Ocupadas
                                        </Typography>
                                        <Typography variant="h5" fontWeight="bold">
                                            8/15
                                        </Typography>
                                        <Typography variant="caption" color="purple">
                                            <AccessTime fontSize="inherit" sx={{ verticalAlign: 'middle' }} /> 45 min promedio
                                        </Typography>
                                    </Box>
                                    <Avatar sx={{ bgcolor: '#e1bee7' }}>
                                        <RestaurantMenu />
                                    </Avatar>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Gráficos" value="charts" />
                            <Tab label="Actividad" value="activity" />
                            <Tab label="Más Populares" value="popular" />
                        </TabList>
                    </Box>
                    <TabPanel value="charts" className="space-y-4 ">
                        <Box sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}>
                            <Box>
                                <Card sx={{
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
                            </Box>
                            <Box sx={{
                            }}>
                                <Card
                                    sx={{
                                with: "300px",

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
                            </Box>
                            <Box>
                                <Card sx={{
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
                            </Box>
                        </Box>
                    </TabPanel>
                    <TabPanel value="activity">
                        <Box sx ={{
                            borderRadius: "5px",
                            boxShadow: "0px 0px 10px rgb(222, 222, 222)",
                            border: "1px",
                            borderColor:"red"

                        }}
>
asdasd
                        </Box>
                    </TabPanel>
                    <TabPanel value="popular">Item Three</TabPanel>
                </TabContext>
            </Box>
        </div>
    );
};
