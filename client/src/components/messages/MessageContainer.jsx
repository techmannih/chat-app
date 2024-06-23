import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import LogoutButton from "../sidebar/LogoutButton";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    // cleanup function (unmounts)
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);
  const { authUser } = useAuthContext();

  const handleBack = () => {
    setSelectedConversation(null); // Clear selected conversation when back button is clicked

    const sidebar = document.getElementById("sidebar");
    const msgContainer = document.getElementById("messageContainer");
    const isSmallScreen = window.matchMedia("(max-width: 640px)").matches;

    if (isSmallScreen) {
      if (sidebar) {
        sidebar.style.display = ""; // Show the sidebar
      }
      if (msgContainer) {
        msgContainer.style.display = "none"; // Hide the message container
      }
    }
  };
  const isSmallScreen = window.matchMedia("(max-width: 640px)").matches;

  return (
    <div id="messageContainer" className="md:min-w-[450px] max-sm:hidden p-2.5 pb-12 h-screen flex py-4 rounded-3xl flex-col">
      {/* Back button and user info section */}
      <div className="flex px-6 mb-4 items-end justify-between max-sm:text-sm">
        {isSmallScreen && (
          <button onClick={handleBack} className="text-gray-300 hover:text-white focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
        )}
        <div className="flex flex-row shadow-2xl p-2 rounded-3xl gap-4">
          <img
            src={authUser.profilePic}
            alt="profile"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="text-white text-xl font-bold">{authUser.fullName}</p>
            <p className="text-gray-300">@{authUser.username}</p>
          </div>
        </div>
        <LogoutButton />
      </div>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="bg-slate-800 px-4 py-2 mb-2 rounded-lg">
            <span className="label-text">To: </span>{" "}
            <span className="text-white font-bold">
              {selectedConversation.fullName}{" "}
              <span className="text-gray-300">
                ({selectedConversation.username})
              </span>
            </span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome, {authUser.fullName}! 👋❄</p>
        <p>Start a chat to begin your conversation.</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
