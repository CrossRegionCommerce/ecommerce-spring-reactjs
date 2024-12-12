import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Carousel, Typography } from "antd";

import { selectProducts } from "../../../redux-toolkit/products/products-selector";
import { fetchProductsByIds } from "../../../redux-toolkit/products/products-thunks";
import { resetProductsState } from "../../../redux-toolkit/products/products-slice";
import ProductCardsSliderItem from "./ProductCardsSliderItem/ProductCardsSliderItem";
import "./ProductCardsSlider.css";

export const productsIds = [26, 43, 46, 106, 34, 76, 82, 85, 27, 39, 79, 86];

const ProductCardsSlider: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const products = useSelector(selectProducts);

    useEffect(() => {
        // GraphQL example
        // dispatch(fetchProductsByIdsQuery(productsId));
        dispatch(fetchProductsByIds(productsIds));

        return () => {
            dispatch(resetProductsState());
        };
    }, []);

    return (
        <div className={"product-cards-slider"}>
            <Typography.Title level={3} className={"product-cards-slider-title"}>
                PERSONALLY RECOMMENDED
            </Typography.Title>
            <Carousel>
                <ProductCardsSliderItem products={products.slice(0, 4)} />
                <ProductCardsSliderItem products={products.slice(4, 8)} />
                <ProductCardsSliderItem products={products.slice(8, 12)} />
            </Carousel>
        </div>
    );
};

export default ProductCardsSlider;
