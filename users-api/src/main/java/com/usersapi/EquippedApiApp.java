package com.usersapi;

import com.usersapi.Model.UserRole;
import com.usersapi.Service.UserRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@SpringBootApplication
@EnableEurekaClient
@RestController
public class EquippedApiApp {

	@Autowired
	UserRoleService userRoleService;

	@RequestMapping("/")
	public String home(){
		return "some users";
	}

	public static void main(String[] args) {
		SpringApplication.run(EquippedApiApp.class, args);
	}

	@Bean
	CommandLineRunner runner(){
		return args -> {
			try {
				UserRole admin = new UserRole();
				admin.setRoleType("ADMIN");
				UserRole basic = new UserRole();
				basic.setRoleType("BASIC");
				userRoleService.createRole(basic);
				userRoleService.createRole(admin);
			} catch(Exception e) {
				System.out.println("Error! " + e.getMessage());
			}
		};
	}
}
