import React from 'react';
import { BsGearFill , BsFillTrophyFill} from 'react-icons/bs';
// import { BiUserCheck } from 'react-icons/bi';
import { FaCar , FaUserTie } from 'react-icons/fa';

const About = () => {

    const companyFeatures = [
        {id :1,name : `WE'RE EXPERTS`,des : 'There are many variations of passages of Lorem Ipsum',icon : <BsGearFill className='text-white text-3xl m-auto'/>
        },
        {id :1,name : `WE'RE FRIENDLY`,des : 'There are many variations of passages of Lorem Ipsum',icon : <FaUserTie className='text-white text-3xl m-auto'/>
        },
        {id :1,name : `WE'RE ACCURATE`,des : 'There are many variations of passages of Lorem Ipsum',icon : <FaCar className='text-white text-3xl m-auto'/>
        },
        {id :1,name : `WE'RE TRUSTED`,des : 'There are many variations of passages of Lorem Ipsum',icon : <BsFillTrophyFill className='text-white text-3xl m-auto'/>
        },
    ]

    return (
        <section className='my-14 container mx-auto'>
            <div className='flex justify-between w-5/6 mx-auto items-center'>
                    <div className='w-1/2'>
                        <h2 className='text-3xl font-bold'>ABOUT COMPANY</h2>
                        <div className='h-2 w-14 mt-2 bg-slate-800'></div>
                        <p className='text-xl my-4'>There are many variations of passages of Lorem Ipsum typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        <p className='text-xl  my-4'>There are many variations of passages of Lorem Ipsum typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the with the release of Letraset sheets containing Lorem Ipsum</p>
                        <div className='mt-7'>
                            <div className='grid md:grid-cols-2 justify-between gap-7'>
                            {
                                        companyFeatures.map(company => {
                                            return(
                                                <div key={company.id} className='flex justify-between gap-7 '>
                                    
                                                <div className='bg-slate-800 h-24 flex w-1/3'>
                                                    {company.icon}
                                                </div>
                                                <div className='h-24 w-2/3'>
                                                    <h2 className='text-2xl font-bold'>{company.name}</h2>
                                                    <p className='pt-2 text-lg'>{company.des}</p>
                                                </div>
                                          </div>    
                                            )
                                        })
                                    }
                                  {/* <div className='flex justify-between gap-7 '>
                                    
                                        <div className='bg-slate-800 h-24 flex w-1/3'>
                                            <BsGearFill className='text-white text-3xl m-auto'/>
                                        </div>
                                        <div className='h-24 w-2/3'>
                                            <h2 className='text-2xl font-bold'>WE'RE EXPERTS</h2>
                                            <p className='pt-2 text-lg'>There are many variations of passages of Lorem Ipsum</p>
                                        </div>
                                  </div>   */}
                                   
                            </div>
                        </div>
                    </div>
                    <div>
                            <img className='h-[600px]' src="https://i.ibb.co/r0hFVs4/worker.png" alt="" />
                    </div>
            </div>
        </section>
    );
};

export default About;