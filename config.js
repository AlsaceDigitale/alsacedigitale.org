var DEFAULT_ADHESION_URL = 'https://www.helloasso.com/associations/alsace-digitale/adhesions/membre-alsace-digitale-2026';

function envOrDefault(name, fallback) {
    return process.env[name] || fallback;
}

module.exports = {
    DEFAULT_ADHESION_URL: DEFAULT_ADHESION_URL,
    adhesionUrl: envOrDefault('ADHESION_URL', DEFAULT_ADHESION_URL),
    envOrDefault: envOrDefault
};
