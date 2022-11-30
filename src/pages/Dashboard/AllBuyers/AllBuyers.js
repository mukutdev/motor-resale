import React from "react";
import toast from "react-hot-toast";
import { BsTrash } from "react-icons/bs";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

const AllBuyers = () => {
  // const [deleteBuyer , setDeleteBuyer] = useState(null)

  const {
    data: buyers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["buyers"],
    queryFn: async () => {
      const res = await fetch(`https://resale-server-mukutdev.vercel.app/buyers`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("resaleToken")}`,
        },
      });
      const data = res.json();
      return data;
    },
  });

  const deletebuyer = id => {
    console.log(id);
    fetch(`https://resale-server-mukutdev.vercel.app/buyers/${id}`, {
      method: "DELETE",
    })
      .then(res => res.json())
      .then(data => {
        if(data.deletedCount) {
          console.log(data);
          toast.success("Buyer Deleted successfully");
          refetch();
        }
        console.log(data);
      })
      .catch(err => console.log(err));
  };

  return (
    <section className="mt-10 md:mx-16 mx-2">
      {buyers.length > 0 ? (
        <>
          {" "}
          <h2 className="text-2xl font-semibold text-center">
            Total buyers {buyers.length}
          </h2>
          <div className="my-10">
            <table className="table w-full">
              <thead>
                <tr>
                  <th className="text-xl font-medium">Sl</th>
                  <th className="text-xl font-medium">name</th>
                  <th className="text-xl font-medium">email</th>
                  <th className="text-xl font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {buyers.map((buyer, i) => {
                  return (
                    <tr key={buyer?._id}>
                      <th>{i + 1}</th>
                      <td className="font-semibold text-xl">{buyer.name}</td>
                      <td className="font-semibold text-xl">{buyer.email}</td>
                      <td>
                        <div
                          className="tooltip tooltip-right"
                          data-tip="Delete buyer"
                        >
                          <button
                            onClick={() => deletebuyer(buyer?._id)}
                            className="h-10 w-10 mx-auto rounded-full bg-red-500 text-white"
                          >
                            <BsTrash className="mx-auto" />
                          </button>
                          {/* <label onClick={de}  htmlFor="confirmModal" className="btn">Delete</label> */}
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
                  <th className="text-xl font-medium">Action</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </>
      ) : (
        <div className="my-14 w-96 mx-auto bg-gray-100 py-9 px-5">
          <h2 className="text-center text-2xl">No buyers Found</h2>
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

export default AllBuyers;
