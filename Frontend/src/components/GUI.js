export default class GUI {
    constructor() {

        let personStats = document.createElement('div');
        personStats.classList.add("personStats");
        let avatar = document.createElement('img');
        avatar.src = "https://i.pinimg.com/originals/a3/6e/fc/a36efc0218e050f8192c5584eb4f363b.jpg";
        let cont = document.createElement('div');
        let hp = document.createElement('div'); hp.classList.add("hp"); hp.innerHTML = `<div class="hp-Progress"></div>`
        let mp = document.createElement('div'); mp.classList.add("mp"); mp.innerHTML = `<div class="mp-Progress"></div>`
        let exp = document.createElement('div');exp.classList.add("exp"); exp.innerHTML = `<div class="exp-Progress"></div>`


        personStats.append(avatar);
        cont.append(hp);
        cont.append(mp);
        cont.append(exp);
        personStats.append(cont);
        document.body.append(personStats);


        let sidebar = document.createElement('div');
        sidebar.id="sidebar";
        let toggle = document.createElement('div');
        toggle.id ="toggle";
        toggle.innerHTML = "<i class=\"fas fa-cogs\"></i>"
        toggle.addEventListener('click', ()=>{
            document.querySelector('.settings').classList.toggle('d-n');
        })
        sidebar.append(toggle);

        let home = document.createElement('div');
        home.id ="home";
        home.innerHTML = "<a href='/'><i class=\"fas fa-home\"></i></a> ";
        sidebar.append(home);


        let toggleHP = document.createElement('div');
        toggleHP.id ="toggleHP";
        toggleHP.innerHTML = "<i class=\"fas fa-user-tie\"></i>"
        toggleHP.addEventListener('click', ()=>{
            document.querySelector('.personStats').classList.toggle('d-n');
            document.querySelector('.personStats').style.display  = (document.querySelector('.personStats').style.display == 'none')? '': 'none';
        })
        sidebar.append(toggleHP);

        document.body.append(sidebar);

        let settings = document.createElement('div');
        settings.classList.add('settings')

        let sliders = ['Camera height', 'Camera X angle','Distance form person', 'Camera view angle Y', 'Camera  fov', 'Light intensity'];
        let chbxs = ['Shadows', 'View From Top', 'Camera behind player'];
        sliders.forEach( silderTitle => {
            let div = document.createElement('div');
            div.classList.add('slider-element-container');

            let desc = document.createElement('h5');
            desc.innerText = `${silderTitle}`
            let input = document.createElement('input');
            input.id = `${silderTitle.replaceAll(' ','-').toLowerCase()}`;
            input.type = 'range';
            input.classList.add("focused")
            input.classList.add("range")
            input.classList.add("rangeM")
            input.min = 0;
            input.max = 1;
            input.value = 0.5;
            input.step = 0.1;

            div.append(desc);
            div.append(input);

            settings.append(div)
        })
        let checkboxes = document.createElement('div');
        checkboxes.classList.add('checkbox-element-container');

        chbxs.forEach( chbx => {
            let row = document.createElement("div");
            let desc = document.createElement('h5');
            desc.innerText = `${chbx}`
            let input = document.createElement('input');
            input.id = `${chbx.replaceAll(' ','-').toLowerCase()}`;
            input.type = 'checkbox';

            row.append(desc)
            row.append(input)
            checkboxes.append(row)
        })
        settings.append(checkboxes)

        document.body.append(settings)
    }


}