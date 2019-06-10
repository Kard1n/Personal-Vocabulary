document.addEventListener('DOMContentLoaded', function() {
let form = document.getElementById('form');
let myList = [];
let dummyList = [];
chrome.storage.sync.get(stored => {
    myList = stored.dummyList;
    var ol = document.querySelector("#wordList");
    myList.forEach(function(el){
        var li = document.createElement('li');
        li.innerHTML = "<a href='#'>"+el+"<span class='removeItem' id="+el+">X</span>"+"</a>";
        ol.appendChild(li);
    });
    if (myList.length > 0){
        document.getElementById("removeAllItems").style.visibility = "visible";
        document.getElementById("sendAllItems").style.visibility = "visible";
    } 
});

$("#wordList").on("click", "span.removeItem", function () {
    var item = $(this).attr('id');
    myList.splice(myList.indexOf(item),1);
    $(this).parent().remove();
    dummyList = myList
    chrome.storage.sync.set({ dummyList }, function() {
    });
    if(myList.length == 0){
        document.getElementById("removeAllItems").style.visibility = "hidden";
        document.getElementById("sendAllItems").style.visibility = "hidden";
    } 
});

$("#removeAllItems").on("click", function(){
    dummyList = myList.length = [];
    document.getElementById("wordList").innerHTML = "";
    document.getElementById("removeAllItems").style.visibility = "hidden";
    document.getElementById("sendAllItems").style.visibility = "hidden";
    chrome.storage.sync.set({ dummyList });
});

$("#sendAllItems").on("click", function(){
    chrome.storage.sync.get(stored => {
        var url = 'http://ip:port/translate?uid='+stored.uid;
        var dummyArray = myList;
        dummyArray.forEach(function(el){
            url += '&word=' + el;
        });
        $.ajax({
            type: "POST",
            url: url
        }).done(function(){
            alert("Words send");
        });
    });
});

$("#go-to-options").on("click", function() {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL('options.html'));
    }
});
}, false);

