/**
 * Created by James on 3/7/2019.
 */
import React from "react";
import PropTypes from "prop-types";

import './AppointmentsTable.css';

const AppointmentsTable = ({ appointments, action }) => (
    <div>
        <h2 className="subtitle">
            Appointments
        </h2>
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Time</th>
                <th>Name</th>
                <th>Phone Number</th>
            </tr>
            </thead>
            <tbody>
            {appointments.map(appointment => (
                <tr className={appointment.name && appointment.number ? "filled-appointment" : ""}
                    key={appointment.id}
                    onClick={() => action(appointment.id)}>
                    <td>{appointment.id}</td>
                    <td>{appointment.time}</td>
                    {appointment.name ? <td>{appointment.name}</td> : <td>----------------------------</td>}
                    {appointment.number ? <td>{appointment.number}</td> : <td>----------------------------</td>}
                </tr>
            ))}
            </tbody>
        </table>
    </div>
);

AppointmentsTable.propTypes = {
    appointments: PropTypes.array.isRequired
};

export default AppointmentsTable;