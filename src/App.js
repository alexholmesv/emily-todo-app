import React, { Component } from 'react';
import './App.css';


class App extends Component {

  state = {
    todos: [
      { id: 1, title: "Limpiar caca del perro", content: "Me da un poco de asco", isComplete: false },
      { id: 2, title: "Barrer el patio", content: "Sólo después de limpiar la caca", isComplete: false }
    ],
    isComplete: false,
    visibilityFilter: "all"
  }

  toggleCompleted(id) {
    this.setState({
      todos: this.state.todos.map(todo =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo)
    })
  }

  render() {
    return (
      <div className="container">
        <div className="todo-index">
          <ListHeader header="Mis Tareas" />
          <div>
            <ListBody
              todos={this.state.todos}
              toggleCompleted={id => this.toggleCompleted(id)} //es lo mismo que this.toggleCompleted.bind(this)
            />
          </div>
        </div>
      </div>
    );
  }
}

class ListHeader extends Component {
  render() {
    const now = new Date();
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="list-header">
            <div className="title-time">{now.toString()}</div>
            <h1>{this.props.header}</h1>
          </div>
        </div>
      </div>
    )
  }
}

class ListBody extends Component {

  render() {
    const { todos, toggleCompleted } = this.props

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="list-body">
            {todos.map(todo =>
              <Item
                title={todo.title}
                content={todo.content}
                isComplete={todo.isComplete}
                toggleCompleted={() => toggleCompleted(todo.id)} />
            )}
          </div>
        </div>
      </div>
    )
  }
}


class Item extends Component {

  render() {

    const { toggleCompleted, isComplete, title, content } = this.props

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="todo-card" >
            <div className={isComplete ? "complete" : ""}>
              <h1>{title}</h1>
              <p>{content}</p>
              <h3>{isComplete ? "COMPLETO" : ""}</h3>
              <a className={isComplete ? "btn btn-card fa hvr-icon-fade fa-2x btn-active" : "btn btn-card fa-2x hvr-icon-fade"}
                onClick={toggleCompleted}></a>
            </div>
          </div>
        </div>
      </div>
    )

  }
}

export default App;

