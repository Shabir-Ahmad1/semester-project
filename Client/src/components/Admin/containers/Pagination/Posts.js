import React, { useState, Component } from "react";
import { Table, Container, Button, ButtonToolbar } from "react-bootstrap";
import "./Table.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { Switch } from "antd";
import axios from "axios";


class Posts extends Component {
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
    fetch("http://localhost:5000/api/admin/getAll/posts").then((response) => {
      response.json().then((result) => {
        console.log(result);
        this.setState({
          data: result,
        });
      });
    });
  }

  

  deletePost = (id) => {
    fetch("/api/admin/delete/" + id, {
      method: "Delete",
    }).then((result) => {
      result.json().then((resp) => {
        this.getData(); // Getting user ads listing after deleting
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

  render() {
    if (this.props.loading) {
      return <h2>Loading...</h2>;
    }

    return (
      <React.Fragment>
        <div style={{marginTop: "20px"}}>
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
                      <th style={{ width: "100px" }}>{"Title"}</th>
                      <th style={{ width: "100px" }}>{"Date"}</th>
                      <th style={{ width: "150px" }}>{"Report"}</th>
                      <th style={{ width: "100px" }}>{"Category"}</th>
                      <th style={{ width: "50px" }}>{"Status"}</th>
                      <th style={{ width: "50px" }}>{"Action"}</th>
                    </tr>
                  </thead>
                </Table>
              </Container>

              {this.state.data &&
                this.props.posts.map((item, user) => (
                  <div className="class" style={{marginBottom:"-12px"}}>
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
                              src={item.image}
                            />
                          </td>

                            <td style={{ width: "100px", overflow:"auto", height: "60px" }}> {item.title} </td>
                            <td style={{ width: "100px" }}>
                              {" "}
                              {moment(item.createdAt).format(
                                "MMMM DD YYYY "
                              )}{" "}
                            </td>
                            <td style={{ width: "150px" }}> {item.report} </td>
                            <td style={{ width: "100px" }}>
                              {" "}
                              {item.Category}{" "}
                            </td>

                            <td style={{ width: "50px" }}>
                              <Switch
                                checkedChildren="Approved"
                                unCheckedChildren="Pending"
                                defaultChecked={item.isApproved}
                                onClick={() =>
                                  this.update(item._id, item.isApproved)
                                }
                              />
                            </td>

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
                                onClick={() => this.deletePost(item._id)}
                              >
                                <FontAwesomeIcon icon={faTrash} color="ivory" />
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

export default Posts;
