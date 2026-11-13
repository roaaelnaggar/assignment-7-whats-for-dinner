let lastIndex = -1;
function getRandomMeal() {
  let index = Math.floor(Math.random() * meals.length);

  while (index === lastIndex && meals.length > 1) {
    index = Math.floor(Math.random() * meals.length);
  }

  lastIndex = index;
  localStorage.setItem("lastMealIndex", index);

  return meals[index];
}
function fillList(listId, items) {
  let list = document.getElementById(listId);
  list.innerHTML = "";

  for (let i = 0; i < items.length; i++) {
    let li = document.createElement("li");
    li.textContent = items[i];
    list.appendChild(li);
  }
}
function showMeal(meal) {
  document.getElementById("meal-name").textContent = meal.name;
  document.getElementById("meal-description").textContent = meal.description;
  document.getElementById("meal-image").src = meal.image;
  document.getElementById("meal-difficulty").textContent = meal.difficulty;
  document.getElementById("meal-cuisine").textContent = meal.cuisine;

  document.getElementById("meal-rating").textContent = meal.rating;
  document.getElementById("meal-reviews").textContent = "(" + meal.reviews + " reviews)";

  document.getElementById("prep-time").textContent = meal.prepTime + " min";
  document.getElementById("cook-time").textContent = meal.cookTime + " min";
  document.getElementById("servings").textContent = meal.servings + " people";

  let warning = document.getElementById("time-warning");

  if (meal.prepTime + meal.cookTime > 45) {
    warning.classList.remove("hidden");
  } else {
    warning.classList.add("hidden");
  }

  // lists
  fillList("ingredients-list", meal.ingredients);
  fillList("instructions-list", meal.instructions);
  fillList("tips-list", meal.tips);

  // nutrition
  document.getElementById("calories").textContent = meal.nutrition.calories + " kcal";
  document.getElementById("protein").textContent = meal.nutrition.protein + "g";
  document.getElementById("carbs").textContent = meal.nutrition.carbs + "g";
  document.getElementById("fat").textContent = meal.nutrition.fat + "g";
  document.getElementById("fiber").textContent = meal.nutrition.fiber + "g";
  document.getElementById("sodium").textContent = meal.nutrition.sodium + "mg";
}

// button click
document.getElementById("try-another").addEventListener("click", function () {
  showMeal(getRandomMeal());
});

// when the page opens: show the saved meal, or a random one if nothing is saved
let savedIndex = localStorage.getItem("lastMealIndex");

if (savedIndex !== null && meals[savedIndex]) {
  lastIndex = Number(savedIndex);
  showMeal(meals[lastIndex]);
} else {
  showMeal(getRandomMeal());
}