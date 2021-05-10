export default class Net {

    constructor() {
        this.baseUrl = 'http://localhost:5000';
        this.loadUrl = this.baseUrl + '/load';
    }

    // async getMap(){
    //     // let res = await  fetch(this.loadUrl,{
    //     //     method: 'POST',
    //     //     mode: 'no-cors',
    //     //     headers: {
    //     //         'Content-Type': 'application/json',
    //     //         'Accept': 'application/json',
    //     //         'Access-Control-Allow-Origin': '*'
    //     //     },
    //     // })
    //     //
    //     // let stringified = JSON.stringify(res);
    //     // let parsedObj = JSON.parse(stringified);
    //     // console.log(parsedObj)
    //     // return parsedObj
    //
    //     let _data = {
    //     }
    //
    //     return await fetch(this.loadUrl, {
    //         method: "POST",
    //         body: JSON.stringify(_data),
    //         mode: 'no-cors',
    //         headers: {
    //             "Content-type": "application/json; charset=UTF-8",
    //             'Access-Control-Allow-Origin': '*'
    //         }
    //     });
    //
    //
    // }

    async getMap()  {
        // fetch("http://localhost:5000/load", {
        //     method: "post",
        //     mode: "no-cors",
        //     headers: {
        //       // "Content-type": "text/plain; charset=UTF-8",
        //         "Content-type": "application/json; charset=UTF-8",
        //       "Access-Control-Allow-Origin": "*"
        //     }
        // }).then( res => res.json())
        //     .then(data => {
        //     console.log(data)
        // })
        return new Promise( resolve => {
            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    let ob=JSON.parse(this.responseText); // JSON.stringify
                    console.log(ob)
                    resolve(ob)
                }
            };
            xhttp.open("POST", "http://localhost:5000/load", true);
            xhttp.setRequestHeader("Content-type", "text/plain; charset=UTF-8",);
            xhttp.send();
        })

    };


}
