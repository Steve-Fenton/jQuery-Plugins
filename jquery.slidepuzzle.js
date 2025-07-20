var puzzleCount = 0;
(function($)
{
	// This script was written by Steve Fenton
	// http://stevefenton.co.uk/Content/Jquery-Slide-Puzzle/
	// Feel free to use this jQuery Plugin
	// Version: 1.0.0
    // Contributions by: 
	
	$.fn.slidepuzzle = function (settings) {
	
		var config = {
			classmodifier: "sp",
			size: 3,
			complete: "OnComplete()"
		};
		
		if (settings) {
			$.extend(config, settings);
		}
		
		var currentHole;
		var currentHoleId;
		var segmentPixels;
		
		function GetSize($Element) {
			var imageWidth = $Element.width();
			var imageHeight = $Element.height();
			var size = imageWidth;
			if (imageWidth > imageHeight) {
				size = imageHeight;
			}
			return size;
		}
		
		function TryMoveUp($Element) {
			var canMove = false;
			var matches = GetAdjascentElements($Element);
			if (matches.up !== "") {
				canMove = true;
				var segment = matches.up;
				MakeMove(segment);
			}
			return canMove;
		}
		
		function TryMoveDown($Element) {
			var canMove = false;
			var matches = GetAdjascentElements($Element);
			if (matches.down !== "") {
				canMove = true;
				var segment = matches.down;
				MakeMove(segment);
			}
			return canMove;
		}
		
		function TryMoveLeft($Element) {
			var canMove = false;
			var matches = GetAdjascentElements($Element);
			if (matches.left !== "") {
				canMove = true;
				var segment = matches.left;
				MakeMove(segment);
			}
			return canMove;
		}
		
		function TryMoveRight($Element) {
			var canMove = false;
			var matches = GetAdjascentElements($Element);
			if (matches.right !== "") {
				canMove = true;
				var segment = matches.right;
				MakeMove(segment);
			}
			return canMove;
		}
		
		function Randomise($Element) {
			var random = Math.floor(Math.random() * 2);

			// TODO: create more variation for mixing it all up!
			switch(random) {
				case 1:
					DiagonalTwist($Element);
					break;
				default:
					DiagonalSpin($Element);
					break;
			}
		}
		
		function DiagonalTwist($Element) {
			var i, matches, up, down, left, right;
			var canMove = true;
			
			do {
				left = TryMoveLeft($Element);
				up = TryMoveUp($Element);
				canMove = left || up;
			} while (canMove);
			
			for (i = 1; i < config.size; i++) {
				TryMoveDown($Element);
			}
			
			do {
				right = TryMoveRight($Element);
				up = TryMoveUp($Element);
				canMove = right || up;
			} while (canMove);
			
			for (i = 1; i < config.size; i++) {
				TryMoveLeft($Element);
			}
		}
		
		function DiagonalSpin($Element) {
			var i, matches;
			var canMove = true;
			
			do {
				left = TryMoveLeft($Element);
				up = TryMoveUp($Element);
				canMove = left || up;
			} while (canMove);
			
			for (i = 1; i < config.size; i++) {
				TryMoveRight($Element);
			}
			
			do {
				left = TryMoveLeft($Element);
				down = TryMoveDown($Element);
				canMove = left || down;
			} while (canMove);
			
			for (i = 1; i < config.size; i++) {
				TryMoveUp($Element);
			}
		}
		
		function GetAdjascentElements($Element) {
			var matches = {up: "", down: "", left: "", right: ""};
			var segments = $Element.find("div");
			for (i = 0; i < segments.length; i++) {
				var $Segment = $(segments[i]);
				if ($Segment.attr("data-y") == currentHole.y) {
					var x = $Segment.attr("data-x");
					if (x == currentHole.x - 1) {
						matches.left = $Segment;
					} else if (x == currentHole.x + 1) {
						matches.right = $Segment;
					}
				} else if ($Segment.attr("data-x") == currentHole.x) {
					var y = $Segment.attr("data-y");
					if (y == currentHole.y - 1) {
						matches.up = $Segment;
					} else if (y == currentHole.y + 1) {
						matches.down = $Segment;
					}
				}
			}
			return matches;
		}
		
		function MakeMove($Segment) {
			var newPositionA, newPositionB;
		
			$Current = $(currentHoleId);
			if ($Current.attr("id") == $Segment.attr("id")) {
				return false;
			}
			var segmentPosition = { x: $Segment.attr("data-x"), y: $Segment.attr("data-y") };
			if (segmentPosition.x == currentHole.x) {
				if (segmentPosition.y == currentHole.y -1) {
					newPositionA = (currentHole.y - 1)  * segmentPixels;
					newPositionB = currentHole.y  * segmentPixels;
					$Current.css({ top: newPositionA + "px" });
					$Segment.css({ top: newPositionB + "px" });
					$Segment.attr("data-y", currentHole.y);
					currentHole.y = currentHole.y -1;
				} else if (segmentPosition.y == currentHole.y + 1) {
					newPositionA = (currentHole.y + 1)  * segmentPixels;
					newPositionB = currentHole.y  * segmentPixels;
					$Current.css({ top: newPositionA + "px" });
					$Segment.css({ top: newPositionB + "px" });
					$Segment.attr("data-y", currentHole.y);
					currentHole.y = currentHole.y +1;
				} else {
					CannotMove($Segment);
					return false;
				}
			} else if (segmentPosition.y == currentHole.y) {
				if (segmentPosition.x == currentHole.x -1) {
					newPositionA = (currentHole.x - 1)  * segmentPixels;
					newPositionB = currentHole.x  * segmentPixels;
					$Current.css({ left: newPositionA + "px" });
					$Segment.css({ left: newPositionB + "px" });
					$Segment.attr("data-x", currentHole.x);
					currentHole.x = currentHole.x -1;
				} else if (segmentPosition.x == currentHole.x + 1) {
					newPositionA = (currentHole.x + 1)  * segmentPixels;
					newPositionB = currentHole.x  * segmentPixels;
					$Current.css({ left: newPositionA + "px" });
					$Segment.css({ left: newPositionB + "px" });
					$Segment.attr("data-x", currentHole.x);
					currentHole.x = currentHole.x +1;
				} else {
					CannotMove($Segment);
					return false;
				}
			} else {
				CannotMove($Segment);
				return false;
			}
			return true;
		}
		
		function CannotMove($Element) {
			$Element.css({ backgroundColor: "red" }).find("img").animate({opacity: 0.5}, 200, function () {
				$Element.find("img").animate({opacity: 1}, 200);
			});
		}
		
		function IsComplete($Element) {
			var i;
			var allInOrder = true;
			var segments = $Element.find("div");
			for (i = 0; i < segments.length; i++) {
				$Segment = $(segments[i]);
				var j = $Segment.attr("data-x");
				var k = $Segment.attr("data-y");
				var checkText = k + "_" + j;
				if (checkText !== $Segment.attr("data-yx")) {
					allInOrder = false;
					break;
				}
			}
			return allInOrder;
		}
		
		function OnComplete() {
			alert("Congratulations");
		}

		return this.each(function () {
			$This = $(this);
			var i, j, id;
			if (config.size > 5) {
				config.size = 5;
			} else if (config.size < 3) {
				config.size = 3;
			}
			var imageSource = this.src;
			var size = GetSize($This);
			var segmentSize = Math.floor(10000 / config.size) / 100;
			segmentPixels = (size / 100) * segmentSize;
			var mainId = config.classmodifier + "_" + puzzleCount;
		
			var html = '<div style="width: ' + size + 'px; height: ' + size + 'px;" class="' + config.classmodifier + '">' +
				'<div id="' + mainId + '" style="width: ' + size + 'px; height: ' + size + 'px; overflow: hidden; position: absolute;">';
			
			for (i = 0; i < config.size; i++) {
				for (j = 0; j < config.size; j++) {
					id = mainId + '_' + i + '_' + j;
					html += '<div id="' + id + '" data-y="' + i + '" data-x="' + j + '" data-yx="' + i + '_' + j + '" class="' + mainId + 'segment" style="overflow: hidden; width: ' + segmentPixels + 'px; height: ' + segmentPixels + 'px; position: absolute; top: ' + (segmentPixels * i) + 'px; left: ' + (segmentPixels * j) + 'px;">' +
						'<img src="' + imageSource + '" style="position: relative; top: -' + (segmentPixels * i) + 'px; left: -' + (segmentPixels * j) + 'px;">' +
						'</div>';
				}
			}
			
			html += '</div>' +
				'</div>';
			
			$This.after(html).remove();

			// Set the current hole
			currentHoleId = "#" + id;
			$LastHole = $(currentHoleId);
			currentHole = { x: $LastHole.attr("data-x"), y: $LastHole.attr("data-y")};
			$("#" + id + " img").css({ visibility: "hidden"});
			
			// Randomise
			Randomise($("#" + mainId));
			
			// Hover Events
			$("." + mainId + "segment").bind("mouseenter focus", function() {
				$(this).css({ opacity: 0.8 });
			});
			$("." + mainId + "segment").bind("mouseleave blur", function() {
				$(this).css({ opacity: 1 });
			});
			 
			// Click Event
			$("." + mainId + "segment").bind("click touchstart", function() {
				$Segment = $(this);
				if (MakeMove($Segment)) {
					var done = IsComplete($("#" + mainId));
					if (done) {
						$("." + mainId + "segment").unbind().css({ opacity: 1 });
						$(currentHoleId).find("img").css({ visibility: "visible" });
						eval(config.complete);
					}
				}
			});
			
			puzzleCount++;
		});
			
		return this;
	};
})(jQuery)	;