'use strict';
const ImportXlsx=(()=>{
  const root='http://schemas.openxmlformats.org/';
  const ns=root+'spreadsheetml/2006/main';
  const rels=root+'officeDocument/2006/relationships';
  const mime='application/vnd.openxmlformats-officedocument.spreadsheetml.';
  function node(d,parent,name,attrs={},text){const e=d.createElementNS(parent.namespaceURI,name);Object.entries(attrs).forEach(([k,v])=>e.setAttribute(k,String(v)));if(text!==undefined)e.textContent=text;parent.appendChild(e);return e;}
  function documentXML(name,namespace,build){const d=document.implementation.createDocument(namespace,name);build(d,d.documentElement);return new XMLSerializer().serializeToString(d);}
  const col=n=>{let s='';for(n++;n;n=Math.floor((n-1)/26))s=String.fromCharCode(65+(n-1)%26)+s;return s;};
  const parse=s=>{const d=new DOMParser().parseFromString(s,'application/xml');if(d.querySelector('parsererror'))throw Error('文件结构异常，请重新保存为XLSX。');return d;};
  async function write(matrix){
    const zip=new JSZip();
    zip.file('[Content_Types].xml',documentXML('Types',root+'package/2006/content-types',(d,r)=>{
      node(d,r,'Default',{Extension:'rels',ContentType:'application/vnd.openxmlformats-package.relationships+xml'});
      node(d,r,'Default',{Extension:'xml',ContentType:'application/xml'});
      [['/xl/workbook.xml','sheet.main+xml'],['/xl/worksheets/sheet1.xml','worksheet+xml'],['/xl/styles.xml','styles+xml']].forEach(([p,t])=>node(d,r,'Override',{PartName:p,ContentType:mime+t}));
    }));
    function relationships(items){return documentXML('Relationships',root+'package/2006/relationships',(d,r)=>items.forEach(([id,type,target])=>node(d,r,'Relationship',{Id:id,Type:rels+'/'+type,Target:target})));}
    zip.file('_rels/.rels',relationships([['rId1','officeDocument','xl/workbook.xml']]));
    zip.file('xl/_rels/workbook.xml.rels',relationships([['rId1','worksheet','worksheets/sheet1.xml'],['rId2','styles','styles.xml']]));
    zip.file('xl/styles.xml',documentXML('styleSheet',ns,(d,r)=>{
      const fonts=node(d,r,'fonts',{count:1});const font=node(d,fonts,'font');node(d,font,'sz',{val:11});node(d,font,'name',{val:'Microsoft YaHei'});
      const fills=node(d,r,'fills',{count:2});['none','gray125'].forEach(v=>node(d,node(d,fills,'fill'),'patternFill',{patternType:v}));
      node(d,node(d,r,'borders',{count:1}),'border');
      const attr={numFmtId:49,fontId:0,fillId:0,borderId:0};node(d,node(d,r,'cellStyleXfs',{count:1}),'xf',attr);node(d,node(d,r,'cellXfs',{count:1}),'xf',{...attr,xfId:0,applyNumberFormat:1});
      node(d,node(d,r,'cellStyles',{count:1}),'cellStyle',{name:'Normal',xfId:0,builtinId:0});
    }));
    zip.file('xl/workbook.xml',documentXML('workbook',ns,(d,r)=>{r.setAttribute('xmlns:r',rels);const s=node(d,node(d,r,'sheets'),'sheet',{name:'导入数据',sheetId:1});s.setAttributeNS(rels,'r:id','rId1');}));
    zip.file('xl/worksheets/sheet1.xml',documentXML('worksheet',ns,(d,r)=>{
      node(d,node(d,r,'cols'),'col',{min:1,max:Math.max(...matrix.map(x=>x.length)),width:24,customWidth:1,style:0});
      const data=node(d,r,'sheetData');matrix.forEach((values,i)=>{const row=node(d,data,'row',{r:i+1});values.forEach((v,j)=>{const c=node(d,row,'c',{r:col(j)+(i+1),t:'inlineStr'});node(d,node(d,c,'is'),'t',{},String(v??''));});});
    }));
    return zip.generateAsync({type:'blob',mimeType:mime+'sheet',compression:'DEFLATE'});
  }
  async function read(file){
    if(!/\.xlsx$/i.test(file.name))throw Error('请选择XLSX文件。');
    if(file.size>5*1024*1024)throw Error('本地演示支持最大5MB的文件。');
    const zip=await JSZip.loadAsync(await file.arrayBuffer());
    const files=Object.values(zip.files);if(files.length>200)throw Error('文件结构过于复杂，请使用模板。');
    if(files.reduce((n,f)=>n+(f._data?.uncompressedSize||0),0)>25*1024*1024)throw Error('文件解压后过大，请拆分后上传。');
    const wb=parse(await zip.file('xl/workbook.xml').async('string'));
    const sheets=[...wb.getElementsByTagName('sheet')];if(sheets.length!==1)throw Error('本地演示只支持一个数据工作表，请使用模板。');
    const relDoc=parse(await zip.file('xl/_rels/workbook.xml.rels').async('string'));
    const id=sheets[0].getAttributeNS(rels,'id');const rel=[...relDoc.getElementsByTagName('Relationship')].find(e=>e.getAttribute('Id')===id);
    const target=rel?.getAttribute('Target')||'';const path=target.startsWith('/')?target.slice(1):'xl/'+target;
    const sf=zip.file(path);if(!sf)throw Error('找不到数据工作表。');
    const shared=zip.file('xl/sharedStrings.xml');const strings=shared?[...parse(await shared.async('string')).getElementsByTagName('si')].map(e=>[...e.getElementsByTagName('t')].map(t=>t.textContent).join('')):[];
    const stylesFile=zip.file('xl/styles.xml');let dateStyles=new Set();
    if(stylesFile){const styles=parse(await stylesFile.async('string'));const custom=new Map([...styles.getElementsByTagName('numFmt')].map(e=>[Number(e.getAttribute('numFmtId')),e.getAttribute('formatCode')||'']));const xfs=styles.getElementsByTagName('cellXfs')[0];[...(xfs?.children||[])].forEach((xf,i)=>{const n=Number(xf.getAttribute('numFmtId')),fmt=(custom.get(n)||'').replace(/"[^"]*"/g,'');if((n>=14&&n<=22)||/[yd]/i.test(fmt))dateStyles.add(i);});}
    const date1904=wb.getElementsByTagName('workbookPr')[0]?.getAttribute('date1904')==='1';
    const sheet=parse(await sf.async('string'));if(sheet.getElementsByTagName('mergeCell').length)throw Error('数据表不支持合并单元格，请取消合并。');
    const matrix=[];
    for(const r of sheet.getElementsByTagName('row')){
      const number=Number(r.getAttribute('r'));if(number>1100)throw Error('本地演示最多支持1000条记录，请移除多余空行后重试。');
      const values=[];
      for(const c of r.getElementsByTagName('c')){
        if(c.getElementsByTagName('f').length)throw Error(`第${number}行含公式，请复制并粘贴为值后上传。`);
        const ref=c.getAttribute('r')||'';let index=0;for(const char of ref.replace(/\d/g,''))index=index*26+char.charCodeAt(0)-64;if(index>200)throw Error('字段列过多，请使用模板。');
        const type=c.getAttribute('t'),v=c.getElementsByTagName('v')[0]?.textContent||'';
        let value=type==='s'?strings[Number(v)]||'':type==='inlineStr'?[...c.getElementsByTagName('t')].map(t=>t.textContent).join(''):v;
        if((!type||type==='n')&&v&&dateStyles.has(Number(c.getAttribute('s')))){const serial=Number(v),offset=date1904?Date.UTC(1904,0,1):Date.UTC(1899,11,30);if(Number.isFinite(serial))value=new Date(offset+Math.round(serial*86400000)).toISOString().slice(0,19).replace('T',' ');}
        values[index-1]=value;
      }
      matrix[number-1]=Array.from(values,v=>v??'');
    }
    return Array.from(matrix,r=>r||[]);
  }
  return {write,read};
})();
