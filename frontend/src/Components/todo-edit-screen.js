import React, { Component } from 'react';
export default class TodosEdit extends Component {
    render() {
        return (
            <div>
                 <form class="row g-3" >
                     <div class="col-sm-6">
                         <label  class="visually-hidden">
                             edit
                         </label>
                         <input
                            type="text"
                            className="form-control"
                            placeholder="Title"
                        ></input>
                    </div>

                    <div class="col-sm-3">
                        <label class="visually-hidden" for="specificSizeSelect">Preference</label>
                        <select class="form-select" id="specificSizeSelect">
                        <option selected>Pending</option>
                        <option value="1">In Progress</option>
                        <option value="2">Completed</option>
                        </select>
                    </div>

                    <div class="col-sm-2">
                        <button
                            type="submit"
                            class="btn btn-primary"
                            style={{ paddingLeft: '65px', paddingRight: '65px' }}
                        >
                            Edit Task
                        </button>
                    </div>

                </form>
            </div>
        )
    }
}