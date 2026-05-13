import { config, fields, singleton } from '@keystatic/core'

const homepageSchema = {
  hero: fields.object({
    label: 'Hero секция',
    fields: {
      headline: fields.text({ label: 'Заголовок' }),
      subheadline: fields.text({ label: 'Подзаголовок', multiline: true }),
      ctaLabel: fields.text({ label: 'Текст кнопки PDF' }),
      phone: fields.text({ label: 'Телефон' }),
    },
  }),

  stats: fields.array(
    fields.object({
      fields: {
        value: fields.text({ label: 'Значение' }),
        label: fields.text({ label: 'Подпись' }),
      },
    }),
    { label: 'Статистика', itemLabel: (props) => props.fields.value.value }
  ),

  features: fields.array(
    fields.object({
      fields: {
        title: fields.text({ label: 'Заголовок' }),
        description: fields.text({ label: 'Описание', multiline: true }),
      },
    }),
    { label: 'Преимущества', itemLabel: (props) => props.fields.title.value }
  ),

  offices: fields.object({
    label: 'Секция офисов',
    fields: {
      headline: fields.text({ label: 'Заголовок' }),
      highlights: fields.array(
        fields.text({ label: 'Пункт' }),
        { label: 'Highlights' }
      ),
      images: fields.array(
        fields.object({
          fields: {
            label: fields.text({ label: 'Название вида' }),
            image: fields.image({
              label: 'Фото',
              directory: 'public/sales',
              publicPath: '/sales',
            }),
          },
        }),
        { label: 'Фотографии', itemLabel: (props) => props.fields.label.value }
      ),
    },
  }),
}

// ← потом config, который её использует
export default config({
  storage: {
    kind: 'local',  // для локальной разработки
  },

  singletons: {
    homepage_ro: {
      label: 'Homepage (RO)',
      path: 'content/',
      format: { data: 'json' },
      schema: homepageSchema,
    },
  },
})