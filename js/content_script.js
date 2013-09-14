var lastInput;

$(function() {
  $("input[type=text], textarea").focus(function() {
    lastInput = this;
  });
});
  

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  var text;
  if (request.type == "add") {
    text = $(lastInput).val() + request.text;
  } else if (request.type == "set") {
    text = request.text;
  }
  $(lastInput).val(text);
  sendResponse({response: "ok"});
});