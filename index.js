let app = require("./app/init")();

const config = app.profile;

app.listen(config.port, () => {
    console.log(`Server environment: ${config.profile}`);
    console.log(`Server port: ${config.port}`);
    console.log(`Elastic Search address: ${config.elastic.host}`);
});