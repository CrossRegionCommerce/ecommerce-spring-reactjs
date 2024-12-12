import React from "react";

import { mockCartProductsResponse } from "../../../../utils/test/__mocks__/products-mock";
import { mountWithStore } from "../../../../utils/test/testHelper";
import CartItemInfo from "../CartItemInfo";

describe("CartItemInfo", () => {
    it("should render correctly", () => {
        const mockProduct = mockCartProductsResponse[0];
        const wrapper = mountWithStore(<CartItemInfo product={mockProduct} />);
        expect(wrapper.find("img").prop("src")).toBe(mockProduct.filename);
        expect(wrapper.text().includes(mockProduct.productr)).toBe(true);
        expect(wrapper.text().includes(mockProduct.productTitle)).toBe(true);
        expect(wrapper.text().includes(`${mockProduct.volume} ml.`)).toBe(true);
    });
});
