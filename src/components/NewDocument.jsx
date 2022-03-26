import React, { Component } from "react";

export default class NewDocument extends Component {
  render() {
    const { name, place, date, fathers_name, mothers_name } = this.props.data;

    return (
      <div
        style={{
          margin: "4rem",
          padding: "2rem",
          maxWidth: "400px",
          border: "2px solid blue",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          fontWeight: "bold",
          color: "purple",
          background: "yellow",
        }}
      >
        <h1>Birth Certificate</h1>
        <p>Name: {name}</p>
        <p>Place: {place}</p>
        <p>Date:{date} </p>
        <p>Fathers Name:{fathers_name} </p>
        <p>Mothers Name:{mothers_name} </p>
      </div>
    );
  }
}
