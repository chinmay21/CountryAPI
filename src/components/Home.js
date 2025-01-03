import React, { useEffect, useState } from 'react';
import { useTheme } from '../ThemeContext';
import Cards from './Cards';
import lightMode from '../assets/lightMode.png';
import darkMode from '../assets/darkMode.png';
import search from '../assets/search.png';
import Loader from './Loader';
import arrow from '../assets/arrow.png';
import './Home.css';

const Home = () => {
  const api = 'https://restcountries.com/v3.1/all';
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [query, setQuery] = useState('');
  const { mode, toggleMode } = useTheme();
  const toggleDropdown = () => { setIsVisible((prevState) => !prevState); };
  const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api);
        const data = await response.json();
        const sortedCountries = data.sort((a, b) => {
          const nameA = a.name.common.toUpperCase();
          const nameB = b.name.common.toUpperCase();
          return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
        });
        setCountries(sortedCountries);
      } catch (err) {
        alert('ERROR');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
    setIsVisible(!isVisible);
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredCountries = selectedRegion === 'All'
    ? countries.filter((country) =>
        country.name.common.toLowerCase().startsWith(query.toLowerCase())
      )
    : countries.filter(
        (country) =>
          country.region === selectedRegion &&
          country.name.common.toLowerCase().startsWith(query.toLowerCase())
      );

  if (loading) return <Loader />;

  return (
    <div className={`w-[100vw] h-[100vh] flex flex-col items-center parent-container ${mode ? 'dark' : 'light'}`}>
      <div className={`${mode ? 'navbar' : ''} flex w-[100vw] justify-between h-[100px] pb-[20px] pt-[30px] border-b-[1px] items-center shadow-md px-[20px] md:px-[250px]`}>
        <p className={`${mode ? 'title' : ''} font-bold text-xl`}>Where in the world ?</p>
        {/* Dark Mode Button */}
        <button onClick={toggleMode} className={`flex items-center gap-x-1 ${mode ? 'hidden' : 'inline-block'}`}>
          <img src={darkMode} width={15} height={15} loading='lazy' alt='darkMode' />
          <p className='pb-[4px]'>Dark Mode</p>
        </button>
        {/* Light Mode Button */}
        <button onClick={toggleMode} className={`${mode ? 'inline-block' : 'hidden'} flex items-center gap-x-1`}>
          <img src={lightMode} width={25} height={25} loading='lazy' alt='lightMode' />
          <p className='pb-[4px] text-white'>Light Mode</p>
        </button>
      </div>
      {/* Input field, Dropdown and Cards Container */}
      <div className='w-[90%] md:w-[80%] flex flex-col justify-center mt-[50px]'>
        {/* Input field and Dropdown Container */}
        <div className='flex flex-col justify-between md:flex-row px-5'>
          <div className='flex h-[100px] w-full md:w-[40%] relative'>
            <input
              type='text'
              placeholder='Search for a country..'
              value={query}
              onChange={handleInputChange}
              className={`${mode ? 'search' : ''} ${mode ? 'dark-text' : ''} border shadow-md rounded-md w-full h-[50px] pl-[50px]`}
            />
            <img src={search} alt='search' loading='lazy' width={20} height={20} className='absolute top-[15px] left-[15px]' />
          </div>

          <div className={`${mode ? 'btn' : ''} flex flex-col items-center justify-center h-[50px] w-full md:w-[20%] border shadow-md rounded-lg px-5 relative mt-4 md:mt-0`}>
            <button className='flex justify-center items-center gap-5 relative' onClick={toggleDropdown}>
              Filter by Region
              <img src={arrow} alt='arrow' loading='lazy' width={15} height={15} />
            </button>
            {/* Dropdown */}
            <div className={`${mode ? 'optionContainer' : ''} flex-col absolute top-[100%] border shadow-md rounded-md w-full mt-4 h-[250px] pt-2 text-left pl-4 font-[500] gap-y-4 ${isVisible ? 'flex' : 'hidden'} z-[1] bg-white`}>
              {regions.map((region) => (
                <a
                  key={region}
                  onClick={() => handleRegionChange(region)}
                  className='appearance-none cursor-pointer'
                >
                  {region}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className='w-full h-full flex flex-wrap justify-start gap-x-[44px]'>
          {filteredCountries.map((country) => (
            <Cards key={country.cca3} country={country} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;



