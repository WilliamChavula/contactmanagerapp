import React, { Component } from 'react';
import { Consumer } from './../context';
import axios from 'axios';
import classnames from 'classnames';

class EditContact extends Component {
    state = {
        name: "",
        email: "",
        phone: "",
        errors: {}
    }

    async componentDidMount() {
        if (this.props.match.params){
            var id = this.props.match.params.userId;
            const user = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
            this.setState({
                name: user.data.name,
                email: user.data.email,
                phone: user.data.phone
            });
        }
    }

    onInputEdit = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onFormSubmit = async (e, dispatch) => {
        var id = this.props.match.params.userId;
        e.preventDefault();

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
            var pattern = new RegExp(/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
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
        const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, {
            name,
            email,
            phone
        })
        let action = {
            type: 'UPDATE_CONTACT',
            payload: res.data
        }
        dispatch(action);

        this.setState({
            name: '',
            email: '',
            phone: '',
            errors: {}
        });

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
                            <h1 className="card-header">Edit contact</h1>
                            <div className="card-body">
                                <form onSubmit={(e) => this.onFormSubmit(e,dispatch)} noValidate>
                                    <div className="form-group">
                                        <label className="form-control-label" htmlFor="name">Name</label>
                                        <input className={classnames("form-control form-control-md",{
                                            "is-invalid": errors.name
                                        })} name="name" type="text" value={name} onChange={this.onInputEdit} />
                                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label className="form-control-label" htmlFor="email">Email</label>
                                        <input className={classnames("form-control form-control-md",{
                                            "is-invalid": errors.email
                                        })} name="email" type="email" value={email} onChange={this.onInputEdit} />
                                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label className="form-control-label" htmlFor="phone">Phone</label>
                                        <input className={classnames("form-control form-control-md",{
                                            "is-invalid": errors.phone
                                        })} name="phone" type="text" value={phone} onChange={this.onInputEdit} />
                                        {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                                    </div>
                                    <div className='w-50'>
                                        <input className="form-control btn btn-outline-secondary btn-sm" type="submit" value="Edit Contact" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    )
                }}
            </Consumer>
            
        )
    }
}

export default EditContact
