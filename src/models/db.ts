import initSqlJs from 'sql.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let db: any;

const ready: Promise<void> = initSqlJs().then((SQL: any) => {
  db = new SQL.Database();

  db.exec(`
    CREATE TABLE IF NOT EXISTS Tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      status TEXT NOT NULL DEFAULT 'pending',
      priority TEXT NOT NULL DEFAULT 'medium',
      user_sub TEXT NOT NULL,
      img_URL TEXT,
      created_at TEXT DEFAULT (CURRENT_TIMESTAMP),
      updated_at TEXT DEFAULT (CURRENT_TIMESTAMP)
    );
  `);

  // Seed demo tasks
  db.exec(`
    INSERT INTO Tasks (title, description, status, priority, user_sub)
      VALUES ('Welcome to the Todo App!', 'This is a demo task. You can create, edit, and delete tasks.', 'pending', 'high', 'demo_user_001');
    INSERT INTO Tasks (title, description, status, priority, user_sub)
      VALUES ('Try adding a new task', 'Use the form below to add your own task.', 'pending', 'medium', 'demo_user_001');
    INSERT INTO Tasks (title, description, status, priority, user_sub)
      VALUES ('Mark a task as complete', 'Click the status toggle to mark a task as done.', 'completed', 'low', 'demo_user_001');
  `);
});

const pool = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: async (sql: string, params?: any[]): Promise<[any, any]> => {
    await ready;
    const upper = sql.trim().toUpperCase();

    if (upper.startsWith('SELECT')) {
      const stmt = db.prepare(sql);
      if (params && params.length > 0) stmt.bind(params);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rows: any[] = [];
      while (stmt.step()) rows.push(stmt.getAsObject());
      stmt.free();
      return [rows, []];
    } else {
      const stmt = db.prepare(sql);
      if (params && params.length > 0) stmt.bind(params);
      stmt.step();
      stmt.free();
      const insertId = (db.exec('SELECT last_insert_rowid()')[0]?.values[0][0]) ?? 0;
      const affectedRows = db.getRowsModified();
      return [{ insertId, affectedRows }, []];
    }
  }
};

export default pool;
