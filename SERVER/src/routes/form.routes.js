

import { Router } from "express";
import { createForm, deleteForm, getAllForms, getForm, updateForm } from "../controllers/form.controller.js";
import { saveResponse, sendResponses } from "../controllers/response.controller.js";

const router = Router();

//admin
router.route("/create-form").post(createForm);
router.route("/forms").get(getAllForms);
router.route("/:id").delete(deleteForm);
router.route("/update-form/:id").put(updateForm);
router.route("/responses/:id").get(sendResponses);

//user
router.route("/:id").get(getForm);
router.route("/:id").post(saveResponse);

export default router;
