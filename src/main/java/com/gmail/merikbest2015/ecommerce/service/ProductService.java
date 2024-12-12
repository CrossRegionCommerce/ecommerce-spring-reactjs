package com.gmail.merikbest2015.ecommerce.service;

import com.gmail.merikbest2015.ecommerce.domain.Product;
import com.gmail.merikbest2015.ecommerce.dto.product.ProductSearchRequest;
import com.gmail.merikbest2015.ecommerce.enums.SearchProduct;
import com.gmail.merikbest2015.ecommerce.repository.projection.ProductProjection;
import graphql.schema.DataFetcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService {

    Product getProductById(Long productId);

    Page<ProductProjection> getAllProducts(Pageable pageable);

    List<ProductProjection> getProductsByIds(List<Long> productsId);

    Page<ProductProjection> findProductsByFilterParams(ProductSearchRequest filter, Pageable pageable);

    List<Product> findByProductr(String productr);

    List<Product> findByProductGender(String productGender);
    
    Page<ProductProjection> findByInputText(SearchProduct searchType, String text, Pageable pageable);

    Product saveProduct(Product product, MultipartFile file);

    String deleteProduct(Long productId);

    DataFetcher<Product> getProductByQuery();

    DataFetcher<List<ProductProjection>> getAllProductsByQuery();

    DataFetcher<List<Product>> getAllProductsByIdsQuery();
}
