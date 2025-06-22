import React from 'react'

import { useParams } from "react-router-dom";
import {CategoriesList} from './categories/CategoriesList';


const TableOrdersClients = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <CategoriesList
      tableId = { id ? parseInt(id, 10) : undefined } />
  )
}

export default TableOrdersClients