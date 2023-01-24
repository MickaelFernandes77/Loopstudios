// debounce: função que atrasa a execução de outras funções
const debounce = function (func, wait, immediate) {
  let timeout;
  return function (...args) {
    const context = this;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

// selecionando todos os elementos com data anime
const target = document.querySelectorAll("[data-anime]");
// classe animate, que será adiconada aos elementos
const animationClass = "animate";

// função que faz a animação
function animeScroll() {
  //pageYOffset: retorna o valor do eixoY da pagina
  //calculo para adicionar a animação
  const windowTop = window.pageYOffset + ((window.innerHeight * 3) / 4);

  //foreach no target, para pegar a distância de cada um dos elementos ao offSetY da pagina
  target.forEach(function (element) {
    // element: se refere aos proprios elementos selecionados
    // adicionando o elemento animate nos elementos
    if (windowTop > element.offsetTop) {
      element.classList.add(animationClass);
    } else {
      element.classList.remove(animationClass);
    }
  });
}

animeScroll();

if (target.length) {
  // função que escuta o scroll, e executa a função animeScroll
  window.addEventListener(
    "scroll",
    debounce(function () {
      animeScroll();
    }, 200)
  );
}
