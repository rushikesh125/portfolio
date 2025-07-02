import ScrollReveal from 'scrollreveal';
export const fadeUp = (name='fade-up',duration=1000) => {
    ScrollReveal().reveal(`.${name}`, {
        distance: '50px',
        duration: duration,
        easing: 'ease-in-out',
        origin: 'bottom',
        reset: false, // Optionally resets the animation when scrolling in/out of view
      });
};
export const fadeDown = (name='fade-down',duration=1000) => {
    ScrollReveal().reveal(`.${name}`, {
        distance: '100px',
        duration: duration,
        easing: 'ease-in-out',
        origin: 'top',
        reset: false, // Optionally resets the animation when scrolling in/out of view
      });
};
export const fadeLeft = (name="fade-left",duration=1000,delay=1000)=>{
  ScrollReveal().reveal(`.${name}`, {
    distance: '20px',
    duration: duration,
    easing: 'ease-in-out',
    origin: 'left',
    reset: false,
    delay:delay // Optionally resets the animation when scrolling in/out of view
  });
}
export  function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}