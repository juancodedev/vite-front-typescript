// Requisitos: React 19 y Material UI v7.1.5
import React, { useState } from 'react';
import {
    Box, Button, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle,
    FormControl, InputLabel, MenuItem, Select, Switch, Table, TableBody,
    TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField,
    Typography, IconButton, Tooltip
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

// Datos de ejemplo
const categories = ['Bebidas', 'Postres', 'Cafetería'];
const generateProducts = () =>
    Array.from({ length: 35 }, (_, i) => ({
        id: i + 1,
        name: `Producto ${i + 1}`,
        price: (Math.random() * 10000).toFixed(0),
        category: categories[i % categories.length],
        active: Math.random() > 0.5,
        image: 'https://via.placeholder.com/80x50'
    }));

const Products = () => {
    const [products, setProducts] = useState(generateProducts());
    const [openModal, setOpenModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage] = useState(15);
    const [sortBy, setSortBy] = useState('name');

    const handleEdit = (product) => {
        setEditingProduct(product);
        setOpenModal(true);
    };

    const handleDelete = (product) => {
        MySwal.fire({
            title: `¿Eliminar "${product.name}"?`,
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                setProducts((prev) => prev.filter((p) => p.id !== product.id));
            }
        });
    };

    const handleSave = () => {
        if (editingProduct.id) {
            setProducts((prev) =>
                prev.map((p) => (p.id === editingProduct.id ? editingProduct : p))
            );
        } else {
            setProducts((prev) => [
                ...prev,
                { ...editingProduct, id: Date.now(), image: 'https://via.placeholder.com/80x50' }
            ]);
        }
        setOpenModal(false);
    };

    const filtered = products.filter((p) =>
        [p.name, p.category, p.price.toString()].some((val) =>
            val.toLowerCase().includes(search.toLowerCase())
        )
    );

    const sorted = [...filtered].sort((a, b) => {
        if (sortBy === 'price') return Number(a.price) - Number(b.price);
        return a[sortBy].localeCompare(b[sortBy]);
    });

    return (
        <Box p={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <TextField
                    label="Buscar producto"
                    variant="outlined"
                    size="small"
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button variant="contained" startIcon={<Add />} onClick={() => {
                    setEditingProduct({ name: '', price: '', category: '', active: true });
                    setOpenModal(true);
                }}>
                    Crear Producto
                </Button>
            </Box>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Imagen</TableCell>
                            <TableCell onClick={() => setSortBy('name')}>Producto</TableCell>
                            <TableCell onClick={() => setSortBy('price')}>Precio</TableCell>
                            <TableCell onClick={() => setSortBy('category')}>Categoría</TableCell>
                            <TableCell>Activo</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sorted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>
                                    <CardMedia
                                        component="img"
                                        image={product.image}
                                        alt={product.name}
                                        sx={{ width: 80, height: 50 }}
                                    />
                                </TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>${product.price}</TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell>
                                    <Switch checked={product.active} disabled />
                                </TableCell>
                                <TableCell>
                                    <Tooltip title="Editar">
                                        <IconButton onClick={() => handleEdit(product)}><Edit /></IconButton>
                                    </Tooltip>
                                    <Tooltip title="Eliminar">
                                        <IconButton onClick={() => handleDelete(product)}><Delete /></IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[15]}
                component="div"
                count={filtered.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(e, newPage) => setPage(newPage)}
            />

            {/* Modal */}
            <Dialog open={openModal} onClose={() => setOpenModal(false)}>
                <DialogTitle>{editingProduct?.id ? 'Actualizar Producto' : 'Crear Producto'}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Nombre del producto"
                        fullWidth
                        margin="normal"
                        value={editingProduct?.name ?? ''}
                        onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    />
                    <TextField
                        label="Precio"
                        type="number"
                        fullWidth
                        margin="normal"
                        value={editingProduct?.price ?? ''}
                        onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Categoría</InputLabel>
                        <Select
                            value={editingProduct?.category ?? ''}
                            onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                            label="Categoría"
                        >
                            {categories.map((cat) => (
                                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Box display="flex" alignItems="center" mt={2}>
                        <Typography variant="body2" mr={2}>Activo</Typography>
                        <Switch
                            checked={editingProduct?.active ?? false}
                            onChange={(e) => setEditingProduct({ ...editingProduct, active: e.target.checked })}
                        />
                    </Box>
                    <Button component="label" variant="outlined" sx={{ mt: 2 }}>
                        Cambiar Imagen
                        <input 
                            hidden 
                            type="file" 
                            accept="image/*" 
                        />
                    </Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenModal(false)}>Cancelar</Button>
                    <Button variant="contained" onClick={handleSave}>Actualizar</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default Products;