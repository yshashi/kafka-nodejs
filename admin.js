import kafka from "./client.js";

async function init() {
    const admin = kafka.admin();
    console.log("Admin is connecting!");
    admin.connect();
    console.log("Admin is Connected!");

    console.log("Creating a topic [driver-update]");
    await admin.createTopics({
        topics: [
            {
                topic: "driver-update",
                numPartitions: 2
            }
        ]
    });

    console.log("Topic created success [driver-update]");
    console.log("Disconnecting Admin");
    await admin.disconnect();
}
init();