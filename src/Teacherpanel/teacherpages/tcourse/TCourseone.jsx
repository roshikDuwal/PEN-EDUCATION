import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import "./Tcourse.scss"

import TSidebar from "../tsidebar/TSidebar"
import TNavbar from "../tnavbar/TNavbar"

import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { Formik } from 'formik';
import { saveUnits } from "../../../services/units"
import { error, success } from "../../../utils/toast";
import { getUnits } from '../../../services/units'

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { ThreeDots } from 'react-loader-spinner';

const Courseone = () => {
  const [unit, setUnit] = useState([])
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = React.useState(true);

  const fetchUnits = () => {
    setLoading(true);
    getUnits()
      .then(units => {
        setUnit(units);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchUnits();
  }, [])

  return (
    <>
      <TNavbar />
      
      <section className="course">
        <TSidebar />

        <div className="course-section">

          <div className="buttonbox">
            <Button className='addquestionicon' onClick={handleOpen}><AddIcon /></Button>
          </div>

          <Modal className='modal'
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className="modal-box">
              <Formik
                initialValues={{ unit_name: '', unit_code: '' }}
                validate={values => {
                  const errors = {};
                  if (!values.unit_name) {
                    errors.unit_name = 'Required';
                  }
                  if (!values.unit_code) {
                    errors.unit_code = 'Required';
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  saveUnits(values)
                    .then(() => {
                      success("Unit submitted successfully");
                      setSubmitting(false);
                      setOpen(false);
                      fetchUnits();
                    })
                    .catch((err) => {
                      error(err.message);
                      setSubmitting(false);
                    });
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  /* and other goodies */
                }) => (
                  <form onSubmit={handleSubmit}>
                    <div>
                      <TextField
                        id="outlined-basic"
                        label="Unit Code"
                        variant="outlined"
                        type="unit_code"
                        name="unit_code"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.unit_code}
                      />
                      {errors.unit_code && touched.unit_code && errors.unit_code}
                    </div>

                    <div>
                      <TextField
                        type="unit_name"
                        name="unit_name"
                        id="outlined-basic"
                        label="Unit Name"
                        variant="outlined"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.unit_name}
                      />
                      {errors.unit_name && touched.unit_name && errors.unit_name}
                    </div>


                    <div>
                      <button type="submit" disabled={isSubmitting}>
                        Submit
                      </button>
                    </div>

                  </form>
                )}
              </Formik>

              <div>
                <Button className='closequestionicon' onClick={handleClose}><CloseIcon /></Button>
              </div>
            </Box>
          </Modal>

          <div className="unit-box">
            <div className="unitlisttitle">
              <ul>
                <li>UNIT CODE</li>
                <li>UNIT NAME</li>
                <li>Action</li>
              </ul>
            </div>


            {loading ? <>
              <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#5b58ff"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
            </> : unit.map((curElem, index) => {
              return (
                <>
                  <div className='allunitlist'>
                    <ul key={index} className='unitlist'>
                      <li>({curElem.unit_code})</li>
                      <li>{curElem.unit_name}</li>
                      <li><Button variant="contained" className='button'><NavLink to={curElem.id.toString()}>View </NavLink></Button></li>
                    </ul>
                  </div>
                </>
              )
            })}
            {!loading && !unit.length && <img src="/assets/empty.png" alt="No Data Found"></img>}
          </div>
        </div>
      </section>
    </>
  )
}

export default Courseone