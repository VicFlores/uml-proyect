/* eslint-disable prefer-const */
import Bills from '../../models/Bills';
import Employees from '../../models/Employees';

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

    getBill: async (obj, { id }) => {
      const billDB = await Bills.findById({ _id: id });
      return billDB;
    },
  },

  Mutation: {
    newBill: async (obj, { input }, ctx) => {
      const { id } = ctx.employee;
      try {
        const newBill = new Bills(input);
        newBill.employee = id;
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

    warranty: async (obj, { id, input }, ctx) => {
      let warrantyDB = await Bills.findById({ _id: id });
      if (!warrantyDB) {
        return new Error('Bill not founded');
      }
      if (warrantyDB.employee.toString() !== ctx.employee.id) {
        return new Error('you dont have the right credentials');
      }
      try {
        warrantyDB.flaw = input.flaw;
        await warrantyDB.save();
        return warrantyDB;
      } catch (error) {
        return new Error(`warranty, ${error}`);
      }
    },
  },
};
