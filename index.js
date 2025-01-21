const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const Order = require('./models/order'); // Importando o modelo
const app = express();

app.use(bodyParser.json());
app.use(cors());

const PORT = 3000;
const MONGO_URI = 'seu-link-de-banco-de-dados';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/orders', async (req, res) => {
    const { customerName, deviceModel, description } = req.body;

    try {
        const trackingCode = Math.random().toString(36).substr(2, 9);
        const newOrder = new Order({ customerName, deviceModel, description, trackingCode });
        await newOrder.save();
        res.status(201).send(newOrder);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/orders/:trackingCode', async (req, res) => {
    try {
        const order = await Order.findOne({ trackingCode: req.params.trackingCode });
        if (!order) return res.status(404).send('Order not found');
        res.status(200).send(order);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.put('/orders/:trackingCode', async (req, res) => {
    try {
        const updatedOrder = await Order.findOneAndUpdate(
            { trackingCode: req.params.trackingCode },
            req.body,
            { new: true }
        );
        if (!updatedOrder) return res.status(404).send('Order not found');
        res.status(200).send(updatedOrder);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
