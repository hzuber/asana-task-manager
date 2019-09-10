chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    const taskArr = document.getElementsByClassName("autogrowTextarea-input");
    const taskName = taskArr.length === 0 ? alert("Please click on the task you wish to add to your list.") : taskArr[0].innerHTML;
    const projectArr = document.getElementsByClassName        ("TaskProjectPill-projectName");
    const projectName = projectArr.length === 0 ? "" : projectArr[0].firstChild.innerHTML;
    const columnArr = document.getElementsByClassName("TaskProjectColumnInfo-dropdown");
    const columnName = columnArr.length === 0 ? "" : columnArr[0].firstChild.innerHTML;
    const taskUrl = window.location.toString();

    console.log("request is: " + request);

    if (request === 'add-task') {

      let currentTask = {task: taskName, project: projectName, column: columnName, url: taskUrl }

      function getListAndAddNew(currentTask) {      
        chrome.storage.sync.get("taskList", function(tasks){
          updateList(tasks.taskList);
        });

        function updateList(taskList) {
          taskList.push(currentTask);
          chrome.storage.sync.set({"taskList" : taskList});
          console.log(taskList)
        }
      }

      getListAndAddNew(currentTask);
    }

    if (request === 'delete-task') {
      
      let currentTask = {task: taskName, project: projectName, column: columnName, url: taskUrl }

      function getListAndRemoveThis(currentTask) {      
        chrome.storage.sync.get("taskList", function(tasks){
          updateShorterList(tasks.taskList);
        });

        function updateShorterList(taskList) {
          var afterDelete = taskList.filter(list => {
            return list.url != currentTask.url});
          chrome.storage.sync.set({"taskList" : afterDelete});
          console.log(afterDelete)
        }
      }

      getListAndRemoveThis(currentTask);
      /*taskList = JSON.parse(localStorage.getItem("taskList") || "[]");
      var afterDelete = taskList.filter(list => {
        return list.task != taskName
      })

      console.log('after delete' + afterDelete);
      localStorage.setItem("taskList", JSON.stringify(afterDelete))*/
    }

    sendResponse(taskName) ;
  });