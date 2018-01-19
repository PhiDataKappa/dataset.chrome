console.log('popup.js loaded!');

let links = [];

// modify url so file name visible in popup window
function splitPath(path) {
  var dirPart, filePart;
  path.replace(/^(.*\/)?([^/]*)$/, function(_, dir, file) {
    dirPart = dir; filePart = file;
  });
  return filePart;
}

function makeTable(links) {
  let table ='<table id="linkTable">'
  for (let i = 0; i < links.length; i++) {
      table += `<tr><td><input type="submit" class="button importButton" value="add to repo" link=${links[i]}></td><td><ul>${splitPath(links[i])}</ul></td>
      <td><img src="./images/csv_icon_popup.png" style="float:left;width:24px;height:24px;" ></td>
      </tr>`
  }
  table += '</table>'

  return table
}

function onUpload(apiLink){
  chrome.runtime.sendMessage({action:'sendToDataWorld', payload: apiLink })
}


// To send message to background.js:
// chrome.runtime.sendMessage({action:'messageFromContentJS', payload:'messageFromPopupJS'})

// To Listen for message from background.js:
chrome.runtime.onMessage.addListener((request) => {
  if (request.action === 'messageFromContentJS' ){
    console.log('message recieved from contentjs!');
    console.log('payload: ', request.payload);
    links = request.payload;
    // request.payload.forEach((link) => alert(link))
    const table = makeTable(links);
    console.log('links: ', links);
    console.log('table: ', table);
    $('#linkTable').append(table);
    $('.importButton').on('click', function(e) {
      console.log('event fired!');
      console.log('this: ', this);
      console.log('target: ', e.target);
      console.log('link? : ', e.target.getAttribute('link'));
      const self = this;
      // console.log('payloadsenttobackground: ', self.link);
      onUpload(e.target.getAttribute('link'));
    });
  }
});








//
// // To send message to background.js:
// chrome.runtime.sendMessage({
//   action:'messageFromPopupJS',
//   payload:links
// })
//
//
//
//
// // To listen to messages from background.js or content.js:
// chrome.runtime.onMessage.addListener((request) => {
//   if (request.action === 'messageFromContentJS' ){
//     //do stuff with request.payload
// }



// document.addEventListener("DOMContentLoaded", function () {
//   // links = [];
//
//   // chrome.tabs.sendMessage(links, {
//   //   action: 'messageFromPopupJS',
//   //   payload: 'dataFromPopupJS'
//   // });
//
//   // To send messages to content.js:
//   chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
//     chrome.tabs.sendMessage(getLinks(), {
//       action: 'messageFromPopupJS',
//       payload: 'dataFromPopupJS'
//     })
//   });
//
// });
