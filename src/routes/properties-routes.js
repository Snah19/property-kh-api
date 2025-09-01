import express from "express";
import { deletePropertyById, getPostedProperties, getProperties, getPropertyById, getPropertyHeaderImageById, getRecentProperties, getSearchedProperties, postProperty, updatePropertyById } from "../controllers/property-controllers.js";

const router = express.Router();

router.get("/properties/", getProperties);
router.get("/recent-properties/", getRecentProperties);
router.get("/properties/:id/", getPropertyById);
router.get("/properties/search/searchResults", getSearchedProperties);
router.get("/properties/header-image/:id/", getPropertyHeaderImageById);
router.post("/properties/post/", postProperty);
router.get("/properties/users/:id/", getPostedProperties);
router.delete("/properties/:id/", deletePropertyById);
router.patch("/properties/update/:id/", updatePropertyById);

export default router;