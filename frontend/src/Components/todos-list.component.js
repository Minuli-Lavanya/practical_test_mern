import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../Styles/todolist.css'

const Todo = props => (
    <tr>
        <td>{props.todo.title}</td>
        <td>{props.todo.status}</td>
        <td>
            <Link to={"/edit/"+props.todo._id}>Edit </Link>
            <Link to={"/delete/"+props.todo._id}> Delete</Link>
        </td>
    </tr>
)

export default class TodosList extends Component {

    constructor(props) {
        super(props);
        this.state = {todos: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/todos/')
            .then(response => {
                this.setState({todos: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    todoList() {
        return this.state.todos.map(function(currentTodo, i) {
            return <Todo todo={currentTodo} key={i} />;
        });
    }

    render() {
        return (
            <div>
                <h3>Todos List</h3>
                <table id="todo" className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Status</th>
                            <th></th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                    </tbody>
                </table>
            </div>
        )

    }
}