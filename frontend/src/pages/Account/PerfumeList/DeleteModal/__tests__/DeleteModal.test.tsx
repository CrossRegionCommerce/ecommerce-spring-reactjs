import React from "react";

import { mountWithStore } from "../../../../../utils/test/testHelper";
import { mockProductsResponse } from "../../../../../utils/test/__mocks__/products-mock";
import DeleteModal from "../DeleteModal";

describe("DeleteModal", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(
            <DeleteModal
                visible={true}
                deleteProductHandler={jest.fn()}
                handleCancel={jest.fn()}
                productInfo={mockProductsResponse[0]}
            />
        );
        expect(wrapper.text().includes("Are you sure too delete?")).toBe(true);
        expect(wrapper.text().includes(mockProductsResponse[0].productr)).toBe(true);
        expect(wrapper.text().includes(mockProductsResponse[0].productTitle)).toBe(true);
    });
});
