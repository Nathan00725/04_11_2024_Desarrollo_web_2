'use client'

import Cart from '@/components/Carrito/Cart'
import { useContextCarrito } from '@/Context/ProviderProducto';
import React, { useEffect, useState } from 'react'


export default function Page() {
  const [totalPagar, setTotalPagar] = useState({
    subTotal: 0,
    ISV: 0,
    TotalPagar: 0,
  });

  const { productoCarrito } = useContextCarrito();

  useEffect(() => {
    calcularTotalPagar();
  }, [productoCarrito]); // Asegúrate que reactualizará cuando cambie el carro

  function calcularTotalPagar() {
    let totalTemporal = {
      subTotal: 0,
      ISV: 0,
      TotalPagar: 0,
    };

    for (let x of productoCarrito) {
      let subTotal = parseFloat(x.PrecioProducto);
      totalTemporal.subTotal += subTotal;

      let isv = parseFloat(x.IsvProducto);
      totalTemporal.ISV += isv;
    }

    totalTemporal.TotalPagar = totalTemporal.subTotal + totalTemporal.ISV;
    setTotalPagar(totalTemporal);
  }

  return (
    <>
      <div>
        <Cart />
      </div>
      <div className="alert alert-success" role="alert">
        El Sub total de la compra es: {totalPagar.subTotal} <br />
        El ISV de la compra es: {totalPagar.ISV} <br />
        El total de la compra es: {totalPagar.TotalPagar} <br />
      </div>
    </>
  );
}
