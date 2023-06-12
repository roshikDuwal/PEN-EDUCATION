import "./asiderbar.scss";

import { NavLink } from "react-router-dom";


import CheckBoxIcon from '@mui/icons-material/CheckBox';


const Sidebar = () => {

  return (
    <div className="sidebar">
      <div className="image-box">
        < CheckBoxIcon/>
      </div>

      <div className="box" >
        <NavLink to="/teacherpanel/answerresult/acourse">Course 1</NavLink>
      </div>

    </div>
  );
};

export default Sidebar;
