import Pokedex from "pokedex-promise-v2";
const P = new Pokedex();
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.question("Search for a pokemon by name : ", (name) => {
  console.log(" ");
  name = name.toLocaleUpperCase();
  console.log(`Searched for : ${name}`);

  name = name.toLowerCase();

  P.getPokemonByName(name) // Takes pokemon name and returns stats and abilities.
    .then((response) => {
      // response.moves.forEach(move => {
      //   if (move.version_group_details.length > 0) {
      //     console.log(move.move.name+" "+move.version_group_details[0].level_learned_at+" "+move.version_group_details[0].move_learn_method.name);
      //   }
      // });
      const groupedMoves = {};

      // Iterate through each move
      response.moves.forEach((move) => {
        if (move.version_group_details.length > 0) {
          // Extract necessary details
          const moveName = move.move.name;
          const levelLearnedAt = move.version_group_details[0].level_learned_at;
          const learnMethod =
            move.version_group_details[0].move_learn_method.name;

          // Initialize the group if it doesn't exist
          if (!groupedMoves[learnMethod]) {
            groupedMoves[learnMethod] = [];
          }

          // Add the move to the appropriate group
          groupedMoves[learnMethod].push({
            name: moveName,
            level: levelLearnedAt,
          });
        }
      });

      // Sort the moves within each group
      for (const method in groupedMoves) {
        groupedMoves[method].sort((a, b) => a.level - b.level);
      }

      const formattedTypes = {};

      response.types.forEach((type) => {
        formattedTypes[type.slot] = type.type.name;
      });
      let typeOutput = "";
      Object.entries(formattedTypes).forEach(([slot, name], index) => {
        if (index !== 0) {
          typeOutput += "\n"; // Add a newline character before each key-value pair except the first one
        }
        typeOutput += `type ${slot}: ${name}`;
      });

      console.log("");
      console.log(response.species.name);
      console.log(" ");
      console.log("=============");
      console.log(typeOutput);
      console.log("=============");

      const formattedStats = {};

      response.stats.forEach((stat) => {
        formattedStats[stat.stat.name] = stat.base_stat;
      });
      let statOutput = "";

      Object.entries(formattedStats).forEach(([key, value], index) => {
        if (index !== 0) {
          statOutput += "\n"; // Add a newline character before each key-value pair except the first one
        }
        statOutput += `${key}: ${value}`;
      });

      console.log(" ");
      console.log("Base stats : ");
      console.log("=============");
      console.log(statOutput);
      console.log("=============");
      console.log(" ");

      const formattedAbilities = {};

      response.abilities.forEach((ability) => {
        const abilitySlot = ability.is_hidden
          ? "hidden ability"
          : `ability ${ability.slot}`;
        formattedAbilities[abilitySlot] = ability.ability.name;
      });

      let abilityOutput = "";
      Object.entries(formattedAbilities).forEach(([key, value], index) => {
        if (index !== 0) {
          abilityOutput += "\n"; // Add a newline character before each key-value pair except the first one
        }
        abilityOutput += `${key}: ${value}`;
      });

      console.log("Abilities :");
      console.log("=============");
      console.log(abilityOutput);
      console.log("=============");
      console.log(" ");
      console.log("Sprite :");
      console.log("=============");
      console.log(response.sprites.front_default);
      console.log("=============");
      console.log(" ");

      console.log("Moves : ");
      console.log("=============");
      console.log(" ");

      // Output the grouped moves
      for (const [method, moves] of Object.entries(groupedMoves)) {
        if (method === "machine") {
          console.log(" ");
          console.log("Learned by TM :");
          console.log("--------------");

          console.log("");
        } else {
          console.log(`\n${method.toUpperCase()}:`);
          console.log("--------------");
          console.log("");
        }
        moves.forEach((move) => {
          if (method === "machine" || method === "tutor") {
            console.log(move.name);
          } else {
            console.log(`${move.name} (Level ${move.level})`);
          }
        });
      }
      console.log(" ");
      console.log("=============");
      console.log(" ");
    })
    .catch((error) => {
      console.error("There was an error fetching Pokémon data:", error);
    });

  rl.close();
});
