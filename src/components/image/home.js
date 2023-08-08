import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../App.css"
import Logo from "./logo.png";
import Image1 from "../s"
const Home = () => {
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
      setMenuVisible(!menuVisible);
    };
  
  
  

//     // Counter Script 
//     function formatNumber(number) {
//   if (number < 500) {
//     return number;
//   } else if (number < 1000000) {
//     return (number) + 'k';
//   } else {
//     return (number / 1000000) + 'm';
//   }
// }

// // Function to animate the counter
// function animateCounter(elementId, targetNumber) {
//   var counterElement = document.getElementById(elementId);
//   var currentNumber = 0;

//   var interval = setInterval(function() {
//     if (currentNumber < targetNumber) {
//       currentNumber += Math.ceil(targetNumber / 20);
//       if (currentNumber > targetNumber) {
//         currentNumber = targetNumber;
//       }
//       counterElement.textContent = formatNumber(currentNumber);
//     } else {
//       clearInterval(interval);
//     }
//   }, 50); // Adjust the animation speed here (lower value = faster animation)
// }

// // Call the animateCounter function for each container
// animateCounter('counter1', 990);
// animateCounter('counter2', 156);
// animateCounter('counter3', 43000000);
  return (
    <div>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;600;700&display=swap" rel="stylesheet" />
    <title>Document</title>
    <link rel="stylesheet" href="style.css" />
    <link rel="stylesheet" href=" https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
    <section className="header">
      {/* Navbar starts */}
      <nav>
        <a href="index.html"> <img src={Logo} /> </a>
        <div className="nav-links" id="navLinks">
          <i className="fa fa-times" onclick="hideMenu()" />
          <ul>
            <li><a href>HOME</a></li>
            <li><a href>ABOUT</a></li>
            <li><a href>COMPANY</a></li>
            <li><a href="search.html">SEARCH</a></li>
            <li><a href="login.html">LOGIN</a></li>
          </ul>
        </div>
        <i className="fa fa-bars" onclick="showMenu()" />
      </nav>
      {/* Navbar Ends */}
      {/* Center starts */}
      <div className="text-box">
        <h1>Blood Bank Management System</h1>
        <p>A blood bank is a center where blood gathered as a result of blood donation <br /> is stored and preserved for later use in blood transfusion.</p>
        <a href className="hero-btn"> Donate Blood Now</a>
      </div>
    </section>
    {/* Center Ends */}
    {/* Card Starts */}
    <h1 className="title">Card Gallery</h1>
    <div className="card-container" style={{display: 'flex', justifyContent: 'center'}}>
      <div className="card">
        <img src="image/recruitment-hiring-career-job-emplyment-concept.jpg" alt="Image" />
        <div className="card-text">
          <h2>Card Title 1</h2>
          <p>This is the description for Card 1.</p>
          <a href className="hero-btn" style={{marginTop: '50px'}}> Learn More</a>
        </div>
      </div>
      <div className="card">
        <img src="image/rag-doll-lined-up-one-red-through-magnifying-glass.jpg" alt="Image" />
        <div className="card-text">
          <h2>Card Title 2</h2>
          <p>This is the description for Card 2.</p>
          <a href className="hero-btn" style={{marginTop: '50px'}}> Learn More</a>
        </div>
      </div>
      <div className="card">
        <img src="image/4205956.jpg" alt="Image" />
        <div className="card-text">
          <h2>Card Title 3</h2>
          <p>This is the description for Card 3.</p>
          <a href className="hero-btn" style={{marginTop: '50px'}}> Learn More</a>
        </div>
      </div>
      <div className="card">
        <img src="image/headhunters-interviewing-female-job-candidate.jpg" alt="Image" />
        <div className="card-text">
          <h2>Card Title 4</h2>
          <p>This is the description for Card 4.</p>
          <a href className="hero-btn" style={{marginTop: '50px'}}> Learn More</a>
        </div>
      </div>
    </div>
    {/* Cards Ends */}
    {/* Counter Starts */}
    <h2 className="title">Counter Section</h2>
    <div className="container-wrapper">
      <div className="container">
        <div className="counter" id="counter1">0</div>
        <div className="text">Counter 1</div>
        <a href className="hero-btn1" style={{marginTop: '50px'}}> Read More</a>
      </div>
      <div className="container">
        <div className="counter" id="counter2">0</div>
        <div className="text">Counter 2</div>
        <a href className="hero-btn1" style={{marginTop: '50px'}}> Read More</a>
      </div>
      <div className="container">
        <div className="counter" id="counter3">0m</div>
        <div className="text">Counter 3</div>
        <a href className="hero-btn1" style={{marginTop: '50px'}}> Read More</a>
      </div>
    </div>
    {/* Counter Ends */}
    <div className="sliding-text">
      <span>
        <div className="sliding-text-content">
          <h2 className="sliding-text-title">Blood Bank Management System</h2>
        </div>
      </span>
      <div className="static-text">
        <p>Transform your workplace culture and drive success.</p>
        <a className="hero-btn" href="#" style={{top: '50px'}}>Learn More</a>
      </div>
    </div>
    {/* call to action*/}
    <section className="cta">
      <h1>Enroll For Our Various Recruitment Solution <br /> Anywhere From The World</h1>
      <a href className="hero-btn">CONTACT US</a>
    </section>
    {/* call to action */}
    {/* Footer */}
    <section className="footer">
      <h4>About Us</h4>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi adipisci quos ab consequatur reprehenderit
        sequi eos<br /> doloremque! Atque dicta, nisi obcaecati, deserunt corrupti possimus in ipsum enim quidem ut vel.
      </p>
      <div className="icons">
        <i className="fa fa-facebook" />
        <i className="fa fa-twitter" />
        <i className="fa fa-instagram" />
        <i className="fa fa-linkedin" />
      </div>
    </section>
    {/* footer ends */}
    {/* Javascrit for trrogle menu */}
  </div>
  );
};

export default Home;