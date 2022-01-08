// Varible
let mainColor = localStorage.getItem('main_color'),
  mainRandom = localStorage.getItem('main_random'),
  colorls = document.querySelectorAll('.colors li'),
  random = document.querySelectorAll('.random span'),
  myIcon = document.querySelector('.icon'),
  landingPage = document.querySelector('.landing-page'),
  imagesArray = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg'],
  randomInterval,
  skills = document.querySelector('.skills'),
  images = document.querySelectorAll('img');
// Check Local Storage
if (mainColor !== null) {
  // Set Color 
  document.documentElement.style.setProperty('--main-color', mainColor);

  // Set or Remove Active Class For Colors 
  for (col of colorls) {
    if (col.getAttribute('data-color') === mainColor) {
      col.classList.add('active');
    } else {
      col.classList.remove('active');
    }
  }
}
window.onload = () => {
  if (mainRandom !== null) {
    if (mainRandom === 'no') {
      clearInterval(randomInterval);
    }
    // Set or Remove Active Class For random 
    for (sp of random) {
      if (sp.getAttribute('data-random') === mainRandom) {
        sp.classList.add('active');
      } else {
        sp.classList.remove('active');
      }
    }
  }
}
// Open Setting
myIcon.onclick = () => {
  // make the setting icon reycle
  myIcon.classList.toggle('fa-spin');

  // add open class for setting box
  document.querySelector('.setting-box').classList.toggle('open');
}

// Choise Color
colorls.forEach(li => {
  li.onclick = (e) => {
    // set color page
    document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

    // send color to localStorage
    localStorage.setItem('main_color', e.target.dataset.color);

    // add or remove active class for color
    for (col of colorls) {
      col.classList.remove('active');
    }

    e.target.classList.add('active');
  }
});

// Choise Random
random.forEach(span => {
  span.onclick = (e) => {
    // send random to localStorage
    localStorage.setItem('main_random', e.target.dataset.random);

    // add or remove active class for random
    for (sp of random) {
      sp.classList.remove('active');
    }

    e.target.classList.add('active');

    if (e.target.dataset.random === 'yes') {
      backInt();
    } else {
      clearInterval(randomInterval);
    }
  }

});

// Change Background Image
function backInt() {
  randomInterval = setInterval(() => {
    let randomNumber = Math.floor(Math.random() * imagesArray.length);
    landingPage.style.backgroundImage = `url(../images/${imagesArray[randomNumber]})`;
  }, 3000);
}
backInt();

window.onscroll = () => {
  let skillsHeight = skills.offsetHeight;
  let skillsScroll = skills.offsetTop;
  let windowHeight = this.innerHeight;
  let scrollPage = this.pageYOffset;
  let all = skillsScroll + skillsHeight - windowHeight;
  let allSkills = document.querySelectorAll('.skill-progress span');
  if (scrollPage > (all)) {
    allSkills.forEach(skill => {
      skill.style.width = skill.dataset.progress;
    })
  }
}

images.forEach((img) => {
  img.addEventListener('click', (e) => {
    // Create Overlay
    let overlay = document.createElement('div');
    overlay.className = 'pupop-overlay';

    // Add Overlay to Body
    document.body.appendChild(overlay);

    // Create PupopBox 
    let pupopBox = document.createElement('div');
    pupopBox.className = 'pupop-box';

    // Add Heading to Pupop
    if (img.alt !== null) {
      let headingPupop = document.createElement('h3');
      let textHeading = document.createTextNode(img.alt);
      headingPupop.appendChild(textHeading);
      pupopBox.appendChild(headingPupop);
    }

    // Add Image to Pupop
    let imagePupop = document.createElement('img');
    imagePupop.src = img.src;
    pupopBox.appendChild(imagePupop);


    // Add Close Button 
    let closeBtn = document.createElement('span');
    let textBtn = document.createTextNode('x');
    closeBtn.appendChild(textBtn);
    closeBtn.className = "close-btn";
    pupopBox.appendChild(closeBtn);

    // Add Pupop to Body
    document.body.appendChild(pupopBox);
  })
})

document.addEventListener('click', (e) => {
  if (e.target.className == 'close-btn') {
    e.target.parentNode.remove();
    document.querySelector('.pupop-overlay').remove();
  }
})
