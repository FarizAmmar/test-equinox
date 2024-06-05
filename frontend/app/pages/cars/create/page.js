"use client";
import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function NewCarForm({ fetchCars }) {
    const [carName, setCarName] = useState('');
    const [dayRate, setDayRate] = useState('');
    const [monthRate, setMonthRate] = useState('');
    const [image, setImage] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/cars', {
                car_name: carName,
                day_rate: dayRate,
                month_rate: monthRate,
                image: image,
            });
            setSuccess('Car added successfully');
            setError('');
            setCarName('');
            setDayRate('');
            setMonthRate('');
            setImage('');
            if (fetchCars) {
                fetchCars();
            }
        } catch (error) {
            setError('Error adding car');
            setSuccess('');
            console.error('There was an error adding the car:', error);
        }
    };

    return (
        <main className="container mt-5">
            <h1 className="mb-4">Add a New Car</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="carName">Car Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="carName"
                        value={carName}
                        onChange={(e) => setCarName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="dayRate">Day Rate</label>
                    <input
                        type="number"
                        className="form-control"
                        id="dayRate"
                        value={dayRate}
                        onChange={(e) => setDayRate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="monthRate">Month Rate</label>
                    <input
                        type="number"
                        className="form-control"
                        id="monthRate"
                        value={monthRate}
                        onChange={(e) => setMonthRate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="image">Image</label>
                    <input
                        type="text"
                        className="form-control"
                        id="image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Car</button>
            </form>
            <div className="mt-4">
                <Link href="/pages/cars" className="btn btn-secondary">Back to Home</Link>
            </div>
        </main>
    );
}
