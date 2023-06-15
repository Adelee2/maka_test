## Commands

Running locally:

```bash
npm run dev
```

Running in production:

```bash
npm start
```

Compiling to JS from TS

```bash
npm run compile
```

Compiling to JS from TS in watch mode

```bash
npm run compile:watch
```

Commiting changes

```bash
npm run commit
```

Testing:

```bash
# run all tests
npm run test

# run TypeScript tests
npm run test:ts

# run JS tests
npm run test:js

# run all tests in watch mode
npm run test:watch

# run test coverage
npm run coverage
```

Docker:

```bash
# run docker container in development mode
npm run docker:dev

# run docker container in production mode
npm run docker:prod

# run all tests in a docker container
npm run docker:test
```

Linting:

```bash
# run ESLint
npm run lint

# fix ESLint errors
npm run lint:fix

# run prettier
npm run prettier

# fix prettier errors
npm run prettier:fix
```

## Making Changes

Run `npm run dev` so you can compile Typescript(.ts) files in watch mode

```bash
npm run dev
```

Add your changes to TypeScript(.ts) files which are in the src folder. The files will be automatically compiled to JS if you are in watch mode.

Add tests for the new feature

Run `npm run test:ts` to make sure all Typescript tests pass.

```bash
npm run test:ts
```

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
# Port number
PORT=3000

# URL of the Mongo DB
MONGODB_URL=mongodb://127.0.0.1:27017/maka

# URL of client application
CLIENT_URL=http://localhost:5000
```
### API Endpoints
postman collection: https://api.postman.com/collections/10678682-30ae5c06-267b-4eac-9e0b-68f7c32cf2c3?access_key=PMAT-01H3050VGC6AVTDENRCGD6138J
List of available routes:


**Inventory routes**:\
`POST /inventory` - create list of Inventories

**Shows routes**:\
`POST /shows/:showID/buy_item/:itemID` - create a show\
`GET /shows/:showID/sold_items/:itemID` - get show\