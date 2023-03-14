var hammertime = new Hammer(myElement, myOptions);
hammertime.on('pan', function(ev) {
	console.log(ev);
});

hammertime.get('pinch').set({ enable: true });
