package com.springai.b2b;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class B2BPlatformApplication {

    public static void main(String[] args) {
        SpringApplication.run(B2BPlatformApplication.class, args);
    }
}
