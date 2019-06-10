function save_options() {
    var uid = document.getElementById('uid').value;
    chrome.storage.sync.set({
      uid: uid,
    }, function() {
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
  }
  function restore_options() {
    chrome.storage.sync.get({
        uid: uid,
    }, function(items) {
      document.getElementById('uid').value = items.uid;
    });
  }
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);