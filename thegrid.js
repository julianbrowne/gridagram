/**
 *  The Grid
**/

function Grid(targetElement) { 

    this.widgets = [];
    this.root = $(targetElement);
    this.autoHeight = false;
    this.widgetDefaults = {
        height: 100,
        width: 200
    };
    var grid = this;

    grid.root.addClass('thegrid');

    this.Widget = function(title) { 
        this.title = title;
        this.index = grid.widgets.length;
        this.id = "widget-" + this.index;
        this.width = grid.widgetDefaults.width;
        this.height = grid.widgetDefaults.height;
        var widgetHTML = $("<div>", { id: this.id, class: "widget", style: "width: " + this.width + "; " + "height: " + this.height + ";" });
        var titleHTML  = $("<div>", { class: "title" });
        grid.root.append(widgetHTML);
        this.widget = $("#" + this.id);
        this.widget.append(titleHTML);
        this.widget.children("div").html(this.title);
        var testListHTML = $("<ul>", {});
        this.widget.append(testListHTML);
        this.list = this.widget.children("ul");
        this.lines = 0;
        this.autoStretch = false;
        grid.widgets.push(this);

        this.css = function(attr, value) { 
            if(value === undefined) return this.widget.css(attr);
            this.widget.css(attr, value);
        };

        this.addClass = function(klass) {
            this.widget.addClass(klass);
        };

        this.height = function(height) { 
            if(height === undefined) return parseInt(this.css("height"));
            this.widget.css("height", height);
        };


        this.addLine = function(text, klass) { 
            var klass = (klass === undefined) ? "" : klass;
            var id = (this.lines++);
            var lineId = "line-item-" + this.index + "-" + id;
            var lineSelector = "#" + lineId;
            var listItem = $("<li>",   { id: lineId, class: "line " + klass });
            this.list.append(listItem);
            if(text !== undefined) $(lineSelector).append(text);
            if(this.autoStretch) this.stretchToFit();
            return $(lineSelector);
        };

        this.addKeyValue = function(key, value, keyAttrs, valueAttrs) { 
            var keyAttrs = (keyAttrs === undefined) ? {} : keyAttrs;
            var valueAttrs = (valueAttrs === undefined) ? {} : valueAttrs;
            this.widget.children("ul").addClass("leaders");
            var line = this.addLine();
            keyAttrs = $.extend({}, keyAttrs);
            keyAttrs.class = "key " + keyAttrs.class;
            var keySpan = $("<span>", keyAttrs).html(key);
            valueAttrs = $.extend({}, valueAttrs);
            valueAttrs.class = "value " + valueAttrs.class;
            var valSpan = $("<span>", valueAttrs).html(value);
            line.append(keySpan).append(valSpan);
            return line;
        };

        this.applyHeights = function(height) { 
            grid.widgets.forEach( 
                function(widget) { 
                    widget.height(height);
                }
            );            
        };

        this.stretchToFit = function() { 
            while(this.hasVerticalScrollBar() === true) { 
                var newHeight = this.height() + 5;
                this.height(newHeight);
            }
            if(grid.autoHeight) { 
                this.applyHeights(newHeight);
                grid.widgetDefaults.height = newHeight;
            }
        };

        this.hasVerticalScrollBar = function() { 
            return ((this.widget[0].clientHeight < this.widget[0].scrollHeight)); // || (this.widget[0].clientWidth < this.widget[0].scrollWidth));
        };

    };

    this.empty = function() { 
        this.root.empty();
    };

};
