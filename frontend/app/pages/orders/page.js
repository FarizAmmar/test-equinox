"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import moment from 'moment';
import { useRouter } from 'next/router';

export default function Orders() {
    const [order, setOrder] = useState([]);

    useEffect(() => {
        fetchOrder();
    }, []);

    const fetchOrder = async () => {
        try {
            const response = await axios.get('http://localhost:5000/orders');
            setOrder(response.data);
        } catch (error) {
            console.error('Error fetching cars:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/orders/${id}`);
            fetchOrder();
        } catch (error) {
            console.error('Error deleting car:', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className='row'>
                <div className="col-6">
                    <h1>Orders </h1>
                </div>
                <div className="col-6 d-flex justify-content-end">
                    <span className="" >
                        <Link className='btn btn-sm btn-success' href="/pages/orders/create">Create</Link>
                    </span>
                </div>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Car Brand</th>
                        <th>Order Date</th>
                        <th>Pickup Date</th>
                        <th>Dropoff Date</th>
                        <th>Pickup Location</th>
                        <th>Dropoff Location</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {order.map((orders) => (
                        <tr key={orders.order_id}>
                            <td>{orders.car_name}</td>
                            <td>{moment(orders.order_date).format('DD/MM/YYYY')}</td>
                            <td>{moment(orders.pickup_date).format('DD/MM/YYYY')}</td>
                            <td>{moment(orders.dropoff_date).format('DD/MM/YYYY')}</td>
                            <td>{orders.pickup_location}</td>
                            <td>{orders.dropoff_location}</td>
                            <td>
                                <Link href={`/pages/orders/edit/${orders.order_id}`} className="btn btn-sm btn-primary me-2">Edit</Link>
                                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(orders.order_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
