var req;

function sendRequest() {
	if (window.XMLHttpRequest) {
		req = new XMLHttpRequest();
	} else {
		req = new ActiveXObject("Microsoft.XMLHTTP");
	}
	req.onreadystatechange = handleResponse;
	req.open("GET", "/todolist/get-list-json", true);
	req.send();
}

function handleResponse() {
	if (req.readyState != 4 || req.status != 200) {
		return;
	}
	var list = document.getElementById("todo-list");
	while (list.hasChildNodes()) {
		list.removeChild(list.firstChild);
	}

	var items = JSON.parse(req.responseText);
	for (var i = 0; i < items.length; i++) {
		var id = items[i]["pk"];
		var itemText = items[i]["fields"]["text"];
		var ipAddr = items[i]["fields"]["ip_addr"];

		var newItem = document.createElement("li");
		newItem.innerHTML = "<form action=/todolist/delete-item method='POST' style='display:inline;'>" +
								"<input type='hidden' value=" + id + " name=item_id>" +
								"<input type='hidden' value=" + getCookie("csrftoken") + " name='csrfmiddlewaretoken'>" +
								"<input type='submit' value='X'>" +
							"</form> " + itemText;
		list.appendChild(newItem)
	}
}

function ajaxUpdate() {
	$.ajax({
		url: "/todolist/get-list-json",
		dataType: "json",
		success: function(items) {
			$("#todo-list li").remove();
			$(items).each(function() {
				$("#todo-list").append(
					"<li><form action=/todolist/delete-item method='POST' style='display:inline;'>" +
								"<input type='hidden' value=" + this.pk + " name=item_id>" +
								"<input type='hidden' value=" + getCookie("csrftoken") + " name='csrfmiddlewaretoken'>" +
								"<input type='submit' value='X'>" +
							"</form> " + this.fields.text + "</li>");
			});
		}
	});
}

function getCookie(c_name) {
    if (document.cookie.length > 0)
    {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1)
        {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start,c_end));
        }
    }
    return "";
 }

window.setInterval(ajaxUpdate, 5000);