;(function(win) {
    
    /**
     * The constructed function
     * @param {string} id The identity of the visualization
     */
    function Visualization(id, svg) {
        this.id = id;
        this.svg = svg;
        this.circles = {};
        this.circlesAnalysis = {};
    }

    /**
    * Draw a circle according to the given position and the hit count.
    * @param  {string} id    The identity of the circle
    * @param  {object} pos   The position of the circle in the page
    * @param  {number} count The size of the circle
    * @param  {object} ele   The corresponding hit analysis element
    */
    Visualization.prototype._drawCircle = function(id, pos, count, ele) {
        var _this = this;

        _this.circles[id] = _this.svg
            .append('circle')
            .attr('cx', pos.x)
            .attr('cy', pos.y)
            .attr('r', count)
            .style({
                'fill': 'rgba(255, 10, 10, 0.8)',
                'cursor': 'pointer'
            })
            .on('click', function() {
                _this._hitElementAnalysisShow(ele);
            });
    };

    /**
    * Draw a line according to the given start position, the end position and the hit flow count.
    * @param  {object} sPos  The start position of the line in the page
    * @param  {object} ePos  The end position of the line in the page
    * @param  {number} count The thickness of the line
    */
    Visualization.prototype._drawLine = function(sPos, ePos, count) {
        var _this = this;
        
        _this.svg
            .append('line')
            .attr({
                'x1': sPos.x,
                'y1': sPos.y,
                'x2': ePos.x,
                'y2': ePos.y
            })
            .style({
                'stroke': 'rgba(255, 10, 10, 0.5)',
                'stroke-width': count
            });
    };

    /**
    * Draw all lines from a hit element to it's next.
    * @param  {object} links  The element hit link
    */
    Visualization.prototype._drawLines = function(links) {
        var _this = this;
        
        for(var i = 0, len = links.length; i < length; i ++) {
            _this._drawLine(links[i].fromTarget().position(), links[i].toTarget().position(), links[i].count);
        }
    };

    /**
     * The witness animation show.
     * @param  {object} summary The element hit link analysis summary
     */
    Visualization.prototype._animationShow = function(summary) {
        var _this = this;

        var animationCircle = _this.svg
            .append('circle')
            .attr('r', 10)
            .style('fill', 'orange');

        var i,
            length = summary.length;

        if(length > 0) {
            i = 0;
            repeat(summary[i].fromTarget, summary[i].toTarget, summary[i].averageDuration);
        }

        function repeat(fromTarget, toTarget, averageDuration) {
            animationCircle.attr({
                'cx': fromTarget.position().x,
                'cy': fromTarget.position().y
            })
            .transition()
            .ease('liner')
            .attr({
                'cx': toTarget.position().x,
                'cy': toTarget.position().y
            })
            .duration(averageDuration)
            .each('end', function() {
                i ++;
                if(i < length) {
                    repeat(summary[i].fromTarget, summary[i].toTarget, summary[i].averageDuration);
                }
            });
        }
    };

    /**
     * The hit element analysis show.
     */
    Visualization.prototype._hitElementAnalysisShow = function(ele) {
        console.log('show hit element analysis');
    };

    /**
    * Show the witness visualization. 
    * @param  {object} summary The element hit link analysis summary
    */
    Visualization.prototype.show = function(summary) {
        var _this = this;

        if(!_this.svg) {
           _this.svg = d3.select('body').append('svg').classed('witness-svg', true); 
        }

    	for(var i = 0, len = summary.length; i < len; i ++) {
            _this._drawCircle(summary[i].text(), summary[i].position(), summary[i].count());
            _this._drawLines(summary[i].next());
    	}

        _this._animationShow(summary);
    };

    win.Visualization = Visualization;
    Visualization.create = function (pool) {
        var obj = pool.prop("witness-visualization");
        if (!!obj) return;
        obj = new Visualization();
        pool.prop("witness-visualization", obj);
        pool.analyzerVisible.subscribe(function (newValue) {
            if (!newValue) {

                return;
            }

            var list = pool.all();

        });
    };
    // xxxx.ElementsHitPool.pushInit(Visualization.create);
})(window);

