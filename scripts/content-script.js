// detect whatapp
// 
console.log("Content Script loaded");
/*var whatsAppConnected = false;
chrome.tabs.query({url: 'http://fontawesome.io/cheatsheet/'}, function(tabs) {

	if(tabs.length > 0)
		whatsAppConnected= true;
	console.log(whatsAppConnected);

});*/

// listen for incoming messages
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

  	console.log(jQuery === undefined);


  	var titles= [];
  	var allChats = document.getElementsByClassName('chat-title');

  	var abcElements = document.querySelectorAll('.chat-drag-cover');

  	$(abcElements[2]).triggerHandler('Click');
  	$(abcElements[2]).triggerHandler('MouseDown');
  	console.log($(abcElements[2]))

	
	// Set their ids
	for (var i = 0; i < abcElements.length; i++){
	    abcElements[i].id = 'abc-' + i;
	}

    for(var i=0; i < allChats.length; i++){
    	
    	var title = allChats[i].children[0].getAttribute('title');
   	
    	titles.push({ 'name' : title, 'url': 'http://' });
    }

    //console.log(titles);

    if (request.greeting == "hello")
      	sendResponse({'group': titles});

});