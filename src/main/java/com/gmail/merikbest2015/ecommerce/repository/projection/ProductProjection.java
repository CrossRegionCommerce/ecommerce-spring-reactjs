package com.gmail.merikbest2015.ecommerce.repository.projection;

import org.springframework.beans.factory.annotation.Value;

public interface ProductProjection {
    Long getId();
    String getProductTitle();
    String getProductr();
    Integer getPrice();
    String getFilename();
    Double getProductRating();
    
    @Value("#{target.reviews.size()}")
    Integer getReviewsCount();

    void setProductr(String productr);
    void setProductGender(String productGender);
    void setPrice(Integer price);
}
