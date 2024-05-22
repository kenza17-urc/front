import React, { useContext } from 'react';
// icons
import { IoArrowForward, IoCartOutline, IoClose } from 'react-icons/io5';
// context
import { CartContext } from '../context/CartContext';
// components
import CartItem from '../components/CartItem';
import { loadStripe } from '@stripe/stripe-js';
import { request } from '../request';

const stripePromise = loadStripe('pk_live_51Ljir7IKsjbCfwtZocb2FvoWZKg4do8FSN3nQmR4bxnuaEt02bvKHk05pOaYytOEcIacMuJFHaxfLz1WpWqrw0nQ00OeSbl7vS');

const Cart = () => {

  const { setIsOpen, cart, total, clearCart } = useContext(CartContext);

  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;
      const res = await request.post('/orders', {
        cart,
      });

      console.log(' RE DIRECT TO CHECK OUT ')
     
      await stripe.redirectToCheckout({
        sessionId: res.data.stripeSession.id,
      }).then(function (result) {
        if (result.error) {
          // Handle error here
        }
      });
      
    } 
    catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='w-full h-full px-4 text-white'>
      <div className='overflow-y-auto overflow-x-hidden h-[75vh]'>
        {/* close icon */}
        <div
          onClick={() => setIsOpen(false)}
          className='text-4xl w-20 h-[98px] flex justify-start items-center cursor-pointer'
        >
          <IoClose />
        </div>
        <div className='flex flex-col gap-y-10 px-2'>
          {cart.map((item) => {
            return <CartItem item={item} key={item.id} />;
          })}
        </div>
      </div>
      {/* subtotal & total */}
      {cart.length >= 1 && (
        <div className='px-6 py-10 flex flex-col'>
          {/* subtotal */}
          <div className='flex justify-between text-lg'>
            <div>Sous-total</div>
            <div>{total}€ </div>
          </div>
          {/* total */}
          <div className='flex justify-between text-2xl'>
            <div>Totale</div>
            <div>{total}€ </div>
          </div>
        </div>
      )}

      {/* buttons */}
      <div className='px-6'>
        {cart.length >= 1 ? (
          <div className='flex justify-between gap-x-4'>
            <button
              onClick={clearCart}
              className='btn btn-accent hover:bg-accent-hover text-primary'
            >
              Effacer le panier
            </button>
            <button
              onClick={handlePayment}
              className='btn btn-accent hover:bg-accent-hover text-primary flex-1 px-2 gap-x-2'
            >
              Payer
              <IoArrowForward className='text-lg' />
            </button>
          </div>
        ) : (
          <div className='h-full absolute top-0 right-0 left-0 flex justify-center items-center -z-10 flex-col text-white/30'>
            <div className='text-2xl'> Votre panier est vide </div>
            <div className='text-6xl'>
              <IoCartOutline />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
