import { Link } from 'react-router-dom'
import axios from 'axios'
import {React} from 'react'


export default function Home() {
  
  const loadNewEdition = async () => {
    await axios.delete(`http://localhost:8080/deleteDB`)
  }
  return (
    <div className='container text-center ' >
      
      <h2 className='welcomeTitle'>Bem Vindo a</h2>
      <h1 className='font-weight-bold text-primary deelBet'>DELL Bets</h1>
     
      
      <Link className='btn btn-success mx-2 mt-5' to={"/ToBet"}  onClick={loadNewEdition} >Iniciar Edição</Link>
    </div>
  )
}
