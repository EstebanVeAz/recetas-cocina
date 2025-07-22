const recetas = [
  {
    id: 1,
    nombre: "Pastel de choclo",
    descripcion:
      "Un delicioso pastel de choclo con una base de maíz y carne molida.",
    categoria: "Plato principal",
    ingredientes: [
      "1 kg de choclo desgranado",
      "500 g de carne molida",
      "1 cebolla picada",
      "Aceitunas negras",
      "Huevos duros",
      "Sal y pimienta",
    ],
    pasos: [
      "Saltear la cebolla hasta que esté transparente.",
      "Agregar la carne y cocinar por 10 minutos.",
      "Licuar el choclo con un poco de leche hasta formar una pasta.",
      "En una fuente, poner la carne, aceitunas y huevos.",
      "Cubrir con la pasta de choclo y hornear por 30 minutos a 180°C.",
    ],
    imagen: "assets/img/pastel-de-choclo.jfif",
  },
  {
    id: 2,
    nombre: "Fajitas de pollo",
    descripcion:
      "Fajitas de pollo con pimientos y cebolla, servidas con tortillas de harina.",
    categoria: "Plato principal",
    ingredientes: [
      "500 g de pechuga de pollo",
      "1 pimiento rojo",
      "1 pimiento verde",
      "1 cebolla",
      "Tortillas de harina",
      "Especias al gusto (comino, pimentón, sal)",
    ],
    pasos: [
      "Cortar el pollo en tiras y sazonar con las especias.",
      "Saltear el pollo en una sartén caliente hasta que esté dorado.",
      "Agregar los pimientos y la cebolla, cocinar hasta que estén tiernos.",
      "Servir en tortillas de harina con salsa al gusto.",
    ],
    imagen: "assets/img/fajitas-pollo.jpg",
  },
  {
    id: 3,
    nombre: "rollitos de canela",
    descripcion: "Deliciosos rollitos de canela con glaseado de queso crema.",
    categoria: "Postre",
    ingredientes: [
      "2 tazas de harina",
      "1/2 taza de azúcar",
      "1 cucharada de canela en polvo",
      "1/2 taza de mantequilla derretida",
      "1/2 taza de leche",
      "1 huevo",
      "1/2 cucharadita de sal",
      "1/2 taza de queso crema",
    ],
    pasos: [
      "Precalentar el horno a 180°C.",
      "En un bol, mezclar la harina, azúcar, canela y sal.",
      "Agregar la mantequilla derretida, leche y huevo, mezclar bien.",
      "Extender la masa en una superficie enharinada y enrollar.",
      "Cortar en rollos y colocarlos en una bandeja para hornear.",
      "Hornear por 20-25 minutos hasta que estén dorados.",
      "Mientras tanto, mezclar el queso crema con un poco de azúcar y untar sobre los rollos calientes.",
    ],
    imagen: "assets/img/rollito-canela.jpg",
  },
];
$(document).ready(function () {
  mostrarRecetas(recetas);
});
function mostrarRecetas(lista) {
  $("#lista-recetas").empty();

  lista.forEach((receta) => {
    $("#lista-recetas").append(`
      <div class="col-md-4 mb-4">
        <div class="card card-receta">
          <img src="${receta.imagen}" class="card-img-top" alt="${receta.nombre}">
          <div class="card-body text-center">
            <h5 class="card-title">${receta.nombre}</h5>
            <p class="card-text">${receta.descripcion}</p>
            <span class="badge bg-success">${receta.categoria}</span>
            <br><br>
            <button class="btn btn-primary ver-receta" data-bs-toggle="modal" data-bs-target="#recetaModal" data-id="${receta.id}">Ver Receta</button>
          </div>
        </div>
      </div>
    `);
  });
}

$(document).on("click", ".ver-receta", function () {
  const recetaId = $(this).data("id");
  const receta = recetas.find((r) => r.id === recetaId);

  if (receta) {
    $("#recetaModalLabel").text(receta.nombre);
    $("#recetaImagen").attr("src", receta.imagen).attr("alt", receta.nombre);

    $("#recetaIngredientes").empty();
    receta.ingredientes.forEach((ing) => {
      $("#recetaIngredientes").append(`<li>${ing}</li>`);
    });

    $("#recetaPasos").empty();
    receta.pasos.forEach((paso) => {
      $("#recetaPasos").append(`<li>${paso}</li>`);
    });
  }
});

$("#buscador, #filtro-categoria").on("input change", function () {
  filtrarRecetas();
});

// para filtrar por nombre o categoria del plato
function filtrarRecetas() {
  const texto = $("#buscador").val().toLowerCase();
  const categoria = $("#filtro-categoria").val();

  const filtradas = recetas.filter((receta) => {
    const coincideTexto =
      receta.nombre.toLowerCase().includes(texto) ||
      receta.categoria.toLowerCase().includes(texto);
    const coincideCategoria = categoria ? receta.categoria === categoria : true;

    return coincideTexto && coincideCategoria;
  });

  mostrarRecetas(filtradas);
}
$("#formSugerencias").on("submit", function (e) {
  e.preventDefault();

  const nombre = $("#nombreReceta").val().trim();
  const descripcion = $("#descripcionReceta").val().trim();
  const ingredientes = $("#ingredientesReceta")
    .val()
    .split(",")
    .map((i) => i.trim());
  const pasos = $("#pasosReceta")
    .val()
    .split(",")
    .map((p) => p.trim());

  if (
    !nombre ||
    !descripcion ||
    ingredientes.length === 0 ||
    pasos.length === 0
  ) {
    $("#mensajeSugerencia")
      .text("Por favor completa todos los campos.")
      .addClass("text-danger")
      .removeClass("text-success");
    return;
  }

  alert(`Gracias por tu sugerencia: "${nombre}"`);

  this.reset();
});
