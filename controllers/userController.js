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

exports.getCallbackShowCode = (req, res) => {
  res.json(req.query);
};
