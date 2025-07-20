(function($)
{
	// This script was written by Steve Fenton
	// http://stevefenton.co.uk/Content/Jquery-Background-Parallax/
	// Feel free to use this jQuery Plugin
	// Version: 3.0.3
    // Contributions by: 
	
	$.fn.backgroundparallax = function (settings) {
	
		var config = {
			intensity: 0.5
		};
		
		if (settings) {
			$.extend(config, settings);
		}
		
		function PerformScroll($Scroll, $Element) {
			// Calculate the movement based on scroll and intensity, round to 2dp
			var leftDistance = Math.round((($Scroll.scrollLeft() * config.intensity) * -1) * 100) / 100;
			var topDistance =  Math.round((($Scroll.scrollTop() * config.intensity) * -1) * 100) / 100;
				
			// Scroll the background
			$Element.css({ backgroundPosition: leftDistance + "px " + topDistance + "px" });
		}

		return this.each(function () {
			
			// Make sure we are dealing with a flot
			config.intensity = parseFloat(config.intensity);
			
			// Ensure intensity remains sensible
			if (config.intensity < 0.1) {
				config.intensity = 0.1;
			} else if (config.intensity > 3) {
				config.intensity = 3;
			}

			var nodeName = this.nodeName.toLowerCase();
			
			var $This = $(this);
			if (nodeName == "body") {
				$This = $(window);
			}
			
			$This.scroll(function (e) {
				if (nodeName == "body") {
					PerformScroll($("html"), $("body"));
				} else {
					PerformScroll($This, $This);
				}
			});
		});
	};
})(jQuery);