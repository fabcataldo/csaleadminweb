class Accessories{
    static formatDate(date){
        var tmp = new Date(date)
        return tmp.getDate()+'/'+(newDateOfPurchase.getMonth().toString().length < 2 ? '0' 
            + newDateOfPurchase.getMonth() : (newDateOfPurchase.getMonth() + 1) ) +
            '/'+tmp.getFullYear()+' '+tmp.getHours()+':'+tmp.getMinutes()+':'+tmp.getSeconds();
    }
}

export default Accessories;