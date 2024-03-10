const path = require('path');


const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');

const app = express();
//handlebars templating engine 
app.engine('hbs', expressHbs());
//set a global configuration value
app.set('view engine', 'hbs');
//this tells where to find these templates
app.set('views', 'views');

const adminData = require('./routes/admin.js');
const shopRoutes = require('./routes/shop.js');

app.use(bodyParser.urlencoded({ extended: false }));
//this is used to make the public folder accessable
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page not found' });
})

app.listen(3000);

