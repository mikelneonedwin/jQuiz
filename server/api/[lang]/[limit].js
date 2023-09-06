export default defineEventHandler((event) => {
    const { limit:x, lang } = getRouterParams(event);
    
    const limit = parseInt(x);

    let res = questions()[lang];
    
    if(!res){
        setResponseStatus(event, 404, 'Language data not found');
        res = {
            statusCode: 404,
            statusMessage: 'Language data not found'
        }
    } else res = res.slice(0, limit);
    return res;
    
})