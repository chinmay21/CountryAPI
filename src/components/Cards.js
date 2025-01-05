import React from 'react'
import './Cards.css';
import { useTheme } from '../ThemeContext';
import { useNavigate } from 'react-router-dom';


//commiting for knowledge
const Cards = ({country}) => {
  const navigate = useNavigate();
  const { mode} = useTheme();

  function clickHandler () {
    navigate(`/detail/${country.cca3}`, { state: { country } });
  }
  return (
    <div onClick={clickHandler} className='inline-block cursor-pointer transform scale-100 hover:scale-110 transition-transform'>
    <div className={`${mode ? 'dark-card-container' : ''} flex flex-col flex-wrap border-[0px] shadow-lg max-w-[232px] h-[350px] rounded-xl pb-2 items-start m-5 relative -z-10`}>
      <img src={country.flags.svg} width={232} alt='Flag' loading='lazy' className='relative -z-[12] rounded-md max-w-[232px] max-h-[210px]'/>
      <h1 className='font-bold px-3 pt-4 '>{country.name.common}</h1>
      <p className='px-3 pt-3'><span className='font-[500]'>Population:</span> {country.population}</p>
      <p className='px-3'><span className='font-[500]'>Region:</span> {country.region}</p>
      <p className='px-3'><span className='font-[500]'>Capital:</span> {country.capital}</p>
    </div>       
  </div>
  )
}

export default Cards