module.exports = class Route {
    uuid = "";
    documentation = "";
    method = "get";
    endpoint = "";
    responses = [];
    enabled = true;
    
    addResponse = response=>{
        this.responses.push(response);
    }
};