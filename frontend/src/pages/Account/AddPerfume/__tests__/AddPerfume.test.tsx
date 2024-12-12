import React from "react";
import { Button } from "antd";

import {
    createMockRootState,
    mockDispatch,
    mountWithStore,
    waitForComponentToRender
} from "../../../../utils/test/testHelper";
import { LoadingStatus } from "../../../../types/types";
import AddProduct from "../AddProduct";

window.scrollTo = jest.fn();

describe("AddProduct", () => {
    const mockRootStore = createMockRootState(LoadingStatus.SUCCESS);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        mountWithStore(<AddProduct />);
        expect(mockDispatchFn).nthCalledWith(1, { payload: LoadingStatus.LOADED, type: "admin/setAdminLoadingState" });
    });

    it("should click onFormSubmit", async () => {
        const wrapper = mountWithStore(<AddProduct />, mockRootStore);
        wrapper.find(Button).at(0).simulate("submit");
        await waitForComponentToRender(wrapper);
        expect(mockDispatchFn).nthCalledWith(2, expect.any(Function));
    });

    it("should product added success", () => {
        const mockStore = {...mockRootStore, admin: {...mockRootStore.admin, isProductAdded: true}};
        mountWithStore(<AddProduct />, mockStore);
        expect(mockDispatchFn).nthCalledWith(2, { payload: LoadingStatus.SUCCESS, type: "admin/resetAdminState" });
    });

    it("should unmount AddProduct", () => {
        const wrapper = mountWithStore(<AddProduct />);
        wrapper.unmount();
        expect(mockDispatchFn).nthCalledWith(2, { payload: LoadingStatus.LOADING, type: "admin/resetAdminState" });
    });
});
