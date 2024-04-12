import React, { useContext, useReducer, useState } from 'react';
import LoadingBox from '../../Components/LoadingBox';

import { GrPowerReset } from 'react-icons/gr';
import { MdCloudUpload } from 'react-icons/md';
import { IoNewspaper } from 'react-icons/io5';
import { MdNumbers } from 'react-icons/md';
import { Store } from '../../Store';
import { toast } from 'react-toastify';
import { getError } from '../../Utils';
import axios from 'axios';

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

function DocumentSettings() {
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const { documentSettings, userInfo } = state;

  const [startingCode, setStartingCode] = useState(
    documentSettings ? documentSettings.startingCode : 'INV'
  );
  const [currentNumber, setCurrentNumber] = useState(
    documentSettings ? documentSettings.currentNumber : '1'
  );

  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const handleReset = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log({ startingCode, currentNumber });
    try {
      dispatch({ type: 'UPDATE_REQUEST' });

      const apiEndpoint =
        documentSettings === null
          ? '/api/document/uploaddocumentinformation'
          : '/api/document/editdocumentinformation';
      const method = documentSettings === null ? 'post' : 'put';

      const { data } = await axios[method](
        apiEndpoint,
        {
          startingCode,
          currentNumber,
          id: documentSettings ? documentSettings.id : null,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      console.log(data);

      ctxDispatch({
        type: 'DOCUMENT_SETTINGS',
        payload: data,
      });

      dispatch({ type: 'UPDATE_SUCCESS' });

      toast.success('Update Successfully');
    } catch (error) {
      dispatch({ type: 'UPDATE_FAIL', payload: getError(error) });
      toast.error(getError(error));
      console.log(error);
      return;
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="md:text-3xl font-semibold">Document Settings</h1>
      </div>
      <div className="bg-white rounded-md md:p-20 p-4 xl:w-[800px] md:w-full w-[380px] md:mb-2 shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4 ">
            <label
              htmlFor="companyName"
              className="block text-gray-700 font-bold text-md mb-2"
            >
              Starting Code Invoice
            </label>
            <div className="flex items-center rounded-md w-full bg-gray-200">
              <IoNewspaper className=" ml-2 mr-2 text-xl" />
              <input
                required
                type="text"
                id="startingCode"
                name="startingCode"
                value={startingCode}
                onChange={(e) => setStartingCode(e.target.value)}
                className="border border-gray-300 rounded-tr-md rounded-br-md w-full"
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="ssmNumber"
              className="block text-gray-700 font-bold text-md mb-2"
            >
              Current No.
            </label>
            <div className="flex items-center rounded-md bg-gray-200  w-full">
              <MdNumbers className=" ml-2 mr-2 text-xl " />
              <input
                required
                type="text"
                id="currentNumber"
                name="currentNumber"
                value={currentNumber}
                onChange={(e) => setCurrentNumber(e.target.value)}
                className="border border-gray-300  w-full rounded-tr-md rounded-br-md"
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

export default DocumentSettings;
