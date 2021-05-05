function start(){
    
    const initial = document.getElementById('initial').value;
    const allowancerate = parseFloat(document.getElementById('allowances').value);
    const GR = parseFloat(document.getElementById('growthrate').value);
    const time = parseFloat(document.getElementById('time').value);
    
    let promo_years = document.getElementsByName('promotion');
    let promo_amount = document.getElementsByName('end');

    promo_years = sanitize_years(get_promotions(promo_years));
    promo_amount = sanitize_years(get_promotions(promo_amount));

    main(0, time, initial, GR);

    function main(i, year, starting, GR){
        if(i >= year) return;

        results = calculate(i, starting, GR);
        output(results, i);

        i = i+1;
        starting = results.starting;
        main(i, year, starting, GR);
    }

    function calculate(i, starting, GR){
        if(i == promo_years[0]) return hike(starting);
        if(i == 0) return {starting, growth: 0};
        return normalYear(starting, GR);
    }
    function hike(starting){
        if(promo_amount[0].includes('%')) return percentageHike(starting);
        return absoluteHike(starting);
    }
    function percentageHike(starting){
        growth = clear_mark(promo_amount[0], '%') ;
        promo_amount.shift();
        promo_years.shift()
        return {starting:starting * (1 + growth/100), growth};
    }
    function absoluteHike(starting){
        prev_start = starting;
        starting = promo_amount[0];
        growth = parseFloat(((starting/prev_start) -1 ) *100).toFixed(2);
        promo_amount.shift();
        promo_years.shift();
        return {starting, growth};
    }
    function normalYear(starting, GR){
        return {starting:starting * (1 + GR/100), growth:GR};
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
        return new_array; 
    }

    function sanitize_years(array) {
        let new_array = [];
        for(i = 0, k = array.length; i<k ;i++){
            array[i] != '' || array[i] != 0? new_array.push(array[i]): new_array = new_array;
        }
        return new_array;
    }

    function output(results, i){
        //takes object

        const init = parseFloat(results.starting).toFixed(2);
        const allo = parseFloat( init * (allowancerate/100)).toFixed(2);
        const tot = parseFloat(init + allo).toFixed(2);
        const G = results.growth;

        const table = document.getElementById('result');
        const row = document.createElement('TR');
        row.innerHTML = `
            <tr>
                <td>${i + 1}</td>
                <td>${init}</td>
                <td>${allo}</td>
                <td>${tot}</td>
                <td>${G}</td>
            <tr>`;
            table.appendChild(row);
    }

}
/** LISTEN FOR FUNCTION CALL */
document.getElementById('do').addEventListener('click', start);
document.querySelector('#add').addEventListener('click', () =>{
    let container = document.createElement('div');
    let yearField = document.createElement('input');
    let hikeField = document.createElement('input');

    container.classList.add('promo')
    yearField.setAttribute('name','promotion');
    yearField.placeholder = 'year';
    yearField.setAttribute('type', 'number');
    hikeField.setAttribute('name','end')
    hikeField.setAttribute('type', 'text');
    hikeField.placeholder = 'hike';

    container.append(yearField);
    container.append(hikeField);

    document.querySelector('.promos').append(container);
})