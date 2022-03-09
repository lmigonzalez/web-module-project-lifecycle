import React from 'react'

import Todo from './Todo'

export default class TodoList extends React.Component {
  render() {
    return(
      <ul>
          {
            this.props.todos.reduce((acc, todo)=>{
              // console.log(todo)
              if(this.props.displayCompleted || !todo.completed) return acc.concat(
                <Todo 
                key={todo.id}
                todo={todo} 
                flipValue={this.props.flipValue}/>
              )
              return acc
            }, [])
          }
        </ul>
    )
  }
}
