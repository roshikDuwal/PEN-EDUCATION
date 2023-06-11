import "./tsiderbar.scss";

import { NavLink } from "react-router-dom";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

const Sidebar = () => {

  return (
    <div className="tsidebar">
      <div className="image-box">
        < QuestionAnswerIcon />
      </div>

      <div className="box" >
        <NavLink to="/teacherpanel/tcourse1">Course 1</NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
