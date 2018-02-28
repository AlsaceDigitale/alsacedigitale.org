var sendgrid = require("sendgrid")(process.env.SENDGRID_APIKEY);

exports.send = function( req, res ) {

    sendgrid.send( {
        to: "florian.fries@alsacedigitale.org",
        from: "florian.fries@alsacedigitale.org",
        replyto: req.body.email,
        subject: "[Formulaire AD.org] Message de " + req.body.name,
        text: req.body.message

    }, function( err, json ) {
        if( err ) {
            console.error( err );
            res.send( 500, "oooops" );
        }

        res.send( "OK" );
    });
};