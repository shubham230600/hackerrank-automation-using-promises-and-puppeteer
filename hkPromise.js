
/************This hackerrank automation project is based on promises***********/

const loginLink = "https://www.hackerrank.com/auth/login";
const puppeteer= require('puppeteer')    //using puppeteer node module 

const codeFile = require('./code') // Importing module for codeFiles under solutions in code.js

//puppeteer module fullly based on promises
let page

// let email="teboka3579@petloca.com"
let email="galad95077@toudrum.com"
let password="lolololo"
console.log("before")

let browserwillOpenPromises=puppeteer.launch({
    headless : false,
    defaultViewport : null,   // passing resolution for full screen
    args: [ '--start-maximized']   // rgs also to set full screen dimension in object
})

// browserwillOpenPromises.then(function(browseeInstance)
// {
// return browseeInstance
// })

browserwillOpenPromises.then(function(browseeInstance)
{
    let newTabPromise=browseeInstance.newPage()  //opens new tab in browseer
return newTabPromise
}).then(function(newTab)
{
    console.log("New Tab Opened")
    page=newTab  //storing newTab globally
    let newTabWillOpen=newTab.goto(loginLink)   // opens new page with given link
    return newTabWillOpen
}).then(function()
{
    let typeEmail=page.type("input[id='input-1']",email,{delay : 100});  
     // toring to input email using .type() function of puppeteer
    // *******type function has three fields selector , value , delay in millisecs**********
    return typeEmail
}).then(function()
{
    let typePass=page.type("input[id='input-2']",password,{delay : 100});   // toring to input password using .type() function of puppeteer
    //delay is used to trick bots in website
    return typePass   // returning is madatory else Promises dont work 
}
).then(function()
{
    let loginPromise=page.click("button[data-analytics='LoginPassword']",{delay : 100})  // .click() used for clicking on the selected selector parameter

    return loginPromise
}).then(function()
{
    let algoWillbeClicked=waitandClick('a[data-cd-topic-slug="algorithms"]',page)  //waiitandClick is user defined function, to wait before findinf Selector
    return algoWillbeClicked
}).then(function()
{
   let getToWarmUpPromise= waitandClick('input[value="warmup"]',page) // wait and click function executed
   return getToWarmUpPromise
}).then(function(){
    let ChallengesArrPromise = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled' , {delay : 100});
    //  $$ querySelectorAll under puppeteer for selecting all selectors and storing them in in Array
    //*********** Also present this in BROWSER DOM ************ 
    return ChallengesArrPromise
}).then(function(questionsArr){
console.log("No of Questions " + questionsArr.length)  // Printinng no of questions
let questionWillbeSolved = questionSolver(page,questionsArr[0],codeFile.answers[0]) 
// Calling questionSolver function to add solution following question array and answer array using promise concept

});



function questionSolver(page , question , answer){
    return new Promise(function(resolve , reject){  // new Promise returned to click on each question
      let questionWillBeClickedPromise =  question.click()  // .click in puppeteer to click on question
      questionWillBeClickedPromise.then(function(){
       let EditorInFocus=waitandClick('.monaco-editor.no-user-select.vs',page);// to go to the Editor Text Section
       return EditorInFocus;
      }).then(function()
      {
          let checkBocPromise=waitandClick("input[type='checkbox']",page); 
          // To input in the custom test case field we need to click on that check-box, because in editor auto complete is present 
        //   which leads to improper code with errors Eg: for())

          return checkBocPromise;
      }).then(function()
      {
          return page.waitForSelector('.input.text-area.custominput.auto-width') // Selecting input area
      }).then(function()
      {
          return page.type('.input.text-area.custominput.auto-width',answer,{delay : 10}); //typing the code from code.js
      }).then(function()
      {
          let ctrlisPressed=page.keyboard.down('Control') //Syntax to press ctrl
          return ctrlisPressed
      }).then(function()
      {
          let AisPressed =page.keyboard.press('A',{delay : 100});  //Syntax to press A (select all text)
          return AisPressed
      }).then(function()
      {
          let XisPressed =page.keyboard.press('X',{delay : 100});   //Syntax to press X (cut all text)
          return XisPressed
      }).then(function()
      {
          let ctrlisunPressed=page.keyboard.up('Control')   //Syntax to unpress ctrl (unpress ctrl)
          return ctrlisunPressed
      }).then(function()
      {
        let EditorInFocus=waitandClick('.monaco-editor.no-user-select.vs',page); // Again heading to editor area
        return EditorInFocus
      }).then(function()
      { 
          let ctrlisPressed=page.keyboard.down('Control')   //Syntax to press ctrl
          return ctrlisPressed
      }).then(function()
      {
          let AisPressed =page.keyboard.press('A',{delay : 100});   //Syntax to press A (select all text)
          return AisPressed
      }).then(function()
      {
          let VisPressed =page.keyboard.press('V',{delay : 100});   //Syntax to press V (selected text in editor replaced with code from code.js )
          return VisPressed
      }).then(function()
      {
          let ctrlisunPressed=page.keyboard.up('Control')   // unpress ctrl
          return ctrlisunPressed
      }).then(function()
      {
          return page.click('.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled', {delay : 50})
          //clicking on submit button
      }).then(function()
      {
          resolve();
      }).then(function()
      {
          reject();
      })

    })
}
 



function waitandClick(selector,cpage)   
{
    return new Promise(function(resolve,reject)   // returning/creating Promise
    {
        let waitForModalPromise = cpage.waitForSelector(selector)
        //waitForSelector is puppeteer function for waiting before html and selecting selector
        waitForModalPromise.then(function()  //now once promise is resolved, then we can use selector and click
        {
            let clickPromise=cpage.click(selector, { delay : 100}); 
            return clickPromise     // clicked and Promise resolved
        }).then(function()
        {
            resolve();  //resolve is executed
        }).catch(function()
        {
            reject();
        })
    });
}
console.log("after")