import { useState } from "react";

// --- Types ---
export interface Table {
    id: number;
    number: number;
    status: "available" | "occupied" | "reserved";
}

export interface UseTableResult {
    loading: boolean;
    error: Error | null;
    tables: Table[] | null;
    table: Table | null;
    getTables: () => Promise<void>;
    addTable: (data: Omit<Table, "id">) => Promise<void>;
    updateTable: (id: number, data: Partial<Table>) => Promise<void>;
    deleteTable: (id: number) => Promise<void>;
    getTable: (idTable: number) => Promise<void>;
    isExistTable: (tableNumber: number) => Promise<boolean | undefined>;
    getTableByNumber: (tableNumber: number) => Promise<Table | null | undefined>;
}

// --- Dummy Data ---
const dummyTables: Table[] = [
    { id: 1, number: 1, status: "available" },
    { id: 2, number: 2, status: "occupied" },
    { id: 3, number: 3, status: "reserved" },
];

export function useTable(): UseTableResult {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [tables, setTables] = useState<Table[] | null>(dummyTables);
    const [table, setTable] = useState<Table | null>(null);

    const simulateDelay = <T,>(result: T, delay = 500): Promise<T> =>
        new Promise((resolve) => setTimeout(() => resolve(result), delay));

    const getTables = async (): Promise<void> => {
        try {
            setLoading(true);
            const response = await simulateDelay(dummyTables);
            setTables(response);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    const addTable = async (data: Omit<Table, "id">): Promise<void> => {
        try {
            setLoading(true);
            const newTable: Table = { id: Date.now(), ...data };
            const updated = [...(tables || []), newTable];
            await simulateDelay(null);
            setTables(updated);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    const updateTable = async (
        id: number,
        data: Partial<Table>
    ): Promise<void> => {
        try {
            setLoading(true);
            const updated = (tables || []).map((item) =>
                item.id === id ? { ...item, ...data } : item
            );
            await simulateDelay(null);
            setTables(updated);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    const deleteTable = async (id: number): Promise<void> => {
        try {
            setLoading(true);
            const filtered = (tables || []).filter((item) => item.id !== id);
            await simulateDelay(null);
            setTables(filtered);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    const getTable = async (idTable: number): Promise<void> => {
        try {
            setLoading(true);
            const result = (tables || []).find((item) => item.id === idTable) || null;
            await simulateDelay(null);
            setTable(result);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    const isExistTable = async (
        tableNumber: number
    ): Promise<boolean | undefined> => {
        try {
            const exists = (tables || []).some(
                (item) => item.number === tableNumber
            );
            return exists;
        } catch (err) {
            setError(err as Error);
        }
    };

    const getTableByNumber = async (
        tableNumber: number
    ): Promise<Table | null | undefined> => {
        try {
            const result =
                (tables || []).find((item) => item.number === tableNumber) || null;
            return result;
        } catch (err) {
            setError(err as Error);
        }
    };

    return {
        loading,
        error,
        tables,
        table,
        getTables,
        addTable,
        updateTable,
        deleteTable,
        getTable,
        isExistTable,
        getTableByNumber,
    };
}
