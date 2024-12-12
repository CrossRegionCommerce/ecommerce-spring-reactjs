import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, notification, Row, Upload } from "antd";
import { UploadChangeParam } from "antd/lib/upload/interface";

import ContentTitle from "../../../components/ContentTitle/ContentTitle";
import FormInput from "../../../components/FormInput/FormInput";
import { selectProduct } from "../../../redux-toolkit/product/product-selector";
import {
    selectAdminStateErrors,
    selectIsAdminStateLoading,
    selectIsProductEdited
} from "../../../redux-toolkit/admin/admin-selector";
import { LoadingStatus } from "../../../types/types";
import { resetAdminState, setAdminLoadingState } from "../../../redux-toolkit/admin/admin-slice";
import { fetchProduct } from "../../../redux-toolkit/product/product-thunks";
import IconButton from "../../../components/IconButton/IconButton";
import EditProductSelect from "./EditProductSelect";
import { updateProduct } from "../../../redux-toolkit/admin/admin-thunks";
import "./EditProduct.css";

type EditProductData = {
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

const EditProduct: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const params = useParams<{ id: string }>();
    const productData = useSelector(selectProduct);
    const isLoading = useSelector(selectIsAdminStateLoading);
    const errors = useSelector(selectAdminStateErrors);
    const isProductEdited = useSelector(selectIsProductEdited);
    const [file, setFile] = React.useState<string>("");

    useEffect(() => {
        dispatch(setAdminLoadingState(LoadingStatus.LOADED));
        dispatch(fetchProduct(params.id));

        return () => {
            dispatch(resetAdminState(LoadingStatus.LOADING));
        };
    }, []);
    
    useEffect(() => {
        if (productData) {
            form.setFieldsValue(productData);
        }
    }, [productData])

    useEffect(() => {
        if (isProductEdited) {
            window.scrollTo(0, 0);
            notification.success({
                message: "Product edited",
                description: "Product successfully edited!"
            });
            dispatch(resetAdminState(LoadingStatus.SUCCESS));
        }
    }, [isProductEdited]);

    const onFormSubmit = (data: EditProductData): void => {
        const bodyFormData: FormData = new FormData();
        // @ts-ignore
        bodyFormData.append("file", { file });
        bodyFormData.append(
            "product",
            new Blob([JSON.stringify({ ...data, id: productData?.id })], { type: "application/json" })
        );

        dispatch(updateProduct(bodyFormData));
    };

    const handleUpload = ({ file }: UploadChangeParam<any>): void => {
        setFile(file);
    };

    return (
        <div>
            <ContentTitle title={"Edit product"} titleLevel={4} icon={<EditOutlined />} />
            <Form onFinish={onFormSubmit} form={form}>
                <Row gutter={32}>
                    <Col span={12}>
                        <FormInput
                            title={"Product title"}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"productTitle"}
                            error={errors.productTitleError}
                            disabled={isLoading}
                            placeholder={"Product title"}
                        />
                        <FormInput
                            title={"Brand"}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"productr"}
                            error={errors.productrError}
                            disabled={isLoading}
                            placeholder={"Brand"}
                        />
                        <FormInput
                            title={"Release year"}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"year"}
                            error={errors.yearError}
                            disabled={isLoading}
                            placeholder={"Release year"}
                        />
                        <FormInput
                            title={"Country"}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"country"}
                            error={errors.countryError}
                            disabled={isLoading}
                            placeholder={"Country"}
                        />
                        <EditProductSelect
                            title={"Product type"}
                            name={"type"}
                            placeholder={"Product type"}
                            error={errors.typeError}
                            disabled={isLoading}
                            values={["Eau de Parfum", "Eau de Toilette"]}
                        />
                        <EditProductSelect
                            title={"Gender"}
                            name={"productGender"}
                            placeholder={"Gender"}
                            disabled={isLoading}
                            values={["male", "female"]}
                        />
                        <FormInput
                            title={"Volume"}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"volume"}
                            error={errors.volumeError}
                            disabled={isLoading}
                            placeholder={"Volume"}
                        />
                        <FormInput
                            title={"Top notes"}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"fragranceTopNotes"}
                            error={errors.fragranceTopNotesError}
                            disabled={isLoading}
                            placeholder={"Top notes"}
                        />
                        <FormInput
                            title={"Heart notes"}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"fragranceMiddleNotes"}
                            error={errors.fragranceMiddleNotesError}
                            disabled={isLoading}
                            placeholder={"Heart notes"}
                        />
                        <FormInput
                            title={"Base notes"}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"fragranceBaseNotes"}
                            error={errors.fragranceBaseNotesError}
                            disabled={isLoading}
                            placeholder={"Base notes"}
                        />
                        <FormInput
                            title={"Price"}
                            titleSpan={6}
                            wrapperSpan={18}
                            name={"price"}
                            error={errors.priceError}
                            disabled={isLoading}
                            placeholder={"Price"}
                        />
                    </Col>
                    <Col span={12}>
                        <Upload name={"file"} onChange={handleUpload} beforeUpload={() => false}>
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                        <div className={"edit-product-image-wrapper"}>
                            <img
                                className={"edit-product-image"}
                                src={productData.filename}
                                alt={productData.productTitle}
                            />
                        </div>
                    </Col>
                </Row>
                <IconButton title={"Edit"} icon={<EditOutlined />} disabled={isLoading} />
            </Form>
        </div>
    );
};

export default EditProduct;
