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
      let id = 'hratx30';
      let token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwcm9kLXVzZXItY2xpZW50Om1pbGxpZSIsImlzcyI6ImFnZW50Om1pbGxpZTo6M2U0MWE3NTMtYjI0Yi00Mzg0LTg0MzktMWI5ZjcwMzZhOWZkIiwiaWF0IjoxNDkxODAxOTQ4LCJyb2xlIjpbInVzZXJfYXBpX3JlYWQiLCJ1c2VyX2FwaV93cml0ZSJdLCJnZW5lcmFsLXB1cnBvc2UiOnRydWV9.UyLZsnlwJ-l0t_0pfa01NebtfJJ4llpCeRyBfEYq4L-fvEtJr9BAgRkTJTrB0S76I9kT2kIsrjNEJV4n2_22QQ';

      const data = {
        "files": [
          {
            "name": request.payload.split('/').reverse().shift(),
            "source": {
              "url": request.payload,
              "expandArchive": false
            },
            "description": "collected via dataset.tools chrome extension",
            "labels": []
          }
        ]
      };

      var settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://api.data.world/v0/datasets/${owner}/${id}/files`,
        "method": "POST",
        "headers": {
          "authorization": `Bearer ${token}`,
          "www-authenticate": "Bearer realm='datadotworld'",
          "access-control-allow-methods": "OPTIONS, GET, POST, PUT, PATCH, DELETE, HEAD, LINK, UNLINK",
          "contentType": "application/json",
          "access-control-allow-origin": `https://apidocs.data.world`,
          "access-control-allow-credentials": true
        },
        "data": JSON.stringify(data)
      };

      $.ajax(settings).done(function (response) {
        console.log('response *********:',response);
      });
    };
  // do stuff with request.payload
  // such as an API call

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




// *****************  DOWNLOAD TO LOCAL FOLDER  ***************
// getFile(owner, id, name, token) {
//    console.log('getting file' + name);
//    axios.get('http://localhost:8080/downloadDatasets', {params: {owner: owner, projectID: id, file: name, at: token}})
//    .then((response) => {
//      // The absolute path of the new file with its name
//      var filepath = "mynewfile.csv";
//      var path = storage + '/' + name;
//      console.log('path:', path)
//      fs.writeFile(path, response.data, "utf8", (err) => {
//        console.log("response",response);
//        if (err) throw err;
//        }
//          console.log("The file was succesfully saved locally*************!");
//       }
//     });
//   })
//  }


// ***************** UPLOAD TO DATA.WORLD ***********************
  // sendFile(owner,id,name,token){
  // let filePath = `${storage}/${name}`
  //   fs.readFile(`${storage}/${name}`, "utf8", (err, data) => {
  //     console.log('data from readFile',data);
  //
  //     var settings = {
  //       "async": true,
  //       "crossDomain": true,
  //       "url": `https://api.data.world/v0/datasets/${owner}/${id}/files/${name}?expandArchive=false`,
  //       "method": "PUT",
  //       "headers": {
  //         "authorization": `Bearer ${token}`
  //       },
  //       contentType: 'application/json',
  //       "data": data
  //     }
  //
  //     $.ajax(settings).done(function (response) {
  //       console.log('response',response);
  //       });
  //     });
  //
  // }
