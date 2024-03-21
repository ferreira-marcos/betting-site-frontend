import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

export default function ToBet() {

    const [clickedNumbers, setClickedNumbers] = useState([]);

    // declara a constante bet
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


    const { punter } = bet

    const onInputChange = (e) => {
        setBet({
            ...bet,
            punter: {
                ...bet.punter,
                [e.target.name]: e.target.value
            }
        });
    }

    // função a escolha manual dos números 
    const handleClick = (number) => {
        const index = clickedNumbers.indexOf(number);

        // caso seja um número que não foi clicado
        if (index === -1) {
            if (clickedNumbers.length < 5) {
                const newClickedNumbers = [...clickedNumbers, number];
                setClickedNumbers(newClickedNumbers);
                setBet({ ...bet, numbers: newClickedNumbers.join(',') });
            } else {
                alert('Quantidade de números permitidos por aposta atingida');
            }
        } else {// se o número já estiver na lista de números clicados, e for clicado novamente ele é retirado da lsita
            const newClickedNumbers = [...clickedNumbers];
            newClickedNumbers.splice(index, 1);
            setClickedNumbers(newClickedNumbers);
            setBet({ ...bet, numbers: newClickedNumbers.join(',') });
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault()

        // testa se os campos foram corretamente preenchidos
        if (bet.punter.name === "" || bet.punter.cpf === "" || !/^[0-9]{11}$/.test(bet.punter.cpf)) {

            alert('É necessário preencer os campos de nome e cpf corretamente');
        } else if (clickedNumbers.length < 5) {
            alert('Quantidade de números mínima para aposta não atingida');
        }
        else {
            // se os campos foram preenchidos corretamente, é mandada para o back end a nova aposta
            await axios.post("http://localhost:8080/newBet", bet)
            window.location.reload();
            alert("Aposta Registrada com Sucesso")
        }
    }

    // gera os números aleatórios, função "surpresinha"
    const handleSurprise = () => {
        const randomNumbers = [];
        while (randomNumbers.length < 5) {
            const num = Math.floor(Math.random() * 50) + 1;
            if (!randomNumbers.includes(num)) {
                randomNumbers.push(num);
            }
        }
        setClickedNumbers(randomNumbers);
        setBet({ ...bet, numbers: randomNumbers.join(',') });
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

                            {/* gera os 50 botões na tela */}
                            {[...Array(50).keys()].map((i) => (
                                <button
                                    type="button"
                                    key={i}
                                    className={
                                        clickedNumbers.includes(i + 1)
                                            ? 'btn btn-primary mx-2 btn-lg m-2 shadow btnNumber' // caso o número tenha sido clicado
                                            : 'btn btn-outline-primary mx-2 btn-lg m-2 shadow btnNumber' // caso o número não tenha sido clicado
                                    }
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

                                {/* mostrar os cinco números escolhidos */}
                                <div className='text-center container d-inline-flex justify-content-center' >
                                    <text className='choseNumbers d-flex justify-content-center align-items-center shadow fw-bold border border-primary text-primary'>{clickedNumbers[0]}</text>
                                    <text className='choseNumbers d-flex justify-content-center align-items-center shadow fw-bold border border-primary text-primary'>{clickedNumbers[1]}</text>
                                    <text className='choseNumbers d-flex justify-content-center align-items-center shadow fw-bold border border-primary text-primary'>{clickedNumbers[2]}</text>
                                    <text className='choseNumbers d-flex justify-content-center align-items-center shadow fw-bold border border-primary text-primary'>{clickedNumbers[3]}</text>
                                    <text className='choseNumbers d-flex justify-content-center align-items-center shadow fw-bold border border-primary text-primary'>{clickedNumbers[4]}</text>
                                </div>

                            </div>
                        </div>

                        <button type='submit' className='btn btn-primary mx-2'>Fazer Aposta</button>
                        
                        {/* ir para a tela que mostra todas as apostas */}
                        <Link type='submit' className='btn btn-success mx-2' to={"/allbets"} >Todas as Apostas</Link>
                    </form>
                </div>
            </div>
        </div>
    )

}