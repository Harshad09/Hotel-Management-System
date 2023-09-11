import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { URL } from '../../../config';

const validationSchema = Yup.object({
  cardNumber: Yup.string().min(12,'card number should be 12 charecter ').required('Card Number is required'),
  expiry: Yup.string().required('Expiry is Year required'),
  nameOnTheCard: Yup.string().required('Name on the Card is required'),
  cvv: Yup.number().min(3,'CVV is 3 digit').required('CVV is required'),
});

const CustomerPayment = () => {
  const navigate = useNavigate();

  const handleOrderPlacement = (values) => {
    if (validateCard(values)) {
      let sessionCart = JSON.parse(sessionStorage['sessionCart']);
      let foodItemMap = new Map(JSON.parse(sessionStorage['foodItemMap']));

      const url = `${URL}/orders/place`;
      let foodItemsInOrder = processFoodItemsArray(sessionCart, foodItemMap);
      let restaurantId = sessionStorage['restaurantId'];
      let customerId = sessionStorage['id'];

      const body = {
        foodItemsInOrder,
        restaurantId,
        customerId,
      };

      axios.post(url, body)
        .then((response) => {
          const result = response.data;
          if (result.status === 'SUCCESS') {
            toast.success('Order successfully placed. Order Id: ' + result.data.orderId);

            sessionStorage['foodItemMap'] = '[]';
            sessionStorage['sessionCart'] = '[]';
            sessionStorage.removeItem('restaurantId');

            Swal.fire({
              icon: 'success',
              title: 'Order Placed',
              text: `Order successfully placed. Order Id: ${result.data.orderId}`,
            }).then(() => {
              navigate('/customer/orders');
            });
          } else {
            toast.error('Couldn\'t place order');
          }
        })
        .catch((error) => {
          toast.error('An error occurred while placing the order.');
          console.error(error);
        });
    } else {
      toast.error('Please enter all details');
    }
  };

  const validateCard = (values) => {
    if (
      values.cardNumber === '' ||
      values.expiry === '' ||
      values.nameOnTheCard === '' ||
      values.cvv === 0
    ) {
      return false;
    }
    return true;
  };

  const processFoodItemsArray = (sessionCart, foodItemMap) => {
    let foodItemsInOrder = [];
    sessionCart.forEach((item) => {
      let foodItem = {};
      foodItem.foodItemId = item.id;
      foodItem.foodName = item.name;
      foodItem.foodPrice = item.price;
      foodItem.foodQuantity = foodItemMap.get(item.id);
      foodItemsInOrder.push(foodItem);
    });
    return foodItemsInOrder;
  };

  return (
    <div>
      <h2 className="title">Payment</h2>

      <Formik
        initialValues={{
          cardNumber: '',
          expiry: '',
          nameOnTheCard: '',
          cvv: 0,
        }}
        validationSchema={validationSchema}
        onSubmit={handleOrderPlacement}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="row">
              <div className="col"></div>
              <div className="col">
                <div className="form">
                  <div className="mb-3">
                    <label htmlFor="cardNumber" className="label-control">
                      Card Number
                    </label>
                    <Field
                      type="text"
                      name="cardNumber"
                      className="form-control"
                      id="cardNumber"
                    />
                    <ErrorMessage
                      name="cardNumber"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="expiry" className="label-control">
                      Expiry
                    </label>
                    <Field
                      type="text"
                      name="expiry"
                      className="form-control"
                      id="expiry"
                    />
                    <ErrorMessage
                      name="expiry"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="nameOnTheCard" className="label-control">
                      Name On The Card
                    </label>
                    <Field
                      type="text"
                      name="nameOnTheCard"
                      className="form-control"
                      id="nameOnTheCard"
                    />
                    <ErrorMessage
                      name="nameOnTheCard"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="cvv" className="label-control">
                      CVV
                    </label>
                    <Field
                      type="number"
                      name="cvv"
                      className="form-control"
                      id="cvv"
                    />
                    <ErrorMessage
                      name="cvv"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                </div>
              </div>
              <div className="col"></div>
            </div>

            <div className="mb-3">
              <button
                className="btn btn-outline-primary"
                onClick={() => {
                  navigate('/customer/address');
                }}
              >
                Previous
              </button>
              <button type="submit" className="btn btn-primary float-right">
                Place Order
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CustomerPayment;
