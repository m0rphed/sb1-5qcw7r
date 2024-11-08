import { db } from './index'; // Подключение к базе данных
import { exercises, exerciseSentences, sentences } from './schema'; // Импорт таблиц из схемы Drizzle
import { eq, lte, gt, and, between } from 'drizzle-orm'; // Импорт операторов
import { config } from 'dotenv';

config({ path: '.env' }); // Загрузка переменных окружения

async function seedExercises() {
  console.log('Начало заполнения данных в таблицу exercises...');

  // Получаем предложения для упражнений на основе уровня сложности и длины
  const beginnerSentences = await db
    .select()
    .from(sentences)
    .where(and(eq(sentences.difficultyLevel, 1), lte(sentences.wordCount, 5)))
    .limit(10); // Ограничиваем количество для примера

  const intermediateSentences = await db
    .select()
    .from(sentences)
    .where(and(eq(sentences.difficultyLevel, 2), between(sentences.wordCount, 6, 10)))
    .limit(10);

  const advancedSentences = await db
    .select()
    .from(sentences)
    .where(and(eq(sentences.difficultyLevel, 3), gt(sentences.wordCount, 10)))
    .limit(10);

  // Функция для добавления упражнения и связывания его с предложениями
  async function createExercise(title: string, description: string, sentenceRows: { id: string }[]) {
    // Вставка упражнения с использованием метода returning
    const [exercise] = await db
      .insert(exercises)
      .values({
        title,
        description,
      })
      .returning({ id: exercises.id });

    // Связка предложений с упражнением в таблице exerciseSentences
    const exerciseSentenceValues = sentenceRows.map((sentence) => ({
      exerciseId: exercise.id,
      sentenceId: sentence.id,
    }));

    await db.insert(exerciseSentences).values(exerciseSentenceValues);
  }

  try {
    // Создание упражнений с привязкой предложений
    await createExercise(
      'Beginner Level',
      'Basic phrases and sentences for beginners',
      beginnerSentences
    );

    await createExercise(
      'Intermediate Level',
      'Intermediate phrases and sentences for everyday conversations',
      intermediateSentences
    );

    await createExercise(
      'Advanced Level',
      'Advanced phrases and sentences for fluent speakers',
      advancedSentences
    );

    console.log('Заполнение таблицы exercises завершено успешно!');
  } catch (error) {
    console.error('Ошибка при заполнении данных:', error);
  } finally {
    // if (db.close) {
    //   await db.close();
    // }
    console.log('Соединение с базой данных закрыто.');
  }
}

seedExercises().catch((error) => {
  console.error('Ошибка выполнения скрипта:', error);
});
