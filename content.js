console.log('content.js loaded!');
// Manipulate DOM here

let links = document.getElementsByTagName('a');
console.log('links', links);
links = [...links];
links = links.filter(link => link.href.slice(link.href.length - 4) === '.csv').map((link) => link.href);

links.forEach(link => {console.log(link.href)});

// to send to background.js:
chrome.runtime.sendMessage({
  action:'messageFromContentJS',
  payload: links
});

console.log('message sent!: ', links);


// to listen to message from background.js:
chrome.runtime.onMessage.addListener((request) => {
  if (request.action === 'messageFromBackgroundJS' ){
    //use request.payload
  }
});


//
// chrome.tabs.getCurrent(function(Tab tab) {
//   console.log('current tab loaded from click')
// };

//
// let dataLinks = document.getElementsByTagName('a');
// dataLinks = [...dataLinks];
// dataLinks = dataLinks.filter(dataLink => dataLink.href.slice(dataLink.href.length - 4) === '.csv').map((dataLink) => dataLink.href);
//
//
// let links = dataLinks.map(link => link.substring(link.lastIndexOf('/') + 1)));
//
// links.forEach(link => console.log(link));
//
// // links.forEach(link => console.log(link.href.substring(link.lastIndexOf('/') + 1)));
