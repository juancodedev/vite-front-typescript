import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
// import { useOrder } from "../context/OrderContext"
import ProductList from "./ProductList"
import Cart from "./Cart"
import CategoryNav from "./CategoryNav"
import { getTableById } from '../actions/table-actions'
import Skeleton from '@mui/material/Skeleton';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { Alert, AlertTitle, Badge, Box, Button, Card, CardContent, CardMedia, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemText, Tab, Tabs, Typography } from '@mui/material';

const items = [
    {
        name: "Ensalada César",
        price: 8.99,
        description: "Lechuga fresca con aderezo César",
    },
    {
        name: "Pasta Alfredo",
        price: 12.99,
        description: "Pasta con salsa Alfredo cremosa",
    },
];
// Tipo para los productos
type Product = {
    id: number
    name: string
    description: string
    price: number
    image: string
    img: string // Added missing property
    category: string
}

export default function TableOrdersClients({ params }: { readonly params: { readonly id: string } }) {
    const [selectedCategory, setSelectedCategory] = useState(0)
    const [cart, setCart] = useState([]);
    const [cartOpen, setCartOpen] = useState(false);

    // const { orderPlaced } = useOrder()
    // type TableData = {
    //     number: number
    //     capacity: number
    // }

    // const [tableData, setTableData] = useState<TableData | null>(null)
    // const [loading, setLoading] = useState(true)
    // const [error, setError] = useState<string | null>(null)

    // useEffect(() => {
    //     const fetchTableData = async () => {
    //         console.log("hola");
    //         console.log(params.id);


    //         try {
    //             setLoading(true)
    //             const table = await getTableById(params.id)

    //             if (table) {
    //                 setTableData(table)
    //                 setError(null)
    //             } else {
    //                 setError("Mesa no encontrada")
    //             }
    //         } catch (err) {
    //             console.error("Error fetching table:", err)
    //             setError("No se pudo cargar la información de la mesa")
    //         } finally {
    //             setLoading(false)
    //         }
    //     }

    //     fetchTableData()
    // }, [params.id])

    // En una aplicación real, estas categorías y productos vendrían de una API o base de datos
    const categories = ["all", "appetizers", "main courses", "desserts", "drinks"]
    const products: Product[] = [
        {
            id: 1,
            name: "Ensalada César",
            description: "Lechuga fresca con aderezo César",
            image: "/placeholder.svg?height=200&width=200",
            img: "/placeholder.svg?height=200&width=200", // Added img property
            category: "appetizers",
            price: 0
        },
        {
            id: 2,
            name: "Pasta Alfredo",
            description: "Pasta con salsa Alfredo cremosa",
            price: 12.99,
            image: "/placeholder.svg?height=200&width=200",
            category: "main courses",
            img: ""
        },
        {
            id: 3,
            name: "Tiramisú",
            description: "Postre italiano clásico",
            price: 6.99,
            image: "/placeholder.svg?height=200&width=200",
            category: "desserts",
            img: ""
        },
        {
            id: 4,
            name: "Limonada",
            description: "Refrescante limonada casera",
            price: 3.99,
            image: "/placeholder.svg?height=200&width=200",
            category: "drinks",
            img: ""
        },
    ]
    const { id: idParam } = useParams();
    const id = Number(idParam);
    console.log("id", id);

    const handleCategoryChange = (event, newValue) => {
        this.setState({ selectedCategory: newValue });
    };
    const filteredProducts =
        selectedCategory === "all" ? products : products.filter((product) => product.category === selectedCategory)

    // if (loading) {
    //     return (
    //         <div className="container mx-auto p-4">
    //             <Skeleton className="h-8 w-64 mb-4" />
    //             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    //                 <div className="md:col-span-2">
    //                     <div className="flex flex-wrap gap-2 mb-4">
    //                         {Array(5)
    //                             .fill(0)
    //                             .map(() => (
    //                                 <Skeleton key="ASD" className="h-10 w-24" />
    //                             ))}
    //                     </div>
    //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //                         {Array(4)
    //                             .fill(0)
    //                             .map(() => (
    //                                 <Skeleton key="pos" className="h-64 w-full" />
    //                             ))}
    //                     </div>
    //                 </div>
    //                 <Skeleton className="h-96 w-full" />
    //             </div>
    //         </div>
    //     )
    // }

    // if (error) {
    //     return (
    //         <div className="container mx-auto p-4">
    //             <Alert severity="error">
    //                 <AlertTitle>Error</AlertTitle>
    //                 {error}
    //             </Alert>
    //         </div>
    //     )
    // }
    // Removed duplicate declaration

    const handleCategoryChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setSelectedCategory(newValue);
    };
    const getFilteredItems = () => {
        const selected = categories[this.state.selectedCategory];
        if (selected === "All") {
            return items;
        }
        return items.filter((item) => item.category === selected);
    };

    const addToCart = (item) => {
        this.setState((prevState) => ({
            cart: [...prevState.cart, item],
        }));
    };
    const toggleCart = () => {
        this.setState((prevState) => ({ cartOpen: !prevState.cartOpen }));
    };
    const filteredItems: Product[] = this.getFilteredItems();
    return (
        // <div className="container mx-auto p-4">
        //     <h1 className="text-2xl font-bold mb-4">
        //         {/* Mesa {tableData?.number ?? "N/A"} - Capacidad: {tableData?.capacity ?? "N/A"} personas */}
        //         Mesa {params.id} - Capacidad: 4 personas
        //     </h1>
        //     {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        //         <div className="md:col-span-2">
        //             <CategoryNav
        //                 categories={categories}
        //                 selectedCategory={selectedCategory}
        //                 onSelectCategory={setSelectedCategory}
        //             />
        //             <ProductList products={filteredProducts} />
        //         </div>
        //         <div>
        //             <Cart tableId={params.id} />
        //         </div>
        //     </div> */}
        // </div>
        <Box p={3}></Box>
            <Box p={3}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" fontWeight="bold">
                        Mesa 17 - Capacidad: 3 personas
                    </Typography>

                    <IconButton color="primary" onClick={toggleCart}>
                        <Badge badgeContent={cart.length} color="error">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                </Box>

                <Tabs
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{ mt: 2 }}
                >
                    {categories.map((category, index) => (
                        <Tab key={index} label={category} />
                    ))}
                </Tabs>

                <Grid container spacing={2} mt={2}>
                    {filteredItems.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card>
                                <CardMedia
                                    sx={{ height: 100, backgroundColor: "#f0f0f0" }}
                                    title={item.name}
                                />
                                <CardContent>
                                    <Typography variant="h6" fontWeight="bold">
                                        {item.name}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary">
                                        ${item.price.toFixed(2)}
                                    </Typography>
                                    <Typography variant="body2" mt={1}>
                                        {item.description}
                                    </Typography>
                                    <Box mt={2}>
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            onClick={() => addToCart(item)}
                                        >
                                            Agregar al carrito
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Carrito */}
                <Drawer
                    anchor="right"
                    open={cartOpen}
                    onClose={toggleCart}
                >
                    <Box p={2} width={300}>
                        <Typography variant="h6" gutterBottom>
                            Carrito de compras
                        </Typography>
                        <Divider />
                        <List>
                            {cart.length === 0 ? (
                                <ListItem>
                                    <ListItemText primary="El carrito está vacío." />
                                </ListItem>
                            ) : (
                                cart.map((item: Product, index: number) => (
                                    <ListItem key={index}>
                                        <ListItemText
                                            primary={item.name}
                                            secondary={`$${item.price.toFixed(2)}`}
                                        />
                                    </ListItem>
                                ))
                            )}
                        </List>
                        {cart.length > 0 && (
                            <Typography mt={2} fontWeight="bold">
                                Total: $
                                {cart
                                    .reduce((acc: number, item: Product) => acc + item.price, 0)
                                    .toFixed(2)}
                            </Typography>
                        )}
                    </Box>
                </Drawer>
            </Box>
    );
}
            )
}

function constructor(props: any) {
    throw new Error("Function not implemented.")
}

// Removed invalid constructor function
