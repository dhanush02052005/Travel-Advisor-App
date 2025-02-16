export const SelectTravelsList = [
    {
        id:1,
        title:'just me',
        desc: 'A sole travels in exploration',
        icon:'🚀',
        people: '1'
    },
    {
        id:2,
        title:'A couple',
        desc: 'Two travels in tandem',
        icon:'🥂',
        people: '2'
    },
    {
        id:3,
        title:'Family',
        desc: 'A group of fun adv.',
        icon:'🏠',
        people: '3 to 5 people'
    },
    {
        id:4,
        title:'Friends',
        desc: 'Bunch of thrill',
        icon:'🍻',
        people: '1'
    },
]
export const SelectBudgetOptions = [
    {
        id:1,
        title:'Cheap',
        desc: 'Stay conscious on cost',
        icon:'💵',
    },
    {
        id:2,
        title:'Moderate',
        desc: 'Keep cost on the average side',
        icon:'💸',
    },
    {
        id:3,
        title:'Luxury',
        desc: 'Dont worry about cost',
        icon:'💰',
    },
]

export const AI_PROMPT = 'Generate Travel Plan for Location: {location}, for {totalDays} Days for {traveler} with a {budget} budget, give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.'