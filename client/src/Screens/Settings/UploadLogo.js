import React, { useContext, useState, useReducer } from 'react';
import LoadingBox from '../../Components/LoadingBox';
import { GrPowerReset } from 'react-icons/gr';
import { MdCloudUpload } from 'react-icons/md';
import { Store } from '../../Store';
import { toast } from 'react-toastify';

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

export default function UploadLogo() {
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const { logoInformation } = state;

  const [coverImage, setCoverImage] = useState('');

  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const fileUploadHandler = (e) => {
    const imageFile = e.target.files[0];
    const imageCoverURL = URL.createObjectURL(imageFile);

    setCoverImage(imageCoverURL);
  };

  const fileSubmitHandler = (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'UPDATE_REQUEST' });

      ctxDispatch({
        type: 'LOGO_INFORMATION',
        payload: { image: coverImage },
      });
      localStorage.setItem(
        'logo_information',
        JSON.stringify({ image: coverImage })
      );

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
        <h1 className="md:text-3xl font-semibold">Upload Logo</h1>
      </div>
      <div className="bg-white rounded-md md:p-8 p-4 xl:w-[800px] md:w-full w-[380px] md:mb-2 shadow-md">
        <form onSubmit={(e) => fileSubmitHandler(e)}>
          <div>
            <p className="font-semibold mb-4">Current Logo</p>
            <img
              src={
                logoInformation.image
                  ? logoInformation.image
                  : '/images/yourlogo.png'
              }
              className="w-60"
              alt="logo"
            />
            <div className="mt-10">
              <label
                htmlFor="fileInput"
                className="block text-gray-700 text-sm font-bold mb-2 text-left pb-2 "
              >
                Upload New Logo
              </label>
              <input
                htmlFor="fileInput"
                type="file"
                className="cursor-pointer m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300  px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:px-3 file:py-[0.32rem] file:text-neutral-700  file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
                onChange={(e) => fileUploadHandler(e)}
              />
            </div>
            <div className=" mt-8 border-t-4">
              <div className="mt-8 flex justify-end">
                <button className="xl:w-48  w-full mr-2 h-12 pl-2 xl:pl-0 text-gray-700 font-bold hover:bg-gray-500 hover:text-white bg-gray-300  duration-300 shadow-md rounded-md flex items-center justify-center">
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
                    update
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
