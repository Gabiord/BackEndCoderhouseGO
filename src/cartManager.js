import fs from "fs";

class cartManager{

    constructor(){
        (this.cart= new Array()),
        (this.DirPath = "src/files"),
        (this.FilePath = this.DirPath + "/cart.json"),
        (this.fs = fs);
    }

    crearDir = async () => {
        await this.fs.promises.mkdir(this.DirPath, { recursive: true });
        if (!this.fs.existsSync(this.FilePath)) {
          await this.fs.promises.writeFile(this.FilePath, "[]");
        }
    };

}