import React from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos: [],
    error: '',
    todoNameInput: '',
  }

  fetchAllTodos = () => {
    axios.get(URL)
    .then(res =>  {
      this.setState({...this.state, todos: res.data.data})
    })
    .catch(err => {
      this.setState({...this.state, error: err.response.data.message})
    })
  }

  postNewTodo = () => {

  }


  componentDidMount() {
    this.fetchAllTodos()
  }

  onTodoInputChange = (e) => {
    const {value} = e.target
    this.setState({...this.state, todoNameInput: value})
  }


  render() {
    return (
      <div>
        <div id='error'>Error: {this.state.error}</div>
        <div id='todos'>
          <h2>Todos:</h2>
          {
            this.state.todos.map(td => {
              return <div key={td.id}>{td.name}</div>
            })
          }
        </div>
        <form id="todoForm">
          <input onChange={this.onTodoInputChange} value={this.state.todoNameInput} type='text' placeholder='Type todo'></input>
          <input type='submit'></input>
          <button>Clear Completed</button>
        </form> 
      </div>
    )
  }
}
