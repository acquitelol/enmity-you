function b(n){window.enmity.plugins.registerPlugin(n)}function u(...n){return window.enmity.modules.getByProps(...n)}function h(...n){return window.enmity.modules.getByName(...n)}window.enmity.modules.common;function v(n){return window.enmity.patcher.create(n)}var F="EnmityYou",C="1.1.9",O="Allows you to use Enmity inside of the new You Tab. Enable from DevTools Widget \u279D Design Toggles :3",_=[{name:"Rosie<3",id:"581573474296791211"}],G="#ff91ff",S={name:F,version:C,description:O,authors:_,color:G};window.enmity.modules.common.Constants,window.enmity.modules.common.Clipboard,window.enmity.modules.common.Assets,window.enmity.modules.common.Messages,window.enmity.modules.common.Clyde,window.enmity.modules.common.Avatars,window.enmity.modules.common.Native;const c=window.enmity.modules.common.React;window.enmity.modules.common.Dispatcher,window.enmity.modules.common.Storage,window.enmity.modules.common.Toasts,window.enmity.modules.common.Dialog,window.enmity.modules.common.Token,window.enmity.modules.common.REST,window.enmity.modules.common.Settings,window.enmity.modules.common.Users,window.enmity.modules.common.Navigation,window.enmity.modules.common.NavigationNative,window.enmity.modules.common.NavigationStack,window.enmity.modules.common.Theme,window.enmity.modules.common.Linking,window.enmity.modules.common.StyleSheet,window.enmity.modules.common.ColorMap,window.enmity.modules.common.Components;const L=window.enmity.modules.common.Locale;window.enmity.modules.common.Profiles,window.enmity.modules.common.Lodash,window.enmity.modules.common.Logger,window.enmity.modules.common.Flux,window.enmity.modules.common.SVG,window.enmity.modules.common.Scenes,window.enmity.modules.common.Moment;const{components:e}=window.enmity;e.Alert,e.Button,e.FlatList,e.Image,e.ImageBackground,e.KeyboardAvoidingView,e.Modal,e.Pressable,e.RefreshControl,e.ScrollView,e.SectionList,e.StatusBar,e.StyleSheet,e.Switch,e.Text,e.TextInput,e.TouchableHighlight,e.TouchableOpacity,e.TouchableWithoutFeedback,e.Touchable;const E=e.View;e.VirtualizedList,e.Form,e.FormArrow,e.FormCTA,e.FormCTAButton,e.FormCardSection,e.FormCheckbox,e.FormDivider,e.FormHint,e.FormIcon,e.FormInput,e.FormLabel,e.FormRadio,e.FormRow,e.FormSection,e.FormSelect,e.FormSubLabel,e.FormSwitch,e.FormTernaryCheckBox,e.FormText,e.FormTextColors,e.FormTextSizes;function T(n){return window.enmity.assets.getIDByName(n)}const g={general:"ENMITY",plugins:"ENMITY_PLUGINS",themes:"ENMITY_THEMES",page:"ENMITY_PAGE"},w={general:"Enmity",plugins:"EnmityPlugins",themes:"EnmityThemes",page:"EnmityCustomPage"},P={general:"General",plugins:"Plugins",themes:"Themes",page:"Page"},D={general:{uri:"https://files.enmity.app/icon-64.png"},plugins:T("ic_activity_24px"),themes:T("img_nitro_star"),page:null},A={general:[w.general],plugins:[w.general],themes:[w.general],page:[]},f={general:null,plugins:g.general,themes:g.general,page:null},m=Object.keys(w).map(n=>({[n]:{upper:g[n],route:w[n],title:P[n],icon:D[n],relationship:f[n],breadcrumbs:A[n]}})).reduce((n,a)=>({...n,...a}),{}),x=h("getScreens"),k=u("SETTING_RENDERER_CONFIGS");var B=()=>{const{Enmity:n,EnmityPlugins:a,EnmityThemes:l}=x({}),[r,s]=[a,l].map(t=>({navigation:o,route:i})=>(c.useEffect(()=>{i!=null&&i.hasSetHeaderRight||(i.hasSetHeaderRight=!0,o.setOptions({headerRight:()=>t.headerRight?c.createElement(E,{style:{left:12}},c.createElement(t.headerRight,null)):null}))},[]),c.createElement(t.render,null)));Object.assign(k.SETTING_RENDERER_CONFIGS,Object.entries({general:{route:m.general.route,getComponent:()=>n.render},plugins:{route:m.plugins.route,getComponent:()=>r},themes:{route:m.themes.route,getComponent:()=>s},page:{route:m.page.route,getComponent:()=>({navigation:t,route:{params:o}})=>{var i;const d=(i=o.pagePanel)!=null?i:E;return c.useEffect(()=>{o.pageName&&!o.hasSetTitle&&(o.hasSetTitle=!0,t.setOptions({title:o.pageName}))},[]),c.createElement(d,null)}}}).map(([t,o])=>({[m[t].upper]:{type:"route",icon:m[t].icon,screen:o}})).reduce((t,o)=>({...t,...o}),{}))};const j=u("getSettingTitleConfig");var M=n=>{n.after(j,"getSettingTitleConfig",(a,l,r)=>{const s=Object.keys(m).map(t=>({[m[t].upper]:m[t].title})).reduce((t,o)=>({...t,...o}),{});return{...r,...s}})};const H=u("SETTING_RENDERER_CONFIGS");var U=()=>{Object.assign(H.SETTING_RELATIONSHIPS,Object.keys(f).map(n=>({[m[n].upper]:m[n].relationship})).reduce((n,a)=>({...n,...a}),{}))};function V(n,a,l){return window.enmity.utilities.findInReactTree(n,a,l)}const Y=h("SettingsOverviewScreen",{default:!1});var $=n=>{n.after(Y,"default",(a,l,r)=>{const{sections:s}=V(r,i=>i.sections),t=s.findIndex(i=>i==null?void 0:i.settings.find(d=>d==="ACCOUNT"));!s.find(i=>i.title===m.general.route)&&(s==null||s.splice(t===-1?1:t+1,0,{title:m.general.route,settings:[m.general.upper,m.plugins.upper,m.themes.upper]}));const o=s.findIndex(i=>i.title===L.Messages.SUPPORT);s[o].settings=s[o].settings.filter(i=>i!=="UPLOAD_DEBUG_LOGS")})};const z=u("useSettingSearch"),W=u("getSettingSearchListItems"),K=u("SETTING_RENDERER_CONFIGS");var q=n=>{n.after(z,"useSettingSearch",(a,l,r)=>{r.results=r.results.filter(s=>!Object.values(g).includes(s)),Object.keys(m).filter(s=>s!=="page").forEach(s=>{const{route:t,upper:o}=m[s];t.toLowerCase().includes(r.text.toLowerCase())&&!r.results.find(i=>i===o)&&r.results.unshift(o)})}),n.after(W,"getSettingSearchListItems",(a,l,r)=>{const[s]=l[0];return r=r.filter(t=>!Object.values(g).includes(t.setting)),Object.keys(m).filter(t=>t!=="page").reverse().forEach(t=>{const{upper:o,title:i,breadcrumbs:d,icon:N}=m[t];s.includes(o)&&(r.unshift({type:"setting_search_result",ancestorRendererData:K.SETTING_RENDERER_CONFIGS[o],setting:o,title:i,breadcrumbs:d,icon:N}),r.map((y,I,R)=>(y.index=I,y.total=R.length,y)))}),r})};const p=v(S.name),J=(...n)=>n.forEach(a=>u(a)[a]={...u(a)[a]}),Q={...S,onStart(){J("SETTING_RENDERER_CONFIGS","SETTING_RELATIONSHIPS"),M(p),$(p),q(p),B(),U()},onStop(){p.unpatchAll()}};b(Q);
