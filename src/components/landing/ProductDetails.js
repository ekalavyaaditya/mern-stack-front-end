import React, { Component } from "react";
import { getProductById } from "../../actions/productAction";
import { connect } from "react-redux";
import Navbar from "../general/Navbar";
import { Flex, Spin,Button } from "antd";
import "./productDetails.css";
import image from "../../assest/homebackground.jpg";

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getProductById(id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.product !== this.props.product) {
      this.setState({ product: this.props.product });
    }
  }

  render() {
    const { product } = this.state;
    return (
      <div className="containerProductDetails">
        <Navbar/>
        {product ? (
          <div className="rowProductDetails">
            <div className="imgDiv">
            <img src={image} alt={product.name} className="product-image" />
            </div>
            <div className="detailsProduct">
            <h1 className="product-name">{product.name}</h1>
              <p className="product-description">{product.description}</p>
              <p className="product-brand">Brand: {product.brand}</p>
              <p className="product-category">Category: {product.category}</p>
              <p className="product-quantity">Quantity{product.quantity}</p>
              <p className="product-price">${product.price}</p>
              <Button  type="primary">add to cart</Button>
            </div>
          </div>
        ) : (
          <div style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center"
          }}
          >
            <Flex
              align="center"
              display="flex"
              justifyContent="center"
              gap="middle"
            >
              <Spin size="large" />
            </Flex>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  product: state.products.product,
});

export default connect(mapStateToProps, { getProductById })(ProductDetails);
