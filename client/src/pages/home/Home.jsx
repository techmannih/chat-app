/* eslint-disable no-unused-vars */
import React from "react";
import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
  return (
    <div className="bg-img flex flex-col sm:flex-row sm:w-screen h-screen bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <div className="flex flex-col  h-screen sm:border-2 sm:border-slate-600">
        <Sidebar />
      </div>
      <div className="flex flex-col w-full h-screen">
        <MessageContainer />
      </div>
    </div>
  );
};

export default Home;
