import { where } from "sequelize";
import db from "../models/index";
import { error } from "selenium-webdriver";
import { resolve } from "path";
import { rejects } from "assert";
import { resolve4 } from "dns";

const bcrypt = require('bcrypt');

const axios = require('axios');
const puppeteer = require('puppeteer');
const { JSDOM } = require('jsdom');
const cheerio = require('cheerio');
// const { Builder, By } = require('selenium-webdriver');
const { chromium } = require('playwright');
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');


let htmlContent='';
let links='';

let SD_Matrix = []
let ED_Matrix = []

let BSD_Matrix = []
let BED_Matrix = []
let PN=[]
/*
async function fetchData(url) {
    if(url){
        try {
                
                // Khởi tạo trình duyệt
                const browser = await chromium.launch({ headless: false, args: ['--no-sandbox'] }); // headless: false để thấy trình duyệt hoạt động
                const context = await browser.newContext();
                const page = await context.newPage();

                // Điều hướng đến trang đăng nhập
                // await page.goto('https://daugiavna.vn/taisankhac/login'); // Thay 'https://example.com/login' bằng URL trang đăng nhập thực tế

                // // Nhập thông tin đăng nhập
                // await page.fill('input[type="text"]', 'testvnadaugia@gmail.com'); // Thay 'input[name="username"]' với selector tương ứng
                // await page.fill('input[type="password"]', '12345678'); // Thay 'input[name="password"]' với selector tương ứng

                // // Gửi biểu mẫu đăng nhập
                // await page.click('button[type="submit"]'); // Thay 'button[type="submit"]' với selector tương ứng

                // await page.waitForNavigation();

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
}*/
async function fetchData(url) {
    if(url){
        try {
                
                // Khởi tạo trình duyệt
                const browser = await chromium.launch({ headless: false, args: ['--no-sandbox'] }); // headless: false để thấy trình duyệt hoạt động
                const context = await browser.newContext();
                const page = await context.newPage();

                // Điều hướng đến trang đăng nhập
                await page.goto('https://partner.daugiavna.vn/taisankhac/product'); // Thay 'https://example.com/login' bằng URL trang đăng nhập thực tế

                // // Nhập thông tin đăng nhập
                await page.fill('input[type="text"]', 'dohoangquan.1112002@gmail.com'); // Thay 'input[name="username"]' với selector tương ứng
                await page.fill('input[type="password"]', 'Abc@1234'); // Thay 'input[name="password"]' với selector tương ứng

                // Gửi biểu mẫu đăng nhậps
                await page.click('button[type="button"]'); // Thay 'button[type="submit"]' với selector tương ứng
                await page.waitForNavigation();
                
                await page.click('button[type="button"]'); // Thay chọn phân hệ
                await page.waitForNavigation();

                await page.goto(url, { waitUntil: 'networkidle',timeout: 60000 });

                const place = await page
                .locator("div.col-md-6")
                .filter({ hasText: "Nơi xem tài sản" })
                .locator("input")
                .inputValue();

                const checkProperty = await page
                .locator("div.col-md-12")
                .filter({ hasText: "Thời gian xem tài sản" })
                .locator("input")
                .inputValue();

                
                await page.locator('//button[normalize-space()="Thông tin đấu giá"]').click();
                
                //
                const register_Deposit_Start = await page
                .locator("div.col-md-6")
                .filter({ hasText: "Thời gian mở đăng ký (*)" })
                .locator("input")
                .inputValue();


                const register_Deposit_End = await page
                .locator("div.col-md-6")
                .filter({ hasText: "Thời gian kết thúc đăng ký (*)" })
                .locator("input")
                .inputValue();

                

                const start_bidding = await page
                .locator("div.col-md-6")
                .filter({ hasText: "Thời gian bắt đầu trả giá (*)" })
                .locator("input")
                .inputValue();
                
                
                const bidding_time = await page
                .locator("div.col-md-4")
                .filter({ hasText: "Thời gian đấu giá (*)" })
                .locator("input")
                .inputValue();
                
                const bidding_time_unit = await page
                .locator('div.col-md-2:has-text("Đơn vị") .multiselect-single-label-text')
                .textContent();
                let end_bidding = parseDateTime(start_bidding)
                if(bidding_time_unit.trim()==='Phút'){
                    // end_bidding = end_bidding.toLocaleString("vi-VN")
                    // console.log('Start phút: ', end_bidding.toLocaleString("vi-VN"))ss
                    console.log('Số phút: ', bidding_time)
                    end_bidding.setMinutes(end_bidding.getMinutes()+Number(bidding_time))
                    end_bidding = end_bidding.toLocaleString("vi-VN")
                    
                    // console.log('end_bidding: ',end_bidding.toLocaleString("vi-VN"));
                }else if(bidding_time_unit.trim()==='Giờ'){
                    
                    end_bidding.setHours(end_bidding.getHours()+Number(bidding_time))
                    end_bidding = end_bidding.toLocaleString("vi-VN")
                    //console.log('end_bidding: ',end_bidding.toLocaleString("vi-VN"));
                }
                
                console.log('end_bidding: ',end_bidding)
                console.log('start_bidding: ',start_bidding)
                // console.log('bidding_time: ',bidding_time)
                // console.log('bidding_time_unit: ',bidding_time_unit.trim())

                const fee = await page
                .locator("div.col-md-6")
                .filter({ hasText: "Tiền hồ sơ đấu giá (*)" })
                .locator("input")
                .inputValue();

                const deposit = await page
                .locator("div.col-md-6")
                .filter({ hasText: "Tiền đặt trước (*)" })
                .locator("input")
                .inputValue();

                const starting_price = await page
                .locator("div.col-md-4")
                .filter({ hasText: "Giá khởi điểm (*)" })
                .locator("input")
                .inputValue()

                const step = await page
                .locator("div.col-md-3")
                .filter({ hasText: "Bước giá (*)" })
                .locator("input")
                .inputValue();

                await page.click('button:has-text("Thông tin thêm")');

                const owner = await page
                .locator("div.col-md-4")
                .filter({ hasText: "Đơn vị có tài sản" })
                .locator("input")
                .inputValue();

                
                
                // Đóng trình duyệt
                await browser.close();
                return {place, checkProperty, register_Deposit_Start, register_Deposit_End, start_bidding, end_bidding, fee, deposit, starting_price,
                    step, owner
                };

        } catch (error) {
            console.error('Có lỗi xảy ra:', error);
        }
    }else{
        return ''
    }
}
function parseDateTime(str) {
    const [date, time] = str.split(" ");
    const [day, month, year] = date.split("/").map(Number);
    const [hour, minute, second] = time.split(":").map(Number);
  
    return new Date(year, month - 1, day, hour, minute, second);
}
async function fetchDataBDS(url) {
    if(url){
        try {
                
                // Khởi tạo trình duyệt
                const browser = await chromium.launch({ headless: false, args: ['--no-sandbox'] }); // headless: false để thấy trình duyệt hoạt động
                const context = await browser.newContext();
                const page = await context.newPage();

                // Điều hướng đến trang đăng nhập
                await page.goto('https://partner.daugiavna.vn/taisankhac/product'); // Thay 'https://example.com/login' bằng URL trang đăng nhập thực tế

                // // Nhập thông tin đăng nhập
                await page.fill('input[type="text"]', 'dohoangquan.1112002@gmail.com'); // Thay 'input[name="username"]' với selector tương ứng
                await page.fill('input[type="password"]', 'Abc@1234'); // Thay 'input[name="password"]' với selector tương ứng

                // Gửi biểu mẫu đăng nhậps
                await page.click('button[type="button"]'); // Thay 'button[type="submit"]' với selector tương ứng
                await page.waitForNavigation();

                await page.selectOption("div.mb-3:nth-of-type(2) select.form-select", "real-estate");

                await page.click('button[type="button"]'); // Thay chọn phân hệ
                await page.waitForNavigation();

                await page.goto(url, { waitUntil: 'networkidle',timeout: 60000 });


                const area = await page
                .locator("div.col-md-6")
                .filter({ hasText: "Diện tích (m²) (*)" })
                .locator("input")
                .inputValue();

                const place = await page
                .locator("div.col-md-6")
                .filter({ hasText: "Nơi xem bất động sản" })
                .locator("input")
                .inputValue();

                const checkProperty = await page
                .locator("div.col-md-6")
                .filter({ hasText: "Thời gian xem bất động sản" })
                .locator("input")
                .inputValue();

                const propertyCode = await page
                .locator("div.col-md-6")
                .filter({ hasText: "Ký hiệu lô đất" })
                .locator("input")
                .inputValue();

                
                await page.locator('//button[normalize-space()="Thông tin đấu giá"]').click();
                
                //
                const register_Deposit_Start = await page
                .locator("div.col-md-6")
                .filter({ hasText: "Thời gian mở đăng ký (*)" })
                .locator("input")
                .inputValue();


                const register_Deposit_End = await page
                .locator("div.col-md-6")
                .filter({ hasText: "Thời gian kết thúc đăng ký (*)" })
                .locator("input")
                .inputValue();

                const start_bidding = await page
                .locator("div.col-md-6")
                .filter({ hasText: "Thời gian bắt đầu trả giá (*)" })
                .locator("input")
                .inputValue();

                const bidding_time = await page
                .locator("div.col-md-4")
                .filter({ hasText: "Thời gian đấu giá (*)" })
                .locator("input")
                .inputValue();

                const bidding_time_unit = await page
                .locator('div.col-md-2:has-text("Đơn vị") .multiselect-single-label-text')
                .textContent();
                let end_bidding = parseDateTime(start_bidding)

                if(bidding_time_unit.trim()==='Phút'){
                    console.log('end_bidding: ',end_bidding.toLocaleString("vi-VN"));
                 
                    end_bidding.setMinutes(end_bidding.getMinutes()+Number(bidding_time))

                    console.log('end_bidding_after: ',end_bidding.toLocaleString("vi-VN"));

                    end_bidding = end_bidding.toLocaleString("vi-VN")
                    
                    //console.log('end_bidding: ',end_bidding);
                    //console.log('end_bidding_toLocaleString("vi-VN"): ',end_bidding.toLocaleString("vi-VN"));
                }else if(bidding_time_unit.trim()==='Giờ'){
                    
                    end_bidding.setHours(end_bidding.getHours()+Number(bidding_time))
                    end_bidding = end_bidding.toLocaleString("vi-VN")
                    // console.log('end_bidding: ',end_bidding.toLocaleString("vi-VN"));
                }
                
                // console.log('end_bidding: ',end_bidding)
                // console.log('start_bidding: ',start_bidding)
                // console.log('bidding_time: ',bidding_time)
                // console.log('bidding_time_unit: ',bidding_time_unit.trim())

                
                const fee = await page
                .locator("div.col-md-6")
                .filter({ hasText: "Phí tham gia đấu giá (*)" })
                .locator("input")
                .inputValue();

                const deposit = await page
                .locator("div.col-md-6")
                .filter({ hasText: "Tiền đặt trước (*)" })
                .locator("input")
                .inputValue();

                const starting_price = await page
                .locator("div.col-md-4")
                .filter({ hasText: "Giá khởi điểm/m² (*)" })
                .locator("input")
                .inputValue()

                const step = await page
                .locator("div.col-md-3")
                .filter({ hasText: "Bước giá (*)" })
                .locator("input")
                .inputValue();

                

                await page.click('button:has-text("Thông tin thêm")');

                const owner = await page
                .locator("div.col-md-4")
                .filter({ hasText: "Đơn vị có tài sản" })
                .locator("input")
                .inputValue();

                
                
                // Đóng trình duyệt
                await browser.close();
                return {place, checkProperty, register_Deposit_Start, register_Deposit_End, start_bidding, end_bidding, fee, deposit, starting_price,
                    step, owner
                };

        } catch (error) {
            console.error('Có lỗi xảy ra:', error);
        }
    }else{
        return ''
    }
}

async function fetchDataDgts(data) {
    if(data){
        try {
                
                // Khởi tạo trình duyệt
                const browser = await chromium.launch({ headless: false,
                    args: [
                        '--disable-blink-features=AutomationControlled',
                        '--disable-web-security',
                        '--disable-features=IsolateOrigins,site-per-process'
                      ]
                 }); // headless: false để thấy trình duyệt hoạt động
                // const context = await browser.newContext();
                const context = await browser.newContext({
                    viewport: null,     // dùng kích thước thật của màn hình
                    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36',
                    javaScriptEnabled: true,
                  });
                const page = await context.newPage();

                // Điều hướng đến trang đăng nhập
                await page.goto('https://dgts.moj.gov.vn/login'); // Thay 'https://example.com/login' bằng URL trang đăng nhập thực tế

                // Nhập thông tin đăng nhập
                await page.fill('input[id="username"]', 'vnahanoi_tc_hanoi'); // Thay 'input[name="username"]' với selector tương ứng
                await page.fill('input[id="password"]', 'vna2020'); // Thay 'input[name="password"]' với selector tương ứng

                // Gửi biểu mẫu đăng nhậps
                await page.click('button[id="btnLogin"]'); // Thay 'button[type="submit"]' với selector tương ứng

                await page.waitForNavigation();

                await page.click('a[class="btn btn-success"]')


                //Tạo thông báo

                //Tên địa chỉ chủ tài sản
                await page.fill('input[id="fullName"]', data.owner)
                await page.fill('input[id="address"]', data.owner_Address)

                //Tg địa điểm tổ chức đg
                await page.fill('input[id="aucTime"]', data.bidding_Start_Fulltime)
                await page.fill('input[id="aucAddr"]', data.aucAddress)
                //Tg đăng ký
                await page.fill('input[id="aucRegTimeStart"]', data.aucRegTimeStart)
                await page.fill('input[id="aucRegTimeEnd"]', data.aucRegTimeEnd)
                //Cách thức đăng ký
                await page.fill('textarea[id="aucCondition"]', data.aucCondition)
                //Tg đặt trước
                await page.fill('input[id="aucTimeDepositStart"]', data.aucRegTimeStart)
                await page.fill('input[id="aucTimeDepositEnd"]', data.aucRegTimeEnd)

                //Nhập thêm thông tin
                await page.click('a[id="advanceOrSimpleLink"]')
                //Tg địa điểm xem ts/ bán HS
                await page.fill('textarea[id="propertyViewLocation"]', data.propertyViewLocation)
                await page.fill('textarea[id="fileSellLocation"]', data.fileSellLocation)
                //Hình thức/phương thức đấu giá
                await page.selectOption('select[id="aucType"]', data.aucType.toString());
                await page.selectOption('select[id="aucMethod"]', data.aucMethod.toString())
                
                //Thêm mới tài sản
                await page.click('button[data-target="#addPropertyInfo"]')
                //Tên, địa điểm xem tài sản
                await page.fill('input[id="propertyName"]', data.propertyName)
                await page.fill('input[id="propertyPlace"]', data.propertyPlace)
                //Giá khởi điểm
                await page.fill('input[id="propertyStartPrice"]', data.propertyStartPrice.replaceAll('.',''))
                //Đon vị đặt cọc
                await page.selectOption('select[id="depositUnit"]', data.depositUnit.toString());
                //Tiền đặt trước
                await page.fill('input[id="deposit"]', data.deposit.replaceAll('.',''))
                //Tiền mua hồ sơ
                await page.fill('input[id="fileCost"]', data.fileCost.replaceAll('.',''))

                //Lưu tài sản
                await page.click('button[id="btnSavePropertyInfo"]')





                // await browser.close();

                return ;

        } catch (error) {
            console.error('Có lỗi xảy ra:', error);
        }
    }else{
        return ''
    }
}

async function fetchDataVnaPartnerNew(data) {
    if(data){
        try {
                 
                // console.log('fetchDataVnaPartnersssNew: ',data)
                // Khởi tạo trình duyệt
                const browser = await chromium.launch({ headless: false }); // headless: false để thấy trình duyệt hoạt động
                const context = await browser.newContext();
                const page = await context.newPage();

                // Điều hướng đến trang đăng nhập
                await page.goto('https://partner.daugiavna.vn/login'); // Thay 'https://example.com/login' bằng URL trang đăng nhập thực tế

                // Nhập thông tin đăng nhập
                await page.fill('input[type="text"]', 'dohoangquan.1112002@gmail.com'); // Thay 'input[name="username"]' với selector tương ứng
                await page.fill('input[type="password"]', 'Abc@1234'); // Thay 'input[name="password"]' với selector tương ứng

                // Gửi biểu mẫu đăng nhậps
                await page.click('button[type="button"]'); // Thay 'button[type="submit"]' với selector tương ứng
                await page.waitForNavigation();
                
                await page.click('button[type="button"]'); // Thay chọn phân hệ
                await page.waitForNavigation();

                await page.goto('https://partner.daugiavna.vn/taisankhac/product');



                if(data.status==='create'){
                    // console.log('Tạo tài sản')
                    // Tạo tài sản
                    await page.click('button[class="mt-1 mb-0 btn btn-success btn-sm mt-sm-0 px-4"]')
                    //class = form-control form-control-text Socialss

                    //
                    if(data.isCar){
                        await page.click('input.multiselect-search');
                        await page.type('input.multiselect-search', 'Tài sản Xe ôtô');
                        await page.waitForSelector('.multiselect-option');
                        await page.click('.multiselect-option');
                    }else{
                        await page.click('input.multiselect-search');
                        await page.type('input.multiselect-search', 'Danh mục tài sản của tôi');
                        await page.waitForSelector('.multiselect-option');
                        await page.click('.multiselect-option');
                    }
                    await page.fill('input[class="form-control form-control-text"]', data.shortPropertyName);
                    await page.fill('div.ql-editor', data.propertyName);

                    // await page.click('button[title="Socials"]')

                    const propertyPlace = page.locator('div.col-md-6:has(label:has-text("Nơi xem tài sản")) input');
                    await propertyPlace.fill(data.propertyPlace);

                    const propertyViewTime = page.locator('div.col-md-12:has(label:has-text("Thời gian xem tài sản")) input');
                    await propertyViewTime.fill(data.propertyViewTime);

                    // await page.fill('input[placeholder="Nơi xem tài sản"]', data.propertyPlace);
                    // await page.fill('input[placeholder="Thời gian xem tài sản"]', data.propertyViewTime);

                    await page.click('button[type="submit"]')
                    
                }
                if(data.status==='edit'){
                    //Chỉnh sửa tài sản
                    await page.click('input[id="stsNháp"]')
                    await page.waitForSelector('tr');
                    // const row = await page.locator('tr', { hasText: data.shortPropertyName});
                    const row = page.locator('tr').filter({
                        hasText: data.shortPropertyName,
                    }).filter({
                        hasText: 'Nháp',
                    });
                    // console.log('ROW: ',row)
                    await row.locator('button[class="btn btn-outline-primary btn-icon-only btn-rounded mb-0 me-1 btn-sm"]').click();
                    await page.click('button[type="submit"]')
                }

                
                // await row.locator('button[title="Thông tin đấu giá"]').click();
                // await row.locator('button[class="btn btn-outline-primary btn-icon-only btn-rounded mb-0 me-1 btn-sm"]').click();
                
                 
                const regStart = page.locator('div.col-md-6:has(label:has-text("Thời gian mở đăng ký")) input');
                await regStart.fill(data.aucRegTimeStart+':00');
                await regStart.press('Enter');

                const regEnd = page.locator('div.col-md-6:has(label:has-text("Thời gian kết thúc đăng ký")) input');
                await regEnd.fill(data.aucRegTimeEnd+':00');
                await regEnd.press('Enter');

                // const depositStart = page.locator('div.col-md-6:has(label:has-text("Thời gian bắt đầu nộp tiền cọc")) input');
                // await depositStart.fill(data.aucRegTimeStart+':00');
                // await depositStart.press('Enter');

                // const depositEnd = page.locator('div.col-md-6:has(label:has-text("Thời gian kết thúc nộp tiền cọc")) input');
                // await depositEnd.fill(data.aucRegTimeEnd+':00');
                // await depositEnd.press('Enter');

                const biddingStart = page.locator('div.col-md-6:has(label:has-text("Thời gian bắt đầu trả giá")) input');
                await biddingStart.fill(data.bidding_Start_Fulltime+':00');
                await biddingStart.press('Enter');

                const biddingTime = page.locator('div.col-md-4:has(label:has-text("Thời gian đấu giá")) input');
                if(data.testStt==='test'){
                    // console.log('yep')
                    await biddingTime.fill('5');
                }else{
                    await biddingTime.fill('30');
                }
                const fileCost = page.locator('div.col-md-6:has(label:has-text("Tiền hồ sơ đấu giá")) input');
                await fileCost.fill(data.fileCost.replaceAll('.',''));
                
                const deposit = page.locator('div.col-md-6:has(label:has-text("Tiền đặt trước")) input');
                await deposit.fill(data.deposit.replaceAll('.',''));

                const propertyStartPrice = page.locator('div.col-md-4:has(label:has-text("Giá khởi điểm")) input');
                await propertyStartPrice.fill(data.propertyStartPrice.replaceAll('.',''));

                const step = page.locator('div.col-md-3:has(label:has-text("Bước giá (*)")) input');
                await step.fill(data.step.replaceAll('.',''));

                //Cho phép đấu 1 người
                const onePersonAllowed = page.locator('div.col-md-4:has(label:text("Cho phép đấu giá 1 người"))');
                // Click mở dropdown
                await onePersonAllowed.locator('input.multiselect-search').click();
                // Gõ từ khoá tìm kiếm
                await onePersonAllowed.locator('input.multiselect-search').fill(data.onePersonAllowed);
                // Chờ kết quả đầu tiên xuất hiện (giả sử option là <li class="multiselect-option"> hoặc <div>)
                const onePersonAllowedFirstOption = onePersonAllowed.locator('.multiselect-option').first();
                await onePersonAllowedFirstOption.waitFor({ state: 'visible' });
                // Click chọn dòng đầu tiên
                await onePersonAllowedFirstOption.click();

                //Tài khoản nhận tiền
                if(data.bank!=="Tài khoản chính"){
                    const bank = page.locator('div.col:has(label:text("Tài khoản nhận tiền"))');

                    // Click mở dropdown
                    await bank.locator('input.multiselect-search').click();

                    // Gõ từ khoá tìm kiếm
                    await bank.locator('input.multiselect-search').fill(data.bank.toString());
                    // Chờ kết quả đầu tiên xuất hiện (giả sử option là <li class="multiselect-option"> hoặc <div>)
                    const bankFirstOption = bank.locator('.multiselect-option').first();
                    await bankFirstOption.waitFor({ state: 'visible' });

                    // Click chọn dòng đầu tiên
                    await bankFirstOption.click();
                }
                //Đấu giá viên
                const auctioneer = page.locator('div.col-md-3:has(label:text("Đấu giá viên (*)"))');
                // Click mở dropdown
                await auctioneer.locator('input.multiselect-search').click();
                // Gõ từ khoá tìm kiếm
                await auctioneer.locator('input.multiselect-search').fill(data.auctioneer);
                // Chờ kết quả đầu tiên xuất hiện (giả sử option là <li class="multiselect-option"> hoặc <div>)
                const auctioneerFirstOption = auctioneer.locator('.multiselect-option').first();
                await auctioneerFirstOption.waitFor({ state: 'visible' });
                // Click chọn dòng đầu tiên
                await auctioneerFirstOption.click();


                // //Chủ tài sản
                // const ownerContainer = page.locator('div.col-md-3:has(label:text("Chủ tài sản"))');
                // // Click mở dropdown
                // await ownerContainer.locator('input.multiselect-search').click();
                // // Gõ từ khoá tìm kiếm
                // await ownerContainer.locator('input.multiselect-search').fill(data.owner);
                // // Chờ kết quả đầu tiên xuất hiện (giả sử option là <li class="multiselect-option"> hoặc <div>)
                // const firstOption = ownerContainer.locator('.multiselect-option').first();
                // await firstOption.waitFor({ state: 'visible' });
                // // Click chọn dòng đầu tiên
                // await firstOption.click();
                

                //Thư ký
                const secretary = page.locator('div.col-md-3:has(label:text("Thư ký"))');

                // Click mở dropdown
                await secretary.locator('input.multiselect-search').click();

                // Gõ từ khoá tìm kiếm
                await secretary.locator('input.multiselect-search').fill(data.secretary);


                // Chờ kết quả đầu tiên xuất hiện (giả sử option là <li class="multiselect-option"> hoặc <div>)
                const secretaryFirstOption = secretary.locator('.multiselect-option').first();
                await secretaryFirstOption.waitFor({ state: 'visible' });

                // Click chọn dòng đầu tiên
                await secretaryFirstOption.click();
                
                //Thông tin thêm
                await page.click('button:has-text("Thông tin thêm")');
                const ownerUnit = page.locator('div.col-md-4:has(label:text-is("Đơn vị có tài sản")) input');
                await ownerUnit.fill(data.owner);

                const HDDV = page.locator('div.col-md-12:has(label:has-text("Căn cứ hợp đồng")) input');
                await HDDV.fill(data.HDDGDV);

                const guest = page.locator('div.col-md-6:has(label:has-text("Khách mời chứng kiến (1)")) input');
                await guest.fill('Không có');

                //Số quy chế và quy chế
                const rules_num = page.locator('div.col-md-12:has(label:has-text("Quy chế số")) input');
                await rules_num.fill(data.rules_num);

                await page.fill('.ql-editor', data.rulesContent);

                // await browser.close();

                return ;

        } catch (error) {
            console.error('Có lỗi xảy ra:', error);
        }
    }else{
        return ''
    }
}

async function fetchDataSchedule (data) {
    SD_Matrix = []
    ED_Matrix = []

    BSD_Matrix = []
    BED_Matrix = []
    PN=[]
    // Khởi tạo trình duyệt
    const browser = await chromium.launch({ headless: false }); // headless: false để thấy trình duyệt hoạt động
    const context = await browser.newContext();
    const page = await context.newPage();

    // Điều hướng đến trang đăng nhập
    await page.goto('https://partner.daugiavna.vn/login'); // Thay 'https://example.com/login' bằng URL trang đăng nhập thực tế

    // Nhập thông tin đăng nhập
    await page.fill('input[type="text"]', 'dohoangquan.1112002@gmail.com'); // Thay 'input[name="username"]' với selector tương ứng
    await page.fill('input[type="password"]', 'Abc@1234'); // Thay 'input[name="password"]' với selector tương ứng

    // Gửi biểu mẫu đăng nhậps
    await page.click('button[type="button"]'); // Thay 'button[type="submit"]' với selector tương ứng

    await page.waitForNavigation();

    await page.goto('https://partner.daugiavna.vn/taisankhac/product');
    
    


    //Đếm số lượng cột và tìm cột cụ thể
    await page.waitForSelector('table thead tr th'); // Đợi phần tử xuất hiện
    const headers = page.locator('table thead tr th');
    const headerCount = await headers.count();
    // console.log('headerCount: ',headerCount)

    let timeColumnIndex = -1;
    let codeNameColumnIndex=-1;
    let biddingTimeColumnIndex=-1;
    let propertyNameColumnIndex=-1;
    for (let i = 0; i < headerCount; i++) {
        const text = await headers.nth(i).innerText();
        
        if (text.trim() === 'MÃ TÀI SẢN') {
            codeNameColumnIndex = i;
            // console.log(codeNameColumnIndex)
        }

        if (text.trim() === 'THỜI GIAN ĐĂNG KÝ') {
            timeColumnIndex = i;
            // console.log(timeColumnIndex)
        }

        if (text.trim() === 'THỜI GIAN TRẢ GIÁ') {
            biddingTimeColumnIndex = i;
            // console.log(biddingTimeColumnIndex)
        }
        if (text.trim() === 'TÊN TÀI SẢN / CUỘC ĐẤU GIÁ') {
            propertyNameColumnIndex = i;
            // console.log(biddingTimeColumnIndex)
        }
    }
    if (codeNameColumnIndex === -1) {
        throw new Error('Không tìm thấy cột "MÃ TÀI SẢN');
    }
    if (timeColumnIndex === -1) {
        throw new Error('Không tìm thấy cột "THỜI GIAN ĐĂNG KÝ"');
    }
    if (biddingTimeColumnIndex === -1) {
        throw new Error('Không tìm thấy cột "THỜI GIAN TRẢ GIÁ"');
    }
    if (propertyNameColumnIndex === -1) {
        throw new Error('Không tìm thấy cột "TÊN TÀI SẢN / CUỘC ĐẤU GIÁ"');
    }
    
    
    // Bước 2: Lấy tất cả các dòng trong bảng (bỏ qua dòng tiêu đề) (dùng  waitForSelector để đợi cho hàng xuát hiện)
    await page.waitForSelector('table tbody tr');
    const rows = page.locator('table tbody tr');
    const rowCount = await rows.count();
    // console.log('rowCount',rowCount)

    let SD=[],ST=[],ED=[],ET=[],code=[]
    let BSD=[],BST=[],BED=[],BET=[]
    
    for (let i = 0; i < rowCount; i++) {
        const cell = rows.nth(i).locator('td').nth(timeColumnIndex);
        const timeValue = await cell.innerText();
        const lines = timeValue.split('\n')
        const [startDate,startTime] = lines[0].split(' ')
        const [endDate,endTime] = lines[1].split(' ')
        SD.push(startDate)
        ST.push(startTime)
        ED.push(endDate)
        ET.push(endTime)

        const cellCodeName = rows.nth(i).locator('td').nth(codeNameColumnIndex)
        const codeNameValue = await cellCodeName.innerText();
        const codeName = codeNameValue.split('-')
        code.push(codeName[0].replace('VNAHS',''))
        // console.log('code',code)


        const cellBiddingTime = rows.nth(i).locator('td').nth(biddingTimeColumnIndex)
        const biddingTimeValue = await cellBiddingTime.innerText();
        const linesBiddingTime = biddingTimeValue.split('\n')
        const [biddingStartDate,biddingStartTime] = linesBiddingTime[0].split(' ')
        const [biddingEndDate,biddingEndTime] = linesBiddingTime[1].split(' ')
        // console.log(biddingStartDate,biddingStartTime,biddingEndDate,biddingEndTime)
        BSD.push(biddingStartDate)
        BST.push(biddingStartTime)
        BED.push(biddingEndDate)
        BET.push(biddingEndTime)

        const cellPropertyName = rows.nth(i).locator('td').nth(propertyNameColumnIndex)
        const propertyNameValue = await cellPropertyName.innerText();
        // console.log('propertyNameValue: ',propertyNameValue)
        PN.push(codeName[0].replace('VNAHS',''),propertyNameValue)
        
        // console.log('code',code)
        

    }
    // console.log('PN',PN)
    const uniqueValuesSD = [...new Set(SD)]
    const uniqueValuesED = [...new Set(ED)]
    const uniqueValuesBSD = [...new Set(BSD)]
    const uniqueValuesBED = [...new Set(BED)]


    //Ma trận bắt đầu đăng ký và chốt
    // let SD_Matrix = []
    // let ED_Matrix = []
    
    for(let i = 0;i<uniqueValuesSD.length;i++){
        let temp=[]
        temp.push(uniqueValuesSD[i])
        for(let j = 0;j<SD.length;j++){
            if(uniqueValuesSD[i]===SD[j]){
                temp.push(code[j])
            }
        }
        SD_Matrix.push(temp)
    }
    // console.log('SD_Matrix: ',SD_Matrix)

    for(let i = 0;i<uniqueValuesED.length;i++){
        let temp=[]
        temp.push(uniqueValuesED[i])
        for(let j = 0;j<ED.length;j++){
            if(uniqueValuesED[i]===ED[j]){
                temp.push(code[j])
            }
        }
        ED_Matrix.push(temp)
    }
    // console.log('ED_Matrix: ',ED_Matrix)


    //Ma trận bắt đầu và kết thúc đấu giá
    // let BSD_Matrix = []
    // let BED_Matrix = []
    
    for(let i = 0;i<uniqueValuesBSD.length;i++){
        let temp=[]
        temp.push(uniqueValuesBSD[i])
        for(let j = 0;j<BSD.length;j++){
            if(uniqueValuesBSD[i]===BSD[j]){
                temp.push(code[j]+' - '+BST[j])
            }
        }
        BSD_Matrix.push(temp)
    }
    // console.log('BSD_Matrix: ',BSD_Matrix)

    for(let i = 0;i<uniqueValuesBED.length;i++){
        let temp=[]
        temp.push(uniqueValuesBED[i])
        for(let j = 0;j<BED.length;j++){
            if(uniqueValuesBED[i]===BED[j]){
                temp.push(code[j]+' - '+BET[j])
            }
        }
        BED_Matrix.push(temp)
    }
    // console.log('BED_Matrix: ',BED_Matrix)
    await browser.close();
    return ;

}


let getAuctionAnnouncementService = (data)=>{
    return new Promise(async(resolve, reject)=>{
        try {    
            let res=''
            if(data.type==='compare'){  
                res = await fetchData(data.url);
                // res = await fetchDataBDS(data.url)
            }else if(data.type==='dgts'){
                res = fetchDataDgts(data)
            }else if(data.type==='VnaPartner'){
                res = fetchDataVnaPartnerNew(data)
            }else if(data.type==='schedule'){
                res = await fetchDataSchedule(data)
            }
            resolve({
                errCode:0,
                message:'getAuctionAnnouncementService succeeds !',
                res,
                SD_Matrix,
                ED_Matrix ,
                BSD_Matrix,
                BED_Matrix,
                PN
            })
        } catch (e) {
            reject(e);
        }
    })
}
////////////////////////////Mail/////////////////////////////////////////////////////////////////////////////////////////////////////////////////




// Gửi email
let sendMail = (data)=>{
    // console.log(data)
    return new Promise(async(resolve, reject)=>{
        try{
            // Tạo transporter (Gmail, Outlook, hoặc SMTP tùy chọn)
            const transporter = nodemailer.createTransport({
                service: "gmail", // hoặc dùng 'hotmail', hoặc cấu hình SMTP thủ công
                auth: {
                user: "dohoangquan1112002@gmail.com", // Email gửi
                pass: "ixlt edis iqpy jllb",    // App password (không dùng mật khẩu tài khoản Google thông thường)
                },
            });
            
            // Cấu hình nội dung email
            const mailOptions = {
                from: data.from,
                to: data.to, // Có thể là nhiều email cách nhau bằng dấu phẩy
                subject: data.subject,
                html: data.text.replace(/\n/g, '<br/>'),
                // text: data.text.replace(/\n/g, '<br/>'), Dùng text để có dạng text hoặc html để lấy dạng html
            };
            transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                // console.error("Gửi email thất bại:", error);
                resolve({
                    errCode:1,
                    message:'Gửi email thất bại...',
                })
            } else {
                // console.log("Email đã được gửi:", info.response);
                resolve({
                    errCode:0,
                    message:'Gửi email thành công!',
                })
            }
            });
        }catch(e){
            reject(e)
        }

    })
}
//Đăng ký
let SignUp = (data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            // console.log('check data from service: ',data)
            // const password = 'myPassword123';
            const saltRounds = 10;
            const newUser = await db.User.create({
                email: data.email,
                fullName: data.fullName, 
                password:await hashPassword(data.password),
                address:data.address,
                phoneNumber:data.phoneNumber,
                gender:data.gender,
                roleId:data.roleId
            });
            // console.log('hashPassword:',await hashPassword(data.password))
            resolve({
                errCode:0,
                message:'Create user succeeds !',
                newUser
            })

        } catch (e) {
            reject(e)
        }
    })
}
// Mã hóa
async function hashPassword(password) {
    try {
      const saltRounds = 10;
      const hash = await bcrypt.hash(password, saltRounds);
    //   console.log('Mật khẩu đã mã hóa:', hash);
      return hash  
    //   const isMatch = await bcrypt.compare(password, hash);
    //   console.log('Mật khẩu khớp?', isMatch);
    } catch (error) {
      console.error('Lỗi:', error);
    }
  }
//Đăng nhập
let Login =(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            // let port = process.env.SECRET_KEY;
            // console.log(port)
            const user = await db.User.findOne({
                where:{
                    email:data.email
                }
            })
            if(!user){
                resolve({
                    errCode:1,
                    message: 'Không tìm thấy người dùng...'
                })
            }else{
                const isMatch = await bcrypt.compare(data.password, user.password);
                // console.log('isMatch',isMatch)ss
                if(isMatch){
                    const token = jwt.sign({ id: user.id, username: user.username, roleId: user.roleId }, process.env.SECRET_KEY, {
                        expiresIn: '1h' // token hết hạn sau 1 giờ
                    });
                    resolve({
                        errCode:0,
                        message: 'Đăng nhập thành công !',
                        user,
                        token
                    })
                }else{
                    resolve({
                        errCode:2,
                        message: 'Sai mật khẩu...'
                    })
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}

let createRealEstate = (data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            const url = "https://api.daugiavna.vn/partner/products";
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfY3QiOiJwZXJzb25hbCIsIl9pZCI6IjY3ZDdlY2ViNjdlOWJjYjg5YmEzYmFlMSIsIl9kaWQiOiIxY2IxMWU0OTdmYjg4ZmRmNTBiMzk0YTJiY2Q0NWNjNSIsIl9hciI6InBhcnRuZXIiLCJfcHIiOlsiNjg2OTVmOWU5MjUxMjM2YzIxODk4ZGY1fmNvbW1vbn42ODY5NWY5ZTkyNTEyMzZjMjE4OThkZmJ-Njg2YjMyMDk1Yzc4MzAyMDg1ZTlhYWQzIiwiNjg2OTVmOWU5MjUxMjM2YzIxODk4ZGY1fnJlYWwtZXN0YXRlfjY4Y2I3MjI4YTA2ZTgyOTU1M2M0NjQ1Zn42OGNiODhmODZiYmEzNDA1MWMzYmU5ZTUiXSwiX3JpZCI6IjM2NGNiNGZjMDQ0MjhhNWYiLCJfdCI6MSwiaWF0IjoxNzY3ODYwNzM1LCJleHAiOjE3Njc5NDcxMzV9.IZK_aBzw8Seoo2rUq0Ez4Q_Y612hADbKxs85OyLBj6Y";
            const xTid = "68695f9e9251236c21898df5";
            const xSubsystem = "real-estate";

            const body = {
                name : data.name,
                categoryId: data.categoryId,
                landArea: data.landArea,
                viewingLocation: data.viewingLocation,
                viewingTime: data.viewingTime,
                lotCode: data.lotCode,
                description: data.description

            };
            fetch(url, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`,
                  "X-TID": xTid,
                  "X-Subsystem": xSubsystem
                },
                body: JSON.stringify(body)
              })
                .then(res => res.json())
                .then(data => {
                  console.log("Success:", data);
                    resolve({
                        errCode:0,
                        message: 'Đăng nhập thành công !',
                        data
                    })
                })
                .catch(err => {
                  console.error("Error:", err);
                });

        } catch (e) {
            reject(e)
        }
    })
}
let settingRealEstate = (data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            const url = `https://api.daugiavna.vn/partner/auctions/${data.lastAuctionId}/setting`;
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfY3QiOiJwZXJzb25hbCIsIl9pZCI6IjY3ZDdlY2ViNjdlOWJjYjg5YmEzYmFlMSIsIl9kaWQiOiIxY2IxMWU0OTdmYjg4ZmRmNTBiMzk0YTJiY2Q0NWNjNSIsIl9hciI6InBhcnRuZXIiLCJfcHIiOlsiNjg2OTVmOWU5MjUxMjM2YzIxODk4ZGY1fmNvbW1vbn42ODY5NWY5ZTkyNTEyMzZjMjE4OThkZmJ-Njg2YjMyMDk1Yzc4MzAyMDg1ZTlhYWQzIiwiNjg2OTVmOWU5MjUxMjM2YzIxODk4ZGY1fnJlYWwtZXN0YXRlfjY4Y2I3MjI4YTA2ZTgyOTU1M2M0NjQ1Zn42OGNiODhmODZiYmEzNDA1MWMzYmU5ZTUiXSwiX3JpZCI6IjM2NGNiNGZjMDQ0MjhhNWYiLCJfdCI6MSwiaWF0IjoxNzY3ODYwNzM1LCJleHAiOjE3Njc5NDcxMzV9.IZK_aBzw8Seoo2rUq0Ez4Q_Y612hADbKxs85OyLBj6Y";
            const xTid = "68695f9e9251236c21898df5";
            const xSubsystem = "real-estate";

            const body = {
                allowSingleBidder: data.allowSingleBidder,
                assistantId: data.assistantId,
                auctioneerId: data.auctioneerId,
                bidEndTime: data.bidEndTime,
                bidStartTime: data.bidStartTime,
                depositAmount: data.depositAmount,
                depositEndTime: data.depositEndTime,
                depositStartTime: data.depositStartTime,
                isDepositRequired: data.isDepositRequired,
                isRegFeeRequired: data.isRegFeeRequired,
                maxExtraRounds: data.maxExtraRounds,
                maxStepPerBid: data.maxStepPerBid,
                method: data.method,
                partnerBankAccountId: data.partnerBankAccountId,
                priceStep: data.priceStep,
                realEstatePricingOption: data.realEstatePricingOption,
                regEndTime: data.regEndTime,
                regFeeAmount: data.regFeeAmount,
                regStartTime: data.regStartTime,
                startPrice: data.startPrice
            };

            fetch(url, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`,
                  "X-TID": xTid,
                  "X-Subsystem": xSubsystem
                },
                body: JSON.stringify(body)
              })
                .then(res => res.json())
                .then(data => {
                  console.log("Success:", data);
                    resolve({
                        errCode:0,
                        message: 'Đăng nhập thành công !',
                        data
                    })
                })
                .catch(err => {
                  console.error("Error:", err);
                });
            

        } catch (e) {
            reject(e)
        }
    })
}

let additionalInformationRealEstate = (data)=>{
    return new Promise (async(resolve, reject)=>{
        try {
            const url = "https://api.daugiavna.vn/partner/auctions/695e0e455457d6150b265028/additional-information";
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfY3QiOiJwZXJzb25hbCIsIl9pZCI6IjY3ZDdlY2ViNjdlOWJjYjg5YmEzYmFlMSIsIl9kaWQiOiIxY2IxMWU0OTdmYjg4ZmRmNTBiMzk0YTJiY2Q0NWNjNSIsIl9hciI6InBhcnRuZXIiLCJyZXF1aXJlU2V0dGluZ1Bhc3N3b3JkIjpmYWxzZSwicmVxdWlyZVZlcmlmeUNvbnRhY3QiOmZhbHNlLCJfcHIiOlsiNjg2OTVmOWU5MjUxMjM2YzIxODk4ZGY1fmNvbW1vbn42ODY5NWY5ZTkyNTEyMzZjMjE4OThkZmJ-Njg2YjMyMDk1Yzc4MzAyMDg1ZTlhYWQzIiwiNjg2OTVmOWU5MjUxMjM2YzIxODk4ZGY1fnJlYWwtZXN0YXRlfjY4Y2I3MjI4YTA2ZTgyOTU1M2M0NjQ1Zn42OGNiODhmODZiYmEzNDA1MWMzYmU5ZTUiXSwiX3JpZCI6IjNmYzAwZmQwZjA0Njg2MmYiLCJfdCI6MSwiaWF0IjoxNzY3NjkzNzM3LCJleHAiOjE3Njc3ODAxMzd9.CqLVmpcCtKmnqa2JSlNiGlfaSDMLUMY4JxIMzbsb3Pw";
            const xTid = "68695f9e9251236c21898df5";
            const xSubsystem = "real-estate";

            const body = {
                contractBasis: "Thực hiện Hợp đồng dịch vụ đấu giá tài sản số 548/2025/HĐĐG ký ngày 01/12/2025 giữa Trung tâm phát triển quỹ đất Phú Thọ với Công ty Đấu giá hợp danh VNA",
                orgOwnerAsset: `{"name":"Trung tâm phát triển quỹ đất Phú Thọ","representativeName":"Nguyễn Quốc Tuấn","representativePosition":"Giám đốc"}`,
                observers: `[{"name":"Không có","position":"","businessAddress":""}]`,
                ownerMembers: `[{"name":"Trung tâm phát triển quỹ đất Phú Thọ","userId":"692fbf75104ccdcfde8d2574"}]`,
                regulationNumber: "548",
                regulationContent: "QUY CHẾ CUỘC ĐẤU GIÁ Áp dụng hình thức đấu giá trực tuyến trên Trang thông tin điện tử đấu giá trực tuyến: https://daugiavna.vn"

            };

            fetch(url, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`,
                  "X-TID": xTid,
                  "X-Subsystem": xSubsystem
                },
                body: JSON.stringify(body)
              })
                .then(res => res.json())
                .then(data => {
                  console.log("Success:", data);
                    resolve({
                        errCode:0,
                        message: 'Đăng nhập thành công !',
                        data
                    })
                })
                .catch(err => {
                  console.error("Error:", err);
                });

        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getAuctionAnnouncementService : getAuctionAnnouncementService,
    sendMail : sendMail,
    SignUp : SignUp,
    Login : Login,
    createRealEstate : createRealEstate,
    settingRealEstate : settingRealEstate,
    additionalInformationRealEstate : additionalInformationRealEstate
}