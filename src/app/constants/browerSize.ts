export class browerSize{
    public static size = {lg: 4, md: 3, sm: 2, sx: 1 };

    public static getSize(): number{
        let browserWidth = window.innerWidth;
        if(browserWidth>=1200){
            return this.size.lg;
        }
        else if(browserWidth>=992){
            return this.size.md;
        }
        else if(browserWidth>=768){
            return this.size.sm;
        }
        else{
            return this.size.sx;
        }
        
    }
}