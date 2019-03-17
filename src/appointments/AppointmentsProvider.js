/**
 * Created by James on 3/7/2019.
 */

import React, { Component } from 'react';
import Modal from 'react-modal';

import AppointmentsTable from './AppointmentsTable';

// Used styles from https://github.com/reactjs/react-modal
const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        width                 : 'auto',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};


class AppointmentsProvider extends Component {

    constructor() {
        super();
        this.displayModal = this.displayModal.bind(this);
        this.afterDisplayModal = this.afterDisplayModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    state = {
        data: [],                   // Array of appointments
        loaded: false,              // boolean variable of whether the appointments are loaded or not
        isModalOpen: false,         // boolean variable of whether the appointment modal is open or not
        name: "",                   // name of person
        number: "",                 // person's phone number
        currentId: 0,               // current appointment id default is 0
        placeholder: "Loading Appointments..."
    };

    componentDidMount() {
        fetch('api/appointments')
            .then(response => {
                if (response.status !== 200) {
                    console.log("Server Error");
                }
                return response.json();
            })
            .then(data => {
                this.setState({data: data, loaded: true});
            });
    }

    displayModal(appointmentId) {
        this.setState({ isModalOpen: true, currentId: appointmentId });
    }

    afterDisplayModal() {
        fetch('api/appointments/' + this.state.currentId)
            .then(response => {
                if (response.status !== 200) {
                    console.log("Server Error");
                }
                return response.json();
            })
            .then(data => {
                this.setState({ name: data.name, number: data.number });
            });

    }

    closeModal() {
        this.setState({ isModalOpen: false });
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }

    handleNumberChange(event) {
        this.setState({ number: event.target.value});
    }

    submit() {

        fetch('api/appointments/' + this.state.currentId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                number: this.state.number
            })
        });


    }

    render() {
        return (
        <div>
            <Modal
                isOpen={this.state.isModalOpen}
                ariaHideApp={false}
                onAfterOpen={this.afterDisplayModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Make Appointment">

                {/*<h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>*/}
                <strong>Appointment</strong>
                <br/>
                <form onSubmit={this.submit}>
                    <strong>Name</strong>
                    <br/>
                    <input type='text' value={this.state.name} onChange={this.handleNameChange} />
                    <br/>
                    <strong>Number</strong>
                    <br/>
                    <input type='text' value={this.state.number} onChange={this.handleNumberChange} />
                    <br/>
                    <input type="submit" value="Submit" />
                    <button onClick={this.closeModal}>Cancel</button>
                </form>

            </Modal>
            <AppointmentsTable appointments={this.state.data} action={this.displayModal}/>
        </div>
        );
    }
}

export default AppointmentsProvider;
