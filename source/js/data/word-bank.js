'use strict';

const wordList = [
  'dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building',
  'population', 'weather', 'bottle', 'history', 'dream', 'character', 'money',
  'absolute', 'discipline', 'machine', 'accurate', 'connection', 'rainbow',
  'bicycle', 'eclipse', 'calculator', 'trouble', 'watermelon', 'developer',
  'philosophy', 'database', 'periodic', 'capitalism', 'abominable', 'phone',
  'component', 'future', 'pasta', 'microwave', 'jungle', 'wallet', 'canada',
  'velvet', 'potion', 'treasure', 'beacon', 'labyrinth', 'whisper', 'breeze',
  'coffee', 'beauty', 'agency', 'chocolate', 'eleven', 'technology',
  'alphabet', 'knowledge', 'magician', 'professor', 'triangle', 'earthquake',
  'baseball', 'beyond', 'evolution', 'banana', 'perfume', 'computer',
  'butterfly', 'discovery', 'ambition', 'music', 'eagle', 'crown',
  'chess', 'laptop', 'bedroom', 'delivery', 'enemy', 'button', 'door', 'bird',
  'superman', 'library', 'unboxing', 'bookstore', 'language', 'homework',
  'beach', 'economy', 'interview', 'awesome', 'challenge', 'science',
  'mystery', 'famous', 'league', 'memory', 'leather', 'planet', 'software',
  'update', 'yellow', 'keyboard', 'window', 'beans', 'truck', 'sheep',
  'blossom', 'secret', 'wonder', 'enchantment', 'destiny', 'quest', 'sanctuary',
  'download', 'blue', 'actor', 'desk', 'watch', 'giraffe', 'brazil',
  'audio', 'school', 'detective', 'hero', 'progress', 'winter', 'passion',
  'rebel', 'amber', 'jacket', 'article', 'paradox', 'social', 'resort',
  'mask', 'escape', 'promise', 'band', 'level', 'hope', 'moonlight', 'media',
  'orchestra', 'volcano', 'guitar', 'raindrop', 'inspiration', 'diamond',
  'illusion', 'firefly', 'ocean', 'cascade', 'journey', 'laughter', 'horizon',
  'exploration', 'serendipity', 'infinity', 'silhouette', 'wanderlust',
  'marvel', 'nostalgia', 'serenity', 'reflection', 'twilight', 'harmony',
  'symphony', 'solitude', 'essence', 'melancholy', 'melody', 'vision',
  'silence', 'whimsical', 'eternity', 'cathedral', 'embrace', 'poet', 'ricochet',
  'mountain', 'dance', 'sunrise', 'dragon', 'adventure', 'galaxy', 'echo',
  'fantasy', 'radiant', 'serene', 'legend', 'starlight', 'light', 'pressure',
  'bread', 'cake', 'caramel', 'juice', 'mouse', 'charger', 'pillow', 'candle',
  'film', 'jupiter'
];

export const wordBank = shuffleArray(wordList);

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = random(0, i);

      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}