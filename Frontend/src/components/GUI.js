export default class GUI {
    constructor() {

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