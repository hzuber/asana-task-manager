chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      const taskArr = document.getElementsByClassName("autogrowTextarea-input");
      const taskName = taskArr.length === 0 ? alert("Please click on the task you wish to add to your list.") 
                        : taskArr[0].innerHTML;
      const projectArr = document.getElementsByClassName("TaskProjectPill-projectName");
      const projectName = projectArr.length === 0 ? "" : projectArr[0].firstChild.innerHTML;
      const columnArr = document.getElementsByClassName("TaskProjectColumnInfo-dropdown");
      const columnName = projectArr.length === 0 ? "" : columnArr[0].firstChild.innerHTML;
      const taskUrl = window.location.toString();
      
      console.log(request);

      if (request === 'add-task'){
        taskList = JSON.parse(localStorage.getItem("taskList") || "[]");
        taskList.push({task:taskName, project:projectName, column: columnName, url: taskUrl});
        
        localStorage.setItem("taskList", JSON.stringify(taskList))
        
        var myvar = localStorage.taskList;
        console.log('from local storage' + myvar);
      
      }

      else if (request === 'delete-task'){
        taskList = JSON.parse(localStorage.getItem("taskList") || "[]");
        var afterDelete = taskList.filter(list => {
                return list.task != taskName
                })
        
        console.log('after delete' + afterDelete);
        localStorage.setItem("taskList", JSON.stringify(afterDelete))
      }

      else if (request === 'view-list'){

      }
      sendResponse(taskName) ;
    });