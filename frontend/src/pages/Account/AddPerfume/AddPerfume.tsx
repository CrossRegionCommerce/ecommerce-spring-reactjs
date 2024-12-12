import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, notification, Row, Upload } from "antd";
import { PlusSquareFilled, PlusSquareOutlined, UploadOutlined } from "@ant-design/icons";
import { UploadChangeParam } from "antd/lib/upload/interface";

import {
    selectAdminStateErrors,
    selectIsAdminStateLoading,
    selectIsProductAdded
} from "../../../redux-toolkit/admin/admin-selector";
import { resetAdminState, setAdminLoadingState } from "../../../redux-toolkit/admin/admin-slice";
import { LoadingStatus } from "../../../types/types";
import { addProduct } from "../../../redux-toolkit/admin/admin-thunks";
import ContentTitle from "../../../components/ContentTitle/ContentTitle";
import AddFormInput from "./AddFormInput";
import AddFormSelect from "./AddFormSelect";
import IconButton from "../../../components/IconButton/IconButton";

type AddProductData = {
    productTitle: string;
    productr: string;
    year: string;
    country: string;
    type: string;
    volume: string;
    productGender: string;
    fragranceTopNotes: string;
    fragranceMiddleNotes: string;
    fragranceBaseNotes: string;
    price: string;
};

const AddProduct: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const isProductAdded = useSelector(selectIsProductAdded);
    const ispProductLoading = useSelector(selectIsAdminStateLoading);
    const productErrors = useSelector(selectAdminStateErrors);
    const [file, setFile] = React.useState<string>("");

    useEffect(() => {
        dispatch(setAdminLoadingState(LoadingStatus.LOADED));

        return () => {
            dispatch(resetAdminState(LoadingStatus.LOADING));
        };
    }, []);

    useEffect(() => {
        if (isProductAdded) {
            window.scrollTo(0, 0);
            notification.success({
                message: "Product added",
                description: "Product successfully added!"
            });
            dispatch(resetAdminState(LoadingStatus.SUCCESS));
        }
    }, [isProductAdded]);

    const onFormSubmit = (data: AddProductData): void => {
        const bodyFormData: FormData = new FormData();
        // @ts-ignore
        bodyFormData.append("file", { file });
        bodyFormData.append(
            "product",
            new Blob([JSON.stringify({ ...data, productRating: 0 })], { type: "application/json" })
        );

        dispatch(addProduct(bodyFormData));
    };

    const handleUpload = ({ file }: UploadChangeParam<any>): void => {
        setFile(file);
    };

    return (
        <>
            <ContentTitle title={"Add product"} titleLevel={4} icon={<PlusSquareOutlined />} />
            <Form onFinish={onFormSubmit}>
                <Row gutter={32}>
                    <Col span={12}>
                        <AddFormInput
                            title={"Product title"}
                            name={"productTitle"}
                            error={productErrors.productTitleError}
                            placeholder={"Enter the product title"}
                            disabled={ispProductLoading}
                        />
                        <AddFormInput
                            title={"Release year"}
                            name={"year"}
                            error={productErrors.yearError}
                            placeholder={"Enter the release year"}
                            disabled={ispProductLoading}
                        />
                        <AddFormSelect
                            title={"Product type"}
                            name={"type"}
                            error={productErrors.typeError}
                            placeholder={"Eau de Parfum"}
                            disabled={ispProductLoading}
                            values={["Eau de Parfum", "Eau de Toilette"]}
                        />
                        <AddFormSelect
                            title={"Gender"}
                            name={"productGender"}
                            error={productErrors.productGenderError}
                            placeholder={"male"}
                            disabled={ispProductLoading}
                            values={["male", "female"]}
                        />
                        <AddFormInput
                            title={"Heart notes"}
                            name={"fragranceMiddleNotes"}
                            error={productErrors.fragranceMiddleNotesError}
                            placeholder={"Enter the heart notes"}
                            disabled={ispProductLoading}
                        />
                        <AddFormInput
                            title={"Price"}
                            name={"price"}
                            error={productErrors.priceError}
                            placeholder={"Enter the price"}
                            disabled={ispProductLoading}
                        />
                    </Col>
                    <Col span={12}>
                        <AddFormInput
                            title={"Brand"}
                            name={"productr"}
                            error={productErrors.productrError}
                            placeholder={"Enter the brand"}
                            disabled={ispProductLoading}
                        />
                        <AddFormInput
                            title={"Manufacturer country"}
                            name={"country"}
                            error={productErrors.countryError}
                            placeholder={"Enter the manufacturer country"}
                            disabled={ispProductLoading}
                        />
                        <AddFormInput
                            title={"Volume"}
                            name={"volume"}
                            error={productErrors.volumeError}
                            placeholder={"Enter the volume"}
                            disabled={ispProductLoading}
                        />
                        <AddFormInput
                            title={"Top notes"}
                            name={"fragranceTopNotes"}
                            error={productErrors.fragranceTopNotesError}
                            placeholder={"Enter the top notes"}
                            disabled={ispProductLoading}
                        />
                        <AddFormInput
                            title={"Base notes"}
                            name={"fragranceBaseNotes"}
                            error={productErrors.fragranceBaseNotesError}
                            placeholder={"Enter the base notes"}
                            disabled={ispProductLoading}
                        />
                        <Upload name={"file"} onChange={handleUpload} beforeUpload={() => false}>
                            <Button icon={<UploadOutlined />} style={{ marginTop: 22 }}>
                                Click to Upload
                            </Button>
                        </Upload>
                    </Col>
                </Row>
                <IconButton title={"Add"} icon={<PlusSquareFilled />} />
            </Form>
        </>
    );
};

export default AddProduct;
