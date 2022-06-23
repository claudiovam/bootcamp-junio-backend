import {spawn} from 'child_process'
import path from 'path'

const convertFilesWebmToMp4 = (sourceVideo: any, outputVideo: any) => new Promise((resolve, reject)=> {
    let options = {
        shell: true
    }

    let args = ['-fflags', '+genpts', '-y', '-i', sourceVideo, '-r', '24', outputVideo]
    
    const child = spawn('ffmpeg', args, options)

    
    child.stdout.on('data', (data: any)=> {
        console.log(`Output: ${data}`)
    })

    child.stderr.on('data', (data: any)=> {
        console.log(`${data}`)
        if(data.includes('Error'))
            reject('Error al procesar el comando')
    })


    child.on('close', (code)=> {
        resolve(code)
    })
})

class VIDEOMANAGER{ 
    async createOutputVideo(sourceVideo: string, outputDir: string) {
        try {
            const videoName = path.basename(sourceVideo, '.webm')
            return `${path.join(outputDir, videoName)}.mp4`
        } catch (error) {
            throw error
        }
    }
    async changeFormatVideo(sourceVideo: any, outputDir: any): Promise<string>{
        try {
            const outputVideo = await this.createOutputVideo(sourceVideo, outputDir)
            await convertFilesWebmToMp4(sourceVideo, outputVideo)

            return outputVideo
        } catch (error) {
            throw error
        }
    }
}

export default new VIDEOMANAGER()