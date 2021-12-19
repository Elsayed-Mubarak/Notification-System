declare module 'mongoose' {
    interface Query<T, DocType extends import('mongoose').Document, QueryHelpers = {}> {
      mongooseCollection: {
        name: any;
      };
      cache(): DocumentQuery<T[], Document> & QueryHelpers;
      userByName(name: string): DocumentQuery<T[], Document> & QueryHelpers;
      byName(name: string): DocumentQuery<T[], Document> & QueryHelpers;
      byEmail(email: string): DocumentQuery<T[], Document> & QueryHelpers;
      byUUID(UUID: string): DocumentQuery<T[], Document> & QueryHelpers;
      byUserID(id: Schema.Types.ObjectId): DocumentQuery<T[], Document> & QueryHelpers;
      useCache: boolean;
      hashKey: string;
      expire: number;
      model: Model<T>;
    }
  }
  