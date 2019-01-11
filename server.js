var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var request = require('request')
var querystring = require('querystring')

var apiKey = process.env.API_KEY
var apiSecret = process.env.API_SECRET
var port = process.env.PORT

var baseUrl = 'http://localhost:' + port
var redirectUri = baseUrl + '/authorize'

var corsOptions = {
  origin: 'https://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

var app = express()

app.use(cors(corsOptions))
app.use(bodyParser.json())

app.get('/', function root (req, res) {
  var path = 'https://api.rhapsody.com/oauth/authorize?' + querystring.stringify({
    response_type: 'code',
    client_id: apiKey,
    redirect_uri: redirectUri
  })

  res.redirect(path)
})

app.post('/authorize', function authorize (req, res) {
  request.post({
    url: 'https://api.rhapsody.com/oauth/access_token',
    form: {
      client_id: apiKey,
      client_secret: apiSecret,
      response_type: 'code',
      code: req.query.code,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code'
    }
  }, function callback (error, response, body) {
    if (error !== null) {
      console.error(error)
    }

    // eslint-disable-next-line camelcase
    const { access_token, refresh_token } = JSON.parse(body)

    console.log({ access_token, refresh_token })

    res.json(200, {
      accessToken: access_token,
      refreshToken: refresh_token
    })
  })
})

app.get('/reauthorize', function reauthorize (req, res) {
  var refreshToken = request.query.refreshToken

  if (!refreshToken) {
    res.json(400, { error: 'A refresh token is required.' })
    return
  }

  request.post({
    url: 'https://api.rhapsody.com/oauth/access_token',
    form: {
      client_id: apiKey,
      client_secret: apiSecret,
      response_type: 'code',
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    }
  }, function callback (error, response, body) {
    console.log('Platform response:', {
      error: error,
      statusCode: response.statusCode,
      body: body
    })

    if (response.statusCode !== 200) {
      res.json(response.statusCode, { error: error || body })
      return
    }

    res.json(200, JSON.parse(body))
  })
})

app.listen(port, function listen () {
  console.log('Listening on', port)
})
