var SupplyConsole = (function() {
    return {
		stackTrace : true,
		maximumMessages : 50,
		timers : {},
		getConsole : function () {
			var consoleElement = document.getElementById("consoleLogger");
			if (consoleElement === null) {
				consoleElement = document.createElement("div");
				consoleElement.id = "consoleLogger";
				document.getElementsByTagName("body")[0].appendChild(consoleElement);
			}
			return consoleElement;
		},
		clearConsole : function () {
			var i;
			var consoleElement = this.getConsole();
			var messageElements = consoleElement.getElementsByTagName("p");
			if (messageElements.length > this.maximumMessages) {
				for (i = this.maximumMessages; i < messageElements.length; i++) {
					consoleElement.removeChild(messageElements[i]);
				}
			}
		},
		getTime : function () {
			var now = new Date();
			var day = this.padLeft(now.getDate(), 2, "0");
			var month = this.padLeft(now.getMonth() + 1, 2, "0");
			var year = now.getFullYear();
			var hour = this.padLeft(now.getHours(), 2, "0");
			var minute = this.padLeft(now.getMinutes(), 2, "0");
			var second = this.padLeft(now.getSeconds(), 2, "0");
			return day + "/" + month + "/" + year + " : " +
				hour + ":" + minute + ":" + second;
		},
		getStackTrace : function () {
			var i;
			var stackTraceOutput = "";
			if (this.stackTrace) {
				var trace = printStackTrace();
				if (trace[0].indexOf("@") > -1 && trace.length > 5) {
					for (i = 5; i < trace.length; i++) {
						var methodEnd = trace[i].indexOf("@");
						var method = trace[i].substring(0, methodEnd);
						var lineNumberStart = trace[i].lastIndexOf(":");
						var lineNumber = this.padLeft(trace[i].substring(lineNumberStart + 1), 5, " ");
						var filePath = trace[i].substring(methodEnd + 1, lineNumberStart);
						var fileNamePosition = filePath.lastIndexOf("/");
						var fileName = filePath.substring(fileNamePosition + 1);
						stackTraceOutput += fileName + "     " + lineNumber + "       " + method + "<br>";
					}
				} else if (trace.length > 4) {
					for (i = 4; i < trace.length; i++) {
						stackTraceOutput += trace[i] + "<br>";
					}
				}
			} else {
				stackTraceOutput = "Stack trace not enabled.";
			}
			return stackTraceOutput;
		},
		getLineNumber : function () {
			var lineNumber = -1;
			if (this.stackTrace) {
				var trace = printStackTrace();
				if (trace[0].indexOf("@") > -1 && trace.length > 5) {
					var lineNumberStart = trace[6].lastIndexOf(":");
					lineNumber = trace[6].substring(lineNumberStart + 1);
				} else {
					var lineNumberStart = trace[5].lastIndexOf(":");
					lineNumber = trace[5].substring(lineNumberStart + 1);
				}
			}
			return lineNumber;
		},
		padLeft : function (string, length, padder) {
			string = string.toString();
			padder = padder.toString();
			while (string.length < length) {
				string = padder + string;
			}
			return string;
		},
		writeMessage : function (message, type) {
			var consoleElement = this.getConsole();
			var messageElement = document.createElement("p");
			var extendedMessage = this.getTime() + " : ";
			if (this.stackTrace) {
				var lineNumber = this.getLineNumber();
				extendedMessage += "Line " + lineNumber + " - " 
			}
			extendedMessage += message;
			messageElement.innerHTML = extendedMessage;
			messageElement.className = type;
			consoleElement.insertBefore(messageElement, consoleElement.firstChild);
			this.clearConsole();
		},
		assert : function (message) {
			if (message === true) {
				this.writeMessage("Assert passed", "info");
			} else {
				this.writeMessage("Assert failed", "error");
			}
		},
		debug : function (message) {
			this.writeMessage(message, "info");
		},
		dir : function (message) {
			this.notImplemented("dir");
		},
		dirxml : function (message) {
			this.notImplemented("dirxml");
		},
		error : function (message) {
			this.writeMessage("[X] " + message, "error");
		},
		group : function (message) {
			this.notImplemented("group");
		},
		groupEnd : function (message) {
			this.notImplemented("groupEnd");
		},
		info : function (message) {
			this.writeMessage("[i] " + message, "info");
		},
		log : function (message) {
			this.writeMessage(message, "info");
		},
		profile : function (message) {
			this.notImplemented("profile");
		},
		time : function (timerName) {
			this.timers[timerName] = new Date();
			this.writeMessage("Timer '" + timerName + "' started.", "info");
		},
		timeEnd : function (timerName) {
			var endTime = new Date();
			var duration = (endTime - this.timers[timerName]) / 1000;
			if (isNaN(duration)) {
				this.error("A timer called '" + timerName + "' was not found.");
			} else {
				var duration = (endTime - this.timers[timerName]) / 1000;
				this.writeMessage("Timer '" + timerName + "' took " + duration + " seconds.", "info");
			}
		},
		trace : function (message) {
			var stackTrace = this.getStackTrace();
			this.writeMessage("Stack Trace: <br>" + stackTrace, "info");
		},
		warn : function (message) {
			this.writeMessage("[!] " + message, "warning");
		},
		notImplemented : function (type) {
			this.writeMessage("console." + type + " call not implemented", "warning");
		}
    };
}());

if (typeof(console) === 'undefined') {
    var console = SupplyConsole;
}