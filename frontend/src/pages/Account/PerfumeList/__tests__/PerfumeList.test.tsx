import React from "react";
import { Button, Input, Pagination } from "antd";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../utils/test/testHelper";
import Spinner from "../../../../components/Spinner/Spinner";
import { LoadingStatus } from "../../../../types/types";
import { mockProductsResponse } from "../../../../utils/test/__mocks__/products-mock";
import ProductCard from "../../../../components/ProductCard/ProductCard";
import InputSearch from "../../../../components/InputSearch/InputSearch";
import DeleteModal from "../DeleteModal/DeleteModal";
import ProductList from "../ProductList";

describe("ProductList", () => {
    const mockRootStore = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render loading spinner", () => {
        const wrapper = mountWithStore(<ProductList />);
        expect(wrapper.find(Spinner).exists()).toBe(true);
    });

    it("should render correctly", () => {
        const mockStore = { ...mockRootStore, products: { ...mockRootStore.products, products: mockProductsResponse } };
        const wrapper = mountWithStore(<ProductList />, mockStore);
        expect(mockDispatchFn).nthCalledWith(1, expect.any(Function));
        expect(wrapper.find(ProductCard).length).toEqual(3);
    });

    it("should change pagination", () => {
        const mockState = { ...mockRootStore, products: { ...mockRootStore.products, totalElements: 100 } };
        const wrapper = mountWithStore(<ProductList />, mockState);
        wrapper.find(Pagination).at(0).find("li").at(2).simulate("click");
        expect(mockDispatchFn).nthCalledWith(2, expect.any(Function));
    });

    it("should change pagination with search value", () => {
        const mockState = { ...mockRootStore, products: { ...mockRootStore.products, totalElements: 100 } };
        const wrapper = mountWithStore(<ProductList />, mockState);
        wrapper.find(InputSearch).find(Input).find("input").at(0).simulate("change", { target: { value: "test" } });
        wrapper.find(Pagination).at(0).find("li").at(2).simulate("click");
        expect(mockDispatchFn).nthCalledWith(2, expect.any(Function));
    });

    it("should click open and close delete modal", () => {
        const mockStore = { ...mockRootStore, products: { ...mockRootStore.products, products: mockProductsResponse } };
        const wrapper = mountWithStore(<ProductList />, mockStore);
        expect(wrapper.find(DeleteModal).prop("visible")).toBe(false);
        wrapper.find(ProductCard).find(Button).at(1).simulate("click");
        expect(wrapper.find(DeleteModal).prop("visible")).toBe(true);
        wrapper.find(DeleteModal).find(Button).at(0).simulate("click");
        expect(wrapper.find(DeleteModal).prop("visible")).toBe(false);
    });

    it("should click delete product", () => {
        const mockStore = { ...mockRootStore, products: { ...mockRootStore.products, products: mockProductsResponse } };
        const wrapper = mountWithStore(<ProductList />, mockStore);
        wrapper.find(ProductCard).find(Button).at(1).simulate("click");
        wrapper.find(DeleteModal).find(Button).at(1).simulate("click");
        expect(mockDispatchFn).nthCalledWith(2, expect.any(Function));
    });

    it("should render delete notification", () => {
        window.scrollTo = jest.fn();
        const pushSpy = jest.spyOn(window, "scrollTo");
        const mockStore = { ...mockRootStore, admin: { ...mockRootStore.admin, isProductDeleted: true } };
        mountWithStore(<ProductList />, mockStore);
        expect(pushSpy).toHaveBeenCalled();
    });

    it("should unmount ProductList", () => {
        const wrapper = mountWithStore(<ProductList />);
        wrapper.unmount();
        expect(mockDispatchFn).nthCalledWith(2, { type: "products/resetProductsState" });
        expect(mockDispatchFn).nthCalledWith(3, { payload: LoadingStatus.LOADING, type: "admin/resetAdminState" });
    });
});
