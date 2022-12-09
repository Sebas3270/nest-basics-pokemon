<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# My PokeApi

## Description

This project simulates the poke api, at this moment it just stores two data of the pokemon, no. and name. It was made to get into the basics of NestJs Framework

## Run in development

1. Clone repository
2. Run
```
npm install
```
3. Install Nest CLI
```
npm i -g @nestjs/cli
```
...or if you're on mac
```
sudo npm i -g @nestjs/cli
```
4. Set up database
```
docker-compose up -d
```
5. Reload data in MongoDb database trough seed
```
http://localhost:3500/api/seed
```

### Technologies used
* MongoDb
* Nest
* Docker