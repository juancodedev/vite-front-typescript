// import React from 'react'
// import {
//     DataGrid,
//     GridToolbar,
// } from '@mui/x-data-grid';
// import { useDemoData } from '@mui/x-data-grid-generator';
// import Tooltip from '@mui/material/Tooltip';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import IconButton from '@mui/material/IconButton';

// const VISIBLE_FIELDS = ['name', 'rating', 'country', 'dateCreated', 'isAdmin'];

// declare module '@mui/x-data-grid' {
//     interface GridToolbarPropsOverrides {
//         setFilterButtonEl: React.Dispatch<
//             React.SetStateAction<HTMLButtonElement | null>
//         >;
//     }
// }

// export function CustomToolbar() {
//     return (
//         <GridToolbar>
//             <Tooltip title="Filters">
//                 <IconButton 
//                     // ref can be removed or replaced with another implementation if needed
//                     onClick={() => {
//                         // The filter panel will be opened via the slotProps.panel.target setting
//                     }}
//                 >
//                     <FilterListIcon fontSize="small" />
//                 </IconButton>
//             </Tooltip>
//         </GridToolbar>
//     );
// }

// export const CategoriesList = () => {
//     const { data, loading } = useDemoData({
//         dataSet: 'Employee',
//         visibleFields: VISIBLE_FIELDS,
//         rowLength: 100,
//     });

//     const [filterButtonEl] = React.useState<HTMLButtonElement | null>(null);
//     return (
//         <div style={{ height: 400, width: '100%' }}>
//             <DataGrid
//                 {...data}
//                 loading={loading}
//                 slots={{
//                     toolbar: CustomToolbar
//                 }}
//                 slotProps={{
//                     panel: {
//                         target: filterButtonEl,
//                     },
//                 }}
//             />
//         </div>
//     )
// }
import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';

const categories = [
    { id: 1, name: 'Bebidas',
        image: 'https://picsum.photos/200/300?random=1'
    },
    { id: 2, name: 'Comidas',
        image: 'https://picsum.photos/200/300?random=2'
    },
    { id: 3, name: 'Postres',
        image: 'https://picsum.photos/200/300?random=3'
    },
    { id: 4, name: 'Aperitivos',
        image: 'https://picsum.photos/200/300?random=4'
    },
    { id: 5, name: 'Ensaladas',
        image: 'https://picsum.photos/200/300?random=5'
    },
    { id: 6, name: 'Sopas',
        image: 'https://picsum.photos/200/300?random=6'
    },
    { id: 7, name: 'Pizzas',
        image: 'https://picsum.photos/200/300?random=7'
    },
    { id: 8, name: 'Pastas',
        image: 'https://picsum.photos/200/300?random=8'
    }
];


export const CategoriesList = () => {
    return (
    <Box sx={{ maxWidth: 400, margin: 'auto', mt: 2 }}>
        <Typography variant='h6' sx={{ mb: 2 }}>Categorias</Typography>
        {categories.map(category => ((category, index)=> (
            <Card key={index} sx={{ display: 'flex', mb: 2, boxShadow: 3 }}>
                <CardMedia
                    component="img"
                    sx={{ width: 130, height: 150 }}
                    image={category.image}
                    alt={category.name}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding: 2 }}>
                    <Typography variant="subtitle1">{category.name}</Typography>
                </Box>
                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography variant="body2" color="text.secondary">
                            {category.name}
                            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </Typography>
                    </CardContent>
                </Box>
                {/* <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1">{category.name}</Typography>
                </CardContent> */}
            </Card>
        ))(category, categories.indexOf(category))
        )}
    </Box>
    )
}

