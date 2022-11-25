import React, { createContext } from 'react';


export const AuthProvider = createContext() 

const AuthConText = ({children}) => {



    const authInfo = {}

    return (
        <AuthProvider.Provider value={authInfo}>
            {children}
        </AuthProvider.Provider>
    );
};

export default AuthConText;