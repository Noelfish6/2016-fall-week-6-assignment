console.log('6.1');


var m = {t:50,r:50,b:50,l:50};
var outerWidth = document.getElementById('canvas').clientWidth,
    outerHeight = document.getElementById('canvas').clientHeight;
var w = outerWidth - m.l - m.r,
    h = outerHeight - m.t - m.b;



var plot = d3.select('.canvas')
    .append('svg')
    .attr('width',outerWidth)
    .attr('height',outerHeight)
    .append('g')
    .attr('transform','translate(' + m.l + ',' + m.t + ')');



d3.csv('../data/olympic_medal_count.csv', parse, function(error, rows) {
	// console.table(rows);



	rows.sort(function(b,a){
  		return a.y2012 - b.y2012;
	});
	//降序

	var top5 = rows.slice(0,5);
	console.log(top5);



	var minVal = d3.min(rows, function(d){ return d.y2012; }),
		maxVal = d3.max(rows, function(d){ return d.y2012; });



	var scaleY = d3.scaleLinear()
		.domain([minVal, maxVal])
		.range([h,0]);

		
	var scaleX = d3.scaleOrdinal()
		.domain(top5.map(function (d) { return d.country;}))
		.range(d3.range(0, w, w/top5.length));
		// console.log(scaleX("China"));



	var bar = plot.selectAll('rect')
		.data(top5)
		.enter()
		.append('rect')
		.attr('width', 30)
		.attr('height', function(d,i){ return h - scaleY(d.y2012); })
		.attr('x', function(d,i){ return scaleX(d.country); })
		.attr('y', function(d) { return scaleY(d.y2012); })
		.style('fill-opacity', 0.75)
		.attr('transform','translate(50,0)');



	var axisX = d3.axisBottom()
	        .scale(scaleX)
	        .tickSize(0);

    var axisY = d3.axisLeft()
        .scale(scaleY)
        .tickPadding(10)
        .tickSize(-w);

    plot.append('g').attr('class','axis axis-x')
        .attr('transform','translate(65,'+h+')')
        .call(axisX);

    plot.append('g').attr('class','axis axis-y').call(axisY);


}); 



function parse(d) {
	return {
		country: d.Country,
		y1900: +d['1900'],
		y1960: +d['1960'],
		y2012: +d['2012']
	};
}