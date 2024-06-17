import readline from "readline";
import fetch from "node-fetch";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Please specify a pokemon by name: ", (pokeName) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // Parse JSON response
    })
    .then((data) => {
      console.log(`Name: ${data.name}`);
      console.log(`Type 1: ${data.types[0].type.name}`);
      if (data.types.length > 1 && data.types[1].type.name != null) {
        console.log(`Type 2: ${data.types[1].type.name}`);
      }
      console.log(`Ability 1: ${data.abilities[0].ability.name}`);
      if (data.abilities.length > 1 && data.abilities[1].ability.name != null) {
        console.log(`Ability 2: ${data.abilities[1].ability.name}`);
      }
      console.log("Moves:");
      data.moves.forEach((move) => {
        const urlMove = `https://pokeapi.co/api/v2/move/${move.move.name}`;
        fetch(urlMove)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json(); // Parse JSON response
          })
          .then((moveData) => {
            console.log(
              `- ${move.move.name}, Level Learned: ${move.version_group_details[0].level_learned_at}, Method: ${move.version_group_details[0].move_learn_method.name}, Accuracy: ${moveData.accuracy}, Power: ${moveData.power}`
            );
          })

          .catch((error) => {
            console.error("Error fetching move data:", error);
          });
      });
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    })
    .finally(() => {
      rl.close();
    });
});
