import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { Tag } from '../entities/tag.entity';
import { Connection } from 'typeorm';
import * as slug from 'slug';
@EventSubscriber()
export class TagSubscriber implements EntitySubscriberInterface<Tag> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/ban-types
  listenTo(): string | Function {
    return Tag;
  }

  /**
   * Called before tag.
   */
  async beforeInsert(event: InsertEvent<Tag>): Promise<void> {
    // console.log(`BEFORE TAG INSERTED: `, event.entity);
    if (event.entity.name)
      event.entity.slug = slug(event.entity.name || '', '-');
  }

  async beforeUpdate(event: UpdateEvent<Tag>): Promise<void> {
    // console.log(`BEFORE TAG UPDATE: `, event.entity);
    if (event.entity.name)
      event.entity.slug = slug(event.entity.name || '', '-');
  }
}
