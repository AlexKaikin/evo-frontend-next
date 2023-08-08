<h1>Development of a new front-end for EVO PLACE on the NextJS framework</h1>

<p>EVO PLACE is a community platform that includes a store, blog and social network.</p>

<h3>Architecture</h3>
<ul>
    <li>Business Logic Layer: @reduxjs/toolkit</li>
    <li>Data Access Layer: Axios</li>
    <li>User Interface: React</li>
</ul>

<h3>Frontend:</h3>
<ul>
    <li>Programming language: TypeScript</li>
</ul>

| Libraries | Application in the project |
| :------------- |:-------------|
| NextJS | platform |
| @reduxjs/toolkit, react-redux | global state management |
| axios | api requests |
| react-hook-form | form validation |
| lodash.debounce | delayed request for data from the server (search for a user to exchange messages on the page of the messenger on the social network) |
| react-intersection-observer | endless loading of data from the server (implemented in a social network) |
| socket.io-client | social network chats |
| sass | preprocessor |
| classnames | style management |
| | authorization |
| | pagination (page navigation) |
| | sorting (of goods) |
| | search |
| | light and dark theme |
| prettier | general code style settings for collaborative development |

<h3>Backend:</h3>
<ul>
    <li>Programming language: JavaScript</li>
    <li>Libraries: NodeJS, NestJS, @nestjs/websockets, mongoose, argon2, passport-jwt,  @types/multer</li>
    <li>Database: MongoDB</li>
    <li>Link to GitHub: <a href="https://github.com/AlexKaikin/evo-backend-nest" target="_blank">https://github.com/AlexKaikin/evo-backend-nest</a></li>
</ul>

<h3>EVO includes</h3>
<ul>
    <li>Internet shop</li>
    <li>Blog</li>
    <li>Social network</li>
    <li>Personal Area</li>
    <li>Admin Panel</li>
</ul>

<h3>Features of the online store (in development)</h3>
<h5>Loyalty program:</h5>
<ul>
    <li>Bonus account in your account</li>
    <li>Bonus program</li>
</ul>

<h3>Demo of the old version</h3>
<a href="https://evo-place.ru" target="_blank">https://evo-place.ru</a>