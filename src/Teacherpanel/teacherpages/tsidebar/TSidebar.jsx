import "./tsiderbar.scss";

import { NavLink } from "react-router-dom";


const Sidebar = () => {

  return (
    <div className="sidebar">
      <div className="box" >
       <NavLink to="/teacherpanel/tcourse1">Course 1</NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
