package com.gmail.merikbest2015.ecommerce.service;

import com.gmail.merikbest2015.ecommerce.domain.Review;

import java.util.List;

public interface ReviewService {

    List<Review> getReviewsByProductId(Long productId);

    Review addReviewToProduct(Review review, Long productId);
}
