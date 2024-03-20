import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function AllBets() {
    const [bets, setBets] = useState([])
    // const [toDraw, setToDraw] = useState(false)


    let navigate = useNavigate()


    const toDrawPage = (event) => {

        event.preventDefault();
        // setToDraw(true)
        
        console.log(bets)
        // Exibir o diálogo de confirmação
        const confirmation = window.confirm("Tem certeza que deseja iniciar o sorteio? Se Sim, clique em OK. Se não, clique em CANCELAR");
    
        // Verificar a resposta do usuário
        if (confirmation && bets.length !==0 ) {
          navigate("/Draw")
        } else if(bets.length === 0) {
            alert("Nenhuma aposta foi feita")
        }
      };


    useEffect(() => {
        loadBets()
        
    }, [])

    const loadBets = async () => {
        const result = await axios.get(`http://localhost:8080/allbets`)
        setBets(result.data)
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className=' col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className=' text-center m-4'>Todas as Apostas</h2>
                    {bets.map((bet, index) => (
                        <div  className='card' key={index}>
                            <div className='bg-white card-header'>
                                <ul className='list-group list-group-flush'>
                                    <li className='list-group-item'>
                                        <b>Id da Aposta: </b>
                                        {bet.id}
                                    </li>
                                    <li className='list-group-item'>
                                        <b>Nome: </b>
                                        {bet.punter.name}
                                    </li>
                                    <li className='list-group-item'>
                                        <b>Cpf: </b>
                                        {bet.punter.cpf}
                                    </li>
                                    <li className='list-group-item'>
                                        <b>Números: </b>
                                        {bet.numbers}

                                    </li>
                                </ul>
                            </div>
                        </div>
                    ))}
                    <Link className='btn btn-primary m-2' to={"/ToBet"}>Fazer outra aposta</Link>
                    <Link className='btn btn-success my-2' onClick={toDrawPage} to={"/Draw"}>Iniciar Sorteio</Link>
                </div>
            </div>
        </div>
    )
}
