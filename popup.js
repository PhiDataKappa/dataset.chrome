console.log('popup.js loaded!');
//JS for popup.html (react, angular, etc)

let links = [];

// var onUpload = (link) => {
//   let owner = 'millie';
//   let id = 'hratx30';
//   let token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwcm9kLXVzZXItY2xpZW50Om1pbGxpZSIsImlzcyI6ImFnZW50Om1pbGxpZTo6M2U0MWE3NTMtYjI0Yi00Mzg0LTg0MzktMWI5ZjcwMzZhOWZkIiwiaWF0IjoxNDkxODAxOTQ4LCJyb2xlIjpbInVzZXJfYXBpX3JlYWQiLCJ1c2VyX2FwaV93cml0ZSJdLCJnZW5lcmFsLXB1cnBvc2UiOnRydWV9.UyLZsnlwJ-l0t_0pfa01NebtfJJ4llpCeRyBfEYq4L-fvEtJr9BAgRkTJTrB0S76I9kT2kIsrjNEJV4n2_22QQ';
//   let data = link;
//
//   var settings = {
//     "async": true,
//     "crossDomain": true,
//     "url": `https://api.data.world/v0/datasets/${owner}/${id}/files`,
//     "method": "PUT",
//     "headers": {
//       "authorization": `Bearer ${token}`
//     },
//     contentType: 'application/json',
//     "data": data
//   }
//
//   $.ajax(settings).done(function (response) {
//     console.log('response *********:',response);
//   });
// };




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


// window.addEventListener('load', function load(event){
    // const importButtons = document.getElementsByClassName('importButton');
// });


// var row = $('<tr>');
//
// for( var i = 0; i < links.length; i++) {
//   row.html(dataString)
//   append($('<td>' + '<button />' + '<button onclick="onUpload(links[i])"><button/>').html(dataString[i]));
// }
// $('#results').append(row);
// }



// $(function () {
//     $("#submit").click(function () {
//           var table = $('<table></table>').addClass('foo');
//         for (var i = 0; i < 10; i++) {
//                 row = $('<tr></tr>');
//                 for (var j = 0; j < 10; j++) {
//                     var rowData = $('<td></td>').addClass('bar').text('result ' + j);
//                     row.append(rowData);
//                 }
//                 table.append(row);
//             }
//
//         if ($('table').length) {
//              $("#results tr:first").after(row);
//         }
//         else {
//             $('#results').append(table);
//         }
//     });
// });
