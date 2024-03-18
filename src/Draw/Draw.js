import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Draw() {

  const [bets, setBets] = useState([])
  const [generatedNumbers, seteneatedNumbers] = useState([])
  const [numbers, setNumbers] = useState([])
  const [winners, setWinners] = useState([])
  const [roundsOfDrawing, setRoundsOfDrawing] = useState([])

  const loadGenerateNumbers = async () => {
    const result = await axios.get(`http://localhost:8080/generateNumbers`)
    seteneatedNumbers(result.data)

  }
  const loadRoundsOfDrawing = async () => {
    const result = await axios.get(`http://localhost:8080/getRoundsOfDrawing`)
    setRoundsOfDrawing(result.data)

  }

  const loadWinners = async () => {
    const result = await axios.get(`http://localhost:8080/drawWinners`)
    setWinners(result.data)

  }
  const loadNumbers = async () => {
    const result = await axios.get(`http://localhost:8080/getNumbers`)
    setNumbers(result.data)

  }

  const loadBets = async () => {
    const result = await axios.get(`http://localhost:8080/allbets`)
    setBets(result.data)
  }

  useEffect(() => {
    
    loadGenerateNumbers(); // Carrega os números quando o componente é montado
    
  }, []) 
  
  
  
  useEffect(() => {
    
    // setTimeout(() => {

      loadRoundsOfDrawing();
      console.log("Hello, World!");
      loadWinners()
      loadBets();
      loadNumbers()

    // }, 1000);

  }, [generatedNumbers])


  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h1 className='text-center m-4'>Sorteio</h1>
          <p>{numbers.length}</p>
          <p>{numbers.join(",")}</p>

          <h2 className='text-center'>Números </h2>
          <div className='text-center  container d-inline-flex justify-content-center'>

            {[...Array(30).keys()].map((i) => (
              <p
                className='drawnNumbers fs-3 d-flex justify-content-center align-items-center shadow fw-bold border border-primary text-primary'
                key={i}
              >
              
                {numbers[i] || "-"}
              </p>
            ))}

          </div>
          
          <h3  className='text-center' >Número de Rodadas</h3>
          <h3 className='text-center' >{roundsOfDrawing}</h3>


            {winners.map((winner, index) => (
              <div className='card' key={index}>
                <div className=' bg-white card-header'>
                  <ul className='list-group list-group-flush'>
                    <li className='list-group-item'>
                      <b>Id da Aposta: </b>
                      {winner.id}
                    </li>
                    <li className='list-group-item'>
                      <b>Nome: </b>
                      {winner.punter.name}
                    </li>
                    <li className='list-group-item'>
                      <b>Cpf: </b>
                      {winner.punter.cpf}
                    </li>
                    <li className='list-group-item'>
                      <b>Números: </b>
                      {winner.numbers}

                    </li>
                  </ul>
                </div>
              </div>
            )) }
       
        </div>
      </div>

    </div>
  )
}
