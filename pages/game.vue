<template>
    <header class="fixed dx top-0 z-10 left-0 w-full py-2 px-4 shadow-sm bg-white grid grid-cols-2">
        <div class="flex gap-2 items-center">
            <img src="/favicon.ico" class="h-10">
            <h1 class="text-lg font-semibold">jQuiz</h1>
        </div>
    </header>
    <main v-if="step == 1" class="game">
        <div>
            <h1>Pick your category</h1>
            <p>
                <button @click="cat = i;" :class="{'!bg-red-400': i == cat}" v-for="i in all">{{i}}</button>
            </p>
        </div>
        <div>
            <h1>Select your preferred number of questions</h1>
            <p>
                <button @click="cnt = Number(i)" :class="{'!bg-red-400': cnt == i}" v-for="i in Array(40).fill(1).map((a,b) => a +b).map(a => String(a).padStart(2,0))">{{ i }}</button>
            </p>
        </div>
        <button @click="play" class="py-1 bg-white shadow-lg tracking-wide text-[#00DC82] w-1/2 mx-auto font-bold rounded-xl">PLAY</button>
    </main>
    <main v-if="step == 2" class="game">
        <div>
            <h1>Loading...</h1>
        </div>
    </main>
    <main v-if="step == 3" class="game">
        <h1 class="text-2xl font-semibold text-gray-900">Question {{ _now + 1 }} of {{cnt}} in {{cat}}</h1>
        <p class="text-lg">{{ questions[_now].question }}</p>
        <div v-if="show" class="flex flex-col items-start gap-2">
            <button @click="px(ans == questions[_now].answer)" :class="{'focus:bg-red-500': ans != questions[_now].answer, 'focus:bg-[#00DC82]': ans == questions[_now].answer}" class="py-1.5 w-full text-left px-4 rounded-md focus:text-white" v-for="(ans, index) in answers">{{index+1}}. {{ ans }}</button>
        </div>
    </main>
    <main v-if="step == 4" class="game">
        <div>
            <h1>Losses: {{ l }} <br><br>Wins: {{ w }} <br><br>That's {{ rating }}</h1>
        </div>
        <button @click="reset" class="py-1 bg-white shadow-lg tracking-wide text-[#00DC82] w-1/2 mx-auto font-bold rounded-xl">PLAY AGAIN</button>
    </main>
</template>

<script setup>
function reset(){
    scores.value = [];
    cat.value = all[Math.floor(Math.random() * all.length)];
    questions.value = [];
    _now.value = 0;
    step.value = 1;
}
const questions = ref([]);
const scores = ref([]);
const w = ref(null);
const l = ref(null);
const show = ref(true);
const px = x => {
    scores.value.push(x);
    const n = _now.value + 1;
    setTimeout(() => {
        show.value = false;
        setTimeout(() => {
            show.value = true;
            if(!questions.value[n]) {
                w.value = scores.value.filter(Boolean).length;
                l.value = scores.value.length - w.value;
                const p = Math.round(w.value/(cnt.value) * 100);
                if(p >= 0 && p < 21) rating.value = "Terrible";
                if(p > 20 && p < 41) rating.value = "Poor";
                if(p > 40 && p < 61) rating.value = "Fair"
                if(p > 60 && p < 81) rating.value = "Good"
                if(p > 80 && p < 91) rating.value = "Very Good"
                if(p > 90) rating.value = "Excellent";
                console.log(p);
                step.value++
            }
            else _now.value = n;
        }, 25)
    }, 1000)
};
const rating = ref('');
async function play(){
    step.value++;
    const key = Object.keys(map).find(a => map[a] == cat.value);
    questions.value = await $fetch(`/api/${key}/${cnt.value}`);
    step.value++;
}
const step = ref(1);
const _now = ref(0);
const answers = computed(() => questions.value[_now.value].options);
const cnt = ref(10);
const map = {
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
}
const all = Object.values(map).sort();
const cat = ref('');
onMounted(() => {
    cat.value = all[Math.floor(Math.random() * all.length)]
})

</script>

<style>
    main.game>div>h1 {
        @apply font-semibold text-2xl text-gray-900 mb-2;
    }
    main.game>div>h1+p>button {
        @apply py-1 pt-1.5 lg:!py-1 px-4 rounded-3xl focus:bg-red-400 hover:bg-red-400 bg-[#00DC82] text-white font-semibold mr-2 mb-2;
    }
    main.game {
        @apply w-[90%] mt-28 mb-4 mx-auto flex flex-col gap-8 lg:w-3/4;
    }
</style>