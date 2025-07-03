import * as React from 'react';
import { SnackbarCloseReason,Snackbar,  Alert } from '@mui/material';

interface AddToCartSnackbarProps {
    open: boolean;
    onClose: (
        event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason
    ) => void;
    productName: string;
}
const AddToCartSnackbar: React.FC<AddToCartSnackbarProps> = ({
    open,
    onClose,
    productName
}) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={onClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <Alert onClose={onClose} severity="success" sx={{ width: '100%' }} variant="filled">
                {productName} agregado al carrito
            </Alert>
        </Snackbar>
    );
};

export default AddToCartSnackbar;