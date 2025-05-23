import { useState } from "react";
import {
    Box,
    Button,
    Typography,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from "@mui/material";
import React from "react";

const mesas = [
    { id: 1, label: "Mesa 1" },
    { id: 2, label: "Mesa 2" },
    { id: 3, label: "Mesa 3" },
    { id: 4, label: "Mesa 4" },
];

const Home = ({ onSelect }: { onSelect: (id: number) => void }) => {
    const [mesaSeleccionada, setMesaSeleccionada] = useState("");

    const handleChange = (event: React.ChangeEvent<{ target: { value: unknown } }>) => {
        setMesaSeleccionada(event.target.value as string);
    };

    const handleIrMesa = () => {
        if (mesaSeleccionada) {
            onSelect(parseInt(mesaSeleccionada));
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
        >
            <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
                textAlign="center"
            >
                Seleccione una mesa
            </Typography>

            <FormControl sx={{ width: 250, mb: 3 }}>
                <InputLabel id="mesa-label">Seleccionar mesa</InputLabel>
                <Select
                    labelId="mesa-label"
                    value={mesaSeleccionada}
                    label="Seleccionar mesa"
                    onChange={handleChange}
                    size="medium"
                >
                    {mesas.map((mesa) => (
                        <MenuItem key={mesa.id} value={mesa.id}>
                            {mesa.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button
                variant="contained"
                color="primary"
                disabled={!mesaSeleccionada}
                onClick={handleIrMesa}
                sx={{
                    width: 250,
                    borderRadius: 2,
                    fontWeight: "bold",
                    backgroundColor: !mesaSeleccionada ? "#90959F" : "#000000",
                    color: "white",
                    "&:hover": {
                        backgroundColor: "#333333",
                    },
                }}
            >
                Ir a la mesa
            </Button>
        </Box>
    );
}

export default Home;
