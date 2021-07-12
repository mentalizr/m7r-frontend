import {Model} from "../model/Model";

const ID_USER_NAME = "user-name";

export class UserController {

    public static updateView() {
        document.getElementById(ID_USER_NAME).textContent = Model.user.displayName;
    }

}