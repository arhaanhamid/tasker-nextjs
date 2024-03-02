// export default function handler(req, res) {
//   const { id } = req.query;

//   if (req.method === "GET") {
//     console.log("somegthing happened");
//     res.status(200).json({ id, message: "Author data fetched successfully" });
//   }
// }

export const GET = async (request, { params }) => {
  try {
    console.log("somegthing happened");
    return new Response("Success to fetch prompts");

    //   await connectToDB();

    //   const prompt = await Prompt.findById(params.id).populate("creator");

    //   if (!prompt) return new Response("Prompt not found!", { status: 404 });

    //   return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts", { status: 500 });
  }
};
