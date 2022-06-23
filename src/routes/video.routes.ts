import {Router} from 'restify-router'
import videoController from '../controllers/video.controller'

const VideoRouter = new Router()

// listar videos
// convertir videos webm a mp4
// concatener videos
// concatenar videos en base a un programa de cortar y juntar

VideoRouter.get('/list', async(req, res)=> {
    try {
        return res.json({
            apiPath: 'list'
        })
    } catch (error) {
        return res.json({succes: false ,error: true, errorMesage: error?.stack})
    }
})
VideoRouter.post('/process/convert', async(req, res)=> {
    try {
        console.log('---->>>>>>',req.body)
        res.json({
            apiPath: 'process/convert'
        })
        videoController.convertVideoWebmToMp4(req.body?.originUrlVideo)
    } catch (error) {
        return res.json({succes: false ,error: true, errorMesage: error?.stack})
    }
})
VideoRouter.get('/process/concat', async(req, res)=> {
    try {
        return res.json({
            apiPath: 'process/concat'
        })
    } catch (error) {
        return res.json({succes: false ,error: true, errorMesage: error?.stack})
    }
})
VideoRouter.get('/process/merge', async(req, res)=> {
    try {
        return res.json({
            apiPath: 'process/merge'
        })
    } catch (error) {
        return res.json({succes: false ,error: true, errorMesage: error?.stack})
    }
})

export default VideoRouter