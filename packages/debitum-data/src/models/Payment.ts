import * as mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';

import * as i from '../interfaces';

const PaymentSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  dueDate: {
    type: Date,
    required: true,
  },

  repeatInterval: {
    type: String,
  },

  repeatDesignator: {
    type: String,
  },

  createdAt: {
    type: Date,
  },

  updatedAt: {
    type: Date,
  },
});

interface Payment extends i.Payment, Document {}

export default mongoose.model<Payment>('Payment', PaymentSchema);
