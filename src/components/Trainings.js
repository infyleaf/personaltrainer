import React, { useState, useEffect } from 'react';
import {AgGridReact, AgGridColumn} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { formatDistance, subDays } from 'date-fns'
import Button from '@mui/material/Button';
import AddTraining from './AddTraining';

export default function Trainings() {
const [trainings, setTrainings] = useState([]);

    useEffect(() => fetchData(), useState(), []);

    const fetchData = () => {

        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))

    }

    const columns = [
        {field: 'date', sortable: true, filter: true,
        cellRenderer: (data) => {
            return data.value ? (new Date(data.value)).toLocaleDateString() : '';
       }},
        {field: 'duration', sortable: true, filter: true},
        {field: 'activity', sortable: true, filter: true},
        //customer
        {headerName: 'First name',
        sortable: false,
        filter: false,
        width: 120,
        field: 'customer.firstname',
    },
        {headerName: 'Last name',
        sortable: false,
        filter: false,
        width: 120,
        field: 'customer.lastname',
    
        },
    //delete
        {
        headerName: '',
        sortable: false,
        filter: false,
        width: 120,
        field: 'id',
cellRendererFramework: params => <Button variant="outlined" color="error" onClick={() => deleteTraining(params.value)}>Delete </Button>}
    ]
    const deleteTraining = (link) => {
        if (window.confirm('Delete training?'))
        fetch('https://customerrest.herokuapp.com/api/trainings/' + link, {method: 'DELETE'})
       .then(res => fetchData())
        .catch(err => console.error(err))
       console.log(link);


    }

    //Save
    const saveTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
        .then(data => setTrainings(data.content))
        .catch(err => console.error(err))
    }

    return (
        <div className="ag-theme-material" style={{height: 600, width: '80%', marginTop: 20, margin: 'auto'}}>
            <AddTraining saveTraining={saveTraining}/>

            <AgGridReact
             rowData={trainings}
             columnDefs={columns}
             pagination={true}
             paginationPageSize={10}
             />
        </div>
    );
}