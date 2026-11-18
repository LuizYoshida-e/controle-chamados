import { defineContract } from '@prisma/orm-mongo/contract-builder';

export const contract = defineContract(
  {},
  ({ field, model, rel }) => ({
    models: {
      User: model('User', {
        collection: 'users',
        fields: {
          id: field.objectId().mongo({ field: '_id' }),
          email: field.string(),
          username: field.string().optional(),
          name: field.string().optional(),
        },
        relations: {
          posts: rel.hasMany('Post', { from: 'id', to: 'authorId' }),
        },
      }),

      Post: model('Post', {
        collection: 'posts',
        fields: {
          id: field.objectId().mongo({ field: '_id' }),
          title: field.string(),
          content: field.string().optional(),
          authorId: field.objectId(),
        },
        relations: {
          author: rel.belongsTo('User', { from: 'authorId', to: 'id' }),
        },
      }),
    },
  }),
);
