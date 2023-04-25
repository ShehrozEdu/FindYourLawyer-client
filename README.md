<h1>Find your Lawyer</h1>

<p>
Find your Lawyer is a full-stack web application that helps people find and connect with lawyers for their legal needs. The front-end is built using React, Tailwind, and various other libraries, while the back-end is built using Node.js with MongoDB.
</p>

<h2>Front-end</h2>

<p>
Find your Lawyer front-end is a single-page application that provides an intuitive user interface to interact with the backend server. It utilizes various libraries and frameworks to provide a responsive, fast, and seamless experience for users. 
</p>

<h3>Features</h3>

<ul>
  <li>User authentication and authorization using Google OAuth</li>
  <li>Lawyer search by location and legal category</li>
  <li>Lawyer profiles with details such as experience, fees, and contact information</li>
  <li>Booking system to schedule appointments with lawyers</li>
  <li>Payment integration using Razorpay</li>
</ul>

<h3>Getting started</h3>

<p>
To get started with this project, clone the repository and install the required dependencies:
</p>

<pre><code>$ git clone https://github.com/yourusername/find-your-lawyer.git
$ cd find-your-lawyer
$ npm install
</code></pre>

<p>
To run the development server:
</p>

<pre><code>$ npm start</code></pre>

<p>
Open <a href="http://localhost:3000">http://localhost:3000</a> to view the app in the browser.
</p>

<h3>Tech stack</h3>

<ul>
  <li>React</li>
  <li>Tailwind CSS</li>
  <li>Node.js</li>
  <li>Express.js</li>
  <li>MongoDB</li>
</ul>

<h3>Contributing</h3>

<p>
Contributions are always welcome! Please open an issue or a pull request if you have any suggestions or feature requests.
</p>



<h2>Back-end</h2>

<p>The back-end of the application is built using Node.js and Express.js. It utilizes various libraries such as bcrypt for password hashing, cors for handling cross-origin requests, and JSON Web Tokens for user authentication. The application uses MongoDB for database storage and mongoose for data modeling. It also uses the nodemon package for live reloading during development.</p>
<p>The application uses the Razorpay payment gateway for payment processing. It also generates unique identifiers for various entities such as user IDs and order IDs using the uuid package.</p>

<h3>Installation and Usage:</h3>
<p>To use the application, follow these steps:</p>
<ol>
  <li>Clone the repository to your local machine.</li>
  <li>Install the required dependencies for the front-end and back-end using npm install in their respective directories.</li>
  <li>Create a .env file in the back-end directory with the following keys and their respective values:</li>
  <ul>
    <li>PORT - Port number for the server (default is 5000).</li>
    <li>MONGO_URI - MongoDB connection URI.</li>
    <li>JWT_SECRET - Secret key for JSON Web Tokens.</li>
    <li>RAZORPAY_KEY_ID - Razorpay API key ID.</li>
    <li>RAZORPAY_KEY_SECRET - Razorpay API key secret.</li>
  </ul>
  <li>Start the back-end server using npm start in the back-end directory.</li>
  <li>Start the front-end server using npm start in the front-end directory.</li>
  <li>The application should now be running on localhost:3000 in your browser.</li>
</ol>

<h3>Getting started</h3>

<p>
To get started with this project, clone the repository and install the required dependencies:
</p>

<pre><code>$ git clone https://github.com/yourusername/find-your-lawyer-backend.git
$ cd find-your-lawyer-backend
$ npm install
</code></pre>

<p>
To run the development server:
</p>

<pre><code>$ npm start</code></pre>

<p>
The server will start listening on port 5000 by default. You can modify the port in the `app.js` file.
</p>

<h3>Tech stack</h3>

<ul>
  <li>Node.js</li>
  <li>MongoDB</li>
  <li>Express</li>
  <li>jsonwebtoken</li>
  <li>bcrypt</li>
  <li>cors</li>
</ul>

<h3>Contributing</h3>

<p>
Contributions are always welcome! Please open an issue or a pull request if you have any suggestions or feature requests.
</p>


