import React, { useContext } from 'react';
import { BsTrash } from 'react-icons/bs';
import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { AuthProvider } from '../../../context/AuthConText';
import { useAdmin } from '../../../Hooks/useAdmin';

const ReportedItems = () => {
    const { user } = useContext(AuthProvider);
    const [userLevel] = useAdmin(user?.email);
    const navigate = useNavigate();
  
    // if(userLevel.accountMode != 'buyer'){
    //   return navigate('/')
    // }
  
    console.log(userLevel);
  
    const url = `https://resale-server-mukutdev.vercel.app/reported`;
    const { data: reported = [] } = useQuery({
      queryKey: ["reported"],
      queryFn: async () => {
        const res = await fetch(url, {
          // headers: {
          //   authorization: `bearer ${localStorage.getItem("resaleToken")}`,
          // },
        });
        const data = res.json();
        return data;
      },
    });
  
    if (Object.keys(userLevel).length === 0) {
      return;
    }
    if (userLevel.accountMode !== "admin") {
      return navigate("/");
    }

    return (
        <section className="mt-10 md:mx-16 mx-2">
      {reported?.length > 0 ? (
        <>
          {" "}
          <h2 className="text-2xl font-semibold">
             {reported.length} items reported
          </h2>
          <div className="my-10">
            {reported.length > 0 && (
              <table className="table w-full">
                <thead>
                  <tr>
                    <th className="text-xl font-medium">Sl</th>
                    <th className="text-xl font-medium">image</th>
                    <th className="text-xl font-medium">name</th>
                    <th className="text-xl font-medium">email</th>
                    <th className="text-xl font-medium">seller</th>
                    <th className="text-xl font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {reported.map((report, i) => {
                    return (
                      <tr key={report._id}>
                        <th>{i + 1}</th>
                        <td>
                          <div className="flex items-center space-x-3">
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <img
                                  src={report.image}
                                  alt={report.name}
                                />
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="font-semibold text-xl">
                          {report.name}
                        </td>
                        <td className="font-semibold text-xl">
                          {" "}
                          {report.email}
                        </td>
                        <td className="font-semibold text-xl">
                          {" "}
                          {report.seller}
                        </td>
                        
                        <td>
                        <div
                          className="tooltip tooltip-right"
                          data-tip="Delete"
                        >
                          <button className="h-10 w-10 mx-auto rounded-full bg-red-500 text-white">
                            <BsTrash className="mx-auto" />
                          </button>
                        </div>
                        </td>
                     
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                  <th className="text-xl font-medium">Sl</th>
                    <th className="text-xl font-medium">image</th>
                    <th className="text-xl font-medium">name</th>
                    <th className="text-xl font-medium">email</th>
                    <th className="text-xl font-medium">seller</th>
                    <th className="text-xl font-medium">Action</th>
                  </tr>
                </tfoot>
              </table>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="my-14 w-96 mx-auto bg-gray-100 py-9 px-5">
            <h2 className="text-center text-2xl">No report found</h2>
            <Link
              className="btn border-0 rounded-md flex justify-center btn-primary my-5"
              to={"/"}
            >
              Back To Home
            </Link>
          </div>
        </>
      )}
    </section>
    );
};

export default ReportedItems;