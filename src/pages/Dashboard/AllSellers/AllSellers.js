import React, { useContext } from "react";
import toast from "react-hot-toast";
import { BsTrash } from "react-icons/bs";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { AuthProvider } from "../../../context/AuthConText";


const AllSellers = () => {

    const {user} = useContext(AuthProvider)
  const {
    data: sellers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["sellers"],
    queryFn: async () => {
      const res = await fetch(`https://resale-server-mukutdev.vercel.app/sellers`,{
        headers :{
            authorization: `bearer ${localStorage.getItem('resaleToken')}`
        }
      });
      const data = res.json();
      return data;
    },
  });

  const verifySeller = id=>{
        fetch(`https://resale-server-mukutdev.vercel.app/sellers/verified/${id}`,{
            method : 'PUT',
            headers :{
                authorization : `bearer ${localStorage.getItem('resaleToken')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount){
                toast.success(`${user?.displayName} Is Now Verified Seller`)
                refetch()
            }
        })
  }

  const deleteSeller = id=>{

    fetch(`https://resale-server-mukutdev.vercel.app/sellers/${id}`,{
        method : 'DELETE',
    })
    .then(res => res.json())
    .then(data =>{
      if(data.deletedCount){
        console.log(data);
        toast.success('Seller Deleted successfully')
        refetch()
      }
    })
    console.log(id);
  }

  return (
    <section className="mt-10 md:mx-16 mx-2">
      {sellers.length > 0 ? (
        <>
          {" "}
          <h2 className="text-2xl font-semibold text-center">
            Total Sellers {sellers.length}
          </h2>
          <div className="my-10">
            <table className="table w-full">
              <thead>
                <tr>
                  <th className="text-xl font-medium">Sl</th>
                  <th className="text-xl font-medium">name</th>
                  <th className="text-xl font-medium">email</th>
                  <th className="text-xl font-medium">Verification</th>
                  <th className="text-xl font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {sellers.map((seller, i) => {
                  return (
                    <tr key={seller?._id}>
                      <th>{i + 1}</th>
                      <td className="font-semibold text-xl">{seller.name}</td>
                      <td className="font-semibold text-xl">{seller.email}</td>
                      <td className="font-semibold text-xl" onClick={()=> verifySeller(seller._id)}>
                       {
                        seller?.verified ? <button className="btn btn-primary border-0 rounded-sm text-slate-700 bg-yellow-400 hover:bg-yellow-400 btn-xs text-slate-600">Verified</button> : <button className="btn bg-indigo-600 hover:bg-yellow-400  btn-xs text-white rounded-sm border-none">Verify</button>
                       }
                      </td>
                      <td>
                      <div
                          className="tooltip tooltip-right"
                          data-tip="Delete seller"
                        >
                          <button onClick={()=> deleteSeller(seller._id)} className="h-10 w-10 mx-auto rounded-full bg-red-500 text-white">
                            <BsTrash className="mx-auto" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                <tr></tr>
              </tbody>
              <tfoot>
                <tr>
                  <th className="text-xl font-medium">Sl</th>
                  <th className="text-xl font-medium">Name</th>
                  <th className="text-xl font-medium">Email</th>
                  <th className="text-xl font-medium">Verification</th>
                  <th className="text-xl font-medium">Action</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </>
      ) : (
        <div className="my-14 w-96 mx-auto bg-gray-100 py-9 px-5">
          <h2 className="text-center text-2xl">No Sellers Found</h2>
          <Link
            className="btn border-0 rounded-md flex justify-center btn-primary my-5"
            to={"/"}
          >
            
            Back To Home
          </Link>
        </div>
      )}
    </section>
  );
};

export default AllSellers;
