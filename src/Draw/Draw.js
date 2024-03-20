import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Draw() {

  const [generatedNumbers, seteneatedNumbers] = useState([])
  const [numbers, setNumbers] = useState([])
  const [winners, setWinners] = useState([])
  const [roundsOfDrawing, setRoundsOfDrawing] = useState([])
  const [elementIndex, setElementIndex] = useState(0);
  const [renderingCompleted, setRenderingCompleted] = useState();
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


  const loadAllNumbersBet = async () => {
    const result = await axios.get(`http://localhost:8080/getBetsNumbers`)
    setAllNumbersBet(result.data)
  }

  useEffect(() => {
    loadGenerateNumbers() // Carrega os números quando o componente é montado
    loadAllNumbersBet()

    const blockBackButton = (event) => {
      event.preventDefault();
      event.stopPropagation();
      alert("Você não pode voltar, pois o sorteio já começou");
    };

    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', blockBackButton);

    return () => {
      window.removeEventListener('popstate', blockBackButton);
    };
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
    loadNumbers()


    console.log(allNumbersBet)

  }, [generatedNumbers])

  const sortedEntries = Object.entries(allNumbersBet).sort((a, b) => b[1] - a[1] );

  return (
    <div className='container-fluid'>
      <div className='p-4 mt-2  text-center'>
        <h1 className='text-center m-4'>Sorteio</h1>
        <hr></hr>

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

        <h3 className='text-center mb-2 mt-5 text-warning '  >{renderingCompleted && "Número de Rodadas: " + roundsOfDrawing}</h3>
        <h1 className='text-center mb-3 mt-5' >{renderingCompleted && winners.length !== 0 && "Vencedores"}</h1>
        <h5 className='text-center mb-3   text-info' >{renderingCompleted && winners.length !== 0 && "número de vencedores: " + winners.length}</h5>

        <div className='container'>
          {
            winners.length === 0 ? renderingCompleted && <h3 className='text-center  text-danger' >Não houve vencedores</h3>
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
          {renderingCompleted && <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Nro Apostado</th>
                <th>Qtd de Apostas</th>
              </tr>
            </thead>
            <tbody>
              {sortedEntries.map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>}
        </div>
        {winners.length !== 0 && (<Link type='submit' className='btn btn-primary mx-2 mt-3' to={'/AwardPage'}>{renderingCompleted && "Premiação"}</Link>)}
        {renderingCompleted && (<Link to="/" className='btn  btn-success mx-2 mt-3 ' >{renderingCompleted && "Nova Edição de Apostas"}</Link>)}
      </div>
    </div>


  )
}
