var keys = {};


$(function() {
  for (var i = 65; i <= 90; i++) {
    keys[i] = String.fromCharCode(i);
  }
  $(".key").each(function() {
    var letter = $(this).attr("id");
    var $key = $(this);
    var snippet = chrome.storage.local.get(letter, function(item) {
      var snippet = item[letter];
      if (snippet) {
        console.log("Found snippet for E: " + snippet);
        $key.children(".snippet").text(snippet);
      }
    });
    $key.children(".letter").text(letter);
  });
  
  $("body").keydown(keydown).keyup(keyup);
  $("#setSnippet").click(setSnippet);
});

function keydown(e) {
  var text = $("#" + keys[e.which]).children(".snippet").text();
  if (!text) {
    return;
  }
  $("#" + text).addClass("key-active");
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {type: "add", text: text}, function(response) {
      console.log(response);
    });
  });
}


function keyup(e) {
  $("#" + keys[e.which]).removeClass("key-active");
}


function setSnippet() {
  var letter = $("#letter").val().toUpperCase();
  var snippet = $("#snippet").val();
  if (snippet) {
    var setting = {};
    setting[letter] = snippet;
    chrome.storage.local.set(setting, function() {
      $("#letter").val("");
      $("#snippet").val("");
      $("#" + letter).children(".snippet").text(setting[letter]);
    });
  } else {
    chrome.storage.local.remove(letter, function() {
      $("#letter").val("");
      $("#" + letter).children(".snippet").text("");
    });
  }
}