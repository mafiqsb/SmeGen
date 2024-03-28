import { useReducer, useEffect } from 'react';
import axios from 'axios';

import { getError } from '../../Utils';

import ChartsComponent from './ChartsComponent';
import LatestInvoiceTable from './LatestInvoiceTable';

import LatestQuotationTable from './LatestQuotationTable';
import PaymentReceived from './PaymentReceived';
import WaitingPayment from './WaitingPayment';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        clientDetails: action.payload,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function Dashboard() {
  const [{ clientDetails, loading, error }, dispatch] = useReducer(reducer, {
    loading: false,
    clientDetails: [],
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await axios.get('/api/data/fetchdata');
        const latestClient = data.data[0];
        dispatch({
          type: 'FETCH_SUCCESS',
          payload: latestClient,
        });

        console.log('Latest Client:', latestClient);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex md:flex-row flex-col">
        <div className="flex flex-col md:mr-16 items-center mb-6 md:mb-0">
          <PaymentReceived />
          <WaitingPayment />
        </div>

        <div className="flex md:w-4/5 w-[350px]mx-auto justify-center items-center">
          <ChartsComponent />
        </div>
      </div>
      <div className="flex flex-col py-6 md:w-full w-full justify-center items-center">
        <LatestInvoiceTable clientDetails={clientDetails} />
        <LatestQuotationTable clientDetails={clientDetails} />
      </div>
    </div>
  );
}
