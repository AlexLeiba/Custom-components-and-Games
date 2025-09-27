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
    title: "Sport",
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
    title: "Movies",
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
      { word: "Lion", hint: "Known as the king of the jungle." },
      { word: "Elephant", hint: "The largest land mammal." },
      {
        word: "Kangaroo",
        hint: "Native to Australia and known for its jumping.",
      },
      {
        word: "Penguin",
        hint: "A bird that cannot fly but is an excellent swimmer.",
      },
      { word: "Giraffe", hint: "The tallest land animal." },
      { word: "Zebra", hint: "Known for its black and white stripes." },
      { word: "Cheetah", hint: "The fastest land animal." },
      {
        word: "Panda",
        hint: "A bear native to China, known for eating bamboo.",
      },
      {
        word: "Koala",
        hint: "An Australian marsupial that sleeps most of the day.",
      },
      {
        word: "Sloth",
        hint: "A slow-moving mammal that spends most of its life hanging upside down.",
      },
      {
        word: "Dolphin",
        hint: "A highly intelligent marine mammal known for its playful behavior.",
      },
      { word: "Whale", hint: "The largest animal to have ever lived." },
      { word: "Shark", hint: "A predatory fish known for its sharp teeth." },
      { word: "Eagle", hint: "A bird of prey with excellent vision." },
      { word: "Owl", hint: "A nocturnal bird known for its hooting sound." },
      { word: "Bat", hint: "The only mammal capable of sustained flight." },
      {
        word: "Rabbit",
        hint: "A small mammal known for its long ears and quick movements.",
      },
      { word: "Fox", hint: "A cunning mammal often depicted in folklore." },
      {
        word: "Wolf",
        hint: "A carnivorous mammal that lives and hunts in packs.",
      },
      {
        word: "Bear",
        hint: "A large mammal known for its strength and hibernation habits.",
      },
      { word: "Tiger", hint: "A large cat with orange fur and black stripes." },
      { word: "Leopard", hint: "A big cat known for its spotted coat." },
      {
        word: "Jaguar",
        hint: "A big cat native to the Americas, known for its powerful build.",
      },
      { word: "Crocodile", hint: "A large reptile found in rivers and lakes." },
      {
        word: "Alligator",
        hint: "A reptile similar to a crocodile but with a broader snout.",
      },
      { word: "Snake", hint: "A legless reptile that slithers on the ground." },
      { word: "Lizard", hint: "A reptile with four legs and a long tail." },
      { word: "Turtle", hint: "A reptile known for its hard shell." },
      { word: "Frog", hint: "An amphibian known for its jumping abilities." },
      { word: "Toad", hint: "An amphibian with dry, bumpy skin." },
      { word: "Salamander", hint: "An amphibian that resembles a lizard." },
      {
        word: "Newt",
        hint: "A small amphibian that lives both in water and on land.",
      },
      { word: "Octopus", hint: "A marine animal known for its eight arms." },
      {
        word: "Squid",
        hint: "A marine animal with a long body and tentacles.",
      },
      { word: "Jellyfish", hint: "A gelatinous marine animal with tentacles." },
      { word: "Starfish", hint: "A marine animal with five arms." },
      {
        word: "Sea Horse",
        hint: "A small marine fish with a horse-like head.",
      },
      {
        word: "Crab",
        hint: "A crustacean with a broad, flat body and pincers.",
      },
      {
        word: "Lobster",
        hint: "A large marine crustacean with long antennae.",
      },
      { word: "Shrimp", hint: "A small marine crustacean with a curved body." },
      { word: "Clam", hint: "A marine mollusk with a hinged shell." },
      {
        word: "Mussel",
        hint: "A bivalve mollusk found in both freshwater and saltwater.",
      },
      { word: "Oyster", hint: "A bivalve mollusk known for producing pearls." },
      { word: "Snail", hint: "A mollusk with a coiled shell." },
      { word: "Slug", hint: "A mollusk without a shell." },
      { word: "Ant", hint: "A small insect known for living in colonies." },
      { word: "Bee", hint: "An insect known for producing honey." },
      { word: "Butterfly", hint: "An insect with large, colorful wings." },
      {
        word: "Moth",
        hint: "An insect similar to a butterfly but typically nocturnal.",
      },
      {
        word: "Dragonfly",
        hint: "An insect with long, slender wings and a long body.",
      },
      { word: "Grasshopper", hint: "An insect known for its jumping ability." },
      { word: "Cricket", hint: "An insect known for its chirping sound." },
      { word: "Cockroach", hint: "A resilient insect often found in homes." },
      { word: "Fly", hint: "A small insect with two wings." },
      {
        word: "Mosquito",
        hint: "An insect known for biting and sucking blood.",
      },
      {
        word: "Ladybug",
        hint: "A small, round insect with red and black spots.",
      },
      { word: "Firefly", hint: "An insect that produces light." },
      { word: "Termite", hint: "An insect known for eating wood." },
      { word: "Spider", hint: "An arachnid with eight legs." },
      {
        word: "Scorpion",
        hint: "An arachnid with pincers and a venomous sting.",
      },
      { word: "Tick", hint: "A small arachnid that feeds on blood." },
      { word: "Centipede", hint: "An arthropod with many legs." },
      {
        word: "Millipede",
        hint: "An arthropod with two pairs of legs per body segment.",
      },
      { word: "Earthworm", hint: "A segmented worm found in soil." },
      { word: "Leech", hint: "A parasitic or carnivorous worm." },
      { word: "Coral", hint: "Marine invertebrates that build reefs." },
      { word: "Sea Urchin", hint: "A spiny, globular marine animal." },
      { word: "Sea Cucumber", hint: "A marine animal with a leathery skin." },
      { word: "Spiny Lobster", hint: "A lobster without large claws." },
      { word: "Manta Ray", hint: "A large, flat-bodied fish." },
      {
        word: "Stingray",
        hint: "A flat-bodied fish known for its barbed tail.",
      },
      { word: "Swordfish", hint: "A large fish with a long, pointed bill." },
      { word: "Marlin", hint: "A large fish known for its spear-like snout." },
      { word: "Tuna", hint: "A large, fast-swimming fish." },
      { word: "Salmon", hint: "A fish known for migrating upstream to spawn." },
      { word: "Trout", hint: "A freshwater fish related to salmon." },
      { word: "Bass", hint: "A common name for various species of fish." },
      { word: "Perch", hint: "A freshwater fish with spiny fins." },
      { word: "Pike", hint: "A predatory fish with a long body." },
      {
        word: "Catfish",
        hint: "A fish with whisker-like barbels around its mouth.",
      },
      { word: "Goldfish", hint: "A small, ornamental freshwater fish." },
      { word: "Betta", hint: "A small, colorful freshwater fish." },
      { word: "Guppy", hint: "A small, live-bearing freshwater fish." },
      {
        word: "Neon Tetra",
        hint: "A small, brightly colored freshwater fish.",
      },
      { word: "Angelfish", hint: "A freshwater fish with triangular fins." },
      { word: "Discus", hint: "A round, colorful freshwater fish." },
      { word: "Cichlid", hint: "A diverse family of freshwater fish." },
      { word: "Barb", hint: "A small, schooling freshwater fish." },
      { word: "Loach", hint: "A bottom-dwelling freshwater fish." },
      { word: "Rainbow Fish", hint: "A small, colorful freshwater fish." },
      { word: "Killifish", hint: "A small, live-bearing freshwater fish." },
      { word: "Danio", hint: "A small, active freshwater fish." },
      { word: "Gudgeon", hint: "A small, bottom-dwelling freshwater fish." },
      { word: "Minnow", hint: "A small, schooling freshwater fish." },
      { word: "Shiner", hint: "A small, schooling freshwater fish." },
      { word: "Suckerfish", hint: "A fish known for its sucking mouth." },
      { word: "Sturgeon", hint: "A large, ancient fish known for its eggs." },
      {
        word: "Piranha",
        hint: "A carnivorous fish known for its sharp teeth.",
      },
      {
        word: "Arowana",
        hint: "A large, predatory fish known for its metallic sheen.",
      },
      {
        word: "Arapaima",
        hint: "A large, freshwater fish native to the Amazon.",
      },
      {
        word: "Bichir",
        hint: "An ancient, predatory fish with lobed pectoral fins.",
      },
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
  gameWon: boolean;
  handleGameWon: (data: boolean) => void;
  //   check if the game is won

  selectedLetter: string;
  handleSelectedLetter: (data: string) => void;
  //   check if letter exists in the array of 'guessWord'

  failed: number;
  handleFailed: (data: number) => void;
  //if the letter is not present in the 'guessWord'
  //then increase failed by 1
  //add show the image associated with it in ImageSection.tsx

  guessWord: string[];
  guessWordHint: string;
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
  gameWon: false,
  handleGameWon: (data: boolean) => set({ gameWon: data }),

  categoriesData: CATEGORIES_DATA["sport"],
  selectedCategory: "Sport",
  handleSelectedCategory: (data: string) => {
    {
      return set({
        selectedCategory: data,
        categoriesData: CATEGORIES_DATA[data.toLowerCase()] || {
          hint: "",
          words: [],
        },
        failed: 0,
        selectedLetter: "",
        guessedWords: {},
        alphabetKeyboardData: ALPHABET,
        guessWord: ["_", "_", "_", "_", "_"],
        guessWordHint: "",
        gameWon: false,
      });
    }
  },
  handleNewGame: () => {
    //will swap all selected category data randomnly
    return set((state) => {
      const randomIndexes =
        Math.floor(Math.random() * state.categoriesData.words.length) || 0;
      return {
        failed: 0,
        selectedLetter: "",
        guessedWords: {},
        alphabetKeyboardData: ALPHABET,
        guessWord: state.categoriesData.words[randomIndexes].word
          .toLowerCase()
          .split(""),
        guessWordHint: state.categoriesData.words[randomIndexes].hint,
        gameWon: false,
      };
    });
  },
  failed: 0,
  handleFailed: (data: number) =>
    set((state) => ({ failed: state.failed + data })),

  selectedLetter: "",
  handleSelectedLetter: (data: string) => set({ selectedLetter: data }),

  guessWord: ["_", "_", "_", "_", "_"],
  guessWordHint: "",
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
