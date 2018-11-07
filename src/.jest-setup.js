const jsdom = require('jsdom');

const documentHTML = '<!doctype html><html><body><div id="root"></div></body></html>';
const dom = new jsdom.JSDOM(documentHTML);
global.document = dom.window.document;
global.window = dom.window;
global.window.resizeTo = (width, height) => {
    global.window.innerWidth = width || global.window.innerWidth;
    global.window.innerHeight = width || global.window.innerHeight;
    global.window.dispatchEvent(new Event('resize'));
};
global.window.requestAnimationFrame = jest.fn();
global.window.cancelAnimationFrame = jest.fn();

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

global.window.HTMLDialogElement.prototype.show = function() {};

global.window.HTMLDialogElement.prototype.showModal = function() {
    // this.setAttribute('open');
};

global.window.HTMLDialogElement.prototype.hide = function() {
    // this.removeAttribute('open');
};

global.window.HTMLDialogElement.prototype.animate = function() {
    return {};
};

Enzyme.configure({ adapter: new Adapter() });
