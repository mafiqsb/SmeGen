import React from 'react';
import { Link } from 'react-router-dom';
import Laptop from '../assets/laptop.jpg';

const Analytics = () => {
  return (
    <div className="w-full bg-white py-16 px-4">
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
        <img className="w-[500px] mx-auto my-4" src={Laptop} alt="/" />
        <div className="flex flex-col justify-center text-center md:text-left">
          <p className="text-[#570987] font-bold ">USE IT FOR FREE</p>
          <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">
            Manage Your Client Centrally
          </h1>
          <p>
            Elevate your SME's digital management effortlessly with our
            complimentary website management solutions at no cost. Let's Sign
            Up!
          </p>
          <Link to={'/register'}>
            <button className="bg-[#570987] duration-300 text-amber-300 w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
