import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getError } from '../../../Utils';

import { Dropdown } from 'flowbite-react';

import { FaPlus, FaFilter } from 'react-icons/fa';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { IoIosArrowDown } from 'react-icons/io';
import { MdOutlineMail } from 'react-icons/md';
import { LiaFilePdf } from 'react-icons/lia';
import { TbEyeSearch } from 'react-icons/tb';
import { ImCross } from 'react-icons/im';
import { TfiWrite } from 'react-icons/tfi';
import { Store } from '../../../Store';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, invoiceDetails: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function InvoiceList() {
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const [{ invoiceDetails, loading, error }, dispatch] = useReducer(reducer, {
    loading: false,
    invoiceDetails: [],
    error: '',
  });

  const { allInvoiceInformation } = state;

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        dispatch({ type: 'FETCH_SUCCESS', payload: allInvoiceInformation });
        console.log(invoiceDetails);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    fetchData();
  }, [invoiceDetails]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     dispatch({ type: 'FETCH_REQUEST' });
  //     try {
  //       const { data } = await axios.get('/api/data/fetchdata');
  //       dispatch({ type: 'FETCH_SUCCESS', payload: data.data.invoiceDetails });
  //     } catch (err) {
  //       dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
  //     }
  //   };

  //   fetchData();
  // }, []);

  //invoiceHandler

  const selectedInvoiceHandler = (invoice) => {
    setSelectedInvoice(invoice);
  };

  const handleSelectInvoice = (invoice) => {
    selectedInvoiceHandler(invoice);

    ctxDispatch({ type: 'SELECTED_INVOICE', payload: invoice });
  };

  return (
    <div>
      <div className="mb-4">
        <h1 className="md:text-3xl font-semibold">Invoice List</h1>
      </div>
      <div className="bg-white rounded-sm md:p-8 p-4 md:w-full w-[380px] md:mb-2 shadow-md">
        <div className=" lg:h-16 h-36 lg:grid lg:grid-cols-8 lg:gap-4 lg:overflow-hidden overflow-x-auto">
          <Link
            to={'/app/documents/createinvoice'}
            className=" flex items-center left-0 mb-2"
          >
            <button className="xl:w-48 w-full h-12 pl-2 xl:pl-0 bg-amber-300 hover:bg-[#570987] hover:text-amber-300 duration-300 shadow-md rounded-md text-xs flex items-center justify-center">
              <FaPlus className="mr-2" />
              Create Invoice
            </button>
          </Link>

          <div className="flex col-span-4 items-center justify-between lg:mb-0 mb-2">
            <input
              className="w-full h-8 md:w-full rounded-md mr-4 pl-4  border border-gray-300 "
              placeholder="Name/Title/Invoice No."
            />
            <button className="w-36 h-10 bg-amber-300 hover:bg-[#570987] hover:text-amber-300 duration-300 shadow-md rounded-md text-xs flex items-center justify-center">
              <FaMagnifyingGlass className="mr-2" />
              Find
            </button>
          </div>

          <div className=" flex col-span-3 items-center justify-between">
            <Dropdown
              label=""
              dismissOnClick={false}
              renderTrigger={() => (
                <span className="border cursor-pointer flex items-center justify-between p-1 rounded-md lg:w-96 mr-4 w-full">
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

            <button className="w-36 h-10 bg-amber-300 hover:bg-[#570987] hover:text-amber-300 duration-300 shadow-md rounded-md text-xs flex items-center justify-center">
              <FaFilter className="mr-2" />
              Filter
            </button>
          </div>
        </div>
      </div>

      {invoiceDetails ? (
        <div className=" bg-white rounded-md  shadow-md border mb-4 md:w-full w-full">
          <div className="w-full justify-center  xl:overflow-hidden overflow-x-auto overflow-y-auto ">
            <table className="table-auto border-collapse text-sm text-gray-500 w-full dark:text-gray-400 border-b">
              <thead className="text-xs text-white uppercase dark:text-gray-400 bg-[#570987]">
                <tr>
                  <th scope="col" className="px-6 py-3 ">
                    #
                  </th>
                  <th scope="col" className="px-6 py-3 ">
                    Invoice no.
                  </th>
                  <th scope="col" className="px-6 py-3 ">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3 ">
                    Client
                  </th>
                  <th scope="col" className="px-6 py-3 ">
                    Total (RM)
                  </th>
                  <th scope="col" className="px-6 py-3 ">
                    Payment Received (RM)
                  </th>
                  <th scope="col" className="px-6 py-3 ">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 ">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="text-center">
                {invoiceDetails.map((client, index) => (
                  <tr key={index} className="border-b-2">
                    <td className="px-6 py-4 border-r lg:text-sm text-xs">
                      {' '}
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 border-r">
                      <div className="px-6 py-4 lg:text-sm text-xs justify-center mx-auto items-center flex flex-col">
                        <p className="text-gray-700 font-bold">
                          {' '}
                          {client.invoice_number}
                        </p>
                        <p className="text-xs mb-2">{client.date}</p>
                      </div>
                    </td>

                    <td className="px-6 py-4 border-r lg:text-sm text-xs">
                      <strong>{client.title}</strong>
                    </td>
                    <td className="px-6 py-4 border-r lg:text-sm text-xs">
                      <div className=" justify-center mx-auto items-center flex flex-col">
                        <strong>
                          {client.selectedClientData[0].clientName}
                        </strong>
                        <Link>
                          <p className="underline cursor-text mb-1">
                            {client.email}
                          </p>
                        </Link>
                        <button className=" flex  bg-orange-400 text-center items-center text-white text-xs font-medium px-2.5 py-0.5 rounded ">
                          <MdOutlineMail className="mr-1" />
                          Email
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 border-r  lg:text-sm text-xs">
                      <strong>{client.finalPrice}</strong>
                    </td>
                    <td className="px-6 py-4 border-r lg:text-sm text-xs">
                      <div className="justify-center mx-auto items-center flex flex-col ">
                        <strong> {client.paymentReceived}</strong>
                        <button className=" flex mt-1 bg-yellow-200 text-center justify center items-center text-black text-xs font-medium px-2.5 py-0.5 rounded ">
                          <FaPlus className="mr-1" />
                          <div className="flex">
                            <p className="mr-1">Add</p>
                            <p>Payment</p>
                          </div>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 border-r  lg:text-sm text-xs">
                      <span className="bg-green-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-yellow-300 border border-green-300">
                        Complete
                      </span>
                    </td>

                    <td className="px-6 py-4 border-r  lg:text-sm text-xs">
                      <Link to={'/app/documents/invoicePDF'}>
                        <button
                          onClick={() => handleSelectInvoice(client)}
                          className="w-24 h-6 flex  bg-black text-center duration-300 hover:bg-[#570987] hover:text-amber-300  items-center rounded-t-sm justify-center text-white text-xs font-medium px-2.5 py-0.5 "
                        >
                          <LiaFilePdf className="mr-1" />
                          Download
                        </button>
                      </Link>

                      <button className="w-24 h-6 bg-blue-700 text-white hover:bg-[#570987] hover:text-amber-300 duration-300 shadow-md text-xs flex items-center justify-center">
                        <TbEyeSearch className=" mr-2" />
                        Details
                      </button>

                      <button className="w-24 h-6 bg-green-700 text-white hover:bg-[#570987] hover:text-amber-300 duration-300 shadow-md  text-xs flex items-center justify-center">
                        <TfiWrite className="mr-2" />
                        Update
                      </button>
                      <button className="w-24 h-6 bg-red-500 text-white hover:bg-[#570987] hover:text-amber-300 duration-300 shadow-md rounded-b-sm text-xs flex items-center justify-center">
                        <ImCross className="mr-2" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="md:w-[800px] w-full bg-red-500 items-center flex-center mx-auto shadow-md rounded-sm">
          <p className="text-center text-white">No Data</p>
        </div>
      )}
    </div>
  );
}
