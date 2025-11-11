import { defineCollection, reference, z } from "astro:content";
import { file } from "astro/loaders";
import { parse as parseCsv } from "csv-parse/sync";

const chapters = defineCollection({
  loader: file("src/content/chapters/chapters.csv", {
    parser: (text) => {
      return parseCsv(text, { columns: true, skipEmptyLines: true }).map((item) => ({
        id: item['slug'],
        title: item['Name'],
        order: item['Order'] * 1,
        contains: item['Related Sections'].split(', '),
      }))
    }
  }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    contains: z.array(reference('sections')),
  })
});

const sections = defineCollection({
  loader: file("src/content/sections/sections.csv", {
    parser: (text) => {
      const result =  parseCsv(text, { columns: true, skipEmptyLines: true }).map((item) => {
        return {
          id: item['slug'],
          title: item['Name'],
          order: item['Order'] * 1,
          contains: item['Modules'].split(', '),
        }
      })
      return result
    }
  }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    contains: z.array(reference('modules')),
  })
});

const terms = defineCollection({
  loader: file("src/content/terms/terms.csv", {
    parser: (text) => {
      const result =  parseCsv(text, { columns: true, skipEmptyLines: true }).map((item) => {
        return {
          id: item['slug'],
          term: item['Term'],
          definition: item['Definition'],
        }
      })
      return result
    }
  }),
  schema: z.object({
    term: z.string(),
    definition: z.string(),
  }),
})

const modules = defineCollection({
  type: "content",
  schema: () => z.object({
    name: z.string(),
    order: z.number(),
  }),
})

export const collections = {
  chapters,
  sections,
  terms,
  modules,
}