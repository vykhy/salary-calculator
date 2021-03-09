
function getpromos(x){
    let y = [];
    for(i=0,k=x.length;i<k;i++){
        y.push(x[i].value);
    }
    // console.log(y)
    return y;   
}    

function output(yea,initi,allo,tot,G){
    // console.log('output working')

    /* TO APPEND DATA TO HTML TABLE */
    let values =[initi,allo,to,G];
    values = values.map( a => parseInt(a));
    values = values.map(a => a.toFixed(2));
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

    // console.log(yea,initi,allo,tot)
    // console.log(row);
}

// console.log('its working')

function calculate(){

    // console.log('function working')
    
    /** GET INPUT VALUES */

    let initial = document.getElementById('initial').value;
    let allowancerate = document.getElementById('allowances').value;
    let GR = document.getElementById('growthrate').value;
    let time = document.getElementById('time').value;
    let total = 0 ;
    let pGR = 0;
    let promo_years = document.getElementsByName('promotion');
    let promo_amount = document.getElementsByName('end');

    // console.log(promo_amount,promo_years);

    promo_years = getpromos(promo_years);
    promo_amount = getpromos(promo_amount);

    // console.log(promo_amount,promo_years);


    /** LOOP TO CALCULATE RESULTS FOR EACH YEAR */

    for(let i=0; i < time ; i++){

        /* CHECK IF THIS YEAR IS PROMOTION */
         if( i == promo_years[0]){

             /** IF HIKED SALARY GIVEN IN PERCENTAGE */

            if(promo_amount[0].includes('%')){
                pGR = promo_amount[0];
                pGR.replace('%','');
                parseInt(pGR);
                console.log(initial);
                initial = initial + (initial * (pGR/100));
                allowance = initial * (allowancerate/100);
                console.log(initial);
            }
            /** IF ABSOLUTE AMOUNT */
            else{
                initial = promo_amount[0];
                parseInt(initial);
                allowance = initial * (allowancerate/100);
            }
            total = parseInt(initial) + parseInt(allowance);
            promo_amount.shift();
            promo_years.shift();
           
    
        }

        /** IF NO PROMOTION */
        // console.log('loop working')
        else if (i !== 0){
            initial = initial * ( 1 + (GR/100));
            allowance = initial * (allowancerate/100);
            total = initial + allowance;
            // console.log('year',i)
        }

        /** NO GROWTH RATE FOR YEAR 0*/
        else if( i == 0){
            initial = initial;
            allowance = initial * (allowancerate/100);
            total = parseInt(initial) + (allowance);
            // console.log('first year');
        }
        
        /** KEEP TRACK OF YEAR IN TABLE*/
        let year = i+1;

        let values =[initial,allowance,total,GR];
        values = values.map( a => parseInt(a));
        values = values.map(a => a.toFixed(2));

        /** OUTPUT TO TABLE */
        output(year,initial,allowance,total,GR);  
    }
}

/** LISTEN FOR FUNCTION CALL */
document.getElementById('do').addEventListener('click', calculate);