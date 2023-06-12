const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
  //  apiKey: "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",
});

const openai = new OpenAIApi(configuration);
const service = [
  {
    name: "Virtual Service",
    type: "virtual",
    description:
      "In Our Hibirlink Platform You can be able to create the Virtual Service like the Software Development and others",
    url: "https://hibirlinks.vercel.app/services/virtual",
  },
  {
    name: "Realtime Service",
    type: "realtime",
    description:
      "In Our Hibirlink Platform You can be able to create the realtime Service like the  Garage service and others",
    url: "https://hibirlinks.vercel.app/services/realtime",
  },
];
const runCompletion = async (req, res) => {
  try {
    const { request } = req.body;
    console.log(request);
    const chatHistory = [
      {
        role: "system",
        content: `You are A Virtual Assistance. Please consider this Service that we provide ${JSON.stringify(
          service
        )}`,
      },
      ...JSON.parse(request),
    ];
    //   console.log(chatHistory);

    const completion = await openai.createChatCompletion({
      //model: "text-davinci-003",
      model: "gpt-3.5-turbo",
      messages: chatHistory,
    });

    console.log("djshdskhdkshdkshdskhd");
    return res.json({ message: completion.data });
  } catch (error) {
    console.log(error?.response);
    return res.sendStatus(400);
  }
};

module.exports = runCompletion;
