"use client";
import React, { useState, useEffect } from 'react';

import axios from 'axios';
import Link from 'next/link';

export default function EditCarForm({ params, fetchCars }) {
    const [carName, setCarName] = useState('');
    const [dayRate, setDayRate] = useState('');
    const [monthRate, setMonthRate] = useState('');
    const [image, setImage] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        getCars();
    }, []);

    const getCars = async () => {
        try {
            const response = await axios.get('http://localhost:5000/cars/' + params.cars_id);
            setCarName(response.data.car_name);
            setDayRate(response.data.day_rate);
            setMonthRate(response.data.month_rate);
            setImage(response.data.image);
        } catch (error) {
            console.error('Error fetching cars:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:5000/cars/' + params.cars_id, {
                car_name: carName,
                day_rate: dayRate,
                month_rate: monthRate,
                image: image,
            });
            setSuccess('Car edit successfully');
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
            <h1 className="mb-4">Edit Car</h1>
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
                <button type="submit" className="btn btn-primary">Save Changes</button>
            </form>
            <div className="mt-4">
                <Link href="/pages/cars" className="btn btn-secondary">Back to Home</Link>
            </div>
        </main>
    );
}
