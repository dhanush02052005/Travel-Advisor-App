import React from 'react'
import { Button } from '../ui/button'
import {Link } from 'react-router-dom'
function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
        <h2 className='font-extrabold text-[35px] text-center mt-16'>
        <span className='text-red-600'>Discover Your Next Adventure with AI: </span>Personalized Itineraries at your Fingertips
        </h2>
        <p className='text-xl text-grey-500 text-center'>
        Your personal trip planner and travel cursor , creating custom itineraries tailored to your intrests and budget.
        </p>
        <Link to='/create-trip'>
        <Button>Get started , It's free!</Button>
        </Link>
    </div>
  )
}

export default Hero