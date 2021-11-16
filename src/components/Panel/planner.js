import React, { Component } from "react";

import { Button, Input } from "@salesforce/design-system-react";

import { PanelContainer } from "./styles.js";

class PanelComponent extends Component {
  state = {
    search: {
      owner: this.props.search.owner,
      name: this.props.search.name,
    },
  };

  onKeyPress = (e) => {
    if (e.key === "Enter") {
      this.props.onSearch(this.state.search);
    }
  };

  handleChange = (key, value) =>
    this.setState({ search: { ...this.state.search, [key]: value } });

  render() {
    return (
      <PanelContainer>
        <Input
          onKeyPress={(e) => this.onKeyPress(e)}
          onChange={(e) => this.handleChange("owner", e.target.value)}
          defaultValue={this.props.search.owner}
          type="text"
          label="Search by Owner"
        />
        <Input
          onKeyPress={(e) => this.onKeyPress(e)}
          onChange={(e) => this.handleChange("name", e.target.value)}
          defaultValue={this.props.search.name}
          type="text"
          label="Search by Name"
        />
        <Input
          onKeyPress={(e) => this.onKeyPress(e)}
          onChange={(e) => this.handleChange("region", e.target.value)}
          defaultValue={this.props.search.name}
          type="text"
          label="Search by Region"
        />
        <Button
          onClick={() => this.props.onSearch(this.state.search)}
          className="slds-m-top_small"
          label="Search"
          variant="brand"
        />
      </PanelContainer>
    );
  }
}

export default PanelComponent;
