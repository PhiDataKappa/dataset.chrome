console.log('background.js loaded!');
// Server logic goes here
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
