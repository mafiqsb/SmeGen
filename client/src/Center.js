import React, { useState } from 'react';
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

export default function Center() {
  const [createClientModal, setCreateClientModal] = useState(false);

  const toggleCreateClientModel = () => {
    setCreateClientModal(!createClientModal);
  };

  const handleCloseModal = () => {
    setCreateClientModal(false);
  };

  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      console.log(event.currentTarget);
      toggleCreateClientModel();
    }
  };

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
              <Client toggleCreateClientModel={toggleCreateClientModel} />
            }
          />

          <Route />
        </Routes>
      </div>

      <div className="md:fixed fixed bottom-0 w-full z-30 ">
        <Footer />
      </div>

      {createClientModal && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={handleOutsideClick}
        >
          <div className="relative justify-center items-center flex">
            <CreateUpdateClientModal onClose={handleCloseModal} />
          </div>
        </div>
      )}
    </div>
  );
}
