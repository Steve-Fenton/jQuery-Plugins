(function($)
{
	// This script was written by Steve Fenton
	// http://stevefenton.co.uk/Content/Jquery-Simple-Openid/
	// Feel free to use this jQuery Plugin
	// Version: 1.0.0
    // Contributions by: 
	
	$.fn.simpleopenid = function (settings) {
	
		var config = {
			classmodifier: "oid",
			baseaddress: ""
		};
		
		if (settings) {
			$.extend(config, settings);
		}
		
		var provider = new Array();
		// ["Name", "Image", "Uri", "Requires User Name"]
		provider[provider.length] = ["Google", "openid/google.png", "https://www.google.com/accounts/o8/id", false];
		provider[provider.length] = ["Yahoo", "openid/yahoo.png", "http://yahoo.com/", false];
		provider[provider.length] = ["AOL", "openid/aol.png", "http://openid.aol.com/{0}", true];
		provider[provider.length] = ["My Open Id", "openid/myopenid.png", "http://{0}.myopenid.com/", true];
		provider[provider.length] = ["Flickr", "openid/flickr.png", "http://flickr.com/{0}/", true];
		provider[provider.length] = ["Myspace", "openid/myspace.png", "http://www.myspace.com/{0}", true];
		provider[provider.length] = ["Technorati", "openid/technorati.png", "http://technorati.com/people/technorati/{0}/", true];
		provider[provider.length] = ["Wordpress", "openid/wordpress.png", "http://{0}.wordpress.com", true];
		provider[provider.length] = ["Blogspot", "openid/blogspot.png", "http://{0}.blogspot.com/", true];
		provider[provider.length] = ["Live Journal", "openid/livejournal.png", "http://{0}.livejournal.com", true];
		provider[provider.length] = ["ClaimID", "openid/claimid.png", "http://claimid.com/{0}", true];
		provider[provider.length] = ["Vidoop", "openid/vidoop.png", "http://{0}.myvidoop.com/", true];
		provider[provider.length] = ["Verisign", "openid/verisign.png", "http://{0}.pip.verisignlabs.com/", true];

		return this.each(function () {
			
			var $Element = $(this);
			
			var providerHtml = "<ul>";
			
			for (var i = 0; i < provider.length; i++) {
				providerHtml += "<li>";
				
				if (provider[i][1].length > 0) {
					providerHtml += '<img src="' + config.baseaddress + provider[i][1] + '" alt="' + provider[i][0] + '" title="' + provider[i][0] + '" rel="' + i + '" class="' + config.classmodifier + '" style="cursor: pointer;">';
				}
				
				providerHtml += "</li>";
			}
			
			providerHtml += "</ul>";
			
			$Element.prepend(providerHtml);
			
			$Element.submit( function () {
				var uri = $(this).find("#openid_identifier").val();
				if (uri.indexOf("{0}") > -1) {
					$(this).find("#openid_identifier").val(uri.replace("{0}", $(this).find("#openid_username").val()));
				}
			});
			
			// Handle the selection click
			$Element.find("img." + config.classmodifier).click( function () {
			
				var i = $(this).attr("rel");
				var title = provider[i][0];
				var image = provider[i][1];
				var uri = provider[i][2];
				var hasUser = provider[i][3];
				
				$("img.selected").removeClass("selected");
				$(this).addClass("selected");
				
				if (hasUser) {
					// User name required
					$Element.find("fieldset").eq(0).show();
					$Element.find("fieldset").eq(1).hide();
					
					$("span." + config.classmodifier).remove();

					var $UserName = $Element.find("#openid_username");
					var uriParts = uri.split("{0}");

					// Surround the input with the URL
					if (uriParts.length > 1) {
						$UserName.before('<span class="' + config.classmodifier + '">' + uriParts[0] + '</span>');
						$UserName.after('<span class="' + config.classmodifier + '">' + uriParts[1] + '</span>');
					} else {
						$UserName.before('<span class="' + config.classmodifier + '">' + uriParts[0] + '</span>');
					}
					
					$Element.find("#openid_identifier").val(uri);
				} else {
					// No user name required
					$Element.find("fieldset").eq(0).hide();
					$Element.find("fieldset").eq(1).show();
					$Element.find("#openid_identifier").val(uri);
					$Element[0].submit();
				}
				
			});
			
		});
	};
})(jQuery);