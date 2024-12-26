import React, { useState } from "react";
import { setTitle, setChatId, clearChat } from "../redux/user/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Startchat() {
  const [titleState, settitle] = useState("");
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  // let { chatData, history, title } = useSelector((state)=>state.chat)
  const [display, setDisplay] = useState(true)
  let { chatData, history } = useSelector((state)=>state.chat)


  const handelTitle = (e) => {
    settitle(e.target.value);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (titleState != null) {
      await dispatch(clearChat())
      dispatch(setTitle(titleState));
      let date = new Date().toLocaleDateString();
      const userchatData = {
        userId: currentUser._id,
        chats: [
          {
            title: titleState,
            date,
            chatData:[],
            history: [
              {
                role: "user",
                parts: [
                  {
                    text: "give me answer if and only if it is related to travaling or any place in world in 500 words.if question is not related to travaling then give answer the question in 10 to 15 words and write like i am traval ai so ask only travaling related questions",
                  },
                ],
              },
              {
                parts: [
                  {
                    text: `I'm ready to assist you with your travel inquiries!
          
          Just ask me anything related to travel, such as:
          
          Destinations: "What are the best places to visit in Europe for a honeymoon?"
          Activities: "What are some fun things to do in Tokyo?"
          Tips: "What are some packing tips for a backpacking trip?"
          Transportation: "How can I get from Paris to Amsterdam by train?"
          Culture: "What are the local customs in Bali?"
          Feel free to ask your question.`,
                  },
                ],
                role: "model",
              },
            ],
          },
        ],
      };
      const res = await fetch("'https://ai-server-ftwj.onrender.com/userchats/addnewchats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userchatData),
      });
      const data = await res.json();
      if(data.sucess !== false){
        console.log(data)
        const chatId = data.chats[data.chats.length - 1]._id;
        dispatch(setChatId(chatId))
        setDisplay(false)
      }
    }
  };

  return (
    <div className={`absolute w-[80%] h-[40%] top-1/2 bg-sky-200 translate-x-[-50%] translate-y-[-50%] rounded-2xl z-10 outline outline-slate-600 ${display?'':'hidden'}`}>
      {currentUser != null ? (
        <form
          onSubmit={handelSubmit}
          className="flex flex-col items-center mt-10"
        >
          <input
            type="text"
            placeholder="Enter title to start chat"
            className="w-[80%] h-12 text-lg pl-2 outline outline-1 outline-slate-600"
            onChange={handelTitle}
            value={titleState}
          />
          <span className="mx-10 text-center my-4 text-slate-600">
            Enter a title to start chatting! This helps set the context and kick
            off your conversation smoothly, allowing for a focused and engaging
            chat experience. Get started now!
          </span>
          <button
            type="submit"
            className="text-lg border-2 border-black py-2 px-8 rounded-2xl mt-6 bg-sky-400 hover:outline hover:outline-2 hover:outline-white"
          >
            Start Chat
          </button>
        </form>
      ) : (
        <div className="flex flex-col items-center mt-5">
          <span className="font-mono text-5xl text-red-600">Opps..</span>
          <span className="font-mono mt-3 mx-6 text-center text-slate-600">
            We've noticed that you haven't created an account or logged in
            recently. To enjoy all the benefits of our platform, please take a
            moment to register or log in.
          </span>
          <Link to="/aunthicate">
            <button className="text-lg border-2 border-black py-2 px-8 rounded-2xl mt-10 bg-sky-400 hover:outline hover:outline-2 hover:outline-white font-mono">
              Login / Register
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Startchat;
