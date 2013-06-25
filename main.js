var mappings = {
"BackQuote":"$",
"Digit1":"\"",
"Digit2":"«",
"Digit3":"»",
"Digit4":"(",
"Digit5":")",
"Digit6":"@",
"Digit7":"+",
"Digit8":"-",
"Digit9":"/",
"Digit0":"*",
"Minus":"=",
"Equal":"%",
"KeyQ":"b",
"KeyW":"é",
"KeyE":"p",
"KeyR":"o",
"KeyT":"è",
"KeyY":"^",
"KeyU":"v",
"KeyI":"d",
"KeyO":"l",
"KeyP":"j",
"BracketLeft":"z",
"BlacketRight":"w",
"KeyA":"a",
"KeyS":"u",
"KeyD":"i",
"KeyF":"e",
"KeyG":",",
"KeyH":"c",
"KeyJ":"t",
"KeyK":"s",
"KeyL":"r",
"Semicolon":"n",
"Quote":"m",
"Backslash":"ç",
"IntlBackslash":"ê",
"KeyZ":"à",
"KeyX":"y",
"KeyC":"x",
"KeyV":".",
"KeyB":"k",
"KeyN":"'",
"KeyM":"q",
"Comma":"g",
"Period":"h",
"Slash":"f",
"Space":" "
}

var ime_api = chrome.input.ime;

var context_id = -1;

ime_api.onFocus.addListener(function(context) {
  context_id = context.contextID;
});
ime_api.onBlur.addListener(function(contextID) {
  context_id = -1;
});

ime_api.onKeyEvent.addListener(
function(engineID, keyData) {
  if (keyData.type == "keydown" && mappings.hasOwnProperty(keyData.code)) {
    chrome.input.ime.commitText({"contextID": context_id,
                                 "text": mappings[keyData.code]});
    return true;
  }

  return false;
});
