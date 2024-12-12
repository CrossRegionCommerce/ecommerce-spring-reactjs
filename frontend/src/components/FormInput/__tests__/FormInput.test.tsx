import React from "react";
import { Form, Input } from "antd";

import { mountWithStore } from "../../../utils/test/testHelper";
import FormInput from "../FormInput";

describe("FormInput", () => {
    it("should render error message", () => {
        const wrapper = mountWithStore(
            <FormInput
                title={"Product title"}
                titleSpan={6}
                wrapperSpan={18}
                name={"productTitle"}
                error={"Fill in the input field"}
                placeholder={"Product title"}
                disabled={false}
                inputPassword={true}
            />
        );
        expect(wrapper.find(Form.Item).prop("help")).toBe("Fill in the input field");
        expect(wrapper.find(Input.Password).exists()).toBeTruthy();
    });

    it("should render input field", () => {
        const wrapper = mountWithStore(
            <FormInput
                title={"Product title"}
                titleSpan={6}
                wrapperSpan={18}
                name={"productTitle"}
                placeholder={"Product title"}
                disabled={false}
                inputPassword={false}
            />
        );
        expect(wrapper.find(Input).exists()).toBeTruthy();
    });
});
