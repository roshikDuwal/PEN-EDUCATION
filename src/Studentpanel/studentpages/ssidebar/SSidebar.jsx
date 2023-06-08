import "./ssiderbar.scss";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="box" >
        <NavLink to="/studentpanel/scourse1">Course 1</NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
