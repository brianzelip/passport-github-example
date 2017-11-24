exports.getIndex = (req, res) => {
  res.render('index', { user: req.user });
};

exports.getAccount = (req, res) => {
  res.render('account', { user: req.user });
};

exports.getLogin = (req, res) => {
  res.render('login', { user: req.user });
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};
