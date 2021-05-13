import React, {useEffect, useState} from 'react';
import './App.css';

import Drag from './components/Drag'

function App() {
  const [data, setData] = useState(); 
  const [alldata, setAlldata] = useState([]);
  useEffect(() => {
      fetch('/getdata').then((res) => res.json()).then((data) => {
        console.log(data)
        setData(  
          [{title: 'list1', items: data.list1},
        {title: 'pool', items: []},
        {title: 'list2', items: data.list2}])
      }).then(() => {
        fetch('/getalldata').then((res) => res.json()).then((data) => {
          setAlldata(data)
        })
      })
  }, [])

  return (
    <div style = {{height: '100%', width: '100%' , display:'flex', flexDirection:'column'}}>
        <Drag data={data} alldata = {alldata} />
    </div>
  );
}

export default App;
