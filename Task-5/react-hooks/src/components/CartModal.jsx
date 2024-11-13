import React from 'react'

function CartModal({closeCart, cartItems, removeFromCart }) {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
        <div className='bg-gray-600 p-4 rounded-lg w-80 shadow-xl'>
            <h2 className='text-xl font-bold text-white mb-4'>Your Cart</h2>
            {
                cartItems.length > 0 ? (
                    <div>
                        {cartItems.map((item) => 
                        <div key = {item.id} className='flex justify-between items-center mb-2'>
                            <img src = {item.image} alt= {item.title} className='w-12 h-12'></img>
                            <div className='text-black'>{item.title}</div>
                            <button onClick = {() => removeFromCart(item.id)}className='text-red-500 hover:text-red-700 hover:underline'>Remove</button>

                        </div>)}
                    </div>

                ) : ( <p className='text-white'>Your Cart is Empty.</p>)
            }

            <button onClick = {closeCart} className='mt-4 mb-4 py-2 bg-black text-white w-full rounded-full'>Close</button>
        </div>
      
    </div>
  )
}

export default CartModal
