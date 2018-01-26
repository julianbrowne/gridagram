
$(function() { 

	var sourceCodeContainer = $("<code></code>");
	sourceCodeContainer.append($("<pre></pre>"));
	$("#source-container").html(sourceCodeContainer);

	$("#source-container code pre").html($('#example-code').html());

	var sourceCodeViewerHeader = $("<div></div>")
	    .html("Source Code")
	    .attr("id", "source-code-header");

	$("#source-container").prepend(sourceCodeViewerHeader)

	$("#source-code-header").on('click', function() { 
	    $(this).siblings("code").toggleClass('show');
	});
	
});