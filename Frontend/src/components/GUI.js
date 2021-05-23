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
            input.min = 1;
            input.max = 100;
            input.value = 50;
            if (silderTitle === 'Camera  fov')
                input.value = 1;
            else if(silderTitle === 'Light intensity') {
                input.value = 25
                input.max = 200;
            }
            else if (silderTitle === 'Camera X angle'){
                input.value = 100
                input.max = 200;
            }
            input.step = 1;

            div.append(desc);
            div.append(input);

            settings.append(div)
        })

        let fireplaceSettings = document.createElement('div');
        fireplaceSettings.classList.add('fire-settings-element-container');

        let row1 = document.createElement('div');
        this.createDescription(row1,'Fire Size')
        this.createInput(row1, 'Fire Size',1,400,50);

        let row2 = document.createElement('div');
        this.createDescription(row2,'Fire Width X')
        this.createInput(row2, 'Fire Width X',1,500,50);

        let row3 = document.createElement('div');
        this.createDescription(row3,'Fire Width Z')
        this.createInput(row3, 'Fire Width Z',1,500,50);

        fireplaceSettings.append(row1)
        fireplaceSettings.append(row2)
        fireplaceSettings.append(row3)
        settings.append(fireplaceSettings)

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

    createInput(container, id,min,max,v){
        let input = document.createElement('input');
        input.id = id.replaceAll(' ','-').toLowerCase();
        input.type = 'range';
        input.classList.add("focused")
        input.classList.add("range")
        input.classList.add("rangeM")
        input.min = min;
        input.max = max;
        input.value = v;
        input.step = 1;
        container.append(input)
    }
    createDescription(container, sliderTitle){
        let desc = document.createElement('h5');
        desc.innerText = `${sliderTitle}`
        container.append(desc)
    }


}
