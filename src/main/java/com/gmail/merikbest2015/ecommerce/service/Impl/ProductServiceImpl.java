package com.gmail.merikbest2015.ecommerce.service.Impl;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.gmail.merikbest2015.ecommerce.domain.Product;
import com.gmail.merikbest2015.ecommerce.dto.product.ProductSearchRequest;
import com.gmail.merikbest2015.ecommerce.enums.SearchProduct;
import com.gmail.merikbest2015.ecommerce.exception.ApiRequestException;
import com.gmail.merikbest2015.ecommerce.repository.ProductRepository;
import com.gmail.merikbest2015.ecommerce.repository.projection.ProductProjection;
import com.gmail.merikbest2015.ecommerce.service.ProductService;
import graphql.schema.DataFetcher;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import static com.gmail.merikbest2015.ecommerce.constants.ErrorMessage.PERFUME_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final AmazonS3 amazonS3client;

    @Value("${amazon.s3.bucket.name}")
    private String bucketName;

    @Override
    public Product getProductById(Long productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new ApiRequestException(PERFUME_NOT_FOUND, HttpStatus.NOT_FOUND));
    }

    @Override
    public Page<ProductProjection> getAllProducts(Pageable pageable) {
        return productRepository.findAllByOrderByIdAsc(pageable);
    }

    @Override
    public List<ProductProjection> getProductsByIds(List<Long> productsId) {
        return productRepository.getProductsByIds(productsId);
    }

    @Override
    public Page<ProductProjection> findProductsByFilterParams(ProductSearchRequest filter, Pageable pageable) {
        return productRepository.findProductsByFilterParams(
                filter.getProductrs(),
                filter.getGenders(),
                filter.getPrices().get(0),
                filter.getPrices().get(1),
                filter.getSortByPrice(),
                pageable);
    }

    @Override
    public List<Product> findByProductr(String productr) {
        return productRepository.findByProductrOrderByPriceDesc(productr);
    }

    @Override
    public List<Product> findByProductGender(String productGender) {
        return productRepository.findByProductGenderOrderByPriceDesc(productGender);
    }

    @Override
    public Page<ProductProjection> findByInputText(SearchProduct searchType, String text, Pageable pageable) {
        if (searchType.equals(SearchProduct.BRAND)) {
            return productRepository.findByProductr(text, pageable);
        } else if (searchType.equals(SearchProduct.PERFUME_TITLE)) {
            return productRepository.findByProductTitle(text, pageable);
        } else {
            return productRepository.findByManufacturerCountry(text, pageable);
        }
    }

    @Override
    @Transactional
    public Product saveProduct(Product product, MultipartFile multipartFile) {
        if (multipartFile == null) {
            product.setFilename(amazonS3client.getUrl(bucketName, "empty.jpg").toString());
        } else {
            File file = new File(multipartFile.getOriginalFilename());
            try (FileOutputStream fos = new FileOutputStream(file)) {
                fos.write(multipartFile.getBytes());
            } catch (IOException e) {
                e.printStackTrace();
            }
            String fileName = UUID.randomUUID().toString() + "." + multipartFile.getOriginalFilename();
            amazonS3client.putObject(new PutObjectRequest(bucketName, fileName, file));
            product.setFilename(amazonS3client.getUrl(bucketName, fileName).toString());
            file.delete();
        }
        return productRepository.save(product);
    }

    @Override
    @Transactional
    public String deleteProduct(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ApiRequestException(PERFUME_NOT_FOUND, HttpStatus.NOT_FOUND));
        productRepository.delete(product);
        return "Product deleted successfully";
    }

    @Override
    public DataFetcher<Product> getProductByQuery() {
        return dataFetchingEnvironment -> {
            Long productId = Long.parseLong(dataFetchingEnvironment.getArgument("id"));
            return productRepository.findById(productId).get();
        };
    }

    @Override
    public DataFetcher<List<ProductProjection>> getAllProductsByQuery() {
        return dataFetchingEnvironment -> productRepository.findAllByOrderByIdAsc();
    }

    @Override
    public DataFetcher<List<Product>> getAllProductsByIdsQuery() {
        return dataFetchingEnvironment -> {
            List<String> objects = dataFetchingEnvironment.getArgument("ids");
            List<Long> productsId = objects.stream()
                    .map(Long::parseLong)
                    .collect(Collectors.toList());
            return productRepository.findByIdIn(productsId);
        };
    }
}
