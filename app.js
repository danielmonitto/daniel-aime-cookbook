const STORAGE_KEY = 'daniel-aime-cookbook-v1';
const RECIPE_DATA_VERSION_KEY = 'daniel-aime-cookbook-recipe-data-version';
const RECIPE_DATA_VERSION = '2';
const LEGACY_STARTER_TITLES = new Set([
  'Creamy Tomato Pasta',
  'Sticky Honey Chicken Bowls'
]);

const starterRecipes = [
  {
    id: 'french-onion-chicken-risoni-bake',
    title: 'French Onion Chicken Risoni Bake',
    image: '',
    prep: '10 min',
    cook: '50–65 min',
    tag: 'Dinner',
    effort: 3,
    delicious: 8,
    note: 'Creamy, cheesy and easy to make in one baking dish.',
    ingredients: ['500g chicken mince', '1½ cups uncooked risoni', '1½ cups beef stock', '300ml thickened cream', '1 packet French onion soup mix', '½ onion, thinly sliced (optional)', '2 cups chopped spinach', '1–2 cups grated tasty cheese'],
    steps: ['Heat the oven to 180°C fan-forced and dissolve the soup mix in the beef stock.', 'Mix the risoni, stock, cream and onion in a 24 × 33cm baking dish.', 'Add the chicken mince, break it up and mix well.', 'Cover tightly with foil and bake for 40–55 minutes, until the risoni is tender.', 'Stir through the spinach, top with cheese and bake uncovered for 10 minutes, until golden. Add ¼–½ cup extra stock and cook covered a little longer if the risoni is still firm or dry.'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'prawn-sausage-creamy-pasta',
    title: 'Prawn & Sausage Creamy Pasta',
    image: '',
    prep: '15 min',
    cook: '25 min',
    tag: 'Pasta',
    effort: 5,
    delicious: 7,
    note: 'Creamy Cajun pasta with crispy andouille sausage and prawns.',
    ingredients: ['Rigatoni', 'Andouille sausage, sliced', 'Prawns, peeled', 'Olive oil', 'Cajun seasoning', 'Roasted garlic butter', 'Red capsicum, diced', 'Green capsicum, diced', '1 shallot, diced', 'Garlic, minced', 'Thickened cream', '1 lemon', 'Parmesan, grated', 'Fresh parsley'],
    steps: ['Cook the rigatoni until just shy of al dente. Reserve some pasta water, then drain.', 'Brown the sausage in a large pan, remove it, then season and quickly sear the prawns. Set aside.', 'Melt the garlic butter in the same pan. Soften the capsicum and shallot, then add the garlic.', 'Add the cream, Cajun seasoning and a squeeze of lemon. Simmer until slightly thickened.', 'Return the pasta, sausage and prawns to the pan. Stir in Parmesan over low heat, loosening with pasta water as needed, then finish with parsley and lemon.'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'broken-rice',
    title: 'Broken Rice',
    image: '',
    prep: '15 min',
    cook: '25 min',
    tag: 'Dinner',
    effort: 4,
    delicious: 7.5,
    note: 'Crispy chicken schnitzel with rice, vegetables and eggs.',
    ingredients: ['4–6 chicken schnitzels', '1 cabbage, thinly sliced', '2 carrots, thinly sliced or grated', '2 cups rice', '2 eggs', 'Cooking oil', 'Soy sauce', 'Salt and pepper'],
    steps: ['Cook the rice according to the packet instructions.', 'Fry the chicken schnitzels until golden and cooked through, then slice.', 'Stir-fry the cabbage and carrot in seasoned oil with a splash of soy sauce until just tender.', 'Fry the eggs to your liking.', 'Serve the rice topped with vegetables, sliced schnitzel and egg.'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'vodka-pasta',
    title: 'Vodka Pasta',
    image: '',
    prep: '10 min',
    cook: '20 min',
    tag: 'Pasta',
    effort: 4,
    delicious: 6.5,
    note: 'Rich tomato and cream rigatoni with a glossy Parmesan sauce.',
    ingredients: ['250g rigatoni', '2 shallots, finely diced', '2 garlic cloves, finely diced', '1 tsp chilli flakes', '1 tsp oregano', '130g tomato paste', '1 shot vodka', '1 cup thickened cream', '1 cup grated Parmesan', 'Cold butter, cubed', 'Parsley, to garnish', '1 tbsp olive oil', 'Salt'],
    steps: ['Cook the rigatoni in well-salted water until one minute shy of al dente.', 'Meanwhile, soften the shallots and garlic in olive oil. Add the chilli, oregano and tomato paste, then cook for 1–2 minutes.', 'Deglaze with vodka and let the alcohol cook off. Stir in the cream and simmer for 5 minutes.', 'Mix in the Parmesan, then add the pasta and let it finish cooking in the sauce.', 'Stir through a little cold butter until glossy, then serve with parsley and extra Parmesan.'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'chicken-pesto-subs',
    title: 'Chicken Pesto Subs',
    image: '',
    prep: '25 min',
    cook: '25 min',
    tag: 'Lunch',
    effort: 6,
    delicious: null,
    note: 'Toasted chicken and cheese subs with a fresh lower-calorie pesto.',
    ingredients: ['1.5kg trimmed chicken thighs', '1½ tbsp kosher salt', '1 tbsp black pepper', '3 tbsp garlic powder', '2 tbsp paprika', 'Avocado oil cooking spray', '1 cup packed parsley', '3 cups packed basil', '95g Parmesan', '¼ cup olive oil', '3–4 garlic cloves', 'Juice of 1 lemon', '1 tsp kosher salt', '½ tsp black pepper', '¼ cup pine nuts or walnuts', '2–4 tbsp water', 'Baguettes or sub rolls', '16 thin slices provolone or Swiss cheese'],
    steps: ['Season the chicken with salt, pepper, garlic powder and paprika, then cook until browned and cooked through. Slice or chop it.', 'Blend the pesto ingredients, adding enough water to make it spreadable.', 'Split and lightly hollow out the baguettes or rolls, then spread pesto inside.', 'Fill with chicken and cheese.', 'Grill or toast until the bread is crisp and the cheese is melted. Serve hot.'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'crispy-cheesy-beef-tacos',
    title: 'Crispy Cheesy Beef Tacos',
    image: '',
    prep: '20 min',
    cook: '30 min',
    tag: 'Mexican',
    effort: 6,
    delicious: null,
    note: 'Makes about 10–15 crispy, cheesy tacos with garlic-lime yogurt sauce.',
    ingredients: ['1.2kg lean beef mince', '2 tsp salt', '3 tsp smoked paprika', '3 tsp oregano', '3 tsp garlic powder', '2 tsp onion powder', '2 tsp cumin', '200g tomato paste', '2 tbsp chopped flat-leaf parsley', 'Avocado oil cooking spray', '15 low-carb mini wraps', '320g grated mozzarella', '200g white onion, chopped', '200g red and green capsicum, chopped', '1 tsp salt and 1 tsp paprika, for the vegetables', '150g Greek yogurt', 'Juice of 1 lime', '1 small garlic clove, minced', '1 tbsp finely chopped flat-leaf parsley', '1–2 tsp hot sauce', 'Pinch of salt'],
    steps: ['Heat the oven to 180°C. Spray the onion and capsicum with oil, season with salt and paprika, and roast on a lined tray for 15 minutes.', 'Add the beef, remaining spices, tomato paste and parsley. Mix, flatten and lightly spray with oil.', 'Bake for 6 minutes, break up the beef, then bake for another 6 minutes. Stir in a splash of water to keep it juicy.', 'Lightly dip the wraps in the pan juices, fill with beef and mozzarella, then bake for 12 minutes, flipping halfway.', 'Mix the yogurt sauce ingredients and drizzle over the hot tacos to serve.'],
    createdAt: new Date().toISOString()
  }
];

let recipes = loadRecipes();
let currentIndex = -1; // -1 = cover
let activeTag = 'All';
let searchTerm = '';
let filteredRecipes = [...recipes];
let pendingImage = '';
let installPrompt = null;
let touchStartX = 0;
let touchStartY = 0;
let toastTimer = null;
let pageTransitionTimer = null;

const $ = (selector) => document.querySelector(selector);
const page = $('#page');
const pageContent = $('#pageContent');
const prevPage = $('#prevPage');
const nextPage = $('#nextPage');
const pageIndicator = $('#pageIndicator');
const searchInput = $('#searchInput');
const clearSearch = $('#clearSearch');
const tagFilters = $('#tagFilters');
const addRecipeButton = $('#addRecipeButton');
const recipeModal = $('#recipeModal');
const formModal = $('#formModal');
const indexModal = $('#indexModal');
const sideSheet = $('#sideSheet');
const scrim = $('#scrim');
const recipeForm = $('#recipeForm');
const imageInput = $('#imageInput');
const imagePreview = $('#imagePreview');
const imagePlaceholder = $('#imagePlaceholder');

function removeLegacyServings(recipe) {
  const cleaned = { ...recipe };
  delete cleaned.servings;
  return cleaned;
}

function loadRecipes() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(starterRecipes));
      localStorage.setItem(RECIPE_DATA_VERSION_KEY, RECIPE_DATA_VERSION);
      return [...starterRecipes];
    }
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [...starterRecipes];
    let cleaned = parsed.map(removeLegacyServings);
    if (localStorage.getItem(RECIPE_DATA_VERSION_KEY) !== RECIPE_DATA_VERSION) {
      cleaned = cleaned.filter(recipe => !LEGACY_STARTER_TITLES.has(recipe.title));
      const existingTitles = new Set(cleaned.map(recipe => recipe.title));
      cleaned.push(...starterRecipes.filter(recipe => !existingTitles.has(recipe.title)));
      localStorage.setItem(RECIPE_DATA_VERSION_KEY, RECIPE_DATA_VERSION);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
    return cleaned;
  } catch {
    return [...starterRecipes];
  }
}

function saveRecipes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
  applyFilters(false);
}

function escapeHTML(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function formatScore(value) {
  return Number.isFinite(Number(value)) && value !== null && value !== '' ? `${Number(value)}/10` : 'Not rated';
}

function recipeImage(recipe, className = '') {
  if (recipe.image) {
    return `<img class="${className}" src="${recipe.image}" alt="${escapeHTML(recipe.title)}" />`;
  }
  return `<div class="recipe-placeholder ${className}" aria-label="No photo yet">✦</div>`;
}

function allTags() {
  const tags = recipes.map(r => (r.tag || '').trim()).filter(Boolean);
  return ['All', ...new Set(tags)].slice(0, 20);
}

function renderTagFilters() {
  tagFilters.innerHTML = allTags().map(tag => `
    <button class="filter-chip ${activeTag === tag ? 'active' : ''}" data-tag="${escapeHTML(tag)}">${escapeHTML(tag)}</button>
  `).join('');
}

function applyFilters(resetPage = true) {
  const query = searchTerm.trim().toLowerCase();
  filteredRecipes = recipes.filter(recipe => {
    const tagMatch = activeTag === 'All' || recipe.tag === activeTag;
    if (!tagMatch) return false;
    if (!query) return true;
    const haystack = [
      recipe.title,
      recipe.tag,
      recipe.note,
      ...(recipe.ingredients || [])
    ].join(' ').toLowerCase();
    return haystack.includes(query);
  });

  renderTagFilters();
  if (resetPage) currentIndex = filteredRecipes.length ? 0 : -1;
  if (currentIndex >= filteredRecipes.length) currentIndex = filteredRecipes.length - 1;
  if (!searchTerm && activeTag === 'All' && resetPage) currentIndex = -1;
  renderPage();
  renderIndex();
}

function renderCover() {
  return `
    <div class="cover-page">
      <div>
        <div class="cover-ornament"><span>Daniel + Aime</span><span>✦</span></div>
        <h2 class="cover-title">Our Cookbook</h2>
        <p class="cover-subtitle">The recipes we actually make, rated by how much effort they take and how worth it they are.</p>
      </div>
      <div class="cover-bottom">
        <div>
          <span class="cover-count">${recipes.length}</span>
          <span class="cover-count-label">saved recipes</span>
        </div>
        <span class="cover-scribble">made with us in mind.</span>
      </div>
    </div>
  `;
}

function renderRecipePage(recipe) {
  const tag = recipe.tag || 'Recipe';
  return `
    <div class="recipe-page">
      <div class="recipe-hero">
        ${recipeImage(recipe)}
        <div class="recipe-overlay">
          <span class="recipe-tag">${escapeHTML(tag)}</span>
          <h2>${escapeHTML(recipe.title)}</h2>
        </div>
      </div>
      <div class="recipe-body">
        <p class="recipe-note">${escapeHTML(recipe.note || 'One for the book.')}</p>
        <div class="recipe-meta">
          <div class="meta-card"><strong>${escapeHTML(recipe.prep || '—')}</strong><small>prep</small></div>
          <div class="meta-card"><strong>${escapeHTML(recipe.cook || '—')}</strong><small>cook</small></div>
        </div>
        <div class="score-row">
          <div class="score-card"><span class="score-label">Effort</span><span class="score">${formatScore(recipe.effort)}</span></div>
          <div class="score-card"><span class="score-label">Delicious</span><span class="score">${formatScore(recipe.delicious)}</span></div>
        </div>
        <div class="recipe-page-actions">
          <button class="open-recipe" data-open-recipe="${recipe.id}">Open recipe</button>
          <button class="edit-recipe-page" data-edit-recipe-page="${recipe.id}" aria-label="Edit ${escapeHTML(recipe.title)}">Edit</button>
        </div>
      </div>
    </div>
  `;
}

function renderEmpty() {
  const isFiltering = searchTerm || activeTag !== 'All';
  return `
    <div class="empty-page">
      <div>
        <h2>${isFiltering ? 'Nothing found' : 'Your book is empty'}</h2>
        <p>${isFiltering ? 'Try a different search or clear the filter.' : 'Add the first recipe and start filling the book.'}</p>
        <button class="button primary" ${isFiltering ? 'data-clear-filters' : 'data-add-empty'}>${isFiltering ? 'Clear filters' : 'Add first recipe'}</button>
      </div>
    </div>
  `;
}

function setPageContent(markup, direction = '') {
  page.querySelectorAll('.page-transition-layer').forEach(layer => layer.remove());
  pageContent.classList.remove('enter-forward', 'enter-back');
  clearTimeout(pageTransitionTimer);

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!direction || reduceMotion || !pageContent.firstElementChild) {
    pageContent.innerHTML = markup;
    return;
  }

  const outgoing = pageContent.cloneNode(true);
  outgoing.removeAttribute('id');
  outgoing.className = `page-transition-layer exit-${direction === 'next' ? 'forward' : 'back'}`;
  outgoing.setAttribute('aria-hidden', 'true');
  page.appendChild(outgoing);

  pageContent.innerHTML = markup;
  void pageContent.offsetWidth;
  pageContent.classList.add(direction === 'next' ? 'enter-forward' : 'enter-back');
  pageTransitionTimer = setTimeout(() => {
    outgoing.remove();
    pageContent.classList.remove('enter-forward', 'enter-back');
  }, 520);
}

function renderPage(direction = '') {

  const normalMode = !searchTerm && activeTag === 'All';
  if (normalMode && currentIndex === -1) {
    setPageContent(renderCover(), direction);
    pageIndicator.textContent = 'Cover';
    prevPage.disabled = true;
    nextPage.disabled = filteredRecipes.length === 0;
    return;
  }

  if (!filteredRecipes.length || currentIndex < 0) {
    setPageContent(renderEmpty(), direction);
    pageIndicator.textContent = 'No recipes';
    prevPage.disabled = normalMode ? false : true;
    nextPage.disabled = true;
    return;
  }

  const recipe = filteredRecipes[currentIndex];
  setPageContent(renderRecipePage(recipe), direction);
  pageIndicator.textContent = `${currentIndex + 1} of ${filteredRecipes.length}`;
  prevPage.disabled = normalMode ? false : currentIndex === 0;
  nextPage.disabled = currentIndex >= filteredRecipes.length - 1;
}

function goNext() {
  if (currentIndex < filteredRecipes.length - 1) {
    currentIndex += 1;
    renderPage('next');
    haptic();
  }
}

function goPrev() {
  const normalMode = !searchTerm && activeTag === 'All';
  if (normalMode && currentIndex === 0) {
    currentIndex = -1;
    renderPage('prev');
    haptic();
    return;
  }
  if (currentIndex > 0) {
    currentIndex -= 1;
    renderPage('prev');
    haptic();
  }
}

function haptic() {
  if (navigator.vibrate) navigator.vibrate(8);
}

const VULGAR_FRACTIONS = {
  '¼': [1, 4], '½': [1, 2], '¾': [3, 4],
  '⅓': [1, 3], '⅔': [2, 3], '⅕': [1, 5], '⅖': [2, 5],
  '⅗': [3, 5], '⅘': [4, 5], '⅙': [1, 6], '⅚': [5, 6],
  '⅛': [1, 8], '⅜': [3, 8], '⅝': [5, 8], '⅞': [7, 8]
};

const FRACTION_GLYPHS = Object.fromEntries(
  Object.entries(VULGAR_FRACTIONS).map(([glyph, fraction]) => [fraction.join('/'), glyph])
);

function greatestCommonDivisor(a, b) {
  while (b) [a, b] = [b, a % b];
  return a;
}

function parseQuantity(value) {
  const normalized = value.trim();
  const vulgarMatch = normalized.match(/^(\d+)?\s*([¼½¾⅓-⅞])$/);
  if (vulgarMatch) {
    const [numerator, denominator] = VULGAR_FRACTIONS[vulgarMatch[2]];
    return { numerator: (Number(vulgarMatch[1] || 0) * denominator) + numerator, denominator };
  }

  const mixedMatch = normalized.match(/^(\d+)\s+(\d+)\/(\d+)$/);
  if (mixedMatch) {
    const denominator = Number(mixedMatch[3]);
    return { numerator: (Number(mixedMatch[1]) * denominator) + Number(mixedMatch[2]), denominator };
  }

  const fractionMatch = normalized.match(/^(\d+)\/(\d+)$/);
  if (fractionMatch) {
    return { numerator: Number(fractionMatch[1]), denominator: Number(fractionMatch[2]) };
  }

  const decimal = Number(normalized);
  if (!Number.isFinite(decimal)) return null;
  const decimalPlaces = (normalized.split('.')[1] || '').length;
  const denominator = 10 ** decimalPlaces;
  return { numerator: Math.round(decimal * denominator), denominator };
}

function formatQuantity(quantity, multiplier) {
  if (!quantity || !quantity.denominator) return '';
  let numerator = quantity.numerator * (multiplier === 0.5 ? 1 : 2);
  let denominator = quantity.denominator * (multiplier === 0.5 ? 2 : 1);
  const divisor = greatestCommonDivisor(numerator, denominator);
  numerator /= divisor;
  denominator /= divisor;

  const whole = Math.floor(numerator / denominator);
  const remainder = numerator % denominator;
  if (!remainder) return String(whole);

  const glyph = FRACTION_GLYPHS[`${remainder}/${denominator}`];
  if (glyph) return `${whole || ''}${glyph}`;
  if (whole) return `${whole} ${remainder}/${denominator}`;
  return `${remainder}/${denominator}`;
}

function scaleIngredient(ingredient, multiplier) {
  if (multiplier === 1) return ingredient;
  const quantityPattern = String.raw`(?:\d+\s+\d+\/\d+|\d+\/\d+|\d*\.?\d+\s*[¼½¾⅓-⅞]|\d*\.?\d+)`;
  const match = ingredient.match(new RegExp(`^(\\s*(?:about|approx(?:imately)?\\.?|around)?\\s*)(${quantityPattern})(?:\\s*(–|-|to)\\s*(${quantityPattern}))?`, 'i'));
  if (!match) return ingredient;

  const first = formatQuantity(parseQuantity(match[2]), multiplier);
  if (!first) return ingredient;
  const range = match[4]
    ? `${match[3] === 'to' ? ' to ' : match[3]}${formatQuantity(parseQuantity(match[4]), multiplier)}`
    : '';
  return `${match[1]}${first}${range}${ingredient.slice(match[0].length)}`;
}

function renderIngredients(recipe, multiplier = 1) {
  return (recipe.ingredients || [])
    .map(item => `<li>${escapeHTML(scaleIngredient(item, multiplier))}</li>`)
    .join('');
}

function setIngredientScale(multiplier) {
  const detail = $('#recipeDetail');
  const recipe = recipes.find(r => r.id === detail.dataset.recipeId);
  if (!recipe || ![0.5, 1, 2].includes(multiplier)) return;
  detail.dataset.ingredientScale = String(multiplier);
  detail.querySelectorAll('[data-ingredient-scale]').forEach(button => {
    const isActive = Number(button.dataset.ingredientScale) === multiplier;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
  detail.querySelector('.ingredients-list').innerHTML = renderIngredients(recipe, multiplier);
  haptic();
}

function openRecipe(id) {
  const recipe = recipes.find(r => r.id === id);
  if (!recipe) return;
  const detail = $('#recipeDetail');
  detail.dataset.recipeId = recipe.id;
  detail.dataset.ingredientScale = '1';
  detail.innerHTML = `
    <div class="detail-hero">
      ${recipeImage(recipe)}
      <button class="icon-button detail-close" data-close-detail aria-label="Close recipe">×</button>
    </div>
    <div class="detail-content">
      <p class="eyebrow">${escapeHTML(recipe.tag || 'recipe')}</p>
      <h2>${escapeHTML(recipe.title)}</h2>
      ${recipe.note ? `<p class="recipe-note">${escapeHTML(recipe.note)}</p>` : ''}
      <div class="detail-stats">
        <div class="meta-card"><strong>${escapeHTML(recipe.prep || '—')}</strong><small>prep</small></div>
        <div class="meta-card"><strong>${escapeHTML(recipe.cook || '—')}</strong><small>cook</small></div>
      </div>
      <div class="detail-scores">
        <div class="score-card"><span class="score-label">Effort</span><span class="score">${formatScore(recipe.effort)}</span></div>
        <div class="score-card"><span class="score-label">Delicious</span><span class="score">${formatScore(recipe.delicious)}</span></div>
      </div>
      <div class="ingredients-heading">
        <h3 class="section-title">Ingredients</h3>
        <div class="ingredient-scaler" role="group" aria-label="Scale ingredient amounts">
          <button type="button" data-ingredient-scale="0.5" aria-pressed="false">Half</button>
          <button type="button" class="active" data-ingredient-scale="1" aria-pressed="true">1×</button>
          <button type="button" data-ingredient-scale="2" aria-pressed="false">Double</button>
        </div>
      </div>
      <ul class="ingredients-list">${renderIngredients(recipe)}</ul>
      <h3 class="section-title">Method</h3>
      <ol class="steps-list">${(recipe.steps || []).map(step => `<li>${escapeHTML(step)}</li>`).join('')}</ol>
      <div class="detail-actions">
        <button class="button secondary" data-edit-recipe="${recipe.id}">Edit</button>
        <button class="button danger" data-delete-recipe="${recipe.id}">Delete</button>
      </div>
    </div>
  `;
  openModal(recipeModal);
}

function renderIndex() {
  const list = filteredRecipes.length ? filteredRecipes : recipes;
  $('#recipeIndex').innerHTML = list.length ? list.map(recipe => `
    <button class="index-item" data-index-open="${recipe.id}">
      ${recipe.image ? `<img class="index-thumb" src="${recipe.image}" alt="" />` : '<span class="index-thumb placeholder">✦</span>'}
      <span class="index-copy"><strong>${escapeHTML(recipe.title)}</strong><small>${escapeHTML(recipe.tag || 'Recipe')} · effort ${formatScore(recipe.effort)}</small></span>
      <span class="index-score">${formatScore(recipe.delicious)}</span>
    </button>
  `).join('') : `<div class="empty-page"><div><h2>No recipes</h2><p>Add something good to eat.</p></div></div>`;
}

function openModal(modal) {
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  if (![recipeModal, formModal, indexModal].some(m => m.classList.contains('open')) && !sideSheet.classList.contains('open')) {
    document.body.style.overflow = '';
  }
}

function openMenu() {
  scrim.hidden = false;
  requestAnimationFrame(() => scrim.classList.add('visible'));
  sideSheet.classList.add('open');
  sideSheet.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  scrim.classList.remove('visible');
  sideSheet.classList.remove('open');
  sideSheet.setAttribute('aria-hidden', 'true');
  setTimeout(() => { if (!sideSheet.classList.contains('open')) scrim.hidden = true; }, 220);
  if (![recipeModal, formModal, indexModal].some(m => m.classList.contains('open'))) document.body.style.overflow = '';
}

function resetForm() {
  recipeForm.reset();
  $('#recipeId').value = '';
  $('#formEyebrow').textContent = 'new page';
  $('#formTitle').textContent = 'Add a recipe';
  $('#saveRecipeButton').textContent = 'Save recipe';
  $('#removeImageButton').hidden = true;
  $('#effortInput').value = 4;
  $('#deliciousInput').value = 8;
  updateRangeLabels();
  pendingImage = '';
  imagePreview.hidden = true;
  imagePreview.src = '';
  imagePlaceholder.hidden = false;
}

function openAddForm() {
  resetForm();
  openModal(formModal);
  setTimeout(() => $('#titleInput').focus(), 280);
}

function openEditForm(id) {
  const recipe = recipes.find(r => r.id === id);
  if (!recipe) return;
  closeModal(recipeModal);
  resetForm();
  $('#recipeId').value = recipe.id;
  $('#formEyebrow').textContent = 'edit page';
  $('#formTitle').textContent = 'Edit recipe';
  $('#saveRecipeButton').textContent = 'Save changes';
  $('#titleInput').value = recipe.title || '';
  $('#prepInput').value = recipe.prep || '';
  $('#cookInput').value = recipe.cook || '';
  $('#tagInput').value = recipe.tag || '';
  $('#effortInput').value = recipe.effort || 4;
  $('#deliciousInput').value = recipe.delicious || 8;
  $('#noteInput').value = recipe.note || '';
  $('#ingredientsInput').value = (recipe.ingredients || []).join('\n');
  $('#stepsInput').value = (recipe.steps || []).join('\n');
  pendingImage = recipe.image || '';
  if (pendingImage) {
    imagePreview.src = pendingImage;
    imagePreview.hidden = false;
    imagePlaceholder.hidden = true;
    $('#removeImageButton').hidden = false;
  }
  updateRangeLabels();
  openModal(formModal);
}

function updateRangeLabels() {
  $('#effortOutput').textContent = `${$('#effortInput').value}/10`;
  $('#deliciousOutput').textContent = `${$('#deliciousInput').value}/10`;
}

async function resizeImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const max = 1400;
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', .82));
      };
      img.onerror = reject;
      img.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function lines(value) {
  return value.split('\n').map(v => v.trim()).filter(Boolean);
}

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

async function handleFormSubmit(event) {
  event.preventDefault();
  const id = $('#recipeId').value;
  const recipe = {
    id: id || (crypto.randomUUID ? crypto.randomUUID() : String(Date.now())),
    title: $('#titleInput').value.trim(),
    image: pendingImage,
    prep: $('#prepInput').value.trim(),
    cook: $('#cookInput').value.trim(),
    tag: $('#tagInput').value.trim() || 'Recipe',
    effort: Number($('#effortInput').value),
    delicious: Number($('#deliciousInput').value),
    note: $('#noteInput').value.trim(),
    ingredients: lines($('#ingredientsInput').value),
    steps: lines($('#stepsInput').value),
    createdAt: id ? (recipes.find(r => r.id === id)?.createdAt || new Date().toISOString()) : new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  try {
    if (id) {
      recipes = recipes.map(r => r.id === id ? recipe : r);
      showToast('Recipe updated');
    } else {
      recipes.unshift(recipe);
      showToast('Recipe added to the book');
    }
    saveRecipes();
    activeTag = 'All';
    searchTerm = '';
    searchInput.value = '';
    applyFilters(false);
    currentIndex = filteredRecipes.findIndex(r => r.id === recipe.id);
    closeModal(formModal);
    renderPage('next');
  } catch (error) {
    console.error(error);
    showToast('Could not save. Try a smaller photo.');
  }
}

function deleteRecipe(id) {
  const recipe = recipes.find(r => r.id === id);
  if (!recipe) return;
  const confirmed = window.confirm(`Delete “${recipe.title}”?`);
  if (!confirmed) return;
  recipes = recipes.filter(r => r.id !== id);
  saveRecipes();
  closeModal(recipeModal);
  currentIndex = recipes.length ? Math.min(currentIndex, recipes.length - 1) : -1;
  applyFilters(false);
  showToast('Recipe deleted');
}

function exportCookbook() {
  const payload = {
    app: 'Daniel & Aime Cookbook',
    version: 1,
    exportedAt: new Date().toISOString(),
    recipes
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `daniel-aime-cookbook-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Cookbook backup downloaded');
}

async function importCookbook(file) {
  try {
    const text = await file.text();
    const parsed = JSON.parse(text);
    const incoming = Array.isArray(parsed) ? parsed : parsed.recipes;
    if (!Array.isArray(incoming)) throw new Error('Invalid backup');
    const confirmed = window.confirm(`Import ${incoming.length} recipes? This will replace the recipes currently on this device.`);
    if (!confirmed) return;
    recipes = incoming.map(removeLegacyServings);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
    activeTag = 'All';
    searchTerm = '';
    searchInput.value = '';
    currentIndex = -1;
    applyFilters(false);
    closeMenu();
    showToast('Cookbook restored');
  } catch {
    showToast('That backup file could not be read');
  }
}

// Event wiring
prevPage.addEventListener('click', goPrev);
nextPage.addEventListener('click', goNext);
$('#homeButton').addEventListener('click', () => {
  activeTag = 'All'; searchTerm = ''; searchInput.value = ''; currentIndex = -1; applyFilters(false);
});
addRecipeButton.addEventListener('click', openAddForm);
$('#menuButton').addEventListener('click', openMenu);
$('#closeMenuButton').addEventListener('click', closeMenu);
scrim.addEventListener('click', closeMenu);
$('#exportButton').addEventListener('click', exportCookbook);
$('#showAllButton').addEventListener('click', () => { closeMenu(); renderIndex(); openModal(indexModal); });
$('#closeIndexButton').addEventListener('click', () => closeModal(indexModal));
$('#closeFormButton').addEventListener('click', () => closeModal(formModal));
$('#cancelFormButton').addEventListener('click', () => closeModal(formModal));
recipeForm.addEventListener('submit', handleFormSubmit);
$('#effortInput').addEventListener('input', updateRangeLabels);
$('#deliciousInput').addEventListener('input', updateRangeLabels);
$('#importFile').addEventListener('change', (e) => { if (e.target.files?.[0]) importCookbook(e.target.files[0]); e.target.value = ''; });

imageInput.addEventListener('change', async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    pendingImage = await resizeImage(file);
    imagePreview.src = pendingImage;
    imagePreview.hidden = false;
    imagePlaceholder.hidden = true;
    $('#removeImageButton').hidden = false;
  } catch {
    showToast('Could not use that photo');
  }
});


$('#removeImageButton').addEventListener('click', () => {
  pendingImage = '';
  imageInput.value = '';
  imagePreview.src = '';
  imagePreview.hidden = true;
  imagePlaceholder.hidden = false;
  $('#removeImageButton').hidden = true;
  showToast('Photo removed');
});

searchInput.addEventListener('input', (event) => {
  searchTerm = event.target.value;
  clearSearch.style.visibility = searchTerm ? 'visible' : 'hidden';
  applyFilters(true);
});
clearSearch.addEventListener('click', () => {
  searchInput.value = '';
  searchTerm = '';
  clearSearch.style.visibility = 'hidden';
  applyFilters(true);
  searchInput.focus();
});

tagFilters.addEventListener('click', (event) => {
  const button = event.target.closest('[data-tag]');
  if (!button) return;
  activeTag = button.dataset.tag;
  applyFilters(true);
});

pageContent.addEventListener('click', (event) => {
  const open = event.target.closest('[data-open-recipe]');
  if (open) openRecipe(open.dataset.openRecipe);
  const edit = event.target.closest('[data-edit-recipe-page]');
  if (edit) openEditForm(edit.dataset.editRecipePage);
  if (event.target.closest('[data-clear-filters]')) {
    activeTag = 'All'; searchTerm = ''; searchInput.value = ''; currentIndex = -1; applyFilters(false);
  }
  if (event.target.closest('[data-add-empty]')) openAddForm();
});

$('#recipeDetail').addEventListener('click', (event) => {
  if (event.target.closest('[data-close-detail]')) closeModal(recipeModal);
  const scale = event.target.closest('[data-ingredient-scale]');
  if (scale) setIngredientScale(Number(scale.dataset.ingredientScale));
  const edit = event.target.closest('[data-edit-recipe]');
  if (edit) openEditForm(edit.dataset.editRecipe);
  const del = event.target.closest('[data-delete-recipe]');
  if (del) deleteRecipe(del.dataset.deleteRecipe);
});

$('#recipeIndex').addEventListener('click', (event) => {
  const item = event.target.closest('[data-index-open]');
  if (!item) return;
  closeModal(indexModal);
  openRecipe(item.dataset.indexOpen);
});

[recipeModal, formModal, indexModal].forEach(modal => {
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal(modal);
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMenu();
    [recipeModal, formModal, indexModal].forEach(closeModal);
  }
  if (!recipeModal.classList.contains('open') && !formModal.classList.contains('open') && !indexModal.classList.contains('open')) {
    if (event.key === 'ArrowRight') goNext();
    if (event.key === 'ArrowLeft') goPrev();
  }
});

page.addEventListener('touchstart', (event) => {
  touchStartX = event.changedTouches[0].clientX;
  touchStartY = event.changedTouches[0].clientY;
}, { passive: true });
page.addEventListener('touchend', (event) => {
  const dx = event.changedTouches[0].clientX - touchStartX;
  const dy = event.changedTouches[0].clientY - touchStartY;
  if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.25) {
    dx < 0 ? goNext() : goPrev();
  }
}, { passive: true });

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  installPrompt = event;
  $('#installButton').hidden = false;
});
$('#installButton').addEventListener('click', async () => {
  if (!installPrompt) return;
  installPrompt.prompt();
  await installPrompt.userChoice;
  installPrompt = null;
  $('#installButton').hidden = true;
  closeMenu();
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(console.error));
}

clearSearch.style.visibility = 'hidden';
renderTagFilters();
renderIndex();
renderPage();
