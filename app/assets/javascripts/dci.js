

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
		dci_data = data.data;
		displayDCI(data);

      }

	});

};

function displayDCI(data){

	if (dci_data.length > 0 ) {//if there are DCIs
		if (has_dci == false){// add the table header if it isn't already added
			has_dci = true;
			var tTbl = $(".regreview_table");
			var row = "<tr class='headrow'><th>AI</th><th>DCI Name</th><th>Order Data</th><th>Form B</th><th>Status</th></tr>"
			$(tTbl).append(row);

		}
		//add rows
		dci_data.forEach(function(dci_order,index){
			//1. create table rows in the DCI detail section
			var tRow = "<tr><td>" + dci_order.ingredient_name+ "</td><td>" + dci_order.case_name + "</td><td>" + dci_order.dci_order_data_name + "</td><td>" + dci_order.dci_form_b_category + "</td><td>" + dci_order.order_data_status_name + "</td></tr>";
			$(tTbl).append(tRow);

			//2. capture cuid and DCI status in a global variable for use later
			if($.inArray(dci_order.cuid,dci_ai) == -1){
				dci_ai.push(dci_order.cuid);//dci_ai is a global page variable set in utility.js
				rr_case_status.push(dci_order.case_status_name);//dci_status is a global page variable set in utility.js
			}
			

		});

		//now, add DCI status next to the ingredient list up i nthe product summary area		
		dci_ai.forEach(function(ai,index) {
			
			if ($.inArray(rr_case_status[index],["Active","Scheduled"]) > -1) {
					$("#dci_" + ai).html("Registration Review Case: " + rr_case_status[index]);
			}
			else {//make it visually clear that there is no case open
					$("#dci_" + ai).html("There is no open Reg Review case");					
			}

		})


	}






}
