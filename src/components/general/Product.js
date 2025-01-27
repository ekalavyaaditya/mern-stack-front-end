import React from "react";
import { Card } from "antd";
import propTypes from "prop-types";
import { Link } from "react-router-dom";

const { Meta } = Card;
const Product = ({ product, description, link }) => {
  return (
    // <div style={{margin: "10px"}}>
    <Link to={link} style={{ width: '19%', margin: '6px', textDecoration: 'none' }}>
      <Card
        style={{ width: '100%' }}
        hoverable
        cover={
          <img
            alt="example"
            src={product.images.length > 0 ? product.images[0] : "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"}
          />
        }
      >
        <Meta title={product.name} description={description} />
        <p>₹{product.price}</p>
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
