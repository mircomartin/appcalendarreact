import React from 'react';
import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import { startLogin, startRegisterUser } from '../../actions/auth';

import './login.css';

const LoginScreen = () => {
    const dispatch = useDispatch();

    const [formLoginValues, handleLoginInputChange] = useForm({
        lEmail: 'mirco@gmail.com',
        lPassword: '123456',
    })

    const {lEmail, lPassword} = formLoginValues;

    const [formRegisterValues, handleRegisterInputChange] = useForm({
        rName: 'Diego',
        rEmail: 'mirco@carlos.com',
        rPassword: '123456',
        rPassword2: '123456',
    })

    const {rName, rEmail, rPassword, rPassword2} = formRegisterValues;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startLogin(lEmail, lPassword))
    }

    const handleNewUser = (e) => {
        e.preventDefault();

        if (rPassword !== rPassword2) {
            return Swal.fire('Error', 'Las contraseñas deben ser iguales', 'error');
        }

        dispatch(startRegisterUser(rEmail, rName, rPassword))
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="lEmail"
                                value={lEmail}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="lPassword"
                                value={lPassword}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={handleNewUser}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="rName"
                                value={rName}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="rEmail"
                                value={rEmail}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name="rPassword"
                                value={rPassword}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name="rPassword2"
                                value={rPassword2}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen