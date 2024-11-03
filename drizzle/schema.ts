import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const exercises = pgTable('exercises', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  sentences: text('sentences').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const userProgress = pgTable('user_progress', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull(),
  exerciseId: uuid('exercise_id').notNull().references(() => exercises.id),
  completed: text('completed').notNull(),
  lastAttempted: timestamp('last_attempted').defaultNow().notNull()
})