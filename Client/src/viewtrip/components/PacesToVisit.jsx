import React from 'react'
import PlaceCardItem from './PlaceCardItem';

function PacesToVisit({trip}) {
    const itinerary = trip?.tripData?.itinerary;

  return (
    <div>
        <h2 className='font-bold mt-2'>PlacesToVisit</h2>
        <div>
            {itinerary&& Object.values(itinerary).map((day,index) =>(
                <div key={index} className='mt-3'>
                    <h2 className='font-medium text-lg'>Day {index+1}</h2>
                    <div className='grid md:grid-cols-2 gap-5'>
                    {day?.activities.map((place,index) =>(
                        <div>
                            <div>
                                <p className='text-red-500 text-lg'>time:</p>
                                <PlaceCardItem place = {place}/>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            ))

            }
        </div>
    </div>
    
  )
}

export default PacesToVisit