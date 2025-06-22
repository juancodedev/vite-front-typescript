import React from 'react'
import { useParams, Link } from 'react-router-dom';

export default function TableProducts() {
    const { id, idCategory } = useParams<{ id: string; idCategory: string }>();
    // if (!tableNumber || !idCategory) {
    //     return <div>Error: Missing table number or category ID</div>;
    // }
    return (
        <>
            <Link to={`/home/table/${id}`}>Volver a Categorias</Link>
            <div>Products {idCategory}</div>
        </>
    )
}
