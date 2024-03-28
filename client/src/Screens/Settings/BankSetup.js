import React, { useEffect, useState } from 'react';
import { Dropdown } from 'flowbite-react';

import { GrPowerReset } from 'react-icons/gr';
import { MdCloudUpload } from 'react-icons/md';
import { IoIosArrowDown } from 'react-icons/io';
import { GoPersonFill } from 'react-icons/go';
import { BsBank2 } from 'react-icons/bs';

const banks = [
  { name: 'Maybank', imgSrc: '/images/maybanklogo.png' },
  { name: 'CIMB', imgSrc: '/images/cimblogo.jpeg' },
  { name: 'Public Bank Berhad', imgSrc: '/images/publicbanklogo.png' },
  { name: 'RHB Bank', imgSrc: '/images/rhblogo.png' },
  { name: 'Hong Leong Bank', imgSrc: '/images/hongleonglogo.png' },
  { name: 'Ambank', imgSrc: '/images/ambanklogo.png' },
  { name: 'UOB Malaysia', imgSrc: '/images/uoblogo.png' },
  { name: 'Bank Rakyat', imgSrc: '/images/bankrakyatlogo.png' },
  { name: 'OCBC Bank', imgSrc: '/images/ocbclogo.png' },
  { name: 'HSBC Bank', imgSrc: '/images/hsbclogo.png' },
  { name: 'Bank Islam Malaysia', imgSrc: '/images/bankislamlogo.png' },
  { name: 'Affin Bank', imgSrc: '/images/affinbanklogo.png' },
  { name: 'Alliance Bank Berhad', imgSrc: '/images/alliancebanklogo.png' },
  { name: 'Standard Chartered', imgSrc: '/images/standardcharteredlogo.png' },
  { name: 'MBSB Bank Berhad', imgSrc: '/images/mbsbbanklogo.png' },
  { name: 'Bank Simpanan Nasional (BSN)', imgSrc: '/images/bsnlogo.png' },
  {
    name: 'Bank Muamalat Malaysia Berhad',
    imgSrc: '/images/bankmuamalatlogo.png',
  },
  { name: 'Agrobank', imgSrc: '/images/agrobanklogo.png' },
  { name: 'Al-Rajhi Malaysia', imgSrc: '/images/al-rajhilogo.png' },
];

export default function BankSetup() {
  const [nameHolder, setNameHolder] = useState('');
  const [accountHolder, setAccountHolder] = useState('');

  const [selectedBank, setSelectedBank] = useState('');

  const handleBankSelect = (bank) => {
    setSelectedBank(bank);
  };

  useEffect(() => {
    console.log(selectedBank);
  }, [selectedBank]);

  const submitBankHandler = (e) => {
    e.preventDefault();

    console.log({
      'name holder': nameHolder,
      'account holder': accountHolder,
      'selected Bank': selectedBank,
    });
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="md:text-3xl font-semibold">Bank Information</h1>
      </div>
      <form onSubmit={(e) => submitBankHandler(e)}>
        <div className="bg-white rounded-md md:p-8 p-4 xl:w-[800px] md:w-full w-[380px] md:mb-2 shadow-md">
          <div>
            <div>
              <div>
                <p className="mb-4 font-semibold">Bank Name</p>

                <Dropdown
                  className="overflow-y-auto lg:h-[400px] h-[300px]"
                  dismissOnClick={true}
                  renderTrigger={() =>
                    selectedBank ? (
                      <span className="border pl-4 cursor-pointer flex items-center justify-between p-1 rounded-md md:w-full w-[300px] mr-4">
                        {selectedBank.name}
                        <IoIosArrowDown />
                      </span>
                    ) : (
                      <span className="border pl-4 cursor-pointer flex items-center justify-between p-1 rounded-md md:w-full w-[300px] mr-4">
                        Maybank
                        <IoIosArrowDown />
                      </span>
                    )
                  }
                >
                  {banks.map((bank, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() => handleBankSelect(bank)}
                    >
                      {bank.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown>
              </div>
            </div>
            <div className=" bg-gray-100 mt-8 md:pb-0 pb-8 rounded-md shadow-sm justify-center items-center">
              <div className="md:grid md:grid-cols-6 justify-center items-center">
                <div className="md:col-span-2 p-4 justify-center items-center mx-auto flex">
                  <img
                    src={selectedBank ? selectedBank.imgSrc : banks[0].imgSrc}
                    className="md:w-28 max-w-64"
                    alt="logo"
                  />
                </div>

                <div className="md:ml-4 md:col-span-4 justify-center items-center mx-auto flex">
                  <div>
                    <p className="font-bold uppercase">{nameHolder}</p>
                    <p className="font-semibold text-gray-500">
                      {accountHolder}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="mb-4">
                <label
                  htmlFor="postcode"
                  className="block text-gray-700 font-bold text-md mb-2"
                >
                  Account Holder Name
                </label>
                <div className="flex items-center rounded-md w-full bg-gray-200 ">
                  <GoPersonFill className="text-xl ml-2 mr-2" />
                  <input
                    required
                    type="text"
                    id="postcode"
                    name="postcode"
                    className="border uppercase border-gray-300 rounded-tr-md rounded-br-md w-full"
                    onChange={(e) =>
                      setNameHolder(e.target.value.toUpperCase())
                    }
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="state"
                  className="block text-gray-700 font-bold text-md mb-2"
                >
                  Bank Account
                </label>
                <div className="flex items-center rounded-md w-full bg-gray-200">
                  <BsBank2 className="text-xl  ml-2 mr-2" />
                  <input
                    required
                    type="number"
                    id="state"
                    name="state"
                    className="border border-gray-300 rounded-tr-md rounded-br-md px-3 py-2 w-full"
                    onChange={(e) => setAccountHolder(e.target.value)}
                  />
                </div>
              </div>

              <div className=" mt-8 border-t-4">
                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    className="xl:w-48  w-full mr-2 h-12 pl-2 xl:pl-0 text-gray-700 font-bold hover:bg-gray-500 hover:text-white bg-gray-300  duration-300 shadow-md rounded-md flex items-center justify-center"
                  >
                    <GrPowerReset className="mr-2" />
                    Reset
                  </button>
                  <button className="xl:w-48 w-full h-12 pl-2 xl:pl-0 bg-amber-300 hover:bg-[#570987] hover:text-amber-300  duration-300 shadow-md rounded-md flex items-center justify-center">
                    <MdCloudUpload className="mr-2" />
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
