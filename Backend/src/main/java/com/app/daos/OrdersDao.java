package com.app.daos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.entities.DeliveryPerson;
import com.app.entities.Orders;
import com.app.entities.Restaurant;



@Repository
public interface OrdersDao extends JpaRepository<Orders, Integer> {


	
	List<Orders> findByRestaurantIdAndStatus(Restaurant restaurantId, String status);
	
	List<Orders> findByStatus(String status);
	
	List<Orders> findByRestaurantId(Restaurant restaurantId);

	List<Orders> findByAssignToDeliveryPersonIdAndStatus(DeliveryPerson deliveryperson, String status);
	


}
