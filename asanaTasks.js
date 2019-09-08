chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      const taskArr = document.getElementsByClassName("autogrowTextarea-input");
      console.log(taskArr);
      const task = taskArr[0].innerHTML;
      console.log(task);
      sendResponse({task: task})
    });