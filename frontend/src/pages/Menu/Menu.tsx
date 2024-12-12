import React, { FC, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Layout, Pagination, RadioChangeEvent, Row, Typography } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { useLocation } from "react-router-dom";

import MenuCheckboxSection from "./MenuSection/MenuCheckboxSection";
import { selectIsProductsLoading, selectProducts } from "../../redux-toolkit/products/products-selector";
import { FilterParamsType } from "../../types/types";
import { fetchProductsByFilterParams, fetchProductsByInputText } from "../../redux-toolkit/products/products-thunks";
import { resetProductsState } from "../../redux-toolkit/products/products-slice";
import MenuRadioSection from "./MenuSection/MenuRadioSection";
import MenuSorter from "./MenuSorter/MenuSorter";
import ProductCard from "../../components/ProductCard/ProductCard";
import SelectSearchData from "../../components/SelectSearchData/SelectSearchData";
import InputSearch from "../../components/InputSearch/InputSearch";
import Spinner from "../../components/Spinner/Spinner";
import { MAX_PAGE_VALUE, usePagination } from "../../hooks/usePagination";
import { gender, productr, price } from "./MenuData";
import { useSearch } from "../../hooks/useSearch";
import "./Menu.css";

export enum CheckboxCategoryFilter {
    PERFUMERS = "PERFUMERS",
    GENDERS = "GENDERS"
}

const Menu: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const products = useSelector(selectProducts);
    const isProductsLoading = useSelector(selectIsProductsLoading);
    const location = useLocation<{ id: string }>();
    const [filterParams, setFilterParams] = useState<FilterParamsType>({
        productrs: [],
        genders: [],
        prices: [1, 999]
    });
    const [sortByPrice, setSortByPrice] = useState<boolean>(false);
    const { currentPage, totalElements, handleChangePagination, resetPagination } = usePagination();
    const { searchValue, searchTypeValue, resetFields, form, onSearch, handleChangeSelect } = useSearch();

    useEffect(() => {
        const productData = location.state.id;

        if (productData === "female" || productData === "male") {
            dispatch(
                fetchProductsByFilterParams({
                    ...filterParams,
                    genders: [...filterParams.genders, productData],
                    sortByPrice,
                    currentPage: 0
                })
            );
            setFilterParams((prevState) => ({ ...prevState, genders: [...prevState.genders, productData] }));
        } else if (productData === "all") {
            dispatch(fetchProductsByFilterParams({ ...filterParams, sortByPrice, currentPage: 0 }));
        } else {
            dispatch(
                fetchProductsByFilterParams({
                    ...filterParams,
                    productrs: [...filterParams.productrs, productData],
                    sortByPrice,
                    currentPage: 0
                })
            );
            setFilterParams((prevState) => ({ ...prevState, productrs: [...prevState.productrs, productData] }));
        }
        window.scrollTo(0, 0);

        return () => {
            dispatch(resetProductsState());
        };
    }, []);

    useEffect(() => {
        resetPagination();
    }, [filterParams, sortByPrice]);

    const onChangeCheckbox = (checkedValues: CheckboxValueType[], category: CheckboxCategoryFilter): void => {
        if (CheckboxCategoryFilter.PERFUMERS === category) {
            setFilterParams((prevState) => {
                const filter = { ...prevState, productrs: [...(checkedValues as string[])] };
                dispatch(fetchProductsByFilterParams({ ...filter, sortByPrice, currentPage: 0 }));
                return filter;
            });
        } else if (CheckboxCategoryFilter.GENDERS === category) {
            setFilterParams((prevState) => {
                const filter = { ...prevState, genders: [...(checkedValues as string[])] };
                dispatch(fetchProductsByFilterParams({ ...filter, sortByPrice, currentPage: 0 }));
                return filter;
            });
        }
        resetFields();
    };

    const onChangeRadio = (event: RadioChangeEvent): void => {
        setFilterParams((prevState) => {
            const filter = { ...prevState, prices: event.target.value };
            dispatch(fetchProductsByFilterParams({ ...filter, sortByPrice, currentPage: 0 }));
            return filter;
        });
        resetFields();
    };

    const handleChangeSortPrice = (event: RadioChangeEvent): void => {
        dispatch(fetchProductsByFilterParams({ ...filterParams, sortByPrice: event.target.value, currentPage: 0 }));
        setSortByPrice(event.target.value);
        resetFields();
    };

    const changePagination = (page: number, pageSize: number): void => {
        if (searchValue) {
            dispatch(
                fetchProductsByInputText({ searchType: searchTypeValue, text: searchValue, currentPage: page - 1 })
            );
        } else {
            dispatch(fetchProductsByFilterParams({ ...filterParams, sortByPrice, currentPage: page - 1 }));
        }
        handleChangePagination(page, pageSize);
    };

    return (
        <Layout>
            <Layout.Content className={"login-content"}>
                <Typography.Title level={2}>Products</Typography.Title>
                <Row gutter={32}>
                    <Col span={6}>
                        <MenuCheckboxSection
                            title={"Brand"}
                            onChange={onChangeCheckbox}
                            data={productr}
                            category={CheckboxCategoryFilter.PERFUMERS}
                            selectedValues={filterParams.productrs}
                        />
                        <MenuCheckboxSection
                            title={"Gender"}
                            onChange={onChangeCheckbox}
                            data={gender}
                            category={CheckboxCategoryFilter.GENDERS}
                            selectedValues={filterParams.genders}
                        />
                        <MenuRadioSection title={"Price"} onChange={onChangeRadio} data={price} />
                    </Col>
                    <Col span={18}>
                        <Row>
                            <Col span={9}>
                                <SelectSearchData handleChangeSelect={handleChangeSelect} />
                            </Col>
                            <Col span={10}>
                                <InputSearch onSearch={onSearch} form={form} />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 16, marginBottom: 16 }}>
                            <Col span={16}>
                                <Pagination
                                    current={currentPage}
                                    pageSize={MAX_PAGE_VALUE}
                                    total={totalElements}
                                    showSizeChanger={false}
                                    onChange={changePagination}
                                />
                            </Col>
                            <Col span={8}>
                                <MenuSorter onChange={handleChangeSortPrice} sortByPrice={sortByPrice} />
                            </Col>
                        </Row>
                        <Row gutter={[32, 32]}>
                            {isProductsLoading ? (
                                <Spinner />
                            ) : (
                                products.map((product) => (
                                    <ProductCard key={product.id} product={product} colSpan={8} />
                                ))
                            )}
                        </Row>
                        <Row style={{ marginTop: 16, marginBottom: 16 }}>
                            <Pagination
                                current={currentPage}
                                pageSize={MAX_PAGE_VALUE}
                                total={totalElements}
                                showSizeChanger={false}
                                onChange={changePagination}
                            />
                        </Row>
                    </Col>
                </Row>
            </Layout.Content>
        </Layout>
    );
};

export default Menu;
