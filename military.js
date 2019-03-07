		//load the google charts
		google.charts.load('current',{'packages':['corechart']});
		
		//load the Callback function that runs when page loads
		google.charts.setOnLoadCallback(drawGraphs);
		
		//function that runs when page loads
		function drawGraphs() {
			plotEachGraph('Military', 
						  'SELECT K,L,M,N,O,P',
						  militarySpendingHandler);
			
			plotEachGraph('MilitaryPerCapita', 
						  'SELECT K,L,M,N,O,P',
						  militarySpendingGDPHandler);
						  
			plotEachGraph('PerCapita', 
						  'SELECT A,B,I',
						  militarySpendingPerCapitaHandler2011);
						  
			plotEachGraph('PerCapita', 
						  'SELECT A,C,J',
						  militarySpendingPerCapitaHandler2015);
						  
			plotEachGraph('Averages', 
						  'SELECT A,B,D',
						  militarySpendingEducationHandler);
						  
			plotEachGraph('Averages', 
						  'SELECT A,C,D',
						  militarySpendingHealthcareHandler);
						  
						  
			
						  
		
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
		
		
		//function that draws a column chart to show the military expenditure of top 10 countries from year 2011 to 2015
		function militarySpendingHandler(response) {
			var data = response.getDataTable();
			data.sort({column:5, desc:true});
			var options = {
						title: 'Military Expenditure in Billions ($)',
						vAxis: {title: 'Expenditure in Billions ($)'},
						hAxis: {title: 'Country'}
						
			};
			
			var chart = new google.visualization.ColumnChart(
						document.getElementById('military'));
			
			chart.draw(data, options);
		} //MilitarySpendingHandler
		
		
		//function that draws a column chart to show the military expenditure as a percentage of GDP for top 10 countries from 2011 to 2015
		function militarySpendingGDPHandler(response) {
			var data = response.getDataTable();
			data.sort({column:5, desc:true});
			var options = {
						title: 'Military Expenditure as a Percentage of GDP (2011-2015)',
						vAxis: {title: '% of GDP'},
						hAxis: {title: 'Country'},
			};
			
			var chart = new google.visualization.ColumnChart(
						document.getElementById('military_GDP'));
			
			chart.draw(data, options);
		} //MilitarySpendingGDPHandler
		
		//function that draws bubble chart to see if there is a correlation between military Spending per capita and GDP per capita for year 2011
		function militarySpendingPerCapitaHandler2011(response) {
			var data = response.getDataTable();
			var options = {
						title: 'Military Expenditure Per Capita Compared to GDP Per Capita (2011)',
						
						vAxis: {title: 'Military Expenditure Per Capita'},
						hAxis: {title: 'GDP Per Capita'},	
			};
			
			var chart = new google.visualization.BubbleChart(
						document.getElementById('military_PerCapita2011'));
			
			chart.draw(data, options);
		} //MilitarySpendingPerCapitaHandler2011
		
		//function that draws bubble chart to see if there is a correlation between military Spending per capita and GDP per capita for year 2015
		function militarySpendingPerCapitaHandler2015(response) {
			var data = response.getDataTable();
			var options = {
						title: 'Military Expenditure Per Capita Compared to GDP Per Capita (year 2015)',
						vAxis: {title: 'Military Expenditure Per Capita'},
						hAxis: {title: 'GDP Per Capita'}	
			};
			
			var chart = new google.visualization.BubbleChart(
						document.getElementById('military_PerCapita2015'));
			
			chart.draw(data, options);
		} //MilitarySpendingPerCapitaHandler2015
		
		//function that draws a stacked bar graph to compare the average education expenditure to average military expenditure (from 2011 to 2015)
		function militarySpendingEducationHandler(response) {
			var data = response.getDataTable();
			var options = {
						title: 'Average Education Expenditure Compared to Average Military Expenditure (2011-2015)',
						vAxis: {title: 'Country'},
						hAxis: {title: 'Spending in Billions ($)'},
						isStacked: true
			};
			
			var chart = new google.visualization.BarChart(
						document.getElementById('military_education'));
			
			chart.draw(data, options);
		} //militarySpendingEducationHandler
		
		
		//function that draws a stacked bar graph to compare the average healthcare expenditure to average military expenditure (from 2011 to 2015)
		function militarySpendingHealthcareHandler(response) {
			var data = response.getDataTable();
			var options = {
						title: 'Average Healthcare Expenditure Compared to Average Military Expenditure (2011-2015)',
						vAxis: {title: 'Country'},
						hAxis: {title: 'Spending in Billions ($)'},
						isStacked: true
			};
			
			var chart = new google.visualization.BarChart(
						document.getElementById('military_healthcare'));
			
			chart.draw(data, options);
		} //militarySpendingHealthcareHandler
		