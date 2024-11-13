import React from 'react'

function Navbar({openCart , cartCount}) {
  return (
    <nav className='p-4 bg-gray-600 text-white flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>MY STORE</h1> 
        <button onClick = {openCart} className='bg-black text-white p-4 rounded-lg'>Cart: {cartCount}</button>

    </nav>
  )
}

export default Navbar
