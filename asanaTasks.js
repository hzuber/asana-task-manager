chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    const taskArr = document.getElementsByClassName("autogrowTextarea-input");
    const taskName = taskArr.length === 0 ? alert("Please click on the task you wish to add to or delete from your list.") : taskArr[0].innerHTML;
    const projectArr = document.getElementsByClassName("TaskProjectPill-projectName");
    console.log(projectArr);
    const projectName = projectArr.length === 0 ? "N/A" : 
                        projectArr.length === 1 ? projectArr[0].firstChild.innerHTML : 
                        projectArr[0].innerHTML === projectArr[1].innerHTML ? projectArr[0].firstChild.innerHTML : 
                        (`${projectArr[0].firstChild.innerHTML} / ${projectArr[1].firstChild.innerHTML}` );
                        console.log(projectName);
    const columnArr = document.querySelectorAll(".TaskProjectSectionInfo-sectionDropdown, .TaskProjectColumnInfo-dropdown");
    const columnName = columnArr.length === 0 ? "N/A" : 
                        columnArr.length === 1 ? columnArr[0].firstChild.innerHTML : 
                        columnArr[0].innerHTML === columnArr[1].innerHTML ? columnArr[0].firstChild.innerHTML : 
                        (`${columnArr[0].firstChild.innerHTML} / ${columnArr[1].firstChild.innerHTML}` );
    const taskUrl = window.location.toString();
    const key = taskUrl.replace('https://app.asana.com/', '')

    console.log("request is: " + request);

    if (request === 'add-task') {
      
      let currentTask = {task: taskName, project: projectName, column: columnName, url: taskUrl }
      
      getListAndAddNew(currentTask);

      function getListAndAddNew(currentTask) {
          chrome.storage.sync.set({[key] : currentTask}, function() {
            console.log('Saved ', currentTask)
          });
        }
    }

    if (request === 'delete-task') {

      getListAndRemoveThis(key)

      function getListAndRemoveThis(key) {      
        chrome.storage.sync.remove(key, function(){
          var error = chrome.runtime.lastError;
          if (error) {
              alert(error);
          }
        });
      }
    }

    sendResponse(taskName) ;
  });