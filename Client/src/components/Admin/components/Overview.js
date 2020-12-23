import React from "react";
import HCard from "./HCard";
import { Table, Tag } from "antd";

class Overview extends React.Component {
  state = {
    ads: [],
    users: [],
    pendingAds: "",
  };

  async componentDidMount() {
    await this.getAllAds();
    await this.getAllUsers();
    await this.getAllPendingAds();
  }

  getAllAds() {
    fetch("http://localhost:5000/api/admin/getAll/posts")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ ads: data });
      });
  }
  getAllUsers() {
    fetch("http://localhost:5000/api/admin/getAll/users")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ users: data });
      });
  }

  getAllPendingAds() {
    fetch("http://localhost:5000/api/admin/getAll/posts/pendingAds")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ pendingAds: data });
      });
  }

  render() {
    return (
      <section className="overview">
        <div className="row">
          <div className="col-sm-3">
            <HCard
              iconName="users"
              backgroundColor="tealBG"
              label="users"
              number={this.state.users.length}
            />
          </div>
          <div className="col-sm-3">
            <HCard
              iconName="tags"
              backgroundColor="pinkBG"
              label="Total Ads"
              number={this.state.ads.length}
            />
          </div>
          <div className="col-sm-3">
            <HCard
              iconName="tags"
              backgroundColor="amberBG"
              label="Pending Ads"
              number={this.state.pendingAds.length}
            />
          </div>
          <div className="col-sm-3 ">
            <HCard
              iconName="bar-chart"
              backgroundColor="cyanBG"
              label="Approved Ads"
              number={this.state.ads.length - this.state.pendingAds.length}
            />
          </div>
          <div>
            <h1>Testing Ad Data</h1>
            <Table dataSource={this.state.ads} />
          </div>
        </div>
      </section>
    );
  }
}

export default Overview;
