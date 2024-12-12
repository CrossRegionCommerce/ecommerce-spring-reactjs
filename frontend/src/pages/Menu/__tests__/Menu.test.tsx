import React from "react";
import routeData from "react-router";
import {Checkbox, Input, Pagination, Radio} from "antd";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../utils/test/testHelper";
import { LoadingStatus } from "../../../types/types";
import { MENU } from "../../../constants/routeConstants";
import Spinner from "../../../components/Spinner/Spinner";
import MenuCheckboxSection from "../MenuSection/MenuCheckboxSection";
import MenuRadioSection from "../MenuSection/MenuRadioSection";
import MenuSorter from "../MenuSorter/MenuSorter";
import InputSearch from "../../../components/InputSearch/InputSearch";
import { mockProductsResponse } from "../../../utils/test/__mocks__/products-mock";
import ProductCard from "../../../components/ProductCard/ProductCard";
import Menu, { CheckboxCategoryFilter } from "../Menu";

window.scrollTo = jest.fn();

describe("Menu", () => {
    const mockRootStore = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        jest.spyOn(routeData, "useLocation").mockReturnValue({
            pathname: MENU,
            hash: "",
            search: "",
            state: { id: "" }
        });
        mockDispatchFn = mockDispatch();
    });

    it("should render loading spinner", () => {
        const wrapper = mountWithStore(<Menu />);
        expect(wrapper.find(Spinner).exists()).toBe(true);
    });

    it("should render products list", () => {
        const mockState = {...mockRootStore, products: {...mockRootStore.products, products: mockProductsResponse}};
        const wrapper = mountWithStore(<Menu />, mockState);
        expect(wrapper.find(ProductCard).length).toEqual(3);
    });

    it("should fetch Products by gender", () => {
        jest.spyOn(routeData, "useLocation").mockReturnValue({
            pathname: MENU,
            hash: "",
            search: "",
            state: { id: "female" }
        });
        mountWithStore(<Menu />);
        expect(mockDispatchFn).nthCalledWith(1, expect.any(Function));
    });

    it("should fetch all Products", () => {
        jest.spyOn(routeData, "useLocation").mockReturnValue({
            pathname: MENU,
            hash: "",
            search: "",
            state: { id: "all" }
        });
        mountWithStore(<Menu />);
        expect(mockDispatchFn).nthCalledWith(1, expect.any(Function));
    });

    it("should change products category", () => {
        testMenuCheckboxSection(0, "Brand", CheckboxCategoryFilter.PERFUMERS);
    });

    it("should change genders category", () => {
        testMenuCheckboxSection(1, "Gender", CheckboxCategoryFilter.GENDERS);
    });

    it("should change price", () => {
        const wrapper = mountWithStore(<Menu />);
        expect(wrapper.find(MenuRadioSection).at(0).prop("title")).toBe("Price");
        wrapper.find(MenuRadioSection).at(0).find(Radio).at(0).find("input").simulate("change");
        expect(mockDispatchFn).nthCalledWith(2, expect.any(Function));
    });

    it("should change sort direction", () => {
        const wrapper = mountWithStore(<Menu />);
        wrapper.find(MenuSorter).find(Radio.Button).at(2).find("input").at(0).simulate("change");
        expect(mockDispatchFn).nthCalledWith(2, expect.any(Function));
    });

    it("should change pagination", () => {
        const mockState = {...mockRootStore, products: {...mockRootStore.products, totalElements: 100}};
        const wrapper = mountWithStore(<Menu />, mockState);
        wrapper.find(Pagination).at(0).find("li").at(2).simulate("click");
        expect(mockDispatchFn).nthCalledWith(2, expect.any(Function));
    });

    it("should change pagination with search value", () => {
        const mockState = {...mockRootStore, products: {...mockRootStore.products, totalElements: 100}};
        const wrapper = mountWithStore(<Menu />, mockState);
        wrapper.find(InputSearch).find(Input).find("input").at(0).simulate("change", { target: { value: "test" } });
        wrapper.find(Pagination).at(0).find("li").at(2).simulate("click");
        expect(mockDispatchFn).nthCalledWith(2, expect.any(Function));
    });

    it("should change pagination with search value", () => {
        const wrapper = mountWithStore(<Menu />);
        wrapper.unmount();
        expect(mockDispatchFn).nthCalledWith(2, { type: "products/resetProductsState" });
    });
    
    const testMenuCheckboxSection = (checkboxId: number, title: string, category: CheckboxCategoryFilter): void => {
        const wrapper = mountWithStore(<Menu />);
        expect(wrapper.find(MenuCheckboxSection).at(checkboxId).prop("title")).toBe(title);
        expect(wrapper.find(MenuCheckboxSection).at(checkboxId).prop("category")).toBe(category);
        wrapper.find(MenuCheckboxSection).at(checkboxId).find(Checkbox).at(0).find("input").at(0).simulate("change", {target: {checked: true}});
        expect(mockDispatchFn).nthCalledWith(2, expect.any(Function));
    };
});
