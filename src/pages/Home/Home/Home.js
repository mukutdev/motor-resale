import React from 'react';
import About from '../About/About';
import Advertised from '../Advertised/Advertised';
import Categories from '../Categories/Categories';
import Hero from '../Hero/Hero';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <Advertised/>
            <Categories/>
            <About/>   
        </div>
    );
};

export default Home;