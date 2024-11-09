'use client'
import { useContextCarrito } from '@/Context/ProviderProducto'
import React, { useContext, useEffect } from 'react'
import Card from './Card';
import AgregarCarrito from '../botones/AgregarCarrito';
export default function ProductList() {

    const {productos, setProductos} = useContextCarrito()

    async function cargarProductos(){
      try {
  
       const res= await fetch(`${process.env.NEXT_PUBLIC_API_URL}/productos`)
       const data= await res.json();
      
       setProductos(data)
  
       console.log(productos)
  
      } catch (error) {
          console.log("Ocurrio un error", error)
      }
    }
  
    useEffect(()=>{
          cargarProductos()
    },[])

    return (
        <div className='container'>
          <div className='row'>
            {
              productos.map((item) => (
                <div className='col-12 col-sm-6 col-md-3 col-lg-3' key={item.IdProducto}>
                  <Card {...item} />
                  <AgregarCarrito {...item} />
                </div>
              ))
            }
          </div>
        </div>
      );
    }