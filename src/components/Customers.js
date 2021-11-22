import React, { useState, useEffect } from 'react';
import {AgGridReact, AgGridColumn} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

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

        
        
    ]


    return (
        <div className="ag-theme-material" style={{height: 600, width: '80%', marginTop: 20, margin: 'auto'}}>
            <AgGridReact
             rowData={customers}
             columnDefs={columns}
             pagination={true}
             paginationPageSize={10}
             />
        </div>
    );
}