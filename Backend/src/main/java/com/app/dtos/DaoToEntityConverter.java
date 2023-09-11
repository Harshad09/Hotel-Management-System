package com.app.dtos;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.app.daos.FoodTypeDao;
import com.app.daos.RestaurantDao;
import com.app.entities.Customer;
import com.app.entities.DeliveryPerson;
import com.app.entities.FoodItem;
import com.app.entities.FoodType;
import com.app.entities.OrderItem;
import com.app.entities.Orders;
import com.app.entities.Restaurant;
import com.app.entities.RestaurantManager;

@Component
public class DaoToEntityConverter {
	
	public static CustomerDto customerEntityToDto(Customer customer) {
		if(customer == null)
			return null;

		CustomerDto customerDto = new CustomerDto();
		// copyProperties(Object source, Object target, String... ignoreProperties)
		BeanUtils.copyProperties(customer, customerDto, "password");
		return customerDto;
		
	}
	
	public static DeliveryPersonHomePageDto toDeliveryPersonDTO(Orders entity) {
		if(entity == null)
			return null;
		DeliveryPersonHomePageDto dto = new DeliveryPersonHomePageDto();
		dto.setOrderId(entity.getId());
		dto.setRestaurantName(entity.getRestaurantId().getName());
		dto.setRestaurantAddress(entity.getRestaurantId().getAdressText());
		dto.setRestaurantPinCode(entity.getRestaurantId().getPinCode());
		dto.setCustomerName(entity.getCustomerId().getName());
		dto.setCustomerAddress(entity.getCustomerId().getAddressText());
		dto.setCustomerPinCode(entity.getCustomerId().getPinCode());
		
		return dto;
	}
	
	public static DeliveryPersonDto deliveryPersonEntityToDto(DeliveryPerson deliveryPerson) {
		if(deliveryPerson == null)
			return null;

		DeliveryPersonDto deliveryPersonDto = new DeliveryPersonDto();
		BeanUtils.copyProperties(deliveryPerson, deliveryPersonDto, "password");
		return deliveryPersonDto;
	}
	
	public static Customer customerSignUpDtoToCustomerEntity(CustomerSignUpDto customerSignUpDto) {
		Customer cust = new Customer();
		BeanUtils.copyProperties(customerSignUpDto, cust);
		return cust;
	}
	
	public static Customer customerSignIn(CustomerDto customerDto) {
		Customer cust = new Customer();
		BeanUtils.copyProperties(customerDto, cust);
		return cust;
	}
	
	public static DeliveryPerson DeliveryPersonSignIn(DeliveryPersonDto dpDto) {
		DeliveryPerson dp = new DeliveryPerson();
		BeanUtils.copyProperties(dpDto, dp);
		return dp;
	}
	
	public static RestaurantManager RestaurantManagerSignIn(RestaurantManagerDto restaurantManagerDto) {
		RestaurantManager restaurantManager = new RestaurantManager();
		BeanUtils.copyProperties(restaurantManagerDto, restaurantManager);
		return restaurantManager;
	}
	
	public static RestaurantHomePageDto restaurantEntityToRestaurantHomePageDto(Restaurant rest) {
		RestaurantHomePageDto restHomePageDto = new RestaurantHomePageDto();
		BeanUtils.copyProperties(rest, restHomePageDto, "restaurantmanager", "foodItems", "orders");
		return restHomePageDto;
	}
	
	public static FoodItemHomePageDto foodItemEntityToFoodItemHomePageDto(FoodItem foodItem) {
		FoodItemHomePageDto foodItemHomePageDto = new FoodItemHomePageDto();
//		BeanUtils.copyProperties(foodItem, foodItemHomePageDto, "orderItem");
		foodItemHomePageDto.setId(foodItem.getId());
		foodItemHomePageDto.setFoodTypeId(foodItem.getFoodTypeId().getId());
		foodItemHomePageDto.setRestaurantId(foodItem.getRestaurantId().getId());
		foodItemHomePageDto.setName(foodItem.getName());
		foodItemHomePageDto.setPrice(foodItem.getPrice());
		foodItemHomePageDto.setVegetarian(foodItem.isVegetarian());
		foodItemHomePageDto.setImagePath(foodItem.getImagePath());
		return foodItemHomePageDto;
	}
	
    public static RestaurantManagerDto RestaurantManagerEntityToDto(RestaurantManager restaurantmanager) {
		if(restaurantmanager==null)
			return null;
		RestaurantManagerDto restaurantManagerDto=new RestaurantManagerDto();
		BeanUtils.copyProperties(restaurantmanager, restaurantManagerDto,"password");
		return restaurantManagerDto;		
	}
    
   public static RestaurantManagerHomePageDto toRestaurantManagerHomePageDto(OrderItem entity) {
	   if(entity==null)
	     return null;
	   RestaurantManagerHomePageDto dto=new RestaurantManagerHomePageDto();
	   dto.setOrderId(entity.getOrderId().getId());
	   dto.setFoodItemId(entity.getFoodItemId().getId());
	   dto.setFoodItemName(entity.getFoodItemId().getName());
	   dto.setFoodItemImagePath(entity.getFoodItemId().getImagePath());
	   dto.setFoodItemPrice(entity.getFoodItemId().getPrice());
	   dto.setOrderItemQuantity(entity.getQuantity());
	   
	   return dto;
   }
   
   public static List<FoodItemInOrderDto> orderItemListToFoodItemInOrderDtoList(List<OrderItem> orderItems) {
	   
	   List<FoodItemInOrderDto> foodItems = new ArrayList<FoodItemInOrderDto>();
	   orderItems.forEach(order -> {
		   FoodItemInOrderDto foodItem = new FoodItemInOrderDto();
		   foodItem.setFoodItemId(order.getFoodItemId().getId());
		   foodItem.setFoodName(order.getFoodItemName());
		   foodItem.setFoodPrice(order.getFoodItemPrice());
		   foodItem.setFoodQuantity(order.getQuantity());
		   foodItem.setFoodItemUrl(order.getFoodItemId().getImagePath());
		   foodItems.add(foodItem);
	   });
	   return foodItems;
   }
   
   public static OrdersDto orderToOrderDto(Orders order) {
	   OrdersDto orderDto = new OrdersDto();
	   orderDto.setOrderId(order.getId());
	   orderDto.setCustomer(customerEntityToDto(order.getCustomerId()));
	   orderDto.setRestaurant(restaurantEntityToRestaurantHomePageDto(order.getRestaurantId()));
	   orderDto.setStatus(order.getStatus());
	   
	   
	   DeliveryPerson dp = null;
	   // set delivery person as null if not present
	   try {
		   dp = order.getAssignToDeliveryPersonId();
		} catch (Exception e) {
			dp = null;
		}
	   
	   if(dp != null) {
		   orderDto.setDeliveryPerson(deliveryPersonEntityToDto(dp));
	   }
	   
	   orderDto.setFoodItems(orderItemListToFoodItemInOrderDtoList(order.getOrderItems()));
	   return orderDto;
   }
   
   public static List<OrdersDto> ordersToOrdersDto(List<Orders> orders) {
	   
	   List<OrdersDto> ordersDtoList = new ArrayList<OrdersDto>();
	   orders.forEach(order -> {
		   ordersDtoList.add(orderToOrderDto(order));
	   });
	   
	   return ordersDtoList;
   }
   
   public static FoodItemHomePageDto foodItemAddEntityToDto(FoodItem food) {
		if(food == null)
			return null;

		FoodItemHomePageDto foodItemDto = new FoodItemHomePageDto();
		foodItemDto.setId(food.getId());
		foodItemDto.setFoodTypeId(food.getFoodTypeId().getId());
		foodItemDto.setRestaurantId(food.getRestaurantId().getId());
		foodItemDto.setName(food.getName());
		foodItemDto.setPrice(food.getPrice());
		foodItemDto.setVegetarian(food.isVegetarian());
		foodItemDto.setImagePath(food.getImagePath());
		
		return foodItemDto;
		
	}
  
   	public static FoodTypeDto FoodTypeToFoodTypeDto(FoodType foodType) {
   		FoodTypeDto foodTypeDto = new FoodTypeDto();
   		BeanUtils.copyProperties(foodType, foodTypeDto, "foodItems");
   		return foodTypeDto;
   	}
   	
   	public static RestaurantManagerDto RestaurantManagerToRestaurantmanagerDto(RestaurantManager restaurantmanager) {
   		RestaurantManagerDto restaurantManagerDto = new RestaurantManagerDto();
   		restaurantManagerDto.setId(restaurantmanager.getId());
   		restaurantManagerDto.setName(restaurantmanager.getName());
   		restaurantManagerDto.setEmail(restaurantmanager.getEmail());
   		restaurantManagerDto.setRestaurantId(restaurantmanager.getRestaurantId().getId());
   		restaurantManagerDto.setRestaurantName(restaurantmanager.getRestaurantId().getName());
   		return restaurantManagerDto;
   	}
   	

	
}
