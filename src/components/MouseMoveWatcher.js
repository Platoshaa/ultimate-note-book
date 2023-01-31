import React from "react";
export class MouseMoveWatcher extends React.Component {
  constructor() {
    super();
    this.state = { x: "", y: "" };
    this.handleMouse = this.handleMouse.bind(this);
  }
  handleMouse(e) {
    this.setState({ x: e.pageX, y: e.pageY });
  }
  render() {
    return (
      <div onMouseMove={this.handleMouse}>
        coordinates:X {this.state.x},Y{this.state.y}
      </div>
    );
  }
}
