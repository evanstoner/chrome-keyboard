var lastInput;

$(function() {
  $("input[type=text], textarea").focus(function() {
    lastInput = this;
    console.log(lastInput);
  });
});
  

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  $(lastInput).val(request.text);
  sendResponse({response: "ok"});
});