import { Button } from '@/components/ui/button'
import { getPlaceDetails } from '@/service/GlobalApi';
import React, { useEffect } from 'react'
import { PiShareFatBold } from "react-icons/pi";


function InfoSection({ trip }) {
    useEffect(() => {
        trip && GetPlacePhoto();
    }, [trip])
    const GetPlacePhoto = async () => {
        const data = {
            textQuery: trip?.userSelection?.location?.label
        }
        const result = await getPlaceDetails(data).then(resp => {
            console.log(resp.data)
        })
    }
    return (

        <div>
            <img src='/download3.jpg' className='h-[340px] w-full object-cover rounded-xl' />

            <div className='flex justify-between items-center'>

                <div className='my-5 flex flex-col gap-2'>
                    <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
                    <div className='flex gap-5'>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>📅 {trip?.userSelection?.NoOfDays} days</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>💸 {trip?.userSelection?.budget} budget</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>🧑🏻‍🤝‍🧑🏻 No of peoples : {trip?.userSelection?.people}</h2>
                    </div>

                </div>
                <Button className='mt-7'>
                    <PiShareFatBold />


                </Button>

            </div>

        </div>
    )
}

export default InfoSection