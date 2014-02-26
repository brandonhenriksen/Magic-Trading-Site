exports.index = function(req, res){
    res.render('index', { title: 'MTGLocal' });
};

exports.login = function(req, res){
    res.render('login', { title: 'Login' });
};

exports.register = function(req, res){
    res.render('register', { title: 'Register' });
};