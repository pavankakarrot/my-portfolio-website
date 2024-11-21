module.exports = {
  email: 'pavankakarrot@gmail.com',

  socialMedia: [
    {
      name: 'GitHub',
      url: 'https://github.com/pavankakarrot',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/pavankakarrot',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/pavankakarrot',
    },
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/pavan-tummalapenta',
    },
  ],

  navLinks: [
    {
      name: 'About',
      url: '/#about',
    },
    {
      name: 'Projects',
      url: '/#projects',
    },
    {
      name: 'Skills',
      url: '/#skills',
    },
    {
      name: 'Experience',
      url: '/#jobs',
    },
    {
      name: 'Contact',
      url: '/#contact',
    },
  ],

  colors: {
    green: '#ff914d',
    navy: '#0a192f',
    darkNavy: '#FBF8F3',
  },

  srConfig: (delay = 200, viewFactor = 0.25) => ({
    origin: 'bottom',
    distance: '20px',
    duration: 500,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
  }),
};
