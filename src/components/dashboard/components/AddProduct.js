import React, { Component } from "react";
import Input from "../../general/Input";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addproduct } from "../../../actions/productAction";
import { message, Button, Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

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
      fileList: [],
      previewVisible: false,
      previewImage: "",
      previewTitle: "",
    };
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  handleFileChange = async ({ fileList }) => {
    this.setState({ fileList });
  };

  beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
    }
    return isImage || Upload.LIST_IGNORE;
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const { name, description, price, brand, quantity, category, fileList } =
      this.state;

    if (
      !name ||
      !description ||
      !price ||
      !brand ||
      !quantity ||
      !category ||
      fileList.length === 0
    ) {
      return message.error(
        "Please fill out all fields and upload at least one image."
      );
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("brand", brand);
    formData.append("quantity", quantity);
    formData.append("category", category);

    fileList.forEach((file) => {
      if (file.originFileObj) {
        formData.append("images", file.originFileObj);
      } else {
        console.error("File object is missing");
      }
    });

    try {
      await this.props.addproduct(formData, this.props.history);
      message.success("Product added successfully!");
      this.setState({
        name: "",
        description: "",
        price: "",
        brand: "",
        quantity: "",
        category: "",
        fileList: [],
      });
    } catch (error) {
      console.error("Error adding product:", error);
      message.error("There was an error adding the product. Please try again.");
    }
  };

  render() {
    const {
      name,
      description,
      price,
      brand,
      quantity,
      category,
      fileList,
      previewVisible,
      previewImage,
      previewTitle,
    } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
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
        <select
          className="form-control"
          name="category"
          value={category}
          onChange={this.onChange}
          style={{
            width: "180px",
            height: "30px",
            fontSize: "15px",
            padding: "2px 5px",
            marginBottom: "16px",
          }}
        >
          <option value="">Select a category</option>
          <option value="Clothing">Clothing</option>
          <option value="Electronics">Electronics</option>
          <option value="Office Supply">Office Supply</option>
          <option value="Automotive Supply">Automotive Supply</option>
          <option value="Cosmetics">Cosmetics</option>
          <option value="others">others</option>
        </select>
        <br />
        <Upload
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleFileChange}
          beforeUpload={this.beforeUpload}
        >
          {fileList.length >= 4 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
        <Button
          type="primary"
          onClick={this.onSubmit}
          style={{ marginTop: "16px" }}
        >
          Submit
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
});

export default connect(mapStateToProps, { addproduct })(withRouter(Addproduct));
