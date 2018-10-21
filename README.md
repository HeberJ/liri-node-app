# Liri Node App

Liri is a node.js command line application that Gives the user options to choose form. The user must enter 'node liri.js' into the command line and use the up and down arrow keys to choose a option.

Possible Options: 'Concert This', 'Spotify This', 'Movie This', or 'Do What It Says'.


'Concert This' uses the Bandsintown API to retrieve all upcoming concerts for an artist that is searched. Each venue name, location, and date is provided for all results. Moment.js is used to format the date from the Bandsintown API.

'Spotify This' uses the Spotify API to retrieve data about the song entered in the search parameter. All song titles that contain the search parameter or parts of it are returned. The user will receive the artist, song name, a link to preview the song, and the album name for each result.

'Movie This' uses the OMDb API to retreive data about the movie entered in the search parameter. The result will include the title, release year, IMDb rating, Rotten Tomatoes rating, country or countries it was filmed in, langauge(s), plot, and actors/actresses in the film.

'Do What It Says' is a command that reads the random.txt file and executes the parameters inside of it. By default it is set to 'spotify-this-song,I Want It That Way', but this can be changed to any of the other commands with any search parameter.
Example: movie-this, Skyfall

Technologies used: Javascript, Node.js, Moment.js, Bandsintown API, Spotify API, OMDb API

[![Alt text](https://youtu.be/e0ShO6kv8t0/0.jpg)](https://youtu.be/e0ShO6kv8t0)