

const {
    Response,
    Route,
} = require("./lib/models/");

const transformPostmanToMockoon = ({ postman, mockoon, env }) => {

    env.item.uuid = postman.info._postman_id;
    postman.item.forEach((collection) => {
        collection.item.forEach((r_data) => {
            if (r_data.request && r_data.responses && r_data.responses.length == 0) {
                // console.warn("Found request-only item, skipping...");
            } else {
                if (r_data.response) {
                    r_data.responses = r_data.response;
                }
                let route = Route();
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
                        let resp = Response();
                        if (r.code) {
                            resp.statusCode = r.code.toString();
                        }
                        if (r.header) {
                            resp.headers = r.header;
                        }
                        if (r.body) {
                            resp.body = r.body;
                        }
                        route.responses.push(resp);
                    });
                } else {
                    route.responses.push(Response())
                }
                env.item.routes.push(route);
            }
        });
    });

    mockoon.data.push(env);
}

module.exports = {
    transformPostmanToMockoon
}