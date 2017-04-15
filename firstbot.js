var builder = require('botbuilder');
var rest    = require('restify');
var google  = require('./google.js')


var connector = new builder.ChatConnector();
var bot = new builder.UniversalBot(connector);





//Testdialog
bot.dialog('/', [
    function(session){
        builder.Prompts.text(session, 'Hast du Weintrauben?');
    },
    function(session, result) {
     if (result.response == 'Ja' || result.response == 'ja' || result.response == 'jo' ){
        var card = new builder.ThumbnailCard(session);

        card.title('Ich liebe Weintrauben');
        card.images([builder.CardImage.create(session, 'http://is1.mzstatic.com/image/thumb/Purple4/v4/96/43/20/964320ee-2195-1c80-db46-c661e9c484bd/source/175x175bb.jpg')]);
        card.subtitle('Waddel Waddel ...');
        card.text('Bum Bumba Bum Bumba Bum \n Till the very next day');

        card.tap(new builder.CardAction.openUrl(session, 'https://www.youtube.com/watch?v=MtN1YnoL46Q'));

        var message = new builder.Message(session).attachments([card]);
        session.send(message);

     }
     else {
        session.send('Dann halt nicht!');   
     }
    }   
]);


//Server aktivieren
var server =  rest.createServer();
server.listen(3978, function () {console.log('%s gestartete auf %s', server.name, server.url)});

server.post('/api/messages', connector.listen());


