"use strict";

export default class Page {
  open(path = '') {
    browser.url(path);
    let engine = process.argv[3].split('=')[1];
    if (engine.includes('selenium')) {
      browser.maximizeWindow();
    }
    else {
      browser.setWindowSize(1200, 800);
    }

    browser.pause(5000);
  }
}
