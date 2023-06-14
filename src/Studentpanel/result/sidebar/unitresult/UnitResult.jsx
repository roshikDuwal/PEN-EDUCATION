import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useParams, Link } from "react-router-dom";
import SNavbar from "../../../studentpages/snavbar/SNavbar";

import Resultcanvas from "./Resultcanva"

import ArrowCircleLeftSharpIcon from "@mui/icons-material/ArrowCircleLeftSharp";
import { getQuestions } from "../../../../services/questions";
import { ThreeDots } from "react-loader-spinner";

const ShowAssignment = (props) => {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = useState([]);
  const { unit_id } = useParams();

  const fetchQuestions = () => {
    setLoading(true);
    getQuestions(unit_id || 1)
      .then((data) => {
        setData(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchQuestions();
  }, []);

    return (
    <>
      <SNavbar />

      <div className="full">
        <section className="main-div">
          <div className="back">
            <Link to="/studentpanel/result">
              <span className="backArrow">
                <ArrowCircleLeftSharpIcon fontSize="large" />
              </span>
            </Link>
          </div>

          <h3>Result</h3>
          {loading &&
              <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#5b58ff"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />}
          {data.length&& <div>
            <hr/>
            <Resultcanvas {...data[data.length - 1]}/>
          </div>}

        </section>
      </div>
    </>
  );
};

export default ShowAssignment;
