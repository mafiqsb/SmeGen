'use client';

import { Sidebar } from 'flowbite-react';
import { Navbar } from 'flowbite-react';

import { HiOutlineDocumentText, HiChartPie, HiUser } from 'react-icons/hi';
import { FiLogOut } from 'react-icons/fi';
import { MdOutlineFormatAlignCenter } from 'react-icons/md';
import { IoSettingsSharp } from 'react-icons/io5';
import { BsThreeDots } from 'react-icons/bs';
import { IoIosArrowForward } from 'react-icons/io';

import { Badge } from 'flowbite-react';

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Header() {
  const [sideBar, setSidebar] = useState(false);
  const [navDropdown, setNavDropdown] = useState(false);

  const [documentCollapse, setDocumentCollapse] = useState(false);
  const [settingsCollapse, setSettingsCollapse] = useState(false);
  const [clientCollapse, setClientCollapse] = useState(false);
  const [dashboardCollapse, setDashboardCollapse] = useState(false);
  const [logOutCollapse, setLogOutCollapse] = useState(false);

  const selectedTabs = (tabId) => {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach((tab) => {
      tab.classList.remove('bg-amber-300', 'rounded-lg');
    });

    const selectedTab = document.getElementById(tabId);
    selectedTab.classList.add('bg-amber-300', 'rounded-lg');
  };

  const selectedTabsDD = (tabId) => {
    const tabs = document.querySelectorAll('.tabdd');
    tabs.forEach((tab) => {
      tab.classList.remove('font-bold');
    });

    const selectedTab = document.getElementById(tabId);

    selectedTab.classList.add('font-bold');
  };

  const handleCollapseHandler = (collapseName) => {
    if (collapseName === 'documentCollapse') {
      setDocumentCollapse(!documentCollapse);
      setSettingsCollapse(false); // Close settings collapse
      setClientCollapse(false); // Close client collapse
      setDashboardCollapse(false); // Close dashboard collapse
      setLogOutCollapse(false);
    } else if (collapseName === 'settingsCollapse') {
      setSettingsCollapse(!settingsCollapse);
      setDocumentCollapse(false); // Close document collapse
      setClientCollapse(false); // Close client collapse
      setDashboardCollapse(false); // Close dashboard collapse
      setLogOutCollapse(false);
    } else if (collapseName === 'clientCollapse') {
      setClientCollapse(!clientCollapse);
      setDocumentCollapse(false); // Close document collapse
      setSettingsCollapse(false); // Close settings collapse
      setDashboardCollapse(false); // Close dashboard collapse
      setLogOutCollapse(false);
    } else if (collapseName === 'dashboardCollapse') {
      setDashboardCollapse(!dashboardCollapse);
      setDocumentCollapse(false); // Close document collapse
      setSettingsCollapse(false); // Close settings collapse
      setClientCollapse(false); // Close client collapse
      setLogOutCollapse(false);
    } else if (collapseName === 'logOutCollapse') {
      setLogOutCollapse(!logOutCollapse);
      setDashboardCollapse(false);
      setDocumentCollapse(false); // Close document collapse
      setSettingsCollapse(false); // Close settings collapse
      setClientCollapse(false); // Close client collapse
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1025) {
        setSidebar(true);
      } else {
        setSidebar(false);
      }
    };
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const sidebarHandler = () => {
    setSidebar(!sideBar);
  };

  const navbarDropdown = () => {
    setNavDropdown(!navDropdown);
  };

  return (
    // NAVBAR
    <div className="flex flex-col relative">
      <div className="block">
        <Navbar
          fluid
          className="bg-gray-100 fixed w-full h-20 md:h-24 border-b z-50 shadow-md "
        >
          <div className="flex w-full py-5 items-center mx-auto justify-between">
            <div className="flex items-center justify-center pl-6">
              <Link to={'/app/dashboard'}>
                <span className=" whitespace-nowrap text-xl font-semibold dark:text-white mr-20">
                  INVOIS!
                </span>
              </Link>

              <MdOutlineFormatAlignCenter
                className=" w-5 h-5 cursor-pointer"
                onClick={sidebarHandler}
              />
            </div>

            <div className="md:hidden flex ml-36">
              <BsThreeDots onClick={navbarDropdown} />
            </div>

            <div className="mr-6">
              <button className="md:flex hidden items-center justify-center md:py-2 md:px-2 py-1 px-2 border-solid rounded-md md:w-[150px] md:text-base text-xs bg-gray-200 hover:bg-[#570987] hover:text-amber-300 duration-300">
                <Link className="mr-2">
                  <FiLogOut />
                </Link>
                Log out
              </button>
            </div>
          </div>
        </Navbar>
        <div
          className={
            navDropdown
              ? 'bg-gray-100 w-full h-14 fixed mt-20 items-center justify-center md:hidden flex z-40 ease-in-out duration-100 top-0'
              : 'top-[-100%] fixed md:hidden w-full flex items-center justify-center ease-in-out duration-100'
          }
        >
          <div className=" ml-72">
            <button className="md:hidden flex items-center justify-center py-1 px-2 border-solid rounded-md text-xs bg-gray-200 hover:bg-amber-300 hover:text-white duration-300">
              <Link className="mr-2">
                <FiLogOut />
              </Link>
              Log out
            </button>
          </div>
        </div>
      </div>

      {/* SIDEBAR.... */}

      <div
        className={
          sideBar
            ? 'lg:relative fixed inline-block shadow-md h-screen ease-in-out duration-300 transform translate-x-0 z-30 '
            : 'fixed inline-block h-screen ease-in-out duration-700 transform -translate-x-full z-30'
        }
      >
        <Sidebar>
          <div className="flex flex-col md:pt-0 pt-28">
            <div className="flex flex-col items-center mt-28">
              <div>
                <img
                  className="h-20 w-20 rounded-full p-1 object-cover ring-2 ring-gray-300 dark:ring-gray-500 relative"
                  alt="Profile"
                  src="/images/13.jpg"
                />
                <Badge className="bg-amber-300 text-center sticky flex justify-center items-center mt-[-20px]">
                  Afiq Sam
                </Badge>
              </div>

              <div className="mt-2 -mb-1">
                <p className="text-gray-500 text-xs">afiqsam71@gmail.com</p>
              </div>

              <div className="mt-4 flex items-center justify-center mx-auto bg-[#570987] pl-2 pr-2 pt-1 pb-1 rounded-md shadow-md">
                <h1 className="text-gray-100">Shot The Box</h1>
              </div>
            </div>
            <div className="md:mt-14 mt-2">
              <div className="border-b -mt-6 mb-4"></div>

              <div className="flex flex-col overflow-y-auto flex-grow">
                <Link
                  to={'/app/dashboard'}
                  className="p-4 hover:bg-amber-300 hover:duration-700 hover:rounded-md tab"
                  id="dashboard"
                  onClick={() => {
                    selectedTabs('dashboard');
                    handleCollapseHandler('dashboardCollapse');
                  }}
                >
                  <div className="flex items-center  text-gray-600 hover:text-gray-800">
                    <HiChartPie className="w-6 h-6" />
                    <span>Dashboard</span>
                  </div>
                </Link>
                <div>
                  <div
                    className=" flex items-center space-x-2 justify-between text-gray-600 cursor-pointer p-4 hover:bg-amber-300 hover:duration-700 hover:rounded-md tab"
                    id="document"
                    onClick={() => {
                      selectedTabs('document');
                      handleCollapseHandler('documentCollapse');
                    }}
                  >
                    <div className="flex items-center space-x-2 w-full">
                      <HiOutlineDocumentText className="w-6 h-6" />
                      <span>Document</span>
                    </div>
                    <IoIosArrowForward />
                  </div>
                  {documentCollapse && (
                    <div className="pl-8 mt-2">
                      <Link
                        to={'/app/documents/invoicelist'}
                        className="block py-2 text-gray-600 hover:text-[#570987] hover:duration-500 tabdd"
                        id="invoicelist"
                        onClick={() => selectedTabsDD('invoicelist')}
                      >
                        Invoice List
                      </Link>
                      <Link
                        to={'/app/paymentlist'}
                        className="block py-2 text-gray-600 hover:text-[#570987] hover:duration-500 tabdd"
                        id="paymentlist"
                        onClick={() => selectedTabsDD('paymentlist')}
                      >
                        Payment List
                      </Link>
                    </div>
                  )}
                </div>
                <Link
                  to={'/app/client/clientlist'}
                  className="p-4 hover:bg-amber-300 hover:duration-700 hover:rounded-md tab"
                  id="client"
                  onClick={() => {
                    selectedTabs('client');
                    handleCollapseHandler('clientCollapse');
                  }}
                >
                  <div className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
                    <HiUser className="w-6 h-6" />
                    <span>Client</span>
                  </div>
                </Link>
                <div>
                  <div
                    className="flex items-center justify-between text-gray-600 cursor-pointer p-4 hover:bg-amber-300 hover:duration-700 hover:rounded-md tab"
                    id="settings"
                    onClick={() => {
                      selectedTabs('settings');
                      handleCollapseHandler('settingsCollapse');
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <IoSettingsSharp className="w-6 h-6" />
                      <span>Settings</span>
                    </div>
                    <IoIosArrowForward className="" />
                  </div>
                  {settingsCollapse && (
                    <div className="pl-8 mt-2 duration-300 ease-in-out">
                      <Link
                        to={'/app/settings/companyinformation'}
                        className="block py-2 text-gray-600 hover:text-[#570987] hover:duration-500 tabdd"
                        id="companyinformation"
                        onClick={() => selectedTabsDD('companyinformation')}
                      >
                        Company Information
                      </Link>
                      <Link
                        to={'/app/settings/logoupload'}
                        className="block py-2 text-gray-600 hover:text-[#570987] hover:duration-500 tabdd"
                        id="logoupload"
                        onClick={() => selectedTabsDD('logoupload')}
                      >
                        Logo Upload
                      </Link>
                      <Link
                        to={'/app/settings/banksettings'}
                        className="block py-2 text-gray-600 hover:text-[#570987] hover:duration-500 tabdd"
                        id="bankaccountsettings"
                        onClick={() => selectedTabsDD('bankaccountsettings')}
                      >
                        Bank Account Settings
                      </Link>
                      <Link
                        to={'/app/settings/documentsettings'}
                        className="block py-2 text-gray-600 hover:text-[#570987] hover:duration-500 tabdd"
                        id="documentsettings"
                        onClick={() => selectedTabsDD('documentsettings')}
                      >
                        Document Settings
                      </Link>
                      <Link
                        to={'/app/settings/accountsettings'}
                        className="block py-2 text-gray-600 hover:text-[#570987] hover:duration-500 tabdd"
                        id="accountsettings"
                        onClick={() => selectedTabsDD('accountsettings')}
                      >
                        Account Settings
                      </Link>
                    </div>
                  )}
                </div>
                <div
                  className="p-4 hover:bg-amber-300 hover:duration-700 hover:rounded-md tab"
                  id="logout"
                  onClick={() => {
                    selectedTabs('logout');
                    handleCollapseHandler('logOutCollapse');
                  }}
                >
                  <Link
                    to={'#logout'}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
                  >
                    <FiLogOut className="w-6 h-6" />
                    <span>Log Out</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Sidebar>
      </div>
    </div>
  );
}

export default Header;
