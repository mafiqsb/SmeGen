import React from 'react';
import { Link } from 'react-router-dom';
import { ReactTyped } from 'react-typed';

export default function Hero() {
  return (
    <div className="text-white ">
      <div className="max-w-[800px] md:mt-[80px] md:mb-[100px] mt-[50px] mb-[60px] mx-auto justify-center text-center flex flex-col">
        <p className="text-amber-300 font-bold p-2">YOUR FREE SME MANAGEMENT</p>
        <h1 className="md:text-7xl sm:text-6xl text-4xl font-bold md:py-6">
          EMPOWERING SMALL BUSINESS
        </h1>
        <div className="md:text-5xl sm:text-4xl text-xl justify-center text-center font-bold py-4">
          <p>YOUR GATEWAY TO SUCCESS</p>
          <ReactTyped
            className="md:text-5xl sm:text-4xl text-xl text-gray-500 md:pl-4 pl-2"
            strings={['Entrepreneurial', 'Innovate', 'Growth']}
            loop
            backSpeed={60}
            typeSpeed={80}
          />
        </div>
        <div className=" flex flex-col justify-center text-center  max-w-[350px] mx-auto md:max-w-[700px] ">
          <p className="text-gray-500 font-bold md:text-2xl">
            Monitor your business for Invoice Update & Client Database
          </p>
          <Link to={'/register'}>
            <button className="py-3 w-[200px] text-lg font-semibold rounded-md font-md hover:bg-[#570987] hover:text-amber-300 text-[#570987] duration-300 bg-amber-300 my-6 mx-auto">
              Sign Up For Free!
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
