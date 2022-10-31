exports.intial = (req, res, next) => {
    res.render('index', { title: 'Express' });
}