import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import { store } from "../../../store";
import { initialState } from "../products-slice";
import { LoadingStatus } from "../../../types/types";
import {
    API_BASE_URL,
    PERFUMES,
    PERFUMES_GRAPHQL_IDS,
    PERFUMES_GRAPHQL_PERFUMES,
    PERFUMES_IDS,
    PERFUMES_SEARCH
} from "../../../constants/urlConstants";
import { mockProductsResponse } from "../../../utils/test/__mocks__/products-mock";
import {
    fetchProducts,
    fetchProductsByFilterParams,
    fetchProductsByIds,
    fetchProductsByIdsQuery,
    fetchProductsByQuery
} from "../products-thunks";

describe("products slice tests", () => {
    const mock = new MockAdapter(axios);
    let state = store.getState().products;

    beforeEach(() => {
        state = initialState;
    });

    it("should fetchProducts dispatches fulfilled on success", async () => {
        expect(state.products).toEqual([]);
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);

        mock.onGet(API_BASE_URL + `${PERFUMES}?page=1`).reply(200, mockProductsResponse, {
            "page-total-count": "1",
            "page-total-elements": "11"
        });
        const result = await store.dispatch(fetchProducts(1));

        state = store.getState().products;
        expect(result.type).toBe("products/fetchProducts/fulfilled");
        expect(state.products).toEqual(mockProductsResponse);
        expect(state.pagesCount).toEqual(1);
        expect(state.totalElements).toEqual(11);
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
    });

    it("should fetchProductsByIds dispatches fulfilled on success", async () => {
        expect(state.products).toEqual([]);
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);

        mock.onPost(API_BASE_URL + PERFUMES_IDS).reply(200, mockProductsResponse);
        const result = await store.dispatch(fetchProductsByIds([34, 35, 38]));

        state = store.getState().products;
        expect(result.type).toBe("products/fetchProductsByIds/fulfilled");
        expect(state.products).toEqual(mockProductsResponse);
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
    });

    it("should fetchProductsByFilterParams dispatches fulfilled on success", async () => {
        expect(state.products).toEqual([]);
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);

        mock.onPost(API_BASE_URL + `${PERFUMES_SEARCH}?page=1`).reply(200, mockProductsResponse, {
            "page-total-count": "1",
            "page-total-elements": "11"
        });
        const result = await store.dispatch(
            fetchProductsByFilterParams({ productrs: ["Creed"], genders: [], prices: [], currentPage: 1 })
        );

        state = store.getState().products;
        expect(result.type).toBe("products/fetchProductsByFilterParams/fulfilled");
        expect(state.products).toEqual(mockProductsResponse);
        expect(state.pagesCount).toEqual(1);
        expect(state.totalElements).toEqual(11);
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
    });

    it("should fetchProductsByQuery dispatches fulfilled on success", async () => {
        expect(state.products).toEqual([]);
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);

        mock.onPost(API_BASE_URL + PERFUMES_GRAPHQL_PERFUMES).reply(200, { data: { products: mockProductsResponse } });
        const result = await store.dispatch(fetchProductsByQuery());

        state = store.getState().products;
        expect(result.type).toBe("products/fetchProductsByQuery/fulfilled");
        expect(state.products).toEqual(mockProductsResponse);
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
    });

    it("should fetchProductsByIdsQuery dispatches fulfilled on success", async () => {
        expect(state.products).toEqual([]);
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);

        mock.onPost(API_BASE_URL + PERFUMES_GRAPHQL_IDS).reply(200, { data: { productsIds: mockProductsResponse } });
        const result = await store.dispatch(fetchProductsByIdsQuery([34, 35, 38]));

        state = store.getState().products;
        expect(result.type).toBe("products/fetchProductsByIdsQuery/fulfilled");
        expect(state.products).toEqual(mockProductsResponse);
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
    });
});
