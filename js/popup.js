$(function() {
  $("#textbox").focus().keyup(textbox_change);
});


function textbox_change(e) {
  var text = $(this).val();
  $("#snippets").html(text);
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    console.log(tabs[0].id);
    chrome.tabs.sendMessage(tabs[0].id, {text: text}, function(response) {
      console.log(response);
    });
  });
}