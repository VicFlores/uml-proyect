import { Schema, model } from 'mongoose';

const billsSchema = new Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, trim: true },
  from: { type: Date, default: Date.now() },
  to: { type: String, required: true, trim: true },
  client: { type: String, required: true, trim: true },
  employee: { type: Schema.Types.ObjectId, ref: 'Employees', required: true },
});

module.exports = model('Bills', billsSchema);
