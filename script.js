// ==========================================
// 1. ANIMACIÓN DE FONDO (CANVAS SYNTHWAVE)
// ==========================================
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let topHorizon, bottomHorizon;

let lineProgress = 0;
let lastTime = performance.now();
const stars = [];

const hideGrid = document.body.classList.contains('no-grid');

function initCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;

  const centerSpace = height * 0.20;
  topHorizon = (height - centerSpace) / 2;
  bottomHorizon = topHorizon + centerSpace;

  stars.length = 0;
  const numStars = width < height ? 100 : 200;
  
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: (Math.random() * 2.2) + 0.8,
      alpha: Math.random(),
      speed: (Math.random() * 0.03) + 0.015
    });
  }
}

function drawDualGridBackground(currentTime) {
  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
  bgGrad.addColorStop(0, '#09000c');
  bgGrad.addColorStop(0.38, '#2a0538');
  bgGrad.addColorStop(0.5, '#4a0e5c');
  bgGrad.addColorStop(0.62, '#2a0538');
  bgGrad.addColorStop(1, '#09000c');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  stars.forEach(star => {
    star.alpha += star.speed;
    if (star.alpha <= 0.15 || star.alpha >= 1) {
      star.speed = -star.speed;
    }

    ctx.fillStyle = `rgba(255, 180, 235, ${Math.abs(star.alpha)})`;
    ctx.fillRect(star.x, star.y, star.size, star.size);
  });

  if (!hideGrid) {
    const numLines = 24;
    const step = 1 / numLines;

    lineProgress = (lineProgress + (deltaTime * 0.225)) % step;

    const centerX = width / 2;
    const isMobile = width < height;
    const spreadFactor = isMobile ? 3.2 : 1.85;

    for (let pass = 0; pass < 2; pass++) {
      if (pass === 0) {
        ctx.strokeStyle = 'rgba(255, 51, 166, 0.35)';
        ctx.lineWidth = isMobile ? 3 : 4;
      } else {
        ctx.strokeStyle = '#ff007f';
        ctx.lineWidth = isMobile ? 1.2 : 1.6;
      }

      for (let i = -numLines; i <= numLines * 2; i++) {
        const normX = (i * step) - lineProgress - 0.5;
        const xBorder = centerX + (normX * width * spreadFactor);

        ctx.beginPath();
        ctx.moveTo(centerX, topHorizon);
        ctx.lineTo(xBorder, 0);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(centerX, bottomHorizon);
        ctx.lineTo(xBorder, height);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(drawDualGridBackground);
}

window.addEventListener('resize', initCanvas);
window.addEventListener('orientationchange', initCanvas);

document.addEventListener('DOMContentLoaded', () => {
  initCanvas();
  requestAnimationFrame((time) => {
    lastTime = time;
    drawDualGridBackground(time);
  });
});

// ==========================================
// 2. BASE DE DATOS DE LUGARES DEL PDF
// ==========================================
const levelData = {
  chapultepec: {
    title: "NIVEL 01: CHAPULTEPEC",
    themeClass: "theme-chapultepec",
    places: [
      {
        title: "Tótem canadiense",
        country: "Canadá",
        year: "1960",
        history: "Fue donado por el gobierno canadiense como parte de la conmemoración del 150 aniversario de la Independencia de México. Fue diseñado por el artista indígena Mungo Martin, perteneciente al pueblo Kwakwaka'wakw. La escultura, tallada en madera de cedro, mide aproximadamente 11 metros y representa figuras relacionadas con la mitología, la naturaleza y el linaje de los pueblos originarios de la costa noroeste canadiense. Fue restaurada en 2014.",
        personalNote: "",
        images: ["assets/totem2.jpg", "assets/totem3.jpg"]
      },
      {
        title: "Xin Xin, la panda",
        country: "China",
        year: "1975 (llegada de Ying Ying y Pe Pe); Xin Xin nació en 1990",
        history: "En septiembre de 1975 llegaron a México los pandas Ying Ying y Pe Pe, como resultado de un gesto diplomático entre China y México. Su descendiente Tohuí tuvo a Xin Xin en 1990, en el Zoológico de Chapultepec. Su nombre significa «esperanza». Es importante aclarar que Xin Xin no fue un regalo directo de China, sino que nació en México y representa la continuidad de aquel intercambio diplomático y de los esfuerzos de conservación de la especie.",
        personalNote: "Este fue uno de mis lugares favoritos durante mi recorrido por Chapultepec ya que por fin logré ver a la panda, me gustó que ahora también hay un espacio en donde hay una exposición sobre únicamente Xin Xin es decir, viene información sobre su nacimiento, sus cuidados, su historia y diferentes fotografías de diferentes etapas de Xin Xin. Mi favorita fue el apartado donde aparece de bebé.",
        images: ["assets/xinxin.jpg", "assets/xinxin2.jpg", "assets/xinxin3.jpg", "assets/xinxin4.jpg"]
      },
      {
        title: "Monumento a Winston Churchill",
        country: "Reino Unido",
        year: "1974",
        history: "La estatua fue un regalo del gobierno británico para simbolizar la amistad y los valores compartidos entre México y el Reino Unido. Es obra del escultor Oscar Nemon, conocido por sus retratos de Churchill. Se encuentra en el Jardín Winston Churchill, frente al Auditorio Nacional, en un espacio que anteriormente era conocido como El Mexicanito.",
        personalNote: "",
        images: ["assets/churchill.jpg", "assets/churchill2.jpg"]
      },
      {
        title: "Monumento a José Martí",
        country: "Cuba; organización cubana AJEF",
        year: "Enero de 1953",
        history: "Es un busto dedicado a José Martí, escritor, pensador y líder independentista cubano, fundador del Partido Revolucionario Cubano. Martí vivió en México durante una etapa de su vida y desarrolló vínculos importantes con el país. La organización cubana AJEF donó el busto al Bosque de Chapultepec como símbolo de amistad y de las relaciones culturales entre México y Cuba.",
        personalNote: "",
        images: ["assets/marti.jpg", "assets/marti2.jpg"]
      }
    ]
  },
  reforma: {
    title: "NIVEL 02: PASEO DE LA REFORMA",
    themeClass: "theme-reforma",
    places: [
      {
        title: "La Campana de la Amistad",
        country: "República de Corea (Corea del Sur)",
        year: "2012",
        history: "Fue entregada por la Embajada de Corea del Sur para conmemorar los 50 años de relaciones diplomáticas entre ambos países. Es una réplica de una campana sagrada coreana asociada al rey Seongdeok. Está elaborada en bronce, pesa aproximadamente 900 kilogramos y mide 1.4 metros de altura. Se encuentra en la explanada del Monumento a la Madre y simboliza la amistad y el intercambio cultural entre las dos naciones.",
        personalNote: "",
        images: ["assets/campana1.jpg", "assets/campana2.jpg"]
      },
      {
        title: "Monumento a Simón Bolívar",
        country: "Venezuela y naciones latinoamericanas",
        year: "1976 (Estatua de bronce en Paseo de la Reforma)",
        history: "Simón Bolívar fue uno de los principales líderes de la independencia de América del Sur y es conocido como el Libertador. Los monumentos en su honor expresan la admiración por su proyecto de unidad latinoamericana y los vínculos históricos entre México y los países de la región. La estatua en Paseo de la Reforma representa este lazo histórico.",
        personalNote: "",
        images: ["assets/bolivar.jpg"]
      },
      {
        title: "Café La Habana",
        country: "Cuba (relación histórica) / Fundador español",
        year: "1952",
        history: "Este café histórico abrió en la esquina de Bucareli y Morelos. Se convirtió en un punto de reunión de periodistas, escritores, intelectuales y figuras políticas. Se le asocia con el ambiente político latinoamericano del siglo XX y con visitantes como Fidel Castro y Ernesto «Che» Guevara. Es un establecimiento privado cuyo valor está en su historia y relación con la vida cultural.",
        personalNote: "",
        images: ["assets/habana.jpg", "assets/habana2.jpg"]
      }
    ]
  },
  centro: {
    title: "NIVEL 03: CENTRO HISTÓRICO",
    themeClass: "theme-centro",
    places: [
      {
        title: "Reloj Otomano",
        country: "Imperio otomano; comunidades turca, libanesa y árabe",
        year: "1910",
        history: "Fue obsequiado durante las celebraciones del Centenario de la Independencia mexicana, como muestra de agradecimiento por la hospitalidad recibida por las comunidades inmigrantes. Es una torre con mosaicos de estilo oriental, cuatro carátulas y tres campanas. Sus elementos decorativos incluyen símbolos de México, Turquía y Líbano. En 2010 fue restaurado.",
        personalNote: "",
        images: ["assets/reloj-otomano1.jpg"]
      },
      {
        title: "Estatua de Fray Pedro de Gante",
        country: "Bélgica (Provincia de Flandes Oriental)",
        year: "1976",
        history: "El monumento fue donado como testimonio de amistad entre Bélgica y México. Está dedicado a Fray Pedro de Gante (aprox. 1480-1572), religioso franciscano de origen flamenco que llegó a la Nueva España y destacó por su labor educativa entre los pueblos indígenas, incluida la enseñanza del náhuatl. La estatua se encuentra en la calle Gante del Centro Histórico.",
        personalNote: "",
        images: ["assets/gante.jpg", "assets/gante2.jpg"]
      },
      {
        title: "Monumento a Beethoven",
        country: "Alemania y la comunidad alemana residente en México",
        year: "1927",
        history: "La comunidad alemana anunció la donación en 1921 y fue inaugurada el 26 de marzo de 1927 al cumplirse cien años de la muerte de Ludwig van Beethoven. Fue diseñada por Theodor von Gosen. La composición alegórica representa la lucha y el sufrimiento del alma humana, e incluye una máscara de bronce con el rostro del músico. Se localiza en la Alameda Central.",
        personalNote: "",
        images: ["assets/beethoven.jpg", "assets/beethoven2.jpg"]
      },
      {
        title: "Entrada Guimard del Metro (Bellas Artes)",
        country: "Francia (Red Autónoma de Transportes de París - RATP)",
        year: "1998",
        history: "Esta estructura fue donada a la Ciudad de México como parte del intercambio cultural por los 30 años de cooperación entre los sistemas de transporte de México y París. Fue diseñada siguiendo el estilo del arquitecto francés Héctor Guimard. Su estructura metálica verde y motivos vegetales corresponden al Art Nouveau. En intercambio, México entregó a París una obra wixárika instalada en Palais Royal-Musée du Louvre.",
        personalNote: "",
        images: ["assets/metro-guimard.jpg", "assets/metro-guimard2.jpg"]
      }
    ]
  },
  coyoacan: {
    title: "NIVEL 04: COYOACÁN Y OTROS LUGARES",
    themeClass: "theme-coyoacan",
    places: [
      {
        title: "Casa de León Trotsky",
        country: "Unión Soviética / Rusia / México",
        year: "1939 (instalación) / 1990 (museo)",
        history: "León Trotsky llegó a México en 1937 gracias al asilo político concedido durante el gobierno de Lázaro Cárdenas. Se trasladó a esta residencia de Coyoacán donde sufrió un atentado el 20 de agosto de 1940 y murió al día siguiente. Actualmente el museo conserva habitaciones, objetos personales y su estela funeraria diseñada por Juan O'Gorman. Declarado monumento histórico en 1982.",
        personalNote: "La casa de León Trotski me gustó, pero a la vez cuando entré a la parte donde está su habitación su cocina, sus oficinas sentí una vibra muy extraña, no sé cómo rusa o sea así como pesada socialista y que de verdad parecía que había vivido ahí. Alguien se me hizo muy curioso como estaba repartida a su casa y por qué había dos comedores, pero bueno.",
        images: ["assets/trotsky1.jpg"]
      },
      {
        title: "Placa del Metro Etiopía",
        country: "Etiopía",
        year: "1954",
        history: "La placa conmemora la visita a México del emperador etíope Haile Selassie I, realizada el 22 de junio de 1954. Estuvo vinculada con el agradecimiento de Etiopía a México por su postura internacional frente a la invasión italiana en la década de 1930. La antigua glorieta recibió el nombre de Etiopía y posteriormente se otorgó a la estación del Metro. Es un testimonio de solidaridad diplomática.",
        personalNote: "",
        images: ["assets/etiopia.jpg", "assets/etiopia2.jpg"]
      },
      {
        title: "Parque Masayoshi Ohira",
        country: "Japón",
        year: "1942 / 1980 / 2015",
        history: "Inaugurado el 14 de febrero de 1942 como Parque de la Pagoda. En 1980 el primer ministro japonés Masayoshi Ōhira visitó México y posteriormente el parque adoptó su nombre e incluyó elementos tradicionales de jardín japonés como un portal torii, un lago y un puente. La Asociación México-Japonesa colaboró en su renovación. Es un símbolo de amistad bilateral.",
        personalNote: "",
        images: ["assets/masayoshi.jpg", "assets/masayoshi2.jpg"]
      }
    ]
  }
};

const carouselIndexes = {};

function openLevel(levelKey) {
  const data = levelData[levelKey];
  if (!data) return;

  const cardsGrid = document.getElementById('cards-grid');
  const mainHeader = document.getElementById('main-header');
  const footerNav = document.getElementById('footer-nav');
  const bonusWrapper = document.getElementById('bonus-wrapper');

  // Ocultar elementos del selector incluyendo el botón Bonus
  if (cardsGrid) cardsGrid.classList.add('hidden');
  if (mainHeader) mainHeader.classList.add('hidden');
  if (footerNav) footerNav.classList.add('hidden');
  if (bonusWrapper) bonusWrapper.classList.add('hidden');

  const expandedView = document.getElementById('expanded-view');
  expandedView.className = `expanded-view ${data.themeClass}`;
  
  document.getElementById('expanded-title').innerText = data.title;
  
  const container = document.getElementById('places-container');
  container.innerHTML = "";

  data.places.forEach((place, placeIdx) => {
    const cardId = `${levelKey}-${placeIdx}`;
    carouselIndexes[cardId] = 0;

    const card = document.createElement('div');
    card.className = 'place-card';
    
    let carouselHTML = '';
    if (place.images && place.images.length > 0) {
      const showControls = place.images.length > 1 ? '' : 'style="display:none;"';
      carouselHTML = `
        <div class="carousel-wrapper">
          <img id="img-${cardId}" src="${place.images[0]}" alt="${place.title}" onerror="this.src='https://via.placeholder.com/400x250?text=Foto+No+Encontrada'">
          <button class="carousel-btn prev-btn" ${showControls} onclick="moveCarousel('${cardId}', ${placeIdx}, '${levelKey}', -1)">&#10094;</button>
          <button class="carousel-btn next-btn" ${showControls} onclick="moveCarousel('${cardId}', ${placeIdx}, '${levelKey}', 1)">&#10095;</button>
          <div class="carousel-counter" ${showControls}><span id="count-${cardId}">1</span> / ${place.images.length}</div>
        </div>
      `;
    }

    const personalNoteHTML = place.personalNote ? `
      <div class="note-btn-wrapper">
        <button class="btn-personal-note" onclick="togglePersonalNote('${cardId}')">
          [ 💬 NOTA PERSONAL ]
        </button>
        <div id="note-box-${cardId}" class="personal-note-box hidden">
          "${place.personalNote}"
        </div>
      </div>
    ` : '';

    card.innerHTML = `
      ${carouselHTML}
      <div class="place-details-scroll">
        <h3>${place.title}</h3>
        <span class="place-tag">📍 País: ${place.country}</span>
        <span class="place-tag year-tag">📅 Año: ${place.year}</span>
        <div class="history-text">
          <p><strong>Historia y Descripción:</strong> ${place.history}</p>
        </div>
        ${personalNoteHTML}
      </div>
    `;
    container.appendChild(card);
  });

  expandedView.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function togglePersonalNote(cardId) {
  const noteBox = document.getElementById(`note-box-${cardId}`);
  if (noteBox) {
    noteBox.classList.toggle('hidden');
  }
}

function moveCarousel(cardId, placeIdx, levelKey, direction) {
  const place = levelData[levelKey].places[placeIdx];
  if (!place || !place.images) return;

  const total = place.images.length;
  carouselIndexes[cardId] = (carouselIndexes[cardId] + direction + total) % total;

  const newIndex = carouselIndexes[cardId];
  const imgElement = document.getElementById(`img-${cardId}`);
  const countElement = document.getElementById(`count-${cardId}`);

  if (imgElement) imgElement.src = place.images[newIndex];
  if (countElement) countElement.innerText = newIndex + 1;
}

function closeLevel() {
  document.getElementById('expanded-view').classList.add('hidden');

  const cardsGrid = document.getElementById('cards-grid');
  const mainHeader = document.getElementById('main-header');
  const footerNav = document.getElementById('footer-nav');
  const bonusWrapper = document.getElementById('bonus-wrapper');

  // Mostrar nuevamente las cards y el botón Bonus
  if (cardsGrid) cardsGrid.classList.remove('hidden');
  if (mainHeader) mainHeader.classList.remove('hidden');
  if (footerNav) footerNav.classList.remove('hidden');
  if (bonusWrapper) bonusWrapper.classList.remove('hidden');
}

// ==========================================
// 3. LÓGICA DEL NIVEL BONUS (MODAL)
// ==========================================
const bonusImages = [
  "assets/murales-portugueses.jpg",
  "assets/murales-portugueses2.jpg",
  "assets/murales-portugueses3.jpg",
  "assets/murales-portugueses4.jpg"
];
let bonusImgIndex = 0;

function openBonusModal(e) {
  if (e) e.stopPropagation();
  const bonusModal = document.getElementById('bonus-modal');
  if (bonusModal) {
    bonusModal.classList.remove('hidden');
  }
}

function closeBonusModal() {
  const bonusModal = document.getElementById('bonus-modal');
  if (bonusModal) {
    bonusModal.classList.add('hidden');
  }
}

function moveBonusCarousel(direction) {
  const total = bonusImages.length;
  bonusImgIndex = (bonusImgIndex + direction + total) % total;

  const imgElement = document.getElementById('bonus-img');
  const countElement = document.getElementById('bonus-count');

  if (imgElement) imgElement.src = bonusImages[bonusImgIndex];
  if (countElement) countElement.innerText = bonusImgIndex + 1;
}