import React, { Component } from "react";

class EditPostuser extends Component {
  constructor() {
    super();
    this.state = {
      title: null,
      price: null,
      phone: null
    };
  }

  componentDidMount() {
    fetch("http://localhost:5000/api/users/post/" + this.props._id).then(
      res => {
        res.json().then(result => {
          console.warn(result);
          //      this.setState({});
        });
      }
    );
  }

  update() {
    fetch("http://localhost:5000/api/users/post/update/" + this.props._id, {
      method: "PUT",
      headers: {
        "Contents-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(
        result => {
          alert(result + "Addedd");
        },
        err => {
          alert(err);
        }
      );
  }
  state = {};
  render() {
    return (
      <React.Fragment>
        <div style={{ textAlign: "center", fontSize: "20px" }}>Edit Ad</div>
        <center>
          <div>
            <input
              onChange={event => {
                this.setState({ title: event.target.value });
              }}
              placeholder="Title "
            />
            <br />
            <br />
            <input
              onChange={event => {
                this.setState({ phone: event.target.value });
              }}
              placeholder="Phone "
            />
            <br />
            <br />
            <input
              onChange={event => {
                this.setState({ price: event.target.value });
              }}
              placeholder="Price "
            />
            <br />
            <br />

            <button
              onClick={() => {
                this.update();
              }}
            >
              Update
            </button>
          </div>
        </center>
      </React.Fragment>
    );
  }
}

export default EditPostuser;
