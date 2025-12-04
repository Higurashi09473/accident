import React from 'react';
import Map from "./Components/Map"
import { useState, useEffect } from "react";
import Reccoms from './Components/Reccoms';


export default function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [points, setPoints] = useState([]);

  useEffect(() => {
    fetch("http://higu.su")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPoints(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return (

      <div className="App">
        <Map points={points} />
        <Reccoms></Reccoms>
      </div>
    )
  }
}



