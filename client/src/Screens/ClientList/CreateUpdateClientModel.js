import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { ImCross } from 'react-icons/im';
import { TfiWrite } from 'react-icons/tfi';
import { Store } from '../../Store';

export default function CreateUpdateClientModel({ onClose }) {
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const { clientUpdate } = state;

  // const clientUpdate = JSON.parse(
  //   localStorage.getItem('selected_client_update')
  // );

  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    phoneNumber: '',
    companyName: '',
    ssmRegistrationNo: '',
    address1: '',
    address2: '',
    postcode: '',
    city: '',
    state: '',
    isDeliverySameAsMailing: true,
    address1Delivery: '',
    address2Delivery: '',
    postcodeDelivery: '',
    cityDelivery: '',
    stateDelivery: '',
  });

  // Update formData when clientUpdate changes
  useEffect(() => {
    if (clientUpdate) {
      setFormData({
        clientName: clientUpdate.clientName || '',
        email: clientUpdate.email || '',
        phoneNumber: clientUpdate.phoneNumber || '',
        companyName: clientUpdate.companyName || '',
        ssmRegistrationNo: clientUpdate.ssmRegistrationNo || '',
        address1: clientUpdate.address1 || '',
        address2: clientUpdate.address2 || '',
        postcode: clientUpdate.postcode || '',
        city: clientUpdate.city || '',
        state: clientUpdate.state || '',
        isDeliverySameAsMailing: clientUpdate.isDeliverySameAsMailing || true,
        address1Delivery: clientUpdate.address1Delivery || '',
        address2Delivery: clientUpdate.address2Delivery || '',
        postcodeDelivery: clientUpdate.postcodeDelivery || '',
        cityDelivery: clientUpdate.cityDelivery || '',
        stateDelivery: clientUpdate.stateDelivery || '',
      });
      return;
    }
  }, [clientUpdate]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleClose = () => {
    onClose();
  };

  const clientSubmitHandler = (e) => {
    let updatedFormData = { ...formData };
    e.preventDefault();

    try {
      if (formData.isDeliverySameAsMailing) {
        updatedFormData = {
          ...updatedFormData,

          address1Delivery: formData.address1,
          address2Delivery: formData.address2,
          postcodeDelivery: formData.postcode,
          cityDelivery: formData.city,
          stateDelivery: formData.state,
        };

        ctxDispatch({
          type: 'CLIENT_INFORMATION',
          payload: updatedFormData,
        });
      } else {
        ctxDispatch({
          type: 'CLIENT_INFORMATION',
          payload: formData,
        });
      }

      toast.success('client succesfully save');

      onClose();
    } catch {
      window.alert('there is error');
    }
  };

  return (
    <div className="lg:w-[800px] md:w-[700px] w-[380px] md:h-[850px] h-[600px] overflow-y-auto">
      <form onSubmit={clientSubmitHandler}>
        <div className="bg-white shadow-md rounded-md p-6">
          <div className="flex justify-between">
            <h2 className="lg:text-[24px] text-xl font-semibold">
              Client Details
            </h2>
            <div className="items-center flex p-2 bg-gray-200 rounded-lg">
              <button onClick={onClose}>
                <ImCross />
              </button>
            </div>
          </div>
          <div className="border-t-2 mt-4 mb-2" />
          <div>
            <div className="mt-4">
              <label className="block mb-2 font-semibold text-sm">
                Client Name
              </label>
              <input
                type="text"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                className="w-full h-10 border border-gray-300 rounded-md mb-2"
              />
            </div>
            <div className=" grid grid-cols-2 gap-x-4 ">
              <div>
                <label className="block mb-2 font-semibold text-sm">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-10 border border-gray-300 rounded-md mb-2"
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold text-sm">
                  No. Phone
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full h-10 border border-gray-300 rounded-md mb-2"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-semibold text-sm">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full h-10 border border-gray-300 rounded-md mb-2"
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold text-sm">
                  SSM Registration No.
                </label>
                <input
                  type="text"
                  name="ssmRegistrationNo"
                  value={formData.ssmRegistrationNo}
                  onChange={handleChange}
                  className="w-full h-10 border border-gray-300 rounded-md mb-2"
                />
              </div>
            </div>

            <div className="col-span-2 mt-6">
              <div className="bg-amber-300 ">
                <h1 className="block mb-4 font-bold text-[15px] pl-4 pt-2 pb-2">
                  Mailing Address
                </h1>
              </div>

              <div>
                <label className="block mb-2 font-semibold text-sm">
                  Address Line 1
                </label>
                <input
                  type="text"
                  name="address1"
                  value={formData.address1}
                  onChange={handleChange}
                  className="w-full h-10 border border-gray-300 rounded-md mb-2"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-sm">
                  Address Line 2
                </label>
                <input
                  type="text"
                  name="address2"
                  value={formData.address2}
                  onChange={handleChange}
                  className="w-full h-10 border border-gray-300 rounded-md mb-2"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block mb-2 font-semibold text-sm">
                    Postcode
                  </label>
                  <input
                    type="text"
                    name="postcode"
                    value={formData.postcode}
                    onChange={handleChange}
                    className="w-full h-10 border border-gray-300 rounded-md mb-2"
                    placeholder="Postcode"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-semibold text-sm">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full h-10 border border-gray-300 rounded-md mb-2"
                    placeholder="City"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-sm">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full h-10 border border-gray-300 rounded-md mb-2"
                    placeholder="State"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-2 mt-6 mb-4  border-b-2">
              <div className="bg-amber-300 ">
                <h1 className="block mb-4 font-bold text-[15px] pl-4 pt-2 pb-2">
                  Delivery Address
                </h1>
              </div>
              <label className="block font-semibold text-sm mb-8">
                <input
                  type="checkbox"
                  name="isDeliverySameAsMailing"
                  checked={formData.isDeliverySameAsMailing}
                  onChange={handleChange}
                  className="mr-2"
                />
                Same as Mailing Address
              </label>
              {formData.isDeliverySameAsMailing ? (
                ''
              ) : (
                <div className="mb-4">
                  <div>
                    <label className="block mb-2 font-semibold text-sm">
                      Address Line 1
                    </label>
                    <input
                      type="text"
                      name="address1Delivery"
                      value={formData.address1}
                      onChange={handleChange}
                      className="w-full h-10 border border-gray-300 rounded-md mb-2"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-semibold text-sm">
                      Address Line 2
                    </label>
                    <input
                      type="text"
                      name="address2Delivery"
                      value={formData.address2Delivery}
                      onChange={handleChange}
                      className="w-full h-10 border border-gray-300 rounded-md mb-2"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block mb-2 font-semibold text-sm">
                        Postcode
                      </label>
                      <input
                        type="text"
                        name="postcodeDelivery"
                        value={formData.postcodeDelivery}
                        onChange={handleChange}
                        className="w-full h-10 border border-gray-300 rounded-md mb-2"
                        placeholder="Postcode"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 font-semibold text-sm">
                        City
                      </label>
                      <input
                        type="text"
                        name="cityDelivery"
                        value={formData.cityDelivery}
                        onChange={handleChange}
                        className="w-full h-10 border border-gray-300 rounded-md mb-2"
                        placeholder="City"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 font-semibold text-sm">
                        State
                      </label>
                      <input
                        type="text"
                        name="stateDelivery"
                        value={formData.stateDelivery}
                        onChange={handleChange}
                        className="w-full h-10 border border-gray-300 rounded-md mb-2"
                        placeholder="State"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end">
            <div className="justify-center items-center  mr-2">
              <button
                type="button"
                onClick={handleClose}
                className="md:w-28 md:h-10 w-20 h-6 bg-gray-300 duration-300 shadow-md rounded-b-sm md:text-sm text-xs flex items-center justify-center"
              >
                <ImCross className="mr-2" />
                Close
              </button>
            </div>
            <div className="justify-center items-center">
              <button className="md:w-28 md:h-10 w-20 h-6 bg-[#570987] text-white hover: hover:text-amber-300 duration-300 shadow-md md:text-sm text-xs flex items-center justify-center">
                <TfiWrite className="mr-2" />
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
