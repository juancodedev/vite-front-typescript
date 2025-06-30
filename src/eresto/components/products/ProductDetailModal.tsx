import { Box, Button, Chip, Dialog, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material'
import { Close as CloseIcon, ShoppingCart as ShoppingCartIcon } from "@mui/icons-material"
import React from 'react'

interface ProductModalProps {
    open: boolean
    onClose: () => void
    product: {
        id: string
        name: string
        image: string
        ingredients: Array<string>
        price: number
        calories: number
    }| null
}

export const ProductDetailModal: React.FC<ProductModalProps> = ({ open, onClose, product }) => {
    const handleAddToCart = () => {
        if (product) {
            console.log('Adding to cart:', product.name);
        }
        onClose();
    };

    if (!product) {
        return null;
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth='sm'
            fullWidth
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: 2,
                        overflow: "hidden",
                    },
                },
            }}
        >
            <DialogTitle>
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: "grey.500",
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ p: 0 }}>
                <Box sx={{ position: "relative", width: "100%", height: 300 }}>
                    {/* <img src={product.image ?? "/placeholder.svg"} alt={product.name} style={{ objectFit: "cover" }} /> */}
                    <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        style={{ objectFit: "cover", width: "100%", height: "100%" }}
                    />
                </Box>
                <Box sx={{ p: 3 }}>
                    <Typography
                        variant="h5"
                        component="h2"
                        sx={{
                            fontWeight: "bold",
                            textAlign: "center",
                            mb: 3,
                            color: "text.primary",
                        }}
                    >
                        {product.name}
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            mb: 2,
                            color: "text.secondary",
                            fontSize: "1.1rem",
                        }}
                    >
                        Ingredientes:
                    </Typography>
                    <List sx={{ py: 0 }}>
                        {product.ingredients?.map((ingredient: string) => (
                            <ListItem key={`${product.id}-${ingredient}`} sx={{ py: 0.5, px: 0 }}>
                                <ListItemText
                                    primary={`• ${ingredient}`}
                                    sx={{
                                        "& .MuiListItemText-primary": {
                                            fontSize: "0.95rem",
                                            color: "text.secondary",
                                        },
                                    }}
                                />
                            </ListItem>
                        )) || (
                                <ListItem sx={{ py: 0.5, px: 0 }}>
                                    <ListItemText primary="• No ingredients available" />
                                </ListItem>
                            )}
                    </List>
                </Box>

                {/* Footer del modal */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: 3,
                        pt: 0,
                        borderTop: "1px solid",
                        borderColor: "divider",
                        mt: 2,
                    }}
                >
                    {/* Precio */}
                    <Chip
                        label={`€${product.price?.toFixed(2) || '0.00'}`}
                        sx={{
                            backgroundColor: "primary.main",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "1.1rem",
                            height: 40,
                        }}
                    />

                    {/* Calorías */}
                    <Typography
                        variant="body2"
                        sx={{
                            color: "text.secondary",
                            fontWeight: 500,
                        }}
                    >
                        120 cal
                    </Typography>

                    {/* Botón agregar */}
                    <Button
                        variant="contained"
                        startIcon={<ShoppingCartIcon />}
                        onClick={handleAddToCart}
                        sx={{
                            backgroundColor: "success.main",
                            "&:hover": {
                                backgroundColor: "success.dark",
                            },
                            fontWeight: "bold",
                            px: 3,
                        }}
                    >
                        Agregar
                    </Button>
                </Box>
            </DialogContent>


        </Dialog >
    )
}

// Componente de ejemplo para mostrar el modal
// export default function Component() {
//     const [modalOpen, setModalOpen] = useState(false)

//     const sampleProduct = {
//         id: "1",
//         name: "Hongos Rellenos Vegetarianos",
//         image: "/images/stuffed-mushrooms.png",
//         ingredients: [
//             "Hongos portobello frescos",
//             "Ricotta italiana",
//             "Espinacas baby",
//             "Tomates cherry",
//             "Queso parmesano",
//             "Hierbas aromáticas",
//             "Aceite de oliva extra virgen",
//             "Ajo fresco",
//             "Pimienta negra",
//         ],
//         price: 12.5,
//         calories: 285,
//     }

//     return (
//         <Box sx={{ p: 4, textAlign: "center" }}>
//             <Typography variant="h4" sx={{ mb: 3 }}>
//                 Modal de Producto - Menú Vegetariano
//             </Typography>

//             <Button variant="contained" size="large" onClick={() => setModalOpen(true)} sx={{ mb: 2 }}>
//                 Abrir Modal del Producto
//             </Button>

//             <ProductModal open={modalOpen} onClose={() => setModalOpen(false)} product={sampleProduct} />
//         </Box>
//     )
// }