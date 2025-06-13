import React from 'react'
import { OrderProvider } from '../context/OrderContext'
import TableOrdersClients from '../components/TableOrdersClients'
import { useParams } from "react-router-dom";

// Adjust the path as needed

const TableSelected = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <OrderProvider>
      <TableOrdersClients params={{
        id: id
      }} />
    </OrderProvider>
  )
}

export default TableSelected