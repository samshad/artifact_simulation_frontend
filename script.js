var artifact = {}

async function getData(){
    var btn = document.getElementById('getData-btn');
    btn.disabled = true;
    btn.innerText = 'Fetching...';

    const url = "https://artifact-simulation-api.herokuapp.com/get_artifact/";
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);

    artifact = data;

    var artifact_div = document.getElementById('artifact-div');
    artifact_div.style.display = 'block';

    var levelup_btn1 = document.getElementById('levelup-btn1');
    levelup_btn1.style.display = 'block';

    var levelup_btn2 = document.getElementById('levelup-btn2');
    levelup_btn2.style.display = 'block';

    showArtifact();

    await new Promise(r => setTimeout(r, 2000));
    btn.disabled = false;
    btn.innerText = 'Get Artifact';
}

function showArtifact(){
    var type = document.getElementById('artifact-type');
    type.innerHTML = artifact['type'];

    var mainstat = document.getElementById('mainstat');
    mainstat.innerHTML = artifact['mainstat'];

    var mainstat_value = document.getElementById('mainstat-value');
    mainstat_value.innerHTML = artifact['mainstat_value'];

    var level = document.getElementById('level');
    level.innerHTML = "+" + artifact['level'];

    substats = "";
    for(var i = 0; i < artifact['substats_count']; i++){
        substats += "<li>" + "<h3>" + artifact['substats'][i][0] + "+" + artifact['substats'][i][1].toFixed(1) + "</h3>" + "</li>";
    }

    substats = '<ul>' + substats + '</ul>';

    var substats_list = document.getElementById('substats-div');
    substats_list.innerHTML = substats;
}

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
}

async function levelup(post_value){
    var lvlup_btn1 = document.getElementById('levelup-btn1');
    lvlup_btn1.disabled = true;

    var lvlup_btn2 = document.getElementById('levelup-btn2');
    lvlup_btn2.disabled = true;

    await postData('https://artifact-simulation-api.herokuapp.com/levelup/', { "data": post_value })
    .then(data => {
        console.log(data);
        artifact = data;
        showArtifact();
        if(artifact['level'] === 20){
            var levelup_btn1 = document.getElementById('levelup-btn1');
            levelup_btn1.style.display = 'none';

            var levelup_btn2 = document.getElementById('levelup-btn2');
            levelup_btn2.style.display = 'none';
        }

        new Promise(r => setTimeout(r, 1000));
        lvlup_btn1.disabled = false;
        lvlup_btn2.disabled = false;
    });
}

