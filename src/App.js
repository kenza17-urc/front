import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Outlet} from 'react-router-dom'; // Import Routes and Outlet from react-router-dom
// pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Search from './pages/Search';
// components
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import useProductHandler from './useProductHandler';
// import dotenv from 'dotenv';
// dotenv.config();

// import Payment from './components/Payment'
// import Completion from './components/Completion'
// import {useEffect, useState} from 'react';
// import {loadStripe} from '@stripe/stripe-js';  

{/* Use Outlet to render nested routes */}
// layout

const Layout = () => {
  return (
    <div className='absolute inset-0 '>
      <Header className=""/>
      <Outlet /> 
      <Footer />
    </div>
  );
};

const App = () => {

  // Pour la synchronisation des produit qui s'y trouve dans strapi 
  // Avec les produit qui s'y trouve dans stripe
  /*
  const products = useProductHandler();
  
  useEffect(() => {
    console.log('Products:', products);
  }, [products]);
*/

  return (
    
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Layout />} // Render Layout component for root path
        >
          <Route index element={<Home />} /> {/* Render Home component for root path */}
          <Route path="/products/:id" element={<Products />} /> {/* Render Products component for /products/:id path */}
          <Route path="/product/:id" element={<ProductDetails />} /> {/* Render ProductDetails component for /product/:id path */}
          <Route path="/search" element={<Search />} /> {/* Render Search component for /search path */}
        </Route>
      </Routes>
    </BrowserRouter>
  
    /*
    <main>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Payment stripePromise={stripePromise} />} />
        <Route path="/completion" element={<Completion stripePromise={stripePromise} />} />
      </Routes>
    </BrowserRouter>
  </main>
  */
);
};

export default App;