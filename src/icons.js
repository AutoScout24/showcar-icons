var icons = {};
var regex = /^\.\/([^\.]+)\.svg$/gm;

function importAll(r) {
  r.keys().forEach(function(key) {
    icons[key.toLowerCase().replace(regex, "$1")] = r(key); 
  });
}

importAll(require.context("../icons", true, /\.svg$/));

var proto = Object.create(HTMLElement.prototype);

function inlineIconIntoElement(el) {
  var type = el.getAttribute("type");
  try {
    if (type) {
      el.innerHTML = icons[type.toLowerCase()].default;
    }
  } catch(e) {
    console.error('Could not create icon with type', type, e);
  }
};

proto.attachedCallback = function() {
  inlineIconIntoElement(this);
};

proto.attributeChangedCallback = function(attributeName, previousValue, value) {
  if (attributeName === "type") {
    inlineIconIntoElement(this);
  }
};

try {
  document.registerElement("as24-icon", { prototype: proto });
} catch (e) {
  if (window && window.console) {
    window.console.warn('Failed to register CustomElement "as24-icon".', e);
  }
}

window.showcarIconNames = Object.keys(icons);