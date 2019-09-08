document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('add-task').addEventListener('click',
    onClickAdd, false)
    function onClickAdd() {
      chrome.tabs.query({currentWindow: true, active: true},
        function(tabs){
          chrome.tabs.sendMessage(tabs[0].id, 'hi', setTask)
        })
    }

    function setTask(res) {
      const div = document.createElement('div')
      div.textContent = `${res.task} is the task`
      document.body.appendChild(div)
    }

  document.getElementById('delete-task').addEventListener('click',
    onClickDelete, false)
    function onClickDelete() {
      chrome.tabs.query({currentWindow: true, active: true},
        function(tabs){
          chrome.tabs.sendMessage(tabs[0].id, 'yo')
        })
    }


  document.getElementById('view-list').addEventListener('click',
    onClickView, false)
    function onClickView() {
      chrome.tabs.query({currentWindow: true, active: true},
        function(tabs){
          chrome.tabs.sendMessage(tabs[0].id, 'wyd')
        })
    }
}, false)