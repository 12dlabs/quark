;(function(win) {
    /**
     * The constructed function
     * @param {string} id The identity of the visualization
     */
    function Visualization(id, summary) {
        var _this = this;

        _this.id = id;
        _this.isShow = false;
        _this.witnessShowBtn = d3.select('body')
            .append('div')
            .attr('id', 'wintness-show-btn')
            .style({
                'position': 'fixed',
                'right': '10px',
                'bottom': '10px',
                'width': '120px',
                'height': '40px',
                'background-color': 'orange',
                'border': '1px solid orange',
                'border-radius': '6px',
                'z-index': 10000000,
                'text-align': 'center',
                'line-height': '40px',
                'color': '#FFF',
                'cursor': 'pointer'
            })
            .html('Witness Show')
            .on('click', function() {
                if(_this.isShow) {
                    _this.layer.remove();
                    _this.circles = {};
                    _this.isShow = false;
                    d3.select(this).html('Witness Show');
                }else {
                    _this._initContainer();
                    _this.show(summary);
                    _this.isShow = true;
                    d3.select(this).html('Close');
                }
            });

        _this.circles = {};
    }

    Visualization.prototype._initContainer = function() {
        this.layer = d3.select('body').append('div')
            .attr('id', 'witnessContainer')
            .style({
                'display': 'absolute',
                'top': 0,
                'right': 0,
                'bottom': 0,
                'left': 0,
                'width': '100%',
                'height': '100%',
                'z-index': 10000000
            });
        this.analysisLayer = this.layer.append('div')
            .classed('witness-analysis-layer', true)
            .style({
                'display': 'none',
                'position': 'fixed',
                'top': 0,
                'right': 0,
                'bottom': 0,
                'left': 0,
                'width': '100%',
                'height': '100%',
                'background-color': 'rgba(0, 0, 0, 0.6)'
            })
            .html('<div class="witness-analysis-layer-mask">X</div><div id="sunburst"><div id="main"><div id="sequence"></div><div id="chart"><div id="explanation" style="visibility: hidden;"><span id="percentage"></span><br/><span id="discription"></span></div></div></div><div id="sidebar"><div id="legend"></div></div></div>');

        d3.select('#witnessContainer .witness-analysis-layer-mask').on('click', function() {
            d3.select('#witnessContainer .witness-analysis-layer').remove();
        });
    };

    /**
    * Draw a circle according to the given position and the hit count.
    * @param  {string} id    The identity of the circle
    * @param  {object} pos   The position of the circle in the page
    * @param  {number} count The size of the circle
    * @param  {object} ele   The corresponding hit analysis element
    */
    Visualization.prototype._drawCircle = function(id, pos, count, ele) {
        var _this = this;

        var g = _this.svg.append('g');

        var s = 3;
        var step = count / s;
        var opacity = 0.3;

        for(var i = s; i >= 1; i --) {
            var r = step * i;
            if(r > count)  r = count;

            _this.circles[id] = g
                .append('circle')
                .attr('cx', pos.x)
                .attr('cy', pos.y)
                .attr('r', r)
                .style({
                    'fill': 'rgba(255,0,0,' + opacity.toString() + ')',
                    'stroke': 'rgba(255,255,255,0.6)',
                    'stroke-width': 1
                });
                opacity = 0.2;
        }

        g.append('text')
            .attr({
                'dx': pos.x,
                'dy': pos.y + 5
            })
            .text(id)
            .style({
                'fill': '#333',
                'font-size': '14px',
                'text-anchor': 'middle'
            });

        g.style({
                'cursor': 'pointer'
            })
            .on('click', function() {
                _this._hitElementAnalysisShow(ele);
            });

        var markerRadius = 1;
        var marker = g
                .append('circle')
                .attr('cx', pos.x)
                .attr('cy', pos.y)
                .attr('r', markerRadius)
                .style({
                    'fill': 'rgba(255,0,0,0.2)',
                    'stroke': 'none',
                });

        var round = 0;
        var animation = function() {
            var duration = 40;

            if(round % 2 === 0) {
                markerRadius ++;
                if(markerRadius > count) {
                    round ++;
                    markerRadius = count;
                }
            }else {
                duration = 20;
                markerRadius --;
                if(markerRadius < 1) {
                    round ++;
                    markerRadius = 1;
                } 
            }

            marker.transition()
                .duration(duration)
                .attr('r', markerRadius)
                .each('end', animation);
        };

        animation();
    };

    /**
    * Draw a line according to the given start position, the end position and the hit flow count.
    * @param  {object} sPos  The start position of the line in the page
    * @param  {object} ePos  The end position of the line in the page
    * @param  {number} count The thickness of the line
    */
    Visualization.prototype._drawLine = function(sPos, ePos, count, duration) {
        var _this = this;
        
        var arc = d3.svg.arc();

        var q = {};
        q.x = (sPos.x - ePos.x) * 3 / 4 + ePos.x;
        q.y = (ePos.y - sPos.y) * 3 / 4 + sPos.y;

        if(Math.abs(sPos.x - ePos.x) < 30) {
            q.y = (sPos.y + ePos.y) / 2;

            if(sPos.y > ePos.y) {
                q.x = sPos.x - 100;
            }
            
            if(sPos.y < ePos.y) {
                q.x = sPos.x + 100;
            }
        }

        if(Math.abs(sPos.y - ePos.y) < 30) {
            q.x = (sPos.x + ePos.x) / 2;

            if(sPos.x > ePos.x) {
                q.y = sPos.y + 100;
            }
            
            if(sPos.x < ePos.x) {
                q.y = sPos.y - 100;
            }
        }

        var path = _this.svg
            .append('path')
            .attr('d', 'M' + sPos.x + ',' + sPos.y + '   Q' + q.x + ',' + q.y + ' ' + ePos.x + ',' + ePos.y)
            .attr({
                'stroke': 'rgba(255, 0, 0, 0.2)',
                'fill': 'none',
                'stroke-width': 4
            });

        console.log(path.node().getTotalLength());

        path.animation = function() {
            var marker = _this.svg.append('circle');
            marker.attr("transform", "translate(" + sPos.x + ',' + sPos.y + ")")
                .attr("r", 4)
                .style({
                    'fill': 'rgba(255, 0, 0, 0.8)'
                });

            transition();

            function transition() {
                marker.transition()
                    .duration(duration / 8)
                    .attrTween("transform", translateAlong(path.node()))
                    .each("end", transition);
            }
          
            function translateAlong(path) {
                var l = path.getTotalLength();
                return function(i) {
                    return function(t) {
                        var p = path.getPointAtLength(t * l);
                        return "translate(" + p.x + "," + p.y + ")";
                    }
                }
            }
        };

        path.animation();
    };

    /**
     * The hit element analysis show.
     */
    Visualization.prototype._hitElementAnalysisShow = function(ele) {
        var _this = this;

        console.log('show hit element analysis');
        _this.analysisLayer.style('display', 'block');

        var sunburst0 = new Sunburst({
                    "dataType": "csv",
                    "dataPath": "../data/sequences.csv",
                    "colors": {
                        "home": "#de783b",
                        "product": "#7b615c",
                        "search": "#5687d1",
                        "account": "#6ab975",
                        "other": "#a173d1",
                        "end": "#bbbbbb"
                    },
                    "description": "of visits begin with this sequence of pages"
                });
    };

    /**
    * Show the witness visualization. 
    * @param  {object} summary The element hit link analysis summary
    */
    Visualization.prototype.show = function(summary) {
        var _this = this;

        _this.svg = _this.layer.append('svg').style({
            'width': '100%',
            'height': '100%'
        }); 

    	summary = summary || [];

    	for(var i = 0, len = summary.length; i < len; i ++) {
    		var fromTarget = summary[i].fromTarget;
            var toTarget = summary[i].toTarget;
            var count = summary[i].count;

            _this._drawLine(fromTarget.position(), toTarget.position(), count, summary[i].averageDuration);

            if(!_this.circles[fromTarget.target()]) {
                _this._drawCircle(fromTarget.target(), fromTarget.position(), fromTarget.count(), fromTarget);
            }
            
            if(!_this.circles[toTarget.target()]) {
                _this._drawCircle(toTarget.target(), toTarget.position(), toTarget.count(), toTarget);
            }
    	}
    };

    win.Visualization = Visualization;
})(window);

;(function(win) {
    
    function Sunburst(config) {
        this.config = config;
        this.dataType = (this.config && this.config.dataType) || 'csv';  
        this.dataPath = (this.config && this.config.dataPath) || './data/sequences.csv'; 
        this.colors = (this.config && this.config.colors) || {};
        if(d3.keys(this.colors).length < 1) {
            this.hue = d3.scale.category20();
            this.luminance = d3.scale.sqrt()
                .domain([0, 1e4])
                .clamp(true)
                .range([90, 20]);
        }
        this.description = (this.config && this.config.description) || 'of visits begin with this sequence of pages';

        this.init();
    }

    // Take a 2-column CSV and transform it into a hierarchical structure suitable
    // for a partition layout. The first column is a sequence of step names, from
    // root to leaf, separated by hyphens. The second column is a count of how 
    // often that sequence occurred.
    Sunburst.prototype._buildHierarchy = function(csv) {
        var root = {"name": "root", "children": []};
        for (var i = 0; i < csv.length; i++) {
            var sequence = csv[i][0];
            var size = +csv[i][1];
            if (isNaN(size)) { // e.g. if this is a header row
                continue;
            }
            var parts = sequence.split("-");
            var currentNode = root;
            for (var j = 0; j < parts.length; j++) {
                var children = currentNode["children"];
                var nodeName = parts[j];
                var childNode;
                if (j + 1 < parts.length) {
                    // Not yet at the end of the sequence; move down the tree.
                    var foundChild = false;
                    for (var k = 0; k < children.length; k++) {
                        if (children[k]["name"] == nodeName) {
                            childNode = children[k];
                            foundChild = true;
                            break;
                        }
                    }
                    // If we don't already have a child node for this branch, create it.
                    if (!foundChild) {
                        childNode = {"name": nodeName, "children": []};
                        children.push(childNode);
                    }
                    currentNode = childNode;
                } else {
                    // Reached the end of the sequence; create a leaf node.
                    childNode = {"name": nodeName, "size": size};
                    children.push(childNode);
                }
            }
        }
        return root;
    };

    Sunburst.prototype._fill = function(d) {
        var _this = this;

        var p = d;
        while (p.depth > 1) p = p.parent;
        var c = d3.lab(_this.hue(p.name));
        c.l = _this.luminance(d.size);
        return c;
    };

    Sunburst.prototype._initializeBreadcrumbTrail = function() {
        var _this = this;

        // Add the svg area.
        var trail = d3.select("#sequence").append("svg:svg")
                      .attr("width", _this.width)
                      .attr("height", 50)
                      .attr("id", "trail");
        // Add the label at the end, for the percentage.
        trail.append("svg:text")
             .attr("id", "endlabel")
             .style("fill", "#000");
    };

    Sunburst.prototype._drawLegend = function() {
        var _this = this;

        // Dimensions of legend item: width, height, spacing, radius of rounded rect.
        var li = {
            w: 75, h: 30, s: 3, r: 3
        };

        var legend = d3.select("#legend").append("svg:svg")
            .attr("width", li.w)
            .attr("height", d3.keys(_this.colors).length * (li.h + li.s));

        var g = legend.selectAll("g")
            .data(d3.entries(_this.colors))
            .enter().append("svg:g")
            .attr("transform", function(d, i) {
                return "translate(0," + i * (li.h + li.s) + ")";
            });

        g.append("svg:rect")
         .attr("rx", li.r)
         .attr("ry", li.r)
         .attr("width", li.w)
         .attr("height", li.h)
         .style("fill", function(d) { return d.value; });

        g.append("svg:text")
         .attr("x", li.w / 2)
         .attr("y", li.h / 2)
         .attr("dy", "0.35em")
         .attr("text-anchor", "middle")
         .text(function(d) { return d.key; });
    };

    // Update the breadcrumb trail to show the current sequence and percentage.
    Sunburst.prototype._updateBreadcrumbs = function(nodeArray, percentageString) {
        var _this = this;

        // Breadcrumb dimensions: width, height, spacing, width of tip/tail.
        var b = {
            w: 75, h: 30, s: 3, t: 10
        };

        // Data join; key function combines name and depth (= position in sequence).
        var g = d3.select("#trail")
            .selectAll("g")
            .data(nodeArray, function(d) { 
                return d.name + d.depth; 
            });

        // Add breadcrumb and label for entering nodes.
        var entering = g.enter().append("svg:g");

        entering.append("svg:polygon")
            .attr("points", function(d, i) {
                var points = [];
                points.push("0,0");
                points.push(b.w + ",0");
                points.push(b.w + b.t + "," + (b.h / 2));
                points.push(b.w + "," + b.h);
                points.push("0," + b.h);
                if (i > 0) { // Leftmost breadcrumb; don't include 6th vertex.
                    points.push(b.t + "," + (b.h / 2));
                }
                return points.join(" ");
            })
            .style("fill", function(d) { return _this.colors[d.name]; });

        entering.append("svg:text")
            .attr("x", (b.w + b.t) / 2)
            .attr("y", b.h / 2)
            .attr("dy", "0.35em")
            .attr("text-anchor", "middle")
            .text(function(d) { 
                return d.name; 
            });

        // Set position for entering and updating nodes.
        g.attr("transform", function(d, i) {
            return "translate(" + i * (b.w + b.s) + ", 0)";
        });

        // Remove exiting nodes.
        g.exit().remove();

        // Now move and update the percentage at the end.
        d3.select("#trail").select("#endlabel")
          .attr("x", (nodeArray.length + 0.5) * (b.w + b.s))
          .attr("y", b.h / 2)
          .attr("dy", "0.35em")
          .attr("text-anchor", "middle")
          .text(percentageString);

        // Make the breadcrumb trail visible, if it's hidden.
        d3.select("#trail")
          .style("visibility", "");
    };

    // Fade all but the current sequence, and show it in the breadcrumb trail.
    Sunburst.prototype._mouseover = function(d) {
        var _this = this;

        var percentage = (100 * d.value / _this.totalSize).toPrecision(3);
        var percentageString = percentage + "%";
        if (percentage < 0.1) {
            percentageString = "< 0.1%";
        }

        d3.select("#percentage")
          .text(percentageString);

        d3.select("#explanation")
          .style("visibility", "");

        d3.select("#discription")
          .text(_this.description);

        var sequenceArray = _this._getAncestors(d);
        _this._updateBreadcrumbs(sequenceArray, percentageString);

        // Fade all the segments.
        d3.selectAll("path")
          .style("opacity", 0.3);

        // Then highlight only those that are an ancestor of the current segment.
        _this.vis.selectAll("path")
            .filter(function(node) {
                return (sequenceArray.indexOf(node) >= 0);
            })
            .style("opacity", 1);
    };

    // Restore everything to full opacity when moving off the visualization.
    Sunburst.prototype._mouseleave = function(d) {
        var _this = this;

        // Hide the breadcrumb trail
        d3.select("#trail")
          .style("visibility", "hidden");

        // Deactivate all segments during transition.
        d3.selectAll("path").on("mouseover", null);

        // Transition each segment to full opacity and then reactivate it.
        d3.selectAll("path")
        .transition()
        .duration(1000)
        .style("opacity", 1)
        .each("end", function() {
            d3.select(this).on("mouseover", function(d) {
                _this._mouseover.call(_this, d);
            });
        });

        d3.select("#explanation").style("visibility", "hidden");
    };

    // Given a node in a partition layout, return an array of all of its ancestor
    // nodes, highest first, but excluding the root.
    Sunburst.prototype._getAncestors = function(node) {
        var path = [];
        var current = node;
        while (current.parent) {
            path.unshift(current);
            current = current.parent;
        }
        return path;
    };

    // Main function to draw and set up the visualization.
    Sunburst.prototype._createVisualization = function(json) {
        var _this = this;

        // Bounding circle underneath the sunburst, to make it easier to detect
        // when the mouse leaves the parent g.
        _this.vis.append("svg:circle")
           .attr("r", _this.radius)
           .style("opacity", 0);

        // For efficiency, filter nodes to keep only those large enough to see.
        var nodes = _this.partition.nodes(json)
                    .filter(function(d) {
                        return (d.dx > 0.005);
                    });

        var g = _this.vis.data(d3.entries(json)).selectAll("g")
                .data(nodes)
                .enter().append("svg:g")
                .attr("display", function(d) { return d.depth ? null : "none"; });

        var path = g.append("svg:path")
                    .attr("display", function(d) { 
                        return d.depth ? null : "none"; //hide the root circle
                    })
                    .attr("d", _this.arc)
                    .attr("fill-rule", "evenodd")
                    .style("fill", function(d) {
                        if(d.name !== 'root') {
                            var c =  _this.colors[d.name];
                            if(!c){
                                c = _this._fill(d);
                                _this.colors[d.name] = c;
                            }
                            return _this.colors[d.name]; 
                        } 
                    })
                    .style("opacity", 1)
                    .on("mouseover", function(d) {
                        _this._mouseover.call(_this, d);
                    });

        if(d3.keys(_this.colors).length >= 10) {
            g.append("svg:text")
                .attr("transform", function(d) { 
                    return "rotate(" + (d.x + d.dx / 2 - Math.PI / 2) / Math.PI * 180 + ")"; 
                })
                .attr("x", function(d) { 
                    return Math.sqrt(d.y); 
                })
                .attr("dx", "6") // margin
                .attr("dy", ".35em") // vertical-align
                .text(function(d) { 
                    return (d.dx > 0.05) ? d.name : ''; 
                });
        }

        // Add the mouseleave handler to the bounding circle.
        d3.select("#container").on("mouseleave", function(d) {
            _this._mouseleave.call(_this, d);
        });

        // Get total size of the tree = value of root node from partition.
        _this.totalSize = path.node().__data__.value;

        _this._initializeBreadcrumbTrail();

        if(d3.keys(_this.colors).length < 10) {
            _this._drawLegend();
        }  
    };

    Sunburst.prototype.init = function() {
        var _this = this;

        // Dimensions of sunburst.
        _this.width = 750;
        _this.height = 600;
        _this.radius = Math.min(_this.width, _this.height) / 2;

        // Total size of all segments; we set this later, after loading the data.
        _this.totalSize = 0; 

        _this.vis = d3.select("#chart").append("svg:svg")
            .attr("width", _this.width)
            .attr("height", _this.height)
            .append("svg:g")
            .attr("id", "container")
            .attr("transform", "translate(" + _this.width / 2 + "," + _this.height / 2 + ")");

        _this.partition = d3.layout.partition()
            .size([2 * Math.PI, _this.radius * _this.radius])
            .value(function(d) { 
                return d.size; 
            });

        _this.arc = d3.svg.arc()
            .startAngle(function(d) { return d.x; })
            .endAngle(function(d) { return d.x + d.dx; })
            .innerRadius(function(d) { return Math.sqrt(d.y); })
            .outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });

        if(_this.dataType === 'csv') {
            // Use d3.text and d3.csv.parseRows so that we do not need to have a header
            // row, and can receive the csv as an array of arrays.
            d3.text(_this.dataPath, function(text) {
                var csv = d3.csv.parseRows(text);
                var json = _this._buildHierarchy(csv);
                _this._createVisualization(json);
            });
        }else if(_this.dataType === 'json') {
            d3.json(_this.dataPath, function(json) {
                _this._createVisualization(json);
            });
        }else {
            console.error('sorry for not supporting this type of datas!');
        }   
    };

    win.Sunburst = Sunburst;
})(window);