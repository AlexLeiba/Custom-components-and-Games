import { create } from "zustand";
export type VirtualKeyboardType = {
  keyName: string;
  type: "empty" | "guessed" | "failed";
};

const ALPHABET: VirtualKeyboardType[] = [
  { keyName: "Q", type: "empty" },
  { keyName: "W", type: "empty" },
  { keyName: "E", type: "empty" },
  { keyName: "R", type: "empty" },
  { keyName: "T", type: "empty" },
  { keyName: "Y", type: "empty" },
  { keyName: "U", type: "empty" },
  { keyName: "I", type: "empty" },
  { keyName: "O", type: "empty" },
  { keyName: "P", type: "empty" },
  { keyName: "A", type: "empty" },
  { keyName: "S", type: "empty" },
  { keyName: "D", type: "empty" },
  { keyName: "F", type: "empty" },
  { keyName: "G", type: "empty" },
  { keyName: "H", type: "empty" },
  { keyName: "J", type: "empty" },
  { keyName: "K", type: "empty" },
  { keyName: "L", type: "empty" },
  { keyName: "Z", type: "empty" },
  { keyName: "X", type: "empty" },
  { keyName: "C", type: "empty" },
  { keyName: "V", type: "empty" },
  { keyName: "B", type: "empty" },
  { keyName: "N", type: "empty" },
  { keyName: "M", type: "empty" },
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
    title: "Sports",
    words: [
      { word: "Football", hint: "The beautiful game played on grass" },
      { word: "Basketball", hint: "Orange ball meets tall hoops" },
      { word: "Tennis", hint: "Game of love and rallies" },
      { word: "Cricket", hint: "Bats, wickets, and overs" },
      { word: "Rugby", hint: "A scrum-heavy contest with an oval ball" },
      { word: "Ice Hockey", hint: "Fast-paced sport played on frozen ground" },
      { word: "Volleyball", hint: "Spiking the ball across a net" },
      { word: "Handball", hint: "Throwing goals in an indoor arena" },
      { word: "Table Tennis", hint: "Small paddles, fast rallies" },
      { word: "Badminton", hint: "Shuttlecock in flight" },
      { word: "Athletics", hint: "Running, jumping, throwing in stadiums" },
      { word: "Swimming", hint: "Racing through lanes of water" },
      { word: "Cycling", hint: "Pedals turning through mountains" },
      { word: "Boxing", hint: "Two fighters in a ring" },
      { word: "MMA", hint: "Mixed combat styles in a cage" },
      { word: "Wrestling", hint: "Pins and holds on the mat" },
      { word: "Golf", hint: "Clubs swinging on green fields" },
      { word: "Baseball", hint: "Bat meets ball in innings" },
      { word: "Softball", hint: "A diamond game with larger balls" },
      { word: "Fencing", hint: "Duel with blades and quick steps" },
      { word: "Archery", hint: "Bows aimed at concentric circles" },
      { word: "Skiing", hint: "Sliding down snowy slopes" },
      { word: "Snowboarding", hint: "One board carving winter trails" },
      { word: "Figure Skating", hint: "Artistic spins on ice" },
      { word: "Surfing", hint: "Riding waves on a board" },
      { word: "Sailing", hint: "Harnessing wind on water" },
      { word: "Rowing", hint: "Oars propelling boats in sync" },
      { word: "Canoeing", hint: "Paddling in narrow vessels" },
      { word: "Kayaking", hint: "One paddle, whitewater adventure" },
      { word: "Triathlon", hint: "Swim, bike, run challenge" },
      { word: "Marathon", hint: "Endurance run of 42 kilometers" },
      { word: "Skateboarding", hint: "Tricks on wheels and ramps" },
      { word: "Climbing", hint: "Scaling rocks or indoor walls" },
      { word: "Gymnastics", hint: "Balance, flips, and artistry" },
      { word: "Judo", hint: "Throws and holds from Japan" },
      { word: "Karate", hint: "Strikes with precision and discipline" },
      { word: "Taekwondo", hint: "High kicks from Korea" },
      { word: "Kickboxing", hint: "Punches and kicks in a ring" },
      { word: "Sumo Wrestling", hint: "Pushing rivals out of a circle" },
      { word: "Horse Riding", hint: "Man and steed in motion" },
      { word: "Equestrian Jumping", hint: "Horses clearing tall fences" },
      { word: "Polo", hint: "Chasing a ball on horseback" },
      { word: "Snooker", hint: "Cues striking colored balls" },
      { word: "Darts", hint: "Throwing flights at a board" },
      { word: "Lacrosse", hint: "Nets catching and passing a ball" },
      { word: "Field Hockey", hint: "Sticks and ball on turf" },
      { word: "Water Polo", hint: "Goals in a swimming pool" },
      { word: "Speed Skating", hint: "Races around icy tracks" },
      { word: "Skeleton", hint: "Head-first sled racing" },
      { word: "Bobsleigh", hint: "Team sleds racing down icy runs" },
      { word: "Curling", hint: "Stones sliding on ice sheets" },
      { word: "Parkour", hint: "Urban running over obstacles" },
      { word: "Muay Thai", hint: "Eight-limbed striking art" },
      { word: "Capoeira", hint: "Brazilian dance-like combat" },
      { word: "Esports", hint: "Gaming turned into competition" },
      { word: "Paddle Tennis", hint: "A smaller court variation of tennis" },
      { word: "Pickleball", hint: "A mix of tennis, ping pong, and badminton" },
      { word: "Sepak Takraw", hint: "Kicking a rattan ball over a net" },
      { word: "Gaelic Football", hint: "Irish blend of soccer and rugby" },
      { word: "Hurling", hint: "Ancient Irish stick and ball game" },
      { word: "Kabaddi", hint: "Tag game with breath control" },
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
      { word: "Inception", hint: "A dream within a dream becomes dangerous." },
      { word: "Titanic", hint: "An ocean voyage that ended in tragedy." },
      { word: "Avatar", hint: "Blue aliens protect their lush world." },
      {
        word: "The Godfather",
        hint: "A story about family, business, and power.",
      },
      {
        word: "The Dark Knight",
        hint: "A caped hero faces his greatest nemesis in Gotham.",
      },
      {
        word: "Forrest Gump",
        hint: "Life is compared to a box of chocolates.",
      },
      { word: "Gladiator", hint: "A Roman general becomes an arena fighter." },
      { word: "Jurassic Park", hint: "Dinosaurs return through science." },
      { word: "The Matrix", hint: "What if your world wasn’t real?" },
      {
        word: "Interstellar",
        hint: "A journey through space to save humanity.",
      },
      { word: "Avengers", hint: "Earth’s mightiest heroes unite." },
      {
        word: "Iron Man",
        hint: "A billionaire builds a suit to become a hero.",
      },
      { word: "Spider-Man", hint: "A boy gains powers after a bite." },
      {
        word: "Black Panther",
        hint: "A hidden kingdom in Africa has advanced tech.",
      },
      { word: "Doctor Strange", hint: "A surgeon learns about magic." },
      { word: "Captain America", hint: "A soldier becomes a legend in WWII." },
      { word: "Thor", hint: "A Norse god learns humility on Earth." },
      {
        word: "Guardians of the Galaxy",
        hint: "An unlikely team protects the universe.",
      },
      {
        word: "Frozen",
        hint: "Sisters learn the true meaning of love and ice.",
      },
      {
        word: "Toy Story",
        hint: "Toys secretly live when kids aren’t around.",
      },
      {
        word: "Finding Nemo",
        hint: "A father searches across the ocean for his son.",
      },
      { word: "The Lion King", hint: "A cub grows into a king after tragedy." },
      { word: "Shrek", hint: "An ogre learns what true beauty means." },
      {
        word: "Kung Fu Panda",
        hint: "A clumsy bear becomes a martial arts master.",
      },
      {
        word: "Inside Out",
        hint: "The mind is guided by colorful characters.",
      },
      { word: "Up", hint: "A house with balloons floats to adventure." },
      {
        word: "Coco",
        hint: "A boy discovers family secrets in the Land of the Dead.",
      },
      {
        word: "Moana",
        hint: "A girl sails beyond the reef to save her island.",
      },
      { word: "Aladdin", hint: "A lamp holds a powerful friend." },
      {
        word: "Beauty and the Beast",
        hint: "A curse is broken by kindness and love.",
      },
      { word: "Mulan", hint: "A daughter takes her father’s place in war." },
      { word: "Cinderella", hint: "A glass slipper changes everything." },
      { word: "Snow White", hint: "An apple puts her into a deep sleep." },
      { word: "Sleeping Beauty", hint: "A spindle curse puts her in slumber." },
      {
        word: "The Avengers: Endgame",
        hint: "Time travel becomes the last hope.",
      },
      {
        word: "Avengers: Infinity War",
        hint: "A villain seeks to balance the universe.",
      },
      {
        word: "Doctor Strange: Multiverse of Madness",
        hint: "Worlds collide through strange realities.",
      },
      {
        word: "Captain Marvel",
        hint: "A hero finds her true power among the stars.",
      },
      { word: "Ant-Man", hint: "A man shrinks to the size of an insect." },
      {
        word: "Deadpool",
        hint: "A sarcastic mercenary breaks the fourth wall.",
      },
      { word: "Logan", hint: "An old hero faces his final journey." },
      { word: "X-Men", hint: "Mutants fight for peace and equality." },
      {
        word: "Fantastic Four",
        hint: "Four friends gain unique powers in space.",
      },
      {
        word: "Batman Begins",
        hint: "A billionaire trains to become a vigilante.",
      },
      { word: "Joker", hint: "A failed comedian spirals into chaos." },
      { word: "Aquaman", hint: "The ruler of the seas embraces his destiny." },
      {
        word: "Wonder Woman",
        hint: "An Amazonian warrior steps into the modern world.",
      },
      { word: "Justice League", hint: "Heroes unite to face a cosmic threat." },
      {
        word: "Man of Steel",
        hint: "A boy from another planet grows into Earth’s protector.",
      },
      { word: "Superman", hint: "The man of tomorrow hides in plain sight." },
      {
        word: "The Flash",
        hint: "The fastest man alive runs through timelines.",
      },
      {
        word: "Suicide Squad",
        hint: "Villains are sent on dangerous missions.",
      },
      { word: "Birds of Prey", hint: "A group of women unite in Gotham." },
      {
        word: "The Batman",
        hint: "A dark detective uncovers corruption in his city.",
      },
      {
        word: "The Hunger Games",
        hint: "Children are forced into televised survival games.",
      },
      { word: "Catching Fire", hint: "The games ignite rebellion." },
      { word: "Mockingjay", hint: "A mocking symbol leads a revolution." },
      {
        word: "Dune",
        hint: "A desert planet holds the universe’s most precious resource.",
      },
      {
        word: "Blade Runner",
        hint: "A detective hunts for beings almost human.",
      },
      {
        word: "Blade Runner 2049",
        hint: "The line between human and machine blurs further.",
      },
      { word: "Star Wars", hint: "A farm boy joins rebels against an empire." },
      {
        word: "The Empire Strikes Back",
        hint: "A father reveals a dark truth.",
      },
      {
        word: "Return of the Jedi",
        hint: "A final confrontation redeems the fallen.",
      },
      {
        word: "The Force Awakens",
        hint: "A scavenger discovers her hidden power.",
      },
      {
        word: "The Last Jedi",
        hint: "The past must die for the future to rise.",
      },
      {
        word: "The Rise of Skywalker",
        hint: "The final battle of the Skywalker saga.",
      },
      { word: "Rogue One", hint: "Rebels risk everything to steal the plans." },
      { word: "Solo", hint: "A smuggler begins his legendary journey." },
      {
        word: "Harry Potter",
        hint: "A boy discovers he’s more than ordinary.",
      },
      {
        word: "The Chamber of Secrets",
        hint: "Voices in the walls whisper danger.",
      },
      {
        word: "The Prisoner of Azkaban",
        hint: "A fugitive changes everything.",
      },
      {
        word: "The Goblet of Fire",
        hint: "A tournament brings deadly trials.",
      },
      {
        word: "The Order of the Phoenix",
        hint: "A secret group resists a rising darkness.",
      },
      {
        word: "The Half-Blood Prince",
        hint: "A hidden book reveals dangerous magic.",
      },
      {
        word: "The Deathly Hallows",
        hint: "The quest for three powerful relics begins.",
      },
      {
        word: "Fantastic Beasts",
        hint: "Creatures roam in suitcases and cities.",
      },
      {
        word: "The Crimes of Grindelwald",
        hint: "A wizard begins his quest for power.",
      },
      {
        word: "The Secrets of Dumbledore",
        hint: "Past truths shape future wars.",
      },
      {
        word: "The Lord of the Rings: Fellowship of the Ring",
        hint: "A ring begins its journey to destruction.",
      },
      { word: "The Two Towers", hint: "Friendships are tested amid war." },
      {
        word: "The Return of the King",
        hint: "The final stand for Middle-earth.",
      },
      { word: "The Hobbit", hint: "An unlikely traveler joins dwarves." },
      {
        word: "The Desolation of Smaug",
        hint: "A dragon awaits in the mountain.",
      },
      {
        word: "The Battle of the Five Armies",
        hint: "Armies clash over a kingdom’s fate.",
      },
      {
        word: "Pirates of the Caribbean",
        hint: "A captain with a compass that points to what he wants.",
      },
      {
        word: "Dead Man’s Chest",
        hint: "A heart locked away holds great power.",
      },
      { word: "At World’s End", hint: "Pirates face their ultimate battle." },
      { word: "On Stranger Tides", hint: "A quest for eternal youth." },
      {
        word: "Dead Men Tell No Tales",
        hint: "Old enemies return from the sea.",
      },
      { word: "Frozen 2", hint: "The past holds answers to powers." },
      {
        word: "Encanto",
        hint: "A family blessed with magic faces a fading miracle.",
      },
      { word: "Zootopia", hint: "A rabbit and a fox solve a city’s mystery." },
      {
        word: "Big Hero 6",
        hint: "A boy and his inflatable friend save the city.",
      },
    ],
  },
  animals: {
    title: "Animals",
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
    title: "Celebrities",
    words: [
      { word: "Elvis Presley", hint: "The King of Rock and Roll." },
      { word: "Marilyn Monroe", hint: "Blonde Hollywood icon of the 1950s." },
      { word: "Michael Jackson", hint: "Known as the King of Pop." },
      { word: "Madonna", hint: "Queen of Pop with a career spanning decades." },
      { word: "Beyonce", hint: "Singer often called 'Queen Bey'." },
      {
        word: "Taylor Swift",
        hint: "Known for her songwriting and 'Swifties'.",
      },
      { word: "Adele", hint: "British singer with powerful ballads." },
      { word: "Rihanna", hint: "Singer and founder of Fenty Beauty." },
      { word: "Lady Gaga", hint: "Known for bold fashion and 'Poker Face'." },
      { word: "Katy Perry", hint: "Singer of 'Roar' and 'Firework'." },
      {
        word: "Whitney Houston",
        hint: "Voice behind 'I Will Always Love You'.",
      },
      { word: "Celine Dion", hint: "Singer of Titanic’s theme song." },
      { word: "Ariana Grande", hint: "Pop star with a signature ponytail." },
      {
        word: "Justin Bieber",
        hint: "Canadian pop star discovered on YouTube.",
      },
      { word: "Drake", hint: "Canadian rapper from Toronto." },
      { word: "Eminem", hint: "Detroit rapper known as Slim Shady." },
      { word: "Kanye West", hint: "Rapper and fashion mogul." },
      { word: "Jay Z", hint: "Rapper and husband of Beyonce." },
      { word: "Snoop Dogg", hint: "Laid-back rapper from California." },
      { word: "50 Cent", hint: "Rapper behind 'In Da Club'." },
      { word: "Shakira", hint: "Colombian singer known for her hips." },
      {
        word: "Jennifer Lopez",
        hint: "Singer, dancer, actress from the Bronx.",
      },
      { word: "Britney Spears", hint: "Pop princess of the late 1990s." },
      { word: "Christina Aguilera", hint: "Pop singer with a powerful voice." },
      { word: "Kylie Jenner", hint: "Reality star turned beauty mogul." },
      { word: "Kim Kardashian", hint: "Reality star and businesswoman." },
      { word: "Kendall Jenner", hint: "Supermodel from a famous family." },
      { word: "Gigi Hadid", hint: "American supermodel." },
      { word: "Bella Hadid", hint: "Model and sister to Gigi." },
      { word: "Oprah Winfrey", hint: "Talk show host and media mogul." },
      { word: "Ellen DeGeneres", hint: "Comedian and daytime talk host." },
      { word: "David Beckham", hint: "English football star and style icon." },
      { word: "Cristiano Ronaldo", hint: "Portuguese football legend." },
      { word: "Lionel Messi", hint: "Argentine football superstar." },
      { word: "LeBron James", hint: "NBA star often compared to Jordan." },
      { word: "Michael Jordan", hint: "Basketball legend known as 'MJ'." },
      { word: "Serena Williams", hint: "Tennis champion with 23 Grand Slams." },
      { word: "Roger Federer", hint: "Swiss tennis legend." },
      { word: "Rafael Nadal", hint: "King of clay courts." },
      { word: "Novak Djokovic", hint: "Serbian tennis great." },
      { word: "Usain Bolt", hint: "World’s fastest man." },
      { word: "Muhammad Ali", hint: "Boxer who 'floated like a butterfly'." },
      { word: "Mike Tyson", hint: "Heavyweight boxer known for knockouts." },
      {
        word: "Dwayne Johnson",
        hint: "Wrestler turned actor nicknamed 'The Rock'.",
      },
      {
        word: "Arnold Schwarzenegger",
        hint: "Actor and former governor of California.",
      },
      { word: "Sylvester Stallone", hint: "Star of 'Rocky' and 'Rambo'." },
      { word: "Tom Cruise", hint: "Action star from 'Mission Impossible'." },
      { word: "Brad Pitt", hint: "Hollywood heartthrob from 'Fight Club'." },
      { word: "Leonardo DiCaprio", hint: "Oscar-winning star of 'Titanic'." },
      { word: "Johnny Depp", hint: "Known for Captain Jack Sparrow." },
      { word: "Robert Downey Jr", hint: "Famous for Iron Man role." },
      { word: "Chris Evans", hint: "Actor behind Captain America." },
      { word: "Chris Hemsworth", hint: "Marvel’s God of Thunder." },
      {
        word: "Scarlett Johansson",
        hint: "Played Black Widow in Marvel films.",
      },
      {
        word: "Natalie Portman",
        hint: "Oscar-winning actress and Marvel star.",
      },
      { word: "Angelina Jolie", hint: "Actress and humanitarian." },
      { word: "Julia Roberts", hint: "Actress known for 'Pretty Woman'." },
      {
        word: "Meryl Streep",
        hint: "Often called the greatest living actress.",
      },
      { word: "Anne Hathaway", hint: "Star of 'The Devil Wears Prada'." },
      { word: "Emma Watson", hint: "Famous for Hermione role." },
      { word: "Daniel Radcliffe", hint: "Actor who played Harry Potter." },
      { word: "Rupert Grint", hint: "Played Ron Weasley in Harry Potter." },
      { word: "Matt Damon", hint: "Star of the Bourne series." },
      { word: "Ben Affleck", hint: "Actor and director, once played Batman." },
      {
        word: "Will Smith",
        hint: "Actor and rapper known for 'Men in Black'.",
      },
      { word: "Jada Pinkett Smith", hint: "Actress and talk show host." },
      { word: "Chris Rock", hint: "Comedian and actor." },
      { word: "Kevin Hart", hint: "Comedian and actor with high energy." },
      { word: "Jim Carrey", hint: "Comedian known for rubber face." },
      { word: "Robin Williams", hint: "Beloved actor and comedian." },
      { word: "Steve Carell", hint: "Known as Michael Scott in 'The Office'." },
      {
        word: "Jennifer Aniston",
        hint: "Famous for playing Rachel on 'Friends'.",
      },
      { word: "Courteney Cox", hint: "Played Monica on 'Friends'." },
      { word: "Matthew Perry", hint: "Played Chandler on 'Friends'." },
      { word: "David Schwimmer", hint: "Played Ross on 'Friends'." },
      { word: "Lisa Kudrow", hint: "Played Phoebe on 'Friends'." },
      { word: "Paul Rudd", hint: "Actor who played Ant-Man." },
      { word: "Mark Ruffalo", hint: "Marvel’s Hulk actor." },
      {
        word: "Samuel L. Jackson",
        hint: "Actor known for 'Pulp Fiction' and Nick Fury.",
      },
      { word: "Morgan Freeman", hint: "Actor with an iconic voice." },
      {
        word: "Denzel Washington",
        hint: "Award-winning actor of 'Training Day'.",
      },
      { word: "Idris Elba", hint: "Actor from 'Luther' and Marvel films." },
      { word: "Hugh Jackman", hint: "Played Wolverine for nearly 20 years." },
      { word: "Ryan Reynolds", hint: "Actor known as Deadpool." },
      { word: "Blake Lively", hint: "Actress and Ryan Reynolds’ wife." },
      { word: "Zendaya", hint: "Actress and singer from 'Euphoria'." },
      {
        word: "Timothée Chalamet",
        hint: "Star of 'Dune' and 'Call Me by Your Name'.",
      },
      { word: "Keanu Reeves", hint: "Star of 'Matrix' and 'John Wick'." },
      {
        word: "Charlize Theron",
        hint: "Oscar-winning actress from South Africa.",
      },
      { word: "Gal Gadot", hint: "Played Wonder Woman." },
      { word: "Chris Pratt", hint: "Actor in 'Guardians of the Galaxy'." },
      { word: "Zac Efron", hint: "Star of 'High School Musical'." },
      {
        word: "Shah Rukh Khan",
        hint: "Bollywood superstar known as 'King Khan'.",
      },
      { word: "Priyanka Chopra", hint: "Bollywood and Hollywood actress." },
      { word: "Jackie Chan", hint: "Martial arts legend and actor." },
      { word: "Jet Li", hint: "Martial artist and action star." },
      { word: "Bruce Lee", hint: "Martial arts icon of the 20th century." },
    ],
  },
  countries: {
    title: "Countries",
    words: [
      {
        word: "United States",
        hint: "Known for Hollywood and Silicon Valley.",
      },
      { word: "Canada", hint: "Famous for maple syrup and ice hockey." },
      {
        word: "Mexico",
        hint: "Land of tacos, mariachi, and ancient pyramids.",
      },
      { word: "Brazil", hint: "Home of Carnival and the Amazon rainforest." },
      { word: "Argentina", hint: "Birthplace of tango and Lionel Messi." },
      { word: "Chile", hint: "Long narrow strip along the Andes and Pacific." },
      { word: "Colombia", hint: "Coffee-producing country in South America." },
      { word: "Peru", hint: "Famous for Machu Picchu." },
      {
        word: "Venezuela",
        hint: "Known for Angel Falls, the world’s tallest waterfall.",
      },
      { word: "Ecuador", hint: "Named after the equator line." },
      { word: "France", hint: "Eiffel Tower country." },
      { word: "Germany", hint: "Known for beer, cars, and Oktoberfest." },
      { word: "Italy", hint: "Birthplace of pizza and pasta." },
      { word: "Spain", hint: "Known for flamenco and bullfighting." },
      { word: "Portugal", hint: "Famous for explorers and port wine." },
      {
        word: "United Kingdom",
        hint: "Includes England, Scotland, Wales, and Northern Ireland.",
      },
      { word: "Ireland", hint: "Emerald Isle with Celtic roots." },
      { word: "Switzerland", hint: "Alps, chocolate, and banking hub." },
      { word: "Austria", hint: "Land of Mozart and the Alps." },
      { word: "Netherlands", hint: "Tulips, canals, and windmills." },
      { word: "Belgium", hint: "Renowned for chocolate and waffles." },
      { word: "Sweden", hint: "IKEA and ABBA’s homeland." },
      { word: "Norway", hint: "Fjords and northern lights." },
      { word: "Denmark", hint: "Birthplace of LEGO and fairytales." },
      { word: "Finland", hint: "Land of saunas and reindeer." },
      { word: "Iceland", hint: "Known for geysers and volcanoes." },
      { word: "Poland", hint: "Central European nation with rich history." },
      { word: "Czech Republic", hint: "Famous for Prague and beer." },
      { word: "Hungary", hint: "Budapest and thermal baths." },
      { word: "Greece", hint: "Birthplace of democracy and ancient gods." },
      { word: "Turkey", hint: "Bridges Europe and Asia." },
      { word: "Russia", hint: "World’s largest country by area." },
      { word: "Ukraine", hint: "Known as Europe’s breadbasket." },
      { word: "China", hint: "Great Wall country." },
      { word: "Japan", hint: "Land of the rising sun." },
      { word: "South Korea", hint: "K-pop and high-tech innovation." },
      {
        word: "North Korea",
        hint: "Isolated country on the Korean Peninsula.",
      },
      { word: "India", hint: "Land of Bollywood and the Taj Mahal." },
      { word: "Pakistan", hint: "Famous for the Indus Valley civilization." },
      { word: "Bangladesh", hint: "Known for its rivers and textiles." },
      { word: "Sri Lanka", hint: "Island nation in the Indian Ocean." },
      { word: "Nepal", hint: "Home to Mount Everest." },
      { word: "Bhutan", hint: "Himalayan kingdom of happiness." },
      { word: "Thailand", hint: "Known for beaches and temples." },
      { word: "Vietnam", hint: "Country of pho and Ha Long Bay." },
      { word: "Cambodia", hint: "Famous for Angkor Wat." },
      { word: "Malaysia", hint: "Petronas Towers landmark." },
      { word: "Singapore", hint: "City-state known for Marina Bay Sands." },
      { word: "Indonesia", hint: "Archipelago with Bali and Java." },
      { word: "Philippines", hint: "Over 7,000 islands." },
      { word: "Myanmar", hint: "Formerly known as Burma." },
      { word: "Laos", hint: "Landlocked country in Southeast Asia." },
      { word: "Mongolia", hint: "Land of Genghis Khan and vast steppes." },
      { word: "Saudi Arabia", hint: "Oil-rich and home to Mecca." },
      { word: "United Arab Emirates", hint: "Dubai’s skyscrapers stand here." },
      { word: "Qatar", hint: "Wealthy Gulf state hosting FIFA 2022." },
      { word: "Kuwait", hint: "Small Gulf country with oil wealth." },
      { word: "Oman", hint: "Arabian nation with deserts and forts." },
      { word: "Yemen", hint: "Home to ancient port city Aden." },
      { word: "Iran", hint: "Formerly Persia with rich history." },
      { word: "Iraq", hint: "Land of Mesopotamia." },
      { word: "Israel", hint: "Middle Eastern nation with Jerusalem." },
      { word: "Egypt", hint: "Land of pyramids and the Nile." },
      { word: "South Africa", hint: "Rainbow Nation and home to Mandela." },
      { word: "Nigeria", hint: "Africa’s most populous country." },
      { word: "Kenya", hint: "Known for safaris and wildlife." },
      { word: "Ethiopia", hint: "Birthplace of coffee." },
      { word: "Ghana", hint: "West African nation rich in gold." },
      { word: "Morocco", hint: "North African country with Marrakech." },
      { word: "Algeria", hint: "Largest country in Africa." },
      { word: "Tunisia", hint: "Mediterranean nation in North Africa." },
      { word: "Libya", hint: "North African country with Sahara deserts." },
      { word: "Sudan", hint: "Nile river runs through it." },
      { word: "Eritrea", hint: "Horn of Africa country on the Red Sea." },
      { word: "Somalia", hint: "Located on the Horn of Africa." },
      { word: "Tanzania", hint: "Home to Mount Kilimanjaro." },
      { word: "Uganda", hint: "Source of the Nile river." },
      { word: "Zimbabwe", hint: "Victoria Falls lies here." },
      { word: "Zambia", hint: "Shares Victoria Falls with Zimbabwe." },
      { word: "Botswana", hint: "Known for Okavango Delta safaris." },
      { word: "Namibia", hint: "Home to the Namib Desert." },
      { word: "Angola", hint: "Southwest African country rich in oil." },
      {
        word: "Mozambique",
        hint: "Southeast African country on the Indian Ocean.",
      },
      { word: "Madagascar", hint: "Island nation with unique wildlife." },
      { word: "Australia", hint: "Known for the Outback and kangaroos." },
      { word: "New Zealand", hint: "Middle-earth filming location." },
      { word: "Fiji", hint: "South Pacific island nation." },
      { word: "Papua New Guinea", hint: "Island nation north of Australia." },
      { word: "Solomon Islands", hint: "Pacific islands with WWII history." },
      { word: "Samoa", hint: "Island nation in Polynesia." },
      { word: "Tonga", hint: "Polynesian kingdom in the Pacific." },
      { word: "Haiti", hint: "Caribbean nation on Hispaniola." },
      { word: "Cuba", hint: "Caribbean island with classic cars." },
      { word: "Dominican Republic", hint: "Shares an island with Haiti." },
      { word: "Jamaica", hint: "Reggae and Bob Marley’s homeland." },
      { word: "Trinidad and Tobago", hint: "Caribbean twin-island nation." },
    ],
  },
  cars: {
    title: "Cars",
    words: [
      {
        word: "Toyota Corolla",
        hint: "One of the best-selling cars of all time.",
      },
      { word: "Honda Civic", hint: "Compact car popular among tuners." },
      {
        word: "Ford Mustang",
        hint: "An American muscle icon with a horse in its name.",
      },
      {
        word: "Chevrolet Camaro",
        hint: "Another muscle car rivaling the Mustang.",
      },
      {
        word: "Tesla Model 3",
        hint: "Electric car known for autopilot features.",
      },
      { word: "BMW 3 Series", hint: "Luxury sedan with sporty handling." },
      {
        word: "Mercedes-Benz C-Class",
        hint: "German luxury with comfort and performance.",
      },
      {
        word: "Audi A4",
        hint: "Compact luxury car with quattro all-wheel drive.",
      },
      { word: "Volkswagen Golf", hint: "European hatchback icon." },
      { word: "Porsche 911", hint: "Classic sports car with a rear engine." },
      {
        word: "Ferrari 488",
        hint: "Italian supercar with a prancing horse logo.",
      },
      { word: "Lamborghini Aventador", hint: "Supercar with scissor doors." },
      {
        word: "McLaren 720S",
        hint: "British supercar with aerodynamic design.",
      },
      { word: "Bugatti Chiron", hint: "Hypercar capable of over 250 mph." },
      {
        word: "Koenigsegg Jesko",
        hint: "Swedish hypercar built for speed records.",
      },
      {
        word: "Mazda MX-5 Miata",
        hint: "Small roadster loved for its fun driving.",
      },
      { word: "Subaru WRX", hint: "Rally-inspired car with a boxer engine." },
      { word: "Nissan GT-R", hint: "Nicknamed ‘Godzilla’ in the car world." },
      {
        word: "Dodge Charger",
        hint: "American muscle sedan also famous in movies.",
      },
      { word: "Dodge Challenger", hint: "Retro-styled muscle coupe." },
      { word: "Chevrolet Corvette", hint: "America’s sports car." },
      {
        word: "Jeep Wrangler",
        hint: "Off-roader with removable doors and roof.",
      },
      { word: "Land Rover Defender", hint: "British off-road legend." },
      {
        word: "Toyota Land Cruiser",
        hint: "Known for reliability in tough terrains.",
      },
      {
        word: "Ford F-150",
        hint: "One of the most popular trucks in the U.S.",
      },
      {
        word: "Chevrolet Silverado",
        hint: "Full-size truck rivaling the F-150.",
      },
      { word: "Ram 1500", hint: "Truck known for a smooth ride." },
      { word: "GMC Sierra", hint: "Luxury sibling of the Silverado." },
      { word: "Honda Accord", hint: "Mid-size sedan known for reliability." },
      { word: "Hyundai Elantra", hint: "Compact sedan with modern design." },
      { word: "Kia Optima", hint: "Mid-size car from South Korea." },
      { word: "Nissan Altima", hint: "Popular family sedan." },
      { word: "Chevrolet Malibu", hint: "American mid-size car." },
      { word: "Toyota Camry", hint: "Mid-size sedan often seen as a taxi." },
      { word: "Lexus RX", hint: "Luxury crossover SUV." },
      { word: "Acura MDX", hint: "Luxury SUV with three rows." },
      { word: "Infiniti Q50", hint: "Luxury sedan with Japanese engineering." },
      { word: "Volvo XC90", hint: "Swedish SUV known for safety." },
      { word: "Range Rover", hint: "Luxury SUV popular among celebrities." },
      { word: "Bentley Continental GT", hint: "British luxury grand tourer." },
      { word: "Rolls-Royce Phantom", hint: "Ultimate symbol of luxury cars." },
      {
        word: "Rolls-Royce Cullinan",
        hint: "Luxury SUV with unmatched comfort.",
      },
      {
        word: "Aston Martin DB11",
        hint: "British GT often linked with James Bond.",
      },
      { word: "Jaguar F-Type", hint: "British sports car with sleek design." },
      { word: "Mini Cooper", hint: "Small car with iconic British style." },
      { word: "Smart Fortwo", hint: "Tiny city car." },
      { word: "Honda Fit", hint: "Subcompact with surprising space." },
      { word: "Toyota Prius", hint: "Popular hybrid car." },
      { word: "Hyundai Ioniq 5", hint: "Modern electric crossover." },
      { word: "Kia EV6", hint: "Stylish electric car from Korea." },
      { word: "Rivian R1T", hint: "Electric adventure truck." },
      { word: "Lucid Air", hint: "Luxury EV rivaling Tesla." },
      { word: "Ford Bronco", hint: "Revived off-road SUV legend." },
      { word: "Chevrolet Tahoe", hint: "Large SUV with three rows." },
      { word: "Cadillac Escalade", hint: "Full-size luxury SUV." },
      { word: "Toyota RAV4", hint: "One of the best-selling SUVs." },
      { word: "Honda CR-V", hint: "Popular compact SUV." },
      { word: "Mazda CX-5", hint: "Stylish compact SUV." },
      { word: "Hyundai Tucson", hint: "Compact SUV with modern tech." },
      { word: "Kia Sportage", hint: "SUV with bold design." },
      { word: "Nissan Rogue", hint: "Compact SUV with a spacious interior." },
      { word: "Ford Explorer", hint: "SUV known for versatility." },
      {
        word: "Chevrolet Suburban",
        hint: "Longest continuously used car nameplate.",
      },
      { word: "Jeep Grand Cherokee", hint: "SUV with off-road luxury." },
      { word: "Subaru Outback", hint: "Crossover with adventure focus." },
      { word: "Subaru Forester", hint: "SUV known for safety and AWD." },
      {
        word: "Mitsubishi Outlander",
        hint: "SUV with a plug-in hybrid option.",
      },
      { word: "Peugeot 208", hint: "Popular French hatchback." },
      { word: "Renault Clio", hint: "Compact French bestseller." },
      { word: "Fiat 500", hint: "Tiny Italian city car." },
      { word: "Alfa Romeo Giulia", hint: "Italian sports sedan." },
      { word: "Citroen C3", hint: "French hatchback with quirky style." },
      { word: "Skoda Octavia", hint: "Practical Czech car." },
      { word: "Seat Leon", hint: "Spanish compact car." },
      { word: "Dacia Duster", hint: "Budget-friendly SUV." },
      { word: "Chrysler 300", hint: "Large sedan with bold design." },
      { word: "Lincoln Navigator", hint: "Luxury SUV rivaling Escalade." },
      { word: "Pontiac Firebird", hint: "Classic muscle car of the 70s." },
      { word: "Plymouth Barracuda", hint: "Retro muscle car legend." },
      { word: "Oldsmobile Cutlass", hint: "American classic car." },
      { word: "Buick Regal", hint: "GM’s mid-size luxury sedan." },
      { word: "Cadillac CTS", hint: "Luxury sedan with sporty edge." },
      { word: "Mazda RX-7", hint: "Sports car with a rotary engine." },
      { word: "Mazda RX-8", hint: "Successor to the RX-7." },
      { word: "Toyota Supra", hint: "Japanese sports car loved by tuners." },
      {
        word: "Honda S2000",
        hint: "Convertible sports car with high-revving engine.",
      },
      { word: "Acura NSX", hint: "Japanese supercar rivaling Ferrari." },
      { word: "Nissan 350Z", hint: "Japanese sports coupe." },
      { word: "Nissan 370Z", hint: "Updated version of the 350Z." },
      { word: "Chevrolet Impala", hint: "Classic American full-size car." },
      {
        word: "Ford Taurus",
        hint: "Formerly a best-selling sedan in the U.S.",
      },
      { word: "Buick Enclave", hint: "Luxury crossover SUV." },
      { word: "Toyota Hilux", hint: "Pickup truck known for toughness." },
      { word: "Isuzu D-Max", hint: "Reliable pickup truck." },
      { word: "Mitsubishi Lancer", hint: "Compact car also used in rally." },
      { word: "Suzuki Swift", hint: "Small car popular in Asia and Europe." },
      { word: "Peugeot 3008", hint: "Stylish French crossover." },
      { word: "Renault Captur", hint: "Compact crossover SUV." },
    ],
  },
  cartoons2000s: {
    title: "Best Jetix and Cartoon Network Classics",
    words: [
      { word: "Dragon Ball Z", hint: "Saiyans powering up beyond limits" },
      { word: "Naruto", hint: "A ninja with dreams of becoming Hokage" },
      { word: "One Piece", hint: "Pirates chasing the greatest treasure" },
      { word: "Bleach", hint: "A substitute shinigami with a huge sword" },
      {
        word: "Fullmetal Alchemist",
        hint: "Two brothers seeking the philosopher’s stone",
      },
      { word: "Death Note", hint: "A notebook that decides fate" },
      { word: "Inuyasha", hint: "Half-demon searching for shards" },
      { word: "Yu Yu Hakusho", hint: "A delinquent turned spirit detective" },
      { word: "Cowboy Bebop", hint: "Bounty hunters wandering the galaxy" },
      { word: "Trigun", hint: "A gunslinger known as the humanoid typhoon" },

      {
        word: "Sailor Moon",
        hint: "Magical girls fighting for love and justice",
      },
      {
        word: "Great Teacher Onizuka",
        hint: "A biker gang leader turned teacher",
      },
      { word: "Monster", hint: "A surgeon entangled in a chilling manhunt" },
      { word: "Yu Gi Oh", hint: "Cards hold power beyond imagination" },
      { word: "Pokemon", hint: "Catch, train, and battle mystical creatures" },
      {
        word: "One Punch Man",
        hint: "Hero who defeats foes with a single strike",
      },
      {
        word: "Uncle from Another World",
        hint: "Fantasy unfolds when a relative returns from another realm",
      },
      //

      {
        word: "SpongeBob SquarePants",
        hint: "Undersea sponge with pineapple house and quirky friends",
      },
      {
        word: "Teen Titans",
        hint: "Young heroes balancing school and saving their city",
      },
      {
        word: "Samurai Jack",
        hint: "A samurai thrown to the future fighting a shapeshifting evil",
      },
      {
        word: "X-Men Evolution",
        hint: "Mutant teens mastering powers as hatred looms",
      },

      {
        word: "Avatar The Last Airbender",
        hint: "One nimble boy must master elements to bring balance",
      },

      {
        word: "CatDog",
        hint: "Two siblings sharing a body but opposite personalities",
      },

      // Cartoon Network (20)
      {
        word: "Ed Edd n Eddy",
        hint: "Three friends with endless get-rich schemes",
      },
      {
        word: "Courage The Cowardly Dog",
        hint: "Fearful pup in the middle of nowhere",
      },
      {
        word: "Dexter's Laboratory",
        hint: "A secret lab hidden from his sister",
      },
      {
        word: "The Powerpuff Girls",
        hint: "Sugar, spice, and everything nice",
      },
      { word: "Samurai Jack", hint: "A warrior thrown into the future" },
      { word: "Johnny Bravo", hint: "Muscles and sunglasses, short on brains" },
      {
        word: "Codename Kids Next Door",
        hint: "Treehouse spies fighting adulthood",
      },
      {
        word: "Grim Adventures Of Billy And Mandy",
        hint: "Kids hanging out with Death",
      },
      {
        word: "Foster's Home For Imaginary Friends",
        hint: "Where make-believe becomes real",
      },
      { word: "Chowder", hint: "A young chef with a big appetite" },
      { word: "Ben 10", hint: "A boy and his alien watch" },
      { word: "Camp Lazlo", hint: "Summer camp chaos in the forest" },
      {
        word: "My Gym Partner's A Monkey",
        hint: "A human in an animal school",
      },
      { word: "Teen Titans", hint: "Young heroes in their tower" },
      { word: "Total Drama Island", hint: "Reality show parody with cartoons" },
      { word: "Megas XLR", hint: "A giant robot in the hands of gamers" },
      { word: "Time Squad", hint: "History isn’t safe from time travelers" },
      {
        word: "Sheep In The Big City",
        hint: "An innocent sheep vs. a secret military org",
      },
      { word: "I Am Weasel", hint: "A clever weasel and his dim sidekick" },

      // Jetix (20)

      { word: "Yin Yang Yo", hint: "Rabbit siblings mastering martial arts" },
      {
        word: "Power Rangers SPD",
        hint: "Cops in spandex guarding the galaxy",
      },
      { word: "Shaman King", hint: "Battles to become the spirit champion" },
      { word: "Medabots", hint: "Robots dueling under kids’ control" },
      { word: "Sonic X", hint: "The blue blur races into another world" },
      { word: "Dragon Booster", hint: "Racing with legendary dragons" },

      { word: "Galactik Football", hint: "Soccer powered by cosmic energy" },
    ],
  },
  games: {
    title: "Most popular games",
    words: [
      {
        word: "Super Mario Bros",
        hint: "An Italian plumber saves a princess.",
      },
      {
        word: "The Legend of Zelda",
        hint: "Hero in green wields the Master Sword.",
      },
      { word: "Tetris", hint: "Blocks must fit together in perfect lines." },
      { word: "Pac-Man", hint: "Yellow circle avoids ghosts in a maze." },
      { word: "Sonic the Hedgehog", hint: "Blue speedster collects rings." },
      {
        word: "Street Fighter",
        hint: "Arcade fighting classic with Ryu and Chun-Li.",
      },
      { word: "Mortal Kombat", hint: "Fighting game famous for 'Finish Him!'" },
      { word: "Pokémon Red and Blue", hint: "Catch ‘em all started here." },
      { word: "Final Fantasy", hint: "JRPG with Cloud and Sephiroth." },
      { word: "Metal Gear Solid", hint: "Stealth action with Solid Snake." },

      // Modern Icons
      { word: "Grand Theft Auto V", hint: "Crime and chaos in Los Santos." },
      {
        word: "Minecraft",
        hint: "Blocky sandbox world of endless creativity.",
      },
      { word: "Fortnite", hint: "Battle royale with building mechanics." },
      { word: "League of Legends", hint: "MOBA game dominating esports." },
      {
        word: "World of Warcraft",
        hint: "Massive online fantasy world by Blizzard.",
      },
      {
        word: "Counter-Strike",
        hint: "Terrorists vs. Counter-Terrorists FPS.",
      },
      { word: "Overwatch", hint: "Hero shooter with colorful abilities." },
      {
        word: "Call of Duty: Modern Warfare",
        hint: "Military FPS with cinematic campaigns.",
      },
      {
        word: "Halo: Combat Evolved",
        hint: "Sci-fi FPS starring Master Chief.",
      },
      { word: "Elden Ring", hint: "Open-world fantasy from FromSoftware." },

      // Nintendo Greats

      { word: "Donkey Kong", hint: "Classic barrel-jumping arcade hit." },

      { word: "Kirby", hint: "Pink puffball who copies abilities." },
      { word: "Pokemon Go", hint: "Mobile AR game with global craze." },
      { word: "Mario Kart", hint: "Kart racing with shells and bananas." },
      { word: "Super Mario", hint: "3D platforming revolution." },
      {
        word: "The Legend of Zelda",
        hint: "Open-world Hyrule exploration.",
      },

      // Other Fan Favorites
      { word: "The Sims", hint: "Life simulation with build mode." },
      { word: "Skyrim", hint: "Fus Ro Dah in an open fantasy world." },
      { word: "Red Dead Redemption", hint: "Epic western tale by Rockstar." },
      { word: "Among Us", hint: "Crewmates vs impostors in space." },
      { word: "Resident Evil", hint: "Survival horror with Leon Kennedy." },
      {
        word: "Silent Hill",
        hint: "Psychological horror with foggy streets.",
      },
      { word: "The Witcher", hint: "Geralt searches for Ciri." },

      { word: "God of War", hint: "Spartan warrior battles gods." },
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
          .split("")
          .map((item) => {
            return item.replace(/[^a-zA-Z\s]/g, "");
          }),
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
