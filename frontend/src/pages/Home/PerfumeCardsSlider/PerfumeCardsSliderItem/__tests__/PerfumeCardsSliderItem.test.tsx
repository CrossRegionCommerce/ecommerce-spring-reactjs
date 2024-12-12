import React from "react";

import { mountWithStore } from "../../../../../utils/test/testHelper";
import ProductCardsSliderItem from "../ProductCardsSliderItem";
import { mockProductsResponse } from "../../../../../utils/test/__mocks__/products-mock";
import ProductCard from "../../../../../components/ProductCard/ProductCard";

describe("ProductCardsSliderItem", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<ProductCardsSliderItem products={mockProductsResponse} />);
        expect(wrapper.find(ProductCard).length).toEqual(3);
    });
});
