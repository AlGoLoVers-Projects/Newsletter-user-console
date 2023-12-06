package com.algolovers.newsletterconsole;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
public class NewsLetterConsoleApplication {

	public static void main(String[] args) {
		SpringApplication.run(NewsLetterConsoleApplication.class, args);
	}

}
