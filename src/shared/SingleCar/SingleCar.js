import React from "react";
import { BiMap, BiDollarCircle, BiUserCircle } from "react-icons/bi";
import { FaCar } from "react-icons/fa";
import { BsCalendarDate } from "react-icons/bs";
import { GoVerified } from "react-icons/go";

const SingleCar = ({ carInfo , setCarData }) => {

    

  const {
    carName,
    img,
    location,
    description,
    condition,
    sellerNo,
    Availability,
    category,
    originalPrice,
    salePrice,
    uses,
    pubDate,
    seller,
    verified,
    advertised,
  } = carInfo;

  return (
    <div className="md:mx-8 mx-2">
      <div className="p-4 px-6 shadow-md rounded bottom-1">
        <div className="relative">
          <img className="md:h-72 object-cover" src={img} alt="" />
          <span
            className={`p-1 text-lg text-white font-semibold rounded px-2 absolute top-3 right-2 ${
              Availability === "available" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {Availability}
          </span>

          {advertised && (
            <span className="p-1 text-lg text-slate-600 font-semibold rounded px-2 absolute top-3 left-2 bg-yellow-400">
              {advertised && "Featured"}
            </span>
          )}
        </div>

        <div className="mt-5 flex md:flex-row flex-col justify-between gap-4">
          <h4 className="text-2xl font-bold ">{carName}</h4>
          <h4 className="flex items-center font-semibold text-lg gap-1">
            <FaCar />
            {category}
          </h4>
          <h4 className="flex items-center font-semibold text-lg ">
            <BiMap />
            {location}
          </h4>
          {/* <h5>Original Price${originalPrice}</h5> */}
        </div>
        <div className="mt-4 flex md:flex-row flex-col justify-between gap-4">
          <span className="text-xl font-semibold flex items-center  gap-1">
            <BsCalendarDate /> {pubDate}
          </span>
          <span className="text-xl font-semibold text-slate-800">
            Years Of Used :{uses}
          </span>
          <span className="text-xl font-semibold text-slate-800 flex items-center  gap-1">
            <BiUserCircle />
            {seller}
            {verified && <GoVerified className="text-green-600" />}
          </span>
        </div>
        <div className="mt-4 flex  md:flex-row flex-col md:justify-between gap-4 md:items-center">
          <span className="text-xl font-semibold">Condition: {condition}</span>
          <span className="bg-red-600 p-1 text-lg text-white font-semibold rounded flex items-center gap-1">
            <BiDollarCircle />
            Original Price ${originalPrice}
          </span>
          <span className="bg-green-600 p-1 text-lg text-white font-semibold rounded flex items-center gap-1">
            <BiDollarCircle />
            Sale Price ${salePrice}
          </span>
        </div>
        <p className="text-lg font-semibold mt-4">{description}</p>
        <p className="text-lg font-semibold mt-4">
          Seller Contact : {sellerNo}
        </p>
       
        <label
          onClick={()=> setCarData(carInfo)}
          htmlFor="booking-modal"
          className="btn bg-yellow-400 mt-6 hover:text-white border-0 text-lg text-slate-900"
        >
          Book Now
        </label>
      </div>
    </div>
  );
};

export default SingleCar;
