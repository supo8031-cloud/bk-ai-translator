import { TextToSpeech } from '@capacitor-community/text-to-speech';

const languages=[
["auto","အလိုအလျောက်သိရှိရန်",""],["my","မြန်မာ","my-MM"],["en","English","en-US"],["th","ไทย","th-TH"],["zh-CN","中文简体","zh-CN"],["zh-TW","中文繁體","zh-TW"],["ja","日本語","ja-JP"],["ko","한국어","ko-KR"],["vi","Tiếng Việt","vi-VN"],["km","ខ្មែរ","km-KH"],["lo","ລາວ","lo-LA"],["ms","Melayu","ms-MY"],["id","Indonesia","id-ID"],["tl","Filipino","fil-PH"],["hi","हिन्दी","hi-IN"],["bn","বাংলা","bn-BD"],["ur","اردو","ur-PK"],["ar","العربية","ar-SA"],["fa","فارسی","fa-IR"],["tr","Türkçe","tr-TR"],["fr","Français","fr-FR"],["de","Deutsch","de-DE"],["es","Español","es-ES"],["pt","Português","pt-PT"],["it","Italiano","it-IT"],["ru","Русский","ru-RU"],["uk","Українська","uk-UA"],["nl","Nederlands","nl-NL"],["pl","Polski","pl-PL"],["sv","Svenska","sv-SE"],["no","Norsk","no-NO"],["da","Dansk","da-DK"],["fi","Suomi","fi-FI"],["el","Ελληνικά","el-GR"],["he","עברית","he-IL"],["ne","नेपाली","ne-NP"],["si","සිංහල","si-LK"],["ta","தமிழ்","ta-IN"],["te","తెలుగు","te-IN"],["ml","മലയാളം","ml-IN"],["mr","मराठी","mr-IN"],["gu","ગુજરાતી","gu-IN"],["pa","ਪੰਜਾਬੀ","pa-IN"],["sw","Kiswahili","sw-KE"],["af","Afrikaans","af-ZA"],["am","አማርኛ","am-ET"],["az","Azərbaycanca","az-AZ"],["bg","Български","bg-BG"],["ca","Català","ca-ES"],["hr","Hrvatski","hr-HR"],["cs","Čeština","cs-CZ"],["et","Eesti","et-EE"],["hu","Magyar","hu-HU"],["is","Íslenska","is-IS"],["lt","Lietuvių","lt-LT"],["lv","Latviešu","lv-LV"],["ro","Română","ro-RO"],["sk","Slovenčina","sk-SK"],["sl","Slovenščina","sl-SI"],["sr","Српски","sr-RS"],["sq","Shqip","sq-AL"],["be","Беларуская","be-BY"],["bs","Bosanski","bs-BA"],["mk","Македонски","mk-MK"],["hy","Հայերեն","hy-AM"],["ka","ქართული","ka-GE"],["kk","Қазақша","kk-KZ"],["uz","Oʻzbekcha","uz-UZ"],["mn","Монгол","mn-MN"],["ps","پښتو","ps-AF"],["so","Soomaali","so-SO"],["yo","Yorùbá","yo-NG"],["zu","isiZulu","zu-ZA"],["xh","isiXhosa","xh-ZA"],["ga","Gaeilge","ga-IE"],["cy","Cymraeg","cy-GB"],["eu","Euskara","eu-ES"],["gl","Galego","gl-ES"],["la","Latina","la"],["eo","Esperanto","eo"],["ht","Kreyòl ayisyen","ht-HT"],["yi","ייִדיש","yi"],["mt","Malti","mt-MT"],["lb","Lëtzebuergesch","lb-LU"],["haw","ʻŌlelo Hawaiʻi","haw-US"],["mi","Māori","mi-NZ"],["ny","Chichewa","ny-MW"],["rw","Kinyarwanda","rw-RW"],["mg","Malagasy","mg-MG"],["ceb","Cebuano","ceb-PH"],["jv","Basa Jawa","jv-ID"],["su","Basa Sunda","su-ID"],["ku","Kurdî","ku"],["tk","Türkmençe","tk-TM"],["ky","Кыргызча","ky-KG"],["tg","Тоҷикӣ","tg-TJ"],["tt","Татарча","tt-RU"],["ug","ئۇيغۇرچە","ug-CN"],["br","Brezhoneg","br-FR"],["co","Corsu","co-FR"],["fy","Frysk","fy-NL"],["gd","Gàidhlig","gd-GB"]
];
const from=document.querySelector("#from"),to=document.querySelector("#to"),source=document.querySelector("#source"),result=document.querySelector("#result"),status=document.querySelector("#status");
for(const [code,name] of languages){for(const s of [from,to]){const o=document.createElement("option");o.value=code;o.textContent=name;s.append(o)}}
from.value="my";to.value="en";
function lang(code){return languages.find(x=>x[0]===code)?.[2]||code}
function updatePair(){document.querySelector("#pair").textContent=from.value+" → "+to.value}
from.onchange=to.onchange=updatePair;updatePair();
document.querySelector("#swap").onclick=()=>{if(from.value==="auto")return;const x=from.value;from.value=to.value;to.value=x;updatePair()};
document.querySelector("#clear").onclick=()=>{source.value="";result.textContent="ရလဒ် ဒီနေရာမှာ ပေါ်လာပါမယ်။";status.textContent=""};
document.querySelector("#translate").onclick=async()=>{const q=source.value.trim();if(!q){status.textContent="စာအရင်ထည့်ပေးပါ။";return}if(from.value===to.value){status.textContent="ဘာသာစကားနှစ်ခု မတူရပါ။";return}
status.textContent="ဘာသာပြန်နေပါတယ်...";document.querySelector("#translate").disabled=true;
try{const sl=from.value==="auto"?"autodetect":from.value;const url="https://api.mymemory.translated.net/get?q="+encodeURIComponent(q)+"&langpair="+encodeURIComponent(sl+"|"+to.value);const res=await fetch(url);if(!res.ok)throw Error("Network error");const data=await res.json();if(data.responseStatus!==200)throw Error(data.responseDetails||"Translation unavailable");result.textContent=data.responseData.translatedText||"ဘာသာပြန်မရပါ";status.textContent="ပြီးပါပြီ။"}catch(e){status.textContent="ဘာသာပြန်မရပါ။ Internet စစ်ပြီး ထပ်ကြိုးစားပါ။";}finally{document.querySelector("#translate").disabled=false}};
document.querySelector("#copy").onclick=async()=>{try{await navigator.clipboard.writeText(result.textContent);status.textContent="ကူးယူပြီးပါပြီ။"}catch(e){status.textContent="ကူးယူ၍မရပါ။"}};
const voiceSelect=document.querySelector("#voice");
let nativeVoices=[];
async function loadVoices(){
 try {
  if(window.Capacitor?.isNativePlatform?.()){
   const data=await TextToSpeech.getSupportedVoices(); nativeVoices=data.voices||[];
   voiceSelect.innerHTML='<option value="">ဖုန်း၏ မူလအသံ</option>';
   nativeVoices.forEach((v,i)=>{const o=document.createElement("option");o.value=String(i);o.textContent=v.name+" ("+v.lang+")";voiceSelect.append(o)});
  } else if("speechSynthesis" in window){
   const voices=speechSynthesis.getVoices();voiceSelect.innerHTML='<option value="">ဖုန်း၏ မူလအသံ</option>';
   voices.forEach((v,i)=>{const o=document.createElement("option");o.value=String(i);o.textContent=v.name+" ("+v.lang+")";voiceSelect.append(o)});
  }
 }catch(e){status.textContent="ဖုန်းအသံစာရင်း မရရှိပါ။";}
}
if("speechSynthesis" in window)speechSynthesis.onvoiceschanged=()=>{if(!window.Capacitor?.isNativePlatform?.())loadVoices()};
loadVoices();
document.querySelector("#speak").onclick=async()=>{
 const text=result.textContent.trim();if(!text||text==="ရလဒ် ဒီနေရာမှာ ပေါ်လာပါမယ်။"){status.textContent="ဖတ်စရာစာသား မရှိသေးပါ။";return}
 const language=lang(to.value)||"en-US",rate=Number(document.querySelector("#rate").value);
 try{
  if(window.Capacitor?.isNativePlatform?.()){
   const chosen=voiceSelect.value===""?undefined:Number(voiceSelect.value);
   await TextToSpeech.speak({text,lang:language,rate,pitch:1,volume:1,voice:chosen});
   status.textContent="အသံဖတ်ရန် အမိန့်ပေးပြီးပါပြီ။";
  }else if("speechSynthesis"in window){
   speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang=language;u.rate=rate;
   if(voiceSelect.value!==""){const v=speechSynthesis.getVoices()[Number(voiceSelect.value)];if(v)u.voice=v}
   u.onstart=()=>status.textContent="အသံဖတ်နေပါတယ်...";u.onend=()=>status.textContent="အသံဖတ်ပြီးပါပြီ။";u.onerror=()=>status.textContent="အသံဖတ်မရပါ။ ဖုန်း TTS ကို စစ်ပါ။";speechSynthesis.speak(u);
  }else status.textContent="ဒီဖုန်းမှာ အသံဖတ်စနစ် မရနိုင်ပါ။";
 }catch(e){status.textContent="အသံဖတ်မရပါ။ Android Text-to-Speech ကို ဖွင့်ပြီး English voice ထည့်သွင်းပါ။";}
};
document.querySelector("#pause").onclick=()=>{if("speechSynthesis"in window&&!window.Capacitor?.isNativePlatform?.()){if(speechSynthesis.speaking){if(speechSynthesis.paused)speechSynthesis.resume();else speechSynthesis.pause()}}else status.textContent="Native အသံဖတ်စနစ်မှာ ခဏရပ်ရန် မရသေးပါ။"};
document.querySelector("#stop").onclick=async()=>{try{if(window.Capacitor?.isNativePlatform?.())await TextToSpeech.stop();else if("speechSynthesis"in window)speechSynthesis.cancel();status.textContent="အသံရပ်လိုက်ပါပြီ။"}catch(e){status.textContent="အသံရပ်မရပါ။"}};
document.querySelector("#mic").onclick=()=>{const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR){status.textContent="အသံထည့်သွင်းမှုကို ဒီ Android WebView က မပံ့ပိုးသေးပါ။ Keyboard microphone ကို အသုံးပြုနိုင်ပါတယ်။";return}const rec=new SR();rec.lang=lang(from.value==="auto"?"my":from.value)||"en-US";rec.interimResults=false;rec.onstart=()=>status.textContent="နားထောင်နေပါတယ်...";rec.onerror=()=>status.textContent="Microphone ခွင့်ပြုချက် သို့မဟုတ် ဘာသာစကားကို စစ်ဆေးပါ။";rec.onresult=e=>{source.value=e.results[0][0].transcript;status.textContent="အသံကို စာသားပြောင်းပြီးပါပြီ။"};rec.start()};
