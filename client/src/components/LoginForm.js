import React from "react"
import {useFormik} from "formik";
import * as yup from "yup";

function LoginForm() {

    const formik = useFormik({
        initialValues: {
          username: "",
          password: "",
        },
        validationSchema: yup.object({
          username: yup.string().required("Username is required"),
          password: yup.string().required("Password is required"),
        }),
        onSubmit: values => {
          alert(JSON.stringify(values, null));
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
                id="username"
                name="username"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.username}
            />
            
            <label htmlFor="password">Password:</label>
            <input
                id="password"
                name="password"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.lastName}
            />
            
          <button type="submit">Login</button>
        </form>
      )
    }
    
    export default LoginForm;