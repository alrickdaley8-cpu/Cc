(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ra="174",ch=0,Fa=1,hh=2,nc=1,ic=2,Rn=3,Yn=0,Oe=1,Se=2,Wn=0,Fi=1,lo=2,Ba=3,Oa=4,dh=5,oi=100,uh=101,fh=102,ph=103,mh=104,gh=200,_h=201,vh=202,yh=203,co=204,ho=205,xh=206,Mh=207,wh=208,Sh=209,bh=210,Eh=211,Th=212,Ah=213,Ch=214,uo=0,fo=1,po=2,zi=3,mo=4,go=5,_o=6,vo=7,oa=0,Rh=1,Ih=2,Xn=0,Ph=1,Lh=2,Dh=3,sc=4,Uh=5,Nh=6,kh=7,rc=300,Hi=301,Gi=302,yo=303,xo=304,mr=306,ps=1e3,Pn=1001,Mo=1002,$e=1003,Fh=1004,xs=1005,sn=1006,Sr=1007,li=1008,Un=1009,oc=1010,ac=1011,ms=1012,aa=1013,hi=1014,_n=1015,gs=1016,la=1017,ca=1018,Vi=1020,lc=35902,cc=1021,hc=1022,rn=1023,dc=1024,uc=1025,Bi=1026,Wi=1027,ha=1028,da=1029,fc=1030,ua=1031,fa=1033,Zs=33776,Js=33777,Qs=33778,tr=33779,wo=35840,So=35841,bo=35842,Eo=35843,To=36196,Ao=37492,Co=37496,Ro=37808,Io=37809,Po=37810,Lo=37811,Do=37812,Uo=37813,No=37814,ko=37815,Fo=37816,Bo=37817,Oo=37818,zo=37819,Ho=37820,Go=37821,er=36492,Vo=36494,Wo=36495,pc=36283,Xo=36284,qo=36285,Yo=36286,Bh=3200,Oh=3201,pa=0,zh=1,Vn="",Xe="srgb",Xi="srgb-linear",lr="linear",se="srgb",mi=7680,za=519,Hh=512,Gh=513,Vh=514,mc=515,Wh=516,Xh=517,qh=518,Yh=519,$o=35044,Ha="300 es",Ln=2e3,cr=2001;class Yi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const i=n[t];if(i!==void 0){const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,t);t.target=null}}}const Ie=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],br=Math.PI/180,jo=180/Math.PI;function qn(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ie[s&255]+Ie[s>>8&255]+Ie[s>>16&255]+Ie[s>>24&255]+"-"+Ie[t&255]+Ie[t>>8&255]+"-"+Ie[t>>16&15|64]+Ie[t>>24&255]+"-"+Ie[e&63|128]+Ie[e>>8&255]+"-"+Ie[e>>16&255]+Ie[e>>24&255]+Ie[n&255]+Ie[n>>8&255]+Ie[n>>16&255]+Ie[n>>24&255]).toLowerCase()}function Ht(s,t,e){return Math.max(t,Math.min(e,s))}function $h(s,t){return(s%t+t)%t}function Er(s,t,e){return(1-e)*s+e*t}function gn(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function re(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}class Lt{constructor(t=0,e=0){Lt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Ht(this.x,t.x,e.x),this.y=Ht(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Ht(this.x,t,e),this.y=Ht(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ht(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ht(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*i+t.x,this.y=r*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Nt{constructor(t,e,n,i,r,o,a,l,c){Nt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,l,c)}set(t,e,n,i,r,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],p=n[5],g=n[8],_=i[0],m=i[3],f=i[6],S=i[1],b=i[4],x=i[7],C=i[2],E=i[5],A=i[8];return r[0]=o*_+a*S+l*C,r[3]=o*m+a*b+l*E,r[6]=o*f+a*x+l*A,r[1]=c*_+h*S+d*C,r[4]=c*m+h*b+d*E,r[7]=c*f+h*x+d*A,r[2]=u*_+p*S+g*C,r[5]=u*m+p*b+g*E,r[8]=u*f+p*x+g*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+i*r*c-i*o*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],d=h*o-a*c,u=a*l-h*r,p=c*r-o*l,g=e*d+n*u+i*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=d*_,t[1]=(i*c-h*n)*_,t[2]=(a*n-i*o)*_,t[3]=u*_,t[4]=(h*e-i*l)*_,t[5]=(i*r-a*e)*_,t[6]=p*_,t[7]=(n*l-c*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-i*c,i*l,-i*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Tr.makeScale(t,e)),this}rotate(t){return this.premultiply(Tr.makeRotation(-t)),this}translate(t,e){return this.premultiply(Tr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Tr=new Nt;function gc(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function hr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function jh(){const s=hr("canvas");return s.style.display="block",s}const Ga={};function ii(s){s in Ga||(Ga[s]=!0,console.warn(s))}function Kh(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function Zh(s){const t=s.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Jh(s){const t=s.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Va=new Nt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Wa=new Nt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Qh(){const s={enabled:!0,workingColorSpace:Xi,spaces:{},convert:function(i,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===se&&(i.r=Dn(i.r),i.g=Dn(i.g),i.b=Dn(i.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===se&&(i.r=Oi(i.r),i.g=Oi(i.g),i.b=Oi(i.b))),i},fromWorkingColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},toWorkingColorSpace:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Vn?lr:this.spaces[i].transfer},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,o){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[Xi]:{primaries:t,whitePoint:n,transfer:lr,toXYZ:Va,fromXYZ:Wa,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Xe},outputColorSpaceConfig:{drawingBufferColorSpace:Xe}},[Xe]:{primaries:t,whitePoint:n,transfer:se,toXYZ:Va,fromXYZ:Wa,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Xe}}}),s}const Zt=Qh();function Dn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Oi(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let gi;class td{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{gi===void 0&&(gi=hr("canvas")),gi.width=t.width,gi.height=t.height;const n=gi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=gi}return e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=hr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=Dn(r[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Dn(e[n]/255)*255):e[n]=Dn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let ed=0;class ma{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ed++}),this.uuid=qn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(Ar(i[o].image)):r.push(Ar(i[o]))}else r=Ar(i);n.url=r}return e||(t.images[this.uuid]=n),n}}function Ar(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?td.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let nd=0;class Ne extends Yi{constructor(t=Ne.DEFAULT_IMAGE,e=Ne.DEFAULT_MAPPING,n=Pn,i=Pn,r=sn,o=li,a=rn,l=Un,c=Ne.DEFAULT_ANISOTROPY,h=Vn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:nd++}),this.uuid=qn(),this.name="",this.source=new ma(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Lt(0,0),this.repeat=new Lt(1,1),this.center=new Lt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Nt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==rc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ps:t.x=t.x-Math.floor(t.x);break;case Pn:t.x=t.x<0?0:1;break;case Mo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ps:t.y=t.y-Math.floor(t.y);break;case Pn:t.y=t.y<0?0:1;break;case Mo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ne.DEFAULT_IMAGE=null;Ne.DEFAULT_MAPPING=rc;Ne.DEFAULT_ANISOTROPY=1;class oe{constructor(t=0,e=0,n=0,i=1){oe.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r;const l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],p=l[5],g=l[9],_=l[2],m=l[6],f=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const b=(c+1)/2,x=(p+1)/2,C=(f+1)/2,E=(h+u)/4,A=(d+_)/4,I=(g+m)/4;return b>x&&b>C?b<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(b),i=E/n,r=A/n):x>C?x<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(x),n=E/i,r=I/i):C<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(C),n=A/r,i=I/r),this.set(n,i,r,e),this}let S=Math.sqrt((m-g)*(m-g)+(d-_)*(d-_)+(u-h)*(u-h));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(d-_)/S,this.z=(u-h)/S,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Ht(this.x,t.x,e.x),this.y=Ht(this.y,t.y,e.y),this.z=Ht(this.z,t.z,e.z),this.w=Ht(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Ht(this.x,t,e),this.y=Ht(this.y,t,e),this.z=Ht(this.z,t,e),this.w=Ht(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ht(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class id extends Yi{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new oe(0,0,t,e),this.scissorTest=!1,this.viewport=new oe(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:sn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Ne(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const i=Object.assign({},t.textures[e].image);this.textures[e].source=new ma(i)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class di extends id{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class _c extends Ne{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=$e,this.minFilter=$e,this.wrapR=Pn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class sd extends Ne{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=$e,this.minFilter=$e,this.wrapR=Pn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class _s{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],d=n[i+3];const u=r[o+0],p=r[o+1],g=r[o+2],_=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d;return}if(a===1){t[e+0]=u,t[e+1]=p,t[e+2]=g,t[e+3]=_;return}if(d!==_||l!==u||c!==p||h!==g){let m=1-a;const f=l*u+c*p+h*g+d*_,S=f>=0?1:-1,b=1-f*f;if(b>Number.EPSILON){const C=Math.sqrt(b),E=Math.atan2(C,f*S);m=Math.sin(m*E)/C,a=Math.sin(a*E)/C}const x=a*S;if(l=l*m+u*x,c=c*m+p*x,h=h*m+g*x,d=d*m+_*x,m===1-a){const C=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=C,c*=C,h*=C,d*=C}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,i,r,o){const a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],d=r[o],u=r[o+1],p=r[o+2],g=r[o+3];return t[e]=a*g+h*d+l*p-c*u,t[e+1]=l*g+h*u+c*d-a*p,t[e+2]=c*g+h*p+a*u-l*d,t[e+3]=h*g-a*d-l*u-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),d=a(r/2),u=l(n/2),p=l(i/2),g=l(r/2);switch(o){case"XYZ":this._x=u*h*d+c*p*g,this._y=c*p*d-u*h*g,this._z=c*h*g+u*p*d,this._w=c*h*d-u*p*g;break;case"YXZ":this._x=u*h*d+c*p*g,this._y=c*p*d-u*h*g,this._z=c*h*g-u*p*d,this._w=c*h*d+u*p*g;break;case"ZXY":this._x=u*h*d-c*p*g,this._y=c*p*d+u*h*g,this._z=c*h*g+u*p*d,this._w=c*h*d-u*p*g;break;case"ZYX":this._x=u*h*d-c*p*g,this._y=c*p*d+u*h*g,this._z=c*h*g-u*p*d,this._w=c*h*d+u*p*g;break;case"YZX":this._x=u*h*d+c*p*g,this._y=c*p*d+u*h*g,this._z=c*h*g-u*p*d,this._w=c*h*d-u*p*g;break;case"XZY":this._x=u*h*d-c*p*g,this._y=c*p*d-u*h*g,this._z=c*h*g+u*p*d,this._w=c*h*d+u*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=n+a+d;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(h-l)*p,this._y=(r-c)*p,this._z=(o-i)*p}else if(n>a&&n>d){const p=2*Math.sqrt(1+n-a-d);this._w=(h-l)/p,this._x=.25*p,this._y=(i+o)/p,this._z=(r+c)/p}else if(a>d){const p=2*Math.sqrt(1+a-n-d);this._w=(r-c)/p,this._x=(i+o)/p,this._y=.25*p,this._z=(l+h)/p}else{const p=2*Math.sqrt(1+d-n-a);this._w=(o-i)/p,this._x=(r+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ht(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+i*c-r*l,this._y=i*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+i*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-e;return this._w=p*o+e*this._w,this._x=p*n+e*this._x,this._y=p*i+e*this._y,this._z=p*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),d=Math.sin((1-e)*h)/c,u=Math.sin(e*h)/c;return this._w=o*d+this._w*u,this._x=n*d+this._x*u,this._y=i*d+this._y*u,this._z=r*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(t=0,e=0,n=0){L.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Xa.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Xa.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*i-a*n),h=2*(a*e-r*i),d=2*(r*n-o*e);return this.x=e+l*c+o*d-a*h,this.y=n+l*h+a*c-r*d,this.z=i+l*d+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Ht(this.x,t.x,e.x),this.y=Ht(this.y,t.y,e.y),this.z=Ht(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Ht(this.x,t,e),this.y=Ht(this.y,t,e),this.z=Ht(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ht(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=i*l-r*a,this.y=r*o-n*l,this.z=n*a-i*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Cr.copy(this).projectOnVector(t),this.sub(Cr)}reflect(t){return this.sub(Cr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ht(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Cr=new L,Xa=new _s;class ui{constructor(t=new L(1/0,1/0,1/0),e=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(cn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(cn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=cn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,cn):cn.fromBufferAttribute(r,o),cn.applyMatrix4(t.matrixWorld),this.expandByPoint(cn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ms.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ms.copy(n.boundingBox)),Ms.applyMatrix4(t.matrixWorld),this.union(Ms)}const i=t.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,cn),cn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Zi),ws.subVectors(this.max,Zi),_i.subVectors(t.a,Zi),vi.subVectors(t.b,Zi),yi.subVectors(t.c,Zi),kn.subVectors(vi,_i),Fn.subVectors(yi,vi),Zn.subVectors(_i,yi);let e=[0,-kn.z,kn.y,0,-Fn.z,Fn.y,0,-Zn.z,Zn.y,kn.z,0,-kn.x,Fn.z,0,-Fn.x,Zn.z,0,-Zn.x,-kn.y,kn.x,0,-Fn.y,Fn.x,0,-Zn.y,Zn.x,0];return!Rr(e,_i,vi,yi,ws)||(e=[1,0,0,0,1,0,0,0,1],!Rr(e,_i,vi,yi,ws))?!1:(Ss.crossVectors(kn,Fn),e=[Ss.x,Ss.y,Ss.z],Rr(e,_i,vi,yi,ws))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,cn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(cn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(bn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),bn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),bn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),bn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),bn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),bn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),bn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),bn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(bn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const bn=[new L,new L,new L,new L,new L,new L,new L,new L],cn=new L,Ms=new ui,_i=new L,vi=new L,yi=new L,kn=new L,Fn=new L,Zn=new L,Zi=new L,ws=new L,Ss=new L,Jn=new L;function Rr(s,t,e,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){Jn.fromArray(s,r);const a=i.x*Math.abs(Jn.x)+i.y*Math.abs(Jn.y)+i.z*Math.abs(Jn.z),l=t.dot(Jn),c=e.dot(Jn),h=n.dot(Jn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const rd=new ui,Ji=new L,Ir=new L;class fi{constructor(t=new L,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):rd.setFromPoints(t).getCenter(n);let i=0;for(let r=0,o=t.length;r<o;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ji.subVectors(t,this.center);const e=Ji.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Ji,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ir.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ji.copy(t.center).add(Ir)),this.expandByPoint(Ji.copy(t.center).sub(Ir))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const En=new L,Pr=new L,bs=new L,Bn=new L,Lr=new L,Es=new L,Dr=new L;class gr{constructor(t=new L,e=new L(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,En)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=En.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(En.copy(this.origin).addScaledVector(this.direction,e),En.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Pr.copy(t).add(e).multiplyScalar(.5),bs.copy(e).sub(t).normalize(),Bn.copy(this.origin).sub(Pr);const r=t.distanceTo(e)*.5,o=-this.direction.dot(bs),a=Bn.dot(this.direction),l=-Bn.dot(bs),c=Bn.lengthSq(),h=Math.abs(1-o*o);let d,u,p,g;if(h>0)if(d=o*l-a,u=o*a-l,g=r*h,d>=0)if(u>=-g)if(u<=g){const _=1/h;d*=_,u*=_,p=d*(d+o*u+2*a)+u*(o*d+u+2*l)+c}else u=r,d=Math.max(0,-(o*u+a)),p=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(o*u+a)),p=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-o*r+a)),u=d>0?-r:Math.min(Math.max(-r,-l),r),p=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-r,-l),r),p=u*(u+2*l)+c):(d=Math.max(0,-(o*r+a)),u=d>0?r:Math.min(Math.max(-r,-l),r),p=-d*d+u*(u+2*l)+c);else u=o>0?-r:r,d=Math.max(0,-(o*u+a)),p=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(Pr).addScaledVector(bs,u),p}intersectSphere(t,e){En.subVectors(t.center,this.origin);const n=En.dot(this.direction),i=En.dot(En)-n*n,r=t.radius*t.radius;if(i>r)return null;const o=Math.sqrt(r-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,i=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,i=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,o=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,o=(t.min.y-u.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),d>=0?(a=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(a=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,En)!==null}intersectTriangle(t,e,n,i,r){Lr.subVectors(e,t),Es.subVectors(n,t),Dr.crossVectors(Lr,Es);let o=this.direction.dot(Dr),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Bn.subVectors(this.origin,t);const l=a*this.direction.dot(Es.crossVectors(Bn,Es));if(l<0)return null;const c=a*this.direction.dot(Lr.cross(Bn));if(c<0||l+c>o)return null;const h=-a*Bn.dot(Dr);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ne{constructor(t,e,n,i,r,o,a,l,c,h,d,u,p,g,_,m){ne.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,l,c,h,d,u,p,g,_,m)}set(t,e,n,i,r,o,a,l,c,h,d,u,p,g,_,m){const f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=i,f[1]=r,f[5]=o,f[9]=a,f[13]=l,f[2]=c,f[6]=h,f[10]=d,f[14]=u,f[3]=p,f[7]=g,f[11]=_,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ne().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/xi.setFromMatrixColumn(t,0).length(),r=1/xi.setFromMatrixColumn(t,1).length(),o=1/xi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){const u=o*h,p=o*d,g=a*h,_=a*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=p+g*c,e[5]=u-_*c,e[9]=-a*l,e[2]=_-u*c,e[6]=g+p*c,e[10]=o*l}else if(t.order==="YXZ"){const u=l*h,p=l*d,g=c*h,_=c*d;e[0]=u+_*a,e[4]=g*a-p,e[8]=o*c,e[1]=o*d,e[5]=o*h,e[9]=-a,e[2]=p*a-g,e[6]=_+u*a,e[10]=o*l}else if(t.order==="ZXY"){const u=l*h,p=l*d,g=c*h,_=c*d;e[0]=u-_*a,e[4]=-o*d,e[8]=g+p*a,e[1]=p+g*a,e[5]=o*h,e[9]=_-u*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const u=o*h,p=o*d,g=a*h,_=a*d;e[0]=l*h,e[4]=g*c-p,e[8]=u*c+_,e[1]=l*d,e[5]=_*c+u,e[9]=p*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const u=o*l,p=o*c,g=a*l,_=a*c;e[0]=l*h,e[4]=_-u*d,e[8]=g*d+p,e[1]=d,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=p*d+g,e[10]=u-_*d}else if(t.order==="XZY"){const u=o*l,p=o*c,g=a*l,_=a*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+_,e[5]=o*h,e[9]=p*d-g,e[2]=g*d-p,e[6]=a*h,e[10]=_*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(od,t,ad)}lookAt(t,e,n){const i=this.elements;return Ve.subVectors(t,e),Ve.lengthSq()===0&&(Ve.z=1),Ve.normalize(),On.crossVectors(n,Ve),On.lengthSq()===0&&(Math.abs(n.z)===1?Ve.x+=1e-4:Ve.z+=1e-4,Ve.normalize(),On.crossVectors(n,Ve)),On.normalize(),Ts.crossVectors(Ve,On),i[0]=On.x,i[4]=Ts.x,i[8]=Ve.x,i[1]=On.y,i[5]=Ts.y,i[9]=Ve.y,i[2]=On.z,i[6]=Ts.z,i[10]=Ve.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],p=n[13],g=n[2],_=n[6],m=n[10],f=n[14],S=n[3],b=n[7],x=n[11],C=n[15],E=i[0],A=i[4],I=i[8],y=i[12],v=i[1],R=i[5],U=i[9],P=i[13],H=i[2],q=i[6],F=i[10],X=i[14],O=i[3],tt=i[7],nt=i[11],rt=i[15];return r[0]=o*E+a*v+l*H+c*O,r[4]=o*A+a*R+l*q+c*tt,r[8]=o*I+a*U+l*F+c*nt,r[12]=o*y+a*P+l*X+c*rt,r[1]=h*E+d*v+u*H+p*O,r[5]=h*A+d*R+u*q+p*tt,r[9]=h*I+d*U+u*F+p*nt,r[13]=h*y+d*P+u*X+p*rt,r[2]=g*E+_*v+m*H+f*O,r[6]=g*A+_*R+m*q+f*tt,r[10]=g*I+_*U+m*F+f*nt,r[14]=g*y+_*P+m*X+f*rt,r[3]=S*E+b*v+x*H+C*O,r[7]=S*A+b*R+x*q+C*tt,r[11]=S*I+b*U+x*F+C*nt,r[15]=S*y+b*P+x*X+C*rt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],p=t[14],g=t[3],_=t[7],m=t[11],f=t[15];return g*(+r*l*d-i*c*d-r*a*u+n*c*u+i*a*p-n*l*p)+_*(+e*l*p-e*c*u+r*o*u-i*o*p+i*c*h-r*l*h)+m*(+e*c*d-e*a*p-r*o*d+n*o*p+r*a*h-n*c*h)+f*(-i*a*h-e*l*d+e*a*u+i*o*d-n*o*u+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],p=t[11],g=t[12],_=t[13],m=t[14],f=t[15],S=d*m*c-_*u*c+_*l*p-a*m*p-d*l*f+a*u*f,b=g*u*c-h*m*c-g*l*p+o*m*p+h*l*f-o*u*f,x=h*_*c-g*d*c+g*a*p-o*_*p-h*a*f+o*d*f,C=g*d*l-h*_*l-g*a*u+o*_*u+h*a*m-o*d*m,E=e*S+n*b+i*x+r*C;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/E;return t[0]=S*A,t[1]=(_*u*r-d*m*r-_*i*p+n*m*p+d*i*f-n*u*f)*A,t[2]=(a*m*r-_*l*r+_*i*c-n*m*c-a*i*f+n*l*f)*A,t[3]=(d*l*r-a*u*r-d*i*c+n*u*c+a*i*p-n*l*p)*A,t[4]=b*A,t[5]=(h*m*r-g*u*r+g*i*p-e*m*p-h*i*f+e*u*f)*A,t[6]=(g*l*r-o*m*r-g*i*c+e*m*c+o*i*f-e*l*f)*A,t[7]=(o*u*r-h*l*r+h*i*c-e*u*c-o*i*p+e*l*p)*A,t[8]=x*A,t[9]=(g*d*r-h*_*r-g*n*p+e*_*p+h*n*f-e*d*f)*A,t[10]=(o*_*r-g*a*r+g*n*c-e*_*c-o*n*f+e*a*f)*A,t[11]=(h*a*r-o*d*r-h*n*c+e*d*c+o*n*p-e*a*p)*A,t[12]=C*A,t[13]=(h*_*i-g*d*i+g*n*u-e*_*u-h*n*m+e*d*m)*A,t[14]=(g*a*i-o*_*i-g*n*l+e*_*l+o*n*m-e*a*m)*A,t[15]=(o*d*i-h*a*i+h*n*l-e*d*l-o*n*u+e*a*u)*A,this}scale(t){const e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,o){return this.set(1,n,r,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,d=a+a,u=r*c,p=r*h,g=r*d,_=o*h,m=o*d,f=a*d,S=l*c,b=l*h,x=l*d,C=n.x,E=n.y,A=n.z;return i[0]=(1-(_+f))*C,i[1]=(p+x)*C,i[2]=(g-b)*C,i[3]=0,i[4]=(p-x)*E,i[5]=(1-(u+f))*E,i[6]=(m+S)*E,i[7]=0,i[8]=(g+b)*A,i[9]=(m-S)*A,i[10]=(1-(u+_))*A,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let r=xi.set(i[0],i[1],i[2]).length();const o=xi.set(i[4],i[5],i[6]).length(),a=xi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],hn.copy(this);const c=1/r,h=1/o,d=1/a;return hn.elements[0]*=c,hn.elements[1]*=c,hn.elements[2]*=c,hn.elements[4]*=h,hn.elements[5]*=h,hn.elements[6]*=h,hn.elements[8]*=d,hn.elements[9]*=d,hn.elements[10]*=d,e.setFromRotationMatrix(hn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,i,r,o,a=Ln){const l=this.elements,c=2*r/(e-t),h=2*r/(n-i),d=(e+t)/(e-t),u=(n+i)/(n-i);let p,g;if(a===Ln)p=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===cr)p=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,r,o,a=Ln){const l=this.elements,c=1/(e-t),h=1/(n-i),d=1/(o-r),u=(e+t)*c,p=(n+i)*h;let g,_;if(a===Ln)g=(o+r)*d,_=-2*d;else if(a===cr)g=r*d,_=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const xi=new L,hn=new ne,od=new L(0,0,0),ad=new L(1,1,1),On=new L,Ts=new L,Ve=new L,qa=new ne,Ya=new _s;class on{constructor(t=0,e=0,n=0,i=on.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,r=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],d=i[2],u=i[6],p=i[10];switch(e){case"XYZ":this._y=Math.asin(Ht(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ht(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ht(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ht(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ht(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Ht(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return qa.makeRotationFromQuaternion(t),this.setFromRotationMatrix(qa,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Ya.setFromEuler(this),this.setFromQuaternion(Ya,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}on.DEFAULT_ORDER="XYZ";class ga{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let ld=0;const $a=new L,Mi=new _s,Tn=new ne,As=new L,Qi=new L,cd=new L,hd=new _s,ja=new L(1,0,0),Ka=new L(0,1,0),Za=new L(0,0,1),Ja={type:"added"},dd={type:"removed"},wi={type:"childadded",child:null},Ur={type:"childremoved",child:null};class ge extends Yi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ld++}),this.uuid=qn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ge.DEFAULT_UP.clone();const t=new L,e=new on,n=new _s,i=new L(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ne},normalMatrix:{value:new Nt}}),this.matrix=new ne,this.matrixWorld=new ne,this.matrixAutoUpdate=ge.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ge.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ga,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Mi.setFromAxisAngle(t,e),this.quaternion.multiply(Mi),this}rotateOnWorldAxis(t,e){return Mi.setFromAxisAngle(t,e),this.quaternion.premultiply(Mi),this}rotateX(t){return this.rotateOnAxis(ja,t)}rotateY(t){return this.rotateOnAxis(Ka,t)}rotateZ(t){return this.rotateOnAxis(Za,t)}translateOnAxis(t,e){return $a.copy(t).applyQuaternion(this.quaternion),this.position.add($a.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(ja,t)}translateY(t){return this.translateOnAxis(Ka,t)}translateZ(t){return this.translateOnAxis(Za,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Tn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?As.copy(t):As.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Qi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Tn.lookAt(Qi,As,this.up):Tn.lookAt(As,Qi,this.up),this.quaternion.setFromRotationMatrix(Tn),i&&(Tn.extractRotation(i.matrixWorld),Mi.setFromRotationMatrix(Tn),this.quaternion.premultiply(Mi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Ja),wi.child=t,this.dispatchEvent(wi),wi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(dd),Ur.child=t,this.dispatchEvent(Ur),Ur.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Tn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Tn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Tn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Ja),wi.child=t,this.dispatchEvent(wi),wi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qi,t,cd),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qi,hd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));i.material=a}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),d=o(t.shapes),u=o(t.skeletons),p=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}ge.DEFAULT_UP=new L(0,1,0);ge.DEFAULT_MATRIX_AUTO_UPDATE=!0;ge.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const dn=new L,An=new L,Nr=new L,Cn=new L,Si=new L,bi=new L,Qa=new L,kr=new L,Fr=new L,Br=new L,Or=new oe,zr=new oe,Hr=new oe;class en{constructor(t=new L,e=new L,n=new L){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),dn.subVectors(t,e),i.cross(dn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){dn.subVectors(i,e),An.subVectors(n,e),Nr.subVectors(t,e);const o=dn.dot(dn),a=dn.dot(An),l=dn.dot(Nr),c=An.dot(An),h=An.dot(Nr),d=o*c-a*a;if(d===0)return r.set(0,0,0),null;const u=1/d,p=(c*l-a*h)*u,g=(o*h-a*l)*u;return r.set(1-p-g,g,p)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Cn)===null?!1:Cn.x>=0&&Cn.y>=0&&Cn.x+Cn.y<=1}static getInterpolation(t,e,n,i,r,o,a,l){return this.getBarycoord(t,e,n,i,Cn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Cn.x),l.addScaledVector(o,Cn.y),l.addScaledVector(a,Cn.z),l)}static getInterpolatedAttribute(t,e,n,i,r,o){return Or.setScalar(0),zr.setScalar(0),Hr.setScalar(0),Or.fromBufferAttribute(t,e),zr.fromBufferAttribute(t,n),Hr.fromBufferAttribute(t,i),o.setScalar(0),o.addScaledVector(Or,r.x),o.addScaledVector(zr,r.y),o.addScaledVector(Hr,r.z),o}static isFrontFacing(t,e,n,i){return dn.subVectors(n,e),An.subVectors(t,e),dn.cross(An).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return dn.subVectors(this.c,this.b),An.subVectors(this.a,this.b),dn.cross(An).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return en.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return en.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return en.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return en.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return en.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,r=this.c;let o,a;Si.subVectors(i,n),bi.subVectors(r,n),kr.subVectors(t,n);const l=Si.dot(kr),c=bi.dot(kr);if(l<=0&&c<=0)return e.copy(n);Fr.subVectors(t,i);const h=Si.dot(Fr),d=bi.dot(Fr);if(h>=0&&d<=h)return e.copy(i);const u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(Si,o);Br.subVectors(t,r);const p=Si.dot(Br),g=bi.dot(Br);if(g>=0&&p<=g)return e.copy(r);const _=p*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(bi,a);const m=h*g-p*d;if(m<=0&&d-h>=0&&p-g>=0)return Qa.subVectors(r,i),a=(d-h)/(d-h+(p-g)),e.copy(i).addScaledVector(Qa,a);const f=1/(m+_+u);return o=_*f,a=u*f,e.copy(n).addScaledVector(Si,o).addScaledVector(bi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const vc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},zn={h:0,s:0,l:0},Cs={h:0,s:0,l:0};function Gr(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class st{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Xe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Zt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=Zt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Zt.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=Zt.workingColorSpace){if(t=$h(t,1),e=Ht(e,0,1),n=Ht(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Gr(o,r,t+1/3),this.g=Gr(o,r,t),this.b=Gr(o,r,t-1/3)}return Zt.toWorkingColorSpace(this,i),this}setStyle(t,e=Xe){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Xe){const n=vc[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Dn(t.r),this.g=Dn(t.g),this.b=Dn(t.b),this}copyLinearToSRGB(t){return this.r=Oi(t.r),this.g=Oi(t.g),this.b=Oi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Xe){return Zt.fromWorkingColorSpace(Pe.copy(this),t),Math.round(Ht(Pe.r*255,0,255))*65536+Math.round(Ht(Pe.g*255,0,255))*256+Math.round(Ht(Pe.b*255,0,255))}getHexString(t=Xe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Zt.workingColorSpace){Zt.fromWorkingColorSpace(Pe.copy(this),e);const n=Pe.r,i=Pe.g,r=Pe.b,o=Math.max(n,i,r),a=Math.min(n,i,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=h<=.5?d/(o+a):d/(2-o-a),o){case n:l=(i-r)/d+(i<r?6:0);break;case i:l=(r-n)/d+2;break;case r:l=(n-i)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Zt.workingColorSpace){return Zt.fromWorkingColorSpace(Pe.copy(this),e),t.r=Pe.r,t.g=Pe.g,t.b=Pe.b,t}getStyle(t=Xe){Zt.fromWorkingColorSpace(Pe.copy(this),t);const e=Pe.r,n=Pe.g,i=Pe.b;return t!==Xe?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(zn),this.setHSL(zn.h+t,zn.s+e,zn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(zn),t.getHSL(Cs);const n=Er(zn.h,Cs.h,e),i=Er(zn.s,Cs.s,e),r=Er(zn.l,Cs.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Pe=new st;st.NAMES=vc;let ud=0;class Nn extends Yi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ud++}),this.uuid=qn(),this.name="",this.type="Material",this.blending=Fi,this.side=Yn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=co,this.blendDst=ho,this.blendEquation=oi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new st(0,0,0),this.blendAlpha=0,this.depthFunc=zi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=za,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=mi,this.stencilZFail=mi,this.stencilZPass=mi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Fi&&(n.blending=this.blending),this.side!==Yn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==co&&(n.blendSrc=this.blendSrc),this.blendDst!==ho&&(n.blendDst=this.blendDst),this.blendEquation!==oi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==zi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==za&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==mi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==mi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==mi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=i(t.textures),o=i(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Ae extends Nn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new st(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new on,this.combine=oa,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ve=new L,Rs=new Lt;let fd=0;class Ce{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:fd++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=$o,this.updateRanges=[],this.gpuType=_n,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Rs.fromBufferAttribute(this,e),Rs.applyMatrix3(t),this.setXY(e,Rs.x,Rs.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyMatrix3(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyMatrix4(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyNormalMatrix(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.transformDirection(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=gn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=re(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=gn(e,this.array)),e}setX(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=gn(e,this.array)),e}setY(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=gn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=gn(e,this.array)),e}setW(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),n=re(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),n=re(n,this.array),i=re(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),n=re(n,this.array),i=re(i,this.array),r=re(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==$o&&(t.usage=this.usage),t}}class yc extends Ce{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class xc extends Ce{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class de extends Ce{constructor(t,e,n){super(new Float32Array(t),e,n)}}let pd=0;const Je=new ne,Vr=new ge,Ei=new L,We=new ui,ts=new ui,we=new L;class be extends Yi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:pd++}),this.uuid=qn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(gc(t)?xc:yc)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Nt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Je.makeRotationFromQuaternion(t),this.applyMatrix4(Je),this}rotateX(t){return Je.makeRotationX(t),this.applyMatrix4(Je),this}rotateY(t){return Je.makeRotationY(t),this.applyMatrix4(Je),this}rotateZ(t){return Je.makeRotationZ(t),this.applyMatrix4(Je),this}translate(t,e,n){return Je.makeTranslation(t,e,n),this.applyMatrix4(Je),this}scale(t,e,n){return Je.makeScale(t,e,n),this.applyMatrix4(Je),this}lookAt(t){return Vr.lookAt(t),Vr.updateMatrix(),this.applyMatrix4(Vr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ei).negate(),this.translate(Ei.x,Ei.y,Ei.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,r=t.length;i<r;i++){const o=t[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new de(n,3))}else{const n=Math.min(t.length,e.count);for(let i=0;i<n;i++){const r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ui);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const r=e[n];We.setFromBufferAttribute(r),this.morphTargetsRelative?(we.addVectors(this.boundingBox.min,We.min),this.boundingBox.expandByPoint(we),we.addVectors(this.boundingBox.max,We.max),this.boundingBox.expandByPoint(we)):(this.boundingBox.expandByPoint(We.min),this.boundingBox.expandByPoint(We.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new fi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(t){const n=this.boundingSphere.center;if(We.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];ts.setFromBufferAttribute(a),this.morphTargetsRelative?(we.addVectors(We.min,ts.min),We.expandByPoint(we),we.addVectors(We.max,ts.max),We.expandByPoint(we)):(We.expandByPoint(ts.min),We.expandByPoint(ts.max))}We.getCenter(n);let i=0;for(let r=0,o=t.count;r<o;r++)we.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(we));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)we.fromBufferAttribute(a,c),l&&(Ei.fromBufferAttribute(t,c),we.add(Ei)),i=Math.max(i,n.distanceToSquared(we))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ce(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let I=0;I<n.count;I++)a[I]=new L,l[I]=new L;const c=new L,h=new L,d=new L,u=new Lt,p=new Lt,g=new Lt,_=new L,m=new L;function f(I,y,v){c.fromBufferAttribute(n,I),h.fromBufferAttribute(n,y),d.fromBufferAttribute(n,v),u.fromBufferAttribute(r,I),p.fromBufferAttribute(r,y),g.fromBufferAttribute(r,v),h.sub(c),d.sub(c),p.sub(u),g.sub(u);const R=1/(p.x*g.y-g.x*p.y);isFinite(R)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(d,-p.y).multiplyScalar(R),m.copy(d).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(R),a[I].add(_),a[y].add(_),a[v].add(_),l[I].add(m),l[y].add(m),l[v].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let I=0,y=S.length;I<y;++I){const v=S[I],R=v.start,U=v.count;for(let P=R,H=R+U;P<H;P+=3)f(t.getX(P+0),t.getX(P+1),t.getX(P+2))}const b=new L,x=new L,C=new L,E=new L;function A(I){C.fromBufferAttribute(i,I),E.copy(C);const y=a[I];b.copy(y),b.sub(C.multiplyScalar(C.dot(y))).normalize(),x.crossVectors(E,y);const R=x.dot(l[I])<0?-1:1;o.setXYZW(I,b.x,b.y,b.z,R)}for(let I=0,y=S.length;I<y;++I){const v=S[I],R=v.start,U=v.count;for(let P=R,H=R+U;P<H;P+=3)A(t.getX(P+0)),A(t.getX(P+1)),A(t.getX(P+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ce(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,p=n.count;u<p;u++)n.setXYZ(u,0,0,0);const i=new L,r=new L,o=new L,a=new L,l=new L,c=new L,h=new L,d=new L;if(t)for(let u=0,p=t.count;u<p;u+=3){const g=t.getX(u+0),_=t.getX(u+1),m=t.getX(u+2);i.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),h.subVectors(o,r),d.subVectors(i,r),h.cross(d),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,p=e.count;u<p;u+=3)i.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),o.fromBufferAttribute(e,u+2),h.subVectors(o,r),d.subVectors(i,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)we.fromBufferAttribute(t,e),we.normalize(),t.setXYZ(e,we.x,we.y,we.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,d=a.normalized,u=new c.constructor(l.length*h);let p=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?p=l[_]*a.data.stride+a.offset:p=l[_]*h;for(let f=0;f<h;f++)u[g++]=c[p++]}return new Ce(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new be,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=t(l,n);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,d=c.length;h<d;h++){const u=c[h],p=t(u,n);l.push(p)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){const p=c[d];h.push(p.toJSON(t.data))}h.length>0&&(i[l]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],d=r[c];for(let u=0,p=d.length;u<p;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const tl=new ne,Qn=new gr,Is=new fi,el=new L,Ps=new L,Ls=new L,Ds=new L,Wr=new L,Us=new L,nl=new L,Ns=new L;class z extends ge{constructor(t=new be,e=new Ae){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const a=this.morphTargetInfluences;if(r&&a){Us.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],d=r[l];h!==0&&(Wr.fromBufferAttribute(d,t),o?Us.addScaledVector(Wr,h):Us.addScaledVector(Wr.sub(e),h))}e.add(Us)}return e}raycast(t,e){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Is.copy(n.boundingSphere),Is.applyMatrix4(r),Qn.copy(t.ray).recast(t.near),!(Is.containsPoint(Qn.origin)===!1&&(Qn.intersectSphere(Is,el)===null||Qn.origin.distanceToSquared(el)>(t.far-t.near)**2))&&(tl.copy(r).invert(),Qn.copy(t.ray).applyMatrix4(tl),!(n.boundingBox!==null&&Qn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Qn)))}_computeIntersections(t,e,n){let i;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=u.length;g<_;g++){const m=u[g],f=o[m.materialIndex],S=Math.max(m.start,p.start),b=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let x=S,C=b;x<C;x+=3){const E=a.getX(x),A=a.getX(x+1),I=a.getX(x+2);i=ks(this,f,t,n,c,h,d,E,A,I),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const S=a.getX(m),b=a.getX(m+1),x=a.getX(m+2);i=ks(this,o,t,n,c,h,d,S,b,x),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=u.length;g<_;g++){const m=u[g],f=o[m.materialIndex],S=Math.max(m.start,p.start),b=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let x=S,C=b;x<C;x+=3){const E=x,A=x+1,I=x+2;i=ks(this,f,t,n,c,h,d,E,A,I),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,p.start),_=Math.min(l.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const S=m,b=m+1,x=m+2;i=ks(this,o,t,n,c,h,d,S,b,x),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}}}function md(s,t,e,n,i,r,o,a){let l;if(t.side===Oe?l=n.intersectTriangle(o,r,i,!0,a):l=n.intersectTriangle(i,r,o,t.side===Yn,a),l===null)return null;Ns.copy(a),Ns.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(Ns);return c<e.near||c>e.far?null:{distance:c,point:Ns.clone(),object:s}}function ks(s,t,e,n,i,r,o,a,l,c){s.getVertexPosition(a,Ps),s.getVertexPosition(l,Ls),s.getVertexPosition(c,Ds);const h=md(s,t,e,n,Ps,Ls,Ds,nl);if(h){const d=new L;en.getBarycoord(nl,Ps,Ls,Ds,d),i&&(h.uv=en.getInterpolatedAttribute(i,a,l,c,d,new Lt)),r&&(h.uv1=en.getInterpolatedAttribute(r,a,l,c,d,new Lt)),o&&(h.normal=en.getInterpolatedAttribute(o,a,l,c,d,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:l,c,normal:new L,materialIndex:0};en.getNormal(Ps,Ls,Ds,u.normal),h.face=u,h.barycoord=d}return h}class ft extends be{constructor(t=1,e=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};const a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],d=[];let u=0,p=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,i,o,2),g("x","z","y",1,-1,t,n,-e,i,o,3),g("x","y","z",1,-1,t,e,n,i,r,4),g("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new de(c,3)),this.setAttribute("normal",new de(h,3)),this.setAttribute("uv",new de(d,2));function g(_,m,f,S,b,x,C,E,A,I,y){const v=x/A,R=C/I,U=x/2,P=C/2,H=E/2,q=A+1,F=I+1;let X=0,O=0;const tt=new L;for(let nt=0;nt<F;nt++){const rt=nt*R-P;for(let wt=0;wt<q;wt++){const jt=wt*v-U;tt[_]=jt*S,tt[m]=rt*b,tt[f]=H,c.push(tt.x,tt.y,tt.z),tt[_]=0,tt[m]=0,tt[f]=E>0?1:-1,h.push(tt.x,tt.y,tt.z),d.push(wt/A),d.push(1-nt/I),X+=1}}for(let nt=0;nt<I;nt++)for(let rt=0;rt<A;rt++){const wt=u+rt+q*nt,jt=u+rt+q*(nt+1),j=u+(rt+1)+q*(nt+1),it=u+(rt+1)+q*nt;l.push(wt,jt,it),l.push(jt,j,it),O+=6}a.addGroup(p,O,y),p+=O,u+=X}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ft(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function qi(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Be(s){const t={};for(let e=0;e<s.length;e++){const n=qi(s[e]);for(const i in n)t[i]=n[i]}return t}function gd(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Mc(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Zt.workingColorSpace}const _d={clone:qi,merge:Be};var vd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,yd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Mn extends Nn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=vd,this.fragmentShader=yd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=qi(t.uniforms),this.uniformsGroups=gd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class wc extends ge{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ne,this.projectionMatrix=new ne,this.projectionMatrixInverse=new ne,this.coordinateSystem=Ln}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Hn=new L,il=new Lt,sl=new Lt;class Ye extends wc{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=jo*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(br*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return jo*2*Math.atan(Math.tan(br*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Hn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Hn.x,Hn.y).multiplyScalar(-t/Hn.z),Hn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Hn.x,Hn.y).multiplyScalar(-t/Hn.z)}getViewSize(t,e){return this.getViewBounds(t,il,sl),e.subVectors(sl,il)}setViewOffset(t,e,n,i,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(br*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/l,e-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ti=-90,Ai=1;class xd extends ge{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Ye(Ti,Ai,t,e);i.layers=this.layers,this.add(i);const r=new Ye(Ti,Ai,t,e);r.layers=this.layers,this.add(r);const o=new Ye(Ti,Ai,t,e);o.layers=this.layers,this.add(o);const a=new Ye(Ti,Ai,t,e);a.layers=this.layers,this.add(a);const l=new Ye(Ti,Ai,t,e);l.layers=this.layers,this.add(l);const c=new Ye(Ti,Ai,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===Ln)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===cr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(d,u,p),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Sc extends Ne{constructor(t,e,n,i,r,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:Hi,super(t,e,n,i,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Md extends di{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Sc(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:sn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new ft(5,5,5),r=new Mn({name:"CubemapFromEquirect",uniforms:qi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Oe,blending:Wn});r.uniforms.tEquirect.value=e;const o=new z(i,r),a=e.minFilter;return e.minFilter===li&&(e.minFilter=sn),new xd(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,i){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(r)}}class Bt extends ge{constructor(){super(),this.isGroup=!0,this.type="Group"}}const wd={type:"move"};class Xr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Bt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Bt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Bt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,n),f=this._getHandJoint(c,_);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),p=.02,g=.005;c.inputState.pinching&&u>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(wd)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Bt;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class _a{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new st(t),this.density=e}clone(){return new _a(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Sd extends ge{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new on,this.environmentIntensity=1,this.environmentRotation=new on,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class bd{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=$o,this.updateRanges=[],this.version=0,this.uuid=qn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,r=this.stride;i<r;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=qn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=qn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Fe=new L;class dr{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Fe.fromBufferAttribute(this,e),Fe.applyMatrix4(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Fe.fromBufferAttribute(this,e),Fe.applyNormalMatrix(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Fe.fromBufferAttribute(this,e),Fe.transformDirection(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=gn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=re(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=gn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=gn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=gn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=gn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),n=re(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),n=re(n,this.array),i=re(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),n=re(n,this.array),i=re(i,this.array),r=re(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return new Ce(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new dr(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class bc extends Nn{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new st(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Ci;const es=new L,Ri=new L,Ii=new L,Pi=new Lt,ns=new Lt,Ec=new ne,Fs=new L,is=new L,Bs=new L,rl=new Lt,qr=new Lt,ol=new Lt;class Ed extends ge{constructor(t=new bc){if(super(),this.isSprite=!0,this.type="Sprite",Ci===void 0){Ci=new be;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new bd(e,5);Ci.setIndex([0,1,2,0,2,3]),Ci.setAttribute("position",new dr(n,3,0,!1)),Ci.setAttribute("uv",new dr(n,2,3,!1))}this.geometry=Ci,this.material=t,this.center=new Lt(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ri.setFromMatrixScale(this.matrixWorld),Ec.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Ii.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ri.multiplyScalar(-Ii.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const o=this.center;Os(Fs.set(-.5,-.5,0),Ii,o,Ri,i,r),Os(is.set(.5,-.5,0),Ii,o,Ri,i,r),Os(Bs.set(.5,.5,0),Ii,o,Ri,i,r),rl.set(0,0),qr.set(1,0),ol.set(1,1);let a=t.ray.intersectTriangle(Fs,is,Bs,!1,es);if(a===null&&(Os(is.set(-.5,.5,0),Ii,o,Ri,i,r),qr.set(0,1),a=t.ray.intersectTriangle(Fs,Bs,is,!1,es),a===null))return;const l=t.ray.origin.distanceTo(es);l<t.near||l>t.far||e.push({distance:l,point:es.clone(),uv:en.getInterpolation(es,Fs,is,Bs,rl,qr,ol,new Lt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Os(s,t,e,n,i,r){Pi.subVectors(s,e).addScalar(.5).multiply(n),i!==void 0?(ns.x=r*Pi.x-i*Pi.y,ns.y=i*Pi.x+r*Pi.y):ns.copy(Pi),s.copy(t),s.x+=ns.x,s.y+=ns.y,s.applyMatrix4(Ec)}class Tc extends Ne{constructor(t=null,e=1,n=1,i,r,o,a,l,c=$e,h=$e,d,u){super(null,o,a,l,c,h,i,r,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class al extends Ce{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Li=new ne,ll=new ne,zs=[],cl=new ui,Td=new ne,ss=new z,rs=new fi;class Ad extends z{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new al(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Td)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new ui),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Li),cl.copy(t.boundingBox).applyMatrix4(Li),this.boundingBox.union(cl)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new fi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Li),rs.copy(t.boundingSphere).applyMatrix4(Li),this.boundingSphere.union(rs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(t,e){const n=this.matrixWorld,i=this.count;if(ss.geometry=this.geometry,ss.material=this.material,ss.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),rs.copy(this.boundingSphere),rs.applyMatrix4(n),t.ray.intersectsSphere(rs)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,Li),ll.multiplyMatrices(n,Li),ss.matrixWorld=ll,ss.raycast(t,zs);for(let o=0,a=zs.length;o<a;o++){const l=zs[o];l.instanceId=r,l.object=this,e.push(l)}zs.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new al(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Tc(new Float32Array(i*this.count),i,this.count,ha,_n));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=i*t;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Yr=new L,Cd=new L,Rd=new Nt;class si{constructor(t=new L(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=Yr.subVectors(n,e).cross(Cd.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Yr),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Rd.getNormalMatrix(t),i=this.coplanarPoint(Yr).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ti=new fi,Hs=new L;class va{constructor(t=new si,e=new si,n=new si,i=new si,r=new si,o=new si){this.planes=[t,e,n,i,r,o]}set(t,e,n,i,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Ln){const n=this.planes,i=t.elements,r=i[0],o=i[1],a=i[2],l=i[3],c=i[4],h=i[5],d=i[6],u=i[7],p=i[8],g=i[9],_=i[10],m=i[11],f=i[12],S=i[13],b=i[14],x=i[15];if(n[0].setComponents(l-r,u-c,m-p,x-f).normalize(),n[1].setComponents(l+r,u+c,m+p,x+f).normalize(),n[2].setComponents(l+o,u+h,m+g,x+S).normalize(),n[3].setComponents(l-o,u-h,m-g,x-S).normalize(),n[4].setComponents(l-a,u-d,m-_,x-b).normalize(),e===Ln)n[5].setComponents(l+a,u+d,m+_,x+b).normalize();else if(e===cr)n[5].setComponents(a,d,_,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ti.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ti.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ti)}intersectsSprite(t){return ti.center.set(0,0,0),ti.radius=.7071067811865476,ti.applyMatrix4(t.matrixWorld),this.intersectsSphere(ti)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(Hs.x=i.normal.x>0?t.max.x:t.min.x,Hs.y=i.normal.y>0?t.max.y:t.min.y,Hs.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Hs)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Ac extends Nn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new st(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const ur=new L,fr=new L,hl=new ne,os=new gr,Gs=new fi,$r=new L,dl=new L;class Id extends ge{constructor(t=new be,e=new Ac){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let i=1,r=e.count;i<r;i++)ur.fromBufferAttribute(e,i-1),fr.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=ur.distanceTo(fr);t.setAttribute("lineDistance",new de(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Gs.copy(n.boundingSphere),Gs.applyMatrix4(i),Gs.radius+=r,t.ray.intersectsSphere(Gs)===!1)return;hl.copy(i).invert(),os.copy(t.ray).applyMatrix4(hl);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){const p=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=p,m=g-1;_<m;_+=c){const f=h.getX(_),S=h.getX(_+1),b=Vs(this,t,os,l,f,S,_);b&&e.push(b)}if(this.isLineLoop){const _=h.getX(g-1),m=h.getX(p),f=Vs(this,t,os,l,_,m,g-1);f&&e.push(f)}}else{const p=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let _=p,m=g-1;_<m;_+=c){const f=Vs(this,t,os,l,_,_+1,_);f&&e.push(f)}if(this.isLineLoop){const _=Vs(this,t,os,l,g-1,p,g-1);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Vs(s,t,e,n,i,r,o){const a=s.geometry.attributes.position;if(ur.fromBufferAttribute(a,i),fr.fromBufferAttribute(a,r),e.distanceSqToSegment(ur,fr,$r,dl)>n)return;$r.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo($r);if(!(c<t.near||c>t.far))return{distance:c,point:dl.clone().applyMatrix4(s.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:s}}const ul=new L,fl=new L;class Pd extends Id{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let i=0,r=e.count;i<r;i+=2)ul.fromBufferAttribute(e,i),fl.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+ul.distanceTo(fl);t.setAttribute("lineDistance",new de(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class ya extends Nn{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new st(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const pl=new ne,Ko=new gr,Ws=new fi,Xs=new L;class Cc extends ge{constructor(t=new be,e=new ya){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ws.copy(n.boundingSphere),Ws.applyMatrix4(i),Ws.radius+=r,t.ray.intersectsSphere(Ws)===!1)return;pl.copy(i).invert(),Ko.copy(t.ray).applyMatrix4(pl);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,d=n.attributes.position;if(c!==null){const u=Math.max(0,o.start),p=Math.min(c.count,o.start+o.count);for(let g=u,_=p;g<_;g++){const m=c.getX(g);Xs.fromBufferAttribute(d,m),ml(Xs,m,l,i,t,e,this)}}else{const u=Math.max(0,o.start),p=Math.min(d.count,o.start+o.count);for(let g=u,_=p;g<_;g++)Xs.fromBufferAttribute(d,g),ml(Xs,g,l,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function ml(s,t,e,n,i,r,o){const a=Ko.distanceSqToPoint(s);if(a<e){const l=new L;Ko.closestPointToPoint(s,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class Rc extends Ne{constructor(t,e,n,i,r,o,a,l,c){super(t,e,n,i,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ic extends Ne{constructor(t,e,n,i,r,o,a,l,c,h=Bi){if(h!==Bi&&h!==Wi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Bi&&(n=hi),n===void 0&&h===Wi&&(n=Vi),super(null,i,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:$e,this.minFilter=l!==void 0?l:$e,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new ma(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Ot extends be{constructor(t=1,e=1,n=1,i=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;i=Math.floor(i),r=Math.floor(r);const h=[],d=[],u=[],p=[];let g=0;const _=[],m=n/2;let f=0;S(),o===!1&&(t>0&&b(!0),e>0&&b(!1)),this.setIndex(h),this.setAttribute("position",new de(d,3)),this.setAttribute("normal",new de(u,3)),this.setAttribute("uv",new de(p,2));function S(){const x=new L,C=new L;let E=0;const A=(e-t)/n;for(let I=0;I<=r;I++){const y=[],v=I/r,R=v*(e-t)+t;for(let U=0;U<=i;U++){const P=U/i,H=P*l+a,q=Math.sin(H),F=Math.cos(H);C.x=R*q,C.y=-v*n+m,C.z=R*F,d.push(C.x,C.y,C.z),x.set(q,A,F).normalize(),u.push(x.x,x.y,x.z),p.push(P,1-v),y.push(g++)}_.push(y)}for(let I=0;I<i;I++)for(let y=0;y<r;y++){const v=_[y][I],R=_[y+1][I],U=_[y+1][I+1],P=_[y][I+1];(t>0||y!==0)&&(h.push(v,R,P),E+=3),(e>0||y!==r-1)&&(h.push(R,U,P),E+=3)}c.addGroup(f,E,0),f+=E}function b(x){const C=g,E=new Lt,A=new L;let I=0;const y=x===!0?t:e,v=x===!0?1:-1;for(let U=1;U<=i;U++)d.push(0,m*v,0),u.push(0,v,0),p.push(.5,.5),g++;const R=g;for(let U=0;U<=i;U++){const H=U/i*l+a,q=Math.cos(H),F=Math.sin(H);A.x=y*F,A.y=m*v,A.z=y*q,d.push(A.x,A.y,A.z),u.push(0,v,0),E.x=q*.5+.5,E.y=F*.5*v+.5,p.push(E.x,E.y),g++}for(let U=0;U<i;U++){const P=C+U,H=R+U;x===!0?h.push(H,H+1,P):h.push(H+1,H,P),I+=3}c.addGroup(f,I,x===!0?1:2),f+=I}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ot(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class De extends Ot{constructor(t=1,e=1,n=32,i=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new De(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class _r extends be{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const r=[],o=[];a(i),c(n),h(),this.setAttribute("position",new de(r,3)),this.setAttribute("normal",new de(r.slice(),3)),this.setAttribute("uv",new de(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(S){const b=new L,x=new L,C=new L;for(let E=0;E<e.length;E+=3)p(e[E+0],b),p(e[E+1],x),p(e[E+2],C),l(b,x,C,S)}function l(S,b,x,C){const E=C+1,A=[];for(let I=0;I<=E;I++){A[I]=[];const y=S.clone().lerp(x,I/E),v=b.clone().lerp(x,I/E),R=E-I;for(let U=0;U<=R;U++)U===0&&I===E?A[I][U]=y:A[I][U]=y.clone().lerp(v,U/R)}for(let I=0;I<E;I++)for(let y=0;y<2*(E-I)-1;y++){const v=Math.floor(y/2);y%2===0?(u(A[I][v+1]),u(A[I+1][v]),u(A[I][v])):(u(A[I][v+1]),u(A[I+1][v+1]),u(A[I+1][v]))}}function c(S){const b=new L;for(let x=0;x<r.length;x+=3)b.x=r[x+0],b.y=r[x+1],b.z=r[x+2],b.normalize().multiplyScalar(S),r[x+0]=b.x,r[x+1]=b.y,r[x+2]=b.z}function h(){const S=new L;for(let b=0;b<r.length;b+=3){S.x=r[b+0],S.y=r[b+1],S.z=r[b+2];const x=m(S)/2/Math.PI+.5,C=f(S)/Math.PI+.5;o.push(x,1-C)}g(),d()}function d(){for(let S=0;S<o.length;S+=6){const b=o[S+0],x=o[S+2],C=o[S+4],E=Math.max(b,x,C),A=Math.min(b,x,C);E>.9&&A<.1&&(b<.2&&(o[S+0]+=1),x<.2&&(o[S+2]+=1),C<.2&&(o[S+4]+=1))}}function u(S){r.push(S.x,S.y,S.z)}function p(S,b){const x=S*3;b.x=t[x+0],b.y=t[x+1],b.z=t[x+2]}function g(){const S=new L,b=new L,x=new L,C=new L,E=new Lt,A=new Lt,I=new Lt;for(let y=0,v=0;y<r.length;y+=9,v+=6){S.set(r[y+0],r[y+1],r[y+2]),b.set(r[y+3],r[y+4],r[y+5]),x.set(r[y+6],r[y+7],r[y+8]),E.set(o[v+0],o[v+1]),A.set(o[v+2],o[v+3]),I.set(o[v+4],o[v+5]),C.copy(S).add(b).add(x).divideScalar(3);const R=m(C);_(E,v+0,S,R),_(A,v+2,b,R),_(I,v+4,x,R)}}function _(S,b,x,C){C<0&&S.x===1&&(o[b]=S.x-1),x.x===0&&x.z===0&&(o[b]=C/2/Math.PI+.5)}function m(S){return Math.atan2(S.z,-S.x)}function f(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new _r(t.vertices,t.indices,t.radius,t.details)}}class Qe extends _r{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Qe(t.radius,t.detail)}}class yn extends _r{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new yn(t.radius,t.detail)}}class He extends be{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,d=t/a,u=e/l,p=[],g=[],_=[],m=[];for(let f=0;f<h;f++){const S=f*u-o;for(let b=0;b<c;b++){const x=b*d-r;g.push(x,-S,0),_.push(0,0,1),m.push(b/a),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let S=0;S<a;S++){const b=S+c*f,x=S+c*(f+1),C=S+1+c*(f+1),E=S+1+c*f;p.push(b,x,E),p.push(x,C,E)}this.setIndex(p),this.setAttribute("position",new de(g,3)),this.setAttribute("normal",new de(_,3)),this.setAttribute("uv",new de(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new He(t.width,t.height,t.widthSegments,t.heightSegments)}}class xa extends be{constructor(t=.5,e=1,n=32,i=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);const a=[],l=[],c=[],h=[];let d=t;const u=(e-t)/i,p=new L,g=new Lt;for(let _=0;_<=i;_++){for(let m=0;m<=n;m++){const f=r+m/n*o;p.x=d*Math.cos(f),p.y=d*Math.sin(f),l.push(p.x,p.y,p.z),c.push(0,0,1),g.x=(p.x/e+1)/2,g.y=(p.y/e+1)/2,h.push(g.x,g.y)}d+=u}for(let _=0;_<i;_++){const m=_*(n+1);for(let f=0;f<n;f++){const S=f+m,b=S,x=S+n+1,C=S+n+2,E=S+1;a.push(b,x,E),a.push(x,C,E)}}this.setIndex(a),this.setAttribute("position",new de(l,3)),this.setAttribute("normal",new de(c,3)),this.setAttribute("uv",new de(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new xa(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class $n extends be{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],d=new L,u=new L,p=[],g=[],_=[],m=[];for(let f=0;f<=n;f++){const S=[],b=f/n;let x=0;f===0&&o===0?x=.5/e:f===n&&l===Math.PI&&(x=-.5/e);for(let C=0;C<=e;C++){const E=C/e;d.x=-t*Math.cos(i+E*r)*Math.sin(o+b*a),d.y=t*Math.cos(o+b*a),d.z=t*Math.sin(i+E*r)*Math.sin(o+b*a),g.push(d.x,d.y,d.z),u.copy(d).normalize(),_.push(u.x,u.y,u.z),m.push(E+x,1-b),S.push(c++)}h.push(S)}for(let f=0;f<n;f++)for(let S=0;S<e;S++){const b=h[f][S+1],x=h[f][S],C=h[f+1][S],E=h[f+1][S+1];(f!==0||o>0)&&p.push(b,x,E),(f!==n-1||l<Math.PI)&&p.push(x,C,E)}this.setIndex(p),this.setAttribute("position",new de(g,3)),this.setAttribute("normal",new de(_,3)),this.setAttribute("uv",new de(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new $n(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Ma extends be{constructor(t=1,e=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);const o=[],a=[],l=[],c=[],h=new L,d=new L,u=new L;for(let p=0;p<=n;p++)for(let g=0;g<=i;g++){const _=g/i*r,m=p/n*Math.PI*2;d.x=(t+e*Math.cos(m))*Math.cos(_),d.y=(t+e*Math.cos(m))*Math.sin(_),d.z=e*Math.sin(m),a.push(d.x,d.y,d.z),h.x=t*Math.cos(_),h.y=t*Math.sin(_),u.subVectors(d,h).normalize(),l.push(u.x,u.y,u.z),c.push(g/i),c.push(p/n)}for(let p=1;p<=n;p++)for(let g=1;g<=i;g++){const _=(i+1)*p+g-1,m=(i+1)*(p-1)+g-1,f=(i+1)*(p-1)+g,S=(i+1)*p+g;o.push(_,m,S),o.push(m,f,S)}this.setIndex(o),this.setAttribute("position",new de(a,3)),this.setAttribute("normal",new de(l,3)),this.setAttribute("uv",new de(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ma(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class yt extends Nn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new st(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new st(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=pa,this.normalScale=new Lt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new on,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Pc extends Nn{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new st(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new st(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=pa,this.normalScale=new Lt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new on,this.combine=oa,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Ld extends Nn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Bh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Dd extends Nn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class wa extends ge{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new st(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Ud extends wa{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ge.DEFAULT_UP),this.updateMatrix(),this.groundColor=new st(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const jr=new ne,gl=new L,_l=new L;class Lc{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Lt(512,512),this.map=null,this.mapPass=null,this.matrix=new ne,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new va,this._frameExtents=new Lt(1,1),this._viewportCount=1,this._viewports=[new oe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;gl.setFromMatrixPosition(t.matrixWorld),e.position.copy(gl),_l.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(_l),e.updateMatrixWorld(),jr.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(jr),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(jr)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const vl=new ne,as=new L,Kr=new L;class Nd extends Lc{constructor(){super(new Ye(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Lt(4,2),this._viewportCount=6,this._viewports=[new oe(2,1,1,1),new oe(0,1,1,1),new oe(3,1,1,1),new oe(1,1,1,1),new oe(3,0,1,1),new oe(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),as.setFromMatrixPosition(t.matrixWorld),n.position.copy(as),Kr.copy(n.position),Kr.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Kr),n.updateMatrixWorld(),i.makeTranslation(-as.x,-as.y,-as.z),vl.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(vl)}}class In extends wa{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Nd}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Dc extends wc{constructor(t=-1,e=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class kd extends Lc{constructor(){super(new Dc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Fd extends wa{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ge.DEFAULT_UP),this.updateMatrix(),this.target=new ge,this.shadow=new kd}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Bd extends Ye{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t,this.index=0}}class Od{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=yl(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=yl();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function yl(){return performance.now()}const xl=new ne;class zd{constructor(t,e,n=0,i=1/0){this.ray=new gr(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new ga,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return xl.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(xl),this}intersectObject(t,e=!0,n=[]){return Zo(t,this,n,e),n.sort(Ml),n}intersectObjects(t,e=!0,n=[]){for(let i=0,r=t.length;i<r;i++)Zo(t[i],this,n,e);return n.sort(Ml),n}}function Ml(s,t){return s.distance-t.distance}function Zo(s,t,e,n){let i=!0;if(s.layers.test(t.layers)&&s.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){const r=s.children;for(let o=0,a=r.length;o<a;o++)Zo(r[o],t,e,!0)}}function wl(s,t,e,n){const i=Hd(n);switch(e){case cc:return s*t;case dc:return s*t;case uc:return s*t*2;case ha:return s*t/i.components*i.byteLength;case da:return s*t/i.components*i.byteLength;case fc:return s*t*2/i.components*i.byteLength;case ua:return s*t*2/i.components*i.byteLength;case hc:return s*t*3/i.components*i.byteLength;case rn:return s*t*4/i.components*i.byteLength;case fa:return s*t*4/i.components*i.byteLength;case Zs:case Js:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Qs:case tr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case So:case Eo:return Math.max(s,16)*Math.max(t,8)/4;case wo:case bo:return Math.max(s,8)*Math.max(t,8)/2;case To:case Ao:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Co:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Ro:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Io:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case Po:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case Lo:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case Do:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case Uo:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case No:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case ko:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case Fo:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case Bo:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case Oo:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case zo:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case Ho:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case Go:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case er:case Vo:case Wo:return Math.ceil(s/4)*Math.ceil(t/4)*16;case pc:case Xo:return Math.ceil(s/4)*Math.ceil(t/4)*8;case qo:case Yo:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Hd(s){switch(s){case Un:case oc:return{byteLength:1,components:1};case ms:case ac:case gs:return{byteLength:2,components:1};case la:case ca:return{byteLength:2,components:4};case hi:case aa:case _n:return{byteLength:4,components:1};case lc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ra}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ra);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Uc(){let s=null,t=!1,e=null,n=null;function i(r,o){e(r,o),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function Gd(s){const t=new WeakMap;function e(a,l){const c=a.array,h=a.usage,d=c.byteLength,u=s.createBuffer();s.bindBuffer(l,u),s.bufferData(l,c,h),a.onUploadCallback();let p;if(c instanceof Float32Array)p=s.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=s.HALF_FLOAT:p=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=s.SHORT;else if(c instanceof Uint32Array)p=s.UNSIGNED_INT;else if(c instanceof Int32Array)p=s.INT;else if(c instanceof Int8Array)p=s.BYTE;else if(c instanceof Uint8Array)p=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){const h=l.array,d=l.updateRanges;if(s.bindBuffer(c,a),d.length===0)s.bufferSubData(c,0,h);else{d.sort((p,g)=>p.start-g.start);let u=0;for(let p=1;p<d.length;p++){const g=d[u],_=d[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++u,d[u]=_)}d.length=u+1;for(let p=0,g=d.length;p<g;p++){const _=d[p];s.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(s.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:r,update:o}}var Vd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Wd=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Xd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,qd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Yd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,$d=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,jd=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Kd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Zd=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Jd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Qd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,tu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,eu=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,nu=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,iu=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,su=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,ru=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ou=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,au=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,lu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,cu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,hu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,du=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,uu=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,fu=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,pu=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,mu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,gu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,_u=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,vu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,yu="gl_FragColor = linearToOutputTexel( gl_FragColor );",xu=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Mu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,wu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Su=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,bu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Eu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Tu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Au=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Cu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ru=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Iu=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Pu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Lu=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Du=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Uu=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Nu=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,ku=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Fu=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Bu=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ou=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,zu=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Hu=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Gu=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Vu=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Wu=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Xu=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,qu=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Yu=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,$u=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ju=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ku=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Zu=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Ju=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Qu=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,tf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ef=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,nf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,sf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,rf=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,of=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,af=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,lf=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,cf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,hf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,df=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,uf=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,ff=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,pf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,mf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,gf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,_f=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,vf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,yf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,xf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Mf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,wf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Sf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,bf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Ef=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Tf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Af=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Cf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Rf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,If=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Pf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Lf=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Df=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Uf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Nf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,kf=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ff=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Bf=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Of=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,zf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Hf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Gf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Vf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Wf=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,qf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Yf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,$f=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Kf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Zf=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Jf=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Qf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,tp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ep=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,np=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ip=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,sp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,op=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ap=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,lp=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,hp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,dp=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,up=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fp=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,pp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,gp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_p=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,vp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,yp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,xp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Mp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,wp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ft={alphahash_fragment:Vd,alphahash_pars_fragment:Wd,alphamap_fragment:Xd,alphamap_pars_fragment:qd,alphatest_fragment:Yd,alphatest_pars_fragment:$d,aomap_fragment:jd,aomap_pars_fragment:Kd,batching_pars_vertex:Zd,batching_vertex:Jd,begin_vertex:Qd,beginnormal_vertex:tu,bsdfs:eu,iridescence_fragment:nu,bumpmap_pars_fragment:iu,clipping_planes_fragment:su,clipping_planes_pars_fragment:ru,clipping_planes_pars_vertex:ou,clipping_planes_vertex:au,color_fragment:lu,color_pars_fragment:cu,color_pars_vertex:hu,color_vertex:du,common:uu,cube_uv_reflection_fragment:fu,defaultnormal_vertex:pu,displacementmap_pars_vertex:mu,displacementmap_vertex:gu,emissivemap_fragment:_u,emissivemap_pars_fragment:vu,colorspace_fragment:yu,colorspace_pars_fragment:xu,envmap_fragment:Mu,envmap_common_pars_fragment:wu,envmap_pars_fragment:Su,envmap_pars_vertex:bu,envmap_physical_pars_fragment:Nu,envmap_vertex:Eu,fog_vertex:Tu,fog_pars_vertex:Au,fog_fragment:Cu,fog_pars_fragment:Ru,gradientmap_pars_fragment:Iu,lightmap_pars_fragment:Pu,lights_lambert_fragment:Lu,lights_lambert_pars_fragment:Du,lights_pars_begin:Uu,lights_toon_fragment:ku,lights_toon_pars_fragment:Fu,lights_phong_fragment:Bu,lights_phong_pars_fragment:Ou,lights_physical_fragment:zu,lights_physical_pars_fragment:Hu,lights_fragment_begin:Gu,lights_fragment_maps:Vu,lights_fragment_end:Wu,logdepthbuf_fragment:Xu,logdepthbuf_pars_fragment:qu,logdepthbuf_pars_vertex:Yu,logdepthbuf_vertex:$u,map_fragment:ju,map_pars_fragment:Ku,map_particle_fragment:Zu,map_particle_pars_fragment:Ju,metalnessmap_fragment:Qu,metalnessmap_pars_fragment:tf,morphinstance_vertex:ef,morphcolor_vertex:nf,morphnormal_vertex:sf,morphtarget_pars_vertex:rf,morphtarget_vertex:of,normal_fragment_begin:af,normal_fragment_maps:lf,normal_pars_fragment:cf,normal_pars_vertex:hf,normal_vertex:df,normalmap_pars_fragment:uf,clearcoat_normal_fragment_begin:ff,clearcoat_normal_fragment_maps:pf,clearcoat_pars_fragment:mf,iridescence_pars_fragment:gf,opaque_fragment:_f,packing:vf,premultiplied_alpha_fragment:yf,project_vertex:xf,dithering_fragment:Mf,dithering_pars_fragment:wf,roughnessmap_fragment:Sf,roughnessmap_pars_fragment:bf,shadowmap_pars_fragment:Ef,shadowmap_pars_vertex:Tf,shadowmap_vertex:Af,shadowmask_pars_fragment:Cf,skinbase_vertex:Rf,skinning_pars_vertex:If,skinning_vertex:Pf,skinnormal_vertex:Lf,specularmap_fragment:Df,specularmap_pars_fragment:Uf,tonemapping_fragment:Nf,tonemapping_pars_fragment:kf,transmission_fragment:Ff,transmission_pars_fragment:Bf,uv_pars_fragment:Of,uv_pars_vertex:zf,uv_vertex:Hf,worldpos_vertex:Gf,background_vert:Vf,background_frag:Wf,backgroundCube_vert:Xf,backgroundCube_frag:qf,cube_vert:Yf,cube_frag:$f,depth_vert:jf,depth_frag:Kf,distanceRGBA_vert:Zf,distanceRGBA_frag:Jf,equirect_vert:Qf,equirect_frag:tp,linedashed_vert:ep,linedashed_frag:np,meshbasic_vert:ip,meshbasic_frag:sp,meshlambert_vert:rp,meshlambert_frag:op,meshmatcap_vert:ap,meshmatcap_frag:lp,meshnormal_vert:cp,meshnormal_frag:hp,meshphong_vert:dp,meshphong_frag:up,meshphysical_vert:fp,meshphysical_frag:pp,meshtoon_vert:mp,meshtoon_frag:gp,points_vert:_p,points_frag:vp,shadow_vert:yp,shadow_frag:xp,sprite_vert:Mp,sprite_frag:wp},ot={common:{diffuse:{value:new st(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Nt},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Nt}},envmap:{envMap:{value:null},envMapRotation:{value:new Nt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Nt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Nt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Nt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Nt},normalScale:{value:new Lt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Nt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Nt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Nt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Nt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new st(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new st(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0},uvTransform:{value:new Nt}},sprite:{diffuse:{value:new st(16777215)},opacity:{value:1},center:{value:new Lt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Nt},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0}}},mn={basic:{uniforms:Be([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.fog]),vertexShader:Ft.meshbasic_vert,fragmentShader:Ft.meshbasic_frag},lambert:{uniforms:Be([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,ot.lights,{emissive:{value:new st(0)}}]),vertexShader:Ft.meshlambert_vert,fragmentShader:Ft.meshlambert_frag},phong:{uniforms:Be([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,ot.lights,{emissive:{value:new st(0)},specular:{value:new st(1118481)},shininess:{value:30}}]),vertexShader:Ft.meshphong_vert,fragmentShader:Ft.meshphong_frag},standard:{uniforms:Be([ot.common,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.roughnessmap,ot.metalnessmap,ot.fog,ot.lights,{emissive:{value:new st(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ft.meshphysical_vert,fragmentShader:Ft.meshphysical_frag},toon:{uniforms:Be([ot.common,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.gradientmap,ot.fog,ot.lights,{emissive:{value:new st(0)}}]),vertexShader:Ft.meshtoon_vert,fragmentShader:Ft.meshtoon_frag},matcap:{uniforms:Be([ot.common,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,{matcap:{value:null}}]),vertexShader:Ft.meshmatcap_vert,fragmentShader:Ft.meshmatcap_frag},points:{uniforms:Be([ot.points,ot.fog]),vertexShader:Ft.points_vert,fragmentShader:Ft.points_frag},dashed:{uniforms:Be([ot.common,ot.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ft.linedashed_vert,fragmentShader:Ft.linedashed_frag},depth:{uniforms:Be([ot.common,ot.displacementmap]),vertexShader:Ft.depth_vert,fragmentShader:Ft.depth_frag},normal:{uniforms:Be([ot.common,ot.bumpmap,ot.normalmap,ot.displacementmap,{opacity:{value:1}}]),vertexShader:Ft.meshnormal_vert,fragmentShader:Ft.meshnormal_frag},sprite:{uniforms:Be([ot.sprite,ot.fog]),vertexShader:Ft.sprite_vert,fragmentShader:Ft.sprite_frag},background:{uniforms:{uvTransform:{value:new Nt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ft.background_vert,fragmentShader:Ft.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Nt}},vertexShader:Ft.backgroundCube_vert,fragmentShader:Ft.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ft.cube_vert,fragmentShader:Ft.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ft.equirect_vert,fragmentShader:Ft.equirect_frag},distanceRGBA:{uniforms:Be([ot.common,ot.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ft.distanceRGBA_vert,fragmentShader:Ft.distanceRGBA_frag},shadow:{uniforms:Be([ot.lights,ot.fog,{color:{value:new st(0)},opacity:{value:1}}]),vertexShader:Ft.shadow_vert,fragmentShader:Ft.shadow_frag}};mn.physical={uniforms:Be([mn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Nt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Nt},clearcoatNormalScale:{value:new Lt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Nt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Nt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Nt},sheen:{value:0},sheenColor:{value:new st(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Nt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Nt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Nt},transmissionSamplerSize:{value:new Lt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Nt},attenuationDistance:{value:0},attenuationColor:{value:new st(0)},specularColor:{value:new st(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Nt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Nt},anisotropyVector:{value:new Lt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Nt}}]),vertexShader:Ft.meshphysical_vert,fragmentShader:Ft.meshphysical_frag};const qs={r:0,b:0,g:0},ei=new on,Sp=new ne;function bp(s,t,e,n,i,r,o){const a=new st(0);let l=r===!0?0:1,c,h,d=null,u=0,p=null;function g(b){let x=b.isScene===!0?b.background:null;return x&&x.isTexture&&(x=(b.backgroundBlurriness>0?e:t).get(x)),x}function _(b){let x=!1;const C=g(b);C===null?f(a,l):C&&C.isColor&&(f(C,1),x=!0);const E=s.xr.getEnvironmentBlendMode();E==="additive"?n.buffers.color.setClear(0,0,0,1,o):E==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function m(b,x){const C=g(x);C&&(C.isCubeTexture||C.mapping===mr)?(h===void 0&&(h=new z(new ft(1,1,1),new Mn({name:"BackgroundCubeMaterial",uniforms:qi(mn.backgroundCube.uniforms),vertexShader:mn.backgroundCube.vertexShader,fragmentShader:mn.backgroundCube.fragmentShader,side:Oe,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(E,A,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),ei.copy(x.backgroundRotation),ei.x*=-1,ei.y*=-1,ei.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(ei.y*=-1,ei.z*=-1),h.material.uniforms.envMap.value=C,h.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Sp.makeRotationFromEuler(ei)),h.material.toneMapped=Zt.getTransfer(C.colorSpace)!==se,(d!==C||u!==C.version||p!==s.toneMapping)&&(h.material.needsUpdate=!0,d=C,u=C.version,p=s.toneMapping),h.layers.enableAll(),b.unshift(h,h.geometry,h.material,0,0,null)):C&&C.isTexture&&(c===void 0&&(c=new z(new He(2,2),new Mn({name:"BackgroundMaterial",uniforms:qi(mn.background.uniforms),vertexShader:mn.background.vertexShader,fragmentShader:mn.background.fragmentShader,side:Yn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=C,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=Zt.getTransfer(C.colorSpace)!==se,C.matrixAutoUpdate===!0&&C.updateMatrix(),c.material.uniforms.uvTransform.value.copy(C.matrix),(d!==C||u!==C.version||p!==s.toneMapping)&&(c.material.needsUpdate=!0,d=C,u=C.version,p=s.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function f(b,x){b.getRGB(qs,Mc(s)),n.buffers.color.setClear(qs.r,qs.g,qs.b,x,o)}function S(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(b,x=1){a.set(b),l=x,f(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(b){l=b,f(a,l)},render:_,addToRenderList:m,dispose:S}}function Ep(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=u(null);let r=i,o=!1;function a(v,R,U,P,H){let q=!1;const F=d(P,U,R);r!==F&&(r=F,c(r.object)),q=p(v,P,U,H),q&&g(v,P,U,H),H!==null&&t.update(H,s.ELEMENT_ARRAY_BUFFER),(q||o)&&(o=!1,x(v,R,U,P),H!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(H).buffer))}function l(){return s.createVertexArray()}function c(v){return s.bindVertexArray(v)}function h(v){return s.deleteVertexArray(v)}function d(v,R,U){const P=U.wireframe===!0;let H=n[v.id];H===void 0&&(H={},n[v.id]=H);let q=H[R.id];q===void 0&&(q={},H[R.id]=q);let F=q[P];return F===void 0&&(F=u(l()),q[P]=F),F}function u(v){const R=[],U=[],P=[];for(let H=0;H<e;H++)R[H]=0,U[H]=0,P[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:U,attributeDivisors:P,object:v,attributes:{},index:null}}function p(v,R,U,P){const H=r.attributes,q=R.attributes;let F=0;const X=U.getAttributes();for(const O in X)if(X[O].location>=0){const nt=H[O];let rt=q[O];if(rt===void 0&&(O==="instanceMatrix"&&v.instanceMatrix&&(rt=v.instanceMatrix),O==="instanceColor"&&v.instanceColor&&(rt=v.instanceColor)),nt===void 0||nt.attribute!==rt||rt&&nt.data!==rt.data)return!0;F++}return r.attributesNum!==F||r.index!==P}function g(v,R,U,P){const H={},q=R.attributes;let F=0;const X=U.getAttributes();for(const O in X)if(X[O].location>=0){let nt=q[O];nt===void 0&&(O==="instanceMatrix"&&v.instanceMatrix&&(nt=v.instanceMatrix),O==="instanceColor"&&v.instanceColor&&(nt=v.instanceColor));const rt={};rt.attribute=nt,nt&&nt.data&&(rt.data=nt.data),H[O]=rt,F++}r.attributes=H,r.attributesNum=F,r.index=P}function _(){const v=r.newAttributes;for(let R=0,U=v.length;R<U;R++)v[R]=0}function m(v){f(v,0)}function f(v,R){const U=r.newAttributes,P=r.enabledAttributes,H=r.attributeDivisors;U[v]=1,P[v]===0&&(s.enableVertexAttribArray(v),P[v]=1),H[v]!==R&&(s.vertexAttribDivisor(v,R),H[v]=R)}function S(){const v=r.newAttributes,R=r.enabledAttributes;for(let U=0,P=R.length;U<P;U++)R[U]!==v[U]&&(s.disableVertexAttribArray(U),R[U]=0)}function b(v,R,U,P,H,q,F){F===!0?s.vertexAttribIPointer(v,R,U,H,q):s.vertexAttribPointer(v,R,U,P,H,q)}function x(v,R,U,P){_();const H=P.attributes,q=U.getAttributes(),F=R.defaultAttributeValues;for(const X in q){const O=q[X];if(O.location>=0){let tt=H[X];if(tt===void 0&&(X==="instanceMatrix"&&v.instanceMatrix&&(tt=v.instanceMatrix),X==="instanceColor"&&v.instanceColor&&(tt=v.instanceColor)),tt!==void 0){const nt=tt.normalized,rt=tt.itemSize,wt=t.get(tt);if(wt===void 0)continue;const jt=wt.buffer,j=wt.type,it=wt.bytesPerElement,xt=j===s.INT||j===s.UNSIGNED_INT||tt.gpuType===aa;if(tt.isInterleavedBufferAttribute){const ct=tt.data,At=ct.stride,Jt=tt.offset;if(ct.isInstancedInterleavedBuffer){for(let Rt=0;Rt<O.locationSize;Rt++)f(O.location+Rt,ct.meshPerAttribute);v.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=ct.meshPerAttribute*ct.count)}else for(let Rt=0;Rt<O.locationSize;Rt++)m(O.location+Rt);s.bindBuffer(s.ARRAY_BUFFER,jt);for(let Rt=0;Rt<O.locationSize;Rt++)b(O.location+Rt,rt/O.locationSize,j,nt,At*it,(Jt+rt/O.locationSize*Rt)*it,xt)}else{if(tt.isInstancedBufferAttribute){for(let ct=0;ct<O.locationSize;ct++)f(O.location+ct,tt.meshPerAttribute);v.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let ct=0;ct<O.locationSize;ct++)m(O.location+ct);s.bindBuffer(s.ARRAY_BUFFER,jt);for(let ct=0;ct<O.locationSize;ct++)b(O.location+ct,rt/O.locationSize,j,nt,rt*it,rt/O.locationSize*ct*it,xt)}}else if(F!==void 0){const nt=F[X];if(nt!==void 0)switch(nt.length){case 2:s.vertexAttrib2fv(O.location,nt);break;case 3:s.vertexAttrib3fv(O.location,nt);break;case 4:s.vertexAttrib4fv(O.location,nt);break;default:s.vertexAttrib1fv(O.location,nt)}}}}S()}function C(){I();for(const v in n){const R=n[v];for(const U in R){const P=R[U];for(const H in P)h(P[H].object),delete P[H];delete R[U]}delete n[v]}}function E(v){if(n[v.id]===void 0)return;const R=n[v.id];for(const U in R){const P=R[U];for(const H in P)h(P[H].object),delete P[H];delete R[U]}delete n[v.id]}function A(v){for(const R in n){const U=n[R];if(U[v.id]===void 0)continue;const P=U[v.id];for(const H in P)h(P[H].object),delete P[H];delete U[v.id]}}function I(){y(),o=!0,r!==i&&(r=i,c(r.object))}function y(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:I,resetDefaultState:y,dispose:C,releaseStatesOfGeometry:E,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:m,disableUnusedAttributes:S}}function Tp(s,t,e){let n;function i(c){n=c}function r(c,h){s.drawArrays(n,c,h),e.update(h,n,1)}function o(c,h,d){d!==0&&(s.drawArraysInstanced(n,c,h,d),e.update(h,n,d))}function a(c,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,d);let p=0;for(let g=0;g<d;g++)p+=h[g];e.update(p,n,1)}function l(c,h,d,u){if(d===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)o(c[g],h[g],u[g]);else{p.multiDrawArraysInstancedWEBGL(n,c,0,h,0,u,0,d);let g=0;for(let _=0;_<d;_++)g+=h[_]*u[_];e.update(g,n,1)}}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Ap(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(A){return!(A!==rn&&n.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const I=A===gs&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==Un&&n.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==_n&&!I)}function l(A){if(A==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=e.logarithmicDepthBuffer===!0,u=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),p=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),f=s.getParameter(s.MAX_VERTEX_ATTRIBS),S=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),b=s.getParameter(s.MAX_VARYING_VECTORS),x=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),C=g>0,E=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:u,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:S,maxVaryings:b,maxFragmentUniforms:x,vertexTextures:C,maxSamples:E}}function Cp(s){const t=this;let e=null,n=0,i=!1,r=!1;const o=new si,a=new Nt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const p=d.length!==0||u||n!==0||i;return i=u,n=d.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,p){const g=d.clippingPlanes,_=d.clipIntersection,m=d.clipShadows,f=s.get(d);if(!i||g===null||g.length===0||r&&!m)r?h(null):c();else{const S=r?0:n,b=S*4;let x=f.clippingState||null;l.value=x,x=h(g,u,b,p);for(let C=0;C!==b;++C)x[C]=e[C];f.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,p,g){const _=d!==null?d.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const f=p+_*4,S=u.matrixWorldInverse;a.getNormalMatrix(S),(m===null||m.length<f)&&(m=new Float32Array(f));for(let b=0,x=p;b!==_;++b,x+=4)o.copy(d[b]).applyMatrix4(S,a),o.normal.toArray(m,x),m[x+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function Rp(s){let t=new WeakMap;function e(o,a){return a===yo?o.mapping=Hi:a===xo&&(o.mapping=Gi),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===yo||a===xo)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Md(l.height);return c.fromEquirectangularTexture(s,o),t.set(o,c),o.addEventListener("dispose",i),e(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const Ni=4,Sl=[.125,.215,.35,.446,.526,.582],ai=20,Zr=new Dc,bl=new st;let Jr=null,Qr=0,to=0,eo=!1;const ri=(1+Math.sqrt(5))/2,Di=1/ri,El=[new L(-ri,Di,0),new L(ri,Di,0),new L(-Di,0,ri),new L(Di,0,ri),new L(0,ri,-Di),new L(0,ri,Di),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)],Ip=new L;class Tl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100,r={}){const{size:o=256,position:a=Ip}=r;Jr=this._renderer.getRenderTarget(),Qr=this._renderer.getActiveCubeFace(),to=this._renderer.getActiveMipmapLevel(),eo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,i,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Rl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Cl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Jr,Qr,to),this._renderer.xr.enabled=eo,t.scissorTest=!1,Ys(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Hi||t.mapping===Gi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Jr=this._renderer.getRenderTarget(),Qr=this._renderer.getActiveCubeFace(),to=this._renderer.getActiveMipmapLevel(),eo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:sn,minFilter:sn,generateMipmaps:!1,type:gs,format:rn,colorSpace:Xi,depthBuffer:!1},i=Al(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Al(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Pp(r)),this._blurMaterial=Lp(r,t,e)}return i}_compileMaterial(t){const e=new z(this._lodPlanes[0],t);this._renderer.compile(e,Zr)}_sceneToCubeUV(t,e,n,i,r){const l=new Ye(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,p=d.toneMapping;d.getClearColor(bl),d.toneMapping=Xn,d.autoClear=!1;const g=new Ae({name:"PMREM.Background",side:Oe,depthWrite:!1,depthTest:!1}),_=new z(new ft,g);let m=!1;const f=t.background;f?f.isColor&&(g.color.copy(f),t.background=null,m=!0):(g.color.copy(bl),m=!0);for(let S=0;S<6;S++){const b=S%3;b===0?(l.up.set(0,c[S],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[S],r.y,r.z)):b===1?(l.up.set(0,0,c[S]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[S],r.z)):(l.up.set(0,c[S],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[S]));const x=this._cubeSize;Ys(i,b*x,S>2?x:0,x,x),d.setRenderTarget(i),m&&d.render(_,l),d.render(t,l)}_.geometry.dispose(),_.material.dispose(),d.toneMapping=p,d.autoClear=u,t.background=f}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===Hi||t.mapping===Gi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Rl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Cl());const r=i?this._cubemapMaterial:this._equirectMaterial,o=new z(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;Ys(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,Zr)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=El[(i-r-1)%El.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,i,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",r),this._halfBlur(o,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new z(this._lodPlanes[i],c),u=c.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*ai-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):ai;m>ai&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ai}`);const f=[];let S=0;for(let A=0;A<ai;++A){const I=A/_,y=Math.exp(-I*I/2);f.push(y),A===0?S+=y:A<m&&(S+=2*y)}for(let A=0;A<f.length;A++)f[A]=f[A]/S;u.envMap.value=t.texture,u.samples.value=m,u.weights.value=f,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);const{_lodMax:b}=this;u.dTheta.value=g,u.mipInt.value=b-n;const x=this._sizeLods[i],C=3*x*(i>b-Ni?i-b+Ni:0),E=4*(this._cubeSize-x);Ys(e,C,E,3*x,2*x),l.setRenderTarget(e),l.render(d,Zr)}}function Pp(s){const t=[],e=[],n=[];let i=s;const r=s-Ni+1+Sl.length;for(let o=0;o<r;o++){const a=Math.pow(2,i);e.push(a);let l=1/a;o>s-Ni?l=Sl[o-s+Ni-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],p=6,g=6,_=3,m=2,f=1,S=new Float32Array(_*g*p),b=new Float32Array(m*g*p),x=new Float32Array(f*g*p);for(let E=0;E<p;E++){const A=E%3*2/3-1,I=E>2?0:-1,y=[A,I,0,A+2/3,I,0,A+2/3,I+1,0,A,I,0,A+2/3,I+1,0,A,I+1,0];S.set(y,_*g*E),b.set(u,m*g*E);const v=[E,E,E,E,E,E];x.set(v,f*g*E)}const C=new be;C.setAttribute("position",new Ce(S,_)),C.setAttribute("uv",new Ce(b,m)),C.setAttribute("faceIndex",new Ce(x,f)),t.push(C),i>Ni&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Al(s,t,e){const n=new di(s,t,e);return n.texture.mapping=mr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ys(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function Lp(s,t,e){const n=new Float32Array(ai),i=new L(0,1,0);return new Mn({name:"SphericalGaussianBlur",defines:{n:ai,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Sa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function Cl(){return new Mn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Sa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function Rl(){return new Mn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Sa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function Sa(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Dp(s){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===yo||l===xo,h=l===Hi||l===Gi;if(c||h){let d=t.get(a);const u=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==u)return e===null&&(e=new Tl(s)),d=c?e.fromEquirectangular(a,d):e.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),d.texture;if(d!==void 0)return d.texture;{const p=a.image;return c&&p&&p.height>0||h&&p&&i(p)?(e===null&&(e=new Tl(s)),d=c?e.fromEquirectangular(a):e.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),a.addEventListener("dispose",r),d.texture):null}}}return a}function i(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Up(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&ii("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Np(s,t,e,n){const i={},r=new WeakMap;function o(d){const u=d.target;u.index!==null&&t.remove(u.index);for(const g in u.attributes)t.remove(u.attributes[g]);u.removeEventListener("dispose",o),delete i[u.id];const p=r.get(u);p&&(t.remove(p),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function a(d,u){return i[u.id]===!0||(u.addEventListener("dispose",o),i[u.id]=!0,e.memory.geometries++),u}function l(d){const u=d.attributes;for(const p in u)t.update(u[p],s.ARRAY_BUFFER)}function c(d){const u=[],p=d.index,g=d.attributes.position;let _=0;if(p!==null){const S=p.array;_=p.version;for(let b=0,x=S.length;b<x;b+=3){const C=S[b+0],E=S[b+1],A=S[b+2];u.push(C,E,E,A,A,C)}}else if(g!==void 0){const S=g.array;_=g.version;for(let b=0,x=S.length/3-1;b<x;b+=3){const C=b+0,E=b+1,A=b+2;u.push(C,E,E,A,A,C)}}else return;const m=new(gc(u)?xc:yc)(u,1);m.version=_;const f=r.get(d);f&&t.remove(f),r.set(d,m)}function h(d){const u=r.get(d);if(u){const p=d.index;p!==null&&u.version<p.version&&c(d)}else c(d);return r.get(d)}return{get:a,update:l,getWireframeAttribute:h}}function kp(s,t,e){let n;function i(u){n=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function l(u,p){s.drawElements(n,p,r,u*o),e.update(p,n,1)}function c(u,p,g){g!==0&&(s.drawElementsInstanced(n,p,r,u*o,g),e.update(p,n,g))}function h(u,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,u,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];e.update(m,n,1)}function d(u,p,g,_){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<u.length;f++)c(u[f]/o,p[f],_[f]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,r,u,0,_,0,g);let f=0;for(let S=0;S<g;S++)f+=p[S]*_[S];e.update(f,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function Fp(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case s.TRIANGLES:e.triangles+=a*(r/3);break;case s.LINES:e.lines+=a*(r/2);break;case s.LINE_STRIP:e.lines+=a*(r-1);break;case s.LINE_LOOP:e.lines+=a*r;break;case s.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function Bp(s,t,e){const n=new WeakMap,i=new oe;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0;let u=n.get(a);if(u===void 0||u.count!==d){let v=function(){I.dispose(),n.delete(a),a.removeEventListener("dispose",v)};var p=v;u!==void 0&&u.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,f=a.morphAttributes.position||[],S=a.morphAttributes.normal||[],b=a.morphAttributes.color||[];let x=0;g===!0&&(x=1),_===!0&&(x=2),m===!0&&(x=3);let C=a.attributes.position.count*x,E=1;C>t.maxTextureSize&&(E=Math.ceil(C/t.maxTextureSize),C=t.maxTextureSize);const A=new Float32Array(C*E*4*d),I=new _c(A,C,E,d);I.type=_n,I.needsUpdate=!0;const y=x*4;for(let R=0;R<d;R++){const U=f[R],P=S[R],H=b[R],q=C*E*4*R;for(let F=0;F<U.count;F++){const X=F*y;g===!0&&(i.fromBufferAttribute(U,F),A[q+X+0]=i.x,A[q+X+1]=i.y,A[q+X+2]=i.z,A[q+X+3]=0),_===!0&&(i.fromBufferAttribute(P,F),A[q+X+4]=i.x,A[q+X+5]=i.y,A[q+X+6]=i.z,A[q+X+7]=0),m===!0&&(i.fromBufferAttribute(H,F),A[q+X+8]=i.x,A[q+X+9]=i.y,A[q+X+10]=i.z,A[q+X+11]=H.itemSize===4?i.w:1)}}u={count:d,texture:I,size:new Lt(C,E)},n.set(a,u),a.addEventListener("dispose",v)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",o.morphTexture,e);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const _=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(s,"morphTargetBaseInfluence",_),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",u.size)}return{update:r}}function Op(s,t,e,n){let i=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,d=t.get(l,h);if(i.get(d)!==c&&(t.update(d),i.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(e.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const u=l.skeleton;i.get(u)!==c&&(u.update(),i.set(u,c))}return d}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}const Nc=new Ne,Il=new Ic(1,1),kc=new _c,Fc=new sd,Bc=new Sc,Pl=[],Ll=[],Dl=new Float32Array(16),Ul=new Float32Array(9),Nl=new Float32Array(4);function $i(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let r=Pl[i];if(r===void 0&&(r=new Float32Array(i),Pl[i]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,s[o].toArray(r,a)}return r}function xe(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function Me(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function vr(s,t){let e=Ll[t];e===void 0&&(e=new Int32Array(t),Ll[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function zp(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function Hp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(xe(e,t))return;s.uniform2fv(this.addr,t),Me(e,t)}}function Gp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(xe(e,t))return;s.uniform3fv(this.addr,t),Me(e,t)}}function Vp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(xe(e,t))return;s.uniform4fv(this.addr,t),Me(e,t)}}function Wp(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(xe(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),Me(e,t)}else{if(xe(e,n))return;Nl.set(n),s.uniformMatrix2fv(this.addr,!1,Nl),Me(e,n)}}function Xp(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(xe(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),Me(e,t)}else{if(xe(e,n))return;Ul.set(n),s.uniformMatrix3fv(this.addr,!1,Ul),Me(e,n)}}function qp(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(xe(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),Me(e,t)}else{if(xe(e,n))return;Dl.set(n),s.uniformMatrix4fv(this.addr,!1,Dl),Me(e,n)}}function Yp(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function $p(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(xe(e,t))return;s.uniform2iv(this.addr,t),Me(e,t)}}function jp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(xe(e,t))return;s.uniform3iv(this.addr,t),Me(e,t)}}function Kp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(xe(e,t))return;s.uniform4iv(this.addr,t),Me(e,t)}}function Zp(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function Jp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(xe(e,t))return;s.uniform2uiv(this.addr,t),Me(e,t)}}function Qp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(xe(e,t))return;s.uniform3uiv(this.addr,t),Me(e,t)}}function tm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(xe(e,t))return;s.uniform4uiv(this.addr,t),Me(e,t)}}function em(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(Il.compareFunction=mc,r=Il):r=Nc,e.setTexture2D(t||r,i)}function nm(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||Fc,i)}function im(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||Bc,i)}function sm(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||kc,i)}function rm(s){switch(s){case 5126:return zp;case 35664:return Hp;case 35665:return Gp;case 35666:return Vp;case 35674:return Wp;case 35675:return Xp;case 35676:return qp;case 5124:case 35670:return Yp;case 35667:case 35671:return $p;case 35668:case 35672:return jp;case 35669:case 35673:return Kp;case 5125:return Zp;case 36294:return Jp;case 36295:return Qp;case 36296:return tm;case 35678:case 36198:case 36298:case 36306:case 35682:return em;case 35679:case 36299:case 36307:return nm;case 35680:case 36300:case 36308:case 36293:return im;case 36289:case 36303:case 36311:case 36292:return sm}}function om(s,t){s.uniform1fv(this.addr,t)}function am(s,t){const e=$i(t,this.size,2);s.uniform2fv(this.addr,e)}function lm(s,t){const e=$i(t,this.size,3);s.uniform3fv(this.addr,e)}function cm(s,t){const e=$i(t,this.size,4);s.uniform4fv(this.addr,e)}function hm(s,t){const e=$i(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function dm(s,t){const e=$i(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function um(s,t){const e=$i(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function fm(s,t){s.uniform1iv(this.addr,t)}function pm(s,t){s.uniform2iv(this.addr,t)}function mm(s,t){s.uniform3iv(this.addr,t)}function gm(s,t){s.uniform4iv(this.addr,t)}function _m(s,t){s.uniform1uiv(this.addr,t)}function vm(s,t){s.uniform2uiv(this.addr,t)}function ym(s,t){s.uniform3uiv(this.addr,t)}function xm(s,t){s.uniform4uiv(this.addr,t)}function Mm(s,t,e){const n=this.cache,i=t.length,r=vr(e,i);xe(n,r)||(s.uniform1iv(this.addr,r),Me(n,r));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||Nc,r[o])}function wm(s,t,e){const n=this.cache,i=t.length,r=vr(e,i);xe(n,r)||(s.uniform1iv(this.addr,r),Me(n,r));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||Fc,r[o])}function Sm(s,t,e){const n=this.cache,i=t.length,r=vr(e,i);xe(n,r)||(s.uniform1iv(this.addr,r),Me(n,r));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||Bc,r[o])}function bm(s,t,e){const n=this.cache,i=t.length,r=vr(e,i);xe(n,r)||(s.uniform1iv(this.addr,r),Me(n,r));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||kc,r[o])}function Em(s){switch(s){case 5126:return om;case 35664:return am;case 35665:return lm;case 35666:return cm;case 35674:return hm;case 35675:return dm;case 35676:return um;case 5124:case 35670:return fm;case 35667:case 35671:return pm;case 35668:case 35672:return mm;case 35669:case 35673:return gm;case 5125:return _m;case 36294:return vm;case 36295:return ym;case 36296:return xm;case 35678:case 36198:case 36298:case 36306:case 35682:return Mm;case 35679:case 36299:case 36307:return wm;case 35680:case 36300:case 36308:case 36293:return Sm;case 36289:case 36303:case 36311:case 36292:return bm}}class Tm{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=rm(e.type)}}class Am{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Em(e.type)}}class Cm{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let r=0,o=i.length;r!==o;++r){const a=i[r];a.setValue(t,e[a.id],n)}}}const no=/(\w+)(\])?(\[|\.)?/g;function kl(s,t){s.seq.push(t),s.map[t.id]=t}function Rm(s,t,e){const n=s.name,i=n.length;for(no.lastIndex=0;;){const r=no.exec(n),o=no.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){kl(e,c===void 0?new Tm(a,s,t):new Am(a,s,t));break}else{let d=e.map[a];d===void 0&&(d=new Cm(a),kl(e,d)),e=d}}}class nr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=t.getActiveUniform(e,i),o=t.getUniformLocation(e,r.name);Rm(r,o,this)}}setValue(t,e,n,i){const r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,r=t.length;i!==r;++i){const o=t[i];o.id in e&&n.push(o)}return n}}function Fl(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const Im=37297;let Pm=0;function Lm(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=i;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const Bl=new Nt;function Dm(s){Zt._getMatrix(Bl,Zt.workingColorSpace,s);const t=`mat3( ${Bl.elements.map(e=>e.toFixed(4))} )`;switch(Zt.getTransfer(s)){case lr:return[t,"LinearTransferOETF"];case se:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function Ol(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+i+`

`+Lm(s.getShaderSource(t),o)}else return i}function Um(s,t){const e=Dm(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Nm(s,t){let e;switch(t){case Ph:e="Linear";break;case Lh:e="Reinhard";break;case Dh:e="Cineon";break;case sc:e="ACESFilmic";break;case Nh:e="AgX";break;case kh:e="Neutral";break;case Uh:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const $s=new L;function km(){Zt.getLuminanceCoefficients($s);const s=$s.x.toFixed(4),t=$s.y.toFixed(4),e=$s.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Fm(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(us).join(`
`)}function Bm(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Om(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(t,i),o=r.name;let a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:s.getAttribLocation(t,o),locationSize:a}}return e}function us(s){return s!==""}function zl(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Hl(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const zm=/^[ \t]*#include +<([\w\d./]+)>/gm;function Jo(s){return s.replace(zm,Gm)}const Hm=new Map;function Gm(s,t){let e=Ft[t];if(e===void 0){const n=Hm.get(t);if(n!==void 0)e=Ft[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Jo(e)}const Vm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Gl(s){return s.replace(Vm,Wm)}function Wm(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Vl(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Xm(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===nc?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===ic?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Rn&&(t="SHADOWMAP_TYPE_VSM"),t}function qm(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Hi:case Gi:t="ENVMAP_TYPE_CUBE";break;case mr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Ym(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Gi:t="ENVMAP_MODE_REFRACTION";break}return t}function $m(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case oa:t="ENVMAP_BLENDING_MULTIPLY";break;case Rh:t="ENVMAP_BLENDING_MIX";break;case Ih:t="ENVMAP_BLENDING_ADD";break}return t}function jm(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Km(s,t,e,n){const i=s.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=Xm(e),c=qm(e),h=Ym(e),d=$m(e),u=jm(e),p=Fm(e),g=Bm(r),_=i.createProgram();let m,f,S=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(us).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(us).join(`
`),f.length>0&&(f+=`
`)):(m=[Vl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(us).join(`
`),f=[Vl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Xn?"#define TONE_MAPPING":"",e.toneMapping!==Xn?Ft.tonemapping_pars_fragment:"",e.toneMapping!==Xn?Nm("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ft.colorspace_pars_fragment,Um("linearToOutputTexel",e.outputColorSpace),km(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(us).join(`
`)),o=Jo(o),o=zl(o,e),o=Hl(o,e),a=Jo(a),a=zl(a,e),a=Hl(a,e),o=Gl(o),a=Gl(a),e.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",e.glslVersion===Ha?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Ha?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const b=S+m+o,x=S+f+a,C=Fl(i,i.VERTEX_SHADER,b),E=Fl(i,i.FRAGMENT_SHADER,x);i.attachShader(_,C),i.attachShader(_,E),e.index0AttributeName!==void 0?i.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function A(R){if(s.debug.checkShaderErrors){const U=i.getProgramInfoLog(_).trim(),P=i.getShaderInfoLog(C).trim(),H=i.getShaderInfoLog(E).trim();let q=!0,F=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(q=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,C,E);else{const X=Ol(i,C,"vertex"),O=Ol(i,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+U+`
`+X+`
`+O)}else U!==""?console.warn("THREE.WebGLProgram: Program Info Log:",U):(P===""||H==="")&&(F=!1);F&&(R.diagnostics={runnable:q,programLog:U,vertexShader:{log:P,prefix:m},fragmentShader:{log:H,prefix:f}})}i.deleteShader(C),i.deleteShader(E),I=new nr(i,_),y=Om(i,_)}let I;this.getUniforms=function(){return I===void 0&&A(this),I};let y;this.getAttributes=function(){return y===void 0&&A(this),y};let v=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=i.getProgramParameter(_,Im)),v},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Pm++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=C,this.fragmentShader=E,this}let Zm=0;class Jm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Qm(t),e.set(t,n)),n}}class Qm{constructor(t){this.id=Zm++,this.code=t,this.usedTimes=0}}function tg(s,t,e,n,i,r,o){const a=new ga,l=new Jm,c=new Set,h=[],d=i.logarithmicDepthBuffer,u=i.vertexTextures;let p=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(y){return c.add(y),y===0?"uv":`uv${y}`}function m(y,v,R,U,P){const H=U.fog,q=P.geometry,F=y.isMeshStandardMaterial?U.environment:null,X=(y.isMeshStandardMaterial?e:t).get(y.envMap||F),O=X&&X.mapping===mr?X.image.height:null,tt=g[y.type];y.precision!==null&&(p=i.getMaxPrecision(y.precision),p!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",p,"instead."));const nt=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,rt=nt!==void 0?nt.length:0;let wt=0;q.morphAttributes.position!==void 0&&(wt=1),q.morphAttributes.normal!==void 0&&(wt=2),q.morphAttributes.color!==void 0&&(wt=3);let jt,j,it,xt;if(tt){const ie=mn[tt];jt=ie.vertexShader,j=ie.fragmentShader}else jt=y.vertexShader,j=y.fragmentShader,l.update(y),it=l.getVertexShaderID(y),xt=l.getFragmentShaderID(y);const ct=s.getRenderTarget(),At=s.state.buffers.depth.getReversed(),Jt=P.isInstancedMesh===!0,Rt=P.isBatchedMesh===!0,me=!!y.map,ue=!!y.matcap,Gt=!!X,D=!!y.aoMap,je=!!y.lightMap,Vt=!!y.bumpMap,Wt=!!y.normalMap,bt=!!y.displacementMap,ce=!!y.emissiveMap,St=!!y.metalnessMap,T=!!y.roughnessMap,M=y.anisotropy>0,G=y.clearcoat>0,K=y.dispersion>0,J=y.iridescence>0,$=y.sheen>0,Mt=y.transmission>0,ht=M&&!!y.anisotropyMap,mt=G&&!!y.clearcoatMap,Yt=G&&!!y.clearcoatNormalMap,et=G&&!!y.clearcoatRoughnessMap,gt=J&&!!y.iridescenceMap,Ct=J&&!!y.iridescenceThicknessMap,It=$&&!!y.sheenColorMap,_t=$&&!!y.sheenRoughnessMap,Xt=!!y.specularMap,kt=!!y.specularColorMap,ae=!!y.specularIntensityMap,N=Mt&&!!y.transmissionMap,at=Mt&&!!y.thicknessMap,Y=!!y.gradientMap,Z=!!y.alphaMap,ut=y.alphaTest>0,dt=!!y.alphaHash,Ut=!!y.extensions;let fe=Xn;y.toneMapped&&(ct===null||ct.isXRRenderTarget===!0)&&(fe=s.toneMapping);const Re={shaderID:tt,shaderType:y.type,shaderName:y.name,vertexShader:jt,fragmentShader:j,defines:y.defines,customVertexShaderID:it,customFragmentShaderID:xt,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:p,batching:Rt,batchingColor:Rt&&P._colorsTexture!==null,instancing:Jt,instancingColor:Jt&&P.instanceColor!==null,instancingMorph:Jt&&P.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:ct===null?s.outputColorSpace:ct.isXRRenderTarget===!0?ct.texture.colorSpace:Xi,alphaToCoverage:!!y.alphaToCoverage,map:me,matcap:ue,envMap:Gt,envMapMode:Gt&&X.mapping,envMapCubeUVHeight:O,aoMap:D,lightMap:je,bumpMap:Vt,normalMap:Wt,displacementMap:u&&bt,emissiveMap:ce,normalMapObjectSpace:Wt&&y.normalMapType===zh,normalMapTangentSpace:Wt&&y.normalMapType===pa,metalnessMap:St,roughnessMap:T,anisotropy:M,anisotropyMap:ht,clearcoat:G,clearcoatMap:mt,clearcoatNormalMap:Yt,clearcoatRoughnessMap:et,dispersion:K,iridescence:J,iridescenceMap:gt,iridescenceThicknessMap:Ct,sheen:$,sheenColorMap:It,sheenRoughnessMap:_t,specularMap:Xt,specularColorMap:kt,specularIntensityMap:ae,transmission:Mt,transmissionMap:N,thicknessMap:at,gradientMap:Y,opaque:y.transparent===!1&&y.blending===Fi&&y.alphaToCoverage===!1,alphaMap:Z,alphaTest:ut,alphaHash:dt,combine:y.combine,mapUv:me&&_(y.map.channel),aoMapUv:D&&_(y.aoMap.channel),lightMapUv:je&&_(y.lightMap.channel),bumpMapUv:Vt&&_(y.bumpMap.channel),normalMapUv:Wt&&_(y.normalMap.channel),displacementMapUv:bt&&_(y.displacementMap.channel),emissiveMapUv:ce&&_(y.emissiveMap.channel),metalnessMapUv:St&&_(y.metalnessMap.channel),roughnessMapUv:T&&_(y.roughnessMap.channel),anisotropyMapUv:ht&&_(y.anisotropyMap.channel),clearcoatMapUv:mt&&_(y.clearcoatMap.channel),clearcoatNormalMapUv:Yt&&_(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:et&&_(y.clearcoatRoughnessMap.channel),iridescenceMapUv:gt&&_(y.iridescenceMap.channel),iridescenceThicknessMapUv:Ct&&_(y.iridescenceThicknessMap.channel),sheenColorMapUv:It&&_(y.sheenColorMap.channel),sheenRoughnessMapUv:_t&&_(y.sheenRoughnessMap.channel),specularMapUv:Xt&&_(y.specularMap.channel),specularColorMapUv:kt&&_(y.specularColorMap.channel),specularIntensityMapUv:ae&&_(y.specularIntensityMap.channel),transmissionMapUv:N&&_(y.transmissionMap.channel),thicknessMapUv:at&&_(y.thicknessMap.channel),alphaMapUv:Z&&_(y.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(Wt||M),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:P.isPoints===!0&&!!q.attributes.uv&&(me||Z),fog:!!H,useFog:y.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:At,skinning:P.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:rt,morphTextureStride:wt,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:y.dithering,shadowMapEnabled:s.shadowMap.enabled&&R.length>0,shadowMapType:s.shadowMap.type,toneMapping:fe,decodeVideoTexture:me&&y.map.isVideoTexture===!0&&Zt.getTransfer(y.map.colorSpace)===se,decodeVideoTextureEmissive:ce&&y.emissiveMap.isVideoTexture===!0&&Zt.getTransfer(y.emissiveMap.colorSpace)===se,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Se,flipSided:y.side===Oe,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Ut&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ut&&y.extensions.multiDraw===!0||Rt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Re.vertexUv1s=c.has(1),Re.vertexUv2s=c.has(2),Re.vertexUv3s=c.has(3),c.clear(),Re}function f(y){const v=[];if(y.shaderID?v.push(y.shaderID):(v.push(y.customVertexShaderID),v.push(y.customFragmentShaderID)),y.defines!==void 0)for(const R in y.defines)v.push(R),v.push(y.defines[R]);return y.isRawShaderMaterial===!1&&(S(v,y),b(v,y),v.push(s.outputColorSpace)),v.push(y.customProgramCacheKey),v.join()}function S(y,v){y.push(v.precision),y.push(v.outputColorSpace),y.push(v.envMapMode),y.push(v.envMapCubeUVHeight),y.push(v.mapUv),y.push(v.alphaMapUv),y.push(v.lightMapUv),y.push(v.aoMapUv),y.push(v.bumpMapUv),y.push(v.normalMapUv),y.push(v.displacementMapUv),y.push(v.emissiveMapUv),y.push(v.metalnessMapUv),y.push(v.roughnessMapUv),y.push(v.anisotropyMapUv),y.push(v.clearcoatMapUv),y.push(v.clearcoatNormalMapUv),y.push(v.clearcoatRoughnessMapUv),y.push(v.iridescenceMapUv),y.push(v.iridescenceThicknessMapUv),y.push(v.sheenColorMapUv),y.push(v.sheenRoughnessMapUv),y.push(v.specularMapUv),y.push(v.specularColorMapUv),y.push(v.specularIntensityMapUv),y.push(v.transmissionMapUv),y.push(v.thicknessMapUv),y.push(v.combine),y.push(v.fogExp2),y.push(v.sizeAttenuation),y.push(v.morphTargetsCount),y.push(v.morphAttributeCount),y.push(v.numDirLights),y.push(v.numPointLights),y.push(v.numSpotLights),y.push(v.numSpotLightMaps),y.push(v.numHemiLights),y.push(v.numRectAreaLights),y.push(v.numDirLightShadows),y.push(v.numPointLightShadows),y.push(v.numSpotLightShadows),y.push(v.numSpotLightShadowsWithMaps),y.push(v.numLightProbes),y.push(v.shadowMapType),y.push(v.toneMapping),y.push(v.numClippingPlanes),y.push(v.numClipIntersection),y.push(v.depthPacking)}function b(y,v){a.disableAll(),v.supportsVertexTextures&&a.enable(0),v.instancing&&a.enable(1),v.instancingColor&&a.enable(2),v.instancingMorph&&a.enable(3),v.matcap&&a.enable(4),v.envMap&&a.enable(5),v.normalMapObjectSpace&&a.enable(6),v.normalMapTangentSpace&&a.enable(7),v.clearcoat&&a.enable(8),v.iridescence&&a.enable(9),v.alphaTest&&a.enable(10),v.vertexColors&&a.enable(11),v.vertexAlphas&&a.enable(12),v.vertexUv1s&&a.enable(13),v.vertexUv2s&&a.enable(14),v.vertexUv3s&&a.enable(15),v.vertexTangents&&a.enable(16),v.anisotropy&&a.enable(17),v.alphaHash&&a.enable(18),v.batching&&a.enable(19),v.dispersion&&a.enable(20),v.batchingColor&&a.enable(21),y.push(a.mask),a.disableAll(),v.fog&&a.enable(0),v.useFog&&a.enable(1),v.flatShading&&a.enable(2),v.logarithmicDepthBuffer&&a.enable(3),v.reverseDepthBuffer&&a.enable(4),v.skinning&&a.enable(5),v.morphTargets&&a.enable(6),v.morphNormals&&a.enable(7),v.morphColors&&a.enable(8),v.premultipliedAlpha&&a.enable(9),v.shadowMapEnabled&&a.enable(10),v.doubleSided&&a.enable(11),v.flipSided&&a.enable(12),v.useDepthPacking&&a.enable(13),v.dithering&&a.enable(14),v.transmission&&a.enable(15),v.sheen&&a.enable(16),v.opaque&&a.enable(17),v.pointsUvs&&a.enable(18),v.decodeVideoTexture&&a.enable(19),v.decodeVideoTextureEmissive&&a.enable(20),v.alphaToCoverage&&a.enable(21),y.push(a.mask)}function x(y){const v=g[y.type];let R;if(v){const U=mn[v];R=_d.clone(U.uniforms)}else R=y.uniforms;return R}function C(y,v){let R;for(let U=0,P=h.length;U<P;U++){const H=h[U];if(H.cacheKey===v){R=H,++R.usedTimes;break}}return R===void 0&&(R=new Km(s,v,y,r),h.push(R)),R}function E(y){if(--y.usedTimes===0){const v=h.indexOf(y);h[v]=h[h.length-1],h.pop(),y.destroy()}}function A(y){l.remove(y)}function I(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:x,acquireProgram:C,releaseProgram:E,releaseShaderCache:A,programs:h,dispose:I}}function eg(){let s=new WeakMap;function t(o){return s.has(o)}function e(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function n(o){s.delete(o)}function i(o,a,l){s.get(o)[a]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function ng(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function Wl(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function Xl(){const s=[];let t=0;const e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function o(d,u,p,g,_,m){let f=s[t];return f===void 0?(f={id:d.id,object:d,geometry:u,material:p,groupOrder:g,renderOrder:d.renderOrder,z:_,group:m},s[t]=f):(f.id=d.id,f.object=d,f.geometry=u,f.material=p,f.groupOrder=g,f.renderOrder=d.renderOrder,f.z=_,f.group=m),t++,f}function a(d,u,p,g,_,m){const f=o(d,u,p,g,_,m);p.transmission>0?n.push(f):p.transparent===!0?i.push(f):e.push(f)}function l(d,u,p,g,_,m){const f=o(d,u,p,g,_,m);p.transmission>0?n.unshift(f):p.transparent===!0?i.unshift(f):e.unshift(f)}function c(d,u){e.length>1&&e.sort(d||ng),n.length>1&&n.sort(u||Wl),i.length>1&&i.sort(u||Wl)}function h(){for(let d=t,u=s.length;d<u;d++){const p=s[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:a,unshift:l,finish:h,sort:c}}function ig(){let s=new WeakMap;function t(n,i){const r=s.get(n);let o;return r===void 0?(o=new Xl,s.set(n,[o])):i>=r.length?(o=new Xl,r.push(o)):o=r[i],o}function e(){s=new WeakMap}return{get:t,dispose:e}}function sg(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new L,color:new st};break;case"SpotLight":e={position:new L,direction:new L,color:new st,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new L,color:new st,distance:0,decay:0};break;case"HemisphereLight":e={direction:new L,skyColor:new st,groundColor:new st};break;case"RectAreaLight":e={color:new st,position:new L,halfWidth:new L,halfHeight:new L};break}return s[t.id]=e,e}}}function rg(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Lt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Lt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Lt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let og=0;function ag(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function lg(s){const t=new sg,e=rg(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new L);const i=new L,r=new ne,o=new ne;function a(c){let h=0,d=0,u=0;for(let y=0;y<9;y++)n.probe[y].set(0,0,0);let p=0,g=0,_=0,m=0,f=0,S=0,b=0,x=0,C=0,E=0,A=0;c.sort(ag);for(let y=0,v=c.length;y<v;y++){const R=c[y],U=R.color,P=R.intensity,H=R.distance,q=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)h+=U.r*P,d+=U.g*P,u+=U.b*P;else if(R.isLightProbe){for(let F=0;F<9;F++)n.probe[F].addScaledVector(R.sh.coefficients[F],P);A++}else if(R.isDirectionalLight){const F=t.get(R);if(F.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const X=R.shadow,O=e.get(R);O.shadowIntensity=X.intensity,O.shadowBias=X.bias,O.shadowNormalBias=X.normalBias,O.shadowRadius=X.radius,O.shadowMapSize=X.mapSize,n.directionalShadow[p]=O,n.directionalShadowMap[p]=q,n.directionalShadowMatrix[p]=R.shadow.matrix,S++}n.directional[p]=F,p++}else if(R.isSpotLight){const F=t.get(R);F.position.setFromMatrixPosition(R.matrixWorld),F.color.copy(U).multiplyScalar(P),F.distance=H,F.coneCos=Math.cos(R.angle),F.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),F.decay=R.decay,n.spot[_]=F;const X=R.shadow;if(R.map&&(n.spotLightMap[C]=R.map,C++,X.updateMatrices(R),R.castShadow&&E++),n.spotLightMatrix[_]=X.matrix,R.castShadow){const O=e.get(R);O.shadowIntensity=X.intensity,O.shadowBias=X.bias,O.shadowNormalBias=X.normalBias,O.shadowRadius=X.radius,O.shadowMapSize=X.mapSize,n.spotShadow[_]=O,n.spotShadowMap[_]=q,x++}_++}else if(R.isRectAreaLight){const F=t.get(R);F.color.copy(U).multiplyScalar(P),F.halfWidth.set(R.width*.5,0,0),F.halfHeight.set(0,R.height*.5,0),n.rectArea[m]=F,m++}else if(R.isPointLight){const F=t.get(R);if(F.color.copy(R.color).multiplyScalar(R.intensity),F.distance=R.distance,F.decay=R.decay,R.castShadow){const X=R.shadow,O=e.get(R);O.shadowIntensity=X.intensity,O.shadowBias=X.bias,O.shadowNormalBias=X.normalBias,O.shadowRadius=X.radius,O.shadowMapSize=X.mapSize,O.shadowCameraNear=X.camera.near,O.shadowCameraFar=X.camera.far,n.pointShadow[g]=O,n.pointShadowMap[g]=q,n.pointShadowMatrix[g]=R.shadow.matrix,b++}n.point[g]=F,g++}else if(R.isHemisphereLight){const F=t.get(R);F.skyColor.copy(R.color).multiplyScalar(P),F.groundColor.copy(R.groundColor).multiplyScalar(P),n.hemi[f]=F,f++}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ot.LTC_FLOAT_1,n.rectAreaLTC2=ot.LTC_FLOAT_2):(n.rectAreaLTC1=ot.LTC_HALF_1,n.rectAreaLTC2=ot.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;const I=n.hash;(I.directionalLength!==p||I.pointLength!==g||I.spotLength!==_||I.rectAreaLength!==m||I.hemiLength!==f||I.numDirectionalShadows!==S||I.numPointShadows!==b||I.numSpotShadows!==x||I.numSpotMaps!==C||I.numLightProbes!==A)&&(n.directional.length=p,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=f,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=S,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=x+C-E,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=A,I.directionalLength=p,I.pointLength=g,I.spotLength=_,I.rectAreaLength=m,I.hemiLength=f,I.numDirectionalShadows=S,I.numPointShadows=b,I.numSpotShadows=x,I.numSpotMaps=C,I.numLightProbes=A,n.version=og++)}function l(c,h){let d=0,u=0,p=0,g=0,_=0;const m=h.matrixWorldInverse;for(let f=0,S=c.length;f<S;f++){const b=c[f];if(b.isDirectionalLight){const x=n.directional[d];x.direction.setFromMatrixPosition(b.matrixWorld),i.setFromMatrixPosition(b.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(m),d++}else if(b.isSpotLight){const x=n.spot[p];x.position.setFromMatrixPosition(b.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(b.matrixWorld),i.setFromMatrixPosition(b.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(m),p++}else if(b.isRectAreaLight){const x=n.rectArea[g];x.position.setFromMatrixPosition(b.matrixWorld),x.position.applyMatrix4(m),o.identity(),r.copy(b.matrixWorld),r.premultiply(m),o.extractRotation(r),x.halfWidth.set(b.width*.5,0,0),x.halfHeight.set(0,b.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),g++}else if(b.isPointLight){const x=n.point[u];x.position.setFromMatrixPosition(b.matrixWorld),x.position.applyMatrix4(m),u++}else if(b.isHemisphereLight){const x=n.hemi[_];x.direction.setFromMatrixPosition(b.matrixWorld),x.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:n}}function ql(s){const t=new lg(s),e=[],n=[];function i(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function cg(s){let t=new WeakMap;function e(i,r=0){const o=t.get(i);let a;return o===void 0?(a=new ql(s),t.set(i,[a])):r>=o.length?(a=new ql(s),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const hg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,dg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function ug(s,t,e){let n=new va;const i=new Lt,r=new Lt,o=new oe,a=new Ld({depthPacking:Oh}),l=new Dd,c={},h=e.maxTextureSize,d={[Yn]:Oe,[Oe]:Yn,[Se]:Se},u=new Mn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Lt},radius:{value:4}},vertexShader:hg,fragmentShader:dg}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const g=new be;g.setAttribute("position",new Ce(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new z(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=nc;let f=this.type;this.render=function(E,A,I){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;const y=s.getRenderTarget(),v=s.getActiveCubeFace(),R=s.getActiveMipmapLevel(),U=s.state;U.setBlending(Wn),U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const P=f!==Rn&&this.type===Rn,H=f===Rn&&this.type!==Rn;for(let q=0,F=E.length;q<F;q++){const X=E[q],O=X.shadow;if(O===void 0){console.warn("THREE.WebGLShadowMap:",X,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;i.copy(O.mapSize);const tt=O.getFrameExtents();if(i.multiply(tt),r.copy(O.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/tt.x),i.x=r.x*tt.x,O.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/tt.y),i.y=r.y*tt.y,O.mapSize.y=r.y)),O.map===null||P===!0||H===!0){const rt=this.type!==Rn?{minFilter:$e,magFilter:$e}:{};O.map!==null&&O.map.dispose(),O.map=new di(i.x,i.y,rt),O.map.texture.name=X.name+".shadowMap",O.camera.updateProjectionMatrix()}s.setRenderTarget(O.map),s.clear();const nt=O.getViewportCount();for(let rt=0;rt<nt;rt++){const wt=O.getViewport(rt);o.set(r.x*wt.x,r.y*wt.y,r.x*wt.z,r.y*wt.w),U.viewport(o),O.updateMatrices(X,rt),n=O.getFrustum(),x(A,I,O.camera,X,this.type)}O.isPointLightShadow!==!0&&this.type===Rn&&S(O,I),O.needsUpdate=!1}f=this.type,m.needsUpdate=!1,s.setRenderTarget(y,v,R)};function S(E,A){const I=t.update(_);u.defines.VSM_SAMPLES!==E.blurSamples&&(u.defines.VSM_SAMPLES=E.blurSamples,p.defines.VSM_SAMPLES=E.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new di(i.x,i.y)),u.uniforms.shadow_pass.value=E.map.texture,u.uniforms.resolution.value=E.mapSize,u.uniforms.radius.value=E.radius,s.setRenderTarget(E.mapPass),s.clear(),s.renderBufferDirect(A,null,I,u,_,null),p.uniforms.shadow_pass.value=E.mapPass.texture,p.uniforms.resolution.value=E.mapSize,p.uniforms.radius.value=E.radius,s.setRenderTarget(E.map),s.clear(),s.renderBufferDirect(A,null,I,p,_,null)}function b(E,A,I,y){let v=null;const R=I.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(R!==void 0)v=R;else if(v=I.isPointLight===!0?l:a,s.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const U=v.uuid,P=A.uuid;let H=c[U];H===void 0&&(H={},c[U]=H);let q=H[P];q===void 0&&(q=v.clone(),H[P]=q,A.addEventListener("dispose",C)),v=q}if(v.visible=A.visible,v.wireframe=A.wireframe,y===Rn?v.side=A.shadowSide!==null?A.shadowSide:A.side:v.side=A.shadowSide!==null?A.shadowSide:d[A.side],v.alphaMap=A.alphaMap,v.alphaTest=A.alphaTest,v.map=A.map,v.clipShadows=A.clipShadows,v.clippingPlanes=A.clippingPlanes,v.clipIntersection=A.clipIntersection,v.displacementMap=A.displacementMap,v.displacementScale=A.displacementScale,v.displacementBias=A.displacementBias,v.wireframeLinewidth=A.wireframeLinewidth,v.linewidth=A.linewidth,I.isPointLight===!0&&v.isMeshDistanceMaterial===!0){const U=s.properties.get(v);U.light=I}return v}function x(E,A,I,y,v){if(E.visible===!1)return;if(E.layers.test(A.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&v===Rn)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,E.matrixWorld);const P=t.update(E),H=E.material;if(Array.isArray(H)){const q=P.groups;for(let F=0,X=q.length;F<X;F++){const O=q[F],tt=H[O.materialIndex];if(tt&&tt.visible){const nt=b(E,tt,y,v);E.onBeforeShadow(s,E,A,I,P,nt,O),s.renderBufferDirect(I,null,P,nt,E,O),E.onAfterShadow(s,E,A,I,P,nt,O)}}}else if(H.visible){const q=b(E,H,y,v);E.onBeforeShadow(s,E,A,I,P,q,null),s.renderBufferDirect(I,null,P,q,E,null),E.onAfterShadow(s,E,A,I,P,q,null)}}const U=E.children;for(let P=0,H=U.length;P<H;P++)x(U[P],A,I,y,v)}function C(E){E.target.removeEventListener("dispose",C);for(const I in c){const y=c[I],v=E.target.uuid;v in y&&(y[v].dispose(),delete y[v])}}}const fg={[uo]:fo,[po]:_o,[mo]:vo,[zi]:go,[fo]:uo,[_o]:po,[vo]:mo,[go]:zi};function pg(s,t){function e(){let N=!1;const at=new oe;let Y=null;const Z=new oe(0,0,0,0);return{setMask:function(ut){Y!==ut&&!N&&(s.colorMask(ut,ut,ut,ut),Y=ut)},setLocked:function(ut){N=ut},setClear:function(ut,dt,Ut,fe,Re){Re===!0&&(ut*=fe,dt*=fe,Ut*=fe),at.set(ut,dt,Ut,fe),Z.equals(at)===!1&&(s.clearColor(ut,dt,Ut,fe),Z.copy(at))},reset:function(){N=!1,Y=null,Z.set(-1,0,0,0)}}}function n(){let N=!1,at=!1,Y=null,Z=null,ut=null;return{setReversed:function(dt){if(at!==dt){const Ut=t.get("EXT_clip_control");at?Ut.clipControlEXT(Ut.LOWER_LEFT_EXT,Ut.ZERO_TO_ONE_EXT):Ut.clipControlEXT(Ut.LOWER_LEFT_EXT,Ut.NEGATIVE_ONE_TO_ONE_EXT);const fe=ut;ut=null,this.setClear(fe)}at=dt},getReversed:function(){return at},setTest:function(dt){dt?ct(s.DEPTH_TEST):At(s.DEPTH_TEST)},setMask:function(dt){Y!==dt&&!N&&(s.depthMask(dt),Y=dt)},setFunc:function(dt){if(at&&(dt=fg[dt]),Z!==dt){switch(dt){case uo:s.depthFunc(s.NEVER);break;case fo:s.depthFunc(s.ALWAYS);break;case po:s.depthFunc(s.LESS);break;case zi:s.depthFunc(s.LEQUAL);break;case mo:s.depthFunc(s.EQUAL);break;case go:s.depthFunc(s.GEQUAL);break;case _o:s.depthFunc(s.GREATER);break;case vo:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}Z=dt}},setLocked:function(dt){N=dt},setClear:function(dt){ut!==dt&&(at&&(dt=1-dt),s.clearDepth(dt),ut=dt)},reset:function(){N=!1,Y=null,Z=null,ut=null,at=!1}}}function i(){let N=!1,at=null,Y=null,Z=null,ut=null,dt=null,Ut=null,fe=null,Re=null;return{setTest:function(ie){N||(ie?ct(s.STENCIL_TEST):At(s.STENCIL_TEST))},setMask:function(ie){at!==ie&&!N&&(s.stencilMask(ie),at=ie)},setFunc:function(ie,an,Sn){(Y!==ie||Z!==an||ut!==Sn)&&(s.stencilFunc(ie,an,Sn),Y=ie,Z=an,ut=Sn)},setOp:function(ie,an,Sn){(dt!==ie||Ut!==an||fe!==Sn)&&(s.stencilOp(ie,an,Sn),dt=ie,Ut=an,fe=Sn)},setLocked:function(ie){N=ie},setClear:function(ie){Re!==ie&&(s.clearStencil(ie),Re=ie)},reset:function(){N=!1,at=null,Y=null,Z=null,ut=null,dt=null,Ut=null,fe=null,Re=null}}}const r=new e,o=new n,a=new i,l=new WeakMap,c=new WeakMap;let h={},d={},u=new WeakMap,p=[],g=null,_=!1,m=null,f=null,S=null,b=null,x=null,C=null,E=null,A=new st(0,0,0),I=0,y=!1,v=null,R=null,U=null,P=null,H=null;const q=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let F=!1,X=0;const O=s.getParameter(s.VERSION);O.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(O)[1]),F=X>=1):O.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(O)[1]),F=X>=2);let tt=null,nt={};const rt=s.getParameter(s.SCISSOR_BOX),wt=s.getParameter(s.VIEWPORT),jt=new oe().fromArray(rt),j=new oe().fromArray(wt);function it(N,at,Y,Z){const ut=new Uint8Array(4),dt=s.createTexture();s.bindTexture(N,dt),s.texParameteri(N,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(N,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Ut=0;Ut<Y;Ut++)N===s.TEXTURE_3D||N===s.TEXTURE_2D_ARRAY?s.texImage3D(at,0,s.RGBA,1,1,Z,0,s.RGBA,s.UNSIGNED_BYTE,ut):s.texImage2D(at+Ut,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,ut);return dt}const xt={};xt[s.TEXTURE_2D]=it(s.TEXTURE_2D,s.TEXTURE_2D,1),xt[s.TEXTURE_CUBE_MAP]=it(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),xt[s.TEXTURE_2D_ARRAY]=it(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),xt[s.TEXTURE_3D]=it(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ct(s.DEPTH_TEST),o.setFunc(zi),Vt(!1),Wt(Fa),ct(s.CULL_FACE),D(Wn);function ct(N){h[N]!==!0&&(s.enable(N),h[N]=!0)}function At(N){h[N]!==!1&&(s.disable(N),h[N]=!1)}function Jt(N,at){return d[N]!==at?(s.bindFramebuffer(N,at),d[N]=at,N===s.DRAW_FRAMEBUFFER&&(d[s.FRAMEBUFFER]=at),N===s.FRAMEBUFFER&&(d[s.DRAW_FRAMEBUFFER]=at),!0):!1}function Rt(N,at){let Y=p,Z=!1;if(N){Y=u.get(at),Y===void 0&&(Y=[],u.set(at,Y));const ut=N.textures;if(Y.length!==ut.length||Y[0]!==s.COLOR_ATTACHMENT0){for(let dt=0,Ut=ut.length;dt<Ut;dt++)Y[dt]=s.COLOR_ATTACHMENT0+dt;Y.length=ut.length,Z=!0}}else Y[0]!==s.BACK&&(Y[0]=s.BACK,Z=!0);Z&&s.drawBuffers(Y)}function me(N){return g!==N?(s.useProgram(N),g=N,!0):!1}const ue={[oi]:s.FUNC_ADD,[uh]:s.FUNC_SUBTRACT,[fh]:s.FUNC_REVERSE_SUBTRACT};ue[ph]=s.MIN,ue[mh]=s.MAX;const Gt={[gh]:s.ZERO,[_h]:s.ONE,[vh]:s.SRC_COLOR,[co]:s.SRC_ALPHA,[bh]:s.SRC_ALPHA_SATURATE,[wh]:s.DST_COLOR,[xh]:s.DST_ALPHA,[yh]:s.ONE_MINUS_SRC_COLOR,[ho]:s.ONE_MINUS_SRC_ALPHA,[Sh]:s.ONE_MINUS_DST_COLOR,[Mh]:s.ONE_MINUS_DST_ALPHA,[Eh]:s.CONSTANT_COLOR,[Th]:s.ONE_MINUS_CONSTANT_COLOR,[Ah]:s.CONSTANT_ALPHA,[Ch]:s.ONE_MINUS_CONSTANT_ALPHA};function D(N,at,Y,Z,ut,dt,Ut,fe,Re,ie){if(N===Wn){_===!0&&(At(s.BLEND),_=!1);return}if(_===!1&&(ct(s.BLEND),_=!0),N!==dh){if(N!==m||ie!==y){if((f!==oi||x!==oi)&&(s.blendEquation(s.FUNC_ADD),f=oi,x=oi),ie)switch(N){case Fi:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case lo:s.blendFunc(s.ONE,s.ONE);break;case Ba:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Oa:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case Fi:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case lo:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case Ba:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Oa:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}S=null,b=null,C=null,E=null,A.set(0,0,0),I=0,m=N,y=ie}return}ut=ut||at,dt=dt||Y,Ut=Ut||Z,(at!==f||ut!==x)&&(s.blendEquationSeparate(ue[at],ue[ut]),f=at,x=ut),(Y!==S||Z!==b||dt!==C||Ut!==E)&&(s.blendFuncSeparate(Gt[Y],Gt[Z],Gt[dt],Gt[Ut]),S=Y,b=Z,C=dt,E=Ut),(fe.equals(A)===!1||Re!==I)&&(s.blendColor(fe.r,fe.g,fe.b,Re),A.copy(fe),I=Re),m=N,y=!1}function je(N,at){N.side===Se?At(s.CULL_FACE):ct(s.CULL_FACE);let Y=N.side===Oe;at&&(Y=!Y),Vt(Y),N.blending===Fi&&N.transparent===!1?D(Wn):D(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),r.setMask(N.colorWrite);const Z=N.stencilWrite;a.setTest(Z),Z&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),ce(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?ct(s.SAMPLE_ALPHA_TO_COVERAGE):At(s.SAMPLE_ALPHA_TO_COVERAGE)}function Vt(N){v!==N&&(N?s.frontFace(s.CW):s.frontFace(s.CCW),v=N)}function Wt(N){N!==ch?(ct(s.CULL_FACE),N!==R&&(N===Fa?s.cullFace(s.BACK):N===hh?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):At(s.CULL_FACE),R=N}function bt(N){N!==U&&(F&&s.lineWidth(N),U=N)}function ce(N,at,Y){N?(ct(s.POLYGON_OFFSET_FILL),(P!==at||H!==Y)&&(s.polygonOffset(at,Y),P=at,H=Y)):At(s.POLYGON_OFFSET_FILL)}function St(N){N?ct(s.SCISSOR_TEST):At(s.SCISSOR_TEST)}function T(N){N===void 0&&(N=s.TEXTURE0+q-1),tt!==N&&(s.activeTexture(N),tt=N)}function M(N,at,Y){Y===void 0&&(tt===null?Y=s.TEXTURE0+q-1:Y=tt);let Z=nt[Y];Z===void 0&&(Z={type:void 0,texture:void 0},nt[Y]=Z),(Z.type!==N||Z.texture!==at)&&(tt!==Y&&(s.activeTexture(Y),tt=Y),s.bindTexture(N,at||xt[N]),Z.type=N,Z.texture=at)}function G(){const N=nt[tt];N!==void 0&&N.type!==void 0&&(s.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function K(){try{s.compressedTexImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function J(){try{s.compressedTexImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function $(){try{s.texSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Mt(){try{s.texSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ht(){try{s.compressedTexSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function mt(){try{s.compressedTexSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Yt(){try{s.texStorage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function et(){try{s.texStorage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function gt(){try{s.texImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ct(){try{s.texImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function It(N){jt.equals(N)===!1&&(s.scissor(N.x,N.y,N.z,N.w),jt.copy(N))}function _t(N){j.equals(N)===!1&&(s.viewport(N.x,N.y,N.z,N.w),j.copy(N))}function Xt(N,at){let Y=c.get(at);Y===void 0&&(Y=new WeakMap,c.set(at,Y));let Z=Y.get(N);Z===void 0&&(Z=s.getUniformBlockIndex(at,N.name),Y.set(N,Z))}function kt(N,at){const Z=c.get(at).get(N);l.get(at)!==Z&&(s.uniformBlockBinding(at,Z,N.__bindingPointIndex),l.set(at,Z))}function ae(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},tt=null,nt={},d={},u=new WeakMap,p=[],g=null,_=!1,m=null,f=null,S=null,b=null,x=null,C=null,E=null,A=new st(0,0,0),I=0,y=!1,v=null,R=null,U=null,P=null,H=null,jt.set(0,0,s.canvas.width,s.canvas.height),j.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ct,disable:At,bindFramebuffer:Jt,drawBuffers:Rt,useProgram:me,setBlending:D,setMaterial:je,setFlipSided:Vt,setCullFace:Wt,setLineWidth:bt,setPolygonOffset:ce,setScissorTest:St,activeTexture:T,bindTexture:M,unbindTexture:G,compressedTexImage2D:K,compressedTexImage3D:J,texImage2D:gt,texImage3D:Ct,updateUBOMapping:Xt,uniformBlockBinding:kt,texStorage2D:Yt,texStorage3D:et,texSubImage2D:$,texSubImage3D:Mt,compressedTexSubImage2D:ht,compressedTexSubImage3D:mt,scissor:It,viewport:_t,reset:ae}}function mg(s,t,e,n,i,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Lt,h=new WeakMap;let d;const u=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,M){return p?new OffscreenCanvas(T,M):hr("canvas")}function _(T,M,G){let K=1;const J=St(T);if((J.width>G||J.height>G)&&(K=G/Math.max(J.width,J.height)),K<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const $=Math.floor(K*J.width),Mt=Math.floor(K*J.height);d===void 0&&(d=g($,Mt));const ht=M?g($,Mt):d;return ht.width=$,ht.height=Mt,ht.getContext("2d").drawImage(T,0,0,$,Mt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+$+"x"+Mt+")."),ht}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),T;return T}function m(T){return T.generateMipmaps}function f(T){s.generateMipmap(T)}function S(T){return T.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?s.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function b(T,M,G,K,J=!1){if(T!==null){if(s[T]!==void 0)return s[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let $=M;if(M===s.RED&&(G===s.FLOAT&&($=s.R32F),G===s.HALF_FLOAT&&($=s.R16F),G===s.UNSIGNED_BYTE&&($=s.R8)),M===s.RED_INTEGER&&(G===s.UNSIGNED_BYTE&&($=s.R8UI),G===s.UNSIGNED_SHORT&&($=s.R16UI),G===s.UNSIGNED_INT&&($=s.R32UI),G===s.BYTE&&($=s.R8I),G===s.SHORT&&($=s.R16I),G===s.INT&&($=s.R32I)),M===s.RG&&(G===s.FLOAT&&($=s.RG32F),G===s.HALF_FLOAT&&($=s.RG16F),G===s.UNSIGNED_BYTE&&($=s.RG8)),M===s.RG_INTEGER&&(G===s.UNSIGNED_BYTE&&($=s.RG8UI),G===s.UNSIGNED_SHORT&&($=s.RG16UI),G===s.UNSIGNED_INT&&($=s.RG32UI),G===s.BYTE&&($=s.RG8I),G===s.SHORT&&($=s.RG16I),G===s.INT&&($=s.RG32I)),M===s.RGB_INTEGER&&(G===s.UNSIGNED_BYTE&&($=s.RGB8UI),G===s.UNSIGNED_SHORT&&($=s.RGB16UI),G===s.UNSIGNED_INT&&($=s.RGB32UI),G===s.BYTE&&($=s.RGB8I),G===s.SHORT&&($=s.RGB16I),G===s.INT&&($=s.RGB32I)),M===s.RGBA_INTEGER&&(G===s.UNSIGNED_BYTE&&($=s.RGBA8UI),G===s.UNSIGNED_SHORT&&($=s.RGBA16UI),G===s.UNSIGNED_INT&&($=s.RGBA32UI),G===s.BYTE&&($=s.RGBA8I),G===s.SHORT&&($=s.RGBA16I),G===s.INT&&($=s.RGBA32I)),M===s.RGB&&G===s.UNSIGNED_INT_5_9_9_9_REV&&($=s.RGB9_E5),M===s.RGBA){const Mt=J?lr:Zt.getTransfer(K);G===s.FLOAT&&($=s.RGBA32F),G===s.HALF_FLOAT&&($=s.RGBA16F),G===s.UNSIGNED_BYTE&&($=Mt===se?s.SRGB8_ALPHA8:s.RGBA8),G===s.UNSIGNED_SHORT_4_4_4_4&&($=s.RGBA4),G===s.UNSIGNED_SHORT_5_5_5_1&&($=s.RGB5_A1)}return($===s.R16F||$===s.R32F||$===s.RG16F||$===s.RG32F||$===s.RGBA16F||$===s.RGBA32F)&&t.get("EXT_color_buffer_float"),$}function x(T,M){let G;return T?M===null||M===hi||M===Vi?G=s.DEPTH24_STENCIL8:M===_n?G=s.DEPTH32F_STENCIL8:M===ms&&(G=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===hi||M===Vi?G=s.DEPTH_COMPONENT24:M===_n?G=s.DEPTH_COMPONENT32F:M===ms&&(G=s.DEPTH_COMPONENT16),G}function C(T,M){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==$e&&T.minFilter!==sn?Math.log2(Math.max(M.width,M.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?M.mipmaps.length:1}function E(T){const M=T.target;M.removeEventListener("dispose",E),I(M),M.isVideoTexture&&h.delete(M)}function A(T){const M=T.target;M.removeEventListener("dispose",A),v(M)}function I(T){const M=n.get(T);if(M.__webglInit===void 0)return;const G=T.source,K=u.get(G);if(K){const J=K[M.__cacheKey];J.usedTimes--,J.usedTimes===0&&y(T),Object.keys(K).length===0&&u.delete(G)}n.remove(T)}function y(T){const M=n.get(T);s.deleteTexture(M.__webglTexture);const G=T.source,K=u.get(G);delete K[M.__cacheKey],o.memory.textures--}function v(T){const M=n.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),n.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(M.__webglFramebuffer[K]))for(let J=0;J<M.__webglFramebuffer[K].length;J++)s.deleteFramebuffer(M.__webglFramebuffer[K][J]);else s.deleteFramebuffer(M.__webglFramebuffer[K]);M.__webglDepthbuffer&&s.deleteRenderbuffer(M.__webglDepthbuffer[K])}else{if(Array.isArray(M.__webglFramebuffer))for(let K=0;K<M.__webglFramebuffer.length;K++)s.deleteFramebuffer(M.__webglFramebuffer[K]);else s.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&s.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&s.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let K=0;K<M.__webglColorRenderbuffer.length;K++)M.__webglColorRenderbuffer[K]&&s.deleteRenderbuffer(M.__webglColorRenderbuffer[K]);M.__webglDepthRenderbuffer&&s.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const G=T.textures;for(let K=0,J=G.length;K<J;K++){const $=n.get(G[K]);$.__webglTexture&&(s.deleteTexture($.__webglTexture),o.memory.textures--),n.remove(G[K])}n.remove(T)}let R=0;function U(){R=0}function P(){const T=R;return T>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+i.maxTextures),R+=1,T}function H(T){const M=[];return M.push(T.wrapS),M.push(T.wrapT),M.push(T.wrapR||0),M.push(T.magFilter),M.push(T.minFilter),M.push(T.anisotropy),M.push(T.internalFormat),M.push(T.format),M.push(T.type),M.push(T.generateMipmaps),M.push(T.premultiplyAlpha),M.push(T.flipY),M.push(T.unpackAlignment),M.push(T.colorSpace),M.join()}function q(T,M){const G=n.get(T);if(T.isVideoTexture&&bt(T),T.isRenderTargetTexture===!1&&T.version>0&&G.__version!==T.version){const K=T.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{j(G,T,M);return}}e.bindTexture(s.TEXTURE_2D,G.__webglTexture,s.TEXTURE0+M)}function F(T,M){const G=n.get(T);if(T.version>0&&G.__version!==T.version){j(G,T,M);return}e.bindTexture(s.TEXTURE_2D_ARRAY,G.__webglTexture,s.TEXTURE0+M)}function X(T,M){const G=n.get(T);if(T.version>0&&G.__version!==T.version){j(G,T,M);return}e.bindTexture(s.TEXTURE_3D,G.__webglTexture,s.TEXTURE0+M)}function O(T,M){const G=n.get(T);if(T.version>0&&G.__version!==T.version){it(G,T,M);return}e.bindTexture(s.TEXTURE_CUBE_MAP,G.__webglTexture,s.TEXTURE0+M)}const tt={[ps]:s.REPEAT,[Pn]:s.CLAMP_TO_EDGE,[Mo]:s.MIRRORED_REPEAT},nt={[$e]:s.NEAREST,[Fh]:s.NEAREST_MIPMAP_NEAREST,[xs]:s.NEAREST_MIPMAP_LINEAR,[sn]:s.LINEAR,[Sr]:s.LINEAR_MIPMAP_NEAREST,[li]:s.LINEAR_MIPMAP_LINEAR},rt={[Hh]:s.NEVER,[Yh]:s.ALWAYS,[Gh]:s.LESS,[mc]:s.LEQUAL,[Vh]:s.EQUAL,[qh]:s.GEQUAL,[Wh]:s.GREATER,[Xh]:s.NOTEQUAL};function wt(T,M){if(M.type===_n&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===sn||M.magFilter===Sr||M.magFilter===xs||M.magFilter===li||M.minFilter===sn||M.minFilter===Sr||M.minFilter===xs||M.minFilter===li)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(T,s.TEXTURE_WRAP_S,tt[M.wrapS]),s.texParameteri(T,s.TEXTURE_WRAP_T,tt[M.wrapT]),(T===s.TEXTURE_3D||T===s.TEXTURE_2D_ARRAY)&&s.texParameteri(T,s.TEXTURE_WRAP_R,tt[M.wrapR]),s.texParameteri(T,s.TEXTURE_MAG_FILTER,nt[M.magFilter]),s.texParameteri(T,s.TEXTURE_MIN_FILTER,nt[M.minFilter]),M.compareFunction&&(s.texParameteri(T,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(T,s.TEXTURE_COMPARE_FUNC,rt[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===$e||M.minFilter!==xs&&M.minFilter!==li||M.type===_n&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){const G=t.get("EXT_texture_filter_anisotropic");s.texParameterf(T,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,i.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function jt(T,M){let G=!1;T.__webglInit===void 0&&(T.__webglInit=!0,M.addEventListener("dispose",E));const K=M.source;let J=u.get(K);J===void 0&&(J={},u.set(K,J));const $=H(M);if($!==T.__cacheKey){J[$]===void 0&&(J[$]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,G=!0),J[$].usedTimes++;const Mt=J[T.__cacheKey];Mt!==void 0&&(J[T.__cacheKey].usedTimes--,Mt.usedTimes===0&&y(M)),T.__cacheKey=$,T.__webglTexture=J[$].texture}return G}function j(T,M,G){let K=s.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(K=s.TEXTURE_2D_ARRAY),M.isData3DTexture&&(K=s.TEXTURE_3D);const J=jt(T,M),$=M.source;e.bindTexture(K,T.__webglTexture,s.TEXTURE0+G);const Mt=n.get($);if($.version!==Mt.__version||J===!0){e.activeTexture(s.TEXTURE0+G);const ht=Zt.getPrimaries(Zt.workingColorSpace),mt=M.colorSpace===Vn?null:Zt.getPrimaries(M.colorSpace),Yt=M.colorSpace===Vn||ht===mt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Yt);let et=_(M.image,!1,i.maxTextureSize);et=ce(M,et);const gt=r.convert(M.format,M.colorSpace),Ct=r.convert(M.type);let It=b(M.internalFormat,gt,Ct,M.colorSpace,M.isVideoTexture);wt(K,M);let _t;const Xt=M.mipmaps,kt=M.isVideoTexture!==!0,ae=Mt.__version===void 0||J===!0,N=$.dataReady,at=C(M,et);if(M.isDepthTexture)It=x(M.format===Wi,M.type),ae&&(kt?e.texStorage2D(s.TEXTURE_2D,1,It,et.width,et.height):e.texImage2D(s.TEXTURE_2D,0,It,et.width,et.height,0,gt,Ct,null));else if(M.isDataTexture)if(Xt.length>0){kt&&ae&&e.texStorage2D(s.TEXTURE_2D,at,It,Xt[0].width,Xt[0].height);for(let Y=0,Z=Xt.length;Y<Z;Y++)_t=Xt[Y],kt?N&&e.texSubImage2D(s.TEXTURE_2D,Y,0,0,_t.width,_t.height,gt,Ct,_t.data):e.texImage2D(s.TEXTURE_2D,Y,It,_t.width,_t.height,0,gt,Ct,_t.data);M.generateMipmaps=!1}else kt?(ae&&e.texStorage2D(s.TEXTURE_2D,at,It,et.width,et.height),N&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,et.width,et.height,gt,Ct,et.data)):e.texImage2D(s.TEXTURE_2D,0,It,et.width,et.height,0,gt,Ct,et.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){kt&&ae&&e.texStorage3D(s.TEXTURE_2D_ARRAY,at,It,Xt[0].width,Xt[0].height,et.depth);for(let Y=0,Z=Xt.length;Y<Z;Y++)if(_t=Xt[Y],M.format!==rn)if(gt!==null)if(kt){if(N)if(M.layerUpdates.size>0){const ut=wl(_t.width,_t.height,M.format,M.type);for(const dt of M.layerUpdates){const Ut=_t.data.subarray(dt*ut/_t.data.BYTES_PER_ELEMENT,(dt+1)*ut/_t.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Y,0,0,dt,_t.width,_t.height,1,gt,Ut)}M.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Y,0,0,0,_t.width,_t.height,et.depth,gt,_t.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,Y,It,_t.width,_t.height,et.depth,0,_t.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else kt?N&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,Y,0,0,0,_t.width,_t.height,et.depth,gt,Ct,_t.data):e.texImage3D(s.TEXTURE_2D_ARRAY,Y,It,_t.width,_t.height,et.depth,0,gt,Ct,_t.data)}else{kt&&ae&&e.texStorage2D(s.TEXTURE_2D,at,It,Xt[0].width,Xt[0].height);for(let Y=0,Z=Xt.length;Y<Z;Y++)_t=Xt[Y],M.format!==rn?gt!==null?kt?N&&e.compressedTexSubImage2D(s.TEXTURE_2D,Y,0,0,_t.width,_t.height,gt,_t.data):e.compressedTexImage2D(s.TEXTURE_2D,Y,It,_t.width,_t.height,0,_t.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):kt?N&&e.texSubImage2D(s.TEXTURE_2D,Y,0,0,_t.width,_t.height,gt,Ct,_t.data):e.texImage2D(s.TEXTURE_2D,Y,It,_t.width,_t.height,0,gt,Ct,_t.data)}else if(M.isDataArrayTexture)if(kt){if(ae&&e.texStorage3D(s.TEXTURE_2D_ARRAY,at,It,et.width,et.height,et.depth),N)if(M.layerUpdates.size>0){const Y=wl(et.width,et.height,M.format,M.type);for(const Z of M.layerUpdates){const ut=et.data.subarray(Z*Y/et.data.BYTES_PER_ELEMENT,(Z+1)*Y/et.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,Z,et.width,et.height,1,gt,Ct,ut)}M.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,et.width,et.height,et.depth,gt,Ct,et.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,It,et.width,et.height,et.depth,0,gt,Ct,et.data);else if(M.isData3DTexture)kt?(ae&&e.texStorage3D(s.TEXTURE_3D,at,It,et.width,et.height,et.depth),N&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,et.width,et.height,et.depth,gt,Ct,et.data)):e.texImage3D(s.TEXTURE_3D,0,It,et.width,et.height,et.depth,0,gt,Ct,et.data);else if(M.isFramebufferTexture){if(ae)if(kt)e.texStorage2D(s.TEXTURE_2D,at,It,et.width,et.height);else{let Y=et.width,Z=et.height;for(let ut=0;ut<at;ut++)e.texImage2D(s.TEXTURE_2D,ut,It,Y,Z,0,gt,Ct,null),Y>>=1,Z>>=1}}else if(Xt.length>0){if(kt&&ae){const Y=St(Xt[0]);e.texStorage2D(s.TEXTURE_2D,at,It,Y.width,Y.height)}for(let Y=0,Z=Xt.length;Y<Z;Y++)_t=Xt[Y],kt?N&&e.texSubImage2D(s.TEXTURE_2D,Y,0,0,gt,Ct,_t):e.texImage2D(s.TEXTURE_2D,Y,It,gt,Ct,_t);M.generateMipmaps=!1}else if(kt){if(ae){const Y=St(et);e.texStorage2D(s.TEXTURE_2D,at,It,Y.width,Y.height)}N&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,gt,Ct,et)}else e.texImage2D(s.TEXTURE_2D,0,It,gt,Ct,et);m(M)&&f(K),Mt.__version=$.version,M.onUpdate&&M.onUpdate(M)}T.__version=M.version}function it(T,M,G){if(M.image.length!==6)return;const K=jt(T,M),J=M.source;e.bindTexture(s.TEXTURE_CUBE_MAP,T.__webglTexture,s.TEXTURE0+G);const $=n.get(J);if(J.version!==$.__version||K===!0){e.activeTexture(s.TEXTURE0+G);const Mt=Zt.getPrimaries(Zt.workingColorSpace),ht=M.colorSpace===Vn?null:Zt.getPrimaries(M.colorSpace),mt=M.colorSpace===Vn||Mt===ht?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,mt);const Yt=M.isCompressedTexture||M.image[0].isCompressedTexture,et=M.image[0]&&M.image[0].isDataTexture,gt=[];for(let Z=0;Z<6;Z++)!Yt&&!et?gt[Z]=_(M.image[Z],!0,i.maxCubemapSize):gt[Z]=et?M.image[Z].image:M.image[Z],gt[Z]=ce(M,gt[Z]);const Ct=gt[0],It=r.convert(M.format,M.colorSpace),_t=r.convert(M.type),Xt=b(M.internalFormat,It,_t,M.colorSpace),kt=M.isVideoTexture!==!0,ae=$.__version===void 0||K===!0,N=J.dataReady;let at=C(M,Ct);wt(s.TEXTURE_CUBE_MAP,M);let Y;if(Yt){kt&&ae&&e.texStorage2D(s.TEXTURE_CUBE_MAP,at,Xt,Ct.width,Ct.height);for(let Z=0;Z<6;Z++){Y=gt[Z].mipmaps;for(let ut=0;ut<Y.length;ut++){const dt=Y[ut];M.format!==rn?It!==null?kt?N&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ut,0,0,dt.width,dt.height,It,dt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ut,Xt,dt.width,dt.height,0,dt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):kt?N&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ut,0,0,dt.width,dt.height,It,_t,dt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ut,Xt,dt.width,dt.height,0,It,_t,dt.data)}}}else{if(Y=M.mipmaps,kt&&ae){Y.length>0&&at++;const Z=St(gt[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,at,Xt,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(et){kt?N&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,gt[Z].width,gt[Z].height,It,_t,gt[Z].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Xt,gt[Z].width,gt[Z].height,0,It,_t,gt[Z].data);for(let ut=0;ut<Y.length;ut++){const Ut=Y[ut].image[Z].image;kt?N&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ut+1,0,0,Ut.width,Ut.height,It,_t,Ut.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ut+1,Xt,Ut.width,Ut.height,0,It,_t,Ut.data)}}else{kt?N&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,It,_t,gt[Z]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Xt,It,_t,gt[Z]);for(let ut=0;ut<Y.length;ut++){const dt=Y[ut];kt?N&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ut+1,0,0,It,_t,dt.image[Z]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ut+1,Xt,It,_t,dt.image[Z])}}}m(M)&&f(s.TEXTURE_CUBE_MAP),$.__version=J.version,M.onUpdate&&M.onUpdate(M)}T.__version=M.version}function xt(T,M,G,K,J,$){const Mt=r.convert(G.format,G.colorSpace),ht=r.convert(G.type),mt=b(G.internalFormat,Mt,ht,G.colorSpace),Yt=n.get(M),et=n.get(G);if(et.__renderTarget=M,!Yt.__hasExternalTextures){const gt=Math.max(1,M.width>>$),Ct=Math.max(1,M.height>>$);J===s.TEXTURE_3D||J===s.TEXTURE_2D_ARRAY?e.texImage3D(J,$,mt,gt,Ct,M.depth,0,Mt,ht,null):e.texImage2D(J,$,mt,gt,Ct,0,Mt,ht,null)}e.bindFramebuffer(s.FRAMEBUFFER,T),Wt(M)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,K,J,et.__webglTexture,0,Vt(M)):(J===s.TEXTURE_2D||J>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,K,J,et.__webglTexture,$),e.bindFramebuffer(s.FRAMEBUFFER,null)}function ct(T,M,G){if(s.bindRenderbuffer(s.RENDERBUFFER,T),M.depthBuffer){const K=M.depthTexture,J=K&&K.isDepthTexture?K.type:null,$=x(M.stencilBuffer,J),Mt=M.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ht=Vt(M);Wt(M)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ht,$,M.width,M.height):G?s.renderbufferStorageMultisample(s.RENDERBUFFER,ht,$,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,$,M.width,M.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Mt,s.RENDERBUFFER,T)}else{const K=M.textures;for(let J=0;J<K.length;J++){const $=K[J],Mt=r.convert($.format,$.colorSpace),ht=r.convert($.type),mt=b($.internalFormat,Mt,ht,$.colorSpace),Yt=Vt(M);G&&Wt(M)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Yt,mt,M.width,M.height):Wt(M)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Yt,mt,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,mt,M.width,M.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function At(T,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,T),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const K=n.get(M.depthTexture);K.__renderTarget=M,(!K.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),q(M.depthTexture,0);const J=K.__webglTexture,$=Vt(M);if(M.depthTexture.format===Bi)Wt(M)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,J,0,$):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,J,0);else if(M.depthTexture.format===Wi)Wt(M)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,J,0,$):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function Jt(T){const M=n.get(T),G=T.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==T.depthTexture){const K=T.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),K){const J=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,K.removeEventListener("dispose",J)};K.addEventListener("dispose",J),M.__depthDisposeCallback=J}M.__boundDepthTexture=K}if(T.depthTexture&&!M.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");At(M.__webglFramebuffer,T)}else if(G){M.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(e.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer[K]),M.__webglDepthbuffer[K]===void 0)M.__webglDepthbuffer[K]=s.createRenderbuffer(),ct(M.__webglDepthbuffer[K],T,!1);else{const J=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,$=M.__webglDepthbuffer[K];s.bindRenderbuffer(s.RENDERBUFFER,$),s.framebufferRenderbuffer(s.FRAMEBUFFER,J,s.RENDERBUFFER,$)}}else if(e.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=s.createRenderbuffer(),ct(M.__webglDepthbuffer,T,!1);else{const K=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,J=M.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,J),s.framebufferRenderbuffer(s.FRAMEBUFFER,K,s.RENDERBUFFER,J)}e.bindFramebuffer(s.FRAMEBUFFER,null)}function Rt(T,M,G){const K=n.get(T);M!==void 0&&xt(K.__webglFramebuffer,T,T.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),G!==void 0&&Jt(T)}function me(T){const M=T.texture,G=n.get(T),K=n.get(M);T.addEventListener("dispose",A);const J=T.textures,$=T.isWebGLCubeRenderTarget===!0,Mt=J.length>1;if(Mt||(K.__webglTexture===void 0&&(K.__webglTexture=s.createTexture()),K.__version=M.version,o.memory.textures++),$){G.__webglFramebuffer=[];for(let ht=0;ht<6;ht++)if(M.mipmaps&&M.mipmaps.length>0){G.__webglFramebuffer[ht]=[];for(let mt=0;mt<M.mipmaps.length;mt++)G.__webglFramebuffer[ht][mt]=s.createFramebuffer()}else G.__webglFramebuffer[ht]=s.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){G.__webglFramebuffer=[];for(let ht=0;ht<M.mipmaps.length;ht++)G.__webglFramebuffer[ht]=s.createFramebuffer()}else G.__webglFramebuffer=s.createFramebuffer();if(Mt)for(let ht=0,mt=J.length;ht<mt;ht++){const Yt=n.get(J[ht]);Yt.__webglTexture===void 0&&(Yt.__webglTexture=s.createTexture(),o.memory.textures++)}if(T.samples>0&&Wt(T)===!1){G.__webglMultisampledFramebuffer=s.createFramebuffer(),G.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let ht=0;ht<J.length;ht++){const mt=J[ht];G.__webglColorRenderbuffer[ht]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,G.__webglColorRenderbuffer[ht]);const Yt=r.convert(mt.format,mt.colorSpace),et=r.convert(mt.type),gt=b(mt.internalFormat,Yt,et,mt.colorSpace,T.isXRRenderTarget===!0),Ct=Vt(T);s.renderbufferStorageMultisample(s.RENDERBUFFER,Ct,gt,T.width,T.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ht,s.RENDERBUFFER,G.__webglColorRenderbuffer[ht])}s.bindRenderbuffer(s.RENDERBUFFER,null),T.depthBuffer&&(G.__webglDepthRenderbuffer=s.createRenderbuffer(),ct(G.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if($){e.bindTexture(s.TEXTURE_CUBE_MAP,K.__webglTexture),wt(s.TEXTURE_CUBE_MAP,M);for(let ht=0;ht<6;ht++)if(M.mipmaps&&M.mipmaps.length>0)for(let mt=0;mt<M.mipmaps.length;mt++)xt(G.__webglFramebuffer[ht][mt],T,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,mt);else xt(G.__webglFramebuffer[ht],T,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0);m(M)&&f(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Mt){for(let ht=0,mt=J.length;ht<mt;ht++){const Yt=J[ht],et=n.get(Yt);e.bindTexture(s.TEXTURE_2D,et.__webglTexture),wt(s.TEXTURE_2D,Yt),xt(G.__webglFramebuffer,T,Yt,s.COLOR_ATTACHMENT0+ht,s.TEXTURE_2D,0),m(Yt)&&f(s.TEXTURE_2D)}e.unbindTexture()}else{let ht=s.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ht=T.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(ht,K.__webglTexture),wt(ht,M),M.mipmaps&&M.mipmaps.length>0)for(let mt=0;mt<M.mipmaps.length;mt++)xt(G.__webglFramebuffer[mt],T,M,s.COLOR_ATTACHMENT0,ht,mt);else xt(G.__webglFramebuffer,T,M,s.COLOR_ATTACHMENT0,ht,0);m(M)&&f(ht),e.unbindTexture()}T.depthBuffer&&Jt(T)}function ue(T){const M=T.textures;for(let G=0,K=M.length;G<K;G++){const J=M[G];if(m(J)){const $=S(T),Mt=n.get(J).__webglTexture;e.bindTexture($,Mt),f($),e.unbindTexture()}}}const Gt=[],D=[];function je(T){if(T.samples>0){if(Wt(T)===!1){const M=T.textures,G=T.width,K=T.height;let J=s.COLOR_BUFFER_BIT;const $=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Mt=n.get(T),ht=M.length>1;if(ht)for(let mt=0;mt<M.length;mt++)e.bindFramebuffer(s.FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+mt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,Mt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+mt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Mt.__webglFramebuffer);for(let mt=0;mt<M.length;mt++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(J|=s.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(J|=s.STENCIL_BUFFER_BIT)),ht){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Mt.__webglColorRenderbuffer[mt]);const Yt=n.get(M[mt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Yt,0)}s.blitFramebuffer(0,0,G,K,0,0,G,K,J,s.NEAREST),l===!0&&(Gt.length=0,D.length=0,Gt.push(s.COLOR_ATTACHMENT0+mt),T.depthBuffer&&T.resolveDepthBuffer===!1&&(Gt.push($),D.push($),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,D)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Gt))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),ht)for(let mt=0;mt<M.length;mt++){e.bindFramebuffer(s.FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+mt,s.RENDERBUFFER,Mt.__webglColorRenderbuffer[mt]);const Yt=n.get(M[mt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,Mt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+mt,s.TEXTURE_2D,Yt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Mt.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){const M=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[M])}}}function Vt(T){return Math.min(i.maxSamples,T.samples)}function Wt(T){const M=n.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function bt(T){const M=o.render.frame;h.get(T)!==M&&(h.set(T,M),T.update())}function ce(T,M){const G=T.colorSpace,K=T.format,J=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||G!==Xi&&G!==Vn&&(Zt.getTransfer(G)===se?(K!==rn||J!==Un)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),M}function St(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=P,this.resetTextureUnits=U,this.setTexture2D=q,this.setTexture2DArray=F,this.setTexture3D=X,this.setTextureCube=O,this.rebindTextures=Rt,this.setupRenderTarget=me,this.updateRenderTargetMipmap=ue,this.updateMultisampleRenderTarget=je,this.setupDepthRenderbuffer=Jt,this.setupFrameBufferTexture=xt,this.useMultisampledRTT=Wt}function gg(s,t){function e(n,i=Vn){let r;const o=Zt.getTransfer(i);if(n===Un)return s.UNSIGNED_BYTE;if(n===la)return s.UNSIGNED_SHORT_4_4_4_4;if(n===ca)return s.UNSIGNED_SHORT_5_5_5_1;if(n===lc)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===oc)return s.BYTE;if(n===ac)return s.SHORT;if(n===ms)return s.UNSIGNED_SHORT;if(n===aa)return s.INT;if(n===hi)return s.UNSIGNED_INT;if(n===_n)return s.FLOAT;if(n===gs)return s.HALF_FLOAT;if(n===cc)return s.ALPHA;if(n===hc)return s.RGB;if(n===rn)return s.RGBA;if(n===dc)return s.LUMINANCE;if(n===uc)return s.LUMINANCE_ALPHA;if(n===Bi)return s.DEPTH_COMPONENT;if(n===Wi)return s.DEPTH_STENCIL;if(n===ha)return s.RED;if(n===da)return s.RED_INTEGER;if(n===fc)return s.RG;if(n===ua)return s.RG_INTEGER;if(n===fa)return s.RGBA_INTEGER;if(n===Zs||n===Js||n===Qs||n===tr)if(o===se)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Zs)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Js)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Qs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===tr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Zs)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Js)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Qs)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===tr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===wo||n===So||n===bo||n===Eo)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===wo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===So)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===bo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Eo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===To||n===Ao||n===Co)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===To||n===Ao)return o===se?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Co)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ro||n===Io||n===Po||n===Lo||n===Do||n===Uo||n===No||n===ko||n===Fo||n===Bo||n===Oo||n===zo||n===Ho||n===Go)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ro)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Io)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Po)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Lo)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Do)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Uo)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===No)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ko)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Fo)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Bo)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Oo)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===zo)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ho)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Go)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===er||n===Vo||n===Wo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===er)return o===se?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Vo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Wo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===pc||n===Xo||n===qo||n===Yo)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===er)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Xo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===qo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Yo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Vi?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}const _g=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,vg=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class yg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new Ne,r=t.properties.get(i);r.__webglTexture=e.texture,(e.depthNear!==n.depthNear||e.depthFar!==n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Mn({vertexShader:_g,fragmentShader:vg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new z(new He(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class xg extends Yi{constructor(t,e){super();const n=this;let i=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,d=null,u=null,p=null,g=null;const _=new yg,m=e.getContextAttributes();let f=null,S=null;const b=[],x=[],C=new Lt;let E=null;const A=new Ye;A.viewport=new oe;const I=new Ye;I.viewport=new oe;const y=[A,I],v=new Bd;let R=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let it=b[j];return it===void 0&&(it=new Xr,b[j]=it),it.getTargetRaySpace()},this.getControllerGrip=function(j){let it=b[j];return it===void 0&&(it=new Xr,b[j]=it),it.getGripSpace()},this.getHand=function(j){let it=b[j];return it===void 0&&(it=new Xr,b[j]=it),it.getHandSpace()};function P(j){const it=x.indexOf(j.inputSource);if(it===-1)return;const xt=b[it];xt!==void 0&&(xt.update(j.inputSource,j.frame,c||o),xt.dispatchEvent({type:j.type,data:j.inputSource}))}function H(){i.removeEventListener("select",P),i.removeEventListener("selectstart",P),i.removeEventListener("selectend",P),i.removeEventListener("squeeze",P),i.removeEventListener("squeezestart",P),i.removeEventListener("squeezeend",P),i.removeEventListener("end",H),i.removeEventListener("inputsourceschange",q);for(let j=0;j<b.length;j++){const it=x[j];it!==null&&(x[j]=null,b[j].disconnect(it))}R=null,U=null,_.reset(),t.setRenderTarget(f),p=null,u=null,d=null,i=null,S=null,jt.stop(),n.isPresenting=!1,t.setPixelRatio(E),t.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){r=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(j){c=j},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(j){if(i=j,i!==null){if(f=t.getRenderTarget(),i.addEventListener("select",P),i.addEventListener("selectstart",P),i.addEventListener("selectend",P),i.addEventListener("squeeze",P),i.addEventListener("squeezestart",P),i.addEventListener("squeezeend",P),i.addEventListener("end",H),i.addEventListener("inputsourceschange",q),m.xrCompatible!==!0&&await e.makeXRCompatible(),E=t.getPixelRatio(),t.getSize(C),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let xt=null,ct=null,At=null;m.depth&&(At=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,xt=m.stencil?Wi:Bi,ct=m.stencil?Vi:hi);const Jt={colorFormat:e.RGBA8,depthFormat:At,scaleFactor:r};d=new XRWebGLBinding(i,e),u=d.createProjectionLayer(Jt),i.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),S=new di(u.textureWidth,u.textureHeight,{format:rn,type:Un,depthTexture:new Ic(u.textureWidth,u.textureHeight,ct,void 0,void 0,void 0,void 0,void 0,void 0,xt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const xt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(i,e,xt),i.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new di(p.framebufferWidth,p.framebufferHeight,{format:rn,type:Un,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),jt.setContext(i),jt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function q(j){for(let it=0;it<j.removed.length;it++){const xt=j.removed[it],ct=x.indexOf(xt);ct>=0&&(x[ct]=null,b[ct].disconnect(xt))}for(let it=0;it<j.added.length;it++){const xt=j.added[it];let ct=x.indexOf(xt);if(ct===-1){for(let Jt=0;Jt<b.length;Jt++)if(Jt>=x.length){x.push(xt),ct=Jt;break}else if(x[Jt]===null){x[Jt]=xt,ct=Jt;break}if(ct===-1)break}const At=b[ct];At&&At.connect(xt)}}const F=new L,X=new L;function O(j,it,xt){F.setFromMatrixPosition(it.matrixWorld),X.setFromMatrixPosition(xt.matrixWorld);const ct=F.distanceTo(X),At=it.projectionMatrix.elements,Jt=xt.projectionMatrix.elements,Rt=At[14]/(At[10]-1),me=At[14]/(At[10]+1),ue=(At[9]+1)/At[5],Gt=(At[9]-1)/At[5],D=(At[8]-1)/At[0],je=(Jt[8]+1)/Jt[0],Vt=Rt*D,Wt=Rt*je,bt=ct/(-D+je),ce=bt*-D;if(it.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(ce),j.translateZ(bt),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),At[10]===-1)j.projectionMatrix.copy(it.projectionMatrix),j.projectionMatrixInverse.copy(it.projectionMatrixInverse);else{const St=Rt+bt,T=me+bt,M=Vt-ce,G=Wt+(ct-ce),K=ue*me/T*St,J=Gt*me/T*St;j.projectionMatrix.makePerspective(M,G,K,J,St,T),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function tt(j,it){it===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(it.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(i===null)return;let it=j.near,xt=j.far;_.texture!==null&&(_.depthNear>0&&(it=_.depthNear),_.depthFar>0&&(xt=_.depthFar)),v.near=I.near=A.near=it,v.far=I.far=A.far=xt,(R!==v.near||U!==v.far)&&(i.updateRenderState({depthNear:v.near,depthFar:v.far}),R=v.near,U=v.far),A.layers.mask=j.layers.mask|2,I.layers.mask=j.layers.mask|4,v.layers.mask=A.layers.mask|I.layers.mask;const ct=j.parent,At=v.cameras;tt(v,ct);for(let Jt=0;Jt<At.length;Jt++)tt(At[Jt],ct);At.length===2?O(v,A,I):v.projectionMatrix.copy(A.projectionMatrix),nt(j,v,ct)};function nt(j,it,xt){xt===null?j.matrix.copy(it.matrixWorld):(j.matrix.copy(xt.matrixWorld),j.matrix.invert(),j.matrix.multiply(it.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(it.projectionMatrix),j.projectionMatrixInverse.copy(it.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=jo*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(u===null&&p===null))return l},this.setFoveation=function(j){l=j,u!==null&&(u.fixedFoveation=j),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=j)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(v)};let rt=null;function wt(j,it){if(h=it.getViewerPose(c||o),g=it,h!==null){const xt=h.views;p!==null&&(t.setRenderTargetFramebuffer(S,p.framebuffer),t.setRenderTarget(S));let ct=!1;xt.length!==v.cameras.length&&(v.cameras.length=0,ct=!0);for(let Rt=0;Rt<xt.length;Rt++){const me=xt[Rt];let ue=null;if(p!==null)ue=p.getViewport(me);else{const D=d.getViewSubImage(u,me);ue=D.viewport,Rt===0&&(t.setRenderTargetTextures(S,D.colorTexture,u.ignoreDepthValues?void 0:D.depthStencilTexture),t.setRenderTarget(S))}let Gt=y[Rt];Gt===void 0&&(Gt=new Ye,Gt.layers.enable(Rt),Gt.viewport=new oe,y[Rt]=Gt),Gt.matrix.fromArray(me.transform.matrix),Gt.matrix.decompose(Gt.position,Gt.quaternion,Gt.scale),Gt.projectionMatrix.fromArray(me.projectionMatrix),Gt.projectionMatrixInverse.copy(Gt.projectionMatrix).invert(),Gt.viewport.set(ue.x,ue.y,ue.width,ue.height),Rt===0&&(v.matrix.copy(Gt.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),ct===!0&&v.cameras.push(Gt)}const At=i.enabledFeatures;if(At&&At.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&d){const Rt=d.getDepthInformation(xt[0]);Rt&&Rt.isValid&&Rt.texture&&_.init(t,Rt,i.renderState)}}for(let xt=0;xt<b.length;xt++){const ct=x[xt],At=b[xt];ct!==null&&At!==void 0&&At.update(ct,it,c||o)}rt&&rt(j,it),it.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:it}),g=null}const jt=new Uc;jt.setAnimationLoop(wt),this.setAnimationLoop=function(j){rt=j},this.dispose=function(){}}}const ni=new on,Mg=new ne;function wg(s,t){function e(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,Mc(s)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function i(m,f,S,b,x){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),d(m,f)):f.isMeshPhongMaterial?(r(m,f),h(m,f)):f.isMeshStandardMaterial?(r(m,f),u(m,f),f.isMeshPhysicalMaterial&&p(m,f,x)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),_(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?l(m,f,S,b):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,e(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Oe&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,e(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Oe&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,e(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,e(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const S=t.get(f),b=S.envMap,x=S.envMapRotation;b&&(m.envMap.value=b,ni.copy(x),ni.x*=-1,ni.y*=-1,ni.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(ni.y*=-1,ni.z*=-1),m.envMapRotation.value.setFromMatrix4(Mg.makeRotationFromEuler(ni)),m.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,S,b){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*S,m.scale.value=b*.5,f.map&&(m.map.value=f.map,e(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function u(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,S){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Oe&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function _(m,f){const S=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Sg(s,t,e,n){let i={},r={},o=[];const a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,b){const x=b.program;n.uniformBlockBinding(S,x)}function c(S,b){let x=i[S.id];x===void 0&&(g(S),x=h(S),i[S.id]=x,S.addEventListener("dispose",m));const C=b.program;n.updateUBOMapping(S,C);const E=t.render.frame;r[S.id]!==E&&(u(S),r[S.id]=E)}function h(S){const b=d();S.__bindingPointIndex=b;const x=s.createBuffer(),C=S.__size,E=S.usage;return s.bindBuffer(s.UNIFORM_BUFFER,x),s.bufferData(s.UNIFORM_BUFFER,C,E),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,b,x),x}function d(){for(let S=0;S<a;S++)if(o.indexOf(S)===-1)return o.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(S){const b=i[S.id],x=S.uniforms,C=S.__cache;s.bindBuffer(s.UNIFORM_BUFFER,b);for(let E=0,A=x.length;E<A;E++){const I=Array.isArray(x[E])?x[E]:[x[E]];for(let y=0,v=I.length;y<v;y++){const R=I[y];if(p(R,E,y,C)===!0){const U=R.__offset,P=Array.isArray(R.value)?R.value:[R.value];let H=0;for(let q=0;q<P.length;q++){const F=P[q],X=_(F);typeof F=="number"||typeof F=="boolean"?(R.__data[0]=F,s.bufferSubData(s.UNIFORM_BUFFER,U+H,R.__data)):F.isMatrix3?(R.__data[0]=F.elements[0],R.__data[1]=F.elements[1],R.__data[2]=F.elements[2],R.__data[3]=0,R.__data[4]=F.elements[3],R.__data[5]=F.elements[4],R.__data[6]=F.elements[5],R.__data[7]=0,R.__data[8]=F.elements[6],R.__data[9]=F.elements[7],R.__data[10]=F.elements[8],R.__data[11]=0):(F.toArray(R.__data,H),H+=X.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,U,R.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function p(S,b,x,C){const E=S.value,A=b+"_"+x;if(C[A]===void 0)return typeof E=="number"||typeof E=="boolean"?C[A]=E:C[A]=E.clone(),!0;{const I=C[A];if(typeof E=="number"||typeof E=="boolean"){if(I!==E)return C[A]=E,!0}else if(I.equals(E)===!1)return I.copy(E),!0}return!1}function g(S){const b=S.uniforms;let x=0;const C=16;for(let A=0,I=b.length;A<I;A++){const y=Array.isArray(b[A])?b[A]:[b[A]];for(let v=0,R=y.length;v<R;v++){const U=y[v],P=Array.isArray(U.value)?U.value:[U.value];for(let H=0,q=P.length;H<q;H++){const F=P[H],X=_(F),O=x%C,tt=O%X.boundary,nt=O+tt;x+=tt,nt!==0&&C-nt<X.storage&&(x+=C-nt),U.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=x,x+=X.storage}}}const E=x%C;return E>0&&(x+=C-E),S.__size=x,S.__cache={},this}function _(S){const b={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(b.boundary=4,b.storage=4):S.isVector2?(b.boundary=8,b.storage=8):S.isVector3||S.isColor?(b.boundary=16,b.storage=12):S.isVector4?(b.boundary=16,b.storage=16):S.isMatrix3?(b.boundary=48,b.storage=48):S.isMatrix4?(b.boundary=64,b.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),b}function m(S){const b=S.target;b.removeEventListener("dispose",m);const x=o.indexOf(b.__bindingPointIndex);o.splice(x,1),s.deleteBuffer(i[b.id]),delete i[b.id],delete r[b.id]}function f(){for(const S in i)s.deleteBuffer(i[S]);o=[],i={},r={}}return{bind:l,update:c,dispose:f}}class bg{constructor(t={}){const{canvas:e=jh(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:u=!1}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,f=null;const S=[],b=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Xe,this.toneMapping=Xn,this.toneMappingExposure=1;const x=this;let C=!1,E=0,A=0,I=null,y=-1,v=null;const R=new oe,U=new oe;let P=null;const H=new st(0);let q=0,F=e.width,X=e.height,O=1,tt=null,nt=null;const rt=new oe(0,0,F,X),wt=new oe(0,0,F,X);let jt=!1;const j=new va;let it=!1,xt=!1;this.transmissionResolutionScale=1;const ct=new ne,At=new ne,Jt=new L,Rt=new oe,me={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ue=!1;function Gt(){return I===null?O:1}let D=n;function je(w,k){return e.getContext(w,k)}try{const w={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${ra}`),e.addEventListener("webglcontextlost",Z,!1),e.addEventListener("webglcontextrestored",ut,!1),e.addEventListener("webglcontextcreationerror",dt,!1),D===null){const k="webgl2";if(D=je(k,w),D===null)throw je(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let Vt,Wt,bt,ce,St,T,M,G,K,J,$,Mt,ht,mt,Yt,et,gt,Ct,It,_t,Xt,kt,ae,N;function at(){Vt=new Up(D),Vt.init(),kt=new gg(D,Vt),Wt=new Ap(D,Vt,t,kt),bt=new pg(D,Vt),Wt.reverseDepthBuffer&&u&&bt.buffers.depth.setReversed(!0),ce=new Fp(D),St=new eg,T=new mg(D,Vt,bt,St,Wt,kt,ce),M=new Rp(x),G=new Dp(x),K=new Gd(D),ae=new Ep(D,K),J=new Np(D,K,ce,ae),$=new Op(D,J,K,ce),It=new Bp(D,Wt,T),et=new Cp(St),Mt=new tg(x,M,G,Vt,Wt,ae,et),ht=new wg(x,St),mt=new ig,Yt=new cg(Vt),Ct=new bp(x,M,G,bt,$,p,l),gt=new ug(x,$,Wt),N=new Sg(D,ce,Wt,bt),_t=new Tp(D,Vt,ce),Xt=new kp(D,Vt,ce),ce.programs=Mt.programs,x.capabilities=Wt,x.extensions=Vt,x.properties=St,x.renderLists=mt,x.shadowMap=gt,x.state=bt,x.info=ce}at();const Y=new xg(x,D);this.xr=Y,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const w=Vt.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=Vt.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return O},this.setPixelRatio=function(w){w!==void 0&&(O=w,this.setSize(F,X,!1))},this.getSize=function(w){return w.set(F,X)},this.setSize=function(w,k,V=!0){if(Y.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}F=w,X=k,e.width=Math.floor(w*O),e.height=Math.floor(k*O),V===!0&&(e.style.width=w+"px",e.style.height=k+"px"),this.setViewport(0,0,w,k)},this.getDrawingBufferSize=function(w){return w.set(F*O,X*O).floor()},this.setDrawingBufferSize=function(w,k,V){F=w,X=k,O=V,e.width=Math.floor(w*V),e.height=Math.floor(k*V),this.setViewport(0,0,w,k)},this.getCurrentViewport=function(w){return w.copy(R)},this.getViewport=function(w){return w.copy(rt)},this.setViewport=function(w,k,V,W){w.isVector4?rt.set(w.x,w.y,w.z,w.w):rt.set(w,k,V,W),bt.viewport(R.copy(rt).multiplyScalar(O).round())},this.getScissor=function(w){return w.copy(wt)},this.setScissor=function(w,k,V,W){w.isVector4?wt.set(w.x,w.y,w.z,w.w):wt.set(w,k,V,W),bt.scissor(U.copy(wt).multiplyScalar(O).round())},this.getScissorTest=function(){return jt},this.setScissorTest=function(w){bt.setScissorTest(jt=w)},this.setOpaqueSort=function(w){tt=w},this.setTransparentSort=function(w){nt=w},this.getClearColor=function(w){return w.copy(Ct.getClearColor())},this.setClearColor=function(){Ct.setClearColor(...arguments)},this.getClearAlpha=function(){return Ct.getClearAlpha()},this.setClearAlpha=function(){Ct.setClearAlpha(...arguments)},this.clear=function(w=!0,k=!0,V=!0){let W=0;if(w){let B=!1;if(I!==null){const Q=I.texture.format;B=Q===fa||Q===ua||Q===da}if(B){const Q=I.texture.type,lt=Q===Un||Q===hi||Q===ms||Q===Vi||Q===la||Q===ca,pt=Ct.getClearColor(),vt=Ct.getClearAlpha(),Pt=pt.r,Dt=pt.g,Et=pt.b;lt?(g[0]=Pt,g[1]=Dt,g[2]=Et,g[3]=vt,D.clearBufferuiv(D.COLOR,0,g)):(_[0]=Pt,_[1]=Dt,_[2]=Et,_[3]=vt,D.clearBufferiv(D.COLOR,0,_))}else W|=D.COLOR_BUFFER_BIT}k&&(W|=D.DEPTH_BUFFER_BIT),V&&(W|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Z,!1),e.removeEventListener("webglcontextrestored",ut,!1),e.removeEventListener("webglcontextcreationerror",dt,!1),Ct.dispose(),mt.dispose(),Yt.dispose(),St.dispose(),M.dispose(),G.dispose(),$.dispose(),ae.dispose(),N.dispose(),Mt.dispose(),Y.dispose(),Y.removeEventListener("sessionstart",Ia),Y.removeEventListener("sessionend",Pa),jn.stop()};function Z(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function ut(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const w=ce.autoReset,k=gt.enabled,V=gt.autoUpdate,W=gt.needsUpdate,B=gt.type;at(),ce.autoReset=w,gt.enabled=k,gt.autoUpdate=V,gt.needsUpdate=W,gt.type=B}function dt(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function Ut(w){const k=w.target;k.removeEventListener("dispose",Ut),fe(k)}function fe(w){Re(w),St.remove(w)}function Re(w){const k=St.get(w).programs;k!==void 0&&(k.forEach(function(V){Mt.releaseProgram(V)}),w.isShaderMaterial&&Mt.releaseShaderCache(w))}this.renderBufferDirect=function(w,k,V,W,B,Q){k===null&&(k=me);const lt=B.isMesh&&B.matrixWorld.determinant()<0,pt=ih(w,k,V,W,B);bt.setMaterial(W,lt);let vt=V.index,Pt=1;if(W.wireframe===!0){if(vt=J.getWireframeAttribute(V),vt===void 0)return;Pt=2}const Dt=V.drawRange,Et=V.attributes.position;let $t=Dt.start*Pt,Qt=(Dt.start+Dt.count)*Pt;Q!==null&&($t=Math.max($t,Q.start*Pt),Qt=Math.min(Qt,(Q.start+Q.count)*Pt)),vt!==null?($t=Math.max($t,0),Qt=Math.min(Qt,vt.count)):Et!=null&&($t=Math.max($t,0),Qt=Math.min(Qt,Et.count));const _e=Qt-$t;if(_e<0||_e===1/0)return;ae.setup(B,W,pt,V,vt);let pe,Kt=_t;if(vt!==null&&(pe=K.get(vt),Kt=Xt,Kt.setIndex(pe)),B.isMesh)W.wireframe===!0?(bt.setLineWidth(W.wireframeLinewidth*Gt()),Kt.setMode(D.LINES)):Kt.setMode(D.TRIANGLES);else if(B.isLine){let Tt=W.linewidth;Tt===void 0&&(Tt=1),bt.setLineWidth(Tt*Gt()),B.isLineSegments?Kt.setMode(D.LINES):B.isLineLoop?Kt.setMode(D.LINE_LOOP):Kt.setMode(D.LINE_STRIP)}else B.isPoints?Kt.setMode(D.POINTS):B.isSprite&&Kt.setMode(D.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)ii("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Kt.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(Vt.get("WEBGL_multi_draw"))Kt.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const Tt=B._multiDrawStarts,Ee=B._multiDrawCounts,te=B._multiDrawCount,ln=vt?K.get(vt).bytesPerElement:1,pi=St.get(W).currentProgram.getUniforms();for(let Ge=0;Ge<te;Ge++)pi.setValue(D,"_gl_DrawID",Ge),Kt.render(Tt[Ge]/ln,Ee[Ge])}else if(B.isInstancedMesh)Kt.renderInstances($t,_e,B.count);else if(V.isInstancedBufferGeometry){const Tt=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,Ee=Math.min(V.instanceCount,Tt);Kt.renderInstances($t,_e,Ee)}else Kt.render($t,_e)};function ie(w,k,V){w.transparent===!0&&w.side===Se&&w.forceSinglePass===!1?(w.side=Oe,w.needsUpdate=!0,ys(w,k,V),w.side=Yn,w.needsUpdate=!0,ys(w,k,V),w.side=Se):ys(w,k,V)}this.compile=function(w,k,V=null){V===null&&(V=w),f=Yt.get(V),f.init(k),b.push(f),V.traverseVisible(function(B){B.isLight&&B.layers.test(k.layers)&&(f.pushLight(B),B.castShadow&&f.pushShadow(B))}),w!==V&&w.traverseVisible(function(B){B.isLight&&B.layers.test(k.layers)&&(f.pushLight(B),B.castShadow&&f.pushShadow(B))}),f.setupLights();const W=new Set;return w.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const Q=B.material;if(Q)if(Array.isArray(Q))for(let lt=0;lt<Q.length;lt++){const pt=Q[lt];ie(pt,V,B),W.add(pt)}else ie(Q,V,B),W.add(Q)}),f=b.pop(),W},this.compileAsync=function(w,k,V=null){const W=this.compile(w,k,V);return new Promise(B=>{function Q(){if(W.forEach(function(lt){St.get(lt).currentProgram.isReady()&&W.delete(lt)}),W.size===0){B(w);return}setTimeout(Q,10)}Vt.get("KHR_parallel_shader_compile")!==null?Q():setTimeout(Q,10)})};let an=null;function Sn(w){an&&an(w)}function Ia(){jn.stop()}function Pa(){jn.start()}const jn=new Uc;jn.setAnimationLoop(Sn),typeof self<"u"&&jn.setContext(self),this.setAnimationLoop=function(w){an=w,Y.setAnimationLoop(w),w===null?jn.stop():jn.start()},Y.addEventListener("sessionstart",Ia),Y.addEventListener("sessionend",Pa),this.render=function(w,k){if(k!==void 0&&k.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),Y.enabled===!0&&Y.isPresenting===!0&&(Y.cameraAutoUpdate===!0&&Y.updateCamera(k),k=Y.getCamera()),w.isScene===!0&&w.onBeforeRender(x,w,k,I),f=Yt.get(w,b.length),f.init(k),b.push(f),At.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),j.setFromProjectionMatrix(At),xt=this.localClippingEnabled,it=et.init(this.clippingPlanes,xt),m=mt.get(w,S.length),m.init(),S.push(m),Y.enabled===!0&&Y.isPresenting===!0){const Q=x.xr.getDepthSensingMesh();Q!==null&&Mr(Q,k,-1/0,x.sortObjects)}Mr(w,k,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(tt,nt),ue=Y.enabled===!1||Y.isPresenting===!1||Y.hasDepthSensing()===!1,ue&&Ct.addToRenderList(m,w),this.info.render.frame++,it===!0&&et.beginShadows();const V=f.state.shadowsArray;gt.render(V,w,k),it===!0&&et.endShadows(),this.info.autoReset===!0&&this.info.reset();const W=m.opaque,B=m.transmissive;if(f.setupLights(),k.isArrayCamera){const Q=k.cameras;if(B.length>0)for(let lt=0,pt=Q.length;lt<pt;lt++){const vt=Q[lt];Da(W,B,w,vt)}ue&&Ct.render(w);for(let lt=0,pt=Q.length;lt<pt;lt++){const vt=Q[lt];La(m,w,vt,vt.viewport)}}else B.length>0&&Da(W,B,w,k),ue&&Ct.render(w),La(m,w,k);I!==null&&A===0&&(T.updateMultisampleRenderTarget(I),T.updateRenderTargetMipmap(I)),w.isScene===!0&&w.onAfterRender(x,w,k),ae.resetDefaultState(),y=-1,v=null,b.pop(),b.length>0?(f=b[b.length-1],it===!0&&et.setGlobalState(x.clippingPlanes,f.state.camera)):f=null,S.pop(),S.length>0?m=S[S.length-1]:m=null};function Mr(w,k,V,W){if(w.visible===!1)return;if(w.layers.test(k.layers)){if(w.isGroup)V=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(k);else if(w.isLight)f.pushLight(w),w.castShadow&&f.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||j.intersectsSprite(w)){W&&Rt.setFromMatrixPosition(w.matrixWorld).applyMatrix4(At);const lt=$.update(w),pt=w.material;pt.visible&&m.push(w,lt,pt,V,Rt.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||j.intersectsObject(w))){const lt=$.update(w),pt=w.material;if(W&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Rt.copy(w.boundingSphere.center)):(lt.boundingSphere===null&&lt.computeBoundingSphere(),Rt.copy(lt.boundingSphere.center)),Rt.applyMatrix4(w.matrixWorld).applyMatrix4(At)),Array.isArray(pt)){const vt=lt.groups;for(let Pt=0,Dt=vt.length;Pt<Dt;Pt++){const Et=vt[Pt],$t=pt[Et.materialIndex];$t&&$t.visible&&m.push(w,lt,$t,V,Rt.z,Et)}}else pt.visible&&m.push(w,lt,pt,V,Rt.z,null)}}const Q=w.children;for(let lt=0,pt=Q.length;lt<pt;lt++)Mr(Q[lt],k,V,W)}function La(w,k,V,W){const B=w.opaque,Q=w.transmissive,lt=w.transparent;f.setupLightsView(V),it===!0&&et.setGlobalState(x.clippingPlanes,V),W&&bt.viewport(R.copy(W)),B.length>0&&vs(B,k,V),Q.length>0&&vs(Q,k,V),lt.length>0&&vs(lt,k,V),bt.buffers.depth.setTest(!0),bt.buffers.depth.setMask(!0),bt.buffers.color.setMask(!0),bt.setPolygonOffset(!1)}function Da(w,k,V,W){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[W.id]===void 0&&(f.state.transmissionRenderTarget[W.id]=new di(1,1,{generateMipmaps:!0,type:Vt.has("EXT_color_buffer_half_float")||Vt.has("EXT_color_buffer_float")?gs:Un,minFilter:li,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Zt.workingColorSpace}));const Q=f.state.transmissionRenderTarget[W.id],lt=W.viewport||R;Q.setSize(lt.z*x.transmissionResolutionScale,lt.w*x.transmissionResolutionScale);const pt=x.getRenderTarget();x.setRenderTarget(Q),x.getClearColor(H),q=x.getClearAlpha(),q<1&&x.setClearColor(16777215,.5),x.clear(),ue&&Ct.render(V);const vt=x.toneMapping;x.toneMapping=Xn;const Pt=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),f.setupLightsView(W),it===!0&&et.setGlobalState(x.clippingPlanes,W),vs(w,V,W),T.updateMultisampleRenderTarget(Q),T.updateRenderTargetMipmap(Q),Vt.has("WEBGL_multisampled_render_to_texture")===!1){let Dt=!1;for(let Et=0,$t=k.length;Et<$t;Et++){const Qt=k[Et],_e=Qt.object,pe=Qt.geometry,Kt=Qt.material,Tt=Qt.group;if(Kt.side===Se&&_e.layers.test(W.layers)){const Ee=Kt.side;Kt.side=Oe,Kt.needsUpdate=!0,Ua(_e,V,W,pe,Kt,Tt),Kt.side=Ee,Kt.needsUpdate=!0,Dt=!0}}Dt===!0&&(T.updateMultisampleRenderTarget(Q),T.updateRenderTargetMipmap(Q))}x.setRenderTarget(pt),x.setClearColor(H,q),Pt!==void 0&&(W.viewport=Pt),x.toneMapping=vt}function vs(w,k,V){const W=k.isScene===!0?k.overrideMaterial:null;for(let B=0,Q=w.length;B<Q;B++){const lt=w[B],pt=lt.object,vt=lt.geometry,Pt=W===null?lt.material:W,Dt=lt.group;pt.layers.test(V.layers)&&Ua(pt,k,V,vt,Pt,Dt)}}function Ua(w,k,V,W,B,Q){w.onBeforeRender(x,k,V,W,B,Q),w.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),B.onBeforeRender(x,k,V,W,w,Q),B.transparent===!0&&B.side===Se&&B.forceSinglePass===!1?(B.side=Oe,B.needsUpdate=!0,x.renderBufferDirect(V,k,W,B,w,Q),B.side=Yn,B.needsUpdate=!0,x.renderBufferDirect(V,k,W,B,w,Q),B.side=Se):x.renderBufferDirect(V,k,W,B,w,Q),w.onAfterRender(x,k,V,W,B,Q)}function ys(w,k,V){k.isScene!==!0&&(k=me);const W=St.get(w),B=f.state.lights,Q=f.state.shadowsArray,lt=B.state.version,pt=Mt.getParameters(w,B.state,Q,k,V),vt=Mt.getProgramCacheKey(pt);let Pt=W.programs;W.environment=w.isMeshStandardMaterial?k.environment:null,W.fog=k.fog,W.envMap=(w.isMeshStandardMaterial?G:M).get(w.envMap||W.environment),W.envMapRotation=W.environment!==null&&w.envMap===null?k.environmentRotation:w.envMapRotation,Pt===void 0&&(w.addEventListener("dispose",Ut),Pt=new Map,W.programs=Pt);let Dt=Pt.get(vt);if(Dt!==void 0){if(W.currentProgram===Dt&&W.lightsStateVersion===lt)return ka(w,pt),Dt}else pt.uniforms=Mt.getUniforms(w),w.onBeforeCompile(pt,x),Dt=Mt.acquireProgram(pt,vt),Pt.set(vt,Dt),W.uniforms=pt.uniforms;const Et=W.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Et.clippingPlanes=et.uniform),ka(w,pt),W.needsLights=rh(w),W.lightsStateVersion=lt,W.needsLights&&(Et.ambientLightColor.value=B.state.ambient,Et.lightProbe.value=B.state.probe,Et.directionalLights.value=B.state.directional,Et.directionalLightShadows.value=B.state.directionalShadow,Et.spotLights.value=B.state.spot,Et.spotLightShadows.value=B.state.spotShadow,Et.rectAreaLights.value=B.state.rectArea,Et.ltc_1.value=B.state.rectAreaLTC1,Et.ltc_2.value=B.state.rectAreaLTC2,Et.pointLights.value=B.state.point,Et.pointLightShadows.value=B.state.pointShadow,Et.hemisphereLights.value=B.state.hemi,Et.directionalShadowMap.value=B.state.directionalShadowMap,Et.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Et.spotShadowMap.value=B.state.spotShadowMap,Et.spotLightMatrix.value=B.state.spotLightMatrix,Et.spotLightMap.value=B.state.spotLightMap,Et.pointShadowMap.value=B.state.pointShadowMap,Et.pointShadowMatrix.value=B.state.pointShadowMatrix),W.currentProgram=Dt,W.uniformsList=null,Dt}function Na(w){if(w.uniformsList===null){const k=w.currentProgram.getUniforms();w.uniformsList=nr.seqWithValue(k.seq,w.uniforms)}return w.uniformsList}function ka(w,k){const V=St.get(w);V.outputColorSpace=k.outputColorSpace,V.batching=k.batching,V.batchingColor=k.batchingColor,V.instancing=k.instancing,V.instancingColor=k.instancingColor,V.instancingMorph=k.instancingMorph,V.skinning=k.skinning,V.morphTargets=k.morphTargets,V.morphNormals=k.morphNormals,V.morphColors=k.morphColors,V.morphTargetsCount=k.morphTargetsCount,V.numClippingPlanes=k.numClippingPlanes,V.numIntersection=k.numClipIntersection,V.vertexAlphas=k.vertexAlphas,V.vertexTangents=k.vertexTangents,V.toneMapping=k.toneMapping}function ih(w,k,V,W,B){k.isScene!==!0&&(k=me),T.resetTextureUnits();const Q=k.fog,lt=W.isMeshStandardMaterial?k.environment:null,pt=I===null?x.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:Xi,vt=(W.isMeshStandardMaterial?G:M).get(W.envMap||lt),Pt=W.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Dt=!!V.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Et=!!V.morphAttributes.position,$t=!!V.morphAttributes.normal,Qt=!!V.morphAttributes.color;let _e=Xn;W.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(_e=x.toneMapping);const pe=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Kt=pe!==void 0?pe.length:0,Tt=St.get(W),Ee=f.state.lights;if(it===!0&&(xt===!0||w!==v)){const ke=w===v&&W.id===y;et.setState(W,w,ke)}let te=!1;W.version===Tt.__version?(Tt.needsLights&&Tt.lightsStateVersion!==Ee.state.version||Tt.outputColorSpace!==pt||B.isBatchedMesh&&Tt.batching===!1||!B.isBatchedMesh&&Tt.batching===!0||B.isBatchedMesh&&Tt.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&Tt.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&Tt.instancing===!1||!B.isInstancedMesh&&Tt.instancing===!0||B.isSkinnedMesh&&Tt.skinning===!1||!B.isSkinnedMesh&&Tt.skinning===!0||B.isInstancedMesh&&Tt.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&Tt.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&Tt.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&Tt.instancingMorph===!1&&B.morphTexture!==null||Tt.envMap!==vt||W.fog===!0&&Tt.fog!==Q||Tt.numClippingPlanes!==void 0&&(Tt.numClippingPlanes!==et.numPlanes||Tt.numIntersection!==et.numIntersection)||Tt.vertexAlphas!==Pt||Tt.vertexTangents!==Dt||Tt.morphTargets!==Et||Tt.morphNormals!==$t||Tt.morphColors!==Qt||Tt.toneMapping!==_e||Tt.morphTargetsCount!==Kt)&&(te=!0):(te=!0,Tt.__version=W.version);let ln=Tt.currentProgram;te===!0&&(ln=ys(W,k,B));let pi=!1,Ge=!1,Ki=!1;const he=ln.getUniforms(),Ke=Tt.uniforms;if(bt.useProgram(ln.program)&&(pi=!0,Ge=!0,Ki=!0),W.id!==y&&(y=W.id,Ge=!0),pi||v!==w){bt.buffers.depth.getReversed()?(ct.copy(w.projectionMatrix),Zh(ct),Jh(ct),he.setValue(D,"projectionMatrix",ct)):he.setValue(D,"projectionMatrix",w.projectionMatrix),he.setValue(D,"viewMatrix",w.matrixWorldInverse);const ze=he.map.cameraPosition;ze!==void 0&&ze.setValue(D,Jt.setFromMatrixPosition(w.matrixWorld)),Wt.logarithmicDepthBuffer&&he.setValue(D,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&he.setValue(D,"isOrthographic",w.isOrthographicCamera===!0),v!==w&&(v=w,Ge=!0,Ki=!0)}if(B.isSkinnedMesh){he.setOptional(D,B,"bindMatrix"),he.setOptional(D,B,"bindMatrixInverse");const ke=B.skeleton;ke&&(ke.boneTexture===null&&ke.computeBoneTexture(),he.setValue(D,"boneTexture",ke.boneTexture,T))}B.isBatchedMesh&&(he.setOptional(D,B,"batchingTexture"),he.setValue(D,"batchingTexture",B._matricesTexture,T),he.setOptional(D,B,"batchingIdTexture"),he.setValue(D,"batchingIdTexture",B._indirectTexture,T),he.setOptional(D,B,"batchingColorTexture"),B._colorsTexture!==null&&he.setValue(D,"batchingColorTexture",B._colorsTexture,T));const Ze=V.morphAttributes;if((Ze.position!==void 0||Ze.normal!==void 0||Ze.color!==void 0)&&It.update(B,V,ln),(Ge||Tt.receiveShadow!==B.receiveShadow)&&(Tt.receiveShadow=B.receiveShadow,he.setValue(D,"receiveShadow",B.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(Ke.envMap.value=vt,Ke.flipEnvMap.value=vt.isCubeTexture&&vt.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&k.environment!==null&&(Ke.envMapIntensity.value=k.environmentIntensity),Ge&&(he.setValue(D,"toneMappingExposure",x.toneMappingExposure),Tt.needsLights&&sh(Ke,Ki),Q&&W.fog===!0&&ht.refreshFogUniforms(Ke,Q),ht.refreshMaterialUniforms(Ke,W,O,X,f.state.transmissionRenderTarget[w.id]),nr.upload(D,Na(Tt),Ke,T)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(nr.upload(D,Na(Tt),Ke,T),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&he.setValue(D,"center",B.center),he.setValue(D,"modelViewMatrix",B.modelViewMatrix),he.setValue(D,"normalMatrix",B.normalMatrix),he.setValue(D,"modelMatrix",B.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const ke=W.uniformsGroups;for(let ze=0,wr=ke.length;ze<wr;ze++){const Kn=ke[ze];N.update(Kn,ln),N.bind(Kn,ln)}}return ln}function sh(w,k){w.ambientLightColor.needsUpdate=k,w.lightProbe.needsUpdate=k,w.directionalLights.needsUpdate=k,w.directionalLightShadows.needsUpdate=k,w.pointLights.needsUpdate=k,w.pointLightShadows.needsUpdate=k,w.spotLights.needsUpdate=k,w.spotLightShadows.needsUpdate=k,w.rectAreaLights.needsUpdate=k,w.hemisphereLights.needsUpdate=k}function rh(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(w,k,V){St.get(w.texture).__webglTexture=k,St.get(w.depthTexture).__webglTexture=V;const W=St.get(w);W.__hasExternalTextures=!0,W.__autoAllocateDepthBuffer=V===void 0,W.__autoAllocateDepthBuffer||Vt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),W.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,k){const V=St.get(w);V.__webglFramebuffer=k,V.__useDefaultFramebuffer=k===void 0};const oh=D.createFramebuffer();this.setRenderTarget=function(w,k=0,V=0){I=w,E=k,A=V;let W=!0,B=null,Q=!1,lt=!1;if(w){const vt=St.get(w);if(vt.__useDefaultFramebuffer!==void 0)bt.bindFramebuffer(D.FRAMEBUFFER,null),W=!1;else if(vt.__webglFramebuffer===void 0)T.setupRenderTarget(w);else if(vt.__hasExternalTextures)T.rebindTextures(w,St.get(w.texture).__webglTexture,St.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const Et=w.depthTexture;if(vt.__boundDepthTexture!==Et){if(Et!==null&&St.has(Et)&&(w.width!==Et.image.width||w.height!==Et.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");T.setupDepthRenderbuffer(w)}}const Pt=w.texture;(Pt.isData3DTexture||Pt.isDataArrayTexture||Pt.isCompressedArrayTexture)&&(lt=!0);const Dt=St.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Dt[k])?B=Dt[k][V]:B=Dt[k],Q=!0):w.samples>0&&T.useMultisampledRTT(w)===!1?B=St.get(w).__webglMultisampledFramebuffer:Array.isArray(Dt)?B=Dt[V]:B=Dt,R.copy(w.viewport),U.copy(w.scissor),P=w.scissorTest}else R.copy(rt).multiplyScalar(O).floor(),U.copy(wt).multiplyScalar(O).floor(),P=jt;if(V!==0&&(B=oh),bt.bindFramebuffer(D.FRAMEBUFFER,B)&&W&&bt.drawBuffers(w,B),bt.viewport(R),bt.scissor(U),bt.setScissorTest(P),Q){const vt=St.get(w.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+k,vt.__webglTexture,V)}else if(lt){const vt=St.get(w.texture),Pt=k;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,vt.__webglTexture,V,Pt)}else if(w!==null&&V!==0){const vt=St.get(w.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,vt.__webglTexture,V)}y=-1},this.readRenderTargetPixels=function(w,k,V,W,B,Q,lt){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let pt=St.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&lt!==void 0&&(pt=pt[lt]),pt){bt.bindFramebuffer(D.FRAMEBUFFER,pt);try{const vt=w.texture,Pt=vt.format,Dt=vt.type;if(!Wt.textureFormatReadable(Pt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Wt.textureTypeReadable(Dt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=w.width-W&&V>=0&&V<=w.height-B&&D.readPixels(k,V,W,B,kt.convert(Pt),kt.convert(Dt),Q)}finally{const vt=I!==null?St.get(I).__webglFramebuffer:null;bt.bindFramebuffer(D.FRAMEBUFFER,vt)}}},this.readRenderTargetPixelsAsync=async function(w,k,V,W,B,Q,lt){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let pt=St.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&lt!==void 0&&(pt=pt[lt]),pt){const vt=w.texture,Pt=vt.format,Dt=vt.type;if(!Wt.textureFormatReadable(Pt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Wt.textureTypeReadable(Dt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(k>=0&&k<=w.width-W&&V>=0&&V<=w.height-B){bt.bindFramebuffer(D.FRAMEBUFFER,pt);const Et=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Et),D.bufferData(D.PIXEL_PACK_BUFFER,Q.byteLength,D.STREAM_READ),D.readPixels(k,V,W,B,kt.convert(Pt),kt.convert(Dt),0);const $t=I!==null?St.get(I).__webglFramebuffer:null;bt.bindFramebuffer(D.FRAMEBUFFER,$t);const Qt=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await Kh(D,Qt,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Et),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,Q),D.deleteBuffer(Et),D.deleteSync(Qt),Q}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(w,k=null,V=0){w.isTexture!==!0&&(ii("WebGLRenderer: copyFramebufferToTexture function signature has changed."),k=arguments[0]||null,w=arguments[1]);const W=Math.pow(2,-V),B=Math.floor(w.image.width*W),Q=Math.floor(w.image.height*W),lt=k!==null?k.x:0,pt=k!==null?k.y:0;T.setTexture2D(w,0),D.copyTexSubImage2D(D.TEXTURE_2D,V,0,0,lt,pt,B,Q),bt.unbindTexture()};const ah=D.createFramebuffer(),lh=D.createFramebuffer();this.copyTextureToTexture=function(w,k,V=null,W=null,B=0,Q=null){w.isTexture!==!0&&(ii("WebGLRenderer: copyTextureToTexture function signature has changed."),W=arguments[0]||null,w=arguments[1],k=arguments[2],Q=arguments[3]||0,V=null),Q===null&&(B!==0?(ii("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Q=B,B=0):Q=0);let lt,pt,vt,Pt,Dt,Et,$t,Qt,_e;const pe=w.isCompressedTexture?w.mipmaps[Q]:w.image;if(V!==null)lt=V.max.x-V.min.x,pt=V.max.y-V.min.y,vt=V.isBox3?V.max.z-V.min.z:1,Pt=V.min.x,Dt=V.min.y,Et=V.isBox3?V.min.z:0;else{const Ze=Math.pow(2,-B);lt=Math.floor(pe.width*Ze),pt=Math.floor(pe.height*Ze),w.isDataArrayTexture?vt=pe.depth:w.isData3DTexture?vt=Math.floor(pe.depth*Ze):vt=1,Pt=0,Dt=0,Et=0}W!==null?($t=W.x,Qt=W.y,_e=W.z):($t=0,Qt=0,_e=0);const Kt=kt.convert(k.format),Tt=kt.convert(k.type);let Ee;k.isData3DTexture?(T.setTexture3D(k,0),Ee=D.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(T.setTexture2DArray(k,0),Ee=D.TEXTURE_2D_ARRAY):(T.setTexture2D(k,0),Ee=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,k.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,k.unpackAlignment);const te=D.getParameter(D.UNPACK_ROW_LENGTH),ln=D.getParameter(D.UNPACK_IMAGE_HEIGHT),pi=D.getParameter(D.UNPACK_SKIP_PIXELS),Ge=D.getParameter(D.UNPACK_SKIP_ROWS),Ki=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,pe.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,pe.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Pt),D.pixelStorei(D.UNPACK_SKIP_ROWS,Dt),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Et);const he=w.isDataArrayTexture||w.isData3DTexture,Ke=k.isDataArrayTexture||k.isData3DTexture;if(w.isDepthTexture){const Ze=St.get(w),ke=St.get(k),ze=St.get(Ze.__renderTarget),wr=St.get(ke.__renderTarget);bt.bindFramebuffer(D.READ_FRAMEBUFFER,ze.__webglFramebuffer),bt.bindFramebuffer(D.DRAW_FRAMEBUFFER,wr.__webglFramebuffer);for(let Kn=0;Kn<vt;Kn++)he&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,St.get(w).__webglTexture,B,Et+Kn),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,St.get(k).__webglTexture,Q,_e+Kn)),D.blitFramebuffer(Pt,Dt,lt,pt,$t,Qt,lt,pt,D.DEPTH_BUFFER_BIT,D.NEAREST);bt.bindFramebuffer(D.READ_FRAMEBUFFER,null),bt.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(B!==0||w.isRenderTargetTexture||St.has(w)){const Ze=St.get(w),ke=St.get(k);bt.bindFramebuffer(D.READ_FRAMEBUFFER,ah),bt.bindFramebuffer(D.DRAW_FRAMEBUFFER,lh);for(let ze=0;ze<vt;ze++)he?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ze.__webglTexture,B,Et+ze):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Ze.__webglTexture,B),Ke?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,ke.__webglTexture,Q,_e+ze):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,ke.__webglTexture,Q),B!==0?D.blitFramebuffer(Pt,Dt,lt,pt,$t,Qt,lt,pt,D.COLOR_BUFFER_BIT,D.NEAREST):Ke?D.copyTexSubImage3D(Ee,Q,$t,Qt,_e+ze,Pt,Dt,lt,pt):D.copyTexSubImage2D(Ee,Q,$t,Qt,Pt,Dt,lt,pt);bt.bindFramebuffer(D.READ_FRAMEBUFFER,null),bt.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else Ke?w.isDataTexture||w.isData3DTexture?D.texSubImage3D(Ee,Q,$t,Qt,_e,lt,pt,vt,Kt,Tt,pe.data):k.isCompressedArrayTexture?D.compressedTexSubImage3D(Ee,Q,$t,Qt,_e,lt,pt,vt,Kt,pe.data):D.texSubImage3D(Ee,Q,$t,Qt,_e,lt,pt,vt,Kt,Tt,pe):w.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,Q,$t,Qt,lt,pt,Kt,Tt,pe.data):w.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,Q,$t,Qt,pe.width,pe.height,Kt,pe.data):D.texSubImage2D(D.TEXTURE_2D,Q,$t,Qt,lt,pt,Kt,Tt,pe);D.pixelStorei(D.UNPACK_ROW_LENGTH,te),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,ln),D.pixelStorei(D.UNPACK_SKIP_PIXELS,pi),D.pixelStorei(D.UNPACK_SKIP_ROWS,Ge),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Ki),Q===0&&k.generateMipmaps&&D.generateMipmap(Ee),bt.unbindTexture()},this.copyTextureToTexture3D=function(w,k,V=null,W=null,B=0){return w.isTexture!==!0&&(ii("WebGLRenderer: copyTextureToTexture3D function signature has changed."),V=arguments[0]||null,W=arguments[1]||null,w=arguments[2],k=arguments[3],B=arguments[4]||0),ii('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(w,k,V,W,B)},this.initRenderTarget=function(w){St.get(w).__webglFramebuffer===void 0&&T.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?T.setTextureCube(w,0):w.isData3DTexture?T.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?T.setTexture2DArray(w,0):T.setTexture2D(w,0),bt.unbindTexture()},this.resetState=function(){E=0,A=0,I=null,bt.reset(),ae.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ln}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=Zt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Zt._getUnpackColorSpace()}}function ba(s){let t=s>>>0;return()=>{t|=0,t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function qt(s,t,e){return s<t?t:s>e?e:s}function Gn(s,t,e){return s+(t-s)*e}function Le(s,t,e){const n=qt((e-s)/(t-s),0,1);return n*n*(3-2*n)}const Eg=.5*(Math.sqrt(3)-1),ls=(3-Math.sqrt(3))/6,io=[[1,1],[-1,1],[1,-1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1]];class cs{perm;permMod8;constructor(t){const e=ba(t),n=new Uint8Array(256);for(let i=0;i<256;i++)n[i]=i;for(let i=255;i>0;i--){const r=Math.floor(e()*(i+1)),o=n[i];n[i]=n[r],n[r]=o}this.perm=new Uint8Array(512),this.permMod8=new Uint8Array(512);for(let i=0;i<512;i++)this.perm[i]=n[i&255],this.permMod8[i]=this.perm[i]&7}noise2D(t,e){let n=0,i=0,r=0;const o=(t+e)*Eg,a=Math.floor(t+o),l=Math.floor(e+o),c=(a+l)*ls,h=a-c,d=l-c,u=t-h,p=e-d;let g,_;u>p?(g=1,_=0):(g=0,_=1);const m=u-g+ls,f=p-_+ls,S=u-1+2*ls,b=p-1+2*ls,x=a&255,C=l&255,E=this.permMod8[x+this.perm[C]],A=this.permMod8[x+g+this.perm[C+_]],I=this.permMod8[x+1+this.perm[C+1]];let y=.5-u*u-p*p;if(y>=0){y*=y;const U=io[E];n=y*y*(U[0]*u+U[1]*p)}let v=.5-m*m-f*f;if(v>=0){v*=v;const U=io[A];i=v*v*(U[0]*m+U[1]*f)}let R=.5-S*S-b*b;if(R>=0){R*=R;const U=io[I];r=R*R*(U[0]*S+U[1]*b)}return 70*(n+i+r)}fbm(t,e,n=4,i=2,r=.5){let o=0,a=.5,l=1,c=0;for(let h=0;h<n;h++)o+=a*this.noise2D(t*l,e*l),c+=a,l*=i,a*=r;return o/c}ridged(t,e,n=4){let i=0,r=.5,o=1,a=0;for(let l=0;l<n;l++){const c=1-Math.abs(this.noise2D(t*o,e*o));i+=r*c*c,a+=r,o*=2.05,r*=.5}return i/a}}const vn=360,ki=vn/2,nn=0,Tg=-.65,Qo={pine_tree:{kind:"pine_tree",maxHp:90,minToolTier:0,preferredTool:"axe",drops:[{itemId:"wood",min:5,max:8},{itemId:"resin",min:1,max:2,chance:.6}],respawnSec:210,radius:.85},oak_tree:{kind:"oak_tree",maxHp:110,minToolTier:0,preferredTool:"axe",drops:[{itemId:"wood",min:6,max:10},{itemId:"fiber",min:1,max:3,chance:.5}],respawnSec:240,radius:.95},birch_tree:{kind:"birch_tree",maxHp:75,minToolTier:0,preferredTool:"axe",drops:[{itemId:"wood",min:4,max:7},{itemId:"fiber",min:1,max:2,chance:.65}],respawnSec:180,radius:.72},palm_tree:{kind:"palm_tree",maxHp:70,minToolTier:0,preferredTool:"axe",drops:[{itemId:"wood",min:4,max:6},{itemId:"coconut",min:1,max:2,chance:.85}],respawnSec:180,radius:.7},marsh_tree:{kind:"marsh_tree",maxHp:95,minToolTier:0,preferredTool:"axe",drops:[{itemId:"wood",min:5,max:7},{itemId:"resin",min:1,max:3,chance:.75}],respawnSec:220,radius:.9},stone_boulder:{kind:"stone_boulder",maxHp:100,minToolTier:0,preferredTool:"pickaxe",drops:[{itemId:"stone",min:5,max:8},{itemId:"flint",min:1,max:3,chance:.75}],respawnSec:200,radius:1.15},copper_vein:{kind:"copper_vein",maxHp:135,minToolTier:1,preferredTool:"pickaxe",drops:[{itemId:"copper_ore",min:3,max:5},{itemId:"stone",min:2,max:4}],respawnSec:260,radius:1.2},iron_vein:{kind:"iron_vein",maxHp:180,minToolTier:1,preferredTool:"pickaxe",drops:[{itemId:"iron_ore",min:3,max:5},{itemId:"stone",min:2,max:3},{itemId:"coal",min:1,max:2,chance:.6}],respawnSec:300,radius:1.25},obsidian_vein:{kind:"obsidian_vein",maxHp:240,minToolTier:2,preferredTool:"pickaxe",drops:[{itemId:"obsidian",min:2,max:4},{itemId:"coal",min:2,max:3}],respawnSec:360,radius:1.3},ancient_crystal:{kind:"ancient_crystal",maxHp:210,minToolTier:2,preferredTool:"pickaxe",drops:[{itemId:"ancient_shard",min:2,max:3},{itemId:"flint",min:1,max:2}],respawnSec:420,radius:1},berry_bush:{kind:"berry_bush",maxHp:25,minToolTier:0,preferredTool:"hand",drops:[{itemId:"berries",min:3,max:5},{itemId:"fiber",min:1,max:2,chance:.7}],respawnSec:120,radius:.7},fiber_reed:{kind:"fiber_reed",maxHp:20,minToolTier:0,preferredTool:"hand",drops:[{itemId:"fiber",min:3,max:6}],respawnSec:100,radius:.6},mushroom_cluster:{kind:"mushroom_cluster",maxHp:18,minToolTier:0,preferredTool:"hand",drops:[{itemId:"mushroom",min:2,max:4}],respawnSec:130,radius:.55},driftwood:{kind:"driftwood",maxHp:35,minToolTier:0,preferredTool:"hand",drops:[{itemId:"wood",min:3,max:5},{itemId:"fiber",min:1,max:2,chance:.5}],respawnSec:150,radius:.85},supply_crate:{kind:"supply_crate",maxHp:45,minToolTier:0,preferredTool:"axe",drops:[{itemId:"wood",min:3,max:6},{itemId:"iron_ingot",min:1,max:2,chance:.55},{itemId:"bandage",min:1,max:2,chance:.7},{itemId:"cooked_meat",min:1,max:2,chance:.65},{itemId:"rope",min:1,max:2,chance:.8}],respawnSec:320,radius:.85}};class Oc{seed;elevationNoise;detailNoise;ridgeNoise;moistureNoise;shapeNoise;landmarks;constructor(t){this.seed=t,this.elevationNoise=new cs(t+101),this.detailNoise=new cs(t+202),this.ridgeNoise=new cs(t+303),this.moistureNoise=new cs(t+404),this.shapeNoise=new cs(t+505),this.landmarks=[{id:"lm_sanctuary",name:"Runestone Sanctuary",kind:"sanctuary",x:-10,z:18,radius:13},{id:"lm_spring",name:"Crystal Spring",kind:"spring",x:16,z:8,radius:11},{id:"lm_shipwreck",name:"Wreck of the Dawnbreaker",kind:"shipwreck",x:-14,z:112,radius:16},{id:"lm_watchtower",name:"Northern Watchtower",kind:"watchtower",x:-44,z:-62,radius:12},{id:"lm_peak",name:"Obsidian Spire",kind:"peak",x:62,z:-68,radius:26},{id:"lm_ruins",name:"Sunken Bog Arches",kind:"ruins",x:84,z:36,radius:18}]}getHeight(t,e){const n=t/138,i=e/138,r=Math.sqrt(n*n+i*i),o=Math.atan2(i,n),a=this.shapeNoise.fbm(Math.cos(o)*1.45,Math.sin(o)*1.45,3)*.24+this.shapeNoise.noise2D(t*.011,e*.011)*.14,l=r+a,c=1-Le(.56,1.06,l),h=Gn(-7.2,.2,Le(1.18,.72,l));if(c<=.001)return h+this.detailNoise.noise2D(t*.03,e*.03)*.35;const d=this.elevationNoise.fbm(t*.0085,e*.0085,4),u=this.detailNoise.fbm(t*.032,e*.032,3)*1.1;let p=2.4+(d*.5+.5)*6.5+u;const g=Math.hypot(t-62,e+68),_=1-Le(10,74,g);if(_>0){const y=this.ridgeNoise.ridged(t*.018,e*.018,4);p+=_*_*(11.5+y*13.5)}const m=Math.hypot(t+44,e+62),f=1-Le(16,78,m);if(f>0){const y=this.ridgeNoise.ridged(t*.014,e*.014,3);p+=f*(5.2+y*4.5)}const S=Math.hypot(t-84,e-36),b=1-Le(10,52,S);b>0&&(p=Gn(p,.55+this.detailNoise.noise2D(t*.04,e*.04)*.5,b*.85));const x=Math.hypot(t+14,e-102),C=1-Le(12,42,x);C>0&&(p=Gn(p,1.35,C*.65)),p=Gn(h,p,c);const E=Math.hypot(t+10,e-18);if(E<17){const y=1-Le(7,17,E);p=Gn(p,4.2,y*.85)}const A=Math.hypot(t-16,e-8);if(A<14){const y=1-Le(3.5,13.5,A);p=Gn(p,-.75,y*.92)}const I=Math.hypot(t+44,e+62);if(I<11){const y=1-Le(4.5,11,I);p=Gn(p,11.2,y*.75)}return p}getSlope(t,e){const i=this.getHeight(t-1,e),r=this.getHeight(t+1,e),o=this.getHeight(t,e-1),a=this.getHeight(t,e+1),l=(r-i)/2,c=(a-o)/2;return Math.sqrt(l*l+c*c)}getNormal(t,e){const i=this.getHeight(t-.8,e),r=this.getHeight(t+.8,e),o=this.getHeight(t,e-.8),a=this.getHeight(t,e+.8),l=i-r,c=2*.8,h=o-a,d=Math.hypot(l,c,h)||1;return{x:l/d,y:c/d,z:h/d}}isNearFreshWater(t,e){return Math.hypot(t-16,e-8)<12.5}sample(t,e){const n=this.getHeight(t,e),i=this.getSlope(t,e),r=qt(.5+this.moistureNoise.fbm(t*.011,e*.011,3)*.7,0,1),o=qt(.65-Math.max(0,n)*.025+e/300*.25,0,1);let a;const l=Math.hypot(t-84,e-36),c=Math.hypot(t-62,e+68);return n<nn-.12?a="ocean":l<42&&n<2.6?a="marsh":n<1.55?a="beach":c<54&&n>12.2?a="volcanic":n>10.2||i>.72?a="highland":e<-12||n>6.4||r<.42?a="pine":a="meadow",{height:n,biome:a,moisture:r,temperature:o,slope:i}}getSpawnPoint(){return{x:-10,y:this.getHeight(-10,25),z:25}}generateResourceNodes(){const t=ba(this.seed+7777),e=[],n=[],i=(c,h,d)=>{if(Math.hypot(c+10,h-18)<9.5||Math.hypot(c-16,h-8)<9.5||Math.hypot(c+44,h+62)<6.5)return!1;for(let u=0;u<n.length;u++){const p=n[u],g=c-p.x,_=h-p.z,m=p.r+d;if(g*g+_*_<m*m)return!1}return!0},r=(c,h,d,u=.85,p=1.28)=>{const g=Qo[c],_=this.getHeight(h,d),m=`node_${e.length}`,f=Gn(u,p,t());e.push({id:m,kind:c,x:Math.round(h*100)/100,y:Math.round(_*100)/100,z:Math.round(d*100)/100,rotY:Math.round(t()*Math.PI*2*100)/100,scale:Math.round(f*100)/100,hp:g.maxHp,maxHp:g.maxHp,depleted:!1,respawnAt:0}),n.push({x:h,z:d,r:g.radius*f+1.3})},o=[["driftwood",-19,26],["driftwood",-2,29],["stone_boulder",-21,16],["stone_boulder",2,21],["berry_bush",-15,31],["berry_bush",-3,14],["fiber_reed",6,13],["fiber_reed",12,17],["birch_tree",-23,21],["oak_tree",-17,7],["pine_tree",-27,12],["copper_vein",-31,4]];for(const[c,h,d]of o)this.getHeight(h,d)>.3&&r(c,h,d,.95,1.1);const a=[[-18,108],[-10,109],[-15,117],[-6,113],[-22,113],[-40,-56],[-48,-66],[81,32],[89,39]];for(const[c,h]of a)this.getHeight(c,h)>.15&&r("supply_crate",c,h,.95,1.1);const l=3200;for(let c=0;c<l&&e.length<620;c++){const h=(t()*2-1)*145,d=(t()*2-1)*145,u=this.sample(h,d);if(u.biome==="ocean"||u.slope>.92)continue;let p=null;const g=t();if(u.biome==="beach"){if(u.height<.3)continue;g<.42?p="palm_tree":g<.7?p="driftwood":g<.88?p="stone_boulder":p="fiber_reed"}else u.biome==="meadow"?g<.28?p="oak_tree":g<.5?p="birch_tree":g<.66?p="berry_bush":g<.8?p="stone_boulder":g<.92?p="fiber_reed":p="copper_vein":u.biome==="pine"?g<.52?p="pine_tree":g<.68?p="stone_boulder":g<.81?p="copper_vein":g<.91?p="iron_vein":p="mushroom_cluster":u.biome==="highland"?g<.28?p="pine_tree":g<.52?p="stone_boulder":g<.72?p="iron_vein":g<.88?p="copper_vein":p="ancient_crystal":u.biome==="volcanic"?g<.36?p="obsidian_vein":g<.62?p="iron_vein":g<.84?p="ancient_crystal":p="stone_boulder":u.biome==="marsh"&&(g<.36?p="marsh_tree":g<.64?p="fiber_reed":g<.86?p="mushroom_cluster":p="ancient_crystal");if(!p)continue;const _=Qo[p],m=p.endsWith("tree")?3.2:2.1;i(h,d,Math.max(_.radius,m))&&r(p,h,d)}return e}}const qe={wood:{id:"wood",name:"Timber Wood",category:"material",description:"Sturdy timber felled from island trees. Essential for tools, fire, and shelters.",maxStack:50,accentColor:"#a66b3a"},stone:{id:"stone",name:"Rough Stone",category:"material",description:"Dense island rock chipped from boulders and cliffs.",maxStack:50,accentColor:"#8d959e"},flint:{id:"flint",name:"Sharp Flint",category:"material",description:"Razor-edged mineral ideal for arrowheads and early blades.",maxStack:40,accentColor:"#5c6670"},fiber:{id:"fiber",name:"Plant Fiber",category:"material",description:"Pliable reeds and stalks woven into rope, bandages, and bindings.",maxStack:50,accentColor:"#76a84c"},rope:{id:"rope",name:"Braided Rope",category:"material",description:"Strong woven cordage required for bows, stations, and reinforced builds.",maxStack:30,accentColor:"#c7a46a"},resin:{id:"resin",name:"Amber Resin",category:"material",description:"Flammable tree sap used for torches, waterproofing, and lanterns.",maxStack:40,accentColor:"#e2942a"},hide:{id:"hide",name:"Animal Hide",category:"material",description:"Supple pelt harvested from deer, boars, and wolves.",maxStack:30,accentColor:"#9c6644"},fang:{id:"fang",name:"Wolf Fang",category:"material",description:"Sharp predator fang used for high-tier weapons.",maxStack:30,accentColor:"#ece4d8"},coal:{id:"coal",name:"Charcoal",category:"material",description:"High-heat smelting fuel produced in campfires or mined from ridges.",maxStack:50,accentColor:"#36393f"},copper_ore:{id:"copper_ore",name:"Copper Ore",category:"material",description:"Green-veined ore ready to be smelted in a Stone Furnace.",maxStack:40,accentColor:"#c87344"},copper_ingot:{id:"copper_ingot",name:"Copper Ingot",category:"material",description:"Refined bronze-hued copper bar for durable mid-tier gear.",maxStack:30,accentColor:"#df854e"},iron_ore:{id:"iron_ore",name:"Iron Ore",category:"material",description:"Heavy highland ore requiring a furnace to smelt.",maxStack:40,accentColor:"#7f8996"},iron_ingot:{id:"iron_ingot",name:"Iron Ingot",category:"material",description:"Forged iron bar for steel-grade tools, armor, and fortifications.",maxStack:30,accentColor:"#b7c4d4"},obsidian:{id:"obsidian",name:"Volcanic Obsidian",category:"material",description:"Razor-sharp volcanic glass mined atop Obsidian Spire.",maxStack:30,accentColor:"#4b3b66"},ancient_shard:{id:"ancient_shard",name:"Ancient Shard",category:"material",description:"Humming runic crystal pulsing with primordial island energy.",maxStack:25,accentColor:"#49e5d8"},shadow_essence:{id:"shadow_essence",name:"Shadow Essence",category:"material",description:"Condensed night-mist dropped by defeated Shadow Stalkers.",maxStack:25,accentColor:"#a855f7"},berries:{id:"berries",name:"Wild Berries",category:"consumable",description:"Sweet coastal berries that ease both hunger and thirst.",maxStack:30,hungerRestore:14,thirstRestore:10,heal:4,accentColor:"#d94862"},coconut:{id:"coconut",name:"Fresh Coconut",category:"consumable",description:"Cool palm water and rich meat. Great for hydration.",maxStack:20,hungerRestore:15,thirstRestore:32,heal:5,accentColor:"#8d5b34"},mushroom:{id:"mushroom",name:"Forest Mushroom",category:"consumable",description:"Earthy woodland cap. Best simmered into hearty stew.",maxStack:30,hungerRestore:12,thirstRestore:4,heal:3,accentColor:"#c78c56"},raw_meat:{id:"raw_meat",name:"Raw Venison",category:"consumable",description:"Uncooked game meat. Roast over a campfire for huge nourishment.",maxStack:20,hungerRestore:14,heal:-4,accentColor:"#b84242"},cooked_meat:{id:"cooked_meat",name:"Seared Steak",category:"consumable",description:"Savory fire-roasted venison that restores health, warmth, and hunger.",maxStack:20,hungerRestore:46,heal:24,warmthRestore:15,accentColor:"#9c4c24"},hearty_stew:{id:"hearty_stew",name:"Wildreach Stew",category:"consumable",description:"Rich meat, mushroom, and berry stew. Restores all vitals.",maxStack:15,hungerRestore:62,thirstRestore:36,heal:40,warmthRestore:28,accentColor:"#e07a32"},bandage:{id:"bandage",name:"Herbal Bandage",category:"consumable",description:"Woven fiber dressing that quickly mends wounds.",maxStack:15,heal:36,accentColor:"#e8e2d0"},vitality_elixir:{id:"vitality_elixir",name:"Runic Elixir",category:"consumable",description:"Luminous tonic distilled from Ancient Shards. Full battle recovery.",maxStack:10,heal:85,thirstRestore:45,warmthRestore:20,accentColor:"#38f2dc"},torch:{id:"torch",name:"Resin Torch",category:"light",description:"Casts warm flickering light, staves off chill, and wards off Night Stalkers.",maxStack:1,maxDurability:120,damage:11,attackCooldown:.55,range:2.8,emitsLight:!0,accentColor:"#ff9b30"},build_hammer:{id:"build_hammer",name:"Builder Hammer",category:"tool",description:"Equip or press [B] to construct and repair modular shelters and stations.",maxStack:1,maxDurability:200,toolKind:"hammer",damage:12,attackCooldown:.55,range:2.8,accentColor:"#c48f52"},stone_axe:{id:"stone_axe",name:"Stone Hatchet",category:"tool",description:"Fells trees briskly and doubles as a rugged survival cleaver.",maxStack:1,maxDurability:90,tier:1,toolKind:"axe",gatherPower:28,damage:18,attackCooldown:.55,range:3.1,accentColor:"#949ca6"},stone_pickaxe:{id:"stone_pickaxe",name:"Stone Pickaxe",category:"tool",description:"Breaks boulders and unlocks Copper & Iron mining.",maxStack:1,maxDurability:90,tier:1,toolKind:"pickaxe",gatherPower:28,damage:16,attackCooldown:.6,range:3.1,accentColor:"#818c99"},iron_axe:{id:"iron_axe",name:"Forged Iron Axe",category:"tool",description:"Heavy honed iron blade that drops giant pines in a few clean strikes.",maxStack:1,maxDurability:200,tier:2,toolKind:"axe",gatherPower:52,damage:30,attackCooldown:.5,range:3.3,accentColor:"#c3d2e3"},iron_pickaxe:{id:"iron_pickaxe",name:"Forged Iron Pickaxe",category:"tool",description:"Shatters Obsidian veins and Ancient Crystals with ease.",maxStack:1,maxDurability:200,tier:2,toolKind:"pickaxe",gatherPower:52,damage:25,attackCooldown:.55,range:3.3,accentColor:"#b0c2d6"},wood_spear:{id:"wood_spear",name:"Flint-Tipped Spear",category:"weapon",description:"Long-reach thrusting spear for keeping boars and wolves at bay.",maxStack:1,maxDurability:100,tier:1,damage:26,attackCooldown:.52,range:3.9,accentColor:"#ba8c56"},hunting_bow:{id:"hunting_bow",name:"Hunting Bow",category:"weapon",description:"Draw and release high-velocity Flint Arrows to hunt at range.",maxStack:1,maxDurability:130,tier:1,damage:38,attackCooldown:.65,range:45,isRanged:!0,ammoItemId:"flint_arrow",accentColor:"#a8703b"},flint_arrow:{id:"flint_arrow",name:"Flint Arrow",category:"ammo",description:"Fletched timber arrow tipped with chipped flint.",maxStack:50,accentColor:"#d0c8b8"},iron_sword:{id:"iron_sword",name:"Iron Broadsword",category:"weapon",description:"Balanced steel-tempered sword with sweeping melee cleave.",maxStack:1,maxDurability:220,tier:2,damage:44,attackCooldown:.45,range:3.6,accentColor:"#d5e0ec"},shadow_blade:{id:"shadow_blade",name:"Shadowsteel Greatsword",category:"weapon",description:"Obsidian-edged runic blade infused with Shadow Essence.",maxStack:1,maxDurability:350,tier:3,damage:68,attackCooldown:.44,range:4,emitsLight:!0,accentColor:"#a855f7"},starlight_bow:{id:"starlight_bow",name:"Starlight Recurve",category:"weapon",description:"Runic bow firing blazing astral bolts without losing momentum.",maxStack:1,maxDurability:300,tier:3,damage:64,attackCooldown:.52,range:60,isRanged:!0,ammoItemId:"flint_arrow",emitsLight:!0,accentColor:"#38f2dc"},leather_armor:{id:"leather_armor",name:"Ranger Hide Tunic",category:"armor",description:"Layered hide vest reducing incoming damage by 25% and adding warmth.",maxStack:1,maxDurability:150,armorRating:25,accentColor:"#8d5936"},iron_armor:{id:"iron_armor",name:"Highland Iron Plate",category:"armor",description:"Heavy forged plates reducing incoming damage by 48%.",maxStack:1,maxDurability:280,armorRating:48,accentColor:"#98a7b8"},runic_armor:{id:"runic_armor",name:"Aegis of the Spire",category:"armor",description:"Obsidian & crystal ward armor reducing damage by 65%.",maxStack:1,maxDurability:420,armorRating:65,accentColor:"#5eead4"},kit_campfire:{id:"kit_campfire",name:"Campfire Kit",category:"structure",description:"Place to cook food, stay warm, and repel Night Stalkers.",maxStack:5,structureKind:"campfire",accentColor:"#ff7b29"},kit_workbench:{id:"kit_workbench",name:"Workbench Kit",category:"structure",description:"Unlocks Tier 1 tools, bows, armor, and base building.",maxStack:3,structureKind:"workbench",accentColor:"#b57b42"},kit_bedroll:{id:"kit_bedroll",name:"Camp Bedroll",category:"structure",description:"Sets your personal respawn point on the island.",maxStack:2,structureKind:"bedroll",accentColor:"#c95c4b"}};function Ue(s){return s?qe[s]??null:null}const zc=[{id:"rcp_rope",outputItemId:"rope",outputCount:1,station:"hand",category:"materials",ingredients:[{itemId:"fiber",count:4}],xpReward:5},{id:"rcp_torch",outputItemId:"torch",outputCount:1,station:"hand",category:"survival",ingredients:[{itemId:"wood",count:2},{itemId:"fiber",count:2}],xpReward:8},{id:"rcp_stone_axe",outputItemId:"stone_axe",outputCount:1,station:"hand",category:"tools",ingredients:[{itemId:"wood",count:4},{itemId:"stone",count:3},{itemId:"fiber",count:2}],xpReward:15},{id:"rcp_stone_pickaxe",outputItemId:"stone_pickaxe",outputCount:1,station:"hand",category:"tools",ingredients:[{itemId:"wood",count:4},{itemId:"stone",count:4},{itemId:"fiber",count:2}],xpReward:15},{id:"rcp_build_hammer",outputItemId:"build_hammer",outputCount:1,station:"hand",category:"tools",ingredients:[{itemId:"wood",count:4},{itemId:"stone",count:2}],xpReward:12},{id:"rcp_wood_spear",outputItemId:"wood_spear",outputCount:1,station:"hand",category:"weapons",ingredients:[{itemId:"wood",count:5},{itemId:"flint",count:2},{itemId:"fiber",count:2}],xpReward:18},{id:"rcp_bandage",outputItemId:"bandage",outputCount:2,station:"hand",category:"survival",ingredients:[{itemId:"fiber",count:4},{itemId:"berries",count:2}],xpReward:10},{id:"rcp_kit_campfire",outputItemId:"kit_campfire",outputCount:1,station:"hand",category:"stations",ingredients:[{itemId:"wood",count:6},{itemId:"stone",count:5}],xpReward:20},{id:"rcp_kit_workbench",outputItemId:"kit_workbench",outputCount:1,station:"hand",category:"stations",ingredients:[{itemId:"wood",count:12},{itemId:"stone",count:4},{itemId:"rope",count:1}],xpReward:28},{id:"rcp_kit_bedroll",outputItemId:"kit_bedroll",outputCount:1,station:"hand",category:"stations",ingredients:[{itemId:"fiber",count:8},{itemId:"hide",count:2}],xpReward:20},{id:"rcp_cooked_meat",outputItemId:"cooked_meat",outputCount:1,station:"campfire",category:"survival",ingredients:[{itemId:"raw_meat",count:1}],xpReward:14},{id:"rcp_hearty_stew",outputItemId:"hearty_stew",outputCount:1,station:"campfire",category:"survival",ingredients:[{itemId:"raw_meat",count:1},{itemId:"mushroom",count:2},{itemId:"berries",count:2}],xpReward:25},{id:"rcp_charcoal",outputItemId:"coal",outputCount:2,station:"campfire",category:"materials",ingredients:[{itemId:"wood",count:3}],xpReward:8},{id:"rcp_hunting_bow",outputItemId:"hunting_bow",outputCount:1,station:"workbench",category:"weapons",ingredients:[{itemId:"wood",count:8},{itemId:"rope",count:2}],xpReward:30},{id:"rcp_flint_arrow",outputItemId:"flint_arrow",outputCount:8,station:"workbench",category:"weapons",ingredients:[{itemId:"wood",count:3},{itemId:"flint",count:2},{itemId:"fiber",count:2}],xpReward:12},{id:"rcp_leather_armor",outputItemId:"leather_armor",outputCount:1,station:"workbench",category:"armor",ingredients:[{itemId:"hide",count:6},{itemId:"rope",count:2}],xpReward:35},{id:"rcp_copper_ingot",outputItemId:"copper_ingot",outputCount:1,station:"furnace",category:"materials",ingredients:[{itemId:"copper_ore",count:2},{itemId:"coal",count:1}],xpReward:16},{id:"rcp_iron_ingot",outputItemId:"iron_ingot",outputCount:1,station:"furnace",category:"materials",ingredients:[{itemId:"iron_ore",count:2},{itemId:"coal",count:1}],xpReward:22},{id:"rcp_iron_axe",outputItemId:"iron_axe",outputCount:1,station:"furnace",category:"tools",ingredients:[{itemId:"iron_ingot",count:3},{itemId:"wood",count:4},{itemId:"rope",count:1}],xpReward:42},{id:"rcp_iron_pickaxe",outputItemId:"iron_pickaxe",outputCount:1,station:"furnace",category:"tools",ingredients:[{itemId:"iron_ingot",count:3},{itemId:"wood",count:4},{itemId:"rope",count:1}],xpReward:42},{id:"rcp_iron_sword",outputItemId:"iron_sword",outputCount:1,station:"furnace",category:"weapons",ingredients:[{itemId:"iron_ingot",count:4},{itemId:"copper_ingot",count:1},{itemId:"hide",count:2}],xpReward:50},{id:"rcp_iron_armor",outputItemId:"iron_armor",outputCount:1,station:"furnace",category:"armor",ingredients:[{itemId:"iron_ingot",count:6},{itemId:"hide",count:4}],xpReward:60},{id:"rcp_vitality_elixir",outputItemId:"vitality_elixir",outputCount:2,station:"runic_forge",category:"survival",ingredients:[{itemId:"ancient_shard",count:1},{itemId:"berries",count:4},{itemId:"mushroom",count:2}],xpReward:38},{id:"rcp_shadow_blade",outputItemId:"shadow_blade",outputCount:1,station:"runic_forge",category:"weapons",ingredients:[{itemId:"obsidian",count:4},{itemId:"shadow_essence",count:3},{itemId:"iron_ingot",count:3}],xpReward:95},{id:"rcp_starlight_bow",outputItemId:"starlight_bow",outputCount:1,station:"runic_forge",category:"weapons",ingredients:[{itemId:"ancient_shard",count:4},{itemId:"wood",count:8},{itemId:"fang",count:3}],xpReward:90},{id:"rcp_runic_armor",outputItemId:"runic_armor",outputCount:1,station:"runic_forge",category:"armor",ingredients:[{itemId:"obsidian",count:5},{itemId:"ancient_shard",count:4},{itemId:"iron_ingot",count:4}],xpReward:110}];function Ag(s){return zc.find(t=>t.id===s)??null}const le=3.2,Te=2.8,ci={campfire:{kind:"campfire",name:"Campfire",description:"Cooks food, radiates cozy warmth, and scares off Shadow Stalkers.",category:"stations",maxHp:120,costs:[{itemId:"wood",count:6},{itemId:"stone",count:5}],snapGroup:"free",width:1.4,height:.6,depth:1.4,solidCollision:!1,warmthRadius:9.5,stationRadius:5.5},workbench:{kind:"workbench",name:"Workbench",description:"Crafting station unlocking bows, armor, and modular building.",category:"stations",maxHp:220,costs:[{itemId:"wood",count:12},{itemId:"stone",count:4}],snapGroup:"free",width:1.9,height:1.1,depth:1.1,solidCollision:!0,stationRadius:16},furnace:{kind:"furnace",name:"Stone Furnace",description:"Smelts Copper & Iron ores and forges Tier 2 iron equipment.",category:"stations",maxHp:380,costs:[{itemId:"stone",count:16},{itemId:"coal",count:4},{itemId:"wood",count:6}],requiresWorkbench:!0,snapGroup:"free",width:1.8,height:2.3,depth:1.8,solidCollision:!0,warmthRadius:8,stationRadius:9},runic_forge:{kind:"runic_forge",name:"Runic Forge",description:"Channels Ancient Shards to craft endgame Shadowsteel & Starlight gear.",category:"stations",maxHp:520,costs:[{itemId:"iron_ingot",count:4},{itemId:"obsidian",count:3},{itemId:"ancient_shard",count:2}],requiresWorkbench:!0,snapGroup:"free",width:2,height:2,depth:2,solidCollision:!0,warmthRadius:7,stationRadius:9},wood_foundation:{kind:"wood_foundation",name:"Timber Foundation",description:"Elevated log platform. Snaps seamlessly to neighboring foundations.",category:"structure",maxHp:320,costs:[{itemId:"wood",count:6}],snapGroup:"foundation",width:le,height:.55,depth:le,solidCollision:!1},wood_wall:{kind:"wood_wall",name:"Timber Wall",description:"Solid plank fortification. Snaps cleanly to foundation edges.",category:"structure",maxHp:280,costs:[{itemId:"wood",count:5}],snapGroup:"wall",width:le,height:Te,depth:.35,solidCollision:!0,providesShelter:!0},wood_doorway:{kind:"wood_doorway",name:"Timber Doorway",description:"Framed cabin door you can swing open and shut with [E].",category:"structure",maxHp:250,costs:[{itemId:"wood",count:6},{itemId:"fiber",count:2}],snapGroup:"wall",width:le,height:Te,depth:.35,solidCollision:!0,providesShelter:!0},wood_roof:{kind:"wood_roof",name:"Timber Roof",description:"Shingled shelter roof protecting against chilling rainstorms.",category:"structure",maxHp:240,costs:[{itemId:"wood",count:5}],snapGroup:"roof",width:le+.3,height:.45,depth:le+.3,solidCollision:!1,providesShelter:!0},wood_stairs:{kind:"wood_stairs",name:"Timber Steps",description:"Walkable wooden steps up onto elevated foundations.",category:"structure",maxHp:200,costs:[{itemId:"wood",count:5}],snapGroup:"foundation",width:le*.85,height:1.2,depth:le*.85,solidCollision:!1},stone_wall:{kind:"stone_wall",name:"Stone Battlement",description:"Heavy masonry wall capable of halting packs of wolves and stalkers.",category:"defense",maxHp:680,costs:[{itemId:"stone",count:10},{itemId:"wood",count:2}],requiresWorkbench:!0,snapGroup:"wall",width:le,height:Te,depth:.55,solidCollision:!0,providesShelter:!0},spike_barricade:{kind:"spike_barricade",name:"Spike Palisade",description:"Sharpened wooden stakes that injure hostile creatures on contact.",category:"defense",maxHp:260,costs:[{itemId:"wood",count:7},{itemId:"flint",count:2}],snapGroup:"free",width:2.6,height:1.6,depth:.9,solidCollision:!0},storage_chest:{kind:"storage_chest",name:"Shared Chest",description:"12-slot sturdy chest to store and share gear with teammates.",category:"utility",maxHp:240,costs:[{itemId:"wood",count:8},{itemId:"fiber",count:4}],snapGroup:"free",width:1.25,height:.85,depth:.8,solidCollision:!0},bedroll:{kind:"bedroll",name:"Camp Bedroll",description:"Sets your respawn point so you wake safely back at base.",category:"utility",maxHp:120,costs:[{itemId:"fiber",count:8},{itemId:"hide",count:2}],snapGroup:"free",width:1.2,height:.3,depth:2.1,solidCollision:!1},rain_collector:{kind:"rain_collector",name:"Dew & Rain Collector",description:"Gathers clean freshwater over time; press [E] to drink.",category:"utility",maxHp:180,costs:[{itemId:"wood",count:6},{itemId:"hide",count:3},{itemId:"rope",count:1}],snapGroup:"free",width:1.5,height:1.6,depth:1.5,solidCollision:!0},lantern_post:{kind:"lantern_post",name:"Resin Lantern Post",description:"Tall glowing beacon illuminating paths and camp perimeters.",category:"utility",maxHp:160,costs:[{itemId:"wood",count:4},{itemId:"resin",count:3},{itemId:"stone",count:2}],snapGroup:"free",width:.6,height:3.2,depth:.6,solidCollision:!0,warmthRadius:5.5},watchtower_beacon:{kind:"watchtower_beacon",name:"Starlight Beacon",description:"Towering runic brazier visible across the island. Repels night threats.",category:"defense",maxHp:900,costs:[{itemId:"stone",count:16},{itemId:"iron_ingot",count:4},{itemId:"ancient_shard",count:3}],requiresWorkbench:!0,snapGroup:"free",width:2.2,height:5.4,depth:2.2,solidCollision:!0,warmthRadius:18}},Cg=["campfire","workbench","wood_foundation","wood_wall","wood_doorway","wood_roof","wood_stairs","storage_chest","bedroll","rain_collector","lantern_post","spike_barricade","stone_wall","furnace","runic_forge","watchtower_beacon"];function Hc(s,t,e,n,i){const r=ci[s];let o=t.x,a=i(t.x,t.z),l=t.z,c=e,h=!1;if(r.snapGroup==="free"){for(const u of n)if(u.kind==="wood_foundation"){const p=Math.abs(t.x-u.x),g=Math.abs(t.z-u.z);p<le*.5&&g<le*.5&&(a=Math.max(a,u.y+.52))}return{x:o,y:a,z:l,rotY:c,snapped:!1}}let d=2.4;if(r.snapGroup==="foundation"){for(const u of n){if(u.kind!=="wood_foundation")continue;const p=Math.cos(u.rotY),g=Math.sin(u.rotY),_=[[le,0],[-le,0],[0,le],[0,-le]];for(const[m,f]of _){const S=u.x+m*p-f*g,b=u.z+m*g+f*p,x=Math.hypot(t.x-S,t.z-b);x<d&&(d=x,o=S,a=u.y,l=b,c=u.rotY,h=!0)}}h||(a=i(t.x,t.z)+.25)}else if(r.snapGroup==="wall")for(const u of n){if(u.kind!=="wood_foundation")continue;const p=Math.cos(u.rotY),g=Math.sin(u.rotY),_=le*.5,m=[[0,-_,u.rotY],[0,_,u.rotY+Math.PI],[_,0,u.rotY+Math.PI/2],[-_,0,u.rotY-Math.PI/2]];for(const[f,S,b]of m){const x=u.x+f*p-S*g,C=u.z+f*g+S*p,E=Math.hypot(t.x-x,t.z-C);E<d&&(d=E,o=x,a=u.y+.5,l=C,c=b,h=!0)}}else if(r.snapGroup==="roof"){for(const u of n){if(u.kind!=="wood_foundation")continue;const p=Math.hypot(t.x-u.x,t.z-u.z);p<d+.6&&(d=p,o=u.x,a=u.y+.5+Te,l=u.z,c=u.rotY,h=!0)}h||(a=i(t.x,t.z)+Te)}return{x:Math.round(o*100)/100,y:Math.round(a*100)/100,z:Math.round(l*100)/100,rotY:Math.round(c*1e3)/1e3,snapped:h}}const Rg=420,Ig=27,Gc=9,Yl=12;function un(s){const t=document.createElement("canvas");t.width=s,t.height=s;const e=t.getContext("2d");return[t,e]}function fn(s,t=1,e=1,n=!0){const i=new Rc(s);return i.wrapS=ps,i.wrapT=ps,i.repeat.set(t,e),n&&(i.colorSpace=Xe),i.anisotropy=4,i.needsUpdate=!0,i}function ee(s,t,e){let n=Math.imul(s,374761393)+Math.imul(t,668265263)+Math.imul(e,1442695041);return n=(n^n>>>13)*1274126177,((n^n>>>16)>>>0)/4294967295}function Pg(){const[s,t]=un(256),[e,n]=un(256),i=t.createImageData(256,256),r=n.createImageData(256,256);for(let P=0;P<256;P++)for(let H=0;H<256;H++){const q=ee(H>>2,P>>2,11),F=ee(H>>1,P>>1,23),X=ee(H,P,37),O=q*.45+F*.35+X*.2,tt=Math.floor(208+(O-.5)*68),nt=Math.floor(O*255),rt=(P*256+H)*4;i.data[rt]=tt,i.data[rt+1]=tt,i.data[rt+2]=Math.min(255,tt-3),i.data[rt+3]=255,r.data[rt]=nt,r.data[rt+1]=nt,r.data[rt+2]=nt,r.data[rt+3]=255}t.putImageData(i,0,0),n.putImageData(r,0,0);const[o,a]=un(256);a.fillStyle="#533b2a",a.fillRect(0,0,256,256);for(let P=0;P<420;P++){const H=ee(P,1,5)*256,q=ee(P,2,5)*256,F=2+ee(P,3,5)*6,X=24+ee(P,4,5)*70,O=ee(P,5,5)>.45;a.fillStyle=O?"rgba(34, 22, 14, 0.42)":"rgba(116, 86, 61, 0.32)",a.fillRect(H,q,F,X),a.fillRect(H,q-256,F,X)}for(let P=0;P<24;P++){const H=ee(P,7,9)*256,q=ee(P,8,9)*256;a.fillStyle="rgba(72, 102, 54, 0.24)",a.beginPath(),a.arc(H,q,6+ee(P,9,9)*14,0,Math.PI*2),a.fill()}const[l,c]=un(256);c.fillStyle="#e7dfd3",c.fillRect(0,0,256,256);for(let P=0;P<160;P++){const H=ee(P,1,19)*256,q=ee(P,2,19)*256,F=10+ee(P,3,19)*32,X=1.5+ee(P,4,19)*3.5;c.fillStyle=ee(P,5,19)>.3?"rgba(54, 46, 42, 0.72)":"rgba(165, 150, 134, 0.45)",c.fillRect(H,q,F,X)}const[h,d]=un(256),[u,p]=un(256);d.fillStyle="#8b5d38",d.fillRect(0,0,256,256),p.fillStyle="#888888",p.fillRect(0,0,256,256);const g=6,_=256/g;for(let P=0;P<g;P++){const H=P*_,q=(ee(P,1,31)-.5)*22;d.fillStyle=`rgb(${Math.round(138+q)}, ${Math.round(92+q*.7)}, ${Math.round(54+q*.5)})`,d.fillRect(0,H+2,256,_-3);for(let X=0;X<38;X++){const O=H+3+ee(P,X,41)*(_-6);d.fillStyle=ee(P,X,42)>.5?"rgba(65,38,18,0.22)":"rgba(195,146,96,0.16)",d.fillRect(0,O,256,1.5)}d.fillStyle="rgba(28, 16, 8, 0.78)",d.fillRect(0,H,256,2.5),p.fillStyle="#181818",p.fillRect(0,H,256,3);const F=(ee(P,9,43)*180+36)%256;d.fillRect(F,H,2,_),d.fillStyle="#2d2d30",d.beginPath(),d.arc(F+7,H+_*.5,2.2,0,Math.PI*2),d.arc(F-7,H+_*.5,2.2,0,Math.PI*2),d.fill()}const[m,f]=un(256),[S,b]=un(256);f.fillStyle="#4f555c",f.fillRect(0,0,256,256),b.fillStyle="#222222",b.fillRect(0,0,256,256);const x=6,C=256/x;for(let P=0;P<x;P++){let q=-(P%2*32),F=0;for(;q<256;){const X=46+Math.floor(ee(P,F,55)*34),O=112+Math.floor((ee(P,F,56)-.5)*36);f.fillStyle=`rgb(${O}, ${O+2}, ${O+5})`,f.fillRect(q+2,P*C+2,X-4,C-4),b.fillStyle=`rgb(${150+Math.floor(ee(P,F,57)*70)},150,150)`,b.fillRect(q+3,P*C+3,X-6,C-6),ee(P,F,58)>.72&&(f.fillStyle="rgba(84, 114, 62, 0.35)",f.fillRect(q+4,P*C+2,X*.5,6)),q+=X,F++}}const[E,A]=un(256);A.fillStyle="#624229",A.fillRect(0,0,256,256);for(let P=0;P<8;P++){const H=P*32,q=P%2*16;for(let F=-1;F<9;F++){const X=F*32+q,O=Math.floor((ee(P,F,77)-.5)*24);A.fillStyle=`rgb(${108+O}, ${72+Math.floor(O*.7)}, ${44+Math.floor(O*.5)})`,A.fillRect(X+1,H+1,30,30),A.fillStyle="rgba(24, 14, 7, 0.55)",A.fillRect(X,H+29,32,3)}}const[I,y]=un(64),v=y.createRadialGradient(32,32,2,32,32,30);v.addColorStop(0,"rgba(255, 255, 255, 1)"),v.addColorStop(.35,"rgba(255, 255, 255, 0.7)"),v.addColorStop(.75,"rgba(255, 255, 255, 0.18)"),v.addColorStop(1,"rgba(255, 255, 255, 0)"),y.fillStyle=v,y.fillRect(0,0,64,64);const[R,U]=un(128);U.fillStyle="#3c6e37",U.fillRect(0,0,128,128);for(let P=0;P<240;P++){const H=ee(P,1,91)*128,q=ee(P,2,91)*128,F=4+ee(P,3,91)*8,X=ee(P,4,91);U.fillStyle=X>.68?"rgba(122, 178, 76, 0.55)":X>.32?"rgba(62, 118, 52, 0.55)":"rgba(30, 66, 32, 0.55)",U.beginPath(),U.ellipse(H,q,F,F*.6,ee(P,5,91)*Math.PI,0,Math.PI*2),U.fill()}return{terrainDetail:fn(s,46,46,!0),terrainBump:fn(e,46,46,!1),barkDark:fn(o,1,2,!0),barkBirch:fn(l,1,2,!0),woodPlank:fn(h,1,1,!0),woodPlankBump:fn(u,1,1,!1),stoneMasonry:fn(m,1,1,!0),stoneMasonryBump:fn(S,1,1,!1),roofShingle:fn(E,2,2,!0),softParticle:fn(I,1,1,!0),leafCluster:fn(R,2,2,!0)}}const Lg=`
  varying vec3 vWorldDir;
  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldDir = normalize(position);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`,Dg=`
  uniform vec3 uTopColor;
  uniform vec3 uHorizonColor;
  uniform vec3 uGroundColor;
  uniform vec3 uSunDir;
  uniform vec3 uSunColor;
  uniform float uNightFactor;
  uniform float uTime;
  uniform float uStormFactor;

  varying vec3 vWorldDir;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  void main() {
    vec3 dir = normalize(vWorldDir);
    float h = clamp(dir.y, -0.25, 1.0);

    // Smooth atmospheric zenith-to-horizon gradient
    float horizonBlend = pow(1.0 - max(h, 0.0), 2.6);
    vec3 col = mix(uTopColor, uHorizonColor, horizonBlend);
    if (h < 0.0) {
      col = mix(uHorizonColor, uGroundColor, clamp(-h * 5.0, 0.0, 1.0));
    }

    // Mie scattering sun halo & crisp solar disc
    float sunDot = max(dot(dir, normalize(uSunDir)), 0.0);
    float halo = pow(sunDot, 12.0) * 0.42 * (1.0 - uStormFactor * 0.7);
    float disc = smoothstep(0.9985, 0.9994, sunDot) * 1.8 * (1.0 - uStormFactor * 0.85);
    col += uSunColor * (halo + disc) * (1.0 - uNightFactor * 0.92);

    // Subtle emerald-teal aurora ribbons at night in the northern sky
    if (uNightFactor > 0.15 && dir.y > 0.08) {
      float north = smoothstep(-0.1, 0.75, -dir.z);
      float wave = sin(dir.x * 7.5 + uTime * 0.25) * 0.5 + 0.5;
      float band = exp(-pow((dir.y - 0.32 - wave * 0.12) * 7.0, 2.0));
      vec3 aurora = mix(vec3(0.08, 0.72, 0.58), vec3(0.28, 0.35, 0.85), wave);
      col += aurora * band * north * uNightFactor * 0.28 * (1.0 - uStormFactor);
    }

    // Storm overcast darkening
    vec3 stormTone = vec3(0.16, 0.20, 0.25) * (1.0 - uNightFactor * 0.65);
    col = mix(col, stormTone, uStormFactor * 0.52);

    gl_FragColor = vec4(col, 1.0);
  }
`;class Ug{skyMesh;sunLight;hemiLight;fog;sunDirection=new L(.4,.8,.3);horizonColor=new st("#c8dff0");skyMat;starPoints;starMat;moonMesh;cloudGroup;cloudMaterials=[];lightningFlash=0;constructor(t){this.skyMat=new Mn({vertexShader:Lg,fragmentShader:Dg,side:Oe,depthWrite:!1,uniforms:{uTopColor:{value:new st("#2768b5")},uHorizonColor:{value:new st("#bfdcf2")},uGroundColor:{value:new st("#1d3549")},uSunDir:{value:new L(.5,.7,.3)},uSunColor:{value:new st("#fff2cc")},uNightFactor:{value:0},uTime:{value:0},uStormFactor:{value:0}}}),this.skyMesh=new z(new $n(420,32,20),this.skyMat),this.skyMesh.frustumCulled=!1,t.add(this.skyMesh);const e=1100,n=new Float32Array(e*3),i=new Float32Array(e*3);for(let l=0;l<e;l++){const c=Math.random()*Math.PI*2,h=Math.acos(.08+Math.random()*.92),d=385;n[l*3]=d*Math.sin(h)*Math.cos(c),n[l*3+1]=d*Math.cos(h),n[l*3+2]=d*Math.sin(h)*Math.sin(c);const u=Math.random();i[l*3]=u>.7?1:.85,i[l*3+1]=u>.4?.94:.88,i[l*3+2]=1}const r=new be;r.setAttribute("position",new Ce(n,3)),r.setAttribute("color",new Ce(i,3)),this.starMat=new ya({size:2.2,vertexColors:!0,transparent:!0,opacity:0,depthWrite:!1,fog:!1}),this.starPoints=new Cc(r,this.starMat),t.add(this.starPoints),this.moonMesh=new z(new $n(11,16,16),new Ae({color:"#eef4ff",fog:!1})),t.add(this.moonMesh),this.cloudGroup=new Bt;const o=new Qe(1,1);for(let l=0;l<28;l++){const c=new Bt,h=new Pc({color:"#ffffff",transparent:!0,opacity:.84,fog:!0});this.cloudMaterials.push(h);const d=4+Math.floor(Math.random()*4);for(let g=0;g<d;g++){const _=new z(o,h);_.position.set((Math.random()-.5)*16,(Math.random()-.5)*2.4,(Math.random()-.5)*11);const m=5.5+Math.random()*7.5;_.scale.set(m,2.2+Math.random()*2,m*.78),c.add(_)}const u=l/28*Math.PI*2+Math.random()*.4,p=45+Math.random()*210;c.position.set(Math.cos(u)*p,74+Math.random()*26,Math.sin(u)*p),c.userData.speed=1.4+Math.random()*1.4,this.cloudGroup.add(c)}t.add(this.cloudGroup),this.sunLight=new Fd("#fff3dc",2.2),this.sunLight.castShadow=!0,this.sunLight.shadow.mapSize.set(2048,2048),this.sunLight.shadow.camera.near=10,this.sunLight.shadow.camera.far=260;const a=64;this.sunLight.shadow.camera.left=-a,this.sunLight.shadow.camera.right=a,this.sunLight.shadow.camera.top=a,this.sunLight.shadow.camera.bottom=-a,this.sunLight.shadow.bias=-5e-4,this.sunLight.shadow.normalBias=.04,t.add(this.sunLight),t.add(this.sunLight.target),this.hemiLight=new Ud("#a9d4ff","#4b5b3b",.85),t.add(this.hemiLight),this.fog=new _a("#bddaf0",.0038),t.fog=this.fog}setShadowQuality(t){const e=t==="high"?2048:t==="medium"?1024:512;this.sunLight.shadow.mapSize.set(e,e),this.sunLight.shadow.map&&(this.sunLight.shadow.map.dispose(),this.sunLight.shadow.map=null)}triggerLightning(){this.lightningFlash=1}update(t,e,n,i){this.lightningFlash>0&&(this.lightningFlash=Math.max(0,this.lightningFlash-t*3.8));const r=(n.timeOfDay-.25)*Math.PI*2,o=Math.sin(r),a=Math.cos(r);this.sunDirection.set(a,o,-.32).normalize();const c=qt((o+.14)/.42,0,1),h=1-c,d=qt(1-Math.abs(o)*4.2,0,1),u=n.weather==="storm"?n.weatherIntensity:n.weather==="rain"?n.weatherIntensity*.6:0,p=n.weather==="fog"?n.weatherIntensity:0,g=new st("#2566b8"),_=new st("#2d3363"),m=new st("#060c1b"),f=new st("#c2e0f5"),S=new st("#f48c57"),b=new st("#0f1d36"),x=m.clone().lerp(g,c).lerp(_,d*.75),C=b.clone().lerp(f,c).lerp(S,d*.88);u>.05&&C.lerp(new st("#3b4859").multiplyScalar(.35+c*.65),u*.65),this.lightningFlash>.05&&(C.lerp(new st("#e2f0ff"),this.lightningFlash*.7),x.lerp(new st("#c7e2ff"),this.lightningFlash*.5)),this.horizonColor.copy(C),this.skyMat.uniforms.uTopColor.value.copy(x),this.skyMat.uniforms.uHorizonColor.value.copy(C),this.skyMat.uniforms.uSunDir.value.copy(this.sunDirection),this.skyMat.uniforms.uSunColor.value.set("#fff3d1").lerp(new st("#ff8e47"),d*.85),this.skyMat.uniforms.uNightFactor.value=h,this.skyMat.uniforms.uTime.value=e,this.skyMat.uniforms.uStormFactor.value=u,this.starMat.opacity=qt((h-.2)*1.25*(1-u*.85),0,.92),this.starPoints.rotation.y=e*.002,this.starPoints.position.copy(i),this.skyMesh.position.copy(i);const E=this.sunDirection.clone().negate();this.moonMesh.position.copy(i).addScaledVector(E,330),this.moonMesh.visible=E.y>-.1;const A=o>=-.05?this.sunDirection:E,I=1.5,y=Math.round(i.x/I)*I,v=Math.round(i.z/I)*I;if(this.sunLight.target.position.set(y,i.y,v),this.sunLight.position.set(y+A.x*110,i.y+Math.max(18,A.y*110),v+A.z*110),o>=-.05){const U=(.35+qt(o,0,1)*2.1)*(1-u*.55)+this.lightningFlash*2.4;this.sunLight.intensity=U,this.sunLight.color.set("#fff4dc").lerp(new st("#ff9a59"),d*.78)}else this.sunLight.intensity=.42*(1-u*.4)+this.lightningFlash*2.6,this.sunLight.color.set("#7ea8e8");this.hemiLight.color.copy(new st("#284166").lerp(new st("#a8d8ff"),c)),this.hemiLight.groundColor.copy(new st("#141c24").lerp(new st("#4c5c3a"),c)),this.hemiLight.intensity=(.32+c*.62)*(1-u*.25)+this.lightningFlash*.6,this.fog.color.copy(C),this.fog.density=.0034+u*.0042+p*.0075+h*.0016;const R=new st("#253145").lerp(new st("#ffffff"),c).lerp(new st("#ffb587"),d*.72).lerp(new st("#4a5666"),u*.7);for(const U of this.cloudMaterials)U.color.copy(R),U.opacity=.45+c*.35+u*.18;for(const U of this.cloudGroup.children)U.position.x+=n.windDirX*n.windSpeed*U.userData.speed*t,U.position.z+=n.windDirZ*n.windSpeed*U.userData.speed*t,U.position.x>250&&(U.position.x=-250),U.position.x<-250&&(U.position.x=250),U.position.z>250&&(U.position.z=-250),U.position.z<-250&&(U.position.z=250)}}function Ng(s,t){const n=new He(vn,vn,220,220);n.rotateX(-Math.PI/2);const i=n.attributes.position,r=new Float32Array(i.count*3),o=new st("#7f7254"),a=new st("#a48a62"),l=new st("#dec590"),c=new st("#5a8f41"),h=new st("#3f7634"),d=new st("#3d5d38"),u=new st("#475c3a"),p=new st("#696b6e"),g=new st("#3d3840"),_=new st("#e6eef5"),m=new st;for(let E=0;E<i.count;E++){const A=i.getX(E),I=i.getZ(E),y=s.sample(A,I);i.setY(E,y.height);const v=y.height,R=y.slope;if(v<nn-.15){const H=Le(-5.5,-.15,v);m.copy(o).lerp(a,H)}else if(v<1.65){const H=Le(0,1.25,v);m.copy(a).lerp(l,H),y.biome==="marsh"&&m.lerp(u,Le(.25,1.3,v)*.8)}else if(y.biome==="marsh"?m.copy(u):y.biome==="pine"?m.copy(d).lerp(h,y.moisture*.35):y.biome==="volcanic"?m.copy(g):y.biome==="highland"?m.copy(d).lerp(p,.55):m.copy(c).lerp(h,y.moisture*.6),v<2.55){const H=1-Le(1.5,2.55,v);m.lerp(l,H*.85)}const U=Le(.42,.92,R);if(U>.01&&m.lerp(y.biome==="volcanic"?g:p,U*.9),v>17.5){const H=Le(17.5,22.8,v)*(1-Le(.65,1.15,R)*.7);m.lerp(_,qt(H,0,.95))}const P=(Math.sin(A*.17)*Math.cos(I*.19)+Math.sin((A+I)*.08))*.035;r[E*3]=qt(m.r+P,0,1),r[E*3+1]=qt(m.g+P,0,1),r[E*3+2]=qt(m.b+P*.6,0,1)}n.setAttribute("color",new Ce(r,3)),n.computeVertexNormals();const f=new yt({vertexColors:!0,map:t.terrainDetail,bumpMap:t.terrainBump,bumpScale:.24,roughness:.9,metalness:.03}),S=new z(n,f);S.receiveShadow=!0,S.castShadow=!0,S.name="terrain";const b=256,x=new Uint8Array(b*b*4);for(let E=0;E<b;E++){const A=E/(b-1)*vn-ki;for(let I=0;I<b;I++){const y=I/(b-1)*vn-ki,v=s.getHeight(y,A),R=Math.round(qt((v+10)/38,0,1)*255),U=(E*b+I)*4;x[U]=R,x[U+1]=R,x[U+2]=R,x[U+3]=255}}const C=new Tc(x,b,b,rn);return C.minFilter=sn,C.magFilter=sn,C.wrapS=Pn,C.wrapT=Pn,C.needsUpdate=!0,{mesh:S,heightTexture:C}}const kg=`
  uniform float uTime;
  uniform float uWindSpeed;
  uniform sampler2D uHeightMap;
  uniform float uWorldSize;

  varying vec3 vWorldPos;
  varying float vDepth;
  varying float vWaveCrest;

  float sampleTerrainHeight(vec2 xz) {
    vec2 uv = (xz + uWorldSize * 0.5) / uWorldSize;
    if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
      return -8.0;
    }
    float enc = texture2D(uHeightMap, uv).r;
    return enc * 38.0 - 10.0;
  }

  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    float terrainH = sampleTerrainHeight(wp.xz);
    float depth = max(0.0, -terrainH);
    float damp = smoothstep(0.0, 2.2, depth);

    float t = uTime * (0.8 + uWindSpeed * 0.35);
    float w1 = sin(wp.x * 0.16 + wp.z * 0.09 + t * 1.45) * 0.14;
    float w2 = cos(wp.x * 0.08 - wp.z * 0.19 + t * 1.15) * 0.11;
    float w3 = sin((wp.x - wp.z) * 0.32 + t * 2.1) * 0.045;
    float disp = (w1 + w2 + w3) * damp;

    wp.y += disp;
    vWorldPos = wp.xyz;
    vDepth = depth;
    vWaveCrest = disp;

    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`,Fg=`
  uniform float uTime;
  uniform vec3 uSunDir;
  uniform vec3 uSunColor;
  uniform vec3 uSkyHorizon;
  uniform vec3 uFogColor;
  uniform float uFogDensity;
  uniform float uNightFactor;
  uniform sampler2D uHeightMap;
  uniform float uWorldSize;

  varying vec3 vWorldPos;
  varying float vDepth;
  varying float vWaveCrest;

  float sampleTerrainHeight(vec2 xz) {
    vec2 uv = (xz + uWorldSize * 0.5) / uWorldSize;
    if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
      return -8.0;
    }
    float enc = texture2D(uHeightMap, uv).r;
    return enc * 38.0 - 10.0;
  }

  float waveNoise(vec2 p) {
    return sin(p.x * 1.7 + sin(p.y * 1.3)) * 0.5 + cos(p.y * 2.1 - cos(p.x * 1.5)) * 0.5;
  }

  void main() {
    float terrainH = sampleTerrainHeight(vWorldPos.xz);
    float depth = max(0.0, -terrainH);

    // Dual-layer animated ripple normal
    vec2 p1 = vWorldPos.xz * 0.42 + vec2(uTime * 0.36, uTime * 0.24);
    vec2 p2 = vWorldPos.xz * 0.85 - vec2(uTime * 0.28, -uTime * 0.33);
    float nx = waveNoise(p1) * 0.12 + waveNoise(p2) * 0.08;
    float nz = waveNoise(p1 + vec2(4.2, 1.9)) * 0.12 + waveNoise(p2 + vec2(2.7, 5.1)) * 0.08;
    vec3 N = normalize(vec3(nx, 1.0, nz));

    vec3 V = normalize(cameraPosition - vWorldPos);
    vec3 L = normalize(uSunDir);

    // Beer-Lambert depth absorption: crystal turquoise shallows -> deep sapphire sea
    vec3 shallowCol = mix(vec3(0.11, 0.62, 0.64), vec3(0.05, 0.22, 0.30), uNightFactor);
    vec3 midCol = mix(vec3(0.05, 0.36, 0.52), vec3(0.02, 0.11, 0.20), uNightFactor);
    vec3 deepCol = mix(vec3(0.03, 0.17, 0.34), vec3(0.01, 0.05, 0.12), uNightFactor);

    float d1 = 1.0 - exp(-depth * 0.65);
    float d2 = 1.0 - exp(-depth * 0.22);
    vec3 waterCol = mix(shallowCol, midCol, d1);
    waterCol = mix(waterCol, deepCol, d2);

    // Subtle sunlit seabed caustics in shallow water
    if (depth < 2.8) {
      float caustic = pow(max(0.0, sin(p1.x * 3.2) * cos(p2.y * 3.0) + 0.35), 3.0);
      float shallowMask = (1.0 - smoothstep(0.1, 2.8, depth)) * (1.0 - uNightFactor * 0.85);
      waterCol += vec3(0.24, 0.48, 0.45) * caustic * shallowMask * 0.45;
    }

    // Schlick Fresnel sky reflection
    float ndv = max(dot(N, V), 0.0);
    float fresnel = 0.03 + 0.97 * pow(1.0 - ndv, 4.2);
    vec3 col = mix(waterCol, uSkyHorizon * (0.95 - uNightFactor * 0.25), fresnel * 0.72);

    // Sparkling GGX-style sun/moon specular glints
    vec3 H = normalize(L + V);
    float spec = pow(max(dot(N, H), 0.0), 190.0) * 1.9 + pow(max(dot(N, H), 0.0), 34.0) * 0.24;
    col += uSunColor * spec * (1.0 - uNightFactor * 0.68);

    // Dynamic lapping shoreline foam + offshore crest foam
    float shoreBand = 1.0 - smoothstep(0.0, 0.95, depth);
    float rippleLine = sin(depth * 14.0 - uTime * 3.1 + waveNoise(vWorldPos.xz * 0.5) * 2.2);
    float foamMask = smoothstep(0.32, 0.72, shoreBand + rippleLine * 0.22 * shoreBand);
    float edgeFoam = 1.0 - smoothstep(0.0, 0.22, depth);
    float crestFoam = smoothstep(0.16, 0.25, vWaveCrest) * 0.35;
    float foam = clamp(max(foamMask * 0.82, edgeFoam) + crestFoam, 0.0, 1.0);
    vec3 foamColor = mix(vec3(0.92, 0.97, 0.99), vec3(0.38, 0.46, 0.58), uNightFactor * 0.85);
    col = mix(col, foamColor, foam);

    // Transparency: clear right at water's edge, rich opaque deeper out
    float alpha = clamp(0.48 + (1.0 - exp(-depth * 0.85)) * 0.48 + foam * 0.35, 0.45, 0.96);

    // Exponential atmospheric fog blend
    float dist = length(cameraPosition - vWorldPos);
    float fogFactor = 1.0 - exp(-pow(dist * uFogDensity, 2.0));
    col = mix(col, uFogColor, clamp(fogFactor, 0.0, 1.0));

    gl_FragColor = vec4(col, alpha);
  }
`;class Bg{mesh;mat;constructor(t){const e=new He(580,580,150,150);e.rotateX(-Math.PI/2),this.mat=new Mn({vertexShader:kg,fragmentShader:Fg,transparent:!0,depthWrite:!1,uniforms:{uTime:{value:0},uWindSpeed:{value:1},uSunDir:{value:new L(.4,.8,.3)},uSunColor:{value:new st("#fff2d2")},uSkyHorizon:{value:new st("#c2e0f5")},uFogColor:{value:new st("#c2e0f5")},uFogDensity:{value:.0038},uNightFactor:{value:0},uHeightMap:{value:t},uWorldSize:{value:vn}}}),this.mesh=new z(e,this.mat),this.mesh.position.y=nn,this.mesh.renderOrder=2}update(t,e,n,i,r,o){const a=Math.max(0,Math.min(1,1-(n.y+.14)/.42));this.mat.uniforms.uTime.value=t,this.mat.uniforms.uWindSpeed.value=e.windSpeed,this.mat.uniforms.uSunDir.value.copy(n),this.mat.uniforms.uSunColor.value.copy(i),this.mat.uniforms.uSkyHorizon.value.copy(r),this.mat.uniforms.uFogColor.value.copy(r),this.mat.uniforms.uFogDensity.value=o,this.mat.uniforms.uNightFactor.value=a}}class Og{root=new Bt;nodeGroup=new Bt;nodeVisuals=new Map;grassUniforms={uTime:{value:0},uWindSpeed:{value:1}};runeGlowMeshes=[];sharedMats={};constructor(t,e,n,i=7500){this.initSharedMaterials(n),this.buildLandmarks(e,n),this.buildInstancedGrass(e,i),this.root.add(this.nodeGroup),t.add(this.root)}initSharedMaterials(t){this.sharedMats={barkDark:new yt({map:t.barkDark,roughness:.92}),barkBirch:new yt({map:t.barkBirch,roughness:.85}),barkPalm:new yt({color:"#8f6c47",map:t.barkDark,roughness:.9}),pineNeedle:new yt({color:"#2d5a36",map:t.leafCluster,roughness:.82}),pineNeedleLight:new yt({color:"#3b6e3f",map:t.leafCluster,roughness:.82}),oakLeaf:new yt({color:"#4c8037",map:t.leafCluster,roughness:.78}),birchLeaf:new yt({color:"#86a93f",map:t.leafCluster,roughness:.76}),palmLeaf:new yt({color:"#538c38",roughness:.75,side:Se}),marshLeaf:new yt({color:"#465e3b",map:t.leafCluster,roughness:.85}),stone:new yt({color:"#7c828a",map:t.stoneMasonry,bumpMap:t.stoneMasonryBump,bumpScale:.14,roughness:.88}),stoneDark:new yt({color:"#494e56",roughness:.85}),copper:new yt({color:"#d47c44",metalness:.62,roughness:.35}),iron:new yt({color:"#a7b5c4",metalness:.72,roughness:.32}),obsidian:new yt({color:"#2c1f3f",emissive:"#1e1036",metalness:.4,roughness:.18}),crystal:new yt({color:"#49f2e1",emissive:"#18b8ad",emissiveIntensity:.75,roughness:.15,metalness:.25}),berryLeaf:new yt({color:"#366b32",roughness:.82}),berry:new yt({color:"#e63956",emissive:"#380912",roughness:.35}),reed:new yt({color:"#6da345",roughness:.8,side:Se}),mushroomCap:new yt({color:"#c9783e",roughness:.65}),mushroomStem:new yt({color:"#e8dec8",roughness:.78}),crateWood:new yt({map:t.woodPlank,bumpMap:t.woodPlankBump,bumpScale:.12,roughness:.82}),ironBand:new yt({color:"#383d45",metalness:.75,roughness:.42})}}buildLandmarks(t,e){const n=new yt({map:e.stoneMasonry,bumpMap:e.stoneMasonryBump,bumpScale:.2,color:"#9aa0a6",roughness:.9}),i=new yt({color:"#5cf2e6",emissive:"#22d3ee",emissiveIntensity:1.4,roughness:.2}),r=-10,o=18,a=t.getHeight(r,o),l=new Bt;l.position.set(r,a,o);const c=new z(new Ot(5.6,6.2,.38,12),n);c.position.y=.12,c.receiveShadow=!0,l.add(c);for(let F=0;F<6;F++){const X=F/6*Math.PI*2+.25,O=new Bt,tt=4.2+F%2*1.1,nt=new z(new ft(1.15,tt,.72),n);nt.position.y=tt*.5,nt.castShadow=!0,nt.receiveShadow=!0,O.add(nt);const rt=new z(new De(.82,.95,4),n);rt.position.y=tt+.45,rt.rotation.y=Math.PI/4,rt.castShadow=!0,O.add(rt);const wt=new z(new ft(.18,tt*.52,.08),i);wt.position.set(0,tt*.52,.37),O.add(wt),this.runeGlowMeshes.push(wt),O.position.set(Math.cos(X)*6.8,-.1,Math.sin(X)*6.8),O.lookAt(r,a+2,o),O.rotation.z=(F%2===0?1:-1)*.05,l.add(O)}const h=new In("#38f2dc",2.4,18,1.5);h.position.set(0,3.4,0),l.add(h);const d=new z(new yn(.65,0),i);d.position.set(0,2.75,0),l.add(d),this.runeGlowMeshes.push(d),this.root.add(l);const u=new Bt,p=new yt({color:"#3b8c42",roughness:.72,side:Se}),g=new yt({color:"#f9a8d4",emissive:"#9d174d",emissiveIntensity:.25,roughness:.5});for(let F=0;F<14;F++){const X=F/14*Math.PI*2+.15,O=7.4+F%3*1.4,tt=16+Math.cos(X)*O,nt=8+Math.sin(X)*O,rt=t.getHeight(tt,nt),wt=new z(new Qe(.65+F%3*.28,0),n);wt.position.set(tt,rt+.15,nt),wt.scale.set(1.25,.72,1.05),wt.rotation.set(F*.4,F*1.1,0),wt.castShadow=!0,wt.receiveShadow=!0,u.add(wt)}for(let F=0;F<10;F++){const X=F/10*Math.PI*2,O=2+F%4*1.3,tt=16+Math.cos(X)*O,nt=8+Math.sin(X)*O,rt=new z(new Ot(.45+F%2*.18,.45,.04,9),p);if(rt.position.set(tt,nn+.04,nt),u.add(rt),F%2===0){const wt=new z(new yn(.14,0),g);wt.position.set(tt,nn+.14,nt),u.add(wt)}}this.root.add(u);const _=-14,m=112,f=t.getHeight(_,m),S=new Bt;S.position.set(_,f+.4,m),S.rotation.set(.16,.62,-.22);const b=new yt({map:e.woodPlank,color:"#6b4a2f",roughness:.92}),x=new z(new ft(5.2,2.8,14.5),b);x.castShadow=!0,x.receiveShadow=!0,S.add(x);const C=new z(new De(3.5,5.2,4),b);C.rotation.x=Math.PI/2,C.rotation.y=Math.PI/4,C.position.set(0,.2,9.2),C.castShadow=!0,S.add(C);const E=new z(new Ot(.22,.32,9.5,8),b);E.position.set(0,5.2,.6),E.rotation.z=.14,E.castShadow=!0,S.add(E);const A=new z(new Ot(.14,.14,6.8,7),b);A.rotation.z=Math.PI/2+.12,A.position.set(.4,7.6,.8),S.add(A);const I=new yt({color:"#ddd3be",roughness:.95,side:Se}),y=new z(new He(5.6,3.6),I);y.position.set(.4,5.8,1.05),y.rotation.y=.08,S.add(y),this.root.add(S);const v=-44,R=-62,U=t.getHeight(v,R),P=new Bt;P.position.set(v,U,R);const H=new z(new Ot(3.4,3.8,7.5,8,1,!0),n);H.position.y=3.5,H.castShadow=!0,H.receiveShadow=!0,P.add(H);for(let F=0;F<6;F++){const X=F/6*Math.PI*2,O=new z(new ft(1.1,1.3+F%2*.7,.7),n);O.position.set(Math.cos(X)*3.3,7.6,Math.sin(X)*3.3),O.lookAt(v,U+7.6,R),O.castShadow=!0,P.add(O)}this.root.add(P);const q=new Bt;for(let F=0;F<3;F++){const X=78+F*7.5,O=32+F*3.8,tt=t.getHeight(X,O),nt=new Bt;nt.position.set(X,tt,O),nt.rotation.y=.48;const rt=new z(new ft(1.1,5.2,1.1),n);rt.position.set(-2.3,2.4,0),rt.castShadow=!0;const wt=new z(new ft(1.1,4.8,1.1),n);wt.position.set(2.3,2.2,0),wt.castShadow=!0;const jt=new z(new ft(6,1,1.25),n);jt.position.set(0,5,0),jt.rotation.z=F===2?-.14:.03,jt.castShadow=!0,nt.add(rt,wt,jt),q.add(nt)}this.root.add(q)}buildInstancedGrass(t,e){const n=new He(.42,.72,1,2);n.translate(0,.36,0);const i=n.attributes.position;for(let _=0;_<i.count;_++){const m=i.getY(_);m>.5?(i.setZ(_,.14),i.setX(_,i.getX(_)*.25)):m>.2&&i.setZ(_,.04)}n.computeVertexNormals();const r=new Pc({color:"#ffffff",side:Se});r.onBeforeCompile=_=>{_.uniforms.uTime=this.grassUniforms.uTime,_.uniforms.uWindSpeed=this.grassUniforms.uWindSpeed,_.vertexShader=`uniform float uTime;
uniform float uWindSpeed;
`+_.vertexShader,_.vertexShader=_.vertexShader.replace("#include <begin_vertex>",`
        #include <begin_vertex>
        vec4 instWorld = instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
        float sway = sin(uTime * (1.8 + uWindSpeed * 0.7) + instWorld.x * 0.28 + instWorld.z * 0.22) * 0.18 * uWindSpeed;
        float sway2 = cos(uTime * 1.1 + instWorld.z * 0.45) * 0.09;
        float tipMask = clamp(position.y / 0.72, 0.0, 1.0);
        transformed.x += (sway + sway2) * tipMask * tipMask;
        transformed.z += sway * 0.5 * tipMask * tipMask;
        `)};const o=ba(t.seed+9191),a=[],l=[],c=new ge,h=["#5d9c3f","#6eb044","#4d8739","#7bb34b"],d=["#3f6c38","#4b7a3d","#355c33"],u=["#f4d35e","#f7f4ea","#ec7d8d","#9dc6f7"];let p=0;for(;a.length<e&&p<e*3;){p++;const _=(o()*2-1)*140,m=(o()*2-1)*140,f=t.sample(_,m);if(f.height<1.75||f.height>12.2||f.slope>.52||f.biome==="volcanic"||f.biome==="beach"||f.biome==="ocean")continue;const S=.65+o()*.95;c.position.set(_,f.height-.04,m),c.rotation.set(0,o()*Math.PI*2,(o()-.5)*.15),c.scale.set(S,S*(.8+o()*.55),S),c.updateMatrix(),a.push(c.matrix.clone());let b;f.biome==="meadow"&&o()<.085?b=u[Math.floor(o()*u.length)]:f.biome==="meadow"?b=h[Math.floor(o()*h.length)]:b=d[Math.floor(o()*d.length)],l.push(new st(b))}const g=new Ad(n,r,a.length);for(let _=0;_<a.length;_++)g.setMatrixAt(_,a[_]),g.setColorAt(_,l[_]);g.instanceMatrix.needsUpdate=!0,g.instanceColor&&(g.instanceColor.needsUpdate=!0),g.receiveShadow=!0,this.root.add(g)}syncNodes(t){for(const e of t)this.upsertNode(e)}upsertNode(t){let e=this.nodeVisuals.get(t.id);if(e)!t.depleted&&e.group.visible&&t.hp<t.maxHp&&(e.shakeTime=.24);else{const n=this.createNodeMesh(t.kind);n.position.set(t.x,t.y,t.z),n.rotation.y=t.rotY,n.scale.setScalar(t.scale),n.traverse(i=>{i.userData.nodeId=t.id,i.userData.nodeKind=t.kind}),this.nodeGroup.add(n),e={group:n,baseX:t.x,baseY:t.y,baseZ:t.z,baseRotY:t.rotY,shakeTime:0,kind:t.kind},this.nodeVisuals.set(t.id,e)}e.group.visible=!t.depleted}getNodeVisualClone(t){const e=this.nodeVisuals.get(t);if(!e)return null;const n=e.group.clone();return n.visible=!0,n}createNodeMesh(t){const e=new Bt;if(t==="pine_tree"){const n=new z(new Ot(.18,.42,3.6,7),this.sharedMats.barkDark);n.position.y=1.75,n.castShadow=!0,n.receiveShadow=!0,e.add(n),[{y:3.1,r:2.15,h:2.4},{y:4.5,r:1.75,h:2.2},{y:5.8,r:1.32,h:2},{y:6.9,r:.82,h:1.6}].forEach((r,o)=>{const a=new z(new De(r.r,r.h,7),o%2===0?this.sharedMats.pineNeedle:this.sharedMats.pineNeedleLight);a.position.y=r.y,a.rotation.y=o*.65,a.castShadow=!0,a.receiveShadow=!0,e.add(a)})}else if(t==="oak_tree"){const n=new z(new Ot(.28,.52,3.2,7),this.sharedMats.barkDark);n.position.y=1.55,n.castShadow=!0,e.add(n);const i=[[0,4.1,0,1.85],[1.1,3.6,.5,1.35],[-1,3.7,-.6,1.4],[.3,4.9,-.4,1.25]];for(const[r,o,a,l]of i){const c=new z(new Qe(l,1),this.sharedMats.oakLeaf);c.position.set(r,o,a),c.scale.set(1.05,.85,1.05),c.castShadow=!0,c.receiveShadow=!0,e.add(c)}}else if(t==="birch_tree"){const n=new z(new Ot(.14,.28,4.2,7),this.sharedMats.barkBirch);n.position.y=2.05,n.castShadow=!0,e.add(n);const i=[[0,4.5,0,1.45],[.75,4,.4,1.05],[-.7,4.2,-.35,1.1]];for(const[r,o,a,l]of i){const c=new z(new Qe(l,1),this.sharedMats.birchLeaf);c.position.set(r,o,a),c.castShadow=!0,e.add(c)}}else if(t==="palm_tree"){let n=0,i=0;for(let r=0;r<5;r++){const o=new z(new Ot(.18-r*.015,.24-r*.015,1.15,7),this.sharedMats.barkPalm);o.position.set(i,n+.52,0),o.rotation.z=-r*.08,o.castShadow=!0,e.add(o),n+=1.05,i+=r*.12}for(let r=0;r<7;r++){const o=r/7*Math.PI*2,a=new He(.75,2.8,1,3),l=a.attributes.position;for(let h=0;h<l.count;h++){const d=l.getY(h)+1.4;l.setY(h,d),l.setZ(h,-d*d*.16)}a.computeVertexNormals();const c=new z(a,this.sharedMats.palmLeaf);c.position.set(i,n,0),c.rotation.y=o,c.rotation.x=1.08,c.castShadow=!0,e.add(c)}for(let r=0;r<3;r++){const o=r/3*Math.PI*2,a=new z(new $n(.19,6,6),this.sharedMats.barkDark);a.position.set(i+Math.cos(o)*.28,n-.15,Math.sin(o)*.28),e.add(a)}}else if(t==="marsh_tree"){const n=new z(new Ot(.24,.55,3,6),this.sharedMats.barkDark);n.position.y=1.45,n.rotation.z=.12,n.castShadow=!0,e.add(n);const i=new z(new Qe(1.9,1),this.sharedMats.marshLeaf);i.position.set(.3,3.5,0),i.scale.set(1.25,.72,1.25),i.castShadow=!0,e.add(i)}else if(t==="stone_boulder"||t==="copper_vein"||t==="iron_vein"||t==="obsidian_vein"){const n=t==="obsidian_vein"?this.sharedMats.obsidian:this.sharedMats.stone,i=new z(new Qe(1.15,0),n);i.scale.set(1.18,.82,1),i.position.y=.62,i.castShadow=!0,i.receiveShadow=!0,e.add(i);const r=new z(new Qe(.68,0),this.sharedMats.stoneDark);if(r.position.set(.75,.42,.45),r.castShadow=!0,e.add(r),t!=="stone_boulder"){const o=t==="copper_vein"?this.sharedMats.copper:t==="iron_vein"?this.sharedMats.iron:this.sharedMats.crystal;for(let a=0;a<5;a++){const l=a/5*Math.PI*2,c=new z(new yn(.28+a%2*.1,0),o);c.position.set(Math.cos(l)*.72,.65+a%3*.22,Math.sin(l)*.66),c.rotation.set(a,a*1.4,.4),e.add(c)}}}else if(t==="ancient_crystal"){const n=new z(new Qe(.85,0),this.sharedMats.stoneDark);n.scale.set(1.2,.55,1.2),n.position.y=.3,e.add(n);for(let i=0;i<4;i++){const r=i/4*Math.PI*2,o=i===0?1.9:1.2+i%2*.35,a=new z(new De(.26,o,5),this.sharedMats.crystal);a.position.set(Math.cos(r)*(i===0?0:.38),o*.5+.15,Math.sin(r)*(i===0?0:.38)),a.rotation.z=i===0?.05:Math.cos(r)*.28,a.rotation.x=i===0?0:Math.sin(r)*.28,a.castShadow=!0,e.add(a)}}else if(t==="berry_bush"){const n=new z(new Qe(.75,1),this.sharedMats.berryLeaf);n.scale.set(1.15,.82,1.15),n.position.y=.52,n.castShadow=!0,e.add(n);for(let i=0;i<10;i++){const r=i/10*Math.PI*2,o=new z(new $n(.085,5,5),this.sharedMats.berry);o.position.set(Math.cos(r)*.62,.42+i%3*.18,Math.sin(r)*.62),e.add(o)}}else if(t==="fiber_reed")for(let n=0;n<6;n++){const i=n/6*Math.PI*2,r=new z(new He(.22,1.15),this.sharedMats.reed);r.position.set(Math.cos(i)*.22,.55,Math.sin(i)*.22),r.rotation.y=i,r.rotation.x=.14,e.add(r)}else if(t==="mushroom_cluster")for(let n=0;n<4;n++){const i=n/4*Math.PI*2,r=.7+n%2*.4,o=new z(new Ot(.07*r,.1*r,.36*r,6),this.sharedMats.mushroomStem);o.position.set(Math.cos(i)*.25,.18*r,Math.sin(i)*.25);const a=new z(new De(.26*r,.2*r,7),this.sharedMats.mushroomCap);a.position.set(o.position.x,.4*r,o.position.z),e.add(o,a)}else if(t==="driftwood"){const n=new z(new Ot(.2,.26,2.2,7),this.sharedMats.barkPalm);n.rotation.z=Math.PI/2,n.position.y=.22,n.castShadow=!0,e.add(n)}else if(t==="supply_crate"){const n=new z(new ft(1.05,.95,1.05),this.sharedMats.crateWood);n.position.y=.48,n.castShadow=!0,n.receiveShadow=!0,e.add(n);const i=new z(new ft(1.09,.16,1.09),this.sharedMats.ironBand);i.position.y=.48,e.add(i)}return e}update(t,e,n){this.grassUniforms.uTime.value=e,this.grassUniforms.uWindSpeed.value=n;for(let i=0;i<this.runeGlowMeshes.length;i++){const r=this.runeGlowMeshes[i],o=r.material;o.emissiveIntensity=1+Math.sin(e*2.1+i)*.45,i===this.runeGlowMeshes.length-1&&(r.rotation.y=e*.9,r.position.y=2.75+Math.sin(e*1.8)*.22)}for(const i of this.nodeVisuals.values())if(i.shakeTime>0){i.shakeTime=Math.max(0,i.shakeTime-t);const r=i.shakeTime*.55;i.group.rotation.z=Math.sin(e*55)*r,i.group.rotation.x=Math.cos(e*48)*r*.6,i.shakeTime===0&&(i.group.rotation.z=0,i.group.rotation.x=0)}}}class zg{group=new Bt;visuals=new Map;mats;ghostGroup=null;ghostKind=null;ghostValidMat;ghostInvalidMat;constructor(t,e){this.mats={wood:new yt({map:e.woodPlank,bumpMap:e.woodPlankBump,bumpScale:.14,roughness:.82}),woodDark:new yt({map:e.barkDark,color:"#6b472b",roughness:.88}),roof:new yt({map:e.roofShingle,roughness:.85}),stone:new yt({map:e.stoneMasonry,bumpMap:e.stoneMasonryBump,bumpScale:.2,roughness:.88}),iron:new yt({color:"#3f4650",metalness:.72,roughness:.35}),cloth:new yt({color:"#b84c3e",roughness:.92}),hide:new yt({color:"#a37146",roughness:.88}),flameOuter:new Ae({color:"#ff6a1a",transparent:!0,opacity:.9}),flameInner:new Ae({color:"#ffe573"}),ember:new yt({color:"#ff4500",emissive:"#ff5500",emissiveIntensity:1.6}),crystal:new yt({color:"#5cf2e6",emissive:"#22d3ee",emissiveIntensity:1.4,roughness:.15}),water:new yt({color:"#2fb8d9",roughness:.15,metalness:.1,transparent:!0,opacity:.85})},this.ghostValidMat=new Ae({color:"#38f2dc",transparent:!0,opacity:.42,wireframe:!1,depthWrite:!1}),this.ghostInvalidMat=new Ae({color:"#f87171",transparent:!0,opacity:.45,depthWrite:!1}),t.add(this.group)}syncAll(t){const e=new Set;for(const n of t)e.add(n.id),this.upsert(n);for(const n of Array.from(this.visuals.keys()))e.has(n)||this.remove(n)}upsert(t){let e=this.visuals.get(t.id);e||(e=this.buildVisual(t),e.group.traverse(n=>{n.userData.structureId=t.id,n.userData.structureKind=t.kind}),this.group.add(e.group),this.visuals.set(t.id,e)),e.state=t,e.group.position.set(t.x,t.y,t.z),e.group.rotation.y=t.rotY,e.flame&&(e.flame.visible=!!t.lit),e.light&&(e.light.visible=!!t.lit)}remove(t){const e=this.visuals.get(t);e&&(this.group.remove(e.group),this.visuals.delete(t))}getLitCampfirePositions(){const t=[];for(const e of this.visuals.values())(e.state.kind==="campfire"||e.state.kind==="furnace")&&e.state.lit&&t.push(e.group.position);return t}updateGhost(t,e,n,i,r,o){if(!t){this.ghostGroup&&(this.group.remove(this.ghostGroup),this.ghostGroup=null,this.ghostKind=null);return}if(this.ghostKind!==t||!this.ghostGroup){this.ghostGroup&&this.group.remove(this.ghostGroup);const l={id:"ghost",kind:t,ownerId:"",ownerName:"",x:e,y:n,z:i,rotY:r,hp:100,maxHp:100,lit:!1};this.ghostGroup=this.buildVisual(l,!0).group,this.ghostKind=t,this.group.add(this.ghostGroup)}this.ghostGroup.position.set(e,n,i),this.ghostGroup.rotation.y=r;const a=o?this.ghostValidMat:this.ghostInvalidMat;this.ghostGroup.traverse(l=>{l.isMesh&&(l.material=a,l.castShadow=!1,l.receiveShadow=!1)})}buildVisual(t,e=!1){const n=new Bt,i={group:n,state:t};switch(t.kind){case"campfire":{for(let o=0;o<8;o++){const a=o/8*Math.PI*2,l=new z(new Qe(.24,0),this.mats.stone);l.position.set(Math.cos(a)*.62,.14,Math.sin(a)*.62),l.castShadow=!0,n.add(l)}for(let o=0;o<3;o++){const a=new z(new Ot(.09,.1,1.05,6),this.mats.woodDark);a.rotation.z=Math.PI/2,a.rotation.y=o/3*Math.PI,a.position.y=.14,n.add(a)}const r=new z(new Ot(.42,.48,.1,8),this.mats.ember);if(r.position.y=.08,n.add(r),!e){const o=new Bt,a=new z(new De(.32,.92,6),this.mats.flameOuter);a.position.y=.5;const l=new z(new De(.18,.62,6),this.mats.flameInner);l.position.y=.38,o.add(a,l),n.add(o),i.flame=o;const c=new In("#ff8a33",5.5,16,1.6);c.position.set(0,1.25,0),n.add(c),i.light=c}break}case"workbench":{const r=new z(new ft(1.9,.16,1.05),this.mats.wood);r.position.y=.95,r.castShadow=!0,r.receiveShadow=!0,n.add(r);const o=[[-.8,-.4],[.8,-.4],[-.8,.4],[.8,.4]];for(const[c,h]of o){const d=new z(new ft(.16,.95,.16),this.mats.woodDark);d.position.set(c,.47,h),d.castShadow=!0,n.add(d)}const a=new z(new ft(1.7,.52,.1),this.mats.woodDark);a.position.set(0,1.25,-.46),n.add(a);const l=new z(new ft(.34,.2,.22),this.mats.iron);l.position.set(.55,1.12,.1),n.add(l);break}case"furnace":{const r=new z(new Ot(.92,1.1,1.5,8),this.mats.stone);r.position.y=.75,r.castShadow=!0,r.receiveShadow=!0,n.add(r);const o=new z(new Ot(.45,.72,1.25,8),this.mats.stone);o.position.y=2.05,o.castShadow=!0,n.add(o);const a=new z(new ft(.62,.56,.35),this.mats.ember);if(a.position.set(0,.52,.84),n.add(a),!e){const l=new In("#ff6b22",4.4,13,1.6);l.position.set(0,.8,1.25),n.add(l),i.light=l}break}case"runic_forge":{const r=new z(new Ot(.95,1.15,.95,6),this.mats.stone);r.position.y=.48,r.castShadow=!0,n.add(r);const o=new z(new yn(.46,0),this.mats.crystal);if(o.position.y=1.68,n.add(o),i.crystal=o,!e){const a=new In("#38f2dc",5,15,1.5);a.position.set(0,1.8,0),n.add(a),i.light=a}break}case"wood_foundation":{const r=new z(new ft(le,.32,le),this.mats.wood);r.position.y=.36,r.castShadow=!0,r.receiveShadow=!0,n.add(r);const o=le*.44;for(const[a,l]of[[-o,-o],[o,-o],[-o,o],[o,o]]){const c=new z(new Ot(.15,.17,1.8,6),this.mats.woodDark);c.position.set(a,-.5,l),c.castShadow=!0,n.add(c)}break}case"wood_wall":{const r=new z(new ft(le,Te,.28),this.mats.wood);r.position.y=Te*.5,r.castShadow=!0,r.receiveShadow=!0,n.add(r);for(const o of[-le*.48,le*.48]){const a=new z(new ft(.24,Te+.08,.36),this.mats.woodDark);a.position.set(o,Te*.5,0),n.add(a)}break}case"wood_doorway":{const r=(le-1.25)*.5,o=new z(new ft(r,Te,.28),this.mats.wood);o.position.set(-1.1125,Te*.5,0),o.castShadow=!0,o.receiveShadow=!0;const a=o.clone();a.position.x=-o.position.x;const l=new z(new ft(1.3,.62,.3),this.mats.woodDark);l.position.set(0,Te-.31,0),n.add(o,a,l);const c=new Bt;c.position.set(-.6,0,0);const h=new z(new ft(1.18,Te-.64,.14),this.mats.woodDark);h.position.set(.59,(Te-.64)*.5,0),h.castShadow=!0;const d=new z(new $n(.08,6,6),this.mats.iron);d.position.set(1.02,1.15,.1),c.add(h,d),n.add(c),i.doorPivot=c;break}case"wood_roof":{const r=new z(new ft(le+.35,.28,le+.35),this.mats.roof);r.position.y=.14,r.castShadow=!0,r.receiveShadow=!0,n.add(r);break}case"wood_stairs":{for(let r=0;r<5;r++){const o=new z(new ft(2.4,.22,.58),this.mats.wood);o.position.set(0,.12+r*.24,-1+r*.5),o.castShadow=!0,o.receiveShadow=!0,n.add(o)}break}case"stone_wall":{const r=new z(new ft(le,Te,.52),this.mats.stone);r.position.y=Te*.5,r.castShadow=!0,r.receiveShadow=!0,n.add(r);for(const o of[-1.05,0,1.05]){const a=new z(new ft(.62,.42,.56),this.mats.stone);a.position.set(o,Te+.21,0),a.castShadow=!0,n.add(a)}break}case"spike_barricade":{const r=new z(new ft(2.5,.22,.25),this.mats.woodDark);r.position.y=.65,n.add(r);for(let o=-2;o<=2;o++){const a=new z(new De(.14,1.9,6),this.mats.wood);a.position.set(o*.52,.85,0),a.rotation.x=.42,a.castShadow=!0,n.add(a)}break}case"storage_chest":{const r=new z(new ft(1.22,.72,.78),this.mats.wood);r.position.y=.36,r.castShadow=!0,r.receiveShadow=!0,n.add(r);const o=new z(new ft(1.26,.2,.82),this.mats.woodDark);o.position.y=.78,o.castShadow=!0,n.add(o);const a=new z(new ft(.18,.24,.1),this.mats.iron);a.position.set(0,.68,.42),n.add(a);break}case"bedroll":{const r=new z(new ft(1.15,.16,2.05),this.mats.cloth);r.position.y=.09,r.receiveShadow=!0;const o=new z(new ft(.86,.22,.42),this.mats.hide);o.position.set(0,.2,-.72),n.add(r,o);break}case"rain_collector":{const r=new z(new Ot(.75,.62,.9,10),this.mats.wood);r.position.y=.45,r.castShadow=!0,n.add(r);const o=new z(new Ot(.68,.64,.12,10),this.mats.water);o.position.y=.4,n.add(o),i.waterMesh=o;for(let a=0;a<4;a++){const l=a/4*Math.PI*2,c=new z(new Ot(.05,.06,1.55,5),this.mats.woodDark);c.position.set(Math.cos(l)*.68,.8,Math.sin(l)*.68),n.add(c)}break}case"lantern_post":{const r=new z(new Ot(.09,.13,3.1,6),this.mats.woodDark);r.position.y=1.55,r.castShadow=!0;const o=new z(new ft(.75,.1,.1),this.mats.woodDark);o.position.set(.35,2.95,0);const a=new z(new yn(.24,0),this.mats.flameInner);if(a.position.set(.68,2.68,0),n.add(r,o,a),!e){const l=new In("#ffbd59",5.2,18,1.5);l.position.set(.68,2.6,0),n.add(l),i.light=l}break}case"watchtower_beacon":{const r=new z(new Ot(1.1,1.5,4.4,8),this.mats.stone);r.position.y=2.2,r.castShadow=!0;const o=new z(new Ot(1.25,.75,.65,8),this.mats.iron);o.position.y=4.6;const a=new z(new yn(.62,1),this.mats.crystal);if(a.position.y=5.4,n.add(r,o,a),i.crystal=a,!e){const l=new In("#38f2dc",9,32,1.3);l.position.set(0,5.6,0),n.add(l),i.light=l}break}}return i}update(t,e){for(const n of this.visuals.values()){if(n.flame&&n.state.lit){const i=.88+Math.sin(e*16+n.state.x)*.14+Math.cos(e*23)*.08;n.flame.scale.set(i,.9+Math.sin(e*19+n.state.z)*.22,i),n.flame.rotation.y=e*2.5}if(n.light&&n.state.lit&&n.state.kind==="campfire"&&(n.light.intensity=5.2+Math.sin(e*14+n.state.x)*1.1),n.doorPivot){const i=n.state.isOpen?-Math.PI*.56:0;n.doorPivot.rotation.y+=(i-n.doorPivot.rotation.y)*Math.min(1,t*8)}if(n.crystal&&(n.crystal.rotation.y=e*1.4,n.crystal.position.y=(n.state.kind==="watchtower_beacon"?5.45:1.68)+Math.sin(e*2.5)*.14),n.waterMesh){const i=(n.state.waterLevel??0)/100;n.waterMesh.position.y=.15+i*.68,n.waterMesh.visible=i>.04}}}}const $l={ranger:{tunic:"#3b6b4c",cloak:"#2c4a38",pants:"#4f3f31",hair:"#4a3121"},nomad:{tunic:"#b56738",cloak:"#7a3f22",pants:"#453b34",hair:"#241b16"},warden:{tunic:"#3b5678",cloak:"#26384f",pants:"#353a42",hair:"#d4b47c"},alchemist:{tunic:"#5d4375",cloak:"#3b2b4d",pants:"#342f3d",hair:"#9e4736"},mariner:{tunic:"#2d7a78",cloak:"#1e5250",pants:"#3e4a52",hair:"#524034"}};class jl{group=new Bt;bodyGroup=new Bt;headGroup=new Bt;leftArm=new Bt;rightArm=new Bt;leftLeg=new Bt;rightLeg=new Bt;heldItemAnchor=new Bt;armorMesh;torchLight=null;nameplateSprite=null;nameplateCanvas=null;lastLabelKey="";currentItemId=null;currentArmorId=null;animClock=0;constructor(t,e){const n=$l[t]||$l.ranger,i=new yt({color:"#e5b893",roughness:.78}),r=new yt({color:n.tunic,roughness:.84}),o=new yt({color:n.cloak,roughness:.88}),a=new yt({color:n.pants,roughness:.86}),l=new yt({color:"#2b2019",roughness:.9}),c=new yt({color:n.hair,roughness:.85}),h=new yt({color:"#7d5333",roughness:.88}),d=new z(new ft(.58,.72,.34),r);d.position.y=1.08,d.castShadow=!0,this.bodyGroup.add(d);const u=new z(new ft(.68,.18,.4),o);u.position.y=1.38,u.castShadow=!0,this.bodyGroup.add(u);const p=new z(new ft(.61,.11,.37),l);p.position.y=.76,this.bodyGroup.add(p);const g=new z(new ft(.42,.52,.24),h);g.position.set(0,1.12,-.26),g.castShadow=!0,this.bodyGroup.add(g);const _=new z(new Ot(.09,.09,.48,8),new yt({color:"#b85343",roughness:.9}));_.rotation.z=Math.PI/2,_.position.set(0,1.43,-.27),this.bodyGroup.add(_),this.armorMesh=new z(new ft(.64,.56,.4),new yt({color:"#8d5936",roughness:.55,metalness:.3})),this.armorMesh.position.y=1.12,this.armorMesh.visible=!1,this.bodyGroup.add(this.armorMesh),this.headGroup.position.set(0,1.48,0);const m=new z(new ft(.4,.42,.4),i);m.position.y=.22,m.castShadow=!0;const f=new z(new ft(.43,.22,.43),c);f.position.set(0,.36,-.02);const S=new Ae({color:"#1b1d24"}),b=new z(new ft(.06,.06,.04),S);b.position.set(-.09,.23,.2);const x=b.clone();x.position.x=.09,this.headGroup.add(m,f,b,x),this.bodyGroup.add(this.headGroup),this.leftArm.position.set(-.39,1.36,0);const C=new ft(.18,.58,.18),E=new z(C,r);E.position.y=-.24,E.castShadow=!0;const A=new z(new ft(.15,.14,.15),i);A.position.y=-.56,this.leftArm.add(E,A),this.rightArm.position.set(.39,1.36,0);const I=new z(C,r);I.position.y=-.24,I.castShadow=!0;const y=new z(new ft(.15,.14,.15),i);y.position.y=-.56,this.heldItemAnchor.position.set(0,-.56,.08),this.rightArm.add(I,y,this.heldItemAnchor),this.bodyGroup.add(this.leftArm,this.rightArm),this.leftLeg.position.set(-.16,.72,0);const v=new ft(.21,.52,.22),R=new z(v,a);R.position.y=-.26,R.castShadow=!0;const U=new z(new ft(.22,.22,.28),l);U.position.set(0,-.6,.03),this.leftLeg.add(R,U),this.rightLeg.position.set(.16,.72,0);const P=new z(v,a);P.position.y=-.26,P.castShadow=!0;const H=U.clone();if(this.rightLeg.add(P,H),this.bodyGroup.add(this.leftLeg,this.rightLeg),this.group.add(this.bodyGroup),e){this.nameplateCanvas=document.createElement("canvas"),this.nameplateCanvas.width=256,this.nameplateCanvas.height=64;const q=new Rc(this.nameplateCanvas),F=new bc({map:q,transparent:!0,depthTest:!1});this.nameplateSprite=new Ed(F),this.nameplateSprite.position.set(0,2.35,0),this.nameplateSprite.scale.set(2.1,.52,1),this.group.add(this.nameplateSprite)}}setHeldItem(t){if(this.currentItemId===t)return;for(this.currentItemId=t;this.heldItemAnchor.children.length>0;)this.heldItemAnchor.remove(this.heldItemAnchor.children[0]);if(this.torchLight=null,!t)return;const e=new yt({color:"#7d5230",roughness:.85}),n=new yt({color:"#8f98a3",roughness:.75}),i=new yt({color:"#cbd6e2",metalness:.78,roughness:.28});if(t==="torch"){const r=new z(new Ot(.04,.035,.65,6),e);r.rotation.x=Math.PI*.42,r.position.set(0,.05,.24);const o=new z(new De(.11,.28,6),new Ae({color:"#ffae38"}));o.position.set(0,.24,.54);const a=new In("#ff9436",4.6,15,1.6);a.position.set(0,.35,.58),this.torchLight=a,this.heldItemAnchor.add(r,o,a)}else if(t==="stone_axe"||t==="iron_axe"){const r=new z(new Ot(.035,.035,.82,6),e);r.rotation.x=Math.PI*.46,r.position.set(0,.05,.32);const o=new z(new ft(.08,.28,.24),t==="iron_axe"?i:n);o.position.set(0,.14,.68),this.heldItemAnchor.add(r,o)}else if(t==="stone_pickaxe"||t==="iron_pickaxe"){const r=new z(new Ot(.035,.035,.85,6),e);r.rotation.x=Math.PI*.46,r.position.set(0,.04,.34);const o=new z(new ft(.09,.54,.1),t==="iron_pickaxe"?i:n);o.position.set(0,.08,.72),this.heldItemAnchor.add(r,o)}else if(t==="wood_spear"){const r=new z(new Ot(.03,.035,1.75,6),e);r.rotation.x=Math.PI*.48,r.position.set(0,.04,.55);const o=new z(new De(.08,.3,5),n);o.rotation.x=Math.PI*.48,o.position.set(0,.08,1.48),this.heldItemAnchor.add(r,o)}else if(t==="iron_sword"||t==="shadow_blade"){const r=t==="shadow_blade",o=r?new yt({color:"#4c2673",emissive:"#9333ea",emissiveIntensity:.9,metalness:.6,roughness:.2}):i,a=new z(new ft(.06,.12,r?1.15:.95),o);a.position.set(0,.04,.62);const l=new z(new ft(.32,.07,.07),i);l.position.set(0,.04,.14),this.heldItemAnchor.add(a,l)}else if(t==="hunting_bow"||t==="starlight_bow"){const r=t==="starlight_bow"?new yt({color:"#38f2dc",emissive:"#14b8a6",emissiveIntensity:.85}):e,o=new z(new Ma(.45,.032,6,14,Math.PI),r);o.rotation.y=Math.PI/2,o.rotation.z=-Math.PI/2,o.position.set(0,.06,.22),this.heldItemAnchor.add(o)}else if(t==="build_hammer"){const r=new z(new Ot(.035,.035,.62,6),e);r.rotation.x=Math.PI*.45,r.position.set(0,.04,.25);const o=new z(new ft(.16,.16,.3),n);o.position.set(0,.1,.56),this.heldItemAnchor.add(r,o)}}setArmor(t){if(this.currentArmorId===t)return;if(this.currentArmorId=t,!t){this.armorMesh.visible=!1;return}this.armorMesh.visible=!0;const e=this.armorMesh.material;t==="leather_armor"?(e.color.set("#8d5936"),e.metalness=.08,e.emissive.set("#000000")):t==="iron_armor"?(e.color.set("#9eadbd"),e.metalness=.72,e.emissive.set("#000000")):(e.color.set("#2b2140"),e.metalness=.5,e.emissive.set("#22d3ee"),e.emissiveIntensity=.4)}updateNameplate(t){if(!this.nameplateCanvas||!this.nameplateSprite)return;const e=Math.round(t.vitals.hp/Math.max(1,t.vitals.maxHp)*100),n=`${t.name}|${e}|${t.pvpEnabled}|${t.emote??""}`;if(n===this.lastLabelKey)return;this.lastLabelKey=n;const i=this.nameplateCanvas.getContext("2d");i.clearRect(0,0,256,64),i.fillStyle="rgba(12, 18, 28, 0.72)",i.beginPath(),i.roundRect(18,8,220,46,12),i.fill(),i.font="bold 20px Inter, system-ui, sans-serif",i.textAlign="center",i.fillStyle=t.isBot?"#7dd3fc":t.pvpEnabled?"#fca5a5":"#f8fafc";const r=t.emote==="wave"?" 👋":t.emote==="cheer"?" 🔥":t.emote==="help"?" ⚠️":t.emote==="camp"?" ⛺":"";i.fillText(`${t.name}${r}`,128,32),i.fillStyle="rgba(255,255,255,0.18)",i.fillRect(46,40,164,7),i.fillStyle=e>45?"#4ade80":"#f87171",i.fillRect(46,40,164*e/100,7);const o=this.nameplateSprite.material.map;o.needsUpdate=!0}animate(t,e,n){if(this.setHeldItem(e.equippedItemId),this.setArmor(e.armorItemId),this.updateNameplate(e),this.torchLight&&(this.torchLight.intensity=4.4+Math.sin(n*18)*.75),!e.alive||e.anim==="dead"){this.bodyGroup.rotation.x=Math.PI/2,this.bodyGroup.position.y=.25;return}this.bodyGroup.rotation.x=0,this.bodyGroup.position.y=0;const i=Math.hypot(e.vx,e.vz),r=e.anim==="walk"||e.anim==="run"||i>.4,o=e.anim==="run"?11.5:7.5;if(this.animClock+=t*(r?o:2.2),e.anim==="swim"){this.bodyGroup.rotation.x=.65,this.bodyGroup.position.y=-.3;const a=Math.sin(n*6.5);this.leftArm.rotation.x=-1.3+a*.8,this.rightArm.rotation.x=-1.3-a*.8,this.leftLeg.rotation.x=a*.45,this.rightLeg.rotation.x=-a*.45}else if(e.anim==="dodge")this.bodyGroup.rotation.x=n*14%(Math.PI*2);else if(r){const a=e.anim==="run"?.75:.48,l=Math.sin(this.animClock);this.leftLeg.rotation.x=l*a,this.rightLeg.rotation.x=-l*a,this.leftArm.rotation.x=-l*a*.85,this.rightArm.rotation.x=l*a*.85,this.bodyGroup.position.y=Math.abs(Math.cos(this.animClock))*.06}else{const a=Math.sin(n*2.2)*.03;this.leftLeg.rotation.x*=.82,this.rightLeg.rotation.x*=.82,this.leftArm.rotation.x=a,this.rightArm.rotation.x=-a,this.bodyGroup.position.y=a*.5}if(e.equippedItemId==="torch"&&(this.rightArm.rotation.x=-.78),e.swingTime>0){const a=1-e.swingTime/.38;this.rightArm.rotation.x=-1.9+Math.sin(a*Math.PI)*2.15,this.rightArm.rotation.y=-.3+Math.sin(a*Math.PI)*.6}else this.rightArm.rotation.y=0}}class Hg{group=new Bt;visuals=new Map;constructor(t){t.add(this.group)}sync(t){const e=new Set;for(const n of t){e.add(n.id);let i=this.visuals.get(n.id);i||(i=this.createVisual(n),i.group.position.set(n.x,n.y,n.z),i.group.rotation.y=n.yaw,i.group.traverse(o=>{o.userData.wildlifeId=n.id,o.userData.wildlifeKind=n.kind}),this.group.add(i.group),this.visuals.set(n.id,i)),i.targetPos.set(n.x,n.y,n.z),i.targetYaw=n.yaw,i.state=n;const r=Math.max(.01,n.hp/Math.max(1,n.maxHp));i.hpBarGroup.visible=n.hp<n.maxHp,i.hpBarFill.scale.x=r,i.hpBarFill.position.x=-(1-r)*.55}for(const[n,i]of Array.from(this.visuals.entries()))e.has(n)||(this.group.remove(i.group),this.visuals.delete(n))}createVisual(t){const e=new Bt,n=[],i=new Bt;if(t.kind==="deer"){const l=new yt({color:"#9e6b40",roughness:.86}),c=new yt({color:"#e6d6be",roughness:.9}),h=new yt({color:"#d8ccb8",roughness:.78}),d=new z(new ft(.62,.58,1.38),l);d.position.y=1.05,d.castShadow=!0,e.add(d);const u=new z(new ft(.18,.22,.16),c);u.position.set(0,1.18,-.74),e.add(u),i.position.set(0,1.32,.58);const p=new z(new ft(.24,.56,.28),l);p.position.set(0,.24,.1),p.rotation.x=.24;const g=new z(new ft(.26,.24,.46),l);g.position.set(0,.52,.3);for(const m of[-1,1]){const f=new z(new Ot(.025,.035,.48,5),h);f.position.set(m*.15,.78,.16),f.rotation.z=-m*.42;const S=new z(new Ot(.02,.025,.28,5),h);S.position.set(m*.28,.9,.22),S.rotation.x=.5,i.add(f,S)}i.add(p,g),e.add(i);const _=[[-.2,.46],[.2,.46],[-.2,-.46],[.2,-.46]];for(const[m,f]of _){const S=new z(new ft(.13,.85,.13),l);S.position.set(m,.42,f),S.castShadow=!0,e.add(S),n.push(S)}}else if(t.kind==="boar"){const l=new yt({color:"#4d3a2f",roughness:.92}),c=new yt({color:"#f2e8d5",roughness:.55}),h=new z(new ft(.68,.58,1.15),l);h.position.y=.64,h.castShadow=!0,e.add(h),i.position.set(0,.68,.58);const d=new z(new ft(.42,.34,.45),l);d.position.set(0,-.02,.18);for(const u of[-1,1]){const p=new z(new De(.045,.26,5),c);p.position.set(u*.18,-.04,.4),p.rotation.x=.8,p.rotation.z=-u*.35,i.add(p)}i.add(d),e.add(i);for(const[u,p]of[[-.22,.36],[.22,.36],[-.22,-.36],[.22,-.36]]){const g=new z(new ft(.14,.44,.14),l);g.position.set(u,.22,p),g.castShadow=!0,e.add(g),n.push(g)}}else if(t.kind==="wolf"){const l=new yt({color:"#6b727d",roughness:.86}),c=new yt({color:"#393e46",roughness:.9}),h=new Ae({color:"#fbbf24"}),d=new z(new ft(.52,.48,1.24),l);d.position.y=.78,d.castShadow=!0,e.add(d);const u=new z(new ft(.14,.16,.55),c);u.position.set(0,.82,-.82),u.rotation.x=-.35,e.add(u),i.position.set(0,.94,.62);const p=new z(new ft(.36,.32,.48),c);p.position.set(0,.04,.15);for(const g of[-1,1]){const _=new z(new De(.07,.18,4),c);_.position.set(g*.12,.26,.05);const m=new z(new ft(.05,.05,.04),h);m.position.set(g*.1,.08,.38),i.add(_,m)}i.add(p),e.add(i);for(const[g,_]of[[-.17,.42],[.17,.42],[-.17,-.42],[.17,-.42]]){const m=new z(new ft(.12,.58,.12),c);m.position.set(g,.29,_),m.castShadow=!0,e.add(m),n.push(m)}}else{const l=new yt({color:"#171124",emissive:"#3b1566",emissiveIntensity:.75,roughness:.45}),c=new Ae({color:"#c084fc"}),h=new z(new De(.62,2.05,7),l);h.position.y=1.25,h.castShadow=!0,e.add(h),i.position.set(0,2.2,.12);const d=new z(new yn(.32,0),l);for(const p of[-1,1]){const g=new z(new De(.07,.55,5),l);g.position.set(p*.2,.35,-.05),g.rotation.z=-p*.4;const _=new z(new $n(.065,6,6),c);_.position.set(p*.11,.04,.26),i.add(g,_)}i.add(d),e.add(i);const u=new In("#a855f7",2.8,9,1.8);u.position.set(0,1.8,0),e.add(u)}const r=new Bt;r.position.set(0,t.kind==="stalker"?2.95:1.95,0);const o=new z(new He(1.16,.14),new Ae({color:"#0f172a",side:Se})),a=new z(new He(1.1,.09),new Ae({color:"#ef4444",side:Se}));return a.position.z=.01,r.add(o,a),r.visible=!1,e.add(r),{group:e,kind:t.kind,legs:n,head:i,hpBarFill:a,hpBarGroup:r,targetPos:new L(t.x,t.y,t.z),targetYaw:t.yaw,state:t}}update(t,e,n){const i=Math.min(1,t*11);for(const r of this.visuals.values()){r.group.position.lerp(r.targetPos,i);let o=r.targetYaw-r.group.rotation.y;for(;o>Math.PI;)o-=Math.PI*2;for(;o<-Math.PI;)o+=Math.PI*2;if(r.group.rotation.y+=o*i,r.hpBarGroup.visible&&r.hpBarGroup.lookAt(n.position),r.kind==="stalker")r.group.position.y+=Math.sin(e*4+r.targetPos.x)*.14,r.head.rotation.x=r.state.attackTime>0?.5:Math.sin(e*3)*.1;else if(r.state.speed>.3){const a=Math.sin(e*(r.state.speed*2.1));for(let l=0;l<r.legs.length;l++)r.legs[l].rotation.x=(l%2===0?a:-a)*.65}else for(const a of r.legs)a.rotation.x*=.85}}}class Gg{group=new Bt;lootGroup=new Bt;particles=[];fallingTrees=[];lootMeshes=new Map;projMeshes=new Map;rainLines;rainMat;fireflies;fireflyMat;seagulls=[];chipGeo=new ft(.14,.14,.14);campfireSmokeTimer=0;constructor(t,e){this.group.add(this.lootGroup);const n=650,i=new Float32Array(n*6);for(let h=0;h<n;h++){const d=(Math.random()-.5)*65,u=Math.random()*28,p=(Math.random()-.5)*65;i[h*6]=d,i[h*6+1]=u,i[h*6+2]=p,i[h*6+3]=d-.18,i[h*6+4]=u-1.15,i[h*6+5]=p-.1}const r=new be;r.setAttribute("position",new Ce(i,3)),this.rainMat=new Ac({color:"#bdd8f2",transparent:!0,opacity:0}),this.rainLines=new Pd(r,this.rainMat),this.rainLines.frustumCulled=!1,this.group.add(this.rainLines);const o=90,a=new Float32Array(o*3);for(let h=0;h<o;h++)a[h*3]=(Math.random()-.5)*55,a[h*3+1]=.8+Math.random()*4.5,a[h*3+2]=(Math.random()-.5)*55;const l=new be;l.setAttribute("position",new Ce(a,3)),this.fireflyMat=new ya({map:e.softParticle,color:"#b8ff6b",size:.45,transparent:!0,opacity:0,depthWrite:!1,blending:lo}),this.fireflies=new Cc(l,this.fireflyMat),this.fireflies.frustumCulled=!1,this.group.add(this.fireflies);const c=new Ae({color:"#f8fafc",side:Se});for(let h=0;h<9;h++){const d=new Bt,u=new z(new He(.9,.25),c);u.position.x=-.45,u.rotation.x=Math.PI/2;const p=new z(new He(.9,.25),c);p.position.x=.45,p.rotation.x=Math.PI/2,d.add(u,p),d.userData={angle:h/9*Math.PI*2,radius:36+h%3*26,height:24+h%4*5,speed:.14+h%3*.04,lWing:u,rWing:p},this.seagulls.push(d),this.group.add(d)}t.add(this.group)}spawnBurst(t,e,n,i,r=10,o=4.2,a=12){const l=new Ae({color:i});for(let c=0;c<r;c++){const h=new z(this.chipGeo,l);h.position.set(t,e,n);const d=.55+Math.random()*.9;h.scale.setScalar(d),this.group.add(h),this.particles.push({mesh:h,vx:(Math.random()-.5)*o*1.4,vy:1.5+Math.random()*o,vz:(Math.random()-.5)*o*1.4,life:.45+Math.random()*.45,maxLife:.9,gravity:a})}}spawnFallingTree(t,e,n){const i=new L(-n,0,e).normalize();this.group.add(t),this.fallingTrees.push({obj:t,axis:i,angle:0,speed:.35,life:1.65})}syncLootAll(t){for(const e of t)this.addLoot(e)}addLoot(t){if(this.lootMeshes.has(t.id))return;const n=Ue(t.itemId)?.accentColor??"#fbbf24",i=new Bt,r=new z(new yn(.28,0),new yt({color:n,emissive:n,emissiveIntensity:.45,roughness:.35})),o=new z(new xa(.24,.34,14),new Ae({color:n,side:Se,transparent:!0,opacity:.65}));o.rotation.x=-Math.PI/2,o.position.y=-.22,i.add(r,o),i.position.set(t.x,t.y+.3,t.z),i.traverse(a=>{a.userData.lootId=t.id,a.userData.lootItemId=t.itemId,a.userData.lootCount=t.count}),this.lootGroup.add(i),this.lootMeshes.set(t.id,{mesh:i,baseY:t.y+.32})}removeLoot(t){const e=this.lootMeshes.get(t);e&&(this.lootGroup.remove(e.mesh),this.lootMeshes.delete(t))}syncProjectiles(t){const e=new Set;for(const n of t){e.add(n.id);let i=this.projMeshes.get(n.id);if(!i){i=new Bt;const r=n.kind==="starlight_bolt",o=new z(new Ot(.025,.025,1.05,5),new Ae({color:r?"#38f2dc":"#e6d5b8"}));if(o.rotation.x=Math.PI/2,i.add(o),r){const a=new In("#38f2dc",2.2,7,2);i.add(a)}this.group.add(i),this.projMeshes.set(n.id,i)}i.position.set(n.x,n.y,n.z),i.lookAt(n.x+n.vx,n.y+n.vy,n.z+n.vz)}for(const[n,i]of Array.from(this.projMeshes.entries()))e.has(n)||(this.group.remove(i),this.projMeshes.delete(n))}update(t,e,n,i,r){for(let c=this.particles.length-1;c>=0;c--){const h=this.particles[c];if(h.life-=t,h.life<=0){this.group.remove(h.mesh),this.particles.splice(c,1);continue}h.vy-=h.gravity*t,h.mesh.position.x+=h.vx*t,h.mesh.position.y+=h.vy*t,h.mesh.position.z+=h.vz*t,h.mesh.rotation.x+=t*7,h.mesh.rotation.y+=t*5,h.mesh.scale.setScalar(Math.max(.05,h.life/h.maxLife))}if(this.campfireSmokeTimer-=t,this.campfireSmokeTimer<=0){this.campfireSmokeTimer=.18;for(const c of r)c.distanceTo(i)<42&&this.spawnBurst(c.x,c.y+.7,c.z,Math.random()>.4?"#ff9b30":"#94a3b8",1,.9,-1.8)}for(let c=this.fallingTrees.length-1;c>=0;c--){const h=this.fallingTrees[c];h.life-=t,h.speed+=t*2.8;const d=Math.min(Math.PI*.48-h.angle,h.speed*t);d>0&&(h.obj.rotateOnWorldAxis(h.axis,d),h.angle+=d),h.life<=0&&(this.spawnBurst(h.obj.position.x,h.obj.position.y+1.2,h.obj.position.z,"#5a8f41",12,5.2,9),this.group.remove(h.obj),this.fallingTrees.splice(c,1))}for(const c of this.lootMeshes.values())c.mesh.rotation.y=e*2.1,c.mesh.position.y=c.baseY+Math.sin(e*3.2+c.mesh.position.x)*.14;const o=n.weather==="storm"?.55*n.weatherIntensity:n.weather==="rain"?.36*n.weatherIntensity:0;if(this.rainMat.opacity=o,o>.02){this.rainLines.position.set(i.x,i.y,i.z);const c=this.rainLines.geometry.attributes.position;for(let h=0;h<c.count;h+=2){let d=c.getY(h)-t*26;d<-4&&(d=24),c.setY(h,d),c.setY(h+1,d-1.15)}c.needsUpdate=!0}const l=(n.timeOfDay<.24||n.timeOfDay>.76)&&o<.1?.85:0;this.fireflyMat.opacity+=(l-this.fireflyMat.opacity)*Math.min(1,t*1.5),this.fireflyMat.opacity>.02&&(this.fireflies.position.set(i.x,Math.max(1,i.y),i.z),this.fireflies.rotation.y=e*.08);for(const c of this.seagulls){const h=c.userData;h.angle+=h.speed*t,c.position.set(Math.cos(h.angle)*h.radius,h.height+Math.sin(e*1.5+h.radius)*1.4,Math.sin(h.angle)*h.radius),c.rotation.y=-h.angle;const d=Math.sin(e*7.5+h.radius)*.42;h.lWing.rotation.z=d,h.rWing.rotation.z=-d}}}class Vg{ctx=null;master=null;windGain=null;oceanGain=null;rainGain=null;fireGain=null;noiseBuffer=null;birdTimer=2.5;cricketTimer=.6;muted=!1;volume=.55;unlock(){if(this.ctx){this.ctx.state==="suspended"&&this.ctx.resume();return}const t=window.AudioContext||window.webkitAudioContext;if(!t)return;this.ctx=new t,this.master=this.ctx.createGain(),this.master.gain.value=this.muted?0:this.volume,this.master.connect(this.ctx.destination);const e=this.ctx.sampleRate*3;this.noiseBuffer=this.ctx.createBuffer(1,e,this.ctx.sampleRate);const n=this.noiseBuffer.getChannelData(0);let i=0,r=0,o=0;for(let a=0;a<e;a++){const l=Math.random()*2-1;i=.997*i+l*.029,r=.985*r+l*.032,o=.95*o+l*.048,n[a]=(i+r+o+l*.06)*1.8}this.windGain=this.createAmbientLoop("bandpass",420,.8,.04),this.oceanGain=this.createAmbientLoop("lowpass",320,.5,.02),this.rainGain=this.createAmbientLoop("bandpass",1650,.5,0),this.fireGain=this.createAmbientLoop("bandpass",920,1.4,0)}createAmbientLoop(t,e,n,i){if(!this.ctx||!this.master||!this.noiseBuffer)return null;const r=this.ctx.createBufferSource();r.buffer=this.noiseBuffer,r.loop=!0;const o=this.ctx.createBiquadFilter();o.type=t,o.frequency.value=e,o.Q.value=n;const a=this.ctx.createGain();return a.gain.value=i,r.connect(o),o.connect(a),a.connect(this.master),r.start(),a}setVolume(t){this.volume=Math.max(0,Math.min(1,t)),this.master&&this.ctx&&this.master.gain.setTargetAtTime(this.muted?0:this.volume,this.ctx.currentTime,.05)}setMuted(t){this.muted=t,this.master&&this.ctx&&this.master.gain.setTargetAtTime(this.muted?0:this.volume,this.ctx.currentTime,.05)}updateAmbient(t,e,n,i,r){if(!this.ctx||this.ctx.state!=="running")return;const o=this.ctx.currentTime;if(this.windGain){const c=.035+e.windSpeed*.032;this.windGain.gain.setTargetAtTime(c,o,.35)}if(this.oceanGain){const c=.72+Math.sin(o*.55)*.28,h=Math.max(.015,(1-Math.min(1,r/75))*.14)*c;this.oceanGain.gain.setTargetAtTime(h,o,.25)}if(this.rainGain){const c=e.weather==="storm"?.18*e.weatherIntensity:e.weather==="rain"?.11*e.weatherIntensity:0;this.rainGain.gain.setTargetAtTime(c,o,.4)}if(this.fireGain){const c=i<12?(1-i/12)*.11:0;this.fireGain.gain.setTargetAtTime(c,o,.2)}const a=e.timeOfDay<.23||e.timeOfDay>.78,l=e.weather==="storm"||e.weather==="rain";!a&&!l&&(n==="meadow"||n==="pine"||n==="marsh")&&(this.birdTimer-=t,this.birdTimer<=0&&(this.birdTimer=3.5+Math.random()*6.5,this.playBirdChirp())),a&&!l&&(this.cricketTimer-=t,this.cricketTimer<=0&&(this.cricketTimer=1.6+Math.random()*2.5,this.playCricket()))}playBirdChirp(){if(!this.ctx||!this.master)return;const t=this.ctx.currentTime,e=this.ctx.createOscillator(),n=this.ctx.createGain();e.type="sine";const i=2200+Math.random()*1400;e.frequency.setValueAtTime(i,t),e.frequency.exponentialRampToValueAtTime(i*1.35,t+.08),e.frequency.exponentialRampToValueAtTime(i*.9,t+.17),n.gain.setValueAtTime(1e-4,t),n.gain.linearRampToValueAtTime(.032,t+.03),n.gain.exponentialRampToValueAtTime(1e-4,t+.19),e.connect(n),n.connect(this.master),e.start(t),e.stop(t+.2)}playCricket(){if(!this.ctx||!this.master)return;const t=this.ctx.currentTime;for(let e=0;e<3;e++){const n=t+e*.075,i=this.ctx.createOscillator(),r=this.ctx.createGain();i.type="triangle",i.frequency.value=4150+e%2*120,r.gain.setValueAtTime(1e-4,n),r.gain.linearRampToValueAtTime(.014,n+.015),r.gain.exponentialRampToValueAtTime(1e-4,n+.055),i.connect(r),r.connect(this.master),i.start(n),i.stop(n+.06)}}playFootstep(t){if(!this.ctx||!this.master||!this.noiseBuffer)return;const e=this.ctx.currentTime,n=this.ctx.createBufferSource();n.buffer=this.noiseBuffer;const i=this.ctx.createBiquadFilter();i.type="bandpass",i.frequency.value=t==="stone"?1150:t==="water"?680:t==="sand"?920:520;const r=this.ctx.createGain();r.gain.setValueAtTime(t==="water"?.09:.055,e),r.gain.exponentialRampToValueAtTime(.001,e+(t==="water"?.18:.09)),n.connect(i),i.connect(r),r.connect(this.master),n.start(e,Math.random()*1.5,.2)}playSfx(t){if(!this.ctx||!this.master)return;const e=this.ctx.currentTime;t==="chop"?(this.tone("triangle",155,62,.12,.22),this.noiseBurst(750,.09,.14)):t==="mine"?(this.tone("sine",1480,920,.18,.15),this.tone("triangle",620,310,.11,.12),this.noiseBurst(2200,.08,.12)):t==="hit"?(this.tone("sawtooth",190,55,.14,.22),this.noiseBurst(450,.1,.16)):t==="arrow"?(this.tone("triangle",520,180,.15,.16),this.noiseBurst(1600,.14,.1)):t==="build"?(this.tone("triangle",260,140,.1,.18),setTimeout(()=>this.tone("sine",520,380,.12,.12),70)):t==="eat"?(this.noiseBurst(1100,.07,.12),setTimeout(()=>this.noiseBurst(950,.07,.11),95)):t==="drink"?(this.tone("sine",380,620,.12,.12),setTimeout(()=>this.tone("sine",420,690,.12,.11),130)):t==="thunder"?(this.noiseBurst(95,2.2,.45),this.tone("sawtooth",62,28,1.4,.18)):t==="levelup"?[440,554.37,659.25,880].forEach((i,r)=>{const o=this.ctx.createOscillator(),a=this.ctx.createGain();o.type="triangle",o.frequency.value=i;const l=e+r*.09;a.gain.setValueAtTime(.001,l),a.gain.linearRampToValueAtTime(.14,l+.02),a.gain.exponentialRampToValueAtTime(.001,l+.45),o.connect(a),a.connect(this.master),o.start(l),o.stop(l+.46)}):t==="ui"&&this.tone("sine",680,820,.045,.07)}tone(t,e,n,i,r){if(!this.ctx||!this.master)return;const o=this.ctx.currentTime,a=this.ctx.createOscillator(),l=this.ctx.createGain();a.type=t,a.frequency.setValueAtTime(e,o),a.frequency.exponentialRampToValueAtTime(Math.max(20,n),o+i),l.gain.setValueAtTime(r,o),l.gain.exponentialRampToValueAtTime(.001,o+i),a.connect(l),l.connect(this.master),a.start(o),a.stop(o+i+.02)}noiseBurst(t,e,n){if(!this.ctx||!this.master||!this.noiseBuffer)return;const i=this.ctx.currentTime,r=this.ctx.createBufferSource();r.buffer=this.noiseBuffer;const o=this.ctx.createBiquadFilter();o.type="lowpass",o.frequency.value=t;const a=this.ctx.createGain();a.gain.setValueAtTime(n,i),a.gain.exponentialRampToValueAtTime(.001,i+e),r.connect(o),o.connect(a),a.connect(this.master),r.start(i,Math.random()*1,e+.05)}}const wn=Object.create(null);wn.open="0";wn.close="1";wn.ping="2";wn.pong="3";wn.message="4";wn.upgrade="5";wn.noop="6";const ir=Object.create(null);Object.keys(wn).forEach(s=>{ir[wn[s]]=s});const ta={type:"error",data:"parser error"},Vc=typeof Blob=="function"||typeof Blob<"u"&&Object.prototype.toString.call(Blob)==="[object BlobConstructor]",Wc=typeof ArrayBuffer=="function",Xc=s=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(s):s&&s.buffer instanceof ArrayBuffer,Ea=({type:s,data:t},e,n)=>Vc&&t instanceof Blob?e?n(t):Kl(t,n):Wc&&(t instanceof ArrayBuffer||Xc(t))?e?n(t):Kl(new Blob([t]),n):n(wn[s]+(t||"")),Kl=(s,t)=>{const e=new FileReader;return e.onload=function(){const n=e.result.split(",")[1];t("b"+(n||""))},e.readAsDataURL(s)};function Zl(s){return s instanceof Uint8Array?s:s instanceof ArrayBuffer?new Uint8Array(s):new Uint8Array(s.buffer,s.byteOffset,s.byteLength)}let so;function Wg(s,t){if(Vc&&s.data instanceof Blob)return s.data.arrayBuffer().then(Zl).then(t);if(Wc&&(s.data instanceof ArrayBuffer||Xc(s.data)))return t(Zl(s.data));Ea(s,!1,e=>{so||(so=new TextEncoder),t(so.encode(e))})}const Jl="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",fs=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(let s=0;s<Jl.length;s++)fs[Jl.charCodeAt(s)]=s;const Xg=s=>{let t=s.length*.75,e=s.length,n,i=0,r,o,a,l;s[s.length-1]==="="&&(t--,s[s.length-2]==="="&&t--);const c=new ArrayBuffer(t),h=new Uint8Array(c);for(n=0;n<e;n+=4)r=fs[s.charCodeAt(n)],o=fs[s.charCodeAt(n+1)],a=fs[s.charCodeAt(n+2)],l=fs[s.charCodeAt(n+3)],h[i++]=r<<2|o>>4,h[i++]=(o&15)<<4|a>>2,h[i++]=(a&3)<<6|l&63;return c},qg=typeof ArrayBuffer=="function",Ta=(s,t)=>{if(typeof s!="string")return{type:"message",data:qc(s,t)};const e=s.charAt(0);return e==="b"?{type:"message",data:Yg(s.substring(1),t)}:ir[e]?s.length>1?{type:ir[e],data:s.substring(1)}:{type:ir[e]}:ta},Yg=(s,t)=>{if(qg){const e=Xg(s);return qc(e,t)}else return{base64:!0,data:s}},qc=(s,t)=>{switch(t){case"blob":return s instanceof Blob?s:new Blob([s]);case"arraybuffer":default:return s instanceof ArrayBuffer?s:s.buffer}},Yc="",$g=(s,t)=>{const e=s.length,n=new Array(e);let i=0;s.forEach((r,o)=>{Ea(r,!1,a=>{n[o]=a,++i===e&&t(n.join(Yc))})})},jg=(s,t)=>{const e=s.split(Yc),n=[];for(let i=0;i<e.length;i++){const r=Ta(e[i],t);if(n.push(r),r.type==="error")break}return n};function Kg(){return new TransformStream({transform(s,t){Wg(s,e=>{const n=e.length;let i;if(n<126)i=new Uint8Array(1),new DataView(i.buffer).setUint8(0,n);else if(n<65536){i=new Uint8Array(3);const r=new DataView(i.buffer);r.setUint8(0,126),r.setUint16(1,n)}else{i=new Uint8Array(9);const r=new DataView(i.buffer);r.setUint8(0,127),r.setBigUint64(1,BigInt(n))}s.data&&typeof s.data!="string"&&(i[0]|=128),t.enqueue(i),t.enqueue(e)})}})}let ro;function js(s){return s.reduce((t,e)=>t+e.length,0)}function Ks(s,t){if(s[0].length===t)return s.shift();const e=new Uint8Array(t);let n=0;for(let i=0;i<t;i++)e[i]=s[0][n++],n===s[0].length&&(s.shift(),n=0);return s.length&&n<s[0].length&&(s[0]=s[0].slice(n)),e}function Zg(s,t){ro||(ro=new TextDecoder);const e=[];let n=0,i=-1,r=!1;return new TransformStream({transform(o,a){for(e.push(o);;){if(n===0){if(js(e)<1)break;const l=Ks(e,1);r=(l[0]&128)===128,i=l[0]&127,i<126?n=3:i===126?n=1:n=2}else if(n===1){if(js(e)<2)break;const l=Ks(e,2);i=new DataView(l.buffer,l.byteOffset,l.length).getUint16(0),n=3}else if(n===2){if(js(e)<8)break;const l=Ks(e,8),c=new DataView(l.buffer,l.byteOffset,l.length),h=c.getUint32(0);if(h>Math.pow(2,21)-1){a.enqueue(ta);break}i=h*Math.pow(2,32)+c.getUint32(4),n=3}else{if(js(e)<i)break;const l=Ks(e,i);a.enqueue(Ta(r?l:ro.decode(l),t)),n=0}if(i===0||i>s){a.enqueue(ta);break}}}})}const $c=4;function ye(s){if(s)return Jg(s)}function Jg(s){for(var t in ye.prototype)s[t]=ye.prototype[t];return s}ye.prototype.on=ye.prototype.addEventListener=function(s,t){return this._callbacks=this._callbacks||{},(this._callbacks["$"+s]=this._callbacks["$"+s]||[]).push(t),this};ye.prototype.once=function(s,t){function e(){this.off(s,e),t.apply(this,arguments)}return e.fn=t,this.on(s,e),this};ye.prototype.off=ye.prototype.removeListener=ye.prototype.removeAllListeners=ye.prototype.removeEventListener=function(s,t){if(this._callbacks=this._callbacks||{},arguments.length==0)return this._callbacks={},this;var e=this._callbacks["$"+s];if(!e)return this;if(arguments.length==1)return delete this._callbacks["$"+s],this;for(var n,i=0;i<e.length;i++)if(n=e[i],n===t||n.fn===t){e.splice(i,1);break}return e.length===0&&delete this._callbacks["$"+s],this};ye.prototype.emit=function(s){this._callbacks=this._callbacks||{};for(var t=new Array(arguments.length-1),e=this._callbacks["$"+s],n=1;n<arguments.length;n++)t[n-1]=arguments[n];if(e){e=e.slice(0);for(var n=0,i=e.length;n<i;++n)e[n].apply(this,t)}return this};ye.prototype.emitReserved=ye.prototype.emit;ye.prototype.listeners=function(s){return this._callbacks=this._callbacks||{},this._callbacks["$"+s]||[]};ye.prototype.hasListeners=function(s){return!!this.listeners(s).length};const yr=typeof Promise=="function"&&typeof Promise.resolve=="function"?t=>Promise.resolve().then(t):(t,e)=>e(t,0),tn=typeof self<"u"?self:typeof window<"u"?window:Function("return this")(),Qg="arraybuffer";function jc(s,...t){return t.reduce((e,n)=>(s.hasOwnProperty(n)&&(e[n]=s[n]),e),{})}const t0=tn.setTimeout,e0=tn.clearTimeout;function xr(s,t){t.useNativeTimers?(s.setTimeoutFn=t0.bind(tn),s.clearTimeoutFn=e0.bind(tn)):(s.setTimeoutFn=tn.setTimeout.bind(tn),s.clearTimeoutFn=tn.clearTimeout.bind(tn))}const n0=1.33;function i0(s){return typeof s=="string"?s0(s):Math.ceil((s.byteLength||s.size)*n0)}function s0(s){let t=0,e=0;for(let n=0,i=s.length;n<i;n++)t=s.charCodeAt(n),t<128?e+=1:t<2048?e+=2:t<55296||t>=57344?e+=3:(n++,e+=4);return e}function Kc(){return Date.now().toString(36).substring(3)+Math.random().toString(36).substring(2,5)}function r0(s){let t="";for(let e in s)s.hasOwnProperty(e)&&(t.length&&(t+="&"),t+=encodeURIComponent(e)+"="+encodeURIComponent(s[e]));return t}function o0(s){let t={},e=s.split("&");for(let n=0,i=e.length;n<i;n++){let r=e[n].split("=");t[decodeURIComponent(r[0])]=decodeURIComponent(r.slice(1).join("="))}return t}class a0 extends Error{constructor(t,e,n){super(t),this.description=e,this.context=n,this.type="TransportError"}}class Aa extends ye{constructor(t){super(),this.writable=!1,xr(this,t),this.opts=t,this.query=t.query,this.socket=t.socket,this.supportsBinary=!t.forceBase64}onError(t,e,n){return super.emitReserved("error",new a0(t,e,n)),this}open(){return this.readyState="opening",this.doOpen(),this}close(){return(this.readyState==="opening"||this.readyState==="open")&&(this.doClose(),this.onClose()),this}send(t){this.readyState==="open"&&this.write(t)}onOpen(){this.readyState="open",this.writable=!0,super.emitReserved("open")}onData(t){const e=Ta(t,this.socket.binaryType);this.onPacket(e)}onPacket(t){super.emitReserved("packet",t)}onClose(t){this.readyState="closed",super.emitReserved("close",t)}pause(t){}createUri(t,e={}){return t+"://"+this._hostname()+this._port()+this.opts.path+this._query(e)}_hostname(){const t=this.opts.hostname;return t.indexOf(":")===-1?t:"["+t+"]"}_port(){return this.opts.port&&(this.opts.secure&&Number(this.opts.port)!==443||!this.opts.secure&&Number(this.opts.port)!==80)?":"+this.opts.port:""}_query(t){const e=r0(t);return e.length?"?"+e:""}}class l0 extends Aa{constructor(){super(...arguments),this._polling=!1}get name(){return"polling"}doOpen(){this._poll()}pause(t){this.readyState="pausing";const e=()=>{this.readyState="paused",t()};if(this._polling||!this.writable){let n=0;this._polling&&(n++,this.once("pollComplete",function(){--n||e()})),this.writable||(n++,this.once("drain",function(){--n||e()}))}else e()}_poll(){this._polling=!0,this.doPoll(),this.emitReserved("poll")}onData(t){const e=n=>{if(this.readyState==="opening"&&n.type==="open"&&this.onOpen(),n.type==="close")return this.onClose({description:"transport closed by the server"}),!1;this.onPacket(n)};jg(t,this.socket.binaryType).forEach(e),this.readyState!=="closed"&&(this._polling=!1,this.emitReserved("pollComplete"),this.readyState==="open"&&this._poll())}doClose(){const t=()=>{this.write([{type:"close"}])};this.readyState==="open"?t():this.once("open",t)}write(t){this.writable=!1,$g(t,e=>{this.doWrite(e,()=>{this.writable=!0,this.emitReserved("drain")})})}uri(){const t=this.opts.secure?"https":"http",e=this.query||{};return this.opts.timestampRequests!==!1&&(e[this.opts.timestampParam]=Kc()),!this.supportsBinary&&!e.sid&&(e.b64=1),this.createUri(t,e)}}let Zc=!1;try{Zc=typeof XMLHttpRequest<"u"&&"withCredentials"in new XMLHttpRequest}catch{}const c0=Zc;function h0(){}class d0 extends l0{constructor(t){if(super(t),typeof location<"u"){const e=location.protocol==="https:";let n=location.port;n||(n=e?"443":"80"),this.xd=typeof location<"u"&&t.hostname!==location.hostname||n!==t.port}}doWrite(t,e){const n=this.request({method:"POST",data:t});n.on("success",e),n.on("error",(i,r)=>{this.onError("xhr post error",i,r)})}doPoll(){const t=this.request();t.on("data",this.onData.bind(this)),t.on("error",(e,n)=>{this.onError("xhr poll error",e,n)}),this.pollXhr=t}}class xn extends ye{constructor(t,e,n){super(),this.createRequest=t,xr(this,n),this._opts=n,this._method=n.method||"GET",this._uri=e,this._data=n.data!==void 0?n.data:null,this._create()}_create(){var t;const e=jc(this._opts,"agent","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","autoUnref");e.xdomain=!!this._opts.xd;const n=this._xhr=this.createRequest(e);try{n.open(this._method,this._uri,!0);try{if(this._opts.extraHeaders){n.setDisableHeaderCheck&&n.setDisableHeaderCheck(!0);for(let i in this._opts.extraHeaders)this._opts.extraHeaders.hasOwnProperty(i)&&n.setRequestHeader(i,this._opts.extraHeaders[i])}}catch{}if(this._method==="POST")try{n.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch{}try{n.setRequestHeader("Accept","*/*")}catch{}(t=this._opts.cookieJar)===null||t===void 0||t.addCookies(n),"withCredentials"in n&&(n.withCredentials=this._opts.withCredentials),this._opts.requestTimeout&&(n.timeout=this._opts.requestTimeout),n.onreadystatechange=()=>{var i;n.readyState===3&&((i=this._opts.cookieJar)===null||i===void 0||i.parseCookies(n.getResponseHeader("set-cookie"))),n.readyState===4&&(n.status===200||n.status===1223?this._onLoad():this.setTimeoutFn(()=>{this._onError(typeof n.status=="number"?n.status:0)},0))},n.send(this._data)}catch(i){this.setTimeoutFn(()=>{this._onError(i)},0);return}typeof document<"u"&&(this._index=xn.requestsCount++,xn.requests[this._index]=this)}_onError(t){this.emitReserved("error",t,this._xhr),this._cleanup(!0)}_cleanup(t){if(!(typeof this._xhr>"u"||this._xhr===null)){if(this._xhr.onreadystatechange=h0,t)try{this._xhr.abort()}catch{}typeof document<"u"&&delete xn.requests[this._index],this._xhr=null}}_onLoad(){const t=this._xhr.responseText;t!==null&&(this.emitReserved("data",t),this.emitReserved("success"),this._cleanup())}abort(){this._cleanup()}}xn.requestsCount=0;xn.requests={};if(typeof document<"u"){if(typeof attachEvent=="function")attachEvent("onunload",Ql);else if(typeof addEventListener=="function"){const s="onpagehide"in tn?"pagehide":"unload";addEventListener(s,Ql,!1)}}function Ql(){for(let s in xn.requests)xn.requests.hasOwnProperty(s)&&xn.requests[s].abort()}const u0=(function(){const s=Jc({xdomain:!1});return s&&s.responseType!==null})();class f0 extends d0{constructor(t){super(t);const e=t&&t.forceBase64;this.supportsBinary=u0&&!e}request(t={}){return Object.assign(t,{xd:this.xd},this.opts),new xn(Jc,this.uri(),t)}}function Jc(s){const t=s.xdomain;try{if(typeof XMLHttpRequest<"u"&&(!t||c0))return new XMLHttpRequest}catch{}if(!t)try{return new tn[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP")}catch{}}const Qc=typeof navigator<"u"&&typeof navigator.product=="string"&&navigator.product.toLowerCase()==="reactnative";class p0 extends Aa{get name(){return"websocket"}doOpen(){const t=this.uri(),e=this.opts.protocols,n=Qc?{}:jc(this.opts,"agent","perMessageDeflate","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","localAddress","protocolVersion","origin","maxPayload","family","checkServerIdentity");this.opts.extraHeaders&&(n.headers=this.opts.extraHeaders);try{this.ws=this.createSocket(t,e,n)}catch(i){return this.emitReserved("error",i)}this.ws.binaryType=this.socket.binaryType,this.addEventListeners()}addEventListeners(){this.ws.onopen=()=>{this.opts.autoUnref&&this.ws._socket.unref(),this.onOpen()},this.ws.onclose=t=>this.onClose({description:"websocket connection closed",context:t}),this.ws.onmessage=t=>this.onData(t.data),this.ws.onerror=t=>this.onError("websocket error",t)}write(t){this.writable=!1;for(let e=0;e<t.length;e++){const n=t[e],i=e===t.length-1;Ea(n,this.supportsBinary,r=>{try{this.doWrite(n,r)}catch{}i&&yr(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){typeof this.ws<"u"&&(this.ws.onerror=()=>{},this.ws.close(),this.ws=null)}uri(){const t=this.opts.secure?"wss":"ws",e=this.query||{};return this.opts.timestampRequests&&(e[this.opts.timestampParam]=Kc()),this.supportsBinary||(e.b64=1),this.createUri(t,e)}}const oo=tn.WebSocket||tn.MozWebSocket;class m0 extends p0{createSocket(t,e,n){return Qc?new oo(t,e,n):e?new oo(t,e):new oo(t)}doWrite(t,e){this.ws.send(e)}}class g0 extends Aa{get name(){return"webtransport"}doOpen(){try{this._transport=new WebTransport(this.createUri("https"),this.opts.transportOptions[this.name])}catch(t){return this.emitReserved("error",t)}this._transport.closed.then(()=>{this.onClose()}).catch(t=>{this.onError("webtransport error",t)}),this._transport.ready.then(()=>{this._transport.createBidirectionalStream().then(t=>{const e=Zg(Number.MAX_SAFE_INTEGER,this.socket.binaryType),n=t.readable.pipeThrough(e).getReader(),i=Kg();i.readable.pipeTo(t.writable),this._writer=i.writable.getWriter();const r=()=>{n.read().then(({done:a,value:l})=>{a||(this.onPacket(l),r())}).catch(a=>{})};r();const o={type:"open"};this.query.sid&&(o.data=`{"sid":"${this.query.sid}"}`),this._writer.write(o).then(()=>this.onOpen())})})}write(t){this.writable=!1;for(let e=0;e<t.length;e++){const n=t[e],i=e===t.length-1;this._writer.write(n).then(()=>{i&&yr(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){var t;(t=this._transport)===null||t===void 0||t.close()}}const _0={websocket:m0,webtransport:g0,polling:f0},v0=/^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,y0=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];function ea(s){if(s.length>8e3)throw"URI too long";const t=s,e=s.indexOf("["),n=s.indexOf("]");e!=-1&&n!=-1&&(s=s.substring(0,e)+s.substring(e,n).replace(/:/g,";")+s.substring(n,s.length));let i=v0.exec(s||""),r={},o=14;for(;o--;)r[y0[o]]=i[o]||"";return e!=-1&&n!=-1&&(r.source=t,r.host=r.host.substring(1,r.host.length-1).replace(/;/g,":"),r.authority=r.authority.replace("[","").replace("]","").replace(/;/g,":"),r.ipv6uri=!0),r.pathNames=x0(r,r.path),r.queryKey=M0(r,r.query),r}function x0(s,t){const e=/\/{2,9}/g,n=t.replace(e,"/").split("/");return(t.slice(0,1)=="/"||t.length===0)&&n.splice(0,1),t.slice(-1)=="/"&&n.splice(n.length-1,1),n}function M0(s,t){const e={};return t.replace(/(?:^|&)([^&=]*)=?([^&]*)/g,function(n,i,r){i&&(e[i]=r)}),e}const na=typeof addEventListener=="function"&&typeof removeEventListener=="function",sr=[];na&&addEventListener("offline",()=>{sr.forEach(s=>s())},!1);let th=class Ui extends ye{constructor(t,e={}){var n,i;if(super(),this.binaryType=Qg,this.writeBuffer=[],this._prevBufferLen=0,this._upgrades=[],this._pingInterval=-1,this._pingTimeout=-1,this._maxPayload=-1,this._pingTimeoutTime=1/0,t&&typeof t=="object"&&(e=t,t=null),t){const r=ea(t);e.hostname=r.host,e.secure=r.protocol==="https"||r.protocol==="wss",e.port=r.port,r.query&&(e.query=r.query)}else e.host&&(e.hostname=ea(e.host).host);if(xr(this,e),this.secure=e.secure!=null?e.secure:typeof location<"u"&&location.protocol==="https:",e.hostname&&!e.port&&(e.port=this.secure?"443":"80"),this.hostname=e.hostname||(typeof location<"u"?location.hostname:"localhost"),this.port=e.port||(typeof location<"u"&&location.port?location.port:this.secure?"443":"80"),e.transportImplementations&&e.transports)throw new Error("specifying both 'transportImplementations' and 'transports' options is not supported");e.transportImplementations||!((n=e.transports)===null||n===void 0)&&n.length&&typeof e.transports[0]=="function"?(this.transports=[],this._transportsByName=Object.create(null),((i=e.transportImplementations)!==null&&i!==void 0?i:e.transports).forEach(r=>{const o=r.prototype.name;this.transports.push(o),this._transportsByName[o]=r})):(this.transports=e.transports?[...e.transports]:["polling","websocket","webtransport"],this._transportsByName=_0),this.opts=Object.assign({path:"/engine.io",agent:!1,withCredentials:!1,upgrade:!0,timestampParam:"t",rememberUpgrade:!1,addTrailingSlash:!0,rejectUnauthorized:!0,perMessageDeflate:{threshold:1024},transportOptions:{},closeOnBeforeunload:!1},e),this.opts.path=this.opts.path.replace(/\/$/,"")+(this.opts.addTrailingSlash?"/":""),typeof this.opts.query=="string"&&(this.opts.query=o0(this.opts.query)),na&&(this.opts.closeOnBeforeunload&&(this._beforeunloadEventListener=()=>{this.transport&&(this.transport.removeAllListeners(),this.transport.close())},addEventListener("beforeunload",this._beforeunloadEventListener,!1)),this.hostname!=="localhost"&&(this._offlineEventListener=()=>{this._onClose("transport close",{description:"network connection lost"})},sr.push(this._offlineEventListener))),this.opts.withCredentials&&(this._cookieJar=void 0),this._open()}createTransport(t){const e=Object.assign({},this.opts.query);e.EIO=$c,e.transport=t,this.id&&(e.sid=this.id);const n=Object.assign({},this.opts,{query:e,socket:this,hostname:this.hostname,secure:this.secure,port:this.port},this.opts.transportOptions[t]);return new this._transportsByName[t](n)}_open(){if(this.transports.length===0){this.setTimeoutFn(()=>{this.emitReserved("error","No transports available")},0);return}const t=this.opts.rememberUpgrade&&Ui.priorWebsocketSuccess&&this.transports.indexOf("websocket")!==-1?"websocket":this.transports[0];this.readyState="opening";const e=this.createTransport(t);e.open(),this.setTransport(e)}setTransport(t){this.transport&&this.transport.removeAllListeners(),this.transport=t,t.on("drain",this._onDrain.bind(this)).on("packet",this._onPacket.bind(this)).on("error",this._onError.bind(this)).on("close",e=>this._onClose("transport close",e))}_probe(t){let e=this.createTransport(t),n=!1;Ui.priorWebsocketSuccess=!1;const i=()=>{n||(e.send([{type:"ping",data:"probe"}]),e.once("packet",d=>{if(!n)if(d.type==="pong"&&d.data==="probe"){if(this.upgrading=!0,this.emitReserved("upgrading",e),!e)return;Ui.priorWebsocketSuccess=e.name==="websocket",this.transport.pause(()=>{n||this.readyState!=="closed"&&(h(),this.setTransport(e),e.send([{type:"upgrade"}]),this.emitReserved("upgrade",e),e=null,this.upgrading=!1,this.flush())})}else{const u=new Error("probe error");u.transport=e.name,this.emitReserved("upgradeError",u)}}))};function r(){n||(n=!0,h(),e.close(),e=null)}const o=d=>{const u=new Error("probe error: "+d);u.transport=e.name,r(),this.emitReserved("upgradeError",u)};function a(){o("transport closed")}function l(){o("socket closed")}function c(d){e&&d.name!==e.name&&r()}const h=()=>{e.removeListener("open",i),e.removeListener("error",o),e.removeListener("close",a),this.off("close",l),this.off("upgrading",c)};e.once("open",i),e.once("error",o),e.once("close",a),this.once("close",l),this.once("upgrading",c),this._upgrades.indexOf("webtransport")!==-1&&t!=="webtransport"?this.setTimeoutFn(()=>{n||e.open()},200):e.open()}onOpen(){if(this.readyState="open",Ui.priorWebsocketSuccess=this.transport.name==="websocket",this.emitReserved("open"),this.flush(),this.readyState==="open"&&this.opts.upgrade)for(let t=0;t<this._upgrades.length;t++)this._probe(this._upgrades[t])}_onPacket(t){if(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing")switch(this.emitReserved("packet",t),this.emitReserved("heartbeat"),t.type){case"open":this.onHandshake(JSON.parse(t.data));break;case"ping":this._sendPacket("pong"),this.emitReserved("ping"),this.emitReserved("pong"),this._resetPingTimeout();break;case"error":const e=new Error("server error");e.code=t.data,this._onError(e);break;case"message":this.emitReserved("data",t.data),this.emitReserved("message",t.data);break}}onHandshake(t){this.emitReserved("handshake",t),this.id=t.sid,this.transport.query.sid=t.sid,this._upgrades=this._filterUpgrades(t.upgrades),this._pingInterval=t.pingInterval,this._pingTimeout=t.pingTimeout,this._maxPayload=t.maxPayload,this.onOpen(),this.readyState!=="closed"&&this._resetPingTimeout()}_resetPingTimeout(){this.clearTimeoutFn(this._pingTimeoutTimer);const t=this._pingInterval+this._pingTimeout;this._pingTimeoutTime=Date.now()+t,this._pingTimeoutTimer=this.setTimeoutFn(()=>{this._onClose("ping timeout")},t),this.opts.autoUnref&&this._pingTimeoutTimer.unref()}_onDrain(){this.writeBuffer.splice(0,this._prevBufferLen),this._prevBufferLen=0,this.writeBuffer.length===0?this.emitReserved("drain"):this.flush()}flush(){if(this.readyState!=="closed"&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length){const t=this._getWritablePackets();this.transport.send(t),this._prevBufferLen=t.length,this.emitReserved("flush")}}_getWritablePackets(){if(!(this._maxPayload&&this.transport.name==="polling"&&this.writeBuffer.length>1))return this.writeBuffer;let e=1;for(let n=0;n<this.writeBuffer.length;n++){const i=this.writeBuffer[n].data;if(i&&(e+=i0(i)),n>0&&e>this._maxPayload)return this.writeBuffer.slice(0,n);e+=2}return this.writeBuffer}_hasPingExpired(){if(!this._pingTimeoutTime)return!0;const t=Date.now()>this._pingTimeoutTime;return t&&(this._pingTimeoutTime=0,yr(()=>{this._onClose("ping timeout")},this.setTimeoutFn)),t}write(t,e,n){return this._sendPacket("message",t,e,n),this}send(t,e,n){return this._sendPacket("message",t,e,n),this}_sendPacket(t,e,n,i){if(typeof e=="function"&&(i=e,e=void 0),typeof n=="function"&&(i=n,n=null),this.readyState==="closing"||this.readyState==="closed")return;n=n||{},n.compress=n.compress!==!1;const r={type:t,data:e,options:n};this.emitReserved("packetCreate",r),this.writeBuffer.push(r),i&&this.once("flush",i),this.flush()}close(){const t=()=>{this._onClose("forced close"),this.transport.close()},e=()=>{this.off("upgrade",e),this.off("upgradeError",e),t()},n=()=>{this.once("upgrade",e),this.once("upgradeError",e)};return(this.readyState==="opening"||this.readyState==="open")&&(this.readyState="closing",this.writeBuffer.length?this.once("drain",()=>{this.upgrading?n():t()}):this.upgrading?n():t()),this}_onError(t){if(Ui.priorWebsocketSuccess=!1,this.opts.tryAllTransports&&this.transports.length>1&&this.readyState==="opening")return this.transports.shift(),this._open();this.emitReserved("error",t),this._onClose("transport error",t)}_onClose(t,e){if(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing"){if(this.clearTimeoutFn(this._pingTimeoutTimer),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),na&&(this._beforeunloadEventListener&&removeEventListener("beforeunload",this._beforeunloadEventListener,!1),this._offlineEventListener)){const n=sr.indexOf(this._offlineEventListener);n!==-1&&sr.splice(n,1)}this.readyState="closed",this.id=null,this.emitReserved("close",t,e),this.writeBuffer=[],this._prevBufferLen=0}}_filterUpgrades(t){const e=[];for(let n=0;n<t.length;n++)~this.transports.indexOf(t[n])&&e.push(t[n]);return e}};th.protocol=$c;function w0(s,t="",e){let n=s;e=e||typeof location<"u"&&location,s==null&&(s=e.protocol+"//"+e.host),typeof s=="string"&&(s.charAt(0)==="/"&&(s.charAt(1)==="/"?s=e.protocol+s:s=e.host+s),/^(https?|wss?):\/\//.test(s)||(typeof e<"u"?s=e.protocol+"//"+s:s="https://"+s),n=ea(s)),n.port||(/^(http|ws)$/.test(n.protocol)?n.port="80":/^(http|ws)s$/.test(n.protocol)&&(n.port="443")),n.path=n.path||"/";const r=n.host.indexOf(":")!==-1?"["+n.host+"]":n.host;return n.id=n.protocol+"://"+r+":"+n.port+t,n.href=n.protocol+"://"+r+(e&&e.port===n.port?"":":"+n.port),n}const S0=typeof ArrayBuffer=="function",b0=s=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(s):s.buffer instanceof ArrayBuffer,eh=Object.prototype.toString,E0=typeof Blob=="function"||typeof Blob<"u"&&eh.call(Blob)==="[object BlobConstructor]",T0=typeof File=="function"||typeof File<"u"&&eh.call(File)==="[object FileConstructor]";function Ca(s){return S0&&(s instanceof ArrayBuffer||b0(s))||E0&&s instanceof Blob||T0&&s instanceof File}function rr(s,t){if(!s||typeof s!="object")return!1;if(Array.isArray(s)){for(let e=0,n=s.length;e<n;e++)if(rr(s[e]))return!0;return!1}if(Ca(s))return!0;if(s.toJSON&&typeof s.toJSON=="function"&&arguments.length===1)return rr(s.toJSON(),!0);for(const e in s)if(Object.prototype.hasOwnProperty.call(s,e)&&rr(s[e]))return!0;return!1}function A0(s){const t=[],e=s.data,n=s;return n.data=or(e,t),n.attachments=t.length,{packet:n,buffers:t}}function or(s,t,e){if(!s)return s;if(Ca(s)){const n={_placeholder:!0,num:t.length};return t.push(s),n}else if(Array.isArray(s)){const n=new Array(s.length);for(let i=0;i<s.length;i++)n[i]=or(s[i],t);return n}else if(typeof s=="object"&&!(s instanceof Date)){if(s.toJSON&&typeof s.toJSON=="function"&&!e)return or(s.toJSON(),t,!0);const n={};for(const i in s)Object.prototype.hasOwnProperty.call(s,i)&&(n[i]=or(s[i],t));return n}return s}function C0(s,t){return s.data=ia(s.data,t),delete s.attachments,s}function ia(s,t){if(!s)return s;if(s&&s._placeholder===!0){if(typeof s.num=="number"&&s.num>=0&&s.num<t.length)return t[s.num];throw new Error("illegal attachments")}else if(Array.isArray(s))for(let e=0;e<s.length;e++)s[e]=ia(s[e],t);else if(typeof s=="object")for(const e in s)Object.prototype.hasOwnProperty.call(s,e)&&(s[e]=ia(s[e],t));return s}const R0=["connect","connect_error","disconnect","disconnecting","newListener","removeListener"];var zt;(function(s){s[s.CONNECT=0]="CONNECT",s[s.DISCONNECT=1]="DISCONNECT",s[s.EVENT=2]="EVENT",s[s.ACK=3]="ACK",s[s.CONNECT_ERROR=4]="CONNECT_ERROR",s[s.BINARY_EVENT=5]="BINARY_EVENT",s[s.BINARY_ACK=6]="BINARY_ACK"})(zt||(zt={}));class I0{constructor(t){this.replacer=t}encode(t){return(t.type===zt.EVENT||t.type===zt.ACK)&&rr(t)?this.encodeAsBinary({type:t.type===zt.EVENT?zt.BINARY_EVENT:zt.BINARY_ACK,nsp:t.nsp,data:t.data,id:t.id}):[this.encodeAsString(t)]}encodeAsString(t){let e=""+t.type;return(t.type===zt.BINARY_EVENT||t.type===zt.BINARY_ACK)&&(e+=t.attachments+"-"),t.nsp&&t.nsp!=="/"&&(e+=t.nsp+","),t.id!=null&&(e+=t.id),t.data!=null&&(e+=JSON.stringify(t.data,this.replacer)),e}encodeAsBinary(t){const e=A0(t),n=this.encodeAsString(e.packet),i=e.buffers;return i.unshift(n),i}}class Ra extends ye{constructor(t){super(),this.opts=Object.assign({reviver:void 0,maxAttachments:10},typeof t=="function"?{reviver:t}:t)}add(t){let e;if(typeof t=="string"){if(this.reconstructor)throw new Error("got plaintext data when reconstructing a packet");e=this.decodeString(t);const n=e.type===zt.BINARY_EVENT;n||e.type===zt.BINARY_ACK?(e.type=n?zt.EVENT:zt.ACK,this.reconstructor=new P0(e)):super.emitReserved("decoded",e)}else if(Ca(t)||t.base64)if(this.reconstructor)e=this.reconstructor.takeBinaryData(t),e&&(this.reconstructor=null,super.emitReserved("decoded",e));else throw new Error("got binary data when not reconstructing a packet");else throw new Error("Unknown type: "+t)}decodeString(t){let e=0;const n={type:Number(t.charAt(0))};if(zt[n.type]===void 0)throw new Error("unknown packet type "+n.type);if(n.type===zt.BINARY_EVENT||n.type===zt.BINARY_ACK){const r=e+1;for(;t.charAt(++e)!=="-"&&e!=t.length;);const o=t.substring(r,e);if(o!=Number(o)||t.charAt(e)!=="-")throw new Error("Illegal attachments");const a=Number(o);if(!L0(a)||a<1)throw new Error("Illegal attachments");if(a>this.opts.maxAttachments)throw new Error("too many attachments");n.attachments=a}if(t.charAt(e+1)==="/"){const r=e+1;for(;++e&&!(t.charAt(e)===","||e===t.length););n.nsp=t.substring(r,e)}else n.nsp="/";const i=t.charAt(e+1);if(i!==""&&Number(i)==i){const r=e+1;for(;++e;){const o=t.charAt(e);if(o==null||Number(o)!=o){--e;break}if(e===t.length)break}n.id=Number(t.substring(r,e+1))}if(t.charAt(++e)){const r=this.tryParse(t.substr(e));if(Ra.isPayloadValid(n.type,r))n.data=r;else throw new Error("invalid payload")}return n}tryParse(t){try{return JSON.parse(t,this.opts.reviver)}catch{return!1}}static isPayloadValid(t,e){switch(t){case zt.CONNECT:return tc(e);case zt.DISCONNECT:return e===void 0;case zt.CONNECT_ERROR:return typeof e=="string"||tc(e);case zt.EVENT:case zt.BINARY_EVENT:return Array.isArray(e)&&(typeof e[0]=="number"||typeof e[0]=="string"&&R0.indexOf(e[0])===-1);case zt.ACK:case zt.BINARY_ACK:return Array.isArray(e)}}destroy(){this.reconstructor&&(this.reconstructor.finishedReconstruction(),this.reconstructor=null)}}class P0{constructor(t){this.packet=t,this.buffers=[],this.reconPack=t}takeBinaryData(t){if(this.buffers.push(t),this.buffers.length===this.reconPack.attachments){const e=C0(this.reconPack,this.buffers);return this.finishedReconstruction(),e}return null}finishedReconstruction(){this.reconPack=null,this.buffers=[]}}const L0=Number.isInteger||function(s){return typeof s=="number"&&isFinite(s)&&Math.floor(s)===s};function tc(s){return Object.prototype.toString.call(s)==="[object Object]"}const D0=Object.freeze(Object.defineProperty({__proto__:null,Decoder:Ra,Encoder:I0,get PacketType(){return zt}},Symbol.toStringTag,{value:"Module"}));function pn(s,t,e){return s.on(t,e),function(){s.off(t,e)}}const U0=Object.freeze({connect:1,connect_error:1,disconnect:1,disconnecting:1,newListener:1,removeListener:1});class nh extends ye{constructor(t,e,n){super(),this.connected=!1,this.recovered=!1,this.receiveBuffer=[],this.sendBuffer=[],this._queue=[],this._queueSeq=0,this.ids=0,this.acks={},this.flags={},this.io=t,this.nsp=e,n&&n.auth&&(this.auth=n.auth),this._opts=Object.assign({},n),this.io._autoConnect&&this.open()}get disconnected(){return!this.connected}subEvents(){if(this.subs)return;const t=this.io;this.subs=[pn(t,"open",this.onopen.bind(this)),pn(t,"packet",this.onpacket.bind(this)),pn(t,"error",this.onerror.bind(this)),pn(t,"close",this.onclose.bind(this))]}get active(){return!!this.subs}connect(){return this.connected?this:(this.subEvents(),this.io._reconnecting||this.io.open(),this.io._readyState==="open"&&this.onopen(),this)}open(){return this.connect()}send(...t){return t.unshift("message"),this.emit.apply(this,t),this}emit(t,...e){var n,i,r;if(U0.hasOwnProperty(t))throw new Error('"'+t.toString()+'" is a reserved event name');if(e.unshift(t),this._opts.retries&&!this.flags.fromQueue&&!this.flags.volatile)return this._addToQueue(e),this;const o={type:zt.EVENT,data:e};if(o.options={},o.options.compress=this.flags.compress!==!1,typeof e[e.length-1]=="function"){const h=this.ids++,d=e.pop();this._registerAckCallback(h,d),o.id=h}const a=(i=(n=this.io.engine)===null||n===void 0?void 0:n.transport)===null||i===void 0?void 0:i.writable,l=this.connected&&!(!((r=this.io.engine)===null||r===void 0)&&r._hasPingExpired());return this.flags.volatile&&!a||(l?(this.notifyOutgoingListeners(o),this.packet(o)):this.sendBuffer.push(o)),this.flags={},this}_registerAckCallback(t,e){var n;const i=(n=this.flags.timeout)!==null&&n!==void 0?n:this._opts.ackTimeout;if(i===void 0){this.acks[t]=e;return}const r=this.io.setTimeoutFn(()=>{delete this.acks[t];for(let a=0;a<this.sendBuffer.length;a++)this.sendBuffer[a].id===t&&this.sendBuffer.splice(a,1);e.call(this,new Error("operation has timed out"))},i),o=(...a)=>{this.io.clearTimeoutFn(r),e.apply(this,a)};o.withError=!0,this.acks[t]=o}emitWithAck(t,...e){return new Promise((n,i)=>{const r=(o,a)=>o?i(o):n(a);r.withError=!0,e.push(r),this.emit(t,...e)})}_addToQueue(t){let e;typeof t[t.length-1]=="function"&&(e=t.pop());const n={id:this._queueSeq++,tryCount:0,pending:!1,args:t,flags:Object.assign({fromQueue:!0},this.flags)};t.push((i,...r)=>(this._queue[0],i!==null?n.tryCount>this._opts.retries&&(this._queue.shift(),e&&e(i)):(this._queue.shift(),e&&e(null,...r)),n.pending=!1,this._drainQueue())),this._queue.push(n),this._drainQueue()}_drainQueue(t=!1){if(!this.connected||this._queue.length===0)return;const e=this._queue[0];e.pending&&!t||(e.pending=!0,e.tryCount++,this.flags=e.flags,this.emit.apply(this,e.args))}packet(t){t.nsp=this.nsp,this.io._packet(t)}onopen(){typeof this.auth=="function"?this.auth(t=>{this._sendConnectPacket(t)}):this._sendConnectPacket(this.auth)}_sendConnectPacket(t){this.packet({type:zt.CONNECT,data:this._pid?Object.assign({pid:this._pid,offset:this._lastOffset},t):t})}onerror(t){this.connected||this.emitReserved("connect_error",t)}onclose(t,e){this.connected=!1,delete this.id,this.emitReserved("disconnect",t,e),this._clearAcks()}_clearAcks(){Object.keys(this.acks).forEach(t=>{if(!this.sendBuffer.some(n=>String(n.id)===t)){const n=this.acks[t];delete this.acks[t],n.withError&&n.call(this,new Error("socket has been disconnected"))}})}onpacket(t){if(t.nsp===this.nsp)switch(t.type){case zt.CONNECT:t.data&&t.data.sid?this.onconnect(t.data.sid,t.data.pid):this.emitReserved("connect_error",new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));break;case zt.EVENT:case zt.BINARY_EVENT:this.onevent(t);break;case zt.ACK:case zt.BINARY_ACK:this.onack(t);break;case zt.DISCONNECT:this.ondisconnect();break;case zt.CONNECT_ERROR:this.destroy();const n=new Error(t.data.message);n.data=t.data.data,this.emitReserved("connect_error",n);break}}onevent(t){const e=t.data||[];t.id!=null&&e.push(this.ack(t.id)),this.connected?this.emitEvent(e):this.receiveBuffer.push(Object.freeze(e))}emitEvent(t){if(this._anyListeners&&this._anyListeners.length){const e=this._anyListeners.slice();for(const n of e)n.apply(this,t)}super.emit.apply(this,t),this._pid&&t.length&&typeof t[t.length-1]=="string"&&(this._lastOffset=t[t.length-1])}ack(t){const e=this;let n=!1;return function(...i){n||(n=!0,e.packet({type:zt.ACK,id:t,data:i}))}}onack(t){const e=this.acks[t.id];typeof e=="function"&&(delete this.acks[t.id],e.withError&&t.data.unshift(null),e.apply(this,t.data))}onconnect(t,e){this.id=t,this.recovered=e&&this._pid===e,this._pid=e,this.connected=!0,this.emitBuffered(),this._drainQueue(!0),this.emitReserved("connect")}emitBuffered(){this.receiveBuffer.forEach(t=>this.emitEvent(t)),this.receiveBuffer=[],this.sendBuffer.forEach(t=>{this.notifyOutgoingListeners(t),this.packet(t)}),this.sendBuffer=[]}ondisconnect(){this.destroy(),this.onclose("io server disconnect")}destroy(){this.subs&&(this.subs.forEach(t=>t()),this.subs=void 0),this.io._destroy(this)}disconnect(){return this.connected&&this.packet({type:zt.DISCONNECT}),this.destroy(),this.connected&&this.onclose("io client disconnect"),this}close(){return this.disconnect()}compress(t){return this.flags.compress=t,this}get volatile(){return this.flags.volatile=!0,this}timeout(t){return this.flags.timeout=t,this}onAny(t){return this._anyListeners=this._anyListeners||[],this._anyListeners.push(t),this}prependAny(t){return this._anyListeners=this._anyListeners||[],this._anyListeners.unshift(t),this}offAny(t){if(!this._anyListeners)return this;if(t){const e=this._anyListeners;for(let n=0;n<e.length;n++)if(t===e[n])return e.splice(n,1),this}else this._anyListeners=[];return this}listenersAny(){return this._anyListeners||[]}onAnyOutgoing(t){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.push(t),this}prependAnyOutgoing(t){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.unshift(t),this}offAnyOutgoing(t){if(!this._anyOutgoingListeners)return this;if(t){const e=this._anyOutgoingListeners;for(let n=0;n<e.length;n++)if(t===e[n])return e.splice(n,1),this}else this._anyOutgoingListeners=[];return this}listenersAnyOutgoing(){return this._anyOutgoingListeners||[]}notifyOutgoingListeners(t){if(this._anyOutgoingListeners&&this._anyOutgoingListeners.length){const e=this._anyOutgoingListeners.slice();for(const n of e)n.apply(this,t.data)}}}function ji(s){s=s||{},this.ms=s.min||100,this.max=s.max||1e4,this.factor=s.factor||2,this.jitter=s.jitter>0&&s.jitter<=1?s.jitter:0,this.attempts=0}ji.prototype.duration=function(){var s=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var t=Math.random(),e=Math.floor(t*this.jitter*s);s=(Math.floor(t*10)&1)==0?s-e:s+e}return Math.min(s,this.max)|0};ji.prototype.reset=function(){this.attempts=0};ji.prototype.setMin=function(s){this.ms=s};ji.prototype.setMax=function(s){this.max=s};ji.prototype.setJitter=function(s){this.jitter=s};class sa extends ye{constructor(t,e){var n;super(),this.nsps={},this.subs=[],t&&typeof t=="object"&&(e=t,t=void 0),e=e||{},e.path=e.path||"/socket.io",this.opts=e,xr(this,e),this.reconnection(e.reconnection!==!1),this.reconnectionAttempts(e.reconnectionAttempts||1/0),this.reconnectionDelay(e.reconnectionDelay||1e3),this.reconnectionDelayMax(e.reconnectionDelayMax||5e3),this.randomizationFactor((n=e.randomizationFactor)!==null&&n!==void 0?n:.5),this.backoff=new ji({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()}),this.timeout(e.timeout==null?2e4:e.timeout),this._readyState="closed",this.uri=t;const i=e.parser||D0;this.encoder=new i.Encoder,this.decoder=new i.Decoder,this._autoConnect=e.autoConnect!==!1,this._autoConnect&&this.open()}reconnection(t){return arguments.length?(this._reconnection=!!t,t||(this.skipReconnect=!0),this):this._reconnection}reconnectionAttempts(t){return t===void 0?this._reconnectionAttempts:(this._reconnectionAttempts=t,this)}reconnectionDelay(t){var e;return t===void 0?this._reconnectionDelay:(this._reconnectionDelay=t,(e=this.backoff)===null||e===void 0||e.setMin(t),this)}randomizationFactor(t){var e;return t===void 0?this._randomizationFactor:(this._randomizationFactor=t,(e=this.backoff)===null||e===void 0||e.setJitter(t),this)}reconnectionDelayMax(t){var e;return t===void 0?this._reconnectionDelayMax:(this._reconnectionDelayMax=t,(e=this.backoff)===null||e===void 0||e.setMax(t),this)}timeout(t){return arguments.length?(this._timeout=t,this):this._timeout}maybeReconnectOnOpen(){!this._reconnecting&&this._reconnection&&this.backoff.attempts===0&&this.reconnect()}open(t){if(~this._readyState.indexOf("open"))return this;this.engine=new th(this.uri,this.opts);const e=this.engine,n=this;this._readyState="opening",this.skipReconnect=!1;const i=pn(e,"open",function(){n.onopen(),t&&t()}),r=a=>{this.cleanup(),this._readyState="closed",this.emitReserved("error",a),t?t(a):this.maybeReconnectOnOpen()},o=pn(e,"error",r);if(this._timeout!==!1){const a=this._timeout,l=this.setTimeoutFn(()=>{i(),r(new Error("timeout")),e.close()},a);this.opts.autoUnref&&l.unref(),this.subs.push(()=>{this.clearTimeoutFn(l)})}return this.subs.push(i),this.subs.push(o),this}connect(t){return this.open(t)}onopen(){this.cleanup(),this._readyState="open",this.emitReserved("open");const t=this.engine;this.subs.push(pn(t,"ping",this.onping.bind(this)),pn(t,"data",this.ondata.bind(this)),pn(t,"error",this.onerror.bind(this)),pn(t,"close",this.onclose.bind(this)),pn(this.decoder,"decoded",this.ondecoded.bind(this)))}onping(){this.emitReserved("ping")}ondata(t){try{this.decoder.add(t)}catch(e){this.onclose("parse error",e)}}ondecoded(t){yr(()=>{this.emitReserved("packet",t)},this.setTimeoutFn)}onerror(t){this.emitReserved("error",t)}socket(t,e){let n=this.nsps[t];return n?this._autoConnect&&!n.active&&n.connect():(n=new nh(this,t,e),this.nsps[t]=n),n}_destroy(t){const e=Object.keys(this.nsps);for(const n of e)if(this.nsps[n].active)return;this._close()}_packet(t){const e=this.encoder.encode(t);for(let n=0;n<e.length;n++)this.engine.write(e[n],t.options)}cleanup(){this.subs.forEach(t=>t()),this.subs.length=0,this.decoder.destroy()}_close(){this.skipReconnect=!0,this._reconnecting=!1,this.onclose("forced close")}disconnect(){return this._close()}onclose(t,e){var n;this.cleanup(),(n=this.engine)===null||n===void 0||n.close(),this.backoff.reset(),this._readyState="closed",this.emitReserved("close",t,e),this._reconnection&&!this.skipReconnect&&this.reconnect()}reconnect(){if(this._reconnecting||this.skipReconnect)return this;const t=this;if(this.backoff.attempts>=this._reconnectionAttempts)this.backoff.reset(),this.emitReserved("reconnect_failed"),this._reconnecting=!1;else{const e=this.backoff.duration();this._reconnecting=!0;const n=this.setTimeoutFn(()=>{t.skipReconnect||(this.emitReserved("reconnect_attempt",t.backoff.attempts),!t.skipReconnect&&t.open(i=>{i?(t._reconnecting=!1,t.reconnect(),this.emitReserved("reconnect_error",i)):t.onreconnect()}))},e);this.opts.autoUnref&&n.unref(),this.subs.push(()=>{this.clearTimeoutFn(n)})}}onreconnect(){const t=this.backoff.attempts;this._reconnecting=!1,this.backoff.reset(),this.emitReserved("reconnect",t)}}const hs={};function ar(s,t){typeof s=="object"&&(t=s,s=void 0),t=t||{};const e=w0(s,t.path||"/socket.io"),n=e.source,i=e.id,r=e.path,o=hs[i]&&r in hs[i].nsps,a=t.forceNew||t["force new connection"]||t.multiplex===!1||o;let l;return a?l=new sa(n,t):(hs[i]||(hs[i]=new sa(n,t)),l=hs[i]),e.query&&!t.query&&(t.query=e.queryKey),l.socket(e.path,t)}Object.assign(ar,{Manager:sa,Socket:nh,io:ar,connect:ar});const ao={deer:{maxHp:65,walk:2.3,run:7.2,dmg:0,hostile:!1,xp:24,drops:[["raw_meat",2,3],["hide",2,3]]},boar:{maxHp:95,walk:2.4,run:6,dmg:14,hostile:!0,xp:35,drops:[["raw_meat",2,4],["hide",1,3]]},wolf:{maxHp:115,walk:3,run:7.1,dmg:20,hostile:!0,xp:48,drops:[["raw_meat",1,3],["hide",2,3],["fang",1,2]]},stalker:{maxHp:185,walk:3.4,run:7.6,dmg:26,hostile:!0,xp:95,drops:[["shadow_essence",1,3],["ancient_shard",1,2]]}};class ec{handlers;world;roomId="emerald-archipelago";roomName="Emerald Archipelago (Offline / GitHub Pages)";seed=42077;localPlayer;bots=[];priv;nodes=new Map;structures=new Map;wildlife=new Map;loot=new Map;projectiles=new Map;time={day:1,timeOfDay:.31,weather:"clear",weatherIntensity:0,windDirX:.78,windDirZ:.62,windSpeed:1};weatherTimer=90;thunderTimer=14;wasNight=!1;seq=1;lastAction=0;lastDodge=0;timer=null;lastTick=performance.now();saveTimer=0;constructor(t){this.handlers=t}startSession(t){this.stop(),this.roomId=(t.roomId||"emerald-archipelago").toLowerCase().replace(/[^a-z0-9-_]/g,"")||"emerald-archipelago",this.roomName=`${t.roomName||this.roomId} (Local World)`,this.seed=typeof t.seed=="number"&&Number.isFinite(t.seed)?Math.abs(Math.floor(t.seed))%999999:42077,this.world=new Oc(this.seed),this.nodes.clear();for(const r of this.world.generateResourceNodes())this.nodes.set(r.id,r);this.structures.clear(),this.loot.clear(),this.projectiles.clear(),this.bots=[],this.loadLocalSave()||this.seedStarterCamp();const e=this.world.getSpawnPoint(),n=Array.from({length:Ig},()=>null);n[0]={itemId:"stone_axe",count:1,durability:qe.stone_axe.maxDurability},n[1]={itemId:"torch",count:1,durability:qe.torch.maxDurability},n[2]={itemId:"build_hammer",count:1,durability:qe.build_hammer.maxDurability},n[3]={itemId:"berries",count:6},n[4]={itemId:"bandage",count:2},this.localPlayer={id:"local_player",name:(t.playerName||"Survivor").trim().slice(0,18)||"Survivor",isBot:!1,outfit:t.outfit||"ranger",x:e.x,y:e.y,z:e.z,vx:0,vy:0,vz:0,yaw:Math.PI,pitch:0,anim:"idle",swingTime:0,equippedSlot:0,equippedItemId:"stone_axe",armorItemId:null,armorRating:0,vitals:{hp:100,maxHp:100,stamina:100,maxStamina:100,hunger:92,thirst:92,warmth:58},status:{sheltered:!1,warm:!0,wellFed:!0,wet:!1,chilled:!1,nearCampfire:!1,nearWorkbench:!1,nearFurnace:!1,nearRunicForge:!1,nearFreshWater:!1},alive:!0,respawnAt:0,bedPos:null,pvpEnabled:!1,level:1,xp:0,kills:0,daysSurvived:1,emote:null,emoteUntil:0},this.priv={inventory:n,armorSlot:null,objectives:{gather_resources:!1,craft_tool:!1,build_shelter:!1,cook_food:!1,hunt_wildlife:!1,smelt_iron:!1}},t.spawnAiCompanions&&this.spawnBot(),this.spawnInitialWildlife(),this.lastTick=performance.now(),this.timer=globalThis.setInterval(()=>{const r=performance.now(),o=Math.min(.1,(r-this.lastTick)/1e3);this.lastTick=r,this.tick(o,Date.now())},50);const i={id:"sys_welcome",senderId:"system",senderName:"Wildreach",text:"Running in Local World Mode (auto-saved in browser). Add a server URL in the lobby for online co-op!",kind:"system",timestamp:Date.now()};return{playerId:this.localPlayer.id,room:{id:this.roomId,name:this.roomName,seed:this.seed,playerCount:1,maxPlayers:1,day:this.time.day,weather:this.time.weather,pvpEnabled:!1},landmarks:this.world.landmarks,time:{...this.time},players:[this.localPlayer,...this.bots],privateState:this.priv,nodes:Array.from(this.nodes.values()),structures:Array.from(this.structures.values()),wildlife:this.getWildlifeSnap(),loot:Array.from(this.loot.values()),chatHistory:[i]}}stop(){this.timer!==null&&(globalThis.clearInterval(this.timer),this.timer=null)}seedStarterCamp(){this.structures.set("st_sanctuary_fire",{id:"st_sanctuary_fire",kind:"campfire",ownerId:"world",ownerName:"Sanctuary",x:-7.5,y:this.world.getHeight(-7.5,20.5),z:20.5,rotY:0,hp:120,maxHp:120,lit:!0,fuel:95});const n=-13.2,i=20.8,r=Array.from({length:Yl},()=>null);r[0]={itemId:"wood",count:12},r[1]={itemId:"stone",count:10},r[2]={itemId:"berries",count:8},r[3]={itemId:"cooked_meat",count:3},r[4]={itemId:"flint_arrow",count:12},this.structures.set("st_sanctuary_chest",{id:"st_sanctuary_chest",kind:"storage_chest",ownerId:"world",ownerName:"Sanctuary",x:n,y:this.world.getHeight(n,i),z:i,rotY:.45,hp:240,maxHp:240,chestSlots:r})}loadLocalSave(){try{const t=localStorage.getItem(`wildreach_save_${this.roomId}_${this.seed}`);if(!t)return!1;const e=JSON.parse(t);this.time.day=e.day||1,this.time.timeOfDay=typeof e.timeOfDay=="number"?e.timeOfDay:.31;for(const n of e.structures||[])this.structures.set(n.id,n);return this.structures.size>0}catch{return!1}}saveLocal(){try{localStorage.setItem(`wildreach_save_${this.roomId}_${this.seed}`,JSON.stringify({day:this.time.day,timeOfDay:this.time.timeOfDay,structures:Array.from(this.structures.values())}))}catch{}}spawnInitialWildlife(){this.wildlife.clear();const t=(e,n,i)=>{let r=0,o=0;for(;r<n&&o<500;){o++;const a=(Math.random()*2-1)*126,l=(Math.random()*2-1)*126;if(e!=="deer"&&Math.hypot(a+10,l-18)<34)continue;const c=this.world.sample(a,l);c.height<.8||c.slope>.75||!i.includes(c.biome)||(this.addWildlife(e,a,l),r++)}};t("deer",12,["meadow","beach"]),t("boar",7,["meadow","pine","marsh"]),t("wolf",6,["pine","highland","volcanic"])}addWildlife(t,e,n){const i=ao[t],r=`lmob_${t}_${this.seq++}`;this.wildlife.set(r,{id:r,kind:t,x:e,y:this.world.getHeight(e,n),z:n,yaw:Math.random()*Math.PI*2,hp:i.maxHp,maxHp:i.maxHp,state:"idle",speed:0,attackTime:0,homeX:e,homeZ:n,targetX:e,targetZ:n,thinkTimer:1+Math.random()*3,attackCooldown:0,aggroUntil:0,respawnAt:0})}getWildlifeSnap(){return Array.from(this.wildlife.values()).filter(t=>t.state!=="dead")}spawnBot(){if(this.bots.length>=3)return;const t=[["Kael [AI]","ranger"],["Lyra [AI]","warden"],["Rowan [AI]","nomad"]],[e,n]=t[this.bots.length%t.length],i=this.world.getSpawnPoint(),r=i.x+3.5+this.bots.length*2,o=i.z-2.5;this.bots.push({id:`lbot_${this.seq++}`,name:e,isBot:!0,outfit:n,x:r,y:this.world.getHeight(r,o),z:o,vx:0,vy:0,vz:0,yaw:0,pitch:0,anim:"idle",swingTime:0,equippedSlot:0,equippedItemId:"stone_axe",armorItemId:"leather_armor",armorRating:25,vitals:{hp:100,maxHp:100,stamina:100,maxStamina:100,hunger:90,thirst:90,warmth:60},status:{sheltered:!1,warm:!0,wellFed:!0,wet:!1,chilled:!1,nearCampfire:!1,nearWorkbench:!1,nearFurnace:!1,nearRunicForge:!1,nearFreshWater:!1},alive:!0,respawnAt:0,bedPos:null,pvpEnabled:!1,level:2,xp:0,kills:0,daysSurvived:1,emote:null,emoteUntil:0,homeX:i.x,homeZ:i.z,goalX:r,goalZ:o,timer:2,cd:0}),this.handlers.onChatMessage({id:`sys_${this.seq++}`,senderId:"system",senderName:"Wildreach",text:`${e} joined your camp to gather & defend.`,kind:"system",timestamp:Date.now()})}handleInput(t){const e=this.localPlayer;!e||!e.alive||(e.x=qt(t.x,-170,170),e.y=t.y,e.z=qt(t.z,-170,170),e.vx=t.vx,e.vy=t.vy,e.vz=t.vz,e.yaw=t.yaw,e.pitch=t.pitch,e.anim=t.anim,t.sprinting&&Math.hypot(e.vx,e.vz)>1.5&&(e.vitals.stamina=Math.max(0,e.vitals.stamina-.55)))}handleEquip(t){t<0||t>=Gc||(this.localPlayer.equippedSlot=t,this.localPlayer.equippedItemId=this.priv.inventory[t]?.itemId??null)}handleDodge(t){const e=Date.now();if(e-this.lastDodge<850||this.localPlayer.vitals.stamina<18)return;this.lastDodge=e,this.localPlayer.vitals.stamina-=18;const n=Math.hypot(t.x,t.z)||1;this.localPlayer.x=qt(this.localPlayer.x+t.x/n*3.2,-170,170),this.localPlayer.z=qt(this.localPlayer.z+t.z/n*3.2,-170,170)}handleAction(t){const e=this.localPlayer;if(!e.alive)return;const n=Date.now(),i=Ue(e.equippedItemId);if(n-this.lastAction<(i?.attackCooldown??.5)*850||(this.lastAction=n,e.vitals.stamina<6))return;if(e.vitals.stamina=Math.max(0,e.vitals.stamina-7),e.swingTime=.36,i?.isRanged){if(!this.consumeMats([{itemId:i.ammoItemId||"flint_arrow",count:1}])){this.handlers.onToast({text:"Out of Flint Arrows! Craft more at a Workbench.",tone:"warn"});return}const o=qt(t.charge??.85,.3,1),a=26+o*22,l=Math.hypot(t.dirX,t.dirY,t.dirZ)||1,c=`lpr_${this.seq++}`;this.projectiles.set(c,{id:c,ownerId:e.id,kind:i.id==="starlight_bow"?"starlight_bolt":"arrow",x:e.x+t.dirX/l*.9,y:e.y+1.55,z:e.z+t.dirZ/l*.9,vx:t.dirX/l*a,vy:t.dirY/l*a+2.2,vz:t.dirZ/l*a,damage:Math.round((i.damage??34)*(.65+o*.55)),bornAt:n}),this.syncPrivate();return}if(i?.toolKind==="hammer"&&t.targetStructureId){const o=this.structures.get(t.targetStructureId);if(o&&o.hp<o.maxHp){o.hp=Math.min(o.maxHp,o.hp+45),this.handlers.onStructureUpdate(o),this.handlers.onFxEvent({kind:"build",x:o.x,y:o.y+1,z:o.z});return}}if(t.targetWildlifeId){const o=this.wildlife.get(t.targetWildlifeId);if(o&&o.state!=="dead"&&Math.hypot(o.x-e.x,o.z-e.z)<(i?.range??3.2)+2){this.damageWildlife(o,i?.damage??12,e.x,e.z);return}}let r=t.targetNodeId?this.nodes.get(t.targetNodeId):void 0;if(!r||r.depleted){let o=4.6;for(const a of this.nodes.values()){if(a.depleted)continue;const l=a.x-e.x,c=a.z-e.z,h=Math.hypot(l,c);h<o&&(l*t.dirX+c*t.dirZ)/(h||1)>.5&&(o=h,r=a)}}r&&!r.depleted&&this.hitNode(r,i)}hitNode(t,e){const n=Qo[t.kind];if((e?.tier??0)<n.minToolTier){this.handlers.onToast({text:`Requires ${n.minToolTier===1?"Stone Pickaxe":"Forged Iron Pickaxe"}!`,tone:"warn"});return}const i=n.preferredTool==="hand"?26:e?.toolKind===n.preferredTool?Math.round((e?.gatherPower??16)*1.25):Math.max(10,Math.round((e?.gatherPower??14)*.6));if(t.hp=Math.max(0,t.hp-i),this.handlers.onFxEvent({kind:t.kind.endsWith("tree")||t.kind==="driftwood"?"chop":"mine",x:t.x,y:t.y+1.1,z:t.z}),this.handlers.onCombatEvent({id:`ce_${this.seq++}`,x:t.x,y:t.y+1.8,z:t.z,text:`-${i}`,color:"#f8fafc",kind:"damage"}),t.hp<=0){t.depleted=!0,t.respawnAt=Date.now()+n.respawnSec*1e3;const r=t.x-this.localPlayer.x,o=t.z-this.localPlayer.z,a=Math.hypot(r,o)||1;t.kind.endsWith("tree")&&this.handlers.onNodeFell({id:t.id,dirX:r/a,dirZ:o/a});for(const l of n.drops){if(l.chance!==void 0&&Math.random()>l.chance)continue;const c=l.min+Math.floor(Math.random()*(l.max-l.min+1));this.addItem(l.itemId,c)}this.priv.objectives.gather_resources=!0,this.grantXp(12),this.syncPrivate()}this.handlers.onNodeUpdate(t)}damageWildlife(t,e,n,i){t.hp=Math.max(0,t.hp-e),this.handlers.onFxEvent({kind:"hit",x:t.x,y:t.y+1,z:t.z}),this.handlers.onCombatEvent({id:`ce_${this.seq++}`,x:t.x,y:t.y+1.9,z:t.z,text:`-${e}`,color:"#fbbf24",kind:"damage"});const r=ao[t.kind];if(t.hp<=0){t.state="dead",t.respawnAt=Date.now()+85e3;for(const[o,a,l]of r.drops){const c=a+Math.floor(Math.random()*(l-a+1)),h=`lloot_${this.seq++}`,d={id:h,itemId:o,count:c,x:t.x+(Math.random()-.5),y:t.y+.4,z:t.z+(Math.random()-.5)};this.loot.set(h,d),this.handlers.onLootAdd(d)}this.localPlayer.kills+=1,this.priv.objectives.hunt_wildlife=!0,this.grantXp(r.xp),this.syncPrivate()}else if(r.hostile)t.state="chase",t.aggroUntil=Date.now()+14e3;else{t.state="flee";const o=t.x-n,a=t.z-i,l=Math.hypot(o,a)||1;t.targetX=qt(t.x+o/l*24,-135,135),t.targetZ=qt(t.z+a/l*24,-135,135),t.thinkTimer=4}}handleInteract(t){const e=this.localPlayer;if(t.drinkWater&&this.world.isNearFreshWater(e.x,e.z)){e.vitals.thirst=Math.min(100,e.vitals.thirst+45),this.handlers.onFxEvent({kind:"drink",x:e.x,y:e.y+1.2,z:e.z}),this.handlers.onToast({text:"Drank fresh Crystal Spring water (+45 Thirst)",tone:"good"});return}if(t.lootId){const n=this.loot.get(t.lootId);n&&(this.addItem(n.itemId,n.count),this.loot.delete(n.id),this.handlers.onLootRemove(n.id),this.handlers.onToast({text:`Picked up ${n.count}× ${qe[n.itemId]?.name??n.itemId}`,tone:"good"}),this.syncPrivate());return}if(t.structureId){const n=this.structures.get(t.structureId);if(!n)return;if(n.kind==="wood_doorway")n.isOpen=!n.isOpen,this.handlers.onStructureUpdate(n);else if(n.kind==="bedroll")e.bedPos={x:n.x,y:n.y+.3,z:n.z},this.handlers.onToast({text:"Respawn point bound to Bedroll!",tone:"good"});else if(n.kind==="campfire")this.consumeMats([{itemId:"wood",count:2}])?(n.lit=!0,n.fuel=Math.min(100,(n.fuel??0)+45),this.handlers.onStructureUpdate(n),this.syncPrivate(),this.handlers.onToast({text:"Stoked campfire with 2 Timber Wood.",tone:"good"})):this.handlers.onToast({text:"Open Crafting [C] near campfire to cook!",tone:"info"});else if(n.kind==="rain_collector"&&(n.waterLevel??0)>=20){const i=Math.min(45,n.waterLevel??0);n.waterLevel=(n.waterLevel??0)-i,e.vitals.thirst=Math.min(100,e.vitals.thirst+i),this.handlers.onStructureUpdate(n),this.handlers.onFxEvent({kind:"drink",x:e.x,y:e.y+1,z:e.z})}}}handleConsume(t){const e=this.priv.inventory[t],n=Ue(e?.itemId);!e||!n||n.category!=="consumable"||(e.count--,e.count<=0&&(this.priv.inventory[t]=null),n.heal&&(this.localPlayer.vitals.hp=qt(this.localPlayer.vitals.hp+n.heal,1,this.localPlayer.vitals.maxHp)),n.hungerRestore&&(this.localPlayer.vitals.hunger=qt(this.localPlayer.vitals.hunger+n.hungerRestore,0,100)),n.thirstRestore&&(this.localPlayer.vitals.thirst=qt(this.localPlayer.vitals.thirst+n.thirstRestore,0,100)),n.warmthRestore&&(this.localPlayer.vitals.warmth=qt(this.localPlayer.vitals.warmth+n.warmthRestore,0,100)),this.handlers.onFxEvent({kind:"eat",x:this.localPlayer.x,y:this.localPlayer.y+1,z:this.localPlayer.z}),this.syncPrivate())}handleEquipArmor(t){const e=this.priv.inventory[t],n=Ue(e?.itemId);if(!e||!n||n.category!=="armor")return;const i=this.priv.armorSlot;this.priv.armorSlot=e,this.priv.inventory[t]=i,this.localPlayer.armorItemId=e.itemId,this.localPlayer.armorRating=n.armorRating??0,this.syncPrivate()}handleSwapSlots(t,e){const n=this.priv.inventory,i=n[t];n[t]=n[e],n[e]=i,this.localPlayer.equippedItemId=n[this.localPlayer.equippedSlot]?.itemId??null,this.syncPrivate()}handleDropSlot(t){const e=this.priv.inventory[t];if(!e)return;this.priv.inventory[t]=null;const n=`lloot_${this.seq++}`,i={id:n,itemId:e.itemId,count:e.count,x:this.localPlayer.x+Math.sin(this.localPlayer.yaw)*1.4,y:this.localPlayer.y+.35,z:this.localPlayer.z+Math.cos(this.localPlayer.yaw)*1.4};this.loot.set(n,i),this.handlers.onLootAdd(i),this.syncPrivate()}handleCraft(t){const e=Ag(t);if(e){if(!this.consumeMats(e.ingredients)){this.handlers.onToast({text:"Missing crafting materials!",tone:"warn"});return}this.addItem(e.outputItemId,e.outputCount),(qe[e.outputItemId]?.category==="tool"||qe[e.outputItemId]?.category==="weapon")&&(this.priv.objectives.craft_tool=!0),e.station==="campfire"&&(this.priv.objectives.cook_food=!0),e.outputItemId.endsWith("_ingot")&&(this.priv.objectives.smelt_iron=!0),this.grantXp(e.xpReward),this.handlers.onFxEvent({kind:"build",x:this.localPlayer.x,y:this.localPlayer.y+1,z:this.localPlayer.z}),this.handlers.onToast({text:`Crafted ${e.outputCount}× ${qe[e.outputItemId]?.name}!`,tone:"good"}),this.syncPrivate()}}handleBuild(t){const e=ci[t.kind];if(!e)return;let n=!1;if(t.fromItemSlot!==void 0){const o=this.priv.inventory[t.fromItemSlot];o&&Ue(o.itemId)?.structureKind===t.kind&&(o.count--,o.count<=0&&(this.priv.inventory[t.fromItemSlot]=null),n=!0)}if(!n&&!this.consumeMats(e.costs)){this.handlers.onToast({text:`Missing materials for ${e.name}.`,tone:"warn"});return}const i=Hc(t.kind,{x:t.x,y:t.y,z:t.z},t.rotY,Array.from(this.structures.values()),(o,a)=>this.world.getHeight(o,a)),r={id:`lst_${this.seq++}_${Date.now().toString(36)}`,kind:t.kind,ownerId:this.localPlayer.id,ownerName:this.localPlayer.name,x:i.x,y:i.y,z:i.z,rotY:i.rotY,hp:e.maxHp,maxHp:e.maxHp,isOpen:t.kind==="wood_doorway"?!1:void 0,lit:t.kind==="campfire"||t.kind==="furnace"||t.kind==="lantern_post"||t.kind==="watchtower_beacon"?!0:void 0,fuel:t.kind==="campfire"?80:void 0,waterLevel:t.kind==="rain_collector"?30:void 0,chestSlots:t.kind==="storage_chest"?Array.from({length:Yl},()=>null):void 0};this.structures.set(r.id,r),this.priv.objectives.build_shelter=!0,this.grantXp(18),this.handlers.onStructureAdd(r),this.handlers.onFxEvent({kind:"build",x:r.x,y:r.y+.8,z:r.z}),this.syncPrivate(),this.saveLocal()}handleDemolish(t){const e=this.structures.get(t);if(!(!e||e.ownerId==="world")){for(const n of ci[e.kind].costs)this.addItem(n.itemId,Math.max(1,Math.floor(n.count*.5)));this.structures.delete(t),this.handlers.onStructureRemove(t),this.syncPrivate(),this.saveLocal()}}handleChestTransfer(t){const e=this.structures.get(t.structureId);if(!(!e||!e.chestSlots)){if(t.from==="inventory"){const n=this.priv.inventory[t.fromIndex];if(!n)return;const i=e.chestSlots.findIndex(r=>r===null);i>=0&&(e.chestSlots[i]=n,this.priv.inventory[t.fromIndex]=null)}else{const n=e.chestSlots[t.fromIndex];if(!n)return;this.addItem(n.itemId,n.count,n.durability),e.chestSlots[t.fromIndex]=null}this.handlers.onStructureUpdate(e),this.syncPrivate(),this.saveLocal()}}handleRespawn(){const t=this.localPlayer.bedPos??this.world.getSpawnPoint();this.localPlayer.x=t.x,this.localPlayer.y=t.y,this.localPlayer.z=t.z,this.localPlayer.alive=!0,this.localPlayer.vitals.hp=this.localPlayer.vitals.maxHp,this.localPlayer.vitals.hunger=78,this.localPlayer.vitals.thirst=78}handleChat(t){const e=t.trim();if(e==="/time day"){this.time.timeOfDay=.36,this.handlers.onToast({text:"Time shifted to bright midday.",tone:"info"});return}if(e==="/time dusk"){this.time.timeOfDay=.74,this.handlers.onToast({text:"Time shifted to golden dusk.",tone:"info"});return}if(e==="/weather rain"){this.time.weather="storm",this.time.weatherIntensity=.9,this.handlers.onToast({text:"A coastal storm rolls across the archipelago.",tone:"warn"});return}if(e==="/weather clear"){this.time.weather="clear",this.time.weatherIntensity=0,this.handlers.onToast({text:"Skies clear over Wildreach.",tone:"good"});return}this.handlers.onChatMessage({id:`lchat_${this.seq++}`,senderId:this.localPlayer.id,senderName:this.localPlayer.name,text:e,kind:"chat",timestamp:Date.now()})}addItem(t,e,n){const i=Ue(t);if(!i)return;let r=e;if(i.maxStack>1){for(const o of this.priv.inventory)if(o&&o.itemId===t&&o.count<i.maxStack){const a=Math.min(i.maxStack-o.count,r);o.count+=a,r-=a}}for(let o=0;o<this.priv.inventory.length&&r>0;o++)if(!this.priv.inventory[o]){const a=Math.min(i.maxStack,r);this.priv.inventory[o]={itemId:t,count:a,durability:n??i.maxDurability},r-=a}}consumeMats(t){for(const e of t){let n=0;for(const i of this.priv.inventory)i?.itemId===e.itemId&&(n+=i.count);if(n<e.count)return!1}for(const e of t){let n=e.count;for(let i=0;i<this.priv.inventory.length&&n>0;i++){const r=this.priv.inventory[i];if(!r||r.itemId!==e.itemId)continue;const o=Math.min(r.count,n);r.count-=o,n-=o,r.count<=0&&(this.priv.inventory[i]=null)}}return!0}grantXp(t){this.localPlayer.xp+=t;const e=this.localPlayer.level*120;this.localPlayer.xp>=e&&(this.localPlayer.xp-=e,this.localPlayer.level+=1,this.localPlayer.vitals.maxHp+=10,this.localPlayer.vitals.hp=this.localPlayer.vitals.maxHp,this.handlers.onFxEvent({kind:"levelup",x:this.localPlayer.x,y:this.localPlayer.y+1.5,z:this.localPlayer.z}),this.handlers.onToast({text:`Level Up! Reached Level ${this.localPlayer.level}!`,tone:"good"}))}syncPrivate(){this.localPlayer.equippedItemId=this.priv.inventory[this.localPlayer.equippedSlot]?.itemId??null,this.handlers.onPrivateState({...this.priv})}tick(t,e){this.time.timeOfDay+=t/Rg,this.time.timeOfDay>=1&&(this.time.timeOfDay-=1,this.time.day+=1);const n=this.time.timeOfDay<.22||this.time.timeOfDay>.79;if(n&&!this.wasNight&&this.handlers.onToast({text:"Night falls — stay near campfires!",tone:"warn"}),this.wasNight=n,this.weatherTimer-=t,this.weatherTimer<=0){this.weatherTimer=70+Math.random()*80;const o=Math.random(),a=o<.5?"clear":o<.72?"breezy":o<.85?"fog":o<.94?"rain":"storm";this.time.weather=a}const i=this.time.weather==="storm"?1:this.time.weather==="rain"?.65:this.time.weather==="fog"?.5:0;this.time.weatherIntensity+=(i-this.time.weatherIntensity)*Math.min(1,t*.4),this.time.windSpeed=this.time.weather==="storm"?2.3:this.time.weather==="breezy"?1.55:.95,this.time.weather==="storm"&&(this.thunderTimer-=t,this.thunderTimer<=0&&(this.thunderTimer=14+Math.random()*16,this.handlers.onFxEvent({kind:"thunder",x:0,y:40,z:0})));const r=this.localPlayer;if(r.swingTime>0&&(r.swingTime=Math.max(0,r.swingTime-t)),r.alive){let o=!1,a=!1,l=!1,c=!1,h=0,d=0;for(const _ of this.structures.values()){const m=Math.hypot(_.x-r.x,_.z-r.z);_.kind==="campfire"&&_.lit&&m<9.5&&(o=!0),_.kind==="workbench"&&m<16&&(a=!0),_.kind==="furnace"&&m<9.5&&(l=!0),_.kind==="runic_forge"&&m<9.5&&(c=!0),_.kind==="wood_roof"&&m<3.4&&h++,(_.kind==="wood_wall"||_.kind==="wood_doorway"||_.kind==="stone_wall")&&m<4.5&&d++}const u=h>=1&&d>=2,p=r.y<nn-.1||(this.time.weather==="rain"||this.time.weather==="storm")&&!u,g=(n?28:58)-(p?16:0)+(o?32:0)+(r.equippedItemId==="torch"?16:0)+(u?15:0);r.vitals.warmth+=(qt(g,8,95)-r.vitals.warmth)*Math.min(1,t*.25),r.vitals.hunger=Math.max(0,r.vitals.hunger-t*.09),r.vitals.thirst=Math.max(0,r.vitals.thirst-t*.12),r.vitals.stamina=Math.min(r.vitals.maxStamina,r.vitals.stamina+t*15),r.vitals.hunger>55&&r.vitals.thirst>50&&r.vitals.warmth>25&&(r.vitals.hp=Math.min(r.vitals.maxHp,r.vitals.hp+t*(u||o?2:.9))),r.status={sheltered:u,warm:r.vitals.warmth>=55&&(o||u||r.equippedItemId==="torch"),wellFed:r.vitals.hunger>=60&&r.vitals.thirst>=55,wet:p,chilled:r.vitals.warmth<25,nearCampfire:o,nearWorkbench:a,nearFurnace:l,nearRunicForge:c,nearFreshWater:this.world.isNearFreshWater(r.x,r.z)}}for(const o of this.wildlife.values()){if(o.state==="dead"){e>=o.respawnAt&&(o.hp=o.maxHp,o.x=o.homeX,o.z=o.homeZ,o.y=this.world.getHeight(o.x,o.z),o.state="idle");continue}const a=ao[o.kind];o.attackCooldown>0&&(o.attackCooldown-=t),o.thinkTimer-=t;const l=Math.hypot(r.x-o.x,r.z-o.z);if(!a.hostile&&l<12){const c=Math.atan2(o.z-r.z,o.x-r.x);o.targetX=qt(o.x+Math.cos(c)*18,-135,135),o.targetZ=qt(o.z+Math.sin(c)*18,-135,135),o.state="flee",o.thinkTimer=2.5}else if(a.hostile&&r.alive&&(l<12||e<o.aggroUntil)){if(l<2.2){if(o.speed=0,o.attackCooldown<=0){o.attackCooldown=1.4;const c=Math.max(2,Math.round(a.dmg*(1-r.armorRating/100)));r.vitals.hp=Math.max(0,r.vitals.hp-c),this.handlers.onFxEvent({kind:"hit",x:r.x,y:r.y+1.2,z:r.z}),r.vitals.hp<=0&&(r.alive=!1)}continue}o.targetX=r.x,o.targetZ=r.z,o.state="chase"}if(o.state==="wander"||o.state==="flee"||o.state==="chase"){const c=o.targetX-o.x,h=o.targetZ-o.z,d=Math.hypot(c,h);if(d<.8||o.state!=="chase"&&o.thinkTimer<=0)o.state="idle",o.speed=0,o.thinkTimer=3+Math.random()*4;else{const u=o.state==="wander"?a.walk:a.run,p=o.x+c/d*Math.min(d,u*t),g=o.z+h/d*Math.min(d,u*t),_=this.world.getHeight(p,g);_>nn+.25?(o.x=p,o.z=g,o.y=_,o.yaw=Math.atan2(c,h),o.speed=u):o.state="idle"}}else if(o.thinkTimer<=0){const c=Math.random()*Math.PI*2;o.targetX=qt(o.homeX+Math.cos(c)*14,-135,135),o.targetZ=qt(o.homeZ+Math.sin(c)*14,-135,135),o.state="wander",o.thinkTimer=5}}for(const o of this.bots){o.timer-=t;const a=o.goalX-o.x,l=o.goalZ-o.z,c=Math.hypot(a,l);if(c<1.2||o.timer<=0){const h=Math.random()*Math.PI*2;o.goalX=o.homeX+Math.cos(h)*(5+Math.random()*14),o.goalZ=o.homeZ+Math.sin(h)*(5+Math.random()*14),o.timer=4+Math.random()*5,o.anim="idle"}else{const h=Math.min(c,3.6*t);o.x+=a/c*h,o.z+=l/c*h,o.y=this.world.getHeight(o.x,o.z),o.yaw=Math.atan2(a,l),o.anim="walk"}}for(const[o,a]of this.projectiles.entries()){if(a.vy-=14.5*t,a.x+=a.vx*t,a.y+=a.vy*t,a.z+=a.vz*t,e-a.bornAt>4e3||a.y<=this.world.getHeight(a.x,a.z)){this.projectiles.delete(o);continue}for(const l of this.wildlife.values())if(l.state!=="dead"&&Math.hypot(l.x-a.x,l.z-a.z)<1.25&&Math.abs(l.y+1-a.y)<1.35){this.damageWildlife(l,a.damage,a.x,a.z),this.projectiles.delete(o);break}}this.handlers.onSnapshot({t:e,time:{...this.time},players:[this.localPlayer,...this.bots],wildlife:this.getWildlifeSnap(),projectiles:Array.from(this.projectiles.values())}),this.saveTimer+=t,this.saveTimer>=20&&(this.saveTimer=0,this.saveLocal())}}class N0{socket=null;localEngine=null;pingTimer=null;serverUrl="";staticHostDetected=null;pingMs=0;isOfflineMode=!1;constructor(){const e=new URLSearchParams(window.location.search).get("server");e&&(this.serverUrl=e.trim().replace(/\/+$/,""))}getServerUrl(){return this.serverUrl}setServerUrl(t){const e=t.trim().replace(/\/+$/,"");e!==this.serverUrl&&(this.serverUrl=e,this.staticHostDetected=null,this.socket&&(this.socket.disconnect(),this.socket=null))}isStaticHost(){if(this.serverUrl)return!1;if(this.staticHostDetected===!0)return!0;const t=window.location.hostname;return window.location.protocol==="file:"||t.endsWith(".github.io")||t.endsWith("raw.githack.com")||t.endsWith("htmlpreview.github.io")}async fetchRooms(){if(this.isStaticHost())return this.staticHostDetected=!0,{rooms:[],serverReachable:!1};try{const t=this.serverUrl||"",e=new AbortController,n=window.setTimeout(()=>e.abort(),2200),i=await fetch(`${t}/api/rooms`,{signal:e.signal});window.clearTimeout(n);const r=i.headers.get("content-type")||"";if(!i.ok||!r.includes("application/json"))return this.serverUrl||(this.staticHostDetected=!0),{rooms:[],serverReachable:!1};const o=await i.json();return this.staticHostDetected=!1,{rooms:o.rooms??[],serverReachable:!0}}catch{return this.serverUrl||(this.staticHostDetected=!0),{rooms:[],serverReachable:!1}}}connect(t){return this.isStaticHost()?(this.isOfflineMode=!0,this.localEngine=new ec(t),Promise.resolve({online:!1})):this.socket?.connected?(this.isOfflineMode=!1,Promise.resolve({online:!0})):new Promise(e=>{const n=this.serverUrl||void 0,i=ar(n,{path:"/socket.io",transports:["websocket","polling"],reconnection:!0,reconnectionAttempts:2,reconnectionDelay:800,timeout:2600});this.socket=i;let r=!1;const o=()=>{r||(r=!0,i.disconnect(),this.socket=null,this.isOfflineMode=!0,this.localEngine=new ec(t),e({online:!1}))},a=window.setTimeout(o,2800);i.on("connect",()=>{r||(r=!0,window.clearTimeout(a),this.isOfflineMode=!1,this.localEngine?.stop(),this.localEngine=null,t.onConnectionChange(!0),this.startPingLoop(),e({online:!0}))}),i.on("connect_error",()=>{r||(window.clearTimeout(a),o())}),i.on("disconnect",()=>{this.isOfflineMode||t.onConnectionChange(!1)}),i.on("world:snapshot",t.onSnapshot),i.on("player:private",t.onPrivateState),i.on("node:update",t.onNodeUpdate),i.on("node:fell",t.onNodeFell),i.on("structure:add",t.onStructureAdd),i.on("structure:update",t.onStructureUpdate),i.on("structure:remove",t.onStructureRemove),i.on("loot:add",t.onLootAdd),i.on("loot:remove",t.onLootRemove),i.on("combat:event",t.onCombatEvent),i.on("fx:event",t.onFxEvent),i.on("chat:message",t.onChatMessage),i.on("toast:notify",t.onToast)})}startPingLoop(){this.pingTimer&&window.clearInterval(this.pingTimer),this.pingTimer=window.setInterval(()=>{if(!this.socket?.connected)return;const t=performance.now();this.socket.emit("net:ping",Date.now(),()=>{this.pingMs=Math.round(performance.now()-t)})},3e3)}joinRoom(t){return this.isOfflineMode&&this.localEngine?Promise.resolve(this.localEngine.startSession(t)):new Promise((e,n)=>{if(!this.socket)return n(new Error("Not connected"));this.socket.emit("room:join",t,i=>{i.ok&&i.init?e(i.init):n(new Error(i.error||"Failed to join world"))})})}sendInput(t){this.isOfflineMode?this.localEngine?.handleInput(t):this.socket?.emit("player:input",t)}sendEquip(t){this.isOfflineMode?this.localEngine?.handleEquip(t):this.socket?.emit("player:equip",t)}sendAction(t){this.isOfflineMode?this.localEngine?.handleAction(t):this.socket?.emit("player:action",t)}sendDodge(t){this.isOfflineMode?this.localEngine?.handleDodge(t):this.socket?.emit("player:dodge",t)}sendInteract(t){this.isOfflineMode?this.localEngine?.handleInteract(t):this.socket?.emit("player:interact",t)}sendConsume(t){this.isOfflineMode?this.localEngine?.handleConsume(t):this.socket?.emit("player:consume",t)}sendEquipArmor(t){this.isOfflineMode?this.localEngine?.handleEquipArmor(t):this.socket?.emit("player:equipArmor",t)}sendSwapSlots(t,e){this.isOfflineMode?this.localEngine?.handleSwapSlots(t,e):this.socket?.emit("player:swapSlots",{from:t,to:e})}sendDropSlot(t,e){this.isOfflineMode?this.localEngine?.handleDropSlot(t):this.socket?.emit("player:dropSlot",{slotIndex:t,count:e})}sendCraft(t){this.isOfflineMode?this.localEngine?.handleCraft(t):this.socket?.emit("player:craft",t)}sendBuild(t){this.isOfflineMode?this.localEngine?.handleBuild(t):this.socket?.emit("player:build",t)}sendDemolish(t){this.isOfflineMode?this.localEngine?.handleDemolish(t):this.socket?.emit("player:demolish",t)}sendChestTransfer(t){this.isOfflineMode?this.localEngine?.handleChestTransfer(t):this.socket?.emit("player:chestTransfer",t)}sendRespawn(){this.isOfflineMode?this.localEngine?.handleRespawn():this.socket?.emit("player:respawn")}sendTogglePvp(){this.isOfflineMode||this.socket?.emit("player:togglePvp")}sendEmote(t){this.isOfflineMode||this.socket?.emit("player:emote",t)}sendSpawnBot(){this.isOfflineMode?this.localEngine?.spawnBot():this.socket?.emit("player:spawnBot")}sendChat(t){this.isOfflineMode?this.localEngine?.handleChat(t):this.socket?.emit("chat:send",t)}}class k0{keys=new Set;pointerLocked=!1;pointerLockBlocked=!1;mouseLeftDown=!1;yaw=Math.PI;pitch=.24;uiOpen=!1;chatOpen=!1;sensitivity=.0022;canvas;cb;wheelDelta=0;dragLookActive=!1;dragButton=-1;dragStartX=0;dragStartY=0;dragLastX=0;dragLastY=0;dragMoved=!1;constructor(t,e){this.canvas=t,this.cb=e,window.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp),window.addEventListener("mousemove",this.onMouseMove),t.addEventListener("mousedown",this.onMouseDown),window.addEventListener("mouseup",this.onMouseUp),window.addEventListener("wheel",this.onWheel,{passive:!0}),t.addEventListener("contextmenu",n=>n.preventDefault()),document.addEventListener("pointerlockchange",()=>{this.pointerLocked=document.pointerLockElement===this.canvas,this.pointerLocked?(this.pointerLockBlocked=!1,this.dragLookActive=!1):this.mouseLeftDown=!1}),document.addEventListener("pointerlockerror",()=>{this.pointerLockBlocked=!0})}requestPointerLock(){if(!(this.pointerLockBlocked||this.uiOpen||this.chatOpen||document.pointerLockElement===this.canvas||typeof this.canvas.requestPointerLock!="function"))try{const t=this.canvas.requestPointerLock();t&&typeof t.catch=="function"&&t.catch(()=>{this.pointerLockBlocked=!0})}catch{this.pointerLockBlocked=!0}}exitPointerLock(){if(document.pointerLockElement)try{document.exitPointerLock()}catch{}}consumeWheel(){const t=this.wheelDelta;return this.wheelDelta=0,t}onKeyDown=t=>{const e=document.activeElement?.tagName;if(e==="INPUT"||e==="TEXTAREA"||e==="SELECT"){t.key==="Escape"&&document.activeElement.blur();return}const n=t.code;if(this.keys.add(n),n==="Enter"){t.preventDefault(),this.cb.onToggleChat();return}if(n==="Escape"){this.cb.onTogglePause();return}if(n==="Tab"||n==="KeyI"){t.preventDefault(),this.cb.onToggleInventory();return}if(n==="KeyC"){this.cb.onToggleCrafting();return}if(n==="KeyB"){this.cb.onToggleBuild();return}if(n==="KeyM"){this.cb.onToggleMap();return}if(!(this.uiOpen||this.chatOpen))if(n.startsWith("Digit")){const i=Number(n.slice(5))-1;i>=0&&i<=8&&this.cb.onHotbarSelect(i)}else n==="KeyE"?this.cb.onInteract():n==="KeyV"?this.cb.onToggleCamera():n==="KeyR"?this.cb.onRotateBuild():n==="KeyQ"||n==="ControlLeft"?this.cb.onDodge():n==="F1"?(t.preventDefault(),this.cb.onEmote("wave")):n==="F2"?(t.preventDefault(),this.cb.onEmote("cheer")):n==="F3"?(t.preventDefault(),this.cb.onEmote("help")):n==="F4"&&(t.preventDefault(),this.cb.onEmote("camp"))};onKeyUp=t=>{this.keys.delete(t.code)};onMouseMove=t=>{if(!(this.uiOpen||this.chatOpen)){if(this.pointerLocked)this.yaw-=t.movementX*this.sensitivity,this.pitch=Math.max(-.95,Math.min(1.22,this.pitch+t.movementY*this.sensitivity));else if(this.dragLookActive){const e=t.clientX-this.dragLastX,n=t.clientY-this.dragLastY;this.dragLastX=t.clientX,this.dragLastY=t.clientY,Math.hypot(t.clientX-this.dragStartX,t.clientY-this.dragStartY)>6&&(this.dragMoved=!0),this.yaw-=e*this.sensitivity*1.45,this.pitch=Math.max(-.95,Math.min(1.22,this.pitch+n*this.sensitivity*1.45))}}};onMouseDown=t=>{if(!(this.uiOpen||this.chatOpen)){if(!this.pointerLocked){this.dragLookActive=!0,this.dragButton=t.button,this.dragStartX=t.clientX,this.dragStartY=t.clientY,this.dragLastX=t.clientX,this.dragLastY=t.clientY,this.dragMoved=!1,t.button===0&&!this.pointerLockBlocked&&this.requestPointerLock();return}t.button===0?(this.mouseLeftDown=!0,this.cb.onPrimaryDown()):t.button===2&&this.cb.onSecondaryDown()}};onMouseUp=t=>{if(this.dragLookActive&&t.button===this.dragButton){const e=!this.dragMoved&&!this.pointerLocked;this.dragLookActive=!1,this.dragButton=-1,e&&!this.uiOpen&&!this.chatOpen&&(t.button===0?(this.cb.onPrimaryDown(),this.cb.onPrimaryUp()):t.button===2&&this.cb.onSecondaryDown());return}t.button===0&&this.mouseLeftDown&&(this.mouseLeftDown=!1,this.cb.onPrimaryUp())};onWheel=t=>{this.uiOpen||this.chatOpen||(this.wheelDelta+=Math.sign(t.deltaY))}}class pr{moveX=0;moveY=0;sprinting=!1;jumping=!1;enabled=!1;mode="auto";rootEl;joyZone;joyBase;joyKnob;interactBtn;buildControlsEl;joyPointerId=null;joyOriginX=0;joyOriginY=0;joyRadius=48;lookPointerId=null;lookLastX=0;lookLastY=0;lookDeltaX=0;lookDeltaY=0;constructor(t,e){this.rootEl=document.getElementById("touch-controls"),this.joyZone=document.getElementById("touch-joy-zone"),this.joyBase=document.getElementById("touch-joy-base"),this.joyKnob=document.getElementById("touch-joy-knob"),this.interactBtn=document.getElementById("tbtn-interact"),this.buildControlsEl=document.getElementById("touch-build-actions"),this.detectAndApplyMode(),window.addEventListener("resize",()=>this.detectAndApplyMode()),this.joyZone.addEventListener("pointerdown",c=>{if(this.joyPointerId!==null)return;c.preventDefault(),this.joyPointerId=c.pointerId,this.joyZone.setPointerCapture(c.pointerId);const h=this.joyBase.getBoundingClientRect();this.joyOriginX=h.left+h.width/2,this.joyOriginY=h.top+h.height/2,this.updateJoystick(c.clientX,c.clientY)}),this.joyZone.addEventListener("pointermove",c=>{c.pointerId===this.joyPointerId&&(c.preventDefault(),this.updateJoystick(c.clientX,c.clientY))});const n=c=>{c.pointerId===this.joyPointerId&&(this.joyPointerId=null,this.moveX=0,this.moveY=0,this.sprinting=!1,this.joyKnob.style.transform="translate(0px, 0px)",this.joyBase.classList.remove("sprinting"))};this.joyZone.addEventListener("pointerup",n),this.joyZone.addEventListener("pointercancel",n),t.addEventListener("pointerdown",c=>{c.pointerType!=="mouse"&&this.lookPointerId===null&&(this.lookPointerId=c.pointerId,this.lookLastX=c.clientX,this.lookLastY=c.clientY)}),t.addEventListener("pointermove",c=>{if(c.pointerId!==this.lookPointerId)return;const h=c.clientX-this.lookLastX,d=c.clientY-this.lookLastY;this.lookLastX=c.clientX,this.lookLastY=c.clientY,Math.abs(h)<120&&Math.abs(d)<120&&(this.lookDeltaX+=h,this.lookDeltaY+=d)});const i=c=>{c.pointerId===this.lookPointerId&&(this.lookPointerId=null)};t.addEventListener("pointerup",i),t.addEventListener("pointercancel",i);const r=document.getElementById("tbtn-action");r.addEventListener("pointerdown",c=>{c.preventDefault(),r.classList.add("pressed"),e.onPrimaryDown()});const o=()=>{r.classList.contains("pressed")&&(r.classList.remove("pressed"),e.onPrimaryUp())};r.addEventListener("pointerup",o),r.addEventListener("pointercancel",o),this.interactBtn.addEventListener("pointerdown",c=>{c.preventDefault(),e.onInteract()});const a=document.getElementById("tbtn-jump");a.addEventListener("pointerdown",c=>{c.preventDefault(),this.jumping=!0,a.classList.add("pressed")});const l=()=>{this.jumping=!1,a.classList.remove("pressed")};a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),document.getElementById("tbtn-dodge")?.addEventListener("pointerdown",c=>{c.preventDefault(),e.onDodge()}),document.getElementById("tbtn-rotate")?.addEventListener("pointerdown",c=>{c.preventDefault(),e.onRotateBuild()}),document.getElementById("tbtn-cancel-build")?.addEventListener("pointerdown",c=>{c.preventDefault(),e.onCancelBuild()}),document.getElementById("qbtn-pack")?.addEventListener("click",e.onOpenInventory),document.getElementById("qbtn-craft")?.addEventListener("click",e.onOpenCrafting),document.getElementById("qbtn-build")?.addEventListener("click",e.onOpenBuild),document.getElementById("qbtn-cam")?.addEventListener("click",e.onToggleCamera),document.getElementById("qbtn-map")?.addEventListener("click",e.onOpenMap),document.getElementById("qbtn-chat")?.addEventListener("click",e.onToggleChat),document.getElementById("qbtn-menu")?.addEventListener("click",e.onOpenPause)}static isTouchDevice(){return window.matchMedia("(pointer: coarse)").matches||"ontouchstart"in window||navigator.maxTouchPoints>0}setMode(t){this.mode=t,this.detectAndApplyMode()}detectAndApplyMode(){const t=this.mode==="on"||this.mode==="auto"&&pr.isTouchDevice();this.enabled=t,this.rootEl.classList.toggle("hidden",!t)}setContextualState(t,e,n){this.enabled&&(this.rootEl.classList.toggle("hidden",!n),this.interactBtn.classList.toggle("highlight",t),this.buildControlsEl.classList.toggle("hidden",!e))}consumeLookDelta(){const t=this.lookDeltaX,e=this.lookDeltaY;return this.lookDeltaX=0,this.lookDeltaY=0,{dx:t,dy:e}}updateJoystick(t,e){let n=t-this.joyOriginX,i=e-this.joyOriginY;const r=Math.hypot(n,i);r>this.joyRadius&&(n=n/r*this.joyRadius,i=i/r*this.joyRadius),this.joyKnob.style.transform=`translate(${n.toFixed(1)}px, ${i.toFixed(1)}px)`,this.moveX=n/this.joyRadius,this.moveY=-i/this.joyRadius,this.sprinting=r>=this.joyRadius*.82,this.joyBase.classList.toggle("sprinting",this.sprinting)}}class F0{baseMap;hudCanvas;fullCanvas;mapSize=256;constructor(t,e,n){this.hudCanvas=e,this.fullCanvas=n,this.baseMap=document.createElement("canvas"),this.baseMap.width=this.mapSize,this.baseMap.height=this.mapSize,this.bakeTerrainMap(t)}bakeTerrainMap(t){const e=this.baseMap.getContext("2d"),n=e.createImageData(this.mapSize,this.mapSize);for(let i=0;i<this.mapSize;i++){const r=i/(this.mapSize-1)*vn-ki;for(let o=0;o<this.mapSize;o++){const a=o/(this.mapSize-1)*vn-ki,l=t.sample(a,r);let c=20,h=60,d=104;if(l.biome==="ocean"){const p=Math.min(1,Math.max(0,-l.height/6.5));c=Math.round(28-p*18),h=Math.round(122-p*78),d=Math.round(148-p*64)}else l.biome==="beach"?(c=219,h=194,d=138):l.biome==="meadow"?(c=96,h=154,d=72):l.biome==="pine"?(c=56,h=98,d=60):l.biome==="marsh"?(c=74,h=104,d=66):l.biome==="highland"?(c=112,h=116,d=122):l.biome==="volcanic"&&(c=l.height>18?228:74,h=l.height>18?236:64,d=l.height>18?244:84);l.height>.2&&Math.abs(l.height%4-.15)<.15&&(c=Math.max(0,c-18),h=Math.max(0,h-18),d=Math.max(0,d-18));const u=(i*this.mapSize+o)*4;n.data[u]=c,n.data[u+1]=h,n.data[u+2]=d,n.data[u+3]=255}}e.putImageData(n,0,0)}worldToMap(t,e,n){const i=(t+ki)/vn,r=(e+ki)/vn;return[i*n,r*n]}renderHud(t,e,n,i,r,o,a){const l=this.hudCanvas.getContext("2d");if(!l)return;const c=this.hudCanvas.width,h=this.hudCanvas.height;l.clearRect(0,0,c,h),l.save(),l.beginPath(),l.arc(c/2,h/2,c/2-2,0,Math.PI*2),l.clip();const d=2.05,[u,p]=this.worldToMap(t,e,this.mapSize);l.drawImage(this.baseMap,c/2-u*d,h/2-p*d,this.mapSize*d,this.mapSize*d);const g=(_,m)=>{const[f,S]=this.worldToMap(_,m,this.mapSize);return[c/2+(f-u)*d,h/2+(S-p)*d]};for(const _ of a){const[m,f]=g(_.x,_.z);l.fillStyle=_.kind==="spring"?"#38bdf8":_.kind==="sanctuary"?"#2dd4bf":"#fbbf24",l.beginPath(),l.arc(m,f,3.2,0,Math.PI*2),l.fill()}for(const _ of o){const[m,f]=g(_.x,_.z);l.fillStyle=_.kind==="campfire"?"#fb923c":_.kind==="watchtower_beacon"?"#2dd4bf":"#e2e8f0",l.fillRect(m-2,f-2,4,4)}for(const _ of r){if(_.id===i||!_.alive)continue;const[m,f]=g(_.x,_.z);l.fillStyle=_.isBot?"#7dd3fc":"#4ade80",l.strokeStyle="#0f172a",l.lineWidth=1.5,l.beginPath(),l.arc(m,f,4.2,0,Math.PI*2),l.fill(),l.stroke()}l.translate(c/2,h/2),l.rotate(-n+Math.PI),l.fillStyle="#ffffff",l.strokeStyle="#0f172a",l.lineWidth=1.8,l.beginPath(),l.moveTo(0,-7),l.lineTo(5.5,6),l.lineTo(0,3),l.lineTo(-5.5,6),l.closePath(),l.fill(),l.stroke(),l.restore()}renderFullMap(t,e,n,i,r,o){const a=this.fullCanvas.getContext("2d");if(!a)return;const l=this.fullCanvas.width;a.clearRect(0,0,l,l),a.drawImage(this.baseMap,0,0,l,l),a.strokeStyle="rgba(255,255,255,0.09)",a.lineWidth=1;for(let c=1;c<6;c++){const h=c/6*l;a.beginPath(),a.moveTo(h,0),a.lineTo(h,l),a.moveTo(0,h),a.lineTo(l,h),a.stroke()}a.font="600 11px Inter, system-ui, sans-serif",a.textAlign="center";for(const c of o){const[h,d]=this.worldToMap(c.x,c.z,l);a.fillStyle=c.kind==="spring"?"#38bdf8":c.kind==="sanctuary"?"#2dd4bf":"#fbbf24",a.beginPath(),a.arc(h,d,5,0,Math.PI*2),a.fill(),a.fillStyle="rgba(10,16,24,0.82)";const u=a.measureText(c.name).width+10;a.fillRect(h-u/2,d+7,u,16),a.fillStyle="#f8fafc",a.fillText(c.name,h,d+19)}for(const c of r){const[h,d]=this.worldToMap(c.x,c.z,l);a.fillStyle=c.kind==="campfire"?"#f97316":"#f8fafc",a.fillRect(h-2.5,d-2.5,5,5)}for(const c of i){if(!c.alive)continue;const[h,d]=this.worldToMap(c.x,c.z,l),u=c.id===n;a.fillStyle=u?"#ffffff":c.isBot?"#7dd3fc":"#4ade80",a.strokeStyle="#0f172a",a.lineWidth=2,a.beginPath(),a.arc(h,d,u?6.5:5,0,Math.PI*2),a.fill(),a.stroke(),a.fillStyle="#ffffff",a.fillText(c.name,h,d-9)}}}function ds(s){const t=qe[s]?.accentColor??"#cbd5e1";switch(s){case"wood":return'<svg viewBox="0 0 32 32"><rect x="4" y="11" width="24" height="10" rx="4" fill="#9c6234" stroke="#4a2b13" stroke-width="2"/><ellipse cx="7" cy="16" rx="2.5" ry="4.5" fill="#d9a574"/><line x1="12" y1="14" x2="23" y2="14" stroke="#6b3e1b" stroke-width="1.5"/></svg>';case"stone":return'<svg viewBox="0 0 32 32"><polygon points="6,23 9,10 19,7 27,14 25,24 14,26" fill="#8b949e" stroke="#3e464f" stroke-width="2"/><polygon points="10,12 18,9 22,15 13,17" fill="#b4bdc7" opacity="0.65"/></svg>';case"flint":return'<svg viewBox="0 0 32 32"><polygon points="16,4 25,18 18,28 8,21 10,10" fill="#525c68" stroke="#1f252b" stroke-width="2"/><polygon points="16,6 21,16 15,21 12,13" fill="#8fa0b2" opacity="0.6"/></svg>';case"fiber":return'<svg viewBox="0 0 32 32"><path d="M9 26 C10 18, 12 11, 8 6 M16 26 C16 17, 17 10, 16 5 M23 26 C22 18, 20 12, 24 7" stroke="#75b548" stroke-width="2.8" fill="none" stroke-linecap="round"/><path d="M8 20 Q16 18 24 20" stroke="#c8a86b" stroke-width="2.2" fill="none"/></svg>';case"rope":return'<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="9.5" fill="none" stroke="#cfa968" stroke-width="4.5"/><circle cx="16" cy="16" r="5" fill="none" stroke="#8f6c36" stroke-width="2"/></svg>';case"resin":return'<svg viewBox="0 0 32 32"><path d="M16 4 C22 12, 25 18, 23 23 C21 27, 11 27, 9 23 C7 18, 10 12, 16 4Z" fill="#f59e0b" stroke="#78350f" stroke-width="2"/><ellipse cx="13.5" cy="17" rx="2.2" ry="4" fill="#fde68a" opacity="0.7"/></svg>';case"hide":return'<svg viewBox="0 0 32 32"><path d="M7 8 L12 10 L16 6 L20 10 L25 8 L23 16 L26 24 L19 23 L16 27 L13 23 L6 24 L9 16 Z" fill="#a66a42" stroke="#4f2d18" stroke-width="2"/></svg>';case"fang":return'<svg viewBox="0 0 32 32"><path d="M11 6 C18 7, 23 14, 21 27 C16 21, 14 14, 9 10 Z" fill="#f1ece1" stroke="#6b6356" stroke-width="2"/></svg>';case"coal":return'<svg viewBox="0 0 32 32"><polygon points="8,22 7,12 15,7 24,11 25,21 16,26" fill="#2b2e34" stroke="#0f1114" stroke-width="2"/><polygon points="11,13 16,10 20,14 14,17" fill="#525866" opacity="0.6"/></svg>';case"copper_ore":return'<svg viewBox="0 0 32 32"><polygon points="6,23 9,10 19,7 26,14 24,25 13,26" fill="#68707a" stroke="#2d333b" stroke-width="2"/><circle cx="14" cy="14" r="3" fill="#e07a3f"/><circle cx="20" cy="19" r="2.6" fill="#34d399"/><circle cx="12" cy="21" r="2.2" fill="#e07a3f"/></svg>';case"iron_ore":return'<svg viewBox="0 0 32 32"><polygon points="6,23 9,10 19,7 26,14 24,25 13,26" fill="#58606b" stroke="#232830" stroke-width="2"/><polygon points="11,12 17,11 16,17 11,16" fill="#cbd5e1"/><polygon points="18,17 23,16 22,22 17,21" fill="#94a3b8"/></svg>';case"copper_ingot":case"iron_ingot":return`<svg viewBox="0 0 32 32"><polygon points="6,21 11,10 23,10 27,21" fill="${t}" stroke="#27272a" stroke-width="2"/><polygon points="11,10 23,10 21,15 9,15" fill="#ffffff" opacity="0.35"/></svg>`;case"obsidian":return'<svg viewBox="0 0 32 32"><polygon points="16,4 25,13 21,27 10,26 7,14" fill="#3b265e" stroke="#140c24" stroke-width="2"/><polygon points="16,6 22,14 16,22 11,15" fill="#7c3aed" opacity="0.5"/></svg>';case"ancient_shard":return'<svg viewBox="0 0 32 32"><polygon points="16,3 23,13 18,29 10,15" fill="#2dd4bf" stroke="#0f766e" stroke-width="2"/><polygon points="16,6 20,14 16,24 13,14" fill="#ccfbf1" opacity="0.7"/></svg>';case"shadow_essence":return'<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="10" fill="#581c87" opacity="0.55"/><circle cx="16" cy="16" r="6" fill="#c084fc"/><circle cx="14" cy="14" r="2" fill="#ffffff"/></svg>';case"berries":return'<svg viewBox="0 0 32 32"><path d="M16 10 Q21 5 24 9 Q19 12 16 10Z" fill="#4ade80"/><circle cx="13" cy="17" r="4.5" fill="#e11d48" stroke="#881337" stroke-width="1.5"/><circle cx="20" cy="18" r="4.5" fill="#f43f5e" stroke="#881337" stroke-width="1.5"/><circle cx="16" cy="23" r="4.2" fill="#be123c" stroke="#881337" stroke-width="1.5"/></svg>';case"coconut":return'<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="10" fill="#7c4a26" stroke="#3f2310" stroke-width="2"/><circle cx="13" cy="13" r="1.4" fill="#2d180a"/><circle cx="18" cy="13" r="1.4" fill="#2d180a"/><circle cx="15.5" cy="17" r="1.4" fill="#2d180a"/></svg>';case"mushroom":return'<svg viewBox="0 0 32 32"><rect x="13" y="16" width="6" height="10" rx="2" fill="#efe6d5" stroke="#7c6b54" stroke-width="1.8"/><path d="M5 17 C6 7, 26 7, 27 17 Z" fill="#c87038" stroke="#663213" stroke-width="2"/><circle cx="12" cy="12" r="1.5" fill="#fde68a"/><circle cx="19" cy="11" r="1.8" fill="#fde68a"/></svg>';case"raw_meat":case"cooked_meat":return`<svg viewBox="0 0 32 32"><path d="M7 18 C7 10, 15 7, 23 11 C27 14, 26 23, 18 25 C11 26, 7 23, 7 18Z" fill="${t}" stroke="#4a1c12" stroke-width="2"/><circle cx="13" cy="16" r="3" fill="#f5ead6" stroke="#b09b7c" stroke-width="1.5"/></svg>`;case"hearty_stew":return'<svg viewBox="0 0 32 32"><path d="M5 15 H27 C26 24, 22 27, 16 27 C10 27, 6 24, 5 15Z" fill="#7c5334" stroke="#3b2312" stroke-width="2"/><ellipse cx="16" cy="15" rx="10" ry="3.5" fill="#ea782b"/><path d="M12 10 Q13 7 12 5 M19 10 Q20 7 19 5" stroke="#e2e8f0" stroke-width="1.8" fill="none" stroke-linecap="round"/></svg>';case"bandage":return'<svg viewBox="0 0 32 32"><rect x="6" y="11" width="20" height="10" rx="4" transform="rotate(-35 16 16)" fill="#f1ead8" stroke="#8c7f68" stroke-width="2"/><path d="M16 12 V20 M12 16 H20" stroke="#ef4444" stroke-width="2.4" stroke-linecap="round"/></svg>';case"vitality_elixir":return'<svg viewBox="0 0 32 32"><rect x="13" y="5" width="6" height="5" fill="#cbd5e1"/><path d="M13 10 L7 22 C6 25, 9 27, 16 27 C23 27, 26 25, 25 22 L19 10 Z" fill="#2dd4bf" stroke="#0f766e" stroke-width="2"/><circle cx="14" cy="20" r="2" fill="#ffffff" opacity="0.7"/></svg>';case"torch":return'<svg viewBox="0 0 32 32"><line x1="8" y1="27" x2="19" y2="14" stroke="#85522c" stroke-width="4" stroke-linecap="round"/><path d="M21 5 C26 9, 26 15, 20 17 C16 15, 16 9, 21 5Z" fill="#f97316"/><path d="M21 9 C23 11, 23 14, 20 15 C18 14, 18 11, 21 9Z" fill="#fde047"/></svg>';case"build_hammer":return'<svg viewBox="0 0 32 32"><line x1="7" y1="26" x2="21" y2="12" stroke="#8c5830" stroke-width="3.6" stroke-linecap="round"/><rect x="15" y="5" width="12" height="7" rx="1.5" transform="rotate(45 21 8.5)" fill="#94a3b8" stroke="#334155" stroke-width="1.8"/></svg>';case"stone_axe":case"iron_axe":return`<svg viewBox="0 0 32 32"><line x1="7" y1="26" x2="22" y2="10" stroke="#85522c" stroke-width="3.5" stroke-linecap="round"/><path d="M16 8 L25 6 C27 11, 25 16, 20 18 L17 13 Z" fill="${t}" stroke="#1e293b" stroke-width="1.8"/></svg>`;case"stone_pickaxe":case"iron_pickaxe":return`<svg viewBox="0 0 32 32"><line x1="7" y1="26" x2="22" y2="11" stroke="#85522c" stroke-width="3.4" stroke-linecap="round"/><path d="M11 7 Q20 7 26 19 L23 21 Q18 12 10 11 Z" fill="${t}" stroke="#1e293b" stroke-width="1.8"/></svg>`;case"wood_spear":return'<svg viewBox="0 0 32 32"><line x1="5" y1="27" x2="23" y2="9" stroke="#996438" stroke-width="3" stroke-linecap="round"/><polygon points="27,5 24,13 19,8" fill="#cbd5e1" stroke="#334155" stroke-width="1.5"/></svg>';case"iron_sword":case"shadow_blade":return`<svg viewBox="0 0 32 32"><line x1="6" y1="26" x2="12" y2="20" stroke="#6b4226" stroke-width="3.2" stroke-linecap="round"/><line x1="10" y1="16" x2="16" y2="22" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/><polygon points="13,19 26,6 27,7 14,20" fill="${t}" stroke="${t}" stroke-width="2.5"/></svg>`;case"hunting_bow":case"starlight_bow":return`<svg viewBox="0 0 32 32"><path d="M9 6 C23 8, 25 22, 9 26" fill="none" stroke="${t}" stroke-width="3.2" stroke-linecap="round"/><line x1="9" y1="6" x2="9" y2="26" stroke="#e2e8f0" stroke-width="1.4"/><line x1="7" y1="16" x2="26" y2="16" stroke="#f8fafc" stroke-width="1.8"/></svg>`;case"flint_arrow":return'<svg viewBox="0 0 32 32"><line x1="6" y1="26" x2="24" y2="8" stroke="#c8a878" stroke-width="2.5"/><polygon points="27,5 24,12 20,8" fill="#94a3b8"/><path d="M5 24 L9 25 L8 29" fill="none" stroke="#f43f5e" stroke-width="2"/></svg>';case"leather_armor":case"iron_armor":case"runic_armor":return`<svg viewBox="0 0 32 32"><path d="M9 6 L13 9 L19 9 L23 6 L27 11 L24 15 L23 26 L9 26 L8 15 L5 11 Z" fill="${t}" stroke="#1e293b" stroke-width="2"/></svg>`;default:return`<svg viewBox="0 0 32 32"><rect x="6" y="8" width="20" height="16" rx="3" fill="${t}" stroke="#1e293b" stroke-width="2"/><circle cx="16" cy="16" r="3.5" fill="#ffffff" opacity="0.6"/></svg>`}}class B0{activePanel="none";openChestId=null;chatOpen=!1;selectedBuildKind="wood_foundation";actions;selectedInvSlot=null;craftStationFilter="all";lastPrivate=null;lastSelf=null;touchMode="auto";activeRoomId="emerald-archipelago";activeSeed=42077;activeServerUrl="";titleOverlay;hudRoot;hotbarEl;promptEl;toastContainer;chatLogEl;chatInputWrap;chatInputEl;panelContainer;deathOverlay;floatingLayer;constructor(t){this.actions=t,this.titleOverlay=document.getElementById("title-overlay"),this.hudRoot=document.getElementById("hud-root"),this.hotbarEl=document.getElementById("hotbar"),this.promptEl=document.getElementById("interact-prompt"),this.toastContainer=document.getElementById("toast-container"),this.chatLogEl=document.getElementById("chat-log"),this.chatInputWrap=document.getElementById("chat-input-wrap"),this.chatInputEl=document.getElementById("chat-input"),this.panelContainer=document.getElementById("panel-container"),this.deathOverlay=document.getElementById("death-overlay"),this.floatingLayer=document.getElementById("floating-text-layer"),this.initTitleScreen(),this.initChat(),this.initResponsiveHudChrome(),document.getElementById("btn-respawn")?.addEventListener("click",()=>this.actions.onRespawn())}initResponsiveHudChrome(){const t=document.getElementById("objectives-card");t&&window.innerWidth<=768&&t.classList.add("collapsed"),document.getElementById("btn-toggle-obj")?.addEventListener("click",()=>{t?.classList.toggle("collapsed")}),document.getElementById("btn-hide-obj")?.addEventListener("click",()=>{t?.classList.add("collapsed")}),document.getElementById("btn-minimap-open")?.addEventListener("click",()=>{this.actions.onOpenMap()}),document.getElementById("btn-map-close")?.addEventListener("click",()=>{this.setPanel("none"),this.actions.onResumeGame()})}buildInviteLink(t,e,n){const i=new URL(window.location.href);return i.searchParams.set("room",t||"emerald-archipelago"),e?i.searchParams.set("seed",String(e)):i.searchParams.delete("seed"),n?i.searchParams.set("server",n):i.searchParams.delete("server"),i.toString()}async copyInvite(t,e,n){const i=this.buildInviteLink(t,e,n);try{await navigator.clipboard.writeText(i),this.showToast("Invite link copied to clipboard!","good")}catch{window.prompt("Copy your Wildreach invite link:",i)}}initTitleScreen(){const t=document.getElementById("inp-name"),e=document.getElementById("inp-room"),n=document.getElementById("inp-seed"),i=document.getElementById("inp-server"),r=document.getElementById("chk-ai"),o=document.getElementById("btn-enter-world"),a=document.getElementById("btn-copy-invite"),l=document.querySelectorAll(".outfit-pill"),c=new URLSearchParams(window.location.search);c.get("room")&&(e.value=c.get("room")),c.get("seed")&&(n.value=c.get("seed")),c.get("server")&&(i.value=c.get("server"));let h="ranger";l.forEach(u=>{u.addEventListener("click",()=>{l.forEach(p=>p.classList.remove("active")),u.classList.add("active"),h=u.dataset.outfit||"ranger"})});const d=["Ash","Rowan","Freya","Bram","Kira","Soren","Nora","Talia"];t.value||(t.value=d[Math.floor(Math.random()*d.length)]),a.addEventListener("click",()=>{const u=n.value.trim()?Number(n.value.trim()):void 0;this.copyInvite(e.value.trim(),Number.isFinite(u)?u:void 0,i.value.trim())}),o.addEventListener("click",()=>{const u=n.value.trim()?Number(n.value.trim()):void 0;this.activeRoomId=e.value.trim()||"emerald-archipelago",this.activeSeed=Number.isFinite(u)?u:42077,this.activeServerUrl=i.value.trim(),this.actions.onJoinGame({playerName:t.value.trim()||"Survivor",outfit:h,roomId:this.activeRoomId,roomName:this.activeRoomId,seed:Number.isFinite(u)?u:void 0,serverUrl:this.activeServerUrl||void 0,spawnAiCompanions:r.checked})}),this.refreshRoomList()}async refreshRoomList(){const t=document.getElementById("room-list"),e=document.getElementById("lobby-mode-badge");if(!t)return;const{rooms:n,serverReachable:i}=await this.actions.onRefreshRooms();if(e&&(i?(e.textContent="● Live Multiplayer Server",e.classList.remove("offline")):(e.textContent="◆ Local World (Static / GitHub Pages)",e.classList.add("offline"))),!i){t.innerHTML='<div class="room-empty"><strong>Static / Offline Ready!</strong> No backend server detected on this host, so Wildreach will launch a full browser-simulated island (with AI allies & auto-save). Paste a Socket.IO server URL on the left to play online co-op!</div>';return}if(n.length===0){t.innerHTML='<div class="room-empty">Public world ready — click Enter Wildreach!</div>';return}t.innerHTML=n.map(r=>`
        <button class="room-row" data-room-id="${r.id}">
          <div>
            <div class="room-title">${this.esc(r.name)}</div>
            <div class="room-meta">Day ${r.day} • ${r.weather} • Seed ${r.seed}</div>
          </div>
          <span class="room-badge">${r.playerCount}/${r.maxPlayers} Online</span>
        </button>`).join(""),t.querySelectorAll(".room-row").forEach(r=>{r.addEventListener("click",()=>{const o=document.getElementById("inp-room");o&&r.dataset.roomId&&(o.value=r.dataset.roomId)})})}hideTitleScreen(){this.titleOverlay.classList.add("hidden"),this.hudRoot.classList.remove("hidden")}initChat(){this.chatInputEl.addEventListener("keydown",t=>{if(t.key==="Enter"){t.preventDefault();const e=this.chatInputEl.value.trim();e&&this.actions.onSendChat(e),this.chatInputEl.value="",this.setChatOpen(!1)}else t.key==="Escape"&&this.setChatOpen(!1)})}setChatOpen(t){this.chatOpen=t,this.chatInputWrap.classList.toggle("hidden",!t),t?this.chatInputEl.focus():this.chatInputEl.blur()}appendChat(t){const e=document.createElement("div");for(e.className=`chat-line chat-${t.kind}`,t.kind==="system"?e.innerHTML=`<span class="chat-sys">◆ ${this.esc(t.text)}</span>`:t.kind==="emote"?e.innerHTML=`<span class="chat-name">${this.esc(t.senderName)}</span> <em>${this.esc(t.text)}</em>`:e.innerHTML=`<span class="chat-name">${this.esc(t.senderName)}:</span> ${this.esc(t.text)}`,this.chatLogEl.appendChild(e);this.chatLogEl.children.length>36;)this.chatLogEl.removeChild(this.chatLogEl.firstChild);this.chatLogEl.scrollTop=this.chatLogEl.scrollHeight}showToast(t,e="info"){const n=document.createElement("div");n.className=`toast toast-${e}`,n.textContent=t,this.toastContainer.appendChild(n),setTimeout(()=>n.classList.add("fade-out"),3200),setTimeout(()=>n.remove(),3800)}spawnFloatingText(t,e,n,i){const r=document.createElement("div");r.className="floating-dmg",r.textContent=n,r.style.left=`${Math.round(t)}px`,r.style.top=`${Math.round(e)}px`,r.style.color=i,this.floatingLayer.appendChild(r),setTimeout(()=>r.remove(),1100)}setInteractPrompt(t,e,n){if(!t){this.promptEl.classList.add("hidden");return}this.promptEl.classList.remove("hidden");const i=n!==void 0?`<div class="prompt-bar"><div style="width:${Math.max(0,Math.min(100,Math.round(n)))}%"></div></div>`:"";this.promptEl.innerHTML=`<div class="prompt-main">${this.esc(t)}</div>${e?`<div class="prompt-sub">${this.esc(e)}</div>`:""}${i}`}setScreenVignette(t){const e=document.getElementById("screen-vignette");e&&(t.underwater?(e.style.background="rgba(14, 116, 144, 0.24)",e.style.boxShadow="inset 0 0 110px rgba(8, 51, 68, 0.72)"):t.hitFlash>.05?(e.style.background=`rgba(220, 38, 38, ${(t.hitFlash*.25).toFixed(2)})`,e.style.boxShadow=`inset 0 0 120px rgba(220, 38, 38, ${(t.hitFlash*.75).toFixed(2)})`):t.lowHp?(e.style.background="transparent",e.style.boxShadow="inset 0 0 120px rgba(185, 28, 28, 0.52)"):t.chilled?(e.style.background="transparent",e.style.boxShadow="inset 0 0 110px rgba(56, 189, 248, 0.36)"):t.warmFire?(e.style.background="transparent",e.style.boxShadow="inset 0 0 90px rgba(249, 115, 22, 0.16)"):(e.style.background="transparent",e.style.boxShadow="inset 0 0 70px rgba(0, 0, 0, 0.22)"))}setBowCharge(t){const e=document.getElementById("bow-charge-bar"),n=document.getElementById("bow-charge-fill");!e||!n||(t<=.01?e.classList.add("hidden"):(e.classList.remove("hidden"),n.style.width=`${Math.round(t*100)}%`))}updateHud(t,e,n,i,r,o,a,l,c=!1,h=!1,d=!1){this.lastSelf=t,this.lastPrivate=e,this.deathOverlay.classList.toggle("hidden",t.alive);const u=document.getElementById("lock-hint");u&&u.classList.toggle("hidden",c||d||l||this.activePanel!=="none"||this.chatOpen||!t.alive);const p=(-a*180/Math.PI%360+360)%360,_=["N","NE","E","SE","S","SW","W","NW"][Math.round(p/45)%8],m=document.getElementById("hud-compass");m&&(m.textContent=`${_} ${Math.round(p).toString().padStart(3,"0")}° • ${i}`);const f=Math.floor(n.timeOfDay*24),S=Math.floor((n.timeOfDay*24-f)*60),b=`${f.toString().padStart(2,"0")}:${S.toString().padStart(2,"0")}`,x=document.getElementById("hud-clock");if(x){const y=n.timeOfDay<.23||n.timeOfDay>.78?"☾":"☀";x.textContent=`${y} Day ${n.day} • ${b} • ${n.weather.toUpperCase()}`}const C=document.getElementById("hud-net");C&&(C.textContent=h?`Local World • Lv.${t.level}`:`${r} Online • ${o}ms • Lv.${t.level}`),this.setBar("bar-hp",t.vitals.hp/t.vitals.maxHp*100,`${Math.ceil(t.vitals.hp)}/${t.vitals.maxHp}`),this.setBar("bar-stamina",t.vitals.stamina/t.vitals.maxStamina*100),this.setBar("bar-hunger",t.vitals.hunger),this.setBar("bar-thirst",t.vitals.thirst),this.setBar("bar-warmth",t.vitals.warmth);const E=[];t.status.sheltered&&E.push('<span class="pill pill-good">⌂ Sheltered</span>'),t.status.warm&&E.push('<span class="pill pill-warm">🔥 Warm</span>'),t.status.wellFed&&E.push('<span class="pill pill-good">★ Well-Fed</span>'),t.status.wet&&E.push('<span class="pill pill-wet">💧 Wet</span>'),t.status.chilled&&E.push('<span class="pill pill-danger">❄ Chilled</span>'),t.armorRating>0&&E.push(`<span class="pill pill-info">🛡 Armor ${t.armorRating}%</span>`),t.pvpEnabled&&E.push('<span class="pill pill-danger">⚔ PvP Active</span>');const A=document.getElementById("status-pills");A&&(A.innerHTML=E.join(""));const I=document.getElementById("objectives-list");if(I){const y=[["gather_resources","Gather Wood & Stone [LMB]"],["craft_tool","Craft a Tool or Weapon [C]"],["build_shelter","Build a Campfire or Shelter [B]"],["cook_food","Roast Meat by a Campfire [C]"],["hunt_wildlife","Hunt Wildlife or Stalkers"],["smelt_iron","Smelt Ingots in a Furnace"]];I.innerHTML=y.map(([v,R])=>{const U=!!e.objectives[v];return`<div class="obj-item ${U?"done":""}">${U?"✓":"○"} ${R}</div>`}).join("")}this.renderHotbar(e.inventory,t.equippedSlot)}setBar(t,e,n){const i=document.getElementById(t);if(i&&(i.style.width=`${Math.max(0,Math.min(100,e))}%`),n){const r=document.getElementById(`${t}-val`);r&&(r.textContent=n)}}renderHotbar(t,e){let n="";for(let r=0;r<Gc;r++){const o=t[r],a=Ue(o?.itemId),l=o&&a?.maxDurability&&o.durability!==void 0?Math.max(0,Math.min(100,o.durability/a.maxDurability*100)):null;n+=`
        <button class="hb-slot ${r===e?"active":""}" data-slot="${r}" title="${a?this.esc(a.name):"Empty"}">
          <span class="hb-key">${r+1}</span>
          ${o?`<div class="slot-icon">${ds(o.itemId)}</div>`:""}
          ${o&&o.count>1?`<span class="slot-count">${o.count}</span>`:""}
          ${l!==null?`<div class="dur-bar"><div style="width:${l}%"></div></div>`:""}
        </button>`}this.hotbarEl.dataset.cache!==n&&(this.hotbarEl.dataset.cache=n,this.hotbarEl.innerHTML=n,this.hotbarEl.querySelectorAll(".hb-slot").forEach(r=>{r.addEventListener("click",()=>{this.actions.onSelectHotbar(Number(r.dataset.slot))})}));const i=document.getElementById("equipped-label");if(i){const r=Ue(t[e]?.itemId);i.textContent=r?r.name:"Bare Hands"}}setPanel(t,e){if(this.activePanel=t,this.openChestId=t==="chest"&&e?e.id:null,this.selectedInvSlot=null,document.getElementById("map-modal").classList.toggle("hidden",t!=="map"),t==="none"||t==="map"){this.panelContainer.classList.add("hidden"),this.panelContainer.innerHTML="";return}this.panelContainer.classList.remove("hidden"),this.renderActivePanel(e)}refreshPanelIfOpen(t){(this.activePanel==="inventory"||this.activePanel==="crafting"||this.activePanel==="build"||this.activePanel==="chest")&&this.renderActivePanel(t)}renderActivePanel(t){const e=this.lastPrivate,n=this.lastSelf;if(!(!e||!n)){if(this.activePanel==="inventory"){const i=e.inventory.map((a,l)=>{const c=Ue(a?.itemId);return`
            <button class="inv-slot ${this.selectedInvSlot===l?"selected":""} ${l<9?"hotbar-mark":""}" data-idx="${l}" title="${c?`${this.esc(c.name)}: ${this.esc(c.description)}`:"Empty slot"}">
              ${l<9?`<span class="hb-key">${l+1}</span>`:""}
              ${a?`<div class="slot-icon">${ds(a.itemId)}</div>`:""}
              ${a&&a.count>1?`<span class="slot-count">${a.count}</span>`:""}
            </button>`}).join(""),r=this.selectedInvSlot!==null?e.inventory[this.selectedInvSlot]:null,o=Ue(r?.itemId);this.panelContainer.innerHTML=`
        <div class="modal-card">
          <div class="modal-header">
            <h2>Survivor Pack & Equipment</h2>
            <button class="btn-close" id="btn-panel-close">✕</button>
          </div>
          <div class="inv-top-row">
            <div class="armor-box">
              <span class="label-sm">Equipped Armor (${n.armorRating}% DEF)</span>
              <div class="armor-slot">${e.armorSlot?ds(e.armorSlot.itemId):"<span>None</span>"}</div>
              <div class="label-xs">${e.armorSlot?qe[e.armorSlot.itemId]?.name:"Craft Leather or Iron Armor"}</div>
            </div>
            <div class="inv-detail">
              ${o?`<div class="detail-title">${this.esc(o.name)}</div>
                     <p class="detail-desc">${this.esc(o.description)}</p>
                     <div class="detail-actions">
                       ${o.category==="consumable"?'<button class="btn-primary" id="btn-use-item">Consume</button>':""}
                       ${o.category==="armor"?'<button class="btn-primary" id="btn-equip-armor">Equip Armor</button>':""}
                       <button class="btn-ghost" id="btn-drop-item">Drop Stack</button>
                     </div>`:'<div class="detail-empty">Click any slot to inspect or swap items. Click another slot to move/stack.</div>'}
            </div>
          </div>
          <div class="inv-grid">${i}</div>
        </div>`,this.panelContainer.querySelector("#btn-panel-close")?.addEventListener("click",()=>{this.setPanel("none"),this.actions.onResumeGame()}),this.panelContainer.querySelectorAll(".inv-slot").forEach(a=>{a.addEventListener("click",()=>{const l=Number(a.dataset.idx);this.selectedInvSlot===null?(this.selectedInvSlot=l,this.renderActivePanel()):this.selectedInvSlot===l?(this.selectedInvSlot=null,this.renderActivePanel()):(this.actions.onSwapSlots(this.selectedInvSlot,l),this.selectedInvSlot=null)})}),this.panelContainer.querySelector("#btn-use-item")?.addEventListener("click",()=>{this.selectedInvSlot!==null&&this.actions.onConsumeSlot(this.selectedInvSlot)}),this.panelContainer.querySelector("#btn-equip-armor")?.addEventListener("click",()=>{this.selectedInvSlot!==null&&this.actions.onEquipArmor(this.selectedInvSlot)}),this.panelContainer.querySelector("#btn-drop-item")?.addEventListener("click",()=>{this.selectedInvSlot!==null&&(this.actions.onDropSlot(this.selectedInvSlot),this.selectedInvSlot=null)})}else if(this.activePanel==="crafting"){const i=this.countInventory(e.inventory),r={hand:!0,campfire:n.status.nearCampfire,workbench:n.status.nearWorkbench,furnace:n.status.nearFurnace,runic_forge:n.status.nearRunicForge},a=zc.filter(c=>this.craftStationFilter==="all"||c.station===this.craftStationFilter).map(c=>{const h=qe[c.outputItemId],d=r[c.station],u=c.ingredients.every(_=>(i[_.itemId]??0)>=_.count),p=d&&u,g=c.ingredients.map(_=>{const m=i[_.itemId]??0;return`<span class="ing-chip ${m>=_.count?"ok":"miss"}">${qe[_.itemId]?.name??_.itemId} ${m}/${_.count}</span>`}).join("");return`
            <div class="recipe-row ${p?"ready":""}">
              <div class="recipe-icon">${ds(c.outputItemId)}</div>
              <div class="recipe-info">
                <div class="recipe-title">${this.esc(h?.name??c.outputItemId)} ${c.outputCount>1?`×${c.outputCount}`:""}
                  <span class="station-tag ${d?"active":""}">${c.station.replace("_"," ")}</span>
                </div>
                <div class="recipe-ings">${g}</div>
              </div>
              <button class="btn-craft" data-recipe="${c.id}" ${p?"":"disabled"}>Craft</button>
            </div>`}).join(""),l=["all","hand","campfire","workbench","furnace","runic_forge"];this.panelContainer.innerHTML=`
        <div class="modal-card modal-wide">
          <div class="modal-header">
            <h2>Crafting & Cooking</h2>
            <button class="btn-close" id="btn-panel-close">✕</button>
          </div>
          <div class="tab-bar">
            ${l.map(c=>`<button class="tab-btn ${this.craftStationFilter===c?"active":""}" data-st="${c}">${c==="all"?"All":c.replace("_"," ")}${c!=="all"&&r[c]?" ●":""}</button>`).join("")}
          </div>
          <div class="recipe-list">${a}</div>
        </div>`,this.panelContainer.querySelector("#btn-panel-close")?.addEventListener("click",()=>{this.setPanel("none"),this.actions.onResumeGame()}),this.panelContainer.querySelectorAll(".tab-btn").forEach(c=>{c.addEventListener("click",()=>{this.craftStationFilter=c.dataset.st||"all",this.renderActivePanel()})}),this.panelContainer.querySelectorAll(".btn-craft").forEach(c=>{c.addEventListener("click",()=>{c.dataset.recipe&&this.actions.onCraft(c.dataset.recipe)})})}else if(this.activePanel==="build"){const i=this.countInventory(e.inventory),r=Cg.map(o=>{const a=ci[o],l=!a.requiresWorkbench||n.status.nearWorkbench,c=a.costs.every(d=>(i[d.itemId]??0)>=d.count),h=a.costs.map(d=>{const u=i[d.itemId]??0;return`<span class="ing-chip ${u>=d.count?"ok":"miss"}">${qe[d.itemId]?.name} ${u}/${d.count}</span>`}).join("");return`
          <button class="build-card ${this.selectedBuildKind===o?"active":""} ${l&&c?"ready":""}" data-kind="${o}">
            <div class="build-title">${this.esc(a.name)}</div>
            <div class="build-desc">${this.esc(a.description)}</div>
            <div class="recipe-ings">${h}</div>
            ${a.requiresWorkbench?`<div class="wb-req ${l?"ok":""}">Requires Workbench</div>`:""}
          </button>`}).join("");this.panelContainer.innerHTML=`
        <div class="modal-card modal-wide">
          <div class="modal-header">
            <h2>Modular Base Building — Select Piece</h2>
            <button class="btn-close" id="btn-panel-close">✕</button>
          </div>
          <p class="build-hint">Pick a blueprint below, then aim and <strong>Left-Click</strong> to place (snaps automatically!). Press <strong>[R]</strong> to rotate or <strong>Right-Click</strong> to exit build preview.</p>
          <div class="build-grid">${r}</div>
        </div>`,this.panelContainer.querySelector("#btn-panel-close")?.addEventListener("click",()=>{this.setPanel("none"),this.actions.onResumeGame()}),this.panelContainer.querySelectorAll(".build-card").forEach(o=>{o.addEventListener("click",()=>{const a=o.dataset.kind;this.selectedBuildKind=a,this.actions.onSelectBuildKind(a),this.setPanel("none"),this.actions.onResumeGame()})})}else if(this.activePanel==="chest"&&t){const i=t.chestSlots??[],r=(o,a)=>o.map((l,c)=>{const h=Ue(l?.itemId);return`<button class="inv-slot" data-side="${a}" data-idx="${c}" title="${h?this.esc(h.name):"Empty"}">
              ${l?`<div class="slot-icon">${ds(l.itemId)}</div>`:""}
              ${l&&l.count>1?`<span class="slot-count">${l.count}</span>`:""}
            </button>`}).join("");this.panelContainer.innerHTML=`
        <div class="modal-card modal-wide">
          <div class="modal-header">
            <h2>Shared Storage Chest (${this.esc(t.ownerName)})</h2>
            <button class="btn-close" id="btn-panel-close">✕</button>
          </div>
          <p class="build-hint">Click any item to transfer instantly between your Backpack and this Shared Chest.</p>
          <div class="chest-split">
            <div>
              <h3>Shared Chest</h3>
              <div class="inv-grid cols-4">${r(i,"chest")}</div>
            </div>
            <div>
              <h3>Your Backpack</h3>
              <div class="inv-grid cols-6">${r(e.inventory,"inventory")}</div>
            </div>
          </div>
        </div>`,this.panelContainer.querySelector("#btn-panel-close")?.addEventListener("click",()=>{this.setPanel("none"),this.actions.onResumeGame()}),this.panelContainer.querySelectorAll(".inv-slot").forEach(o=>{o.addEventListener("click",()=>{const a=o.dataset.side,l=Number(o.dataset.idx);this.actions.onChestTransfer(t.id,a,l)})})}else if(this.activePanel==="pause"){this.panelContainer.innerHTML=`
        <div class="modal-card">
          <div class="modal-header">
            <h2>Wildreach Settings & Multiplayer</h2>
            <button class="btn-close" id="btn-panel-close">✕</button>
          </div>
          <div class="settings-stack">
            <div class="setting-row">
              <span>Graphics Quality</span>
              <div class="seg-group">
                <button class="seg-btn" data-q="low">Low</button>
                <button class="seg-btn" data-q="medium">Medium</button>
                <button class="seg-btn active" data-q="high">High</button>
              </div>
            </div>
            <div class="setting-row">
              <span>Master Audio Volume</span>
              <input type="range" id="rng-vol" min="0" max="100" value="55" />
            </div>
            <div class="setting-row">
              <span>Touch Controls (Mobile/Tablet)</span>
              <div class="seg-group">
                <button class="seg-btn touch-seg ${this.touchMode==="auto"?"active":""}" data-tm="auto">Auto</button>
                <button class="seg-btn touch-seg ${this.touchMode==="on"?"active":""}" data-tm="on">On</button>
                <button class="seg-btn touch-seg ${this.touchMode==="off"?"active":""}" data-tm="off">Off</button>
              </div>
            </div>
            <div class="setting-row">
              <span>Share World Link</span>
              <button class="btn-ghost" id="btn-pause-invite">🔗 Copy Invite URL</button>
            </div>
            <div class="setting-row">
              <span>Multiplayer PvP Flag</span>
              <button class="btn-ghost" id="btn-pvp">${n.pvpEnabled?"⚔ PvP ON (Disable)":"🛡 Co-op Safe (Enable PvP)"}</button>
            </div>
            <div class="setting-row">
              <span>AI Co-op Camp Companion</span>
              <button class="btn-ghost" id="btn-add-bot">+ Summon [AI] Survivor</button>
            </div>
          </div>
          <div class="controls-grid">
            <div><strong>WASD / Space / Shift</strong> Move, Jump, Sprint</div>
            <div><strong>LMB / Hold LMB</strong> Gather, Fight, Draw Bow</div>
            <div><strong>E</strong> Harvest, Open Chest/Door, Drink</div>
            <div><strong>Q / Ctrl</strong> Stamina Dodge Roll</div>
            <div><strong>Tab / I</strong> Inventory & Armor</div>
            <div><strong>C</strong> Crafting & Campfire Cooking</div>
            <div><strong>B / R</strong> Build Menu / Rotate Piece</div>
            <div><strong>V / M / Enter</strong> 3rd-1st Cam / World Map / Chat</div>
            <div><strong>F1–F4</strong> Emotes (Wave, Cheer, Backup, Camp)</div>
          </div>
          <div style="margin-top:16px; display:flex; justify-content:flex-end;">
            <button class="btn-primary" id="btn-resume">Resume Survival</button>
          </div>
        </div>`;const i=()=>{this.setPanel("none"),this.actions.onResumeGame()};this.panelContainer.querySelector("#btn-panel-close")?.addEventListener("click",i),this.panelContainer.querySelector("#btn-resume")?.addEventListener("click",i),this.panelContainer.querySelector("#btn-pvp")?.addEventListener("click",()=>{this.actions.onTogglePvp(),i()}),this.panelContainer.querySelector("#btn-add-bot")?.addEventListener("click",()=>{this.actions.onSpawnBot(),i()}),this.panelContainer.querySelectorAll(".seg-btn[data-q]").forEach(r=>{r.addEventListener("click",()=>{this.panelContainer.querySelectorAll(".seg-btn[data-q]").forEach(o=>o.classList.remove("active")),r.classList.add("active"),this.actions.onSetQuality(r.dataset.q||"high")})}),this.panelContainer.querySelectorAll(".touch-seg").forEach(r=>{r.addEventListener("click",()=>{this.panelContainer.querySelectorAll(".touch-seg").forEach(a=>a.classList.remove("active")),r.classList.add("active");const o=r.dataset.tm||"auto";this.touchMode=o,this.actions.onSetTouchMode(o)})}),this.panelContainer.querySelector("#btn-pause-invite")?.addEventListener("click",()=>{this.copyInvite(this.activeRoomId,this.activeSeed,this.activeServerUrl||void 0)}),this.panelContainer.querySelector("#rng-vol")?.addEventListener("input",r=>{this.actions.onSetVolume(Number(r.target.value)/100)})}}}countInventory(t){const e={};for(const n of t)n&&(e[n.itemId]=(e[n.itemId]??0)+n.count);return e}esc(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}}class O0{renderer;scene;camera;textures;sky;audio=new Vg;net=new N0;input;touch;ui;isTouchDevice=pr.isTouchDevice();world;terrainMesh=null;water=null;env=null;structures=null;wildlife=null;effects=null;minimap=null;currentSeed=-1;inGame=!1;localId="";localVisual=null;remotePlayers=new Map;allPlayers=[];privateState=null;nodeMap=new Map;structureMap=new Map;landmarks=[];worldTime={day:1,timeOfDay:.33,weather:"clear",weatherIntensity:0,windDirX:.78,windDirZ:.62,windSpeed:1};pos=new L(-10,4.4,25);vel=new L;grounded=!0;firstPerson=!1;inputSeq=0;netSendTimer=0;footstepTimer=0;bowCharge=0;chargingBow=!1;screenShake=0;hitFlash=0;localSwingTime=0;activeBuildKind=null;activeBuildFromSlot=void 0;buildRotY=0;ghostPlacement=null;raycaster=new zd;centerNDC=new Lt(0,0);aimNodeId;aimWildlifeId;aimStructureId;aimLootId;aimPlayerId;clock=new Od;elapsed=0;constructor(){const t=document.getElementById("game-canvas");this.renderer=new bg({canvas:t,antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,this.isTouchDevice?1.5:2)),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=ic,this.renderer.toneMapping=sc,this.renderer.toneMappingExposure=1.08,this.scene=new Sd,this.camera=new Ye(this.computeResponsiveFov(window.innerWidth,window.innerHeight),window.innerWidth/window.innerHeight,.15,620),this.textures=Pg(),this.sky=new Ug(this.scene),this.isTouchDevice&&this.sky.setShadowQuality("medium"),this.buildWorldScene(42077),this.ui=new B0({onJoinGame:e=>void this.joinGame(e),onRefreshRooms:()=>this.net.fetchRooms(),onSelectHotbar:e=>this.selectHotbar(e),onConsumeSlot:e=>this.net.sendConsume(e),onEquipArmor:e=>this.net.sendEquipArmor(e),onSwapSlots:(e,n)=>this.net.sendSwapSlots(e,n),onDropSlot:e=>this.net.sendDropSlot(e),onCraft:e=>{this.audio.playSfx("ui"),this.net.sendCraft(e)},onSelectBuildKind:e=>{this.activeBuildKind=e,this.activeBuildFromSlot=void 0},onChestTransfer:(e,n,i)=>this.net.sendChestTransfer({structureId:e,from:n,fromIndex:i}),onSendChat:e=>this.net.sendChat(e),onRespawn:()=>this.net.sendRespawn(),onTogglePvp:()=>this.net.sendTogglePvp(),onSpawnBot:()=>this.net.sendSpawnBot(),onSetQuality:e=>this.applyQuality(e),onSetVolume:e=>this.audio.setVolume(e),onSetTouchMode:e=>this.touch.setMode(e),onOpenMap:()=>this.togglePanel("map"),onResumeGame:()=>{this.syncInputFlags(),this.touch.enabled||this.input.requestPointerLock()}}),this.touch=new pr(t,{onPrimaryDown:()=>this.onPrimaryDown(),onPrimaryUp:()=>this.onPrimaryUp(),onInteract:()=>this.onInteract(),onDodge:()=>this.onDodge(),onRotateBuild:()=>{this.buildRotY=(this.buildRotY+Math.PI/4)%(Math.PI*2),this.audio.playSfx("ui")},onCancelBuild:()=>{this.activeBuildKind=null,this.activeBuildFromSlot=void 0,this.structures?.updateGhost(null,0,0,0,0,!1)},onOpenInventory:()=>this.togglePanel("inventory"),onOpenCrafting:()=>this.togglePanel("crafting"),onOpenBuild:()=>this.togglePanel("build"),onOpenMap:()=>this.togglePanel("map"),onToggleCamera:()=>{this.firstPerson=!this.firstPerson,this.localVisual&&(this.localVisual.group.visible=!this.firstPerson),this.ui.showToast(this.firstPerson?"First-Person Camera":"Third-Person Camera","info")},onToggleChat:()=>this.toggleChat(),onOpenPause:()=>this.togglePanel("pause")}),this.input=new k0(t,{onHotbarSelect:e=>this.selectHotbar(e),onPrimaryDown:()=>this.onPrimaryDown(),onPrimaryUp:()=>this.onPrimaryUp(),onSecondaryDown:()=>this.onSecondaryDown(),onInteract:()=>this.onInteract(),onDodge:()=>this.onDodge(),onToggleCamera:()=>{this.firstPerson=!this.firstPerson,this.localVisual&&(this.localVisual.group.visible=!this.firstPerson),this.ui.showToast(this.firstPerson?"First-Person Camera":"Third-Person Camera","info")},onToggleBuild:()=>this.togglePanel("build"),onRotateBuild:()=>{this.buildRotY=(this.buildRotY+Math.PI/4)%(Math.PI*2),this.audio.playSfx("ui")},onToggleInventory:()=>this.togglePanel("inventory"),onToggleCrafting:()=>this.togglePanel("crafting"),onToggleMap:()=>this.togglePanel("map"),onToggleChat:()=>this.toggleChat(),onTogglePause:()=>{this.ui.chatOpen?(this.ui.setChatOpen(!1),this.syncInputFlags()):this.ui.activePanel!=="none"?(this.ui.setPanel("none"),this.syncInputFlags(),this.input.requestPointerLock()):this.activeBuildKind?(this.activeBuildKind=null,this.structures?.updateGhost(null,0,0,0,0,!1)):this.inGame&&this.togglePanel("pause")},onEmote:e=>{this.inGame&&this.net.sendEmote(e)}}),window.addEventListener("resize",()=>{const e=window.innerWidth,n=window.innerHeight;this.camera.aspect=e/n,this.camera.fov=this.computeResponsiveFov(e,n),this.camera.updateProjectionMatrix(),this.renderer.setSize(e,n)}),this.animate()}computeResponsiveFov(t,e){const n=t/Math.max(1,e);return n<1?qt(68+(1-n)*34,68,92):68}buildWorldScene(t){if(this.currentSeed===t)return;this.currentSeed=t,this.terrainMesh&&this.scene.remove(this.terrainMesh),this.water&&this.scene.remove(this.water.mesh),this.env&&this.scene.remove(this.env.root),this.structures&&this.scene.remove(this.structures.group),this.wildlife&&this.scene.remove(this.wildlife.group),this.effects&&this.scene.remove(this.effects.group),this.world=new Oc(t);const{mesh:e,heightTexture:n}=Ng(this.world,this.textures);this.terrainMesh=e,this.scene.add(e),this.water=new Bg(n),this.scene.add(this.water.mesh),this.env=new Og(this.scene,this.world,this.textures,this.isTouchDevice?3600:7500),this.env.syncNodes(this.world.generateResourceNodes()),this.structures=new zg(this.scene,this.textures),this.wildlife=new Hg(this.scene),this.effects=new Gg(this.scene,this.textures);const i=document.getElementById("minimap-canvas"),r=document.getElementById("fullmap-canvas");this.minimap=new F0(this.world,i,r)}applyQuality(t){this.renderer.setPixelRatio(t==="high"?Math.min(window.devicePixelRatio,2):t==="medium"?1.25:.85),this.sky.setShadowQuality(t),this.ui.showToast(`Graphics Quality set to ${t.toUpperCase()}`,"info")}async joinGame(t){this.audio.unlock(),t.serverUrl!==void 0&&this.net.setServerUrl(t.serverUrl);try{await this.net.connect({onSnapshot:i=>this.handleSnapshot(i),onPrivateState:i=>{this.privateState=i,this.ui.refreshPanelIfOpen(this.ui.openChestId?this.structureMap.get(this.ui.openChestId):void 0)},onNodeUpdate:i=>{this.nodeMap.set(i.id,i),this.env?.upsertNode(i)},onNodeFell:({id:i,dirX:r,dirZ:o})=>{const a=this.env?.getNodeVisualClone(i);a&&this.effects?.spawnFallingTree(a,r,o)},onStructureAdd:i=>{this.structureMap.set(i.id,i),this.structures?.upsert(i)},onStructureUpdate:i=>{this.structureMap.set(i.id,i),this.structures?.upsert(i),this.ui.openChestId===i.id&&this.ui.refreshPanelIfOpen(i)},onStructureRemove:i=>{this.structureMap.delete(i),this.structures?.remove(i),this.ui.openChestId===i&&(this.ui.setPanel("none"),this.syncInputFlags())},onLootAdd:i=>this.effects?.addLoot(i),onLootRemove:i=>this.effects?.removeLoot(i),onCombatEvent:i=>this.projectFloatingText(i.x,i.y,i.z,i.text,i.color),onFxEvent:i=>this.handleFxEvent(i),onChatMessage:i=>this.ui.appendChat(i),onToast:({text:i,tone:r})=>this.ui.showToast(i,r),onConnectionChange:i=>{!i&&this.inGame&&this.ui.showToast("Connection interrupted — attempting to reconnect...","danger")}});const e=await this.net.joinRoom({roomId:t.roomId,roomName:t.roomName,seed:t.seed,playerName:t.playerName,outfit:t.outfit,spawnAiCompanions:t.spawnAiCompanions});this.buildWorldScene(e.room.seed),this.localId=e.playerId,this.landmarks=e.landmarks,this.worldTime=e.time,this.privateState=e.privateState,this.allPlayers=e.players,this.nodeMap.clear();for(const i of e.nodes)this.nodeMap.set(i.id,i);this.env?.syncNodes(e.nodes),this.structureMap.clear();for(const i of e.structures)this.structureMap.set(i.id,i);this.structures?.syncAll(e.structures),this.wildlife?.sync(e.wildlife),this.effects?.syncLootAll(e.loot);for(const i of e.chatHistory)this.ui.appendChat(i);const n=e.players.find(i=>i.id===this.localId);n&&(this.pos.set(n.x,n.y,n.z),this.input.yaw=n.yaw,this.localVisual&&this.scene.remove(this.localVisual.group),this.localVisual=new jl(n.outfit,!1),this.localVisual.group.position.copy(this.pos),this.scene.add(this.localVisual.group)),this.inGame=!0,this.ui.hideTitleScreen(),this.syncInputFlags(),this.touch.enabled||this.input.requestPointerLock(),this.ui.showToast(this.net.isOfflineMode?`Entered ${e.room.name} (Offline / GitHub Pages Mode)`:`Entered ${e.room.name} (Seed ${e.room.seed})`,"good")}catch(e){this.ui.showToast(e instanceof Error?e.message:"Unable to connect to server","danger")}}handleSnapshot(t){this.worldTime=t.time,this.allPlayers=t.players,this.wildlife?.sync(t.wildlife),this.effects?.syncProjectiles(t.projectiles);const e=new Set;for(const n of t.players){if(n.id===this.localId){(!n.alive||this.pos.distanceTo(new L(n.x,n.y,n.z))>7.5)&&this.pos.set(n.x,n.y,n.z);continue}e.add(n.id);let i=this.remotePlayers.get(n.id);if(!i){const r=new jl(n.outfit,!0);r.group.position.set(n.x,n.y,n.z),r.group.traverse(o=>{o.userData.playerId=n.id}),this.scene.add(r.group),i={visual:r,targetPos:new L(n.x,n.y,n.z),targetYaw:n.yaw,state:n},this.remotePlayers.set(n.id,i)}i.targetPos.set(n.x,n.y,n.z),i.targetYaw=n.yaw,i.state=n}for(const[n,i]of Array.from(this.remotePlayers.entries()))e.has(n)||(this.scene.remove(i.visual.group),this.remotePlayers.delete(n))}handleFxEvent(t){if(t.kind==="thunder"){this.sky.triggerLightning(),this.audio.playSfx("thunder");return}const e=Math.hypot(t.x-this.pos.x,t.z-this.pos.z);e<42&&(t.kind==="chop"?(this.audio.playSfx("chop"),this.effects?.spawnBurst(t.x,t.y,t.z,"#a66b3a",9,4.4)):t.kind==="mine"?(this.audio.playSfx("mine"),this.effects?.spawnBurst(t.x,t.y,t.z,"#fbbf24",10,5)):t.kind==="hit"||t.kind==="arrow_hit"?(this.audio.playSfx("hit"),this.effects?.spawnBurst(t.x,t.y,t.z,t.color||"#f87171",10,4.8),e<2.2&&(this.screenShake=.24,this.hitFlash=1)):t.kind==="build"?(this.audio.playSfx("build"),this.effects?.spawnBurst(t.x,t.y,t.z,"#d6c3a5",12,3.6)):t.kind==="eat"?this.audio.playSfx("eat"):t.kind==="drink"?this.audio.playSfx("drink"):t.kind==="levelup"&&(this.audio.playSfx("levelup"),this.effects?.spawnBurst(t.x,t.y,t.z,"#38f2dc",20,6.2,4)))}projectFloatingText(t,e,n,i,r){const o=new L(t,e,n).project(this.camera);if(o.z>1)return;const a=(o.x*.5+.5)*window.innerWidth,l=(-o.y*.5+.5)*window.innerHeight;this.ui.spawnFloatingText(a,l,i,r)}selectHotbar(t){if(!this.inGame)return;this.net.sendEquip(t),this.audio.playSfx("ui");const e=this.privateState?.inventory[t],n=Ue(e?.itemId);n?.structureKind?(this.activeBuildKind=n.structureKind,this.activeBuildFromSlot=t):n?.toolKind!=="hammer"&&(this.activeBuildKind=null,this.activeBuildFromSlot=void 0,this.structures?.updateGhost(null,0,0,0,0,!1))}togglePanel(t){this.inGame&&(this.ui.activePanel===t?(this.ui.setPanel("none"),this.syncInputFlags(),this.input.requestPointerLock()):(this.ui.setChatOpen(!1),this.ui.setPanel(t),this.syncInputFlags(),this.input.exitPointerLock(),t==="map"&&this.minimap?.renderFullMap(this.pos.x,this.pos.z,this.localId,this.allPlayers,Array.from(this.structureMap.values()),this.landmarks)))}toggleChat(){if(!this.inGame||this.ui.activePanel!=="none")return;const t=!this.ui.chatOpen;this.ui.setChatOpen(t),this.syncInputFlags(),t?this.input.exitPointerLock():this.input.requestPointerLock()}syncInputFlags(){this.input.uiOpen=this.ui.activePanel!=="none",this.input.chatOpen=this.ui.chatOpen}getLocalPlayerState(){return this.allPlayers.find(t=>t.id===this.localId)}onPrimaryDown(){const t=this.getLocalPlayerState();if(!t||!t.alive)return;if(this.activeBuildKind&&this.ghostPlacement){if(!this.ghostPlacement.valid){this.ui.showToast("Cannot place structure here!","warn");return}this.net.sendBuild({kind:this.activeBuildKind,x:this.ghostPlacement.x,y:this.ghostPlacement.y,z:this.ghostPlacement.z,rotY:this.ghostPlacement.rotY,fromItemSlot:this.activeBuildFromSlot}),this.activeBuildFromSlot!==void 0&&(this.activeBuildKind=null,this.activeBuildFromSlot=void 0,this.structures?.updateGhost(null,0,0,0,0,!1));return}const e=Ue(t.equippedItemId);if(e?.category==="consumable"){this.net.sendConsume(t.equippedSlot);return}if(e?.isRanged){this.chargingBow=!0,this.bowCharge=.25;return}this.localSwingTime=.36,this.firePrimaryAction(0)}onPrimaryUp(){this.chargingBow&&(this.chargingBow=!1,this.audio.playSfx("arrow"),this.firePrimaryAction(this.bowCharge),this.bowCharge=0,this.ui.setBowCharge(0))}onSecondaryDown(){if(this.activeBuildKind){this.activeBuildKind=null,this.activeBuildFromSlot=void 0,this.structures?.updateGhost(null,0,0,0,0,!1),this.ui.showToast("Exited Build Preview","info");return}const t=this.getLocalPlayerState();if(!t||!t.alive)return;const e=Ue(t.equippedItemId);e?.toolKind==="hammer"&&this.aimStructureId?this.net.sendDemolish(this.aimStructureId):e?.toolKind==="hammer"&&this.togglePanel("build")}onInteract(){const t=this.getLocalPlayerState();if(!(!t||!t.alive)){if(this.aimStructureId){const e=this.structureMap.get(this.aimStructureId);if(e?.kind==="storage_chest"){this.ui.setPanel("chest",e),this.syncInputFlags(),this.input.exitPointerLock();return}if(e){this.net.sendInteract({structureId:e.id});return}}if(this.aimLootId){this.net.sendInteract({lootId:this.aimLootId});return}if(t.status.nearFreshWater){this.net.sendInteract({drinkWater:!0});return}this.aimNodeId&&this.firePrimaryAction(0)}}onDodge(){const t=this.computeMoveInputDir();t.lengthSq()<.01&&t.set(-Math.sin(this.input.yaw),0,-Math.cos(this.input.yaw)),this.net.sendDodge({x:t.x,z:t.z}),this.pos.x=qt(this.pos.x+t.x*3.1,-170,170),this.pos.z=qt(this.pos.z+t.z*3.1,-170,170)}firePrimaryAction(t){const e=new L(0,0,-1).applyQuaternion(this.camera.quaternion).normalize();this.net.sendAction({aimX:this.pos.x+e.x*4,aimY:this.pos.y+1.4+e.y*4,aimZ:this.pos.z+e.z*4,dirX:e.x,dirY:e.y,dirZ:e.z,charge:t,targetNodeId:this.aimNodeId,targetWildlifeId:this.aimWildlifeId,targetPlayerId:this.aimPlayerId,targetStructureId:this.aimStructureId})}computeMoveInputDir(){const t=new L(-Math.sin(this.input.yaw),0,-Math.cos(this.input.yaw)),e=new L(Math.cos(this.input.yaw),0,-Math.sin(this.input.yaw)),n=new L;return(this.input.keys.has("KeyW")||this.input.keys.has("ArrowUp"))&&n.add(t),(this.input.keys.has("KeyS")||this.input.keys.has("ArrowDown"))&&n.sub(t),(this.input.keys.has("KeyD")||this.input.keys.has("ArrowRight"))&&n.add(e),(this.input.keys.has("KeyA")||this.input.keys.has("ArrowLeft"))&&n.sub(e),(Math.abs(this.touch.moveX)>.08||Math.abs(this.touch.moveY)>.08)&&(n.addScaledVector(t,this.touch.moveY),n.addScaledVector(e,this.touch.moveX)),n.lengthSq()>1&&n.normalize(),n}getSupportHeight(t,e){let n=this.world.getHeight(t,e);for(const i of this.structureMap.values())i.kind==="wood_foundation"&&Math.abs(t-i.x)<1.68&&Math.abs(e-i.z)<1.68&&(n=Math.max(n,i.y+.53));return n}updateLocalPlayer(t){const e=this.getLocalPlayerState();if(!e)return;const n=this.input.consumeWheel();if(n!==0){const h=(e.equippedSlot+(n>0?1:-1)+9)%9;this.selectHotbar(h)}this.chargingBow&&(this.bowCharge=Math.min(1,this.bowCharge+t*.95),this.ui.setBowCharge(this.bowCharge));let i="idle",r=!1,o=!1;if(e.alive&&!this.input.uiOpen&&!this.input.chatOpen){const h=this.touch.consumeLookDelta();(h.dx!==0||h.dy!==0)&&(this.input.yaw-=h.dx*.0052,this.input.pitch=qt(this.input.pitch+h.dy*.0044,-.95,1.22));const d=this.computeMoveInputDir(),u=(this.input.keys.has("ShiftLeft")||this.input.keys.has("ShiftRight")||this.touch.sprinting)&&e.vitals.stamina>6;o=this.getSupportHeight(this.pos.x,this.pos.z)<Tg&&this.pos.y<=nn-.15;const g=o?3.9:u&&d.lengthSq()>.04?8.2:5.1;r=u&&!o&&d.lengthSq()>.04;const _=d.x*g,m=d.z*g,f=this.grounded||o?14:5;if(this.vel.x+=(_-this.vel.x)*Math.min(1,t*f),this.vel.z+=(m-this.vel.z)*Math.min(1,t*f),(this.input.keys.has("Space")||this.touch.jumping)&&(o?this.vel.y=2.6:this.grounded&&(this.vel.y=7.4,this.grounded=!1)),o){const E=nn-.55;this.vel.y+=(E-this.pos.y)*9*t,this.vel.y*=.88}else this.vel.y-=20.5*t;const S=qt(this.pos.x+this.vel.x*t,-170,170),b=qt(this.pos.z+this.vel.z*t,-170,170);this.collidesWithSolidStructure(S,b,this.pos.y)?(this.vel.x=0,this.vel.z=0):(this.pos.x=S,this.pos.z=b),this.pos.y+=this.vel.y*t;const x=this.getSupportHeight(this.pos.x,this.pos.z);!o&&this.pos.y<=x?(this.pos.y=x,this.vel.y=0,this.grounded=!0):o&&this.pos.y<x&&(this.pos.y=x);const C=Math.hypot(this.vel.x,this.vel.z);if(o?i="swim":this.grounded?C>6.2?i="run":C>.55&&(i="walk"):i="jump",C>1.2&&(this.grounded||o)&&(this.footstepTimer-=t*(r?1.45:1),this.footstepTimer<=0)){this.footstepTimer=.42;const E=this.world.sample(this.pos.x,this.pos.z),A=this.pos.y<nn+.15?"water":E.biome==="beach"?"sand":E.biome==="volcanic"||E.biome==="highland"?"stone":"grass";this.audio.playFootstep(A)}}else this.vel.set(0,0,0),i=e.alive?"idle":"dead";this.localSwingTime>0&&(this.localSwingTime=Math.max(0,this.localSwingTime-t)),this.hitFlash>0&&(this.hitFlash=Math.max(0,this.hitFlash-t*2.8)),this.localVisual&&(this.localVisual.group.position.copy(this.pos),this.localVisual.group.rotation.y=this.input.yaw+Math.PI,this.localVisual.group.visible=!this.firstPerson,this.localVisual.animate(t,{...e,vx:this.vel.x,vz:this.vel.z,anim:i,swingTime:Math.max(e.swingTime,this.localSwingTime)},this.elapsed));const a=this.pos.y+1.62,l=new on(-this.input.pitch,this.input.yaw,0,"YXZ"),c=new L(0,0,-1).applyEuler(l);if(this.firstPerson)this.camera.position.set(this.pos.x,a,this.pos.z),this.camera.lookAt(this.pos.x+c.x*10,a+c.y*10,this.pos.z+c.z*10);else{const h=this.chargingBow?3.1:4.8,d=new L(Math.cos(this.input.yaw),0,-Math.sin(this.input.yaw)),u=new L(this.pos.x,a+.35,this.pos.z).addScaledVector(c,-h).addScaledVector(d,.55),p=this.world.getHeight(u.x,u.z)+.45;u.y<p&&(u.y=p),this.screenShake>0&&(this.screenShake=Math.max(0,this.screenShake-t),u.x+=(Math.random()-.5)*this.screenShake*.6,u.y+=(Math.random()-.5)*this.screenShake*.6),this.camera.position.copy(u),this.camera.lookAt(this.pos.x+c.x*16+d.x*.25,a+c.y*16,this.pos.z+c.z*16+d.z*.25)}this.netSendTimer+=t,this.netSendTimer>=.05&&(this.netSendTimer=0,this.net.sendInput({x:Math.round(this.pos.x*100)/100,y:Math.round(this.pos.y*100)/100,z:Math.round(this.pos.z*100)/100,vx:Math.round(this.vel.x*100)/100,vy:Math.round(this.vel.y*100)/100,vz:Math.round(this.vel.z*100)/100,yaw:Math.round((this.input.yaw+Math.PI)*1e3)/1e3,pitch:Math.round(this.input.pitch*1e3)/1e3,anim:i,sprinting:r,swimming:o,seq:++this.inputSeq}))}collidesWithSolidStructure(t,e,n){for(const i of this.structureMap.values()){const r=ci[i.kind];if(!r.solidCollision||i.kind==="wood_doorway"&&i.isOpen||n>i.y+r.height-.2)continue;const o=t-i.x,a=e-i.z,l=Math.cos(-i.rotY),c=Math.sin(-i.rotY),h=o*l-a*c,d=o*c+a*l;if(Math.abs(h)<r.width*.48+.35&&Math.abs(d)<r.depth*.48+.35)return!0}return!1}updateTargetingAndBuildGhost(){this.aimNodeId=void 0,this.aimWildlifeId=void 0,this.aimStructureId=void 0,this.aimLootId=void 0,this.aimPlayerId=void 0;const t=this.getLocalPlayerState();if(!t||!t.alive||this.ui.activePanel!=="none"){this.ui.setInteractPrompt(null),this.structures?.updateGhost(null,0,0,0,0,!1);return}if(this.raycaster.setFromCamera(this.centerNDC,this.camera),this.activeBuildKind&&this.terrainMesh){const a=this.raycaster.intersectObject(this.terrainMesh,!1);let l;if(a.length>0&&a[0].distance<18)l=a[0].point;else{const g=new L(0,0,-1).applyQuaternion(this.camera.quaternion);l=this.pos.clone().addScaledVector(g,5.5)}const c=Hc(this.activeBuildKind,{x:l.x,y:l.y,z:l.z},this.buildRotY,Array.from(this.structureMap.values()),(g,_)=>this.world.getHeight(g,_)),h=Math.hypot(c.x-this.pos.x,c.z-this.pos.z)<=11.5,d=this.world.getHeight(c.x,c.z)>=nn-.1,u=h&&d;this.ghostPlacement={...c,valid:u},this.structures?.updateGhost(this.activeBuildKind,c.x,c.y,c.z,c.rotY,u);const p=ci[this.activeBuildKind];this.ui.setInteractPrompt(`[LMB] Place ${p.name}${c.snapped?" (Snapped)":""}`,"[R] Rotate • [RMB] Cancel • [B] Blueprints");return}else this.ghostPlacement=null,this.structures?.updateGhost(null,0,0,0,0,!1);const e=[];this.effects&&e.push(this.effects.lootGroup),this.wildlife&&e.push(this.wildlife.group),this.structures&&e.push(this.structures.group),this.env&&e.push(this.env.nodeGroup);for(const a of this.remotePlayers.values())e.push(a.visual.group);const n=this.raycaster.intersectObjects(e,!0);let i=null,r,o;for(const a of n){if(a.distance>10.5)break;const l=a.object.userData;if(!(a.point.distanceTo(this.pos)>5.8)){if(l.lootId){this.aimLootId=l.lootId;const h=Ue(l.lootItemId);i=`[E] Pick up ${l.lootCount}× ${h?.name??l.lootItemId}`;break}if(l.wildlifeId){this.aimWildlifeId=l.wildlifeId,i=`[LMB] Hunt ${l.wildlifeKind.toUpperCase()}`;break}if(l.playerId&&t.pvpEnabled){this.aimPlayerId=l.playerId,i="[LMB] Duel Survivor";break}if(l.structureId){const h=this.structureMap.get(l.structureId);if(h){this.aimStructureId=h.id;const d=ci[h.kind];h.kind==="storage_chest"?i="[E] Open Shared Chest":h.kind==="wood_doorway"?i=`[E] ${h.isOpen?"Close":"Open"} Timber Door`:h.kind==="campfire"?(i=`[E] Refuel Campfire (Fuel ${Math.round(h.fuel??0)}%)`,r="Press [C] to roast meat & stew",o=h.fuel??0):h.kind==="rain_collector"?(i=`[E] Drink Rainwater (${Math.round(h.waterLevel??0)}%)`,o=h.waterLevel??0):h.kind==="bedroll"?i="[E] Set Respawn Point":(i=`${d.name} (${h.hp}/${h.maxHp} HP)`,o=h.hp/h.maxHp*100),Ue(t.equippedItemId)?.toolKind==="hammer"&&h.ownerId!=="world"&&(r="[LMB] Repair • [RMB] Dismantle");break}}if(l.nodeId){const h=this.nodeMap.get(l.nodeId);if(h&&!h.depleted){this.aimNodeId=h.id;const d=Math.round(h.hp/h.maxHp*100);i=`[LMB] Harvest ${h.kind.replace(/_/g," ").replace(/\b\w/g,p=>p.toUpperCase())}`,o=d;break}}}}!i&&t.status.nearFreshWater&&(i="[E] Drink Crystal Spring Water",r="Restores +45 Thirst"),this.ui.setInteractPrompt(i,r,o)}animate=()=>{requestAnimationFrame(this.animate);const t=Math.min(.08,this.clock.getDelta());if(this.elapsed+=t,this.inGame){this.updateLocalPlayer(t),this.updateTargetingAndBuildGhost(),this.sky.update(t,this.elapsed,this.worldTime,this.pos);const e=Math.min(1,t*12);for(const i of this.remotePlayers.values()){i.visual.group.position.lerp(i.targetPos,e);let r=i.targetYaw-i.visual.group.rotation.y;for(;r>Math.PI;)r-=Math.PI*2;for(;r<-Math.PI;)r+=Math.PI*2;i.visual.group.rotation.y+=r*e,i.visual.animate(t,i.state,this.elapsed)}const n=this.getLocalPlayerState();if(n&&this.privateState){const i=this.world.sample(this.pos.x,this.pos.z),r={ocean:"Coastal Sea",beach:"Golden Shores",meadow:"Emerald Meadows",pine:"Whispering Pines",highland:"Granite Highlands",volcanic:"Obsidian Spire",marsh:"Misty Bog"};this.ui.updateHud(n,this.privateState,this.worldTime,r[i.biome]??"Wildreach",this.allPlayers.length,this.net.pingMs,this.input.yaw,this.input.pointerLocked,this.touch.enabled,this.net.isOfflineMode,this.input.pointerLockBlocked);const o=!!(this.aimLootId||this.aimStructureId||n.status.nearFreshWater||this.aimNodeId);this.touch.setContextualState(o,!!this.activeBuildKind,this.ui.activePanel==="none"&&!this.ui.chatOpen&&n.alive);const a=Array.from(this.structureMap.values());this.minimap?.renderHud(this.pos.x,this.pos.z,this.input.yaw,this.localId,this.allPlayers,a,this.landmarks);let l=99;for(const h of this.structures?.getLitCampfirePositions()??[])l=Math.min(l,h.distanceTo(this.pos));const c=Math.max(0,125-Math.hypot(this.pos.x,this.pos.z));this.audio.updateAmbient(t,this.worldTime,i.biome,l,c),this.ui.setScreenVignette({hitFlash:this.hitFlash,lowHp:n.vitals.hp<n.vitals.maxHp*.3,chilled:n.status.chilled,underwater:this.camera.position.y<nn+.08,warmFire:n.status.nearCampfire&&(this.worldTime.timeOfDay<.25||this.worldTime.timeOfDay>.74)})}}else{const e=this.elapsed*.085,n=54,i=-10+Math.cos(e)*n,r=18+Math.sin(e)*n;this.camera.position.set(i,24+Math.sin(this.elapsed*.25)*3.5,r),this.camera.lookAt(-6,5.5,16),this.sky.update(t,this.elapsed,this.worldTime,this.camera.position)}this.water?.update(this.elapsed,this.worldTime,this.sky.sunDirection,this.sky.sunLight.color,this.sky.horizonColor,this.sky.fog.density),this.env?.update(t,this.elapsed,this.worldTime.windSpeed),this.structures?.update(t,this.elapsed),this.wildlife?.update(t,this.elapsed,this.camera),this.effects?.update(t,this.elapsed,this.worldTime,this.inGame?this.pos:this.camera.position,this.structures?.getLitCampfirePositions()??[]),this.renderer.render(this.scene,this.camera)}}new O0;
