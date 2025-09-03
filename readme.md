# Configurer un serveur API aezc express

```
npm init
```
```
npm i express
```
```
npm i morgan
```
```
npm i nodemon --save-dev
```

# Routes

1) Start route: 

    `(GET) /api/message/hello-world`

2) Endpoints : 

    `(GET) /api/guestbook/`

    `(GET) /api/guestbook/:id`

    `(POST) /api/guestbook/`

3) Données des messages:

    - id (number ou uuid)
    - author: string
    - message: string
    - hasSpoiler: boolean
    - sendDate : date
