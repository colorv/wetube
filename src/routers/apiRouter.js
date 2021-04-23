import express from "express";
import routes from "../routes";
import {
  postAddComment,
  postRegisterView,
  postRemoveComment,
} from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.addComment, postAddComment);
apiRouter.post(routes.removeComment, postRemoveComment);

export default apiRouter;
