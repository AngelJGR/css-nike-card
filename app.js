const sizes = document.querySelectorAll('.size');
const colors = document.querySelectorAll('.color');
const shoes = document.querySelectorAll('.shoe');
const gradients = document.querySelectorAll('.gradient');
const shoeBG = document.querySelector('.shoeBackground');
let prevColor = "blue";
let animationEnd = true;

sizes.forEach(size => size.addEventListener("click", changeSize));
colors.forEach(color => color.addEventListener("click", changeColor));

function changeSize(){
    sizes.forEach(size => size.classList.remove('active'));
    this.classList.add('active');
}

function changeColor(){
    if (!animationEnd) return;
    let primary = this.getAttribute("primary");
    document.documentElement.style.setProperty('--primary', primary);

    let color = this.getAttribute('color');
    colors.forEach(c => c.classList.remove('active'));
    this.classList.add('active');

    shoes.forEach(s => s.classList.remove('show'));
    let shoe = document.querySelector(`.shoe[color="${color}"]`);
    shoe.classList.add("show");

    gradients.forEach(g => g.classList.remove("first", "second"));
    let gradient = document.querySelector(`.gradient[color="${color}"]`);
    let prevGradient = document.querySelector(`.gradient[color="${prevColor}"]`);
    gradient.classList.add("first");
    prevGradient.classList.add("second");
    prevColor = color;

    animationEnd = false;
    gradient.addEventListener("animationend", () => {
        animationEnd = true;
    })
}

let x = window.matchMedia('(max-width: 1000px)');
function changeHeight (){
    if (x.matches) {
        let shoeHeight = shoes[0].offsetHeight;
        shoeBG.style.height = `${shoeHeight * 0.9}px`;
    }
    else {
        shoeBG.style.height = '475px';
    }
}

changeHeight();
window.addEventListener('resize', changeHeight);