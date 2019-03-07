		//load the google charts
		google.charts.load('current',{'packages':['corechart']});
		
		//load the Callback function that runs when page loads
		google.charts.setOnLoadCallback(drawGraphs);
		
		
		//function that runs when page loads
		function drawGraphs() {
			plotEachGraph('Combined', 
						  'SELECT L,M',
						  combinedSpendingHandler);
		} //drawGraphs
		
		//function called within the callback function that takes in spreadsheet name, query and handler name as arguments,
		//which then sends the query response to the handler specified in the argument
		function plotEachGraph(sheet, queryString, handlerName) {
			var encodedQuery = encodeURIComponent(queryString);
			var query = new google.visualization.Query(
				'https://docs.google.com/spreadsheets/d/1ORN7toUfgOtJlH8FAwuVn88PmSkO2_NmCwD6WMSw0Hs/gviz/tq?sheet=' +
							sheet + '&headers=1&tq=' + encodedQuery);
			query.send(handlerName);
		} //plotEachGraph
		
		//response handler function, that takes in response and uses google visualization tool to draw graph, 
		//draws pie chart in this case to show the spending distribution of top 10 countries combined
		function combinedSpendingHandler(response) {
			var data = response.getDataTable(); //putting data in a data table
			var options = {
					title: 'Combined Spending Distribution of Top 10 Countries (2015)',	
					colors:['red','purple','green'] //colors for portions of pie chart
			};
			
			//new instance of the chart object
			var chart = new google.visualization.PieChart(
						document.getElementById('combined_spending'));
			
			chart.draw(data, options);
		} //combinedSpendingHandler