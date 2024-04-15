import React, { useEffect } from 'react';
import { ImCross } from 'react-icons/im';
import { TfiWrite } from 'react-icons/tfi';
import { PiWarningCircleLight } from 'react-icons/pi';

import { useContext, useReducer } from 'react';
import { Store } from '../../Store';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getError } from '../../Utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true };
    case 'DELETE_SUCCESS':
      return { ...state, loadingDelete: false, successDelete: true };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false, successDelete: false };
    case 'DELETE_RESET':
      return { ...state, successDelete: false };

    default:
      return state;
  }
};

export default function CreateDeleteClientModel({ onClose }) {
  const [{ successDelete }, dispatch] = useReducer(reducer, {
    error: '',
    loadingDelete: false,
    loadingUpload: false,
  });

  const { state } = useContext(Store);

  const { clientDelete, userInfo } = state;

  const client = clientDelete;

  const handleClose = () => {
    onClose();
  };

  const deleteClientHandler = async () => {
    try {
      dispatch({ type: 'DELETE_REQUEST' });
      await axios.delete(`/api/client/deleteclient/${client.id}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      dispatch({ type: 'DELETE_SUCCESS' });

      window.location.reload();

      onClose();

      toast.success('Success Delete');
    } catch (error) {
      dispatch({ type: 'DELETE_FAIL', payload: getError(error) });
    }
  };

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' });
    }
  }, [successDelete]);

  return (
    <div className=" flex justify-center ">
      <div className="bg-white shadow-md rounded-md p-6 md:w-[600px] w-[350px]">
        <div className="mx-auto justify-center flex items-center mb-16 mt-10">
          <PiWarningCircleLight className="mr-2" size={32} />
          <h2 className="lg:text-[24px] text-xl font-semibold">
            Are you sure to delete?
          </h2>
        </div>

        <div className="flex justify-center mb-10">
          <div className="justify-center items-center  mr-2">
            <button
              type="button"
              onClick={handleClose}
              className="md:w-28 md:h-10 w-20 h-6 bg-gray-300 duration-300 shadow-md rounded-b-sm md:text-sm text-xs flex items-center justify-center"
            >
              <ImCross className="mr-2" />
              Cancel
            </button>
          </div>
          <div className="justify-center items-center">
            <button
              onClick={deleteClientHandler}
              className="md:w-28 md:h-10 w-20 h-6 bg-red-700 text-white hover: hover:text-amber-300 duration-300 shadow-md md:text-sm text-xs flex items-center justify-center"
            >
              <TfiWrite className="mr-2" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
