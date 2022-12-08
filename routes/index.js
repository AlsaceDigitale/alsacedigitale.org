
/*
 * GET home page.
 */

function chunkArrayInGroups(arr, size) {
    var myArray = [];
    for(var i = 0; i < arr.length; i += size) {
      myArray.push(arr.slice(i, i+size));
    }
    return myArray;
}

function randomizeArray(arr) {
    return arr.sort((a, b) => 0.5 - Math.random());
}

const globals = {
    chunkArrayInGroups,
    randomizeArray
}

const caMembers = require('./ca.json')

exports.index = function(req, res){
  res.render('index', {...globals, title: 'Alsace Digitale', caMembers: caMembers  });
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
            res.render( 'hacking-industry-camp');
            break;
        case 4:
            res.render( 'hacksxb');
            break;
        case 5:
            res.render( 'strasbourg-startups');
            break;
        case 6:
            res.render( 'initiation-au-code');
            break;
        case 7:
            res.render( 'digitalhealthcamp');
            break;
        case 8:
            res.render( 'barcamp-alsace');
            break;
        case 9:
            res.render( 'global-game-jam');
            break;
    }
}