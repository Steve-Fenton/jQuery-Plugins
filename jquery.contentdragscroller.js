(function($)
{
	// This script was written by Steve Fenton
	// http://stevefenton.co.uk/Content/Jquery-Content-Drag-Scroller/
	// Feel free to use this jQuery Plugin
	// Version: 0.1.0
    // Contributions by: 

	var contentdragscrollerCount = 0;

	$.fn.contentdragscroller = function (settings) {

		var config = {
			classModifier: "cds",
			easing: "linear", // recommend "easeOutExpo" - requires jQuery Easing plugin
			velocityFactor: 2,
			velocityCheckWait: 50,
			afterScrollDuration: 1000,
			cursor: "n-resize",
			width: "auto",
			height: "400px"
		};

		if (settings) {
			$.extend(config, settings);
		}

		var gesturesX = 0;
		var gesturesY = 0;
		var startPosition = 0;
		var startScrollTop = 0;
		var velocity = 0;
		var isMouseDown = false;
		var timer;

		function GetVelocity() {
			velocity = startPosition - gesturesY;
			timer = window.setTimeout(GetVelocity, config.velocityCheckWait);
		}

		return this.each(function () {

			var id = config.classModifier + contentdragscrollerCount;

			$This = $(this);
			$This.wrap("<div id=\"" + id + "\" class=\"" + config.classModifier + "\"></div>");

			$Container = $("#" + id);
			$Container.css({
				width: config.width,
				height: config.height,
				cursor: config.cursor
			});

			// Detects mouse position and performs real-time scroll
			$(document).mousemove( function (e) {
				gesturesX = parseInt(e.pageX, 10);
				gesturesY = parseInt(e.pageY, 10);
				if (isMouseDown) {
					var scrollToPosition = startScrollTop + (startPosition - gesturesY);
					$Container.scrollTop(scrollToPosition);
					return false;
				}
			});

			// Prevents text being selected while scrolling
			$This.css({"MozUserSelect": "none"})
				.bind("mousedown.disableTextSelect selectstart.disableTextSelect", function() {
				return false;
			});

			// Starts a scroll
			$This.bind("mousedown", function(e) {
				startPosition = gesturesY;
				startScrollTop = $Container.scrollTop();
				isMouseDown = true;
				timer = window.setTimeout(GetVelocity, config.velocityCheckWait);
				return false;
			});

			// Cleans up after a scroll
			$(document).bind("mouseup", function() {
				if (isMouseDown) {
					window.clearTimeout(timer);
					isMouseDown = false;
					if (velocity != 0) {
						var distance = Math.floor(velocity * config.velocityFactor);
						var scrollToPosition = $Container.scrollTop() + distance;
						$Container.animate({ scrollTop: scrollToPosition}, {
							duration: config.afterScrollDuration,
							easing: config.easing
						});
						velocity = 0;
					}
					return false;
				}
			});
			contentdragscrollerCount++;
		});

		return this;
	};

})(jQuery);