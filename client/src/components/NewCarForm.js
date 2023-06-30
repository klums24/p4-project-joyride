// import { useEffect, useState } from "react";
import React from "react";
import {useFormik} from "formik";
import * as yup from "yup";



function NewCarForm({saveNewCar, handleToggleForm, setCars}) {
    const userSchema = yup.object({
        make: yup.string().required("Please enter your cars make"),
        model: yup.string().required("Please enter your cars model"),
        year: yup.string().required("Please enter your cars model year"),
        picture: yup.string().required("Please enter your cars picture"),
        
    })
    const formik = useFormik ({
        initialValues: {
            make: "",
            model: "",
            year: "",
            picture: "",
            
        },
        validationSchema: userSchema,
        onSubmit: values => {
            // alert(JSON.stringify(values, null));
            console.log("im in fetch")
            fetch("/api/v1/cars", {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",   
                },
                body: JSON.stringify(values, null, 2),
            }).then(resp => {
                console.log("RESP", resp)
                if (resp.ok) {
                    resp.json()
                    .then(car => {
                        setCars(car)
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
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="make">Make:</label>
            <input
                id="make"
                name="make"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.make}
            />

            <label htmlFor="model">Model:</label>
            <input
                id="model"
                name="model"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.model}
            />

            <label htmlFor="year">year:</label>
            <input
                id="year"
                name="year"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.year}
            />

            <label htmlFor="picture">Picture:</label>
            <input
                id="picture"
                name="picture"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.picture}
            />
            <button type="submit">Submit</button>

        </form>
        <button onClick={handleToggleForm}>
        Create a New Car
        </button>
        </div>
    )
    
}

export default NewCarForm