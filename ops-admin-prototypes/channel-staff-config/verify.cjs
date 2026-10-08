const {chromium}=require('C:/Users/zhangjing/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const {pathToFileURL}=require('url');
const path=require('path');
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
 try {
 const context=await browser.newContext({viewport:{width:1440,height:960}});
 const p=await context.newPage(),errors=[];
 p.on('pageerror',e=>errors.push(e.message));
 const check=(v,m)=>{if(!v)throw Error(m)};
 const count=()=>p.locator('#selectedCount').innerText();
 const person=id=>p.locator('[data-person="'+id+'"]').click();
 const button=name=>p.getByRole('button',{name,exact:true}).click();
 await p.goto(pathToFileURL(path.join(__dirname,'index.html')).href);
 check(await p.locator('#empty').isVisible(),'initial empty state');
 await person('lin.xia');check(await count()==='3','default bindings');
 await p.locator('#channelSearch').fill('200');await p.locator('#selectAll').check();
 check(await count()==='8','filtered select all preserves hidden selections');
 await person('chen.chen');check(await p.locator('#confirmDialog').isVisible(),'unsaved dialog');
 await button('继续编辑');check(await p.locator('#staffName').innerText()==='林夏','continue editing');
 await person('chen.chen');await button('保存并切换');
 check(await p.locator('#staffName').innerText()==='陈晨','save and switch');
 check(await count()==='4','other staff unchanged');
 await person('lin.xia');check(await count()==='8','saved bindings');
 await p.locator('#clearAll').click();await button('保存');
 check(await p.locator('#dialogTitle').innerText()==='确认解除全部渠道？','revoke confirmation');
 await button('继续编辑');await button('取消修改');check(await count()==='8','cancel restores');
 await p.locator('#channelSearch').fill('zzzz');check(await p.locator('#noChannels').isVisible(),'no search results');
 await p.locator('#channelSearch').fill('');await p.locator('#onlySelected').check();
 check(await p.locator('.channel-item').count()===8,'selected-only filter');
 await p.reload();await person('lin.xia');check(await count()==='8','refresh persistence');
 await p.locator('#clearAll').click();await button('保存');await button('确认解除并保存');check(await count()==='0','revoke saved');
 await p.locator('#personSearch').fill('tang.ke');check(await p.locator('.person').count()===1,'domain account search');
 await person('tang.ke');await p.locator('[data-channel="1001"]').check();
 await p.locator('#personSearch').fill('');await person('lin.xia');await button('放弃修改');
 await person('tang.ke');check(await count()==='0','discard changes');
 await p.evaluate(()=>localStorage.clear());await p.reload();await person('lin.xia');
 await p.screenshot({path:path.join(__dirname,'preview-desktop.png'),fullPage:true});
 for(const [width,height]of [[1440,960],[800,900],[390,844]]){
 await p.setViewportSize({width,height});check(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'horizontal overflow '+width);
 }
 await p.screenshot({path:path.join(__dirname,'preview-mobile.png'),fullPage:true});
 check(errors.length===0,'page errors: '+errors.join(';'));
 console.log('PASS: binding/search/filter/save/switch/cancel/revoke/persistence/discard; 3 viewport widths; no page errors.');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
