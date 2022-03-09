import React from 'react'

export default class Form extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
          <input
            value={this.props.nameInput}
            onChange={this.props.onChange}
            type="text"
            placeholder="type text"
          />
          <input type="submit" />
        </form>
    )
  }
}
