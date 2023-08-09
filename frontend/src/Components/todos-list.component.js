import React, { Component } from 'react';
import axios from 'axios';
import '../Styles/todolist.css';

export default class TodosList extends Component {
    constructor(props) {
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);

        this.state = {
            todos: [],
            title: '',
            status: 'Pending',
            searchId: '',
        };
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value,
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const newTodo = {
            title: this.state.title,
            status: this.state.status,
        };

        axios.post('http://localhost:4000/todos/add', newTodo)
            .then(res => console.log(res.data));

        this.setState({
            title: '',
            status: '',
        });
    }

    componentDidMount() {
        axios.get('http://localhost:4000/todos/')
            .then(response => {
                this.setState({ todos: response.data });
            })
            .catch(error => {
                console.log(error);
            });
    }

    deleteTodo(id) {
        if (window.confirm("Are you sure you want to delete this task?")) {
            axios.delete(`http://localhost:4000/todos/delete/${id}`)
                .then(res => {
                    console.log(res.data);
                    this.setState({
                        todos: this.state.todos.filter(todo => todo._id !== id)
                    });
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }

    todoList() {
        return this.state.todos.map(currentTodo => (
            <tr key={currentTodo._id}>
                <td>{currentTodo.title}</td>
                <td>{currentTodo.status}</td>
                <td>
                    <a
                        className="btn btn-warning"
                        id="btn1"
                        style={{ marginRight: '10px' }}
                    >
                        <i className="fas fa-edit "></i>&nbsp;&nbsp;Edit
                    </a>
                    <a
                        className="btn btn-danger"
                        id="btn2"
                        style={{ marginRight: '10px' }}
                        onClick={() => this.deleteTodo(currentTodo._id)}
                    >
                        <i className="fa fa-trash blackiconcolor" aria-hidden="true"></i>&nbsp;&nbsp;Delete
                    </a>
                </td>
            </tr>
        ));
    }

    searchPTask(event) {
        this.setState({ searchId: event.target.value.substr(0, 20) });
    }

    render() {
        let filterroute = this.state.todos.filter(p => p.title.indexOf(this.state.searchId) !== -1);

        return (
            <div>
                <form className="row g-3" onSubmit={this.onSubmit}>
                    <div className="col-sm-10">
                        <label htmlFor="title" className="visually-hidden">
                            Password
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.title}
                            onChange={this.onChangeTitle}
                            placeholder="Title"
                        />
                    </div>
                    <div className="col-sm-2">
                        <button
                            type="submit"
                            className="btn btn-secondary"
                            style={{ paddingLeft: '65px', paddingRight: '65px' }}
                        >
                            Add Task
                        </button>
                    </div>
                    
                    <div style={{ textAlign: 'right' }}>
                        <input
                            className="form-control"
                            type="search"
                            placeholder="Search"
                            name="searchQuery"
                            style={{ width: '7cm' }}
                            value={this.state.searchId}
                            onChange={this.searchPTask.bind(this)}
                        />
                    </div>
                </form>

                <table id="todo" className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.searchId === '' ? (
                            this.todoList()
                        ) : (
                            filterroute.map(todo => (
                                <tr key={todo._id}>
                                    <td>{todo.title}</td>
                                    <td>{todo.status}</td>
                                    <td>
                                        <a
                                            className="btn btn-warning"
                                            id="btn1"
                                            style={{ marginRight: '10px' }}
                                        >
                                            <i className="fas fa-edit "></i>&nbsp;&nbsp;Edit
                                        </a>
                                        <a
                                            className="btn btn-danger"
                                            id="btn2"
                                            style={{ marginRight: '10px' }}
                                            onClick={() => this.deleteTodo(todo._id)}
                                        >
                                            <i className="fa fa-trash blackiconcolor" aria-hidden="true"></i>&nbsp;&nbsp;Delete
                                        </a>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}
