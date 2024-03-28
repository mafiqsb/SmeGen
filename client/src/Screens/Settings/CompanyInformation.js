import React, { useState } from 'react';

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

function CompanyInformation() {
  const [formData, setFormData] = useState({
    companyName: '',
    ssmNumber: '',
    email: '',
    address1: '',
    address2: '',
    postcode: '',
    state: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    setFormData({
      companyName: '',
      ssmNumber: '',
      email: '',
      address1: '',
      address2: '',
      postcode: '',
      state: '',
    });
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
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Company Name"
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
                type="text"
                id="ssmNumber"
                name="ssmNumber"
                value={formData.ssmNumber}
                placeholder="Ex :- MA9359145-V"
                onChange={handleChange}
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
                type="email"
                id="email"
                name="email"
                placeholder="youremail@gmail.com"
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-300 w-full rounded-tr-md rounded-br-md"
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold text-md mb-2"
            >
              Phone Number
            </label>
            <div className="flex items-center rounded-md w-full bg-gray-200  ">
              <IoCall className=" ml-2 mr-2 text-xl" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="0136322425"
                value={formData.email}
                onChange={handleChange}
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
                type="text"
                id="address1"
                name="address1"
                value={formData.address1}
                onChange={handleChange}
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
                value={formData.address2}
                onChange={handleChange}
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
                  type="text"
                  id="postcode"
                  name="postcode"
                  value={formData.postcode}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-tr-md rounded-br-md w-full"
                />
              </div>
            </div>
            <div className="mb-4 w-full">
              <label
                htmlFor="postcode"
                className="block text-gray-700 font-bold text-md mb-2"
              >
                City
              </label>
              <div className="flex items-center rounded-md w-full bg-gray-200">
                <RiMapPinFill className="text-xl  ml-2 mr-2" />
                <input
                  type="text"
                  id="postcode"
                  name="postcode"
                  value={formData.postcode}
                  onChange={handleChange}
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
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="border border-gray-300 rounded-tr-md rounded-br-md px-3 py-2 w-full"
              />
            </div>
          </div>
          <div className="flex justify-end mt-10">
            <button className="xl:w-48  w-full mr-2 h-12 pl-2 xl:pl-0 text-gray-700 font-bold hover:bg-gray-500 hover:text-white bg-gray-300  duration-300 shadow-md rounded-md flex items-center justify-center">
              <GrPowerReset className="mr-2" />
              Reset
            </button>
            <button className="xl:w-48 w-full h-12 pl-2 xl:pl-0 bg-amber-300 hover:bg-[#570987] hover:text-amber-300  duration-300 shadow-md rounded-md flex items-center justify-center">
              <MdCloudUpload className="mr-2" />
              New Image
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CompanyInformation;
