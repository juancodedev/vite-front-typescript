import React from 'react'

import { useParams } from "react-router-dom";
import {CategoriesList} from './categories/CategoriesList';


const TableOrdersClients = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    // <div>TableOrdersClients -- > : {id}</div>
    <CategoriesList/>
  )
}

export default TableOrdersClients