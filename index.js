const express = require('express');
const bodyParser = require('body-parser');
const supabaseClient = require('@supabase/supabase-js');

const dotenv = require('dotenv')

const app = express();
const port = 3000;

dotenv.config();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

//Initialize Supabase Client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);

app.get('/', (req, res) => { 
    res.sendFile('public/homepage.html', { root: __dirname });
});

app.get('/usersongs', async (req, res) => {
    console.log('Attempting to GET all users');

    const {data, error} = await supabase.from('usersong').select();

    if(error){
        console.log(`Error: ${error}`)
        res.statusCode = 500;
        res.send(error);
        return;
    } else {
        res.send(data);
    }
});

app.post('/usersong', async (req, res) =>{
    console.log('Adding User');

    console.log('Request: ', req.body);

    const user_name = req.body.user_name;
    const favorite_artist = req.body.favorite_artist;
    const favorite_song = req.body.favorite_song;

        const { data, error} = await supabase.from('usersong').insert({
            user_name: user_name,
            user_favorite_artist: favorite_artist,
           user_favorite_song: favorite_song
        })
        .select();
        if(error){
        console.log(`Error: ${error}`)
        res.statusCode = 500;
        res.send(error);
        return;
    } else {
        res.send(data);
    }

    res.send(req.body);
});

app.listen(port, () => {
    console.log('App is available on port:', port);
})