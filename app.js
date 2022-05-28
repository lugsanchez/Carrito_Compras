const contenedor = document.querySelector("main");
const selectProducts = document.getElementById("select-products");
const addProduct = document.getElementById('addProduct');


let imgSelect = " ";
let idProduct = 0

//elementos de la modal
const modal = document.querySelector('.modal');
const newProduct = document.getElementById('newProduct');
const newPrice = document.getElementById('newPrice');
const newImage = document.getElementById('newImage');
const btnNew = document.getElementById('btnNew');
const closeModal = document.getElementById('closeModal');
const container = document.getElementById('contenedor')
const filterPrice = document.getElementById('filter');

window.addEventListener('load', listSelect);
selectProducts.addEventListener('change', renderCard);
addProduct.addEventListener('click', showModal);
btnNew.addEventListener('click', newCreateProduct);
///entregar la ruta de la imagen
newImage.addEventListener('change', importImg);
closeModal.addEventListener('click', ()=> modal.style.display = 'none');
filterPrice.addEventListener('click', filterProduct);

function renderCard() {  
  utiles.map(papeleria => { papeleria.product === selectProducts.value ? createCards(papeleria): null});
}

function listSelect() {
  selectProducts.innerHTML = '';
  utiles.map( papeleria => {
    const option = document.createElement('option');
    option.value = papeleria.product;
    option.textContent = papeleria.product;    
    selectProducts.appendChild(option);
  })
}

function createCards(utiles) {

  const {product, image, id ,price} = utiles;

  const card = document.createElement('div');
  card.classList.add('card-product');

  const imgCard = document.createElement('img');
  imgCard.setAttribute('src', image);
  imgCard.setAttribute('alt', product);
  imgCard.classList.add('img-product');

  const nameCard = document.createElement('p');
  nameCard.textContent = product;
  nameCard.classList.add('name-product');

  const priceCard = document.createElement('p');
  priceCard.textContent = price;
  priceCard.classList.add('price-product');


  const btnAdd = document.createElement('button');
  btnAdd.textContent = 'Add';
  btnAdd.classList.add('btn-add');
  btnAdd.setAttribute('id', id);


  const btnDelete = document.createElement('button');
  btnDelete.setAttribute('id', id);
  btnDelete.textContent = 'Cancel';
  btnDelete.classList.add('btn-delete');
  btnDelete.addEventListener('click',deletCard);

  card.appendChild(imgCard);
  card.appendChild(nameCard);
  card.appendChild(priceCard);
  card.appendChild(btnAdd);
  card.appendChild(btnDelete);


  contenedor.appendChild(card);


  function deletCard(){
    card.remove();
  }
}

function showModal() {
  modal.style.display = 'flex';
}

function newCreateProduct(){
  idProduct++;
  const nameProduct = newProduct.value;
  const priceProduct = newPrice.value;
  const id = idProduct;
  const newUtil = {id:id,product: nameProduct,price: priceProduct,image: imgSelect};

  utiles.push(newUtil);
  listSelect();
  modal.style.display = 'none';
}

function importImg(event) {
  const Img = event.target.files[0];
  const imgURL = URL.createObjectURL(Img);
  imgSelect = imgURL;
}

function filterProduct(event) {
  const responsefilter  = event.target.value === 'menores a 2'
  //que sucede si es la opcion que se elige ??
  ? utiles.filter (papeleria => papeleria.price <2)
  : event.target.value === 'entre 2 y 4'
  ?utiles.filter (papeleria => papeleria.price >=  2 && papeleria.price <= 4)
  : event.target.value === 'mayores a 4'
  ?utiles.filter (papeleria => papeleria.price >4)
  //cuando ninguno se cumple se retorna null
  :null;

  container.innerHTML = ' ';
  responsefilter.map(utiles => createCards(utiles));
}









           