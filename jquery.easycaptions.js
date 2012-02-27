(function($)
{
	// This script was written by Steve Fenton
	// http://www.stevefenton.co.uk/Content/Jquery-Easy-Captions/
	// Feel free to use this jQuery Plugin
	// Version: 3.0.1
    // Contributions by: 
	
	var classModifier = "";
	var opacityAmount = "0.5";
	var imageCount = 0;
	var tallestCaption = 0;
	
	// Handles size and position of captions
	function StyleCaption(imageId, captionId, opacityAmount) {
	
		var myWidth = $("#" + imageId).width();
		var myHeight = $("#" + imageId).height();
		var myOffset = $("#" + imageId).offset();
		
		// Shim the caption to be inside of the border
		var borderLeftShim = parseInt($("#" + imageId).css("borderLeftWidth"), 10);
		var borderTopShim = parseInt($("#" + imageId).css("borderTopWidth"), 10);
		
		// Shim the caption down for padding and increase its size for the width padding
		var paddingTopShim = parseInt($("#" + imageId).css("paddingTop"), 10) + parseInt($("#" + imageId).css("paddingBottom"), 10);
		var widthShim = parseInt($("#" + imageId).css("paddingLeft"), 10) + parseInt($("#" + imageId).css("paddingRight"), 10);
		
		myWidth = myWidth + widthShim;
		myHeight = myHeight + borderTopShim + paddingTopShim;
		
		// Position the caption based on all these numbers
		$("#" + captionId).css({ position: "absolute", backgroundColor: "black", color: "white", top: (myOffset.top + myHeight)+"px", left: (myOffset.left+borderLeftShim)+"px", width: myWidth+"px", opacity: opacityAmount });
		
		var captionHeight = $("#" + captionId).height();
		
		if (captionHeight > tallestCaption) {
			tallestCaption = captionHeight;
		}
		
		$("#" + captionId).css({ top: ((myOffset.top + myHeight)-captionHeight) + "px" });
	}
	
	// Move the captions when the window is resized
	$(window).resize(function () {
		for (var i = 0; i < imageCount; i++) {
			var imageId = classModifier + "image_" + i;
			var captionId = classModifier + "caption_" + i;
			StyleCaption(imageId, captionId, opacityAmount);
		}
	});
	
	$.fn.easycaptions = function (settings) {
	
		var config = {
			classmodifier: "ec",
			opacity: 0.5,
			showclose: false,
			closebutton: "[x]"
		};
		
		if (settings) {
			$.extend(config, settings);
		}

		return this.each(function () {

			classModifier = config.classmodifier;
			
			$This = $(this);
			
			// Make sure opacity is a number between 0.1 and 1
			opacityAmount = parseFloat(config.opacity);
			if (opacityAmount > 1) {
				opacityAmount = 1;
			} else if (opacityAmount < 0.1) {
				opacityAmount = 0.1;
			}
			
			// Set ids for items.
			var imageId = classModifier + "image_" + imageCount;
			var captionId = classModifier + "caption_" + imageCount;
			
			// Set caption text
			var myCaption = $(this).attr("alt");
			
			// Add the new elements
			$This.before("<div id=\"" + captionId + "\" class=\"" + classModifier + "caption\" style=\"position: absolute;\"><p>" + myCaption + "</p</div>");
			$This.attr("id", imageId);
			
			// Close Button
			if (config.showclose) {
				$("#" + captionId).prepend("<div style=\"float: right;\" class=\"" + captionId + "close\">" + config.closebutton + "</div>");
				$("." + captionId + "close").css({ cursor: "pointer" });
				$("." + captionId + "close").click( function () {
					$(this).parent().fadeOut();
				});
			}
			
			// Style the element (this is re-done on window resize)
			$("#" + captionId).hide();
			window.setTimeout(function () {
				StyleCaption(imageId, captionId, opacityAmount);
				$("#" + captionId).fadeIn();
			}, 1000);
			
			// Add event handlers
			$This.bind("mouseover", function () {
				$("#" + captionId).stop().animate({ opacity: 1 });
				return false;
			});
			
			$This.bind("mouseout", function () {
				$("#" + captionId).stop().animate({ opacity: opacityAmount });
				return false;
			});
			
			// Increment the counter
			imageCount++;
			
		});
	};
})(jQuery);