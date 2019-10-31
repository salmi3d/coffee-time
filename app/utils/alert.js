import * as dialogsModule from 'tns-core-modules/ui/dialogs'

export default (message) => {
    return dialogsModule.alert({
        title: 'CoffeeTime',
        okButtonText: 'OK',
        message: message
    })
}
