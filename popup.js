document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('add-task').addEventListener('click',
    onClickAdd, false)
    function onClickAdd() {
      chrome.tabs.query({currentWindow: true, active: true},
        function(tabs){
          chrome.tabs.sendMessage(tabs[0].id, 'add-task', setTask)
        })
    }

    function setTask(res) {
      const div = document.createElement('div');
      
      div.textContent = `${res} is the task`
      document.body.appendChild(div);
    }

  document.getElementById('delete-task').addEventListener('click',
    onClickDelete, false)
    function onClickDelete() {
      chrome.tabs.query({currentWindow: true, active: true},
        function(tabs){
          chrome.tabs.sendMessage(tabs[0].id, 'delete-task')
        })
    }


  document.getElementById('view-list').addEventListener('click',
    onViewList, false)
    function onViewList() {
      chrome.tabs.create({url:"list-tab.html"},
        function(tabs){
          chrome.tabs.sendMessage(tabs[0].id, 'view-list')
      })
    }
}, false)