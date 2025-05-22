import React, { useState } from 'react';
import {
    Box,
    Button,
    Typography,
    TextField,
    Divider,
    Link,
    Stack,
    Paper,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

const Login = () => {
    const [usuario, setUsuario] = useState('juanshocl');
    const [password, setPassword] = useState('1234567890');

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Iniciar sesión con:', { usuario, password });
    };

    return (
        <Box

            justifyContent="center"
            alignItems="center"
            height="100vh"
            bgcolor="#f5f5f5"
        >
            <Paper elevation={3} sx={{ p: 4, width: 400 }}>
                <form onSubmit={handleLogin}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        iCard Admin
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Inicia sesión para acceder al sistema
                    </Typography>

                    <Stack spacing={2} mt={2}>
                        <TextField
                            label="Usuario"
                            fullWidth
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                        />
                        <TextField
                            label="Contraseña"
                            type="password"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Link href="#" underline="hover">
                            ¿Olvidaste tu contraseña?
                        </Link>
                        <Button type="submit" variant="contained" fullWidth>
                            Iniciar Sesión
                        </Button>
                    </Stack>

                    <Typography variant="caption" display="block" mt={2}>
                        Al hacer clic en continuar, aceptas nuestros Términos de Servicio y
                        Política de Privacidad.
                    </Typography>

                    <Divider sx={{ my: 2 }}>O CONTINÚA CON</Divider>

                    <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<GoogleIcon />}
                        sx={{ textTransform: 'none' }}
                    >
                        Iniciar sesión con Google
                    </Button>

                    <Typography variant="body2" mt={2} textAlign="center">
                        ¿No tienes una cuenta? <Link href="#">Regístrate</Link>
                    </Typography>
                </form>
            </Paper>
        </Box>
    );
};

export default Login;
