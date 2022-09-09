const express = require("express");
const http = require("http");
const logger = require('morgan');

const app = express();
const httpServer = http.createServer(app);
const PORT = 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/alive', (req, res) => {
    res.status(200).json({ message: 'Alive!'})
})

app.post('/gn/webhook(/pix)?', (request, response) => {
    if (request.socket.authorized){
        console.log({ webhookInfo: req.body })
        response.status(200).end();
    }else{
        response.status(401).end();
    }
});

httpServer.listen(PORT, () =>
    console.log(`Express server currently running on port ${PORT}`)
);