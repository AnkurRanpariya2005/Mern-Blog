import express from 'express'

const router = express.Router();

router.get('/test', (req, res)=>{
    res.json({message: "hello testing...."})
})

export default router;