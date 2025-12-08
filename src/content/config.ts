import { defineCollection, z } from 'astro:content';

const exercisesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    navigation: z.object({
      order: z.number(),
    }).optional(),
  }),
});

export const collections = {
  exercises: exercisesCollection,
};
