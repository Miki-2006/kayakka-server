import connectToAzure from "../config/dbConnecting";
const pool = connectToAzure()

class Organizer {
  static async isOrganizer(organizer_id) {
    const [organizer] = await pool.query(
      `SELECT u.id FROM Users u
       JOIN Organizers o ON u.id = o.user_id
       WHERE o.id = ? AND u.role = 'organizer'`,
      [organizer_id]
    );
    return organizer;
  }
}

module.exports = Organizer;
