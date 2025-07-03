import React from 'react'
import { OrderProvider } from '../context/OrderContext'
import TableOrdersClients from '../components/TableOrdersClients'
import { useParams } from "react-router-dom";

// Adjust the path as needed


const TableSelected = () => {
  const { tableNumber } = useParams<{ tableNumber: string }>();

  return (
    <OrderProvider>
      <TableOrdersClients params={{
        tableNumber: tableNumber
      }} />
    </OrderProvider>
  )
}

export default TableSelected
