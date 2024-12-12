package com.gmail.merikbest2015.ecommerce.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gmail.merikbest2015.ecommerce.dto.GraphQLRequest;
import com.gmail.merikbest2015.ecommerce.dto.product.ProductSearchRequest;
import com.gmail.merikbest2015.ecommerce.dto.product.SearchTypeRequest;
import com.gmail.merikbest2015.ecommerce.enums.SearchProduct;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static com.gmail.merikbest2015.ecommerce.constants.ErrorMessage.PERFUME_NOT_FOUND;
import static com.gmail.merikbest2015.ecommerce.constants.PathConstants.*;
import static com.gmail.merikbest2015.ecommerce.util.TestConstants.*;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
@TestPropertySource("/application-test.properties")
@Sql(value = {"/sql/create-products-before.sql"}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(value = {"/sql/create-products-after.sql"}, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
public class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper mapper;

    private ProductSearchRequest filter;
    private GraphQLRequest graphQLRequest;

    @Before
    public void init() {
        List<Integer> prices = new ArrayList<>();
        List<String> productrs = new ArrayList<>();
        List<String> genders = new ArrayList<>();
        productrs.add(PERFUMER_CHANEL);
        genders.add(PERFUME_GENDER);
        prices.add(1);
        prices.add(1000);

        filter = new ProductSearchRequest();
        filter.setProductrs(productrs);
        filter.setGenders(genders);
        filter.setPrices(prices);
        filter.setSortByPrice(true);

        graphQLRequest = new GraphQLRequest();
    }

    @Test
    public void getAllProducts() throws Exception {
        mockMvc.perform(get(API_V1_PERFUMES)
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*].id").isNotEmpty())
                .andExpect(jsonPath("$[*].productTitle").isNotEmpty())
                .andExpect(jsonPath("$[*].productr").isNotEmpty())
                .andExpect(jsonPath("$[*].filename").isNotEmpty())
                .andExpect(jsonPath("$[*].price").isNotEmpty());
    }

    @Test
    public void getProductById() throws Exception {
        mockMvc.perform(get(API_V1_PERFUMES + PERFUME_ID, 1)
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", equalTo(1)))
                .andExpect(jsonPath("$.productTitle", equalTo("Boss Bottled Night")))
                .andExpect(jsonPath("$.productr", equalTo("Hugo Boss")))
                .andExpect(jsonPath("$.country", equalTo("Germany")));
    }

    @Test
    public void getProductById_ShouldNotFound() throws Exception {
        mockMvc.perform(get(API_V1_PERFUMES + PERFUME_ID, 1111)
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", equalTo(PERFUME_NOT_FOUND)));
    }

    @Test
    public void getProductsByIds() throws Exception {
        mockMvc.perform(post(API_V1_PERFUMES + IDS)
                        .content(mapper.writeValueAsString(Arrays.asList(3L, 4L, 5L)))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*].id").isNotEmpty())
                .andExpect(jsonPath("$[*].productTitle").isNotEmpty())
                .andExpect(jsonPath("$[*].productr").isNotEmpty())
                .andExpect(jsonPath("$[*].filename").isNotEmpty())
                .andExpect(jsonPath("$[*].price").isNotEmpty());
    }

    @Test
    public void findProductsByFilterParams() throws Exception {
        mockMvc.perform(post(API_V1_PERFUMES + SEARCH)
                        .content(mapper.writeValueAsString(filter))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*].id").isNotEmpty())
                .andExpect(jsonPath("$[*].productTitle").isNotEmpty())
                .andExpect(jsonPath("$[*].productr").isNotEmpty())
                .andExpect(jsonPath("$[*].filename").isNotEmpty())
                .andExpect(jsonPath("$[*].price").isNotEmpty());
    }

    @Test
    public void findProductsByFilterParamsProductrs() throws Exception {
        ProductSearchRequest filter = new ProductSearchRequest();
        List<String> productrs = new ArrayList<>();
        productrs.add(PERFUMER_CHANEL);
        List<Integer> prices = new ArrayList<>();
        prices.add(150);
        prices.add(250);

        filter.setProductrs(productrs);
        filter.setGenders(new ArrayList<>());
        filter.setPrices(prices);
        filter.setSortByPrice(true);

        mockMvc.perform(post(API_V1_PERFUMES + SEARCH)
                        .content(mapper.writeValueAsString(filter))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*].id").isNotEmpty())
                .andExpect(jsonPath("$[*].productTitle").isNotEmpty())
                .andExpect(jsonPath("$[*].productr").isNotEmpty())
                .andExpect(jsonPath("$[*].filename").isNotEmpty())
                .andExpect(jsonPath("$[*].price").isNotEmpty());
    }

    @Test
    public void findByProductGender() throws Exception {
        ProductSearchRequest filter = new ProductSearchRequest();
        filter.setProductGender(PERFUME_GENDER);

        mockMvc.perform(post(API_V1_PERFUMES + SEARCH_GENDER)
                        .content(mapper.writeValueAsString(filter))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*].id").isNotEmpty())
                .andExpect(jsonPath("$[*].productTitle").isNotEmpty())
                .andExpect(jsonPath("$[*].productr").isNotEmpty())
                .andExpect(jsonPath("$[*].filename").isNotEmpty())
                .andExpect(jsonPath("$[*].price").isNotEmpty());
    }

    @Test
    public void findByProductr() throws Exception {
        ProductSearchRequest filter = new ProductSearchRequest();
        filter.setProductr(PERFUMER_CHANEL);

        mockMvc.perform(post(API_V1_PERFUMES + SEARCH_PERFUMER)
                        .content(mapper.writeValueAsString(filter))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*].id").isNotEmpty())
                .andExpect(jsonPath("$[*].productTitle").isNotEmpty())
                .andExpect(jsonPath("$[*].productr").isNotEmpty())
                .andExpect(jsonPath("$[*].filename").isNotEmpty())
                .andExpect(jsonPath("$[*].price").isNotEmpty());
    }

    @Test
    public void findByInputText() throws Exception {
        SearchTypeRequest request = new SearchTypeRequest();
        request.setSearchType(SearchProduct.COUNTRY);
        request.setText("France");
        
        mockMvc.perform(post(API_V1_PERFUMES + SEARCH_TEXT)
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(15)))
                .andExpect(jsonPath("$[*].id").isNotEmpty())
                .andExpect(jsonPath("$[*].productTitle").isNotEmpty())
                .andExpect(jsonPath("$[*].productr").isNotEmpty())
                .andExpect(jsonPath("$[*].filename").isNotEmpty())
                .andExpect(jsonPath("$[*].price").isNotEmpty());

        request.setSearchType(SearchProduct.BRAND);
        request.setText("Creed");
        
        mockMvc.perform(post(API_V1_PERFUMES + SEARCH_TEXT)
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(7)))
                .andExpect(jsonPath("$[*].id").isNotEmpty())
                .andExpect(jsonPath("$[*].productTitle").isNotEmpty())
                .andExpect(jsonPath("$[*].productr").isNotEmpty())
                .andExpect(jsonPath("$[*].filename").isNotEmpty())
                .andExpect(jsonPath("$[*].price").isNotEmpty());

        request.setSearchType(SearchProduct.PERFUME_TITLE);
        request.setText("Chanel N5");

        mockMvc.perform(post(API_V1_PERFUMES + SEARCH_TEXT)
                        .content(mapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(1)))
                .andExpect(jsonPath("$[*].id").isNotEmpty())
                .andExpect(jsonPath("$[*].productTitle").isNotEmpty())
                .andExpect(jsonPath("$[*].productr").isNotEmpty())
                .andExpect(jsonPath("$[*].filename").isNotEmpty())
                .andExpect(jsonPath("$[*].price").isNotEmpty());
    }

    @Test
    public void getProductsByIdsQuery() throws Exception {
        graphQLRequest.setQuery(GRAPHQL_QUERY_PERFUMES_BY_IDS);

        mockMvc.perform(post(API_V1_PERFUMES + GRAPHQL_IDS)
                        .content(mapper.writeValueAsString(graphQLRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.productsIds[*].id").isNotEmpty())
                .andExpect(jsonPath("$.data.productsIds[*].productTitle").isNotEmpty())
                .andExpect(jsonPath("$.data.productsIds[*].productr").isNotEmpty())
                .andExpect(jsonPath("$.data.productsIds[*].price").isNotEmpty());
    }

    @Test
    public void getAllProductsByQuery() throws Exception {
        graphQLRequest.setQuery(GRAPHQL_QUERY_PERFUMES);

        mockMvc.perform(post(API_V1_PERFUMES + GRAPHQL_PERFUMES)
                        .content(mapper.writeValueAsString(graphQLRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.products[*].id").isNotEmpty())
                .andExpect(jsonPath("$.data.products[*].productTitle").isNotEmpty())
                .andExpect(jsonPath("$.data.products[*].productr").isNotEmpty())
                .andExpect(jsonPath("$.data.products[*].price").isNotEmpty())
                .andExpect(jsonPath("$.data.products[*].filename").isNotEmpty());
    }

    @Test
    public void getProductByQuery() throws Exception {
        graphQLRequest.setQuery(GRAPHQL_QUERY_PERFUME);

        mockMvc.perform(post(API_V1_PERFUMES + GRAPHQL_PERFUME)
                        .content(mapper.writeValueAsString(graphQLRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.product.id", equalTo(1)))
                .andExpect(jsonPath("$.data.product.productTitle", equalTo("Boss Bottled Night")))
                .andExpect(jsonPath("$.data.product.productr", equalTo("Hugo Boss")))
                .andExpect(jsonPath("$.data.product.price", equalTo(35)));
    }
}
