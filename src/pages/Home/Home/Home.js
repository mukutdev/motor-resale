import React from 'react';
import About from '../About/About';
import Categories from '../Categories/Categories';
import Hero from '../Hero/Hero';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <Categories/>
            <About/>   
        </div>
    );
};

export default Home;