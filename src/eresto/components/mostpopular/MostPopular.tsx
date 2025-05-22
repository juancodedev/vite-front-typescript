import { Box, Card, CardContent, Grid, LinearProgress, List, Typography } from '@mui/material'
import React from 'react'

// Datos simulados
const platos = [
    { nombre: 'Hamburguesa Clásica', cantidad: 20 },
    { nombre: 'Paella Valenciana', cantidad: 25 },
    { nombre: 'Pasta Carbonara', cantidad: 30 },
    { nombre: 'Pizza Margherita', cantidad: 35 },
    { nombre: 'Ensalada César', cantidad: 40 }
];

const horasPico = [
    { horario: '13:00 - 14:00', pedidos: 15 },
    { horario: '20:00 - 21:00', pedidos: 18 },
    { horario: '14:00 - 15:00', pedidos: 21 },
    { horario: '21:00 - 22:00', pedidos: 24 },
    { horario: '19:00 - 20:00', pedidos: 27 }
];

// Máximos para calcular % progreso
const maxPlatos = Math.max(...platos.map(p => p.cantidad));
const maxPedidos = Math.max(...horasPico.map(h => h.pedidos));


export const MostPopular = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Platos Más Vendidos
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            Top productos por ventas
                        </Typography>
                        {platos.map((plato, index) => (
                            <Box key={index} mb={1}>
                                <Typography fontWeight="bold" variant="body2">
                                    #{index + 1} {plato.nombre}
                                </Typography>
                                <Box display="flex" alignItems="center">
                                    <Box flexGrow={1} mr={1}>
                                        <LinearProgress
                                            variant="determinate"
                                            value={(plato.cantidad / maxPlatos) * 100}
                                            sx={{ height: 8, borderRadius: 5, backgroundColor: '#e0e0e0' }}
                                        />
                                    </Box>
                                    <Typography variant="body2">{plato.cantidad} uds</Typography>
                                </Box>
                            </Box>
                        ))}
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Horas Pico
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            Horarios con mayor actividad
                        </Typography>
                        {horasPico.map((hora, index) => (
                            <Box key={index} mb={1}>
                                <Typography fontWeight="bold" variant="body2">
                                    #{index + 1} {hora.horario}
                                </Typography>
                                <Box display="flex" alignItems="center">
                                    <Box flexGrow={1} mr={1}>
                                        <LinearProgress
                                            variant="determinate"
                                            value={(hora.pedidos / maxPedidos) * 100}
                                            sx={{
                                                height: 8,
                                                borderRadius: 5,
                                                backgroundColor: '#e0e0e0',
                                                '& .MuiLinearProgress-bar': {
                                                    backgroundColor: '#f59e0b' // color naranja
                                                }
                                            }}
                                        />
                                    </Box>
                                    <Typography variant="body2">{hora.pedidos} pedidos</Typography>
                                </Box>
                            </Box>
                        ))}
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}
