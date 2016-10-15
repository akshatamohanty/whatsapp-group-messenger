var WINDOW_WIDTH = '300px';


$(document).ready(function(){

	var selected = [];
	updateCount();

	getGroups();

	function toggleSelected(group){

		var index = selected.indexOf(group);

		if( index == -1)
			selected.push(group)
		else{
			selected.splice(index, 0);
		}

		updateCount();

	}

	function updateCount(){

		$('.selected-count').html(selected.length + " selected ");

	}

	function addGroup(group){

		var groupList = $('.group-list');
		
		var groupContainer = $('<div></div>').addClass('group-container');
		var groupName = $('<span></span').addClass('group-name').html(group);
		
		groupContainer.append(groupName);

		groupList.append(groupContainer);

		groupContainer.click(function(e){

			var group = $(this).find('.group-name');

			group.toggleClass('selected');

			// push
			toggleSelected(group.html());

		})
	}


	function getGroups(){

		chrome.tabs.query({url: 'https://web.whatsapp.com/'}, function(tabs) {

			if(tabs.length > 0){

				// get groups from this tab
				chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {

					if(response !== undefined && response.group !== undefined){
					    if(response.group.length > 0){

						    for(var i=0; i < response.group.length; i++){

									addGroup(response.group[i].name);

							}
					    	
					    }
					    else{

					    	// do something
					    }
				  	}
				  	else{
				  		$('.group-list').html("<span>Unable to connect to WhatsApp. <br>Please ensure WhatsApp Web is open and connected.")
				  	}
				})
				
			}
			else{
				$('.group-list').html("<span>Unable to connect to WhatsApp. <br>Please ensure WhatsApp Web is open and connected.")
			}


		});

		// get groups from content-script
		// 
		// 
/*		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		  
		  chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
		    
		  	if(response !== undefined && response.groups !== undefined){
			    if(response.groups.length > 0){

				    for(var i=0; i < response.groups.length; i++){

							addGroup("MUM-PUN-CHD" + i);

					}
			    	
			    }
			    else{

			    	
			    }
		  	}

		  });
		});*/
		

	}

	$("#match-pattern").on('keyup', function (e) {
	    
	    if (e.keyCode == 13) {

	    	// select all elements that match the pattern
	    	var all_groups = $('.group-name');
	    	for(var i=0; i<all_groups.length; i++){

	    		var group =  $(all_groups[i]);
	    		var text = group.html();
	    		var regex = $("#match-pattern").val();

	    		if( text.match(regex) ){
	    			group.addClass('selected');
	    			selected.push(group);
	    		}
	    	}
	    	


	    	// if value in inputbox is clear, deselect everything
	    	if( $("#match-pattern").val().toLowerCase() == 'clear all' ){
	    		selected = [];
	    		$('.group-name').removeClass('selected');
	    		updateCount();
	    	}

	    	// reset value
 			$("#match-pattern").val("");


	    }


	
	});

	$('#next').click(function(e){

		if(selected.length > 0)
			$('body').animate({left: '-' + WINDOW_WIDTH }, 'slow');
		else
			alert("No Recipients Selected");
	
	})

	$('#back').click(function(e){

		$('body').animate({left: 0 }, 'slow');
	
	})

	$('#send').click(function(e){

		window.close();
	
	})





})



