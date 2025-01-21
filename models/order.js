const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    deviceModel: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default: 'Aberta' },
    trackingCode: { type: String, unique: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
