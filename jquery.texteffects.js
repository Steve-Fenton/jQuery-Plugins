(function($)
{
	// This script was written by Steve Fenton
	// http://www.stevefenton.co.uk/Content/Jquery-Text-Effects/
	// Feel free to use this jQuery Plugin
	// Version: 3.0.0
    // Contributions by: 
	
	var nextSetIdentifier = 0;
	var characterInfoList = new Array();
	var animationInProgress = new Array();
	
	function getSetIdentifier() {
		var set = "texteffectid_" + nextSetIdentifier;
		nextSetIdentifier++;
		return set;
	}
	
	function setCharacterInfo(key, value) {
		characterInfoList[key] = value;
	}
	
	function getCharacterInfo(key) {
		return characterInfoList[key];
	}
	
	function setAnimationInProgress(key, value) {
		animationInProgress[key] = value;
	}
	
	function getAnimationInProgress(key) {
		return animationInProgress[key];
	}

	function collapseChar(setId, characters, top, left, arrayPosition, speed) {
		var nextPosition = arrayPosition - 1;
		if ($(characters[arrayPosition]).text() == " ") {
			if (nextPosition > 0) {
				collapseChar(setId, characters, top, left, nextPosition, speed);
			} else {
				setAnimationInProgress(setId, false);
			}
		} else {
			$(characters[arrayPosition]).css({ position:"absolute" });
			$(characters[arrayPosition]).animate({ top: top+"px", left: left+"px"}, speed, function () {
				if (nextPosition > 0) {
					collapseChar(setId, characters, top, left, nextPosition, speed);
				} else {
					setAnimationInProgress(setId, false);
				}
			});
		}
	};
	
	function expandChar(setId, characters, positionInfo, arrayPosition, speed) {
		var nextPosition = arrayPosition + 1;
		if ($(characters[arrayPosition]).text() == " ") {
			if (nextPosition < characters.length) {
				expandChar(setId, characters, positionInfo, nextPosition, speed);
			} else {
				setAnimationInProgress(setId, false);
			}
		} else {
			var top = positionInfo[arrayPosition].top;
			var left = positionInfo[arrayPosition].left;
		
			$(characters[arrayPosition]).css({ position:"absolute" });
			$(characters[arrayPosition]).animate({ top: top+"px", left: left+"px"}, speed, function () {
				if (nextPosition < characters.length) {
					expandChar(setId, characters, positionInfo, nextPosition, speed);
				}else {
					setAnimationInProgress(setId, false);
				}
			});
		}
	};
	
	function explodeChar(setId, characters, positionInfo, arrayPosition, speed, removeAfter) {
		var nextPosition = arrayPosition + 1;
		if ($(characters[arrayPosition]).text() == " ") {
			if (nextPosition < characters.length) {
				explodeChar(setId, characters, positionInfo, nextPosition, speed, removeAfter);
			} else {
				setAnimationInProgress(setId, false);
			}
		} else {
			var screenWidth = $(window).width();
			var screenHeight = $(window).height();
			
			var direction = Math.floor(Math.random()*5);
			
			var top = "-100px";
			var left = "-100px";
			
			switch (direction) {
				case 1:
					var randomNumber = Math.floor(Math.random()*screenHeight);
					top = randomNumber + "px";
					break;
				case 2:
					var randomNumber = Math.floor(Math.random()*screenWidth);
					left = randomNumber + "px";
					break;
				case 3:
					var randomNumber = Math.floor(Math.random()*screenHeight);
					top = randomNumber + "px";
					left = screenWidth + "px";
					break;
				case 4:
					var randomNumber = Math.floor(Math.random()*screenWidth);
					left = randomNumber + "px";
					top = screenHeight + "px";
					break;
			}
			
			if (!removeAfter) {
				$(characters[arrayPosition]).show();
			}
			$(characters[arrayPosition]).css({ position:"absolute" });
			$(characters[arrayPosition]).animate({ top: top, left: left}, speed, function () {
				if (removeAfter) {
					$(this).hide();
				}
				if (nextPosition < characters.length) {
					explodeChar(setId, characters, positionInfo, nextPosition, speed, removeAfter);
				}else {
					setAnimationInProgress(setId, false);
				}
			});
		}
	};
	
	$.fn.texteffects = function (settings) {
	
		var config = {
			texteffect: "collapse",
			speed: "slow",
			delay: 0
		};
		
		var classModifier = "texteffects";
		
		if (settings) {
			$.extend(config, settings);
		}

		return this.each(function () {
		
			var setId;
		
			if ($(this).hasClass(classModifier)) {
				// Great - alreay processed the characters
				setId = $(this).children().eq(0).attr("id");
			} else {
				// Need to process the characters
				setId = getSetIdentifier();
				var text = $(this).text();
				var chars = text.match(/.{1}/g);
				text = "<span id=\"" + setId + "\"><span class=\"char\">" + chars.join("</span><span class=\"char\">") + "</span></span>";
				$(this).html(text).addClass(classModifier);
			}
			
			// If animation is already in progress, ignore this request
			if (getAnimationInProgress(setId)) {
				// We won't animate an item while it is in progress
			} else {
	
				// Reserve space on the container
				var height = $(this).height();
				$(this).css({height: height}).removeClass("expand").removeClass("collapse").addClass(config.texteffect);
				
				// Get a list of characters
				var characters = $("#" + setId + " span.char", this);
				
				// Find the starting position of each character so we can re-place it
				var offset = $(characters[0]).offset();
				var left = 0;
				var charInfo = getCharacterInfo(setId);
				if (charInfo == undefined) {
					var originalInfo = new Array();
					for (i = 0; i < characters.length; i++) {
						var itemoffset = $(characters[i]).offset();
						originalInfo[i] = itemoffset;
					}
					charInfo = originalInfo;
					setCharacterInfo(setId, originalInfo);
				}
				
				switch (config.texteffect) {

					case "collapse":

						setAnimationInProgress(setId, true);
						for (i = 0; i < characters.length; i++) {
							$(characters[i]).css({ position:"absolute", top: charInfo[i].top+"px", left: charInfo[i].left+"px" });
						}
						window.setTimeout(function() {
							collapseChar(setId, characters, offset.top, offset.left, characters.length - 1, config.speed);
						}, config.delay);
						break;

					case "expand":

						setAnimationInProgress(setId, true);
						for (i = 0; i < characters.length; i++) {
							$(characters[i]).css({ position:"absolute", top: offset.top+"px", left: offset.left+"px" });
						}
						window.setTimeout(function() {
							expandChar(setId, characters, characterInfoList[setId], 1, config.speed);
						}, config.delay);
						break;
						
					case "drop":
					
						setAnimationInProgress(setId, true);
						$("#" + setId).css({ position: "absolute", top: "-" + (height*2) + "px"});
						window.setTimeout(function() {
							$("#" + setId).animate({ top: charInfo[0].top + "px"});
							setAnimationInProgress(setId, false);
						}, config.delay);
						break;
						
					case "undrop":
					
						setAnimationInProgress(setId, true);
						$("#" + setId).css({ position: "absolute", top: charInfo[0].top});
						window.setTimeout(function() {
							$("#" + setId).animate({ top: "-" + (height*2) + "px"});
							setAnimationInProgress(setId, false);
						}, config.delay);
						break;
						
					case "explode":

						setAnimationInProgress(setId, true);
						for (i = 0; i < characters.length; i++) {
							$(characters[i]).css({ position:"absolute", top: charInfo[i].top+"px", left: charInfo[i].left+"px" });
						}
						window.setTimeout(function() {
							explodeChar(setId, characters, characterInfoList[setId], 0, config.speed, true);
						}, config.delay);
						break;
						
					case "unexplode":

						setAnimationInProgress(setId, true);
						explodeChar(setId, characters, characterInfoList[setId], 0, 0, false);
						window.setTimeout(function() {
							expandChar(setId, characters, characterInfoList[setId], 0, config.speed);
						}, config.delay);
						break;
				}
			}
		});

	};
})(jQuery);