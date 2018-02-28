/**
 * Created by Stéphane on 01/04/2014.
 */

var sendgrid = require('sendgrid')( process.env.API_USER, process.env.API_KEY );


exports.send = function( req, res ) {

    sendgrid.send( {
        to: "contact@alsacedigitale.org",
        from: req.body.email,
        subject: "Message de " + req.body.name,
        text: req.body.message

    }, function( err, json ) {
        if( err ) {
            console.error( err );
            res.send( 500, "oooops" );
        }

        res.send( "OK" );
    });
};

//var sendgrid = require("sendgrid")(process.env.SENDGRID_APIKEY);
var sendgrid = require("sendgrid")("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");


exports.send = function( req, res ) {

    sendgrid.send( {
        to: "contact@alsacedigitale.org",
        from: "contact@alsacedigitale.org",
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