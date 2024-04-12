import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  userInfo: localStorage.getItem('user_info')
    ? JSON.parse(localStorage.getItem('user_info'))
    : null,
  companyInformation: localStorage.getItem('company_information')
    ? JSON.parse(localStorage.getItem('company_information'))
    : null,
  bankInformation: localStorage.getItem('bank_information')
    ? JSON.parse(localStorage.getItem('bank_information'))
    : null,
  logoInformation: localStorage.getItem('logo_information')
    ? JSON.parse(localStorage.getItem('logo_information'))
    : null,
  clientInformation: localStorage.getItem('client_information')
    ? JSON.parse(localStorage.getItem('client_information'))
    : [],
  clientUpdate: localStorage.getItem('selected_client_update')
    ? JSON.parse(localStorage.getItem('selected_client_update'))
    : null,

  allInvoiceInformation: localStorage.getItem('all_invoice_information')
    ? JSON.parse(localStorage.getItem('all_invoice_information'))
    : null,

  invoiceUpdate: localStorage.getItem('selected_invoice')
    ? JSON.parse(localStorage.getItem('selected_invoice'))
    : null,
  documentSettings: localStorage.getItem('document_settings')
    ? JSON.parse(localStorage.getItem('document_settings'))
    : null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...state,
        userInfo: action.payload,
      };
    case 'COMPANY_INFORMATION':
      const companyInfo = action.payload;

      localStorage.setItem('company_information', JSON.stringify(companyInfo));

      return {
        ...state,
        companyInformation: companyInfo,
      };

    case 'BANK_INFORMATION':
      const { nameHolder, accountHolder, imgSrc, bankName, id } =
        action.payload;

      console.log({ nameHolder, accountHolder, imgSrc, bankName, id });
      const updatedBankInformation = {
        nameHolder: nameHolder,
        accountHolder: accountHolder,
        imgSrc: imgSrc,
        bankName: bankName,
        id: id,
      };
      localStorage.setItem(
        'bank_information',
        JSON.stringify(updatedBankInformation)
      );
      return {
        ...state,
        bankInformation: updatedBankInformation, // Update bankInformation state with the latest data
      };

    case 'LOGO_INFORMATION':
      const companyLogo = action.payload;

      localStorage.setItem('logo_information', JSON.stringify(companyLogo));
      return {
        ...state,
        logoInformation: companyLogo,
      };

    case 'CLIENT_INFORMATION':
      const clientData = action.payload;

      const updatedClientData = [...state.clientInformation, clientData];

      localStorage.setItem(
        'client_information',
        JSON.stringify(updatedClientData)
      );

      return {
        ...state,
        clientInformation: updatedClientData,
      };

    case 'SELECTED_CLIENT_UPDATE':
      const temporaryFileTransfer = action.payload;

      console.log(temporaryFileTransfer);

      localStorage.setItem(
        'selected_client_update',
        JSON.stringify(temporaryFileTransfer)
      );
      return {
        ...state,
        clientUpdate: temporaryFileTransfer,
      };

    case 'ALL_INVOICE_INFORMATION':
      const invoiceData = action.payload;

      const updatedInvoiceData = state.allInvoiceInformation
        ? [...state.allInvoiceInformation, invoiceData]
        : [invoiceData];

      localStorage.setItem(
        'all_invoice_information',
        JSON.stringify(updatedInvoiceData)
      );

      return {
        ...state,
        allInvoiceInformation: updatedInvoiceData,
      };

    case 'SELECTED_INVOICE':
      const temporaryInvoiceTransfer = action.payload;

      console.log(temporaryInvoiceTransfer);

      localStorage.setItem(
        'selected_invoice',
        JSON.stringify(temporaryInvoiceTransfer)
      );

      return {
        ...state,
        invoiceUpdate: temporaryInvoiceTransfer,
      };

    case 'DOCUMENT_SETTINGS':
      const documentData = action.payload;

      localStorage.setItem('document_settings', JSON.stringify(documentData));
      return {
        ...state,
        documentSettings: documentData,
      };

    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = { state, dispatch };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
