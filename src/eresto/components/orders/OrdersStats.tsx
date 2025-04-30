import React from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PendingIcon from '@mui/icons-material/Pending';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { OrderStats } from '../../types/order';

interface StatsCardProps {
    title: string;
    value: number;
    icon: React.ReactNode;
    color: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, color }) => (
    <Card>
        <CardContent>
            <Grid container spacing={3}>
                <Grid item={true}>
                    <Typography color="textSecondary" variant="overline">
                        {title}
                    </Typography>
                    <Typography variant="h4">{value}</Typography>
                </Grid>
                <Grid item>
                    <Box sx={{ color, height: 54, width: 54 }}>
                        {icon}
                    </Box>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
);

interface OrdersStatsProps {
    stats: OrderStats;
}

const OrdersStats: React.FC<OrdersStatsProps> = ({ stats }) => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
                <StatsCard
                    title="TOTAL ÓRDENES"
                    value={stats.total}
                    icon={<TrendingUpIcon sx={{ fontSize: 40 }} />}
                    color="#14B8A6"
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <StatsCard
                    title="PENDIENTES"
                    value={stats.pending}
                    icon={<PendingIcon sx={{ fontSize: 40 }} />}
                    color="#FFB020"
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <StatsCard
                    title="COMPLETADAS"
                    value={stats.completed}
                    icon={<CheckCircleIcon sx={{ fontSize: 40 }} />}
                    color="#14B8A6"
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <StatsCard
                    title="CANCELADAS"
                    value={stats.cancelled}
                    icon={<CancelIcon sx={{ fontSize: 40 }} />}
                    color="#D14343"
                />
            </Grid>
        </Grid>
    );
};

export default OrdersStats;