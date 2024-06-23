import Conversations from "./Conversations";

import SearchInput from "./SearchInput";
import logo from "/3.png";

const Sidebar = () => {
  return (

      <div id="sidebar" className=" px-8 pt-8 flex flex-col max-w-96">
        {/* Logo section */}
        <div className="flex items-center  justify-center mb-4 px-3">
          <img src={logo} alt="logo" className=" w-32  h-16" />
        </div>
        <SearchInput />
        <div className="devider px-3"></div>
        <Conversations />
      </div>

  );
};

export default Sidebar;
