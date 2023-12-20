import axios from "axios";

const fetchMotivationalQuote = async () => {
	try {
		const response = await axios.get(
			"https://api.quotable.io/random?tags=motivational"
		);
		const quoteContent = response.data.content;

		// Check if the quote has less than 15 words
		const words = quoteContent.split(" ");
		if (words.length < 15) {
			return quoteContent;
		} else {
			// If the quote has more than 15 words, fetch another quote recursively
			return fetchMotivationalQuote();
		}
	} catch (error) {
		console.error("Error fetching motivational quote:", error.message);
		return "Stay motivated!";
	}
};

export default fetchMotivationalQuote;
