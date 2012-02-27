(function($)
{
	// This script was written by Steve Fenton
	// http://www.stevefenton.co.uk/Content/Jquery-Side-Content/
	// Feel free to use this jQuery Plugin
	// Version: 1.0.0
    // Contributions by: 
	
	$.fn.wordgame = function (settings) {
	
		var allowableLetters = new Array();
	
		var config = {
			classmodifier: "wg",
			gridwidth: 5,
			gridheight: 5,
			common: "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,r,s,t,u,w",
			rare: "qu,v,x,y,z",
			bordersize: 1,
			padding: 2,
			cellwidth: 42,
			cellheight: 42,
			minimumwordlength: 3,
			timer: 0
		};
		
		if (settings) {
			$.extend(config, settings);
		}
		
		function RoundToTwoDecimalPlaces(number) {
			number = Math.floor(number * 100);
			number = number / 100;
			return number;
		}
		
		function GetRandomLetter() {
			if (allowableLetters.length == 0) {
				var letters1 = config.common.split(",");
				var letters2 = config.common.split(",");
				var letters3 = config.common.split(",");
				var letters4 = config.rare.split(",");
				allowableLetters = letters1.concat(letters2, letters3, letters4);
			}
			
			var randomPos = Math.floor(Math.random() * allowableLetters.length)
			
			return allowableLetters[randomPos];
		}
		
		function SetCounter() {
			countDown = countDown - 1;
			if (countDown < 0) {
				$("." + config.classmodifier + "item").unbind("click").css({ "background-color": "red" });
			} else {
			
				var minutes = Math.floor(countDown / 60);
				var seconds = "" + countDown % 60;
				
				if (seconds.length < 2) {
					seconds = ":0" + seconds;
				} else {
					seconds = ":" + seconds;
				}
			
				$("." + config.classmodifier + "timer").text(minutes + seconds);
				timer = window.setTimeout(SetCounter, 1000);
			}
		}
		
		var timer;
		var countDown;
		
		return this.each(function () {
			
			parentWidth = (config.cellwidth + (config.padding * 2)) * config.gridwidth;
			
			config.bordersize = parseInt(config.bordersize);
			config.padding = parseInt(config.padding);
			
			var numberOfLetters = parseInt(config.gridwidth) * parseInt(config.gridheight);
			var row = 0;
			var col = 0;
			
			// Controls...
			
			var output = '<div class="' + config.classmodifier + 'controls">' +
				'<p class="' + config.classmodifier + 'timer"></p>' +
				'<p class="' + config.classmodifier + 'add" tabindex="0" style="cursor: pointer;">Add</p>' +
				'<p class="' + config.classmodifier + 'clear" tabindex="0" style="cursor: pointer;">Clear</p>' +
				'<p class="' + config.classmodifier + 'word"></p>' +
				'<ul class="' + config.classmodifier + 'list"></ul>' +
				'</div>' +
				'<div class="' + config.classmodifier + 'grid" style="width: ' + parentWidth + 'px; ">' +
				'<div class="' + config.classmodifier + 'row" style="clear: both;">';
			
			for (var i = 0; i < numberOfLetters; i++) {
			
				output += '<div class="' + config.classmodifier + 'item" rel="' + row + '_' + col + '" style="text-align: center; float: left; width: ' + (config.cellwidth - (config.bordersize * 2)) + 'px; height: ' + (config.cellheight - (config.bordersize * 2)) + 'px; padding: ' + config.padding + 'px; cursor: pointer; " tabindex="0">' + GetRandomLetter() + '</div>';
				
				col++;
				if (col >= config.gridwidth) {
					col = 0;
					row++;
					output += '</div><div class="' + config.classmodifier + 'row" style="clear: both;">';
				}
			}
			
			output += '</div>' +
				'</div>' +
				'<div style="clear: both;">&nbsp;</div>';
			
			$(this).html(output);
			
			if (config.timer > 0) {
				countDown = config.timer + 1;
				SetCounter();
			}
			
			// Hover Events
			$("." + config.classmodifier + "item").bind("mouseover focus", function () {
				$(this).css({ opacity: 0.6 });
			});
			
			$("." + config.classmodifier + "item").bind("mouseout blur", function () {
				$(this).css({ opacity: 1 });
			});
			
			// Letter Events
			$("." + config.classmodifier + "item").bind("click", function () {
				$This = $(this);
				$Word = $("." + config.classmodifier + "word");
				
				var wordSoFar = $Word.text();
				var letter = $(this).text();
				
				if ($This.hasClass(config.classmodifier + "selected")) {
					$This.removeClass(config.classmodifier + "selected");
					var newWord = "";
					var letterFound = false;
					for (var i = (wordSoFar.length -1); i >= 0; i--) {
						if (wordSoFar[i] == letter && !letterFound) {
							letterFound = true;
						} else {
							newWord = wordSoFar[i] + newWord;
						}
					}
					wordSoFar = newWord;
				} else {
					$(this).addClass(config.classmodifier + "selected");
					wordSoFar += letter;
				}
				
				$Word.text(wordSoFar);
			});
			
			// Add Button
			$("." + config.classmodifier + "add").bind("click", function () {
				$Word = $("." + config.classmodifier + "word");
				$List = $("." + config.classmodifier + "list");
				var wordSoFar = $Word.text();
				if (wordSoFar.length >= config.minimumwordlength) {
					existingWords = $List.children("li");
					for (var i = 0; i < existingWords.length; i++) {
						if (wordSoFar == $(existingWords[i]).text()) {
							wordSoFar = "";
							break;
						}
					}
					if (wordSoFar.length > 0) {
						$List.append("<li>" + wordSoFar + "</li>");
					}
				}
				$("." + config.classmodifier + "selected").removeClass(config.classmodifier + "selected");
				$Word.text("");
			});
			
			// Clear Button
			$("." + config.classmodifier + "clear").bind("click", function () {
				$Word = $("." + config.classmodifier + "word");
				$("." + config.classmodifier + "selected").removeClass(config.classmodifier + "selected");
				$Word.text("");
			});
			
		});
		
		return this;
	};
})(jQuery);