import React from 'react'
import {CategoriesList} from './categories/CategoriesList';

interface TableOrdersClientsProps {
  params: {
    tableNumber: string | undefined;
  };
}

const TableOrdersClients: React.FC<TableOrdersClientsProps> = ({ params }) => {
const tableNumber = params.tableNumber;

  
  return (
    <CategoriesList
      tableId = { tableNumber ? parseInt(tableNumber, 10) : undefined } />
  )
}

export default TableOrdersClients