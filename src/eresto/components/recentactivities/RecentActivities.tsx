import { AttachMoney, ShoppingCart, RestaurantMenu } from '@mui/icons-material';
import { Avatar, CardContent, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import React from 'react'
const actividades = [
    {
        tipo: 'pago',
        icono: <AttachMoney color="success" />,
        titulo: 'Nuevo pago recibido',
        descripcion: 'Mesa 5 - €45.50',
        tiempo: 'Hace 2 min'
    },
    {
        tipo: 'pedido',
        icono: <ShoppingCart color="primary" />,
        titulo: 'Nuevo pedido creado',
        descripcion: 'Mesa 3 - 4 productos',
        tiempo: 'Hace 7 min'
    },
    {
        tipo: 'estado',
        icono: <RestaurantMenu color="warning" />,
        titulo: 'Mesa cambiada de estado',
        descripcion: 'Mesa 7 - Ocupada → Cuenta pedida',
        tiempo: 'Hace 12 min'
    },
    {
        tipo: 'pago',
        icono: <AttachMoney color="success" />,
        titulo: 'Nuevo pago recibido',
        descripcion: 'Mesa 5 - €45.50',
        tiempo: 'Hace 17 min'
    },
    {
        tipo: 'pedido',
        icono: <ShoppingCart color="primary" />,
        titulo: 'Nuevo pedido creado',
        descripcion: 'Mesa 3 - 4 productos',
        tiempo: 'Hace 22 min'
    }
];

const RecentActivities = () => {
    return (
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                Actividad Reciente
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Últimas acciones en el sistema
            </Typography>
            <List>
                {actividades.map((item, index) => (
                    <>
                        <ListItem key={index} disableGutters secondaryAction={<Typography variant="body2" color="text.secondary">
                            {item.tiempo}
                        </Typography>}>
                            <ListItemAvatar>
                                <Avatar>
                                    {item.icono}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={<Typography fontWeight="bold">{item.titulo}</Typography>}
                                secondary={item.descripcion} />
                        </ListItem>
                        <Divider component="li" />
                    </>
                ))}
            </List>
        </CardContent>
    )
}

export default RecentActivities