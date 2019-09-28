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
      div.setAttribute("class", "popupConfirm");
      const p = document.createElement('p')
      const span = document.createElement('span');
      span.setAttribute("class", "popupConfirmSpan");
      p.appendChild(document.createTextNode(`${res}`));
      span.appendChild(document.createTextNode(" has been added to your task list"));
      p.appendChild(span);
      div.appendChild(p);
      document.body.appendChild(div);
    }

  document.getElementById('delete-task').addEventListener('click',
    onClickDelete, false)
    function onClickDelete() {
      chrome.tabs.query({currentWindow: true, active: true},
        function(tabs){
          chrome.tabs.sendMessage(tabs[0].id, 'delete-task', deleteTask)
        })
    }

    function deleteTask(res) {
      const div = document.createElement('div');
      div.setAttribute("class", "popupConfirm")
      const p = document.createElement('p')
      const span = document.createElement('span');
      span.setAttribute("class", "popupConfirmSpan");
      p.appendChild(document.createTextNode(`${res}`));
      span.appendChild(document.createTextNode(" has been deleted from your task list"));
      p.appendChild(span);
      div.appendChild(p);
      document.body.appendChild(div);
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