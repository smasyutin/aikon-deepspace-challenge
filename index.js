const { ApiMarketClient } = require('@apimarket/apimarket');
const config = require("./apimarket_config.json");

const bucket = "http://storage.googleapis.com/apimarket-contest-2018-07-1-coffee";

const files = [
    "16481_full_jpg",
    "16385_full_jpg",
    "12057_full_jpg",
    "9983_print",
    "6966_print",
    "3707_full_jpg",
    "2793_web_print",
    "3707_full_jpg",
    "915_full_jpg",
    "207_full_jpg",
    "922_full_jpg",
];

const run = async (bucket, files) => {
    try {
        //Config to apimarketClient and connect to ORE blockchain
        let apimarketClient = new ApiMarketClient(config);
        await apimarketClient.connect();

        //specify the api to call using it's unique name registered on the ORE blockchain
        const apiName = "cloud.hadron.contest-2018-07";

        files.forEach(async (file) => {
            const params = {"imageurl":`${bucket}/${file}.jpg`};
            //call api - passing in the data it needs
            const response = await apimarketClient.fetch(apiName, params);
            console.log(`Execution for ${file} \n${JSON.stringify(response, null, 2)}\n`);
        });
    }
    catch(error) {
        console.error(error);
    }
};

run(bucket, files);