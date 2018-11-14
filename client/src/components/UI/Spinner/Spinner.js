import React from 'react';
// import classes from './Spinner.css';
import Spinner from './spinner.gif';



const spinner = () => (
  <div>
    <img
    src={Spinner}
    style={{ width: '200px', margin: 'auto', display: 'block'}}
    alt="Loading....." />
  </div>
)

export default spinner;
