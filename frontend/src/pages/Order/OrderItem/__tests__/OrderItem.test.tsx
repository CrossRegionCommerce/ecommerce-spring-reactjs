import React from "react";

import { mountWithStore } from "../../../../utils/test/testHelper";
import { mockProductsResponse } from "../../../../utils/test/__mocks__/products-mock";
import OrderItem from "../OrderItem";

describe("OrderItem", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<OrderItem product={mockProductsResponse[0]} quantity={11} />);
        expect(wrapper.text().includes(mockProductsResponse[0].productr)).toBe(true);
        expect(wrapper.text().includes(mockProductsResponse[0].productTitle)).toBe(true);
        expect(wrapper.text().includes(`Price: $ ${mockProductsResponse[0].price}`)).toBe(true);
        expect(wrapper.text().includes("Quantity: 11")).toBe(true);
    });
});
