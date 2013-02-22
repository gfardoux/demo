var linkFeed = 'http://www.astuceclub.com/gameclub/feed/rss/';

$(document).bind( 'pageinit', function() {
	console.log( 'YD pageInit' );
	load_rss();
});

function load_rss() {
	console.log( 'YD Load RSS' );
	$.support.cors = true;
	$.get( linkFeed , processXmlNews , "xml" );
}

function processXmlNews(xml) {
	var elLink 		= '';
	var elImg 		= 'img/default.png';
	var elContent	= '';
	var elTitle		= '';
	
	console.log( 'YD Process XML' );
	
	$(xml).find("item").each(function() {
		
		elLink = $(this).find("link").text();
		elContent = $(this).find("description").text();
		var theResult = elContent.match(/<img.*src="(.*)" class/);
		if(theResult){
			elImg = theResult[1];
		}
		elContent = elContent.replace(elContent.match(/<img[^>]+>/)[0],'');
		elTitle = $(this).find("title").text();
		
		/** take only the first **/
		return false;
	});
	elLink += '?utm_source=astuceclub.com&utm_medium=mobileapp&utm_campaign=gameclub&utm_content=home';
	
	$('#title_ph').html(elTitle);
	$('#image_ph').html('<a href="' + elLink + '"><img class="main" src="' + elImg + '"/></a>');
	$('#description_ph').html('<p>' + elContent + '</p>');
}