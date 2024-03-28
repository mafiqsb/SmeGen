import { useContext, useState, useReducer } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PasswordStrengthBar from 'react-password-strength-bar';
import zxcvbn from 'zxcvbn';
import LoadingBox from '../../../Components/LoadingBox';

import { HiMiniEyeSlash } from 'react-icons/hi2';
import { IoEyeSharp } from 'react-icons/io5';
import { getError } from '../../../Utils';
import { Store } from '../../../Store';
import { toast } from 'react-toastify';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default function SignUpWelcomeScreen() {
  const { search } = useLocation();
  const navigate = useNavigate();

  const redirectInURL = new URLSearchParams(search).get('redirect');
  const redirect = redirectInURL ? redirectInURL : '/app/dashboard';

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordStrength = zxcvbn(password);

  const showTogglePasswordButton = () => {
    setShowPassword(!showPassword);
  };

  const showToggleConfirmPasswordButton = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch({ type: 'FETCH_REQUEST' });
      if (passwordStrength.score < 4) {
        window.alert('Please choose a stronger password.');
        return;
      }

      if (password !== confirmPassword) {
        window.alert('Password not same');
        return;
      }

      const { data } = await axios.post('/api/user/register', {
        name,
        email,
        password,
      });

      console.log(userInfo);

      toast.success('Welcome to InvoisUs');
      ctxDispatch({ type: 'SIGN_IN', payload: data });
      localStorage.setItem('user_info', JSON.stringify(data));
      navigate(redirect || '/app/dashboard/');
    } catch (error) {
      console.log(getError(error));
      window.alert(getError(error));
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
        <div className="bg-gray-100 md:w-[500px] md:h-[620px] rounded-md shadow-lg p-8">
          <h1 className="font-bold md:text-3xl text-xl mb-4">InvoisUs</h1>
          <p className="font-semibold text-gray-600">
            Discover a great opportunity
          </p>
          <form
            className="mt-4 font-semibold"
            onSubmit={(e) => submitHandler(e)}
          >
            <div className="mb-4 flex flex-col">
              <label>Name</label>
              <input
                className=" py-2 px-3 md:w-full font-light rounded-md pl-4  mt-2  border border-gray-300 "
                placeholder="Your Name"
                type="text"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4 flex flex-col">
              <label>Email</label>
              <input
                className="  md:w-full font-light rounded-md pl-4 py-2 px-3  mt-2  border border-gray-300 "
                placeholder="youremail@gmail.com"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4 flex flex-col">
              <label>Password</label>
              <div className="relative w-full">
                <input
                  className={
                    password !== confirmPassword
                      ? 'shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                      : 'shadow appearance-none border border-green-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                  }
                  placeholder="*************"
                  type={showPassword ? 'text' : 'password'}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <PasswordStrengthBar
                  password={password}
                  shortScoreWord={['Weak']}
                  minScore={1}
                />
                <button
                  className="absolute top-[11px] right-0 mr-4"
                  type="button"
                  onClick={showTogglePasswordButton}
                >
                  {showPassword ? <IoEyeSharp /> : <HiMiniEyeSlash />}
                </button>
              </div>
            </div>
            <div className="mb-4 flex flex-col">
              <label>Confirm Password</label>
              <div className="relative w-full">
                <input
                  className={
                    password !== confirmPassword
                      ? 'shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                      : 'shadow appearance-none border border-green-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                  }
                  placeholder="*************"
                  type={showConfirmPassword ? 'text' : 'password'}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  className="absolute top-[11px] right-0 mr-4"
                  type="button"
                  onClick={showToggleConfirmPasswordButton}
                >
                  {showConfirmPassword ? <IoEyeSharp /> : <HiMiniEyeSlash />}
                </button>
              </div>
            </div>

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
                  Register
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
