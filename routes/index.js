
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Alsace Digitale' });
};

exports.showWork = function( req, res ) {

    switch( req.param["id"]) {
        case 1:
            res.render( 'edgefest');
            break;

        default:
            res.render( 'edgefest');
            break;
    }
}