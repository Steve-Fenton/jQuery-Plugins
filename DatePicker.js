var DatePicker = (function() {
	// DatePicker v 1.2.0
    return {
        DayNames: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        MonthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        LongMonthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        DateFormat: "ymd",
        DateFormatter: "-",
        FirstDay: 1, // 0 for Sunday, 1 for Monday
        CalendarContainerId: "datepicker",
		CalendarYearSelectorYearId: "datepickeryear1",
		CalendarYearSelectorMonthId: "datepickermonth1",
		CalendarYearSelectorButtonId: "datepickerbutton1",
        CalendarLayoutFormat: '<table summary="Date Picker"><caption>{0}</caption><thead>{1}</thead><tbody>{2}</tbody></table>{3}<div style="clear: both;"></div>',
        CalendarCaptionFormat: '<div>{0}{2}{1}</div>',
        CalendarHeaderFormat: "<tr><th>{0}</th><th>{1}</th><th>{2}</th><th>{3}</th><th>{4}</th><th>{5}</th><th>{6}</th></tr>",
        CalendarRowFormat: "<tr><td>{0}</td><td>{1}</td><td>{2}</td><td>{3}</td><td>{4}</td><td>{5}</td><td>{6}</td></tr>",
        CalendarFooterFormat: '<div class="footer"><div>{0}</div><div>{1}</div></div>',
        CalendarLinkFormat: '<a href="#{0}" onclick="{1}" class="{2}">{3}</a>',
        SetUpElement: function (inputField) {
		      var dateField = document.getElementById(inputField);
              if (dateField) {
                  var fieldParent = dateField.parentNode;
                  var button = document.createElement("input");
                  button.type = "button";
                  button.onclick = function () { DatePicker.GetCalendar(inputField, this); }
                  button.value = "Select";
                  fieldParent.appendChild(button);
              }
		  },
        GetCalendar : function (inputField, activator) {
            // Shows a calendar based on a given input field
            // Obtains the selected date from the field to display the correct date
            // Return the formatted date to the field when selection is made
            if (!document.getElementById(this.CalendarContainerId)) {
                var containerElement = document.createElement("div");
                containerElement.id = this.CalendarContainerId;
                containerElement.style.display = "none";
                document.body.appendChild(containerElement);
            }
            var container = document.getElementById(this.CalendarContainerId);
                
            if (container.style.display == "none") {
                var dateField = document.getElementById(inputField);
                var dateString = dateField.value;
                var inputDate = this.GetDateFromString(dateString);
                
                var calendar = this.GetCalendarForDate(inputDate, inputField);
                
                container.innerHTML = calendar;
                this.SetContainerPosition(container, activator);
                container.style.display = "block";
            } else {
                this.Close();
            }
        },
        Close: function() {
            var container = document.getElementById(this.CalendarContainerId);
            container.style.display = "none";
        },
        ChangeMonth: function(inputField, dateString) {
            // Updates the calendar to show a different month
            var container = document.getElementById(this.CalendarContainerId);
            var inputDate = this.GetDateFromString(dateString);
            var calendar = this.GetCalendarForDate(inputDate, inputField);
            container.innerHTML = calendar;
        },
		ChangeYearSelector: function(activator, inputField, month) {
			if (activator.rel == "selecting") {
			
			} else {
				activator.style.top = "0";
				activator.rel = "selecting";
				var currentYear = activator.innerHTML;
				currentYear = currentYear.substring(currentYear.length - 4);
				var yearSelector = '<input type="text" id="' + this.CalendarYearSelectorYearId + '" name="' + this.CalendarYearSelectorYearId + '" size="4" value="' + currentYear + '" onkeyup="if (this.value.length === 4) { document.getElementById(\'' + this.CalendarYearSelectorButtonId + '\').focus(); };">' +
					'<input type="hidden" value="' + month + '" name="' + this.CalendarYearSelectorMonthId + '" id="' + this.CalendarYearSelectorMonthId + '">' + 
					'<input type="button" onclick="DatePicker.ChangeYear(\'' + inputField + '\');" value="Go" id="' + this.CalendarYearSelectorButtonId + '">';
				activator.innerHTML = yearSelector;
			}
		},
		ChangeYear: function (inputField) {
			var inputYear = document.getElementById(this.CalendarYearSelectorYearId).value;
			var inputMonth = document.getElementById(this.CalendarYearSelectorMonthId).value;
			var newDate = new Date(inputYear, inputMonth, 1, 0, 0, 0);
			this.ChangeMonth(inputField, this.GetStringFromDate(newDate));
		},
        GetDateFromString: function (dateString) {
            // Converts a string into a date based on 
            // - this.DateFormat
            // - this.DateFormatter
            var inputParts = dateString.split(this.DateFormatter);
            var inputDate = new Date();
            if (inputParts.length == 3) {
                inputDate.setDate(1);
                var dayPosition = this.DateFormat.indexOf("d");
                var monthPosition = this.DateFormat.indexOf("m");
                var yearPosition = this.DateFormat.indexOf("y");
                var today = new Date();
                if (isNaN(inputParts[yearPosition])) {
                    inputParts[yearPosition] = today.getFullYear();
                }
                if (isNaN(inputParts[monthPosition])) {
                    inputParts[monthPosition] = today.getMonth();
                }
                if (isNaN(inputParts[dayPosition])) {
                    inputParts[dayPosition] = today.getDate();
                }
                inputDate.setYear(inputParts[yearPosition]);
                inputDate.setMonth((inputParts[monthPosition] - 1));
                inputDate.setDate(inputParts[dayPosition]);
            }
            return inputDate;
        },
        GetStringFromDate: function (date) {
            // Converts a date into a string based on
            // - this.DateFormat
            // - this.DateFormatter
            var i;
            var dateParts = new Array();
            var dateString = "";
            var dayPosition = this.DateFormat.indexOf("d");
            var monthPosition = this.DateFormat.indexOf("m");
            var yearPosition = this.DateFormat.indexOf("y");
            dateParts[dayPosition] = date.getDate();
            dateParts[monthPosition] = (date.getMonth() + 1);
            dateParts[yearPosition] = date.getFullYear();
            for (i = 0; i < dateParts.length; i++) {
                var datePart = dateParts[i].toString();
                if (datePart.length < 2) {
                    datePart = '0' + datePart;
                }
                if (i > 0) {
                    dateString += this.DateFormatter;
                }
                dateString += datePart;
            }
            return dateString;
        },
        GetCalendarForDate: function (date, inputField) {
            // Gets an HTML calendar for the given month
            // - this.CalendarLayoutFormat
            var calendar = this.CalendarLayoutFormat;
            calendar = calendar.replace("{0}", this.GetCaption(date, inputField));
            calendar = calendar.replace("{1}", this.GetDayHeadings());
            calendar = calendar.replace("{2}", this.GetDays(date, inputField));
				calendar = calendar.replace("{3}", this.GetFooter(inputField));
            return calendar;
        },
        GetCaption: function(date, inputField) {
            // Gets the caption based on a given date
			var previous = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0);
			previous.setMonth(previous.getMonth() -1);
			var previousDateString = this.GetStringFromDate(previous);
			
			var next = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0);
			next.setMonth(next.getMonth() +1);
			var nextDateString = this.GetStringFromDate(next);
                
            var caption = this.CalendarCaptionFormat;
            caption = caption.replace("{0}", '<a href="#' + previousDateString + '" onclick="DatePicker.ChangeMonth(\'' + inputField + '\', \'' + previousDateString + '\')" class="previous">&laquo;</a>');
            caption = caption.replace("{1}", '<span id="captionheader" onclick="DatePicker.ChangeYearSelector(this, \'' + inputField + '\', \'' + date.getMonth() + '\');">' + this.MonthNames[date.getMonth()] + " " + date.getFullYear() + "</span>");
            caption = caption.replace("{2}", '<a href="#' + nextDateString + '" onclick="DatePicker.ChangeMonth(\'' + inputField + '\', \'' + nextDateString + '\')" class="next">&raquo;</a>');
            return caption;
        },
        GetDayHeadings: function () {
            // Gets day of the week headings for a calendar
            var i = 0;
            var j = this.FirstDay;
            var dayHeadings = this.CalendarHeaderFormat;
            for (i = 0; i < 7; i++) {
                dayHeadings = dayHeadings.replace("{" + i + "}", this.DayNames[j]);
                j++;
                if (j > 6) {
                    j = 0;
                }
            }
            return dayHeadings;
        },
        GetDays: function (date, inputField) {
            // Gets links to select the individual dates in the month
            var i;
            var dayDate = date;
            var dayOfMonth;
            dayDate.setDate(1);
            var firstDayOfWeekInMonth = dayDate.getDay();
        
            var rows = [];
            
            var columnCount = rows.length;
            rows[columnCount] = this.CalendarRowFormat;
            dayOfMonth = dayDate.getDate();

            // First Row
            if (this.FirstDay == 1 && firstDayOfWeekInMonth == 0) {
                for (i = 0; i < 6; i++) {
                    rows[columnCount] = rows[columnCount].replace("{" + i + "}", "&nbsp;");
                }
                rows[columnCount] = rows[columnCount].replace("{6}", this.GetDateLink(dayDate, inputField));
                dayDate.setDate(dayOfMonth + 1);
            } else {
                for (i = 0; i < 7; i++) {
                    if (i + this.FirstDay >= firstDayOfWeekInMonth) {
                        dayOfMonth = dayDate.getDate();
                        rows[columnCount] = rows[columnCount].replace("{" + i + "}", this.GetDateLink(dayDate, inputField));
                        dayDate.setDate(dayOfMonth + 1);
                    } else {
                        rows[columnCount] = rows[columnCount].replace("{" + i + "}", "&nbsp;");
                    }
                }
            }
            
            // Subsequent rows
            dayOfMonth = 2;
            while (dayOfMonth > 1) {
                var columnCount = rows.length;
                rows[columnCount] = this.CalendarRowFormat;
                for (i = 0; i < 7; i++) {
                    dayOfMonth = dayDate.getDate();
                    if (dayOfMonth != 1) {
                        rows[columnCount] = rows[columnCount].replace("{" + i + "}", this.GetDateLink(dayDate, inputField));
                        dayDate.setDate(dayOfMonth + 1);
                        dayOfMonth = dayDate.getDate();
                    } else {
                        rows[columnCount] = rows[columnCount].replace("{" + i + "}", "&nbsp;");
                    }
                }
            }
				
            var calendarBody = "";
            for (i = 0; i < rows.length; i++) {
                calendarBody += rows[i];
            }
            return calendarBody;
        },
        GetDateLink: function(date, inputField) {
            // Gets a link to select a date
            var dateLink = this.CalendarLinkFormat;
				var dateString = this.GetStringFromDate(date);
				var dayOfWeek = date.getDay();
				
				dateLink = dateLink.replace("{0}", dateString);
            dateLink = dateLink.replace("{1}", "DatePicker.SelectDate('" + inputField + "', '" + dateString + "');");
				dateLink = dateLink.replace("{2}", "day" + dayOfWeek);
            dateLink = dateLink.replace("{3}", date.getDate());
            return dateLink;
        },
        GetFooter: function(inputField) {
            var footer = this.CalendarFooterFormat;
		    var currentDate = new Date();
            var currentDateString = this.GetStringFromDate(currentDate);
            var currentDateText = this.MonthNames[currentDate.getMonth()] + " " + currentDate.getFullYear();
            footer = footer.replace("{0}", '<a href="#" onclick="DatePicker.ChangeMonth(\'' + inputField + '\', \'' + currentDateString + '\');">' + currentDateText + '</a>');
            footer = footer.replace("{1}", '<a href="#" onclick="DatePicker.Close();">Close</a>');
            return footer;
        },
        SetContainerPosition: function (container, activator) {
            // Positions the container
            var activatorPosition = this.GetActivatorPosition(activator);
            container.style.position = "absolute";
            container.style.top = activatorPosition.top + "px";
            container.style.left = activatorPosition.left + "px";
        },
        GetActivatorPosition: function (activator) {
            // Gets the position of the item that was clicked
            var leftPosition = 0;
            var topPosition = 0;
            var height = activator.offsetHeight;
            if (activator.offsetParent) {
                do {
                    leftPosition += activator.offsetLeft;
                    topPosition += activator.offsetTop;
                } while (activator = activator.offsetParent);
            }
            return { left: leftPosition, top: topPosition + height };
        },
        SelectDate: function(inputField, dateString) {
            // Handles date selection
            document.getElementById(inputField).value = dateString;
            this.Close();
            return false;
        }
    };
}());