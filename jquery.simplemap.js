var mapGlobal;
var markers = [];
var infoWindow;

// This script was written by Steve Fenton
// http://stevefenton.co.uk/Content/Jquery-Simple=Map/
// Feel free to use this jQuery Plugin
// Version: 1.1.0
// Contributions by: 

var SimpleMap = function() {
	return {
		MapList : new Array(),
		Geocoder : new google.maps.Geocoder(),
		GetLatLong : function (address) {
			
		},
		SetMarkers : function(addresses) {
			var i;
			
			for (i = 0; i < addresses.length; i++) {
				
				this.Geocoder.geocode({ 'address': addresses[i] }, function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {

						var markersCount = markers.length;			
		
						markers[markersCount] = new google.maps.Marker({
							position: results[0].geometry.location,
							map: mapGlobal,
							html: results[0].formatted_address.replace(/,/g, "<br>")
						});
		
						google.maps.event.addListener(markers[markersCount], "click", function () {
							infoWindow.setContent(this.html);
							infoWindow.open(mapGlobal, this);
						});
					} else {
						alert("Could not load map: " + status);
					}
				});
			}

		},
		StartMap : function(parentObject, config) {
			
			infoWindow = new google.maps.InfoWindow({
				content: "loading..."
			});

		
			this.Geocoder.geocode({ 'address': config.addressList[0] }, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
				
					var myOptions = {
						zoom: config.zoom,
						center: results[0].geometry.location,
						mapTypeId: google.maps.MapTypeId.ROADMAP
					}
					
					mapGlobal = new google.maps.Map(parentObject, myOptions);
				} else {
					alert("Could not load map: " + status);
				}
			});
			
			this.SetMarkers(config.addressList);
		}
	};
}();

(function($) {	
	$.fn.simplemap = function (settings) {
	
		var config = {
			classModifier: "simplemaps",
			addressList: ["Buckingham Palace, London", "Wellington Arch, London"],
			zoom: 15
		};
		
		if (settings) {
			$.extend(config, settings);
		}

		return this.each(function () {
			SimpleMap.StartMap(this, config);
		});
		
		return this;
	};
})(jQuery);