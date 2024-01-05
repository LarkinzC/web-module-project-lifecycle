import React from 'react'
import axios from 'axios'
import Form from './Form'
import TodoList from './TodoList'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos: [],
    error: '',
    todoNameInput: '',
    displayCompleteds: true,
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

  //---//

  toggleCompleted = (id) => () => {
    axios.patch(`${URL}/${id}`) 
    .then(res => {
      this.setState({
        ...this.state, todos: this.state.todos.map(td => {
        if (td.id !== id) return td
        return res.data.data
         })
        })
    })
    .catch(this.setAxiosResponseError)
  }

  //---//

  toggleDisplayCompleteds = () => {
    this.setState({...this.state, displayCompleteds: !this.state.displayCompleteds})
  }

  render() {
    return (
      <div> 
        <div id='error'>{this.state.error}</div>
        <TodoList 
        todos={this.state.todos}
        displayCompleteds={this.state.displayCompleteds}
        toggleCompleted={this.toggleCompleted}
        />
        <Form 
        onTodoFormSubmit={this.onTodoFormSubmit}
        onTodoInputChange={this.onTodoInputChange}
        toggleDisplayCompleteds={this.toggleDisplayCompleteds}
        displayCompleteds={this.state.displayCompleteds} 
        todoNameInput={this.state.todoNameInput}
        />
      </div>
    )
  }
}
