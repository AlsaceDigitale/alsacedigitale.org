var redirects = require('./redirects.json');
var config = require('../config');

function resolveRedirectUrl(redirectConfig) {
    if (!redirectConfig.urlEnv) {
        return redirectConfig.url;
    }

    var fallbackUrl = redirectConfig.url;

    if (redirectConfig.urlConfig && config[redirectConfig.urlConfig]) {
        fallbackUrl = config[redirectConfig.urlConfig];
    }

    return config.envOrDefault(redirectConfig.urlEnv, fallbackUrl);
}


exports.redirect = function (req, res) {
    var path = req.path;
    if (redirects[path]) {
        var redirectConfig = Object.assign({}, redirects[path]);
        console.log("found redirect for", path);
        redirectConfig.url = resolveRedirectUrl(redirectConfig);
        console.log(redirectConfig)

        // if the og:image is relative, make it absolute
        if (redirectConfig.image && redirectConfig.image.indexOf('http') != 0) {
            redirectConfig.image = req.protocol + '://' + req.get('host') + redirectConfig.image;
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
