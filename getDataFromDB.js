const connectToAzure = require("./dbConnecting");

const getDataFromTable = async() => {
    try{
        const pool = await connectToAzure()

        const result = await pool.request().query('SELECT f_name, l_name FROM users')
        console.log(result.recordset);
        
    }catch(err){
        console.error(err.message);
    }
}
getDataFromTable()