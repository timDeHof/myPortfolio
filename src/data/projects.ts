import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    title: "Galactic Pawn",
    description: [
      "Galactic Pawn is a project I built alongside Aaron Heiy, Taylor Kirkes, and Jacob Warren for a capstone project. We were instructed to create an e-commerce shop web application from scratch.",
      "We decided to create an e-commerce application for a fictional pawn shop at the end of the galaxy. This allowed us to be creative with the items in the database system.",
      "This e-commerce application required a lot of heavy lifting to create a universal cart and overall shopping experience as well as introduce the products and include an admin page."
    ],
    collaborators: [
      { name: "Aaron Heiy", url: "https://github.com/Aheiy1" },
      { name: "Taylor Kirkes", url: "https://github.com/kirkes21" },
      { name: "Jacob Warren", url: "https://github.com/jawarr" },
    ],
    liveUrl: "https://capstone-galactic-pawn.onrender.com/",
    sourceUrl: "https://github.com/PawnShop-at-the-end-of-the-galaxy/PawnShop-Galaxy",
    imageUrl: "/galactic-pawn-project-image.png",
    technologies: ["React", "Node.js", "PostgreSQL", "Express"],
    featured: true,
  },
  {
    id: 2,
    title: "Smart Brain: Face-Recognition app",
    description: [
      "Introducing Smart Brain, a full-stack project that uses machine-learning to detect faces within any image.",
      "Built with React, NodeJS, PostgreSQL and utilizing Heroku, Render, Netlify and the Clarifai REST API, this project allows users to upload an image URL and instantly see the faces within the image.",
      "The project was created as a way to showcase my skills in web development and full-stack technologies."
    ],
    liveUrl: "https://big-smart-brain.netlify.app/",
    sourceUrl: "https://github.com/timDeHof/facerecognitionbrain",
    imageUrl: "/movie-watchlist-project-image.png",
    technologies: ["React", "Node.js", "PostgreSQL", "Clarifai API"],
    featured: true,
  },
  {
    id: 3,
    title: "CRWN Clothing",
    description: [
      "Introducing CRWN Clothing, a full-stack e-commerce website that is built with React, NodeJS, Stripe, and Firebase/Firestore.",
      "The goal of this project was to create a boilerplate for future similar work and showcase payment integration on future company websites.",
      "This website is designed to handle secure payments, routes, noSQL databases, and OAuth integration with ease."
    ],
    liveUrl: "https://crwn-clothing-company.netlify.app/",
    sourceUrl: "https://github.com/timDeHof/crwn-clothing",
    imageUrl: "/movie-watchlist-project-image-1.png",
    technologies: ["React", "Firebase", "Stripe", "Sass"],
    featured: true,
  },
  {
    id: 4,
    title: "Movie Watchlist",
    description: [
      "Movie Watchlist is the perfect search engine for movie buffs. With our easy-to-use interface, users can create a personalized watch list of their favorite movies in just a few clicks.",
      "Plus, we offer up-to-date information on new and upcoming releases, so users can always stay ahead of the curve.",
      "Whether you're looking for classic films or the latest blockbusters, Movie Watchlist is the perfect destination for movie lovers everywhere."
    ],
    liveUrl: "https://movies-watchlist-solo.netlify.app/",
    sourceUrl: "https://github.com/timDeHof/movie-watchlist",
    imageUrl: "/movie-watchlist-project-image-2.png",
    technologies: ["JavaScript", "HTML", "CSS", "OMDB API"],
  },
  {
    id: 5,
    title: "Monster Rolodex",
    description: [
      "This rolodex is full of monster friends for you to contact to scare your siblings.",
      "With this collection of fiends, you'll be able to get the best jump scares in town!"
    ],
    liveUrl: "https://monster-rolodex-react-2.netlify.app/",
    sourceUrl: "https://github.com/timDeHof/monsters-rolodex",
    imageUrl: "/monster-rolodex-project-image.png",
    technologies: ["React", "TypeScript", "CSS"],
  },
  {
    id: 6,
    title: "Password Generator",
    description: [
      "Password Generator is the simplest and the most secure way to create a set of passwords for your signups.",
      "Using this app, you don't have to worry about using an insecure password ever again.",
      "Password Generator creates a set of random passwords for you that are unique and strong – perfect for all your signups!"
    ],
    liveUrl: "https://timdehof.github.io/passwordGenerator/",
    sourceUrl: "https://github.com/timDeHof/passwordGenerator",
    imageUrl: "/password-generator-project-image.png",
    technologies: ["JavaScript", "HTML", "CSS"],
  },
];