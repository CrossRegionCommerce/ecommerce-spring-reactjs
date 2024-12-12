package com.gmail.merikbest2015.ecommerce.dto.product;

import com.gmail.merikbest2015.ecommerce.enums.SearchProduct;
import lombok.Data;

@Data
public class SearchTypeRequest {
    private SearchProduct searchType;
    private String text;
}
