import React, { useContext, useEffect, useState, useReducer } from 'react';
import { Dropdown } from 'flowbite-react';

import { GrPowerReset } from 'react-icons/gr';
import { MdCloudUpload } from 'react-icons/md';
import { IoIosArrowDown } from 'react-icons/io';
import { GoPersonFill } from 'react-icons/go';
import { BsBank2 } from 'react-icons/bs';
import { Store } from '../../Store';
import LoadingBox from '../../Components/LoadingBox';
import { toast } from 'react-toastify';

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

export default function BankSetup() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const { bankInformation } = state;

  const [nameHolder, setNameHolder] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [selectedBank, setSelectedBank] = useState(banks[0]);

  const handleBankSelect = (bank) => {
    setSelectedBank(bank);
  };

  useEffect(() => {
    console.log(selectedBank);
  }, [selectedBank]);

  const submitBankHandler = (e) => {
    e.preventDefault();

    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      localStorage.setItem(
        'bank_information',
        JSON.stringify({
          nameHolder: nameHolder,
          accountHolder: accountHolder,
          selectedBank: selectedBank,
        })
      );

      ctxDispatch({
        type: 'BANK_INFORMATION',
        payload: { nameHolder, accountHolder, selectedBank },
      });
      dispatch({ type: 'UPDATE_SUCCESS' });
      toast.success('Update Successfully');
    } catch (error) {
      dispatch({ type: 'UPDATE_FAIL' });
      toast.error('Something Wrong To Update');
      console.log(error);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="md:text-3xl font-semibold">Bank Information</h1>
      </div>

      <div className=" rounded-md p-4 xl:w-[800px] md:w-full w-[380px] md:mb-2 shadow-md">
        <h1 className="mb-8 font-semibold md:text-2xl">Current Bank</h1>
        <div className="md:grid mb-8 md:grid-cols-6 justify-center items-center">
          <div className="md:col-span-2 justify-center items-center mx-auto flex">
            <img
              src={bankInformation.selectedBank.imgSrc}
              className="md:w-20 max-w-20 mb-6"
              alt="logo"
            />
          </div>

          <div className="md:ml-4 md:col-span-4 justify-center items-center mx-auto flex">
            <div>
              <p className="font-bold uppercase">
                {bankInformation.nameHolder}
              </p>
              <p className="font-semibold text-gray-500">
                {bankInformation.accountHolder}
              </p>
            </div>
          </div>
        </div>
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
                  renderTrigger={() => (
                    <span className="border pl-4 cursor-pointer flex items-center justify-between p-1 rounded-md md:w-full w-[300px] mr-4">
                      {selectedBank.name}
                      <IoIosArrowDown />
                    </span>
                  )}
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
                    src={selectedBank.imgSrc}
                    className="md:w-20 max-w-20"
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
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
