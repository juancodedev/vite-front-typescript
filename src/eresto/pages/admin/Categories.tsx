import { Box, Typography, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import React from 'react'
import { CategoriesList } from '../../components/categories/CategoriesList'

export const Categories = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
            Categorías
            </Typography>
            <div className="flex justify-between items-center" align="right">
                <Button onClick={() => alert('crear mesa')}>Añadir categoria</Button>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Categoria</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    <CategoriesList />
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}
