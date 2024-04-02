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
};

function reducer(state, action) {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...state,
        userInfo: action.payload,
      };
    case 'COMPANY_INFORMATION':
      return {
        ...state,
        companyInformation: action.payload,
      };
    case 'BANK_INFORMATION':
      return {
        ...state,
        bankInformation: action.payload,
      };

    case 'LOGO_INFORMATION':
      return {
        ...state,
        logoInformation: action.payload,
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

    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = { state, dispatch };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
