import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
  IconButton,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import Swal from 'sweetalert2';

const initialUsers = Array.from({ length: 15 }).map((_, i) => ({
  id: i + 1,
  email: `usuario${i + 1}@correo.com`,
  nombre: `Nombre${i + 1}`,
  apellido: `Apellido${i + 1}`,
  roles: {
    administrador: i % 2 === 0,
    mesero: i % 3 === 0,
    cajero: i % 4 === 0,
    cocina: i % 5 === 0,
  },
  activo: i % 4 !== 0,
}));

const Users = () => {
  const [users, setUsers] = useState(initialUsers);
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({
    email: '',
    nombre: '',
    apellido: '',
    roles: { administrador: false, mesero: false, cajero: false, cocina: false },
    activo: true,
  });

  const handleOpen = (user = null) => {
    setEditingUser(user);
    setForm(user || {
      email: '',
      nombre: '',
      apellido: '',
      roles: { administrador: false, mesero: false, cajero: false, cocina: false },
      activo: true,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingUser(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSwitchChange = (name) => (e) => {
    if (name === 'activo') {
      setForm({ ...form, activo: e.target.checked });
    } else {
      setForm({
        ...form,
        roles: { ...form.roles, [name]: e.target.checked },
      });
    }
  };

  const handleSubmit = () => {
    if (editingUser) {
      setUsers(users.map((u) => (u.id === editingUser.id ? { ...form, id: editingUser.id } : u)));
    } else {
      setUsers([...users, { ...form, id: users.length + 1 }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        setUsers(users.filter((u) => u.id !== id));
        Swal.fire('¡Eliminado!', 'El usuario ha sido eliminado.', 'success');
      }
    });
  };

  const getRoles = (roles) => {
    return Object.entries(roles)
      .filter(([_, value]) => value)
      .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1))
      .join(', ');
  };

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Administración de Usuarios</Typography>
        <Button variant="contained" onClick={() => handleOpen()}>
          Nuevo Usuario
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Activo</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.nombre} {user.apellido}</TableCell>
                <TableCell>{user.activo ? 'Sí' : 'No'}</TableCell>
                <TableCell>{getRoles(user.roles)}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(user)}><Edit /></IconButton>
                  <IconButton onClick={() => handleDelete(user.id)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{editingUser ? 'Actualizar Usuario' : 'Nuevo Usuario'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            fullWidth
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Nombre"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Apellido"
            name="apellido"
            value={form.apellido}
            onChange={handleChange}
          />
          {['administrador', 'mesero', 'cajero', 'cocina'].map((rol) => (
            <FormControlLabel
              key={rol}
              control={
                <Switch
                  checked={form.roles[rol] || false}
                  onChange={handleSwitchChange(rol)}
                />
              }
              label={rol.charAt(0).toUpperCase() + rol.slice(1)}
            />
          ))}
          <FormControlLabel
            control={
              <Switch
                checked={form.activo}
                onChange={handleSwitchChange('activo')}
              />
            }
            label="Activo"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingUser ? 'Actualizar' : 'Crear'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Users;
