import { FC, ReactNode } from "react";
import { Header } from "../../../components";
import { Box } from "@mui/material";

interface Props {
    children: ReactNode;
}

export const AdminLayout: FC<Props>= ({ children }) => {
    return (
        <>
            <Header />
            <Box sx={{ padding: `69` }}>
                {children}

            </Box>
        </>
    );
};
