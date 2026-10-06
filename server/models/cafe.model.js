import mongoose from "mongoose";

const cafeSchema = new mongoose.Schema(
  {
    cafeName: {
      type: String,
      required: true,
    },

    cafeAddress: {
      type: String,
      required: true,
    },

    cafeContact: {
      type: String,
      required: true,
    },

    cafeEmail: {
      type: String,
      required: true,
    },

    cafeTiming: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Cafe = mongoose.models.Cafe || mongoose.model("Cafe", cafeSchema);

export default Cafe;