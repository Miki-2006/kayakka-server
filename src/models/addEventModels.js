import connectToAzure from "../config/dbConnecting";
const pool = connectToAzure();

class Event {

  static async create({ title, description, event_date, location_id, category_id, organizer_id, price, image }) {
    return pool.query(
      `INSERT INTO Events (title, description, event_date, location_id, category_id, organizer_id, price, image) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, description, event_date, location_id, category_id, organizer_id, price, image]
    );
  }


  static async findCategory(category_id) {
    const [[category]] = await pool.query("SELECT id FROM Categories WHERE id = ?", [category_id]);
    return category;
  }
}

module.exports = Event;
