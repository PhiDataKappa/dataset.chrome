console.log('content.js loaded!');
// Manipulate DOM here
// chrome.browserAction.setPopup({popup: "popup.html"});


let links = document.querySelectorAll('a');
  console.table('links', links);

links = [...links];

// const links = [];
// fetch(endpoint)
// .then(blob => blob.json())
// .then(data => links.push(...data));

function findMatches(wordToMatch, links) {
  return links.filter(link => {
    // match search input to see if links match
    const regex = new RegExp(wordToMatch, 'gi');
    return link.href.match(regex)
  });
}



//
// let links = document.querySelectorAll('a');
// console.log('links', links);
// links = [...links];
// let csvLinks = links.filter(link => link.href.slice(link.href.length - 4) === '.csv').map((link) => link.href);
// let xlsLinks = links.filter(link => link.href.slice(link.href.length - 4) === '.xls').map((link) => link.href);
// let xlsxLinks = links.filter(link => link.href.slice(link.href.length - 5) === '.xlsx').map((link) => link.href);
// links = [...csvLinks, ...xlsLinks, ...xlsxLinks];
//
// 
// links.forEach(link => {console.log(link.href)});
//





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
