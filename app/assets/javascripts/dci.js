

/* File for registration review data call-ins */

function fetch_dci(cuid) {

	
	var url = api_url + ":3000/dci/" + cuid;

	$.ajax({
	  type: "get",
	  url: url,
      crossDomain: true,
      beforeSend: function(xhr) {
      	$("#reg_review").css("display","block");
      	$("#reg_review").append("<div class='loading'>Loading Registration Review Activity...</div>");


      }
      ,
      success: function (data){
		$("#reg_review .loading").remove();

		displayDCI(data);

      }

	});

};

function displayDCI(data){
	// if there is a DCI order..
	//..... check if has_dci is already true
	//........if not, set it to true and create the table header
	//alert("num of DCIs: " + data.data.length);
	if (data.data.length > 0) {//there are DCIs
		if (has_dci == false){// add the table header
			has_dci = true;
			var tTbl = $(".regreview_table");
			var row = "<tr class='headrow'><th>AI</th><th>DCI Name</th><th>Order Data</th><th>Form B</th><th>Status</th></tr>"
			$(tTbl).append(row);

		}
		//add rows
		data.data.forEach(function(dci_order,index){
			var tRow = "<tr><td>" + dci_order.ingredient_name+ "</td><td>" + dci_order.case_name + "</td><td>" + dci_order.dci_order_data_name + "</td><td>" + dci_order.dci_form_b_category + "</td><td>" + dci_order.order_data_status_name + "</td></tr>";
			$(tTbl).append(tRow);
		});

	}

    


}
