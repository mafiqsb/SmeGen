import axios from 'axios';
import React, { useContext, useReducer, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Store } from '../../../Store';
import { getError } from '../../../Utils';

import { HiMiniEyeSlash } from 'react-icons/hi2';
import { IoEyeSharp } from 'react-icons/io5';
import LoadingBox from '../../../Components/LoadingBox';
import { toast } from 'react-toastify';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return {
        ...state,
        loading: true,
      };

    case 'FETCH_FAIL_EMAIL':
      return {
        ...state,
        errorEmail: action.payload,
        loading: false,
      };
    case 'FETCH_FAIL_PASSWORD':
      return {
        ...state,
        errorPassword: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default function SignInWelcomeScreen() {
  const { search } = useLocation();
  const redirectInURL = new URLSearchParams(search).get('redirect');
  const redirect = redirectInURL ? redirectInURL : '/app/dashboard';
  const navigate = useNavigate();

  const [{ loading, errorEmail, errorPassword }, dispatch] = useReducer(
    reducer,
    {
      loading: false,
      errorEmail: '',
      errorPassword: '',
    }
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { dispatch: ctxDispatch } = useContext(Store);

  const showTogglePasswordButton = () => {
    setShowPassword(!showPassword);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch({ type: 'FETCH_REQUEST' });

      const { data } = await axios.post('/api/user/login', {
        email,
        password,
      });

      ctxDispatch({ type: 'SIGN_IN', payload: data });
      localStorage.setItem('user_info', JSON.stringify(data));
      toast.success('Welcome to InvoisUs');
      navigate(redirect || '/app/dashboard/');
    } catch (error) {
      if (getError(error) === 'Password does not match') {
        dispatch({ type: 'FETCH_FAIL_PASSWORD', payload: getError(error) });
      } else {
        dispatch({ type: 'FETCH_FAIL_PASSWORD', payload: '' });
      }

      if (getError(error) === 'Account does not exist') {
        dispatch({ type: 'FETCH_FAIL_EMAIL', payload: getError(error) });
        return;
      } else {
        dispatch({ type: 'FETCH_FAIL_EMAIL', payload: '' });
      }
    }
  };

  return (
    <div className="flex">
      <img
        src="/images/SignInWallpaper.jpg"
        alt="wallpaper"
        className="w-[1000px] h-screen relative xl:flex hidden"
      />

      <div className="flex items-center justify-center mx-auto bg-[#570987] w-full h-screen xl:relative fixed">
        <div className="bg-gray-100 md:w-[500px] md:h-[500px] rounded-md shadow-lg p-8">
          <h1 className="font-bold md:text-3xl text-xl mb-4">InvoisUs</h1>
          <p className="font-semibold text-gray-600">Welcome Back!</p>
          <form
            className="mt-4 font-semibold"
            onSubmit={(e) => submitHandler(e)}
          >
            <div className="mb-4 flex flex-col">
              <label>Email</label>
              <input
                className=" h-8 md:w-full font-light rounded-md pl-4  mt-2  border border-gray-300 "
                placeholder="youremail@gmail.com"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <p className="mt-2 font-light text-red-600 text-xs">
                {errorEmail}
              </p>
            </div>
            <div className="mb-4 flex flex-col">
              <label>Password</label>
              <div className="relative w-full">
                <input
                  className=" h-8 md:w-full font-light rounded-md  pl-4 mt-2  border border-gray-300 "
                  placeholder="*************"
                  type={showPassword ? 'text' : 'password'}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  className="absolute top-[16px] right-0 mr-4"
                  type="button"
                  onClick={showTogglePasswordButton}
                >
                  {showPassword ? <IoEyeSharp /> : <HiMiniEyeSlash />}
                </button>
              </div>
              <p className="mt-2 font-light text-red-600 text-xs">
                {errorPassword}
              </p>
            </div>
            <p className="underline text-right cursor-pointer">
              Forgot Password?
            </p>
            <div className="justify-center flex mt-8">
              {loading ? (
                <button
                  disabled
                  className="xl:w-48  w-full h-12 pl-2 xl:pl-0  bg-gray-300  duration-300 shadow-md rounded-md flex items-center justify-center relative"
                >
                  <LoadingBox />
                </button>
              ) : (
                <button className="xl:w-48 w-full h-12 pl-2 xl:pl-0 bg-amber-300 hover:bg-[#570987] hover:text-amber-300 duration-300 shadow-md rounded-md flex items-center justify-center">
                  Sign In
                </button>
              )}
            </div>
          </form>
          <div className="border-t-4 mt-8">
            <div className="flex justify-center mt-4 text-xs md:text-sm">
              <p className="mr-2">Don't have any account?</p>
              <Link to={'/register'}>
                <p className="text-[#570987] cursor-pointer font-semibold">
                  Sign Up
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
