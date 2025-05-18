const form = document.getElementById('v-id');
form.addEventListener('submit', (event) => {
    console.log(form.elements["voterid"]);
    document.write("<h1>test</h1>")
    event.preventDefault(); 
});
