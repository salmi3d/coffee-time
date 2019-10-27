import * as dialogsModule from "tns-core-modules/ui/dialogs"

export default function alert(message) {
    return dialogsModule.alert({
        title: "CoffeeTime",
        okButtonText: "OK",
        message: message
    })
}
