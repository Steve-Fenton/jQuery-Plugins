(function($)
{
	// This script was written by Steve Fenton
	// http://stevefenton.co.uk/Content/Jquery-Three-Dee/
	// Feel free to use this jQuery Plugin
	// Version: 3.0.0
    // Contributions by: 
	
	var classModifier = "";
	
	function GetRandomDepth() {
		var depthList = ["very-far", "far", "middle", "near", "very-near"];
		var selection = Math.round(Math.random() * depthList.length, 0);
		return depthList[selection];
	}

	$.fn.threedee = function (settings) {
	
		var config = {
			classModifier: "3d",
			depth: "middle",
			style: "none",
			applyTo: "text",
			opacity: "1",
			changeTextSize: false
		};
		
		if (settings) {
			$.extend(config, settings);
		}
		
		classModifier = config.classModifier;
		
		return this.each(function () {
			
			var red = "#FF1515";
			var blue = "cyan";
			
			var seeThru = config.opacity;
			var depth = "0.06em";
			var emNess = "3.2em";
			var depthName = config.depth;
			
			if (depthName == "random") {
				depthName = GetRandomDepth();
			}
			
			// Handle the case where text shadow is not supported
			if ($.browser.msie && parseInt($.browser.version) < 9) {
			
				$(window).unbind("resize");
				$(window).bind("resize", function() {
					// Looks terrible in IE if you resize due to positioning, so we'll remove it on resize
					// possible solution would be to reload the page on resize end... but it's not ideal
					$("." + classModifier + "ie").remove();
				});
			
				switch (depthName) {
					case "very-far":
						depth = "0.02em";
						emNess = "3.2em";
						break;
					case "far":
						depth = "0.03em";
						emNess = "3.4em";
						break;
					case "middle":
						depth = "0.04em";
						emNess = "3.6em";
						break;
					case "near":
						depth = "0.05em";
						emNess = "3.8em";
						break
					case "very-near":
						depth = "0.06em";
						emNess = "4.2em";
						break;
					case "extreme":
						depth = "0.07em";
						emNess = "4.4em";
						break;
					case "very-extreme":
						depth = "0.08em";
						emNess = "4.6em";
						break;
				}
				
				switch (config.applyTo) {
					default:
						if (config.changeTextSize) {
							$(this).css({ fontSize: emNess });
						}
						$(this).css({ textShadow: "none", zIndex: "1000"  });
						
						var offset = $(this).offset();
						
						var duplicateR = $(this).clone().addClass(classModifier + "ie").css({ position: "absolute", top: offset.top, left: offset.left, marginLeft: "-"+depth, color: red, zIndex: "900" });
						var duplicateC = $(this).clone().addClass(classModifier + "ie").css({ position: "absolute", top: offset.top, left: offset.left, marginLeft: depth, color: blue, zIndex: "900" });
						var duplicateB = $(this).clone().addClass(classModifier + "ie").css({ position: "absolute", top: offset.top, left: offset.left, zIndex: "1000" });
						$(this).before(duplicateR).before(duplicateC).before(duplicateB);
						break;
				}
			
			} else {
			
				// We can use text shadow here
				
				switch (depthName) {
					case "very-far":
						depth = "0.02em";
						emNess = "3.2em";
						break;
					case "far":
						depth = "0.03em";
						emNess = "3.4em";
						break;
					case "middle":
						depth = "0.04em";
						emNess = "3.6em";
						break;
					case "near":
						depth = "0.05em";
						emNess = "3.8em";
						break
					case "very-near":
						depth = "0.06em";
						emNess = "4.2em";
						break;
					case "extreme":
						depth = "0.07em";
						emNess = "4.4em";
						break;
					case "very-extreme":
						depth = "0.08em";
						emNess = "4.6em";
						break;
				}
				
				switch (config.applyTo) {
					default:
						if (config.changeTextSize) {
							$(this).css({ fontSize: emNess });
						}
						$(this).css({ opacity: seeThru, textShadow: "-" + depth + " 0 " + red + ", " + depth + " 0 " + blue });
						break;
				}
			}		
		});
	};
})(jQuery);