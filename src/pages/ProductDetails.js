import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import RelatedProducts from '../components/RelatedProducts';
import { CartContext } from '../context/CartContext';

const ProductDetails = () => {
  const { addToCart } = useContext(CartContext);
  const { id } = useParams();
  const { data } = useFetch(`/products?populate=*&filters[id][$eq]=${id}`);
  const hostApi = process.env.REACT_APP_API_HOST;
  const [messageContent, setMessageContent] = useState('');

  const handleAddMessage = async () => {
    try {
      const messageData = {
        message: messageContent,
        product: id,
      };

      
      const response = await fetch('/product-messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
      });

      
      if (response.ok) {
        alert('Message ajouté avec succès!');
        setMessageContent(''); 
      } else {
        alert("Echec de l'ajout du message.");
      }

    } catch (error) {
      console.error("Erreur lors de l'ajout d un message:", error);
    }
  };

  if (!data) {
    return <div className='container mx-auto'>loading...</div>;
  }

  const categoryTitle = data[0]?.attributes.categories.data[0]?.attributes.title;

  return (
    <div className='mb-16 pt-44 lg:pt-[30px] xl:pt-0'>
      <div className='container mx-auto'>
        <div className='flex flex-col lg:flex-row gap-[30px] mb-[30px]'>
          <div className='flex-1 lg:max-w-[40%] lg:h-[540px] grad rounded-lg flex justify-center items-center'>
            <img
              src={`${hostApi}${data[0]?.attributes.image.data?.attributes.url}`.replace('api/', '')}
              alt=''
              className='w-full max-w-[65%]'
            />
          </div>
          <div className='flex-1 bg-primary p-12 xl:p-20 rounded-lg flex flex-col justify-center'>
            <div className='uppercase text-accent text-lg font-medium mb-2'>
              {data[0]?.attributes.categories.data[0]?.attributes.title}
            </div>
            <h2 className='h2 mb-4'>{data[0]?.attributes.title}</h2>
            <p className='mb-12'>{data[0]?.attributes.description}</p>
            <div className='flex flex-col md:flex-row gap-x-8'>
              <div className='flex flex-col'>
                {/* Message form */}
                <textarea
                  rows='4'
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  placeholder='Entrer votre Message...'
                  className='input'
                />
                <button onClick={handleAddMessage} className='btn btn-accent mt-4'>
                  Ajouter un message
                </button>
              </div>
              <button onClick={() => addToCart(data, id)} className='btn btn-accent mt-4 md:mt-0'>
                Ajouter au panier
              </button>
            </div>
            <div className='text-3xl text-accent font-semibold mt-4'>
              {data[0]?.attributes.price}€
            </div>
          </div>
        </div>
        <RelatedProducts categoryTitle={categoryTitle} />
      </div>
    </div>
  );
};

export default ProductDetails;

