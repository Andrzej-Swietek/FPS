let state = {
    mode: 'wall',
    modes: ['wall','enemy','light', 'treasure','delete'],
    level: [] // tablica objektów
};


window.addEventListener("DOMContentLoaded", ()=>{

    // ========= GRID =========
    for (let i = 0; i < 10; i++){
        for (let j = 0; j < 10; j++){
            let div = document.createElement("div");
            div.classList.add("grid-element");
            div.dataset.x = j;
            div.dataset.y = i;
            div.addEventListener('click', (e)=> {
                let obj = {
                    id: (state.level.length > 0)? state.level[state.level.length-1].id+1 : 0,
                    "x": parseInt(div.dataset.x), "y": 0, "z": parseInt(div.dataset.y),
                    "type": state.mode
                };

                if (state.mode !== 'delete'){
                    let duplikaty = state.level.filter(e=> e.x == obj.x && e.z == obj.z);
                    if (duplikaty.length > 0)
                        obj.id = duplikaty[0].id;


                    console.log(e.target, e.target.dataset.x, e.target.dataset.y);
                    state.modes.forEach( m =>{
                        if (e.target.classList.contains(m))
                            e.target.classList.remove(m)
                    })
                    e.target.classList.add(state.mode);

                    state.level = state.level.filter( element => {
                         return (element.x != obj.x || element.z != obj.z)
                    });


                    state.level.push(obj);
                    console.log(state.level)
                } else {
                    let filtered = state.level.filter(e=> !(e.x == obj.x && e.z == obj.z));
                    state.modes.forEach( m =>{
                        if (e.target.classList.contains(m))
                            e.target.classList.remove(m)
                    })
                    state.level = filtered;
                }

                document.querySelector('#json').value = JSON.stringify(state.level,null, 2);

            });
            document.querySelector('.grid').append(div);
        }
    }

    // ========= BUTTONS =========
    state.modes.forEach( m =>{
        document.querySelector(`.element-menu.${m}`).addEventListener('click',(e)=>{
            state.mode = m;
                document.querySelector('.active').classList.remove('active');
                e.target.classList.add('active');
                console.log(state.mode);

        });
    })

    // ========= LOAD/SAVE ========
    document.getElementById("save").addEventListener('click', async ()=>{
        await fetch('/add',{
            method: 'POST',
            // mode: 'cors', // no-cors, *cors, same-origin
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(state.level)
        })
        alert("Game Board saved on Server");
    })
    document.getElementById("load").addEventListener('click', async ()=>{
       fetch('/load',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"test":"doZmiany"})
        }).then((response) => {
           console.log(response);
           response.json().then((data) => {
               console.log(data);
               alert("Game Board loaded from Server")
               state.level = []; // zeruje tablice
               document.querySelectorAll('.grid-element').forEach( element => {
                   element.classList.remove('wall','enemy','light', 'treasure','delete');
               })
               data.forEach( (levelItem) => {
                   document.querySelector(`.grid-element[data-x="${levelItem.x}"][data-y="${levelItem.z}"]`).classList.add(`${levelItem.type}`);
                   state.level.push({ "id": levelItem.id, "x": levelItem.x, "y": levelItem.y, "type": levelItem.type })
               })
               document.querySelector('#json').value = JSON.stringify(state.level,null, 2);
           });
       });
    })
});