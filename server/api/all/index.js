export default defineEventHandler(event => {
    setResponseHeader(event, 'Access-Control-Allow-Origin', '*');
    return questions();
});