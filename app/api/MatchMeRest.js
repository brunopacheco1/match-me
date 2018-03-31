const { checkSchema } = require('express-validator/check');

module.exports = app => {
    let errorHandler = (error, response) => {

        console.log(error);

        let status = 500;

        if(error.status) {
            status = error.status;
        }

        response.status(status).json({
            error : error.message
        });
        
    };   

    let validateRequest = (request, response, callback) => {

        let errors = request.validationErrors();

        if(errors) {
            let messages = errors.map(error => error.msg);

            response.status(400).json({
                error : messages
            });
        } else {
            callback();
        }
    };

    const service = app.services.ProfileService(app);
    const searchModel = app.model.Search;
    
    app.get("/match-me/:id", async (request, response) => {
        try {
            const profile = await service.get(request.params.id);

            response.json(profile);

        } catch(error) {
            errorHandler(error, response);
        }
    });
    
    app.get("/match-me", async (request, response) => {
        try {
            const profiles = await service.list();

            response.json(profiles);

        } catch(error) {
            errorHandler(error, response);
        }
    });
    
    app.post("/match-me/search", checkSchema(searchModel), 
        (request, response) => validateRequest(request, response, async () => {

            try {
                const profiles = await service.search(request.body);
    
                response.json(profiles);
                
            } catch(error) {
                errorHandler(error, response);
            }
        })
    );
}