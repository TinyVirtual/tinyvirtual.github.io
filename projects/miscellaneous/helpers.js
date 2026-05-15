window.ENUM_CHARS = {
"ICON":{
"CAT":"",
"MENU":"",
"STOP":"",
"STARS":"",
"PHONE":"",
"SKIP":"",
"CLIPBOARD":"",
"BACK":"",
"REWIND":"",
"FOWARD":"",
"CONSOLE":"",
"PLAYLIST":"",
"PAUSE":"",
"PLAY":"",
"COMPUTER":"",
"GAMEPAD":"",
"CONFIG":"",
"ATTACHMENT":"",
"IMAGE":"",
"SHARE":"",
"ARROW":"",
"BOLT":"",
"ALERT":"",
"MUSICAL_NOTE":"",
"MUSICAL_NOTE_DOUBLE":"",
"BUILDING":"",
"RECORD":"",
"BOX":"",
"VSCODE":"",
"ROBLOX":"",
"MOJANG":"",
"PAW":"",
"STEAM":"",
"WINDOWS":"",
"GAMEMAKER":"",
"YOUTUBE":"",
"DISCORD":"",
"BLENDER":"",
"GOOGLEPLAYSTORE":"",
"FACEBOOK":"",
"CHROMIUM":"",
"GODOT":"",
"GOOGLEMAIL":"",
"GITHUB":"",
"INTEL":"",
"INSTAGRAM":"",
"IOS":"",
"HTML5":"",
"NETFLIX":"",
"LINUX":"",
"LINKEDIN":"",
"EDGEMICROSOFT":"",
"MICROSOFT":"",
"POWERSHELL":"",
"SONYPLAYSTATION":"",
"PAYPAL":"",
"UNITYENGINE":"",
"UBER":"",
"XBOX":"",
"TWITCH":"",
"TIKTOK":"",
"MINECRAFT":"",
"WIFI":"",
"STAR":"",
"DENIED":"",
"WIFI2":"",
"PARAMETERS":"",
"POWER":"",
"JAVASCRIPT":"",
"NAMEMC":"",
"CALENDAR":"",
"HOURGLASS":"",
"CLOCK":"",
"SPOTIFY":"",
"BIG_N":"",
"TWITTER_X":"",
"TREE":"",
"CALC":"",
"GOOGLE":"",
"CSS3":"",
"JAVA":"",
"PENCIL":"",
"LOOP":"",
"CHECKMARK":"",
"BURGER":"",
"HOUSE":"",
"NAVIGATE_BACK":"",
"LOCAL":"",
"CLOSE_X":"",
"WINDOWED":"",
"MOUSE":"",
"KEYBOARD":"",
"PERSON":"",
"Future":""},
"SYMBOL":{
"BACKSPACE":"⌫",
"KEYBOARD":"⌨",
"ARROW_R":"→",
"ARROW_L":"←",
"ARROW_U":"↑",
"ARROW_D":"↓",
"ARROW_LU":"↖",
"ARROW_RU":"↗",
"ARROW_RD":"↘",
"ARROW_LD":"↙",
"NARY_SUM":"∑",
"INTERSECTION":"∩",
"UNION":"∪",
"NOT_EQUAL":"≠",
"EQUAL_OR_GREATER":"≥",
"EQUAL_OR_LESSER":"≤",
"BOX_X":"⌧",
"OMEGA":"⍵",
"PRINTSCREEN":"⎙",
"WATCH":"⏱",
"FULLBLOCK":"█",
"TRIANGLE":"▲",
"TRIANGLE_HOLLOW":"△",
"SQUARE":"■",
"SQUARE_HOLLOW":"□",
"CIRCLE":"●",
"CIRCLE_HOLLOW":"○",
"STAR":"★",
"STAR_HOLLOW":"☆",
"SNOWMAN":"☃",
"RADIOACTIVE":"☢",
"BIOHAZZARD":"☣",
"YINGYANG":"☯",
"MUSICAL_NOTE":"♪",
"MUSICAL_NOTE_DOUBLE":"♫",
"RECICLABLE_HOLLOW":"♲",
"RECICLABLE":"♻",
"FLAG_HOLLOW":"⚐",
"FLAG":"⚑",
"MALE":"♂",
"FEMALE":"♀",
"ANDROGENOUS":"⚥",
"TRANSGENDER":"⚧"},
"STARS":[
"★",
"☆",
"⚝",
"⛤",
"⛥",
"⛦",
"⛧",
"✦",
"✧",
"✡",
"✢",
"✣",
"✤",
"✥",
"✨",
"✩",
"✪",
"✫",
"✬",
"✭",
"✮",
"✯",
"✰",
"✱",
"✲",
"✳",
"✴",
"✵",
"✶",
"✷",
"✸",
"✹",
"✺",
"✻",
"✼",
"✽",
"✾",
"✿",
"❀",
"❁",
"❂",
"❃",
"❅",
"❆",
"❇",
"❈",
"❉",
"❊",
"❋"]
};

function transform_text(text,style="fullwidth"){
  let t = [...text]

  const lookuptable = {
    letters : {
    "cursive":"𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵𝒶𝒶𝒷𝒸ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏",
    "old":"𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟",
    "italic":"𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻"
    },
    letters_nums:{
    "double":"𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡",
    "typed":"𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿",
    "bold":"𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵",
    "serif":"𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗",
    "circle":"ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ⓪①②③④⑤⑥⑦⑧⑨",
      
    }
  }
  
  const chars = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"]
  switch(style){
    case "fullwidth":
    return text.replace(/[\u0021-\u007E]/gm,(r)=>{return String.fromCharCode(r.charCodeAt(0)+0xFEE0)})
    break;
    case "double":
    case "typed":
    case "bold":
    case "serif":
    case "circle":
    let sub_chars = lookuptable.letters_nums[style];
    t.forEach((a,i)=>{
      const index = [...chars,..."0123456789"].findIndex(s=>s==a)
      if(index!=-1){
        t[i] = [...sub_chars][index]
      }
    })
    return t.join("")
    break;
    default:
    let sub_chars2 = lookuptable.letters[style]
    t.forEach((a,i)=>{
      const index = [...chars].findIndex(s=>s==a)
      if(index!=-1){
        t[i] = [...sub_chars2][index]
      }
    })
    return t.join("")
    break;
    
  }
}

function from_binary(bits,conf={}){ 
    bits = bits.replaceAll(",","").split(" ");
    //bits = bits.replace(/[_-■●]|⬛️/gmu,"1").replace(/[.□○]|⬜️/gmu,"0").replace(/[.\;,]?\s+|\s+[.\;,]?/gmu," "); /* fallback for emoji, binary morse and phone symbols */
    if(Objects.keys(conf).length){
        bits = bits.replaceAll(conf.high,"1").replaceAll(conf.low,"0").replaceAll(conf.sep," ")
    }
    bits.forEach((a,i)=>{
        bits[i] = String.fromCharCode(parseInt(a,2))
    });
    bits = bits.join(""); 
    return bits
}

function to_binary(bits,conf={}){ 
    bits = bits.split("");
    bits.forEach((a,i)=>{
        bits[i] = a.charCodeAt(0).toString(2).padStart(8,"0")
    }); 
    bits = bits.join(" "); 
    if(Objects.keys(conf).length){
        bits = bits.replaceAll(!!conf.high?conf.high:"1").replaceAll(!!conf.low?conf.low:"0").replaceAll(!!conf.sep?conf.sep:" ")
    };
    return bits
}

function elementFromXml(xml_string){
    var ret = document.createElement("div")
    ret.innerHTML = xml_string
    return ret.firstChild
}
