package com.gmail.merikbest2015.ecommerce.service.Impl;

import com.gmail.merikbest2015.ecommerce.domain.Product;
import com.gmail.merikbest2015.ecommerce.dto.product.ProductSearchRequest;
import com.gmail.merikbest2015.ecommerce.repository.ProductRepository;
import com.gmail.merikbest2015.ecommerce.repository.projection.ProductProjection;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.projection.SpelAwareProxyProjectionFactory;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static com.gmail.merikbest2015.ecommerce.util.TestConstants.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
@RunWith(SpringRunner.class)
public class ProductServiceImplTest {

    @Autowired
    private ProductServiceImpl productService;

    @Autowired
    private SpelAwareProxyProjectionFactory factory;

    @MockBean
    private ProductRepository productRepository;

    @Test
    public void findProductById() {
        Product product = new Product();
        product.setId(123L);

        when(productRepository.findById(123L)).thenReturn(java.util.Optional.of(product));
        productService.getProductById(123L);
        assertEquals(123L, product.getId());
        assertNotEquals(1L, product.getId());
        verify(productRepository, times(1)).findById(123L);
    }

    @Test
    public void findAllProducts() {
        Pageable pageable = PageRequest.of(0, 20);
        List<ProductProjection> productProjectionList = new ArrayList<>();
        productProjectionList.add(factory.createProjection(ProductProjection.class));
        productProjectionList.add(factory.createProjection(ProductProjection.class));
        Page<ProductProjection> productList = new PageImpl<>(productProjectionList);

        when(productRepository.findAllByOrderByIdAsc(pageable)).thenReturn(productList);
        productService.getAllProducts(pageable);
        assertEquals(2, productProjectionList.size());
        verify(productRepository, times(1)).findAllByOrderByIdAsc(pageable);
    }

    @Test
    public void filter() {
        Pageable pageable = PageRequest.of(0, 20);
        
        ProductProjection productChanel = factory.createProjection(ProductProjection.class);         
        productChanel.setProductr(PERFUMER_CHANEL);
        productChanel.setProductGender(PERFUME_GENDER);
        productChanel.setPrice(101);
        ProductProjection productCreed = factory.createProjection(ProductProjection.class);
        productCreed.setProductr(PERFUMER_CREED);
        productCreed.setProductGender(PERFUME_GENDER);
        productCreed.setPrice(102);
        Page<ProductProjection> productList = new PageImpl<>(Arrays.asList(productChanel, productCreed));

        List<String> productrs = new ArrayList<>();
        productrs.add(PERFUMER_CHANEL);
        productrs.add(PERFUMER_CREED);

        List<String> genders = new ArrayList<>();
        genders.add(PERFUME_GENDER);

        when(productRepository.findProductsByFilterParams(productrs, genders, 1, 1000, false, pageable)).thenReturn(productList);
        ProductSearchRequest filter = new ProductSearchRequest();
        filter.setProductrs(productrs);
        filter.setGenders(genders);
        filter.setPrices(Arrays.asList(1, 1000));
        filter.setSortByPrice(false);
        productService.findProductsByFilterParams(filter, pageable);
        assertEquals(2, productList.getTotalElements());
        assertEquals(productList.getContent().get(0).getProductr(), PERFUMER_CHANEL);
        verify(productRepository, times(1)).findProductsByFilterParams(productrs, genders, 1, 1000, false, pageable);
    }

    @Test
    public void findByProductrOrderByPriceDesc() {
        Product productChanel = new Product();
        productChanel.setProductr(PERFUMER_CHANEL);
        Product productCreed = new Product();
        productCreed.setProductr(PERFUMER_CREED);
        List<Product> productList = new ArrayList<>();
        productList.add(productChanel);
        productList.add(productCreed);

        when(productRepository.findByProductrOrderByPriceDesc(PERFUMER_CHANEL)).thenReturn(productList);
        productService.findByProductr(PERFUMER_CHANEL);
        assertEquals(productList.get(0).getProductr(), PERFUMER_CHANEL);
        assertNotEquals(productList.get(0).getProductr(), PERFUMER_CREED);
        verify(productRepository, times(1)).findByProductrOrderByPriceDesc(PERFUMER_CHANEL);
    }

    @Test
    public void findByProductGenderOrderByPriceDesc() {
        Product productChanel = new Product();
        productChanel.setProductGender(PERFUME_GENDER);
        List<Product> productList = new ArrayList<>();
        productList.add(productChanel);

        when(productRepository.findByProductGenderOrderByPriceDesc(PERFUME_GENDER)).thenReturn(productList);
        productService.findByProductGender(PERFUME_GENDER);
        assertEquals(productList.get(0).getProductGender(), PERFUME_GENDER);
        assertNotEquals(productList.get(0).getProductGender(), "male");
        verify(productRepository, times(1)).findByProductGenderOrderByPriceDesc(PERFUME_GENDER);
    }

    @Test
    public void saveProduct() {
        MultipartFile multipartFile = new MockMultipartFile(FILE_NAME, FILE_NAME, "multipart/form-data", FILE_PATH.getBytes());
        Product product = new Product();
        product.setId(1L);
        product.setProductr(PERFUMER_CHANEL);
        product.setFilename(multipartFile.getOriginalFilename());

        when(productRepository.save(product)).thenReturn(product);
        productService.saveProduct(product, multipartFile);
        verify(productRepository, times(1)).save(product);
    }
}
