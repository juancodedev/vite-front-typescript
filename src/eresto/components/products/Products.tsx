import { Card, CardMedia, CardContent, Box, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useState } from 'react'
import RateProducts from '../RateProducts';
import ErrorBoundary from '../ErrorBoundary';
import { useParams, Link } from 'react-router-dom';
import { ProductDetailModal } from './ProductDetailModal';

const productList = [
    {
        "id": 4,
        "title": "Magnum Almendras",
        "image": "https://picsum.photos/200/300?random=1",
        "ingredients": [
            "Hongos portobello frescos",
            "Ricotta italiana",
            "Espinacas baby",
            "Tomates cherry",
            "Queso parmesano",
            "Hierbas aromáticas",
            "Aceite de oliva extra virgen",
            "Ajo fresco",
            "Pimienta negra",
        ],
        "price": "2.50",
        "active": true,
        "description": "Helado premium cubierto con una capa crujiente de chocolate y almendras.",
        "category": 1,
        "category_data": {
            "id": 1,
            "title": "Helados",
            "image": "http://localhost:8001/uploads/categories/helados_O41W3bM.jpg"
        }
    },
    {
        "id": 5,
        "title": "Chocapic Helado",
        "image": "https://picsum.photos/200/300?random=2",
        "ingredients": [
            "Hongos portobello frescos",
            "Ricotta italiana",
            "Espinacas baby",
            "Tomates cherry",
            "Queso parmesano",
            "Hierbas aromáticas",
            "Aceite de oliva extra virgen",
            "Ajo fresco",
            "Pimienta negra",
        ],
        "price": "1.90",
        "active": true,
        "description": "Helado con sabor a chocolate y cereal Chocapic, ideal para los más pequeños.",
        "category": 1,
        "category_data": {
            "id": 1,
            "title": "Helados",
            "image": "http://localhost:8001/uploads/categories/helados_O41W3bM.jpg"
        }
    },
    {
        "id": 6,
        "title": "Helado Banana Split",
        "image": "https://picsum.photos/200/300?random=3",
        "price": "2.20",
        "active": true,
        "description": "Delicioso helado con sabor a plátano, fresa y chocolate en un solo bocado.",
        "category": 1,
        "ingredients": [
            "Hongos portobello frescos",
            "Ricotta italiana",
            "Espinacas baby",
            "Tomates cherry",
            "Queso parmesano",
            "Hierbas aromáticas",
            "Aceite de oliva extra virgen",
            "Ajo fresco",
            "Pimienta negra",
        ],
        "category_data": {
            "id": 1,
            "title": "Helados",
            "image": "http://localhost:8001/uploads/categories/helados_O41W3bM.jpg"
        }
    },
    {
        "id": 7,
        "title": "Cornetto Clásico",
        "image": "https://picsum.photos/200/300?random=4",
        "price": "2.00",
        "ingredients": [
            "Hongos portobello frescos",
            "Ricotta italiana",
            "Espinacas baby",
            "Tomates cherry",
            "Queso parmesano",
            "Hierbas aromáticas",
            "Aceite de oliva extra virgen",
            "Ajo fresco",
            "Pimienta negra",
        ],
        "active": true,
        "description": "Cono de barquillo relleno de helado de vainilla y cubierto con chocolate y trozos de maní.",
        "category": 1,
        "category_data": {
            "id": 1,
            "title": "Helados",
            "image": "http://localhost:8001/uploads/categories/helados_O41W3bM.jpg"
        }
    },
    {
        "id": 8,
        "title": "Mini Bombón",
        "image": "https://picsum.photos/200/300?random=5",
        "ingredients": [
            "Hongos portobello frescos",
            "Ricotta italiana",
            "Espinacas baby",
            "Tomates cherry",
            "Queso parmesano",
            "Hierbas aromáticas",
            "Aceite de oliva extra virgen",
            "Ajo fresco",
            "Pimienta negra",
        ],
        "price": "1.00",
        "active": true,
        "description": "Pequeño helado de vainilla cubierto de chocolate, ideal para un antojo rápido.",
        "category": 1,
        "category_data": {
            "id": 1,
            "title": "Helados",
            "image": "http://localhost:8001/uploads/categories/helados_O41W3bM.jpg"
        }
    },
    {
        "id": 9,
        "title": "Mini Bombón",
        "image": "https://picsum.photos/200/300?random=6",
        "ingredients": [
            "Hongos portobello frescos",
            "Ricotta italiana",
            "Espinacas baby",
            "Tomates cherry",
            "Queso parmesano",
            "Hierbas aromáticas",
            "Aceite de oliva extra virgen",
            "Ajo fresco",
            "Pimienta negra",
        ],
        "price": "1.00",
        "active": true,
        "description": "Pequeño helado de vainilla cubierto de chocolate, ideal para un antojo rápido.",
        "category": 1,
        "category_data": {
            "id": 1,
            "title": "Helados",
            "image": "http://localhost:8001/uploads/categories/helados_O41W3bM.jpg"
        }
    },
    {
        "id": 10,
        "title": "Mini Bombón",
        "image": "https://picsum.photos/200/300?random=7",
        "ingredients": [
            "Hongos portobello frescos",
            "Ricotta italiana",
            "Espinacas baby",
            "Tomates cherry",
            "Queso parmesano",
            "Hierbas aromáticas",
            "Aceite de oliva extra virgen",
            "Ajo fresco",
            "Pimienta negra",
        ],
        "price": "1.00",
        "active": true,
        "description": "Pequeño helado de vainilla cubierto de chocolate, ideal para un antojo rápido.",
        "category": 1,
        "category_data": {
            "id": 1,
            "title": "Helados",
            "image": "http://localhost:8001/uploads/categories/helados_O41W3bM.jpg"
        }
    },
    {
        "id": 11,
        "title": "Mini Bombón",
        "image": "https://picsum.photos/200/300?random=8",
        "ingredients": [
            "Hongos portobello frescos",
            "Ricotta italiana",
            "Espinacas baby",
            "Tomates cherry",
            "Queso parmesano",
            "Hierbas aromáticas",
            "Aceite de oliva extra virgen",
            "Ajo fresco",
            "Pimienta negra",
        ],
        "price": "1.00",
        "active": true,
        "description": "Pequeño helado de vainilla cubierto de chocolate, ideal para un antojo rápido.",
        "category": 1,
        "category_data": {
            "id": 1,
            "title": "Helados",
            "image": "http://localhost:8001/uploads/categories/helados_O41W3bM.jpg"
        }
    }
];


export default function TableProducts() {
    const { id, idCategory } = useParams<{ id: string; idCategory: string }>();
    const [open, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<{
        id: number;
        title: string;
        image: string;
        ingredients?: string[];
        price: string;
        active: boolean;
        description: string;
        category: number;
        category_data: {
            id: number;
            title: string;
            image: string;
        };
    } | null>(null);
    
    const handleClickOpen = (product: { id: number; title: string; image: string; ingredients?: string[]; price: string; active: boolean; description: string; category: number; category_data: { id: number; title: string; image: string } }) => {
        setSelectedProduct(product);
        setOpen(true);
    };

    const handleClose = () =>{
        setOpen(false);
        setSelectedProduct(null);
    }

    return (
        <Card sx={{display: 'flex'}}>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <Link to={`/home/table/${id}`}>Volver a Categorias</Link>
            <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography variant="h6" component="div">
                        Categorías {idCategory}
                    </Typography>
                </CardContent>
            {/* <List sx={{ width: '100%', maxWidth: 460, bgcolor: 'background.paper' }}>
                {productList.map((product) => (
                    <React.Fragment key={product.id}>
                        <ListItem alignItems='flex-start'>
                            <ListItemAvatar>
                                <Avatar alt={product.title} src={product.image} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={product.title}
                                secondary={<React.Fragment>
                                    <Typography
                                        component='span'
                                        variant='body2'
                                        sx={{ color: 'text.primary', display: 'inline' }}>
                                        {`Precio: $${product.price}`}
                                    </Typography>
                                    {` - ${product.description}`}
                                </React.Fragment>} />
                                <IconButton color="primary" aria-label="add to shopping cart">
                                    <AddShoppingCartIcon />
                                </IconButton>
                        </ListItem>
                        <Divider variant='inset' component='li' />
                    </React.Fragment>
                ))}
            </List> */}
            {productList.map((product) => (

                <Card sx={{ 
                    display: 'flex', 
                    maxWidth: 450, 
                    mb: 2, 
                    boxShadow: 3, 
                    cursor: 'pointer' }} key={product.id}>
                    <CardMedia
                        component="img"
                        height="200"
                        image={product.image}
                        alt={product.title}
                        sx={{ width: 400, height: 277, objectFit: 'cover' }}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography variant="h6">{product.title}</Typography>
                            <Typography variant="subtitle1" color="text.secondary" sx={{textAlign: 'right'}}>
                                ${product.price}
                            </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'flex-start', pl: 1, pb: 1 }}>
                                    <ErrorBoundary>
                                        <RateProducts
                                            rateValue={ 5}
                                        />
                                    </ErrorBoundary>
                                </Box>
                            <Typography variant="body2" sx={{ mt: 1 }}>
                                {product.description}
                            </Typography>
                            <Box pt={5} textAlign="center" pb={-1}>
                                <Button variant="contained" onClick={() => handleClickOpen(product)}>
                                    Ver Detalles
                                </Button>
                            </Box>
                        </CardContent>
                    </Box>
                </Card>
            ))};
            <ProductDetailModal 
            open={open}
            onClose={handleClose}
            product={selectedProduct ? {
                id: selectedProduct.id.toString(),
                name: selectedProduct.title,
                image: selectedProduct.image,
                ingredients: selectedProduct.ingredients || [],
                price: parseFloat(selectedProduct.price),
                calories: 0 // Add a default value or calculate if available
            } : null}
                />
            </Box>
        </Card>
    )
}
