console.log('background.js loaded!');
// Server logic goes here
let links = [];
// React when a browser action's icon is clicked.
chrome.browserAction.onClicked.addListener(function(tab) {
  var viewTabUrl = chrome.extension.getURL('image.html');
  var imageUrl = "./images/dw.logo_greyscale 2.svg";

  // Look through all the pages in this extension to find one we can use.
  var views = chrome.extension.getViews();
  for (var i = 0; i < views.length; i++) {
    var view = views[i];

    // If this view has the right URL and hasn't been used yet...
    if (view.location.href == viewTabUrl && !view.imageAlreadySet) {

      // ...call one of its functions and set a property.
      view.setImageUrl(imageUrl);
      view.imageAlreadySet = true;
      break; // we're done
    }
  }
});


// To listen to messages from popup.js or content.js:
chrome.runtime.onMessage.addListener((request) => {
  if (request.action === 'getLinks' ){
    console.log('link request received!');
    chrome.runtime.sendMessage({
      action:'newLinks',
      payload: links
    });
  } else if (request.action === 'messageFromContentJS' ){
    console.log('message recieved from contentjs!');
    console.log('payload: ', request.payload);
    links = request.payload;

  } else if (request.action === 'sendToDataWorld' ){
      console.log('sendToDataWorld message received!');
      console.log('requestpayload: ', request.payload);
      let owner = 'millie';
      let id = 'hratx-30';
      let token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwcm9kLXVzZXItY2xpZW50Om1pbGxpZSIsImlzcyI6ImFnZW50Om1pbGxpZTo6M2U0MWE3NTMtYjI0Yi00Mzg0LTg0MzktMWI5ZjcwMzZhOWZkIiwiaWF0IjoxNDkxODAxOTQ4LCJyb2xlIjpbInVzZXJfYXBpX3JlYWQiLCJ1c2VyX2FwaV93cml0ZSJdLCJnZW5lcmFsLXB1cnBvc2UiOnRydWV9.UyLZsnlwJ-l0t_0pfa01NebtfJJ4llpCeRyBfEYq4L-fvEtJr9BAgRkTJTrB0S76I9kT2kIsrjNEJV4n2_22QQ';

      const data = {
        "files": [
          {
            "name": request.payload.split('/').reverse().shift(),
            "source": {
              "url": request.payload
            },
            "description": "collected via dataset.tools chrome extension",
            "labels": []
          }
        ]
      }

      var settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://api.data.world/v0/datasets/${owner}/${id}/files`,
        "method": "POST",
        "headers": {
          "authorization": `Bearer ${token}`,
          "content-type": "application/json"
        },
        "processData": false,
        "data": JSON.stringify(data)
      };

      $.ajax(settings).done(function (response) {
        console.log('response *********:',response);
      });
    };

});

// To send messages to content.js:
chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
  chrome.tabs.sendMessage(tabs[0].id, {
    action: 'messageFromBackgroundJS',
    payload: 'dataFromBackgroundJS'
  })
});

var onUpload = (link) => {
  let owner = 'millie';
  let id = 'hratx30';
  let token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwcm9kLXVzZXItY2xpZW50Om1pbGxpZSIsImlzcyI6ImFnZW50Om1pbGxpZTo6M2U0MWE3NTMtYjI0Yi00Mzg0LTg0MzktMWI5ZjcwMzZhOWZkIiwiaWF0IjoxNDkxODAxOTQ4LCJyb2xlIjpbInVzZXJfYXBpX3JlYWQiLCJ1c2VyX2FwaV93cml0ZSJdLCJnZW5lcmFsLXB1cnBvc2UiOnRydWV9.UyLZsnlwJ-l0t_0pfa01NebtfJJ4llpCeRyBfEYq4L-fvEtJr9BAgRkTJTrB0S76I9kT2kIsrjNEJV4n2_22QQ';
  let data = link;

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": `https://api.data.world/v0/datasets/${owner}/${id}/files`,
    "method": "PUT",
    "headers": {
      "authorization": `Bearer ${token}`
    },
    contentType: 'application/json',
    "data": data
  }

  $.ajax(settings).done(function (response) {
    console.log('response *********:',response);
  });
};


chrome.browserAction.onClicked.addListener(function(tab) {
   chrome.tabs.executeScript(null, {file: "content.js"});
});
