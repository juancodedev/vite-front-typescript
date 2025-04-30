import { AdminLayout } from './layout';
import { Outlet } from 'react-router-dom';

export const Admin = () => {
    return (
        <AdminLayout>
            <Outlet />
        </AdminLayout>
    );
};
