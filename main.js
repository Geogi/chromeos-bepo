var mappings = {
  "BackQuote": ["$", "#", "", ""],
  "Digit1": ["\"", "1", "—", "„"],
  "Digit2": ["«", "2", "<", "“"],
  "Digit3": ["»", "3", ">", "”"],
  "Digit4": ["(", "4", "[", "≤"],
  "Digit5": [")", "5", "]", ""],
  "Digit6": ["@", "6", "^", ""],
  "Digit7": ["+", "7", "±", "¬"],
  "Digit8": ["-", "8", "−", "¼"],
  "Digit9": ["/", "9", "÷", "½"],
  "Digit0": ["*", "0", "×", "¾"],
  "Minus": ["=", "°", "≠", "′"],
  "Equal": ["%", "`", "‰", "″"],
  "KeyQ": ["b", "B", "|", "¦"],
  "KeyW": ["é", "É", "´", "˝"],
  "KeyE": ["p", "P", "&", "§"],
  "KeyR": ["o", "O", "œ", "Œ"],
  "KeyT": ["è", "È", "`", "`"],
  "KeyY": ["^", "!", "¡", ""],
  "KeyU": ["v", "V", "ˇ", ""],
  "KeyI": ["d", "D", "ð", "Ð"],
  "KeyO": ["l", "L", "/", ""],
  "KeyP": ["j", "J", "ĳ", "Ĳ"],
  "BracketLeft": ["z", "Z", "ə", "Ə"],
  "BlacketRight": ["w", "W", "˘", ""],
  "KeyA": ["a", "A", "æ", "Æ"],
  "KeyS": ["u", "U", "ù", "Ù"],
  "KeyD": ["i", "I", "¨", "˙"],
  "KeyF": ["e", "E", "€", "¤"],
  "KeyG": [",", ";", "’", "̛"],
  "KeyH": ["c", "C", "©", "ſ"],
  "KeyJ": ["t", "T", "þ", "Þ"],
  "KeyK": ["s", "S", "ß", "ẞ"],
  "KeyL": ["r", "R", "®", "™"],
  "Semicolon": ["n", "N", "~", ""],
  "Quote": ["m", "M", "¯", "º"],
  "Backslash": ["ç", "Ç", "¸", ","],
  "IntlBackslash": ["ê", "Ê", "/", ""],
  "KeyZ": ["à", "À", "\\", ""],
  "KeyX": ["y", "Y", "{", "‘"],
  "KeyC": ["x", "X", "}", "’"],
  "KeyV": [".", ":", "…", "·"],
  "KeyB": ["k", "K", "~", ""],
  "KeyN": ["'", "?", "¿", "̉"],
  "KeyM": ["q", "Q", "°", "̣"],
  "Comma": ["g", "G", "µ", ""],
  "Period": ["h", "H", "†", "‡"],
  "Slash": ["f", "F", "˛", "ª"],
  "Space": [" ", " ", "_", " "]
}

var ime_api = chrome.input.ime;

var context_id = -1;
var altGr = false;

ime_api.onFocus.addListener(function(context) {
  context_id = context.contextID;
});
ime_api.onBlur.addListener(function(contextID) {
  context_id = -1;
});
ime_api.onDeactivated.addListener(function(engineID) {
  altGr = false;
});

ime_api.onKeyEvent.addListener(
function(engineID, keyData) {
  if (keyData.type == "keydown" && keyData.code == "AltRight") {
    altGr = true;
  }
  if (keyData.type == "keyup" && keyData.code == "AltRight") {
    altGr = false;
  }
  if (keyData.type == "keydown" && mappings.hasOwnProperty(keyData.code)) {
    var state = 0 + (keyData.shiftKey ? 1 : 0) + (altGr ? 2 : 0);
    var text = mappings[keyData.code][state];
    chrome.input.ime.commitText({"contextID": context_id,
                                 "text": text + ""});
    return true;
  }

  return false;
});
