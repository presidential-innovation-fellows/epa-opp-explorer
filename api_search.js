



function fetchAPI() {

	var mrid_value = $('#mrid').val();


	var dql_string_1 = "select r_object_id,object_name,title,r_creator_name,r_object_type from opp_study WHERE r_object_type='opp_study' and ANY mrid in ('" + mrid_value + "')";

	var dql_string_2 = "";

	$.ajax({
	  type: "post",
	  url: "https://w2032pcctr584.aa.ad.epa.gov/dctm-rest/repositories/prismenvdev6.json",
	  	  data: { dql: dql_string_1},
      crossDomain: true,
      xhrFields: {
      	withCredentials: true
      },
      success: function (data){
    	
    	console. log ("title:" + data.entries["0"].content.properties.object_name)
    	docRes = data;
    	var i = 1;
    }

	});

	
	






//      jsonpCallback: "fnsuccesscallback"

/*




*/

};
	


  
