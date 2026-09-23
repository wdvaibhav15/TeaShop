import mongoose from 'mongoose';

const coffeeSchema = new mongoose.Schema(
  {
    coffeeTitle: {
      type: String,
      required: [true, 'Coffee title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },

    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be a positive number'],
    },

    stockCount: {
      type: Number,
      default: 0,
      min: [0, 'Stock count cannot be negative'],
    },

    description: {
      type: String,
      trim: true,
      default: '',
    },

    imageUrl: {
      type: String,
      trim: true,
      default: '',
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { 
    timestamps: true 
  }
);

// Check if model already exists to prevent overwrite errors in development/reloads
const Coffee = mongoose.models.CoffeeCup || mongoose.model('CoffeeCup', coffeeSchema);

export default Coffee;