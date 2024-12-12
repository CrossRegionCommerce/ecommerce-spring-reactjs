import React from "react";

import { mountWithStore } from "../../../../utils/test/testHelper";
import { mockFullProductResponse } from "../../../../utils/test/__mocks__/products-mock";
import Description from "../Description/Description";
import ProductInfo from "../ProductInfo";

describe("ProductInfo", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<ProductInfo product={mockFullProductResponse} reviewsLength={11} addToCart={jest.fn()} />);
        expect(wrapper.text().includes(mockFullProductResponse.productTitle)).toBe(true);
        expect(wrapper.text().includes(mockFullProductResponse.productr)).toBe(true);
        expect(wrapper.text().includes(mockFullProductResponse.type)).toBe(true);
        expect(wrapper.text().includes("11 reviews")).toBe(true);
        expect(wrapper.text().includes("In Stock")).toBe(true);
        expect(wrapper.text().includes(`$${mockFullProductResponse.price}.00`)).toBe(true);
        expect(wrapper.text().includes("Add to cart")).toBe(true);
        expect(wrapper.find(Description).at(7).text().includes(mockFullProductResponse.productGender)).toBe(true);
        expect(wrapper.find(Description).at(8).text().includes(mockFullProductResponse.volume)).toBe(true);
        expect(wrapper.find(Description).at(9).text().includes(mockFullProductResponse.year.toString())).toBe(true);
        expect(wrapper.find(Description).at(10).text().includes(mockFullProductResponse.country)).toBe(true);
        expect(wrapper.find(Description).at(11).text().includes(mockFullProductResponse.fragranceTopNotes)).toBe(true);
        expect(wrapper.find(Description).at(12).text().includes(mockFullProductResponse.fragranceMiddleNotes)).toBe(true);
        expect(wrapper.find(Description).at(13).text().includes(mockFullProductResponse.fragranceBaseNotes)).toBe(true);
    });
});
