import React from 'react'
import { OrderProvider } from '../context/OrderContext'
import TableOrdersClients from '../components/TableOrdersClients'
// Adjust the path as needed

const TableSelected = () => {
  return (
    <OrderProvider>
      <TableOrdersClients params={{
        id: ''
      }} />
    </OrderProvider>
  )
}

export default TableSelected