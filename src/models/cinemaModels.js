import connectToAzure from "../config/dbConnecting.js";
import mssql from 'mssql'

export const getAllCinemas = async () => {
    const pool = await connectToAzure();

    const result = await pool.request().query("SELECT * FROM Cinemas")

    return result.recordset;
}

export const getHallsOfCinemas = async (selectedCinemaId) => {
    let query = `
    SELECT * FROM Halls
    WHERE cinema_id = @selectedCinemaId;`

    const pool = await connectToAzure();
    const request = pool.request();
    request.input("selectedCinemaId", mssql.Int, selectedCinemaId)

    const result = await request.query(query)

    return result.recordset; 
}