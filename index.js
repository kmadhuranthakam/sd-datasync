// var http = require('http');

// var server = http.createServer(function(request, response) {

//     response.writeHead(200, {"Content-Type": "text/plain"});
//     response.end("Hello World!");

// });

// var port = 800;
// server.listen(port);

// console.log("Server running at http://localhost:%d", port);


const http = require('http')
const axios = require('axios');
const {PubSub} = require('@google-cloud/pubsub');

const escapeHtml = require('escape-html');

/**
 * Responds to an HTTP request using data from the request body parsed according
 * to the "content-type" header.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.helloworld = (req, res) => {
  let name;

  switch (req.get('content-type')) {
    // '{"name":"John"}'
    case 'application/json':
      ({name} = req.body);
      break;

    // 'John', stored in a Buffer
    case 'application/octet-stream':
      name = req.body.toString(); // Convert buffer to a string
      break;

    // 'John'
    case 'text/plain':
      name = req.body;
      break;

    // 'name=John' in the body of a POST request (not the URL)
    case 'application/x-www-form-urlencoded':
      ({name} = req.body);
      break;
  }

  // const message = Buffer.from(req.body.message.data, 'base64').toString(
  //   'utf-8'
  // );

  // //https://cloud.google.com/appengine/docs/flexible/nodejs/writing-and-responding-to-pub-sub-messages

  // console.log(message);

  // console.log(JSON.stringify(req.body.message));
  // console.log(JSON.stringify(req.body.message.data));
  // console.log( `Hssello ${escapeHtml(name || ' == data')}!`);

  // res.status(500).send(`Hssello ${escapeHtml(name || 'Wordsdsdsallld')}!`);

  // request.post('http://service.com/upload', {form:{key:'value'}})

  // const options = {
  //   hostname: '10.46.65.30',
  //   port: 3200,
  //   path: '/api/Entity',
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   }
  // }
  
  // const req2 = http.request(options, res => {
  //   console.log(`statusCode: ${res.statusCode}`)
  
  //   res.on('data', d => {
  //     process.stdout.write(d)
  //   })
  // })
  
  // req2.on('error', error => {
  //   console.error(error)
  // })

  const data = {
    name: 'John Doe',
    job: 'Content Writer'
};

// console.log("test axiosbf endpoint");

//   axios.get('http://10.54.128.74:80/api/healthcheck')
//     .then((res) => {
//         console.log(`Status: ${res.status}`);
//         console.log('Body: ', res.data);
//     }).catch((err) => {
//         console.error(err);
//         console.log("catched error");
//         console.log(err);

//     });

/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
// const topicName = 'YOUR_TOPIC_NAME';
// const data = JSON.stringify({foo: 'bar'});

// Imports the Google Cloud client library


// Creates a client; cache this for further use
const pubSubClient = new PubSub();

async function publishMessage() {
  // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
  const dataBuffer = Buffer.from('HEllo pradep. I am from Node JS!!');

  try {
    const messageId = await pubSubClient.topic("projects/sandbox-sd-ccnext-01/topics/pushingFromLocalDevMachine").publish(dataBuffer);
    console.log(`Message ${messageId} published.`);
  } catch (error) {
    console.error(`Received error while publishing: ${error.message}`);
    process.exitCode = 1;
  }
}

 publishMessage();

};