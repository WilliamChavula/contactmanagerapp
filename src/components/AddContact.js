import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames';

import { Consumer } from './../context';

class AddContact extends Component {
    state = {
        name: '',
        email: '',
        phone: '',
        errors: {}
    }

    onInputChanged = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onFormSubmit = (event, dispatch) => {
        event.preventDefault();
        const {name, email, phone } = this.state;

        // check if there is value
        if(name === null || name === '' || name.length < 2){
            this.setState({
                errors: {
                    name: "Please enter a valid name (at least two (2) characters)"
                }
            });
            return;
        }
        if(email === null || email === ''){

            this.setState({
                errors: {
                    email: "Please enter an Email, e.g. example@email.com"
                }
            });
            return;
        }
        if(email !== null && email !== ''){
            var pattern = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
            if(!pattern.test(email)){
                this.setState({
                    errors: {
                        email: "Please enter a valid Email, e.g. example@email.com"
                    }
                });
                return;
            }
        }
        if(phone === null || phone === '' || phone.length < 10){
            this.setState({
                errors: {
                    phone: "Please enter a valid phone number"
                }
            });
            return;
        }
        let action = {
            type: 'ADD_CONTACT',
            payload: {
                name,
                email,
                phone
            }
        }
        axios.post("https://jsonplaceholder.typicode.com/users", action.payload)
        .then(res => dispatch(res.data))

        this.setState({
            name: '',
            email: '',
            phone: '',
            errors: {}
        });

        // redirect to home page after submitting
        this.props.history.push('/');
    }

    render() {
        const { name, email, phone, errors } = this.state;
        return (
            <Consumer>
                {value => {
                    const { dispatch } = value;
                        return (
                            <div className="card">
                                <div className="card-header">
                                    <h4>Add Contact</h4>
                                </div>
                                <div className='card-body'>
                                    <form onSubmit={(e) => this.onFormSubmit(e, dispatch)} noValidate>
                                        <div className='form-group'>
                                            <label className="form-control-label" htmlFor="name">Name</label>
                                            <input className={classnames("form-control form-control-md", 
                                            {"is-invalid": errors.name})} type="text" name="name" placeholder="Enter name..." value={name} onChange={this.onInputChanged} />
                                            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                        </div>
                                        <div className='form-group'>
                                            <label className="form-control-label" htmlFor="email">Email</label>
                                            <input className={classnames("form-control form-control-md", {
                                                "is-invalid": errors.email
                                            })} type="email" name="email" placeholder="example@email.com" value={email} onChange={this.onInputChanged} />
                                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                            <small className="text-muted">We will never, under any circumstances share your email.</small><br />
                                            <small className="text-muted">We take the privacy of your data very seriously.</small>
                                        </div>
                                        <div className='form-group'>
                                            <label className="form-control-label" htmlFor="phone">Phone</label>
                                            <input className={classnames("form-control form-control-md", {
                                                "is-invalid": errors.phone
                                            })} type="text" name="phone" placeholder="Enter phone number" value={phone} onChange={this.onInputChanged} />
                                            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                                            <small className="text-muted">We willnever share your phone number to anyone for any reason whatsoever.</small>
                                        </div>
                                        <div className='w-50'>
                                            <input className="form-control btn btn-outline-danger btn-sm" type="submit" value="Add Contact" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )
                    }
                }
        </Consumer>
        )
    }
}

export default AddContact;