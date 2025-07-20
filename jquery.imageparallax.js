(function($)
{
	// This script was written by Steve Fenton
	// http://stevefenton.co.uk/Content/Jquery-Image-Parallax/
	// Feel free to use this jQuery Plugin
	// Version: 3.0.2
    // Contributions by: 
	
	var parallaxCount = 0;
	var imageWidths = new Array();
	var imageHeights = new Array();
	var parallaxImages = new Array();
	
	function GetSize(number, factor, intensity) {
		if (factor > 0) {
			var increment = parseFloat("1." + (factor * intensity), 10);
			number = parseInt(number * increment);
		}
		return number;
	}
	
	$.fn.imageparallax = function (settings) {
	
		var config = {
			classmodifier: "ip",
			intensity: 1,
			images: "",
			numberoflayers: 5,
			allowHorizontal: true,
			allowVertical: true
		};
		
		if (settings) {
			$.extend(config, settings);
		}

		return this.each(function () {
			
			$This = $(this);
			
			// Ensure intensity remains sensible
			var intensity = parseFloat(config.intensity);
			if (intensity < 1) {
				intensity = 1;
			} else if (intensity > 2) {
				intensity = 2;
			}
			
			var imageArray = new Array();

			var w = $This.width();
			var h = $This.height();
			
			$This.replaceWith("<div id=\"" + config.classmodifier + "_" + parallaxCount + "\" rel=\"" + parallaxCount + "\"></div>");
			$("#" + config.classmodifier + "_" + parallaxCount).css({ width: w+"px", height: h+"px", overflow: "hidden", position: "relative", cursor: "crosshair" });
			
			// Set up images
			if (config.images.length > 0) {
				// Use supplied images
				for (var i = 0; i < config.images.length; i++) {
					imageArray[i] = config.images[i];
				}

			} else {
				// Create duplicates and make them different sizes
				imageSource = $(this).attr("src");
				for (var i = 0; i < config.numberoflayers; i++) {
					imageArray[i] = imageSource;
				}
			}
			
			// Iterate over images and append them to the parallax set
			for (var i = 0; i < imageArray.length; i++) {
				var imageWidth = GetSize(w, i, config.intensity);
				var imageHeight = GetSize(h, i, config.intensity);
				var imageTop = parseInt((imageHeight - h) / 2, 10) * -1;
				var imageLeft = parseInt((imageWidth - w) / 2, 10) * -1;
				
				$("#" + config.classmodifier + "_" + parallaxCount).append("<img id=\"" + config.classmodifier + "_" + parallaxCount + "_" + i + "\" src=\"" + imageArray[i] + "\" width=\"" + imageWidth + "\" height=\"" + imageHeight + "\" style=\"position: absolute; top: " + imageTop + "px; left: " + imageLeft + "px;\">");
			}
			
			parallaxImages[parallaxCount] = imageArray;
			imageWidths[parallaxCount] = w;
			imageHeights[parallaxCount] = h;
			
			// When the mouse moves over the parallax, follow its movement
			$("#" + config.classmodifier + "_" + parallaxCount).mousemove( function (e) {
				var offset = $(this).offset();
				
				// Mouse co-ordinates
				var x = parseInt(e.pageX - offset.left, 10);
				var y = parseInt(e.pageY - offset.top, 10);
				
				// Current element rel (tells us which collection to use)
				var thisElement = $(this).attr("rel");
				var imageArray = parallaxImages[thisElement];
				
				// Original image dimensions
				var originalWidth = imageWidths[thisElement];
				var originalHeight = imageHeights[thisElement];

				// Gets the center position				
				var w = parseInt(originalWidth / 2, 10);
				var h = parseInt(originalHeight / 2, 10);
				
				// Treat the mouse position relative to the middle of the image
				x = (x - w);
				y = (y - h);

				// Move each layer
				for (var i = 1; i < imageArray.length; i++) {
					var $Img = $("#" + config.classmodifier + "_" + thisElement + "_" + i);
					
					var myWidth = $Img.width();
					var myHeight = $Img.height();
					
					// Gets offset position based on the amount this is bigger than the original image
					var imageLeft = ((myWidth - originalWidth) / 2) * -1;
					var imageTop = ((myHeight - originalHeight) / 2) * -1;
					
					// Calculate movement, arbitrarily divided by 12 to reduce the speed
					var myX = parseInt(imageLeft + ((x * i) / 10), 10);
					var myY = parseInt(imageTop + ((y * i) / 10),  10);
					
					if (config.allowHorizontal) {
						$Img.css({ left: myX + "px" });
					}
					
					if (config.allowVertical) {
						$Img.css({ top: myY + "px" });
					}
					
				}
				
			});
			
			parallaxCount++;
		});
	};
})(jQuery);