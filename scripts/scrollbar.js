
function scrollbarInitialize(node){
	if(node == null){
		node = document.querySelectorAll('[data-scrollbar]');
		Array.prototype.forEach.call(node, scrollbarInitialize);
		return;
	}

	console.assert(node.hasAttribute('data-scrollbar'));

	var scrollbarId = node.getAttribute('data-scrollbar');
	var scrollbar = document.querySelector('#' + scrollbarId + '.scrollbar');
	var scrollbarThumb = scrollbar.querySelector('.scrollbar-thumb');

	var event = document.createEvent('Event');
	event.initEvent('scrollbar-initialize', false, false);
	node.dispatchEvent(event);

	var clientHeight = node.clientHeight, scrollHeight = node.scrollHeight;

	if(scrollHeight <= clientHeight){
		scrollbar.classList.add('hidden-scrollbar');
		return;
	}

	var style = getComputedStyle(scrollbar, null);
	var paddingTop = parseInt(style.paddingTop),
		paddingBottom = parseInt(style.paddingBottom);
	var padding = paddingTop + paddingBottom;
	var scrollbarHeight = scrollbar.clientHeight - padding;
	var thumbHeight = Math.floor(
		scrollbarHeight * clientHeight / scrollHeight);
	scrollbarThumb.style.height = thumbHeight + 'px';

	onScroll();

	if(node === document.body)
		document.addEventListener('scroll', onScroll, false);
	else
		node.addEventListener('scroll', onScroll, false);
	scrollbar.addEventListener('mousedown', onMouseDown, false);
	document.addEventListener('mousemove', onMouseMove, false);
	document.addEventListener('mouseup', onMouseUp, false);
	node.addEventListener('scrollbar-initialize', onInit, false);

	var scrolling = false, pos, scrollTop;


	function onScroll(){
		scrollbarThumb.style.top = paddingTop + Math.floor(node.scrollTop *
			(scrollbarHeight - thumbHeight) /
			(scrollHeight - clientHeight)) + 'px';
	}

	function onMouseDown(event){
		scrolling = true;
		pos = event.pageY;
		scrollTop = node.scrollTop;
	}

	function onMouseMove(event){
		if(scrolling){
			node.scrollTop = scrollTop + (event.pageY - pos) *
				(scrollbarHeight - thumbHeight) /
				(scrollHeight - clientHeight);
		}
	}

	function onMouseUp(){
		scrolling = false;
	}

	function onInit(){
		node.removeEventListener('scrollbar-initialize', onInit);
		document.removeEventListener('mouseup', onMouseUp);
		document.removeEventListener('mousemove', onMouseMove);
		scrollbar.removeEventListener('mousedown', onMouseDown);
		if(node === document.body)
			document.removeEventListener('scroll', onScroll);
		else
			node.removeEventListener('scroll', onScroll);
	}
}

