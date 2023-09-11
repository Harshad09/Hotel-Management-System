package com.app.controllers;

import java.util.ArrayList;


import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.daos.FoodTypeDao;
import com.app.daos.OrdersDao;
import com.app.daos.RestaurantDao;
import com.app.dtos.Credentials;
import com.app.dtos.CustomerDto;
import com.app.dtos.CustomerSignUpDto;
import com.app.dtos.DaoToEntityConverter;
import com.app.dtos.DeliveryPersonDto;
import com.app.dtos.FoodItemHomePageDto;
import com.app.dtos.FoodTypeDto;
import com.app.dtos.AnnapurnaResponse;
import com.app.dtos.OrdersDto;
import com.app.dtos.RestManAndRestSignUpDto;
import com.app.dtos.RestaurantManagerDto;
import com.app.entities.Customer;
import com.app.entities.DeliveryPerson;
import com.app.entities.FoodItem;
import com.app.entities.FoodType;
import com.app.entities.Orders;
import com.app.entities.RestaurantManager;
import com.app.services.DeliveryPersonService;
import com.app.services.FoodItemService;
import com.app.services.FoodTypeService;
import com.app.services.OrdersService;
import com.app.services.RestaurantManagerService;
import com.app.services.RestaurantService;

@CrossOrigin(origins="*")
@RestController
@RequestMapping("/api/v1/")
public class RestaurantManagerController {
	
	@Autowired
	private RestaurantManagerService restaurantManagerService;
	
	@Autowired
	private DeliveryPersonService deliveryPersonService;
	
	@Autowired
	private OrdersService ordersService;

	@Autowired
	private FoodItemService foodItemService;
	
	@Autowired
	private FoodTypeService foodTypeService;
	
	@Autowired
	private RestaurantService restaurantService;

	
	@GetMapping("/restaurantmanager/{id}")
	public ResponseEntity<AnnapurnaResponse> getRestaurantManagerById(@PathVariable("id") int id)
	{
		Optional<RestaurantManager> r = restaurantManagerService.getRestaurantManagerById(id);
		if(r==null)
			return AnnapurnaResponse.error("not found");
		
		return AnnapurnaResponse.success(r);

	}
	@PostMapping("/restaurantmanager/signin")
	public ResponseEntity<AnnapurnaResponse> signIn(@RequestBody Credentials cred)
	{
		RestaurantManagerDto restauarantManagerDto =restaurantManagerService.findRestaurantManagerByEmailAndPassword(cred);
		if(restauarantManagerDto==null)
			return AnnapurnaResponse.error("not found");
		
		return AnnapurnaResponse.success(restauarantManagerDto);
		
	}
	



	@GetMapping("/restaurantmanager/availabledeliveryperson/{status}")
	public ResponseEntity<AnnapurnaResponse> getDeliveryPersonByAvailable(@PathVariable("status") boolean status)
	{
		List<DeliveryPersonDto> dto = deliveryPersonService.findDeliveryPersonByIsAvailable(status);
		if(dto == null)
			return AnnapurnaResponse.error("not available");
		
		return AnnapurnaResponse.success(dto);

	}
	

	@PostMapping("/restaurantmanager/arrivedorders/{restaurantId}")
	public ResponseEntity<AnnapurnaResponse> getArrivedOrders(@PathVariable("restaurantId") int restaurantId) {
		
		String status = "arrived";
		List<Orders> orders = ordersService.findArrivedOrdersByRestaurantIdAndStatus(restaurantId, status);
		if(orders == null || orders.isEmpty())
			return AnnapurnaResponse.error("List Empty!");
		
		// orders is full
		List<OrdersDto> ordersDtoList = DaoToEntityConverter.ordersToOrdersDto(orders);
		
//		System.out.println(ordersDtoList);
		return AnnapurnaResponse.success(ordersDtoList);
	}
	
	@PostMapping("/restaurantmanager/allorders/{restaurantId}")
	public ResponseEntity<AnnapurnaResponse> getAllOrdersByRestaurant(@PathVariable("restaurantId") int restaurantId) {
		List<Orders> orders = ordersService.findAllOrdersByRestaurantid(restaurantId);
		if(orders == null || orders.isEmpty())
			return AnnapurnaResponse.error("List Empty!");
		List<OrdersDto> ordersDtoList = DaoToEntityConverter.ordersToOrdersDto(orders);
		return AnnapurnaResponse.success(ordersDtoList);
	}
	

	@PostMapping("/restaurantmanager/addfooditem")
	public ResponseEntity<AnnapurnaResponse> addFoodItem(@RequestBody FoodItemHomePageDto foodItemHomePageDto) {

		boolean status = foodItemService.saveFoodItemDto(foodItemHomePageDto);
		if(!status)
			return AnnapurnaResponse.error("Couldn't add food item");
		
		return AnnapurnaResponse.success("Food item added");
	}

	@GetMapping("/foodtypes")
	public ResponseEntity<AnnapurnaResponse> getAllFoodTypes() {
		List<FoodTypeDto> foodTypes = foodTypeService.findAllFoodTypes();
		return AnnapurnaResponse.success(foodTypes);
	}
	
	@GetMapping("/foodTypes/edit/{foodItemId}")
	public ResponseEntity<AnnapurnaResponse> getFoodItemDetails(@PathVariable("foodItemId") int foodItemId) {
		FoodItemHomePageDto foodItemHomePageDto = foodItemService.getDtoById(foodItemId);
		List<FoodTypeDto> foodTypes = foodTypeService.findAllFoodTypes();
		
		List<Object> resultData = new ArrayList<Object>();
		resultData.add(foodItemHomePageDto);
		resultData.add(foodTypes);
		
		return AnnapurnaResponse.success(resultData);
	}
	
	@PostMapping("/foodTypes/edit/{foodItemId}")
	public ResponseEntity<AnnapurnaResponse> updateFoodItemDetails(@RequestBody FoodItemHomePageDto foodItemHomePageDto) {
		boolean status = foodItemService.updateFoodItem(foodItemHomePageDto);
		if(!status)
			return AnnapurnaResponse.error("Couldn't update food item");
		
		return AnnapurnaResponse.success("Food item updated");
	}
	
	@PostMapping("/orders/assign/{orderId}/{deliveryPersonId}")
	public ResponseEntity<AnnapurnaResponse> assignDeliveryPersonToOrder
		(@PathVariable("orderId") int orderId, @PathVariable("deliveryPersonId") int deliveryPersonId) {
		boolean status = ordersService.assignDeliveryPersonToOrder(orderId, deliveryPersonId);
		if(status == false)
			AnnapurnaResponse.error("Order not assigned");
		
		return AnnapurnaResponse.success("Order assigned successfully");
	}
	
	@GetMapping("/fooditem/restaurant/{restaurantId}")
	public ResponseEntity<AnnapurnaResponse> getAllFoodItemsByRestaurantId(@PathVariable("restaurantId") int restaurantId) {
		List<FoodItemHomePageDto> foodItemDtos = foodItemService.findAllFoodItemsFromRestaurant(restaurantId);
		if(foodItemDtos == null || foodItemDtos.isEmpty())
			return AnnapurnaResponse.error("No food items found, please add food items.");
		return AnnapurnaResponse.success(foodItemDtos);
	}
	
	@PostMapping("/restaurantmanager/signup")
	public ResponseEntity<AnnapurnaResponse> restManagerAndRestSignUp(@RequestBody RestManAndRestSignUpDto dto) {
		boolean status = restaurantService.restManagerAndRestSignUp(dto);
		if(status)
			return AnnapurnaResponse.success("Added Restaurant and Restaurant Manager");
		return AnnapurnaResponse.error("Could not Restaurant and Restaurant Manager");
	}

}
