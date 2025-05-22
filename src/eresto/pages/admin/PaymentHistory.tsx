import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  TextField,
  TableSortLabel,
} from '@mui/material';
import { Visibility } from '@mui/icons-material';

const sampleData = Array.from({ length: 35 }).map((_, i) => ({
  id: i + 1,
  mesa: `Mesa ${i % 5 + 1}`,
  total: (Math.random() * 50000 + 10000).toFixed(0),
  tipoPago: ['Efectivo', 'Tarjeta Crédito', 'Tarjeta Débito'][i % 3],
  fechaHora: new Date(Date.now() - i * 3600000).toLocaleString(),
  comensales: Math.floor(Math.random() * 4 + 1),
  detalle: Array.from({ length: Math.floor(Math.random() * 4 + 1) }).map((_, j) => ({
    nombre: `Producto ${j + 1}`,
    precio: (Math.random() * 8000 + 1000).toFixed(0)
  }))
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilized = array.map((el, index) => [el, index]);
  stabilized.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilized.map((el) => el[0]);
}

const PaymentHistory = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState('mesa');

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleOpen = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredData = sampleData.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>
        Historial de Pagos
      </Typography>

      <TextField
        label="Buscar"
        variant="outlined"
        size="small"
        fullWidth
        sx={{ mb: 2 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {['ID', 'mesa', 'total', 'tipoPago', 'fechaHora'].map((headCell) => (
                <TableCell key={headCell}>
                  <TableSortLabel
                    active={orderBy === headCell}
                    direction={orderBy === headCell ? order : 'asc'}
                    onClick={() => handleRequestSort(headCell)}
                  >
                    {headCell.charAt(0).toUpperCase() + headCell.slice(1)}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(filteredData, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.mesa}</TableCell>
                  <TableCell>${row.total}</TableCell>
                  <TableCell>{row.tipoPago}</TableCell>
                  <TableCell>{row.fechaHora}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpen(row)}>
                      <Visibility />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 15, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Pedidos de {selectedRow?.mesa}</DialogTitle>
        <DialogContent>
          {selectedRow?.productos?.map((producto) => (
            <Box key={producto.nombre} display="flex" justifyContent="space-between" my={1}>
              <Typography>{producto.nombre}</Typography>
              <Typography>${producto.precio}</Typography>
            </Box>
          ))}
          <Box mt={2}>
            <Typography><strong>Total:</strong> ${selectedRow?.total}</Typography>
            <Typography><strong>Tipo de pago:</strong> {selectedRow?.tipoPago}</Typography>
            <Typography><strong>Comensales:</strong> {selectedRow?.comensales}</Typography>
            <Typography><strong>Fecha/Hora:</strong> {selectedRow?.fechaHora}</Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default PaymentHistory;
