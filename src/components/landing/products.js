import React, { Component } from "react";
import { connect } from "react-redux";
import { getproduct } from "../../actions/productAction";
import Product from "../general/Product";
import "./product.css";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    this.props.getproduct();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.products.products !== this.props.products.products) {
      const products = this.props.products.products;
      this.setState({ products });
    }
  }

  productDetails = (product) => () => {
    return (
      <ul>
        <li>Rupees: {product.price}</li>
        <li>Quantity: {product.quantity}</li>
      </ul>
    );
  };

  render() {
    const { products } = this.state;
    return (
      <div className="productContainer">
        <div className="productRow">
          {products.map((product, index) => (
            <Product
              key={index}
              product={product}
              description={this.productDetails(product)}
              buttonName="Add to Card"
            />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
  auth: state.auth,
});

export default connect(mapStateToProps, { getproduct })(Products);
