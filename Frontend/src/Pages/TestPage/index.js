import './index.css'
import FoodItemVertical from "../../Components/FoodItemVertical"
import FoodItemHorizontal from "../../Components/FoodItemHorizontal"
import RestaurantManagerOrder from '../../Components/RestaurantManagerOrder'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const TestPage = () => {

    const url = "http://localhost:8084/api/v1/restaurantmanager/arrivedorders/2";
    const [arrivedOrders, setArrivedOrders] = useState([])

    const assignDeliveryPerson = (orderId) => {
        console.log("Order No: " + orderId + " is to be assigned")
    }

    const loadArrivedOrders = () => {
        axios.post(url).then(response => {
            const result = response.data;
            if(result.status === "SUCCESS") {
                setArrivedOrders(result.data)
                // console.log(arrivedOrders);
            } else {
                toast.error(result.message);
            }
        })
    }

    useEffect(() => {
        loadArrivedOrders();
    }, [])

    return (
        <div>
            {arrivedOrders.map(order => <RestaurantManagerOrder 
                key={order.orderId}
                orderId={order.orderId}
                foodItems={order.foodItems}
                customer={order.customer}
                restaurant={order.restaurant}
                status={order.status}
                assignDeliveryPerson={assignDeliveryPerson}
            />)}
        </div>
    )

}

export default TestPage