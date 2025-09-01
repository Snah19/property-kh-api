import express from "express";
import { bookmarkPropertyByUserId, createUser, getBookmarkedPropertyIdsByUserId, getBookmarksByUserId, getUserByEmail, getUserById } from "../controllers/user-controllers.js";

const router = express.Router();

router.get("/users/id/:id", getUserById);
router.get("/users/email/:email", getUserByEmail);
router.post("/users/", createUser);
router.get("/users/bookmarks/userId/:userId", getBookmarksByUserId);
router.get("/users/bookmarks/propertyIds/userId/:userId", getBookmarkedPropertyIdsByUserId);
router.patch("/users/bookmarks/userId/:userId", bookmarkPropertyByUserId);

export default router;