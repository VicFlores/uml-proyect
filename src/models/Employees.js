import { Schema, model } from 'mongoose';

const employeeSchema = new Schema({
  name: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: {
    type: String, required: true, unique: true, trim: true,
  },
  password: { type: String, required: true, trim: true },
});

module.exports = model('Employees', employeeSchema);
