'use strict';
const RESEARCH = {
  "checkedAt": "2026-11-06",
  "conflictGroups": [
    "COSMOS仓储60/90天",
    "日转网仓储30/180天",
    "日转网合箱15/20包",
    "日转网两套邮政报价",
    "起航正文重量上限与价表范围",
    "15号库整档进位示例"
  ],
  "sources": [
    {
      "id": "c-home",
      "code": "C1",
      "title": "COSMOS-LINE · 自购转运与包装协商",
      "url": "https://cosmos-line.net/",
      "status": "verified",
      "evidence": "官网说明注册获日本地址、到仓拍照，可一对一协商合箱、包装、尺寸与重量。",
      "boundary": "未明示每次分箱先确认、少量尾货留库或撤销重组权限。"
    },
    {
      "id": "c-service",
      "code": "C2",
      "title": "COSMOS-LINE · 增值服务 / 仓储",
      "url": "https://cosmos-line.net/service.php",
      "status": "conflict",
      "evidence": "手续费500円/次；前5包合箱免费，第6包起150円/包；新箱200–600円。仓储写60天免费，超期200円/包/天。",
      "boundary": "条款页另写最长90天；两页未核对到明确优先适用日期，不选用更长期限。"
    },
    {
      "id": "c-terms",
      "code": "C3",
      "title": "COSMOS-LINE · 服务条款第3条",
      "url": "https://cosmos-line.net/terms.php",
      "status": "conflict",
      "evidence": "第3条免费保管最长90天，并有90天后可按弃货处理的规定。",
      "boundary": "与收费页60天免费冲突。实际免费天数与弃货节点须书面确认。"
    },
    {
      "id": "c-price",
      "code": "C4",
      "title": "COSMOS-LINE · 国际邮费页",
      "url": "https://cosmos-line.net/price.php",
      "status": "verified",
      "evidence": "本次目视核验官网航空、海运原图，中国目的地1–30kg档。航空3/5kg为3450/4850円，海运2600/3400円。",
      "boundary": "未标生效日期；另加500円/次操作费、超过5包的合箱费，箱材/加固/税费另计。",
      "extraLinks": [
        {
          "title": "官方航空价表",
          "url": "https://cosmos-line.net/img/plane.png"
        },
        {
          "title": "官方海运价表",
          "url": "https://cosmos-line.net/img/ship.png"
        }
      ]
    },
    {
      "id": "r-faq",
      "code": "R1",
      "title": "日转网 · 常见问题 / 分箱留库",
      "url": "https://www.transportjp.com/home/home/newShowXinShou/vid=5",
      "status": "conflict",
      "evidence": "提交时可备注指定商品拆分留库，隔天生成新单号再提交线路；FAQ写入库30天免费。",
      "boundary": "主动指定留库不等于仓库主动分箱前先确认。仓储与首页180天冲突。原稿help.php引用已更正。"
    },
    {
      "id": "r-home",
      "code": "R2",
      "title": "日转网 · 首页仓储说明",
      "url": "https://www.transportjp.com/",
      "status": "conflict",
      "evidence": "首页提供日本地址注册入口，并展示180天免费仓储。",
      "boundary": "与FAQ30天不同；不能推断180天覆盖打包后的仓储。"
    },
    {
      "id": "r-fee",
      "code": "R3",
      "title": "日转网 · 转运费用说明",
      "url": "https://www.transportjp.com/home/home/showTansfarCostPage",
      "status": "conflict",
      "evidence": "合箱最多20包；精准分箱6件内免费，超出8元/件。航空3/5kg列3385/4645円，海运2090/2660円。",
      "boundary": "另一官方线路页合箱15包，运费也不同。上列为该页表列值，不能认定当前适用价。"
    },
    {
      "id": "r-route",
      "code": "R4",
      "title": "日转网 · 邮政直邮线路页",
      "url": "https://www.transportjp.com/home/home/newShowXianLu/vid=2",
      "status": "conflict",
      "evidence": "合箱15包内免费，超出5元/包；航空3/5kg列3450/4850円，海运2600/3400円。",
      "boundary": "与转运费用页20包及另一套价格冲突。须客服确认线路、折扣与适用日期。"
    },
    {
      "id": "r-submit",
      "code": "R5",
      "title": "日转网 · 邮政提交页细则",
      "url": "https://www.transportjp.com/home/user/Account_Postalline/oid/",
      "status": "verified",
      "evidence": "超邮政体积或重量上限可未经通知分拆退库；细则列30元/包裹撤销重入库，增值费不退。",
      "boundary": "旧公告费用单位是运单，须确认具体线路及阶段。本次仅读取条款，未提交运单。"
    },
    {
      "id": "r-cancel",
      "code": "R6",
      "title": "日转网 · 撤销 / 重新入库历史公告",
      "url": "https://www.transportjp.com/home/home/showInformationContantPage/nid/204",
      "status": "verified",
      "publishedAt": "2020-06-03",
      "evidence": "公告对部分已打包但未实际送出运单列30元/运单撤销费，仅退运费、增值费不退；已打包跨境海运除外。",
      "boundary": "历史公告不能作为全部线路当前可撤销的保证；邮政提交页单位另写包裹。"
    },
    {
      "id": "q-line",
      "code": "Q1",
      "title": "起航 · 文具类航空通关",
      "url": "https://www.daikei-tenso.com/2025/xianlushuoming_0707/3265.html",
      "status": "conflict",
      "evidence": "列胸章、吧唧、漫画、周边；2000円/kg整公斤档。体积重÷6000，超过实重1.3倍时改用体积重；可能因清关分箱。",
      "boundary": "正文常规上限20kg、特批25kg，价表列至30kg，范围不一致。计算器限常规实重和计费重均≤20kg；时效与班次不作承诺。"
    },
    {
      "id": "q-pay",
      "code": "Q2",
      "title": "起航 · 提交发货 / 手动付款",
      "url": "https://www.daikei-tenso.com/2016/chongzhitixianwenti_0106/221.html",
      "status": "verified",
      "evidence": "可只提交部分在库包裹，其余30天免费；手动付款在打包后主动支付，付款前可换线路。",
      "boundary": "只证明提交、付款和换线控制，未证明新分出的尾箱可退回库存、重组或逐箱确认。"
    },
    {
      "id": "h-rate",
      "code": "H1",
      "title": "15号库 · 会员费率与计算图片",
      "url": "https://www.15haoku.com/html/bzzx/hydj/indexCN.html",
      "status": "conflict",
      "publishedAt": "2026-10-02",
      "evidence": "本次目视核验官方费率图：普通会员云归雁CC 1800円/kg，首0.5kg=900円，续0.1kg=180円；仓储60天。",
      "boundary": "原稿1600/800/160已过时。图示0.10kg→0.2kg与0.1kg档说明有进位歧义；计算器采用一般向上进位模型，非精确账单。",
      "extraLinks": [
        {
          "title": "官方费率原图",
          "url": "https://www.15haoku.com/upxingao/xa/2026-10-02/111_08afa190751ae96261f93c392469a459.png"
        },
        {
          "title": "官方计算说明图",
          "url": "https://www.15haoku.com/upxingao/xa/2026-10-02/111_a11fd4283f3d5e5b7568adc98d0d8ba0.png"
        }
      ]
    },
    {
      "id": "h-rule",
      "code": "H2",
      "title": "15号库 · 免责赔付 / 提交运单",
      "url": "https://www.15haoku.com/m/html/bzzx/pftl/indexCN.html",
      "status": "verified",
      "publishedAt": "2026-09-03",
      "evidence": "待打包即默认同意合理分箱；不处理先联系、少量余货重入库备注；打包后不可换线，称重自动扣余额。CC线超1.3倍时按体积与实重差额整kg×300円加收。",
      "boundary": "仅适用所列线路。亚克力等易碎品、赠品的品损赔付另有限制。不可解释为用户可自由留尾箱。"
    },
    {
      "id": "h-combine",
      "code": "H3",
      "title": "15号库 · 合并发货公告",
      "url": "https://www.15haoku.com/html/xwgg/zygg/2024-06-08/294CN.html",
      "status": "verified",
      "publishedAt": "2026-10-02（页面显示）",
      "evidence": "本次正文列云归雁CC最多15个来源包裹；海乐淘CC 20个且限商城/代购来源，不能混用。",
      "boundary": "链接路径带2024年，但本次页面显示2026年更新，不以URL路径代替正文版本。"
    },
    {
      "id": "s-elig",
      "code": "S1",
      "title": "518 · 自购代收资格",
      "url": "https://www.518.jp/archives/128.html",
      "status": "verified",
      "publishedAt": "2025-10-02",
      "evidence": "门店FAQ不接受海外客户代收；日本居住者提供真实姓名、地址、电话等资料后可代收自购商品。",
      "boundary": "对海外居住的日本官网自购用户，按此FAQ不符合资格；没有书面例外答复前不能当作可用仓。门店自称顺丰国际新潟机场店。"
    },
    {
      "id": "s-service",
      "code": "S2",
      "title": "518 · 合箱 / 分箱收费",
      "url": "https://www.518.jp/archives/127.html",
      "status": "verified",
      "evidence": "基础分箱、合箱、简单拍照、泡泡纸、打包、裁箱与称重免费；重复摆拍、大量逐件封包、特殊处理可酌情收费。",
      "boundary": "免费操作不等于每箱方案确认或尾箱暂存权限。"
    },
    {
      "id": "s-storage",
      "code": "S3",
      "title": "518 · 存储服务",
      "url": "https://www.518.jp/archives/129.html",
      "status": "verified",
      "evidence": "仓储原则免费，不使用门店寄件、超过2个月等情形可能收费，列200円/天/立方米；超1立方米另有入库费。",
      "boundary": "不足1立方米如何计费、尾箱期限未明；长期无人认领可能被处理。"
    },
    {
      "id": "s-price",
      "code": "S4",
      "title": "518 · 价格单及发货要求",
      "url": "https://www.518.jp/archives/119.html",
      "status": "verified",
      "evidence": "本次页面仍提示准备中、详细情况微信咨询，未列可用的数值价目。",
      "boundary": "只说明本页未列价，不能推断其他渠道均无价目。宣传时效不作为运输保证。"
    },
    {
      "id": "t-fee",
      "code": "T1",
      "title": "TRANSBANG · 日本仓费用",
      "url": "https://www.transbang.com/zh-tw/help/service_expense_payment?index=13",
      "status": "verified",
      "evidence": "0.01–10kg服务费50円/kg，另计国际运费。集中包装20件商品内免人工费；纸箱150–1000円；重包1000円/包。",
      "boundary": "20件是商品数，不是来源包裹数。到仓未通知出货60天免费，打包通知付款后仅14天免费；尾箱留库未证实。"
    },
    {
      "id": "t-flow",
      "code": "T2",
      "title": "TRANSBANG · 通知出货流程",
      "url": "https://www.transbang.com/zh-tw/help/newhere?index=10",
      "status": "verified",
      "evidence": "用户勾选待发商品，通知出货完成后不可取消或返回；仓库集中包装完成后再付款。",
      "boundary": "付款发生在打包后，不等于此时还能撤销；有重包服务也不能推出可留尾箱。客服入口以官网联系页 / 站内留言为准。"
    },
    {
      "id": "j-service",
      "code": "J1",
      "title": "吉速 · 增值服务",
      "url": "https://www.j-gsexpress.com/index.php/Subject/Page/Name/zengzhifuwu.html",
      "status": "verified",
      "evidence": "10包内合箱免费；分箱200円/分出包，分2包即400円。撤销称重中500円、待支付1000円。入库优惠20円/包；60天免费仓储。",
      "boundary": "强制服务不预先沟通。分箱后各包重计入库费；待支付仅7天免费。超重再入库注明2026-01-01从200改500円。"
    },
    {
      "id": "j-route",
      "code": "J2",
      "title": "吉速 · 中包线路限制",
      "url": "https://www.j-gsexpress.com/index.php/Subject/Page/Name/zhongbaobaoshui.html",
      "status": "verified",
      "evidence": "本次读取官网内嵌价表，中包最低5kg：航空14100円、海运12600円，3kg也按5kg计。",
      "boundary": "此为中包线路，不与普通邮政混为同一服务；限重、尺寸及商品限制须另核。"
    },
    {
      "id": "g-service",
      "code": "G1",
      "title": "JPGOODBUY · 增值服务",
      "url": "https://tw.jpgoodbuy.com/yii/web/index.php?categoryId=20&isApp=0&r=home%2Findex%2Fexpenses-limitation",
      "status": "verified",
      "evidence": "基础5包内合箱免费，第6包起100円/包，会员/提交路径可能不同；新箱80–350円；原箱装不下可能自动换箱或分箱。",
      "boundary": "平均分箱为随机分配，不能视为指定留尾箱。能力须看具体线路，不能全站外推。"
    },
    {
      "id": "g-storage",
      "code": "G2",
      "title": "JPGOODBUY · 仓储专页",
      "url": "https://www.jpgoodbuy.com/yii/web/index.php?categoryId=21&isApp=0&r=home%2Findex%2Fexpenses-limitation",
      "status": "verified",
      "evidence": "未认证用户至少30天免费，按会员和包裹类型变化；额外付费仓储最长30天；打包未付款最多5天免费。",
      "boundary": "打包未付超过30日可视为弃货、超过37日不可找回，不能把37日当安全仓储期。已分出的尾箱能否重入库是另一项权限。"
    },
    {
      "id": "g-old",
      "code": "G3",
      "title": "JPGOODBUY · 费用时效交叉核验",
      "url": "https://track.jpgoodbuy.com/yii/web/index.php?categoryId=0&isApp=0&r=home%2Findex%2Fexpenses-limitation",
      "status": "verified",
      "evidence": "费用入口本次同样写至少30天免费、最长额外30天付费仓储，与仓储专页一致。",
      "boundary": "原稿及初步核验提及额外60天，本次最终复核未复现，已不作为已证实差异展示。"
    },
    {
      "id": "g-route",
      "code": "G4",
      "title": "JPGOODBUY · 飞鸟快线服务范围",
      "url": "https://daigou.jpgoodbuy.com/yii/web/index.php?categoryId=130&r=home%2Findex%2Fexpenses-limitation",
      "status": "verified",
      "evidence": "飞鸟快线服务表列分箱不支持，合箱和部分加固支持。",
      "boundary": "不能把全站分箱功能套用此线路；官网重上线公告标题不能证明当天正常承运。"
    },
    {
      "id": "law-limit",
      "code": "A1",
      "title": "海关总署公告2024年第176号 · 商务部转载",
      "url": "https://www.mofcom.gov.cn/zcfb/zgdwjjmywg/art/2025/art_4adf716bf28542fdbffe5510b30d8ed9.html",
      "status": "verified",
      "publishedAt": "2024-11-29；2024-12-01实施",
      "evidence": "把个人寄自境外的进境物品每次限值调整为人民币2000元，自2024-12-01执行。",
      "boundary": "该限值不是2000元货值免税额度，也不替代合理自用要求。"
    },
    {
      "id": "law-use",
      "code": "A2",
      "title": "税委会公告2024年第11号 · 商务部转载",
      "url": "https://www.mofcom.gov.cn/zcfb/zgdwjjmywg/art/2025/art_1e3054b72cf8471abeed5b224eda0c8d.html",
      "status": "verified",
      "publishedAt": "2024-11-29；2024-12-01实施",
      "evidence": "办法第6条要求海关审核个人合理自用；第20条自用排除出售、出租；第13条免税依据为应征税额50元以内。",
      "boundary": "具体商品的数量、归类和税额由海关认定；不建议通过人为拆箱规避申报。"
    },
    {
      "id": "law-faq",
      "code": "A3",
      "title": "海关邮件FAQ · 原稿来源访问限制",
      "url": "https://online.customs.gov.cn/ociswebserver/pages/jcjybcx/question.html",
      "status": "partial",
      "evidence": "本次直接打开未取得可用正文；官方搜索索引仍有相关摘要。",
      "boundary": "不把搜索摘要当全文核验。页面法源改用两份可读的政府官方公告全文。"
    },
    {
      "id": "t-calc",
      "code": "T3",
      "title": "TRANSBANG · 官方运费试算",
      "url": "https://www.transbang.com/zh-tw/help/evaluateTransferFee",
      "status": "verified",
      "evidence": "日本仓至中国上海公开试算：3/5kg航空基础3450/4850円、海运2600/3400円；另收服务费150/250円。本次逐档核验1–30kg。",
      "boundary": "运费向上取整kg档、服务费按实重。本次核验中国上海目的地，偏远附加另确认；收费纸箱、20件以上商品人工费、保险/税费等未计。"
    },
    {
      "id": "j-postal",
      "code": "J3",
      "title": "吉速 · 中国大陆邮政价表",
      "url": "https://www.j-gsexpress.com/index.php/Subject/Page/Name/fuwuyujiage.html",
      "status": "verified",
      "evidence": "普通邮政航空3/5kg为3450/4850円、海运2600/3400円，已核验完整重量档；另计入库、超额合箱等。",
      "boundary": "仅2个以内来源包裹时，普通用户航空基本运费95折；多包裹不采用该折扣。折扣取整、线路当前可提交性及箱材税费须确认。"
    },
    {
      "id": "g-postal",
      "code": "G5",
      "title": "JPGOODBUY · 官方邮政动态价表",
      "url": "https://www.jpgoodbuy.com/index-list_charge-id-16.html",
      "status": "verified",
      "evidence": "官网中国目的地动态表当前显示：航空3/5kg总费用3650/5100円、海运2800/3650円。本次核验1–30kg档。",
      "boundary": "直接采用官网“总费用”列，未另加未确认手续费；超免费数量合箱、箱材/加固/保险/税费另计，不是含税到手价。",
      "extraLinks": [
        {
          "title": "官方海运页面",
          "url": "https://www.jpgoodbuy.com/index-list_charge-id-22.html"
        }
      ]
    },
    {
      "id": "g-feiniao-price",
      "code": "G6",
      "title": "JPGOODBUY · 飞鸟航空价表",
      "url": "https://daigou.jpgoodbuy.com/yii/web/index.php?categoryId=130&r=home/index/expenses-limitation",
      "status": "verified",
      "evidence": "基础价3kg为171元、5kg为271元，100g档价表不是单一线性续重公式。",
      "boundary": "转运9折需满足领券活动，未默认采用；换箱、税费等另计。飞鸟明确不支持分箱，本报表默认比较普通邮政。"
    },
    {
      "id": "h-limit",
      "code": "H4",
      "title": "15号库 · CC线路合箱限制",
      "url": "https://www.15haoku.com/html/fwsf/indexCN.html",
      "status": "verified",
      "evidence": "官方CC规则图明确适用云归雁CC及海乐淘CC：提交最大合箱重量14.5kg，另有每箱商品件数、货值、同批收货信息等限制。",
      "boundary": "按一个出库箱试算，商品保护或件数/清关限制可能另行分箱；图未标明生效日，不能以图片URL日期当政策生效日。",
      "extraLinks": [
        {
          "title": "官方CC规则原图",
          "url": "https://www.15haoku.com/upxingao/xa/2026-08-29/111_7bdbda541449a0ab6c3709c04598a461.png"
        }
      ]
    },
    {
      "id": "xjm-price",
      "code": "X1",
      "title": "小卷毛 · 中国大陆空运/船运价目及服务费",
      "url": "https://www.xjmhikari.co.jp/single.aspx?catid=3",
      "status": "verified",
      "evidence": "官网将中华人民共和国列为第1地区。普通航空、船运按公布重量档计费；5kg档分别5150円、4000円。10个以内合箱免费，超出部分100円/包；特殊箱、加固及分拣等另计。",
      "boundary": "价目页未显示明确更新日期；按可访问的当前页面摘录，提交前复核。普通价不含按需箱材、加固、分拣、保险等。"
    },
    {
      "id": "xjm-storage",
      "code": "X2",
      "title": "小卷毛 · 仓储说明",
      "url": "https://www.xjmhikari.co.jp/single.aspx?catid=60",
      "status": "verified",
      "evidence": "正常入库包裹免费仓储90天，超期2元/包裹/天；超过180天未发货按弃货处理。",
      "boundary": "需自行留意仓储期限；页面未承诺超期包裹可例外留到下一批。"
    },
    {
      "id": "xjm-service",
      "code": "X3",
      "title": "小卷毛 · 增值服务与重新入库收费",
      "url": "https://www.xjmhikari.co.jp/single.aspx?catid=3",
      "status": "conflict",
      "evidence": "现行服务价目写明重新入库100円/包裹，可按备注或随机重新入库；同页说明另一线路须先发一条线、重入库后再提交其他线路。",
      "boundary": "转运流程页另写装不下退回库存收5元/包裹；费用口径冲突。重入库后能留多久、主动指定尾货能否留待下次，需客服书面确认。"
    },
    {
      "id": "xjm-flow",
      "code": "X4",
      "title": "小卷毛 · 转运流程与分线说明",
      "url": "https://www.xjmhikari.co.jp/single.aspx?catid=22",
      "status": "verified",
      "evidence": "官网流程说明可申请合箱；如装不下，仓库会将余件重新入库。打包后订单不能取消。",
      "boundary": "仓库主动分拣和用户主动留货不是同一权限；请下单前写明商品、线路和余件处理要求。"
    },
    {
      "id": "sx-calc",
      "code": "S1",
      "title": "顺兴物流 · 官网运费计算器",
      "url": "https://shunxing.zhongdajunxin.com/",
      "status": "partial",
      "evidence": "公开首页可选择寄往国家、具体线路并输入毛重和三边尺寸；说明按实重与体积重较大者计费，结果仅供参考、按较便宜路线展示。",
      "boundary": "需要明确选择线路并输入尺寸；公开网页未提供可确认的固定人民币价表。当前未把线路/尺寸信息缺失的计算结果猜成统一空海价。"
    },
    {
      "id": "sx-price",
      "code": "S2",
      "title": "顺兴物流 · 收费标准页图片",
      "url": "https://shunxing.zhongdajunxin.com/content/?520_528_0.html=",
      "status": "partial",
      "evidence": "收费页图片为品类与申报提醒（杂货YT混发金额上限、单品高货值需单独打包及如实申报），不是可读的线路费率表。",
      "boundary": "图片未列空运/海运运价；需以官网实时计算器及客服确认为准。"
    },
    {
      "id": "sx-terms",
      "code": "S3",
      "title": "顺兴物流 · 用户协议",
      "url": "https://shunxing.zhongdajunxin.com/content/?531_533_0.html=",
      "status": "verified",
      "evidence": "公开协议说明顺兴服务主体与用户需遵守个人合理自用等条款，协议页标注生效时间2023年6月30日。",
      "boundary": "协议没有给出可确认的尾货留仓、重新入库、打包前确认或空海分组操作规则；此类权限保留待问。"
    }
  ],
  "vendors": [
    {
      "id": "cosmos",
      "name": "COSMOS-LINE",
      "sub": "人工包装协商",
      "level": "L2候选 · 待确认",
      "tone": "green",
      "tags": [
        "control",
        "anime"
      ],
      "pitch": "能协商包装，但每箱确认与尾箱留库仍未证实。",
      "short": "一对一包装沟通",
      "shortEvidence": "官网支持拍照与指定包装，适合先问逐箱方案；60/90天仓储差异需先解决。",
      "shortRefs": [
        "c-home",
        "c-service",
        "c-terms"
      ],
      "cells": [
        [
          {
            "text": "注册获日本收货地址，可自购寄仓。",
            "refs": [
              "c-home"
            ]
          },
          {
            "text": "仓储60/90天冲突；超期收费须确认。",
            "refs": [
              "c-service",
              "c-terms"
            ]
          }
        ],
        [
          {
            "text": "5包内免费合箱；第6包起150円/包。手续费500円/次，新箱200–600円。",
            "refs": [
              "c-service"
            ]
          }
        ],
        [
          {
            "text": "可协商包装、尺寸、重量并提供照片。",
            "refs": [
              "c-home"
            ]
          },
          {
            "text": "未明示分箱后逐箱确认或尾箱留库权。",
            "refs": [
              "c-home"
            ]
          }
        ]
      ],
      "pending": "分箱前是否给每箱清单、重量与完整报价？少量尾货能否不出库？",
      "analysis": "优势是人工沟通与包装选项；未核实的权限不能按“定制服务”推定。",
      "extra": [
        {
          "text": "国际航空/海运原图现已核验，1–30kg档可试算；另计操作、超包合箱等。",
          "refs": [
            "c-price",
            "c-service"
          ]
        }
      ]
    },
    {
      "id": "transportjp",
      "name": "日转网",
      "sub": "transportjp · 指定拆分留库",
      "level": "L2候选 · 待确认",
      "tone": "green",
      "tags": [
        "control",
        "anime"
      ],
      "pitch": "有主动指定留库机制，不能推广为所有分箱都先确认。",
      "short": "指定商品拆分留库",
      "shortEvidence": "FAQ支持备注留库、次日生成新单号。但超邮政上限可未经通知拆分退库，须问触发条件。",
      "shortRefs": [
        "r-faq",
        "r-submit"
      ],
      "cells": [
        [
          {
            "text": "支持日本网购寄仓；FAQ30天、首页180天免费仓储冲突。",
            "refs": [
              "r-faq",
              "r-home"
            ]
          }
        ],
        [
          {
            "text": "合箱15/20包上限冲突。精准分箱6件内免费，超出8元/件。",
            "refs": [
              "r-fee",
              "r-route"
            ]
          }
        ],
        [
          {
            "text": "备注指定商品拆分留库，次日新单号。",
            "refs": [
              "r-faq"
            ]
          },
          {
            "text": "超邮政尺寸/重量可不通知分拆退库；撤销重入库有条件收费。",
            "refs": [
              "r-submit",
              "r-cancel"
            ]
          }
        ]
      ],
      "pending": "仓库主动分箱时是否先确认？30元按包裹还是运单？当前仓储和邮政价目用哪版？",
      "analysis": "公开留库机制接近目标场景，但主动留库与仓库超限处理须分开看；不依据较低价排序。",
      "extra": [
        {
          "text": "两套官方航空3/5kg为3385/4645与3450/4850円；海运为2090/2660与2600/3400円。均保留为冲突价，须重新报价。",
          "refs": [
            "r-fee",
            "r-route"
          ]
        }
      ]
    },
    {
      "id": "qihang",
      "name": "起航转运",
      "sub": "文具类航空通关",
      "level": "L1+ · 待确认",
      "tone": "amber",
      "tags": [
        "control",
        "anime"
      ],
      "pitch": "手动付款可控支付与换线，不能等同尾箱权限。",
      "short": "先打包，再手动付款",
      "shortEvidence": "文具航空列胸章、吧唧、周边；手动付款前可换线路，仓库仍可能因清关要求分箱。",
      "shortRefs": [
        "q-line",
        "q-pay"
      ],
      "cells": [
        [
          {
            "text": "可只提交部分在库包裹，其余30天免费仓储。",
            "refs": [
              "q-pay"
            ]
          }
        ],
        [
          {
            "text": "文具航空2000円/kg整公斤档；体积重超过实重1.3倍时按体积重。",
            "refs": [
              "q-line"
            ]
          }
        ],
        [
          {
            "text": "手动付款在打包后，付款前可换线；清关要求可能触发分箱。",
            "refs": [
              "q-pay",
              "q-line"
            ]
          }
        ]
      ],
      "pending": "付款前能否重组商品？仓库新分出的尾箱可否退回库存？",
      "analysis": "品类说明与计价相对清晰；付款控制仅是控制权中的一项。",
      "extra": [
        {
          "text": "正文常规20kg、特批25kg，但表格延伸至30kg，不能据表直接接受大箱。",
          "refs": [
            "q-line"
          ]
        }
      ]
    },
    {
      "id": "sf518",
      "name": "518 / 新潟机场店",
      "sub": "按门店FAQ核对资格",
      "level": "海外自购资格不符",
      "tone": "red",
      "tags": [
        "anime",
        "risk"
      ],
      "pitch": "按公开FAQ，海外居住者的自购代收不被接受。",
      "cells": [
        [
          {
            "text": "只接受符合条件的日本居住者自购代收；不接受海外客户代收。",
            "refs": [
              "s-elig"
            ]
          },
          {
            "text": "仓储原则免费，超2个月等情况可收费。",
            "refs": [
              "s-storage"
            ]
          }
        ],
        [
          {
            "text": "基础分箱/合箱/简单拍照等免费，复杂操作可收费。价目页仍准备中。",
            "refs": [
              "s-service",
              "s-price"
            ]
          }
        ],
        [
          {
            "text": "基础操作免费不能证明分箱先确认、尾箱留库或逐箱出库。",
            "refs": [
              "s-service"
            ]
          }
        ]
      ],
      "pending": "先确认居住资格；不符合公开资格时，不应把它视为已可用候选。",
      "analysis": "包装服务的适配不能抵消资格限制；原稿“条件候选”收紧为明确资格风险。",
      "extra": []
    },
    {
      "id": "transbang",
      "name": "TRANSBANG",
      "sub": "转送帮 · 日本仓",
      "level": "L1+ · 待确认",
      "tone": "amber",
      "tags": [
        "control"
      ],
      "pitch": "打包后付款，但通知出货完成后已不能取消。",
      "cells": [
        [
          {
            "text": "到仓未通知出货60天免费；包装通知付款后仅14天免费。",
            "refs": [
              "t-fee"
            ]
          }
        ],
        [
          {
            "text": "20件商品内免集中包装人工费；服务费50円/kg（≤10kg），国际运费另计。",
            "refs": [
              "t-fee"
            ]
          }
        ],
        [
          {
            "text": "选商品通知出货后不可取消；重包1000円/包，不等于可留尾箱。",
            "refs": [
              "t-flow",
              "t-fee"
            ]
          }
        ]
      ],
      "pending": "先发主箱、留尾箱是否可行？重包适用阶段及产生的新箱费用是什么？",
      "analysis": "收费拆分明确；“20件商品”不能误写为20个来源包裹。",
      "extra": [
        {
          "text": "纸箱150–1000円；分成2箱收100円、3箱收200円，按新增箱数计。",
          "refs": [
            "t-fee"
          ]
        }
      ]
    },
    {
      "id": "jgs",
      "name": "吉速转运",
      "sub": "J-GS Express",
      "level": "L1–L2待验证",
      "tone": "amber",
      "tags": [
        "control",
        "risk"
      ],
      "pitch": "撤销费用明确，但强制服务可不预先沟通。",
      "cells": [
        [
          {
            "text": "60天免费仓储；待支付运单仅7天免费，之后另收费。",
            "refs": [
              "j-service"
            ]
          }
        ],
        [
          {
            "text": "10包内合箱免费。分箱200円/分出包，分2包即400円；分箱后重计入库费。",
            "refs": [
              "j-service"
            ]
          }
        ],
        [
          {
            "text": "称重中撤销500円、待支付1000円；强制增值服务不事先沟通。",
            "refs": [
              "j-service"
            ]
          }
        ]
      ],
      "pending": "仓库主动拆箱能否暂停？尾箱能否留库？撤销、重新合箱、入库费用怎样叠加？",
      "analysis": "收费明细不等于事先同意权；需特别确认阶段与箱数。",
      "extra": [
        {
          "text": "超重再入库2026-01-01起500円；普通邮政、中包费率分别核验，默认表比较普通邮政。",
          "refs": [
            "j-service",
            "j-postal",
            "j-route"
          ]
        }
      ]
    },
    {
      "id": "haoku",
      "name": "15号库",
      "sub": "普通会员 · 云归雁CC",
      "level": "L1 · 控制权风险",
      "tone": "red",
      "tags": [
        "risk"
      ],
      "pitch": "公开规则与“少量尾货重新入库”要求直接冲突。",
      "cells": [
        [
          {
            "text": "云归雁最多15个来源包裹合箱；普通会员仓储60天。",
            "refs": [
              "h-combine",
              "h-rate"
            ]
          }
        ],
        [
          {
            "text": "现价1800円/kg：首0.5kg 900円，续0.1kg 180円。原稿1600已过时。",
            "refs": [
              "h-rate"
            ]
          }
        ],
        [
          {
            "text": "默认接受合理分箱，不处理少量余货重入库备注；打包称重自动扣余额，不能换线。",
            "refs": [
              "h-rule"
            ]
          }
        ]
      ],
      "pending": "若仍考虑，只问有无其他具备人工确认与尾箱留库权的适用线路。",
      "analysis": "按当前公开规则，难满足本研究核心控制权要求，不宜仅因基础单价作决定。",
      "extra": [
        {
          "text": "CC体积重超实重1.3倍时，差额按整kg向上进位×300円加收；易碎品、亚克力及赠品赔付有限制。",
          "refs": [
            "h-rule"
          ]
        },
        {
          "text": "首续重图片的整档进位存在示例歧义，估算结果须复核。",
          "refs": [
            "h-rate"
          ]
        }
      ]
    },
    {
      "id": "jpgoodbuy",
      "name": "JPGOODBUY",
      "sub": "日本好买 · 须看具体线路",
      "level": "备用 · 权限待确认",
      "tone": "neutral",
      "tags": [
        "risk",
        "anime"
      ],
      "pitch": "全站有分箱服务，但飞鸟快线明确不支持分箱。",
      "cells": [
        [
          {
            "text": "免费仓储按会员/包裹类型至少30天；普通未提交包裹额外付费最长30天。",
            "refs": [
              "g-storage",
              "g-old"
            ]
          }
        ],
        [
          {
            "text": "基础5包内免费合箱，第6包起100円；新箱80–350円。",
            "refs": [
              "g-service"
            ]
          }
        ],
        [
          {
            "text": "原箱不够可能自动换箱/分箱；飞鸟快线不支持分箱。未证实尾箱暂存。",
            "refs": [
              "g-service",
              "g-route"
            ]
          }
        ]
      ],
      "pending": "具体可用线路、分箱权限及尾箱可否重新入库？确认本单仓储起算及到期日。",
      "analysis": "保留备用；额外60天规则本次未复现，不列为已证实差异；不以历史暂停暗示当前停运。",
      "extra": []
    },
    {
      "id": "xiaojuanmao",
      "name": "小卷毛",
      "sub": "小卷毛日本转运",
      "level": "官方价目 · 尾货费用待确认",
      "tone": "neutral",
      "tags": ["anime", "control"],
      "pitch": "大陆空运、船运价目公开；可重入库后换另一线路，相关费用和尾货留存时间要问客服。",
      "cells": [
        [{"text":"大陆第1地区价目可查；正常免费仓储90天。","refs":["xjm-price","xjm-storage"]}],
        [{"text":"前10包免费合箱，超出每包100円；特殊箱与加固另计。","refs":["xjm-price"]}],
        [{"text":"装不下可重新入库；100円与5元两种费用口径冲突。","refs":["xjm-service","xjm-flow"]}]
      ],
      "pending":"主动指定少量尾货能否留到下批、留存期限与重入库收费，请客服书面确认。",
      "analysis":"空海基础邮政价可用于同重量横向比较；备注商品后按规则重新入库再提交另一线路。仓库随机重入库、收费箱和加固可能增加费用。",
      "extra":[]
    },
    {
      "id": "shunxing",
      "name": "顺兴物流",
      "sub": "日本转运 · 线路须单独试算",
      "level": "官网计算器 · 权限待核",
      "tone": "neutral",
      "tags": ["anime", "risk"],
      "pitch": "官网支持按目的地、线路、毛重和尺寸计算参考价；公开价表图片没有列出空海价格。",
      "cells": [
        [{"text":"官网可输入重量及长宽高试算体积重。","refs":["sx-calc"]}],
        [{"text":"公开费率图片未列国际线路价格；不能直接横向算数值。","refs":["sx-price","sx-calc"]}],
        [{"text":"没有核实到尾货留仓与分箱再入库条款。","refs":["sx-terms"]}]
      ],
      "pending":"请客服确认具体空海线路及报价、少量尾货留仓/重入库权限、仓储期限，以及按商品分组后分别走空运和海运的操作方式。",
      "analysis":"此仓适合先用官网按真实尺寸试算，并请客服补充仓储、分箱和路线调配规则；报价前暂不与已知价表仓库排序。",
      "extra":[]
    }
  ],
  "report": {
    "rows": [
      {
        "id": "cosmos",
        "pros": "包装、合箱方式可协商",
        "cons": "仓储60/90天有冲突",
        "tailState": "unknown",
        "tailLabel": "待确认",
        "tailNote": "打包后余货重入库未明",
        "packing": "可一对一协商",
        "packingNote": "空海分组、打包后调整需确认",
        "refs": [
          "c-home",
          "c-service",
          "c-terms",
          "c-price"
        ]
      },
      {
        "id": "transportjp",
        "pros": "可指定商品拆分留库",
        "cons": "仓储、价表版本不一致",
        "tailState": "conditional",
        "tailLabel": "有条件可留",
        "tailNote": "主动备注有机制；强制分箱需问",
        "packing": "可备注指定商品",
        "packingNote": "拆出后再选线路；超限可不通知",
        "refs": [
          "r-faq",
          "r-home",
          "r-fee",
          "r-route",
          "r-submit",
          "r-cancel"
        ]
      },
      {
        "id": "qihang",
        "pros": "文具周边适配，可手动付款",
        "cons": "可能因清关要求分箱",
        "tailState": "unknown",
        "tailLabel": "待确认",
        "tailNote": "未明示新分尾货可退回库存",
        "packing": "付款前可换线",
        "packingNote": "商品重组、空海分发需确认",
        "refs": [
          "q-line",
          "q-pay"
        ]
      },
      {
        "id": "sf518",
        "pros": "基础合箱、拍照、打包免费",
        "cons": "不接受海外客户自购代收",
        "tailState": "ineligible",
        "tailLabel": "先核资格",
        "tailNote": "海外自购按公开规则不适用",
        "packing": "基础打包可办理",
        "packingNote": "复杂操作收费；调配权限未明",
        "refs": [
          "s-elig",
          "s-service",
          "s-storage",
          "s-price"
        ]
      },
      {
        "id": "transbang",
        "pros": "打包后付款，服务费透明",
        "cons": "通知出货后不可取消",
        "tailState": "unknown",
        "tailLabel": "待确认",
        "tailNote": "需问能否暂停尾箱出库",
        "packing": "提交前可选商品",
        "packingNote": "通知后不能取消，重包另收费",
        "refs": [
          "t-fee",
          "t-flow",
          "t-calc"
        ]
      },
      {
        "id": "jgs",
        "pros": "10包免费合箱，可申请重合箱",
        "cons": "强制服务不预先沟通",
        "tailState": "unknown",
        "tailLabel": "待确认",
        "tailNote": "撤销后能否续存未明",
        "packing": "分箱、重合箱可申请",
        "packingNote": "强制操作不先沟通；费用另计",
        "refs": [
          "j-service",
          "j-postal",
          "j-route"
        ]
      },
      {
        "id": "haoku",
        "pros": "费率公开，可合15个来源包裹",
        "cons": "默认分箱、自动扣款",
        "tailState": "no",
        "tailLabel": "不处理留库备注",
        "tailNote": "云归雁CC公开规则",
        "packing": "以仓库判断为准",
        "packingNote": "先联系备注不处理；打包后不换线",
        "refs": [
          "h-rate",
          "h-rule",
          "h-combine",
          "h-limit"
        ]
      },
      {
        "id": "jpgoodbuy",
        "pros": "合箱与加固选项较多",
        "cons": "可自动换箱；规则随线路变",
        "tailState": "unknown",
        "tailLabel": "待确认",
        "tailNote": "未明示已分尾货可留到下批",
        "packing": "可提交打包备注",
        "packingNote": "飞鸟不分箱；重组空海需确认",
        "refs": [
          "g-service",
          "g-storage",
          "g-route",
          "g-postal",
          "g-feiniao-price"
        ]
      },
      {
        "id":"xiaojuanmao",
        "pros":"大陆空运、船运价目公开；90天免费仓储",
        "cons":"重入库费100円/5元规则冲突",
        "tailState":"conditional",
        "tailLabel":"可重入库，先问清",
        "tailNote":"能否主动留到下批及期限需确认",
        "packing":"可重入库后改走另一线",
        "packingNote":"写明商品分组；箱材、分拣另收费",
        "refs":["xjm-price","xjm-storage","xjm-service","xjm-flow"]
      },
      {
        "id":"shunxing",
        "pros":"官网可按线路和尺寸试算",
        "cons":"公开价图无可核费率；路线权限待核",
        "tailState":"unknown",
        "tailLabel":"待确认",
        "tailNote":"留库及重入库规则未查到",
        "packing":"需先问打包规则",
        "packingNote":"空海分组/打包后重组未证实",
        "refs":["sx-calc","sx-price","sx-terms"]
      }
    ],
    "cosmos": [
      {
        "id": "air",
        "name": "国际航空便",
        "url": "https://cosmos-line.net/img/plane.png",
        "localEvidence": "research/cosmos-plane.png",
        "status": "verified_official_image",
        "upperBoundKg": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22,
          23,
          24,
          25,
          26,
          27,
          28,
          29,
          30
        ],
        "baseJPY": [
          2050,
          2750,
          3450,
          4150,
          4850,
          5550,
          6250,
          6950,
          7650,
          8350,
          8850,
          9350,
          9850,
          10350,
          10850,
          11350,
          11850,
          12350,
          12850,
          13350,
          13850,
          14350,
          14850,
          15350,
          15850,
          16350,
          16850,
          17350,
          17850,
          18350
        ],
        "rounding": "按图中不超过1、2……30kg档选择；非整kg取下一不低于实重的档。",
        "examples": {
          "3kg": 3450,
          "5kg": 4850
        }
      },
      {
        "id": "sea",
        "name": "国际海运",
        "url": "https://cosmos-line.net/img/ship.png",
        "localEvidence": "research/cosmos-ship.png",
        "status": "verified_official_image",
        "upperBoundKg": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22,
          23,
          24,
          25,
          26,
          27,
          28,
          29,
          30
        ],
        "baseJPY": [
          1800,
          2200,
          2600,
          3000,
          3400,
          3800,
          4200,
          4600,
          5000,
          5400,
          5800,
          6200,
          6600,
          7000,
          7400,
          7800,
          8200,
          8600,
          9000,
          9400,
          9800,
          10200,
          10600,
          11000,
          11400,
          11800,
          12200,
          12600,
          13000,
          13400
        ],
        "rounding": "按图中不超过1、2……30kg档选择。",
        "examples": {
          "3kg": 2600,
          "5kg": 3400
        }
      }
    ],
    "transbang": [
      {
        "id": "air",
        "name": "日本邮政 一般空运",
        "url": "https://www.transbang.com/zh-tw/help/evaluateTransferFee",
        "endpointUrl": "https://www.transbang.com/zh-tw/help/calc_price",
        "checkedAt": "2026-11-06",
        "destination": "日本仓→中国上海",
        "dimensionsCm": [
          20,
          20,
          20
        ],
        "upperBoundKg": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22,
          23,
          24,
          25,
          26,
          27,
          28,
          29,
          30
        ],
        "baseJPY": [
          2050,
          2750,
          3450,
          4150,
          4850,
          5550,
          6250,
          6950,
          7650,
          8350,
          8850,
          9350,
          9850,
          10350,
          10850,
          11350,
          11850,
          12350,
          12850,
          13350,
          13850,
          14350,
          14850,
          15350,
          15850,
          16350,
          16850,
          17350,
          17850,
          18350
        ],
        "discountJPY": [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ],
        "status": "verified_official_calculator_each_integer_weight",
        "evidence": [
          "research/transbang-integer-quotes.json",
          "research/transbang-fractional-quotes.json",
          "research/transbang-quote-3kg.json",
          "research/transbang-quote-5kg.json"
        ],
        "rounding": "各整数kg档已逐档请求核对；另实测1.1、1.5、2.5、3.1、4.2、5.1kg均落下一整数kg对应运费档。",
        "interpolationBoundary": "整数档逐档实测；区间进位按所列非整kg实测归纳，不能代替最终装箱账单。"
      },
      {
        "id": "sea",
        "name": "日本邮政 一般海运",
        "url": "https://www.transbang.com/zh-tw/help/evaluateTransferFee",
        "endpointUrl": "https://www.transbang.com/zh-tw/help/calc_price",
        "checkedAt": "2026-11-06",
        "destination": "日本仓→中国上海",
        "dimensionsCm": [
          20,
          20,
          20
        ],
        "upperBoundKg": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22,
          23,
          24,
          25,
          26,
          27,
          28,
          29,
          30
        ],
        "baseJPY": [
          1800,
          2200,
          2600,
          3000,
          3400,
          3800,
          4200,
          4600,
          5000,
          5400,
          5800,
          6200,
          6600,
          7000,
          7400,
          7800,
          8200,
          8600,
          9000,
          9400,
          9800,
          10200,
          10600,
          11000,
          11400,
          11800,
          12200,
          12600,
          13000,
          13400
        ],
        "discountJPY": [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ],
        "status": "verified_official_calculator_each_integer_weight",
        "evidence": [
          "research/transbang-integer-quotes.json",
          "research/transbang-fractional-quotes.json",
          "research/transbang-quote-3kg.json",
          "research/transbang-quote-5kg.json"
        ],
        "rounding": "各整数kg档已逐档请求核对；另实测1.1、1.5、2.5、3.1、4.2、5.1kg均落下一整数kg对应运费档。",
        "interpolationBoundary": "整数档逐档实测；区间进位按所列非整kg实测归纳，不能代替最终装箱账单。"
      }
    ],
    "jgs": [
      {
        "maxKg": 0.5,
        "ems": 1450,
        "air": 2050,
        "sea": 1800
      },
      {
        "maxKg": 0.6,
        "ems": 1600,
        "air": 2050,
        "sea": 1800
      },
      {
        "maxKg": 0.7000000000000001,
        "ems": 1750,
        "air": 2050,
        "sea": 1800
      },
      {
        "maxKg": 0.8,
        "ems": 1900,
        "air": 2050,
        "sea": 1800
      },
      {
        "maxKg": 0.9,
        "ems": 2050,
        "air": 2050,
        "sea": 1800
      },
      {
        "maxKg": 1,
        "ems": 2200,
        "air": 2050,
        "sea": 1800
      },
      {
        "maxKg": 1.25,
        "ems": 2500,
        "air": 2750,
        "sea": 2200
      },
      {
        "maxKg": 1.5,
        "ems": 2800,
        "air": 2750,
        "sea": 2200
      },
      {
        "maxKg": 1.75,
        "ems": 3100,
        "air": 2750,
        "sea": 2200
      },
      {
        "maxKg": 2,
        "ems": 3400,
        "air": 2750,
        "sea": 2200
      },
      {
        "maxKg": 2.5,
        "ems": 3900,
        "air": 3450,
        "sea": 2600
      },
      {
        "maxKg": 3,
        "ems": 4400,
        "air": 3450,
        "sea": 2600
      },
      {
        "maxKg": 3.5,
        "ems": 4900,
        "air": 4150,
        "sea": 3000
      },
      {
        "maxKg": 4,
        "ems": 5400,
        "air": 4150,
        "sea": 3000
      },
      {
        "maxKg": 4.5,
        "ems": 5900,
        "air": 4850,
        "sea": 3400
      },
      {
        "maxKg": 5,
        "ems": 6400,
        "air": 4850,
        "sea": 3400
      },
      {
        "maxKg": 5.5,
        "ems": 6900,
        "air": 5550,
        "sea": 3800
      },
      {
        "maxKg": 6,
        "ems": 7400,
        "air": 5550,
        "sea": 3800
      },
      {
        "maxKg": 7,
        "ems": 8200,
        "air": 6250,
        "sea": 4200
      },
      {
        "maxKg": 8,
        "ems": 9000,
        "air": 6950,
        "sea": 4600
      },
      {
        "maxKg": 9,
        "ems": 9800,
        "air": 7650,
        "sea": 5000
      },
      {
        "maxKg": 10,
        "ems": 10600,
        "air": 8350,
        "sea": 5400
      },
      {
        "maxKg": 11,
        "ems": 11400,
        "air": 8850,
        "sea": 5800
      },
      {
        "maxKg": 12,
        "ems": 12200,
        "air": 9350,
        "sea": 6200
      },
      {
        "maxKg": 13,
        "ems": 13000,
        "air": 9850,
        "sea": 6600
      },
      {
        "maxKg": 14,
        "ems": 13800,
        "air": 10350,
        "sea": 7000
      },
      {
        "maxKg": 15,
        "ems": 14600,
        "air": 10850,
        "sea": 7400
      },
      {
        "maxKg": 16,
        "ems": 15400,
        "air": 11350,
        "sea": 7800
      },
      {
        "maxKg": 17,
        "ems": 16200,
        "air": 11850,
        "sea": 8200
      },
      {
        "maxKg": 18,
        "ems": 17000,
        "air": 12350,
        "sea": 8600
      },
      {
        "maxKg": 19,
        "ems": 17800,
        "air": 12850,
        "sea": 9000
      },
      {
        "maxKg": 20,
        "ems": 18600,
        "air": 13350,
        "sea": 9400
      },
      {
        "maxKg": 21,
        "ems": 19400,
        "air": 13850,
        "sea": 9800
      },
      {
        "maxKg": 22,
        "ems": 20200,
        "air": 14350,
        "sea": 10200
      },
      {
        "maxKg": 23,
        "ems": 21000,
        "air": 14850,
        "sea": 10600
      },
      {
        "maxKg": 24,
        "ems": 21800,
        "air": 15350,
        "sea": 11000
      },
      {
        "maxKg": 25,
        "ems": 22600,
        "air": 15850,
        "sea": 11400
      },
      {
        "maxKg": 26,
        "ems": 23400,
        "air": 16350,
        "sea": 11800
      },
      {
        "maxKg": 27,
        "ems": 24200,
        "air": 16850,
        "sea": 12200
      },
      {
        "maxKg": 28,
        "ems": 25000,
        "air": 17350,
        "sea": 12600
      },
      {
        "maxKg": 29,
        "ems": 25800,
        "air": 17850,
        "sea": 13000
      },
      {
        "maxKg": 30,
        "ems": 26600,
        "air": 18350,
        "sea": 13400
      }
    ],
    "jpg": [
      {
        "maxKg": 1,
        "air": 2250,
        "sea": 2000
      },
      {
        "maxKg": 2,
        "air": 2950,
        "sea": 2400
      },
      {
        "maxKg": 3,
        "air": 3650,
        "sea": 2800
      },
      {
        "maxKg": 4,
        "air": 4350,
        "sea": 3200
      },
      {
        "maxKg": 5,
        "air": 5100,
        "sea": 3650
      },
      {
        "maxKg": 6,
        "air": 5850,
        "sea": 4100
      },
      {
        "maxKg": 7,
        "air": 6600,
        "sea": 4550
      },
      {
        "maxKg": 8,
        "air": 7350,
        "sea": 5000
      },
      {
        "maxKg": 9,
        "air": 8100,
        "sea": 5450
      },
      {
        "maxKg": 10,
        "air": 8850,
        "sea": 5900
      },
      {
        "maxKg": 11,
        "air": 9400,
        "sea": 6350
      },
      {
        "maxKg": 12,
        "air": 9950,
        "sea": 6800
      },
      {
        "maxKg": 13,
        "air": 10500,
        "sea": 7250
      },
      {
        "maxKg": 14,
        "air": 11050,
        "sea": 7700
      },
      {
        "maxKg": 15,
        "air": 11600,
        "sea": 8150
      },
      {
        "maxKg": 16,
        "air": 12150,
        "sea": 8600
      },
      {
        "maxKg": 17,
        "air": 12700,
        "sea": 9050
      },
      {
        "maxKg": 18,
        "air": 13250,
        "sea": 9500
      },
      {
        "maxKg": 19,
        "air": 13800,
        "sea": 9950
      },
      {
        "maxKg": 20,
        "air": 14350,
        "sea": 10400
      },
      {
        "maxKg": 21,
        "air": 14900,
        "sea": 10850
      },
      {
        "maxKg": 22,
        "air": 15450,
        "sea": 11300
      },
      {
        "maxKg": 23,
        "air": 16000,
        "sea": 11750
      },
      {
        "maxKg": 24,
        "air": 16550,
        "sea": 12200
      },
      {
        "maxKg": 25,
        "air": 17100,
        "sea": 12650
      },
      {
        "maxKg": 26,
        "air": 17650,
        "sea": 13100
      },
      {
        "maxKg": 27,
        "air": 18200,
        "sea": 13550
      },
      {
        "maxKg": 28,
        "air": 18750,
        "sea": 14000
      },
      {
        "maxKg": 29,
        "air": 19300,
        "sea": 14450
      },
      {
        "maxKg": 30,
        "air": 19850,
        "sea": 14900
      }
    ],
    "rzOldAir": [
      {
        "maxKg": 0.5,
        "value": 1700
      },
      {
        "maxKg": 1,
        "value": 2050
      },
      {
        "maxKg": 1.5,
        "value": 2400
      },
      {
        "maxKg": 2,
        "value": 2750
      },
      {
        "maxKg": 2.5,
        "value": 3070
      },
      {
        "maxKg": 3,
        "value": 3385
      },
      {
        "maxKg": 3.5,
        "value": 3700
      },
      {
        "maxKg": 4,
        "value": 4015
      },
      {
        "maxKg": 4.5,
        "value": 4330
      },
      {
        "maxKg": 5,
        "value": 4645
      },
      {
        "maxKg": 5.5,
        "value": 4915
      },
      {
        "maxKg": 6,
        "value": 5185
      },
      {
        "maxKg": 6.5,
        "value": 5455
      },
      {
        "maxKg": 7,
        "value": 5725
      },
      {
        "maxKg": 7.5,
        "value": 5995
      },
      {
        "maxKg": 8,
        "value": 6265
      },
      {
        "maxKg": 8.5,
        "value": 6535
      },
      {
        "maxKg": 9,
        "value": 6805
      },
      {
        "maxKg": 9.5,
        "value": 7075
      },
      {
        "maxKg": 10,
        "value": 7345
      },
      {
        "maxKg": 11,
        "value": 7705
      },
      {
        "maxKg": 12,
        "value": 8065
      },
      {
        "maxKg": 13,
        "value": 8425
      },
      {
        "maxKg": 14,
        "value": 8785
      },
      {
        "maxKg": 15,
        "value": 9145
      },
      {
        "maxKg": 16,
        "value": 9505
      },
      {
        "maxKg": 17,
        "value": 9865
      },
      {
        "maxKg": 18,
        "value": 10225
      },
      {
        "maxKg": 19,
        "value": 10585
      },
      {
        "maxKg": 20,
        "value": 10945
      },
      {
        "maxKg": 21,
        "value": 11305
      },
      {
        "maxKg": 22,
        "value": 11665
      },
      {
        "maxKg": 23,
        "value": 12025
      },
      {
        "maxKg": 24,
        "value": 12385
      },
      {
        "maxKg": 25,
        "value": 12745
      },
      {
        "maxKg": 26,
        "value": 13105
      },
      {
        "maxKg": 27,
        "value": 13465
      },
      {
        "maxKg": 28,
        "value": 13825
      },
      {
        "maxKg": 29,
        "value": 14185
      },
      {
        "maxKg": 30,
        "value": 14545
      }
    ],
    "rzOldSea": [
      {
        "maxKg": 1,
        "value": 1520
      },
      {
        "maxKg": 2,
        "value": 1805
      },
      {
        "maxKg": 3,
        "value": 2090
      },
      {
        "maxKg": 4,
        "value": 2375
      },
      {
        "maxKg": 5,
        "value": 2660
      },
      {
        "maxKg": 6,
        "value": 2945
      },
      {
        "maxKg": 7,
        "value": 3230
      },
      {
        "maxKg": 8,
        "value": 3515
      },
      {
        "maxKg": 9,
        "value": 3800
      },
      {
        "maxKg": 10,
        "value": 4085
      },
      {
        "maxKg": 11,
        "value": 4323
      },
      {
        "maxKg": 12,
        "value": 4560
      },
      {
        "maxKg": 13,
        "value": 4798
      },
      {
        "maxKg": 14,
        "value": 5035
      },
      {
        "maxKg": 15,
        "value": 5273
      },
      {
        "maxKg": 16,
        "value": 5510
      },
      {
        "maxKg": 17,
        "value": 5725
      },
      {
        "maxKg": 18,
        "value": 5950
      },
      {
        "maxKg": 19,
        "value": 6175
      },
      {
        "maxKg": 20,
        "value": 6400
      },
      {
        "maxKg": 21,
        "value": 6625
      },
      {
        "maxKg": 22,
        "value": 6850
      },
      {
        "maxKg": 23,
        "value": 7075
      },
      {
        "maxKg": 24,
        "value": 7300
      },
      {
        "maxKg": 25,
        "value": 7525
      },
      {
        "maxKg": 26,
        "value": 7750
      },
      {
        "maxKg": 27,
        "value": 7975
      },
      {
        "maxKg": 28,
        "value": 8200
      },
      {
        "maxKg": 29,
        "value": 8425
      },
      {
        "maxKg": 30,
        "value": 8650
      }
    ],
    "xiaojuanmao": {
      "upperBoundKg": [0.5,1,1.25,1.5,1.75,2,2.5,3,3.5,4,4.5,5,5.5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
      "airJPY": [2150,2150,2950,2950,2950,2950,3650,3650,4450,4450,5150,5150,5950,5950,6650,7350,8050,8750,9450,9950,10450,10950,11450,12150,12650,13150,13650,14150,15050,15550,16050,16550,17050,17550,18050,18550,19050,19550],
      "seaJPY": [2100,2100,2500,2500,2500,2500,3200,3200,3600,3600,4000,4000,4600,4600,5000,5400,5800,6200,7000,7400,7800,8200,8600,9000,9400,9800,10200,10600,11600,12000,12400,12800,13200,13800,14200,14600,15000,15400]
    }
  }
};
