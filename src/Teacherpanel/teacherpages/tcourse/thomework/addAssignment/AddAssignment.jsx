import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useParams, Link } from "react-router-dom";
import TNavbar from "../../../tnavbar/TNavbar";

import "../thomeworkbox.scss";

import Accordian from "../Accordian";

import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ArrowCircleLeftSharpIcon from "@mui/icons-material/ArrowCircleLeftSharp";

import { Formik } from "formik";
import { saveUnits } from "../../../../../services/units";
import { error, success } from "../../../../../utils/toast";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { getQuestions } from "../../../../../services/questions";
import { ThreeDots } from "react-loader-spinner";
import AddAssignmentCanvas from "./scanva/SCanva";

const AddAssignment = (props) => {
  const [pdf, setPdf] = useState(null);
  const [loading, setLoading] = useState(false);

    const uploadPDF = (e) => {
      setLoading(true);
        const file = e.target.files[0];
        pdfjsLib.getDocument(URL.createObjectURL(file)).promise.then((pdf) => {
            setPdf(pdf)
        }).catch((e) => console.log(e)).finally(()=>setLoading(false))
    }

    return (
    <>
      <TNavbar />

      <div className="full">
        <section className="main-div">
          <div className="back">
            <Link to="/teacherpanel/tcourse1">
              <span className="backArrow">
                <ArrowCircleLeftSharpIcon fontSize="large" />
              </span>
            </Link>
          </div>

          <h3>Add Assignment PDF</h3>
          <div>
              <input type="file" onChange={uploadPDF} name="" id="" height={"10"} />
          </div>
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
          {pdf&& <div>
            <hr/>
            <AddAssignmentCanvas pdf={pdf} />
          </div>}

        </section>
      </div>
    </>
  );
};

export default AddAssignment;
