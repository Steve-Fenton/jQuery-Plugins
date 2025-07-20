(function($)
{
	// This script was written by Steve Fenton
	// http://stevefenton.co.uk/Content/Jquery-Image-Effects/
	// Feel free to use this jQuery Plugin
	// Version: 1.0.4
    // Contributions by: 
	
	var imageeffectscount = 0;

	$.fn.imageeffects = function (settings) {
	
		var config = {
			classmodifier: "imef",
			startevent: "mouseover",
			resetevent: "mouseout",
			effect: "growin",
			speed: 200,
			easing: "linear",
			colour: "#FFFFFF",
			size: 25
		};
		
		if (settings) {
			$.extend(config, settings);
		}

		return this.each(function () {
		
			$Element = $(this);
			
			var id = config.classmodifier + "_" + imageeffectscount;
		
			switch(config.effect) {
			
				case 'growin':
					var h = $Element.height();
					var w = $Element.width();
					var s = $Element.attr("src");
					
					var image = $('<div>').append($Element.clone()).remove().html();
				
					var replacement = '<div id="' + id + '" style="display: inline-block; width: ' + w + 'px; height: ' + h + 'px; overflow: hidden; position: relative;">' +
						'<div style="width: ' + w + 'px; height: ' + h + 'px; position: absolute; top: -' + config.size + 'px;  left: -' + config.size + 'px; border: ' + config.size + 'px solid ' + config.colour + '" tabindex="0"></div>' + 
						image + 
						'</div>';
					
					$Element.replaceWith(replacement);

					$Replacement = $("#" + id);
	
					$Replacement.children("div").bind(config.startevent + " focus", function () {
						$(this).animate({ top: "0px", left: "0px", width: (w - (config.size * 2)) + "px", height: (h - (config.size * 2)) + "px", opacity: 1 }, config.speed, config.easing);
						return false;
					});
					
					$Replacement.children("div").bind(config.resetevent + " blur", function () {
						$(this).animate({ top: '-' + config.size + 'px', left: '-' + config.size + 'px', width: w + "px", height: h + "px", opacity: 0 }, config.speed, config.easing);
						return false;
					});
					break;
				
				case 'growout':
					var h = $Element.height();
					var w = $Element.width();
					var s = $Element.attr("src");
					
					var image = $('<div>').append($Element.clone()).remove().html();
				
					var replacement = '<div id="' + id + '" style="display: inline-block; width: ' + w + 'px; height: ' + h + 'px; position: relative; overflow: hidden;">' +
						'<div style="width: ' + (w - (config.size * 2)) + 'px; height: ' + (h - (config.size * 2)) + 'px; position: absolute; border: ' + config.size + 'px solid ' + config.colour + '" tabindex="0">' + 
						'</div>' + 
						image + 
						'</div>';
					
					$Element.replaceWith(replacement);

					$Replacement = $("#" + id);
	
					$Replacement.children("div").bind(config.startevent + " focus", function () {
						$(this).animate({ top: '-' + config.size + 'px', left: '-' + config.size + 'px', width: w + "px", height: h + "px", opacity: 0 }, config.speed, config.easing);
						return false;
					});
					
					$Replacement.children("div").bind(config.resetevent + " blur", function () {
						$(this).animate({ top: "0px", left: "0px", width: (w - (config.size * 2)) + "px", height: (h - (config.size * 2)) + "px", opacity: 1 }, config.speed, config.easing);
						return false;
					});
					break;
					
				case 'unblur':
				
					if (config.size > 4) {
						config.size = 4;
					}
				
					var h = $Element.height();
					var w = $Element.width();
					var s = $Element.attr("src");
					
					var image = $('<div>').append($Element.clone()).remove().html();
					
					var replacement = '<div id="' + id + '" style="display: inline-block; width: ' + w + 'px; height: ' + h + 'px; position: relative; overflow: hidden;">' + 
						'<div class="' + config.classmodifier + '_blur1_' + id + '" style="z-index: 1001; position: absolute; top: -' + config.size + 'px; left: -' + config.size + 'px; width: ' + (w + config.size + 10) + 'px; height: ' + (h + config.size + 10) + 'px">' +
						image + 
						'</div>' +
						'<div class="' + config.classmodifier + '_blur2_' + id + '" style="z-index: 1000; position: absolute; top: ' + config.size + 'px; left: ' + config.size + 'px;">' +
						image + 
						'</div>' +
						image +
						'</div>';
						
					$Element.replaceWith(replacement);
					
					$("." + config.classmodifier + '_blur1_' + id).css({ opacity: 0.3 });
					$("." + config.classmodifier + '_blur2_' + id).css({ opacity: 0.4 });
					
					$Replacement = $("." + config.classmodifier + '_blur1_' + id);
					
					$Replacement.bind(config.startevent + " focus", function () {
						$("." + config.classmodifier + '_blur1_' + id).animate({ top: "0px", left: "0px" });
						$("." + config.classmodifier + '_blur2_' + id).animate({ top: "0px", left: "0px" });
					});
					
					$Replacement.bind(config.resetevent + " focus", function () {
						$("." + config.classmodifier + '_blur1_' + id).animate({ top: "-" + config.size + "px", left: "-" + config.size + "px" });
						$("." + config.classmodifier + '_blur2_' + id).animate({ top: config.size + "px", left: config.size + "px" });
					});
				
					break;
					
				case 'blur':
				
					if (config.size > 4) {
						config.size = 4;
					}
				
					var h = $Element.height();
					var w = $Element.width();
					var s = $Element.attr("src");
					
					var image = $('<div>').append($Element.clone()).remove().html();
					
					var replacement = '<div id="' + id + '" style="display: inline-block; width: ' + w + 'px; height: ' + h + 'px; position: relative; overflow: hidden;">' + 
						'<div class="' + config.classmodifier + '_blur1_' + id + '" style="z-index: 1001; position: absolute; top: 0px; left: 0px; width: ' + (w + config.size + 10) + 'px; height: ' + (h + config.size + 10) + 'px">' +
						image + 
						'</div>' +
						'<div class="' + config.classmodifier + '_blur2_' + id + '" style="z-index: 1000; position: absolute; top: 0px; left: 0px;">' +
						image + 
						'</div>' +
						image +
						'</div>';
						
					$Element.replaceWith(replacement);
					
					$("." + config.classmodifier + '_blur1_' + id).css({ opacity: 0.3 });
					$("." + config.classmodifier + '_blur2_' + id).css({ opacity: 0.4 });
					
					$Replacement = $("." + config.classmodifier + '_blur1_' + id);
					
					$Replacement.bind(config.startevent + " focus", function () {
						$("." + config.classmodifier + '_blur1_' + id).animate({ top: "-" + config.size + "px", left: "-" + config.size + "px" });
						$("." + config.classmodifier + '_blur2_' + id).animate({ top: config.size + "px", left: config.size + "px" });
					});
					
					$Replacement.bind(config.resetevent + " focus", function () {
						$("." + config.classmodifier + '_blur1_' + id).animate({ top: "0px", left: "0px" });
						$("." + config.classmodifier + '_blur2_' + id).animate({ top: "0px", left: "0px" });
					});
				
					break;
			}
			
			imageeffectscount++;
		});
	};
})(jQuery);