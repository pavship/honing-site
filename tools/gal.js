import { readdirSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// создаем аналог __dirname для ES модулей
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// пути к папкам с миниатюрами и большими изображениями
const smallImagesPath = path.join(__dirname, '../public/images/gallery/small')
const largeImagesPath = path.join(__dirname, '../public/images/gallery/large')

// функция для генерации HTML галереи
function generateGalleryHTML() {
    let html = `
    <div class="gallery">`

    // читаем файлы из директории с миниатюрами (только .webp)
    const images = readdirSync(smallImagesPath).filter(file => file.endsWith('.webp'))

    images.forEach(image => {
        const smallImageSrc = `public/images/gallery/small/${image}`
        const largeImageSrc = `public/images/gallery/large/${image}`

        html += `
        <div class="gallery-item">
            <img src="${smallImageSrc}" data-full="${largeImageSrc}" alt="${image}">
        </div>`
    })

    html += `\n</div>\n`

    // возвращаем сгенерированный HTML
    return html
}

// вызов функции для генерации и вывод HTML в консоль
const galleryHTML = generateGalleryHTML()
console.log(galleryHTML)