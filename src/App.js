import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react'
function App() {
  const [names, setNames] = React.useState([{name: ''}])
  React.useEffect(()=>{
    const init = {

    }
    fetch(`https://crud-backend-ryan.herokuapp.com/`)
    .then(res => res.json())
    .then (data => {
      setNames(data)
      console.log(data)
    });
  },[])

  return (
    <div className="App">
      {names.map((e, i) => {
        return <p>{e.name}</p>
      })}
    </div>
  );
}

export default App;
