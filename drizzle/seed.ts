import { config } from 'dotenv';
import { db } from './index';
import { exercises } from './schema';

config({ path: '.env' });

const seedData = [
  {
    title: 'Basic Greetings',
    description: 'Learn common English greetings and introductions',
    sentences: JSON.stringify([
      {
        text: "Hello, how are you?",
        phonetic: "həˈloʊ, haʊ ɑr juː",
        translation: "A common greeting to ask about someone's well-being"
      },
      {
        text: "Nice to meet you!",
        phonetic: "naɪs tuː miːt juː",
        translation: "A polite expression used when meeting someone for the first time"
      },
      {
        text: "Have a great day!",
        phonetic: "hæv ə greɪt deɪ",
        translation: "A friendly way to say goodbye and wish someone well"
      }
    ])
  },
  {
    title: 'Daily Routines',
    description: 'Practice expressing daily activities and routines',
    sentences: JSON.stringify([
      {
        text: "I wake up at seven o'clock every morning.",
        phonetic: "aɪ weɪk ʌp æt ˈsɛvən əˈklɒk ˈɛvri ˈmɔrnɪŋ",
        translation: "Describing your morning wake-up time"
      },
      {
        text: "What time do you usually have breakfast?",
        phonetic: "wɒt taɪm duː juː ˈjuːʒuəli hæv ˈbrɛkfəst",
        translation: "Asking about someone's breakfast time"
      },
      {
        text: "I like to exercise in the evening.",
        phonetic: "aɪ laɪk tuː ˈɛksərsaɪz ɪn ðə ˈiːvnɪŋ",
        translation: "Expressing preference for evening exercise"
      }
    ])
  },
  {
    title: 'Weather Talk',
    description: 'Learn to discuss weather conditions in English',
    sentences: JSON.stringify([
      {
        text: "It's a beautiful sunny day today!",
        phonetic: "ɪts ə ˈbjuːtəfʊl ˈsʌni deɪ təˈdeɪ",
        translation: "Describing a nice weather condition"
      },
      {
        text: "I think it's going to rain later.",
        phonetic: "aɪ θɪŋk ɪts ˈgoʊɪŋ tuː reɪn ˈleɪtər",
        translation: "Predicting rain in the forecast"
      },
      {
        text: "How's the weather in your city?",
        phonetic: "haʊz ðə ˈwɛðər ɪn jʊər ˈsɪti",
        translation: "Asking about weather conditions in someone's location"
      }
    ])
  }
];

async function seed() {
  try {
    console.log('Seeding database...');
    
    for (const exercise of seedData) {
      await db.insert(exercises).values(exercise);
    }
    
    console.log('Seed completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    process.exit(0);
  }
}

seed();