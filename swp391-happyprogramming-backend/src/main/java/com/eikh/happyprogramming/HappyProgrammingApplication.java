package com.eikh.happyprogramming;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class HappyProgrammingApplication {

	public static void main(String[] args) {
		SpringApplication.run(HappyProgrammingApplication.class, args);
	}

}
