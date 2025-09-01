import User from "../models/User.js";

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    }
    catch (error) {
        console.log("Error fetching user by id:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getUserByEmail = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        res.status(200).json(user);
    }
    catch (error) {
        console.log("Error fetching user by email:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const createUser = async (req, res) => {
    try {
        await User.create(req.body);
        res.status(200).json({ isCreated: true });
    }
    catch (error) {
        console.log("Error creating user:", error.message);
        res.status(500).json({ message: "Internal server error" });      
    }
};

export const getBookmarkedPropertyIdsByUserId = async (req, res) => {
    try {
        const { bookmarks } = await User.findOne({ _id: req.params.userId }, { _id: 0, bookmarks: 1 });
        res.status(200).json(bookmarks);
    }
    catch (error) {
        console.log("Error fetching bookmarked property ids by userId:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const bookmarkPropertyByUserId = async (req, res) => {
    try {
        if (!req.body.isBookmarked) {
            await User.findOneAndUpdate({ _id: req.params.userId }, { $push: { bookmarks: req.body.propertyId } }, { new: true });
            res.status(200).json({ isBookmarked: true });
        }
        else {
            await User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { bookmarks: req.body.propertyId } }, { new: true });
            res.status(200).json({ isBookmarked: false });
        } 
    }
    catch (error) {
        console.log("Error adding bookmark by email:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getBookmarksByUserId = async (req, res) => {
    try {
        const { bookmarks } = await User.findById(req.params.userId).populate("bookmarks");
        res.status(200).json(bookmarks);
    }
    catch (error) {
        console.log("Error adding bookmark by email:", error.message);
        res.status(500).json({ message: "Internal server error" });        
    }
};