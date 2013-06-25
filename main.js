// Copyright 2013 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

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
  if (keyData.type == "keydown") {
    chrome.input.ime.commitText({"contextID": context_id,
                                 "text": keyData.code});
    return true;
  }

  return false;
});
