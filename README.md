A react.js/redux-w/immutablejs implementation of Conway's Game of Life

## Setup

- Requires [node.js](nodejs.org) to be installed
- `npm install` - Installs all dependencies

## Development
- `npm start` - Start the local development server

## Deployment
- `npm bundle` - builds game-of-life.css and game-of-life.js to the `dist` directory. Include these in the page header (in respective `link` and `script` tags) and provide an empty `div#main` for the game to attach to.

## Testing
- `npm test` - Run tests for a single run (headless)

#### Test watching
- `npm run watch` - Run the tests continuously

## Linting
- `npm run lint` - Run linting with JSCS and ESLint

