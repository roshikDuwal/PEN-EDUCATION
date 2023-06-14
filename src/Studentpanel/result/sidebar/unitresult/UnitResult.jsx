import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import SNavbar from "../../../studentpages/snavbar/SNavbar";

import ArrowCircleLeftSharpIcon from "@mui/icons-material/ArrowCircleLeftSharp";
import { ThreeDots } from "react-loader-spinner";
import { getResult } from "../../../../services/answers";
import { CHECK_IMAGE_PREFIX } from "../../../../constants";

const ShowAssignment = (props) => {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = useState();
  const { unit_id } = useParams();

  const fetchQuestions = () => {
    setLoading(true);
    getResult(unit_id || 1)
      .then((data) => {
        data.length && setData(data[data.length - 1]);
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
          <hr/>
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
          {data ? <>
          <h4>Remark: {data.score === "1" ? "Satisfied": "Unsatisfied"}</h4>
          Feedback: <b className="Container" dangerouslySetInnerHTML={{__html: data.feedback}}></b>
          <hr/>
          <img src={`${CHECK_IMAGE_PREFIX}${data.check_file}`} alt="loading" />
          </> : ""}

        </section>
      </div>
    </>
  );
};

export default ShowAssignment;
