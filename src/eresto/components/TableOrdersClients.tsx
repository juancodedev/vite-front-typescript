import React from 'react'
import { useParams } from "react-router-dom";


const TableOrdersClients = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <div>TableOrdersClients -- > : {id}</div>
  )
}

export default TableOrdersClients