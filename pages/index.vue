<template>
    <header class="fixed top-0 z-10 left-0 w-full py-2 px-4 shadow-sm bg-white grid grid-cols-2">
        <div class="flex gap-2 items-center">
            <img src="/favicon.ico" class="h-10">
            <h1 class="text-lg font-semibold">jQuiz</h1>
        </div>
    </header>
    <main class="w-[90%] mt-28 mb-4 mx-auto flex flex-col gap-2 lg:w-3/4">
        <h1>Welcome to jQuiz: A Quiz API for Developers</h1>
        <p>jQuiz is an easy-to-use, versatile Quiz API designed for developers to use in the simplest ways possible. Whether you're building an educational platform, a fun trivia game, or a knowledge assessment tool, jQuiz offers a good number of questions and answers on various aspects of programming to enable you create and customize quizzes effortlessly.</p>

        <h1>How Does it Work?</h1>
        <p>A simple GET request can be used to fetch data from our API either via a browser or curl. The data is first of all randomized in the server before being sent back to the client, don't expect to receive the same arrangement of data each time you make a request.</p> 
        <ul class="mb-4">
            <li>Getting questions for a particular category</li>
            <p><b>URL:</b> {{ host }}{lang}
                <br><b>Example:</b> {{ host }}js
                <br>The above would return a JSON array where each object has three properties: <code>options</code>, <code>question</code> and <code>answer</code>
                <br><b>question:</b> The question itself
                <br><b>options:</b> This is an array containing a list of possible answers to the question
                <br><b>answer:</b>The actual answer to the question. Note: the value of <code>answer</code> is included in the <code>options</code> property.
            </p>
            <li>Setting a limit</li>
            <p><b>URL:</b> {{ host }}{lang}/{limit}
                <br><b>Example:</b> {{ host }}js/10
                <br>By default, the first example will return an array with all the questions we have in our database, if you want to specify a limit, you can do this by following the above example. The above would return an array of ten JavaScript questions.
            </p>
            <li>Request Everything</li>
            <p><b>URL:</b> {{ host }}all
                <br>This will compact all our available data on available categories and send them back as a JSON Object. The value of each object is an array of the questions involved.
            </p>
            <li>Request Everything with a limit</li>
            <p><b>URL:</b> {{ host }}all/{limit}
                <br><b>Example:</b> {{ host }}all/10
                <br>Limits the number of questions per category. The above example gives ten questions per category.
            </p>
        </ul>

        <h1>Have Questions?</h1>
        <p>Contact us anytime on WhatsApp @<a href="https://wa.me/2348076488738" target="_blank">2348076488738</a> or Facebook @<a href="https://fb.me/mikelneonedwin">mikelneonedwin</a></p>

        <h1>DB Summary</h1>
        <p>For now, our available categories on the quiz are <span class="text-sm" v-html="category"></span></p>
        <div class="lg:w-[80%] mx-auto">
            <canvas ref="cav"></canvas>
        </div>

        <h1>Available Links</h1>
        <p class="flex flex-col gap-2">
            <table>
                <tbody>
                    <tr v-for="path in paths">
                        <td>{{ path.name }}</td>
                        <td>{{ path.link }}</td>
                    </tr>
                </tbody>
            </table>
        </p>

        <h1>Tryout our Quiz</h1>
        <p>Click <a href="/game" class="!text-blue-500 underline">here</a> to try out or very own Programming quiz game built using data from our API</p>

    </main>
</template>

<script setup>
import { Chart } from 'chart.js/auto'
const host = 'https://' + useCookie('host').value + '/api/';
const cav = ref(null);
const { data } = await useFetch('/api/count');
const category = computed(() => {
    const names = Object.keys(data.value).map(convert);
    return names.map(a => `<code>${a}</code>`).join(', ')
})
const paths = [];
for(const key in data.value){
    if(key == "all") continue;
    const map = convert([key]);
    paths.push({name: map, link: host + key });
}
paths.sort((a,b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0);
if(process.client){
    onMounted(() => {
        const { value } = data;
        delete value.all;
        const keys = Object.keys(value);
        new Chart(cav.value, {
            type: 'bar',
            data: {
                labels: [...keys.map(convert)],
                datasets: [{
                    label: 'Questions',
                    data: [...Object.values(value)],
                    hoverOffset: 4
                }]

            }
        })
    })
}
function convert(lang){
    return ({
        js: 'JavaScript',
        html: 'HTML',
        java: 'Java',
        css: 'CSS',
        json: 'JSON',
        jsx: 'JSX',
        nodejs: 'Node.js',
        php: 'PHP',
        py: 'Python',
        ts: 'TypeScript',
        ruby: 'Ruby',
        dart: 'Dart',
        bash: 'Bash'
    })[lang]
}
</script>

<style>
    main>p {
        @apply mb-4 font-light text-lg;
    }
    main>h1 {
        @apply text-2xl font-semibold text-gray-900;
    }
    ul>li {
        @apply mb-2 mt-6 font-semibold;
    }
    li:first-child {
        @apply mt-0;
    }
    code {
        @apply bg-gray-100 py-0.5 px-1;
    }
    li li {
        @apply text-gray-700;
    }
    b {
        @apply text-gray-500;
    }
</style>