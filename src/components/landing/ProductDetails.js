import React, { Component } from "react";
import { getProductById } from "../../actions/productAction";
import { connect } from "react-redux";
import { Flex, Spin } from "antd";

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    console.log(id);
    this.props.getProductById(id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.product !== this.props.product) {
      this.setState({ product: this.props.product });
    }
  }

  render() {
    console.log(this.props)
    const { product } = this.state;
    return (
      <div className="container">
        {product ? (
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6">
              <img src="/assest/homebackground" alt="product" />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6">
              <p>{product.name}</p>
              <p>{product.description}</p>
              <p>{product.category}</p>
              <p>{product.price}</p>
              <p>{product.brand}</p>
              <button>Add to cart</button>
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
