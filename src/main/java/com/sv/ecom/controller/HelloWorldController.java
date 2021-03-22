package com.sv.ecom.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {
	//GET, /hello , work-hello world
	@GetMapping(path = "/hello")
	public String helloworld() {
		return "Hello World";
	}
}
