const https = require('https');

const doPostRequest = (dest, message) => {

    const DATA = {
        personalizations:[
            {
                to:[
                    {
                        email: dest,
                        name: 'NAME'
                    }
                ],
            subject: 'Informations'}
        ],
        content: [
            {
                type: 'text/plain', 
                value: message
            }
        ],
        from:
            {email:'selraismes@gmail.com', name: "Troc D'Heures Raismois"},
        reply_to:
            {email:"selraismes@gmail.com", name: "Troc D'Heures Raismois"}
    }

  return new Promise((resolve, reject) => {
    const options = {
        hostname: 'api.sendgrid.com',
        port: 443,
        path: '/v3/mail/send',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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'
        }
    }
    
    //create the request object with the callback with the result
    const req = https.request(options, (res) => {
      resolve(JSON.stringify(res.statusCode));
    });

    // handle the possible errors
    req.on('error', (e) => {
      reject(e.message);
    });
    
    //do the request
    req.write(JSON.stringify(DATA));

    //finish the request
    req.end();
  });
};

/*
exports.handler = async (event) => {
  await doPostRequest()
    .then(result => console.log(`Status code: ${result}`))
    .catch(err => console.error(`Error doing the request for the event: ${JSON.stringify(event)} => ${err}`));
};
*/
exports.handler = async (event) => {
    console.log(event)
    await doPostRequest("emmanuelzakaryan@gmail.com", "local")
        .then((res) => {
            console.log("res", res)
        })
        .catch((err) => {
            console.log("err", err)
        })
}