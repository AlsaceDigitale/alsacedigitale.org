
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Alsace Digitale' });
};

exports.showWork = function( req, res ) {

    switch( parseInt(req.params.id) ) {
        default:
        case 1:
            res.render( 'edgefest');
            break;
        case 2:
            res.render( 'startup-weekend');
            break;
        case 3:
            res.render( 'hack-the-culture');
            break;
        case 4:
            res.render( 'hacksxb');
            break;
        case 5:
            res.render( 'demonight');
            break;
        case 6:
            res.render( 'devoxx4kids');
            break;
        case 7:
            res.render( 'digitalhealthcamp');
            break;
        case 8:
            res.render( 'barcamp-alsace');
            break;
        case 9:
            res.render( 'hack-le-chalet');
            break;
    }
}