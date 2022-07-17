import {
  EntityRepository,
  EntitySubscriberInterface,
  Connection,
} from 'typeorm';
import { Blog } from '../entities/blog.entity';
import * as slug from 'slug';
import { UpdateEvent, InsertEvent } from 'typeorm';

@EntityRepository(Blog)
export class BlogSubscriber implements EntitySubscriberInterface<Blog> {
  constructor(connenction: Connection) {
    connenction.subscribers.push(this);
  }

  listenTo(): typeof Blog {
    return Blog;
  }
  /**
   * Called before Blog.
   */
  async beforeInsert(event: InsertEvent<Blog>): Promise<void> {
    // console.log(`BEFORE Blog INSERTED: `, event.entity);
    if (event.entity.name)
      event.entity.slug = slug(event.entity.name || '', '-');
  }

  async beforeUpdate(event: UpdateEvent<Blog>): Promise<void> {
    // console.log(`BEFORE Blog UPDATE: `, event.entity);
    if (event.entity.name)
      event.entity.slug = slug(event.entity.name || '', '-');
  }
}
