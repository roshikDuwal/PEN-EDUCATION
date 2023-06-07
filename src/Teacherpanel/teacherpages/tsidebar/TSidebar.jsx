import "./tsiderbar.scss";

import { Link } from "react-router-dom";


const Sidebar = () => {
  const sidebararr = [
    {
      id: 1,
      name: "Course 1",
      link: "tcourse1",
    },
    {
      id: 2,
      name: "Course 2",
      link: "tcourse2",
    }
  ];
  return (
    <div className="sidebar">
      {sidebararr.map((currEle) => {
        return (
          <div className="box" key={currEle.id}>
            <Link to={currEle.link}>{currEle.name}</Link>
          </div>
        );
      })}

    </div>
  );
};

export default Sidebar;
