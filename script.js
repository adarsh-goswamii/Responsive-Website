function init() {
    // alert("hii");
    let currPageNo= 0, scroll_slide= 0;
    const slides = document.querySelectorAll('.slide');
    const pages= document.querySelectorAll('.page');
    background= [ 'radial-gradient(#2B3760, #0B1023)', 
                'radial-gradient(#4a1e0d, #260b01)', 
                'radial-gradient(#adb5bd, #212529)' ]; 

    slides.forEach((slide, index) => {
        slide.addEventListener('click', function() {
            changeDots(this); // here this basically points to the slide we just clicked
            changeSlide(index);
            scroll_slide= index;
        });
    });

    function changeDots(dot) {
        slides.forEach(slide=> {
            slide.classList.remove("active");
        });
        dot.classList.add("active");
    }

    function changeSlide(pageNo) {
        const loadPage= pages[pageNo];
        const currPage= pages[currPageNo];

        let loadImgLeft= loadPage.querySelector('.hero .model_left');
        let loadImgRight= loadPage.querySelector('.hero .model_right');
        let currImgLeft= currPage.querySelector('.hero .model_left');
        let currImgRight= currPage.querySelector('.hero .model_right');
        let loadText= loadPage.querySelector('.details');
        let portfolio= document.querySelector('.portfolio');
        // prompt(currPage+" "+currImgLeft+" "+currImgRight);

        /** 
         * So we can control what we want to do when the animation starts and when completed.
         * Here, we want to stop all pointer events till the animation completes and then we can 
         * make other things clickable too.
         */
        const t1= new TimelineMax({
            onStart: function() {
                slides.forEach(slide => {
                    slide.style.pointerEvents= 'none';
                })
            }, 
            onComplete: function() {
                slides.forEach(slide => {
                    slide.style.pointerEvents= 'all';
                })
            }
        });

        t1.fromTo(currImgLeft, 0.3, {y: '-10%'}, {y: '-100%'})
        .fromTo(currImgRight, 0.3, {y: '10%'}, {y: '-100%'}, '-=0.2')
        .to(portfolio, 0.3, {backgroundImage: background[pageNo]})
        .fromTo(currPage, 0.3, {opacity: 1, pointerEvents: 'all'}, {opacity:0, pointerEvents:'none'})
        .fromTo(loadPage, 0.3, {opacity: 0, pointerEvents: 'none'}, {opacity: 1, pointerEvents:'all'}, '-=0.5')
        .fromTo(loadImgLeft, 0.3, {y: '-100%'}, {y: '-10%'}, '-=0.5')
        .fromTo(loadImgRight, 0.3, {y: '-100%'}, {y: '10%'}, '-=0.7')
        .fromTo(loadText, 0.3, {opacity: 0, y: 30}, {opacity: 1, y: 0})
        .set(loadImgLeft, { clearProps: 'all' })
        .set(loadImgRight, { clearProps: 'all' });
        // most of the part is self-explanatory but the -=0.2 parameter has been added as
        // initially first currImgLeft animation will occur for 0.3 and then currImgRight 
        // animation will occur but we dont want that time delay and wish it to start after 0.1
        currPageNo= pageNo;
    }

 
    // we are not adding event listener for scroll instead we are doing for wheel 
    // as our webpage wont have a scroll its just a one full-page website.
    
    /** throttle(function, time in millisecond)
     * 1500 here represents time that is 1500ms as we have some animations so we want to wait for the
     * animations to load up. So basically here scroll will work at 1500ms time interval.
     */
    document.addEventListener('wheel', throttle(scrollChange, 1500));

    // Its the same thing as above but as we dont have scroll in mobiles thats why we will use touchmove.
    document.addEventListener('touchmove', throttle(scrollChange, 1500));

    /** function scrollChange(eventlistner): which here happens to be the scroll.
     * So eventlistner has a attribute called deltaY whose value is 100 when we scrollDown, and -100
     * when we scrollUpwards. YOU CAN CHECK OTHER ATTRIBUTES USING console.log(e); which reads value 
     * every 1500ms.
     */
    function scrollChange(e) {
        // console.log(e);

        if(e.deltaY> 0) {   // scrolled downwards
            scroll_slide+= 1;
        } else if(e.deltaY< 0) {    // scrolled upwards
            scroll_slide-= 1;
        }

        scroll_slide= (scroll_slide+ 3)% 3; // this will help us keep the value of scroll_slide btw [0-2].
        changeSlide(scroll_slide);
        changeDotsWhenScrolled(scroll_slide);
    }

    function changeDotsWhenScrolled(dot) {
        const active_slide= document.querySelectorAll(".slide")[dot];
        slides.forEach(slide => {
            slide.classList.remove("active");
        });

        active_slide.classList.add("active");
    }

    // navigation part of the animations starts here.
    let hamburger= document.querySelector(".menu");
    let hamburger_lines= document.querySelectorAll(".menu line");
    let nav_open= document.querySelector(".nav-open");
    let contact= document.querySelector(".contact");
    let social= document.querySelector(".social");
    let logo= document.querySelector(".logo");
 
    const t2= new TimelineMax({
        paused: true, 
        reversed: true
    });

    t2.to(nav_open, 0.5, {y: 0})
        .fromTo(contact, 0.5, {opacity: 0, y: 10}, {opacity: 1, y: 0}, "-=0.1")
        .fromTo(social, 0.5, {opacity: 0, y: 10}, {opacity: 1, y: 0}, "-=0.5")
        .fromTo(logo, 0.2, { color: "white" }, { color: "black" }, "-=0.8")
        .fromTo(hamburger_lines, 0.2, { stroke: "white" }, { stroke: "black" }, "-=1");
    
    hamburger.addEventListener("click", () => {
        t2.reversed()? t2.play() : t2.reverse();
    });
}

// This is basically a code snippet, which will help us load the pages when scrolled.
function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
}

init();

