// let arr = [{id:1},{id:2}]

// let newId = arr[arr.length - 1] ? arr[arr.length - 1] .id + 1 : 1

// console.log(newId)


let idArray = this.products.map(p =>p.id)

let newProduct = {...product, id: idArray.length === 0 ? 1 : idArray.slice(-1)[0]+1

}