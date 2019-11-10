package com.example.equippedbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@SpringBootApplication
@EnableEurekaClient
@RestController
public class EquippedApiApp {

	public static void main(String[] args) {
		SpringApplication.run(EquippedApiApp.class, args);
	}

	@GetMapping("/")
	public String home() {
		return "Home page for equipped Api";
	}
}
