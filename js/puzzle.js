const $divContainer = document.querySelector(".piezas");
const $divTablero = document.querySelector(".tablero");

// let $divContainerCell = null

let totalPiezas = 24;
let piezas = [];
// const sizePiezas = [
//     { 'id' :  1, 'top':   0, 'left':   0  },
//     { 'id' :  2, 'top':   0, 'left': 129  },
//     { 'id' :  3, 'top':   0, 'left': 230  },
//     { 'id' :  4, 'top':   0, 'left': 386  },
//     { 'id' :  5, 'top':   0, 'left': 487  },
//     { 'id' :  6, 'top':   0, 'left': 644  },
//     { 'id' :  7, 'top': 101, 'left':   0  },
//     { 'id' :  8, 'top': 129, 'left': 101  },
//     { 'id' :  9, 'top': 101, 'left': 257  },
//     { 'id' : 10, 'top': 129, 'left': 359  },
//     { 'id' : 11, 'top': 101, 'left': 515  },
//     { 'id' : 12, 'top': 129, 'left': 617  },
//     { 'id' : 13, 'top': 256, 'left':   0  },
//     { 'id' : 14, 'top': 230, 'left': 129  },
//     { 'id' : 15, 'top': 256, 'left': 230  },
//     { 'id' : 16, 'top': 230, 'left': 386  },
//     { 'id' : 17, 'top': 256, 'left': 488  },
//     { 'id' : 18, 'top': 230, 'left': 644  },
//     { 'id' : 19, 'top': 358, 'left':   0  },
//     { 'id' : 20, 'top': 386, 'left': 101  },
//     { 'id' : 21, 'top': 358, 'left': 257  },
//     { 'id' : 22, 'top': 385, 'left': 359  },
//     { 'id' : 23, 'top': 358, 'left': 515  },
//     { 'id' : 24, 'top': 385, 'left': 617  },
// ]

const crearPiezas = () => {
  for (let i = 1; i <= 24; i++) {
    piezas.push(i);
  }
  piezas.sort(() => Math.random() - 0.5);
  return piezas;
};

const crearPuzzle = () => {
  crearPiezas();
  piezas.forEach((pieza) => {
    const $img = document.createElement("img");
    $img.id = `img-${pieza}`;
    $img.classList.add("pieza");
    $img.draggable = true;
    $img.src = `./assets/images/${pieza}.png`;
    $divContainer.appendChild($img);
  });
};

crearPuzzle();

const crearTablero = () => {
  for (let i = 1; i <= 24; i++) {
    const $divTableroCell = document.createElement("div");
    $divTableroCell.classList.add("tablero__cel");
    $divTableroCell.dataset.id = i;
    $divTableroCell.classList.add(`pos-${i}`); 
    $divTableroCell.classList.add("pieza__tablero");   
    // const $img = document.createElement("img");
    // $img.dataset.id = `pos-${i}`;
    // $img.classList.add("pieza__tablero");
    // $img.classList.add(`p${i}`);
    // $img.setAttribute("src", `./assets/images/${i}.png`);
    // $divTableroCell.appendChild($img);
    $divTablero.appendChild($divTableroCell);
  }
};

const crearContenedor = () => {
  const $divContainerCell = document.querySelectorAll(".pieza__tablero");
  const $divPiezaMovil    = document.querySelectorAll(".pieza");

  $divPiezaMovil.forEach(element => {
    element.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("id", e.target.id);
      });
  });

  $divContainerCell.forEach(element => {
    element.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    element.addEventListener("drop", (e) => {
      e.preventDefault();
      const id = e.dataTransfer.getData("id");
      const numero = id.split("-")[1];
      if(numero === e.target.dataset.id) {
          e.target.appendChild(document.getElementById(id));
          totalPiezas--;
          if(totalPiezas === 0) {
            const fondo = document.createElement('img');
            fondo.src = './assets/images/fondo.png';
            fondo.classList.add('fondoHidden');
            fondo.style.opacity = '0';
            $divTablero.appendChild(fondo);
              setTimeout(() => {
                  fondo.style.opacity = '1';
                }, 1000);
          }
      }
    });
  });
  
};

crearTablero();
crearContenedor();
