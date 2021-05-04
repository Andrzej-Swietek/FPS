let state = {
    mode: 'wall',
    modes: ['wall','enemy','light', 'treasure'],
    level: [] // tablica objektów
};
// const checkIfIncludes = (tab,obj) => {
//     tab.forEach( o => {
//         console.log(o,obj, o.z === obj.z)
//         if ( o.x == obj.x && o.z == obj.z ) return true;
//     })
//     return false;
// }

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
                    id:state.level.length,
                    "x": parseInt(div.dataset.x), "y": 0, "z": parseInt(div.dataset.y),
                    "type": state.mode
                };
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


                document.querySelector('#json').value = JSON.stringify(state.level,null, 2);
                // TODO: dorobic zmiane scian i wrzucanie w statea.level
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
           });
       });
    })
});