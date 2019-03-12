/**
 * Created by James on 3/7/2019.
 */

import React, { Component } from 'react';
import Modal from 'react-modal';

import AppointmentsTable from './AppointmentsTable';

class AppointmentsProvider extends Component {

    state = {
        data: [],
        loaded: false,
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
        console.log("Modal is supposed to display");
        console.log(appointmentId);


        fetch('api/appointments/' + appointmentId, {
            method: 'PUT',

        })
    }

    render() {
        console.log("Inside render function");
        console.log(this.state.data);
        return (
            <AppointmentsTable appointments={this.state.data} action={this.displayModal}/>
        );
    }
}

export default AppointmentsProvider;
