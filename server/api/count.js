export default defineEventHandler(() => {
    setResponseHeader(event, 'Access-Control-Allow-Origin', '*');
    const data = questions();
    for(const lang in data) data[lang] = data[lang].length;
    let all = 0;
    for(const lang in data) all += data[lang];
    data.all = all;
    return data;
})