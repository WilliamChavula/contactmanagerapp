import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import axios from 'axios';
import {Consumer} from '../context';

class Contact extends Component {
    state = {
        showContactInfo: false
    }

    onToggleContact = () => {
        this.setState({
            showContactInfo: !this.state.showContactInfo
        })
    }

    onDeleteContact = (id, dispatch) => {
        let action = {
            type: 'DELETE_CONTACT',
            payload: id
        }
        axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(res => dispatch(action))
    }

    render(props) {
        const {name, email, phone, id} = this.props;
        return (
            <Consumer>
                {value => {
                    const {dispatch} = value;
                    return (
                    <div className="card card-body mb-3">
                    <h4>
                        {name} 
                        {!this.state.showContactInfo? 
                            (<i onClick={this.onToggleContact} className="fas fa-chevron-right"></i>) 
                            : (<i onClick={this.onToggleContact} className="fas fa-chevron-down"></i>)
                        }
                        <div className="float-right">
                            <Link to={`/edit-user/${id}`}><i className="fas fa-user-edit text-secondary"></i></Link>
                            <i className="fas fa-times text-danger" 
                                onClick={() => this.onDeleteContact(id, dispatch)}>
                            </i>
                        </div>
                        
                    </h4>
                    {this.state.showContactInfo? (
                        <ul className="list-group">
                            <li className="list-group-item">Email: {email}</li>
                            <li className="list-group-item">Phone: {phone}</li>
                    </ul>
                    ) : null}
                    
                </div>
                )
                }}
            </Consumer>
            
        )
    }
}

Contact.propTypes = {
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired
}

export default Contact
