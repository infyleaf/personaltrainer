import './App.css';
import React, { useState } from 'react';
import Customers from './components/Customers';
import Trainings from './components/Trainings';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function App() {
  const [value, setValue] = React.useState('one')

 


  const handleTabs = (e, newValue) => {
    console.warn(value);
     setValue(newValue)
  }

  return (
    <div className="App">
            <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Personal Trainer
          </Typography>

        </Toolbar>
        <Tabs value={value} onChange= {handleTabs} textColor="secondary">
        <Tab value="one" label="Customers" />
        <Tab value="two" label="Trainings" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={'one'}> <Customers></Customers> </TabPanel>
      <TabPanel value={value} index={'two'}> <Trainings></Trainings></TabPanel>

    </div>
  );
}
function TabPanel(props){
  const {children,value,index} = props;
  return(
    <div>
      {
        value===index && (
         <p> {children} </p>
        )
      }
    </div>
  )
}

export default App;
