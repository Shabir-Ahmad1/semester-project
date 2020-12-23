import React, { useState, Component } from "react";
import { Table, Container, Button, ButtonToolbar, Form, Row, Col } from "react-bootstrap";
import "./Table.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { Switch, Modal } from "antd";
import axios from "axios";



class users extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    data: [],
  };

  componentDidMount() {
    this.getData();
  }

  getData() {
    fetch("http://localhost:5000/api/admin/getAll/users").then((response) => {
      response.json().then((result) => {
        this.setState({
          data: result,
        });
      });
    });
  }

  deletePost = (id) => {
    fetch("/api/admin/users/delete/" + id, {
      method: "Delete",
    }).then((result) => {
      result.json().then((resp) => {
        this.getData(); // Getting users after deleting.
      });
    });
  };

  update = (id, val) => {
    const variables = {
      _id: id,
      isApproved: val,
    };

    axios
      .put("http://localhost:5000/api/admin/update/", variables)
      .then((response) => {
        if (response.data.success) {
          alert("Uploaded Successfully");
          setTimeout(() => {
            this.props.history.push("/");
          }, 1000);
        } else {
          //alert("Added");
          this.getData();
        }
      });
  };


  showInfo() {
    Modal.info({
      title: 'User Posts',
      content: (
        <div>
          <Row>
            <Col sm={12}>

              <Form>
                <Form.Group controlId="name">
                  <Form.Label>Title 1</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                  />
                </Form.Group>


                <Form.Group controlId="lastname">
                  <Form.Label>Title 2</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastname"
                    placeholder={""}

                  />
                </Form.Group>

                <Form.Group controlId="email">
                  <Form.Label>Title 3</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder={""}

                  />

                </Form.Group>


              </Form>
            </Col>
          </Row>
        </div>
      ),
      onOk() { },
    });
  }

  render() {
    if (this.props.loading) {
      return <h2>Loading...</h2>;
    }

    return (
      <React.Fragment>

        <div style={{ marginTop: "20px" }}>
          {this.state.data ? (
            <div>
              <Container>
                {" "}
                <Table
                  responsive
                  bordered
                  hover
                >
                  <thead>
                    <tr>
                      <th style={{ width: "100px" }}>{"Image"}</th>
                      <th style={{ width: "100px" }}>{"User Name"}</th>
                      <th style={{ width: "100px" }}>{"Member Since"}</th>
                      <th style={{ width: "150px" }}>{"Email"}</th>
                      <th style={{ width: "50px" }}>{"Action"}</th>
                    </tr>
                  </thead>
                </Table>
              </Container>

              {this.state.data.map((user) => (
                <div className="class" style={{ marginBottom: "-12px" }}>
                  <Container>

                    <Table
                      responsive
                      bordered
                      hover
                    >
                      <tbody>
                        <tr>
                          <td style={{ width: "100px", height: "60px" }}>
                            <img
                              style={{ width: "100px", height: "60px" }}
                              alt="ads"
                              src={user.image}
                            />
                          </td>

                          <td style={{ width: "100px" }} >{user.name}</td>
                          <td style={{ width: "100px" }}>
                            {moment(user.createdAt).format("MMMM DD YYYY ")}
                          </td>
                          <td style={{ width: "150px" }}>{user.email}</td>

                          <td style={{ width: "50px" }}>
                            <Button
                              className="deletepost"
                              style={{
                                backgroundColor: "red",
                                width: "100%",
                                height: "25px",
                                alignContent: "center",
                                border: "none",
                                marginBottom: "1px",
                              }}
                              onClick={() => this.deletePost(user._id)}
                            >
                              <FontAwesomeIcon icon={faTrash} color="ivory" />
                            </Button>
                            <Button className="viewPosts"
                              style={{
                                backgroundColor: "lightblue",
                                width: "100%",
                                height: "25px",
                                alignContent: "center",
                                border: "none",
                              }}
                              onClick={this.showInfo}
                            >
                              <i class="fa fa-eye" aria-hidden="true"></i>
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </Table>

                  </Container>
                </div>
              ))}
            </div>
          ) : (
              <p>Please Wait...</p>
            )}

        </div>
      </React.Fragment>
    );
  }
}

export default users;
