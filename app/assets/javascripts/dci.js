
has_dci = false; //whether or not the ingredient has active DCI's
dci_names =[]; //an array of unique DCI names (usually just 1) 
dci_data = null; //the DCI data returned from API

//The data in the following three arrays can be matched by index
dci_case_status =[];//array of dci case statuses
dci_seq = [];//array of unique dci (dci_seq) per chemical
dci_ai =[]; //an array of ingredient CUID



/* File for registration review data call-ins */

function fetch_dci(cuid) {//gets data and sets up page for each ingredient

	
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
		dci_data = data.data;//set variable in global scope of DOM
		displayDCI(data);

      }

	});

};

function displayDCI(data){
	//this function dynamically creates the DCI table in the DOM and injects it into the page. 

	if (dci_data.length > 0 ) {//if there are DCIs 
		if (has_dci == false){// ...but the table header isn't already added, add it TODO: maybe we don't need this?
			has_dci = true;
			var tTbl = $(".regreview_table");
			var row = "<tr class='headrow'><th>AI</th><th>DCI Name</th><th>Order Data</th><th>Form B</th><th>Status</th></tr>"
			//$(tTbl).append(row);

		}

		var last_case_seq = null;
		//loop through records and build some objects
		dci_data.forEach(function(dci_order_data,index){


			//Generate a row for each new DCI_SEQ 
			if($.inArray(dci_order_data.dci_seq,dci_seq) == -1){//for each new DCI_seq
				//populate some DCI level information in arrays to use later
				dci_seq.push(dci_order_data.dci_seq);
				dci_ai.push(dci_order_data.cuid);
				dci_case_status.push(dci_order_data.case_status_name);

				var dci_head = $("<div class='row'><div class='col-md-12'>[DCI_SEQ]:" + dci_order_data.dci_seq + "/" + dci_order_data.dci_name + " / " + dci_order_data.ind_name + "</div></div>");
				$("#reg_review").append(dci_head);

			}

			//Generate a row for each CASE_NAME (which is per company) - keep track of last case_seq
			if (dci_order_data.case_seq != last_case_seq){
				var case_head = $("<div class='row'><div class='col-md-12'>- - [CASE_SEQ]:" + dci_order_data.case_seq + "/" + dci_order_data.case_name + "</div></div>");
				$("#reg_review").append(case_head);				
			}
			last_case_seq = dci_order_data.case_seq;

			//Generate a row for each DCI order data, as that is the most verbose
			var order_data = $("<div class='row'><div class='col-md-12'>- - - - [DCI_ORDER_DATA_SEQ]:" + dci_order_data.dci_order_data_seq + "/" + dci_order_data.dci_order_data_name + "/" + dci_order_data.order_data_status_name + "</div></div>");
			$("#reg_review").append(order_data);				

			

		});


		//now, add DCI status next to the ingredient list up i nthe product summary area	
		//TODO!!!!!! But, only the last status of a case/ per chemical is displayed - SO, if the order
		//is wrong, it could mis-report, need to fix. 

		dci_seq.forEach(function(dci,index) {
			
			if ($.inArray(dci_case_status[index],["Active","Scheduled"]) > -1) {
					$("#dci_" + dci_ai[index]).html("Registration Review Case: " + dci_case_status[index]);
					$("#dci_" + dci_ai[index]).addClass("prod_sum_dci_open");
					$("#dci_" + dci_ai[index]).removeClass("prod_sum_dci_none");					
			}
			else {//make it visually clear that there is no case open
					$("#dci_" + dci_ai[index]).html("There are no open Reg Review cases");					
					$("#dci_" + dci_ai[index]).addClass("prod_sum_dci_none");
					$("#dci_" + dci_ai[index]).removeClass("prod_sum_dci_open");					
			}

		})


	}






}
