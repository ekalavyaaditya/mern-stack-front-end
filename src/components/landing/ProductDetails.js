import React, { Component } from "react";
import { getProductById } from "../../actions/productAction";
import { addToCart } from "../../actions/cartAction";
import { connect } from "react-redux";
import Navbar from "../general/Navbar";
import { Link } from "react-router-dom";
// import { isEmpty } from "lodash";
import { decodeUser } from "../../utill";
import { Flex, Spin, Button, Modal, Alert } from "antd";
import "./productDetails.css";
import image from "../../assest/homebackground.jpg";

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      visible: false,
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

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  registerModal = (product) => {
    return (
      <Modal
        title="Add To Cart"
        open={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}>
            close
          </Button>,
        ]}
      >
        <div>
          <br />
          <Alert
            message={
              <center>
                <span>
                  <strong style={{ marginRight: ".3em" }}>added</strong>
                  {product.name}to cart
                </span>
              </center>
            }
            type="success"
          />
          <center>
            <br />
            <Link to="/cart?redirect=/cart">
              <Button key="submit" type="primary">
                go to cart
              </Button>
            </Link>
          </center>
        </div>
      </Modal>
    );
  };

  // it is form chartgpt
  async addProductToCart(product) {
    // Check if the user is signed in
    if (!localStorage.getItem("token")) {
      const products = JSON.parse(localStorage.getItem("products")) || [];

      // Check if the product already exists in local storage
      if (!products.includes(product._id)) {
        products.push(product._id); // Add only if it's not a duplicate
        localStorage.setItem("products", JSON.stringify(products));
      }
      this.showModal();
      return;
    }

    // If user is signed in, use the API
    const userId = decodeUser().user.id;
    const context = { products: [product._id], userId };

    // Assuming `addToCart` handles duplicates on the server side
    await this.props.addToCart(context);
    this.showModal();
  }

  // async addProductToCart(product) {
  //   //check id user is signed in
  //   //if not use localstorage
  //   if (!localStorage.getItem("token")) {
  //     const productExists = !isEmpty(localStorage.getItem("products"));
  //     if (productExists) {
  //       const products = JSON.parse(localStorage.getItem("products"));
  //       products.push(product._id);
  //       this.showModal();
  //       return localStorage.setItem("products", JSON.stringify([product._id]));
  //     } else {
  //       this.showModal();
  //       return localStorage.setItem("products", JSON.stringify([product._id]));
  //     }
  //   }

  //   const userId = decodeUser().user.id;
  //   const context = { products: [product._id], userId };
  //   await this.props.addToCart(context);
  //   this.showModal();
  // }

  render() {
    const { product } = this.state;
    return (
      <div className="containerProductDetails">
        <Navbar />
        {product ? (
          <div className="rowProductDetails">
            <div className="imgDiv">
              <img
                src={product.images.length > 0 ? product.images[0] : image}
                alt={product.name}
                className="product-image"
              />
            </div>
            <div className="detailsProduct">
              <h1 className="product-name">{product.name}</h1>
              <p className="product-description">{product.description}</p>
              <p className="product-brand">Brand: {product.brand}</p>
              <p className="product-category">Category: {product.category}</p>
              <p className="product-quantity">Quantity{product.quantity}</p>
              <p className="product-price">₹{product.price}</p>
              <Button
                type="primary"
                onClick={(_) => this.addProductToCart(product)}
              >
                {" "}
                add to cart
              </Button>
            </div>
          </div>
        ) : (
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
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
        {product && this.registerModal(product)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  product: state.products.product,
});

export default connect(mapStateToProps, { getProductById, addToCart })(
  ProductDetails
);
