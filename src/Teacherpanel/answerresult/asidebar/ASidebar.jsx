import "./asiderbar.scss";

import { NavLink } from "react-router-dom";


const Sidebar = () => {

  return (
    <div className="sidebar">
      <div className="box">
      <h1 style={{color:"white"}}>ANSWER</h1>
      </div>
   
      <div className="box" >
       <NavLink to="/teacherpanel/answerresult/acourse">Course 1</NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
