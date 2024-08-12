import React, { Component } from "react";
import { connect } from "react-redux";
import { getInstructorProduct } from "../../../actions/productAction";
import Product from "../../general/Product";
import { decodeUser } from "../../../utill";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      merachantProducts: [],
    };
  }

  componentDidMount() {
    const user = decodeUser();
    if (user && user.user && user.user.id) {
      this.props.getInstructorProduct(user.user.id);
    } else {
      console.log("code issue");
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.products !== this.props.products) {
      if (
        this.props.products &&
        this.props.products.products &&
        this.props.products.products.length > 0
      ) {
        this.setState({ merachantProducts: this.props.products.products });
      }
    }
  }

  productDetails = (product) => (
    <ul>
      <li>Rupees: {product.price}</li>
      <li>Quantity: {product.quantity}</li>
    </ul>
  );

  render() {
    const { merachantProducts } = this.state;
    return (
      <div className="productRow">
        {merachantProducts.map((product) => (
          <Product
            className="product"
            key={product._id}
            product={product}
            description={this.productDetails(product)}
            buttonName="Add img"
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
});

export default connect(mapStateToProps, { getInstructorProduct })(Products);