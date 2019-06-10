let selectedUserWord = [];
let dummyList = [];
document.onclick = function(){
	let selectedWord = window.getSelection().toString();

	if(selectedWord.length != 0){
		var tempString = selectedWord;
		tempString = tempString.replace(/\,+|\.+|\-+|\–+|\d+/g, '');
		var selectionList = tempString.split(/\s/g);
		selectionList.forEach(function(element){
			if(element.length != 0) selectedUserWord.push(element.replace(/\s|\,+/g,''));
		});
		dummyList = selectedUserWord;
		chrome.storage.sync.set({ dummyList });
	}
}
chrome.storage.onChanged.addListener(function(changes, namespace){
	chrome.storage.sync.get(stored => {
		dummyList = stored.dummyList;
		selectedUserWord = dummyList;
	});
});