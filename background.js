console.log('background.js loaded!');
// Server logic goes here
var oauth = ChromeExOAuth.initBackgroundPage({
  'request_url': 'https://www.google.com/accounts/OAuthGetRequestToken',
  'authorize_url': 'https://www.google.com/accounts/OAuthAuthorizeToken',
  'access_url': 'https://www.google.com/accounts/OAuthGetAccessToken',
  'consumer_key': 'anonymous',
  'consumer_secret': 'anonymous',
  'scope': 'https://docs.google.com/feeds/',
  'app_name': 'My Google Docs Extension'
});

// oauth.authorize(onAuthorized);
//
// function callback(text, xhr) {
//      //...
//    };

oauth.authorize(function() {
  // ... Ready to fetch private data ...
});

function stringify(parameters) {
  var params = [];
  for(var p in parameters) {
    params.push(encodeURIComponent(p) + '=' +
                encodeURIComponent(parameters[p]));
  }
  return params.join('&');
};

function onAuthorized() {
  var method = 'POST';
  var url = 'https://docs.google.com/feeds/default/private/full';
  var params = {'alt': 'json'};

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(data) {
    callback(xhr, data);
  };
  xhr.open(method, url + '?' + stringify(params), true);
  xhr.setRequestHeader('GData-Version', '3.0');
  xhr.setRequestHeader('Content-Type', 'application/atom+xml');
  xhr.setRequestHeader('Authorization', oauth.getAuthorizationHeader(url, method, params));

  xhr.send('Data to send');
};


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
  if (request.action === 'messageFromContentJS' ){
    //do stuff with request.payload

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


// chrome.browserAction.onClicked.addListener(function(tab) {
//    chrome.tabs.executeScript(null, {file: "content.js"});
// });
