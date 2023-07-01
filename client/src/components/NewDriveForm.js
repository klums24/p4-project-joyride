import React from "react";
import {useFormik} from "formik";
import * as yup from "yup";


function NewDriveForm({handleToggleForm, setNewDrive, currentDriver, addDriveToUser}){

    const userSchema = yup.object({
        details: yup.string().required("Describe your drive"),
        
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
        <form class="form-text" onSubmit={formik.handleSubmit}>
            <label htmlFor="car_id">car_id:</label>
            <input
                id="car_id"
                name="car_id"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.car_id} 
            />
            <label class="form-text" htmlFor="details">details:</label>
            <input
                id="details"
                name="details"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.details} 
            />

            {/* <label htmlFor="model">Model:</label>
            <input
                id="model"
                name="model"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.model} */}
            {/* />

            <label htmlFor="year">year:</label>
            <input
                id="year"
                name="year"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.year}
            /> */}
{/* 
            <label htmlFor="picture">Picture:</label>
            <input
                id="picture"
                name="picture"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.picture}
            /> */}
            <button class="button" type="submit">Submit</button>

        </form>
        <button class="button" onClick={handleToggleForm}>
        Create a New Car
        </button>
        </div>
    )
    
}

export default NewDriveForm