window.onload = function() {
    this.getList();
    clearButton = document.getElementById("clear-btn");
    clearButton.addEventListener("click", clearList);
    copyButton = document.getElementById("copy-btn");
    copyButton.addEventListener("click", copyList);
}
function getList() {  
    console.log('get list')    
    chrome.storage.sync.get(null, function(taskList){
        const mainDiv = document.getElementById('jsId');
        Object.values(taskList).map(task => {
            var ul = document.createElement('ul');
            ul.setAttribute("class", "task");
            var name = document.createElement('li');
            name.setAttribute("class", "title");
            var project = document.createElement('li');
            project.setAttribute("class", "project");
            var status = document.createElement('li');
            status.setAttribute("class", "status");
            var url = document.createElement('li');
            var link = document.createElement('a');
            link.setAttribute("class", "url");
            link.setAttribute('href', `${task.url}`)
            name.appendChild(document.createTextNode(`Task: ${task.task}`));
            project.appendChild(document.createTextNode(`Project: ${task.project}`));
            status.appendChild(document.createTextNode(`Status: ${task.column}`));
            link.appendChild(document.createTextNode("Link"));
            url.appendChild(link);
            ul.appendChild(name);
            ul.appendChild(project);
            ul.appendChild(status);
            ul.appendChild(url);
            mainDiv.appendChild(ul);
        });
    })
}

function clearList(){
    chrome.storage.sync.clear(function() {
        var error = chrome.runtime.lastError;
        if (error) {
            alert(error);
        } else {
            console.log('List cleared')
            location.reload();
        }
    })
}

function copyList(){
    console.log('copyList clicked');
    var textArea = document.createElement("textarea");
    textArea.value = document.querySelector("#jsId").innerText;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
      alert('Fallback: Oops, unable to copy', err);
    }
  
    document.body.removeChild(textArea)
}