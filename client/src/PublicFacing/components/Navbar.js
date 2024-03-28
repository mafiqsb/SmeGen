import React, { useEffect, useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [nav, setNav] = useState(false);
  const [regNav, setRegnav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  const loginNav = () => {
    setRegnav(!regNav);
  };

  useEffect(() => {
    if (!nav) {
      setRegnav(false);
    }
  }, [setRegnav, nav]);

  return (
    <div className="max-w-[1240px] text-white flex mx-auto items-center justify-between h-24 px-4">
      <h1 className="w-full text-amber-300 text-3xl font-bold">InvoisUs</h1>
      <ul className="flex ">
        <Link to={'/login'}>
          <button className=" md:w-[100px] w-[100px] h-10 text-center font-semibold rounded-md font-md hover:bg-[#570987] hover:text-amber-300 text-[#570987] duration-300 bg-amber-300 my-6 mx-auto">
            Log In
          </button>
        </Link>
      </ul>
    </div>
  );
}
