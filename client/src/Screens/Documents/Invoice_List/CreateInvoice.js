'use client';

import React, { useState, useEffect, useReducer, useContext } from 'react';

import { Datepicker } from 'flowbite-react';
import customThemeDatePicker from './customFile/customThemeDatePicker';

import { Dropdown } from 'flowbite-react';
import { FaPlus } from 'react-icons/fa';
import { HiArrowPathRoundedSquare } from 'react-icons/hi2';
import { TbWriting } from 'react-icons/tb';
import { IoIosArrowDown } from 'react-icons/io';
import { MdAttachEmail } from 'react-icons/md';
import { ImCross } from 'react-icons/im';
import { getError } from '../../../Utils';
import { Store } from '../../../Store';
import axios from 'axios';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, clientData: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function CreateInvoice({ toggleCreateClientModel }) {
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const { userInfo } = state;
  const [{ clientData }, dispatch] = useReducer(reducer, {
    loading: false,
    clientData: [],
    error: '',
  });
  const [selectedStatus, setSelectedStatus] = useState('');
  const [invoiceDate, setInvoiceDate] = useState();
  const [payBeforeDate, setPayBeforeDate] = useState();
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [subTotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [tax, setTax] = useState(0);
  const [taxPrice, setTaxPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedClientUpdate, setSelectedClientUpdate] = useState('');
  const [rows, setRows] = useState([
    {
      descriptions: '',
      unitPrice: (0).toFixed(2),
      quantity: 1,
      totalPrice: 0,
    },
  ]);

  // Function to format date
  const formatDate = (date) => {
    if (date instanceof Date && !isNaN(date)) {
      return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    } else {
      return '';
    }
  };

  // FETCH CLIENT DATA FUNCTION

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await axios.get('/api/client/getallclient', {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });

        dispatch({
          type: 'FETCH_SUCCESS',
          payload: data,
        });
        console.log(data);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    fetchData();
  }, [ctxDispatch, userInfo.token]);

  useEffect(() => {
    if (clientData.length > 0) {
      setSelectedClient(clientData[clientData.length - 1].clientName);
    }
  }, [clientData]);

  useEffect(() => {
    if (!invoiceDate) {
      setInvoiceDate(new Date());
    }
    if (!payBeforeDate) {
      setPayBeforeDate(new Date());
    }
  }, [invoiceDate, payBeforeDate]);

  const handleInvoiceDateChange = (date) => {
    setInvoiceDate(date);
  };

  const handlePayBeforeDateChange = (date) => {
    setPayBeforeDate(date);
  };

  useEffect(() => {
    const calculatedSubtotal = rows.reduce(
      (acc, curr) => acc + curr.totalPrice,
      0
    );
    setSubtotal(calculatedSubtotal);
  }, [rows]);

  useEffect(() => {
    let calculatedFinalPrice = 0;

    // Check if tax is present
    if (!isNaN(tax)) {
      const calculatedTaxPrice = subTotal * (tax / 100);

      calculatedFinalPrice = subTotal + taxPrice;

      setTaxPrice(calculatedTaxPrice);
      setFinalPrice(calculatedFinalPrice);
    } else {
      calculatedFinalPrice = subTotal;
    }

    // Check if shipping is present
    if (!isNaN(shipping)) {
      calculatedFinalPrice = subTotal + shipping;

      setFinalPrice(parseFloat(calculatedFinalPrice));
    }

    // Check if shipping is present

    if (!isNaN(shipping) && !isNaN(tax)) {
      calculatedFinalPrice = subTotal + taxPrice + parseFloat(shipping);

      if (isNaN(calculatedFinalPrice)) {
        calculatedFinalPrice = 0;
      }

      setFinalPrice(parseFloat(calculatedFinalPrice));
    }

    // Update final price state
    setFinalPrice(parseFloat(calculatedFinalPrice));
  }, [subTotal, tax, taxPrice, shipping]);

  // row serviceUpdate, calculation

  const handleServiceChange = (e, index) => {
    const newRows = [...rows];
    newRows[index].descriptions = e.target.value;
    setRows(newRows);
  };

  const handleUnitPriceChange = (e, index) => {
    const price = parseFloat(e.target.value);
    const newRows = [...rows];
    newRows[index].unitPrice = price;
    newRows[index].totalPrice =
      isNaN(price) || isNaN(newRows[index].quantity)
        ? 0
        : price * newRows[index].quantity;

    setRows(newRows);
  };

  const handleQuantityChange = (e, index) => {
    const quantity = parseFloat(e.target.value);
    const newRows = [...rows];
    newRows[index].quantity = quantity;

    newRows[index].totalPrice =
      isNaN(quantity) || isNaN(newRows[index].unitPrice)
        ? 0
        : quantity * newRows[index].unitPrice;

    setRows(newRows);
  };

  const addRowHandler = () => {
    setRows((prevRows) => [
      ...prevRows,
      {
        descriptions: '',
        unitPrice: (0).toFixed(2),
        quantity: 1,
        totalPrice: 0,
      },
    ]);
  };

  const submitInvoiceHandler = (e) => {
    e.preventDefault();

    if (selectedStatus === '') {
      window.alert('please select status');
      return;
    }

    const selectedClientData = clientData.filter(
      (client) => client.clientName === selectedClient
    );

    console.log({
      title: title,
      note: note,
      rows: rows,
      subTotal: subTotal,
      tax: tax,
      taxPrice: taxPrice,
      shipping: shipping,
      finalPrice: finalPrice,
      invoiceDate: formatDate(invoiceDate),
      payBeforeDate: formatDate(payBeforeDate),
      selectedStatus: selectedStatus,
      selectedClientData: selectedClientData,
    });

    ctxDispatch({
      type: 'ALL_INVOICE_INFORMATION',
      payload: {
        title: title,
        note: note,
        rows: rows,
        subTotal: subTotal,
        tax: tax,
        taxPrice: taxPrice,
        shipping: shipping,
        finalPrice: finalPrice,
        invoiceDate: formatDate(invoiceDate),
        payBeforeDate: formatDate(payBeforeDate),
        selectedStatus: selectedStatus,
        selectedClientData: selectedClientData,
      },
    });
  };

  const handleClientState = (client) => {
    setSelectedClientUpdate(client);
  };

  const handleClientUpdate = (client) => {
    handleClientState(client);

    ctxDispatch({ type: 'SELECTED_CLIENT_UPDATE', payload: client });
  };

  const deleteRowHandler = (index) => {
    const updatedRows = rows.filter((_, rowIndex) => rowIndex !== index);
    setRows(updatedRows);
  };

  return (
    <div>
      <div className="mb-4">
        <h1 className="lg:text-3xl font-semibold">Create Invoice</h1>
      </div>
      <form onSubmit={(e) => submitInvoiceHandler(e)}>
        <div className="bg-white">
          <div className="bg-white w-full lg:grid lg:grid-cols-2 rounded-sm shadow-sm p-4 ">
            <div>
              <div className="flex items-center mb-4">
                <h1 className="mr-4 text-lg font-semibold">Client</h1>
                <div className=" flex items-center left-0">
                  <button
                    type="button"
                    onClick={toggleCreateClientModel}
                    className="xl:w-28 xl:h-8 w-36 h-8 pl-2 xl:pl-0 bg-amber-300 hover:bg-[#570987] hover:text-amber-300 duration-300 shadow-md rounded-md text-xs flex items-center justify-center"
                  >
                    <FaPlus className="mr-2" />
                    New Client
                  </button>
                </div>
              </div>
              <div className=" flex col-span-3 items-center justify-between mb-4">
                <Dropdown
                  label=""
                  dismissOnClick={true}
                  renderTrigger={() => (
                    <span className="border cursor-pointer flex items-center justify-between p-1 rounded-md mr-4 w-full">
                      {selectedClient.length === ''
                        ? clientData[clientData.length - 1].clientName
                        : selectedClient}
                      <IoIosArrowDown />
                    </span>
                  )}
                >
                  {clientData.map((client, index) => (
                    <div key={index}>
                      <Dropdown.Item
                        onClick={() => setSelectedClient(client.clientName)}
                      >
                        {client.clientName}
                      </Dropdown.Item>
                    </div>
                  ))}
                </Dropdown>
              </div>

              <div>
                {clientData.map((client, index) =>
                  client.clientName === selectedClient ? (
                    <div key={index}>
                      <h3 className="text-sm font-bold">{client.clientName}</h3>
                      <p className="text-sm underline">{client.phoneNumber}</p>
                      <p className="text-sm underline mb-4">{client.email}</p>
                      <button
                        onClick={() => {
                          handleClientUpdate(client);
                          toggleCreateClientModel();
                        }}
                        type="button"
                        className="w-32 h-6 bg-gray-300 font-semibold text-gray-800 duration-300 shadow-md rounded-sm text-xs flex items-center justify-center mb-8"
                      >
                        <TbWriting className="mr-2" />
                        Update Client
                      </button>
                    </div>
                  ) : null
                )}
              </div>
            </div>
            <div className=" bg-gray-100 shadow-sm rounded-md p-4 text-gray-700">
              <div className="grid grid-cols-2 gap-4 w-full ">
                <div>
                  <h1 className="font-semibold">Invoice Date</h1>
                  <div className="">
                    <Datepicker
                      className="cursor-pointer"
                      onSelectedDateChanged={handleInvoiceDateChange}
                      theme={customThemeDatePicker}
                      defaultDate={invoiceDate}
                    />
                  </div>
                </div>
                <div>
                  <h1 className="font-semibold">Pay Before</h1>

                  <div>
                    <Datepicker
                      onSelectedDateChanged={handlePayBeforeDateChange}
                      defaultDate={payBeforeDate}
                      theme={customThemeDatePicker}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center">
                <h1 className="font-semibold mb-2">Invoice Status</h1>
                <div className="bg-white rounded-md">
                  <Dropdown
                    label=""
                    dismissOnClick={true}
                    renderTrigger={() => (
                      <span className="border cursor-pointer flex items-center justify-between p-1 rounded-md mr-4 w-full">
                        {selectedStatus || 'All Status'}
                        <IoIosArrowDown />
                      </span>
                    )}
                  >
                    <Dropdown.Item
                      onClick={() => setSelectedStatus('Done Deposit')}
                    >
                      Done Deposit
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => setSelectedStatus('Waiting Payment')}
                    >
                      Waiting Payment
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => setSelectedStatus('Paid (2nd Payment)')}
                    >
                      Paid (2nd Payment)
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => setSelectedStatus('Paid (3rd Payment)')}
                    >
                      Paid (3rd Payment)
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => setSelectedStatus('Complete')}
                    >
                      Complete
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setSelectedStatus('Overdue')}>
                      Overdue
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setSelectedStatus('Cancel')}>
                      Cancel
                    </Dropdown.Item>
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
              <input
                onChange={(e) => setTitle(e.target.value)}
                className="shadow appearance-none border rounded xl:w-[800px] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="flex flex-col rounded-md bg-white shadow-md mb-4 md:w-full w-full">
              <div className="w-full justify-center xl:overflow-hidden overflow-x-auto overflow-y-auto">
                <table className="table-auto border-collapse border-b text-sm text-gray-500  w-full dark:text-gray-400">
                  <thead className="text-xs text-white h-20 uppercase dark:text-gray-400 bg-[#570987]">
                    <tr>
                      <th scope="col" className="md:px-6 md:py-3 ">
                        <div
                          onClick={addRowHandler}
                          className=" text-center items-center flex p-3"
                        >
                          Services
                          <button
                            type="button"
                            className="xl:w-28 xl:h-6 w-36 h-6 pl-2 xl:pl-0 ml-2 text-gray-900 bg-amber-300 duration-300 shadow-md rounded-sm text-xs flex items-center justify-center"
                          >
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

                  <tbody className="text-center">
                    {rows.map((row, index) => (
                      <tr key={index} className="border-b-4">
                        <td className="px-6 py-4 border-r lg:text-sm text-xs">
                          <textarea
                            id="message"
                            rows="4"
                            value={row.descriptions}
                            onChange={(e) => {
                              handleServiceChange(e, index);
                            }}
                            className="block p-2.5 w-[600px] h-10 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:text-black "
                            placeholder="Write your descriptions here..."
                          />
                          <button
                            type="button"
                            className="w-20 h-6 mt-2 bg-red-700 text-white hover:bg-[#570987] hover:text-amber-300 duration-300 shadow-md rounded-sm text-xs flex items-center justify-center"
                            onClick={() => deleteRowHandler(index)}
                          >
                            <HiArrowPathRoundedSquare className="mr-2" />
                            Delete
                          </button>
                        </td>
                        <td className="px-6 py-4 border-r justify-center items-center">
                          <div className=" ">
                            <input
                              value={row.unitPrice}
                              onChange={(e) =>
                                handleUnitPriceChange(
                                  {
                                    ...e,
                                    target: {
                                      ...e.target,
                                      value: parseFloat(e.target.value).toFixed(
                                        2
                                      ),
                                    },
                                  },
                                  index
                                )
                              }
                              className="shadow appearance-none border rounded xl:w-[150px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              type="number"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 border-r lg:text-sm text-xs">
                          <input
                            value={row.quantity}
                            onChange={(e) => handleQuantityChange(e, index)}
                            className="shadow appearance-none border rounded xl:w-[100px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="number"
                          />
                        </td>
                        <td className="px-6 py-4 border-r lg:text-sm text-xs">
                          <strong>{row.totalPrice.toFixed(2)}</strong>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-8 overflow-x-auto overflow-y-auto  border rounded-sm shadow-md bg-gray-100">
              <div className="md:grid md:grid-cols-12 border-b border-gray-700 ">
                <div className="md:w-full mr-4 justify-center mx-auto w-full md:col-span-8">
                  <h1 className="mb-4 font-semibold text-xl">Note</h1>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
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
                          className="text-center rounded-md md:px-2 md:py-1 md:w-24 md:h-8 border-none bg-gray-100 font-semibold focus:outline-none "
                        >
                          {subTotal.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex justify-between mb-2">
                        <label>Shipping (RM)</label>
                        <input
                          value={shipping}
                          onChange={(e) => setShipping(e.target.value)}
                          type="number"
                          id="penghantaran"
                          className="border text-center border-black rounded-md md:px-2 md:py-1 md:w-24 focus:outline-none"
                        />
                      </div>
                      <div className="flex justify-between mb-2">
                        <label>Tax (%)</label>
                        <input
                          value={tax}
                          onChange={(e) => setTax(e.target.value)}
                          type="number"
                          id="percentage"
                          className="border text-center border-black rounded-md md:px-2 md:py-1 md:w-24 focus:outline-none "
                        />
                      </div>
                      <div className="flex justify-between mb-2">
                        <label>Total Tax (RM)</label>
                        <p
                          type="number"
                          id="cukai"
                          className="text-center md:h-8 border-none bg-gray-100 rounded-md md:px-2 md:py-1 md:w-24"
                        >
                          {taxPrice.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex justify-between mb-2">
                        <label>Final Price (RM)</label>
                        <p
                          type="text"
                          id="jumlah"
                          className="text-center md:h-8 border-none bg-gray-100 rounded-md md:px-2 md:py-1 md:w-24 font-semibold"
                        >
                          {finalPrice.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 flex mt-2 justify-end">
                <button
                  type="button"
                  className="md:w-36 md:h-10 w-40  h-10 mr-2 rounded-sm bg-gray-200 text-gray-700 hover:bg-[#570987] hover:text-amber-300 duration-300 shadow-md rounded-t-sm text-xs flex items-center justify-center"
                >
                  <ImCross className="mr-2" />
                  Cancel
                </button>
                <button
                  type="button"
                  className="md:w-36 md:h-10 w-40 h-10 mr-2 rounded-sm bg-blue-700 text-white hover:bg-[#570987] hover:text-amber-300 duration-300 shadow-md text-xs flex items-center justify-center"
                >
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
      </form>
    </div>
  );
}
