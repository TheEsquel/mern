import React, {useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from '../hooks/message.hook'

export const AuthPage = () => {
    const message = useMessage()
    const { loading, request, error, clearError }  = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const loginHandler =  async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            message(data.message)
        } catch (e) {
            
        }
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
            clearError()
        } catch (e) {

        }
    }

    return (
        <div className='row'>
            <div className='col s6 offset-s3'>
                <h3> Shorten links </h3>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Sign up</span>
                        <div>
                            <div className="input-field">
                                <input
                                    placeholder="Введите email"
                                    id="email"
                                    type="text"
                                    name='email'
                                    className='yellow-input'
                                    onChange={changeHandler}
                                />
                                <label htmlFor="first_name">Email</label>
                            </div>
                            <div className="input-field">
                                <input
                                    placeholder="Введите пароль"
                                    id="password"
                                    type="password"
                                    name='password'
                                    onChange={changeHandler}
                                />
                                <label htmlFor="first_name">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className='btn yellow darken-3'
                            style={{ marginRight: 10 }}
                            disabled={loading}
                            onClick={loginHandler}
                        >
                            Log in
                        </button>
                        <button
                            className='btn yellow darken-1 black-text'
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Sign up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}