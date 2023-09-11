package com.app.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dtos.Credentials;
import com.app.dtos.CustomerDto;
import com.app.dtos.DeliveryPersonDto;
import com.app.dtos.DeliveryPersonHomePageDto;
import com.app.dtos.DeliveryPersonSignUpDto;
import com.app.dtos.AnnapurnaResponse;
import com.app.dtos.OrdersDto;
import com.app.entities.DeliveryPerson;
import com.app.services.DeliveryPersonService;
import com.app.services.OrdersService;

@CrossOrigin(origins="*")
@RestController
@RequestMapping("/api/v1/")
public class DeliveryPersonController {
	
	@Autowired
	private DeliveryPersonService deliveryPersonService;
	
	@Autowired
	private OrdersService ordersService;
	

	
	@PostMapping("/deliveryperson/signin")
	public ResponseEntity<AnnapurnaResponse> signIn(@RequestBody Credentials cred) {
		DeliveryPersonDto deliveryPersonDto = deliveryPersonService.findDeliveryPersonByEmailAndPassword(cred);
		if(deliveryPersonDto == null)
			return AnnapurnaResponse.error("Couldn't find Delivery Person with that credentials");
		return AnnapurnaResponse.success(deliveryPersonDto);
	}
	
	@GetMapping("/deliverypersonhomepage/{id}")
	public ResponseEntity<AnnapurnaResponse> findDeliveryPersonHomePageDetails(@PathVariable("id") int id){
		DeliveryPersonHomePageDto deliveryPersonDto = ordersService.getdeliveryPersonHomePageDtoById(id);
		if(deliveryPersonDto == null)
			return AnnapurnaResponse.error("Couldn't find Delivery Person Details with that id");
		return AnnapurnaResponse.success(deliveryPersonDto);
	}
	
	@PostMapping("/deliveryperson/{orderId}/{status}")
	public ResponseEntity<AnnapurnaResponse> setStatusByOrder(@PathVariable("orderId") int orderId, @PathVariable("status") String status) {
		boolean updateStatus = ordersService.setStatusForOrder(orderId, status);
		if(!updateStatus)
			return AnnapurnaResponse.error("Couldn't update status for order");
		return AnnapurnaResponse.success("Order status updated");
	}
	
	@GetMapping("/orders/deliveryperson/{id}")
	public ResponseEntity<AnnapurnaResponse> getAllOrdersbyCustomerId(@PathVariable("id") int deliveryPersonId) {
		List<DeliveryPersonHomePageDto> dphpDtoList = ordersService.findAllOrdersByDeliveryPerson(deliveryPersonId);
		if(dphpDtoList == null || dphpDtoList.isEmpty())
			return AnnapurnaResponse.error("List empty!");
		return AnnapurnaResponse.success(dphpDtoList);
	}
	
	@PostMapping("/deliveryperson/arrivedorders/{deliverypersonId}")
	public ResponseEntity<AnnapurnaResponse> getArrivedOrders(@PathVariable("deliverypersonId") int deliverypersonId){
		String status = "arrived";
		List<DeliveryPersonHomePageDto> orders = ordersService.findArrivedordersByDeliverypersonIdAndStatus(deliverypersonId,status);
		if(orders == null || orders.isEmpty())
			return AnnapurnaResponse.error("No orders assigned");
		
		//List<OrdersDto>ordersDtoList = DaoToEntityConverter.ordersToOrdersDto(orders);
		return AnnapurnaResponse.success(orders);
		
	}
	
	@GetMapping("/deliveryperson/{deliverypersonId}/status/{status}")
	public ResponseEntity<AnnapurnaResponse> getOrders(@PathVariable("deliverypersonId") int deliverypersonId, @PathVariable("status") String status){
		
		List<DeliveryPersonHomePageDto> orders = ordersService.findArrivedordersByDeliverypersonIdAndStatus(deliverypersonId,status);
		if(orders == null || orders.isEmpty())
			return AnnapurnaResponse.error("No orders assigned");
		
		return AnnapurnaResponse.success(orders);
	}
	
	@PostMapping("/deliveryperson/signup")
	public ResponseEntity<AnnapurnaResponse> deliveryPersonSignUp(@RequestBody DeliveryPersonSignUpDto deliveryPersonSignUpDto) {
		boolean status = deliveryPersonService.addDeliveryPerson(deliveryPersonSignUpDto);
		if(status)
			return AnnapurnaResponse.success("Delivery Person Added");
		return AnnapurnaResponse.error("Delivery person could not be added");
	}
	
}
