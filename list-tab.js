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
        Object.values(taskList).map((task, index) => {
            var ul = document.createElement('ul');
            ul.setAttribute("class", "task");
            var name = document.createElement('li');
            name.setAttribute("class", "title-content");
            var number = document.createElement('span');
            name.appendChild(number);
            var nameSpan = document.createElement('span');
            name.appendChild(nameSpan);
            nameSpan.setAttribute("class", "title");
            var project = document.createElement('li');
            project.setAttribute("class", "project-span");
            var projectSpan = document.createElement('span');
            project.appendChild(projectSpan);
            projectSpan.setAttribute("class", "project");
            var status = document.createElement('li');
            status.setAttribute("class", "status-content");
            var statusSpan = document.createElement('span');
            status.appendChild(statusSpan);
            statusSpan.setAttribute("class", "status");
            var url = document.createElement('li');
            var link = document.createElement('a');
            link.setAttribute("class", "url");
            link.setAttribute('href', `${task.url}`)
            number.appendChild(document.createTextNode(`${index + 1}.`))
            nameSpan.appendChild(document.createTextNode(`  Task: `));
            name.appendChild(document.createTextNode(`${task.task}`));
            projectSpan.appendChild(document.createTextNode(`Project: `));
            project.appendChild(document.createTextNode(` ${task.project}`));
            statusSpan.appendChild(document.createTextNode(`Status: `));
            status.appendChild(document.createTextNode(`${task.column}`));
            link.appendChild(document.createTextNode(`${task.url}`));
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