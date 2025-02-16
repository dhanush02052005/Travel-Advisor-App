import { db } from '@/service/FireBaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PacesToVisit from '../components/PacesToVisit';
import Footer from '../components/Footer';

function Viewtrip() {

    const {tripId} = useParams();
    const [trip,setTrip] = useState([]);
    useEffect(()=>{
        tripId&&getTripData();
    },[tripId])

    const getTripData = async() => {
        const docRef = doc(db,'AITrips',tripId);
        const getSnap = await getDoc(docRef);
        if(getSnap.exists()){
            console.log('Document : ' ,  getSnap.data());
            setTrip(getSnap.data())
        }
        else{
            console.log("No such document");
            toast("No Trip Found!");
        }
    }

  return (
    <div className='ml-40 mr-20 p-5 md:p-10 lg-p-34 xl-44'>
        {/* Information Section */}
        <InfoSection trip={trip}/>
        {/* Recommended hotels  */}
        <Hotels trip = {trip}/>
        {/* Daily Plans */}
        <PacesToVisit  trip={trip}/>
        {/* Footer */}
        <Footer trip={trip}/>
    </div>
  )
}

export default Viewtrip