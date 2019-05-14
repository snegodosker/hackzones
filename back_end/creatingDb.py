import sqlite3

conn = sqlite3.connect('problems.db')

conn.execute('CREATE TABLE problems (id INTEGER PRIMARY KEY AUTOINCREMENT, room TEXT NOT NULL, priority INTEGER NOT NULL, compactdesc TEXT NOT NULL, fulldesc TEXT)')
print "Table created successfully";
conn.close()