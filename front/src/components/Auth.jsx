import React, { useState } from 'react';
import axios from 'axios';

const Auth = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        birthday: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const register = async () => {
        try {
            const { username, password, birthday } = formData;
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                username,
                password,
                birthday
            });
            console.log('Registration Response:', response.data);
        } catch (error) {
            console.error('Registration Error:', error.response.data);
        }
    };

    const login = async () => {
        try {
            const { username, password } = formData;
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                username,
                password
            });
            console.log('Login Response:', response.data);

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        } catch (error) {
            console.error('Login Error:', error.response.data);
        }
    };

    return (
        <div>
            <input name="username" placeholder="Username" onChange={handleChange} />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} />
            <input name="birthday" type="date" placeholder="Birthday" onChange={handleChange} />
            <button onClick={register}>Register</button>
            <button onClick={login}>Login</button>
        </div>
    );
};

export default Auth;