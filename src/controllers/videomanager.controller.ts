import videoController from "./video.controller"
import videoManager from "./videomanagercontroller"
import fs from 'fs'
import path from 'path'
class VIDEOPROCESSCONTROLLER {
    // __dirname
    // fs
    // syncDir
    // implementar la funcion createoutputpath
    // convertfile
    // retornar el path de video
    async convert(originUrlVideo: string, videoId: any) {
        try {
            await videoController.createStatusProcessVideo('download', videoId)

            // const localPathVideo = await this.downloadFile(originUrlVideo)

            await videoController.createStatusProcessVideo('validate', videoId)

            // const isValidFile = await this.validateFile(localPathVideo)

            // if(!isValidFile) throw new Error('Error en el archivo')
            const outputVideoPath = await this.createOutputPath()

            await videoController.createStatusProcessVideo('convert', videoId)

            const outputPath = await this.convertFile(originUrlVideo, outputVideoPath) // originUrlVideo == localPathVideo

            await videoController.createStatusProcessVideo('upload', videoId)

            // const newOriginUrlVideoConvert = await this.uploadFile(outputVideoPath)

            await videoController.createStatusProcessVideo('notified', videoId)

            // this.logExecuteProcess(newOriginUrlVideoConvert)
            // return newOriginUrlVideoConvert
            return {
                outputPath: outputPath
            }
        } catch (error) {
            await videoController.createStatusProcessVideo('error', videoId)
            throw error
        }
    }

    async downloadFile(originUrlVideo: string) {
        return '/path/download/video.webm'
    }
    // ffprobe
    async validateFile(localPathVideo: string) {
        // ffprobeFromSpawn(localPath)
        // return true/false
        return true
    }

    async createOutputPath() {
        try {
            const testPath = path.join(__dirname, '../../test')
            const outputDir = `${testPath}/outputsvideo-convert`
            if (!fs.existsSync(outputDir))
                fs.mkdirSync(outputDir)
            return outputDir
        } catch (error) {
            throw error
        }
    }

    async convertFile(localPathVideo: string, ouputPath: string) {
        try {
            // ffmpegFromSpawn(localPath, ouputPath)
            return await videoManager.changeFormatVideo(localPathVideo, ouputPath)
        } catch (error) {
            throw error
        }
    }

    async uploadFile(ouputPath: string) {
        try {
            // subir el file y retornal el newOriginUrlVideoConvert
            return ''
        } catch (error) {
            throw error
        }
    }

    logExecuteProcess(newOriginUrlVideoConvert: string) {
        console.log("🚀 ~ >>>>>>> newOriginUrlVideoConvert", newOriginUrlVideoConvert)
    }
}

export default new VIDEOPROCESSCONTROLLER()