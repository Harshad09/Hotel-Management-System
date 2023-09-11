import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import RestaurantManagerHeader from '../../../Components/RestaurantManagerHeader';
import { URL } from '../../../config';

const validationSchema = Yup.object({
  foodName: Yup.string().required('Item Name is required'),
  price: Yup.number().required('Price is required').positive('Price must be positive'),
  imagePath: Yup.string().required('Image URL is required'),
});

const ManagerAddFoodItem = () => {
  const restaurantName = sessionStorage['restaurantName'];
  const name = sessionStorage['name'];
  const restaurantId = sessionStorage['restaurantId'];
  const [foodTypes, setFoodTypes] = useState([]);

  const navigate = useNavigate();

  const addFoodItem = async (values) => {
    const { foodName, foodTypeId, price, imagePath, isVegetarian } = values;

    try {
      const response = await axios.post(`${URL}/restaurantmanager/addfooditem`, {
        foodTypeId,
        restaurantId,
        name: foodName,
        price,
        imagePath,
        vegetarian: isVegetarian,
      });

      const result = response.data;
      if (result.status === 'SUCCESS') {
        toast.success('Food item added successfully');
        navigate('/manager/restaurantmenu');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Error adding food item');
    }
  };

  const getFoodTypes = async () => {
    try {
      const response = await axios.get(`${URL}/foodtypes`);
      const result = response.data;

      if (result.status === 'SUCCESS') {
        setFoodTypes(result.data);
      } else {
        toast.error('Error fetching food types');
      }
    } catch (error) {
      toast.error('Error fetching food types');
    }
  };

  useEffect(() => {
    getFoodTypes();
  }, []);

  return (
    <div>
      <RestaurantManagerHeader restaurantName={restaurantName} name={name} />

      <h3>Add Food Item</h3>

      <Formik
        initialValues={{
          foodName: '',
          foodTypeId: '',
          price: '',
          imagePath: '',
          isVegetarian: false,
        }}
        validationSchema={validationSchema}
        onSubmit={addFoodItem}
      >
        {(formikProps) => (
          <Form>
            <div className="row">
              <div className="col"></div>
              <div className="col">
                <div className="form">
                  <div className="mb-3">
                    <label htmlFor="foodName" className="label-control">
                      Item Name
                    </label>
                    <Field
                      name="foodName"
                      type="text"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="foodName"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="foodTypeId" className="label-control">
                      Food Type
                    </label>
                    <Field
                      name="foodTypeId"
                      as="select"
                      className="form-control"
                    >
                      <option value="">-- Select an option --</option>
                      {foodTypes.map((foodType) => (
                        <option key={foodType.id} value={foodType.id}>
                          {foodType.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="foodTypeId"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="price" className="label-control">
                      Price
                    </label>
                    <Field name="price" type="number" className="form-control" />
                    <ErrorMessage
                      name="price"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="imagePath" className="label-control">
                      Image URL
                    </label>
                    <Field
                      name="imagePath"
                      type="text"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="imagePath"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="isVegetarian" className="label-control">
                      Is Vegetarian clic
                    </label>
                    <Field
                      type="checkbox"
                      name="isVegetarian"
                      className="form-check-input"
                    />
                  </div>

                  <div className="d-flex justify-content-between">
                    <div className="mb-3">
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => {
                          navigate('/manager/restaurantmenu');
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                    <div className="mb-3 float-right">
                      <button
                        type="submit"
                        className="btn btn-primary"
                      >
                        Add Item
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col"></div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ManagerAddFoodItem;

