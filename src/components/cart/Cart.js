import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";
import { Empty, Button } from "antd";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowLeftOutlined from '@mui/icons-material/ArrowForward';
import { getCart, removeFromCart } from "../../actions/cartAction";
import { getServer } from "../../utill";
import Navbar from "../general/Navbar";
import './Cart.css';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: {},
    };
  }

  componentDidMount() {
    this.props.getCart();
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
        total += product.price // Adjusted for quantity
      });
    }
    return total;
  };

  removeCart = async (product) => {
    try {
      const cartId = this.state.cart._id;
      await this.props.removeFromCart({ id: cartId, product });
      this.props.getCart();
    } catch (error) {
      console.error('Error removing item from cart:', error);
      alert('Failed to remove item. Please try again.');
    }
  };

  handlePayment = async (product, e) => {
    e.preventDefault();
    const amount = product.price;
    const currency = 'INR';
    const receiptId = 'order_rcptid_11';
    const response = await fetch(`${getServer()}/api/payment`, {
      method: 'POST',
      body: JSON.stringify({
        amount,
        currency,
        receipte: receiptId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const order = await response.json();
    const options = {
      key: 'rzp_test_X5t56BSYv4Rlco', // Replace with your Razorpay key_id
      amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency,
      name: 'Acme Corp',
      description: 'Test Transaction',
      order_id: order.id, // This is the order_id created in the backend
      callback_url: 'http://localhost:3000/payment-success', // Your success URL
      "handler": function (response) {
        if (response.razorpay_payment_id) {
          alert('Payment Successful');
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature);
        } else {
          alert('Payment Failed');
        }
      },
      prefill: {
        name: 'Gaurav Kumar',
        email: 'gaurav.kumar@example.com',
        contact: '9999999999'
      },
      theme: {
        color: '#00aeff'
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', function (response) {
      console.log("response==>", response);
      alert(response.error.code);
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
    e.preventDefault();
  };

  checkOut = async (e) => {
    e.preventDefault();
    const total = this.totalCalculate();
    const amount = total;
    const currency = 'INR';
    const receiptId = 'order_rcptid_11';
    const response = await fetch(`${getServer()}/api/payment`, {
      method: 'POST',
      body: JSON.stringify({
        amount,
        currency,
        receipte: receiptId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const order = await response.json();
    const options = {
      key: 'rzp_test_X5t56BSYv4Rlco', // Replace with your Razorpay key_id
      amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency,
      name: 'Acme Corp',
      description: 'Test Transaction',
      order_id: order.id, // This is the order_id created in the backend
      callback_url: 'http://localhost:3000/payment-success', // Your success URL
      "handler": function (response) {
        if (response.razorpay_payment_id) {
          alert('Payment Successful');
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature);
        } else {
          alert('Payment Failed');
        }
      },
      prefill: {
        name: 'Gaurav Kumar',
        email: 'gaurav.kumar@example.com',
        contact: '9999999999'
      },
      theme: {
        color: '#00aeff'
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', function (response) {
      console.log("response==>", response);
      alert(response.error.code);
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
    e.preventDefault();
  };

  render() {
    const { cart } = this.state;
    return (
      <div>
        <Navbar />
        {isEmpty(cart.products) ? (
          <div className="empty-cart-border" style={{
            marginTop: "15em",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <Empty description={<h2>Cart is empty</h2>} />
            <Link to="/">
              <Button type="primary" size="large">Keep Shopping</Button>
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
                marginBottom: '1em',
              }}
            >
              <h1>Cart</h1>
              <h1>Total Price: ₹{this.totalCalculate()}</h1>
              <button
                className='checkOut'
                onClick={(e) => this.checkOut(e)}
                disabled={this.state.isProcessing} // Disable while processing payment
              >
                Check Out <ArrowForwardIcon />
              </button>
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
                <div key={product.id}>
                  <img
                    alt={product.name}
                    src={product.image || "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"}
                    style={{ objectFit: "cover", height: 200 }}
                  />
                  <div>
                    <p><strong>Brand:</strong> {product.name}</p>
                    <p><strong>Brand:</strong> {product.brand}</p>
                    <p><strong>Category:</strong> {product.category}</p>
                    <p><strong>Price:</strong>₹{product.price}</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "1em",
                      marginTop: "1em",
                    }}
                  >
                    <Button
                      onClick={(e) => this.handlePayment(product, e)}
                      disabled={this.state.isProcessing} // Disable while processing payment
                      id="ant-btn-default"
                    >
                      Buy
                    </Button>
                    <Button
                      id="removeCartButton"
                      onClick={() => this.removeCart(product)}
                    >
                      Remove from the cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                width: "100%",
                height: "3em",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link to="/" id="checkOut" className="checkOut" style={{ textDecoration: 'none', width: 'auto', padding: '0px 1em' }}>
                <ArrowLeftOutlined id="backarrow" /> Keep Browsing...
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cartState: state.cart,
});

export default connect(mapStateToProps, { getCart, removeFromCart })(Cart);