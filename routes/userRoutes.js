import * as userController from "../controllers/userController.js";
let currentUser = null;

export default function UserRoutes(app) {
  const createUser = async (req, res) => { 
    const user = await userController.createUser(req.body);
    res.json(user);


  };
  const deleteUser = async (req, res) => {       
    const status = await userController.deleteUser(req.params.userId);
    res.json(status);
  };
  const findAllUsers = async (req, res) => { 
    const { role, name } = req.query;
    if (role) {
      const users = await userController.findUsersByRole(role);
      res.json(users);
      return;
    }
    if (name) {
      const users = await userController.findUsersByPartialName(name);
      res.json(users);
      return;
    }
  
    const users = await userController.findAllUsers();
    res.json(users);
  };
  const findUserById = async (req, res) => {
    const user = await userController.findUserById(req.params.userId);
    res.json(user);
  };
  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const status = await userController.updateUser(userId, req.body);
    res.json(status);
  };

  const signup = async (req, res) => { };
  const signin = async (req, res) => { };
  const signout = (req, res) => { };
  const profile = async (req, res) => { };
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
} 
