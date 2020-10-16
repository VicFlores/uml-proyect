/* eslint-disable no-empty-pattern */
/* eslint-disable no-param-reassign */
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Employees from '../../models/Employees';

require('dotenv').config({ path: 'variables.env' });

const createToken = (employee, secret, expiresIn) => {
  const {
    id, name, lastName, email,
  } = employee;
  return jwt.sign({
    id, name, lastName, email,
  }, secret, { expiresIn });
};

exports.resolver = {

  Query: {
    getEmployee: async (obj, {}, ctx) => ctx.employee,
  },

  Mutation: {
    newEmployee: async (obj, { input }) => {
      const { email, password } = input;

      const verifyEmp = await Employees.findOne({ email });

      if (verifyEmp) {
        return new Error('User already exist');
      }

      input.password = await bcryptjs.hash(password, 10);

      try {
        const employeeDB = new Employees(input);
        employeeDB.save();
        return employeeDB;
      } catch (error) {
        return new Error(`(newEmployee), ${error}`);
      }
    },

    authEmployee: async (obj, { input }) => {
      const { email, password } = input;
      const verifyEmp = await Employees.findOne({ email });

      if (!verifyEmp) {
        return new Error('!User or password incorrect');
      }

      const correctPassword = await bcryptjs.compare(password, verifyEmp.password);

      if (!correctPassword) {
        return new Error('User or !password incorrect');
      }

      return {
        token: createToken(verifyEmp, process.env.SECRET, '24h'),
      };
    },
  },
};
