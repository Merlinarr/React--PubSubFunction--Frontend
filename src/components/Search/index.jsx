import React, { Component } from "react";
import PubSub from "pubsub-js";
import axios from "axios";
export default class index extends Component {
  search = () => {
    const inputValue = this.keyWordelement.value;
    PubSub.publish("Merlin", { isFirst: false, isLoading: true });

    axios.get(`http://localhost:3000/api/search/users?q=${inputValue}`).then(
      (response) => {
        PubSub.publish("Merlin", {
          isLoading: false,
          users: response.data.items,
        });
      },
      (error) => {
        PubSub.publish("Merlin", { err: error.message, isLoading: false });
      }
    );
  };
  render() {
    return (
      <section className="jumbotron">
        <h3 className="jumbotron-heading">Search Github Users</h3>
        <div>
          <input
            ref={(c) => (this.keyWordelement = c)}
            type="text"
            placeholder="enter the name you search"
          />
          &nbsp;<button onClick={this.search}>Search</button>
        </div>
      </section>
    );
  }
}
