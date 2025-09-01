import Property from "../models/Property.js";
import Message from "../models/Message.js";
import User from "../models/User.js";

export const getProperties = async (req, res) => {
  try {
    const total = await Property.countDocuments();

    const limit = Number(req.query.limit) || 12; // default 12
    const page = Number(req.query.page) || 1;    // default 1
    const skip = (page - 1) * limit;

    const properties = await Property.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
    res.status(200).json({ properties, total });
  } catch (error) {
    console.log("Error fetching properties", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getRecentProperties = async (_, res) => {
  try {
    const recentProperties = await Property.find().sort({ createdAt: -1 }).limit(12);
    res.status(200).json(recentProperties);
  }
  catch (error) {
    console.log("Error fetching recent ptoperties", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    res.status(200).json(property);
  }
  catch (error) {
    console.log("Error fetching a single property:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPropertyHeaderImageById = async (req, res) => {
  try {
    const { images } = await Property.findById(req.params.id).select("images");
    res.status(200).json(images[0]);
  }
  catch (error) {
    console.log("Error fetching a property header image:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const postProperty = async (req, res) => {
  try {
    const { _id } = await Property.create(req.body);
    res.status(201).json({ _id });
  }
  catch (error) {
    console.log("Error posting property:", error.message);
    res.status(500).json({ message: "Internal server error" });
  };
};

export const getPostedProperties = async (req, res) => {
  try {
    const properties = await Property.find({owner: req.params.id}).sort({ createdAt: -1 });
    res.status(200).json(properties);
  }
  catch (error) {
    console.log("Error fetching posted properties:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deletePropertyById = async (req, res) => {
  try {
    await Message.deleteMany({ property_id: req.params.id });
    await User.updateMany({ _id: req.params.userId }, { $pull: { bookmarks: req.params.id } }, { new: true });
    await Property.findByIdAndDelete(req.params.id);
    res.status(200).json({ isDeleted: true });
  }
  catch (error) {
    console.log("Error deleting property:", error.message);
    res.status(500).json({ message: "Internal server error" });  
  }
};

export const updatePropertyById = async (req, res) => {
  try {
    const { _id } = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ _id });
  }
  catch (error) {
    console.log("Error updating property:", error.message);
    res.status(500).json({ message: "Internal server error" });  
  }
};