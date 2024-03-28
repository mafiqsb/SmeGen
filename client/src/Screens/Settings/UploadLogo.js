import React from 'react';
import { GrPowerReset } from 'react-icons/gr';
import { MdCloudUpload } from 'react-icons/md';

export default function UploadLogo() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="md:text-3xl font-semibold">Upload Logo</h1>
      </div>
      <div className="bg-white rounded-md md:p-8 p-4 xl:w-[800px] md:w-full w-[380px] md:mb-2 shadow-md">
        <div>
          <p className="font-semibold mb-4">Current Logo</p>
          <img src="/images/BLACK.png" className="w-80" alt="logo" />
          <div>
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
            />
          </div>
          <div className=" mt-8 border-t-4">
            <div className="mt-8 flex justify-end">
              <button className="xl:w-48  w-full mr-2 h-12 pl-2 xl:pl-0 text-gray-700 font-bold hover:bg-gray-500 hover:text-white bg-gray-300  duration-300 shadow-md rounded-md flex items-center justify-center">
                <GrPowerReset className="mr-2" />
                Reset
              </button>
              <button className="xl:w-48 w-full h-12 pl-2 xl:pl-0 bg-amber-300 hover:bg-[#570987] hover:text-amber-300  duration-300 shadow-md rounded-md flex items-center justify-center">
                <MdCloudUpload className="mr-2" />
                New Image
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
