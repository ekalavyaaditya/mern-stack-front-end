import React, { Component } from "react";
import Input from "../../general/Input";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addproduct } from "../../../actions/productAction";
import { message } from "antd";

class Addproduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      price: "",
      brand: "",
      quantity: "",
      category: "",
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = () => {
    const { name, description, price, brand, quantity, category } = this.state;
    const newProduct = {
      name,
      description,
      price,
      brand,
      quantity,
      category,
    };
    this.props.addproduct(newProduct, this.props.history);
    if (
      name.length &&
      description.length &&
      price.length &&
      brand.length &&
      quantity.length &&
      category.length <= 0
    ) {
      return message.error("please enter all the files");
    }
  };

  render() {
    const { name, description, price, brand, quantity, category } = this.state;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <br />
        <h5>Add Product</h5>
        <br />
        <Input
          name="name"
          type="text"
          placeholder="Name of product"
          value={name}
          onChange={this.onChange}
        />
        <br />
        <Input
          name="description"
          type="text"
          placeholder="Description"
          value={description}
          onChange={this.onChange}
        />
        <br />
        <Input
          name="price"
          type="number"
          placeholder="Enter the price"
          value={price}
          onChange={this.onChange}
        />
        <br />
        <Input
          name="brand"
          type="text"
          placeholder="Enter the brand"
          value={brand}
          onChange={this.onChange}
        />
        <br />
        <Input
          name="quantity"
          type="number"
          placeholder="Enter the quantity"
          value={quantity}
          onChange={this.onChange}
        />
        <br />
        <div>
          <select
            className="form-control"
            name="category"
            value={category}
            onChange={this.onChange}
            style={{ width: "200px", height: "35px" }}
          >
            <option value="">Select a category</option>
            <option value="Clothing">Clothing</option>
            <option value="Electronics">Electronics</option>
            <option value="Office Supply">Office Supply</option>
            <option value="Automotive Supply">Automotive Supply</option>
            <option value="Cosmetics">Cosmetics</option>
          </select>
        </div>
        <br />
        <button
          className="btn btn-primary"
          onClick={this.onSubmit}
          style={{ textAlign: "center" }}
        >
          Submit
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
});

export default connect(mapStateToProps, { addproduct })(withRouter(Addproduct));
