import React from "react";
import { InputNumber } from "antd";

import { mountWithStore } from "../../../../utils/test/testHelper";
import { mockCartProductsResponse } from "../../../../utils/test/__mocks__/products-mock";
import CartItem from "../CartItem";

describe("CartItem", () => {
    const mockProduct = mockCartProductsResponse[0];
    const mockProductCount = 11;

    it("should render correctly", () => {
        const wrapper = mountWithStore(
            <CartItem
                product={mockProduct}
                productInCart={mockProductCount}
                onChangeProductItemCount={jest.fn()}
                deleteFromCart={jest.fn()}
            />
        );
        expect(wrapper.find(InputNumber).at(0).prop("value")).toBe(mockProductCount);
        expect(wrapper.text().includes(`$${mockProduct.price * mockProductCount}`)).toBe(true);
    });

    it("should handle Products Count", () => {
        const mockOnChangeProductItemCount = jest.fn()
        const wrapper = mountWithStore(
            <CartItem
                product={mockProduct}
                productInCart={mockProductCount}
                onChangeProductItemCount={mockOnChangeProductItemCount}
                deleteFromCart={jest.fn()}
            />
        );
        expect(wrapper.find(InputNumber).at(0).prop("value")).toBe(11);
        wrapper.find(InputNumber).find("input").at(0).simulate("change", { target: { value: 12 } });
        expect(wrapper.find(InputNumber).at(0).prop("value")).toBe(12);
        expect(mockOnChangeProductItemCount).toHaveBeenCalled();
        expect(mockOnChangeProductItemCount).toHaveBeenCalledWith(17, 12);
    });
});
