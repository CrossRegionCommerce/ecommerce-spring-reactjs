import React from "react";
import { Button, InputNumber } from "antd";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../utils/test/testHelper";
import { LoadingStatus } from "../../../types/types";
import Spinner from "../../../components/Spinner/Spinner";
import { mockCartProductsResponse } from "../../../utils/test/__mocks__/products-mock";
import CartItem from "../CartItem/CartItem";
import RemoveButton from "../CartItem/RemoveButton";
import Cart from "../Cart";

window.scrollTo = jest.fn();

describe("Cart", () => {
    const mockRootStore = createMockRootState(LoadingStatus.SUCCESS);
    const mockStore = {...mockRootStore, cart: {...mockRootStore.cart, products: mockCartProductsResponse}};
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render loading spinner", () => {
        const wrapper = mountWithStore(<Cart />);
        expect(wrapper.find(Spinner).exists()).toBe(true);
    });

    it("should render empty cart", () => {
        const wrapper = mountWithStore(<Cart />, mockRootStore);
        expect(wrapper.text().includes("Cart is empty")).toBe(true);
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<Cart />, mockStore);
        expect(wrapper.find(CartItem).length).toEqual(2);
    });

    it("should click delete product from Cart and clear local storage", () => {
        localStorage.setItem("products", "[[17,1]]");
        const wrapper = mountWithStore(<Cart />, mockStore);
        wrapper.find(CartItem).at(0).find(RemoveButton).find(Button).simulate("click");
        expect(mockDispatchFn).nthCalledWith(2, { payload: mockCartProductsResponse[0].id, type: "cart/removeProductById" });
    });

    it("should change Product Item Count", () => {
        localStorage.setItem("products", "[[17,1],[27,1]]");
        const wrapper = mountWithStore(<Cart />, mockStore);
        wrapper.find(CartItem).at(0).find(InputNumber).find("input").at(0).simulate("change", { target: { value: 11 } });
        expect(mockDispatchFn).nthCalledWith(2, { payload: mockCartProductsResponse, type: "cart/calculateCartPrice" });
    });
    
    it("should unmount Cart", () => {
        const wrapper = mountWithStore(<Cart />);
        wrapper.unmount();
        expect(mockDispatchFn).nthCalledWith(2, { type: "cart/resetCartState" });
    });
});
