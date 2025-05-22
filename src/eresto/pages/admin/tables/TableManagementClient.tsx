import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Stack, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import QrCode2Icon from '@mui/icons-material/QrCode2';

function createData(
    table: string,
    actions: React.ReactNode
) {
    return { table, actions };
}

const rows = [
    createData('1',
        <Stack direction="row" spacing={2}>
            <Button variant="outlined" color="primary" onClick={() => alert('Editar Mesa 1')}><EditIcon /></Button>
            <Button variant="contained" color="error" onClick={() => alert('Eliminar Mesa 1')}><DeleteIcon /></Button>
            <Button variant="contained" color="secondary" onClick={() => alert('Eliminar Mesa 1')}><QrCode2Icon /></Button>
        </Stack>
    ),
    createData('2',
        <Stack direction="row" spacing={2}>
            <Button variant="outlined" color="primary" onClick={() => alert('Editar Mesa 2')}><EditIcon /></Button>
            <Button variant="contained" color="error" onClick={() => alert('Eliminar Mesa 2')}><DeleteIcon /></Button>
            <Button variant="contained" color="secondary" onClick={() => alert('Eliminar Mesa 2')}><QrCode2Icon /></Button>
        </Stack>
    ),
];

const TableManagementClient = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
                Gestión de Mesas
            </Typography>
            <div className="flex justify-between items-center" align="right">
                <Button onClick={() => alert('crear mesa')}>Añadir mesa</Button>
            </div>
            <Stack spacing={3} sx={{ mb: 3 }}>
                <Typography variant="h6">
                    Aqui puedes gestionar la creacion, habilitacion de mesas para tu local
                </Typography>
            </Stack>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Table</TableCell>
                            <TableCell align="right">actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.table}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    Mesa {row.table}
                                </TableCell>
                                <TableCell align="right">{row.actions}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default TableManagementClient