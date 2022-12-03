import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthProvider } from "../../../../context/AuthConText";

const BookingModal = ({carData , setCarData , refetch }) => {

    const {user} = useContext(AuthProvider)
    const {register , handleSubmit , formState: { errors }} = useForm()

    // const [displayModal , setDisplayModal] = useState('')
    // const {carName , salePrice ,categoryId , seller } = carData  || {}

    // console.log(carData);
  
// On clicking the Book now button, a form in a modal will popup with the logged-in user name and email address, item name, and price(item name, price, and user information will not be editable) by default. You will give your phone number and meeting location, and lastly, there will be a submit button. After clicking the submit button, you will have to inform the buyer with a modal/toast that the item is booked.


const handleBooking = data =>{
  
    const bookingData = {
        carName : carData.carName,
        customer : user?.displayName,
        cusEmail : user?.email,
        salePrice : carData.salePrice,
        phone : data.phone,
        location : data.meetingLocation,
        seller : carData.seller,
        catId : carData.categoryId,
        image : carData.img
    }

    // setDisplayModal('block')
    // posting booking data to db


    fetch('https://resale-server-mukutdev.vercel.app/bookings' , {
      method: 'POST',
      headers :{
        'content-type': 'application/json'
      },
      body: JSON.stringify(bookingData)
    })
    .then(res => res.json())
    .then(data =>{
      if(data.acknowledged){
        console.log(data);
        // alert('success')
        toast.success('Booking created successfully')
        setCarData(carData)
        // setDisplayModal('hidden')
        // setTreatment(null)
        // refetch()
      }else{
        toast.error(data.message)
      }
    })
    .catch(err => console.log(err))

    
}

  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className={`modal`}>
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">
            {carData.carName}
          </h3>
          <p className="py-4">
          <form onSubmit={handleSubmit(handleBooking)}>
            <input
              type="text"
              defaultValue={user?.displayName}
              readOnly
            //   placeholder="Enter Full Name"
              {...register("name" )}
              className="border-0 w-full outline-none bg-gray-300 px-3 py-3 mt-5 text-slate-900 placeholder-gray-500"
            />
            <input
              type="email"
             defaultValue={user?.email}
             readOnly
              {...register("email")}
              className="border-0 w-full outline-none bg-gray-300 px-3 py-3 mt-3 text-slate-900 placeholder-gray-500"
            />
            <input
              type="text"
              defaultValue={carData.salePrice}
              readOnly
              {...register("salePrice")}
              className="border-0 w-full outline-none bg-gray-300 px-3 py-3 mt-3 text-slate-900 placeholder-gray-500"
            />
            <input
              type="tel"
              placeholder="Enter Phone Number"
              {...register("phone" , { required: true })}
              className="border-0 w-full outline-none bg-gray-300 px-3 py-3 mt-3 text-slate-900 placeholder-gray-500"
            />
            {errors.phone && <span className="text-red-500">Enter Phone number </span>}
            <input
              type="text"
              placeholder="Enter Meeting Location"
              {...register("meetingLocation" , { required: true })}
              className="border-0 w-full outline-none bg-gray-300 px-3 py-3 mt-3 text-slate-900 placeholder-gray-500"
            />
            {errors.meetingLocation && <span className="text-red-500">Enter Meeting Location</span>}
             <input type="submit" value="Confirm Booking"  className="w-full bg-yellow-400 hover:bg-yellow-500 cursor-pointer py-3 mt-4 font-semibold text-xl"/>
          </form>
          </p>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
