package com.board.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://anicare-front.s3-website.ap-northeast-2.amazonaws.com", "http://localhost:3000", "http://anicareplus.com")
                .allowedMethods("OPTIONS","GET","POST","PUT","DELETE");
    }

}
