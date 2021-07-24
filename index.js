const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const doors = ['A', 'B', 'C'];
const yesNo = ['Y', 'N'];
const invalidInputError = new Error('Your input was invalid');
const correctDoor = doors[getRandomInt(0, doors.length)];

var selectedDoor;

// Prompt the user for their initial choice of door.
rl.question(`Select a door [${doors}]: `, function(input) {
    let trimmedUpperCase = input.trim().toUpperCase();
    if (doors.includes(trimmedUpperCase)) {
        selectedDoor = trimmedUpperCase;
    } else {
        throw invalidInputError;
    }

    // The door to show should not be the one that the user selected
    // nor the correct door.
    var doorsToShow = doors.filter((door) => door !== correctDoor && door !== selectedDoor);
    var doorToShow = doorsToShow[getRandomInt(0, doorsToShow.length)];
    console.log(`${doorToShow} is not the correct door`);

    // Give the user the option to change their selection
    rl.question(`Knowing what you do now, would you like to change your selection? [${yesNo}]: `, function(input) {
        let trimmedUpperCase = input.trim().toUpperCase();
        if (yesNo.includes(trimmedUpperCase)) {
            selectedDoor = trimmedUpperCase == 'N' ? selectedDoor : doors.filter((door) => door !== selectedDoor && door !== doorToShow).pop();
            
            // Reveal whether the user has won a car
            console.log(`You have selected ${selectedDoor} and the correct door is ${correctDoor}`);
            if (selectedDoor == correctDoor) {
                console.log('You have won a car');
            } else {
                console.log('You have not won on this occasion');
            }
        } else {
            throw invalidInputError;
        }
        rl.close();
    });
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }
