



function fetchAPI() {

	var admin_num_value = $('#admin_num').val();
	
	var url = "https://w2032pcctr584.aa.ad.epa.gov/dctm-rest/repositories/prismenvdev6.json";
	//var url = "https://dcoppdoctstw01.epa.gov/dctm-rest/repositories/prismtest.json";

	//var dql_string_1 = "select r_object_id,object_name,title,r_creator_name,r_object_type from opp_study WHERE r_object_type='opp_study' and ANY mrid in ('" + mrid_value + "')";

	var dql_string_2 = "select *,admin_num from opp_study WHERE ANY admin_num LIKE '" + admin_num_value + "%'";
	console.log(url + "?dql=" + dql_string_2);


	$.ajax({
	  type: "post",
	  url: url,
	  	  data: { dql: dql_string_2},
      crossDomain: true,
      xhrFields: {
      	withCredentials: true
      },
      success: function (data, status, jqXHR){

		temp = 1;    	
    	console.log ("title:" + data.entries["0"].content.properties.object_name);
    	docRes = data;
    	console.log(docRes);
    	var i = 1;
    	loadTiles();
    	}

	});

};
	

  
function loadTiles() {

	$.each( docRes.entries, function( index, value ) {
  	//console.log("object name: " + value.content.properties["object_name"]);
  	//console.log("title: " + value.content.properties["title"]);

  		docArray.push(value.content.properties["r_object_id"]);
  

		var ul = document.getElementById("study_tiles");
	    var li = document.createElement("li");

	    var div = $("<div class='h4 doc_name'>" + value.content.properties["object_name"] + "</div>");
	   	$(li).append(div);

	    div = $("<div class='reg_num'>Reg #:" + value.content.properties["admin_num"] + "</div>");
	   	$(li).append(div);

	    div = $("<div class='minor_text'>Object ID:" + value.content.properties["r_object_id"] + "</div>");
	   	$(li).append(div);	   	

	    div = $("<a href='' id='down_" + value.content.properties["r_object_id"] + "' class='download' target='_blank'>Download</a>");
	   	$(li).append(div);	   	


	   	$(li).hide();
		$(li).toggle("highlight");

	    //var children = ul.children.length + 1
	    li.setAttribute("id", "item_" + value.content.properties["r_object_id"]);

 	    ul.appendChild(li);

 	    //get File Content Link
 	    fetchDocumentContent(value.content.properties["r_object_id"]);

	}); 	
};


function fetchDocumentContent(object_id) {

	//var url = "https://w2032pcctr584.aa.ad.epa.gov/dctm-rest/repositories/prismenvdev6/objects/" + object_id + ".json";

	var url = "https://dcoppdoctstw01.epa.gov/dctm-rest/repositories/prismtest/objects/" + object_id + "/contents/content.json"

	$.ajax({
	  type: "get",
	  url: url,
      crossDomain: true,
      xhrFields: {
      	withCredentials: true
      },
      success: function (data){
    	
    	//console.log(data);
    	//check for and retrieve object with rel='enclosure'
    	var enclosure = $.grep( data.links, function( n, i ) {
  			return n.rel == "enclosure";
		});

    	console.log("#down_" + data.properties.r_object_id);
    	//console.log(enclosure[0].href);
    	$("#down_" + data.properties.parent_id[0]).attr("href",enclosure[0].href);

      }

	});//end of .ajax

};

