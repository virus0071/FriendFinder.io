var friends = require('../data/friends.js');

module.exports = function (app) {
    app.get('/api/friends', function (req,res) {
        res.json(friends);
    });

    app.post('/api/friends', function (req, res) {
        var match = {
            name: "",
            photo:"",
            scoreDiff: 40
        };
        
        var newUser = req.body;
        var newName = newUser.name;
        var newPhoto = newUser.photo;
        var newScores = newUser.scores;

        for (i = 0; i < newScores.length; i++){
            newScores[i] = parseInt(newScores[i]);
        }

        for (i = 0; i < friends.length; i++){
            var totalDiff = 0;
            for(j=0; j < friends[i].scores.length; j++){
                var eachDiff = Math.abs(newScores[j] - friends[i].scores[j]);
                totalDiff += eachDiff;
                
            }

            if (totalDiff <= match.scoreDiff) {
                match.name = friends[i].name;
                match.photo = friends[i].photo;
                match.scoreDiff = totalDiff;
            }
        }

        
        friends.push(newUser);
        res.json(match);
    });
}
