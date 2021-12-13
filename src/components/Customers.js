import React, { useState, useEffect } from 'react';
import {AgGridReact, AgGridColumn} from 'ag-grid-react';
import Button from '@mui/material/Button';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';

export default function Customers() {
const [customers, setCustomers] = useState([]);

    useEffect(() => fetchData(), useState(), []);

    const fetchData = () => {

        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))

    }

    const columns = [
        {field: 'firstname', sortable: true, filter: true},
        {field: 'lastname', sortable: true, filter: true},
        {field: 'streetaddress', sortable: true, filter: true},
        {field: 'postcode', sortable: true, filter: true},
        {field: 'city', sortable: true, filter: true},
        {field: 'email', sortable: true, filter: true},
        {field: 'phone', sortable: true, filter: true},
        {
            headerName: '',
            sortable: false,
            filter: false,
            width: 120,
            field: 'links.0.href',
        cellRendererFramework: params => <Button variant="outlined" color="error" onClick={() => deleteCustomer(params.value)}>Delete </Button>},
        {
            headerName: '',
            sortable: false,
            filter: false,
            width: 120,
            field: 'links.0.href',
        cellRendererFramework: params => <EditCustomer editCustomer={editCustomer} customer={params}></EditCustomer>
        
        }

    ]
    //Delete
    const deleteCustomer = (link) => {
        //CONFIRM DIALOG TEE
        if (window.confirm('Delete customer?'))
        fetch(link, {method: 'DELETE'})
       .then(res => fetchData())
        .catch(err => console.error(err))
       console.log(link);


    }
    //Save
    const saveCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }
    //Edit
    const editCustomer = (url, updatedCustomer) => {
        fetch(url, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(updatedCustomer)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
      
    }

    return (
        <div className="ag-theme-material" style={{height: 600, width: '80%', marginTop: 20, margin: 'auto'}}>
            <AddCustomer saveCustomer={saveCustomer}/>
            <AgGridReact
             rowData={customers}
             columnDefs={columns}
             pagination={true}
             paginationPageSize={10}
             />
        </div>
    );
}