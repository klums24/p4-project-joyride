import React from "react";
import {useFormik} from "formik";
import * as yup from "yup";


function NewDriveForm({handleToggleForm, setNewDrive, currentDriver, addDriveToUser}){

    const userSchema = yup.object({
        details: yup.string().required("Please describe your drive"),
        car_id: yup.string().required("Please enter the car ID")
    })
    
    const formik = useFormik ({
        initialValues: {
            details: "",
            car_id: "",
            driver_id: currentDriver.id
            
        },
        validationSchema: userSchema,
        onSubmit: values => {
            // alert(JSON.stringify(values, null));
            console.log("im in fetch")
            fetch("/api/v1/drives", {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",   
                },
                body: JSON.stringify(values, null, 2),
            }).then(resp => {
                console.log("RESP", resp)
                if (resp.ok) {
                    resp.json()
                    .then(data => {
                        addDriveToUser(data)
                    })
                }
                else {
                    resp.json()
                    .then(errorObj => {
                        alert(errorObj.error)
                    })
                }
            })
        },
    });

    

    return (
        <div>
          <form className="form-text" onSubmit={formik.handleSubmit}>
            <label htmlFor="car_id">Car ID:</label>
            <input
              id="car_id"
              name="car_id"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.car_id}
            />
            {formik.touched.car_id && formik.errors.car_id ? (
              <div className="error">{formik.errors.car_id}</div>
            ) : null}
    
            <label className="form-text" htmlFor="details">
              Details:
            </label>
            <input
              id="details"
              name="details"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.details}
            />
            {formik.touched.details && formik.errors.details ? (
              <div className="error">{formik.errors.details}</div>
            ) : null}
    
            <button className="button" type="submit">
              Submit
            </button>
          </form>
        </div>
      );
    }
    
    export default NewDriveForm;