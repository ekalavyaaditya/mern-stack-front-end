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
  Box,
  Typography,
  Grid,
  Divider,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import { message, Popconfirm } from "antd";

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
    message.success("Good Choose");
  };

  confirm = (e) => {
    e.preventDefault();
    this.props.deletaAccount(this.props.history);
    this.setState({ isAuthenticated: false });
    message.warning("Task deleted successfully");
  };

  displayProfile = (profile) => {
    return (
      <Box
        sx={{
          border: "1px solid #e0e0e0",
          borderRadius: 2,
          padding: 3,
          boxShadow: 1,
          maxWidth: "800px",
          margin: "auto",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Profile Information
        </Typography>
        <Divider sx={{ marginY: 2 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <ProfileField label="Address" value={profile.address} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProfileField label="Website" value={profile.website} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProfileField label="Bio" value={profile.bio} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProfileField label="Created" value={profile.created} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              Social Media
            </Typography>
            <Divider sx={{ marginY: 2 }} />
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
          </Grid>
          <Button
            variant="contained"
            onClick={this.handleOpen}
            style={{ margin: "auto" }}
          >
            Edit Profile
          </Button>
          <Popconfirm
            title="Do u want to delete youe account"
            description="Are you sure to delete this account?"
            onConfirm={this.confirm}
            onCancel={this.cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button variant="contained" style={{ margin: "auto" }}>
              Delete
            </Button>
          </Popconfirm>
        </Grid>
        {this.renderModal()}
      </Box>
    );
  };

  renderModal = () => {
    return (
      <Modal
        open={this.state.open}
        onClose={this.handleClose}
        closeAfterTransition
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "60%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 500, md: 700 },
            height: { xs: "90%", sm: 500, md: 700 },
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            overflow: "scroll",
            overflowX: "hidden",
          }}
        >
          <Typography variant="h6" component="h2">
            Edit Profile
          </Typography>
          <form onSubmit={this.onSubmit}>
            <TextField
              fullWidth
              label="Website"
              name="website"
              value={this.state.website}
              onChange={this.onChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={this.state.address}
              onChange={this.onChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Bio"
              name="bio"
              multiline
              rows={4}
              value={this.state.bio}
              onChange={this.onChange}
              margin="normal"
            />
            <Typography variant="h6" gutterBottom>
              Social Media
            </Typography>
            <TextField
              fullWidth
              label="Facebook"
              name="facebook"
              value={this.state.facebook}
              onChange={this.onChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Twitter"
              name="twitter"
              value={this.state.twitter}
              onChange={this.onChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Instagram"
              name="instagram"
              value={this.state.instagram}
              onChange={this.onChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="YouTube"
              name="youtube"
              value={this.state.youtube}
              onChange={this.onChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="LinkedIn"
              name="linkedin"
              value={this.state.linkedin}
              onChange={this.onChange}
              margin="normal"
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 2,
              }}
            >
              <Button
                onClick={this.handleClose}
                variant="contained"
                color="primary"
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Save Profile
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    );
  };
  render() {
    return (
      <div style={{
        margin: "auto",
        height: "70%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}>
        {this.state.profile ? (
          <Fragment>{this.displayProfile(this.state.profile)}</Fragment>
        ) : (
          <Fragment>
            <Typography variant="h4" align="center">Create a profile</Typography>
            <Link
              className="btn btn-primary"
              to="/dashboard/addprofile"
              style={{ fontSize: "15px", border: "none", width: "20%", height: "auto" }}
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
    }}
  >
    <Typography variant="subtitle1" color="textSecondary" gutterBottom>
      {label}:
    </Typography>
    <Typography variant="body1" paragraph>
      {value}
    </Typography>
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
