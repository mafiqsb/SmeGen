import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import data from '../../../data';

import { Datepicker } from 'flowbite-react';
import customThemeDatePicker from './customFile/customThemeDatePicker';

import { Dropdown } from 'flowbite-react';
import { FaPlus } from 'react-icons/fa';
import { HiArrowPathRoundedSquare } from 'react-icons/hi2';
import { TbWriting } from 'react-icons/tb';
import { IoIosArrowDown } from 'react-icons/io';
import { MdAttachEmail } from 'react-icons/md';
import { ImCross } from 'react-icons/im';

export default function CreateInvoice() {
  const [selectedClient] = useState(data.company[0]);

  return (
    <div>
      <div className="mb-4">
        <h1 className="lg:text-3xl font-bold">Create Invoice</h1>
      </div>
      <div className="bg-white">
        <div className="bg-white w-full lg:grid lg:grid-cols-2 rounded-sm shadow-sm p-4 ">
          <div>
            <div className="flex items-center mb-4">
              <h1 className="mr-4 text-lg font-semibold">Client</h1>
              <Link
                to={'/app/documents/createinvoice'}
                className=" flex items-center left-0"
              >
                <button className="xl:w-28 xl:h-8 w-36 h-8 pl-2 xl:pl-0 bg-amber-300 hover:bg-[#570987] hover:text-amber-300 duration-300 shadow-md rounded-md text-xs flex items-center justify-center">
                  <FaPlus className="mr-2" />
                  New Client
                </button>
              </Link>
            </div>
            <div className=" flex col-span-3 items-center justify-between mb-4">
              <Dropdown
                label=""
                dismissOnClick={false}
                renderTrigger={() => (
                  <span className="border cursor-pointer flex items-center justify-between p-1 rounded-md mr-4 w-full">
                    {selectedClient} <IoIosArrowDown />
                  </span>
                )}
              >
                {data.company.map((comp, index) => (
                  <div key={index}>
                    <Dropdown.Item>{comp}</Dropdown.Item>
                  </div>
                ))}
              </Dropdown>
            </div>
            <div>
              {data.clientDetails.map((client, index) => (
                <div key={index}>
                  <h3 className="text-sm font-bold">{client.client}</h3>
                  <p className="text-sm underline">{client.phone}</p>
                  <p className="text-sm underline mb-4">{client.email}</p>
                  <button className="w-32 h-6 bg-gray-300 font-semibold text-gray-800 duration-300 shadow-md rounded-sm text-xs flex items-center justify-center mb-8">
                    <TbWriting className="mr-2" />
                    Update Client
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className=" bg-gray-100 shadow-sm rounded-md p-4 text-gray-700">
            <div className="grid grid-cols-2 gap-4 w-full ">
              <div>
                <h1 className="font-semibold">Invoice Date</h1>
                <div className="">
                  <Datepicker theme={customThemeDatePicker} />
                </div>
              </div>
              <div>
                <h1 className="font-semibold">Pay Before</h1>

                <div>
                  <Datepicker theme={customThemeDatePicker} />
                </div>
              </div>
            </div>

            <div className="mt-4 text-center">
              <h1 className="font-semibold mb-2">Invoice Status</h1>
              <div className="bg-white rounded-md">
                <Dropdown
                  label=""
                  dismissOnClick={false}
                  renderTrigger={() => (
                    <span className="border cursor-pointer flex items-center justify-between p-1 rounded-md mr-4 w-full">
                      All Status <IoIosArrowDown />
                    </span>
                  )}
                >
                  <Dropdown.Item>Draft</Dropdown.Item>
                  <Dropdown.Item>New</Dropdown.Item>
                  <Dropdown.Item>Waiting Payment</Dropdown.Item>
                  <Dropdown.Item>Overdue</Dropdown.Item>
                  <Dropdown.Item>Paid</Dropdown.Item>
                  <Dropdown.Item>Process</Dropdown.Item>
                  <Dropdown.Item>Done</Dropdown.Item>
                  <Dropdown.Item>Cancel</Dropdown.Item>
                </Dropdown>
              </div>
            </div>
            <div className="text-center mt-6">
              <h1 className="font-semibold text-[30px]">#INV000001</h1>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="mb-4">
            <h1 className="text-lg font-semibold mb-4">Title</h1>
            <input className="shadow appearance-none border rounded xl:w-[800px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>

          <div className="flex flex-col rounded-md bg-white shadow-md mb-4 md:w-full xl:h-[175px] lg:h-[230px] w-full">
            <div className="w-full justify-center xl:overflow-hidden overflow-x-auto overflow-y-auto">
              <table className="table-auto border-collapse border-b text-sm text-gray-500  w-full dark:text-gray-400">
                <thead className="text-xs text-white h-20 uppercase dark:text-gray-400 bg-[#570987]">
                  <tr>
                    <th scope="col" className="md:px-6 md:py-3 ">
                      <div className=" text-center items-center flex p-3">
                        Services
                        <button className="xl:w-28 xl:h-6 w-36 h-6 pl-2 xl:pl-0 ml-2 text-gray-900 bg-amber-300 duration-300 shadow-md rounded-sm text-xs flex items-center justify-center">
                          <FaPlus className="mr-2" />
                          Add Service
                        </button>
                      </div>
                    </th>
                    <th scope="col" className="md:px-6 md:py-3 ">
                      Unit Price (RM)
                    </th>
                    <th scope="col" className="px-6 py-3 ">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3 ">
                      Total (RM)
                    </th>
                  </tr>
                </thead>
                <tbody className="text-center ">
                  <tr>
                    <td className="px-6 py-4 border-r lg:text-sm text-xs">
                      <textarea
                        id="message"
                        rows="4"
                        className="block p-2.5 w-[600px] h-10 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:text-black "
                        placeholder="Write your descriptions here..."
                      />
                      <button className="w-20 h-6 mt-2 bg-red-700 text-white hover:bg-[#570987] hover:text-amber-300 duration-300 shadow-md rounded-sm text-xs flex items-center justify-center">
                        <HiArrowPathRoundedSquare className="mr-2" />
                        Reset
                      </button>
                    </td>
                    <td className="px-6 py-4 border-r justify-center items-center">
                      <div className=" ">
                        <input
                          className="shadow appearance-none border rounded xl:w-[150px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          type="number"
                        />
                      </div>
                    </td>

                    <td className="px-6 py-4 border-r lg:text-sm text-xs">
                      <input
                        className="shadow appearance-none border rounded xl:w-[100px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                      />
                    </td>
                    <td className="px-6 py-4 border-r lg:text-sm text-xs">
                      <strong>1000000000</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-8 overflow-x-auto overflow-y-auto  border rounded-sm shadow-md bg-gray-100">
            <div className="md:grid md:grid-cols-12 border-b border-gray-700 ">
              <div className="md:w-full mr-4 justify-center mx-auto w-full md:col-span-8">
                <h1 className="mb-4 font-semibold text-xl">Note</h1>
                <textarea
                  className="w-full md:h-40 h-60 border border-gray-300 rounded-md focus:outline-none"
                  placeholder="Enter text here..."
                ></textarea>
              </div>
              <div className="md:w-[400px] w-full md:justify-end justify-center md:col-span-4">
                <div className="flex flex-col p-8">
                  <div className="justify-between">
                    <div className="flex justify-between mb-2">
                      <label>Sub-Total (RM)</label>
                      <p
                        type="text"
                        id="cukai"
                        className="border text-center border-gray-300 rounded-md md:px-2 md:py-1 md:w-24 focus:outline-none"
                      >
                        100
                      </p>
                    </div>
                    <div className="flex justify-between mb-2">
                      <label>Tax (RM)</label>
                      <p
                        type="text"
                        id="cukai"
                        className="border text-center border-gray-300 rounded-md md:px-2 md:py-1 md:w-24 focus:outline-none"
                      >
                        20
                      </p>
                    </div>
                    <div className="flex justify-between mb-2">
                      <label>Tax (%)</label>
                      <p
                        type="text"
                        id="percentage"
                        className="border text-center border-gray-300 rounded-md md:px-2 md:py-1 md:w-24 focus:outline-none"
                      >
                        20
                      </p>
                    </div>
                    <div className="flex justify-between mb-2">
                      <label>Shipping</label>
                      <p
                        type="text"
                        id="penghantaran"
                        className="border text-center border-gray-300 rounded-md md:px-2 md:py-1 md:w-24 focus:outline-none"
                      >
                        20
                      </p>
                    </div>
                    <div className="flex justify-between mb-2">
                      <label>Final Price (RM)</label>
                      <p
                        type="text"
                        id="jumlah"
                        className="border text-center border-gray-300 rounded-md md:px-2 md:py-1 md:w-24 focus:outline-none"
                      >
                        1000
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 flex mt-2 justify-end">
              <button className="md:w-36 md:h-10 w-40  h-10 mr-2 rounded-sm bg-gray-200 text-gray-700 hover:bg-[#570987] hover:text-amber-300 duration-300 shadow-md rounded-t-sm text-xs flex items-center justify-center">
                <ImCross className="mr-2" />
                Cancel
              </button>
              <button className="md:w-36 md:h-10 w-40 h-10 mr-2 rounded-sm bg-blue-700 text-white hover:bg-[#570987] hover:text-amber-300 duration-300 shadow-md text-xs flex items-center justify-center">
                <MdAttachEmail className="mr-2" />
                Email
              </button>
              <button className="md:w-36 md:h-10 w-40 h-10 mr-2 rounded-sm bg-green-700 text-white hover:bg-[#570987] hover:text-amber-300 duration-300 shadow-md rounded-b-sm text-xs flex items-center justify-center">
                <FaPlus className="mr-2" />
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
