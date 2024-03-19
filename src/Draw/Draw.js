import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'

export default function Draw() {

  const [bets, setBets] = useState([])
  const [generatedNumbers, seteneatedNumbers] = useState([])
  const [numbers, setNumbers] = useState([])
  const [winners, setWinners] = useState([])
  const [roundsOfDrawing, setRoundsOfDrawing] = useState([])
  const [elementIndex, setElementIndex] = useState(0);
  const [renderingCompleted, setRenderingCompleted] = useState();
  const [isDeletedBD, setIsDeletedBD] = useState(false);
  const [allNumbersBet, setAllNumbersBet] = useState([]);

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

  const loadNewEdition = async () => {
    setIsDeletedBD(true); // Atualize o estado usando setIsDeletedBD
    const result = await axios.delete(`http://localhost:8080/deleteDB`)
    // setBets(result.data)
    // Navigate("/")
  }
  const loadAllNumbersBet = async () => {
    const result = await axios.get(`http://localhost:8080/getBetsNumbers`)
    setAllNumbersBet(result.data)
    // Navigate("/")
  }

  useEffect(() => {
    loadGenerateNumbers(); // Carrega os números quando o componente é montado
    loadAllNumbersBet()
  }, [])

  useEffect(() => {
    setRenderingCompleted(false);
    const delay = 1000;

    if (elementIndex < numbers.length) {
      const timeoutId = setTimeout(() => {
        setElementIndex(prevIndex => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeoutId);

    } else {
      // Se todos os números foram renderizados, defina o estado de renderização como concluído
      setRenderingCompleted(true);
    }
  }, [elementIndex, numbers]);

  useEffect(() => {

    loadRoundsOfDrawing()
    console.log("Hello, World!")
    loadWinners()
    loadBets()
    loadNumbers()
    console.log(isDeletedBD)

    console.log(allNumbersBet)

  }, [generatedNumbers, isDeletedBD])

  

  return (
    <div className='container-fluid'>
      <div className='border rounded p-4 mt-2 shadow text-center'>
        <h1 className='text-center m-4'>Sorteio</h1>
        <hr></hr>
        {/* <p className='text-center m-4'>{numbers.length}</p>
        <p className='text-center m-4'>{numbers.join(",")}</p> */}

        <h2 className='text-center mb-4'>Números Sorteados</h2>
        <div className='text-center container d-inline-flex justify-content-center'>

          {numbers.slice(0, elementIndex).map((number, index) => (
            <p
              className='drawnNumbers fs-3 d-flex justify-content-center align-items-center shadow fw-bold border border-primary text-primary  '
              key={index + 1}
            >

              {number || "-"}
            </p>
          ))}

        </div>

        <h3 className='text-center mb-2 mt-5 text-warning '  >{renderingCompleted  && "Número de Rodadas: " + roundsOfDrawing}</h3>
        <h3 className='text-center mb-3 mt-5' >{renderingCompleted && winners.length !==0 && "Vencedores"}</h3>
        <h5 className='text-center mb-3  text-info' >{renderingCompleted && winners.length !==0 && "houveram " + winners.length + " vencedores"}</h5>

        <div className='container'>
          {
            winners.length === 0 ? renderingCompleted && <h3 className='text-center' >Não houve vencedores</h3>
              : (winners
                .sort((bets, bet) => bets.punter.name.localeCompare(bet.punter.name))
                .map((winner, index) => (
                  renderingCompleted &&
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
                )))}
        </div>
        <div className="container mt-5">
          {renderingCompleted && <h3>Lista de Números Apostados</h3>}
      {  renderingCompleted &&  <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Número Apostado</th>
                <th>Quantidade de Apostas</th>
              </tr>
            </thead>
            <tbody>
              {/* Mapeando o Map retornado pelo endpoint */}
              {Object.entries(allNumbersBet).map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>}
        </div>
        <Link type='submit' className='btn btn-primary mx-2 mt-3' to={'/AllBets'}>{renderingCompleted  && "Visualizar todas as Apostas"}</Link>
        <Link to="/" className='btn  btn-success mx-2 mt-3' onClick={loadNewEdition}>{renderingCompleted  && "Nova Edição"}</Link>
      </div>
      </div>


  )
}
