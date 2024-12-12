package com.gmail.merikbest2015.ecommerce.controller;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.gmail.merikbest2015.ecommerce.dto.GraphQLRequest;
import com.gmail.merikbest2015.ecommerce.dto.HeaderResponse;
import com.gmail.merikbest2015.ecommerce.dto.product.*;
import com.gmail.merikbest2015.ecommerce.mapper.ProductMapper;
import com.gmail.merikbest2015.ecommerce.service.graphql.GraphQLProvider;

import graphql.ExecutionResult;
import lombok.RequiredArgsConstructor;

import static com.gmail.merikbest2015.ecommerce.constants.PathConstants.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(API_V1_PERFUMES)
public class ProductController {

    private final ProductMapper productMapper;
    private final GraphQLProvider graphQLProvider;

    @GetMapping
    public ResponseEntity<List<ProductResponse>> getAllProducts(@PageableDefault(size = 15) Pageable pageable) {
        HeaderResponse<ProductResponse> response = productMapper.getAllProducts(pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @GetMapping(PERFUME_ID)
    public ResponseEntity<FullProductResponse> getProductById(@PathVariable Long productId) {
        return ResponseEntity.ok(productMapper.getProductById(productId));
    }

    @PostMapping(IDS)
    public ResponseEntity<List<ProductResponse>> getProductsByIds(@RequestBody List<Long> productsIds) {
        return ResponseEntity.ok(productMapper.getProductsByIds(productsIds));
    }

    @PostMapping(SEARCH)
    public ResponseEntity<List<ProductResponse>> findProductsByFilterParams(@RequestBody ProductSearchRequest filter,
                                                                            @PageableDefault(size = 15) Pageable pageable) {
        HeaderResponse<ProductResponse> response = productMapper.findProductsByFilterParams(filter, pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @PostMapping(SEARCH_GENDER)
    public ResponseEntity<List<ProductResponse>> findByProductGender(@RequestBody ProductSearchRequest filter) {
        return ResponseEntity.ok(productMapper.findByProductGender(filter.getProductGender()));
    }

    @PostMapping(SEARCH_PERFUMER)
    public ResponseEntity<List<ProductResponse>> findByProductr(@RequestBody ProductSearchRequest filter) {
        return ResponseEntity.ok(productMapper.findByProductr(filter.getProductr()));
    }

    @PostMapping(SEARCH_TEXT)
    public ResponseEntity<List<ProductResponse>> findByInputText(@RequestBody SearchTypeRequest searchType,
                                                                 @PageableDefault(size = 15) Pageable pageable) {
        HeaderResponse<ProductResponse> response = productMapper.findByInputText(searchType.getSearchType(), searchType.getText(), pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @PostMapping(GRAPHQL_IDS)
    public ResponseEntity<ExecutionResult> getProductsByIdsQuery(@RequestBody GraphQLRequest request) {
        return ResponseEntity.ok(graphQLProvider.getGraphQL().execute(request.getQuery()));
    }

    @PostMapping(GRAPHQL_PERFUMES)
    public ResponseEntity<ExecutionResult> getAllProductsByQuery(@RequestBody GraphQLRequest request) {
        return ResponseEntity.ok(graphQLProvider.getGraphQL().execute(request.getQuery()));
    }

    @PostMapping(GRAPHQL_PERFUME)
    public ResponseEntity<ExecutionResult> getProductByQuery(@RequestBody GraphQLRequest request) {
        return ResponseEntity.ok(graphQLProvider.getGraphQL().execute(request.getQuery()));
    }
}
