import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";
import { Empty, Button } from "antd";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { getCart, removeFromCart } from "../../actions/cartAction";
import Navbar from "../general/Navbar";
import './Cart.css'

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: {},
    };
  }

  componentDidMount() {
    this.props.getCart(); // Dispatch the action to fetch the cart
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cartState !== this.props.cartState) {
      const { cartState } = this.props;
      if (cartState && cartState.cart) {
        this.setState({ cart: cartState.cart });
      }
    }
  }

  totalCalculate = () => {
    let total = 0;
    const { products } = this.state.cart;
    if (products && products.length > 0) {
      products.forEach((product) => {
        total += product.price;
      });
    }
    return total;
  };

  removeCart = (product) => {
    const cartId = this.state.cart._id;
    this.props.removeFromCart({ id: cartId, product }).then(() => {
      this.props.getCart();
    });
  };

  render() {
    const { cart } = this.state;
    return (
      <div>
        <Navbar />
        {isEmpty(cart.products) ? (
          <div
            className="empty-cart-border"
            style={{
              textAlign: "center",
              height: "100vh",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Empty description={<h2>Cart is empty</h2>} />
            <Link to="/">
              <Button type="primary" size="large">
                Keep Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div style={{ marginTop: "4em" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                flexDirection: "row",
                marginBottom: '1em'
              }}
            >
              <h1 style={{ marginBottom: "0px", marginRight: "auto", marginLeft: '1em' }}>Cart</h1>
              <h1 style={{ marginRight: '0px', marginBottom: "0px" }}>Total Price: ${this.totalCalculate()}</h1>
              <button className='checkOut'>Check Out<ArrowForwardIcon className="incon" /></button>
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1em",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              {cart.products.map((product) => (
                <div key={product.id} style={{ width: "auto" }}>
                  <img
                    alt={product.name}
                    src={
                      product.image ||
                      "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    }
                    style={{ objectFit: "cover", height: 200 }}
                  />
                  <div>
                  <p style={{ margin: "0px" }}>
                      <strong>Brand:</strong> {product.name}
                    </p>
                    <p style={{ margin: "0px" }}>
                      <strong>Brand:</strong> {product.brand}
                    </p>
                    <p style={{ margin: "0px" }}>
                      <strong>Category:</strong> {product.category}
                    </p>
                    <p style={{ margin: "0px" }}>
                      <strong>Price:</strong> ${product.price}
                    </p>
                    {/* <p style={{ margin: "0px" }}>
                      <strong>Quantity:</strong> {product.quantity}
                    </p> */}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "1em",
                      marginTop: "1em",
                    }}
                  >
                    <button
                      style={{
                        border: "1px solid green",
                        borderRadius: "5px",
                        color: "green",
                        backgroundColor: "transparent",
                      }}
                    >
                      Buy
                    </button>
                    <button
                      style={{
                        border: "1px solid red",
                        borderRadius: "5px",
                        color: "red",
                        backgroundColor: "transparent",
                      }}
                      onClick={(_) => this.removeCart(product)}
                    >
                      Remove from the cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div style={{
              width: "100%",
              height: "3em",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
            }}
            ><Link to='/'>Keep Browers...</Link></div>
          </div>
        )
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cartState: state.cart,
});

export default connect(mapStateToProps, { getCart, removeFromCart })(Cart);