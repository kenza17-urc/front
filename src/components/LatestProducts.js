import React from 'react';
// components
import ProductSlider from '../components/ProductSlider';
// useFetch hook
import useFetch from '../hooks/useFetch.js';

const LatestProducts = () => {
  // get new products
  const { data } = useFetch('/products?populate=*&filters[isNew]=true');
  return (
    <div className='mb-16'>
      <div className='container mx-auto'>
        <h2 className='h2 mb-6 text-center xl:text-left'>Derniers produits</h2>
      </div>
      <ProductSlider data={data} />
    </div>
  );
};

export default LatestProducts;
