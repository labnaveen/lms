import { Router } from "express";
import Auth from "../middlewares/Auth.js";
import { checkPermission } from "../middlewares/CheckPermission.js";
import { PERMISSIONS } from "../constants/Constants.js";
import { addStream, deleteStream, getStreamsList, updateStream, fetchStreamDetails } from "../controllers/streamController.js";
import { streamAddSchema, streamUpdateSchema } from "../schemas/streamJoiSchema.js";
import { validateBody } from "../middlewares/ValidateRequest.js";

const streamRouter = Router();

streamRouter.get("/", Auth.authenticate(), checkPermission(PERMISSIONS.READ_STREAM), getStreamsList);

streamRouter.post("/", Auth.authenticate(), checkPermission(PERMISSIONS.CREATE_STREAM), validateBody(streamAddSchema), addStream);

streamRouter.put("/:stream_uuid", Auth.authenticate(), checkPermission(PERMISSIONS.UPDATE_STREAM), validateBody(streamUpdateSchema), updateStream);

streamRouter.delete("/:stream_uuid", Auth.authenticate(), checkPermission(PERMISSIONS.DELETE_STREAM), deleteStream);
streamRouter.get("/:stream_uuid", Auth.authenticate(), checkPermission(PERMISSIONS.READ_STREAM), fetchStreamDetails);

export default streamRouter;
