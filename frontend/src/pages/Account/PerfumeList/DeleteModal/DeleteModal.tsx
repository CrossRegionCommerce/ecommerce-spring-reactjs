import React, { FC, ReactElement } from "react";
import { Col, Modal, Row, Typography } from "antd";

import { ProductResponse } from "../../../../types/types";
import "./DeleteModal.css";

type PropsType = {
    visible: boolean;
    deleteProductHandler: () => void;
    handleCancel: () => void;
    productInfo?: ProductResponse;
};

const DeleteModal: FC<PropsType> = ({ visible, deleteProductHandler, handleCancel, productInfo }): ReactElement => {
    return (
        <Modal title="Delete product" visible={visible} onOk={deleteProductHandler} onCancel={handleCancel}>
            <Row>
                <Col span={12} className={"delete-modal-product-image-wrapper"}>
                    <img
                        className={"delete-modal-product-image"}
                        alt={productInfo?.productTitle}
                        src={productInfo?.filename}
                    />
                </Col>
                <Col span={12}>
                    <Typography.Text>Are you sure too delete?</Typography.Text>
                    <Typography.Title level={5}>{productInfo?.productr}</Typography.Title>
                    <Typography.Title level={5}>{productInfo?.productTitle}</Typography.Title>
                </Col>
            </Row>
        </Modal>
    );
};

export default DeleteModal;
