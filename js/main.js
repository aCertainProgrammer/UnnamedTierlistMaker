import UserInterface from "./user_interface.js";
import Controller from "./controller.js";

let user_interface = new UserInterface();
let controller = new Controller(user_interface);

controller.process();
