import kafka from './client.js';
import readline from 'readline';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function init() {
    const producer = kafka.producer();
    console.log("Comnnecting Producer!");
    await producer.connect();
    console.log(" Producder Connected!");

    rl.setPrompt("> ");
    rl.prompt();

    rl.on("line", async function (line) {
        const [driverName, location] = line.split(" ");
        await producer.send({
            topic: 'driver-update',
            messages: [
                {
                    partition: location.toLowerCase() === 'north' ? 0 : 1,
                    key: "location-update",
                    value: JSON.stringify({ name: driverName, location }),
                }
            ]
        });
    }).on("close", async ()=>{
        await producer.disconnect();
    })
}
init();