(function($)
{
	// This script was written by Steve Fenton
	// http://stevefenton.co.uk/Content/Jquery-Easy-Validation/
	// Feel free to use this jQuery Plugin
	// Version: 3.0.1
    // Contributions by: 
	
	var classModifier = "";
	var initialClass = "";
	var errorClass = "";
	var errorMessage = "";
	
	// Raw validate function, based on required fields
	function Validate(form) {
		var valid = true;
		
		$("."+initialClass).each( function () {
			$(this).removeClass(errorClass);
			
			if ($(this).val().length == 0) {
				$(this).addClass(errorClass);
				valid = false;
			}
		});
		
		if (!valid) {
			alert(errorMessage);
		}
		
		return valid;
	}
	
	// Hijack the submit events in order to perform validation
	$("form").bind("submit", function () { return Validate(this) });
	
	$.fn.easyvalidation = function (settings) {
	
		var config = {
			classmodifier: "ev",
			initialclass: "musthave",
			errorclass: "validationerror",
			message: "Please complete all required fields"
		};
		
		if (settings) {
			$.extend(config, settings);
		}
		
		// The class to denote a field is required
		initialClass = config.initialclass;
		// The class to show a field is errored
		errorClass = config.errorclass;
		// The error message
		errorMessage = config.message;

		return this.each(function () {

			classModifier = config.classmodifier;
			opacityAmount = config.opacity;
			
			// This is to ensure all fields have the correct class (they may or may not already have it)
			$(this).removeClass(initialClass).addClass(initialClass);
			
		});
	};
})(jQuery);