const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 5000;

// PostgreSQL connection pool
const pool = new Pool({
  user: 'gallahads',
  host: 'localhost',
  database: 'car_rental',
  password: 'Rafa22jan',
  port: 5432,
});

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// CRUD endpoints for cars

// GET all cars
app.get('/cars', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM cars ORDER BY car_name DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET a car by id
app.get('/cars/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM cars WHERE car_id = $1', [id]);
    if (rows.length === 0) {
      res.status(404).json({ error: 'Car not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Error fetching car:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST a new car
app.post('/cars', async (req, res) => {
  const { car_name, day_rate, month_rate, image } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO cars (car_name, day_rate, month_rate, image) VALUES ($1, $2, $3, $4) RETURNING *',
      [car_name, day_rate, month_rate, image]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error creating car:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT update a car by id
app.put('/cars/:id', async (req, res) => {
  const { id } = req.params;
  const { car_name, day_rate, month_rate, image } = req.body;
  try {
    const { rows } = await pool.query(
      'UPDATE cars SET car_name = $1, day_rate = $2, month_rate = $3, image = $4 WHERE car_id = $5 RETURNING *',
      [car_name, day_rate, month_rate, image, id]
    );
    if (rows.length === 0) {
      res.status(404).json({ error: 'Car not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Error updating car:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE a car by id
app.delete('/cars/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('DELETE FROM cars WHERE car_id = $1 RETURNING *', [id]);
    if (rows.length === 0) {
      res.status(404).json({ error: 'Car not found' });
    } else {
      res.json({ message: 'Car deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting car:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// CRUD endpoints for orders

// GET all orders
app.get('/orders', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT O.*, C.car_name FROM orders AS O INNER JOIN cars AS C ON O.car_id = C.car_id ORDER BY order_date DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET an order by id
app.get('/orders/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('SELECT O.*, C.car_name FROM orders AS O INNER JOIN cars AS C ON O.car_id = C.car_id WHERE O.order_id = $1', [id]);
    if (rows.length === 0) {
      res.status(404).json({ error: 'Order not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST a new order
app.post('/orders', async (req, res) => {
  const { car_id, order_date, pickup_date, dropoff_date, pickup_location, dropoff_location } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO orders (car_id, order_date, pickup_date, dropoff_date, pickup_location, dropoff_location) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [car_id, order_date, pickup_date, dropoff_date, pickup_location, dropoff_location]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT update an order by id
app.put('/orders/:id', async (req, res) => {
  const { id } = req.params;
  const { car_id, order_date, pickup_date, dropoff_date, pickup_location, dropoff_location } = req.body;
  try {
    const { rows } = await pool.query(
      'UPDATE orders SET car_id = $1, order_date = $2, pickup_date = $3, dropoff_date = $4, pickup_location = $5, dropoff_location = $6 WHERE order_id = $7 RETURNING *',
      [car_id, order_date, pickup_date, dropoff_date, pickup_location, dropoff_location, id]
    );
    if (rows.length === 0) {
      res.status(404).json({ error: 'Order not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE an order by id
app.delete('/orders/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('DELETE FROM orders WHERE order_id = $1 RETURNING *', [id]);
    if (rows.length === 0) {
      res.status(404).json({ error: 'Order not found' });
    } else {
      res.json({ message: 'Order deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
