import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Container, Button, ButtonToolbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { AddEditModal } from "./AddEditModal";

import userPic from "./userPic.png";
import "./getuser.css";

const renderfavoriteImage = (images) => {
  if (images.length > 0) {
    let image = images[0];
    return `http://localhost:5000/${image}`; // Funtion to set Images Path
  }
};

const status = (state) => {
  if (state === true) {
    return "Approved"; // If item.isApproved is false set to Pending else set to Approved.
  } else {
    return "Pending";
  }
};

class GetUser extends Component {
  state = {
    data2: [],
    data: [],
    addEditModal: false,
    textDisplay: false,
  };

  ToggleButton() {
    this.setState((currentState) => ({
      textDisplay: currentState.textDisplay,
    }));
  }

  componentDidMount() {
    fetch("/api/users/Dashboard/").then((
      res // Getting user info
    ) =>
      res.json().then((res2) => {
        console.log(res2);
        this.setState({
          data: res2,
        });
      })
    );

    this.getData(); // Getting user ads list
  }

  getData() {
    fetch("/api/users/posts").then((response) => {
      response.json().then((result) => {
        console.log(result);
        this.setState({
          data2: result,
        });
      });
    });
  }

  delete(id) {
    fetch("/api/users/delete/" + id, {
      method: "Delete",
    }).then((result) => {
      result.json().then((resp) => {
        this.getData(); // Getting user ads listing after deleting
      });
    });
  }

  render() {
    const users = this.state.data;
    const { title, price, phone, _id } = this.state;
    const { name } = this.state;
    let addModalClose = () => this.setState({ addEditModal: false });
    const { t } = this.props;

    return (
      <React.Fragment>
        <Container>
          <div className="main-section" >

            <div
              className="container-fluid mainWrapper"
              style={{ paddingLeft: 0, paddingRight: 0 }}
            >

              <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12" style={{ marginTop: "30px" }}>
                <div className="tab-wel"
                  style={{ fontWeight: 600, fontSize: "22px", color: "#575c6b" }}
                >
                  <span>
                    {t("Welcome.1")} <strong style={{ color: "black" }}>{users.name}</strong>{" "}
                    {t("ToBazarOnline.1")}
                  </span>
                </div>
              </div>
              </div>
              </div>
        </Container>

        <div style={{ marginTop: "50px", marginBottom: "50px" }}>
          <Container>
            <div style={{marginBottom:"10px"}}>
              <Button
                style={{
                  backgroundColor: "ivory", color: "#3b4151",
                  fontWeight: 200,
                  fontSize: "20px",
                  borderRadius: "none",
                  width: "100%",
                  borderColor: "#61affe"
                }}>
                {t("YourAdsList.1")}
              </Button>
            </div>
          </Container>
          {this.state.data ? (
            <div >

              <Container>
                <Table
                  responsive
                  bordered
                  hover
                >
                  <thead>
                    <tr>
                      <th >{t("Image.1")}</th>
                      <th >{t("AdName.1")}</th>
                      <th >{t("Status.1")}</th>
                      <th >{t("Price.1")}</th>
                      <th >{t("Date.1")}</th>
                      <th >{t("Description.1")}</th>
                      <th >{t("Action.1")}</th>
                    </tr>
                  </thead>
                </Table>
              </Container>

              {this.state.data2.map((item) => (
                <div className="class" style={{marginBottom:"-13px"}}>
                  <Container>
                    <Table
                      responsive
                      hover
                      size="sm"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <img
                              style={{ width: "70px" }}
                              alt="ads"
                              src={renderfavoriteImage(item.images)}
                            />
                          </td>
                          <td>{item.title}</td>
                          <td>{status(item.isApproved)}</td>
                          <td>{item.price}</td>
                          <td>{item.createdAt.slice(0, 10)}</td>
                          <td>{item.description}</td>

                          <td>
                            <Button
                              className="deletepost"
                              size="sm"
                                  style={{
                                    backgroundColor: "red",
                                    width: "100%",
                                    height: "25px",
                                    alignContent: "center",
                                    border: "none",
                                    marginTop: "1px",
                                  }}
                              onClick={() => this.delete(item._id)}
                            >
                              <FontAwesomeIcon icon={faTrash} color="ivory" />
                            </Button>

                            <span>
                              <ButtonToolbar>
                                <Button
                                  size="sm"
                                  style={{
                                    backgroundColor: "blue",
                                    width: "100%",
                                    height: "25px",
                                    alignContent: "center",
                                    border: "none",
                                    marginTop: "1px",
                                  }}
                                  onClick={() =>
                                    this.setState({
                                      addEditModal: true,
                                      title: item.title,
                                      price: item.price,
                                      phone: item.phone,
                                      _id: item._id,
                                    })
                                  }
                                >
                                  <FontAwesomeIcon
                                    icon={faEdit}
                                    color="ivory"
                                  />{" "}
                                </Button>

                                <AddEditModal
                                  t={t}
                                  show={this.state.addEditModal}
                                  onHide={addModalClose}
                                  title={title}
                                  price={price}
                                  phone={phone}
                                  _id={_id}
                                />
                              </ButtonToolbar>
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Container>
                </div>
              ))}
            </div>
          ) : (
              <p>{t("PleaseWait.1")}</p>
            )}
        </div>
      </React.Fragment>
    );
  }
}

export default GetUser;
