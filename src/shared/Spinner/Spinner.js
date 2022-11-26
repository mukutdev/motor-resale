import React from 'react';
import { SpinnerCircularSplit } from 'spinners-react';

const Spinner = () => {
    return (
        <div className='flex justify-center mt-4 h-screen my-auto'>
           <SpinnerCircularSplit size={73} thickness={136} speed={85} color="rgba(57, 66, 172, 1)" secondaryColor="rgba(58, 57, 172, 0)" />
        </div>
    );
};

export default Spinner;