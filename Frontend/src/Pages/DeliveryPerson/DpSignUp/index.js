import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { URL } from '../../../config';

const DeliveryPersonSignUp = () => {
    const navigate = useNavigate();

    const initialValues = {
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Please enter your name"),
        email: Yup.string().email("Invalid email address").required("Please enter your email"),
        password: Yup.string().required("Please enter your password"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Please confirm your password")
    });

    const onSubmit = (values) => {
        const url = `${URL}/deliveryperson/signup`;
        axios.post(url, { ...values, available: true }).then(response => {
            const result = response.data;
            if(result.status === "SUCCESS") {
                Swal.fire("Success", "Delivery Person successfully signed up", "success").then(() => {
                    navigate("/dp/signin");
                });
            } else {
                toast.error(result.message);
            }
        });
    };

    return (
        <div className="card" style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div className="card-body">
            <h2 className="title">Delivery Person Sign Up</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                <Form className="form">
                    <div className="mb-3">
                        <label htmlFor="name" className="label-control">
                            Name
                        </label>
                        <Field type="text" name="name" className="form-control" />
                        <ErrorMessage name="name" component="div" className="error-message text-danger" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="label-control">
                            Email Address
                        </label>
                        <Field type="text" name="email" className="form-control" />
                        <ErrorMessage name="email" component="div" className="error-message text-danger" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="label-control">
                            Password
                        </label>
                        <Field type="password" name="password" className="form-control" />
                        <ErrorMessage name="password" component="div" className="error-message text-danger" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="label-control">
                            Confirm Password
                        </label>
                        <Field type="password" name="confirmPassword" className="form-control" />
                        <ErrorMessage name="confirmPassword" component="div" className="error-message text-danger" />
                    </div>

                    <div className="mb-3">
                        <div>
                            Already have an account? <Link to="/DP/signin">Sign in here!</Link>
                        </div>
                        <button type="submit" className="btn btn-primary">Sign Up</button>
                    </div>
                </Form>
            </Formik>
        </div>
        </div>
    );
}

export default DeliveryPersonSignUp;
