const fs = require('fs')


class FlatFile {
    constructor(filePath) {
        this.filePath = filePath;
    }

    loadContent() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf-8')
            const content = JSON.parse(data);
            return content;
        } catch (err) {
            console.log('There was an error reading file', { err });
            throw new Error('Error reading file');
        }
    }

    writeContent(content) {
        const data = JSON.stringify(content);
        fs.writeFileSync(this.filePath, data);
    }
}
module.exports = FlatFile;