import React from 'react';
import { Link } from 'react-router-dom';

const hostApi = process.env.REACT_APP_API_HOST
// console.log( ' HOST API -> ', hostApi)

const Product = ({ product }) => {
  
  return (
    <Link to={`/product/${product.id}`}>
      <div className='grad w-full h-[362px] rounded-[8px] overflow-hidden relative group'>
        {/* badge */}
        {product?.attributes.isNew ? (
          <div className='absolute bg-accent text-primary text-[12px] font-extrabold uppercase top-4 right-4 px-2 rounded-full z-10'>
            nouveau
          </div>
        ) : (
          ''
        )}
       
        <div className='w-full h-[200px] flex items-center justify-center relative'>
          <img
            className='w-[160px] h-[160px] group-hover:scale-90 transition-all'
            // Rendre l'url Dynamique Pour le déploiement 
            // http://localhost:1337
            src={`${hostApi}${product?.attributes.image.data?.attributes.url}`.replace('api/',"")}
            alt=''
          />
        </div>
     
        <div className='px-6 pb-8 flex flex-col'>    
          <div className='text-sm text-accent capitalize mb-2'>
            {product?.attributes.categories.data[0]?.attributes.title}
          </div>
        
          <div className='text-[15px] mb-4 lg:mb-9'>
            {product?.attributes.title.substring(0, 35)}...
          </div>
         
          <div className='text-lg text-accent'>{product?.attributes.price}€</div>
        </div>
      </div>
    </Link>
  );
};

export default Product;