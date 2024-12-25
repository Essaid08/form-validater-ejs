const { Router } = require("express");
const {
	userListGet,
	userCreateGet,
	userCreatePost,
    usersUpdateGet,
    usersUpdatePost,
    usersDeletePost,
    userSearchName ,
    userSearch
} = require("../controllers/userController");

const userRouter = Router();

userRouter.get("/", userListGet);

userRouter.get("/create", userCreateGet);
userRouter.post("/create", userCreatePost);

userRouter.get("/:id/update", usersUpdateGet);
userRouter.post("/:id/update", usersUpdatePost);

userRouter.post('/:id/delete' , usersDeletePost)

userRouter.get("/search" , userSearch)
userRouter.post("/search" , userSearchName)



module.exports = userRouter;
