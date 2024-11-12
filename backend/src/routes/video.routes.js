import { Router } from "express";
import { validateJwt } from "../middlewares/validarJWT.js";
import { createVideoCtrl, deleteVideoCtrl, getAllGeneralVideos, getAllVideoCtrl, getVideoByCategoryCtrl, getVideoByIdCtrl } from "../controllers/video.controller.js";

const videoRouter = Router();

videoRouter.get('/general', getAllGeneralVideos)
videoRouter.get('/', validateJwt, getAllVideoCtrl);
videoRouter.get('/:id', getVideoByIdCtrl);
videoRouter.get('/category/:categoryId', getVideoByCategoryCtrl)
videoRouter.post('/', validateJwt, createVideoCtrl);
videoRouter.delete('/:id', validateJwt, deleteVideoCtrl);

export { videoRouter }