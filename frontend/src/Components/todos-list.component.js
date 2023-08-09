import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../Styles/todolist.css';

const Todo = props => (
    <tr>
        <td>{props.todo.title}</td>
        <td>{props.todo.status}</td>
        <td>
            <Link to={"/edit/" + props.todo._id}>Edit </Link>
            <Link to={"/delete/" + props.todo._id}> Delete</Link>
        </td>
    </tr>
);

export default class TodosList extends Component {
    constructor(props) {
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

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

        axios.post('http://localhost:4000/todos/add', newTodo).then(res => console.log(res.data));

        this.setState({
            title: '',
            status: '',
        });
    }

    componentDidMount() {
        axios.get('http://localhost:4000/todos/').then(
            response => {
                this.setState({ todos: response.data });
            },
            error => {
                console.log(error);
            }
        );
    }

    todoList() {
        return this.state.todos.map(function (currentTodo, i) {
            return <Todo todo={currentTodo} key={i} />;
        });
    }

    searchPTask(event) {
        this.setState({ searchId: event.target.value.substr(0, 20) });
    }

    render() {
        let filterroute = this.state.todos.filter(p => {
            return p.title.indexOf(this.state.searchId) !== -1;
        });

        return (
            <div>
                <form class="row g-3" onSubmit={this.onSubmit}>
                    <div class="col-sm-10">
                        <label for="title" class="visually-hidden">
                            Password
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.title}
                            onChange={this.onChangeTitle}
                            placeholder="Title"
                        ></input>
                    </div>
                    <div class="col-sm-2">
                        <button
                            type="submit"
                            class="btn btn-secondary"
                            style={{ paddingLeft: '65px', paddingRight: '65px' }}
                        >
                            Add Task
                        </button>
                    </div>

                    <div>
                        <input
                            className="form-control"
                            type="search"
                            placeholder="search by passenger id"
                            name="searchQuery"
                            style={{ width: '7cm', marginLeft: '10cm', marginTop: '1cm', borderRadius: '9px' }}
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
                            filterroute.map(todo => <Todo todo={todo} key={todo._id} />)
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}
