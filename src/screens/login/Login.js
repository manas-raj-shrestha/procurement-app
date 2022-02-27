
import React from 'react';
import {Button} from '@mui/material';
import {loadAuthPicker} from '../../service/gapiManager'
export default function Login(){
return <div 

style={{display:'flex', 
position: 'absolute',
justifyContent:'center', alignItems:'center',  width: '100%',
height: '100%'}}>
<Button 
onClick={() => {
    loadAuthPicker();
  }}
variant="contained" style={{backgroundColor: '#4ecd77'}}>Login</Button>

</div>    
}