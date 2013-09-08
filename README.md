thegrid
=======

Manages dynamic grid layout of on screen data like a poor man's gridster

    <script src="thegrid.js"></script>
    <link rel="stylesheet" href="thegrid.css" />

    ...

    var grid = new Grid("#results");                    // target element
    grid.autoHeight = true;                             // align heights of all widget elements

    grid.empty();                                       // clears target element

    var w1 = new grid.Widget("widget 1");               // make a new widget

    var w2 = new grid.Widget("widget 2");
    w2.autoStretch = true;                              // grow this widget height with its content (no scroll)

    for(var i=0; i<10; i++) { 
        w1.addKeyValue("key","value" + i);              // add lines of the form "key .... value" with leader dots
    }

    for(var i=0; i<25; i++) { 
        w2.addKeyValue("somekey","somevalue-" + i);
    }
    w2.addKeyValue("login","pass", {}, { class: "pass" });

    var w3 = new grid.Widget("widget 3");

    w3.addKeyValue("a key","a value");
    w3.addKeyValue("left","right");

    w1.addLine("something");                            // add regular lines of text
    w2.addLine("something");
    w3.addLine("something");

    var w4 = new grid.Widget("widget 4");
