console.log('content.js loaded!');
// Manipulate DOM here
let links = document.getElementsByTagName('a');
links = [...links];
links = links.filter(link => link.href.slice(link.href.length - 4) === '.csv').map((link) => link.href);
links.forEach(link => console.log(link.href));


// to send to background.js:
chrome.runtime.sendMessage({action:'messageFromContentJS', payload: links})


// to listen to message from background.js:
chrome.runtime.onMessage.addListener((request) => {
  if (request.action === 'messageFromBackgroundJS' ){
    //do stuff with request.payload
  }
});
