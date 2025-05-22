import React, { useState, useEffect } from "react"
import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Typography,
    Alert
} from "@mui/material"
import { ErrorOutline as ErrorIcon } from "@mui/icons-material"
import { useNavigate } from "react-router-dom" // ✅ React Router para navegación
import { getTables, type Table } from "../actions/table-actions"

export default function Home() {
    const navigate = useNavigate() // ✅ Reemplazo de useRouter
    const [selectedTable, setSelectedTable] = useState<string>("")
    const [tables, setTables] = useState<Table[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchTables = async () => {
            try {
                setLoading(true)
                const data = await getTables()
                setTables(data)
                setError(null)
            } catch (err) {
                console.error("Error fetching tables:", err)
                setError("No se pudieron cargar las mesas. Por favor, intente de nuevo.")
            } finally {
                setLoading(false)
            }
        }

        fetchTables()
    }, [])

    const handleTableSelect = (event: SelectChangeEvent) => {
        setSelectedTable(event.target.value)
    }

    const handleGoToTable = () => {
        if (selectedTable) {
            navigate(`/table/${selectedTable}`) // ✅ React Router navigation
        }
    }

    const getStatusColor = (status: Table["status"]) => {
        switch (status) {
            case "available":
                return "green"
            case "occupied":
                return "red"
            case "reserved":
                return "orange"
            default:
                return "inherit"
        }
    }

    const getStatusText = (status: Table["status"]) => {
        switch (status) {
            case "available":
                return "Disponible"
            case "occupied":
                return "Ocupada"
            case "reserved":
                return "Reservada"
            default:
                return ""
        }
    }

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh" p={4}>
            <Typography variant="h4" gutterBottom>
                Seleccione una mesa
            </Typography>

            {error && (
                <Alert severity="error" icon={<ErrorIcon />} sx={{ mb: 2, width: '100%', maxWidth: 400 }}>
                    {error}
                </Alert>
            )}

            <Box width="100%" maxWidth={400}>
                {loading ? (
                    <Box display="flex" flexDirection="column" gap={2} alignItems="center">
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        <FormControl fullWidth>
                            <InputLabel id="select-table-label">Seleccionar mesa</InputLabel>
                            <Select
                                labelId="select-table-label"
                                value={selectedTable}
                                label="Seleccionar mesa"
                                onChange={handleTableSelect}
                            >
                                {tables.map((table) => (
                                    <MenuItem
                                        key={table.id}
                                        value={table.id}
                                        disabled={table.status !== "available"}
                                    >
                                        <Box display="flex" justifyContent="space-between" width="100%">
                                            <span>Mesa {table.number}</span>
                                            <span style={{ color: getStatusColor(table.status) }}>
                                                ({getStatusText(table.status)})
                                            </span>
                                        </Box>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button
                            variant="contained"
                            onClick={handleGoToTable}
                            disabled={!selectedTable}
                            sx={{ mt: 2 }}
                            fullWidth
                        >
                            Ir a la mesa
                        </Button>
                    </>
                )}
            </Box>
        </Box>
    )
}
