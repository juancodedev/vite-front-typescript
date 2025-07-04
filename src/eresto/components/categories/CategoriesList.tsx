import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';

import { useLocation, useNavigate } from 'react-router-dom';

const categories = [
    {
        id: 1, name: 'Bebidas',
        image: 'https://picsum.photos/200/300?random=1'
    },
    {
        id: 2, name: 'Comidas',
        image: 'https://picsum.photos/200/300?random=2'
    },
    {
        id: 3, name: 'Postres',
        image: 'https://picsum.photos/200/300?random=3'
    },
    {
        id: 4, name: 'Aperitivos',
        image: 'https://picsum.photos/200/300?random=4'
    },
    {
        id: 5, name: 'Ensaladas',
        image: 'https://picsum.photos/200/300?random=5'
    },
    {
        id: 6, name: 'Sopas',
        image: 'https://picsum.photos/200/300?random=6'
    },
    {
        id: 7, name: 'Pizzas',
        image: 'https://picsum.photos/200/300?random=7'
    },
    {
        id: 8, name: 'Pastas',
        image: 'https://picsum.photos/200/300?random=8'
    }
];

interface Category {
    id: number;
    name: string;
    image: string;
}

interface CategoriesListProps {
    tableId?: number;
}

export const CategoriesList = (props: CategoriesListProps) => {
    const id: string = props.tableId ? props.tableId.toString() : 'N/A'; // Provide a fallback value if tableId is undefined
    const location = useLocation();
    const navigate = useNavigate();

    const goToCategory = (category: Category) => {
        console.log(`${location.pathname}/${category.id}`);
        navigate(`${location.pathname}/${category.id}`);
    }    

    return (
        <Card sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography variant="h6" component="div">
                        Categorías de la mesa {id}
                    </Typography>
                </CardContent>
                {categories.map((category: Category) => (
                    <Card
                        key={category.id} 
                        sx={{ 
                            display: 'flex', 
                            mb: 2,
                            boxShadow: 3,
                            cursor: 'pointer' }}
                        onClick={() => {
                            goToCategory(category);
                        }}
                    >
                        <CardMedia
                            component="img"
                            sx={{ width: 130, height: 150 }}
                            image={category.image}
                            alt={category.name}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h6">
                                    {category.name}
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    component="div"
                                    sx={{ color: 'text.secondary' }}
                                >
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ac ante massa. Suspendisse ultricies...
                                </Typography>
                            </CardContent>

                        </Box>
                    </Card>
                ))}
            </Box>
        </Card>
    )
}