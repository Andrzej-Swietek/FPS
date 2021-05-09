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
        const response = await fetch("http://localhost:5000/load", {
            method: "POST",
            body: JSON.stringify({}),
            mode: "no-cors",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              "Access-Control-Allow-Origin": "*"
            }
        });
        let json = await response.json();
        console.log(json)
    };
}
