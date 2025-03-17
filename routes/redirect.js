var redirects = require('./redirects.json');


exports.redirect = function (req, res) {
    var path = req.path;
    if (redirects[path]) {
        var redirectConfig = redirects[path];
        console.log("found redirect for", path);
        console.log(redirectConfig)

        // if the og:image is relative, make it absolute
        if (redirectConfig.image && redirectConfig.image.indexOf('http') != 0) {
            redirectConfig.og.image = req.protocol + '://' + req.get('host') + redirectConfig.og.image;
        }

        if (redirectConfig.method == 'meta-refresh') {
            return res.render('redirect', { config: redirectConfig });
        }
        if (redirectConfig.method == 'embed') {
            return res.render('embed', { config: redirectConfig });
        }
        if (redirectConfig.method == 'redirect') {
            var redirectCode = redirectConfig.code || 301;
            console.log(redirectCode, 'redirect to', redirectConfig.url);
            return res.redirect(redirectCode, redirectConfig.url);
        }
        
        console.log('unknown redirect method', redirectConfig.method);
        res.send(500);
    } else {
        res.send(500);
    }
}