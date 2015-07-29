
# Gridagram

Dynamic grid layout for on screen data, like a poor man's [gridster](http://gridster.net/) or an even poorer man's [dashing](http://dashing.io/).

# Installation

Download jQuery, or get it from the ``vendor`` directory.  
Copy the contents of the ``lib`` directory
Include all files in your HTML

Check out the examples for more detail

# Use

Gridagram requires only jQuery, a target element to put the output into, and an array of data
elements to work on:

    <div id="somediv"></div>

    var data = [ some elements ];

    var grid = $("#somediv").girdagram(data);
