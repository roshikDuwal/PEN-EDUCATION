import React, { useEffect, useState } from 'react'
import TSidebar from "../tsidebar/TSidebar"
import TNavbar from "../tnavbar/TNavbar"
import "./Tcourse.scss"
import { NavLink } from 'react-router-dom'
import { getUnits } from '../../../services/units'
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { Formik } from 'formik';
import { saveUnits } from "../../../services/units"
import { error, success } from "../../../utils/toast";

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

const Courseone = () => {
  const [unit, setUnit] = useState([])
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  useEffect(() => {

    getUnits().then(units => {

      setUnit(units);
    });
  }, [])



  return (
    <>
      <TNavbar />
      <section className="course">
        <TSidebar />
        <div className="course-section">

          <Button className='addquestionicon' onClick={handleOpen}><AddIcon /></Button>

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
                      setOpen(false)
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

          <ul>
            {unit.map((curElem, index) => {
              return (
                <li key={index}><NavLink to={curElem.unit_code}>{curElem.unit_name}</NavLink></li>
              )
            })}
          </ul>
        </div>
      </section>



    </>

  )
}

export default Courseone