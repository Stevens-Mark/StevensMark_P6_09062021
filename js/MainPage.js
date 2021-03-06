/* eslint-disable no-console *//* eslint-disable no-undef */

// DYNAMICALLY ADD ALL THE PHOTOGRAPHERS TO THE MAIN PAGE

const CreatePage = (photographers) => {
  document.querySelector('.pass-to-maincontent').focus();
  const photographerElement = document.querySelector('#main');
  let photographerhtml = '';

  photographers.forEach((person) => {
    const { tags } = person;
    photographerhtml += `
    <article class="profile">
      <a href="photographer-page.html?id=${person.id}"><img class="profile__portrait" src="/public/images/photography/Photographers_id_photos/${person.portrait}"
      alt="link to photographers page">
      <h2 class="profile__name">${person.name}</h2></a>
        <h3 class="profiles__address">${person.city}, ${person.country}</h3>
        <h4 class="profile__tagline">${person.tagline}</h4>
        <h5 class="profile__price">${person.price}€/jour</h5>
        <ul class="profile__tags" aria-label="categories">${tags.map((tag) => `<li tabindex="0" class="tags" arial-label="${tag}">#${tag}</li>`).join('')}</ul> 
    </article>`;
    photographerElement.innerHTML = photographerhtml;
    /* map & join etc solution found in sources folder */
  });

  // EVENT LISTENERS ON TAGS FOR FILTERING
  const tagList = document.querySelectorAll('.tags');
  tagList.forEach((item) => {
    item.addEventListener('click', (event) => {
      const tagSelected = event.target.textContent.toLowerCase().slice(1);
      DisplayPhotographerByTagSelected(tagSelected, photographers);
    });
    /* Event Listener (for keyboard) for the like feature */
    item.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        const tagSelected = event.target.textContent.toLowerCase().slice(1);
        DisplayPhotographerByTagSelected(tagSelected, photographers);
      }
    });
  });
};

// FETCH THE PHOTOGRAPHER DATA FROM THE JSON FILE

fetch('./public/data.json')
  .then((response) => response.json())
  .then((data) => {
    const { photographers } = data;
    CreatePage(photographers);
  })
  .catch((error) => console.error(error));

document.activeElement.focus();
