package com.example.apigateway;

import com.netflix.ribbon.proxy.annotation.Http;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.context.annotation.Bean;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


import java.util.Arrays;
import java.util.Collections;
import java.util.stream.Collectors;

@SpringBootApplication
@EnableZuulProxy
@EnableEurekaClient
public class ZuulGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(ZuulGatewayApplication.class, args);
	}

//
//	@Bean
//	public CorsFilter corsFilter() {
//
//		final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//		final CorsConfiguration config = new CorsConfiguration();
//		config.setAllowCredentials(true);
//		config.setAllowedOrigins(Collections.singletonList("*"));
//		config.setAllowedHeaders(Collections.singletonList("*"));
//		config.setAllowedMethods(Arrays.stream(Http.HttpMethod.values()).map(Http.HttpMethod::name).collect(Collectors.toList()));
//		source.registerCorsConfiguration("/**", config);
//		return new CorsFilter(source);
//	}
//.allowedOrigins("")
//

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
						// UNCOMMENT FOR LOCAL USE
						.allowedOrigins("http://localhost:3000")
						// BELOW IS USED FOR DEPLOYMENT
//						.allowedOrigins()
						.allowedMethods("GET", "POST", "PUT", "DELETE");
			}
		};
	}
}
