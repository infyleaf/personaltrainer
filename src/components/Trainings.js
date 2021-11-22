import React, { useState, useEffect } from 'react';
import {AgGridReact, AgGridColumn} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { formatDistance, subDays } from 'date-fns'

export default function Trainings() {
const [trainings, setTrainings] = useState([]);

    useEffect(() => fetchData(), useState(), []);

    const fetchData = () => {

        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => setTrainings(data.content))
        .catch(err => console.error(err))

    }

    const columns = [
        {field: 'date', sortable: true, filter: true,
        cellRenderer: (data) => {
            return data.value ? (new Date(data.value)).toLocaleDateString() : '';
       }},
        {field: 'duration', sortable: true, filter: true},
        {field: 'activity', sortable: true, filter: true},
        
    ]



    return (
        <div className="ag-theme-material" style={{height: 600, width: '80%', marginTop: 20, margin: 'auto'}}>
            <AgGridReact
             rowData={trainings}
             columnDefs={columns}
             pagination={true}
             paginationPageSize={10}
             />
        </div>
    );
}