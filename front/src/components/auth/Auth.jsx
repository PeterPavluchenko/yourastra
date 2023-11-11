import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./auth.scss";

const Auth = ({ handleLogin }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        year: '',
        month: '',
        day: ''
    });

    const currentYear = new Date().getFullYear();

    const [isRegistering, setIsRegistering] = useState(false);

    const navigate = useNavigate();

    const [dayOptions, setDayOptions] = useState([]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const generateDays = () => {
            if (formData.year && formData.month) {
                const daysInMonth = new Date(formData.year, formData.month, 0).getDate();
                const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
                setDayOptions(days);
            } else {
                setDayOptions([]);
            }
        };

        generateDays();
    }, [formData.year, formData.month]);

    const performLogin = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                username,
                password,
            });
            console.log('Login Response:', response.data);

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            
            handleLogin(response.data.user);
            navigate('/life-in-years');
        } catch (error) {
            console.error('Login Error:', error.response.data);
        }
    };

    const register = async (e) => {
        e.preventDefault();
        try {
            const { username, password, year, month, day } = formData;

            const birthday = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

            const response = await axios.post('http://localhost:5000/api/auth/register', {
                username,
                password,
                birthday,
            });
            console.log('Registration Response:', response.data);

            await performLogin(username, password);
            setIsRegistering(false);
        } catch (error) {
            console.error('Registration Error:', error.response.data);
        }
    };

    const login = async (e) => {
        e.preventDefault();
        const { username, password } = formData;
        await performLogin(username, password);
    };

    const yearOptions = Array.from({ length: 100 }, (_, i) => currentYear - i);
    const monthOptions = [
        { value: '01', label: 'January' }, { value: '02', label: 'February' },
        { value: '03', label: 'March' }, { value: '04', label: 'April' },
        { value: '05', label: 'May' }, { value: '06', label: 'June' },
        { value: '07', label: 'July' }, { value: '08', label: 'August' },
        { value: '09', label: 'September' }, { value: '10', label: 'October' },
        { value: '11', label: 'November' }, { value: '12', label: 'December' },
    ];

    return (
        <div className="form-box">
            <form className="form">
                <span className="title">{isRegistering ? 'Sign Up' : 'Log In'}</span>
                <div className="form-container">
                    <input name="username" className="input" type="text" placeholder="Username" onChange={handleChange} />
                    <input name="password" className="input" type="password" placeholder="Password" onChange={handleChange} />
                    {isRegistering && (
                        <>
                            <h3 className="birthday-title">Select birthday</h3>
                            <div className="birthday-selects">
                                <select name="year" className="input" onChange={handleChange}>
                                    <option value="">Year</option>
                                    {yearOptions.map(year => <option key={year} value={year}>{year}</option>)}
                                </select>
                                <select name="month" className="input" onChange={handleChange} disabled={!formData.year}>
                                    <option value="">Month</option>
                                    {monthOptions.map(month => <option key={month.value} value={month.value}>{month.label}</option>)}
                                </select>
                                <select name="day" className="input" onChange={handleChange} disabled={!formData.year || !formData.month}>
                                    <option value="">Day</option>
                                    {dayOptions.map(day => <option key={day} value={day.toString().padStart(2, '0')}>{day}</option>)}
                                </select>
                            </div>
                        </>
                    )}
                </div>

                {isRegistering ? (
                    <div>
                        <button className="form-button" onClick={register}>Sign Up</button>
                        <div className="form-section">
                            <p>Have an account? <span onClick={() => setIsRegistering(false)} className="form-link">Log In</span></p>
                        </div>
                    </div>
                ) : (
                    <div>
                        <button className="form-button" onClick={login}>Log In</button>
                        <div className="form-section">
                            <p>Don't have an account? <span onClick={() => setIsRegistering(true)} className="form-link">Sign Up</span></p>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default Auth;
