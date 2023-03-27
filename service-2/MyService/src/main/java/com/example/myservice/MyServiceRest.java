package com.example.myservice;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyServiceRest {

    @Value("${backEndURL}")
    String backEndURL;

    @GetMapping("/")
    public String sayHello(){
        return "Hello! the back-end URL is" + backEndURL;
    }

}
