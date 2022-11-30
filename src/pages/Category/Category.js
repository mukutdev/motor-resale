import React, { useState }  from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import BgElement from '../../shared/BgElement/BgElement';
import SingleCar from '../../shared/SingleCar/SingleCar';
import BookingModal from '../Home/Categories/BookingModal/BookingModal';

const Category = () => {
    
    const {id} = useParams()

    const [carData , setCarData] = useState({})

    const {data : cars = [] , isLoading , refetch} = useQuery({
        queryKey : ['categories'],
        queryFn : async ()=>{
            const res = await fetch(`https://resale-server-mukutdev.vercel.app/categories/${id}`)
            const data = await res.json()
            return data
        }
    })

    if(isLoading){
        return <h2>Loading.......</h2>
    }

    return (
        <section>
                <BgElement content="Cars"></BgElement>
            <div className='container mx-auto'>
            <div className='grid md:grid-cols-2 justify-between gap-20 my-24 md:mx-28'>
            {
                cars.map(car => <SingleCar key={car._id} carInfo={car} setCarData={setCarData}></SingleCar>)
            }
            </div>
            <BookingModal carData={carData} setCarData={setCarData} refetch={refetch}/>
            </div>
           
        </section>
    );
};

export default Category;