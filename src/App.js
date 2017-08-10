import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import './App.css';

const makeId = () => Math.random().toString(36).substring(2)

class App extends Component {

  state = {
    todos: [
      { id: 1, title: "Limpiar caca del perro", content: "Me da un poco de asco", isComplete: false },
      { id: 2, title: "Barrer el patio", content: "Sólo después de limpiar la caca", isComplete: false }
    ],
    form: {
      title: '',
      content: '',
    },
    isComplete: false,
    visibilityFilter: "all",
    showModal: false,
  }

  toggleCompleted(id) {
    this.setState({
      todos: this.state.todos.map(todo =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo)
    })
  }

  _handleSubmit(event) {
    event.preventDefault && event.preventDefault()
    const todo = { ...this.state.form, id: makeId() }
    this.setState({ todos: this.state.todos.concat(todo), showModal: false, form: {} })
  }

  _change(field) {
    return input =>
      this.setState({ form: { ...this.state.form, [field]: input.target.value } })

  }

  _callNewItem(){
    this.setState({showModal: true})
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
              newItem={this._callNewItem.bind(this)}
            />
            <MyModal title="Nueva Actividad" className="my-modal-title" handleSubmit={this._handleSubmit.bind(this)} content={
              <CreateItem handleSubmit={this._handleSubmit.bind(this)} change={this._change.bind(this)} />
            } showModal={this.state.showModal} close={() => this.setState({ showModal: false })} />
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
            <div className="list-body-btn-container">
            <NewItemButton newItemBtn={this.props.newItem}/>
            </div>
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

class CreateItem extends Component {

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="todo-form-box">
            <form className="form-group todo-form" onSubmit={this.props.handleSubmit}>
              <div className="col-md-offset-1 todo-form-fields">
                <input onChange={this.props.change('title')}
                  className="form-control form-input" placeholder="Título" />
                <textarea onChange={this.props.change('content')} className="form-control form-input" placeholder="Descripción"></textarea>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

}

class MyModal extends Component {

  render() {
    return (
      <Modal className="fade-scale my-modal" show={this.props.showModal} onHide={this.props.close}>
        <Modal.Header className="my-modal-header" closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.content}
        </Modal.Body>
        <Modal.Footer>
          {this.props.handleSubmit && <Button bsStyle="primary" onClick={this.props.handleSubmit} className="btn-submit">Crear tarea</Button>}
          <Button className="btn-modal-close" onClick={this.props.close}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    )
  }

}

class NewItemButton extends Component {

  render() {
    return (
      <div>
        {<Button onClick={this.props.newItemBtn}
          className="btn btn-new-item fa fa-plus fa-3x"
          ></Button>}
      </div>
    )
  }
}

export default App;

