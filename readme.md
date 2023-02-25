# Djubli Test Assesment

- NodeJs
- ExpressJs
- Sequelize
- PostgreSQL

Pertama lakukan clone project dan lakukan npm install

```
npm install
```

Lalu lakukan create database dan migration table menggunakan command berikut

```
npm install sequelize-cli --location=global && npx sequelize-cli db:create && npx sequelize-cli db:migrate
```

Setelah database dan table nya terbuat jalankan

```
npm run dev
```

Maka server akan running di port 3000

_sesuaikan value_ __.env__ _yang dipakai_

You can import the postman collaction 'Djubli Test.postman_collection.json' to run the API
