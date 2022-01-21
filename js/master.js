// Varible
let mainColor = localStorage.getItem('main_color'),
  mainRandom = localStorage.getItem('main_random'),
  mainBullet = localStorage.getItem('main_bullet'),
  colorls = document.querySelectorAll('.colors li'),
  random = document.querySelectorAll('.random span'),
  bull = document.querySelectorAll('.bullet1 span'),
  myIcon = document.querySelector('.icon'),
  landingPage = document.querySelector('.landing-page'),
  imagesArray = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg'],
  randomInterval,
  skills = document.querySelector('.skills'),
  images = document.querySelectorAll('.galaxy img'),
  myBullets = document.querySelectorAll('.bullet'),
  myLinks = document.querySelectorAll('.links a');

// Check Local Storage
if (mainColor !== null) {
  document.documentElement.style.setProperty('--main-color', mainColor);
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
    for (sp of random) {
      if (sp.getAttribute('data-random') === mainRandom) {
        sp.classList.add('active');
      } else {
        sp.classList.remove('active');
      }
    }
  }
}

if (mainBullet !== null) {
  bull.forEach(span => {
    span.classList.remove('active');
  })
  if (mainBullet === 'block') {
    document.querySelector('.bullet1 span.yes').classList.add('active');
    document.querySelector('.bullets').style.display = 'block';

  } else if (mainBullet === 'none') {
    document.querySelector('.bullet1 span.no').classList.add('active');
    document.querySelector('.bullets').style.display = 'none';
  }
}
// Open Setting
myIcon.onclick = () => {
  myIcon.classList.toggle('fa-spin');
  document.querySelector('.setting-box').classList.toggle('open');
}

// Choise Color
colorls.forEach(li => {
  li.onclick = (e) => {
    document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
    localStorage.setItem('main_color', e.target.dataset.color);
    handelActive(e);
  }
});

// Choise Random
random.forEach(span => {
  span.onclick = (e) => {
    localStorage.setItem('main_random', e.target.dataset.random);
    handelActive(e);
    if (e.target.dataset.random === 'yes') {
      backInt();
    } else {
      clearInterval(randomInterval);
    }
  }
});

// Choise bullets 
bull.forEach(span => {
  span.addEventListener('click', (e) => {
    if (span.dataset.bullet === 'block') {
      localStorage.setItem('main_bullet', 'block');
      document.querySelector('.bullets').style.display = 'block';
    } else {
      localStorage.setItem('main_bullet', 'none');
      document.querySelector('.bullets').style.display = 'none';
    };
    handelActive(e);
  })
})
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
    let overlay = document.createElement('div');
    overlay.className = 'pupop-overlay';
    document.body.appendChild(overlay);
    let pupopBox = document.createElement('div');
    pupopBox.className = 'pupop-box';
    if (img.alt !== null) {
      let headingPupop = document.createElement('h3');
      let textHeading = document.createTextNode(img.alt);
      headingPupop.appendChild(textHeading);
      pupopBox.appendChild(headingPupop);
    }
    let imagePupop = document.createElement('img');
    imagePupop.src = img.src;
    pupopBox.appendChild(imagePupop);
    let closeBtn = document.createElement('span');
    let textBtn = document.createTextNode('x');
    closeBtn.appendChild(textBtn);
    closeBtn.className = "close-btn";
    pupopBox.appendChild(closeBtn);
    document.body.appendChild(pupopBox);
  })
})

document.addEventListener('click', (e) => {
  if (e.target.className == 'close-btn') {
    e.target.parentNode.remove();
    document.querySelector('.pupop-overlay').remove();
  }
})

document.querySelector('.reset').onclick = () => {
  localStorage.clear();
  window.location.reload();
}

let mymenu = document.querySelector('.btnLogo');
let tlinks = document.querySelector('.links');

mymenu.onclick = (e) => {
  e.stopPropagation();
  mymenu.classList.toggle('menu-active');
  tlinks.classList.toggle('open');
}

tlinks.onclick = (e) => {
  e.stopPropagation();
}

document.onclick = (e) => {

  if (e.target !== mymenu && e.target !== tlinks) {
    if (tlinks.classList.contains('open')) {
      tlinks.classList.toggle('open');
      mymenu.classList.toggle('menu-active');
    }
  }
}
// Change Background Image
function backInt() {
  randomInterval = setInterval(() => {
    let randomNumber = Math.floor(Math.random() * imagesArray.length);
    landingPage.style.backgroundImage = `url(../images/${imagesArray[randomNumber]})`;
  }, 3000);
}

function scrollInView(el) {
  el.forEach(ele => {
    ele.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: 'smooth'
      })
    })
  })
}

function handelActive(e) {
  e.target.parentElement.querySelectorAll('.active').forEach(el => {
    el.classList.remove('active');
  })
  e.target.classList.add('active');
}

backInt();
scrollInView(myBullets);
scrollInView(myLinks);
