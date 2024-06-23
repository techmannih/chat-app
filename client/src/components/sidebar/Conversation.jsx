import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, lastIdx, emoji }) => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const isSelected = selectedConversation?._id === conversation._id;
	const {onlineUsers} = useSocketContext();
	const isOnline = onlineUsers.includes(conversation._id);
	const handleClick = () => {
		setSelectedConversation(conversation);
		const sidebar = document.getElementById("sidebar");
		const msgcontainer = document.getElementById("messageContainer");
		const isSmallScreen = window.matchMedia("(max-width: 640px)").matches;
	
		// For small screens (max-width: 640px)
		if (isSmallScreen && sidebar) {
		  sidebar.style.display = "none";
		  msgcontainer.style.display = "block"; // Ensure the message container is displayed
		} else {
		  // For large screens (min-width: 641px)
		  if (sidebar) {
			sidebar.style.display = "";
		  }
		  if (msgcontainer) {
			msgcontainer.style.display = "";
		  }
		}
	  };


	return (
		<>
			<div
				className={`flex gap-2 items-center hover:bg-sky-700 rounded-2xl p-2 py-1 cursor-pointer conversation
				${isSelected ? "bg-sky-700" : ""}
			`}
			onClick={handleClick}
			>
				<div className={`avatar ${isOnline ? "online":""}`}>
					<div className='w-12 rounded-full'>
						<img src={conversation.profilePic} alt='user avatar' />
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200'>{conversation.username}</p>
						<span className='text-xl'>{emoji}</span>
					</div>
				</div>
			</div>

			{!lastIdx && <div className='divider my-0 py-0 h-1' />}
		</>
	);
};
export default Conversation;