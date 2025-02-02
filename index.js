const {dialog} = require('electron');

let confirmQuit = true;
let beforeQuitHandler;

const createBeforeQuitHandler = app => {
  let quitConfirmed = false;
  return event => {
    if (confirmQuit && !quitConfirmed && app.getWindows().size) {
      event.preventDefault();
      dialog.showMessageBox({
        type: 'question',
        buttons: ['OK', 'Cancel'],
        defaultId: 0,
        title: 'Quit Hyper?',
        message: 'Quit Hyper?',
        detail: 'All sessions will be closed.'
      }).then(({response}) => {
        if (response === 0) {
          quitConfirmed = true;
          app.quit();
        }
      });
    }
  };
};


exports.onApp = app => {
  switch (process.platform) {
    case 'win32':
      // Windows not supported
      break;
      default:
        if (beforeQuitHandler) {
          app.off('before-quit', beforeQuitHandler);
        }
        
        beforeQuitHandler = createBeforeQuitHandler(app);
        app.on('before-quit', beforeQuitHandler);
        
        break;
      }
    };
  