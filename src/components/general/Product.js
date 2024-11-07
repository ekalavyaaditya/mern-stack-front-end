import React from "react";
import { Card } from "antd";
import propTypes from "prop-types";
import { Link } from "react-router-dom";

const { Meta } = Card;
const Product = ({ product, description, link }) => {
  return (
    // <div style={{margin: "10px"}}>
    <Link to={link} style={{ width: '19%', margin: '6px' }}>
      <Card
        style={{ width: '100%' }}
        hoverable
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
      >
        <Meta title={product.name} description={description} />
      </Card>
    </Link>
    // </div>
  );
};
Product.propTypes = {
  product: propTypes.object.isRequired,
  description: propTypes.func.isRequired,
  buttonName: propTypes.string,
};

export default Product;
