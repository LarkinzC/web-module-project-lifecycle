import React from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos: [],
    error: '',
    todoNameInput: '',
  }

  //---//

  fetchAllTodos = () => {
    axios.get(URL)
    .then(res =>  {
      this.setState({...this.state, todos: res.data.data})
    })
    .catch(this.setAxiosResponseError)
  }

  //---//

  componentDidMount() {
    this.fetchAllTodos()
  }

  //---//

  onTodoInputChange = (e) => {
    const {value} = e.target
    this.setState({...this.state, todoNameInput: value})
  }

  //---/

  resetForm = () => {
    this.setState({...this.state, todoNameInput: ''})
  }

//---//

  setAxiosResponseError = (err) => {
    this.setState({...this.state, error: err.response.data.message})
  }

  //---//

  postNewTodo = () => {
    const payload = this.state.todoNameInput
    axios.post(URL, { name: payload})
    .then(res => {
      this.setState({...this.state, todos: this.state.todos.concat(res.data.data)})
    })
    .catch(this.setAxiosResponseError)
    .finally(
      this.resetForm()
    )
  }

  //---//

  onTodoFormSubmit = (e) => {
    e.preventDefault()
    this.postNewTodo()
  }



  render() {
    return (
      <div>
        <div id='error'>{this.state.error}</div>
        <div id='todos'>
          <h2>Todos:</h2>
          {
            this.state.todos.map(td => {
              return <div key={td.id}>{td.name}</div>
            })
          }
        </div>
        <form id="todoForm" onSubmit={this.onTodoFormSubmit}>
          <input onChange={this.onTodoInputChange} value={this.state.todoNameInput} type='text' placeholder='Type todo'></input>
          <input type='submit'></input>
          <button>Clear Completed</button>
        </form> 
      </div>
    )
  }
}
