import app from './app.js'
import dotenv from 'dotenv'

dotenv.config()

app.listen(8000, () => {
  console.log('http://localhost:3000/')
})


// export default app