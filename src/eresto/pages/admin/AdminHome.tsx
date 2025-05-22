import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    FormControlLabel,
    Switch,
    IconButton,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

const estadosColores = {
    Libre: '#4caf50', // verde
    Ocupada: '#f44336', // rojo
    Reservada: '#9e9e9e', // gris
    'Cuenta pedida': '#2196f3', // azul
    Pagado: '#9c27b0', // morado
    Cerrada: '#795548', // café sugerido
};

const mesasEjemplo = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    nombre: `Mesa ${i + 1}`,
    estado: Object.keys(estadosColores)[i % Object.keys(estadosColores).length],
}));

const AdminHome = () => {
    const [mesas, setMesas] = useState(mesasEjemplo);
    const [autoRefresh, setAutoRefresh] = useState(false);
    const [selectedMesa, setSelectedMesa] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        let interval;
        if (autoRefresh) {
            interval = setInterval(() => handleRefresh(), 45000);
        }
        return () => clearInterval(interval);
    }, [autoRefresh]);

    const handleRefresh = () => {
        // Aquí deberías llamar al backend
        // Simulación de actualización de estado desde el servidor

        setMesas((prev) =>
            prev.map((mesa) => {
                // Simulamos un pequeño cambio aleatorio de estado
                const estados = Object.keys(estadosColores);
                const nuevoEstado = estados[Math.floor(Math.random() * estados.length)];
                return { ...mesa, estado: nuevoEstado };
            })
        );
    };


    const handleCardClick = (mesa) => {
        setSelectedMesa(mesa);
        setModalOpen(true);
    };

    const handleEstadoChange = (nuevoEstado) => {
        setMesas((prev) =>
            prev.map((m) =>
                m.id === selectedMesa.id ? { ...m, estado: nuevoEstado } : m
            )
        );
        setModalOpen(false);
    };

    return (
        <Box p={2}>
            <Typography variant="h5" gutterBottom>
                Estado de Mesas del Restaurante
            </Typography>

            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                <Button
                    variant="contained"
                    startIcon={<RefreshIcon />}
                    onClick={handleRefresh}
                >
                    Refrescar Estado
                </Button>

                <FormControlLabel
                    control={
                        <Switch
                            checked={autoRefresh}
                            onChange={() => setAutoRefresh(!autoRefresh)}
                        />
                    }
                    label="Actualización automática"
                />
            </Box>

            <Grid container spacing={2}>
                {mesas.map((mesa) => (
                    <Grid item xs={12} sm={6} md={2} key={mesa.id}>
                        <Card
                            onClick={() => handleCardClick(mesa)}
                            sx={{
                                backgroundColor: estadosColores[mesa.estado],
                                color: '#fff',
                                height: 100,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                            }}
                        >
                            <CardContent>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    {mesa.nombre}
                                </Typography>
                                <Typography variant="body2">{mesa.estado}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
                <DialogTitle>{selectedMesa?.nombre}</DialogTitle>
                <DialogContent>
                    <Typography gutterBottom>
                        Seleccione el nuevo estado para la {selectedMesa?.nombre}:
                    </Typography>
                    <Grid container spacing={1}>
                        {Object.keys(estadosColores).map((estado) => (
                            <Grid item xs={6} key={estado}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{ backgroundColor: estadosColores[estado], color: '#fff' }}
                                    onClick={() => handleEstadoChange(estado)}
                                >
                                    {estado}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default AdminHome;
