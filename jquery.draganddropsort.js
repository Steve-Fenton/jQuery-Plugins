(function($)
{
	// This script was written by Steve Fenton
	// http://www.stevefenton.co.uk/Content/Jquery-Drag-And-Drop-Sort/
	// Feel free to use this jQuery Plugin
	// Version: 3.1.3
    // Contributions by: Brian Wong
    
	// Current mouse position (at all times!)
	var mouseX = 0;
	var mouseY = 0;
	
	// May be used to adjust offset of the ghost item
	var liftX = 5;
	var liftY = 5;
    
	$(document).mousemove(function(e){
		mouseX = e.pageX;
		mouseY = e.pageY;
		$("#ghost").css({ top: (mouseY+liftY)+"px", left: (mouseX+liftX)+"px" });
	}); 
	
	$.fn.draganddropsort = function (settings) {
	
		var config = {
			classmodifier: "dds",
			appendlastline: true,
            containsInputs: false,
            addhandles: false,
            ondrop: function () {}
		};
		
		if (settings) {
			$.extend(config, settings);
		}

		var nextSetIdentifier = 0;
		var currentItem = null;
		var currentTarget = null;
		var itemInTransit = false;
		
		var insertClass;
		var movingClass;
		var itemClass;
		
		insertClass = config.classmodifier + "insert";
		movingClass = config.classmodifier + "moving";
		itemClass = config.classmodifier + "item";
		
		// Captures drops
		$(document).mouseup(function () {
			if (itemInTransit && currentTarget != null) {
				var clone = $(currentItem).clone();
				bindEvents(clone);
				$(currentTarget).before(clone);
				$(currentItem).remove();
                $("#ghost").remove();
                config.ondrop();
			}
			currentItem = null;
			currentTarget = null;
			itemInTransit = false;
			$("." + movingClass).removeClass(movingClass);
		});
	
		// Bind the drag drop events
		function bindEvents(item) {
		
			var $Item = $(item);
            
            if (config.addhandles) {
                $Item.children('.' + config.classmodifier + 'handle').mousedown(function () {
                    currentItem = $(this).parent();
                    itemInTransit = true;
                    currentItem.addClass(movingClass);
                    $("#ghost").remove();
                    currentItem.clone().attr("id", "ghost").css({ 
                        position: "absolute",
                        width: currentItem.width() + "px",
                        height: currentItem.height() + "px"
                    }).appendTo("body").fadeTo(0, 0.5);
                    return config.containsInputs;
                });

            } else {
                $Item.mousedown(function () {
                    currentItem = $(this);
                    itemInTransit = true;
                    currentItem.addClass(movingClass);
                    $("#ghost").remove();
                    currentItem.clone().attr("id", "ghost").css({ 
                        position: "absolute",
                        width: currentItem.width() + "px",
                        height: currentItem.height() + "px"
                    }).appendTo("body").fadeTo(0, 0.5);
                    return config.containsInputs;
                });
            }
		

			
			$Item.mouseenter(function () {
				if (itemInTransit) {
					currentTarget = $(this);
					currentTarget.addClass(insertClass);
					return false;
				}
			});
			
			$Item.mouseleave(function () {
				currentTarget = null;
				$(this).removeClass(insertClass);
			});
		}
		
		return this.each(function () {
		
			var $This = $(this);
			
			// Append a spare line, which allows items to be dragged past the last item
			if (config.appendlastline) {
				var clone = $This.children().first().clone();
				var children = $(clone).children();
				if (children.length == 0) {
					$(clone).html("&nbsp;");
				} else {
					$(clone).children().each(function () {
						if (this.value) {
							$(this).remove();
						} else {
							$(this).html("&nbsp");
						}
					});
				}
				$This.append(clone);
			}
		
			// Bind events for sortable items
			$This.children().each(function () {
                if (config.addhandles) {
                    $(this).prepend('<div class="' + config.classmodifier + 'handle">[+]</div>');
                }
				bindEvents(this);
				$(this).addClass(itemClass);
			});
			
			nextSetIdentifier++;
		});
	};
})(jQuery);