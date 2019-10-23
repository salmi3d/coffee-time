import * as dialogsModule from "ui/dialogs";

export default function alert(message) {
    return dialogsModule.alert({
        title: "CoffeeTime",
        okButtonText: "OK",
        message: message
    });
}
