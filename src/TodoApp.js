import React from 'react'
import './TodoApp.css'

const Task = props =>
  <div>
    <label className="item">
      <input
        defaultChecked={props.task.completed}
        onClick={event => props.onCheckboxClick(event, props.task.id)}
        type="checkbox"
      />
      &nbsp;{props.task.text}
    </label>
  </div>

class TodoApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = { data: [], id: 0, input: "" }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggleTask = this.toggleTask.bind(this)
  }

  handleChange(event) {
    event.preventDefault()
    this.setState({ input: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    const { data, id, input } = this.state
    if (input.length > 0) {
      data.push({ text: input, completed: false, id })
      this.setState({ data, id: id + 1, input: "" })
    }
  }

  toggleTask(event, id) {
    event.preventDefault()
    const { data } = this.state
    const index = data.findIndex(task => task.id === id)
    if (index !== null) {
      data[index].completed = !data[index].completed
      this.setState({ data })
    }
  }

  render() {
    const { data, input } = this.state
    return (
      <div>
        <div className="toDoContainer">
          <h1>To-Do List</h1>
          <br />
          <div>
            <form onSubmit={this.handleSubmit}>
              <input
                className="addTaskBox"
                placeholder="+ Add Task"
                onChange={this.handleChange}
                value={input}
              />
            </form>
          </div>
          {data.filter(task => !task.completed).map((task, index) =>
            <Task task={task} key={index} onCheckboxClick={this.toggleTask} />
          )}
        </div>
        <div className="doneContainer">
          {data.filter(task => task.completed).map((task, index) =>
            <Task task={task} key={index} onCheckboxClick={this.toggleTask} />
          )}
        </div>
      </div>
    )
  }
}

export default TodoApp
