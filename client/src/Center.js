import React from 'react';
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

export default function Center() {
  return (
    <div className="flex md:flex-row flex-col">
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
            element={<CreateInvoice />}
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
          <Route path={'/app/settings/banksettings'} element={<BankSetup />} />
        </Routes>
      </div>

      <div className="md:fixed fixed bottom-0 w-full z-30 ">
        <Footer />
      </div>
    </div>
  );
}
