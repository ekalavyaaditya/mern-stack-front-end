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
        {products.map((product, index) => (
          <Product
            key={index}
            link={`product/${product._id}`}
            product={product}
            description={this.productDetails(product)}
            thumbnail={product.images[0]}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
  auth: state.auth,
});

export default connect(mapStateToProps, { getproduct })(Products);
