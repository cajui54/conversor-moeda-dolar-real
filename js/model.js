class Model{
    constructor(){
        this.url = 'https://economia.awesomeapi.com.br/last/USD-BRL';
    }
    async loadAPIDolar(){
       return await fetch(this.url)
       .then(respone =>{
           return respone.json();
       })
       .then(_dataDolar=>{
            return _dataDolar;
       })
       .catch( erroAPI =>{
            alert('Ocorreu um erro, '+erroAPI);
       });
    }

    async totallyInReal(_dolar){
        let getValueDolar = await this.loadAPIDolar();
        return parseFloat(getValueDolar.USDBRL.ask) * _dolar;
    }
    async totallyInDolar(_real){
        let getValueDolar = await this.loadAPIDolar();
        return _real /parseFloat(getValueDolar.USDBRL.ask);
    }
    
}