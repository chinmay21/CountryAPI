import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import Loader from './Loader';
import darkMode from '../assets/darkMode.png';
import lightMode from '../assets/lightMode.png';
import { FaArrowLeftLong } from "react-icons/fa6";

const Country = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { mode, toggleMode } = useTheme();
  const { country } = location.state || {};
  const [languages, setLanguages] = useState([]);
  const [nativeNames, setNativeNames] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [borders, setBorders] = useState([]);

  function clickHandler () {
    navigate('/');
  }

  useEffect(() => {
    if (country) {
      if (country.languages) { 
        const languagesArray = Object.values(country.languages);
        if (country.name.common === "Zimbabwe") { 
          setLanguages(languagesArray.slice(0, 4)); 
        } else { 
          setLanguages(languagesArray); 
        }
      }    
      if (country.name && country.name.nativeName) {
        const nativeNamesArray = Object.values(country.name.nativeName).map(
          name => name.common
        );
        if(country.name.common === "Zimbabwe") {
          setNativeNames([nativeNamesArray[0]]);
        } else {
          setNativeNames(nativeNamesArray);
        }
      }
      if (country.currencies) {
        const currenciesArray = Object.values(country.currencies).map(
          currency => currency.name
        );
        setCurrencies(currenciesArray);
      }
      if (country.borders) {
        setBorders(country.borders);
      }
    }
  }, [country]);

  const handleBorderClick = async (borderCode) => {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/alpha/${borderCode}`);
      const data = await response.json();
      if (data.length > 0) {
        navigate(`/detail/${borderCode}`, { state: { country: data[0] } });
      }
    } catch (error) {
      console.error('Error fetching border country data:', error);
    }
  };

  if (!country) {
    return <Loader />;
  }

  return (
    <div className={`w-[100vw] h-[100vh] flex flex-col items-center ${mode ? 'dark' : 'light'}`}>
      <div className={`${mode ? 'navbar' : ''} flex w-[100vw] justify-between h-[80px] pb-[20px] pt-[30px] border-b-[1px] items-center shadow-md px-[20px] md:px-[250px]`}>
        <p className={`${mode ? 'title' : ''} font-bold text-xl`}>Where in the world ?</p>
        {/* Dark Mode Button */}
        <button onClick={toggleMode} className={`flex items-center gap-x-1 ${mode ? 'hidden' : 'inline-block'}`}>
          <img src={darkMode} width={15} height={15} loading='lazy' alt='darkMode'/>
          <p className='pb-[4px]'>Dark Mode</p>
        </button>
        {/* Light Mode Button */}
        <button onClick={toggleMode} className={`${mode ? 'inline-block' : 'hidden'} flex items-center gap-x-1`}>
          <img src={lightMode} width={25} height={25} loading='lazy' alt='lightMode'/>
          <p className='pb-[4px] text-white'>Light Mode</p>
        </button>
      </div>
      {/* Hero Section */}
      <div className='flex flex-col md:flex-row justify-between items-center w-[90%] sm:w-[80%] mt-6 md:mt-12'>
        <div className='flex flex-col w-full md:w-auto'>
          <button onClick={clickHandler} className={`${mode ? 'back-btn' : ''} flex justify-center gap-x-3 items-center w-[108px] h-[36px] rounded-md border shadow-lg px-3 mt-[25px]`}>
            <FaArrowLeftLong className={`${mode ? 'dark-text' : ''} w-[15px] h-[15px]`} />
            <p className={`${mode ? 'dark-text' : ''} pb-1`}>Back</p>
          </button>
          <div className='flex flex-col md:flex-row items-start justify-start pt-[50px]'>
            <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} className='w-full md:w-auto md:h-[350px] object-cover' />
            <div className='flex flex-col items-start gap-y-3 md:pl-[90px] mt-6 md:mt-0'>
              <h2 className={`${mode ? 'dark-text' : ''} font-bold text-2xl pb-[10px]`}>{country.name.common}</h2>
              <div className='flex flex-wrap sm:flex-nowrap gap-x-1'>
                <h3 className={`${mode ? 'dark-text' : ''} font-[500]`}>Native Name:</h3>
                <div className='flex gap-x-2'>
                  {nativeNames.map((nativeName, index) => (
                    <p className={`${mode ? 'dark-text' : ''}`} key={index}>{nativeName}</p>
                  ))}
                </div>
              </div>
              <p className={`${mode ? 'dark-text' : ''}`}><span className={`${mode ? 'dark-text' : ''} font-[500]`}>Population:</span> {country.population.toLocaleString()}</p>
              <p className={`${mode ? 'dark-text' : ''}`}><span className={`${mode ? 'dark-text' : ''} font-[500]`}>Region:</span> {country.region}</p>
              <p className={`${mode ? 'dark-text' : ''}`}><span className={`${mode ? 'dark-text' : ''} font-[500]`}>Sub Region:</span> {country.subregion}</p>
              <p className={`${mode ? 'dark-text' : ''}`}><span className={`${mode ? 'dark-text' : ''} font-[500]`}>Capital:</span> {country.capital}</p>
              <p className={`${mode ? 'dark-text' : ''}`}><span className={`${mode ? 'dark-text' : ''} font-[500]`}>Top Level Domain:</span> {country.tld}</p>
              <div className='flex flex-wrap md:flex-nowrap gap-x-1'>
                <h3 className={`${mode ? 'dark-text' : ''} font-[500]`}>Currency:</h3>
                <ul className='flex flex-wrap gap-x-3'>
                  {currencies.map((currency, index) => (
                    <li className={`${mode ? 'dark-text' : ''}`} key={index}>{currency}</li>
                  ))}
                </ul>
              </div>
              <div className='flex flex-wrap md:flex-nowrap gap-x-1'>
                <h3 className={`${mode ? 'dark-text' : ''} font-[500]`}>Languages:</h3>
                <ul className='flex flex-wrap gap-x-1'>
                  {languages.map((language, index) => (
                    <li className={`${mode ? 'dark-text' : ''}`} key={index}>{language}</li>
                  ))}
                </ul>
              </div>
              {borders.length > 0 && (
                <div className='flex flex-col items-start gap-y-2'>
                  <h3 className={`${mode ? 'dark-text' : ''} font-bold text-lg`}>Border Countries:</h3>
                  <div className='flex flex-wrap gap-y-9 gap-x-5'>
                    {borders.map((border, index) => (
                      <button 
                        key={index}
                        onClick={() => handleBorderClick(border)}
                        className={`${mode ? 'border-btn' : ''} rounded-md shadow-sm h-[35px] w-[100px] border`}>
                        {border}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Country;
