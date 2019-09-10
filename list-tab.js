console.log('js here')
function getList() {  
    console.log('get list')    
    chrome.storage.sync.get("taskList", function(tasks){
        miniUls(tasks.taskList);
    });

    function miniUls(taskList) {
        const mainDiv = document.getElementById('jsId');
        console.log(mainDiv);
        taskList.map((obj, i) => {
            var ul = document.createElement('ul');
            var name = document.createElement('li');
            var project = document.createElement('li');
            var status = document.createElement('li');
            var url = document.createElement('li')
            var link = document.createElement('a');
            link.setAttribute('href', `${obj.url}`)
            name.appendChild(document.createTextNode(`Task: ${obj.task}`));
            project.appendChild(document.createTextNode(`Project: ${obj.project}`));
            status.appendChild(document.createTextNode(`Status: ${obj.column}`));
            link.appendChild(document.createTextNode("Link"));
            url.appendChild(link);
            ul.appendChild(name);
            ul.appendChild(project);
            ul.appendChild(status);
            ul.appendChild(url);
            console.log(ul);
            mainDiv.appendChild(ul);
        }); 
    }
}

getList();

/*
const ulMaker = text => {
    const ul = document.createElement('ul')
    ul.textContent = text
    mainUl.appendChild
}

const miniUls = taskList.map(function(obj) {
    return `
            <li>Task: ${obj.name}</li>
            <li>Project: ${obj.project}</li>
            <li>Column: ${obj.column}</li>
            <li>${obj.url}</li>
            ` 
})

console.log(`<ul>${miniUls.join('\n\t')}</ul>`)

miniUls.forEach(ul => {
    ulMaker(ul)
})*/