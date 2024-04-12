import React, { useContext, useReducer, useState } from 'react';
import LoadingBox from '../../Components/LoadingBox';

import { GrPowerReset } from 'react-icons/gr';
import { MdCloudUpload } from 'react-icons/md';
import { MdOutlineBusiness } from 'react-icons/md';
import { FaCashRegister } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { FaHome } from 'react-icons/fa';
import { IoMapSharp } from 'react-icons/io5';
import { RiMapPinFill } from 'react-icons/ri';
import { FaFontAwesomeFlag } from 'react-icons/fa';
import { IoCall } from 'react-icons/io5';
import { Store } from '../../Store';
import { toast } from 'react-toastify';
import axios from 'axios';
import { getError } from '../../Utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_REQUEST':
      return {
        ...state,
        loading: true,
      };

    case 'UPDATE_SUCCESS':
      return {
        ...state,
        loading: false,
      };

    case 'UPDATE_FAIL':
      return {
        ...state,
        errorEmail: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

function CompanyInformation() {
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const { companyInformation, userInfo } = state;

  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const [companyName, setCompanyName] = useState(
    companyInformation ? companyInformation.companyName : ''
  );
  const [ssmNumber, setSSMNumber] = useState(
    companyInformation ? companyInformation.ssmNumber : ''
  );
  const [email, setEmail] = useState(
    companyInformation ? companyInformation.email : ''
  );
  const [phoneNumber, setPhoneNumber] = useState(
    companyInformation ? companyInformation.phoneNumber : ''
  );
  const [address1, setAddress1] = useState(
    companyInformation ? companyInformation.address1 : ''
  );
  const [address2, setAddress2] = useState(
    companyInformation ? companyInformation.address2 : ''
  );
  const [postcode, setPostcode] = useState(
    companyInformation ? companyInformation.postcode : ''
  );
  const [city, setCity] = useState(
    companyInformation ? companyInformation.city : ''
  );
  const [stateName, setStateName] = useState(
    companyInformation ? companyInformation.stateName : ''
  );

  const handleReset = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch({ type: 'UPDATE_REQUEST' });

      const apiEndpoint =
        companyInformation === null
          ? '/api/company/uploadcompanyinformation'
          : '/api/company/editcompanyinformation';
      const method = companyInformation === null ? 'post' : 'put';

      const { data } = await axios[method](
        apiEndpoint,
        {
          companyName: companyName,
          ssmNumber: ssmNumber,
          email: email,
          phoneNumber: phoneNumber,
          address1: address1,
          address2: address2,
          postcode: postcode,
          city: city,
          stateName: stateName,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      ctxDispatch({
        type: 'COMPANY_INFORMATION',
        payload: data.data,
      });

      dispatch({ type: 'UPDATE_SUCCESS' });

      toast.success('Update Successfully');
    } catch (error) {
      dispatch({ type: 'UPDATE_FAIL', payload: getError(error) });
      toast.error(getError(error));
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="md:text-3xl font-semibold">Company Information</h1>
      </div>
      <div className="bg-white rounded-md md:p-20 p-4 xl:w-[800px] md:w-full w-[380px] md:mb-2 shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4 ">
            <label
              htmlFor="companyName"
              className="block text-gray-700 font-bold text-md mb-2"
            >
              Company Name
            </label>
            <div className="flex items-center rounded-md w-full bg-gray-200">
              <MdOutlineBusiness className=" ml-2 mr-2 text-xl" />
              <input
                required
                type="text"
                id="companyName"
                name="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder={
                  companyInformation
                    ? companyInformation.companyName
                    : 'Company Name'
                }
                className="border border-gray-300 rounded-tr-md rounded-br-md w-full"
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="ssmNumber"
              className="block text-gray-700 font-bold text-md mb-2"
            >
              SSM Number
            </label>
            <div className="flex items-center rounded-md bg-gray-200  w-full">
              <FaCashRegister className=" ml-2 mr-2 text-xl " />
              <input
                required
                type="text"
                id="ssmNumber"
                name="ssmNumber"
                placeholder={
                  companyInformation
                    ? companyInformation.ssmNumber
                    : 'Ex :- MA9359145-V'
                }
                value={ssmNumber}
                onChange={(e) => setSSMNumber(e.target.value)}
                className="border border-gray-300  w-full rounded-tr-md rounded-br-md"
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold text-md mb-2"
            >
              Email
            </label>
            <div className="flex items-center rounded-md w-full bg-gray-200  ">
              <MdEmail className=" ml-2 mr-2 text-xl" />
              <input
                required
                type="email"
                id="email"
                name="email"
                placeholder={
                  companyInformation
                    ? companyInformation.email
                    : 'youremail@gmail.com'
                }
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 w-full rounded-tr-md rounded-br-md"
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-gray-700 font-bold text-md mb-2"
            >
              Phone Number
            </label>
            <div className="flex items-center rounded-md w-full bg-gray-200  ">
              <IoCall className=" ml-2 mr-2 text-xl" />
              <input
                required
                type="number"
                id="phoneNumber"
                name="phoneNumber"
                placeholder={
                  companyInformation
                    ? companyInformation.number
                    : 'youremail@gmail.com'
                }
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="border border-gray-300 w-full rounded-tr-md rounded-br-md"
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="address1"
              className="block text-gray-700 font-bold text-md mb-2"
            >
              Home Address 1
            </label>
            <div className="flex items-center rounded-md w-full bg-gray-200 ">
              <FaHome className="text-xl  ml-2 mr-2" />
              <input
                required
                type="text"
                id="address1"
                name="address1"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                className="border border-gray-300 rounded-tr-md rounded-br-md  w-full"
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="address2"
              className="block text-gray-700 font-bold text-md mb-2"
            >
              Home Address 2
            </label>
            <div className="flex items-center rounded-md w-full bg-gray-200">
              <FaHome className="text-xl  ml-2 mr-2" />
              <input
                type="text"
                id="address2"
                name="address2"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                className="border border-gray-300 rounded-tr-md rounded-br-md w-full"
              />
            </div>
          </div>
          <div className="flex flex-row w-full justify-between">
            <div className="mb-4 w-full mr-4">
              <label
                htmlFor="postcode"
                className="block text-gray-700 font-bold text-md mb-2"
              >
                Postcode
              </label>

              <div className="flex items-center rounded-md w-full bg-gray-200 ">
                <IoMapSharp className="text-xl ml-2 mr-2" />
                <input
                  required
                  type="text"
                  id="postcode"
                  name="postcode"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  className="border border-gray-300 rounded-tr-md rounded-br-md w-full"
                />
              </div>
            </div>
            <div className="mb-4 w-full">
              <label
                htmlFor="city"
                className="block text-gray-700 font-bold text-md mb-2"
              >
                City
              </label>
              <div className="flex items-center rounded-md w-full bg-gray-200">
                <RiMapPinFill className="text-xl  ml-2 mr-2" />
                <input
                  required
                  type="text"
                  id="city"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="border border-gray-300 rounded-tr-md rounded-br-md px-3  w-full"
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="state"
              className="block text-gray-700 font-bold text-md mb-2"
            >
              State
            </label>
            <div className="flex items-center rounded-md w-full bg-gray-200">
              <FaFontAwesomeFlag className="text-xl  ml-2 mr-2" />
              <input
                required
                type="text"
                id="state"
                name="state"
                value={stateName}
                onChange={(e) => setStateName(e.target.value)}
                className="border border-gray-300 rounded-tr-md rounded-br-md px-3 py-2 w-full"
              />
            </div>
          </div>
          <div className="flex justify-end mt-10">
            <button
              onClick={handleReset}
              type="button"
              className="xl:w-48  w-full mr-2 h-12 pl-2 xl:pl-0 text-gray-700 font-bold hover:bg-gray-500 hover:text-white bg-gray-300  duration-300 shadow-md rounded-md flex items-center justify-center"
            >
              <GrPowerReset className="mr-2" />
              Reset
            </button>

            {loading ? (
              <button
                disabled
                className="xl:w-48  w-full h-12 pl-2 xl:pl-0  bg-gray-300  duration-300 shadow-md rounded-md flex items-center justify-center relative"
              >
                <LoadingBox />
              </button>
            ) : (
              <button className="xl:w-48  w-full mr-2 h-12 pl-2 xl:pl-0 bg-amber-300 hover:bg-[#570987] hover:text-amber-300 duration-300 shadow-md rounded-md flex items-center justify-center">
                <MdCloudUpload className="mr-2" />
                Update
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CompanyInformation;
