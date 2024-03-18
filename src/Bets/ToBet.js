import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

export default function ToBet() {

    const [clickedNumbers, setClickedNumbers] = useState([]);

    let navigate = useNavigate()
    
    const [bet, setBet] = useState({
        punter: {
            name: "",
            cpf: "",
        },
        numbers: ""
    })

    useEffect(() => {
        loadClickedButtons()
    }, [])

    const loadClickedButtons = () => {
        return clickedNumbers
    }

    const { punter} = bet
    
    // const onInputChange = (e) => {
    //     setBet({ ...punter, [e.target.name]: e.target.value })
    // }
    
    const onInputChange = (e) => {
        setBet({ 
            ...bet, 
            punter: {
                ...bet.punter,
                [e.target.name]: e.target.value 
            }
        });
    }
    const handleClick = (number) => {
        if (clickedNumbers.length < 5) {
            const newClickedNumbers = [...clickedNumbers, number];
            setClickedNumbers(newClickedNumbers);
            setBet({ ...bet, numbers: newClickedNumbers.join(',') });
        } else {
            alert('Quantidade de números permitidos por aposta atingida');
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault()
        if(bet.punter.name === "" || bet.punter.cpf ==="" ||  !/^[0-9]{11}$/.test(bet.punter.cpf)){
            
            alert('É necessário preencer os campos de nome e cpf');
        }else if(clickedNumbers.length < 5){
            alert('Quantidade de números mínima para aposta não atingida');
        }
        else{
            
            await axios.post("http://localhost:8080/newBet", bet)
            navigate("/Allbets")
        }
    }


    const handleSurprise = () => {
        const randomNumbers = [];
        while (randomNumbers.length < 5) {
            const num = Math.floor(Math.random() * 50) + 1;
            if (!randomNumbers.includes(num)) {
                randomNumbers.push(num);
            }
        }
        setClickedNumbers(randomNumbers);
        // setBet({ ...bet, numbers: randomNumbers.join(',') });
    };


    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h1 className='text-center m-4'>Registrar Aposta</h1>

                    <form onSubmit={(e) => onSubmit(e)}>

                        <div className='mb-3'>
                            <label htmlFor='Name' className='form-label'>
                                Nome
                            </label>
                            <input
                                type={"text"}
                                className='form-control'
                                placeholder='Digite o seu nome'
                                name='name'
                                value={punter.name}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Username' className='form-label'>
                                Cpf
                            </label>
                            <input
                                type={"number"}
                                className='form-control'
                                placeholder='digite seu cpf'
                                name='cpf'
                                value={punter.cpf}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className='container-fluid text-center'>
                            <h2 className='text-center mt-5'>Escolher os Números</h2>
                            <hr></hr>

                            {[...Array(50).keys()].map((i) => (
                                <button
                                    type="button" // Alterado para type="button"
                                    className='btn btn-outline-primary mx-2 btn-lg m-2 shadow btnNumber'
                                    key={i}
                                    onClick={() => handleClick(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <h2 className='text-center mt-5'>Surpresinha</h2>
                            <hr></hr>
                            <button type='button' className='btn btn-primary mt-2 btn-lg' onClick={handleSurprise}>
                                Gerar números
                            </button>
                            

                            <h3 className='text-center mt-5'>Números da Aposta:</h3>
                            <hr></hr>
                            <div className='container d-flex'>
                                <div className='text-center container d-inline-flex justify-content-center' >
                                    <text className='choseNumbers d-flex justify-content-center align-items-center shadow fw-bold border border-primary text-primary'>{clickedNumbers[0]}</text>
                                    <text className='choseNumbers d-flex justify-content-center align-items-center shadow fw-bold border border-primary text-primary'>{clickedNumbers[1]}</text>
                                    <text className='choseNumbers d-flex justify-content-center align-items-center shadow fw-bold border border-primary text-primary'>{clickedNumbers[2]}</text>
                                    <text className='choseNumbers d-flex justify-content-center align-items-center shadow fw-bold border border-primary text-primary'>{clickedNumbers[3]}</text>
                                    <text className='choseNumbers d-flex justify-content-center align-items-center shadow fw-bold border border-primary text-primary'>{clickedNumbers[4]}</text>
                                </div>

                            </div>
                        </div>

                        <button type='submit' className='btn btn-primary mx-2'>Submit</button>
        
                        <Link type='submit' className='btn btn-danger mx-2' to='/Draw'>Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    )

}
