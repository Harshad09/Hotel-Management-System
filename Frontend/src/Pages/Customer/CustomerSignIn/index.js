import { useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { URL } from '../../../config';

const CustomerSignIn = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage["personType"] === "customer" && sessionStorage["loginStatus"] === "1") {
            navigate("/customer/home");
        }
    }, [navigate]);

    const initialValues = {
        email: "",
        password: ""
    };

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email address").required("Please enter your email"),
        password: Yup.string().required("Please enter your password")
    });

    const onSubmit = (values) => {
        const url = `${URL}/customers/signin`;
        axios.post(url, values).then((response) => {
            const result = response.data;

            if (result.status === "SUCCESS") {
                Swal.fire("Success", "Welcome to Annapurna", "success").then(() => {
                    const { id, name, email, addressText, pinCode } = result.data;

                    sessionStorage.setItem('id', id);
                    sessionStorage.setItem('name', name);
                    sessionStorage.setItem('email', email);
                    sessionStorage.setItem('addressText', addressText);
                    sessionStorage.setItem('pinCode', pinCode);

                    sessionStorage.setItem('loginStatus', '1');
                    sessionStorage.setItem('personType', 'customer');
                    sessionStorage.setItem("foodItemMap", "[]");

                    navigate('/customer/home');
                });
            } else {
                toast.error(result.message);
            }
        });
    };

    return (
        <div className="card" style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div className="card-body">
            <h2 className="title">Customer Sign In</h2>
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
                        <Field type="email" name="email" className="form-control" />
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
                            No account? <Link to="/customer/signup">Sign up here!</Link>
                        </div>
                        <button type="submit" className="btn btn-primary">Sign In</button>
                    </div>
                </Form>
            </Formik>
        </div>
        </div>
    );
}

export default CustomerSignIn;
