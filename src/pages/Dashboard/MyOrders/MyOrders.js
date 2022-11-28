import React, { useContext } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { AuthProvider } from "../../../context/AuthConText";
import { useAdmin } from "../../../Hooks/useAdmin";

const MyOrders = () => {
  const { user } = useContext(AuthProvider);
  const [userLevel] = useAdmin(user?.email);
  const navigate = useNavigate();

  // if(userLevel.accountMode != 'buyer'){
  //   return navigate('/')
  // }

  console.log(userLevel);

  const url = `${process.env.REACT_APP_url}/bookings?email=${user?.email}`;
  const { data: bookings = [] } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const res = await fetch(url, {
        headers: {
          authorization: `bearer ${localStorage.getItem("resaleToken")}`,
        },
      });
      const data = res.json();
      return data;
    },
  });

  if (Object.keys(userLevel).length === 0) {
    return;
  }
  if (userLevel.accountMode !== "buyer") {
    return navigate("/");
  }

  //   if(userLevel.accountMode != 'buyer'){
  //     return navigate('/')
  //   }

  return (
    <section className="mt-10 md:mx-16 mx-2">
      <h2 className="text-2xl font-semibold">
        You Have {bookings.length} Order
      </h2>
      <div className="my-10">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="text-xl font-medium">Sl</th>
              <th className="text-xl font-medium">Car</th>
              <th className="text-xl font-medium">Name</th>
              <th className="text-xl font-medium">Price</th>
              <th className="text-xl font-medium">Payment</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, i) => {
              return (
                <tr key={booking._id}>
                  <th>{i + 1}</th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={booking.image} alt={booking.carName} />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="font-semibold text-xl">{booking.carName}</td>
                  <td className="font-semibold text-xl">
                    {" "}
                    ${booking.salePrice}
                  </td>
                  <th>
                    <button className="btn btn-primary btn-xs">Pay Now</button>
                  </th>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <th className="text-xl font-medium">Sl</th>
              <th className="text-xl font-medium">Car</th>
              <th className="text-xl font-medium">Name</th>
              <th className="text-xl font-medium">Price</th>
              <th className="text-xl font-medium">Payment</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
};

export default MyOrders;
