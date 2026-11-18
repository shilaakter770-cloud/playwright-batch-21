class Base{
    constructor(page){
        this.page = page;
        this.pageUrl = 'https://demowebshop.tricentis.com/';

}

async pageOpen ( ) {
  await this. page.goto('https://demowebshop.tricentis.com/',{
     waitUntil: 'domcontentloaded' , timeout: 60000 });
}

async clickElement(data) {
  await data.waitFor({ state: 'visible' });
  await data.click();
}

}




export {Base};