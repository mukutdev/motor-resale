import axios from "axios";
import React, { useEffect, useState } from "react";
import SingleCar from "../../../shared/SingleCar/SingleCar";
import BookingModal from "../Categories/BookingModal/BookingModal";

const Advertised = () => {
  const [products, setProducts] = useState([]);
  const [carData , setCarData] = useState({});

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_url}/allCars/advertise`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("resaleToken")}`,
        },
      })
      .then(res => {
        // console.log(res.data);
        setProducts(res.data);
      });
  }, []);

//   console.log(products);
  return (
    <section>
        {
            products.length > 0 ? <><section className='mt-16'>
            <div className='container mx-auto '>
             <div className='md:w-5/6 mx-auto md:px-0 px-4'>
             <h2 className='text-3xl font-bold'>Featured Cars</h2>
             <div className='h-2 w-14 mt-2 bg-slate-800'></div>
             <div className='mt-16 grid md:grid-cols-2 justify-between gap-5 '>
                    {
                        products.map(carInfo => <SingleCar key={carInfo._id} carInfo={carInfo} setCarData={setCarData}></SingleCar>)
                    }
          
                    <BookingModal carData={carData} setCarData={setCarData}></BookingModal>
             </div>
             </div>
            </div>
          </section></> : ""
        }
    </section>
    
  );
};

export default Advertised;
