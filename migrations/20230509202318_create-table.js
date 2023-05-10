/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
      .createTable('users', (tbl) => {
        tbl.increments('id', { primaryKey: true });
        tbl.string('name', 30);
        tbl.enu('role', ['Admin', 'OrgLeader', 'OrgWorker']);
      tbl.integer('created_by').references('id').inTable('users');
      })
      .createTable('organizations', (tbl) => {
        tbl.increments('id', { primaryKey: true });
        tbl.string('name', 30);
        tbl.integer('created_by').references('id').inTable('users');
      })
      .createTable('projects', (tbl) => {
        tbl.increments('id', { primaryKey: true });
        tbl.integer('org_id').references('id').inTable('organizations');
        tbl.integer('created_by').references('id').inTable('users');
      })
      .createTable('tasks', (tbl) => {
        tbl.increments('id', { primaryKey: true });
        tbl.integer('created_by').references('id').inTable('users');
        tbl.integer('org_id').references('id').inTable('organizations');
        tbl.timestamps(true, true);
        tbl.integer('project_id').references('id').inTable('projects');
        tbl.date('due_date');
        tbl.integer('worker_user_id').references('id').inTable('users');
        tbl.enu('status', ['CREATED', 'IN_PROCESS', 'DONE']);
        tbl.date('done_at');
      })
      .createTable('organizationUsers', (tbl) => {
        tbl.increments('id', { primaryKey: true });
        tbl.integer('user_id').references('id').inTable('users');
        tbl.integer('org_id').references('id').inTable('organizations');
      });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema
    .dropTable('tasks')
    .dropTable('projects')
    .dropTable('organizations')
    .dropTable('users');
  };
  