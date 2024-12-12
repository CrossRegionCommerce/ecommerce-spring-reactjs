package com.gmail.merikbest2015.ecommerce.service.Impl;

import com.gmail.merikbest2015.ecommerce.domain.Product;
import com.gmail.merikbest2015.ecommerce.domain.Review;
import com.gmail.merikbest2015.ecommerce.repository.ProductRepository;
import com.gmail.merikbest2015.ecommerce.repository.ReviewRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

@SpringBootTest
@RunWith(SpringRunner.class)
public class ReviewServiceImplTest {

    @Autowired
    private ReviewServiceImpl reviewService;

    @MockBean
    private ProductRepository productRepository;

    @MockBean
    private ReviewRepository reviewRepository;

    @Test
    public void addReviewToProduct() {
        List<Review> reviewList = new ArrayList<>();
        Review review = new Review();
        review.setRating(5);
        reviewList.add(review);
        Product product = new Product();
        product.setId(123L);
        product.setReviews(reviewList);

        when(productRepository.findById(123L)).thenReturn(Optional.of(product));
        when(reviewRepository.save(review)).thenReturn(review);
        reviewService.addReviewToProduct(review, 123L);
        assertEquals(123L, product.getId());
        assertNotNull(product.getReviews());
        verify(productRepository, times(1)).findById(123L);
        verify(reviewRepository, times(1)).save(review);
    }
}
