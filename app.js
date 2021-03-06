const express = require('express');
const bodyParser = require('body-parser');

var app = express();

const { victoryCounter, getLeaderboard } = require('./tournament.js');
const { getSummonerStats, getWeeklySummonerStats } = require('./summoner.js');
const { createUser } = require('./user.js');
const { createMatchList, getMatches } = require('./matchmaking.js');

var email = 'liko@liko.com';
var password = '123eerr11';
var sumName = 'hellking007';
var accountRegion = 'euw';

app.use(bodyParser.urlencoded({
        extended: true
}));
app.use(bodyParser.json());

app.post('/createuser', (req, res) => {
        console.log(req.body);
        createUser(req.body.email, req.body.pass, req.body.sumName, req.body.region, (confirmation) => {
                res.status(200);
        });
});

app.put('/getstats', (req, res) => {
        console.log(req.body.sumName);
        getWeeklySummonerStats(req.body.sumName, (stats) => {
                res.status(200);
                res.json(stats);
        });
});

app.get('/getmatches', (req, res) => {
        getMatches((matchlist) => {
                res.status(200);
                res.json(matchlist);
        });
});

app.get('/getleaderboard', (req, res) => {
        getLeaderboard((leaderboard) => {
                res.status(200);
                res.json(leaderboard);
        });
});

app.get('/createleaderboard', (req, res) => {
        victoryCounter((leaderboard) => {
                res.status(200);
                res.json(leaderboard);
        });
});

app.get('/creatematches', (req, res) => {
        createMatchList((matchlist) => {
                console.log(matchlist);
                res.status(200).send(matchlist);
        });
});

app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), () => {
        console.log('Server is up on port 3000!');
});
