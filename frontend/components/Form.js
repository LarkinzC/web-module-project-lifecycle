import React from 'react'

export default class Form extends React.Component {

  

  render() {
    return (
      <>
      <form id="todoForm" onSubmit={this.props.onTodoFormSubmit}>
          <input 
            onChange={this.props.onTodoInputChange} 
            value={this.props.todoNameInput} 
            type='text' 
            placeholder='Type todo'></input>
          <input 
            type='submit'>
          </input>
        </form>
        <button 
          onClick={this.props.toggleDisplayCompleteds}>
          {this.props.displayCompleteds ? 'Hide' : 'Show' } completed
          </button>
      </>
    )
  }
}
