"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function NewOrdersForm() {
    const [cars, setCars] = useState([]);
    const [selectedCarId, setSelectedCarId] = useState('');
    const [pickupDate, setPickupDate] = useState('');
    const [dropoffDate, setDropoffDate] = useState('');
    const [pickupLocation, setPickupLocation] = useState('');
    const [dropoffLocation, setDropoffLocation] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            const response = await axios.get('http://localhost:5000/cars');
            setCars(response.data);
        } catch (error) {
            console.error('Error fetching cars:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const orderDate = new Date();

        try {
            const response = await axios.post('http://localhost:5000/orders', {
                car_id: selectedCarId,
                order_date: orderDate,
                pickup_date: pickupDate,
                dropoff_date: dropoffDate,
                pickup_location: pickupLocation,
                dropoff_location: dropoffLocation,
            });
            setSuccess('Order added successfully');
            setError('');
            setSelectedCarId('');
            setPickupDate('');
            setDropoffDate('');
            setPickupLocation('');
            setDropoffLocation('');
        } catch (error) {
            setError('Error adding order');
            setSuccess('');
            console.error('There was an error adding the order:', error);
        }
    };

    return (
        <main className="container mt-5">
            <h1 className="mb-4">Add new order</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="carName">Select Car</label>
                    <select
                        className="form-control"
                        id="carName"
                        value={selectedCarId}
                        onChange={(e) => setSelectedCarId(e.target.value)}
                        required
                    >
                        <option value="" hidden disabled>Select a car</option>
                        {cars.map((car) => (
                            <option key={car.car_id} value={car.car_id}>
                                {car.car_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="pickupDate">Pickup Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="pickupDate"
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="dropoffDate">Dropoff Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="dropoffDate"
                        value={dropoffDate}
                        onChange={(e) => setDropoffDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="pickupLocation">Pickup Location</label>
                    <input
                        type="text"
                        className="form-control"
                        id="pickupLocation"
                        value={pickupLocation}
                        onChange={(e) => setPickupLocation(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="dropoffLocation">Dropoff Location</label>
                    <input
                        type="text"
                        className="form-control"
                        id="dropoffLocation"
                        value={dropoffLocation}
                        onChange={(e) => setDropoffLocation(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Order</button>
            </form>
            <div className="mt-4">
                <Link href="/pages/orders" className="btn btn-secondary">Back to Home</Link>
            </div>
        </main>
    );
}
