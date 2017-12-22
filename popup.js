console.log('popup.js loaded!');
//JS for popup.html (react, angular, etc)
let links = [];

function makeTable(links) {
  // var tableHeaders = ['Link', 'Import', 'Download'];
  // var data = links;

  let table ='<table id="linkTable">'
  for (let i = 0; i < links.length; i++) {
      table += `<tr><td><input type="text" name="links" value=${links[i]}></td>
      <td><input type="submit" class="button" value="download"></td>
      <td><input type="submit" class="button importButton" value="import" link=${links[i]}></td></tr>`
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
