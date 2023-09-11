package com.app.controllers;

import java.util.List;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dtos.Credentials;
import com.app.dtos.CustomerDto;
import com.app.dtos.CustomerSignUpDto;
import com.app.dtos.DaoToEntityConverter;
import com.app.dtos.FoodItemHomePageDto;
import com.app.dtos.AnnapurnaResponse;
import com.app.dtos.ListOfFoodItemIds;
import com.app.dtos.OrdersDto;
import com.app.dtos.PlaceOrderDto;
import com.app.dtos.ResetPasswordDto;
import com.app.dtos.RestaurantHomePageDto;
import com.app.entities.*;
import com.app.services.CustomerService;
import com.app.services.EmailService;
import com.app.services.FoodItemService;
import com.app.services.OrdersService;
import com.app.services.RestaurantService;

import PasswordEncrypt_Decrypt.PasswordHashing;

@CrossOrigin(origins="*")
@RestController
@RequestMapping("/api/v1/")
public class CustomerController {
	
	@Autowired
	private CustomerService customerService;
	
	@Autowired
	private RestaurantService restaurantService;
	
	@Autowired
	private FoodItemService foodItemService;
	
	@Autowired
	private OrdersService ordersService;
	
	
	
	
	// Method to add customer to database
	@PostMapping("/customers/signup")
	public ResponseEntity<AnnapurnaResponse> signUp(@RequestBody CustomerSignUpDto customerSignUpDto) {
		String password = customerSignUpDto.getPassword();
		String hashedPassword = PasswordHashing.hashPassword(password);
		Customer cust = DaoToEntityConverter.customerSignUpDtoToCustomerEntity(customerSignUpDto);
		cust.setPassword(hashedPassword);
		customerService.saveCustomer(cust);
		
		String recipient=customerSignUpDto.getEmail();
		String subject="Welcome To Annapurna!!";
		String body = "Thank you for signing up with Annapurna. We look forward to serving you!";
		EmailService.sendEmail(recipient, subject, body);
		return AnnapurnaResponse.success("Customer added!");
	}
	
	@PostMapping("/customers/signin")
	public ResponseEntity<AnnapurnaResponse> signIn(@RequestBody Credentials cred) {
		String password = cred.getPassword();
		CustomerDto customerDto = customerService.findCustomerByEmail(cred);
		if(customerDto == null)
			return AnnapurnaResponse.error("Couldn't find Customer with that credentials");
		
		Customer customer=DaoToEntityConverter.customerSignIn(customerDto);
		System.out.println(customer.getPassword());
		String hashedPassword=customer.getPassword();
		if (PasswordHashing.checkPassword(password, hashedPassword)) {
		    return AnnapurnaResponse.success(customerDto);
		} else {
		    return AnnapurnaResponse.error("Invalid email or password");
		}
//		return HungerBuzzResponse.success(customerDto);
	}
	
	@GetMapping("/restaurants")
	public ResponseEntity<AnnapurnaResponse> findAllRestaurants() {
		List<RestaurantHomePageDto> restDtoList = restaurantService.findAllRestaurantHomePageDtos();
		return AnnapurnaResponse.success(restDtoList);
	}
	
	@GetMapping("/fooditems/restaurant/{id}")
	public ResponseEntity<AnnapurnaResponse> findFoodItemsByRestaurantId(@PathVariable("id") int restaurantId) {
		List<FoodItemHomePageDto> foodItemsDtos = foodItemService.findAllFoodItemsFromRestaurant(restaurantId);
		if (foodItemsDtos == null) {
			return AnnapurnaResponse.error("Could not find food items with that restaurant id");
		}
		return AnnapurnaResponse.success(foodItemsDtos);
	}
	
	@PostMapping("/fooditems/cart")
	public ResponseEntity<AnnapurnaResponse> getCartItems(@RequestBody ListOfFoodItemIds listOfFoodItemIds) {
		List<FoodItemHomePageDto> foodItemsDtos = foodItemService.findAllFoodItemsByIds(listOfFoodItemIds.getItemIds());
		return AnnapurnaResponse.success(foodItemsDtos);
	}
	
	@PutMapping("/customers/{id}/address")
	public ResponseEntity<AnnapurnaResponse> updateAddress(@PathVariable("id") int id, @RequestBody CustomerDto customerDto) {
		boolean status = customerService.updateAddressByCustomerId(id, customerDto.getAddressText(), customerDto.getPinCode());
		if(!status)
			return AnnapurnaResponse.error("Couldn't update address");
		return AnnapurnaResponse.success("Ok");
	}
	
	@PostMapping("/orders/place")
	public ResponseEntity<AnnapurnaResponse> placeOrder(@RequestBody PlaceOrderDto placeOrderDto) {
		System.out.println(placeOrderDto);
		OrdersDto ordersDto = ordersService.addOrder(placeOrderDto);
		if(ordersDto == null)
			return AnnapurnaResponse.error("Couldn't add order");
		return AnnapurnaResponse.success(ordersDto);
	}
	
	@GetMapping("/orders/customer/{id}")
	public ResponseEntity<AnnapurnaResponse> getAllOrdersbyCustomerId(@PathVariable("id") int customerId) {
		List<OrdersDto> ordersDtoList = ordersService.findAllOrdersByCustomerId(customerId);
		if(ordersDtoList == null || ordersDtoList.isEmpty())
			return AnnapurnaResponse.error("List empty!");
		return AnnapurnaResponse.success(ordersDtoList);
	}
	
	
	@PostMapping("/customers/forgot-password")
	public ResponseEntity<AnnapurnaResponse> forgotPassword(@RequestBody String email) {
	// Check if the email exists in the database
	       CustomerDto customerDto = customerService.findCustomerByEmail(email);
	       if (customerDto == null) {
	            return AnnapurnaResponse.error("Could not find customer with that email address.");
	       }

	// Generate a password reset token and save it to the database
	      String token = UUID.randomUUID().toString();
          customerService.savePasswordResetToken(customerDto.getId(), token);

	// Send an email to the customer with a link to reset their password
	      String recipient = customerDto.getEmail();
	      String subject = "Reset your password for HungerBuzz";
	      String body = "Please click the following link to reset your password: http://localhost:3000/reset-password/" + token;
	      EmailService.sendEmail(recipient, subject, body);

	return AnnapurnaResponse.success("Password reset token generated and sent to customer.");
}
	

}
