import React from "react";
import { Form } from "antd";

import { mountWithStore } from "../../../../utils/test/testHelper";
import EditProductSelect from "../EditProductSelect";

describe("EditProductSelect", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(
            <EditProductSelect
                title={"Product type"}
                name={"type"}
                error={"Fill in the input field"}
                placeholder={"Product type"}
                disabled={false}
                values={["Eau de Parfum", "Eau de Toilette"]}
            />
        );
        expect(wrapper.text().includes("Product type")).toBe(true);
        expect(wrapper.find(Form.Item).prop("name")).toBe("type");
        expect(wrapper.find(Form.Item).prop("help")).toBe("Fill in the input field");
    });
});
