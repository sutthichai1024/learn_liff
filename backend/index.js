const request = require('request-promise')

// Verifying Access Token and Channel ID
const json = await request.get({
  url : `htttps://api.line.me/oauth2/v2.1verify?access_token=${accessToken}`,
  json: true
})

if(json.client_id !== CHANNEL_ID){
  return 401
}


// Getting User Profile by Access Token
const profile = await request.get({
  url : 'https://api.line.me/v2/profile',
  headers : { Authorizations: `Bearer ${accessToken}` },
  json : true
})


// Revoke Access Token
await request.post({
  url : 'https://api.line.me/oauth2/v2.1/revoke',
  headers : { "Content-Type" : "application/x-www-form-urlencoded" },
  form : {
    access_token : `${accessToken}`,
    client_id : CHANNEL_ID ,
    clinent_secret : CHANNEL_SECRET

  }
})