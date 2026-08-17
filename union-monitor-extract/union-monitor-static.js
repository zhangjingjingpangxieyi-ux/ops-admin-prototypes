const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
function on(sel,event,handler){const el=$(sel);if(el)el.addEventListener(event,handler);}
const records = [
  {id:'B20260811001',time:'2026-08-11 10:00:03',rule:'联盟满人但活跃玩家少',server:'全部区服',rank:'不限',condition:'联盟人数=100 且 活跃人数≤40',summary:'联盟踢人：6个联盟 / 8名成员',action:'联盟踢人',status:'待确认',result:'已命中',resultTag:'tag-blue',statusTag:'tag-pending',processable:true,groups:[{unionId:'100060006',unionName:'看看吧',unionRank:'12',unionMembers:'100',activeMembers:'35',rows:[{roleId:'614125',createdAt:'2026-07-20 10:12:05',online:'离线',recharge:'0',lastOffline:'18小时',power:'270,028',level:'17',unionPowerRank:'96',actionText:'踢出联盟',check:'通过',included:true},{roleId:'614083',createdAt:'2026-07-21 08:44:19',online:'离线',recharge:'0',lastOffline:'15小时',power:'302,112',level:'18',unionPowerRank:'93',actionText:'踢出联盟',check:'通过',included:true},{roleId:'614066',createdAt:'2026-07-19 16:20:42',online:'离线',recharge:'12.99',lastOffline:'12小时',power:'318,900',level:'19',unionPowerRank:'88',actionText:'暂不处理',check:'未通过：达到单盟踢人上限',included:false}]},{unionId:'100060128',unionName:'晨星',unionRank:'18',unionMembers:'100',activeMembers:'38',rows:[{roleId:'615221',createdAt:'2026-07-23 09:18:44',online:'离线',recharge:'0',lastOffline:'20小时',power:'240,918',level:'16',unionPowerRank:'99',actionText:'踢出联盟',check:'通过',included:true}]}]},
  {id:'B20260811002',time:'2026-08-11 10:00:02',rule:'活跃盟主不管理联盟',server:'全部区服',rank:'不限',condition:'盟主离线时长>8小时 且 管理风险度=高',summary:'变更职位：3个联盟 / 3名成员',action:'变更阶级/职位',status:'待确认',result:'已命中',resultTag:'tag-blue',statusTag:'tag-pending',processable:true,groups:[{unionId:'100060211',unionName:'星海',unionRank:'9',unionMembers:'88',activeMembers:'61',rows:[{roleId:'612901',createdAt:'2026-06-18 12:05:14',online:'离线',recharge:'49.99',lastOffline:'13小时',power:'510,330',level:'24',unionPowerRank:'1',actionText:'降级盟主并任命R4',check:'通过',included:true}]}]},
  {id:'B20260811003',time:'2026-08-11 09:30:16',rule:'没有R4的联盟',server:'全部区服',rank:'不限',condition:'指定阶级/职位人数=0',summary:'变更职位：4个联盟 / 2名成员',action:'变更阶级/职位',status:'待确认',result:'已命中',resultTag:'tag-blue',statusTag:'tag-pending',processable:true,groups:[{unionId:'100060388',unionName:'晚风',unionRank:'34',unionMembers:'76',activeMembers:'44',rows:[{roleId:'616708',createdAt:'2026-07-10 19:33:58',online:'在线',recharge:'4.99',lastOffline:'在线',power:'421,772',level:'22',unionPowerRank:'3',actionText:'任命R4',check:'通过',included:true},{roleId:'616821',createdAt:'2026-07-12 11:03:26',online:'在线',recharge:'0',lastOffline:'在线',power:'398,106',level:'21',unionPowerRank:'5',actionText:'任命R4',check:'通过',included:true}]}]},
  {id:'B20260810001',time:'2026-08-10 10:00:04',rule:'R4不活跃的头部联盟',server:'全部区服',rank:'1-20',condition:'R4在线人数≤2',summary:'变更职位：5个联盟 / 5名成员',action:'变更阶级/职位',status:'已确认',result:'已命中',resultTag:'tag-blue',statusTag:'tag-done',processable:false,confirmations:[{auditId:'A20260810001',object:'100060089 / 第一梯队 / 611008',actionText:'任命R4',operator:'张三',confirmedAt:'2026-08-10 10:12:36',auditStatus:'审核中'},{auditId:'A20260810002',object:'100060122 / 风暴联盟 / 611246',actionText:'任命R4',operator:'李四',confirmedAt:'2026-08-10 10:18:09',auditStatus:'已通过'},{auditId:'A20260810003',object:'100060178 / 黎明 / 611873',actionText:'任命R4',operator:'王五',confirmedAt:'2026-08-10 10:24:51',auditStatus:'审核中'}],groups:[{unionId:'100060089',unionName:'第一梯队',unionRank:'6',unionMembers:'100',activeMembers:'73',rows:[{roleId:'611008',createdAt:'2026-05-22 07:40:13',online:'在线',recharge:'199.99',lastOffline:'在线',power:'760,110',level:'29',unionPowerRank:'4',actionText:'任命R4',check:'已生成审核记录',included:false}]}]},
  {id:'B20260809001',time:'2026-08-09 10:00:01',rule:'零散联盟解散',server:'全部区服',rank:'25名后',condition:'活跃人数>0 且 活跃人数≤5',summary:'未命中',action:'联盟解散',status:'无需处理',result:'未命中',resultTag:'tag-muted',statusTag:'tag-muted',processable:false,alliances:[]},
  {id:'B20260809002',time:'2026-08-09 09:00:01',rule:'没有R4的联盟',server:'全部区服',rank:'不限',condition:'指定阶级/职位人数=0',summary:'运行失败',action:'变更阶级/职位',status:'无需处理',result:'运行失败',resultTag:'tag-red',statusTag:'tag-muted',processable:false,groups:[]}
];
const configs = [
  {enabled:true,name:'联盟满人但活跃玩家少',server:'全部区服',rank:'不限',condition:'联盟人数=100 且 活跃人数≤40',action:'联盟踢人',filter:'离线时长≥10小时',sort:'战力从低到高',protect:'单盟踢人上限10人<br>剩余联盟人数下限85人',frequency:'每小时',creator:'系统管理员<br>2026-08-01 14:30:22',updater:'系统管理员<br>2026-08-11 09:15:06'},
  {enabled:true,name:'活跃盟主不管理联盟',server:'全部区服',rank:'不限',condition:'盟主离线时长>8小时 且 管理风险度=高',action:'变更阶级/职位',filter:'盟主等级≤20',sort:'战力从高到低',protect:'剩余联盟人数下限85人',frequency:'每小时',creator:'系统管理员<br>2026-08-01 14:30:22',updater:'系统管理员<br>2026-08-11 09:15:06'},
  {enabled:true,name:'没有R4的联盟',server:'全部区服',rank:'不限',condition:'指定阶级/职位人数=0',action:'变更阶级/职位',filter:'在线状态=在线',sort:'战力从高到低',protect:'剩余联盟人数下限85人',frequency:'每天 10:00',creator:'系统管理员<br>2026-08-01 14:30:22',updater:'系统管理员<br>2026-08-11 09:15:06'},
  {enabled:false,name:'R4不活跃的头部联盟',server:'全部区服',rank:'1-20',condition:'R4在线人数≤2',action:'变更阶级/职位',filter:'排除盟主、R4',sort:'战力从高到低',protect:'剩余联盟人数下限85人',frequency:'每周一 10:00',creator:'系统管理员<br>2026-08-01 14:30:22',updater:'系统管理员<br>2026-08-11 09:15:06'},
  {enabled:true,name:'零散联盟解散',server:'全部区服',rank:'25名后',condition:'活跃人数>0 且 活跃人数≤5',action:'联盟解散',filter:'不适用',sort:'不适用',protect:'不适用',frequency:'每天 10:00',creator:'系统管理员<br>2026-08-01 14:30:22',updater:'系统管理员<br>2026-08-11 09:15:06'}
];
function esc(v){return String(v ?? '').replace(/[&<>"']/g,s=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));}
function open(id){const n=$('#'+id);if(n)n.classList.add('open');}
function close(id){const n=$('#'+id);if(n)n.classList.remove('open');}
function toast(m){const n=$('#toast');n.textContent=m;n.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>n.classList.remove('show'),2200);}
function desc(items){return items.map(([k,v])=>`<dt>${esc(k)}</dt><dd>${v}</dd>`).join('');}
let currentRuleMode = 'create';
let currentRuleIndex = -1;
let pendingRuleConfig = null;
let recordRuleFilter = '';
let serverMode = 'all';
let selectedServers = [];
const serverOptions = [['S101','S101 星火'],['S102','S102 曙光'],['S103','S103 远征'],['S104','S104 风暴'],['S105','S105 黎明']]; 
const monitorBusinessConfigs = {
  union: {
    label: '联盟干预业务',
    conditionFields: [
      { label: '区服', control: 'server' },
      { label: '开服天数', control: 'range', placeholder: ['起始天数', '结束天数'] },
      { label: '联盟排名', control: 'range', placeholder: ['起始名次', '结束名次'] },
      { label: '联盟人数', control: 'number' },
      { label: '活跃人数', control: 'number' },
      { label: 'R4管理员数量', control: 'number' },
      { label: '24小时R4在线人数', control: 'number' },
      { label: '盟主离线时长', control: 'number', unit: '小时' },
      { label: '管理风险度', control: 'select', options: ['风险', '普通'] },
      { label: '盟主等级', control: 'number' },
      { label: '成员离线时长', control: 'number', unit: '小时' },
      { label: '战力', control: 'number' },
      { label: '等级', control: 'number' },
      { label: '充值金额', control: 'number', unit: '美元' },
      { label: '发言数量', control: 'number' }
    ],
    sortFields: ['战力', '离线时长', '等级', '充值金额'],
    actions: {
      '联盟踢人': { auditUnit: '按成员生成审核记录', fields: [
        { type: 'number', key: 'kickLimit', label: '单盟踢人上限', placeholder: '请填写单盟踢人上限', unit: '人', required: true },
        { type: 'number', key: 'remainLimit', label: '剩余联盟人数下限', placeholder: '请填写剩余联盟人数下限', unit: '人', required: true }
      ], note: '巡检命中后，系统按命中成员自动生成审核记录；审核通过后才执行踢人操作。' },
      '联盟解散': { auditUnit: '按联盟生成审核记录', fields: [], note: '巡检命中后，系统按命中联盟自动生成审核记录；审核通过后才执行解散操作。' },
      '变更阶级/职位': { auditUnit: '按成员生成审核记录', fields: [
        { type: 'select', key: 'targetRank', label: '目标阶级', options: ['R1', 'R2', 'R3', 'R4', 'R5'], default: 'R4', required: true },
        { type: 'select', key: 'targetPosition', label: '目标职位', options: ['盟主', '战神', '外交官', '女神', '军师', '无官职'], default: '无官职', required: true },
        { type: 'select', key: 'recommendTarget', label: '推荐对象', options: ['联盟内成员', '命中对象', '按处理顺序推荐', '手动指定'] },
        { type: 'number', key: 'appointmentCount', label: '上任人数', placeholder: '请输入上任人数', unit: '人' }
      ], note: '目标阶级为 R4 时可选择官职；目标阶级为 R5 时职位固定为盟主；其他阶级默认无官职。' },
      '联盟变更': { auditUnit: '按成员生成审核记录', fields: [
        { type: 'select', key: 'targetUnionMode', label: '目标联盟选择方式', options: ['按规则匹配', '手动指定联盟'] },
        { type: 'range', key: 'targetUnionRank', label: '目标联盟排名', placeholder: ['起始名次', '结束名次'] },
        { type: 'number', key: 'targetRemainLimit', label: '目标剩余人数下限', placeholder: '请输入目标剩余人数下限', unit: '人', required: true },
        { type: 'number', key: 'targetMoveLimit', label: '单目标联盟迁入上限', placeholder: '请输入单目标联盟迁入上限', unit: '人', required: true },
        { type: 'select', key: 'assignStrategy', label: '分配策略', options: ['优先排名靠前', '优先剩余坑位多', '按战力匹配', '人工指定'] }
      ], note: '适用于将高付费但处于低阶联盟的玩家迁移至头部联盟，审核通过后再执行变更。' }
    }
  },
  vip: {
    label: 'VIP业务',
    conditionFields: [
      { label: '区服', control: 'server' },
      { label: 'VIP等级', control: 'number' },
      { label: '累计充值金额', control: 'number', unit: '美元' },
      { label: '最近登录时间', control: 'date' },
      { label: '在线状态', control: 'select', options: ['在线', '离线'] }
    ],
    sortFields: [],
    actions: {
      '发放VIP补偿': { auditUnit: '按角色生成审核记录', fields: [
        { type: 'text', key: 'rewardTemplate', label: '奖励模板', placeholder: '请输入奖励模板ID' },
        { type: 'text', key: 'mailTitle', label: '邮件标题', placeholder: '请输入邮件标题' },
        { type: 'number', key: 'grantLimit', label: '发放上限', placeholder: '请输入发放上限', unit: '人' }
      ], note: '系统会在执行前校验补偿模板、发放上限和角色资格。' },
      '标记高价值用户': { auditUnit: '按角色生成审核记录', fields: [
        { type: 'select', key: 'tagType', label: '标签类型', options: ['高价值', '潜在流失', '重点维护'] },
        { type: 'number', key: 'validDays', label: '标签有效期', placeholder: '请输入有效天数', unit: '天' }
      ], note: '审核通过后写入用户运营标签，用于后续运营触达。' },
      '生成客服跟进': { auditUnit: '按角色生成审核记录', fields: [
        { type: 'text', key: 'followOwner', label: '跟进人', placeholder: '请输入客服或团队' },
        { type: 'select', key: 'followPriority', label: '跟进优先级', options: ['高', '中', '低'] }
      ], note: '审核通过后生成客服跟进任务，不直接触达玩家。' }
    }
  }
};function nowText(){return '2026-08-13 12:00:00';}
function getConfigInspectionCount(name){return records.filter(r=>r.rule===name).length;}
function getRecordRuleFilter(){return ($('#record-rule-name')?.value.trim()||recordRuleFilter||'').trim();}
function applyRecordRuleFilter(value){recordRuleFilter=(value||'').trim();const input=$('#record-rule-name');if(input)input.value=recordRuleFilter;renderRecords();}
function getFilteredRecordRows(){const q=getRecordRuleFilter().toLowerCase();return records.map((r,i)=>({r,i})).filter(item=>!q||item.r.rule.toLowerCase().includes(q));}
function currentBusinessKey(){return $('#business-type')?.value||'union';}
function currentBusinessConfig(){return monitorBusinessConfigs[currentBusinessKey()]||monitorBusinessConfigs.union;}
function optionHtml(items){return items.map(v=>`<option>${esc(v)}</option>`).join('');}
function getConditionFields(){return currentBusinessConfig().conditionFields||[];}
function conditionFieldOptionHtml(fields){return fields.map((field,i)=>`<option value="${esc(field.label)}" data-control="${esc(field.control||'number')}" data-options="${esc((field.options||[]).join('|'))}" data-unit="${esc(field.unit||'')}" data-start="${esc(field.placeholder?.[0]||'最小值')}" data-end="${esc(field.placeholder?.[1]||'最大值')}" ${i===0?'selected':''}>${esc(field.label)}</option>`).join('');}
function conditionValueControlHtml(field){const control=field?.control||'number';if(control==='server')return '<input class="control tree-value tree-server-value" placeholder="请输入区服ID，多个用中文逗号隔开">';if(control==='select')return `<select class="control tree-value-select">${optionHtml(field.options||[])}</select>`;if(control==='range')return `<div class="tree-range"><input class="control tree-value-start" placeholder="${esc(field.placeholder?.[0]||'最小值')}"><span class="unit-text">至</span><input class="control tree-value-end" placeholder="${esc(field.placeholder?.[1]||'最大值')}"></div>`;if(control==='date')return '<input class="control tree-value" type="date">';return `<input class="control tree-value" placeholder="请输入数值">${field?.unit?`<span class="unit-text">${esc(field.unit)}</span>`:''}`;}
function treeOpHtml(field){const ops=(field?.control==='server')?['属于','不属于']:['=','介于','≥','≤','>'];return optionHtml(ops);}
function treeHtml(id,fields,hint){const first=fields[0]||{label:'字段',control:'number'};return `<div class="condition-tree hit-condition-tree" id="${id}" data-tree="hit"><div class="tree-group"><button class="logic-pill" type="button">且</button><div class="tree-lines"><div class="tree-item"><select class="control tree-field">${conditionFieldOptionHtml(fields)}</select><select class="control tree-op">${treeOpHtml(first)}</select><div class="tree-value-wrap">${conditionValueControlHtml(first)}</div><button class="tree-action tree-remove" type="button">−</button></div><div class="tree-add-line"><button class="tree-action tree-add" type="button">+</button>${hint?`<span class="hint">${esc(hint)}</span>`:''}</div></div></div></div>`;}
function sortListHtml(fields){return `<div class="sort-list" id="sort-list"><div class="sort-row"><span class="sort-index active">1</span><select class="control sort-field">${optionHtml(fields)}</select><select class="control sort-order"><option>从低到高</option><option>从高到低</option></select><button class="tree-action sort-remove" type="button">−</button></div><button class="btn sort-add" type="button">+ 添加处理顺序</button><div class="hint sort-hint">当命中对象超过处理上限时，系统按该顺序选择优先处理对象。</div></div>`;}
function processFieldHtml(field){const required=field.required?' required':'';const id=field.key?' id="'+esc(field.key)+'"':'';if(field.type==='select')return `<div class="rule-row process-config-row" data-process-key="${esc(field.key)}"><label class="rule-label${required}">${esc(field.label)}</label><select class="control control-600 process-config-value"${id}>${(field.options||[]).map(v=>`<option ${field.default===v?'selected':''}>${esc(v)}</option>`).join('')}</select></div>`;if(field.type==='range')return `<div class="rule-row process-config-row process-range-row" data-process-key="${esc(field.key)}"><label class="rule-label${required}">${esc(field.label)}</label><div class="inline-controls"><input class="control small-number process-config-start" placeholder="${esc(field.placeholder?.[0]||'起始值')}"><span class="unit-text">至</span><input class="control small-number process-config-end" placeholder="${esc(field.placeholder?.[1]||'结束值')}"></div></div>`;if(field.type==='number')return `<div class="rule-row process-config-row" data-process-key="${esc(field.key)}"><label class="rule-label${required}">${esc(field.label)}</label><div class="inline-controls"><input class="control small-number process-config-value"${id} placeholder="${esc(field.placeholder||'请输入数值')}">${field.unit?`<span class="unit-text">${esc(field.unit)}</span>`:''}</div></div>`;return `<div class="rule-row process-config-row" data-process-key="${esc(field.key)}"><label class="rule-label${required}">${esc(field.label)}</label><input class="control control-600 process-config-value"${id} placeholder="${esc(field.placeholder||'请输入')}"></div>`;}
function renderRuleDynamicForm(){
  const cfg=currentBusinessConfig();
  const hit=$('#hit-condition-fields');
  if(hit)hit.innerHTML=`<div class="rule-row tree-rule-row"><label class="rule-label required">命中条件</label>${treeHtml('hit-tree',cfg.conditionFields||[],'可按需要添加条件组内字段')}</div>`;
  const priority=$('#priority-order-section');
  const priorityFields=$('#priority-order-fields');
  const sortFields=cfg.sortFields||[];
  if(priority&&priorityFields){
    priority.hidden=!sortFields.length;
    priorityFields.innerHTML=sortFields.length?`<div class="rule-row sort-rule-row"><label class="rule-label">处理顺序</label>${sortListHtml(sortFields)}</div>`:'';
  }
  renderActionOptions();
  serverMode='all';selectedServers=[];
  syncConditionTreeValueControls();updateActionFields();
}function renderActionOptions(preferred){
  const select=$('#action-type');if(!select)return;
  const actions=Object.keys(currentBusinessConfig().actions);
  select.innerHTML=optionHtml(actions);
  if(preferred&&actions.includes(preferred))select.value=preferred;
  renderProcessConfig();
}
function renderProcessConfig(){
  const cfg=currentBusinessConfig();const action=$('#action-type')?.value||Object.keys(cfg.actions)[0];const actionCfg=cfg.actions[action]||cfg.actions[Object.keys(cfg.actions)[0]];const wrap=$('#process-config-fields');if(!wrap||!actionCfg)return;
  wrap.innerHTML=`<div class="rule-subsection process-config-panel"><div class="rule-subsection-title">处理配置</div>${actionCfg.fields.map(processFieldHtml).join('')||'<div class="rule-row"><label class="rule-label">配置项</label><span class="form-text">当前操作类型无需额外配置</span></div>'}<div class="rule-row"><label class="rule-label">审核粒度</label><span class="form-text">${esc(actionCfg.auditUnit)}</span></div><div class="rule-row"><label class="rule-label">执行说明</label><div class="hint readonly-tip">${esc(actionCfg.note)}</div></div></div>`;
  updatePositionFields();
}
function getConditionRowValue(row){const control=$('.tree-field option:checked',row)?.dataset.control||'number';const select=$('.tree-value-select',row);if(select)return select.value;const start=$('.tree-value-start',row)?.value?.trim();const end=$('.tree-value-end',row)?.value?.trim();if(start||end)return (start||'不限')+'-'+(end||'不限');const value=$('.tree-value',row)?.value?.trim()||'';if(control==='server')return value.replace(/,/g,'，')||'全部区服';return value||'未填写';}
function getTreeText(selector){const tree=$(selector);if(!tree)return '不适用';const logic=$(selector+' .logic-pill')?.textContent.trim()||'且';const rows=$$(selector+' .tree-item').map(row=>{const field=$('.tree-field',row)?.value||'';const op=$('.tree-op',row)?.value||'';return field+op+getConditionRowValue(row);});return rows.length?rows.join(' '+logic+' '):'不适用';}
function getConditionSummaryByField(fieldName,fallback){const row=$$('#hit-tree .tree-item').find(item=>$('.tree-field',item)?.value===fieldName);if(!row)return fallback;const value=getConditionRowValue(row);return value==='未填写'?fallback:value;}
function getSortText(){const rows=$$('#sort-list .sort-row');if(!rows.length)return '不适用';return rows.map(row=>{const field=$('.sort-field',row)?.value||'';const order=$('.sort-order',row)?.value||'';return field+order;}).join('；');}
function getProcessRowValue(row){const value=$('.process-config-value',row);if(value)return value.value?.trim()||'未填写';const start=$('.process-config-start',row)?.value?.trim();const end=$('.process-config-end',row)?.value?.trim();if(start||end)return (start||'不限')+'-'+(end||'不限');return '未填写';}
function getProcessConfigText(){const rows=$$('.process-config-row').map(row=>{const label=$('.rule-label',row)?.textContent.replace('*','').trim()||'';const value=getProcessRowValue(row);const unit=row.classList.contains('process-range-row')?'':($('.unit-text',row)?.textContent||'');return label+value+unit;});return rows.join('<br>')||'不适用';}
function getPositionText(action){if(action!=='变更阶级/职位')return '不适用';const rank=$('#targetRank')?.value||'R4';const pos=$('#targetPosition')?.value||'无官职';return rank+' / '+pos;}function collectRuleConfig(){
  const enabled=$('#rule-enabled')?.classList.contains('on')||false;
  const business=currentBusinessConfig();
  const action=$('#action-type')?.value||Object.keys(business.actions)[0];
  const now=nowText();
  const hitCondition=getTreeText('#hit-tree');
  const sortText=getSortText();
  const processText=getProcessConfigText();
  return {
    enabled,
    businessType:business.label,
    name:$('#page-rule-name')?.value.trim()||'',
    server:getConditionSummaryByField('区服','全部区服'),
    serverDays:getConditionSummaryByField('开服天数','不限'),
    rank:getConditionSummaryByField('联盟排名','不限'),
    condition:hitCondition,
    action,
    position:getPositionText(action),
    filter:'不适用',
    sort:sortText,
    protect:processText,
    frequency:$('#monitor-frequency')?.value||'每小时',
    effectiveTime:$('#effective-time')?.value||'保存后立即生效',
    creator:'当前用户<br>'+now,
    updater:'当前用户<br>'+now
  };
}
function renderSaveConfirm(config){$('#save-confirm-desc').innerHTML=desc([
  ['业务类型',esc(config.businessType)],['规则名称',esc(config.name)],
  ['是否启用',config.enabled?'启用':'停用'],['命中条件',esc(config.condition)],
  ['处理顺序',esc(config.sort)],['操作类型',esc(config.action)],
  ['处理配置',config.protect],['监控频率',esc(config.frequency)],
  ['生效时间',esc(config.effectiveTime)],['生成说明','巡检命中后，系统按命中操作对象自动生成审核记录；审核通过后才执行实际操作。']
]);}function applyPendingRuleConfig(){if(!pendingRuleConfig)return;const original=configs[currentRuleIndex];if(currentRuleMode==='edit'&&original){configs[currentRuleIndex]={...original,...pendingRuleConfig,creator:original.creator,updater:pendingRuleConfig.updater};}else{configs.unshift(pendingRuleConfig);}pendingRuleConfig=null;renderConfigs();close('save-confirm-overlay');setMain('configs');toast('监控规则已保存');}
let currentInspectionRule = '';
let currentInspectionRecordIndex = -1;
function getConfigBusinessType(c){return c?.businessType || c?.businessLabel || (c?.action && String(c.action).includes('VIP') ? 'VIP业务' : '联盟干预业务');}
function normalizeBlank(value){const text=String(value ?? '').trim();return !text || text==='不适用' || text==='不限' ? '-' : text;}
function getConfigHitCondition(c){const parts=[];if(c.server&&c.server!=='全部区服')parts.push('区服属于'+c.server);if(c.serverDays&&c.serverDays!=='不限'&&c.serverDays!=='不适用')parts.push('开服天数'+c.serverDays);if(c.rank&&c.rank!=='不限'&&c.rank!=='不适用')parts.push('联盟排名'+c.rank);if(c.condition)parts.push(c.condition);return parts.filter(Boolean).join('；') || '-';}
function getFilteredConfigs(){const name=($('#config-rule-name')?.value||'').trim().toLowerCase();const business=$('#config-business-type')?.value||'全部';const action=$('#config-action-type')?.value||'全部';const enabled=$('#config-enabled')?.value||'全部';const freq=$('#config-frequency')?.value||'全部';return configs.map((c,i)=>({c,i})).filter(({c})=>{const b=getConfigBusinessType(c);if(name&&!String(c.name||'').toLowerCase().includes(name))return false;if(business!=='全部'&&b!==business)return false;if(action!=='全部'&&c.action!==action)return false;if(enabled==='启用'&&!c.enabled)return false;if(enabled==='停用'&&c.enabled)return false;if(freq!=='全部'&&!String(c.frequency||'').startsWith(freq))return false;return true;});}
function syncConfigActionOptions(){const business=$('#config-business-type')?.value||'全部';const select=$('#config-action-type');if(!select)return;const previous=select.value;let actions=[];if(business==='全部'){actions=Object.values(monitorBusinessConfigs).flatMap(cfg=>Object.keys(cfg.actions));}else{const cfg=Object.values(monitorBusinessConfigs).find(item=>item.label===business);actions=cfg?Object.keys(cfg.actions):[];}select.innerHTML='<option>全部</option>'+actions.map(v=>`<option>${esc(v)}</option>`).join('');if(actions.includes(previous))select.value=previous;}
function getRuleRecords(rule){return records.map((r,i)=>({r,i})).filter(({r})=>r.rule===rule);}
function countRecordObjects(r){return (r.groups||[]).reduce((sum,g)=>sum+(g.rows||[]).filter(row=>row.included!==false).length,0)+(r.alliances||[]).length;}
function getAuditGenerationText(r){if(r.result==='未命中')return '无需生成';if(r.result==='运行失败')return '生成失败';const count=(r.confirmations&&r.confirmations.length)||countRecordObjects(r)||1;return '已生成 '+count+' 条';}
function getAuditGenerationTag(r){if(r.result==='运行失败')return 'tag-red';if(r.result==='未命中')return 'tag-muted';return 'tag-green';}
function getInspectionStats(rule){const rows=getRuleRecords(rule).map(x=>x.r);const hit=rows.filter(r=>r.result==='已命中').length;const audit=rows.reduce((sum,r)=>sum+(r.result==='已命中'?((r.confirmations&&r.confirmations.length)||countRecordObjects(r)||1):0),0);return {total:rows.length,hit,audit,today:rows.length?1:0,todayHit:hit?1:0};}
function renderInspectionDrawer(rule){currentInspectionRule=rule;const rows=getRuleRecords(rule);const stats=getInspectionStats(rule);const title=$('#inspection-drawer-title');if(title)title.textContent='巡检记录 - '+rule;const body=$('#inspection-drawer-body');if(!body)return;body.innerHTML=`<div class="inspection-summary"><div><strong>${stats.today}/1次</strong><span>今日巡检</span></div><div><strong>${stats.todayHit}</strong><span>今日命中</span></div><div><strong>${stats.total}</strong><span>近30天巡检</span></div><div><strong>${stats.audit}</strong><span>审核生成</span></div></div><div class="filters drawer-filters"><div class="field"><label>巡检日期</label><input class="control" type="date" value="2026-08-01"><span class="unit-text">至</span><input class="control" type="date" value="2026-08-30"></div><div class="field"><label>命中结果</label><select class="control"><option>全部</option><option>已命中</option><option>未命中</option><option>运行失败</option></select></div><div class="field"><label>审核生成状态</label><select class="control"><option>全部</option><option>已生成</option><option>部分失败</option><option>无需生成</option><option>生成失败</option></select></div><button class="btn btn-primary">查询</button></div><div class="detail-table inspection-table"><table><thead><tr><th>巡检时间</th><th>命中结果</th><th>命中对象汇总</th><th>审核生成结果</th><th>操作</th></tr></thead><tbody>${rows.length?rows.map(({r,i})=>`<tr><td>${esc(r.time)}</td><td><span class="tag ${r.resultTag}">${esc(r.result)}</span></td><td>${esc(r.summary||'-')}</td><td><span class="tag ${getAuditGenerationTag(r)}">${esc(getAuditGenerationText(r))}</span></td><td><button class="btn-link inspection-detail-link" data-index="${i}">查看</button></td></tr>`).join(''):`<tr><td colspan="5" class="empty-cell">暂无巡检记录</td></tr>`}</tbody></table></div>`;open('inspection-drawer-overlay');}
function renderInspectionObjectTable(r){const groups=r.groups||[];if(!groups.length)return '<div class="condition">本次巡检未命中对象</div>';let index=0;return `<div class="detail-table inspection-object-table"><table><thead><tr><th>联盟ID</th><th>联盟名称</th><th>联盟排名</th><th>角色ID</th><th>角色名称</th><th>战力</th><th>等级</th><th>累计充值金额</th><th>离线时长</th><th>命中原因</th><th>拟执行动作</th><th>审核记录ID</th><th>审核状态</th></tr></thead><tbody>${groups.flatMap(g=>(g.rows||[]).map(row=>{index+=1;const audit=(r.confirmations||[])[index-1];const auditId=audit?.auditId || (r.result==='已命中'?'A'+r.id.slice(1)+String(index).padStart(2,'0'):'-');const auditStatus=audit?.auditStatus || (r.result==='已命中'?'待审核':'-');return `<tr><td>${esc(g.unionId)}</td><td>${esc(g.unionName)}</td><td>${esc(g.unionRank)}</td><td>${esc(row.roleId||'-')}</td><td>-</td><td>${esc(row.power||'-')}</td><td>${esc(row.level||'-')}</td><td>${esc(row.recharge||'-')}</td><td>${esc(row.lastOffline||'-')}</td><td>${esc(row.check||r.condition||'-')}</td><td>${esc(row.actionText||r.action||'-')}</td><td>${auditId==='-'?'-':`<button class="btn-link">${esc(auditId)}</button>`}</td><td>${esc(auditStatus)}</td></tr>`;})).join('')}</tbody></table></div>`;}
function renderInspectionDetail(i){const r=records[i];if(!r)return;currentInspectionRecordIndex=i;close('inspection-drawer-overlay');$$('.view').forEach(v=>v.classList.remove('active'));$('#rule-page').classList.remove('active');$('#process-page').classList.remove('active');const page=$('#inspection-detail-page');const body=$('#inspection-detail-body');if(!page||!body)return;body.innerHTML=`<div class="process-overview"><div class="process-overview-title"><strong>${esc(r.rule)}</strong><span class="tag ${r.resultTag}">${esc(r.result)}</span><span class="tag ${getAuditGenerationTag(r)}">${esc(getAuditGenerationText(r))}</span></div><div class="process-overview-meta"><span>监控批次ID：${esc(r.id)}</span><span>巡检时间：${esc(r.time)}</span><span>操作类型：${esc(r.action)}</span></div></div><section class="process-section"><h2>基础信息</h2><dl class="desc process-desc">${desc([['业务类型','联盟干预业务'],['操作类型',esc(r.action)],['规则状态','启用'],['运行耗时','3.2s'],['执行结果',`<span class="tag ${r.resultTag}">${esc(r.result)}</span>`],['失败原因',r.result==='运行失败'?'调度任务异常':'-']])}</dl></section><section class="process-section"><h2>命中条件快照</h2><dl class="desc process-desc">${desc([['命中条件',esc(r.condition)],['处理顺序','按规则配置'],['区服',esc(r.server)],['联盟排名',esc(r.rank)]])}</dl></section><section class="process-section"><h2>命中对象明细</h2>${renderInspectionObjectTable(r)}</section><section class="process-section"><h2>审核生成结果</h2><dl class="desc process-desc">${desc([['审核生成结果',`<span class="tag ${getAuditGenerationTag(r)}">${esc(getAuditGenerationText(r))}</span>`],['生成方式','系统自动生成'],['生成时间',esc(r.time)],['说明','一个干预操作对象生成一条审核记录']])}</dl></section>`;page.classList.add('active');location.hash='inspection-detail';}
function leaveInspectionDetail(){const page=$('#inspection-detail-page');if(page)page.classList.remove('active');$('#process-page')?.classList.remove('active');$('#rule-page')?.classList.remove('active');$$('.view').forEach(v=>v.classList.toggle('active',v.id==='configs-view'));const recordsView=$('#records-view');if(recordsView)recordsView.hidden=true;if(currentInspectionRule)renderInspectionDrawer(currentInspectionRule);if(location.hash!=='#configs')history.replaceState(null,'','#configs');}

function setMain(tab){
  $('#process-page')?.classList.remove('active');
  $('#rule-page')?.classList.remove('active');
  $('#inspection-detail-page')?.classList.remove('active');
  $$('.view').forEach(v=>v.classList.toggle('active',v.id==='configs-view'));
  const recordsView=$('#records-view');if(recordsView)recordsView.hidden=true;
  if(location.hash.slice(1)!=='configs')location.hash='configs';
}
function renderRecords(){const rows=getFilteredRecordRows();const tbody=$('#records-table tbody');if(tbody){tbody.innerHTML=rows.map(({r,i})=>`<tr data-index="${i}"><td><input type="checkbox" class="row-check" ${r.processable?'':'disabled'}></td><td>${esc(r.id)}</td><td>${esc(r.time)}</td><td><button class="btn-link open-detail" data-index="${i}">${esc(r.rule)}</button></td><td>${esc(r.server)}</td><td>${esc(r.rank)}</td><td>${esc(r.condition)}</td><td>${renderSummaryLink(r,i)}</td><td><span class="tag ${r.action==='联盟解散'?'tag-red':'tag-blue'}">${esc(r.action)}</span></td><td><span class="tag ${r.statusTag}">${esc(r.status)}</span></td><td class="ops"><button class="btn-link open-detail" data-index="${i}">查看</button>${r.processable?`<button class="btn-link confirm-one" data-index="${i}">确认处理</button><button class="btn-link danger ignore-one" data-index="${i}">忽略</button>`:''}</td></tr>`).join('');}const pagination=$('#records-view .pagination');if(pagination)pagination.innerHTML=`<span>共 ${rows.length} 条</span><button class="page-btn active">1</button><span>10 条/页</span>`;}
function renderSummaryLink(r,i){const text=esc(r.summary);if(r.result==='已命中'&&r.processable)return `<button class="btn-link summary-link confirm-one" data-index="${i}">${text}</button>`;if(r.result==='已命中')return `<button class="btn-link summary-link open-detail" data-index="${i}">${text}</button>`;return text;}
function renderConfigs(){const tbody=$('#configs-table tbody');if(!tbody)return;const rows=getFilteredConfigs();tbody.innerHTML=rows.length?rows.map(({c,i})=>`<tr data-index="${i}"><td><button class="switch ${c.enabled?'on':''}" data-switch></button> ${c.enabled?'启用':'停用'}</td><td><button class="btn-link config-detail" data-index="${i}">${esc(c.name)}</button></td><td>${esc(getConfigBusinessType(c))}</td><td><span class="tag ${c.action==='联盟解散'?'tag-red':'tag-blue'}">${esc(c.action)}</span></td><td>${esc(getConfigHitCondition(c))}</td><td>${esc(normalizeBlank(c.sort))}</td><td>${normalizeBlank(c.protect)==='-'?'-':c.protect}</td><td>${esc(c.frequency)}</td><td><button class="btn-link record-stats" data-rule="${esc(c.name)}" title="点击查看该规则的巡检记录">巡检 ${getConfigInspectionCount(c.name)} 次</button><span class="subtext">命中 ${getInspectionStats(c.name).hit} 次 / 审核 ${getInspectionStats(c.name).audit} 条</span></td><td class="audit-meta">${c.creator}</td><td class="audit-meta">${c.updater}</td><td class="ops"><button class="btn-link config-detail" data-index="${i}">查看</button><button class="btn-link edit-rule" data-index="${i}">编辑</button><button class="btn-link copy-rule" data-index="${i}">复制</button></td></tr>`).join(''):'<tr><td colspan="12" class="empty-cell">暂无监控规则</td></tr>';const pagination=$('#configs-view .pagination');if(pagination)pagination.innerHTML=`<span>共 ${rows.length} 条</span><button class="page-btn active">1</button><span>10 条/页</span>`;}
function memberTable(rows,g,readonly){const extraHead=readonly?'':'<th>当前校验结果</th><th>是否纳入本次处理</th><th>操作</th>';const selectHead=readonly?'':'<th style="width:46px">选择</th>';const extraCells=row=>readonly?'':`<td><span class="tag ${row.included?'tag-green':'tag-muted'}">${esc(row.check)}</span></td><td>${row.included?'是':'否'}</td><td class="ops">${row.included?'<button class="btn-link process-one">处理</button><button class="btn-link danger skip-one-process">忽略</button>':'<span class="hint">不可处理</span>'}</td>`;const selectCell=row=>readonly?'':`<td><input type="checkbox" class="process-member-check" ${row.included?'checked':'disabled'}></td>`;return `<div class="detail-table"><table class="${readonly?'':'process-table'}"><thead><tr>${selectHead}<th>角色ID</th><th>角色创建时间</th><th>在线状态</th><th>累计充值金额（美元）</th><th>最后离线时间</th><th>战力</th><th>等级</th><th>联盟ID</th><th>联盟名称</th><th>联盟排名</th><th>角色战力在联盟内的排名</th><th>拟执行动作</th>${extraHead}</tr></thead><tbody>${rows.map(row=>`<tr class="${!row.included&&!readonly?'is-excluded':''}">${selectCell(row)}<td>${esc(row.roleId)}</td><td>${esc(row.createdAt)}</td><td>${esc(row.online)}</td><td>${esc(row.recharge)}</td><td>${esc(row.lastOffline)}</td><td>${esc(row.power)}</td><td>${esc(row.level)}</td><td>${esc(g.unionId)}</td><td>${esc(g.unionName)}</td><td>${esc(g.unionRank)}</td><td>${esc(row.unionPowerRank)}</td><td>${esc(row.actionText)}</td>${extraCells(row)}</tr>`).join('')}</tbody></table></div>`;}
function renderRecordDetail(i){
  const r = records[i];
  const base = `<h3 class="section-title">基本信息</h3><dl class="desc">${desc([
    ['监控批次ID', esc(r.id)],
    ['命中时间', esc(r.time)],
    ['规则名称', esc(r.rule)],
    ['命中结果', `<span class="tag ${r.resultTag}">${esc(r.result)}</span>`],
    ['处理状态', `<span class="tag ${r.statusTag}">${esc(r.status)}</span>`],
    ['干预类型', esc(r.action)]
  ])}</dl><h3 class="section-title">规则依据</h3><dl class="desc">${desc([
    ['区服范围', esc(r.server)],
    ['联盟排名', esc(r.rank)],
    ['判定条件', esc(r.condition)],
    ['命中对象汇总', esc(r.summary)]
  ])}</dl>`;
  let objectHtml = '';
  if (r.action === '联盟解散') {
    objectHtml = '<h3 class="section-title">命中联盟明细</h3><div class="hint">本批次未命中需要处理的联盟。</div>';
  } else {
    const groups = r.groups || [];
    objectHtml = '<h3 class="section-title">命中对象明细</h3>' + (groups.length ? groups.map(g => `<div class="detail-group-title">联盟：${esc(g.unionId)} / ${esc(g.unionName)}<span class="subtext">联盟排名${esc(g.unionRank)} · 联盟人数${esc(g.unionMembers)} · 活跃人数${esc(g.activeMembers)}</span></div>${memberTable(g.rows,g,true)}`).join('') : '<div class="hint">本批次没有命中对象明细。</div>');
  }
  const resultMap = {
    '待确认': '待确认：尚未生成联盟操作审核记录。',
    '已确认': '已确认：已按实际操作粒度生成联盟操作审核记录，可在联盟操作审核中继续查看。',
    '已忽略': '已忽略：本次命中不再生成联盟操作审核记录。',
    '无需处理': '无需处理：本轮未命中对象或运行失败，不需要确认处理。'
  };
  let resultHtml = `<h3 class="section-title">处理结果</h3><div class="condition">${esc(resultMap[r.status] || r.status)}</div>`;
  if (r.confirmations && r.confirmations.length) {
    resultHtml = `<h3 class="section-title">处理结果</h3><div class="detail-table"><table class="result-table"><thead><tr><th>审核记录ID</th><th>处理对象</th><th>拟执行动作</th><th>确认人</th><th>确认时间</th><th>审核状态</th></tr></thead><tbody>${r.confirmations.map(item => `<tr><td>${esc(item.auditId)}</td><td>${esc(item.object)}</td><td>${esc(item.actionText)}</td><td>${esc(item.operator)}</td><td>${esc(item.confirmedAt)}</td><td>${esc(item.auditStatus)}</td></tr>`).join('')}</tbody></table></div>`;
  }
  $('#record-detail-body').innerHTML = base + objectHtml + resultHtml;
}
function renderConfigDetail(i){const c=configs[i];$('#config-detail-body').innerHTML=`<h3 class="section-title">基础信息</h3><dl class="desc">${desc([['规则名称',esc(c.name)],['是否启用',c.enabled?'启用':'停用'],['业务类型',esc(getConfigBusinessType(c))],['监控频率',esc(c.frequency)]])}</dl><h3 class="section-title">命中对象</h3><dl class="desc">${desc([['命中条件',esc(getConfigHitCondition(c))],['处理顺序',esc(normalizeBlank(c.sort))]])}</dl><h3 class="section-title">处理规则</h3><dl class="desc">${desc([['操作类型',esc(c.action)],['处理配置',normalizeBlank(c.protect)==='-'?'-':c.protect],['审核粒度','按命中的干预操作对象自动生成审核记录'],['生成方式','系统自动生成']])}</dl><h3 class="section-title">操作信息</h3><dl class="desc">${desc([['创建信息',c.creator],['最后操作信息',c.updater]])}</dl>`;}
function openProcess(i){
  const r = records[i];
  if (!r || !r.processable) { toast('当前记录无需确认处理'); return; }
  const tabs=$('#tabs');if(tabs)tabs.style.display='none';
  $$('.view').forEach(v => v.classList.remove('active'));
  $('#rule-page').classList.remove('active');
  $('#process-page').classList.add('active');
  $('#process-rule-title').textContent = r.rule;
  $('#process-status-tag').textContent = r.status;
  $('#process-status-tag').className = 'tag ' + r.statusTag;
  $('#process-overview-meta').innerHTML = '<span>监控批次ID：' + esc(r.id) + '</span><span>命中时间：' + esc(r.time) + '</span><span>命中结果：<em class="tag ' + r.resultTag + '">' + esc(r.result) + '</em></span><span>命中对象：' + esc(r.summary) + '</span>';
  $('#process-context').innerHTML = desc([
    ['命中条件', esc(r.condition)],
    ['区服范围', esc(r.server)],
    ['联盟排名范围', esc(r.rank)],
    ['处理状态', '<span class="tag ' + r.statusTag + '">' + esc(r.status) + '</span>']
  ]);
  $('#process-detail').innerHTML = (r.groups || []).map(g => `<div class="detail-group-title">联盟：${esc(g.unionId)} / ${esc(g.unionName)}<span class="subtext">联盟排名${esc(g.unionRank)} · 联盟人数${esc(g.unionMembers)} · 活跃人数${esc(g.activeMembers)}</span></div>${memberTable(g.rows,g,false)}`).join('');
  bindProcessChecks();
  location.hash = 'process';
}
function bindProcessChecks(){$$('.process-member-check').forEach(x=>x.addEventListener('change',refreshProcessCount));$$('.process-one').forEach(x=>x.addEventListener('click',e=>{const row=e.target.closest('tr');const box=$('.process-member-check',row);if(box)box.checked=false;row.classList.add('is-excluded');e.target.textContent='已处理';e.target.disabled=true;$('.skip-one-process',row)?.setAttribute('disabled','disabled');refreshProcessCount();toast('已生成该对象的审核记录');}));$$('.skip-one-process').forEach(x=>x.addEventListener('click',e=>{const row=e.target.closest('tr');const box=$('.process-member-check',row);if(box)box.checked=false;row.classList.add('is-excluded');e.target.textContent='已忽略';e.target.disabled=true;$('.process-one',row)?.setAttribute('disabled','disabled');refreshProcessCount();toast('已忽略该对象');}));refreshProcessCount();}
function refreshProcessCount(){const checks=$$('.process-member-check:not(:disabled)');const selected=checks.filter(x=>x.checked).length;$('#process-count').textContent=selected;$('#process-select-all').checked=checks.length>0&&selected===checks.length;$('#process-confirm').disabled=selected===0;}
function leaveProcess(){$('#process-page').classList.remove('active');setMain('configs');}
function serverMatches(option,keywords){if(!keywords.length)return true;const hay=(option[0]+' '+option[1]).toLowerCase();return keywords.some(k=>hay.includes(k));}
function getVisibleServerIds(){return $$('.server-check').map(x=>x.value);}
function renderServerOptions(keyword=''){const grid=$('#server-list .server-grid');if(!grid)return;const keywords=keyword.split(',').map(x=>x.trim().toLowerCase()).filter(Boolean);const rows=serverOptions.filter(opt=>serverMatches(opt,keywords));grid.innerHTML=rows.map(([id,name])=>'<label class="server-option"><input type="checkbox" class="server-check" value="'+esc(id)+'" '+(selectedServers.includes(id)?'checked':'')+'><span>'+esc(name)+'</span></label>').join('')||'<div class="hint">'+'\u672a\u627e\u5230\u5339\u914d\u533a\u670d'+'</div>';refreshServerCount();}
function syncSelectedServersFromVisible(){const visible=getVisibleServerIds();selectedServers=selectedServers.filter(id=>!visible.includes(id));$$('.server-check:checked').forEach(x=>{if(!selectedServers.includes(x.value))selectedServers.push(x.value);});refreshServerCount();}
function openServerPicker(){renderServerOptions($('#server-search')?.value||'');const panel=$('#server-picker-panel');if(panel)panel.hidden=false;}
function setServerMode(mode){serverMode=mode;$$('#server-mode .segment').forEach(btn=>btn.classList.toggle('active',btn.dataset.serverMode===mode));const panel=$('#server-picker-panel');if(mode==='all'){selectedServers=[];if(panel)panel.hidden=true;}else{openServerPicker();}refreshServerCount();}
function resetServerPicker(){selectedServers=[];const search=$('#server-search');if(search)search.value='';renderServerOptions('');refreshServerCount();}
function setSelectValue(selector,value){const el=$(selector);if(!el)return;const opt=Array.from(el.options).find(o=>o.textContent===value||o.value===value);if(opt)el.value=opt.value;}
function updateScheduleFields(){const freq=$('#monitor-frequency')?.value||'每小时';const time=$('#execute-time');const tip=$('#schedule-tip');if(!time||!tip)return;if(freq==='每小时'){time.value='整点执行';time.disabled=true;tip.textContent='按小时自动运行，无需单独选择时间';}else if(freq==='每30分钟'){time.value='每半小时执行';time.disabled=true;tip.textContent='每小时的 00 分和 30 分自动运行';}else if(freq==='每天'){time.value='10:00';time.disabled=false;tip.textContent='每天按所填时间执行';}else{time.value='周一 10:00';time.disabled=false;tip.textContent='每周按所填星期和时间执行';}}
function updateRankFields(){const mode=$('#rank-mode');if(!mode)return;const custom=$('#rank-mode .segment.active')?.dataset.rankMode==='custom';const range=$('#rank-range');if(range)range.hidden=!custom;['#rank-start','#rank-end'].forEach(s=>{const el=$(s);if(el){el.disabled=!custom;if(!custom)el.value='';}});}
function updateProtectFields(){}
function updateServerFields(){setServerMode(serverMode);}
function updatePositionFields(){const rank=$('#targetRank')?.value;const pos=$('#targetPosition');if(!rank||!pos)return;const previous=pos.value;const options={R1:['无官职'],R2:['无官职'],R3:['无官职'],R4:['战神','外交官','女神','军师','无官职'],R5:['盟主']}[rank]||['无官职'];const fallback=rank==='R4'?'无官职':options[0];pos.innerHTML=options.map(v=>`<option ${v===(options.includes(previous)?previous:fallback)?'selected':''}>${esc(v)}</option>`).join('');pos.disabled=options.length===1;}
function updateActionFields(){renderProcessConfig();}
function resetTree(selector){const tree=$(selector);if(!tree)return;$$('.tree-item',tree).forEach((row,i)=>{if(i>0)row.remove();});$$('input',tree).forEach(x=>x.value='');$$('select',tree).forEach(x=>x.selectedIndex=0);}
function setTreeRows(selector,rows,logic){const tree=$(selector);if(!tree)return;resetTree(selector);const safeRows=rows.filter(Boolean);while($$('.tree-item',tree).length<Math.max(1,safeRows.length))addTreeNode(tree);$$('.tree-item',tree).forEach((row,i)=>{const data=safeRows[i]||safeRows[0];if(!data)return;setSelectValueIn(row,'.tree-field',data.field);syncConditionValueControl(row);setSelectValueIn(row,'.tree-op',data.op||($('.tree-field option:checked',row)?.dataset.control==='server'?'属于':'='));const select=$('.tree-value-select',row);const start=$('.tree-value-start',row);const end=$('.tree-value-end',row);const value=$('.tree-value',row);if(select)setSelectValueIn(row,'.tree-value-select',data.value||select.options[0]?.textContent||'');if(start)start.value=data.start||'';if(end)end.value=data.end||'';if(value)value.value=data.value&&data.value!=='全部区服'?data.value:'';});const pill=$('.logic-pill',tree);if(pill)pill.textContent=logic||'且';}
function setSelectValueIn(root,selector,value){const el=$(selector,root);if(!el||value==null)return;const opt=Array.from(el.options).find(o=>o.textContent===value||o.value===value);if(opt)el.value=opt.value;}
function parseConditionRows(data){const cfg=currentBusinessConfig();const fieldNames=(cfg.conditionFields||[]).map(x=>x.label).sort((a,b)=>b.length-a.length);const rows=[];const push=(field,op,value)=>{if(!fieldNames.includes(field)||rows.some(r=>r.field===field&&r.value===value))return;const meta=(cfg.conditionFields||[]).find(x=>x.label===field)||{};const row={field,op:op||'=',value};if(meta.control==='range'&&String(value||'').includes('-')){const parts=String(value).split('-');row.op='介于';row.start=parts[0]&&parts[0]!=='不限'?parts[0]:'';row.end=parts[1]&&parts[1]!=='不限'?parts[1]:'';}if(meta.control==='server'){row.op=op&&['属于','不属于'].includes(op)?op:'属于';}rows.push(row);};
  if(data?.server)push('区服','属于',data.server.includes('全部')?'':data.server);
  if(data?.serverDays&&!['不限','不适用'].includes(data.serverDays))push('开服天数','介于',data.serverDays);
  if(data?.rank&&!['不限','不适用'].includes(data.rank))push('联盟排名',data.rank.includes('-')?'介于':'=',data.rank);
  String(data?.condition||'').split(/\\s+(?:且|或)\\s+/).forEach(part=>{const text=part.trim();const field=fieldNames.find(name=>text.startsWith(name));if(!field)return;const rest=text.slice(field.length).trim();const op=['不属于','属于','介于','≥','≤','>','<','='].find(x=>rest.startsWith(x))||'=';push(field,op,rest.slice(op.length).trim());});
  return rows.length?rows:[{field:(cfg.conditionFields||[])[0]?.label||'区服',op:'属于',value:''}];}
function fillSortRows(sortText){const cfg=currentBusinessConfig();const fields=cfg.sortFields||[];if(!fields.length){resetSortList();return;}const rows=String(sortText||'').split('；').map(x=>x.trim()).filter(Boolean).map(text=>{const field=fields.find(f=>text.startsWith(f))||fields[0];const order=text.includes('从高到低')?'从高到低':'从低到高';return {field,order};});const list=$('#sort-list');if(!list)return;resetSortList();while($$('#sort-list .sort-row').length<Math.max(1,rows.length))addSortRow();$$('#sort-list .sort-row').forEach((row,i)=>{const data=rows[i]||rows[0]||{field:fields[0],order:'从低到高'};setSelectValueIn(row,'.sort-field',data.field);setSelectValueIn(row,'.sort-order',data.order);});renumberSortRows();}
function fillProcessConfigFromText(text){const raw=String(text||'');$$('.process-config-row').forEach(row=>{const label=$('.rule-label',row)?.textContent.replace('*','').trim()||'';const input=$('.process-config-value',row);if(!input||!label)return;const hit=raw.match(new RegExp(label+'([^<\\n]+)'));if(hit){input.value=hit[1].replace(/人|天|美元/g,'').trim();}});}
function addTreeNode(tree,after){const base=$('.tree-item',tree);if(!base)return;const row=base.cloneNode(true);$$('input',row).forEach(x=>x.value='');$$('select',row).forEach(x=>x.selectedIndex=0);syncConditionValueControl(row);const target=after?.closest('.tree-item');if(target)target.insertAdjacentElement('afterend',row);else $('.tree-lines',tree).insertBefore(row,$('.tree-add-line',tree));}
function syncConditionValueControl(row){const select=$('.tree-field',row);const wrap=$('.tree-value-wrap',row);if(!select||!wrap)return;const opt=select.options[select.selectedIndex];const field={label:select.value,control:opt?.dataset.control||'number',options:(opt?.dataset.options||'').split('|').filter(Boolean),unit:opt?.dataset.unit||'',placeholder:[opt?.dataset.start||'最小值',opt?.dataset.end||'最大值']};wrap.innerHTML=conditionValueControlHtml(field);const op=$('.tree-op',row);if(op){op.innerHTML=treeOpHtml(field);op.value=field.control==='server'?'属于':field.control==='range'?'介于':'=';}}
function syncConditionTreeValueControls(root=document){$$('.condition-tree .tree-item',root).forEach(syncConditionValueControl);}
function removeTreeNode(btn){const tree=btn.closest('.condition-tree');const rows=$$('.tree-item',tree);if(rows.length<=1){toast('至少保留一条条件');return;}btn.closest('.tree-item').remove();}
function renumberSortRows(){$$('#sort-list .sort-row').forEach((row,i)=>{const n=i+1;const badge=$('.sort-index',row);if(badge){badge.textContent=String(n);badge.classList.toggle('active',i===0);}});}
function resetSortList(){const rows=$$('#sort-list .sort-row');rows.forEach((row,i)=>{if(i>0)row.remove();});$$('#sort-list select').forEach(x=>x.selectedIndex=0);renumberSortRows();}
function addSortRow(){const list=$('#sort-list');const base=$('.sort-row',list);if(!list||!base)return;const row=base.cloneNode(true);$$('select',row).forEach(x=>x.selectedIndex=0);list.insertBefore(row,$('.sort-add',list));renumberSortRows();}
function removeSortRow(btn){const rows=$$('#sort-list .sort-row');if(rows.length<=1){toast('至少保留一条排序策略');return;}btn.closest('.sort-row').remove();renumberSortRows();}
function bindRuleScopeControls(){document.addEventListener('click',e=>{const lp=e.target.closest?.('.logic-pill');if(lp){e.preventDefault();lp.textContent=lp.textContent.trim()==='且'?'或':'且';return;}},true);}
function fillRuleFromConfig(data,mode){
  const businessKey=data?.businessType==='VIP业务'||data?.businessKey==='vip'?'vip':'union';
  setSelectValue('#business-type',businessKey);
  $('#page-rule-name').value=mode==='create'?'':(data?.name||'');
  $('#page-rule-remark').value='';
  $('#rule-enabled').classList.toggle('on',mode!=='create'&&!!data?.enabled);
  $('#rule-enabled-text').textContent=$('#rule-enabled').classList.contains('on')?'开':'关';
  renderRuleDynamicForm();
  renderActionOptions(mode==='create'?undefined:data?.action);
  setSelectValue('#monitor-frequency',mode==='create'?'每小时':(data?.frequency?.startsWith('每30')?'每30分钟':data?.frequency?.startsWith('每天')?'每天':data?.frequency?.startsWith('每周')?'每周':data?.frequency||'每小时'));
  setSelectValue('#targetRank','R4');updatePositionFields();
  setTreeRows('#hit-tree',parseConditionRows(data),String(data?.condition||'').includes(' 或 ')?'或':'且');fillSortRows(data?.sort);updateScheduleFields();updateActionFields();fillProcessConfigFromText(data?.protect);
}function openRule(mode,i){currentRuleMode=mode;currentRuleIndex=Number.isInteger(i)?i:-1;pendingRuleConfig=null;close('inspection-drawer-overlay');$('#inspection-detail-page')?.classList.remove('active');$$('.view').forEach(v=>v.classList.remove('active'));$('#process-page').classList.remove('active');$('#rule-page').classList.add('active');const map={create:'新建监控规则',edit:'编辑监控规则',copy:'复制监控规则'};$('#rule-page-title').textContent=map[mode]||map.create;fillRuleFromConfig(configs[i],mode);location.hash='rule-'+mode;}
bindRuleScopeControls();
$$('.tab').forEach(x=>x.addEventListener('click',()=>setMain(x.dataset.tab)));
$$('.overlay').forEach(x=>x.addEventListener('click',e=>{if(e.target===x)close(x.id);}));
on('#check-all','change',e=>$$('.row-check:not(:disabled)').forEach(x=>x.checked=e.target.checked));
on('#batch-confirm','click',()=>{const checked=$$('.row-check:checked');if(!checked.length){toast('请选择待确认记录');return;}openProcess(Number(checked[0].closest('tr').dataset.index));});
on('#process-select-all','change',e=>{$$('.process-member-check:not(:disabled)').forEach(x=>x.checked=e.target.checked);refreshProcessCount();});
on('#process-cancel','click',leaveProcess);
on('#back-to-records','click',leaveProcess);
on('#back-to-inspection-drawer','click',leaveInspectionDetail);
on('#process-confirm','click',()=>{const count=$$('.process-member-check:checked').length;if(!count){toast('请选择处理对象');return;}leaveProcess();toast('已生成 '+count+' 条联盟操作审核记录');});
on('#ignore-submit','click',()=>{close('ignore-overlay');toast('已忽略本次监控记录');});
on('#query-records','click',()=>renderRecords());
on('#query-configs','click',()=>renderConfigs());
on('#config-business-type','change',()=>{syncConfigActionOptions();renderConfigs();});
on('#config-action-type','change',()=>renderConfigs());
on('#config-enabled','change',()=>renderConfigs());
on('#config-frequency','change',()=>renderConfigs());
on('#create-rule','click',e=>{e.preventDefault();e.stopPropagation();openRule('create');});
on('#back-to-configs','click',()=>setMain('configs'));
on('#page-cancel','click',()=>{const panel=$('#server-picker-panel');if(panel)panel.hidden=true;setMain('configs');});
document.addEventListener('click',e=>{
  const c=e.target.closest('[data-close]');if(c){close(c.dataset.close);return;}
  const d=e.target.closest('.open-detail');if(d){renderRecordDetail(Number(d.dataset.index));open('detail-overlay');return;}
  const p=e.target.closest('.confirm-one');if(p){openProcess(Number(p.dataset.index));return;}
  const ig=e.target.closest('.ignore-one');if(ig){open('ignore-overlay');return;}
  const cd=e.target.closest('.config-detail');if(cd){renderConfigDetail(Number(cd.dataset.index));open('config-detail-overlay');return;}
  const rs=e.target.closest('.record-stats');if(rs){renderInspectionDrawer(rs.dataset.rule||'');return;}
  const inspectionDetail=e.target.closest('.inspection-detail-link');if(inspectionDetail){renderInspectionDetail(Number(inspectionDetail.dataset.index));return;}
  const ed=e.target.closest('.edit-rule');if(ed){openRule('edit',Number(ed.dataset.index));return;}
  const cp=e.target.closest('.copy-rule');if(cp){openRule('copy',Number(cp.dataset.index));return;}
  const addTree=e.target.closest('.tree-add');if(addTree){addTreeNode(addTree.closest('.condition-tree'),addTree);return;}
  const removeTree=e.target.closest('.tree-remove');if(removeTree){removeTreeNode(removeTree);return;}
  if(e.target.closest('.sort-add')){addSortRow();return;}
  const removeSort=e.target.closest('.sort-remove');if(removeSort){removeSortRow(removeSort);return;}
  const sw=e.target.closest('[data-switch],#rule-enabled');if(sw){sw.classList.toggle('on');if(sw.id==='rule-enabled'){$('#rule-enabled-text').textContent=sw.classList.contains('on')?'开':'关';}else{const text=sw.nextSibling||sw.nextElementSibling;if(text)text.textContent=sw.classList.contains('on')?' 启用':' 停用';}return;}
});
document.addEventListener('input',e=>{if(e.target.id==='server-search')renderServerOptions(e.target.value);});
document.addEventListener('change',e=>{
  if(e.target.id==='business-type'){renderRuleDynamicForm();return;}
  if(e.target.id==='monitor-frequency'){updateScheduleFields();return;}
  if(e.target.id==='action-type'){updateActionFields();return;}
  if(e.target.id==='targetRank'){updatePositionFields();return;}
  if(e.target.classList?.contains('server-check')){syncSelectedServersFromVisible();return;}
  if(e.target.id==='server-current-all'||e.target.id==='server-group-check'){$$('.server-check').forEach(x=>x.checked=e.target.checked);syncSelectedServersFromVisible();return;}
  const tf=e.target.closest?.('.condition-tree .tree-field');if(tf)syncConditionValueControl(tf.closest('.tree-item'));
});
on('#save-rule-page','click',()=>{
  if(!$('#page-rule-name').value.trim()){toast('请填写规则名称');return;}
  const missing=$$('.process-config-row').find(row=>$('.rule-label',row)?.classList.contains('required')&&!$('.process-config-value',row)?.value.trim());
  if(missing){toast('请填写'+$('.rule-label',missing).textContent.replace('*','').trim());return;}
  pendingRuleConfig=collectRuleConfig();renderSaveConfirm(pendingRuleConfig);open('save-confirm-overlay');
});
on('#save-confirm-submit','click',applyPendingRuleConfig);
window.addEventListener('hashchange',()=>{const h=location.hash.slice(1);if(h==='configs'||h==='records')setMain('configs');else if(h==='rule-create')openRule('create');});
renderRecords();syncConfigActionOptions();renderConfigs();
if(location.hash.startsWith('#rule-'))openRule('create');else setMain('configs');





