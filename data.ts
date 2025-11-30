import { WordItem, SentenceItem } from './types';

// Helper to create parts for sentences. 
// Note: In a real app, this might use a dictionary lookup, but for this specific PDF, 
// we map homophones manually where obvious or use the word itself.
const p = (text: string, homophone?: string) => ({ text, homophone: homophone || '' });

export const WORDS: WordItem[] = [
  // 一、人称代词
  { id: 'w1', french: 'Je', chinese: '我', ipa: '[ʒə]', homophone: '热', category: '人称代词' },
  { id: 'w2', french: 'Tu', chinese: '你', ipa: '[ty]', homophone: 'tü', category: '人称代词' },
  { id: 'w3', french: 'Vous', chinese: '您 / 你们', ipa: '[vu]', homophone: '屋', category: '人称代词' },
  { id: 'w4', french: 'Il', chinese: '他', ipa: '[il]', homophone: '移了', category: '人称代词' },
  { id: 'w5', french: 'Elle', chinese: '她', ipa: '[ɛl]', homophone: '埃勒', category: '人称代词' },
  { id: 'w6', french: 'Nous', chinese: '我们', ipa: '[nu]', homophone: '努', category: '人称代词' },
  { id: 'w7', french: 'Ils', chinese: '他们', ipa: '[il]', homophone: '一乐', category: '人称代词' },
  { id: 'w8', french: 'Elles', chinese: '她们', ipa: '[ɛl]', homophone: '埃勒', category: '人称代词' },

  // 二、日常基础词汇（出行与动作）
  { id: 'w9', french: 'le chauffeur', chinese: '司机', ipa: '[lə ʃofœʁ]', homophone: '了 手佛喝', category: '出行与动作' },
  { id: 'w10', french: 'la mine', chinese: '矿山', ipa: '[la min]', homophone: '拉 米呢', category: '出行与动作' },
  { id: 'w11', french: 'la voiture', chinese: '车', ipa: '[la vwatyʁ]', homophone: '拉 挖 tü 喝', category: '出行与动作' },
  { id: 'w12', french: 'aller', chinese: '去', ipa: '[ale]', homophone: '阿累', category: '出行与动作' },
  { id: 'w13', french: 'retourner', chinese: '返回', ipa: '[ʁətuʁne]', homophone: '喝图喝内', category: '出行与动作' },
  { id: 'w14', french: 'vouloir', chinese: '想', ipa: '[vulwaʁ]', homophone: '屋了哇喝', category: '出行与动作' },
  { id: 'w15', french: 'arrêter', chinese: '停止', ipa: '[aʁɛte]', homophone: '阿害忒', category: '出行与动作' },
  { id: 'w16', french: 'attendre', chinese: '等待', ipa: '[atɑ̃dʁ]', homophone: '阿烫的喝', category: '出行与动作' },
  { id: 'w17', french: 'monter', chinese: '上车', ipa: '[mɔ̃te]', homophone: '蒙忒', category: '出行与动作' },
  { id: 'w18', french: 'descendre', chinese: '下车', ipa: '[desɑ̃dʁ]', homophone: '得桑的喝', category: '出行与动作' },

  // 三、时间类词汇（一）
  { id: 'w19', french: 'hier', chinese: '昨天', ipa: '/jɛʁ/', homophone: '也喝', category: '时间副词' },
  { id: 'w20', french: "aujourd'hui", chinese: '今天', ipa: '/o.ʒuʁ.dɥi/', homophone: '欧如何对', category: '时间副词' },
  { id: 'w21', french: 'demain', chinese: '明天', ipa: '/də.mɛ̃/', homophone: '德曼', category: '时间副词' },
  { id: 'w22', french: 'après-demain', chinese: '后天', ipa: '/a.pʁɛ.də.mɛ̃/', homophone: '啊派德曼', category: '时间副词' },
  { id: 'w23', french: 'avant', chinese: '过去', ipa: '/a.vɑ̃/', homophone: '阿旺', category: '时间副词' },
  { id: 'w24', french: 'maintenant', chinese: '现在', ipa: '/mɛ̃.t(ə).nɑ̃/', homophone: '满特囊', category: '时间副词' },
  { id: 'w25', french: 'future', chinese: '未来', ipa: '/fy.tyʁ/', homophone: 'Fvtv 喝', category: '时间副词' },

  // 三、时间类词汇（二）早中晚
  { id: 'w26', french: 'matin', chinese: '早上', ipa: '/ma.tɛ̃/', homophone: '马坦', category: '时间段' },
  { id: 'w27', french: 'midi', chinese: '中午', ipa: '/mi.di/', homophone: '谜底', category: '时间段' },
  { id: 'w28', french: 'après-midi', chinese: '下午', ipa: '/a.pʁɛ.mi.di/', homophone: '啊派谜底', category: '时间段' },
  { id: 'w29', french: 'le soir', chinese: '晚上', ipa: '/lə swaʁ/', homophone: '斯瓦喝', category: '时间段' },
  { id: 'w30', french: 'la journée', chinese: '白天', ipa: '/la ʒuʁ.ne/', homophone: '如赫内', category: '时间段' },
  { id: 'w31', french: 'la nuit', chinese: '夜晚', ipa: '/la nɥi/', homophone: '女伊', category: '时间段' },
  { id: 'w32', french: 'le minuit', chinese: '半夜', ipa: '/lə mi.nɥi/', homophone: '米女伊', category: '时间段' },

  // 三、时间类词汇（三）动作
  { id: 'w33', french: 'en avance', chinese: '提前', ipa: '/ɑ̃.n‿ a.vɑ̃s/', homophone: '昂那旺斯', category: '时间动作' },
  { id: 'w34', french: 'retard', chinese: '滞后', ipa: '/ʁə.taʁ/', homophone: '赫塔赫', category: '时间动作' },
  { id: 'w35', french: 'ajourner', chinese: '延期', ipa: '/a.ʒuʁ.ne/', homophone: '阿如赫内', category: '时间动作' },
  { id: 'w36', french: "à l'heure", chinese: '准时', ipa: '/a lœʁ/', homophone: '拉厄赫', category: '时间动作' },

  // 三、时间类词汇（四）单位
  { id: 'w37', french: 'une semaine', chinese: '一个星期', ipa: '/yn sə.mɛn/', homophone: '瑟曼', category: '时间单位' },
  { id: 'w38', french: 'un jour', chinese: '日', ipa: '/œ̃ ʒuʁ/', homophone: '儒赫', category: '时间单位' },
  { id: 'w39', french: 'un mois', chinese: '月', ipa: '/œ̃ mwa/', homophone: '木瓦', category: '时间单位' },
  { id: 'w40', french: 'un an', chinese: '年', ipa: '/œ̃.n‿ ɑ̃/', homophone: '昂', category: '时间单位' },

  // 五、星期
  { id: 'w41', french: 'Lundi', chinese: '星期一', ipa: '[lœ̃di]', homophone: '兰迪', category: '星期' },
  { id: 'w42', french: 'Mardi', chinese: '星期二', ipa: '[maʁdi]', homophone: '马喝迪', category: '星期' },
  { id: 'w43', french: 'Mercredi', chinese: '星期三', ipa: '[mɛʁkʁədi]', homophone: '麦喝克赫迪', category: '星期' },
  { id: 'w44', french: 'Jeudi', chinese: '星期四', ipa: '[ʒødi]', homophone: '惹迪', category: '星期' },
  { id: 'w45', french: 'Vendredi', chinese: '星期五', ipa: '[vɑ̃dʁədi]', homophone: '旺德赫迪', category: '星期' },
  { id: 'w46', french: 'Samedi', chinese: '星期六', ipa: '[samədi]', homophone: '萨么迪', category: '星期' },
  { id: 'w47', french: 'Dimanche', chinese: '星期天', ipa: '[dimɑ̃ʃ]', homophone: '迪芒什', category: '星期' },

  // 六、月份
  { id: 'w48', french: 'janvier', chinese: '一月', ipa: '[ʒɑ̃vje]', homophone: '让维耶', category: '月份' },
  { id: 'w49', french: 'février', chinese: '二月', ipa: '[fevʁije]', homophone: '费屋hi夜', category: '月份' },
  { id: 'w50', french: 'mars', chinese: '三月', ipa: '[maʁs]', homophone: '马喝斯', category: '月份' },
  { id: 'w51', french: 'avril', chinese: '四月', ipa: '[avʁil]', homophone: '阿屋hi勒', category: '月份' },
  { id: 'w52', french: 'mai', chinese: '五月', ipa: '[mɛ]', homophone: '迈', category: '月份' },
  { id: 'w53', french: 'juin', chinese: '六月', ipa: '[ʒɥɛ̃]', homophone: '瑞安', category: '月份' },
  { id: 'w54', french: 'juillet', chinese: '七月', ipa: '[ʒɥijɛ]', homophone: '瑞耶', category: '月份' },
  { id: 'w55', french: 'août', chinese: '八月', ipa: '[ut]', homophone: '乌特', category: '月份' },
  { id: 'w56', french: 'septembre', chinese: '九月', ipa: '[sɛptɑ̃bʁ]', homophone: '塞普唐布喝', category: '月份' },
  { id: 'w57', french: 'octobre', chinese: '十月', ipa: '[ɔktɔbʁ]', homophone: '奥克涛布喝', category: '月份' },
  { id: 'w58', french: 'novembre', chinese: '十一月', ipa: '[nɔvɑ̃bʁ]', homophone: '脑汪不喝', category: '月份' },
  { id: 'w59', french: 'décembre', chinese: '十二月', ipa: '[desɑ̃bʁ]', homophone: '得桑布喝', category: '月份' },

  // 七、数字 (Samples)
  { id: 'w60', french: 'un/une', chinese: '1', ipa: '[œ̃]/[yn]', homophone: '安/与呢', category: '数字' },
  { id: 'w61', french: 'deux', chinese: '2', ipa: '[dø]', homophone: '德', category: '数字' },
  { id: 'w62', french: 'trois', chinese: '3', ipa: '[tʁwɑ]', homophone: '特瓦', category: '数字' },
  { id: 'w63', french: 'quatre', chinese: '4', ipa: '[katʁ]', homophone: '卡特赫', category: '数字' },
  { id: 'w64', french: 'cinq', chinese: '5', ipa: '[sɛ̃k]', homophone: '三克', category: '数字' },
  { id: 'w65', french: 'six', chinese: '6', ipa: '[sis]', homophone: 'Si 斯', category: '数字' },
  { id: 'w66', french: 'sept', chinese: '7', ipa: '[sɛt]', homophone: '塞特', category: '数字' },
  { id: 'w67', french: 'huit', chinese: '8', ipa: '[ɥit]', homophone: '于伊特', category: '数字' },
  { id: 'w68', french: 'neuf', chinese: '9', ipa: '[nœf]', homophone: '呢额夫', category: '数字' },
  { id: 'w69', french: 'dix', chinese: '10', ipa: '[dis]', homophone: '迪斯', category: '数字' },
  { id: 'w70', french: 'onze', chinese: '11', ipa: '[ɔ̃z]', homophone: '翁兹', category: '数字' },
  { id: 'w71', french: 'douze', chinese: '12', ipa: '[duz]', homophone: '杜兹', category: '数字' },
  { id: 'w72', french: 'vingt', chinese: '20', ipa: '[vɛ̃]', homophone: '万', category: '数字' },
];

export const SENTENCES: SentenceItem[] = [
  // 核心句型 - Pronouns
  { 
    id: 's1', 
    french: 'Tu vas où?', 
    chinese: '你要去哪里？', 
    parts: [p('Tu','tü'), p('vas','瓦'), p('où','乌')],
    category: '核心句型'
  },
  { 
    id: 's2', 
    french: 'Moi aussi.', 
    chinese: '我也是。', 
    parts: [p('Moi','木瓦'), p('aussi','奥斯')],
    category: '核心句型'
  },
  {
    id: 's3',
    french: "C'est bien.",
    chinese: '那挺好。',
    parts: [p("C'est", "色"), p("bien", "逼昂")],
    category: '核心句型'
  },
  
  // 核心句型 - Transport
  {
    id: 's4',
    french: 'Bonjour, chauffeur.',
    chinese: '司机师傅，您好。',
    parts: [p('Bonjour', '崩如'), p('chauffeur', '手佛喝')],
    category: '核心句型'
  },
  {
    id: 's5',
    french: 'Je veux aller à la mine.',
    chinese: '我想去矿山。',
    parts: [p('Je', '热'), p('veux', '屋'), p('aller', '阿累'), p('à', '阿'), p('la', '拉'), p('mine', '米呢')],
    category: '核心句型'
  },
  {
    id: 's6',
    french: 'Montez dans la voiture.',
    chinese: '请上车。',
    parts: [p('Montez', '蒙忒'), p('dans', '当'), p('la', '拉'), p('voiture', '挖tü喝')],
    category: '核心句型'
  },
  
  // Time
  {
    id: 's7',
    french: "Hier, j'ai travaillé.",
    chinese: '昨天我工作了。',
    parts: [p('Hier', '也喝'), p("j'ai", "热"), p('travaillé', '特拉瓦耶')],
    category: '核心句型'
  },
  {
    id: 's8',
    french: 'Demain, je vais au bureau.',
    chinese: '明天我要去办公室。',
    parts: [p('Demain', '德曼'), p('je', '热'), p('vais', '韦'), p('au', '欧'), p('bureau', '比罗')],
    category: '核心句型'
  },
  {
    id: 's9',
    french: 'Maintenant, je repose.',
    chinese: '现在我在休息。',
    parts: [p('Maintenant', '满特囊'), p('je', '热'), p('repose', '喝跑兹')],
    category: '核心句型'
  },
  
  // Advanced Time
  {
    id: 's10',
    french: 'Matin, je suis allé au port.',
    chinese: '早上我去了港口。',
    parts: [p('Matin', '马坦'), p('je', '热'), p('suis', '随'), p('allé', '阿累'), p('au', '欧'), p('port', '跑喝')],
    category: '核心句型'
  },
  {
    id: 's11',
    french: 'Si on travaille vite, on peut finir en avance.',
    chinese: '如果我们干得快，就能提前完成。',
    parts: [p('Si','Si'), p('on','翁'), p('travaille','特拉瓦耶'), p('vite','V特'), p('on','翁'), p('peut','普'), p('finir','费尼喝'), p('en','昂'), p('avance','阿旺斯')],
    category: '核心句型'
  },
  {
    id: 's12',
    french: 'Il a cinq crayons dans son sac.',
    chinese: '他书包里有五支铅笔。',
    parts: [p('Il','移了'), p('a','阿'), p('cinq','三克'), p('crayons','克黑翁'), p('dans','当'), p('son','松'), p('sac','萨克')],
    category: '核心句型'
  }
];
