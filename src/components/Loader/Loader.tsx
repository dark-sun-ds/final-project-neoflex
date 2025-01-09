import React from 'react'
import './Loader.css'
import loader from '/src/assets/loader.svg'
const Loader = () => {
  return (
    <div className="loader">
      <img src={loader} alt="" className="loader-img" />
    </div>
  );
}

export default Loader
