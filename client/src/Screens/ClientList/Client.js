import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getError } from '../../Utils';

import { FaPlus } from 'react-icons/fa';
import { FaMagnifyingGlass } from 'react-icons/fa6';

import { ImCross } from 'react-icons/im';
import { TfiWrite } from 'react-icons/tfi';
import { Store } from '../../Store';

export default function Client({ toggleCreateClientModel, clientDetails }) {
  const { dispatch: ctxDispatch } = useContext(Store);

  const [selectedClient, setSelectedClient] = useState('');

  const selectedClientHandler = (client) => {
    setSelectedClient(client);
  };

  // Ensure the state is updated before dispatching
  const handleClientUpdate = (client) => {
    selectedClientHandler(client);
    // Dispatch the updated client after the state is updated
    ctxDispatch({ type: 'SELECTED_CLIENT_UPDATE', payload: client });
  };

  return (
    <div>
      <div className="mb-4">
        <h1 className="md:text-3xl font-semibold">Client List</h1>
      </div>
      <div className="bg-white rounded-sm md:p-8 p-4  md:w-full w-[380px] md:mb-2 shadow-md">
        <div className=" lg:h-16 h-36 lg:grid lg:grid-cols-8 lg:gap-4 lg:overflow-hidden overflow-x-auto">
          <div className=" flex items-center left-0 mb-2">
            <button
              onClick={toggleCreateClientModel}
              className="lg:w-48 w-full h-12 pl-2 xl:pl-0 bg-amber-300 hover:bg-[#570987] hover:text-amber-300 duration-300 shadow-md rounded-md text-xs flex items-center justify-center"
            >
              <FaPlus className="mr-2" />
              Create Client
            </button>
          </div>

          <div className="flex col-span-4 items-center justify-between lg:mb-0 mb-2">
            <input
              className="w-full h-8 md:w-full rounded-md mr-4 pl-4  border border-gray-300 "
              placeholder="Find by Name"
            />
            <button className="w-36 h-10 bg-amber-300 hover:bg-[#570987] hover:text-amber-300 duration-300 shadow-md rounded-md text-xs flex items-center justify-center">
              <FaMagnifyingGlass className="mr-2" />
              Find
            </button>
          </div>
        </div>
      </div>

      {clientDetails.length > 0 ? (
        <div className=" bg-white rounded-md  shadow-md border mb-4 md:w-full w-full">
          <div className="w-full justify-center  xl:overflow-hidden overflow-x-auto overflow-y-auto ">
            <table className="table-auto border-collapse text-sm text-gray-500 w-full dark:text-gray-400 border-b">
              <thead className="text-xs text-white uppercase dark:text-gray-400 bg-[#570987]">
                <tr>
                  <th scope="col" className="px-6 py-3 ">
                    #
                  </th>
                  <th scope="col" className="px-6 py-3 ">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 ">
                    Company
                  </th>
                  <th scope="col" className="px-6 py-3 ">
                    Address
                  </th>

                  <th scope="col" className="px-6 py-3 ">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="text-center">
                {clientDetails.map((client, index) => (
                  <tr key={index} className="border-b-2">
                    <td className="px-6 py-4 border-r text-left lg:text-sm text-xs">
                      {' '}
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 border-r">
                      <div className="px-6 py-4 lg:text-sm text-xs  flex flex-col">
                        <p className="text-gray-700 text-left font-bold">
                          {' '}
                          {client.clientName}
                        </p>
                        <div className="flex text-left">
                          <p className="cursor-text mb-1 text-xs mr-2">
                            {client.phoneNumber}
                          </p>
                          <p className="underline cursor-text mb-1 text-xs">
                            {client.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 border-r text-left lg:text-sm text-xs">
                      {client.companyName}
                    </td>
                    <td className="px-6 py-4 border-r text-left lg:text-sm text-xs">
                      <strong>{client.address1}, </strong>
                      <strong>{client.address2}, </strong>
                      <strong>{client.postcode}, </strong>
                      <strong>{client.state}, </strong>
                    </td>

                    <td className="border-r mx-auto py-6 flex flex-col justify-center items-center lg:text-sm text-xs">
                      <div className="flex flex-grow justify-center items-center">
                        <button
                          onClick={() => {
                            handleClientUpdate(client);
                            toggleCreateClientModel();
                          }}
                          className=" w-20 h-6 bg-green-700 text-white hover:bg-[#570987] hover:text-amber-300 duration-300 shadow-md text-xs flex items-center justify-center"
                        >
                          <TfiWrite className="mr-2" />
                          Update
                        </button>
                      </div>
                      <div className="flex flex-grow justify-center items-center">
                        <button className="w-20 h-6 bg-red-500 text-white hover:bg-[#570987] hover:text-amber-300 duration-300 shadow-md rounded-b-sm text-xs flex items-center justify-center">
                          <ImCross className="mr-2" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="md:w-[800px] w-full bg-red-500 items-center flex-center mx-auto shadow-md rounded-sm">
          <p className="text-center text-white">Internal Error</p>
        </div>
      )}
    </div>
  );
}
