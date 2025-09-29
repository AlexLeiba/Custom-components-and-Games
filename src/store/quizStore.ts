import { create } from "zustand";
import { persist } from "zustand/middleware";

type QuizDataType = {
  word: string;
  question: string;
  variants: [string, string, string, string];
};
type QuizType = {
  quizData: QuizDataType[];
  currentQuizData: QuizDataType;
  currentQuiz: number;
  handleNextQuiz: (hasWon: boolean) => void;
  handleQuizData: () => void;
  handleNewGame: () => void;

  gameStats: {
    won: number;
    lost: number;
  };
};

const quizData: QuizDataType[] = [
  {
    word: "Mercury",
    question: "Which planet in our solar system is closest to the Sun?",
    variants: ["Mercury", "Venus", "Mars", "Earth"],
  },
  {
    word: "William Shakespeare",
    question: "Who wrote the play 'Romeo and Juliet'?",
    variants: [
      "Charles Dickens",
      "William Shakespeare",
      "Leo Tolstoy",
      "Mark Twain",
    ],
  },
  {
    word: "Pacific",
    question: "What is the largest ocean on Earth?",
    variants: ["Atlantic", "Indian", "Pacific", "Arctic"],
  },
  {
    word: "Nile",
    question: "What is the longest river in the world?",
    variants: ["Amazon", "Yangtze", "Mississippi", "Nile"],
  },
  {
    word: "Blue Whale",
    question: "What is the largest animal ever known to live on Earth?",
    variants: ["African Elephant", "Blue Whale", "Giraffe", "Colossal Squid"],
  },
  {
    word: "Mount Everest",
    question: "Which mountain is the tallest above sea level?",
    variants: ["Mount Kilimanjaro", "Mount Everest", "K2", "Denali"],
  },
  {
    word: "Oxygen",
    question: "Which element makes up about 21% of Earth's atmosphere?",
    variants: ["Carbon Dioxide", "Oxygen", "Nitrogen", "Helium"],
  },
  {
    word: "Leonardo da Vinci",
    question: "Who painted the Mona Lisa?",
    variants: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Donatello"],
  },
  {
    word: "Japan",
    question: "Which country is known as the 'Land of the Rising Sun'?",
    variants: ["China", "Japan", "South Korea", "Thailand"],
  },
  {
    word: "Amazon Rainforest",
    question: "What is the largest rainforest in the world?",
    variants: [
      "Congo Rainforest",
      "Amazon Rainforest",
      "Borneo Rainforest",
      "Daintree Rainforest",
    ],
  },
  {
    word: "Canberra",
    question: "What is the capital city of Australia?",
    variants: ["Sydney", "Melbourne", "Canberra", "Perth"],
  },
  {
    word: "Albert Einstein",
    question: "Who developed the theory of relativity?",
    variants: [
      "Isaac Newton",
      "Albert Einstein",
      "Galileo Galilei",
      "Niels Bohr",
    ],
  },
  {
    word: "Cheetah",
    question: "What is the fastest land animal?",
    variants: ["Horse", "Cheetah", "Leopard", "Greyhound"],
  },
  {
    word: "Venus",
    question: "Which planet is known as the 'Morning Star' or 'Evening Star'?",
    variants: ["Mars", "Venus", "Mercury", "Jupiter"],
  },
  {
    word: "Beethoven",
    question: "Who composed the famous symphony known as 'Ode to Joy'?",
    variants: ["Mozart", "Beethoven", "Bach", "Chopin"],
  },
  {
    word: "George Washington",
    question: "Who was the first president of the United States?",
    variants: [
      "Thomas Jefferson",
      "George Washington",
      "Abraham Lincoln",
      "John Adams",
    ],
  },
  {
    word: "Great Wall of China",
    question: "Which structure is often said to be visible from space?",
    variants: [
      "Eiffel Tower",
      "Great Wall of China",
      "Pyramids of Giza",
      "Statue of Liberty",
    ],
  },
  {
    word: "Saturn",
    question: "Which planet is famous for its beautiful rings?",
    variants: ["Jupiter", "Saturn", "Uranus", "Neptune"],
  },
  {
    word: "Neil Armstrong",
    question: "Who was the first person to walk on the Moon?",
    variants: [
      "Buzz Aldrin",
      "Yuri Gagarin",
      "Neil Armstrong",
      "Michael Collins",
    ],
  },
  {
    word: "Diamond",
    question: "Which is the hardest natural substance on Earth?",
    variants: ["Gold", "Iron", "Diamond", "Quartz"],
  },
  {
    word: "Python",
    question:
      "Which programming language is named after a comedy group, not a snake?",
    variants: ["Python", "Ruby", "Java", "Perl"],
  },
  {
    word: "Tesla",
    question: "Which company is famous for electric cars founded by Elon Musk?",
    variants: ["Tesla", "Rivian", "Ford", "Nio"],
  },
  {
    word: "Cristiano Ronaldo",
    question: "Which footballer is known by the nickname 'CR7'?",
    variants: ["Lionel Messi", "Cristiano Ronaldo", "Neymar", "Kylian Mbappé"],
  },
  {
    word: "Water",
    question: "H2O is the chemical formula for what?",
    variants: ["Hydrogen", "Oxygen", "Water", "Salt"],
  },
  {
    word: "Pyramids of Giza",
    question:
      "What famous structures were built in Egypt as tombs for pharaohs?",
    variants: ["Pyramids of Giza", "Obelisks", "Temples", "Statues"],
  },
  {
    word: "Google",
    question: "Which company owns the Android operating system?",
    variants: ["Apple", "Microsoft", "Google", "Samsung"],
  },
  {
    word: "Volcano",
    question:
      "Mount Vesuvius, which destroyed Pompeii, is what type of natural feature?",
    variants: ["Earthquake", "Volcano", "Tsunami", "Canyon"],
  },
  {
    word: "Chess",
    question: "What game features pieces such as bishops, knights, and pawns?",
    variants: ["Checkers", "Chess", "Go", "Dominoes"],
  },
  {
    word: "Paris",
    question: "Which city is home to the Eiffel Tower?",
    variants: ["London", "Rome", "Paris", "Berlin"],
  },
  {
    word: "DNA",
    question: "What molecule carries genetic instructions in living things?",
    variants: ["RNA", "Protein", "DNA", "Enzyme"],
  },
  {
    word: "Julius Caesar",
    question: "Which Roman leader was assassinated on the Ides of March?",
    variants: ["Augustus", "Julius Caesar", "Nero", "Marcus Aurelius"],
  },
  {
    word: "Himalayas",
    question: "What is the highest mountain range in the world?",
    variants: ["Andes", "Himalayas", "Rockies", "Alps"],
  },
  {
    word: "Photosynthesis",
    question: "What process do plants use to turn sunlight into energy?",
    variants: [
      "Fermentation",
      "Photosynthesis",
      "Respiration",
      "Transpiration",
    ],
  },
  {
    word: "Pluto",
    question:
      "Which celestial body was reclassified from a planet to a dwarf planet in 2006?",
    variants: ["Ceres", "Pluto", "Eris", "Haumea"],
  },
  {
    word: "Amazon",
    question:
      "Which company started as an online bookstore and grew into a tech giant?",
    variants: ["Amazon", "eBay", "Walmart", "Alibaba"],
  },
  {
    word: "Monopoly",
    question:
      "What board game includes properties like Boardwalk and Park Place?",
    variants: ["Risk", "Clue", "Monopoly", "Life"],
  },
  {
    word: "Mona Lisa",
    question: "Which painting is also known as La Gioconda?",
    variants: [
      "The Scream",
      "Mona Lisa",
      "Girl with a Pearl Earring",
      "Starry Night",
    ],
  },
  {
    word: "Sahara",
    question: "What is the largest hot desert in the world?",
    variants: ["Gobi", "Kalahari", "Sahara", "Sonoran"],
  },
  {
    word: "Apollo 11",
    question: "Which mission successfully landed humans on the Moon in 1969?",
    variants: ["Apollo 8", "Apollo 11", "Apollo 13", "Apollo 17"],
  },
  {
    word: "Mahatma Gandhi",
    question:
      "Who led India’s non-violent independence movement against Britain?",
    variants: ["Nehru", "Mandela", "Mahatma Gandhi", "Patel"],
  },
  {
    word: "Shark",
    question: "Which fish has existed for more than 400 million years?",
    variants: ["Salmon", "Shark", "Tuna", "Eel"],
  },
  {
    word: "Hawaii",
    question: "Which U.S. state is made up entirely of islands?",
    variants: ["Florida", "Alaska", "Hawaii", "California"],
  },
  {
    word: "Bitcoin",
    question: "What was the first cryptocurrency ever created?",
    variants: ["Ethereum", "Dogecoin", "Bitcoin", "Litecoin"],
  },
  {
    word: "Vatican City",
    question: "What is the smallest country in the world?",
    variants: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
  },
  {
    word: "Isaac Newton",
    question: "Who formulated the laws of motion and universal gravitation?",
    variants: [
      "Isaac Newton",
      "Galileo Galilei",
      "Albert Einstein",
      "Copernicus",
    ],
  },
  {
    word: "Sushi",
    question:
      "What traditional Japanese dish consists of vinegared rice and seafood?",
    variants: ["Ramen", "Sushi", "Tempura", "Takoyaki"],
  },
  {
    word: "Jupiter",
    question: "Which planet is the largest in our solar system?",
    variants: ["Saturn", "Neptune", "Jupiter", "Uranus"],
  },
  {
    word: "Zeus",
    question: "In Greek mythology, who is the king of the gods?",
    variants: ["Hades", "Zeus", "Poseidon", "Apollo"],
  },
  {
    word: "Harry Potter",
    question: "Which book series was written by J.K. Rowling?",
    variants: ["Lord of the Rings", "Narnia", "Harry Potter", "Percy Jackson"],
  },
  {
    word: "Soccer",
    question: "What sport is called 'football' outside the United States?",
    variants: ["Rugby", "Soccer", "Cricket", "Hockey"],
  },
  {
    word: "Mount Kilimanjaro",
    question: "What is the tallest mountain in Africa?",
    variants: [
      "Mount Kenya",
      "Mount Kilimanjaro",
      "Atlas Mountains",
      "Rwenzori",
    ],
  },
  {
    word: "Light",
    question: "What moves at the fastest speed in the universe?",
    variants: ["Sound", "Light", "Wind", "Electricity"],
  },
  {
    word: "Marie Curie",
    question: "Who was the first woman to win a Nobel Prize?",
    variants: [
      "Marie Curie",
      "Rosalind Franklin",
      "Ada Lovelace",
      "Jane Goodall",
    ],
  },
  {
    word: "Eiffel Tower",
    question: "What landmark was built in Paris for the 1889 World’s Fair?",
    variants: ["Eiffel Tower", "Big Ben", "Colosseum", "Louvre"],
  },
  {
    word: "Venus Flytrap",
    question:
      "What carnivorous plant catches insects with its jaw-like leaves?",
    variants: ["Pitcher Plant", "Venus Flytrap", "Sundew", "Butterwort"],
  },
  {
    word: "Elon Musk",
    question: "Who founded SpaceX in 2002?",
    variants: ["Jeff Bezos", "Elon Musk", "Richard Branson", "Bill Gates"],
  },
  {
    word: "Egypt",
    question: "The Nile River flows mostly through which country?",
    variants: ["Sudan", "Egypt", "Ethiopia", "Uganda"],
  },
  {
    word: "Spider",
    question: "What creature has eight legs and spins webs?",
    variants: ["Ant", "Spider", "Crab", "Centipede"],
  },
  {
    word: "Mount Fuji",
    question: "What is the highest mountain in Japan?",
    variants: ["Mount Fuji", "Mount Tate", "Mount Haku", "Mount Ontake"],
  },
  {
    word: "Amazon River",
    question: "Which river has the largest volume of water flow?",
    variants: [
      "Amazon River",
      "Congo River",
      "Yangtze River",
      "Mississippi River",
    ],
  },
  {
    word: "Iron",
    question: "Which element has the chemical symbol Fe?",
    variants: ["Iron", "Fluorine", "Francium", "Indium"],
  },
  {
    word: "Rome",
    question: "Which city was the capital of the Roman Empire?",
    variants: ["Athens", "Rome", "Carthage", "Alexandria"],
  },
  {
    word: "Bamboo",
    question: "What plant do pandas primarily eat?",
    variants: ["Bamboo", "Grass", "Leaves", "Roots"],
  },
  {
    word: "Cold War",
    question:
      "What was the tense rivalry between the U.S. and Soviet Union called?",
    variants: ["World War II", "Cold War", "Vietnam War", "Korean War"],
  },
  {
    word: "Taj Mahal",
    question:
      "Which famous Indian monument was built by Shah Jahan for his wife?",
    variants: ["Taj Mahal", "Red Fort", "Qutub Minar", "Golden Temple"],
  },
  {
    word: "Banana",
    question: "Which fruit is technically a berry and grows in bunches?",
    variants: ["Banana", "Apple", "Mango", "Pear"],
  },
  {
    word: "Napoleon Bonaparte",
    question: "Which French leader crowned himself Emperor in 1804?",
    variants: ["Louis XIV", "Napoleon Bonaparte", "Charlemagne", "Robespierre"],
  },
  {
    word: "Great Barrier Reef",
    question: "What is the largest coral reef system in the world?",
    variants: [
      "Red Sea Reef",
      "Great Barrier Reef",
      "Mesoamerican Reef",
      "Florida Reef",
    ],
  },
  {
    word: "Aristotle",
    question: "Which philosopher tutored Alexander the Great?",
    variants: ["Plato", "Socrates", "Aristotle", "Pythagoras"],
  },
  {
    word: "Eagle",
    question: "What bird is the national symbol of the United States?",
    variants: ["Eagle", "Hawk", "Falcon", "Owl"],
  },
  {
    word: "Giraffe",
    question: "What is the tallest animal on land?",
    variants: ["Elephant", "Camel", "Giraffe", "Moose"],
  },
  {
    word: "India",
    question: "Which country is the world’s largest democracy?",
    variants: ["India", "United States", "Brazil", "Indonesia"],
  },
  {
    word: "Albert Einstein",
    question:
      "Which physicist said 'Imagination is more important than knowledge'?",
    variants: [
      "Albert Einstein",
      "Stephen Hawking",
      "Isaac Newton",
      "Nikola Tesla",
    ],
  },
  {
    word: "Google Chrome",
    question: "Which web browser was launched by Google in 2008?",
    variants: ["Internet Explorer", "Firefox", "Google Chrome", "Safari"],
  },
  {
    word: "Guitar",
    question: "What string instrument is often used in rock music?",
    variants: ["Violin", "Guitar", "Ukulele", "Banjo"],
  },
  {
    word: "Kangaroo",
    question: "What marsupial is a national symbol of Australia?",
    variants: ["Koala", "Kangaroo", "Wombat", "Wallaby"],
  },
  {
    word: "Tesla Coil",
    question:
      "What invention by Nikola Tesla creates high-voltage electricity displays?",
    variants: ["Light Bulb", "Tesla Coil", "Dynamo", "Alternator"],
  },
  {
    word: "William Shakespeare",
    question: "Who coined the phrase 'All the world's a stage'?",
    variants: ["Homer", "William Shakespeare", "Milton", "Chaucer"],
  },
  {
    word: "Moon",
    question: "What is Earth’s only natural satellite?",
    variants: ["Moon", "Phobos", "Europa", "Titan"],
  },
  {
    word: "Google",
    question: "Which search engine handles the most web searches globally?",
    variants: ["Yahoo", "Bing", "DuckDuckGo", "Google"],
  },
  {
    word: "Pizza",
    question:
      "Which Italian dish is made of dough topped with sauce, cheese, and toppings?",
    variants: ["Lasagna", "Pizza", "Risotto", "Calzone"],
  },
  {
    word: "Berlin Wall",
    question: "What wall fell in 1989, symbolizing the end of the Cold War?",
    variants: ["Berlin Wall", "Great Wall", "Iron Curtain", "Wall of Jericho"],
  },
  {
    word: "Coca-Cola",
    question: "Which soft drink was invented in 1886 in Atlanta?",
    variants: ["Pepsi", "Coca-Cola", "Dr Pepper", "Sprite"],
  },
  {
    word: "Lion",
    question: "Which animal is often called the 'King of the Jungle'?",
    variants: ["Lion", "Tiger", "Elephant", "Leopard"],
  },
  {
    word: "Amazon",
    question: "Who owns Twitch, the live streaming platform?",
    variants: ["Google", "Amazon", "Meta", "Microsoft"],
  },
  {
    word: "Pluto",
    question: "Which dwarf planet was discovered in 1930 by Clyde Tombaugh?",
    variants: ["Ceres", "Pluto", "Eris", "Haumea"],
  },
  {
    word: "Louvre",
    question: "What museum in Paris houses the Mona Lisa?",
    variants: ["Louvre", "British Museum", "Uffizi", "Metropolitan Museum"],
  },
  {
    word: "The Beatles",
    question: "Which British band was nicknamed 'The Fab Four'?",
    variants: ["The Rolling Stones", "The Beatles", "Pink Floyd", "Queen"],
  },
  {
    word: "Apollo 13",
    question:
      "Which NASA mission suffered an oxygen tank explosion but returned safely in 1970?",
    variants: ["Apollo 11", "Apollo 12", "Apollo 13", "Apollo 14"],
  },
  {
    word: "Michelangelo",
    question: "Who painted the ceiling of the Sistine Chapel in the Vatican?",
    variants: ["Raphael", "Michelangelo", "Leonardo da Vinci", "Donatello"],
  },
  {
    word: "Octopus",
    question: "Which sea creature has three hearts and blue blood?",
    variants: ["Squid", "Octopus", "Cuttlefish", "Jellyfish"],
  },
  {
    word: "Twitter",
    question:
      "Which social media platform was originally limited to 140 characters per post?",
    variants: ["Reddit", "Facebook", "Twitter", "Tumblr"],
  },
  {
    word: "Machu Picchu",
    question: "What ancient Incan city is located high in the Andes of Peru?",
    variants: ["Chichen Itza", "Machu Picchu", "Teotihuacan", "Tikal"],
  },
  {
    word: "H2O2",
    question: "What is the chemical formula for hydrogen peroxide?",
    variants: ["H2O", "H2O2", "CO2", "O2"],
  },
  {
    word: "Neil Gaiman",
    question: "Who wrote the fantasy novel 'American Gods'?",
    variants: [
      "Neil Gaiman",
      "Stephen King",
      "George R.R. Martin",
      "Terry Pratchett",
    ],
  },
  {
    word: "Sahara",
    question: "The camel is often called the 'ship' of which desert?",
    variants: ["Gobi", "Kalahari", "Sahara", "Mojave"],
  },
  {
    word: "Thomas Edison",
    question:
      "Who is credited with inventing the practical electric light bulb?",
    variants: [
      "Nikola Tesla",
      "Thomas Edison",
      "James Watt",
      "Alexander Graham Bell",
    ],
  },
  {
    word: "Jupiter",
    question: "Which planet has a giant storm known as the Great Red Spot?",
    variants: ["Saturn", "Jupiter", "Neptune", "Uranus"],
  },
  {
    word: "Wright Brothers",
    question:
      "Who are credited with inventing and flying the first powered airplane?",
    variants: [
      "Wright Brothers",
      "Alexander Graham Bell",
      "Thomas Edison",
      "Henry Ford",
    ],
  },
  {
    word: "Ozone",
    question:
      "What layer in Earth's atmosphere protects us from harmful ultraviolet rays?",
    variants: ["Ozone", "Stratosphere", "Troposphere", "Magnetosphere"],
  },
];

export const useQuizStore = create<QuizType>()(
  persist(
    (set) => ({
      handleNewGame: () =>
        set({
          currentQuiz: 0,
        }),
      quizData,
      currentQuizData: { word: "", question: "", variants: ["", "", "", ""] },
      handleQuizData: () =>
        set((state) => {
          return { currentQuizData: state.quizData[state.currentQuiz] };
        }),
      currentQuiz: 0,
      handleNextQuiz: (hasWon) =>
        //will be called only when user responded to quiz, and selected next quiz
        set((state) => {
          const gameStatsData = hasWon
            ? { ...state.gameStats, won: state.gameStats.won + 1 }
            : { ...state.gameStats, lost: state.gameStats.lost + 1 };
          return {
            currentQuiz: state.currentQuiz + 1, //increase the quiz nr
            currentQuizData: state.quizData[state.currentQuiz + 1], //select next object from array
            gameStats: gameStatsData,
          };
        }),

      gameStats: { won: 0, lost: 0 },
    }),
    {
      name: "quiz-game", //by default persis will store data in localStorage
    }
  )
);
