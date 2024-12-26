import { faCheck, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function DayPlan({ Plan }) {
  const [day, setDay] = useState(0);
  const allPlans = Plan.itinerary;
  const [bookmarked, setBookmarked] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(()=>{
    setBookmarked(false)
  },[Plan])

  const handelBookmark = async ()=>{
    const reschat = await fetch(
      "'https://ai-server-ftwj.onrender.com/userchats/addplanbookmark",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: currentUser._id, Plan }),
      }
    );
    const data = await reschat.json();
    if (data.success != false) {
      setBookmarked(true)
    }
  }
  return (
    <>
      <div className="shadow-insideChatBox my-2 rounded-lg py-4 px-2 border-2 border-slate-300">
        <h1 className="w-full h-10 mb-3 shadow-lg rounded-lg text-2xl font-semibold font-sans text-slate-800 text-center bg-slate-200 ">
          <span className="text-amber-600 font-bold">{Plan.destination + " "}</span> Trip Plan
        </h1>
        <div className="w-full">
          <button
            className={`${
              day == 0 ? "bg-green-600 " : "bg-sky-600 "
            }" w-20 mx-2 h-10 mb-3 shadow-lg rounded-lg text-lg font-mono text-white text-center outline outline-2 outline-slate-700 hover:outline-slate-200"`}
            onClick={() => setDay(0)}
          >
            Day1
          </button>
          <button
            className={`${
              day == 1 ? "bg-green-600 " : "bg-sky-600 "
            }" w-20 mx-2 h-10 mb-3 shadow-lg rounded-lg text-lg font-mono text-white text-center outline outline-2 outline-slate-700 hover:outline-slate-200"`}
            onClick={() => setDay(1)}
          >
            Day2
          </button>
          <button
            className={`${
              day == 2 ? "bg-green-600 " : "bg-sky-600 "
            }" w-20 mx-2 h-10 mb-3 shadow-lg rounded-lg text-lg font-mono text-white text-center outline outline-2 outline-slate-700 hover:outline-slate-200"`}
            onClick={() => setDay(2)}
          >
            Day3
          </button>
          <button className="w-8 h-8 rounded-full bg-sky-600 float-right outline outline-2 outline-black ">
            {bookmarked 
            ?
            <FontAwesomeIcon
              icon={faCheck}
              className="text-xl text-white mt-1"
            />
            :<FontAwesomeIcon
              icon={faStar}
              className="text-xl text-white mt-1"
              onClick={()=>handelBookmark()}
            />
            }
          </button>
        </div>

        {allPlans != undefined ? allPlans[day].places.map((value, i) => {
          return (
            <div className=" border-b-2 border-slate-300 py-4 mx-7" key={i}>
              <div className="flex justify-start mx-4 my-3">
                <h3 className="font-semibold mx-2 list-item text-nowrap marker:text-slate-400">
                  Name :{" "}
                </h3>
                <span className="text-slate-800">{value.name}</span>
              </div>
              <div className="flex justify-start mx-4 my-3 ">
                <h3 className="font-semibold mx-2 list-item text-nowrap marker:text-slate-400">
                  Details :{" "}
                </h3>
                <span className="text-slate-800">{value.place_details}</span>
              </div>
              <div className="flex justify-start mx-4 my-3">
                <h3 className="font-semibold mx-2 list-item text-nowrap marker:text-slate-400">
                  Time :{" "}
                </h3>
                <span className="text-slate-800">{value.time}</span>
              </div>
              <div className="flex justify-start mx-4 my-3">
                <h3 className="font-semibold mx-2 list-item text-nowrap marker:text-slate-400">
                  Description :{" "}
                </h3>
                <span className="text-slate-800">{value.description}</span>
              </div>
              <div className="flex justify-start mx-4 my-3">
                <h3 className="font-semibold mx-2 list-item text-nowrap marker:text-slate-400">
                  TicketPrice :{" "}
                </h3>
                <span className="text-slate-800">{value.ticketPrice}</span>
              </div>
              <div className="flex justify-start mx-4 my-3">
                <h3 className="font-semibold mx-2 list-item text-nowrap marker:text-slate-400">
                  TravelTime :{" "}
                </h3>
                <span className="text-slate-800">{value.travelTime} </span>
              </div>
            </div>
          );
        }):''}
      </div>
    </>
  );
}

export default DayPlan;

// coordinates
// :
// "34.0783° N, 74.8103° E"
// description
// :
// "Experience the serene beauty of Dal Lake, a picturesque lake in Srinagar known for its houseboats and floating markets."
// imageUrl
// :
// "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Dal_Lake_Srinagar.jpg/1200px-Dal_Lake_Srinagar.jpg"
// name
// :
// "Dal Lake"
// place_details
// :
// "Take a shikara ride (traditional wooden boat) to explore the lake, visit the floating vegetable market, and enjoy the tranquil surroundings."
// ticketPrice
// :
// "Shikara ride costs around INR 500-1000 per hour."
// time
// :
// "9:00 AM"
// travelTime
// :
// "30 minutes from Srinagar"
