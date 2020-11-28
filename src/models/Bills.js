import { Schema, model } from 'mongoose';

const billsSchema = new Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, trim: true },
  from: { type: String, default: new Date().toLocaleDateString() },
  to: { type: String, required: true, trim: true },
  client: { type: String, required: true, trim: true },
  flaw: { type: String, trim: true, default: 'Pendiente' },
  employee: { type: Schema.Types.ObjectId, ref: 'Employees' },
});

module.exports = model('Bills', billsSchema);
