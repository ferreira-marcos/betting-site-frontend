import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../App.css'

export default function User() {

    let navigate = useNavigate()

    const [user, setUser] = useState({
        username: "",
        cpf: "",
        clickedNumbers: [],
    })

    const [clickedNumbers, setClickedNumbers] = useState([]);
    // const { username, cpf } = useParams();

    const { username, cpf } = user

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/matrixNumber`);
    };

    const handleClick = (number) => {
        if (clickedNumbers.length < 5) {
            setClickedNumbers([...clickedNumbers, number]);
        } else {
            alert('quantidade de números permitidos por aposta atingido');
        }
    };

    const handleSurprise = () => {
        const numbers = [];
        while (numbers.length < 5) {
            const num = Math.floor(Math.random() * 50) + 1;
            if (!numbers.includes(num)) {
                numbers.push(num);
            }
        }
        setClickedNumbers(numbers);
    };

    return (
        <div className='container-fluid  '>
            <div className='row mb-5 '>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 '>
                    <h2 className='text-center m-4'>Registrar Aposta</h2>

                    {/* <form onSubmit={(e) => onSubmit(e)}> */}
                    <form onSubmit={handleSubmit}>

                        <div className='mb-3'>
                            <label htmlFor='Name' className='form-label'>
                                Nome
                            </label>
                            <input
                                type={"text"}
                                className='form-control'
                                placeholder='Digite o seu Nome'
                                name='username'
                                value={username}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Username' className='form-label'>
                                CPF
                            </label>
                            <input
                                type={"number"}
                                className='form-control'
                                placeholder='digite o seu CPF'
                                name='cpf'
                                value={cpf}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>


                    </form>
                    <div className='container '>
                        <h2 className='text-center'>Números</h2>
                        {[...Array(50).keys()].map((i) => (
                            <button className='btn btn-outline-primary mx-2 btn-lg m-3 shadow btnNumber' key={i} onClick={() => handleClick(i + 1)}>
                                {i + 1}
                            </button>
                        ))}
                    </div>
                    <h1 className='text-center'>Surpresinha</h1>
                    <div className=' text-center'>

                        <button className='btn btn-primary mx-2 btn-lg' onClick={handleSurprise}>
                            Gerar números
                        </button>

                        <h3 className='text-center mt-5'>Números clicados: </h3>
                        <div className='text-center'>
                            <text >{clickedNumbers.join(', ')}</text>
                        </div>

                    </div>
                    {/* <Link type='submit' className='btn btn-outline-primary' to={`/matrixNumber`}>Fazer Aposta</Link> */}
                    <button type='submit' className='btn btn-primary'>Fazer Aposta</button>
                    <Link type='submit' className='btn btn-danger mx-2' to='/'>Cancel</Link>
                </div>
            </div>



        </div>


    )
}
