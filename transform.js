

const {
    Response,
    Route,
} = require("./lib/models/");

const transformPostmanToMockoon = ({ postman, mockoon, env }) => {
    postman.item.forEach((collection) => {
        collection.item.forEach((r_data) => {
            if (r_data.request && r_data.responses && r_data.responses.length == 0) {
                // console.warn("Found request-only item, skipping...");
            } else {
                if (r_data.response) {
                    r_data.responses = r_data.response;
                }
                let route = new Route();
                route.documentation = r_data.name;
                route.method = r_data.request.method.toLowerCase();
                let url = r_data.request.url;

                route.endpoint = (typeof url == "string" ?
                    url
                    : (
                        typeof url.path == "string" ?
                            url.path
                            : url.path.join("/")
                    )
                );

                if (r_data.responses && r_data.responses.length > 0) {
                    r_data.responses.forEach((r) => {
                        let resp = new Response();
                        if (r.code) {
                            resp.statusCode = r.code.toString();
                        }
                        if (r.header) {
                            resp.headers = r.header;
                        }
                        if (r.body) {
                            resp.body = r.body;
                        }
                        route.addResponse(resp);
                    });
                } else {
                    route.addResponse(new Response());
                }
                env.item.addRoute(route);
            }
        });
    });

    mockoon.addEnvironment(env);
}

module.exports = {
    transformPostmanToMockoon
}