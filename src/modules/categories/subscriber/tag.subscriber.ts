import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { Connection } from 'typeorm';
import * as slug from 'slug';
import { Category } from '../entities/category.entity';
@EventSubscriber()
export class CategorySubscriber implements EntitySubscriberInterface<Category> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/ban-types
  listenTo(): string | Function {
    return Category;
  }

  /**
   * Called before Category.
   */
  async beforeInsert(event: InsertEvent<Category>): Promise<void> {
    // console.log(`BEFORE Category INSERTED: `, event.entity);
    if (event.entity.name)
      event.entity.slug = slug(event.entity.name || '', '-');
  }

  async beforeUpdate(event: UpdateEvent<Category>): Promise<void> {
    // console.log(`BEFORE Category UPDATE: `, event.entity);
    if (event.entity.name)
      event.entity.slug = slug(event.entity.name || '', '-');
  }
}
