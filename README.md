<p align="center">
  <img src="https://github.com/AndersonAndrad/betheheroFrontend/blob/master/src/assets/logo.svg" align="center">
</p>

<p align="center">
  <a href="https://expo.io/"><img src="https://img.shields.io/badge/Expo-37.x-blue"></a>
  <a href="https://nodejs.org/en/"><img src="https://img.shields.io/badge/Node-12.x-green"></a>
</p>

:computer: [Backend](https://github.com/AndersonAndrad/betheheroBackend)

:computer:[Frontend](https://github.com/AndersonAndrad/betheheroFrontend)

# Be the hero (Mobile)

###  :bulb: ​About the project

System for finding cases of ONGs in need of help, where they can detail information about cases.

The project was developed over the one week course of Rocketseat, from the eleventh edition of Omnistack.

### :memo: Project dependencies

- react native
- expo-mail-composer
- intl
- axios
- expo-constants
- expo

### How  is the application 

<img src="https://github.com/AndersonAndrad/betheheroMobile/blob/master/images/photo_2020-05-22_13-48-49.jpg">
<img src="https://github.com/AndersonAndrad/betheheroMobile/blob/master/images/photo_2020-05-22_13-49-02.jpg">

### 🚀 How to install the project

For this project your will need node 12v, expo 37v

Clone the project in your machine.

```
git clone https://github.com/AndersonAndrad/betheheroMobile.git
```

The run the following command

```
yarn install
or 
npm install
```

For the backend of this project I used a project from another project.

```
git clone https://github.com/AndersonAndrad/betheheroBackend.git
```

Run the same commands above

**OBS: ** *this app uses the api on a host location, so you will have to modify the address of the api for your machine that is running the backend server*

*src/services/api.js*

```js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.5:3333', //change to the ip where the application backend is running
});

export default api;

```

### Use system

In app

```
yarn start 
or 
npm start
```

In backend

```
yarn start 
or 
npm start
```

### Project version

1.0

## 👤 Authors

| Anderson Andrade                                             |
| ------------------------------------------------------------ |
| <img src="https://avatars0.githubusercontent.com/u/31743641?s=400&u=b6d9e1c428279846440325b0fae90f4b9c4d1d98&v=4" width="110"> |
| <a href="https://github.com/AndersonAndrad">Github</a>       |
| <a href="https://www.linkedin.com/in/AndersonAndrad/">Linkedin</a> |

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/andersonandrad/betheheroMobile/issues).

## Show your support

Give a ⭐️ if this project helped you!
