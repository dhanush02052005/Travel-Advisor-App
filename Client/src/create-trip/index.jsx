import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import AsyncSelect from 'react-select/async';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from '../constants/options.jsx';
import 'leaflet/dist/leaflet.css';
import { Button } from '@/components/ui/button.jsx';
import { toast } from 'sonner';
import { chatSession } from '@/service/AIModel.jsx';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { IoLogoGoogle } from "react-icons/io";
import { useGoogleLogin, useGoogleOAuth } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/FireBaseConfig.jsx';
import { useNavigate } from 'react-router-dom';

const fetchPlaces = async (inputValue) => {
  if (!inputValue) return [];

  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${inputValue}`
  );
  const data = await response.json();

  return data.map((place) => ({
    label: place.display_name,
    value: {
      lat: parseFloat(place.lat),
      lon: parseFloat(place.lon),
    },
  }));
};

// Handle map clicks to select location
const LocationMarker = ({ setLocation }) => {
  useMapEvents({
    click(e) {
      setLocation({ lat: e.latlng.lat, lon: e.latlng.lng });
    },
  });
  return null;
};




function CreateTrip() {
  const [place, setPlace] = useState();
  const [openDialog, setOpenDailog] = useState(false);
  const [mapLocation, setMapLocation] = useState({ lat: 20.5937, lon: 78.9629 }); // Default: India
  const [formData, setFormData] = useState({});

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  useEffect(() => {
    console.log(formData);
  }, [formData])

  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      console.log(codeResp),
        UserProfile(codeResp)
    },
    onError: (error) => console.log(error)
  })

  const OnGenerateTrip = async () => {



    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDailog(true)
      return;
    }

    if ((formData?.NoOfDays) > 5 || (formData?.NoOfDays) < 0) {
      toast('Valid days is upto 1-5');
      return;

    }
    if (!formData?.NoOfDays || !formData?.location || !formData?.budget || !formData?.people) {
      toast('please fill all details');
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.NoOfDays)
      .replace('{traveler}', formData?.people)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.NoOfDays)
    //console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT)
    console.log(result?.response?.text())
    setLoading(false);

    saveAiTrip(result?.response?.text())
  }

  const saveAiTrip = async (TripData) => {

    setLoading(true);


    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();

    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId
    });

    setLoading(false);
    navigate('/view-trip/' + docId)
  }

  const UserProfile = async (tokenInfo) => {
    try {
      const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: `application/json`,
        },
      });
      console.log("data:", response);
      localStorage.setItem('user', JSON.stringify(response.data));
      setOpenDailog(false);
      OnGenerateTrip();
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10 ml-20 '>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences🏕️🏝️</h2>
      <p className='mt-3 mt-3Y text-gray-600 text-xl'>
        Just provide some basic information and our trip planner will generate a customized itinerary <br />based on your preferences.
      </p>
      <div>
        <div>
          <h2 className="mt-10 my-3 text-xl font-medium">What is your destination?</h2>
          <AsyncSelect
            loadOptions={fetchPlaces}
            onChange={(selectedOption) => {
              setPlace(selectedOption);
              setMapLocation(selectedOption.value);
              handleInputChange('location', selectedOption);
            }}
            placeholder="Search for a place..."
          />
        </div>
        <div>
          <h2 className='mt-2 my-3 text-xl font-medium'>How many days are you planning your trip</h2>
          <Input placeholder={'Ex.3'} type="number"
            onChange={(e) => handleInputChange('NoOfDays', e.target.value)}
          />
        </div>

      </div>
      <div>
        <h2 className='mt-5 my-3 text-xl font-medium'>What is your budget?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectBudgetOptions.map((item, index) =>
            <div key={index}
              onClick={() => { handleInputChange("budget", item.title) }}
              className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg
              ${formData?.budget == item.title && 'shadow-lg border-black'}
              `}>
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          )}
        </div>
      </div>
      <div>
        <h2 className='mt-5 my-3 text-xl font-medium'>What do you plan on travelling with on your next adventure</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectTravelsList.map((item, index) =>
            <div key={index}
              onClick={() => { handleInputChange("people", item.title) }}
              className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg
            ${formData?.people == item.title && 'shadow-lg border-black'}
            `}>
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          )}
        </div>
      </div>
      <div className='my-10 justify-end flex'>
        <Button disabled={loading} onClick={() => OnGenerateTrip()}>{
          loading ?
            <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : 'Generate Trip'


        }
        </Button>
      </div>

      <Dialog open={openDialog}>

        <DialogContent>
          <DialogHeader>

            <DialogDescription>
              <img src='/logo.svg' />
              <h2 className='font-bold text-lg mt-5'>Sign In With Google</h2>
              <p className=''>Sign in to the App with Google authentication securely</p>

              <Button

                onClick={login}
                className='w-full mt-5 flex gap-4 items-center'>

                <IoLogoGoogle className='h-7 w-7' /> Sign in with google

              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>


    </div>

  )
}

export default CreateTrip;