import React from 'react';

const Hero = () => {
    return (
        <div className=" flex items-center h-[400px] md:h-[700px] w-full" style={{backgroundImage : `url(https://i.ibb.co/YWB0sdD/3ecde-01.jpg)`}} bg-cover='true' bg-center='true'>
    <div className='container mx-auto pl-4'>
      <h4 className="text-xl font-bold text-white">Top Brands Cars </h4>
      <h1 className="md:text-6xl text-4xl mt-4 font-bold text-white">Modern - Classic - Incredible</h1>
      <p className="py-6 text-white text-xl">Buy Second Hand Car at reasonable Price !</p>
      <button className="btn btn-primary px-6 text-xl text-white">Get Started</button>
    </div>
</div>

);
};

export default Hero;