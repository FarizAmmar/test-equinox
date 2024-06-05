"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Cars() {
    const [cars, setCars] = useState([]);

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

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/cars/${id}`);
            fetchCars();
        } catch (error) {
            console.error('Error deleting car:', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className='row'>
                <div className="col-6">
                    <h1>Cars</h1>
                </div>
                <div className="col-6 d-flex justify-content-end">
                    <span className="" >
                        <Link className='btn btn-sm btn-success' href="/pages/cars/create">Create</Link>
                    </span>
                </div>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Brand</th>
                        <th>Day Rate</th>
                        <th>Month Rate</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cars.map((car) => (
                        <tr key={car.car_id}>
                            <td>{car.car_name}</td>
                            <td>Rp. {car.day_rate}</td>
                            <td>Rp. {car.month_rate}</td>
                            <td>
                                <Link href={`/pages/cars/edit/${car.car_id}`} className="btn btn-sm btn-primary me-2">Edit</Link>
                                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(car.car_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
