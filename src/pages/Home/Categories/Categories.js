import React from 'react';
import { useQuery } from 'react-query';
import CategoryCard from './CategoryCard/CategoryCard';

const Categories = () => {

    const {data : category = [] , isLoading} = useQuery({
        queryKey :['categories'],
        queryFn : async ()=>{
            const res = await fetch('http://localhost:5000/categories')
            const data = res.json(); 
            return data
        }
    })

    if(isLoading){
        return <h2>Loading data.......</h2>
    }


    return (
        <section className='mt-16'>
            <div className='container mx-auto '>
             <div className='w-5/6 mx-auto'>
             <h2 className='text-3xl font-bold'>Popular Categories</h2>
             <div className='h-2 w-14 mt-2 bg-slate-800'></div>
             <div className='mt-16 grid md:grid-cols-3 justify-between gap-5 '>
                    {
                        category.map(cat => <CategoryCard key={cat._id} category ={cat}></CategoryCard>)
                    }
             </div>
             </div>
            </div>
        </section>
    );
};

export default Categories;