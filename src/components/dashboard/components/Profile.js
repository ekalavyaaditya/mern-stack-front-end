import React, { Component, Fragment } from "react";
import {
  getProfile,
  createProfile,
  deletaAccount,
} from "../../../actions/profileAction";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { decodeUser } from "../../../utill";
import {
  Button,
  Modal,
  Input,
  Row,
  Col,
  Typography,
  Divider,
  message,
  Popconfirm,
} from "antd";

const { Title, Text } = Typography;
const { TextArea } = Input;

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
      open: false,
      website: "",
      address: "",
      bio: "",
      facebook: "",
      twitter: "",
      instagram: "",
      youtube: "",
      linkedin: "",
    };
  }
  componentDidMount() {
    this.props.getProfile(decodeUser().user.id);
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.profile.profile &&
      this.props.profile.profile !== prevProps.profile.profile
    ) {
      const { profile } = this.props.profile;
      this.setState({
        profile,
        website: profile.website || "",
        address: profile.address || "",
        bio: profile.bio || "",
        facebook: profile.socialMedia?.facebook || "",
        twitter: profile.socialMedia?.twitter || "",
        instagram: profile.socialMedia?.instagram || "",
        youtube: profile.socialMedia?.youtube || "",
        linkedin: profile.socialMedia?.linkedin || "",
      });
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.createProfile(this.state);
    this.setState({ open: false });
  };

  cancel = (e) => {
    message.success("Good Choice");
  };

  confirm = (e) => {
    e.preventDefault();
    this.props.deletaAccount(this.props.history);
    this.setState({ isAuthenticated: false });
    message.warning("Task deleted successfully");
  };

  displayProfile = (profile) => {
    return (
      <div
        style={{
          border: "1px solid #e0e0e0",
          borderRadius: 8,
          padding: 24,
          boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
          maxWidth: "800px",
          margin: "auto",
          backgroundColor: "#fff"
        }}
      >
        <Title level={4} style={{ marginBottom: 16 }}>
          Profile Information
        </Title>
        <Divider style={{ margin: "16px 0" }} />
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <ProfileField label="Address" value={profile.address} />
          </Col>
          <Col xs={24} md={12}>
            <ProfileField label="Website" value={profile.website} />
          </Col>
          <Col xs={24} md={12}>
            <ProfileField label="Bio" value={profile.bio} />
          </Col>
          <Col xs={24} md={12}>
            <ProfileField label="Created" value={profile.created} />
          </Col>
          <Col xs={24}>
            <Text type="secondary" style={{ fontSize: '1rem', display: 'block', marginBottom: 8 }}>
              Social Media
            </Text>
            <Divider style={{ margin: "16px 0" }} />
            {profile.socialMedia && (
              <div>
                <ProfileField
                  label="Facebook"
                  value={profile.socialMedia.facebook}
                />
                <ProfileField
                  label="Instagram"
                  value={profile.socialMedia.instagram}
                />
                <ProfileField
                  label="LinkedIn"
                  value={profile.socialMedia.linkedin}
                />
                <ProfileField
                  label="Twitter"
                  value={profile.socialMedia.twitter}
                />
                <ProfileField
                  label="YouTube"
                  value={profile.socialMedia.youtube}
                />
              </div>
            )}
          </Col>
          <div style={{ display: 'flex', gap: '10px', margin: 'auto' }}>
            <Button
              type="primary"
              onClick={this.handleOpen}
            >
              Edit Profile
            </Button>
            <Popconfirm
              title="Do you want to delete your account?"
              description="Are you sure to delete this account?"
              onConfirm={this.confirm}
              onCancel={this.cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" danger>
                Delete
              </Button>
            </Popconfirm>
          </div>
        </Row>
        {this.renderModal()}
      </div>
    );
  };

  renderModal = () => {
    return (
      <Modal
        open={this.state.open}
        onCancel={this.handleClose}
        title="Edit Profile"
        footer={null}
      >
        <form onSubmit={this.onSubmit}>
          <div style={{ marginBottom: 16 }}>
            <Text strong>Website</Text>
            <Input
              name="website"
              value={this.state.website}
              onChange={this.onChange}
              placeholder="Website"
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <Text strong>Address</Text>
            <Input
              name="address"
              value={this.state.address}
              onChange={this.onChange}
              placeholder="Address"
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <Text strong>Bio</Text>
            <TextArea
              name="bio"
              rows={4}
              value={this.state.bio}
              onChange={this.onChange}
              placeholder="Bio"
              style={{ width: "100%" }}
            />
          </div>

          <Title level={5} style={{ marginTop: 24, marginBottom: 16 }}>
            Social Media
          </Title>

          <div style={{ marginBottom: 16 }}>
            <Text strong>Facebook</Text>
            <Input
              name="facebook"
              value={this.state.facebook}
              onChange={this.onChange}
              placeholder="Facebook"
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <Text strong>Twitter</Text>
            <Input
              name="twitter"
              value={this.state.twitter}
              onChange={this.onChange}
              placeholder="Twitter"
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <Text strong>Instagram</Text>
            <Input
              name="instagram"
              value={this.state.instagram}
              onChange={this.onChange}
              placeholder="Instagram"
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <Text strong>YouTube</Text>
            <Input
              name="youtube"
              value={this.state.youtube}
              onChange={this.onChange}
              placeholder="YouTube"
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <Text strong>LinkedIn</Text>
            <Input
              name="linkedin"
              value={this.state.linkedin}
              onChange={this.onChange}
              placeholder="LinkedIn"
              style={{ width: "100%" }}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 24,
              gap: 8
            }}
          >
            <Button
              onClick={this.handleClose}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Save Profile
            </Button>
          </div>
        </form>
      </Modal>
    );
  };
  render() {
    return (
      <div style={{
        margin: "auto",
        height: "33em",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}>
        {this.state.profile ? (
          <Fragment>{this.displayProfile(this.state.profile)}</Fragment>
        ) : (
          <Fragment>
            <Title level={3} style={{ textAlign: "center" }}>Create a profile</Title>
            <Link
              className="btn btn-primary"
              to="/dashboard/addprofile"
              style={{ fontSize: "15px", border: "none", width: "auto", padding: "10px 20px", height: "auto" }}
            >
              Click Here To Create Profile
            </Link>
          </Fragment>
        )}
      </div>
    );
  }
}

const ProfileField = ({ label, value }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      marginBottom: 8
    }}
  >
    <Text type="secondary" style={{ marginRight: 8 }}>
      {label}:
    </Text>
    <Text>
      {value}
    </Text>
  </div>
);

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getProfile,
  createProfile,
  deletaAccount,
})(withRouter(Profile));
