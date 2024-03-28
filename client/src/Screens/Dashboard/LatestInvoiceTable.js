// import React from 'react';
import { FaArrowCircleRight } from 'react-icons/fa';

export default function LatestInvoiceTable(props) {
  const { clientDetails } = props;
  return (
    <div className="flex flex-col bg-white rounded-md  shadow-md border mb-4 w-full">
      <div className="flex justify-between items-center md:p-4 border-b p-8">
        <h2 className="font-bold text-xl">Latest Invoice</h2>
        <button className="flex bg-amber-300 text-[#570987] hover:bg-[#570987] hover:text-amber-300 duration-300 md:w-36 md:h-8 w-28 h-8 shadow-md rounded-md items-center justify-center text-xs">
          {' '}
          <FaArrowCircleRight className="mr-2" />
          Show Others
        </button>
      </div>
      <div className="w-full justify-center  lg:overflow-hidden overflow-x-auto overflow-y-auto ">
        <table className="table-auto border-collapse text-sm text-gray-500 w-full dark:text-gray-400">
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
                Status
              </th>
            </tr>
          </thead>
          {clientDetails && (
            <tbody className="text-center">
              <tr className="border-b-2">
                <td className="px-6 py-4 border-r lg:text-sm text-xs">
                  {clientDetails.number}
                </td>
                <td className="px-6 py-4 border-r">
                  <div>
                    <p className="text-gray-700 font-bold">
                      {clientDetails.invoice_number}
                    </p>
                    <p className="text-xs">{clientDetails.date}</p>
                  </div>
                </td>

                <td className="px-6 py-4 border-r lg:text-sm text-xs">
                  <strong>{clientDetails.title}</strong>
                </td>
                <td className="px-6 py-4 border-r  lg:text-sm text-xs">
                  <strong>{clientDetails.client}</strong>
                </td>
                <td className="px-6 py-4 border-r  lg:text-sm text-xs">
                  {clientDetails.total}
                </td>
                <td className="px-6 py-4 border-r  lg:text-sm text-xs">
                  <span className="bg-green-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-yellow-300 border border-green-300">
                    Done
                  </span>
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}
