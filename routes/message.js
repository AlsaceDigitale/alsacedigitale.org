var sendgrid = require("sendgrid")(process.env.SENDGRID_APIKEY);

exports.send = function( req, res ) {

    var email = new sendgrid.Email();
        
    email.addTo("contact@alsacedigitale.org");
    email.setFrom("contact@alsacedigitale");
    email.setReplyTo(req.body.email);
    email.setSubject("[Formulaire AD.org] Message de " + req.body.name);
    email.setText(req.body.message);

    sendgrid.send(email, function( err, json ) {console.log(json);
        if( err ) {
            console.error( err );
            res.send( 500, "oooops" );
        }

        res.send( "OK" );
    });
};