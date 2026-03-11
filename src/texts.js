const texts = {
  easy: [
    "The quick brown fox jumps over the lazy dog.",
    "She sells seashells by the seashore every morning.",
    "A stitch in time saves nine threads from unraveling.",
    "The cat sat on the mat and watched the birds.",
    "Every good boy does fine when playing music notes.",
    "Red lorry yellow lorry red lorry yellow lorry.",
    "How much wood would a woodchuck chuck if a woodchuck could chuck wood.",
    "Peter Piper picked a peck of pickled peppers.",
    "The rain in Spain stays mainly in the plain.",
    "Around the rugged rocks the ragged rascal ran.",
  ],
  medium: [
    "The sixth sick sheik's sixth sheep is particularly unwell today.",
    "Specific Pacific languages are especially difficult to distinguish phonetically.",
    "The philosopher thoroughly thought through three hundred theoretical theorems.",
    "Brisk brave brigadiers brandished broad bright blades and blunderbusses.",
    "She stood on the balcony inexplicably mimicking him hiccupping while amicably welcoming him in.",
    "The epitome of sophisticated vocabulary is rarely utilized in quotidian conversation.",
    "Anthropomorphic characteristics were attributed to the archaeological artifacts.",
    "The statistician's stratospheric estimations astounded the astronomical community.",
    "Preliminary parliamentary procedures preclude the possibility of impromptu overtures.",
    "Unequivocally the most quintessential example of extraordinary craftsmanship.",
  ],
  hard: [
    "The seething sea ceaseth seething and thus the seething sea sufficeth us to see the seaside.",
    "Imagine an imaginary menagerie manager managing an imaginary menagerie of imaginary animals.",
    "Amidst the mists and fiercest frosts with stoutest wrists and loudest boasts he thrusts his fists against the posts and still insists he sees the ghosts.",
    "Theophilus Thistle the successful thistle sifter sifted a sieve full of unsifted thistles through the thick of his thumb.",
    "The phenomenological implications of epistemological paradigms necessitate a comprehensive reevaluation of metaphysical presuppositions.",
    "Susie's shirt shop stocks short spotted shirts and short silk shirts with stripes and spots on the sleeves.",
    "Six Czech cricket critics consistently criticized the chronically clumsy Czech cricket choreographer.",
    "The antithetical aestheticism of the bourgeoisie simultaneously undermines and perpetuates the socioeconomic infrastructure.",
    "Pseudopseudohypoparathyroidism is a hereditary condition characterized by distinctive skeletal abnormalities.",
    "The worcestershire sauce was requisitioned by the connoisseur for the hors d'oeuvres at the rendezvous.",
  ],
}

export function getRandomText(difficulty = 'medium') {
  const pool = texts[difficulty] || texts.medium
  return pool[Math.floor(Math.random() * pool.length)]
}

export default texts
