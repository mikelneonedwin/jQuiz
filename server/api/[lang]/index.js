export default defineEventHandler((event) => {
    setResponseHeader(event, 'Access-Control-Allow-Origin', '*');
    const lang = getRouterParam(event, 'lang').toLowerCase();
    let res = questions()[lang];
    if(!res){
        setResponseStatus(event, 404, 'Language data not found');
        res = {
            statusCode: 404,
            statusMessage: 'Language data not found'
        }
    }
    return res;
})