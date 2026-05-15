import express from "express";

import {
  addControle,
  deleteControle,
  getControles,
  updateControle,
} from "../controllers/controle.js";

const router = express.Router();

router.get("/", getControles);

router.post("/", addControle);

router.put("/:id", updateControle);

router.delete("/:id", deleteControle);

export default router;