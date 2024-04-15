import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Dashboard from './Screens/Dashboard/Dashboard';
import CreateInvoice from './Screens/Documents/Invoice_List/CreateInvoice';
import InvoiceList from './Screens/Documents/Invoice_List/InvoiceList';
import InvoiceTemplate from './Screens/Documents/Invoice_List/PDF/InvoiceTemplate';
import BankSetup from './Screens/Settings/BankSetup';
import CompanyInformation from './Screens/Settings/CompanyInformation';
import UploadLogo from './Screens/Settings/UploadLogo';
import Client from './Screens/ClientList/Client';
import CreateUpdateClientModal from './Screens/ClientList/CreateUpdateClientModel';
import { getError } from './Utils';
import { Store } from './Store';
import DocumentSettings from './Screens/Settings/DocumentSettings';
import axios from 'axios';
import CreateDeleteClientModel from './Screens/ClientList/CreateDeleteClientModel';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, clientDetails: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default function Center() {
  const [createClientModal, setCreateClientModal] = useState(false);
  const [createDeleteModal, setCreateDeleteModal] = useState(false);

  const [{ clientDetails }, dispatch] = useReducer(reducer, {
    loading: false,
    clientDetails: [],
    error: '',
  });

  const { state, dispatch: ctxDispatch } = useContext(Store);

  const { userInfo } = state;

  const toggleCreateClientModel = () => {
    setCreateClientModal(!createClientModal);
  };

  const toggleDeleteClientModel = () => {
    setCreateDeleteModal(!createDeleteModal);
  };

  const handleCloseCreateModal = () => {
    setCreateClientModal(false);
    localStorage.removeItem('selected_client_update');
    ctxDispatch({ type: 'SELECTED_CLIENT_UPDATE', payload: '' });
  };

  const handleCloseDeleteModal = () => {
    setCreateDeleteModal(false);
  };

  const handleOutsideCreateClick = (event) => {
    if (event.target === event.currentTarget) {
      toggleCreateClientModel();

      localStorage.removeItem('selected_client_update');

      ctxDispatch({ type: 'SELECTED_CLIENT_UPDATE', payload: '' });
    }
  };

  const handleOutsideDeleteClick = (event) => {
    if (event.target === event.currentTarget) {
      toggleDeleteClientModel();
    }
  };

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
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    fetchData();
  }, [ctxDispatch]);

  return (
    <div
      className={
        createClientModal
          ? 'fixed flex md:flex-row flex-col'
          : 'flex md:flex-row flex-col relative'
      }
    >
      <div className="">
        <Header />
      </div>

      <div className=" justify-center h-screen grow md:pt-32 bg-slate-50 pt-28 md:px-16 overflow-y-auto md:w-full w-[380px] mx-auto pb-20">
        <Routes>
          <Route path={'/app/dashboard'} element={<Dashboard />} />
          <Route
            path={'/app/documents/invoicelist'}
            element={<InvoiceList />}
          />
          <Route
            path={'/app/documents/createinvoice'}
            element={
              <CreateInvoice
                toggleCreateClientModel={toggleCreateClientModel}
              />
            }
          />
          <Route
            path={'/app/documents/invoicePDF'}
            element={<InvoiceTemplate />}
          />
          <Route
            path={'/app/settings/companyinformation'}
            element={<CompanyInformation />}
          />
          <Route path={'/app/settings/logoupload'} element={<UploadLogo />} />
          <Route path={'app/settings/banksettings'} element={<BankSetup />} />
          <Route
            path={'/app/client/clientlist'}
            element={
              <Client
                toggleCreateClientModel={toggleCreateClientModel}
                toggleDeleteClientModel={toggleDeleteClientModel}
                clientDetails={clientDetails}
              />
            }
          />

          <Route />
          <Route
            path={'/app/settings/documentsettings'}
            element={<DocumentSettings />}
          />
        </Routes>
      </div>

      <div className="md:fixed fixed bottom-0 w-full z-30 ">
        <Footer />
      </div>

      {createClientModal && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={handleOutsideCreateClick}
        >
          <div className="relative justify-center items-center flex">
            <CreateUpdateClientModal onClose={handleCloseCreateModal} />
          </div>
        </div>
      )}
      {createDeleteModal && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={handleOutsideDeleteClick}
        >
          <div className="relative justify-center items-center flex">
            <CreateDeleteClientModel onClose={handleCloseDeleteModal} />
          </div>
        </div>
      )}
    </div>
  );
}
