const fs = require('fs');
const request = require('request');

exports.getIndex = (req, res) => {
  res.render('index');
};

exports.redirectIndex = (req, res) => {
  res.redirect('/');
};

exports.getAccount = (req, res) => {
  res.render('account');
};

exports.getLogin = (req, res) => {
  res.render('login');
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

exports.getAuthCallback = (req, res) => {
  const returnedCode = req.query.code;
  const returnedState = req.query.state;
  const ghId = process.env.GITHUB_CLIENT_ID;
  const ghSecret = process.env.GITHUB_CLIENT_SECRET;

  if (returnedState !== process.env.GITHUB_CLIENT_STATE) {
    res.send('something fishy is going on here 🐟🐟🐟');
  }
  const options = {
    uri: `https://github.com/login/oauth/access_token?client_id=${
      ghId
    }&client_secret=${ghSecret}&code=${returnedCode}&state=${returnedState}`,
    method: 'POST'
  };
  request(options, function(error, response, body) {
    if (error) {
      return `ERROR!: ${error}`;
    } else if (response.statusCode === 200) {
      console.log('GitHub api was successfully posted to 🎉\n');
      // fs.writeFile('../ghResponse.json', body, err => {
      //   if (err) throw err;
      //   console.log(`.data/data.json was successfully written 🎉\n`);
      // });
      console.log('body', body);
      return;
    } else {
      return `Problem! Status code = ${response.statusCode}, response = ${
        response
      }`;
    }
  });
  res.json(req.query);
};
