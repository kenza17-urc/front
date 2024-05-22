import { useState, useEffect } from 'react';
import useFetch from './hooks/useFetch';
import Stripe from 'stripe';

const key = process.env.REACT_APP_AP_STRIP_SECRET;
const authToken = process.env.REACT_APP_API_TOKEN;
const stripe = new Stripe(key);

function useProductHandler() {
  const { data: productsDataStrapi, error: fetchError } = useFetch('http://localhost:1337/api/products');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function handleProducts() {
      if (!productsDataStrapi) {
        throw new Error(`No data fetched from Strapi!`);
      }

      // console.log('PRODUCT DATA', productsDataStrapi);
      setProducts(productsDataStrapi);

      for (const product of productsDataStrapi) {

        if (!product.attributes.title) {
          console.error(` Product without title detected, skipping: `, product);
          continue;
        }

        // Récupération la liste des strip_product_id depuis la Table product
        const prices = await stripe.prices.list({ product: product.strip_product_id });
        //
        const productsData_STRIPE = await stripe.products.list({
          active: true,
          limit: 60, // You may need to handle pagination if you have more than 100 products
        });

        // Suppression des Espace qui s'y trouve dans le Nom => Objectif avoir une comparaison Strict 
        const matchingProduct = productsData_STRIPE.data.find(STRIPE_Product => STRIPE_Product.name.replace(/\s/g, '') === product.attributes.title.replace(/\s/g, ''));
        
        // Find a price that matches the Strapi product's price_id
        const matchingPrice = prices.data.find(
          stripePrice => stripePrice.id === product.attributes.price_id
        );

        let STRIPE_ProductId;

        if (!matchingProduct && !matchingPrice) {

          const STRIPE_Product = await stripe.products.create({
            name: product.attributes.title,
            description: product.attributes.description,
            // images: [product.attributes.image],
          });

          const stripePrice = await stripe.prices.create({
            unit_amount: product.attributes.price * 100, // Stripe uses cents, not dollars
            currency: 'EUR',
            product: STRIPE_Product.id,
          }); 

          console.log(`Product created successfully: ${stripePrice.price_id}`);
          STRIPE_ProductId = stripePrice.id;
          
        } 
        else {
          console.log(`Product already exists: ${matchingProduct.price_id}`);

          // Fetch the prices for the existing product
          const prices = await stripe.prices.list({ product: STRIPE_ProductId });

          // Check if there's at least one price for this product
          if (prices.data.length > 0) {
            STRIPE_ProductId = prices.data[0].id;
        }
      }
        // Updating the Strapi product with the Stripe product ID
        const response = await fetch(`http://localhost:1337/api/products/${product.id}`, {
          method: 'PUT',
          authorization: 'bearer ' + process.env.REACT_APP_API_TOKEN,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            data: {
                strip_product_id: STRIPE_ProductId,
            },
        }),
        });

        if (!response.ok) {
          console.error(`Failed to update Strapi product: ${product.id}`);
        } else {
          console.log(`Strapi product updated successfully: ${product.id}`);
        }
      }
    }

    if(productsDataStrapi){
      handleProducts().catch(err => console.error('Unhandled Error:', err));
    } else if(fetchError) {
      console.error('Fetch Error:', fetchError);
    }
  }, [productsDataStrapi, fetchError]);

  return products;
}

export default useProductHandler;

/*
import { useState, useEffect } from 'react';
import useFetch from './hooks/useFetch';
import Stripe from 'stripe';

const key = process.env.REACT_APP_AP_STRIP_SECRET;
console.log('KEY ----- ', key);

const stripe = new Stripe(key);

function useProductHandler() {
  const { data: productsData, error: fetchError } = useFetch('http://localhost:1337/api/products');
  const [products, setProducts] = useState([]);

  async function deleteAllProducts() {
    let productList = await stripe.products.list();
    let products = productList.data;

    for (let product of products) {
      try {
        await stripe.products.del(product.id);
        console.log(`Product ${product.id} deleted successfully.`);
      } catch (err) {
        console.error(`Failed to delete product ${product.id}:`, err);
      }
    }
  }

  useEffect(() => {
    async function handleProducts() {
      // Add your product handling logic here
    }

    if (productsData) {
      deleteAllProducts().catch(err => console.error('Failed to delete all products:', err));
      handleProducts().catch(err => console.error('Unhandled Error:', err));
    } else if (fetchError) {
      console.error('Fetch Error:', fetchError);
    }
  }, [productsData, fetchError]);

  return products;
}

export default useProductHandler;
*/