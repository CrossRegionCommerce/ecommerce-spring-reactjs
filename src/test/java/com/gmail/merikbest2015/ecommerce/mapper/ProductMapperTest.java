package com.gmail.merikbest2015.ecommerce.mapper;

import com.gmail.merikbest2015.ecommerce.domain.Product;
import com.gmail.merikbest2015.ecommerce.dto.product.ProductRequest;
import com.gmail.merikbest2015.ecommerce.dto.product.FullProductResponse;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static com.gmail.merikbest2015.ecommerce.util.TestConstants.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@RunWith(SpringRunner.class)
public class ProductMapperTest {

    @Autowired
    private ModelMapper modelMapper;

    @Test
    public void convertToEntity() {
        ProductRequest productRequest = new ProductRequest();
        productRequest.setProductr(PERFUMER_CHANEL);
        productRequest.setProductTitle(PERFUME_TITLE);
        productRequest.setYear(YEAR);
        productRequest.setCountry(COUNTRY);
        productRequest.setProductGender(PERFUME_GENDER);
        productRequest.setFragranceTopNotes(FRAGRANCE_TOP_NOTES);
        productRequest.setFragranceMiddleNotes(FRAGRANCE_MIDDLE_NOTES);
        productRequest.setFragranceBaseNotes(FRAGRANCE_BASE_NOTES);
        productRequest.setPrice(PRICE);
        productRequest.setVolume(VOLUME);
        productRequest.setType(TYPE);

        Product product = modelMapper.map(productRequest, Product.class);
        assertEquals(productRequest.getProductr(), product.getProductr());
        assertEquals(productRequest.getProductTitle(), product.getProductTitle());
        assertEquals(productRequest.getYear(), product.getYear());
        assertEquals(productRequest.getCountry(), product.getCountry());
        assertEquals(productRequest.getProductGender(), product.getProductGender());
        assertEquals(productRequest.getFragranceTopNotes(), product.getFragranceTopNotes());
        assertEquals(productRequest.getFragranceMiddleNotes(), product.getFragranceMiddleNotes());
        assertEquals(productRequest.getFragranceBaseNotes(), product.getFragranceBaseNotes());
        assertEquals(productRequest.getPrice(), product.getPrice());
        assertEquals(productRequest.getVolume(), product.getVolume());
        assertEquals(productRequest.getType(), product.getType());
    }

    @Test
    public void convertToResponseDto() {
        Product product = new Product();
        product.setId(1L);
        product.setProductr(PERFUMER_CHANEL);
        product.setProductTitle(PERFUME_TITLE);
        product.setYear(YEAR);
        product.setCountry(COUNTRY);
        product.setProductGender(PERFUME_GENDER);
        product.setFragranceTopNotes(FRAGRANCE_TOP_NOTES);
        product.setFragranceMiddleNotes(FRAGRANCE_MIDDLE_NOTES);
        product.setFragranceBaseNotes(FRAGRANCE_BASE_NOTES);
        product.setPrice(PRICE);
        product.setVolume(VOLUME);
        product.setType(TYPE);

        FullProductResponse fullProductResponse = modelMapper.map(product, FullProductResponse.class);
        assertEquals(product.getId(), fullProductResponse.getId());
        assertEquals(product.getProductr(), fullProductResponse.getProductr());
        assertEquals(product.getProductTitle(), fullProductResponse.getProductTitle());
        assertEquals(product.getYear(), fullProductResponse.getYear());
        assertEquals(product.getCountry(), fullProductResponse.getCountry());
        assertEquals(product.getProductGender(), fullProductResponse.getProductGender());
        assertEquals(product.getFragranceTopNotes(), fullProductResponse.getFragranceTopNotes());
        assertEquals(product.getFragranceMiddleNotes(), fullProductResponse.getFragranceMiddleNotes());
        assertEquals(product.getFragranceBaseNotes(), fullProductResponse.getFragranceBaseNotes());
        assertEquals(product.getPrice(), fullProductResponse.getPrice());
        assertEquals(product.getVolume(), fullProductResponse.getVolume());
        assertEquals(product.getType(), fullProductResponse.getType());
    }
}
