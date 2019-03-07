		//load the google charts
		google.charts.load('current',{'packages':['corechart']});
		
		//load the Callback function that runs when page loads
		google.charts.setOnLoadCallback(drawGraphs);
		
		//function that runs when page loads
		function drawGraphs() {
			plotEachGraph('Education', 
						  'SELECT K,L,M,N,O,P',
						  educationSpendingHandler);
			
			plotEachGraph('EducationPerCapita', 
						  'SELECT K,L,M,N,O,P',
						  educationSpendingGDPHandler);
						  
			plotEachGraph('PerCapita', 
						  'SELECT A,B,I',
						  educationSpendingPerCapitaHandler2011);
						  
			plotEachGraph('PerCapita', 
						  'SELECT A,C,J',
						  educationSpendingPerCapitaHandler2015);
						  
			plotEachGraph('EducationTransposed', 
						  'SELECT A,B,C,D,E,F,G,H,I,J,K',
						  educationSpendingGrowthHandler);
						  
			plotEachGraph('EducationTransposed', 
						  'SELECT A,B,C,D,E,F,G,H,I,J',
						  educationSpendingGrowthHandlerWithoutUS);
						  
			plotEachGraph('EducationGrowth', 
						  'SELECT H,M',
						  educationSpendingGrowthPercentHandler);
						  
		
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
		
		
		//function that draws a column chart to show the education expenditure of top 10 countries from year 2011 to 2015
		function educationSpendingHandler(response) {
			var data = response.getDataTable();
			data.sort({column:5, desc:true});
			var options = {
						title: 'Education Expenditure in Billions ($)',
						vAxis: {title: 'Expenditure in Billions ($)'},
						hAxis: {title: 'Country'}
						
			};
			
			var chart = new google.visualization.ColumnChart(
						document.getElementById('education'));
			
			chart.draw(data, options);
		} //educationSpendingHandler
		
		//function that draws a column chart to show the education expenditure as a percentage of GDP for top 10 countries from 2011 to 2015
		function educationSpendingGDPHandler(response) {
			var data = response.getDataTable();
			data.sort({column:5, desc:true});
			var options = {
						title: 'Education Expenditure as a Percentage of GDP (2011-2015)',
						vAxis: {title: '% of GDP'},
						hAxis: {title: 'Country'},
			};
			
			var chart = new google.visualization.ColumnChart(
						document.getElementById('education_GDP'));
			
			chart.draw(data, options);
		} //educationSpendingGDPHandler
		
		//function that draws bubble chart to see if there is a correlation between Education Spending per capita and GDP per capita for year 2011
		function educationSpendingPerCapitaHandler2011(response) {
			var data = response.getDataTable();
			var options = {
						title: 'Education Expenditure Per Capita Compared to GDP Per Capita (2011)',	
						vAxis: {title: 'Education Expenditure Per Capita'},
						hAxis: {title: 'GDP Per Capita'},	
			};
			
			var chart = new google.visualization.BubbleChart(
						document.getElementById('education_PerCapita2011'));
			
			chart.draw(data, options);
		} //educationSpendingPerCapitaHandler2011
		
		//function that draws bubble chart to see if there is a correlation between Education spending per capita and GDP per capita for 2015
		function educationSpendingPerCapitaHandler2015(response) {
			var data = response.getDataTable();
			var options = {
						title: 'Education Expenditure Per Capita Compared to GDP Per Capita (2015)',
						vAxis: {title: 'Education Expenditure Per Capita'},
						hAxis: {title: 'GDP Per Capita'}	
			};
			
			var chart = new google.visualization.BubbleChart(
						document.getElementById('education_PerCapita2015'));
			
			chart.draw(data, options);
		} //educationSpendingPerCapitaHandler2015
		
		//function that draws a line chart to see the change/ growth in education expenditure over time (2011-2015)
		function educationSpendingGrowthHandler(response) {
			var data = response.getDataTable();
			var options = {
						title: 'Education Expenditure Growth from 2011 to 2015',
						vAxis: {title: 'Education Expenditure in Billions ($)'},
						hAxis: {title: 'Year'}	
			};
			
			var chart = new google.visualization.LineChart(
						document.getElementById('education_Growth'));
			
			chart.draw(data, options);
		} //educationSpendingGrowthHandler
		
		//function that draws a line chart to show the change/ growth in education expenditure over time (2011-2015), USA excluded for ease of read for other countries
		function educationSpendingGrowthHandlerWithoutUS(response) {
			var data = response.getDataTable();
			var options = {
						title: 'Education Expenditure Growth from 2011 to 2015',
						vAxis: {title: 'Education Expenditure in Billions ($)'},
						hAxis: {title: 'Year'}	
			};
			
			var chart = new google.visualization.LineChart(
						document.getElementById('education_Growth_withoutUS'));
			
			chart.draw(data, options);
		} //educationSpendingGrowthHandler
		
		//function that draws a Geo chart to show the percentage growth (from 2011 to 2015) in education spending for all 10 countries
		function educationSpendingGrowthPercentHandler(response) {
			var data = response.getDataTable();
			var options = {
						title: 'Education Expenditure Growth (in Percentage) from 2011 to 2015',
						colorAxis: {colors: ['pink', 'purple']}
			};
			
			var chart = new google.visualization.GeoChart(
						document.getElementById('education_Growth_percent'));
			
			chart.draw(data, options);
		} //educationSpendingGrowthPercentHandler