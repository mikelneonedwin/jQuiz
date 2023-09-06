export default defineEventHandler((event) => {

    const x = getRouterParam(event, 'limit');

    const limit = parseInt(x);

    const all = questions();
    for(const lang in all){
        all[lang] = all[lang].slice(0, limit);
    }
    return all;
})