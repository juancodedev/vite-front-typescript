// Tipo para representar una mesa
export type Table = {
    id: string
    number: number
    capacity: number
    status: "available" | "occupied" | "reserved"
}

// Función para obtener todas las mesas
export async function getTables(): Promise<Table[]> {
    // Simulamos un retraso de red
    await new Promise((resolve) => setTimeout(resolve, 500))

    // En una aplicación real, esto vendría de una base de datos
    // Aquí estamos simulando datos de API
    const tables: Table[] = Array.from({ length: 20 }, (_, i) => ({
        id: (i + 1).toString(),
        number: i + 1,
        capacity: Math.floor(Math.random() * 6) + 2, // Entre 2 y 8 personas
        status: ["available", "occupied", "reserved"][Math.floor(Math.random() * 3)] as
            | "available"
            | "occupied"
            | "reserved",
    }))

    return tables
}

// Función para obtener una mesa específica por ID
export async function getTableById(id: string): Promise<Table | null> {
    const tables = await getTables()
    return tables.find((table) => table.id === id) || null
}

