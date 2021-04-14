

function main() {

    const initial = document.getElementById('initial').value;
    let allowancerate = parseFloat(document.getElementById('allowances').value);
    let GR = parseFloat(document.getElementById('growthrate').value);
    const time = parseFloat(document.getElementById('time').value);

    let starting = 0;
    let allowance = 0;
    let G = 0;
    let total = 0 ;
    
    let promo_years = document.getElementsByName('promotion');
    let promo_amount = document.getElementsByName('end');

    promo_years = sanitize_years(get_promotions(promo_years));
    promo_amount = get_promotions(promo_amount);

    for(i=0;i<time;i++){
        //if promotion
        if(i == promo_years[0]){
            if(promo_amount[0].includes('%')){
                G = clear_mark(promo_amount[0], '%');
                //i was incremented at this line for some unknown reason causing skipped years
                i -= 1;
                console.log(i, 'after G')
                starting = parseFloat(starting) * (1 + (parseFloat(G)/100));
                allowance = parseFloat(starting)  * parseFloat(allowancerate/100);
                total = parseFloat(starting) + parseFloat(allowance);
                // console.log(i, G, starting, allowance, total, typeof(total));
            }
            else{
                //if absolute amount
                let prev_start = starting;
                starting = promo_amount[0];
                allowance = starting * (allowancerate/100);
                total = parseFloat(starting) + parseFloat(allowance);
                G = ((starting/prev_start) -1 ) *100 ;
            }
            promo_amount.shift();
            promo_years.shift();
            console.log(promo_years);

        }
         //if year 0
        else if(i == 0){
            starting = initial;
            allowance = starting * (allowancerate/100);
            total = parseFloat(starting) + parseFloat(allowance);
            G = 0;
        }
        else{
        //else if no promotion
            starting = parseFloat(starting)  * (1 + (parseFloat(GR)/100));
            allowance = parseFloat(starting) * (allowancerate/100);
            total = parseFloat(starting) + parseFloat(allowance);
            G = GR;
        }

        let year = i + 1;
        starting = parseFloat(starting);
        G = parseFloat(G);
        // let values = [year,starting,allowance,total,G];.toFixed(2)
        output(year,starting.toFixed(2),allowance.toFixed(2),total.toFixed(2),G.toFixed(2));

    }

}

function clear_mark(str, mrk) {
    int = '';
    for(i=0, l=str.length; i<l ; i++){
        if(str[i] != mrk){
            int += str[i];
        }
    }
    int = parseFloat(int);
    return int;
}

function get_promotions(x){
    let new_array = [];
    for(i=0,k=x.length;i<k;i++){
        new_array.push(x[i].value);
    }
    // console.log(new_array)
    return new_array; 
}

function sanitize_years(array) {
    let new_array = [];
    for(i = 0, k = array.length; i<k ;i++){
        array[i] != '' || array[i] != 0? new_array.push(array[i]): new_array = new_array;
    }
    return new_array;
}

function output(yea,initi,allo,tot,G){
    
    /* TO APPEND DATA TO HTML TABLE */

    let table = document.getElementById('result');
    let row = document.createElement('TR');
    row.innerHTML = `
        <tr>
            <td>${yea}</td>
            <td>${initi}</td>
            <td>${allo}</td>
            <td>${tot}</td>
            <td>${G}</td>
        <tr>`;
        table.appendChild(row);
}


/** LISTEN FOR FUNCTION CALL */
document.getElementById('do').addEventListener('click', main);