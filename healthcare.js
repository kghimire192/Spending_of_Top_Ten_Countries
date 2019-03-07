		//load the google charts
		google.charts.load('current',{'packages':['corechart']});
		
		//load the Callback function that runs when page loads
		google.charts.setOnLoadCallback(drawGraphs);
		
		//function that runs when page loads
		function drawGraphs() {
			plotEachGraph('Healthcare', 
						  'SELECT K,L,M,N,O,P',
						  healthcareSpendingHandler);
			
			plotEachGraph('HealthcarePerCapita', 
						  'SELECT K,L,M,N,O,P',
						  healthcareSpendingGDPHandler);
						  
			plotEachGraph('PerCapita', 
						  'SELECT A,B,I',
						  healthcareSpendingPerCapitaHandler2011);
						  
			plotEachGraph('PerCapita', 
						  'SELECT A,C,J',
						  healthcareSpendingPerCapitaHandler2015);
						  
			plotEachGraph('HealthcareTransposed', 
						  'SELECT A,B,C,D,E,F,G,H,I,J,K',
						  healthcareSpendingGrowthHandler);
						  
			plotEachGraph('HealthcareTransposed', 
						  'SELECT A,B,C,D,E,F,G,H,I,J',
						  healthcareSpendingGrowthHandlerWithoutUS);
						  
			plotEachGraph('HealthcareGrowth', 
						  'SELECT H,M',
						  healthcareSpendingGrowthPercentHandler);
						  
		
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
		
		//function that draws a column chart to show the healthcare expenditure of top 10 countries from year 2011 to 2015
		function healthcareSpendingHandler(response) {
			var data = response.getDataTable();
			data.sort({column:5, desc:true});
			var options = {
						title: 'Healthcare Expenditure in Billions ($)',
						vAxis: {title: 'Expenditure in Billions ($)'},
						hAxis: {title: 'Country'}
						
			};
			
			var chart = new google.visualization.ColumnChart(
						document.getElementById('healthcare'));
			
			chart.draw(data, options);
		} //healthcareSpendingHandler
		
		//function that draws a column chart to show the healthcare expenditure as a percentage of GDP for top 10 countries from 2011 to 2015
		function healthcareSpendingGDPHandler(response) {
			var data = response.getDataTable();
			data.sort({column:5, desc:true});
			var options = {
						title: 'Healthcare Expenditure as a Percentage of GDP (2011-2015)',
						vAxis: {title: '% of GDP'},
						hAxis: {title: 'Country'},
			};
			
			var chart = new google.visualization.ColumnChart(
						document.getElementById('healthcare_GDP'));
			
			chart.draw(data, options);
		} //healthcareSpendingGDPHandler
		
		//function that draws bubble chart to see if there is a correlation between Healthcare Spending per capita and GDP per capita for year 2011
		function healthcareSpendingPerCapitaHandler2011(response) {
			var data = response.getDataTable();
			var options = {
						title: 'Healthcare Expenditure Per Capita Compared to GDP Per Capita (2011)',
						
						vAxis: {title: 'Healthcare Expenditure Per Capita'},
						hAxis: {title: 'GDP Per Capita'},	
			};
			
			var chart = new google.visualization.BubbleChart(
						document.getElementById('healthcare_PerCapita2011'));
			
			chart.draw(data, options);
		} //healthcareSpendingPerCapitaHandler2011
		
		//function that draws bubble chart to see if there is a correlation between healthcare Spending per capita and GDP per capita for year 2015
		function healthcareSpendingPerCapitaHandler2015(response) {
			var data = response.getDataTable();
			var options = {
						title: 'Healthcare Expenditure Per Capita Compared to GDP Per Capita (year 2015)',
						vAxis: {title: 'Healthcare Expenditure Per Capita'},
						hAxis: {title: 'GDP Per Capita'}	
			};
			
			var chart = new google.visualization.BubbleChart(
						document.getElementById('healthcare_PerCapita2015'));
			
			chart.draw(data, options);
		} //healthcareSpendingPerCapitaHandler2015
		
		//function that draws a line chart to see the change/ growth in healthcare expenditure over time (2011-2015)
		function healthcareSpendingGrowthHandler(response) {
			var data = response.getDataTable();
			var options = {
						title:'Healthcare Expenditure Growth from 2011 to 2015',
						vAxis: {title: 'Healthcare Expenditure in Billions ($)'},
						hAxis: {title: 'Year'}	
			};
			
			var chart = new google.visualization.LineChart(
						document.getElementById('healthcare_Growth'));
			
			chart.draw(data, options);
		} //healthcareSpendingGrowthHandler
		
		//function that draws a line chart to show the change/ growth in healthcare expenditure over time (2011-2015), USA excluded for ease of read for other countries
		function healthcareSpendingGrowthHandlerWithoutUS(response) {
			var data = response.getDataTable();
			var options = {
						title:'Healthcare Expenditure Growth from 2011 to 2015',
						vAxis: {title: 'Healthcare Spending ($) in Billions'},
						hAxis: {title: 'Year'}	
			};
			
			var chart = new google.visualization.LineChart(
						document.getElementById('healthcare_Growth_withoutUS'));
			
			chart.draw(data, options);
		} //healthcareSpendingGrowthHandler
		
		//function that draws a Geo chart to show the percentage growth (from 2011 to 2015) in healthcare spending for all 10 countries
		function healthcareSpendingGrowthPercentHandler(response) {
			var data = response.getDataTable();
			var options = {
						colorAxis: {colors: ['pink', 'purple']}
			};
			
			var chart = new google.visualization.GeoChart(
						document.getElementById('healthcare_Growth_percent'));
			
			chart.draw(data, options);
		} //healthcareSpendingGrowthPercentHandler