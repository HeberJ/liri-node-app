require('dotenv').config();
let keys = require('./keys');
const Spotify = require('node-spotify-api');
const fs = require('fs');
const request = require('request');
const inquirer = require('inquirer');
const OMDB = require('omdb');
const moment = require('moment');
moment().format();

//let topLine =
//   '================= Hello, This is what I found. ==================';

//******************************************************************************
// Get Functions
//******************************************************************************
//Console logs bands venue, location and date ==================================
let getConcert = bandName => {
    //Check to see if bandName is empty
    if (!bandName) {
        console.log('\nMust insert band or artist name.\n');
    } else {
        //query url
        let bandsUrl =
            'https://rest.bandsintown.com/artists/' +
            bandName +
            '/events?app_id=codingbootcamp';

        //api request
        request(bandsUrl, (err, res, body) => {
            if (err) {
                console.log(`Error occurred: ${err}`);
            } else {
                let bandsData = JSON.parse(body);

                output =
                    '\n\n================= Liri Found This =================';

                for (let i = 0; i < bandsData.length; i++) {
                    //Formatting the the date
                    let date = moment(bandsData[i].datetime).format(
                        'MM/DD/YYYY'
                    );
                    //the print out
                    output += `\n___________________________
                    \nVenue: ${bandsData[i].venue.name}
                    \nLocation: ${bandsData[i].venue.city}
                    \nEvent Date: ${date}
                    `;
                    console.log(output);
                }
            }
        });
    }
};

//Console logs movie information to the terminal ===============================
let getMovieInfo = movieName => {
    //Check to see if movieName is empty
    if (!movieName) {
        movieName = 'Mr. Nobody';
    }

    let queryUrl = `http://www.omdbapi.com/?apikey=${
        keys.omdb.myKey
    }&t=${movieName}&plot=short`;

    request(queryUrl, (err, res, body) => {
        if (err) {
            console.log(`Error occurred: ${err}`);
        } else {
            let jsonData = JSON.parse(body);

            output = `\n\n================= Liri Found This =================
            \nTitle: ${jsonData.Title}
            \nYear: ${jsonData.Year}
            \nIMDB Rating: ${jsonData.imdbRating}
            \nRotten Tomatoes Rating: ${jsonData.Ratings[1].Value}
            \nCountry(s): ${jsonData.Country}
            \nLanguage(s): ${jsonData.Language}
            \nPlot: ${jsonData.Plot}
            \nActors: ${jsonData.Actors}
            \n================= You're Welcome ==================\n
            `;
            console.log(output);
        }
    });
};

//Console logs all the songs information to the terminal. ======================
let getSpotify = song => {
    let spotify = new Spotify(keys.spotify);
    //Checks to see if song was chosen
    if (!song) {
        //Sets song to Chumbawamba
        song = 'The Sign Ace of Base';
    }

    spotify.search({ type: 'track', query: song }, (err, data) => {
        //Error check
        if (err) {
            console.log(`Error occurred: ${err}`);
        } else {
            output = `\n\n================= Liri Found This =================
            \nSong Name: "${data.tracks.items[0].name}"
            \nAlbum Name: "${data.tracks.items[0].album.name}"
            \nArtist Name: "${data.tracks.items[0].album.artists[0].name}"
            \nURL: "${data.tracks.items[0].album.external_urls.spotify}"
            \n================= You're Welcome ==================\n
            `;
            console.log(output);
        }
    });
};

let doWhatItSays = () => {
    fs.readFile('random.txt', 'utf8', (err, data) => {
        if (err) {
            return console.log(`Error: ${err}`);
        }
        let fileArray = data.split(',');
        console.log(fileArray[0]);

        switch (fileArray[0]) {
            case 'concert-this':
                getConcert(answers.concertChoice);
                break;

            case 'spotify-this-song':
                getSpotify(fileArray[1]);
                break;

            case 'movie-this':
                getMovieInfo(answers.movieChoice);
                break;
            default:
                console.log(`Didn't make a selection`);
                break;
        }
    });
};

//******************************************************************************
// Prompts
//******************************************************************************
let questions = [
    {
        type: 'list',
        name: 'lookUpOptions',
        message: 'What would you like to do today?',
        choices: [
            'Concert This',
            'Spotify This',
            'Movie This',
            'Do What It Says'
        ]
    },
    {
        type: 'input',
        name: 'concertChoice',
        message: 'What band or artist would you like to look up?',
        when: answers => {
            return answers.lookUpOptions == 'Concert This';
        }
    },
    {
        type: 'input',
        name: 'spotifyChoice',
        message: 'What song would you like to look up?',
        when: answers => {
            return answers.lookUpOptions == 'Spotify This';
        }
    },
    {
        type: 'input',
        name: 'movieChoice',
        message: 'What movie would you like to look up?',
        when: answers => {
            return answers.lookUpOptions == 'Movie This';
        }
    }
];

inquirer.prompt(questions).then(answers => {
    switch (answers.lookUpOptions) {
        case 'Concert This':
            getConcert(answers.concertChoice);
            break;

        case 'Spotify This':
            getSpotify(answers.spotifyChoice);
            break;

        case 'Movie This':
            getMovieInfo(answers.movieChoice);
            break;

        case 'Do What It Says':
            doWhatItSays();
            break;

        default:
            break;
    }
});

/*
* In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.
* Make sure you append each command you run to the `log.txt` file.
* Do not overwrite your file each time you run a command.
*/
