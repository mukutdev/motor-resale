import { useEffect, useState } from "react";

export const useToken = email => {
  const [token, setToken] = useState("");

  useEffect(() => {
   if(email){
    fetch(`https://resale-server-mukutdev.vercel.app/jwt?email=${email}`)
    .then(res => res.json())
    .then(data => {
      if (data.accessToken) {
        localStorage.setItem("resaleToken", data.accessToken);
        setToken(data.accessToken)
      }
    });
   }
  }, [email]);
  return [token]
};
