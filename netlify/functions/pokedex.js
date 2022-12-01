// mod.cjs
// eslint-disable no-unused-vars
// eslint-disable-next-line no-shadow
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const chalk = require('chalk');
const { DateTime } = require('luxon');

exports.handler = async function (event, context) {
  const eventBody = JSON.parse(event.body);
  const date = DateTime.now();

  if (eventBody.region === 'kanto') {
    console.log(chalk.redBright(`${date}: Initiating Kanto PokeDex!`));
  } else {
    console.log(chalk.blueBright(`${date}: Initiating Hoenn PokeDex!`));
  }

  const POKE_API = `https://pokeapi.co/api/v2/pokedex/${eventBody.region}`;

  const response = await fetch(POKE_API);
  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify({
      pokemon: data.pokemon_entries,
    }),
  };
};
