import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import { createProfile } from "../../../actions/profileAction";
import { connect } from 'react-redux';
import { message } from "antd";
import './AddProfile.css';

class AddProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      bio: "",
      website: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      twitter: "",
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.bio.length <= 0) {
      return message.error("Your bio is required");
    }
    if (this.state.address.length <= 0) {
      return message.error("Your address is required");
    }
    this.props.createProfile(this.state ,this.props.history);
  };
  render() {
    const { address, bio, website, facebook, linkedin, youtube, instagram, twitter } = this.state;
    return (
      <div className="add-profile-container" 
      sx={{
        overflow:'scroll',
      }}>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Website:</label>
            <input type="text" name="website" value={website} onChange={this.onChange} />
          </div>
          <div>
            <label>Address:</label>
            <input type="text" name="address" value={address} onChange={this.onChange} />
          </div>
          <div>
            <label>Bio:</label>
            <textarea name="bio" value={bio} onChange={this.onChange}></textarea>
          </div>
          <div>
            <h4>Social Media</h4>
            <label>Facebook:</label>
            <input type="text" name="facebook" value={facebook} onChange={this.onChange} />
            <label>Twitter:</label>
            <input type="text" name="twitter" value={twitter} onChange={this.onChange} />
            <label>Instagram:</label>
            <input type="text" name="instagram" value={instagram} onChange={this.onChange} />
            <label>Youtube:</label>
            <input type="text" name="youtube" value={youtube} onChange={this.onChange} />
            <label>LinkedIn:</label>
            <input type="text" name="linkedin" value={linkedin} onChange={this.onChange} />
          </div>
          <button type="submit">Add Profile</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, { createProfile })(withRouter(AddProfile));