import React from "react";

import { mountWithStore } from "../../../../utils/test/testHelper";
import ErrorMessage from "../ErrorMessage";

describe("ErrorMessage", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<ErrorMessage errorMessage={"Product not found."} />);
        expect(wrapper.text().includes("Product not found.")).toBe(true);
    });
});
