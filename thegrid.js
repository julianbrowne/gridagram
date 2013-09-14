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
    this.selector = "grid-" + $(".thegrid").length;
    var grid = this;

    grid.root.addClass('thegrid');
    grid.root.addClass(grid.selector);

    this.Widget = function(title) { 

        this.index  = grid.widgets.length;
        this.id     = grid.selector + "-widget-" + this.index;
        this.width  = grid.widgetDefaults.width;
        this.height = grid.widgetDefaults.height;
        this.widget = null;
        this.lines = 0;
        this.autoStretch = false;

        this.postWidget = function() {
            var widgetHTML   = $("<div>", { 
                id: this.id, 
                class: "widget", 
                style: "width: " + this.width + "; " + "height: " + this.height + ";"
            });
            grid.root.append(widgetHTML);
            this.widget = $("#" + this.id);
        }

        this.addList = function() {
            var testListHTML = $("<ul>", {});
            this.widget.append(testListHTML);
            this.list = this.widget.find("ul");
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

        this.addTitle = function(titleText) { 
            var titleHTML = $("<div>", { class: "title" });
            var titleElement = this.widget.find(".title");
            if(titleElement.length === 0)
                this.widget.prepend(titleHTML);
            this.widget.find(".title").html(titleText);
        };

        this.css = function(attr, value) { 
            if(value === undefined) return this.widget.css(attr);
            this.widget.css(attr, value);
        };

        this.addClass = function(klass) { 
            this.widget.addClass(klass);
        };

        this.cssHeight = function(height) { 
            if(height !== undefined)
                this.widget.css("height", height + "px");
            return parseInt(this.widget.css("height"));
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
                    widget.cssHeight(height);
                }
            );            
        };

        this.stretchToFit = function() { 
            if(this.hasVerticalScrollBar()) { 
                var newHeight = this.widget[0].scrollHeight;
                this.cssHeight(newHeight);
            }
            if(grid.autoHeight) { 
                this.applyHeights(newHeight);
                grid.widgetDefaults.height = newHeight;
            }
        };

        this.hasVerticalScrollBar = function() { 
            return ((this.widget[0].clientHeight < this.widget[0].scrollHeight)); // || (this.widget[0].clientWidth < this.widget[0].scrollWidth));
        };

        this.empty = function() { 
            this.widget.empty();
        };

        grid.widgets.push(this);
        this.postWidget();
        if(title!==undefined) this.addTitle(title);
        this.addList();

    };

    this.empty = function() { 
        this.root.empty();
    };

};