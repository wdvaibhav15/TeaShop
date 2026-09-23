
import Coffee from "../models/CoffeeCup.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

// ADD CUPS
export const addCoffee = async (req, res) => {
  try {
    const { coffeeTitle, title, price, stockCount, description } = req.body;

    let imageUrl = "";

    if (req.file) {
      const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
      if (cloudinaryResponse) {
        imageUrl = cloudinaryResponse.secure_url;
      }
    }

    const newCoffee = new Coffee({
      coffeeTitle: coffeeTitle || title, 
      price: Number(price),
      stockCount: stockCount ? Number(stockCount) : 0,
      description,
      imageUrl,
    });

    const savedCoffee = await newCoffee.save();
    return res.status(201).json({
      message: "Coffee item added successfully",
      success: true,
      data: savedCoffee,
    });
  } catch (error) {
    console.error("Error in addCoffee:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to add coffee item",
    });
  }
};

// DELETE CUP
export const deleteCoffee = async (req, res) => {
  try {
    const { id } = req.body;
    const coffeeId = id || req.params.id;

    const deletedCoffee = await Coffee.findByIdAndDelete(coffeeId);
    return res.status(200).json({
      message: "Coffee Deleted Successfully",
      success: true,
      data: deletedCoffee
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete coffee"
    });
  }
};