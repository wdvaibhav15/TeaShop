import Coffee from "../models/CoffeeCup.js";

//ADD CUPS
export const addCoffee = async (req, res) => {
  try {
    const { coffeeTitle, title, price, stockCount, description, imageUrl } = req.body;

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
        const deletedCoffee = await Coffee.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Coffee Deleted Successfully"},deletedCoffee);
    } catch (error) {
        res.status(500).json(error);
    }
};