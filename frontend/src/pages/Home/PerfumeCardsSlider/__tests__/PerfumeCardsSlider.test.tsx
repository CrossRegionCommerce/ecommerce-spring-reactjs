import React from "react";

import { mockDispatch, mountWithStore } from "../../../../utils/test/testHelper";
import ProductCardsSlider from "../ProductCardsSlider";
import ProductCardsSliderItem from "../ProductCardsSliderItem/ProductCardsSliderItem";

describe("ProductCardsSlider", () => {
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<ProductCardsSlider />);
        expect(wrapper.text().includes("PERSONALLY RECOMMENDED")).toBe(true);
        expect(wrapper.find(ProductCardsSliderItem).length).toEqual(7);
        expect(mockDispatchFn).nthCalledWith(1, expect.any(Function));
    });

    it("should unmount ProductCardsSlider", () => {
        const wrapper = mountWithStore(<ProductCardsSlider />);
        wrapper.unmount();
        expect(mockDispatchFn).nthCalledWith(2, { type: "products/resetProductsState" });
    });
});
