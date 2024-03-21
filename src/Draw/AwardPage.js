import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function AwardPage() {

    const [winners, setWinners] = useState([])
    const [award, setAward] = useState([])

    const loadWinners = async () => {
        const result = await axios.get(`http://localhost:8080/drawWinners`)
        setWinners(result.data)
    
      }

    const loadAward = async () => {
        const result = await axios.get(`http://localhost:8080/calulateDiscount`)
        setAward(result.data)
    }
    
    useEffect(() => {
        loadAward()
        loadWinners()
        
    }, [])

    const formatName =(name)=>{
        return name.replace(/\s/g,'_')
    }

  return (
    <div className='container'>
        <h1>Prêmio</h1>
      {  winners
                .sort((bets, bet) => bets.punter.name.localeCompare(bet.punter.name)) 
                .map((winner, index) => (
                  <div className='card' key={index}>
                    <div className=' bg-white card-header'>
                      <ul className='list-group list-group-flush'>
      
                        <li className='list-group-item'>
                          <b> {"Cupom de "+award+"% em produtos na loja da Dell para o vencedor "+ winner.punter.name} </b>
                          <br></br>
                          
                          {formatName(winner.punter.name)+"DELL_"+ award}
                        </li>
                      </ul>
                    </div>
                  </div>
                ))}
        <Link to="/" className='btn  btn-success mx-2 mt-3 '>{"Nova Edição de Apostas"}</Link>

    </div>
  )
}
