
const axios = require('axios');
const puppeteer = require('puppeteer');
const { JSDOM } = require('jsdom');
const cheerio = require('cheerio');
// const { Builder, By } = require('selenium-webdriver');
const { chromium } = require('playwright');

let htmlContent='';
let links='';

async function fetchData(url) {
    if(url){
        try {
                
                // Khởi tạo trình duyệt
                const browser = await chromium.launch({ headless: false }); // headless: false để thấy trình duyệt hoạt động
                const context = await browser.newContext();
                const page = await context.newPage();

                // Điều hướng đến trang đăng nhập
                await page.goto('https://daugiavna.vn/taisankhac/login'); // Thay 'https://example.com/login' bằng URL trang đăng nhập thực tế

                // Nhập thông tin đăng nhập
                await page.fill('input[type="text"]', 'testvnadaugia@gmail.com'); // Thay 'input[name="username"]' với selector tương ứng
                await page.fill('input[type="password"]', '12345678'); // Thay 'input[name="password"]' với selector tương ứng

                // Gửi biểu mẫu đăng nhập
                await page.click('button[type="submit"]'); // Thay 'button[type="submit"]' với selector tương ứng

                await page.waitForNavigation();

                await page.goto(url, { waitUntil: 'networkidle',timeout: 60000 });


                // Chờ một chút để trang tải
                // await page.waitForNavigation();

                // Lấy HTML của trang sau khi đăng nhập
                // const html = await page.content();
                // console.log(html); // In HTML ra console hoặc làm gì đó với nó
                htmlContent = await page.content()

                // Lấy nội dung HTML của div theo selector
                // Lấy 2 card
                let $ = cheerio.load(htmlContent);
                htmlContent = await $('.box-detail-Aucation').html();
                // Lấy dữ liệu
                $ = cheerio.load(htmlContent);
                // Lấy div thứ 2 bên trong div có class "box-detail-Aucation"
                // const secondDiv = $('.box-detail-Aucation div').eq(1).text(); // eq(1) lấy phần tử thứ 2 (chỉ số bắt đầu từ 0)

                let code = await $('.box-detail-Aucation div').eq(1).text();
                let register_Deposit_Start = await $('.box-detail-Aucation div').eq(3).text();
                let register_Deposit_End = await $('.box-detail-Aucation div').eq(5).text();
                let starting_price = await $('.box-detail-Aucation div').eq(7).text();
                let step = await $('.box-detail-Aucation div').eq(9).text();
                let fee = await $('.box-detail-Aucation div').eq(11).text();
                let maxStep = await $('.box-detail-Aucation div').eq(13).text();
                let method = await $('.box-detail-Aucation div').eq(15).text();
                let owner = await $('.box-detail-Aucation div').eq(17).text();
                let place = await $('.box-detail-Aucation div').eq(19).text();
                let checkProperty = await $('.box-detail-Aucation div').eq(21).text();
                let start_bidding = await $('.box-detail-Aucation div').eq(23).text();
                let end_bidding = await $('.box-detail-Aucation div').eq(25).text();
                let deposit = await $('.box-detail-Aucation div').eq(27).text();
                let round = await $('.box-detail-Aucation div').eq(33).text();

                // console.log(code,register_Deposit_Start,register_Deposit_End,starting_price,step,fee,maxStep,method)
                // console.log(owner,place,checkProperty,start_bidding,end_bidding,deposit,round)
                // Đóng trình duyệt
                await browser.close();

                return {code,register_Deposit_Start,register_Deposit_End,starting_price,step,fee,maxStep,method,owner,place,checkProperty,start_bidding,end_bidding,deposit,round};

        } catch (error) {
            console.error('Có lỗi xảy ra:', error);
        }
    }else{
        return ''
    }
}


let getAuctionAnnouncementService = (data)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            console.log('data: ',data)
            let res= await fetchData(data.url);
            resolve({
                errCode:0,
                message:'getAuctionAnnouncementService succeeds !',
                res,
                data
            })
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    getAuctionAnnouncementService : getAuctionAnnouncementService
}