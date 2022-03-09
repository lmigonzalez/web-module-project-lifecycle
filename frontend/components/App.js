import React from "react";
import axios from "axios";

import Form from "./Form";
import TodoList from "./TodoList";

const URL = "http://localhost:9000/api/todos";

const initialState = {
  successMessage: "",
  todos: [],
  nameInput: "",
  displayCompleted: true,
};

export default class App extends React.Component {
  state = initialState;

  componentDidMount() {
    this.getTodos();
  }

  getTodos = () => {
    axios
      .get(URL)
      .then((res) => {
       
        this.setState({
          ...this.state,
          todos: res.data.data,
          successMessage: res.data.message,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onSubmit = (event) => {
    event.preventDefault();
    const newTodo = {
      name: this.state.nameInput,
    };

    axios
      .post(URL, newTodo)
      .then((res) => {
        this.setState({
          ...this.state,
          todos: [...this.state.todos, res.data.data],
        });
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  onChange = (event) => {
    this.setState({
      ...this.state,
      nameInput: event.target.value,
    });
  };

  flipValue = (id) => () => {
    axios
      .patch(`${URL}/${id}`)
      .then((res) => {
        this.setState({
          ...this.state,
          todos: this.state.todos.map((todo) => {
            if (todo.id !== id) return todo;
            return res.data.data;
          }),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  toggleDisplayCompleted = () => {
    this.setState({
      ...this.state,
      displayCompleted: !this.state.displayCompleted,
    });
  };

  render() {
    return (
      <div>
        
          <TodoList 
          flipValue={this.flipValue} 
          todos ={this.state.todos} 
          displayCompleted = {this.state.displayCompleted}
          />
          <Form onSubmit={this.onSubmit} onChange={this.onChange}  />
        
        <button onClick={this.toggleDisplayCompleted}>
          {this.state.displayCompleted ? "Hide" : "Show"} Completed
        </button>
      </div>
    );
  }
}
