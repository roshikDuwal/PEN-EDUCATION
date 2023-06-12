import "./rsidebar.scss"

import { NavLink } from "react-router-dom";
import AssignmentIcon from '@mui/icons-material/Assignment';


const RSidebar = () => {

  return (
    <div className="ssidebar">
      <div className="image-box">
        < AssignmentIcon/>
      </div>

      <div className="box" >
        <NavLink to="/studentpanel/scourse1">Course 1</NavLink>
      </div>
    </div>
  );
};

export default RSidebar;
