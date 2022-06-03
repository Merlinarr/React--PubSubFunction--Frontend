import React, { Component } from "react";
import PubSub from "pubsub-js";
import "./index.css";

export default class index extends Component {
  state = { users: [], isFirst: true, isLoading: false, err: "" };
  componentDidMount() {
    this.token = PubSub.subscribe("Merlin", (msg, data) => {
      this.setState(data);
    });
  }
  componentWillUnmount() {
    PubSub.unsubscribe(this.token);
  }
  render() {
    const { state: stateData } = this;
    return (
      <div className="row">
        {stateData.isFirst ? (
          <h2>Enter a name please</h2>
        ) : stateData.isLoading ? (
          <h2>Loading...</h2>
        ) : stateData.err ? (
          <h2>{stateData.err}</h2>
        ) : (
          stateData.users.map((item) => {
            return (
              <div className="card" key={item.id}>
                <a href={item.html_url} target="_blank" rel="noreferrer">
                  <img
                    src={item.avatar_url}
                    style={{ width: "100px" }}
                    alt="info"
                  />
                </a>
                <p className="card-text">{item.login}</p>
              </div>
            );
          })
        )}
      </div>
    );
  }
}
