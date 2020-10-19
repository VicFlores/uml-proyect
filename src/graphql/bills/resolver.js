/* eslint-disable prefer-const */
import Bills from '../../models/Bills';
import Employees from '../../models/Employees'

exports.resolver = {

  Query: {
    getBills: async (obj, {}, ctx) => {
      try {
        const { id } = ctx.employee;
        const billsDB = await Bills.find({ employee: id });
        return billsDB;
      } catch (error) {
        return new Error(`getBills, ${error}`);
      }
    },
  },

  Mutation: {
    newBill: async (obj, { input }, ctx) => {
      const { employee } = input;
      const { id } = ctx.employee;
      const employeeDB = await Employees.findById(employee);
      if (employeeDB.id !== id) {
        return new Error('you dont have the right credentials');
      }
      try {
        const newBill = new Bills(input);
        const billsDB = await newBill.save();
        return billsDB;
      } catch (error) {
        return new Error(`newBill, ${error}`);
      }
    },

    updateBill: async (obj, { id, input }, ctx) => {
      let billsDB = await Bills.findById(id);
      if (!billsDB) {
        throw new Error('Bill dont founded');
      }
      if (billsDB.employee.toString() !== ctx.employee.id) {
        return new Error('you dont have the right credentials');
      }
      billsDB = await Bills.findOneAndUpdate({ _id: id }, input, { new: true });
      return billsDB;
    },

    deleteBill: async (obj, { id }, ctx) => {
      const billsDB = await Bills.findById(id);
      if (!billsDB) {
        throw new Error('Bill dont founded');
      }
      if (billsDB.employee.toString() !== ctx.employee.id) {
        return new Error('you dont have the right credentials');
      }
      await Bills.findByIdAndDelete({ _id: id });
      return 'Bill successfully deleted';
    },
  },
}