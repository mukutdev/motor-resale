import React  from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import BgElement from '../../shared/BgElement/BgElement';
import SingleCar from '../../shared/SingleCar/SingleCar';
import Spinner from '../../shared/Spinner/Spinner';

const Category = () => {
    
    const {id} = useParams()

    // const [carData , setCarData] = useState("")

    const {data : cars , isLoading} = useQuery({
        queryKey : ['categories'],
        queryFn : async ()=>{
            const res = await fetch(`${process.env.REACT_APP_url}/categories/${id}`)
            const data = res.json()
            return data
        }
    })

    if(isLoading){
        return <Spinner></Spinner>
    }

    return (
        <section>
                <BgElement content="Cars"></BgElement>
            <div className='container mx-auto'>
            <div className='grid md:grid-cols-2 justify-between gap-20 my-24 md:mx-28'>
            {
                cars.map(car => <SingleCar key={car._id} carInfo={car}></SingleCar>)
            }
            </div>
            </div>
        </section>
    );
};

export default Category;