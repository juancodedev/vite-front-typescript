import React from 'react'
import {
    DataGrid,
    GridToolbar,
} from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import Tooltip from '@mui/material/Tooltip';
import FilterListIcon from '@mui/icons-material/FilterList';
import IconButton from '@mui/material/IconButton';

const VISIBLE_FIELDS = ['name', 'rating', 'country', 'dateCreated', 'isAdmin'];

declare module '@mui/x-data-grid' {
    interface GridToolbarPropsOverrides {
        setFilterButtonEl: React.Dispatch<
            React.SetStateAction<HTMLButtonElement | null>
        >;
    }
}

export function CustomToolbar() {
    return (
        <GridToolbar>
            <Tooltip title="Filters">
                <IconButton 
                    // ref can be removed or replaced with another implementation if needed
                    onClick={() => {
                        // The filter panel will be opened via the slotProps.panel.target setting
                    }}
                >
                    <FilterListIcon fontSize="small" />
                </IconButton>
            </Tooltip>
        </GridToolbar>
    );
}

export const CategoriesList = () => {
    const { data, loading } = useDemoData({
        dataSet: 'Employee',
        visibleFields: VISIBLE_FIELDS,
        rowLength: 100,
    });

    const [filterButtonEl] = React.useState<HTMLButtonElement | null>(null);
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                {...data}
                loading={loading}
                slots={{
                    toolbar: CustomToolbar
                }}
                slotProps={{
                    panel: {
                        target: filterButtonEl,
                    },
                }}
            />
        </div>
    )
}
