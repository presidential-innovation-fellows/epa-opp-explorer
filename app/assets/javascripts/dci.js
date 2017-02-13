

dci_data = []; //the DCI data returned from API

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
		if(data.data.dci.length > 0){
			dci_data.push(data.data);//set variable in global scope of DOM
		}

		displayDCI(data.data);

      }

	});

};

function displayDCI(data){
	//this function dynamically creates the DCI table in the DOM and injects it into the page. 

	if (data.dci.length > 0 ) {//if there are DCIs 

		//loop through records and build some objects
		data.dci.forEach(function(dci,index){


			//Generate a row for each new DCI_SEQ 
			//if($.inArray(dci_order_data.dci_seq,dci_seq) == -1){//for each new DCI_seq
				//populate some DCI level information in arrays to use later
				//dci_seq.push(dci_order_data.dci_seq);
				//dci_ai.push(dci_order_data.cuid);
				//dci_case_status.push(dci_order_data.case_status_name);

				var dci_head = $("<div class='row'><div class='col-md-12'><div class='dci_head'>Data Call In - " +  dci.ingredient_name + "</div><!-- dci_seq " + dci.dci_seq + " --></div></div>");
				//There assumptions here: Issue Date, Due Date, etc, are stored at the DCI Order level - which is 
				//one per company (1-1 rel. w/ case). We're assuming all DCI orders are the same dates for each DCI
				//so using the values from the first DCI order per DCI for the summary info. If DCI orders ever
				//differ between companies (orders) - then these summary data should be displayed per DCI Order/Case.
				var tmpStaffHTML = "";
				dci.staff.forEach(function(staff,index){
					tmpStaffHTML = tmpStaffHTML + "<div><a data-sm_uid='" + staff.sm_uid + "'>" + staff.sm_fname + " " + staff.sm_lname + "</a></div>";
				});

				var dci_summary_tbl =$("<div class='row'><div class='col-md-12'><table class='dci_summary_table'><tr><td class='dci_summ_label'>Issue Date:</td><td>" + oracleDate(dci.issue_date) + "</td></tr><tr><td class='dci_summ_label'>Due Date:</td><td>" + oracleDate(dci.due_date) + "</td></tr><tr><td class='dci_summ_label'>Chem. Reviewer:</td><td>" + tmpStaffHTML + " </td></tr></table></div></div>");

				var anchors = $(dci_summary_tbl).find('a'); 
		    	$(anchors).on('click',function(){
		    		contactDialog(anchors);
		    	});

				var case_headings = $("<div class='row'><div class='col-md-8 case_head'>RR Case Name</div><div class='col-md-2 case_head'>Case Status</div><div class='col-md-2'></div></div>");

				$("#reg_review").append(dci_head);
				$("#reg_review").append(dci_summary_tbl);				
				$("#reg_review").append(case_headings);

			
				dci.cases.forEach(function(rr_case, index){
					//Generate a row for each CASE_NAME (which is per company) - keep track of last case_seq
					//if (dci_order_data.case_seq != last_case_seq){


					var case_detail = $("<div class='row'><div class='col-md-8'><!--" + rr_case.case_seq + "-->" + rr_case.case_name + "</div><div class='col-md-2'>" + rr_case.case_status_name + "</div><div class='col-md-2'><a class=''>Show Studies</a></div></div>");
		
					$("#reg_review").append(case_detail);			
					//}
					//last_case_seq = case.case_seq;

					//Generate a row for each DCI order data, as that is the most verbose
					
					rr_case.dci_order_data.forEach(function(data_order,index){

						var order_data = $("<div class='row dci_order_data_row'><div class='col-md-12'>- - - - [DCI_ORDER_DATA_SEQ]:" + data_order.dci_order_data_seq + "/" + data_order.dci_order_data_name + "/" + data_order.order_data_status_name + "</div></div>");
						$("#reg_review").append(order_data);	

						//Now, do the studies

					});

				});

		});


		//now, add DCI status next to the ingredient list up i nthe product summary area	
		//TODO!!!!!! But, only the last status of a case/ per chemical is displayed - SO, if the order
		//is wrong, it could mis-report, need to fix. 

		
		//1. loop over product_data.ingredients, check if 
		product_data.ingredients.forEach(function(ingredient,index){
			var has_case = false;
			var case_status = "";
			dci_data.forEach(function(dci,index){
				if(dci.dci[0].cuid == ingredient.cuid ){
					has_case = true;
					case_status = dci.dci[0].case_status_name;
				}
			})
			if(has_case == true){
				$("#dci_" + ingredient.cuid).html("Registration Review Case: " + case_status);
				$("#dci_" + ingredient.cuid).addClass("prod_sum_dci_open");
				$("#dci_" + ingredient.cuid).removeClass("prod_sum_dci_none");					
			}
			else {
				$("#dci_" + ingredient.cuid).html("There are no open Reg Review cases");					
				$("#dci_" + ingredient.cuid).addClass("prod_sum_dci_none");
				$("#dci_" + ingredient.cuid).removeClass("prod_sum_dci_open");	
			}

		});

		/*
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
		*/


	}






}
