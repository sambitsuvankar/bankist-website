'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1')

const openModal = function (e) {
    e.preventDefault()
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
///////////////////////////////////////////////////////
///////////////  click on 'learn more' button and scroll
btnScrollTo.addEventListener('click', function(e){
    const s1coords = section1.getBoundingClientRect(); //This will show the coordinates of the position of the section 1 in reference of X and Y axis.  and the values are always relative to the Viewports not the documents.
    console.log(s1coords);

    console.log(e.target.getBoundingClientRect()) // This will show the coordinates of the position of the targeted element.

    console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset) // This will show the current scroll distance in pixel in reference to X and Y axis of display window. The values are always relative to the Document.

    console.log('height/width viewport', document.documentElement.clientHeight, document.documentElement.clientWidth)  // This will show the current height  and width of the Viewpost. Here the values are relative to the viewport.

    // Scroll functionality_______
    // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset);

    // The above method was right. But to implement the scroll functionality with a smooth animation we can do this 
    window.scrollTo({
        left : s1coords.left + window.pageXOffset,
        top :  s1coords.top + window.pageYOffset,
        behavior : 'smooth',   // For a smooth animation
    })  // So instead of passing the arguments directly we made an object and passed the object to the scrollTo()

    // There is yet another modern method of doing the same scroll ,it only supports the modern browser.
    
    section1.scrollIntoView({behavior: 'smooth'})
})

/////////////////////////////////////////////////////////////
// Page navigation

/* document.querySelectorAll('.nav__link').forEach(function(el){
  el.addEventListener('click', function(e){  //( Here we added the eventListener function in each elemnt.that comes under the "nav__link" class. -> HowEver in practical cases when we have thousands of elements then adding eventListener to each of the element will not be a good practice. So in that case we can use Event Deligation.)
    e.preventDefault()
    const id = this.getAttribute('href');
    console.log(id);

    const section = document.querySelector(id)
    const el1Coord = section.getBoundingClientRect();
    console.log(el1Coord);
    section.scrollIntoView({behavior : 'smooth'})
  })
}) */

// Event Deligation.__________________
// 1.-> In event deligation firstly we need to add the eventListener to  one common parent element of all the elements that we are interested in.
// 2.-> Determine what element originated the event.
document.querySelector(".nav__links").addEventListener('click', function(e){
  e.preventDefault()
  // console.log(e.target);

    // Matching Strategy
    if (e.target.classList.contains("nav__link")){
      const id = e.target.getAttribute('href');
      // console.log(id);
      const section = document.querySelector(id);
      section.scrollIntoView({behavior : 'smooth'});
    }
    
})
// Here in above we did not select all the child elements and attached the eventListener to each of the elements.
// But We applied the Event deligation method and attached the eventListener to the parent element of all athe elements we are interedsted in. and the eventListener target each child element on the click.


////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
// Building a Tabbed component on the operation division in section 2
const tabs = document.querySelectorAll(".operations__tab"); // Child calsses
console.log(tabs)
const tabContainer = document.querySelector('.operations__tab-container'); // parent class
const tabsContent = document.querySelectorAll(".operations__content")

tabContainer.addEventListener('click', function(e){
  e.preventDefault();

  const clicked = e.target.closest('.operations__tab') // Here we used the closest() method because if someone clicks on the <span> then it target to the closest parent element which class is ('.operations_tab') and if someone clicks on the ('operations__tab') then it targets the same class button itself. 

  // Guard Clause
  if(!clicked) return;  // This means if the click is out side of the button or nothing is clicked then return immidiately.

  tabs.forEach( function(el) {
     el.classList.remove("operations__tab--active") // Here we cleared the active class from all elements
  })

  clicked.classList.add("operations__tab--active") // Here we added the active class in targeted element
  console.log(clicked.dataset.tab)

  // Activate content Area
  const activeNum = clicked.dataset.tab;

  tabsContent.forEach(function(tar){
    tar.classList.remove("operations__content--active");
  })

  document.querySelector(`.operations__content--${activeNum}`).classList.add("operations__content--active");
})

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
// Menu fade Animation___________
const nav = document.querySelector(".nav");


const handleHover = function(e,opacity){
  if (e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach( el => {
      if (el !== link) el.style.opacity = opacity
    })
    logo.style.opacity = opacity;
  }
}



nav.addEventListener("mouseover",function(e){ // 'mouseover' event is also same as 'mouseenter'. The difference is mouseover goes through bubbling phase but mouseenter doesn't. 
  e.preventDefault();

  handleHover(e, 0.5)
  
});

nav.addEventListener("mouseout",function(e){  // mouseover opposite mouseout and mouseenter opposite mouseleave.
  e.preventDefault();
  handleHover(e, 1)
})

/////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
// Implimenting a sticky Navigation : The Scroll event.

/* const initialCoords = section1.getBoundingClientRect()
console.log(initialCoords)
window.addEventListener('scroll', function(e) {
  // console.log(window.scrollY)
  console.log(window.scrollY)
  console.log(initialCoords.top)
  if(window.scrollY > initialCoords.top) {
    nav.classList.add('sticky')
  }
  else{
    nav.classList.remove('sticky')
  };
}) */

////////////////////////////////////////////////////////
///////////////////////////////////////////////////////// ✅ Imp
// A better way of implimenting the same sticky navigation : The intersection Observer API
// example
const observerCallback = function (entries, observer) {
  entries.forEach( entry => console.log(entry))
}

const observerOpt = {
  root : null,
  threshold : [0, 0.2]
}

const observer = new IntersectionObserver(observerCallback, observerOpt);

observer.observe(section1)
//////////////////////////////////////////////////////////////// ✅ Imp
const header = document.querySelector('.header')
const navHeight = nav.getBoundingClientRect()  // here we can get the height property of navbar dynamically 

const stickyNav = function(entries, observer) {
  const entry  =  entries[0]
  // console.log(entry)

  if(!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove('sticky')
}

const headerObserverOption = {
  root : null,      // root : null means the reference will be the view port
  threshold : 0,   // threshold : 0 means when 0% of the section interact with the viewport means get invisible. 
  rootMargin : `-${navHeight.height}px`  // Here we set the margin of view port
}

const headerObserver = new IntersectionObserver(stickyNav, headerObserverOption);
headerObserver.observe(header)
// -> In our above example when ever our 1st section "section1" intersect the view port at 10% ,then viewPort becomes the 'root' and 10% becomes the threshold here.
// -> and whenever this happens then the callback function will get called with 2 arguments (entries, observer)

////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
// reveal Sections : By using Intersection Observer API
const allSections = document.querySelectorAll('.section')

const revealSection = function(entries, observer){
  const [entry] = entries;
  // console.log(entry)

  if(!entry.isIntersecting) return;  // Guard clause
  entry.target.classList.remove('section--hidden');

  observer.unobserve(entry.target)
};

const revealSectionOpt = {
  root : null,
  threshold : 0.15, // This means the section will only visible when the section is 15% visible.
};

const sectionObserver = new IntersectionObserver(revealSection, revealSectionOpt);

allSections.forEach( function(section){
  sectionObserver.observe(section)
  section.classList.add('section--hidden')
});

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
// Lazy Loading Images : By using Intersection Observer API
const imgTarget = document.querySelectorAll('img[data-src]') // Here we selected the image element ehich contains the data attribute.

const loadImg = function(entries, observer){
  const [entry] = entries ; // Number of thresholds = number of entries.
  console.log(entry)

  const imgLink = entry.target.dataset.src

  if(!entry.isIntersecting) return
  entry.target.setAttribute('src', `${imgLink}`) // here we replaced the src attribute with data-src attribute
  // entry.target.classList.remove('lazy-img') // If we directly remove the class then it will immidiately remove the blur effect

  entry.target.addEventListener('load', function(){ // So here we added the load event so that the blur effect will remove slowly
    entry.target.classList.remove('lazy-img')
  })

  observer.unobserve(entry.target)
}

const loadImgOpt = {
  root : null,
  threshold : 0
}

const imgObserver = new IntersectionObserver(loadImg, loadImgOpt)

imgTarget.forEach( function (img){
  imgObserver.observe(img)
  img.classList.add('lazy-img')
})

////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
// Building a slider component

const slider = document.querySelectorAll('.slide');
const sliderBtnLeft = document.querySelector('.slider__btn--left')
const sliderBtnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots')

const maxSlide = slider.length;

let currentSlide = 0;

const goToNext = function(e){
      slider.forEach(function(slide, index){
      slide.style.transform = `translateX(${100 * (index - e)}%)`
    })
}

goToNext(0);   // here we 1st declared the function to align the slides in their initial position.


const nextSlide = function(){   // For Next Slide
  currentSlide++;
  if(currentSlide === maxSlide){
    currentSlide = 0;
  }
  
  goToNext(currentSlide)
  activeDots(currentSlide)
}

const prevSlide = function(){  // For the previous slide.
  currentSlide--;
  if(currentSlide === -1){
    currentSlide = maxSlide - 1;
  }

  goToNext(currentSlide);
  activeDots(currentSlide)
}

sliderBtnRight.addEventListener('click', nextSlide)  // Left button click
sliderBtnLeft.addEventListener('click', prevSlide)   // Right button click

document.addEventListener('keydown', function(e){    // Left right Key press function
  // console.log(e)
  if(e.key === 'ArrowLeft') prevSlide();
  if(e.key === 'ArrowRight') nextSlide();
})

///////  Creating Dots.
const createDots = function(){
  slider.forEach(function (_, i){
    dotContainer.insertAdjacentHTML('beforeend',`<button class = "dots__dot" data-slide="${i}"></button>`)
  })
}

createDots();

const activeDots = function(slide){          // Adding active class to the selected dots.
  document.querySelectorAll('.dots__dot').forEach( e => e.classList.remove('dots__dot--active'))
  document.querySelector(`.dots__dot[data-slide = "${slide}"]`).classList.add("dots__dot--active")
}

activeDots(currentSlide)  // To set the active dots position relative to the slides as well from the begining.

dotContainer.addEventListener('click', function(e){    // adding click events on the dots.
  // console.log(e.target)
  let target = e.target.dataset.slide
  goToNext(target)

  activeDots(target)
})

//////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
// LifeCycle DOM Events
document.addEventListener('DOMContentLoaded', function(e){
  console.log('HTML Parsed and DOM tree built!', e)
});

window.addEventListener('load', function(e){
  console.log('Page fully loaded', e)
});

window.addEventListener('beforeunload', function(e){
  e.preventDefault();
  console.log(e)
  e.returnValue = 'message';
})