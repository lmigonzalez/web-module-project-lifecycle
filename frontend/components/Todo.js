import React from "react";

export default class Todo extends React.Component {
  render() {

    return (
      <li onClick={this.props.flipValue(this.props.todo.id)}>
        {this.props.todo.name} {this.props.todo.completed ? <span>✔️</span> : <span>❌</span>}
      </li>
    );
  }
}
