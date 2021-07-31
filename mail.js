const https = require('https');

const doPostRequest = async (sender, message)  =>  {

    const DATA = {
        personalizations:[
            {
                to:[
                    {
                        email: 'selraismes@gmail.com',
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
            {email: sender, name: ""},
        reply_to:
            {email: sender, name: ""}
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

let sender = "emmanuelzakaryan@gmail.com"
sender = "selraismes@gmail.com"
const text = "test node local"

doPostRequest(sender, text)
    .then((res) => {
        console.log(res)
        return res
    })
    .catch((err) => {
        console.log(err)
        return err
    })