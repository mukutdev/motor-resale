/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import toast from "react-hot-toast";

const ConfirmationModal = ({ carData }) => {
  const submitReport = () => {
    const reportedItem = {
      id: carData?._id,
      name: carData?.carName,
      image: carData?.img,
      seller: carData?.seller,
      email: carData?.email,
    };

    const url = "https://resale-server-mukutdev.vercel.app/reported"
    fetch(url,{
      method : 'POST',
      headers :{
        'content-type' : 'application/json'
      },
      body: JSON.stringify(reportedItem)
    })
    .then(res => res.json())
    .then(data =>{
      if(data.acknowledged){
        toast.success("Report Submitted to admin")
      }
    })
    .catch(err =>{
      toast.error("Something went wrong")
    })

   

  };

  return (
    <div>
      <input type="checkbox" id="confirmModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <label
            htmlFor="confirmModal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-lg text-center text-red-500">
            Are You sure to report {carData.carName}
          </h3>
          <div className="modal-action flex justify-center gap-5">
            <button
              onClick={() => submitReport()}
              className="bg-red-500 cursor-pointer text-white px-5 py-1 rounded-md font-medium border-0 p-0"
            >
              Yes
            </button>
            <label
              htmlFor="confirmModal"
              className="bg-green-600 text-white px-5 py-1 rounded-md font-medium border-0 p-0 cursor-pointer"
            >
              No
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
