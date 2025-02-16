import React from 'react'
import { Link } from 'react-router-dom'

function PlaceCardItem({place}) {
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query=' + place?.placeName} target='_blank'> 

    <div className='shadow-md p-3 m-2 rounded-xl flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
        <img src='/download3.jpg' className='w-[130px] h-[130px] rounded-lg'/>
        <div>
            <h2 className='font-bold text-lg'>{place?.placeName}</h2>
            <p className=' mt-1 text-sm text-gray-400'>{place?.placeDetails}</p>
            <p className='text-left font-medium mt-2'>Best Time to visit : </p>
            <h2 className='text-sm text-gray-400 '>{place?.bestTimeToVisit}</h2>
        </div>
    </div>
    </Link>
  )
}

export default PlaceCardItem