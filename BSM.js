const readlineSync = require(`readline-sync`);

let cantidad_maletas = 0;
let cantidad_maletas_ingresadas = 0;
let contadorPersonasGeneroFemenino = 0;
let contadorPersonasGeneroMasculino = 0;
let suma_maletas_f = 0;
let suma_maletas_m = 0;
let suma_total_peso = 0;
let peso_maximo = 0;
let seleccionesPorCiudad = {};
let ciudadMasSeleccionada = "";
let maxSelecciones = 0;

function registro_maletas(){

    console.info(`Cantidad de maletas que han ingresado: ${cantidad_maletas_ingresadas} de ${cantidad_maletas}`);

    let can_invalida= false;

    let ciudades = [
        `San Andres`,
        `Pereira`,
        `Medellin`,
        `Cali`,
        `Manizales`,
        `Barranquilla`,
        `Bogota`
    ];

    let peso_cost_max = +readlineSync.question(`Ingrese el valor del peso maximo que puede tener una maleta: `);
    let costo_kg_adicional = 5000;
    
    do{
        if (isNaN(peso_cost_max)){
    
            console.error(`El valor ingresado no es un valor numerico`);
            can_invalida = true;
        }    
        else{

            if(peso_cost_max < 0){

                console.error(`El valor ingresado no puede ser negativo`);
                can_invalida = true;
            }
            else{

                let origen = readlineSync.question(`Ingrese el origen de la maleta: `);
                console.log(`el Origen es: ${origen}!`);
        
                let num_vuelo = readlineSync.question(`Ingrese el numero de vuelo: `);
                console.log(`el numero de vuelo es: ${num_vuelo}!`);                
                
                let ciudad_seleccionada = -1;
                while (ciudad_seleccionada === -1) {
                    ciudad_seleccionada = readlineSync.keyInSelect(ciudades, `Seleccione la ciudad de destino: `);
                
                    if (ciudad_seleccionada === -1) {
                        console.log(`Se requiere que seleccione una ciudad de destino.`);
                    }
                }
                
                if (ciudad_seleccionada !== -1) {
                    let ciudadSeleccionada = ciudades[ciudad_seleccionada];
                    seleccionesPorCiudad[ciudadSeleccionada] = (seleccionesPorCiudad[ciudadSeleccionada] || 0) + 1;
                }

                for (const ciudad in seleccionesPorCiudad) {
                    if (seleccionesPorCiudad[ciudad] > maxSelecciones) {
                        maxSelecciones = seleccionesPorCiudad[ciudad];
                        ciudadMasSeleccionada = ciudad;
                    }
                }
                let peso_maleta = +readlineSync.question(`Ingrese el peso de la maleta en KG: `);
                                           
                if (isNaN(peso_maleta)){
            
                    console.error(`El peso de la maleta ingresada no es un valor numerico`);
                    can_invalida = true;            
                }
                else{
            
                    if(peso_maleta < 0){
            
                        console.error(`El peso de la maleta ingresada no puede ser negativo`);
                        can_invalida = true;        
                    }
                    else{

                        if(peso_maleta > peso_maximo){
                            peso_maximo = peso_maleta
                        }

                        cantidad_maletas_ingresadas++;
                        suma_total_peso = peso_maleta + suma_total_peso;

                        let hay_promo = readlineSync.question(`Va a realizar prococión de equipaje por destino? s/n : `);

                        if(hay_promo.toLowerCase() == `s`){
                            
                            promocion = readlineSync.keyInSelect(ciudades, `Selecciona el destino de la promación : `);

                            if(promocion == ciudad_seleccionada){

                                if(peso_maleta > 23 ){
            
                                    let peso_adicional = peso_maleta - 23;                    
                                    let costo_adicional = peso_adicional * costo_kg_adicional;                    
                                    let costo_total = peso_cost_max + costo_adicional;
                                    let costo_des = (costo_total * 15) / 100;
                                    costo_total = costo_total - costo_des;                  
                                    console.log(`el costo total es: ${costo_total}`);                    
                                }
                                else{

                                    let costo_des = (peso_cost_max * 15) / 100;
                                    peso_cost_max = peso_cost_max - costo_des;                    
                                    console.log(`el costo total es: ${peso_cost_max}`);                  
                                }
                            }else{
                                if(peso_maleta > 23 ){
        
                                    let peso_adicional = peso_maleta - 23;                    
                                    let costo_adicional = peso_adicional * costo_kg_adicional;                    
                                    let costo_total = peso_cost_max + costo_adicional;                    
                                    console.log(`el costo total es: ${costo_total}`);                    
                                }
                                else{
                    
                                    console.log(`el costo total es: ${peso_cost_max}`);                  
                                }
                            }
                        }else{

                            if(peso_maleta > 23 ){
        
                                let peso_adicional = peso_maleta - 23;                    
                                let costo_adicional = peso_adicional * costo_kg_adicional;                    
                                let costo_total = peso_cost_max + costo_adicional;                    
                                console.log(`el costo total es: ${costo_total}`);                    
                            }
                            else{
                
                                console.log(`el costo total es: ${peso_cost_max}`);                  
                            }
                        }
                    }
                }  
                
                let genero = readlineSync.question(`Ingrese genero del dueño de la maleta f/m: `);                

                if(genero.toLowerCase() == `f`){
                    contadorPersonasGeneroFemenino++;
                    suma_maletas_f = peso_maleta + suma_maletas_f;
                }
                else 
                {
                    contadorPersonasGeneroMasculino++;                    
                    suma_maletas_m = peso_maleta + suma_maletas_m
                }
            }       
        }
    }while(can_invalida == true);  
}


cantidad_maletas = +readlineSync.question(`Ingrese la cantidad de maletas a registrar: `);

if(isNaN(cantidad_maletas)){
    console.error(`La cantidad de maletas debe ser un numero`);
    can_invalida = true;
}
else if(cantidad_maletas <= 0) {
    console.error(`La cantidad de maletas debe ser un valor positivo`);
    can_invalida = true;
}
else {
    while(cantidad_maletas_ingresadas < cantidad_maletas){
        registro_maletas();
    }

    console.log(`La ciudad más seleccionada es: ${ciudadMasSeleccionada}`);
    console.info(`El peso total de las maletas que van en el avión es: ${suma_total_peso}`);
    let promedio_edad_f = suma_maletas_f / contadorPersonasGeneroFemenino;
    let promedio_edad_m = suma_maletas_m / contadorPersonasGeneroMasculino;
    console.info(`El promedio del peso de las maletas de las mujeres es: ${promedio_edad_f}KG`);
    console.info(`El promedio del peso de las maletas de los hombres es: ${promedio_edad_m}KG`);
    console.info(`La maleta mas pesada es de: ${peso_maximo}KG`);
}
console.info(`Fin del programa`);