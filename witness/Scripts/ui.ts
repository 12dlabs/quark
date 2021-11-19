/*  --------------------
 *  UI - Witness - Alibaba
 *
 *  File  ui.ts
 *  Description  UI library.
 *  Owner  Winni Ma <xueqin.mxq@alibaba-inc.com>
 *  --------------------  */

import qCore = AliHub.Common;
import qEle = AliHub.Elements;
import qDiag = AliHub.Diagnostics;

export function showButton(value?: boolean) {
    var className = "witness-analysis-button";
    qEle.changeStyleRef(document.body, value ? [className] : null, value ? [] : [className]);
}

export class Visualization {
    public id: string;
    public isShow: boolean;
    private witnessSvg: d3.Selection<any>;
    private witnessLayer: d3.Selection<any>;
    private witnessAnalysisLayer: d3.Selection<any>;
    private witnessShowBtn: d3.Selection<any>;
    public miniR: number;
    public maxiR: number;
    private _miniR = 10;
    private _maxiR = 50;
    public miniT: number;
    public maxiT: number;
    private _miniT = 0.05;
    private _maxiT = 0.15;

    /**
     * The constructed function
     */
    public constructor() {
        this.id = qCore.Maths.randomString('witness-visualization-show');
        this.isShow = false;
    }
    
    /**
     * Map radius in a controlled range
     */
    private _getR(r) {
        return (r - this.miniR) * 1.0 / (this.maxiR - this.miniR) * (this._maxiR - this._miniR) + this._miniR;
    }

    /**
    * Draw a circle.
    * @param  {object} ele   The hit analysis element
    * @param  {object} group The svg group for all circles
    */
    private _drawCircle(ele, group) {
        var count = ele.count();
        if(count === 0 || !ele.element()) return;
        count = this._getR(ele.count());

        var mr = this._miniR;

        var pos = ele.position();
        var size = ele.size();
        if (!!size) {
            pos.x += size.x / 2;
            pos.y += size.y / 2;
        }
        
        var text = ele.text();
        
        var g = group.append('g');

        //render circle
        var s = count < 21 ? 3 : (count < 41 ? 4 : 5);
        var step = count / s;
        var opacity = 0.3;
        for(var i = s; i >= 1; i --) {
            var r = step * i;
            if(r > count)  r = count;

            g.append('circle')
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

        g.append('circle')
                .attr('cx', pos.x)
                .attr('cy', pos.y)
                .attr('r', mr)
                .classed('summary-circle', true)
                .style({
                    'fill': 'rgba(255,0,0,1)',
                    'stroke': 'rgba(255,255,255,0.6)',
                    'stroke-width': 1
                });


        //animation effect
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


        //render text
        g.append('text')
            .attr({
                'dx': pos.x,
                'dy': pos.y + 5
            })
            .text(text)
            .style({
                'fill': '#333',
                'font-size': '14px',
                'text-anchor': 'middle'
            });


        //bind event
        g.style({
                'cursor': 'pointer'
            })
            .on('click', ev => {
                this._hitElementAnalysisShow(ele);
            });
    }

    /**
     * Map duration in a controlled range
     */
    private _getT(t) {
        if(this.maxiT === 0) {
            return (this._maxiT + this._miniT) / 2;
        }else {
            return (t - this.miniT) * 1.0 / (this.maxiT - this.miniT) * (this._maxiT - this._miniT) + this._miniT;
        }
    }

    /**
    * Draw a line.
    * @param  {object} elementHitLink   The element hit link
    * @param  {object} group            The svg group for all lines
    */
    private _drawLine(elementHitLink, group) {
        var sCount = elementHitLink.fromTarget.count();
        var eCount = elementHitLink.toTarget.count();
        if(sCount === 0 || eCount === 0 || !elementHitLink.fromTarget.element() || !elementHitLink.toTarget.element()) return;

        var sPos = elementHitLink.fromTarget.position();
        var sSize = elementHitLink.fromTarget.size();
        if (!!sSize) {
            sPos.x += sSize.x / 2;
            sPos.y += sSize.y / 2;
        }

        var ePos = elementHitLink.toTarget.position();
        var eSize = elementHitLink.toTarget.size();
        if (!!eSize) {
            ePos.x += eSize.x / 2;
            ePos.y += eSize.y / 2;
        }

        var count = elementHitLink.count;
        var duration = elementHitLink.averageDuration;


        //render line
        var arc = d3.svg.arc();

        var q: qCore.PlaneCoordinate = { } as any;
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

        var g = group.append('g');

        var path = g
            .append('path')
            .attr('d', 'M' + sPos.x + ',' + sPos.y + '   Q' + q.x + ',' + q.y + ' ' + ePos.x + ',' + ePos.y)
            .attr({
                'stroke': 'rgba(255, 0, 0, 0.2)',
                'fill': 'none',
                'stroke-width': 4
            });
        
        var totalLength = (path.node() as SVGPathElement).getTotalLength();
        duration = totalLength / this._getT(duration);

        //animation effect
        var animation = () => {
            var marker = g.append('circle');
            marker.attr("transform", "translate(" + sPos.x + ',' + sPos.y + ")")
                .attr("r", 4)
                .style({
                    'fill': 'rgba(255, 0, 0, 0.8)'
                });

            transition();

            function transition() {
                marker.transition()
                    .duration(duration)
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

        animation();
    }

    /**
    * Draw all lines from a hit element.
    * @param  {object} next  Lists next clients
    * @param  {object} group The svg group for all lines
    */
    private _drawLines(next, group) {
        for(var i = 0, len = next.length; i < len; i ++) {
            var elementHitLink = next[i];
            this._drawLine(elementHitLink, group);
        }
    }

    private _make(targetEle, degree, next, size) {
        var object = {} as any;
        object.name = targetEle.text();
        object.size = size;
        
        if (degree == 0) {
            return object;
        } else {
            var links = [];
            var childrenObject = [];
            if (next) {
                links = targetEle.next();
            } else {
                links = targetEle.previous();
            }
            
            var totalSize = 0;
            links.forEach(link => {
                totalSize += link.count;
            });

            links.forEach(link => {
                var child;
                if (next) {
                    child = link.toTarget;
                } else {
                    child = link.fromTarget;
                }
                var childPercent = link.count / totalSize;
                var childObject = this._make(child, degree - 1, next, size * childPercent);
                childrenObject.push(childObject);
            });
            
            
            object.children = childrenObject;

            return object;
        }
    }

    /**
    * Parse relation between the given element and all other elements to a certain degree
    * @param  {object}  ele    The hit analysis element
    * @param  {number}  degree The degree of the hierarchy structure
    * @param  {boolean} next   The direction tag
    */
    private _parseRelation(targetEle, degree, next) {
        return this._make(targetEle, degree, next, 100.0);
    }

    /**
     * The hit element analysis show.
     */
    private _hitElementAnalysisShow(ele) {
        this.witnessAnalysisLayer = this.witnessLayer.append('div')
            .classed('witness-analysis-layer', true)
            .html('<div class="witness-analysis-layer-mask"></div><div class="sunburst-container"><div class="sunburst sunburst-in"><div class="main"><div class="sequence"></div><div class="chart"><div class="explanation" style="visibility: hidden;"><span class="percentage"></span><br/><span class="discription"></span></div></div></div><div class="sidebar"><div class="legend"></div></div></div><div class="sunburst sunburst-out"><div class="main"><div class="sequence"></div><div class="chart"><div class="explanation" style="visibility: hidden;"><span class="percentage"></span><br/><span class="discription"></span></div></div></div><div class="sidebar"><div class="legend"></div></div></div>');

        d3.select('#witness_container .witness-analysis-layer-mask').on('click', function() {
            d3.select('#witness_container .witness-analysis-layer').remove();
        });

        var degree = 3;
        var inRelation = this._parseRelation(ele, degree, false);
        var outRelation = this._parseRelation(ele, degree, true);

        var text = ele.text();

        var sunburstIn = new Sunburst({
                "container": ".sunburst-in",
                "json": inRelation,
                "colors": [
                    "#de783b",
                    "#7b615c",
                    "#5687d1",
                    "#6ab975",
                    "#a173d1",
                    "#bbbbbb"
                ],
                "description": "come to " + text
            });

            var sunburstOut = new Sunburst({
                "container": ".sunburst-out",
                "json": outRelation,
                "colors": [
                    "#de783b",
                    "#7b615c",
                    "#5687d1",
                    "#6ab975",
                    "#a173d1",
                    "#bbbbbb"
                ],
                "description": "leave from " + text
            });
    }

    private _changeMode(value) {
        var circlesGroup = d3.select('.witness-circles-group');
        if(value === '0') {
            circlesGroup.classed('mode-summary', false);
        }else if(value === '1') {
            circlesGroup.classed('mode-summary', true);
        }
    }

    public appendVisibleButton(obs) {
        this.witnessShowBtn = d3.select('body')
            .append('div')
            .attr('id', 'witness_show_btn')
            .html('Witness Show')
            .on('click', (ev) => {
                obs(!obs());
            })
    }

    /**
    * Show the witness visualization. 
    * @param  {object} summary The element hit link analysis summary
    */
    public toggle(isVisible, summary: qDiag.ElementHitAnalysisContract[]) {
        this.isShow = isVisible;
        if(!this.isShow) {
            this.witnessLayer && this.witnessLayer.remove();
            this.witnessShowBtn.html('Witness Show');
        }else {
            this.witnessLayer = d3.select('body').append('div')
                .attr('id', 'witness_container');

            this.witnessSvg = this.witnessLayer
                .append('svg')
                .style({
                    'width': '100%',
                    'height': '100%'
                });

            var operateArea = this.witnessLayer.append('div')
                .classed('operate-area', true)
                .html('<div class="time-range"><label>数据时间段：</label><select><option checked="true">当月</option></select></div><div class="mode"><label>展示模式：</label><select><option value="0" checked="true">精准</option><option value="1">粗略</option></select></div>');

            d3.select('.operate-area .mode select').on('change', () => {
                this._changeMode((d3.select('.operate-area .mode select').node() as any).value);
            });

            var circlesGroup = this.witnessSvg.append('g').classed('witness-circles-group', true);
            var linesGroup = this.witnessSvg.append('g').classed('witness-lines-group', true);

            for(var i = 0, len = summary.length; i < len; i ++) {
                this._drawLines(summary[i].next(), linesGroup);
                this._drawCircle(summary[i], circlesGroup);
            }

            this.witnessShowBtn.html('Close Witness');
        }
    }

    public static create = function (client) {
        var obj = client.prop("witness-visualization") as Visualization;
        if (!!obj) return;
        obj = new Visualization();
        client.prop("witness-visualization", obj);
        obj.appendVisibleButton(client.analyzerVisible);
        client.analyzerVisible.subscribe((newValue) => {
            if (newValue) {
                var list = client.all();
                obj.maxiR = client.maxiCount();
                obj.miniR = client.miniCount();
                obj.maxiT = client.maxiDuration();
                obj.miniT = client.miniDuration();
            }
            
            obj.toggle(newValue, list);
        });
    }
}

export class Sunburst {
    private config: any;
    private colors: any;
    private colorIndex: number;
    private colorObj: any;
    private description: string;
    private container: string;
    private width: number;
    private height: number;
    private radius: number;
    private totalSize: number;
    private vis: d3.Selection<any>;
    private partition: d3.layout.Partition<d3.layout.partition.Node>;
    private arc: d3.svg.Arc<d3.svg.arc.Arc>;

    public constructor(config) {
        this.config = config;
        this.colors = (this.config && this.config.colors) || {};
        this.colorIndex = 0;
        this.colorObj = {};
        this.description = (this.config && this.config.description) || '';
        this.container = this.config && this.config.container;
        this.init(this.config && this.config.json);
    }

    private _initializeBreadcrumbTrail() {
        var container = this.container;

        // Add the svg area.
        var trail = d3.select(container + " .sequence").append("svg:svg")
                      .attr("width", this.width)
                      .attr("height", 50)
                      .classed("trail", true);;
        // Add the label at the end, for the percentage.
        trail.append("svg:text")
             .attr("id", "endlabel")
             .classed("endlabel", true)
             .style("fill", "#000");
    }

    private _drawLegend() {
        var container = this.container;

        // Dimensions of legend item: width, height, spacing, radius of rounded rect.
        var li = {
            w: 75, h: 30, s: 3, r: 3
        };

        var legend = d3.select(container + " .legend").append("svg:svg")
            .attr("width", li.w)
            .attr("height", d3.keys(this.colorObj).length * (li.h + li.s));

        var g = legend.selectAll("g")
            .data<any>(d3.entries(this.colorObj))
            .enter().append("svg:g")
            .attr("transform", (d, i) => {
                return "translate(0," + i * (li.h + li.s) + ")";
            });

        g.append("svg:rect")
         .attr("rx", li.r)
         .attr("ry", li.r)
         .attr("width", li.w)
         .attr("height", li.h)
         .style("fill", (d) => { return d.value; });

        g.append("svg:text")
         .attr("x", li.w / 2)
         .attr("y", li.h / 2)
         .attr("dy", "0.35em")
         .attr("text-anchor", "middle")
         .text((d) => { return d.key; });
    }

    // Update the breadcrumb trail to show the current sequence and percentage.
    private _updateBreadcrumbs(nodeArray, percentageString) {
        var container = this.container;

        // Breadcrumb dimensions: width, height, spacing, width of tip/tail.
        var b = {
            w: 75, h: 30, s: 3, t: 10
        };

        // Data join; key function combines name and depth (= position in sequence).
        var g = d3.select(container + " .trail")
            .selectAll("g")
            .data<any>(nodeArray, (d) => { 
                return d.name + d.depth; 
            });

        // Add breadcrumb and label for entering nodes.
        var entering = g.enter().append("svg:g");

        entering.append("svg:polygon")
            .attr("points", (d, i) => {
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
            .style("fill", (d) => { return this.colorObj[d.name]; });

        entering.append("svg:text")
            .attr("x", (b.w + b.t) / 2)
            .attr("y", b.h / 2)
            .attr("dy", "0.35em")
            .attr("text-anchor", "middle")
            .text((d) => { 
                return d.name; 
            });

        // Set position for entering and updating nodes.
        g.attr("transform", (d, i) => {
            return "translate(" + i * (b.w + b.s) + ", 0)";
        });

        // Remove exiting nodes.
        g.exit().remove();

        // Now move and update the percentage at the end.
        d3.select(container + " .trail").select(".endlabel")
          .attr("x", (nodeArray.length + 0.5) * (b.w + b.s))
          .attr("y", b.h / 2)
          .attr("dy", "0.35em")
          .attr("text-anchor", "middle")
          .text(percentageString);

        // Make the breadcrumb trail visible, if it's hidden.
        d3.select(container + " .trail")
          .style("visibility", "");
    }

    // Fade all but the current sequence, and show it in the breadcrumb trail.
    private _mouseover(d) {
        var container = this.container;

        var percentage = (100 * d.value / this.totalSize).toPrecision(3);
        var percentageString = percentage + "%";
        if (parseFloat(percentage) < 0.1) {
            percentageString = "< 0.1%";
        }

        d3.select(container + " .percentage")
          .text(percentageString);

        d3.select(container + " .explanation")
          .style("visibility", "");

        d3.select(container + " .discription")
          .text(this.description);

        var sequenceArray = this._getAncestors(d);
        this._updateBreadcrumbs(sequenceArray, percentageString);

        // Fade all the segments.
        d3.selectAll("path")
          .style("opacity", 0.3);

        // Then highlight only those that are an ancestor of the current segment.
        this.vis.selectAll("path")
            .filter(function(node) {
                return (sequenceArray.indexOf(node) >= 0);
            })
            .style("opacity", 1);
    }

    // Restore everything to full opacity when moving off the visualization.
    private _mouseleave(d) {
        var container = this.container;
        var _this = this;

        // Hide the breadcrumb trail
        d3.select(container + " .trail")
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

        d3.select(container + " .explanation").style("visibility", "hidden");
    }

    // Given a node in a partition layout, return an array of all of its ancestor
    // nodes, highest first, but excluding the root.
    private _getAncestors(node) {
        var path = [];
        var current = node;
        while (current.parent) {
            path.unshift(current);
            current = current.parent;
        }
        return path;
    }

    // Main function to draw and set up the visualization.
    private _createVisualization(json) {
        var container = this.container;

        // Bounding circle underneath the sunburst, to make it easier to detect
        // when the mouse leaves the parent g.
        this.vis.append("svg:circle")
           .attr("r", this.radius)
           .style("opacity", 0);

        // For efficiency, filter nodes to keep only those large enough to see.
        var nodes = this.partition.nodes(json)
                    .filter((d) => {
                        return (d.dx > 0.005);
                    });

        var g = this.vis.data(d3.entries(json)).selectAll("g")
                .data<any>(nodes)
                .enter().append("svg:g")
                .attr("display", (d) => { return d.depth ? null : "none"; });

        var path = g.append("svg:path")
                    .attr("display", function(d) { 
                        return d.depth ? null : "none"; //hide the root circle
                    })
                    .attr("d", this.arc)
                    .attr("fill-rule", "evenodd")
                    .style("fill", (d) => {
                        if (d.name !== 'root') {
                            var color;
                            if(this.colorObj[d.name]) {
                                color = this.colorObj[d.name];
                            }else {
                                var index = this.colorIndex ++;
                                if(this.colorIndex === this.colors.length) {
                                    this.colorIndex = 0;
                                }
                                color = this.colors[index];
                                this.colorObj[d.name] = color;
                            }
                            return color; 
                        } 
                    })
                    .style("opacity", 1)
                    .on("mouseover", d => {
                        this._mouseover.call(this, d);
                    });

        // Add the mouseleave handler to the bounding circle.
        d3.select(container + " .container").on("mouseleave", (d) => {
            this._mouseleave.call(this, d);
        });

        // Get total size of the tree = value of root node from partition.
        this.totalSize = (path.node() as any).__data__.value;

        this._initializeBreadcrumbTrail();

        this._drawLegend();
    }

    private init(json) {
        if(!json) return;

        var container = this.container;

        // Dimensions of sunburst.
        this.width = 300;
        this.height = 300;
        this.radius = Math.min(this.width, this.height) / 2;

        // Total size of all segments; we set this later, after loading the data.
        this.totalSize = 0; 

        this.vis = d3.select(container + " .chart").append("svg:svg")
            .attr("width", this.width)
            .attr("height", this.height)
            .append("svg:g")
            .attr("id", "container")
            .attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")");

        this.partition = d3.layout.partition()
            .size([2 * Math.PI, this.radius * this.radius])
            .value(function(d: any) { 
                return d.size; 
            });

        this.arc = d3.svg.arc()
            .startAngle(function (d: any) { return d.x; })
            .endAngle(function (d: any) { return d.x + d.dx; })
            .innerRadius(function (d: any) { return Math.sqrt(d.y); })
            .outerRadius(function (d: any) { return Math.sqrt(d.y + d.dy); });

        this._createVisualization(json);
    }
}