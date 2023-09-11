import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { URL } from '../../../config';

const DeliveryPersonSignIn = () => {
    const navigate = useNavigate();

    const initialValues = {
        email: "",
        password: ""
    };

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email address").required("Please enter email"),
        password: Yup.string().required("Please enter password")
    });

    const onSubmit = (values) => {
        const url = `${URL}/deliveryperson/signin`;
        axios.post(url, values).then((response) => {
            const result = response.data;

            if (result.status === "SUCCESS") {
                Swal.fire("Success", "Welcome to Annapurna", "success").then(() => {
                    const { id, name, email } = result.data;
                    sessionStorage['id'] = id;
                    sessionStorage['name'] = name;
                    sessionStorage['email'] = email;

                    sessionStorage['loginStatus'] = '1';
                    sessionStorage['personType'] = 'deliveryPerson';

                    navigate('/dp/home');
                });
            } else {
                toast.error(result.message);
            }
        });
    };

    return (
        <div className="card" style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div className="card-body">
            <h2 className="title">DeliveryPerson Sign In</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                <Form className="form">
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
                        <div>
                            No account? <Link to="/deliveryperson/signup">Sign up here!</Link>
                        </div>
                        <button type="submit" className="btn btn-primary">Sign In</button>
                    </div>
                </Form>
            </Formik>
        </div>
        </div>
    );
}

export default DeliveryPersonSignIn;
