import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./auth.scss";

const BirthdayForm = ({ handleLogin }) => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        year: '',
        month: '',
        day: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const currentYear = new Date().getFullYear();

    const [dayOptions, setDayOptions] = useState([]);

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

    const yearOptions = Array.from({ length: 100 }, (_, i) => currentYear - i);
    const monthOptions = [
        { value: '01', label: 'January' }, { value: '02', label: 'February' },
        { value: '03', label: 'March' }, { value: '04', label: 'April' },
        { value: '05', label: 'May' }, { value: '06', label: 'June' },
        { value: '07', label: 'July' }, { value: '08', label: 'August' },
        { value: '09', label: 'September' }, { value: '10', label: 'October' },
        { value: '11', label: 'November' }, { value: '12', label: 'December' },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { year, month, day } = formData;
        const birthday = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:5000/api/auth/update-birthday', 
                { birthday },
                { headers: { 'Authorization': `Bearer ${token}` } }
            );

            navigate('/life-in-years');
        } catch (error) {
            console.error('Error updating birthday:', error.response.data);
        }
    };

    return (
        <div className="form-box">
            <form className="form" onSubmit={handleSubmit}>
                <span className="title">Select birthday</span>
                <div className="form-container">
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
                </div>

                <div>
                    <button type="submit" className="form-button">Continue</button>
                </div>
            </form>
        </div>
    );

}

export default BirthdayForm;