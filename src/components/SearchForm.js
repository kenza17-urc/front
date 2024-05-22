import React, { useEffect, useState } from 'react';
// icons
import { FiSearch } from 'react-icons/fi';
// useNavigate hook
import { useNavigate } from 'react-router-dom';

const SearchForm = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
    // clear timeout event
    return () => clearTimeout(timeout);
  });

  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.length > 0) {
      navigate(`/search?query=${searchTerm}`);
      document.querySelector('input').value = '';
      setSearchTerm('');
    } else {
      // if input is empty set animation to true
      setIsAnimating(true);
    }
  };

  // w-full mx-4 lg:mx-0 lg:w-1/2 xl:w-1/3 mx-auto`}
    return (
 
      <form
      onSubmit={handleSubmit}
      className={`${
        isAnimating ? 'animate-shake' : 'animate-none'
      }  relative sm:w-1/2 lg:w-full m-0`}
    >
      <input
        onChange={handleSearchInput}
        className='input text-sm m-0'
        type='text'
        placeholder='Search for a product...'
      />
      <button className='btn btn-accent m-0 absolute bottom-0 right-0 rounded-tl-none rounded-bl-none '>
        <FiSearch className='text-xl' />
      </button>
    </form>

    );
  };

export default SearchForm;
