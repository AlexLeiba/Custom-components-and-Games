import { create } from "zustand";
export type VirtualKeyboardType = {
  keyName: string;
  type: "empty" | "guessed" | "failed";
};

const ALPHABET: VirtualKeyboardType[] = [
  { keyName: "A", type: "empty" },
  { keyName: "B", type: "empty" },
  { keyName: "C", type: "empty" },
  { keyName: "D", type: "empty" },
  { keyName: "E", type: "empty" },
  { keyName: "F", type: "empty" },
  { keyName: "G", type: "empty" },
  { keyName: "H", type: "empty" },
  { keyName: "I", type: "empty" },
  { keyName: "J", type: "empty" },
  { keyName: "K", type: "empty" },
  { keyName: "L", type: "empty" },
  { keyName: "M", type: "empty" },
  { keyName: "N", type: "empty" },
  { keyName: "O", type: "empty" },
  { keyName: "P", type: "empty" },
  { keyName: "Q", type: "empty" },
  { keyName: "R", type: "empty" },
  { keyName: "S", type: "empty" },
  { keyName: "T", type: "empty" },
  { keyName: "U", type: "empty" },
  { keyName: "V", type: "empty" },
  { keyName: "W", type: "empty" },
  { keyName: "X", type: "empty" },
  { keyName: "Y", type: "empty" },
  { keyName: "Z", type: "empty" },
];

const CATEGORIES_DATA: Record<
  string,
  {
    title: string;
    words: {
      word: string;
      hint: string;
    }[];
  }
> = {
  sport: {
    title: "Here is the guess word hint sport",
    words: [
      {
        word: "cricket",
        hint: "Played with bat and ball, lasting hours or even days.",
      },
      { word: "football", hint: "A game defined by goals and a round ball." },
      {
        word: "tennis",
        hint: "Played on clay, grass, or hard courts with rackets.",
      },
      {
        word: "basketball",
        hint: "The taller you are, the closer to the hoop.",
      },
      {
        word: "rugby",
        hint: "Physical sport with an oval ball, huge in New Zealand.",
      },
      {
        word: "golf",
        hint: "A quiet sport where patience wins on green fields.",
      },
      { word: "hockey", hint: "Played on ice or grass with sticks." },
      {
        word: "boxing",
        hint: "Sport where two fighters meet inside the ring.",
      },
      {
        word: "wrestling",
        hint: "A contest of strength, often inside a squared circle.",
      },
      { word: "surfing", hint: "Balancing on waves with a board." },
      { word: "archery", hint: "Involves a bow, arrows, and hitting targets." },
      { word: "fencing", hint: "Sword duels, but with protective masks." },
      { word: "badminton", hint: "Played with a shuttlecock that flies fast." },
      {
        word: "volleyball",
        hint: "Teams separated by a net, aiming to hit the floor.",
      },
      { word: "swimming", hint: "Competing in lanes of water." },
      { word: "marathon", hint: "A race covering 42.195 kilometers." },
      { word: "triathlon", hint: "A test of swimming, cycling, and running." },
      { word: "cycling", hint: "Famous races include the Tour de France." },
      { word: "skating", hint: "Gliding on blades across ice." },
      { word: "skiing", hint: "Sliding down snowy slopes with poles." },
      { word: "snowboarding", hint: "Like surfing, but on snow." },
      {
        word: "karate",
        hint: "Martial art from Japan emphasizing discipline.",
      },
      { word: "judo", hint: "Martial art focused on throws and holds." },
      { word: "taekwondo", hint: "Korean martial art with powerful kicks." },
      { word: "baseball", hint: "A bat-and-ball sport popular in the US." },
      {
        word: "softball",
        hint: "Similar to baseball, but on a smaller field.",
      },
      { word: "lacrosse", hint: "Played with sticks ending in nets." },
      { word: "polo", hint: "Played on horseback with mallets." },
      { word: "rowing", hint: "Athletes race boats powered by oars." },
      { word: "kayaking", hint: "Paddling through rivers, lakes, or seas." },
      { word: "canoeing", hint: "Boat sport using a single-bladed paddle." },
      { word: "sailing", hint: "Harnessing the wind to move boats." },
      { word: "climbing", hint: "Scaling walls or natural rock faces." },
      { word: "gymnastics", hint: "Combines flips, strength, and grace." },
      { word: "cheerleading", hint: "High-energy routines supporting teams." },
      { word: "parkour", hint: "Sport of moving fluidly across obstacles." },
      {
        word: "skateboarding",
        hint: "Riding ramps and streets on a board with wheels.",
      },
      { word: "billiards", hint: "A cue sport played on green felt tables." },
      { word: "snooker", hint: "A billiards variant requiring precision." },
      { word: "darts", hint: "Target sport often played in pubs." },
      { word: "bowling", hint: "Knocking down pins with a heavy ball." },
      { word: "handball", hint: "Fast-paced game played by throwing a ball." },
      {
        word: "waterpolo",
        hint: "A mix of swimming and ball handling in a pool.",
      },
      { word: "ultimate", hint: "Frisbee-based team sport with goals." },
      { word: "fieldhockey", hint: "Played with sticks, but not on ice." },
      { word: "tabletennis", hint: "Mini version of tennis on a table." },
      {
        word: "squash",
        hint: "Played inside a court with a small rubber ball.",
      },
      { word: "crossfit", hint: "A mix of weightlifting and endurance." },
      {
        word: "powerlifting",
        hint: "Focuses on maximum strength in three lifts.",
      },
      {
        word: "weightlifting",
        hint: "Olympic sport of lifting barbells overhead.",
      },
      { word: "equestrian", hint: "Competitive horse riding." },
      { word: "motorsport", hint: "Car and motorcycle racing." },
      { word: "formula1", hint: "Fastest cars on closed circuits." },
      { word: "motogp", hint: "Premier class of motorcycle racing." },
      { word: "drag racing", hint: "Two vehicles race in a straight line." },
      { word: "sumo", hint: "Japanese wrestling with giant competitors." },
      { word: "kungfu", hint: "Chinese martial art with graceful movements." },
      { word: "mma", hint: "Mixed martial arts in a cage." },
      { word: "wushu", hint: "Chinese martial art with fluid forms." },
      { word: "freediving", hint: "Diving deep without breathing gear." },
      { word: "scuba", hint: "Exploring underwater with oxygen tanks." },
      { word: "bobsleigh", hint: "Sliding down icy tracks in teams." },
      { word: "luge", hint: "Athletes lie on sleds down ice tracks." },
      { word: "curling", hint: "Sliding stones on ice towards targets." },
      { word: "kendo", hint: "Japanese fencing with bamboo swords." },
      { word: "shooting", hint: "Accuracy sport using rifles or pistols." },
      { word: "biathlon", hint: "Mix of skiing and shooting." },
      { word: "trampoline", hint: "Sport of flips on elastic surfaces." },
      { word: "rollerblading", hint: "Moving on wheels strapped to shoes." },
      { word: "disc golf", hint: "Throwing frisbees into baskets." },
      {
        word: "orienteering",
        hint: "Navigating outdoors with maps and compasses.",
      },
      { word: "futsal", hint: "Indoor football with fewer players." },
      { word: "paintball", hint: "Tactical sport with colored pellets." },
      { word: "airsoft", hint: "Combat simulation using replica guns." },
      { word: "quidditch", hint: "Fantasy sport brought into real life." },
      {
        word: "pickleball",
        hint: "Hybrid of tennis, badminton, and ping pong.",
      },
      { word: "paddle", hint: "Popular racquet sport in Spain." },
      { word: "frisbee", hint: "Casual beach game tossing discs." },
      {
        word: "kabaddi",
        hint: "Traditional Indian sport mixing tag and wrestling.",
      },
      {
        word: "sepak takraw",
        hint: "Kick volleyball popular in Southeast Asia.",
      },
      { word: "gaelic football", hint: "Irish sport mixing soccer and rugby." },
      { word: "hurling", hint: "Ancient Irish stick-and-ball sport." },
      { word: "floorball", hint: "Indoor hockey with plastic sticks." },
      { word: "netball", hint: "Like basketball, but no dribbling." },
      { word: "speed skating", hint: "Racing on ice with long blades." },
      { word: "figure skating", hint: "Ice sport mixing spins and artistry." },
      {
        word: "ballet",
        hint: "Dance treated as a sport for its physical demands.",
      },
      { word: "park skating", hint: "Performing tricks in bowls and ramps." },
      { word: "kickboxing", hint: "A combat sport mixing punches and kicks." },
      { word: "capoeira", hint: "Brazilian art blending dance and fighting." },
      {
        word: "sambo",
        hint: "Russian martial art combining judo and wrestling.",
      },
      { word: "jiujitsu", hint: "Brazilian martial art focused on grappling." },
      { word: "bodybuilding", hint: "Sport of sculpting the physique." },
      { word: "cheer stunts", hint: "Balancing teammates high in the air." },
      {
        word: "rope climbing",
        hint: "Strength sport involving vertical ropes.",
      },
      {
        word: "strongman",
        hint: "Competitions of lifting stones and pulling trucks.",
      },
      { word: "armwrestling", hint: "Two hands locked in strength contest." },
      {
        word: "mountaineering",
        hint: "Climbing the tallest peaks in the world.",
      },
      { word: "hiking", hint: "Endurance walking across challenging terrain." },
    ],
  },
  movies: {
    title: "Here is the guess word hint movies",
    words: [
      { word: "avengers", hint: "Earth’s mightiest heroes joined forces." },
      { word: "spiderman", hint: "Hero who swings across skyscrapers." },
      { word: "inception", hint: "Dreams inside dreams blur reality." },
      { word: "titanic", hint: "Romance on an ill-fated ship." },
      { word: "joker", hint: "A laugh hides deep chaos." },
      { word: "matrix", hint: "The world isn’t what it seems." },
      { word: "gladiator", hint: "A warrior seeks vengeance in Rome." },
      { word: "frozen", hint: "A kingdom trapped in endless winter." },
      { word: "avatar", hint: "Blue beings fight for their world." },
      { word: "godfather", hint: "A family’s power is absolute." },
      { word: "interstellar", hint: "Love and science cross galaxies." },
      { word: "blackpanther", hint: "A king protects a hidden nation." },
      { word: "shrek", hint: "An ogre’s swamp is never quiet." },
      { word: "batman", hint: "A hero in the shadows of Gotham." },
      { word: "frozen2", hint: "Sisters discover their past." },
      { word: "moana", hint: "A voyage across the ocean." },
      { word: "toystory", hint: "Toys that come alive when unseen." },
      { word: "jurassicpark", hint: "Dinosaurs brought back to life." },
      { word: "harrypotter", hint: "A boy discovers he is a wizard." },
      { word: "superman", hint: "Hero from another planet." },
    ],
  },
  animals: {
    title: "Here is the guess word hint animals",
    words: [
      { word: "lion", hint: "Known as the king of the jungle." },
      { word: "elephant", hint: "The giant with unmatched memory." },
      { word: "tiger", hint: "A striped predator of the wild." },
      { word: "giraffe", hint: "The tallest on land." },
      { word: "panda", hint: "Black and white bamboo lover." },
      { word: "kangaroo", hint: "Hops with its young in a pouch." },
      { word: "zebra", hint: "Horse-like with black and white stripes." },
      { word: "penguin", hint: "Bird that thrives in icy places." },
      { word: "dolphin", hint: "Smart swimmer with playful nature." },
      { word: "shark", hint: "A predator of the ocean depths." },
      { word: "owl", hint: "The bird that rules the night." },
      { word: "peacock", hint: "Known for its colorful feathers." },
      { word: "wolf", hint: "Hunts in packs under the moon." },
      { word: "bear", hint: "Loves honey and long naps." },
      { word: "snake", hint: "Moves without legs." },
      { word: "horse", hint: "Companion in travel and sport." },
      { word: "rabbit", hint: "Fast breeder, fast runner." },
      { word: "monkey", hint: "Playful tree climber." },
      { word: "parrot", hint: "Bird that mimics human voices." },
      { word: "whale", hint: "The gentle giant of the sea." },
    ],
  },
  celebrities: {
    title: "Here is the guess word hint celebrities",
    words: [
      { word: "beyonce", hint: "Called Queen B in the music world." },
      { word: "elonmusk", hint: "Dreams of reaching Mars." },
      { word: "michaeljackson", hint: "The king of pop." },
      { word: "oprah", hint: "Talk show queen of influence." },
      { word: "leonardodicaprio", hint: "Finally won an Oscar for survival." },
      { word: "rihanna", hint: "Singer turned business mogul." },
      { word: "justinbieber", hint: "Discovered through YouTube." },
      { word: "ladygaga", hint: "Known for bold fashion and voice." },
      { word: "bradpitt", hint: "Hollywood actor with timeless appeal." },
      { word: "taylor swift", hint: "Known for storytelling in songs." },
      { word: "kimkardashian", hint: "Famous reality TV personality." },
      { word: "drake", hint: "Canadian rapper with global hits." },
      { word: "adele", hint: "Voice that defines heartbreak ballads." },
      { word: "cristianoronaldo", hint: "Football legend with endless goals." },
      { word: "serenawilliams", hint: "Tennis icon with unmatched power." },
      { word: "shakira", hint: "Singer whose hips don’t lie." },
      { word: "ed sheeran", hint: "Red-haired singer with heartfelt lyrics." },
      { word: "rihanna", hint: "Barbadian star with global hits." },
      { word: "johnnydepp", hint: "Actor with eccentric roles." },
      { word: "zendaya", hint: "Young star shining in Hollywood." },
    ],
  },
  countries: {
    title: "Here is the guess word hint countries",
    words: [
      { word: "japan", hint: "Land of the rising sun." },
      { word: "brazil", hint: "Known for football and carnival." },
      { word: "egypt", hint: "Home of pyramids and pharaohs." },
      { word: "canada", hint: "Maple leaves and snowy winters." },
      { word: "italy", hint: "Boot-shaped and rich in art." },
      { word: "india", hint: "Land of spices and festivals." },
      { word: "australia", hint: "Home to kangaroos and reefs." },
      { word: "china", hint: "Land of dragons and the Great Wall." },
      { word: "france", hint: "Eiffel Tower and romance." },
      { word: "germany", hint: "Land of beer and castles." },
      { word: "spain", hint: "Known for flamenco and tapas." },
      { word: "mexico", hint: "Land of tacos and Mayan ruins." },
      { word: "england", hint: "Home of Shakespeare and the Queen." },
      { word: "argentina", hint: "Land of tango and Messi." },
      { word: "russia", hint: "Largest country spanning two continents." },
      { word: "kenya", hint: "Land of safaris and runners." },
      { word: "greece", hint: "Birthplace of democracy." },
      { word: "turkey", hint: "Bridge between Europe and Asia." },
      { word: "southafrica", hint: "Known for safaris and Nelson Mandela." },
      { word: "thailand", hint: "Land of smiles and temples." },
    ],
  },
};

type StoreType = {
  selectedLetter: string;
  handleSelectedLetter: (data: string) => void;
  //   check if letter exists in the array of 'guessWord'

  failed: number;
  handleFailed: (data: number) => void;
  //if the letter is not present in the 'guessWord'
  //then increase failed by 1
  //add show the image associated with it in ImageSection.tsx

  guessWord: string[];
  handleGuessWord: (data: string[]) => void;
  //if the letter was guessed?
  //add the letter in an object
  //import the object in  GuessWordCells.tsx
  //and show which letter was guessed

  guessedWords: { [key: string]: string };
  handleGuessedWords: (data: string) => void;
  //on handler click check if the letter exist in guessWord
  //if YES pass it to this fn and add in an obj
  //if No change the ALPHABET ARRAY in type failed

  alphabetKeyboardData: VirtualKeyboardType[];
  handleAlphabetKeyboardData: (data: VirtualKeyboardType[]) => void;

  handleNewGame: () => void;
  //reset values
  //give random another word
  //from a list of words (delete the used word before to generate new one randomly)

  selectedCategory: string;
  handleSelectedCategory: (data: string) => void;
  categoriesData: {
    title: string;
    words: {
      word: string;
      hint: string;
    }[];
  };
  //Category words:
  //   1 cat: sport
  //   2 cat: animals
  //   3 cat movies
  //   4 cat music artists
  //   5 cat celebrities
};
export const useHangmanStore = create<StoreType>((set) => ({
  categoriesData: {
    title: "",
    words: [
      {
        word: "",
        hint: "",
      },
    ],
  },
  selectedCategory: "Sport",
  handleSelectedCategory: (data: string) => {
    {
      return set({
        selectedCategory: data,
        categoriesData: CATEGORIES_DATA[data.toLowerCase()] || {
          hint: "",
          words: [],
        },
      });
    }
  },
  handleNewGame: () =>
    set({
      failed: 0,
      selectedLetter: "",
      guessWord: ["_", "_", "_", "_", "_"],
      guessedWords: {},
      alphabetKeyboardData: ALPHABET,
    }),

  failed: 0,
  handleFailed: (data: number) =>
    set((state) => ({ failed: state.failed + data })),

  selectedLetter: "",
  handleSelectedLetter: (data: string) => set({ selectedLetter: data }),

  guessWord: ["_", "_", "_", "_", "_"],
  handleGuessWord: (data: string[]) => set({ guessWord: data }),

  guessedWords: {},
  handleGuessedWords: (data: string) => {
    return set((state) => ({
      guessedWords: { ...state.guessedWords, [data]: data },
    }));
  },

  alphabetKeyboardData: ALPHABET,
  handleAlphabetKeyboardData: (data: VirtualKeyboardType[]) =>
    set({ alphabetKeyboardData: data }),
}));
