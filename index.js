let app = require("./app/init")();

const config = app.profile;

app.listen(config.port, () => {
    let host = config.elastic.host;
    
    if(config.elastic.host.includes("@")) {
        host = config.elastic.host.split("@")[1];
    }

    console.log(`Server environment: ${config.profile}`);
    console.log(`Server port: ${config.port}`);
    console.log(`Elastic Search address: ${host}:${config.elastic.port}`);
});