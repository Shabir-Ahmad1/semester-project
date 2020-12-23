import React, { Component } from "react";
import axios from "axios";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";

export class AddEditModal extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = {
    data2: [],
    data: [],
    addEditModal: false,
  };

  handleSubmit(event) {
    event.preventDefault();

    const variables = {
      title: event.target.title.value,
      price: event.target.price.value,
      phone: event.target.phone.value,
      description: event.target.description.value,
      _id: this.props._id,
    };

    axios
      .put("http://localhost:5000/api/users/update/", variables)
      .then((response) => {
        if (response.data.success) {
          alert("Uploaded Successfully");
          setTimeout(() => {
            this.props.history.push("/");
          }, 1000);
        } else {
          alert("Added");
        }
      });
  }

  render() {
    const { t } = this.props;
    return (
      <div>
        {" "}
        <Modal
          {...this.props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton
          style={{backgroundColor:" #39405b", color:"white"}}
          >
            <Modal.Title id="contained-modal-title-vcenter">
              {t("EditAd.1")}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <Row>
                <Col sm={12}>
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="title">
                      <Form.Label>{t("Title.1")}</Form.Label>
                      <Form.Control
                        type="text"
                        name="title"
                        required
                        placeholder={t("title.1")}
                        defaultValue={this.props.title}
                      />
                    </Form.Group>

                    <Form.Group controlId="price">
                      <Form.Label>{t("Price.1")}</Form.Label>
                      <Form.Control
                        type="text"
                        name="price"
                        required
                        placeholder={t("Price.1")}
                      />
                    </Form.Group>

                    <Form.Group controlId="phone">
                      <Form.Label>{t("Phone.1")}</Form.Label>
                      <Form.Control
                        type="text"
                        name="phone"
                        placeholder={t("Phone.1")}
                      />
                    </Form.Group>
                    <Form.Group controlId="description">
                      <Form.Label>{t("Description.1")}</Form.Label>
                      <Form.Control
                        type="text"
                        name="description"
                        placeholder={t("Description.1")}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Button variant="primary" type="submit">
                        {t("UpdateAd.1")}
                      </Button>
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.props.onHide}>
              {t("Close.1")}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
