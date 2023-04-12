//ECMAScript 7

const nombres = ["ale", "gasti", "eli", "alvi"];
const numeros = [1,2,3];

if(nombres.includes("andre")){
    console.log("ya esta");
}else{
    nombres.push("andre")
}

nombres.shift();
nombres.pop();

//ECMAScript 8

arrayLg = {
    nombre: "gasti",
    edad: 26,
    dni: 123456
};

const arrayPropiedades = Object.keys(arrayLg);
const arrayValues = Object.values(arrayLg);
const todo = Object.entries(arrayLg);

console.log(arrayPropiedades,arrayValues,todo);

todo.forEach((item, i)=> console.log(i,item));

// actividad practica

const objetos =  [
	{
		manzanas:3,
		peras:2,
		carne:1,
		jugos:5,
		dulces:2
	},
	{
		manzanas:1,
		sandias:1,
		huevos:6,
		jugos:1,
		panes:4
	}
]

const lista = [];

objetos.forEach(element =>{
    Object.keys(element).forEach(i => {
        lista.push(i)

        lista.includes(i)? lista:
    })
});

console.log(lista);