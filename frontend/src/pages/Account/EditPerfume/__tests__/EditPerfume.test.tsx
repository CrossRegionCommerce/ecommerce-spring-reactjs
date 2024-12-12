import React from "react";
import { Button } from "antd";

import {
    createMockRootState,
    mockDispatch,
    mountWithStore,
    waitForComponentToRender
} from "../../../../utils/test/testHelper";
import { LoadingStatus } from "../../../../types/types";
import { mockFullProductResponse } from "../../../../utils/test/__mocks__/products-mock";
import EditProduct from "../EditProduct";

window.scrollTo = jest.fn();

describe("EditProduct", () => {
    const mockRootStore = createMockRootState(LoadingStatus.SUCCESS);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        mountWithStore(<EditProduct />);
        expect(mockDispatchFn).nthCalledWith(1, { payload: LoadingStatus.LOADED, type: "admin/setAdminLoadingState" });
        expect(mockDispatchFn).nthCalledWith(2, expect.any(Function));
    });

    it("should product edited success", () => {
        const mockStore = {
            ...mockRootStore,
            admin: { ...mockRootStore.admin, isProductEdited: true },
            product: { ...mockRootStore.product, product: mockFullProductResponse }
        };
        mountWithStore(<EditProduct />, mockStore);
        expect(mockDispatchFn).nthCalledWith(3, { payload: LoadingStatus.SUCCESS, type: "admin/resetAdminState" });
    });

    it("should click onFormSubmit", async () => {
        const wrapper = mountWithStore(<EditProduct />);
        wrapper.find(Button).at(0).simulate("submit");
        await waitForComponentToRender(wrapper);
        expect(mockDispatchFn).nthCalledWith(3, expect.any(Function));
    });

    it("should unmount EditProduct", () => {
        const wrapper = mountWithStore(<EditProduct />);
        wrapper.unmount();
        expect(mockDispatchFn).nthCalledWith(3, { payload: LoadingStatus.LOADING, type: "admin/resetAdminState" });
    });
});
