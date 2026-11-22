(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function e(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=e(i);fetch(i.href,s)}})();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const da="174",ph=0,Va=1,mh=2,ll=1,hl=2,Dn=3,jn=0,Xe=1,de=2,$n=0,Oi=1,Gi=2,Wa=3,Xa=4,gh=5,ai=100,vh=101,_h=102,yh=103,xh=104,wh=200,Mh=201,bh=202,Sh=203,gr=204,vr=205,Eh=206,Th=207,Ah=208,Ch=209,Rh=210,Ih=211,Ph=212,Lh=213,Dh=214,_r=0,yr=1,xr=2,Vi=3,wr=4,Mr=5,br=6,Sr=7,ua=0,kh=1,Uh=2,Yn=0,Nh=1,Bh=2,Fh=3,dl=4,Oh=5,zh=6,Hh=7,ul=300,Wi=301,Xi=302,Er=303,Tr=304,xo=306,vs=1e3,kn=1001,Ar=1002,Qe=1003,Gh=1004,Ss=1005,an=1006,Po=1007,li=1008,Bn=1009,fl=1010,pl=1011,_s=1012,fa=1013,di=1014,Mn=1015,ys=1016,pa=1017,ma=1018,qi=1020,ml=35902,gl=1021,vl=1022,cn=1023,_l=1024,yl=1025,zi=1026,$i=1027,ga=1028,va=1029,xl=1030,_a=1031,ya=1033,eo=33776,no=33777,io=33778,so=33779,Cr=35840,Rr=35841,Ir=35842,Pr=35843,Lr=36196,Dr=37492,kr=37496,Ur=37808,Nr=37809,Br=37810,Fr=37811,Or=37812,zr=37813,Hr=37814,Gr=37815,Vr=37816,Wr=37817,Xr=37818,qr=37819,$r=37820,Yr=37821,oo=36492,Kr=36494,jr=36495,wl=36283,Zr=36284,Jr=36285,Qr=36286,Vh=3200,Wh=3201,xa=0,Xh=1,qn="",$e="srgb",Yi="srgb-linear",fo="linear",ce="srgb",gi=7680,qa=519,qh=512,$h=513,Yh=514,Ml=515,Kh=516,jh=517,Zh=518,Jh=519,ta=35044,$a="300 es",Un=2e3,po=2001;class ji{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const i=n[t];if(i!==void 0){const s=i.indexOf(e);s!==-1&&i.splice(s,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let s=0,r=i.length;s<r;s++)i[s].call(this,t);t.target=null}}}const Be=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Lo=Math.PI/180,ea=180/Math.PI;function Kn(){const o=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Be[o&255]+Be[o>>8&255]+Be[o>>16&255]+Be[o>>24&255]+"-"+Be[t&255]+Be[t>>8&255]+"-"+Be[t>>16&15|64]+Be[t>>24&255]+"-"+Be[e&63|128]+Be[e>>8&255]+"-"+Be[e>>16&255]+Be[e>>24&255]+Be[n&255]+Be[n>>8&255]+Be[n>>16&255]+Be[n>>24&255]).toLowerCase()}function Vt(o,t,e){return Math.max(t,Math.min(e,o))}function Qh(o,t){return(o%t+t)%t}function Do(o,t,e){return(1-e)*o+e*t}function wn(o,t){switch(t.constructor){case Float32Array:return o;case Uint32Array:return o/4294967295;case Uint16Array:return o/65535;case Uint8Array:return o/255;case Int32Array:return Math.max(o/2147483647,-1);case Int16Array:return Math.max(o/32767,-1);case Int8Array:return Math.max(o/127,-1);default:throw new Error("Invalid component type.")}}function le(o,t){switch(t.constructor){case Float32Array:return o;case Uint32Array:return Math.round(o*4294967295);case Uint16Array:return Math.round(o*65535);case Uint8Array:return Math.round(o*255);case Int32Array:return Math.round(o*2147483647);case Int16Array:return Math.round(o*32767);case Int8Array:return Math.round(o*127);default:throw new Error("Invalid component type.")}}class Dt{constructor(t=0,e=0){Dt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Vt(this.x,t.x,e.x),this.y=Vt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Vt(this.x,t,e),this.y=Vt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Vt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Vt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,r=this.y-t.y;return this.x=s*n-r*i+t.x,this.y=s*i+r*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ot{constructor(t,e,n,i,s,r,a,c,l){Ot.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,r,a,c,l)}set(t,e,n,i,s,r,a,c,l){const h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=s,h[5]=c,h[6]=n,h[7]=r,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,r=n[0],a=n[3],c=n[6],l=n[1],h=n[4],d=n[7],u=n[2],f=n[5],g=n[8],v=i[0],p=i[3],m=i[6],w=i[1],b=i[4],x=i[7],I=i[2],E=i[5],A=i[8];return s[0]=r*v+a*w+c*I,s[3]=r*p+a*b+c*E,s[6]=r*m+a*x+c*A,s[1]=l*v+h*w+d*I,s[4]=l*p+h*b+d*E,s[7]=l*m+h*x+d*A,s[2]=u*v+f*w+g*I,s[5]=u*p+f*b+g*E,s[8]=u*m+f*x+g*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],r=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*r*h-e*a*l-n*s*h+n*a*c+i*s*l-i*r*c}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],r=t[4],a=t[5],c=t[6],l=t[7],h=t[8],d=h*r-a*l,u=a*c-h*s,f=l*s-r*c,g=e*d+n*u+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return t[0]=d*v,t[1]=(i*l-h*n)*v,t[2]=(a*n-i*r)*v,t[3]=u*v,t[4]=(h*e-i*c)*v,t[5]=(i*s-a*e)*v,t[6]=f*v,t[7]=(n*c-l*e)*v,t[8]=(r*e-n*s)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,r,a){const c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*r+l*a)+r+t,-i*l,i*c,-i*(-l*r+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(ko.makeScale(t,e)),this}rotate(t){return this.premultiply(ko.makeRotation(-t)),this}translate(t,e){return this.premultiply(ko.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const ko=new Ot;function bl(o){for(let t=o.length-1;t>=0;--t)if(o[t]>=65535)return!0;return!1}function mo(o){return document.createElementNS("http://www.w3.org/1999/xhtml",o)}function td(){const o=mo("canvas");return o.style.display="block",o}const Ya={};function oi(o){o in Ya||(Ya[o]=!0,console.warn(o))}function ed(o,t,e){return new Promise(function(n,i){function s(){switch(o.clientWaitSync(t,o.SYNC_FLUSH_COMMANDS_BIT,0)){case o.WAIT_FAILED:i();break;case o.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}function nd(o){const t=o.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function id(o){const t=o.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Ka=new Ot().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ja=new Ot().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function sd(){const o={enabled:!0,workingColorSpace:Yi,spaces:{},convert:function(i,s,r){return this.enabled===!1||s===r||!s||!r||(this.spaces[s].transfer===ce&&(i.r=Nn(i.r),i.g=Nn(i.g),i.b=Nn(i.b)),this.spaces[s].primaries!==this.spaces[r].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===ce&&(i.r=Hi(i.r),i.g=Hi(i.g),i.b=Hi(i.b))),i},fromWorkingColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},toWorkingColorSpace:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===qn?fo:this.spaces[i].transfer},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,r){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return o.define({[Yi]:{primaries:t,whitePoint:n,transfer:fo,toXYZ:Ka,fromXYZ:ja,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:$e},outputColorSpaceConfig:{drawingBufferColorSpace:$e}},[$e]:{primaries:t,whitePoint:n,transfer:ce,toXYZ:Ka,fromXYZ:ja,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:$e}}}),o}const Qt=sd();function Nn(o){return o<.04045?o*.0773993808:Math.pow(o*.9478672986+.0521327014,2.4)}function Hi(o){return o<.0031308?o*12.92:1.055*Math.pow(o,.41666)-.055}let vi;class od{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{vi===void 0&&(vi=mo("canvas")),vi.width=t.width,vi.height=t.height;const n=vi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=vi}return e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=mo("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),s=i.data;for(let r=0;r<s.length;r++)s[r]=Nn(s[r]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Nn(e[n]/255)*255):e[n]=Nn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let rd=0;class wa{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:rd++}),this.uuid=Kn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let r=0,a=i.length;r<a;r++)i[r].isDataTexture?s.push(Uo(i[r].image)):s.push(Uo(i[r]))}else s=Uo(i);n.url=s}return e||(t.images[this.uuid]=n),n}}function Uo(o){return typeof HTMLImageElement<"u"&&o instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&o instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&o instanceof ImageBitmap?od.getDataURL(o):o.data?{data:Array.from(o.data),width:o.width,height:o.height,type:o.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let ad=0;class Oe extends ji{constructor(t=Oe.DEFAULT_IMAGE,e=Oe.DEFAULT_MAPPING,n=kn,i=kn,s=an,r=li,a=cn,c=Bn,l=Oe.DEFAULT_ANISOTROPY,h=qn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ad++}),this.uuid=Kn(),this.name="",this.source=new wa(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=r,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Dt(0,0),this.repeat=new Dt(1,1),this.center=new Dt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ot,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==ul)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case vs:t.x=t.x-Math.floor(t.x);break;case kn:t.x=t.x<0?0:1;break;case Ar:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case vs:t.y=t.y-Math.floor(t.y);break;case kn:t.y=t.y<0?0:1;break;case Ar:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Oe.DEFAULT_IMAGE=null;Oe.DEFAULT_MAPPING=ul;Oe.DEFAULT_ANISOTROPY=1;class he{constructor(t=0,e=0,n=0,i=1){he.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=this.w,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i+r[12]*s,this.y=r[1]*e+r[5]*n+r[9]*i+r[13]*s,this.z=r[2]*e+r[6]*n+r[10]*i+r[14]*s,this.w=r[3]*e+r[7]*n+r[11]*i+r[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,s;const c=t.elements,l=c[0],h=c[4],d=c[8],u=c[1],f=c[5],g=c[9],v=c[2],p=c[6],m=c[10];if(Math.abs(h-u)<.01&&Math.abs(d-v)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+v)<.1&&Math.abs(g+p)<.1&&Math.abs(l+f+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const b=(l+1)/2,x=(f+1)/2,I=(m+1)/2,E=(h+u)/4,A=(d+v)/4,R=(g+p)/4;return b>x&&b>I?b<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(b),i=E/n,s=A/n):x>I?x<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(x),n=E/i,s=R/i):I<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(I),n=A/s,i=R/s),this.set(n,i,s,e),this}let w=Math.sqrt((p-g)*(p-g)+(d-v)*(d-v)+(u-h)*(u-h));return Math.abs(w)<.001&&(w=1),this.x=(p-g)/w,this.y=(d-v)/w,this.z=(u-h)/w,this.w=Math.acos((l+f+m-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Vt(this.x,t.x,e.x),this.y=Vt(this.y,t.y,e.y),this.z=Vt(this.z,t.z,e.z),this.w=Vt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Vt(this.x,t,e),this.y=Vt(this.y,t,e),this.z=Vt(this.z,t,e),this.w=Vt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Vt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class cd extends ji{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new he(0,0,t,e),this.scissorTest=!1,this.viewport=new he(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:an,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new Oe(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const r=n.count;for(let a=0;a<r;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const i=Object.assign({},t.textures[e].image);this.textures[e].source=new wa(i)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ui extends cd{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Sl extends Oe{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Qe,this.minFilter=Qe,this.wrapR=kn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class ld extends Oe{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Qe,this.minFilter=Qe,this.wrapR=kn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class xs{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,s,r,a){let c=n[i+0],l=n[i+1],h=n[i+2],d=n[i+3];const u=s[r+0],f=s[r+1],g=s[r+2],v=s[r+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=d;return}if(a===1){t[e+0]=u,t[e+1]=f,t[e+2]=g,t[e+3]=v;return}if(d!==v||c!==u||l!==f||h!==g){let p=1-a;const m=c*u+l*f+h*g+d*v,w=m>=0?1:-1,b=1-m*m;if(b>Number.EPSILON){const I=Math.sqrt(b),E=Math.atan2(I,m*w);p=Math.sin(p*E)/I,a=Math.sin(a*E)/I}const x=a*w;if(c=c*p+u*x,l=l*p+f*x,h=h*p+g*x,d=d*p+v*x,p===1-a){const I=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=I,l*=I,h*=I,d*=I}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,i,s,r){const a=n[i],c=n[i+1],l=n[i+2],h=n[i+3],d=s[r],u=s[r+1],f=s[r+2],g=s[r+3];return t[e]=a*g+h*d+c*f-l*u,t[e+1]=c*g+h*u+l*d-a*f,t[e+2]=l*g+h*f+a*u-c*d,t[e+3]=h*g-a*d-c*u-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,s=t._z,r=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(i/2),d=a(s/2),u=c(n/2),f=c(i/2),g=c(s/2);switch(r){case"XYZ":this._x=u*h*d+l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d+u*f*g;break;case"YZX":this._x=u*h*d+l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d-u*f*g;break;case"XZY":this._x=u*h*d-l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d+u*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],s=e[8],r=e[1],a=e[5],c=e[9],l=e[2],h=e[6],d=e[10],u=n+a+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-c)*f,this._y=(s-l)*f,this._z=(r-i)*f}else if(n>a&&n>d){const f=2*Math.sqrt(1+n-a-d);this._w=(h-c)/f,this._x=.25*f,this._y=(i+r)/f,this._z=(s+l)/f}else if(a>d){const f=2*Math.sqrt(1+a-n-d);this._w=(s-l)/f,this._x=(i+r)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+d-n-a);this._w=(r-i)/f,this._x=(s+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Vt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,s=t._z,r=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+r*a+i*l-s*c,this._y=i*h+r*c+s*a-n*l,this._z=s*h+r*l+n*c-i*a,this._w=r*h-n*a-i*c-s*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,s=this._z,r=this._w;let a=r*t._w+n*t._x+i*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=r,this._x=n,this._y=i,this._z=s,this;const c=1-a*a;if(c<=Number.EPSILON){const f=1-e;return this._w=f*r+e*this._w,this._x=f*n+e*this._x,this._y=f*i+e*this._y,this._z=f*s+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),d=Math.sin((1-e)*h)/l,u=Math.sin(e*h)/l;return this._w=r*d+this._w*u,this._x=n*d+this._x*u,this._y=i*d+this._y*u,this._z=s*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class D{constructor(t=0,e=0,n=0){D.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Za.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Za.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=t.elements,r=1/(s[3]*e+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*r,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*r,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*r,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,s=t.x,r=t.y,a=t.z,c=t.w,l=2*(r*i-a*n),h=2*(a*e-s*i),d=2*(s*n-r*e);return this.x=e+c*l+r*d-a*h,this.y=n+c*h+a*l-s*d,this.z=i+c*d+s*h-r*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Vt(this.x,t.x,e.x),this.y=Vt(this.y,t.y,e.y),this.z=Vt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Vt(this.x,t,e),this.y=Vt(this.y,t,e),this.z=Vt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Vt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,s=t.z,r=e.x,a=e.y,c=e.z;return this.x=i*c-s*a,this.y=s*r-n*c,this.z=n*a-i*r,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return No.copy(this).projectOnVector(t),this.sub(No)}reflect(t){return this.sub(No.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Vt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const No=new D,Za=new xs;class fi{constructor(t=new D(1/0,1/0,1/0),e=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(fn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(fn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=fn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let r=0,a=s.count;r<a;r++)t.isMesh===!0?t.getVertexPosition(r,fn):fn.fromBufferAttribute(s,r),fn.applyMatrix4(t.matrixWorld),this.expandByPoint(fn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Es.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Es.copy(n.boundingBox)),Es.applyMatrix4(t.matrixWorld),this.union(Es)}const i=t.children;for(let s=0,r=i.length;s<r;s++)this.expandByObject(i[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,fn),fn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ts),Ts.subVectors(this.max,ts),_i.subVectors(t.a,ts),yi.subVectors(t.b,ts),xi.subVectors(t.c,ts),On.subVectors(yi,_i),zn.subVectors(xi,yi),Qn.subVectors(_i,xi);let e=[0,-On.z,On.y,0,-zn.z,zn.y,0,-Qn.z,Qn.y,On.z,0,-On.x,zn.z,0,-zn.x,Qn.z,0,-Qn.x,-On.y,On.x,0,-zn.y,zn.x,0,-Qn.y,Qn.x,0];return!Bo(e,_i,yi,xi,Ts)||(e=[1,0,0,0,1,0,0,0,1],!Bo(e,_i,yi,xi,Ts))?!1:(As.crossVectors(On,zn),e=[As.x,As.y,As.z],Bo(e,_i,yi,xi,Ts))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,fn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(fn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Cn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Cn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Cn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Cn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Cn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Cn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Cn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Cn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Cn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Cn=[new D,new D,new D,new D,new D,new D,new D,new D],fn=new D,Es=new fi,_i=new D,yi=new D,xi=new D,On=new D,zn=new D,Qn=new D,ts=new D,Ts=new D,As=new D,ti=new D;function Bo(o,t,e,n,i){for(let s=0,r=o.length-3;s<=r;s+=3){ti.fromArray(o,s);const a=i.x*Math.abs(ti.x)+i.y*Math.abs(ti.y)+i.z*Math.abs(ti.z),c=t.dot(ti),l=e.dot(ti),h=n.dot(ti);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const hd=new fi,es=new D,Fo=new D;class pi{constructor(t=new D,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):hd.setFromPoints(t).getCenter(n);let i=0;for(let s=0,r=t.length;s<r;s++)i=Math.max(i,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;es.subVectors(t,this.center);const e=es.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(es,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Fo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(es.copy(t.center).add(Fo)),this.expandByPoint(es.copy(t.center).sub(Fo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Rn=new D,Oo=new D,Cs=new D,Hn=new D,zo=new D,Rs=new D,Ho=new D;class wo{constructor(t=new D,e=new D(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Rn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Rn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Rn.copy(this.origin).addScaledVector(this.direction,e),Rn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Oo.copy(t).add(e).multiplyScalar(.5),Cs.copy(e).sub(t).normalize(),Hn.copy(this.origin).sub(Oo);const s=t.distanceTo(e)*.5,r=-this.direction.dot(Cs),a=Hn.dot(this.direction),c=-Hn.dot(Cs),l=Hn.lengthSq(),h=Math.abs(1-r*r);let d,u,f,g;if(h>0)if(d=r*c-a,u=r*a-c,g=s*h,d>=0)if(u>=-g)if(u<=g){const v=1/h;d*=v,u*=v,f=d*(d+r*u+2*a)+u*(r*d+u+2*c)+l}else u=s,d=Math.max(0,-(r*u+a)),f=-d*d+u*(u+2*c)+l;else u=-s,d=Math.max(0,-(r*u+a)),f=-d*d+u*(u+2*c)+l;else u<=-g?(d=Math.max(0,-(-r*s+a)),u=d>0?-s:Math.min(Math.max(-s,-c),s),f=-d*d+u*(u+2*c)+l):u<=g?(d=0,u=Math.min(Math.max(-s,-c),s),f=u*(u+2*c)+l):(d=Math.max(0,-(r*s+a)),u=d>0?s:Math.min(Math.max(-s,-c),s),f=-d*d+u*(u+2*c)+l);else u=r>0?-s:s,d=Math.max(0,-(r*u+a)),f=-d*d+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(Oo).addScaledVector(Cs,u),f}intersectSphere(t,e){Rn.subVectors(t.center,this.origin);const n=Rn.dot(this.direction),i=Rn.dot(Rn)-n*n,s=t.radius*t.radius;if(i>s)return null;const r=Math.sqrt(s-i),a=n-r,c=n+r;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,s,r,a,c;const l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return l>=0?(n=(t.min.x-u.x)*l,i=(t.max.x-u.x)*l):(n=(t.max.x-u.x)*l,i=(t.min.x-u.x)*l),h>=0?(s=(t.min.y-u.y)*h,r=(t.max.y-u.y)*h):(s=(t.max.y-u.y)*h,r=(t.min.y-u.y)*h),n>r||s>i||((s>n||isNaN(n))&&(n=s),(r<i||isNaN(i))&&(i=r),d>=0?(a=(t.min.z-u.z)*d,c=(t.max.z-u.z)*d):(a=(t.max.z-u.z)*d,c=(t.min.z-u.z)*d),n>c||a>i)||((a>n||n!==n)&&(n=a),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Rn)!==null}intersectTriangle(t,e,n,i,s){zo.subVectors(e,t),Rs.subVectors(n,t),Ho.crossVectors(zo,Rs);let r=this.direction.dot(Ho),a;if(r>0){if(i)return null;a=1}else if(r<0)a=-1,r=-r;else return null;Hn.subVectors(this.origin,t);const c=a*this.direction.dot(Rs.crossVectors(Hn,Rs));if(c<0)return null;const l=a*this.direction.dot(zo.cross(Hn));if(l<0||c+l>r)return null;const h=-a*Hn.dot(Ho);return h<0?null:this.at(h/r,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class re{constructor(t,e,n,i,s,r,a,c,l,h,d,u,f,g,v,p){re.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,r,a,c,l,h,d,u,f,g,v,p)}set(t,e,n,i,s,r,a,c,l,h,d,u,f,g,v,p){const m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=i,m[1]=s,m[5]=r,m[9]=a,m[13]=c,m[2]=l,m[6]=h,m[10]=d,m[14]=u,m[3]=f,m[7]=g,m[11]=v,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new re().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/wi.setFromMatrixColumn(t,0).length(),s=1/wi.setFromMatrixColumn(t,1).length(),r=1/wi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*r,e[9]=n[9]*r,e[10]=n[10]*r,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,s=t.z,r=Math.cos(n),a=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(s),d=Math.sin(s);if(t.order==="XYZ"){const u=r*h,f=r*d,g=a*h,v=a*d;e[0]=c*h,e[4]=-c*d,e[8]=l,e[1]=f+g*l,e[5]=u-v*l,e[9]=-a*c,e[2]=v-u*l,e[6]=g+f*l,e[10]=r*c}else if(t.order==="YXZ"){const u=c*h,f=c*d,g=l*h,v=l*d;e[0]=u+v*a,e[4]=g*a-f,e[8]=r*l,e[1]=r*d,e[5]=r*h,e[9]=-a,e[2]=f*a-g,e[6]=v+u*a,e[10]=r*c}else if(t.order==="ZXY"){const u=c*h,f=c*d,g=l*h,v=l*d;e[0]=u-v*a,e[4]=-r*d,e[8]=g+f*a,e[1]=f+g*a,e[5]=r*h,e[9]=v-u*a,e[2]=-r*l,e[6]=a,e[10]=r*c}else if(t.order==="ZYX"){const u=r*h,f=r*d,g=a*h,v=a*d;e[0]=c*h,e[4]=g*l-f,e[8]=u*l+v,e[1]=c*d,e[5]=v*l+u,e[9]=f*l-g,e[2]=-l,e[6]=a*c,e[10]=r*c}else if(t.order==="YZX"){const u=r*c,f=r*l,g=a*c,v=a*l;e[0]=c*h,e[4]=v-u*d,e[8]=g*d+f,e[1]=d,e[5]=r*h,e[9]=-a*h,e[2]=-l*h,e[6]=f*d+g,e[10]=u-v*d}else if(t.order==="XZY"){const u=r*c,f=r*l,g=a*c,v=a*l;e[0]=c*h,e[4]=-d,e[8]=l*h,e[1]=u*d+v,e[5]=r*h,e[9]=f*d-g,e[2]=g*d-f,e[6]=a*h,e[10]=v*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(dd,t,ud)}lookAt(t,e,n){const i=this.elements;return je.subVectors(t,e),je.lengthSq()===0&&(je.z=1),je.normalize(),Gn.crossVectors(n,je),Gn.lengthSq()===0&&(Math.abs(n.z)===1?je.x+=1e-4:je.z+=1e-4,je.normalize(),Gn.crossVectors(n,je)),Gn.normalize(),Is.crossVectors(je,Gn),i[0]=Gn.x,i[4]=Is.x,i[8]=je.x,i[1]=Gn.y,i[5]=Is.y,i[9]=je.y,i[2]=Gn.z,i[6]=Is.z,i[10]=je.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,r=n[0],a=n[4],c=n[8],l=n[12],h=n[1],d=n[5],u=n[9],f=n[13],g=n[2],v=n[6],p=n[10],m=n[14],w=n[3],b=n[7],x=n[11],I=n[15],E=i[0],A=i[4],R=i[8],y=i[12],_=i[1],P=i[5],U=i[9],L=i[13],z=i[2],V=i[6],B=i[10],q=i[14],H=i[3],nt=i[7],st=i[11],at=i[15];return s[0]=r*E+a*_+c*z+l*H,s[4]=r*A+a*P+c*V+l*nt,s[8]=r*R+a*U+c*B+l*st,s[12]=r*y+a*L+c*q+l*at,s[1]=h*E+d*_+u*z+f*H,s[5]=h*A+d*P+u*V+f*nt,s[9]=h*R+d*U+u*B+f*st,s[13]=h*y+d*L+u*q+f*at,s[2]=g*E+v*_+p*z+m*H,s[6]=g*A+v*P+p*V+m*nt,s[10]=g*R+v*U+p*B+m*st,s[14]=g*y+v*L+p*q+m*at,s[3]=w*E+b*_+x*z+I*H,s[7]=w*A+b*P+x*V+I*nt,s[11]=w*R+b*U+x*B+I*st,s[15]=w*y+b*L+x*q+I*at,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],r=t[1],a=t[5],c=t[9],l=t[13],h=t[2],d=t[6],u=t[10],f=t[14],g=t[3],v=t[7],p=t[11],m=t[15];return g*(+s*c*d-i*l*d-s*a*u+n*l*u+i*a*f-n*c*f)+v*(+e*c*f-e*l*u+s*r*u-i*r*f+i*l*h-s*c*h)+p*(+e*l*d-e*a*f-s*r*d+n*r*f+s*a*h-n*l*h)+m*(-i*a*h-e*c*d+e*a*u+i*r*d-n*r*u+n*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],r=t[4],a=t[5],c=t[6],l=t[7],h=t[8],d=t[9],u=t[10],f=t[11],g=t[12],v=t[13],p=t[14],m=t[15],w=d*p*l-v*u*l+v*c*f-a*p*f-d*c*m+a*u*m,b=g*u*l-h*p*l-g*c*f+r*p*f+h*c*m-r*u*m,x=h*v*l-g*d*l+g*a*f-r*v*f-h*a*m+r*d*m,I=g*d*c-h*v*c-g*a*u+r*v*u+h*a*p-r*d*p,E=e*w+n*b+i*x+s*I;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/E;return t[0]=w*A,t[1]=(v*u*s-d*p*s-v*i*f+n*p*f+d*i*m-n*u*m)*A,t[2]=(a*p*s-v*c*s+v*i*l-n*p*l-a*i*m+n*c*m)*A,t[3]=(d*c*s-a*u*s-d*i*l+n*u*l+a*i*f-n*c*f)*A,t[4]=b*A,t[5]=(h*p*s-g*u*s+g*i*f-e*p*f-h*i*m+e*u*m)*A,t[6]=(g*c*s-r*p*s-g*i*l+e*p*l+r*i*m-e*c*m)*A,t[7]=(r*u*s-h*c*s+h*i*l-e*u*l-r*i*f+e*c*f)*A,t[8]=x*A,t[9]=(g*d*s-h*v*s-g*n*f+e*v*f+h*n*m-e*d*m)*A,t[10]=(r*v*s-g*a*s+g*n*l-e*v*l-r*n*m+e*a*m)*A,t[11]=(h*a*s-r*d*s-h*n*l+e*d*l+r*n*f-e*a*f)*A,t[12]=I*A,t[13]=(h*v*i-g*d*i+g*n*u-e*v*u-h*n*p+e*d*p)*A,t[14]=(g*a*i-r*v*i-g*n*c+e*v*c+r*n*p-e*a*p)*A,t[15]=(r*d*i-h*a*i+h*n*c-e*d*c-r*n*u+e*a*u)*A,this}scale(t){const e=this.elements,n=t.x,i=t.y,s=t.z;return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),s=1-n,r=t.x,a=t.y,c=t.z,l=s*r,h=s*a;return this.set(l*r+n,l*a-i*c,l*c+i*a,0,l*a+i*c,h*a+n,h*c-i*r,0,l*c-i*a,h*c+i*r,s*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,s,r){return this.set(1,n,s,0,t,1,r,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,s=e._x,r=e._y,a=e._z,c=e._w,l=s+s,h=r+r,d=a+a,u=s*l,f=s*h,g=s*d,v=r*h,p=r*d,m=a*d,w=c*l,b=c*h,x=c*d,I=n.x,E=n.y,A=n.z;return i[0]=(1-(v+m))*I,i[1]=(f+x)*I,i[2]=(g-b)*I,i[3]=0,i[4]=(f-x)*E,i[5]=(1-(u+m))*E,i[6]=(p+w)*E,i[7]=0,i[8]=(g+b)*A,i[9]=(p-w)*A,i[10]=(1-(u+v))*A,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let s=wi.set(i[0],i[1],i[2]).length();const r=wi.set(i[4],i[5],i[6]).length(),a=wi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),t.x=i[12],t.y=i[13],t.z=i[14],pn.copy(this);const l=1/s,h=1/r,d=1/a;return pn.elements[0]*=l,pn.elements[1]*=l,pn.elements[2]*=l,pn.elements[4]*=h,pn.elements[5]*=h,pn.elements[6]*=h,pn.elements[8]*=d,pn.elements[9]*=d,pn.elements[10]*=d,e.setFromRotationMatrix(pn),n.x=s,n.y=r,n.z=a,this}makePerspective(t,e,n,i,s,r,a=Un){const c=this.elements,l=2*s/(e-t),h=2*s/(n-i),d=(e+t)/(e-t),u=(n+i)/(n-i);let f,g;if(a===Un)f=-(r+s)/(r-s),g=-2*r*s/(r-s);else if(a===po)f=-r/(r-s),g=-r*s/(r-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=u,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,s,r,a=Un){const c=this.elements,l=1/(e-t),h=1/(n-i),d=1/(r-s),u=(e+t)*l,f=(n+i)*h;let g,v;if(a===Un)g=(r+s)*d,v=-2*d;else if(a===po)g=s*d,v=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-u,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=v,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const wi=new D,pn=new re,dd=new D(0,0,0),ud=new D(1,1,1),Gn=new D,Is=new D,je=new D,Ja=new re,Qa=new xs;class hn{constructor(t=0,e=0,n=0,i=hn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,s=i[0],r=i[4],a=i[8],c=i[1],l=i[5],h=i[9],d=i[2],u=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(Vt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-r,s)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Vt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Vt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-r,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Vt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-r,l));break;case"YZX":this._z=Math.asin(Vt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Vt(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Ja.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Ja,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Qa.setFromEuler(this),this.setFromQuaternion(Qa,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}hn.DEFAULT_ORDER="XYZ";class Ma{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let fd=0;const tc=new D,Mi=new xs,In=new re,Ps=new D,ns=new D,pd=new D,md=new xs,ec=new D(1,0,0),nc=new D(0,1,0),ic=new D(0,0,1),sc={type:"added"},gd={type:"removed"},bi={type:"childadded",child:null},Go={type:"childremoved",child:null};class xe extends ji{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:fd++}),this.uuid=Kn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=xe.DEFAULT_UP.clone();const t=new D,e=new hn,n=new xs,i=new D(1,1,1);function s(){n.setFromEuler(e,!1)}function r(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new re},normalMatrix:{value:new Ot}}),this.matrix=new re,this.matrixWorld=new re,this.matrixAutoUpdate=xe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=xe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ma,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Mi.setFromAxisAngle(t,e),this.quaternion.multiply(Mi),this}rotateOnWorldAxis(t,e){return Mi.setFromAxisAngle(t,e),this.quaternion.premultiply(Mi),this}rotateX(t){return this.rotateOnAxis(ec,t)}rotateY(t){return this.rotateOnAxis(nc,t)}rotateZ(t){return this.rotateOnAxis(ic,t)}translateOnAxis(t,e){return tc.copy(t).applyQuaternion(this.quaternion),this.position.add(tc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(ec,t)}translateY(t){return this.translateOnAxis(nc,t)}translateZ(t){return this.translateOnAxis(ic,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(In.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ps.copy(t):Ps.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),ns.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?In.lookAt(ns,Ps,this.up):In.lookAt(Ps,ns,this.up),this.quaternion.setFromRotationMatrix(In),i&&(In.extractRotation(i.matrixWorld),Mi.setFromRotationMatrix(In),this.quaternion.premultiply(Mi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(sc),bi.child=t,this.dispatchEvent(bi),bi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(gd),Go.child=t,this.dispatchEvent(Go),Go.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),In.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),In.multiply(t.parent.matrixWorld)),t.applyMatrix4(In),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(sc),bi.child=t,this.dispatchEvent(bi),bi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const r=this.children[n].getObjectByProperty(t,e);if(r!==void 0)return r}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let s=0,r=i.length;s<r;s++)i[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ns,t,pd),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ns,md,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let s=0,r=i.length;s<r;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const d=c[l];s(t.shapes,d)}else s(t.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(s(t.materials,this.material[c]));i.material=a}else i.material=s(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];i.animations.push(s(t.animations,c))}}if(e){const a=r(t.geometries),c=r(t.materials),l=r(t.textures),h=r(t.images),d=r(t.shapes),u=r(t.skeletons),f=r(t.animations),g=r(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function r(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}xe.DEFAULT_UP=new D(0,1,0);xe.DEFAULT_MATRIX_AUTO_UPDATE=!0;xe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const mn=new D,Pn=new D,Vo=new D,Ln=new D,Si=new D,Ei=new D,oc=new D,Wo=new D,Xo=new D,qo=new D,$o=new he,Yo=new he,Ko=new he;class rn{constructor(t=new D,e=new D,n=new D){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),mn.subVectors(t,e),i.cross(mn);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(t,e,n,i,s){mn.subVectors(i,e),Pn.subVectors(n,e),Vo.subVectors(t,e);const r=mn.dot(mn),a=mn.dot(Pn),c=mn.dot(Vo),l=Pn.dot(Pn),h=Pn.dot(Vo),d=r*l-a*a;if(d===0)return s.set(0,0,0),null;const u=1/d,f=(l*c-a*h)*u,g=(r*h-a*c)*u;return s.set(1-f-g,g,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Ln)===null?!1:Ln.x>=0&&Ln.y>=0&&Ln.x+Ln.y<=1}static getInterpolation(t,e,n,i,s,r,a,c){return this.getBarycoord(t,e,n,i,Ln)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Ln.x),c.addScaledVector(r,Ln.y),c.addScaledVector(a,Ln.z),c)}static getInterpolatedAttribute(t,e,n,i,s,r){return $o.setScalar(0),Yo.setScalar(0),Ko.setScalar(0),$o.fromBufferAttribute(t,e),Yo.fromBufferAttribute(t,n),Ko.fromBufferAttribute(t,i),r.setScalar(0),r.addScaledVector($o,s.x),r.addScaledVector(Yo,s.y),r.addScaledVector(Ko,s.z),r}static isFrontFacing(t,e,n,i){return mn.subVectors(n,e),Pn.subVectors(t,e),mn.cross(Pn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return mn.subVectors(this.c,this.b),Pn.subVectors(this.a,this.b),mn.cross(Pn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return rn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return rn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,s){return rn.getInterpolation(t,this.a,this.b,this.c,e,n,i,s)}containsPoint(t){return rn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return rn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,s=this.c;let r,a;Si.subVectors(i,n),Ei.subVectors(s,n),Wo.subVectors(t,n);const c=Si.dot(Wo),l=Ei.dot(Wo);if(c<=0&&l<=0)return e.copy(n);Xo.subVectors(t,i);const h=Si.dot(Xo),d=Ei.dot(Xo);if(h>=0&&d<=h)return e.copy(i);const u=c*d-h*l;if(u<=0&&c>=0&&h<=0)return r=c/(c-h),e.copy(n).addScaledVector(Si,r);qo.subVectors(t,s);const f=Si.dot(qo),g=Ei.dot(qo);if(g>=0&&f<=g)return e.copy(s);const v=f*l-c*g;if(v<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(Ei,a);const p=h*g-f*d;if(p<=0&&d-h>=0&&f-g>=0)return oc.subVectors(s,i),a=(d-h)/(d-h+(f-g)),e.copy(i).addScaledVector(oc,a);const m=1/(p+v+u);return r=v*m,a=u*m,e.copy(n).addScaledVector(Si,r).addScaledVector(Ei,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const El={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Vn={h:0,s:0,l:0},Ls={h:0,s:0,l:0};function jo(o,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?o+(t-o)*6*e:e<1/2?t:e<2/3?o+(t-o)*6*(2/3-e):o}class rt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=$e){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Qt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=Qt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Qt.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=Qt.workingColorSpace){if(t=Qh(t,1),e=Vt(e,0,1),n=Vt(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,r=2*n-s;this.r=jo(r,s,t+1/3),this.g=jo(r,s,t),this.b=jo(r,s,t-1/3)}return Qt.toWorkingColorSpace(this,i),this}setStyle(t,e=$e){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const r=i[1],a=i[2];switch(r){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=i[1],r=s.length;if(r===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(r===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=$e){const n=El[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Nn(t.r),this.g=Nn(t.g),this.b=Nn(t.b),this}copyLinearToSRGB(t){return this.r=Hi(t.r),this.g=Hi(t.g),this.b=Hi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=$e){return Qt.fromWorkingColorSpace(Fe.copy(this),t),Math.round(Vt(Fe.r*255,0,255))*65536+Math.round(Vt(Fe.g*255,0,255))*256+Math.round(Vt(Fe.b*255,0,255))}getHexString(t=$e){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Qt.workingColorSpace){Qt.fromWorkingColorSpace(Fe.copy(this),e);const n=Fe.r,i=Fe.g,s=Fe.b,r=Math.max(n,i,s),a=Math.min(n,i,s);let c,l;const h=(a+r)/2;if(a===r)c=0,l=0;else{const d=r-a;switch(l=h<=.5?d/(r+a):d/(2-r-a),r){case n:c=(i-s)/d+(i<s?6:0);break;case i:c=(s-n)/d+2;break;case s:c=(n-i)/d+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=Qt.workingColorSpace){return Qt.fromWorkingColorSpace(Fe.copy(this),e),t.r=Fe.r,t.g=Fe.g,t.b=Fe.b,t}getStyle(t=$e){Qt.fromWorkingColorSpace(Fe.copy(this),t);const e=Fe.r,n=Fe.g,i=Fe.b;return t!==$e?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Vn),this.setHSL(Vn.h+t,Vn.s+e,Vn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Vn),t.getHSL(Ls);const n=Do(Vn.h,Ls.h,e),i=Do(Vn.s,Ls.s,e),s=Do(Vn.l,Ls.l,e);return this.setHSL(n,i,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*i,this.g=s[1]*e+s[4]*n+s[7]*i,this.b=s[2]*e+s[5]*n+s[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Fe=new rt;rt.NAMES=El;let vd=0;class Fn extends ji{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:vd++}),this.uuid=Kn(),this.name="",this.type="Material",this.blending=Oi,this.side=jn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=gr,this.blendDst=vr,this.blendEquation=ai,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new rt(0,0,0),this.blendAlpha=0,this.depthFunc=Vi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=qa,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=gi,this.stencilZFail=gi,this.stencilZPass=gi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Oi&&(n.blending=this.blending),this.side!==jn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==gr&&(n.blendSrc=this.blendSrc),this.blendDst!==vr&&(n.blendDst=this.blendDst),this.blendEquation!==ai&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Vi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==qa&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==gi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==gi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==gi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const r=[];for(const a in s){const c=s[a];delete c.metadata,r.push(c)}return r}if(e){const s=i(t.textures),r=i(t.images);s.length>0&&(n.textures=s),r.length>0&&(n.images=r)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Yt extends Fn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new rt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hn,this.combine=ua,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const be=new D,Ds=new Dt;let _d=0;class Pe{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:_d++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=ta,this.updateRanges=[],this.gpuType=Mn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ds.fromBufferAttribute(this,e),Ds.applyMatrix3(t),this.setXY(e,Ds.x,Ds.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)be.fromBufferAttribute(this,e),be.applyMatrix3(t),this.setXYZ(e,be.x,be.y,be.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)be.fromBufferAttribute(this,e),be.applyMatrix4(t),this.setXYZ(e,be.x,be.y,be.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)be.fromBufferAttribute(this,e),be.applyNormalMatrix(t),this.setXYZ(e,be.x,be.y,be.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)be.fromBufferAttribute(this,e),be.transformDirection(t),this.setXYZ(e,be.x,be.y,be.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=wn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=le(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=wn(e,this.array)),e}setX(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=wn(e,this.array)),e}setY(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=wn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=wn(e,this.array)),e}setW(t,e){return this.normalized&&(e=le(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=le(e,this.array),n=le(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=le(e,this.array),n=le(n,this.array),i=le(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.normalized&&(e=le(e,this.array),n=le(n,this.array),i=le(i,this.array),s=le(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==ta&&(t.usage=this.usage),t}}class Tl extends Pe{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Al extends Pe{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class ue extends Pe{constructor(t,e,n){super(new Float32Array(t),e,n)}}let yd=0;const sn=new re,Zo=new xe,Ti=new D,Ze=new fi,is=new fi,Ie=new D;class we extends ji{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:yd++}),this.uuid=Kn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(bl(t)?Al:Tl)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Ot().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return sn.makeRotationFromQuaternion(t),this.applyMatrix4(sn),this}rotateX(t){return sn.makeRotationX(t),this.applyMatrix4(sn),this}rotateY(t){return sn.makeRotationY(t),this.applyMatrix4(sn),this}rotateZ(t){return sn.makeRotationZ(t),this.applyMatrix4(sn),this}translate(t,e,n){return sn.makeTranslation(t,e,n),this.applyMatrix4(sn),this}scale(t,e,n){return sn.makeScale(t,e,n),this.applyMatrix4(sn),this}lookAt(t){return Zo.lookAt(t),Zo.updateMatrix(),this.applyMatrix4(Zo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ti).negate(),this.translate(Ti.x,Ti.y,Ti.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,s=t.length;i<s;i++){const r=t[i];n.push(r.x,r.y,r.z||0)}this.setAttribute("position",new ue(n,3))}else{const n=Math.min(t.length,e.count);for(let i=0;i<n;i++){const s=t[i];e.setXYZ(i,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new fi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const s=e[n];Ze.setFromBufferAttribute(s),this.morphTargetsRelative?(Ie.addVectors(this.boundingBox.min,Ze.min),this.boundingBox.expandByPoint(Ie),Ie.addVectors(this.boundingBox.max,Ze.max),this.boundingBox.expandByPoint(Ie)):(this.boundingBox.expandByPoint(Ze.min),this.boundingBox.expandByPoint(Ze.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new pi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(t){const n=this.boundingSphere.center;if(Ze.setFromBufferAttribute(t),e)for(let s=0,r=e.length;s<r;s++){const a=e[s];is.setFromBufferAttribute(a),this.morphTargetsRelative?(Ie.addVectors(Ze.min,is.min),Ze.expandByPoint(Ie),Ie.addVectors(Ze.max,is.max),Ze.expandByPoint(Ie)):(Ze.expandByPoint(is.min),Ze.expandByPoint(is.max))}Ze.getCenter(n);let i=0;for(let s=0,r=t.count;s<r;s++)Ie.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(Ie));if(e)for(let s=0,r=e.length;s<r;s++){const a=e[s],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Ie.fromBufferAttribute(a,l),c&&(Ti.fromBufferAttribute(t,l),Ie.add(Ti)),i=Math.max(i,n.distanceToSquared(Ie))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Pe(new Float32Array(4*n.count),4));const r=this.getAttribute("tangent"),a=[],c=[];for(let R=0;R<n.count;R++)a[R]=new D,c[R]=new D;const l=new D,h=new D,d=new D,u=new Dt,f=new Dt,g=new Dt,v=new D,p=new D;function m(R,y,_){l.fromBufferAttribute(n,R),h.fromBufferAttribute(n,y),d.fromBufferAttribute(n,_),u.fromBufferAttribute(s,R),f.fromBufferAttribute(s,y),g.fromBufferAttribute(s,_),h.sub(l),d.sub(l),f.sub(u),g.sub(u);const P=1/(f.x*g.y-g.x*f.y);isFinite(P)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(P),p.copy(d).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(P),a[R].add(v),a[y].add(v),a[_].add(v),c[R].add(p),c[y].add(p),c[_].add(p))}let w=this.groups;w.length===0&&(w=[{start:0,count:t.count}]);for(let R=0,y=w.length;R<y;++R){const _=w[R],P=_.start,U=_.count;for(let L=P,z=P+U;L<z;L+=3)m(t.getX(L+0),t.getX(L+1),t.getX(L+2))}const b=new D,x=new D,I=new D,E=new D;function A(R){I.fromBufferAttribute(i,R),E.copy(I);const y=a[R];b.copy(y),b.sub(I.multiplyScalar(I.dot(y))).normalize(),x.crossVectors(E,y);const P=x.dot(c[R])<0?-1:1;r.setXYZW(R,b.x,b.y,b.z,P)}for(let R=0,y=w.length;R<y;++R){const _=w[R],P=_.start,U=_.count;for(let L=P,z=P+U;L<z;L+=3)A(t.getX(L+0)),A(t.getX(L+1)),A(t.getX(L+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Pe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);const i=new D,s=new D,r=new D,a=new D,c=new D,l=new D,h=new D,d=new D;if(t)for(let u=0,f=t.count;u<f;u+=3){const g=t.getX(u+0),v=t.getX(u+1),p=t.getX(u+2);i.fromBufferAttribute(e,g),s.fromBufferAttribute(e,v),r.fromBufferAttribute(e,p),h.subVectors(r,s),d.subVectors(i,s),h.cross(d),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,p),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(p,l.x,l.y,l.z)}else for(let u=0,f=e.count;u<f;u+=3)i.fromBufferAttribute(e,u+0),s.fromBufferAttribute(e,u+1),r.fromBufferAttribute(e,u+2),h.subVectors(r,s),d.subVectors(i,s),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ie.fromBufferAttribute(t,e),Ie.normalize(),t.setXYZ(e,Ie.x,Ie.y,Ie.z)}toNonIndexed(){function t(a,c){const l=a.array,h=a.itemSize,d=a.normalized,u=new l.constructor(c.length*h);let f=0,g=0;for(let v=0,p=c.length;v<p;v++){a.isInterleavedBufferAttribute?f=c[v]*a.data.stride+a.offset:f=c[v]*h;for(let m=0;m<h;m++)u[g++]=l[f++]}return new Pe(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new we,n=this.index.array,i=this.attributes;for(const a in i){const c=i[a],l=t(c,n);e.setAttribute(a,l)}const s=this.morphAttributes;for(const a in s){const c=[],l=s[a];for(let h=0,d=l.length;h<d;h++){const u=l[h],f=t(u,n);c.push(f)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let a=0,c=r.length;a<c;a++){const l=r[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const i={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let d=0,u=l.length;d<u;d++){const f=l[d];h.push(f.toJSON(t.data))}h.length>0&&(i[c]=h,s=!0)}s&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(t.data.groups=JSON.parse(JSON.stringify(r)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const l in i){const h=i[l];this.setAttribute(l,h.clone(e))}const s=t.morphAttributes;for(const l in s){const h=[],d=s[l];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const r=t.groups;for(let l=0,h=r.length;l<h;l++){const d=r[l];this.addGroup(d.start,d.count,d.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const rc=new re,ei=new wo,ks=new pi,ac=new D,Us=new D,Ns=new D,Bs=new D,Jo=new D,Fs=new D,cc=new D,Os=new D;class T extends xe{constructor(t=new we,e=new Yt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,r=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const a=this.morphTargetInfluences;if(s&&a){Fs.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const h=a[c],d=s[c];h!==0&&(Jo.fromBufferAttribute(d,t),r?Fs.addScaledVector(Jo,h):Fs.addScaledVector(Jo.sub(e),h))}e.add(Fs)}return e}raycast(t,e){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ks.copy(n.boundingSphere),ks.applyMatrix4(s),ei.copy(t.ray).recast(t.near),!(ks.containsPoint(ei.origin)===!1&&(ei.intersectSphere(ks,ac)===null||ei.origin.distanceToSquared(ac)>(t.far-t.near)**2))&&(rc.copy(s).invert(),ei.copy(t.ray).applyMatrix4(rc),!(n.boundingBox!==null&&ei.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ei)))}_computeIntersections(t,e,n){let i;const s=this.geometry,r=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,d=s.attributes.normal,u=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(r))for(let g=0,v=u.length;g<v;g++){const p=u[g],m=r[p.materialIndex],w=Math.max(p.start,f.start),b=Math.min(a.count,Math.min(p.start+p.count,f.start+f.count));for(let x=w,I=b;x<I;x+=3){const E=a.getX(x),A=a.getX(x+1),R=a.getX(x+2);i=zs(this,m,t,n,l,h,d,E,A,R),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{const g=Math.max(0,f.start),v=Math.min(a.count,f.start+f.count);for(let p=g,m=v;p<m;p+=3){const w=a.getX(p),b=a.getX(p+1),x=a.getX(p+2);i=zs(this,r,t,n,l,h,d,w,b,x),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}else if(c!==void 0)if(Array.isArray(r))for(let g=0,v=u.length;g<v;g++){const p=u[g],m=r[p.materialIndex],w=Math.max(p.start,f.start),b=Math.min(c.count,Math.min(p.start+p.count,f.start+f.count));for(let x=w,I=b;x<I;x+=3){const E=x,A=x+1,R=x+2;i=zs(this,m,t,n,l,h,d,E,A,R),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{const g=Math.max(0,f.start),v=Math.min(c.count,f.start+f.count);for(let p=g,m=v;p<m;p+=3){const w=p,b=p+1,x=p+2;i=zs(this,r,t,n,l,h,d,w,b,x),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}}}function xd(o,t,e,n,i,s,r,a){let c;if(t.side===Xe?c=n.intersectTriangle(r,s,i,!0,a):c=n.intersectTriangle(i,s,r,t.side===jn,a),c===null)return null;Os.copy(a),Os.applyMatrix4(o.matrixWorld);const l=e.ray.origin.distanceTo(Os);return l<e.near||l>e.far?null:{distance:l,point:Os.clone(),object:o}}function zs(o,t,e,n,i,s,r,a,c,l){o.getVertexPosition(a,Us),o.getVertexPosition(c,Ns),o.getVertexPosition(l,Bs);const h=xd(o,t,e,n,Us,Ns,Bs,cc);if(h){const d=new D;rn.getBarycoord(cc,Us,Ns,Bs,d),i&&(h.uv=rn.getInterpolatedAttribute(i,a,c,l,d,new Dt)),s&&(h.uv1=rn.getInterpolatedAttribute(s,a,c,l,d,new Dt)),r&&(h.normal=rn.getInterpolatedAttribute(r,a,c,l,d,new D),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:c,c:l,normal:new D,materialIndex:0};rn.getNormal(Us,Ns,Bs,u.normal),h.face=u,h.barycoord=d}return h}class J extends we{constructor(t=1,e=1,n=1,i=1,s=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:s,depthSegments:r};const a=this;i=Math.floor(i),s=Math.floor(s),r=Math.floor(r);const c=[],l=[],h=[],d=[];let u=0,f=0;g("z","y","x",-1,-1,n,e,t,r,s,0),g("z","y","x",1,-1,n,e,-t,r,s,1),g("x","z","y",1,1,t,n,e,i,r,2),g("x","z","y",1,-1,t,n,-e,i,r,3),g("x","y","z",1,-1,t,e,n,i,s,4),g("x","y","z",-1,-1,t,e,-n,i,s,5),this.setIndex(c),this.setAttribute("position",new ue(l,3)),this.setAttribute("normal",new ue(h,3)),this.setAttribute("uv",new ue(d,2));function g(v,p,m,w,b,x,I,E,A,R,y){const _=x/A,P=I/R,U=x/2,L=I/2,z=E/2,V=A+1,B=R+1;let q=0,H=0;const nt=new D;for(let st=0;st<B;st++){const at=st*P-L;for(let bt=0;bt<V;bt++){const Zt=bt*_-U;nt[v]=Zt*w,nt[p]=at*b,nt[m]=z,l.push(nt.x,nt.y,nt.z),nt[v]=0,nt[p]=0,nt[m]=E>0?1:-1,h.push(nt.x,nt.y,nt.z),d.push(bt/A),d.push(1-st/R),q+=1}}for(let st=0;st<R;st++)for(let at=0;at<A;at++){const bt=u+at+V*st,Zt=u+at+V*(st+1),K=u+(at+1)+V*(st+1),ot=u+(at+1)+V*st;c.push(bt,Zt,ot),c.push(Zt,K,ot),H+=6}a.addGroup(f,H,y),f+=H,u+=q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new J(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Ki(o){const t={};for(const e in o){t[e]={};for(const n in o[e]){const i=o[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Ge(o){const t={};for(let e=0;e<o.length;e++){const n=Ki(o[e]);for(const i in n)t[i]=n[i]}return t}function wd(o){const t=[];for(let e=0;e<o.length;e++)t.push(o[e].clone());return t}function Cl(o){const t=o.getRenderTarget();return t===null?o.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Qt.workingColorSpace}const Md={clone:Ki,merge:Ge};var bd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Sd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class En extends Fn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=bd,this.fragmentShader=Sd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ki(t.uniforms),this.uniformsGroups=wd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const r=this.uniforms[i].value;r&&r.isTexture?e.uniforms[i]={type:"t",value:r.toJSON(t).uuid}:r&&r.isColor?e.uniforms[i]={type:"c",value:r.getHex()}:r&&r.isVector2?e.uniforms[i]={type:"v2",value:r.toArray()}:r&&r.isVector3?e.uniforms[i]={type:"v3",value:r.toArray()}:r&&r.isVector4?e.uniforms[i]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?e.uniforms[i]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?e.uniforms[i]={type:"m4",value:r.toArray()}:e.uniforms[i]={value:r}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Rl extends xe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new re,this.projectionMatrix=new re,this.projectionMatrixInverse=new re,this.coordinateSystem=Un}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Wn=new D,lc=new Dt,hc=new Dt;class Je extends Rl{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ea*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Lo*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ea*2*Math.atan(Math.tan(Lo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Wn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Wn.x,Wn.y).multiplyScalar(-t/Wn.z),Wn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Wn.x,Wn.y).multiplyScalar(-t/Wn.z)}getViewSize(t,e){return this.getViewBounds(t,lc,hc),e.subVectors(hc,lc)}setViewOffset(t,e,n,i,s,r){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Lo*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,s=-.5*i;const r=this.view;if(this.view!==null&&this.view.enabled){const c=r.fullWidth,l=r.fullHeight;s+=r.offsetX*i/c,e-=r.offsetY*n/l,i*=r.width/c,n*=r.height/l}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ai=-90,Ci=1;class Ed extends xe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Je(Ai,Ci,t,e);i.layers=this.layers,this.add(i);const s=new Je(Ai,Ci,t,e);s.layers=this.layers,this.add(s);const r=new Je(Ai,Ci,t,e);r.layers=this.layers,this.add(r);const a=new Je(Ai,Ci,t,e);a.layers=this.layers,this.add(a);const c=new Je(Ai,Ci,t,e);c.layers=this.layers,this.add(c);const l=new Je(Ai,Ci,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,s,r,a,c]=e;for(const l of e)this.remove(l);if(t===Un)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===po)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,r,a,c,l,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,s),t.setRenderTarget(n,1,i),t.render(e,r),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,c),t.setRenderTarget(n,4,i),t.render(e,l),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Il extends Oe{constructor(t,e,n,i,s,r,a,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:Wi,super(t,e,n,i,s,r,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Td extends ui{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Il(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:an}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new J(5,5,5),s=new En({name:"CubemapFromEquirect",uniforms:Ki(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Xe,blending:$n});s.uniforms.tEquirect.value=e;const r=new T(i,s),a=e.minFilter;return e.minFilter===li&&(e.minFilter=an),new Ed(1,10,this).update(t,r),e.minFilter=a,r.geometry.dispose(),r.material.dispose(),this}clear(t,e,n,i){const s=t.getRenderTarget();for(let r=0;r<6;r++)t.setRenderTarget(this,r),t.clear(e,n,i);t.setRenderTarget(s)}}class Et extends xe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Ad={type:"move"};class Qo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Et,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Et,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Et,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,s=null,r=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){r=!0;for(const v of t.hand.values()){const p=e.getJointPose(v,n),m=this._getHandJoint(l,v);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;l.inputState.pinching&&u>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&u<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Ad)))}return a!==null&&(a.visible=i!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=r!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Et;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class ba{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new rt(t),this.density=e}clone(){return new ba(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Cd extends xe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new hn,this.environmentIntensity=1,this.environmentRotation=new hn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Rd{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=ta,this.updateRanges=[],this.version=0,this.uuid=Kn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,s=this.stride;i<s;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Kn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Kn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const He=new D;class go{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)He.fromBufferAttribute(this,e),He.applyMatrix4(t),this.setXYZ(e,He.x,He.y,He.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)He.fromBufferAttribute(this,e),He.applyNormalMatrix(t),this.setXYZ(e,He.x,He.y,He.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)He.fromBufferAttribute(this,e),He.transformDirection(t),this.setXYZ(e,He.x,He.y,He.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=wn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=le(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=le(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=wn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=wn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=wn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=wn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=le(e,this.array),n=le(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=le(e,this.array),n=le(n,this.array),i=le(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=le(e,this.array),n=le(n,this.array),i=le(i,this.array),s=le(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=s,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[i+s])}return new Pe(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new go(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Pl extends Fn{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new rt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Ri;const ss=new D,Ii=new D,Pi=new D,Li=new Dt,os=new Dt,Ll=new re,Hs=new D,rs=new D,Gs=new D,dc=new Dt,tr=new Dt,uc=new Dt;class Id extends xe{constructor(t=new Pl){if(super(),this.isSprite=!0,this.type="Sprite",Ri===void 0){Ri=new we;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Rd(e,5);Ri.setIndex([0,1,2,0,2,3]),Ri.setAttribute("position",new go(n,3,0,!1)),Ri.setAttribute("uv",new go(n,2,3,!1))}this.geometry=Ri,this.material=t,this.center=new Dt(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ii.setFromMatrixScale(this.matrixWorld),Ll.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Pi.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ii.multiplyScalar(-Pi.z);const n=this.material.rotation;let i,s;n!==0&&(s=Math.cos(n),i=Math.sin(n));const r=this.center;Vs(Hs.set(-.5,-.5,0),Pi,r,Ii,i,s),Vs(rs.set(.5,-.5,0),Pi,r,Ii,i,s),Vs(Gs.set(.5,.5,0),Pi,r,Ii,i,s),dc.set(0,0),tr.set(1,0),uc.set(1,1);let a=t.ray.intersectTriangle(Hs,rs,Gs,!1,ss);if(a===null&&(Vs(rs.set(-.5,.5,0),Pi,r,Ii,i,s),tr.set(0,1),a=t.ray.intersectTriangle(Hs,Gs,rs,!1,ss),a===null))return;const c=t.ray.origin.distanceTo(ss);c<t.near||c>t.far||e.push({distance:c,point:ss.clone(),uv:rn.getInterpolation(ss,Hs,rs,Gs,dc,tr,uc,new Dt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Vs(o,t,e,n,i,s){Li.subVectors(o,e).addScalar(.5).multiply(n),i!==void 0?(os.x=s*Li.x-i*Li.y,os.y=i*Li.x+s*Li.y):os.copy(Li),o.copy(t),o.x+=os.x,o.y+=os.y,o.applyMatrix4(Ll)}class Dl extends Oe{constructor(t=null,e=1,n=1,i,s,r,a,c,l=Qe,h=Qe,d,u){super(null,r,a,c,l,h,i,s,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class fc extends Pe{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Di=new re,pc=new re,Ws=[],mc=new fi,Pd=new re,as=new T,cs=new pi;class Ld extends T{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new fc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Pd)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new fi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Di),mc.copy(t.boundingBox).applyMatrix4(Di),this.boundingBox.union(mc)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new pi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Di),cs.copy(t.boundingSphere).applyMatrix4(Di),this.boundingSphere.union(cs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,r=t*s+1;for(let a=0;a<n.length;a++)n[a]=i[r+a]}raycast(t,e){const n=this.matrixWorld,i=this.count;if(as.geometry=this.geometry,as.material=this.material,as.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),cs.copy(this.boundingSphere),cs.applyMatrix4(n),t.ray.intersectsSphere(cs)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,Di),pc.multiplyMatrices(n,Di),as.matrixWorld=pc,as.raycast(t,Ws);for(let r=0,a=Ws.length;r<a;r++){const c=Ws[r];c.instanceId=s,c.object=this,e.push(c)}Ws.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new fc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Dl(new Float32Array(i*this.count),i,this.count,ga,Mn));const s=this.morphTexture.source.data.data;let r=0;for(let l=0;l<n.length;l++)r+=n[l];const a=this.geometry.morphTargetsRelative?1:1-r,c=i*t;s[c]=a,s.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const er=new D,Dd=new D,kd=new Ot;class Xn{constructor(t=new D(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=er.subVectors(n,e).cross(Dd.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(er),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||kd.getNormalMatrix(t),i=this.coplanarPoint(er).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ni=new pi,Xs=new D;class Sa{constructor(t=new Xn,e=new Xn,n=new Xn,i=new Xn,s=new Xn,r=new Xn){this.planes=[t,e,n,i,s,r]}set(t,e,n,i,s,r){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(r),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Un){const n=this.planes,i=t.elements,s=i[0],r=i[1],a=i[2],c=i[3],l=i[4],h=i[5],d=i[6],u=i[7],f=i[8],g=i[9],v=i[10],p=i[11],m=i[12],w=i[13],b=i[14],x=i[15];if(n[0].setComponents(c-s,u-l,p-f,x-m).normalize(),n[1].setComponents(c+s,u+l,p+f,x+m).normalize(),n[2].setComponents(c+r,u+h,p+g,x+w).normalize(),n[3].setComponents(c-r,u-h,p-g,x-w).normalize(),n[4].setComponents(c-a,u-d,p-v,x-b).normalize(),e===Un)n[5].setComponents(c+a,u+d,p+v,x+b).normalize();else if(e===po)n[5].setComponents(a,d,v,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ni.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ni.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ni)}intersectsSprite(t){return ni.center.set(0,0,0),ni.radius=.7071067811865476,ni.applyMatrix4(t.matrixWorld),this.intersectsSphere(ni)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(Xs.x=i.normal.x>0?t.max.x:t.min.x,Xs.y=i.normal.y>0?t.max.y:t.min.y,Xs.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Xs)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Ea extends Fn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new rt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const vo=new D,_o=new D,gc=new re,ls=new wo,qs=new pi,nr=new D,vc=new D;class kl extends xe{constructor(t=new we,e=new Ea){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let i=1,s=e.count;i<s;i++)vo.fromBufferAttribute(e,i-1),_o.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=vo.distanceTo(_o);t.setAttribute("lineDistance",new ue(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,s=t.params.Line.threshold,r=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),qs.copy(n.boundingSphere),qs.applyMatrix4(i),qs.radius+=s,t.ray.intersectsSphere(qs)===!1)return;gc.copy(i).invert(),ls.copy(t.ray).applyMatrix4(gc);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){const f=Math.max(0,r.start),g=Math.min(h.count,r.start+r.count);for(let v=f,p=g-1;v<p;v+=l){const m=h.getX(v),w=h.getX(v+1),b=$s(this,t,ls,c,m,w,v);b&&e.push(b)}if(this.isLineLoop){const v=h.getX(g-1),p=h.getX(f),m=$s(this,t,ls,c,v,p,g-1);m&&e.push(m)}}else{const f=Math.max(0,r.start),g=Math.min(u.count,r.start+r.count);for(let v=f,p=g-1;v<p;v+=l){const m=$s(this,t,ls,c,v,v+1,v);m&&e.push(m)}if(this.isLineLoop){const v=$s(this,t,ls,c,g-1,f,g-1);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function $s(o,t,e,n,i,s,r){const a=o.geometry.attributes.position;if(vo.fromBufferAttribute(a,i),_o.fromBufferAttribute(a,s),e.distanceSqToSegment(vo,_o,nr,vc)>n)return;nr.applyMatrix4(o.matrixWorld);const l=t.ray.origin.distanceTo(nr);if(!(l<t.near||l>t.far))return{distance:l,point:vc.clone().applyMatrix4(o.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:o}}const _c=new D,yc=new D;class Ud extends kl{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let i=0,s=e.count;i<s;i+=2)_c.fromBufferAttribute(e,i),yc.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+_c.distanceTo(yc);t.setAttribute("lineDistance",new ue(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Mo extends Fn{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new rt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const xc=new re,na=new wo,Ys=new pi,Ks=new D;class Ta extends xe{constructor(t=new we,e=new Mo){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,s=t.params.Points.threshold,r=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ys.copy(n.boundingSphere),Ys.applyMatrix4(i),Ys.radius+=s,t.ray.intersectsSphere(Ys)===!1)return;xc.copy(i).invert(),na.copy(t.ray).applyMatrix4(xc);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,d=n.attributes.position;if(l!==null){const u=Math.max(0,r.start),f=Math.min(l.count,r.start+r.count);for(let g=u,v=f;g<v;g++){const p=l.getX(g);Ks.fromBufferAttribute(d,p),wc(Ks,p,c,i,t,e,this)}}else{const u=Math.max(0,r.start),f=Math.min(d.count,r.start+r.count);for(let g=u,v=f;g<v;g++)Ks.fromBufferAttribute(d,g),wc(Ks,g,c,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function wc(o,t,e,n,i,s,r){const a=na.distanceSqToPoint(o);if(a<e){const c=new D;na.closestPointToPoint(o,c),c.applyMatrix4(n);const l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;s.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:r})}}class Aa extends Oe{constructor(t,e,n,i,s,r,a,c,l){super(t,e,n,i,s,r,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ul extends Oe{constructor(t,e,n,i,s,r,a,c,l,h=zi){if(h!==zi&&h!==$i)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===zi&&(n=di),n===void 0&&h===$i&&(n=qi),super(null,i,s,r,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Qe,this.minFilter=c!==void 0?c:Qe,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new wa(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class ws extends we{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const s=[],r=[],a=[],c=[],l=new D,h=new Dt;r.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let d=0,u=3;d<=e;d++,u+=3){const f=n+d/e*i;l.x=t*Math.cos(f),l.y=t*Math.sin(f),r.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(r[u]/t+1)/2,h.y=(r[u+1]/t+1)/2,c.push(h.x,h.y)}for(let d=1;d<=e;d++)s.push(d,d+1,0);this.setIndex(s),this.setAttribute("position",new ue(r,3)),this.setAttribute("normal",new ue(a,3)),this.setAttribute("uv",new ue(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ws(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class gt extends we{constructor(t=1,e=1,n=1,i=32,s=1,r=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:c};const l=this;i=Math.floor(i),s=Math.floor(s);const h=[],d=[],u=[],f=[];let g=0;const v=[],p=n/2;let m=0;w(),r===!1&&(t>0&&b(!0),e>0&&b(!1)),this.setIndex(h),this.setAttribute("position",new ue(d,3)),this.setAttribute("normal",new ue(u,3)),this.setAttribute("uv",new ue(f,2));function w(){const x=new D,I=new D;let E=0;const A=(e-t)/n;for(let R=0;R<=s;R++){const y=[],_=R/s,P=_*(e-t)+t;for(let U=0;U<=i;U++){const L=U/i,z=L*c+a,V=Math.sin(z),B=Math.cos(z);I.x=P*V,I.y=-_*n+p,I.z=P*B,d.push(I.x,I.y,I.z),x.set(V,A,B).normalize(),u.push(x.x,x.y,x.z),f.push(L,1-_),y.push(g++)}v.push(y)}for(let R=0;R<i;R++)for(let y=0;y<s;y++){const _=v[y][R],P=v[y+1][R],U=v[y+1][R+1],L=v[y][R+1];(t>0||y!==0)&&(h.push(_,P,L),E+=3),(e>0||y!==s-1)&&(h.push(P,U,L),E+=3)}l.addGroup(m,E,0),m+=E}function b(x){const I=g,E=new Dt,A=new D;let R=0;const y=x===!0?t:e,_=x===!0?1:-1;for(let U=1;U<=i;U++)d.push(0,p*_,0),u.push(0,_,0),f.push(.5,.5),g++;const P=g;for(let U=0;U<=i;U++){const z=U/i*c+a,V=Math.cos(z),B=Math.sin(z);A.x=y*B,A.y=p*_,A.z=y*V,d.push(A.x,A.y,A.z),u.push(0,_,0),E.x=V*.5+.5,E.y=B*.5*_+.5,f.push(E.x,E.y),g++}for(let U=0;U<i;U++){const L=I+U,z=P+U;x===!0?h.push(z,z+1,L):h.push(z+1,z,L),R+=3}l.addGroup(m,R,x===!0?1:2),m+=R}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new gt(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class oe extends gt{constructor(t=1,e=1,n=32,i=1,s=!1,r=0,a=Math.PI*2){super(0,t,e,n,i,s,r,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:r,thetaLength:a}}static fromJSON(t){return new oe(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class bo extends we{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const s=[],r=[];a(i),l(n),h(),this.setAttribute("position",new ue(s,3)),this.setAttribute("normal",new ue(s.slice(),3)),this.setAttribute("uv",new ue(r,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(w){const b=new D,x=new D,I=new D;for(let E=0;E<e.length;E+=3)f(e[E+0],b),f(e[E+1],x),f(e[E+2],I),c(b,x,I,w)}function c(w,b,x,I){const E=I+1,A=[];for(let R=0;R<=E;R++){A[R]=[];const y=w.clone().lerp(x,R/E),_=b.clone().lerp(x,R/E),P=E-R;for(let U=0;U<=P;U++)U===0&&R===E?A[R][U]=y:A[R][U]=y.clone().lerp(_,U/P)}for(let R=0;R<E;R++)for(let y=0;y<2*(E-R)-1;y++){const _=Math.floor(y/2);y%2===0?(u(A[R][_+1]),u(A[R+1][_]),u(A[R][_])):(u(A[R][_+1]),u(A[R+1][_+1]),u(A[R+1][_]))}}function l(w){const b=new D;for(let x=0;x<s.length;x+=3)b.x=s[x+0],b.y=s[x+1],b.z=s[x+2],b.normalize().multiplyScalar(w),s[x+0]=b.x,s[x+1]=b.y,s[x+2]=b.z}function h(){const w=new D;for(let b=0;b<s.length;b+=3){w.x=s[b+0],w.y=s[b+1],w.z=s[b+2];const x=p(w)/2/Math.PI+.5,I=m(w)/Math.PI+.5;r.push(x,1-I)}g(),d()}function d(){for(let w=0;w<r.length;w+=6){const b=r[w+0],x=r[w+2],I=r[w+4],E=Math.max(b,x,I),A=Math.min(b,x,I);E>.9&&A<.1&&(b<.2&&(r[w+0]+=1),x<.2&&(r[w+2]+=1),I<.2&&(r[w+4]+=1))}}function u(w){s.push(w.x,w.y,w.z)}function f(w,b){const x=w*3;b.x=t[x+0],b.y=t[x+1],b.z=t[x+2]}function g(){const w=new D,b=new D,x=new D,I=new D,E=new Dt,A=new Dt,R=new Dt;for(let y=0,_=0;y<s.length;y+=9,_+=6){w.set(s[y+0],s[y+1],s[y+2]),b.set(s[y+3],s[y+4],s[y+5]),x.set(s[y+6],s[y+7],s[y+8]),E.set(r[_+0],r[_+1]),A.set(r[_+2],r[_+3]),R.set(r[_+4],r[_+5]),I.copy(w).add(b).add(x).divideScalar(3);const P=p(I);v(E,_+0,w,P),v(A,_+2,b,P),v(R,_+4,x,P)}}function v(w,b,x,I){I<0&&w.x===1&&(r[b]=w.x-1),x.x===0&&x.z===0&&(r[b]=I/2/Math.PI+.5)}function p(w){return Math.atan2(w.z,-w.x)}function m(w){return Math.atan2(-w.y,Math.sqrt(w.x*w.x+w.z*w.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new bo(t.vertices,t.indices,t.radius,t.details)}}class Ve extends bo{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=1/n,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],r=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,r,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Ve(t.radius,t.detail)}}class Ye extends bo{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Ye(t.radius,t.detail)}}class Ae extends we{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const s=t/2,r=e/2,a=Math.floor(n),c=Math.floor(i),l=a+1,h=c+1,d=t/a,u=e/c,f=[],g=[],v=[],p=[];for(let m=0;m<h;m++){const w=m*u-r;for(let b=0;b<l;b++){const x=b*d-s;g.push(x,-w,0),v.push(0,0,1),p.push(b/a),p.push(1-m/c)}}for(let m=0;m<c;m++)for(let w=0;w<a;w++){const b=w+l*m,x=w+l*(m+1),I=w+1+l*(m+1),E=w+1+l*m;f.push(b,x,E),f.push(x,I,E)}this.setIndex(f),this.setAttribute("position",new ue(g,3)),this.setAttribute("normal",new ue(v,3)),this.setAttribute("uv",new ue(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ae(t.width,t.height,t.widthSegments,t.heightSegments)}}class So extends we{constructor(t=.5,e=1,n=32,i=1,s=0,r=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:r},n=Math.max(3,n),i=Math.max(1,i);const a=[],c=[],l=[],h=[];let d=t;const u=(e-t)/i,f=new D,g=new Dt;for(let v=0;v<=i;v++){for(let p=0;p<=n;p++){const m=s+p/n*r;f.x=d*Math.cos(m),f.y=d*Math.sin(m),c.push(f.x,f.y,f.z),l.push(0,0,1),g.x=(f.x/e+1)/2,g.y=(f.y/e+1)/2,h.push(g.x,g.y)}d+=u}for(let v=0;v<i;v++){const p=v*(n+1);for(let m=0;m<n;m++){const w=m+p,b=w,x=w+n+1,I=w+n+2,E=w+1;a.push(b,x,E),a.push(x,I,E)}}this.setIndex(a),this.setAttribute("position",new ue(c,3)),this.setAttribute("normal",new ue(l,3)),this.setAttribute("uv",new ue(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new So(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Se extends we{constructor(t=1,e=32,n=16,i=0,s=Math.PI*2,r=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:s,thetaStart:r,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(r+a,Math.PI);let l=0;const h=[],d=new D,u=new D,f=[],g=[],v=[],p=[];for(let m=0;m<=n;m++){const w=[],b=m/n;let x=0;m===0&&r===0?x=.5/e:m===n&&c===Math.PI&&(x=-.5/e);for(let I=0;I<=e;I++){const E=I/e;d.x=-t*Math.cos(i+E*s)*Math.sin(r+b*a),d.y=t*Math.cos(r+b*a),d.z=t*Math.sin(i+E*s)*Math.sin(r+b*a),g.push(d.x,d.y,d.z),u.copy(d).normalize(),v.push(u.x,u.y,u.z),p.push(E+x,1-b),w.push(l++)}h.push(w)}for(let m=0;m<n;m++)for(let w=0;w<e;w++){const b=h[m][w+1],x=h[m][w],I=h[m+1][w],E=h[m+1][w+1];(m!==0||r>0)&&f.push(b,x,E),(m!==n-1||c<Math.PI)&&f.push(x,I,E)}this.setIndex(f),this.setAttribute("position",new ue(g,3)),this.setAttribute("normal",new ue(v,3)),this.setAttribute("uv",new ue(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Se(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Ca extends we{constructor(t=1,e=.4,n=12,i=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);const r=[],a=[],c=[],l=[],h=new D,d=new D,u=new D;for(let f=0;f<=n;f++)for(let g=0;g<=i;g++){const v=g/i*s,p=f/n*Math.PI*2;d.x=(t+e*Math.cos(p))*Math.cos(v),d.y=(t+e*Math.cos(p))*Math.sin(v),d.z=e*Math.sin(p),a.push(d.x,d.y,d.z),h.x=t*Math.cos(v),h.y=t*Math.sin(v),u.subVectors(d,h).normalize(),c.push(u.x,u.y,u.z),l.push(g/i),l.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=i;g++){const v=(i+1)*f+g-1,p=(i+1)*(f-1)+g-1,m=(i+1)*(f-1)+g,w=(i+1)*f+g;r.push(v,p,w),r.push(p,m,w)}this.setIndex(r),this.setAttribute("position",new ue(a,3)),this.setAttribute("normal",new ue(c,3)),this.setAttribute("uv",new ue(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ca(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Q extends Fn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new rt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new rt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=xa,this.normalScale=new Dt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Nl extends Fn{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new rt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new rt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=xa,this.normalScale=new Dt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hn,this.combine=ua,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Nd extends Fn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Vh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Bd extends Fn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Eo extends xe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new rt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Fd extends Eo{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(xe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new rt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const ir=new re,Mc=new D,bc=new D;class Bl{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Dt(512,512),this.map=null,this.mapPass=null,this.matrix=new re,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Sa,this._frameExtents=new Dt(1,1),this._viewportCount=1,this._viewports=[new he(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Mc.setFromMatrixPosition(t.matrixWorld),e.position.copy(Mc),bc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(bc),e.updateMatrixWorld(),ir.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ir),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ir)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Sc=new re,hs=new D,sr=new D;class Od extends Bl{constructor(){super(new Je(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Dt(4,2),this._viewportCount=6,this._viewports=[new he(2,1,1,1),new he(0,1,1,1),new he(3,1,1,1),new he(1,1,1,1),new he(3,0,1,1),new he(1,0,1,1)],this._cubeDirections=[new D(1,0,0),new D(-1,0,0),new D(0,0,1),new D(0,0,-1),new D(0,1,0),new D(0,-1,0)],this._cubeUps=[new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,0,1),new D(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,s=t.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),hs.setFromMatrixPosition(t.matrixWorld),n.position.copy(hs),sr.copy(n.position),sr.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(sr),n.updateMatrixWorld(),i.makeTranslation(-hs.x,-hs.y,-hs.z),Sc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Sc)}}class ke extends Eo{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Od}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Fl extends Rl{constructor(t=-1,e=1,n=1,i=-1,s=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=s,this.far=r,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,s,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-t,r=n+t,a=i+e,c=i-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,r=s+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,r,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class zd extends Bl{constructor(){super(new Fl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Hd extends Eo{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(xe.DEFAULT_UP),this.updateMatrix(),this.target=new xe,this.shadow=new zd}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Gd extends Je{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t,this.index=0}}class Vd{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Ec(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Ec();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Ec(){return performance.now()}const Tc=new re;class Wd{constructor(t,e,n=0,i=1/0){this.ray=new wo(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new Ma,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Tc.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Tc),this}intersectObject(t,e=!0,n=[]){return ia(t,this,n,e),n.sort(Ac),n}intersectObjects(t,e=!0,n=[]){for(let i=0,s=t.length;i<s;i++)ia(t[i],this,n,e);return n.sort(Ac),n}}function Ac(o,t){return o.distance-t.distance}function ia(o,t,e,n){let i=!0;if(o.layers.test(t.layers)&&o.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){const s=o.children;for(let r=0,a=s.length;r<a;r++)ia(s[r],t,e,!0)}}function Cc(o,t,e,n){const i=Xd(n);switch(e){case gl:return o*t;case _l:return o*t;case yl:return o*t*2;case ga:return o*t/i.components*i.byteLength;case va:return o*t/i.components*i.byteLength;case xl:return o*t*2/i.components*i.byteLength;case _a:return o*t*2/i.components*i.byteLength;case vl:return o*t*3/i.components*i.byteLength;case cn:return o*t*4/i.components*i.byteLength;case ya:return o*t*4/i.components*i.byteLength;case eo:case no:return Math.floor((o+3)/4)*Math.floor((t+3)/4)*8;case io:case so:return Math.floor((o+3)/4)*Math.floor((t+3)/4)*16;case Rr:case Pr:return Math.max(o,16)*Math.max(t,8)/4;case Cr:case Ir:return Math.max(o,8)*Math.max(t,8)/2;case Lr:case Dr:return Math.floor((o+3)/4)*Math.floor((t+3)/4)*8;case kr:return Math.floor((o+3)/4)*Math.floor((t+3)/4)*16;case Ur:return Math.floor((o+3)/4)*Math.floor((t+3)/4)*16;case Nr:return Math.floor((o+4)/5)*Math.floor((t+3)/4)*16;case Br:return Math.floor((o+4)/5)*Math.floor((t+4)/5)*16;case Fr:return Math.floor((o+5)/6)*Math.floor((t+4)/5)*16;case Or:return Math.floor((o+5)/6)*Math.floor((t+5)/6)*16;case zr:return Math.floor((o+7)/8)*Math.floor((t+4)/5)*16;case Hr:return Math.floor((o+7)/8)*Math.floor((t+5)/6)*16;case Gr:return Math.floor((o+7)/8)*Math.floor((t+7)/8)*16;case Vr:return Math.floor((o+9)/10)*Math.floor((t+4)/5)*16;case Wr:return Math.floor((o+9)/10)*Math.floor((t+5)/6)*16;case Xr:return Math.floor((o+9)/10)*Math.floor((t+7)/8)*16;case qr:return Math.floor((o+9)/10)*Math.floor((t+9)/10)*16;case $r:return Math.floor((o+11)/12)*Math.floor((t+9)/10)*16;case Yr:return Math.floor((o+11)/12)*Math.floor((t+11)/12)*16;case oo:case Kr:case jr:return Math.ceil(o/4)*Math.ceil(t/4)*16;case wl:case Zr:return Math.ceil(o/4)*Math.ceil(t/4)*8;case Jr:case Qr:return Math.ceil(o/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Xd(o){switch(o){case Bn:case fl:return{byteLength:1,components:1};case _s:case pl:case ys:return{byteLength:2,components:1};case pa:case ma:return{byteLength:2,components:4};case di:case fa:case Mn:return{byteLength:4,components:1};case ml:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${o}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:da}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=da);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Ol(){let o=null,t=!1,e=null,n=null;function i(s,r){e(s,r),n=o.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=o.requestAnimationFrame(i),t=!0)},stop:function(){o.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){o=s}}}function qd(o){const t=new WeakMap;function e(a,c){const l=a.array,h=a.usage,d=l.byteLength,u=o.createBuffer();o.bindBuffer(c,u),o.bufferData(c,l,h),a.onUploadCallback();let f;if(l instanceof Float32Array)f=o.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=o.HALF_FLOAT:f=o.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=o.SHORT;else if(l instanceof Uint32Array)f=o.UNSIGNED_INT;else if(l instanceof Int32Array)f=o.INT;else if(l instanceof Int8Array)f=o.BYTE;else if(l instanceof Uint8Array)f=o.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=o.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,c,l){const h=c.array,d=c.updateRanges;if(o.bindBuffer(l,a),d.length===0)o.bufferSubData(l,0,h);else{d.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<d.length;f++){const g=d[u],v=d[f];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++u,d[u]=v)}d.length=u+1;for(let f=0,g=d.length;f<g;f++){const v=d[f];o.bufferSubData(l,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(o.deleteBuffer(c.buffer),t.delete(a))}function r(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:i,remove:s,update:r}}var $d=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Yd=`#ifdef USE_ALPHAHASH
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
#endif`,Kd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,jd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Zd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Jd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Qd=`#ifdef USE_AOMAP
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
#endif`,tu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,eu=`#ifdef USE_BATCHING
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
#endif`,nu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,iu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,su=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ou=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,ru=`#ifdef USE_IRIDESCENCE
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
#endif`,au=`#ifdef USE_BUMPMAP
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
#endif`,cu=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,lu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,hu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,du=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,uu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,fu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,pu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,mu=`#if defined( USE_COLOR_ALPHA )
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
#endif`,gu=`#define PI 3.141592653589793
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
} // validated`,vu=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,_u=`vec3 transformedNormal = objectNormal;
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
#endif`,yu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,xu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,wu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Mu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,bu="gl_FragColor = linearToOutputTexel( gl_FragColor );",Su=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Eu=`#ifdef USE_ENVMAP
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
#endif`,Tu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Au=`#ifdef USE_ENVMAP
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
#endif`,Cu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ru=`#ifdef USE_ENVMAP
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
#endif`,Iu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Pu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Lu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Du=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ku=`#ifdef USE_GRADIENTMAP
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
}`,Uu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Nu=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Bu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Fu=`uniform bool receiveShadow;
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
#endif`,Ou=`#ifdef USE_ENVMAP
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
#endif`,zu=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Hu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Gu=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Vu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Wu=`PhysicalMaterial material;
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
#endif`,Xu=`struct PhysicalMaterial {
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
}`,qu=`
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
#endif`,$u=`#if defined( RE_IndirectDiffuse )
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
#endif`,Yu=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ku=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ju=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Zu=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ju=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Qu=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,tf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ef=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,nf=`#if defined( USE_POINTS_UV )
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
#endif`,sf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,of=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,rf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,af=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,cf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,lf=`#ifdef USE_MORPHTARGETS
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
#endif`,hf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,df=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,uf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,ff=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,pf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,gf=`#ifdef USE_NORMALMAP
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
#endif`,vf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,_f=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,yf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,xf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,wf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Mf=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,bf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Sf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ef=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Tf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Af=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Cf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Rf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,If=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Pf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Lf=`float getShadowMask() {
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
}`,Df=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,kf=`#ifdef USE_SKINNING
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
#endif`,Uf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Nf=`#ifdef USE_SKINNING
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
#endif`,Bf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ff=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Of=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,zf=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Hf=`#ifdef USE_TRANSMISSION
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
#endif`,Gf=`#ifdef USE_TRANSMISSION
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
#endif`,Vf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Wf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Xf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,qf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const $f=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Yf=`uniform sampler2D t2D;
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
}`,Kf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,jf=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Zf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Jf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qf=`#include <common>
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
}`,tp=`#if DEPTH_PACKING == 3200
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
}`,ep=`#define DISTANCE
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
}`,np=`#define DISTANCE
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
}`,ip=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,sp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,op=`uniform float scale;
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
}`,rp=`uniform vec3 diffuse;
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
}`,ap=`#include <common>
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
}`,cp=`uniform vec3 diffuse;
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
}`,lp=`#define LAMBERT
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
}`,hp=`#define LAMBERT
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
}`,dp=`#define MATCAP
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
}`,up=`#define MATCAP
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
}`,fp=`#define NORMAL
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
}`,pp=`#define NORMAL
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
}`,mp=`#define PHONG
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
}`,gp=`#define PHONG
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
}`,vp=`#define STANDARD
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
}`,_p=`#define STANDARD
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
}`,yp=`#define TOON
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
}`,xp=`#define TOON
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
}`,wp=`uniform float size;
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
}`,Mp=`uniform vec3 diffuse;
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
}`,bp=`#include <common>
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
}`,Sp=`uniform vec3 color;
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
}`,Ep=`uniform float rotation;
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
}`,Tp=`uniform vec3 diffuse;
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
}`,Ht={alphahash_fragment:$d,alphahash_pars_fragment:Yd,alphamap_fragment:Kd,alphamap_pars_fragment:jd,alphatest_fragment:Zd,alphatest_pars_fragment:Jd,aomap_fragment:Qd,aomap_pars_fragment:tu,batching_pars_vertex:eu,batching_vertex:nu,begin_vertex:iu,beginnormal_vertex:su,bsdfs:ou,iridescence_fragment:ru,bumpmap_pars_fragment:au,clipping_planes_fragment:cu,clipping_planes_pars_fragment:lu,clipping_planes_pars_vertex:hu,clipping_planes_vertex:du,color_fragment:uu,color_pars_fragment:fu,color_pars_vertex:pu,color_vertex:mu,common:gu,cube_uv_reflection_fragment:vu,defaultnormal_vertex:_u,displacementmap_pars_vertex:yu,displacementmap_vertex:xu,emissivemap_fragment:wu,emissivemap_pars_fragment:Mu,colorspace_fragment:bu,colorspace_pars_fragment:Su,envmap_fragment:Eu,envmap_common_pars_fragment:Tu,envmap_pars_fragment:Au,envmap_pars_vertex:Cu,envmap_physical_pars_fragment:Ou,envmap_vertex:Ru,fog_vertex:Iu,fog_pars_vertex:Pu,fog_fragment:Lu,fog_pars_fragment:Du,gradientmap_pars_fragment:ku,lightmap_pars_fragment:Uu,lights_lambert_fragment:Nu,lights_lambert_pars_fragment:Bu,lights_pars_begin:Fu,lights_toon_fragment:zu,lights_toon_pars_fragment:Hu,lights_phong_fragment:Gu,lights_phong_pars_fragment:Vu,lights_physical_fragment:Wu,lights_physical_pars_fragment:Xu,lights_fragment_begin:qu,lights_fragment_maps:$u,lights_fragment_end:Yu,logdepthbuf_fragment:Ku,logdepthbuf_pars_fragment:ju,logdepthbuf_pars_vertex:Zu,logdepthbuf_vertex:Ju,map_fragment:Qu,map_pars_fragment:tf,map_particle_fragment:ef,map_particle_pars_fragment:nf,metalnessmap_fragment:sf,metalnessmap_pars_fragment:of,morphinstance_vertex:rf,morphcolor_vertex:af,morphnormal_vertex:cf,morphtarget_pars_vertex:lf,morphtarget_vertex:hf,normal_fragment_begin:df,normal_fragment_maps:uf,normal_pars_fragment:ff,normal_pars_vertex:pf,normal_vertex:mf,normalmap_pars_fragment:gf,clearcoat_normal_fragment_begin:vf,clearcoat_normal_fragment_maps:_f,clearcoat_pars_fragment:yf,iridescence_pars_fragment:xf,opaque_fragment:wf,packing:Mf,premultiplied_alpha_fragment:bf,project_vertex:Sf,dithering_fragment:Ef,dithering_pars_fragment:Tf,roughnessmap_fragment:Af,roughnessmap_pars_fragment:Cf,shadowmap_pars_fragment:Rf,shadowmap_pars_vertex:If,shadowmap_vertex:Pf,shadowmask_pars_fragment:Lf,skinbase_vertex:Df,skinning_pars_vertex:kf,skinning_vertex:Uf,skinnormal_vertex:Nf,specularmap_fragment:Bf,specularmap_pars_fragment:Ff,tonemapping_fragment:Of,tonemapping_pars_fragment:zf,transmission_fragment:Hf,transmission_pars_fragment:Gf,uv_pars_fragment:Vf,uv_pars_vertex:Wf,uv_vertex:Xf,worldpos_vertex:qf,background_vert:$f,background_frag:Yf,backgroundCube_vert:Kf,backgroundCube_frag:jf,cube_vert:Zf,cube_frag:Jf,depth_vert:Qf,depth_frag:tp,distanceRGBA_vert:ep,distanceRGBA_frag:np,equirect_vert:ip,equirect_frag:sp,linedashed_vert:op,linedashed_frag:rp,meshbasic_vert:ap,meshbasic_frag:cp,meshlambert_vert:lp,meshlambert_frag:hp,meshmatcap_vert:dp,meshmatcap_frag:up,meshnormal_vert:fp,meshnormal_frag:pp,meshphong_vert:mp,meshphong_frag:gp,meshphysical_vert:vp,meshphysical_frag:_p,meshtoon_vert:yp,meshtoon_frag:xp,points_vert:wp,points_frag:Mp,shadow_vert:bp,shadow_frag:Sp,sprite_vert:Ep,sprite_frag:Tp},ct={common:{diffuse:{value:new rt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ot}},envmap:{envMap:{value:null},envMapRotation:{value:new Ot},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ot}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ot}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ot},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ot},normalScale:{value:new Dt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ot},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ot}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ot}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ot}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new rt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new rt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0},uvTransform:{value:new Ot}},sprite:{diffuse:{value:new rt(16777215)},opacity:{value:1},center:{value:new Dt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}}},xn={basic:{uniforms:Ge([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.fog]),vertexShader:Ht.meshbasic_vert,fragmentShader:Ht.meshbasic_frag},lambert:{uniforms:Ge([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,ct.lights,{emissive:{value:new rt(0)}}]),vertexShader:Ht.meshlambert_vert,fragmentShader:Ht.meshlambert_frag},phong:{uniforms:Ge([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,ct.lights,{emissive:{value:new rt(0)},specular:{value:new rt(1118481)},shininess:{value:30}}]),vertexShader:Ht.meshphong_vert,fragmentShader:Ht.meshphong_frag},standard:{uniforms:Ge([ct.common,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.roughnessmap,ct.metalnessmap,ct.fog,ct.lights,{emissive:{value:new rt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ht.meshphysical_vert,fragmentShader:Ht.meshphysical_frag},toon:{uniforms:Ge([ct.common,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.gradientmap,ct.fog,ct.lights,{emissive:{value:new rt(0)}}]),vertexShader:Ht.meshtoon_vert,fragmentShader:Ht.meshtoon_frag},matcap:{uniforms:Ge([ct.common,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,{matcap:{value:null}}]),vertexShader:Ht.meshmatcap_vert,fragmentShader:Ht.meshmatcap_frag},points:{uniforms:Ge([ct.points,ct.fog]),vertexShader:Ht.points_vert,fragmentShader:Ht.points_frag},dashed:{uniforms:Ge([ct.common,ct.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ht.linedashed_vert,fragmentShader:Ht.linedashed_frag},depth:{uniforms:Ge([ct.common,ct.displacementmap]),vertexShader:Ht.depth_vert,fragmentShader:Ht.depth_frag},normal:{uniforms:Ge([ct.common,ct.bumpmap,ct.normalmap,ct.displacementmap,{opacity:{value:1}}]),vertexShader:Ht.meshnormal_vert,fragmentShader:Ht.meshnormal_frag},sprite:{uniforms:Ge([ct.sprite,ct.fog]),vertexShader:Ht.sprite_vert,fragmentShader:Ht.sprite_frag},background:{uniforms:{uvTransform:{value:new Ot},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ht.background_vert,fragmentShader:Ht.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ot}},vertexShader:Ht.backgroundCube_vert,fragmentShader:Ht.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ht.cube_vert,fragmentShader:Ht.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ht.equirect_vert,fragmentShader:Ht.equirect_frag},distanceRGBA:{uniforms:Ge([ct.common,ct.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ht.distanceRGBA_vert,fragmentShader:Ht.distanceRGBA_frag},shadow:{uniforms:Ge([ct.lights,ct.fog,{color:{value:new rt(0)},opacity:{value:1}}]),vertexShader:Ht.shadow_vert,fragmentShader:Ht.shadow_frag}};xn.physical={uniforms:Ge([xn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ot},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ot},clearcoatNormalScale:{value:new Dt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ot},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ot},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ot},sheen:{value:0},sheenColor:{value:new rt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ot},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ot},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ot},transmissionSamplerSize:{value:new Dt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ot},attenuationDistance:{value:0},attenuationColor:{value:new rt(0)},specularColor:{value:new rt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ot},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ot},anisotropyVector:{value:new Dt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ot}}]),vertexShader:Ht.meshphysical_vert,fragmentShader:Ht.meshphysical_frag};const js={r:0,b:0,g:0},ii=new hn,Ap=new re;function Cp(o,t,e,n,i,s,r){const a=new rt(0);let c=s===!0?0:1,l,h,d=null,u=0,f=null;function g(b){let x=b.isScene===!0?b.background:null;return x&&x.isTexture&&(x=(b.backgroundBlurriness>0?e:t).get(x)),x}function v(b){let x=!1;const I=g(b);I===null?m(a,c):I&&I.isColor&&(m(I,1),x=!0);const E=o.xr.getEnvironmentBlendMode();E==="additive"?n.buffers.color.setClear(0,0,0,1,r):E==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,r),(o.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),o.clear(o.autoClearColor,o.autoClearDepth,o.autoClearStencil))}function p(b,x){const I=g(x);I&&(I.isCubeTexture||I.mapping===xo)?(h===void 0&&(h=new T(new J(1,1,1),new En({name:"BackgroundCubeMaterial",uniforms:Ki(xn.backgroundCube.uniforms),vertexShader:xn.backgroundCube.vertexShader,fragmentShader:xn.backgroundCube.fragmentShader,side:Xe,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(E,A,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),ii.copy(x.backgroundRotation),ii.x*=-1,ii.y*=-1,ii.z*=-1,I.isCubeTexture&&I.isRenderTargetTexture===!1&&(ii.y*=-1,ii.z*=-1),h.material.uniforms.envMap.value=I,h.material.uniforms.flipEnvMap.value=I.isCubeTexture&&I.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Ap.makeRotationFromEuler(ii)),h.material.toneMapped=Qt.getTransfer(I.colorSpace)!==ce,(d!==I||u!==I.version||f!==o.toneMapping)&&(h.material.needsUpdate=!0,d=I,u=I.version,f=o.toneMapping),h.layers.enableAll(),b.unshift(h,h.geometry,h.material,0,0,null)):I&&I.isTexture&&(l===void 0&&(l=new T(new Ae(2,2),new En({name:"BackgroundMaterial",uniforms:Ki(xn.background.uniforms),vertexShader:xn.background.vertexShader,fragmentShader:xn.background.fragmentShader,side:jn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=I,l.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,l.material.toneMapped=Qt.getTransfer(I.colorSpace)!==ce,I.matrixAutoUpdate===!0&&I.updateMatrix(),l.material.uniforms.uvTransform.value.copy(I.matrix),(d!==I||u!==I.version||f!==o.toneMapping)&&(l.material.needsUpdate=!0,d=I,u=I.version,f=o.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null))}function m(b,x){b.getRGB(js,Cl(o)),n.buffers.color.setClear(js.r,js.g,js.b,x,r)}function w(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(b,x=1){a.set(b),c=x,m(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(b){c=b,m(a,c)},render:v,addToRenderList:p,dispose:w}}function Rp(o,t){const e=o.getParameter(o.MAX_VERTEX_ATTRIBS),n={},i=u(null);let s=i,r=!1;function a(_,P,U,L,z){let V=!1;const B=d(L,U,P);s!==B&&(s=B,l(s.object)),V=f(_,L,U,z),V&&g(_,L,U,z),z!==null&&t.update(z,o.ELEMENT_ARRAY_BUFFER),(V||r)&&(r=!1,x(_,P,U,L),z!==null&&o.bindBuffer(o.ELEMENT_ARRAY_BUFFER,t.get(z).buffer))}function c(){return o.createVertexArray()}function l(_){return o.bindVertexArray(_)}function h(_){return o.deleteVertexArray(_)}function d(_,P,U){const L=U.wireframe===!0;let z=n[_.id];z===void 0&&(z={},n[_.id]=z);let V=z[P.id];V===void 0&&(V={},z[P.id]=V);let B=V[L];return B===void 0&&(B=u(c()),V[L]=B),B}function u(_){const P=[],U=[],L=[];for(let z=0;z<e;z++)P[z]=0,U[z]=0,L[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:U,attributeDivisors:L,object:_,attributes:{},index:null}}function f(_,P,U,L){const z=s.attributes,V=P.attributes;let B=0;const q=U.getAttributes();for(const H in q)if(q[H].location>=0){const st=z[H];let at=V[H];if(at===void 0&&(H==="instanceMatrix"&&_.instanceMatrix&&(at=_.instanceMatrix),H==="instanceColor"&&_.instanceColor&&(at=_.instanceColor)),st===void 0||st.attribute!==at||at&&st.data!==at.data)return!0;B++}return s.attributesNum!==B||s.index!==L}function g(_,P,U,L){const z={},V=P.attributes;let B=0;const q=U.getAttributes();for(const H in q)if(q[H].location>=0){let st=V[H];st===void 0&&(H==="instanceMatrix"&&_.instanceMatrix&&(st=_.instanceMatrix),H==="instanceColor"&&_.instanceColor&&(st=_.instanceColor));const at={};at.attribute=st,st&&st.data&&(at.data=st.data),z[H]=at,B++}s.attributes=z,s.attributesNum=B,s.index=L}function v(){const _=s.newAttributes;for(let P=0,U=_.length;P<U;P++)_[P]=0}function p(_){m(_,0)}function m(_,P){const U=s.newAttributes,L=s.enabledAttributes,z=s.attributeDivisors;U[_]=1,L[_]===0&&(o.enableVertexAttribArray(_),L[_]=1),z[_]!==P&&(o.vertexAttribDivisor(_,P),z[_]=P)}function w(){const _=s.newAttributes,P=s.enabledAttributes;for(let U=0,L=P.length;U<L;U++)P[U]!==_[U]&&(o.disableVertexAttribArray(U),P[U]=0)}function b(_,P,U,L,z,V,B){B===!0?o.vertexAttribIPointer(_,P,U,z,V):o.vertexAttribPointer(_,P,U,L,z,V)}function x(_,P,U,L){v();const z=L.attributes,V=U.getAttributes(),B=P.defaultAttributeValues;for(const q in V){const H=V[q];if(H.location>=0){let nt=z[q];if(nt===void 0&&(q==="instanceMatrix"&&_.instanceMatrix&&(nt=_.instanceMatrix),q==="instanceColor"&&_.instanceColor&&(nt=_.instanceColor)),nt!==void 0){const st=nt.normalized,at=nt.itemSize,bt=t.get(nt);if(bt===void 0)continue;const Zt=bt.buffer,K=bt.type,ot=bt.bytesPerElement,wt=K===o.INT||K===o.UNSIGNED_INT||nt.gpuType===fa;if(nt.isInterleavedBufferAttribute){const dt=nt.data,Rt=dt.stride,te=nt.offset;if(dt.isInstancedInterleavedBuffer){for(let Lt=0;Lt<H.locationSize;Lt++)m(H.location+Lt,dt.meshPerAttribute);_.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=dt.meshPerAttribute*dt.count)}else for(let Lt=0;Lt<H.locationSize;Lt++)p(H.location+Lt);o.bindBuffer(o.ARRAY_BUFFER,Zt);for(let Lt=0;Lt<H.locationSize;Lt++)b(H.location+Lt,at/H.locationSize,K,st,Rt*ot,(te+at/H.locationSize*Lt)*ot,wt)}else{if(nt.isInstancedBufferAttribute){for(let dt=0;dt<H.locationSize;dt++)m(H.location+dt,nt.meshPerAttribute);_.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=nt.meshPerAttribute*nt.count)}else for(let dt=0;dt<H.locationSize;dt++)p(H.location+dt);o.bindBuffer(o.ARRAY_BUFFER,Zt);for(let dt=0;dt<H.locationSize;dt++)b(H.location+dt,at/H.locationSize,K,st,at*ot,at/H.locationSize*dt*ot,wt)}}else if(B!==void 0){const st=B[q];if(st!==void 0)switch(st.length){case 2:o.vertexAttrib2fv(H.location,st);break;case 3:o.vertexAttrib3fv(H.location,st);break;case 4:o.vertexAttrib4fv(H.location,st);break;default:o.vertexAttrib1fv(H.location,st)}}}}w()}function I(){R();for(const _ in n){const P=n[_];for(const U in P){const L=P[U];for(const z in L)h(L[z].object),delete L[z];delete P[U]}delete n[_]}}function E(_){if(n[_.id]===void 0)return;const P=n[_.id];for(const U in P){const L=P[U];for(const z in L)h(L[z].object),delete L[z];delete P[U]}delete n[_.id]}function A(_){for(const P in n){const U=n[P];if(U[_.id]===void 0)continue;const L=U[_.id];for(const z in L)h(L[z].object),delete L[z];delete U[_.id]}}function R(){y(),r=!0,s!==i&&(s=i,l(s.object))}function y(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:R,resetDefaultState:y,dispose:I,releaseStatesOfGeometry:E,releaseStatesOfProgram:A,initAttributes:v,enableAttribute:p,disableUnusedAttributes:w}}function Ip(o,t,e){let n;function i(l){n=l}function s(l,h){o.drawArrays(n,l,h),e.update(h,n,1)}function r(l,h,d){d!==0&&(o.drawArraysInstanced(n,l,h,d),e.update(h,n,d))}function a(l,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,d);let f=0;for(let g=0;g<d;g++)f+=h[g];e.update(f,n,1)}function c(l,h,d,u){if(d===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)r(l[g],h[g],u[g]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,h,0,u,0,d);let g=0;for(let v=0;v<d;v++)g+=h[v]*u[v];e.update(g,n,1)}}this.setMode=i,this.render=s,this.renderInstances=r,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function Pp(o,t,e,n){let i;function s(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");i=o.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function r(A){return!(A!==cn&&n.convert(A)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const R=A===ys&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==Bn&&n.convert(A)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Mn&&!R)}function c(A){if(A==="highp"){if(o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.HIGH_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.MEDIUM_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const d=e.logarithmicDepthBuffer===!0,u=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=o.getParameter(o.MAX_TEXTURE_IMAGE_UNITS),g=o.getParameter(o.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=o.getParameter(o.MAX_TEXTURE_SIZE),p=o.getParameter(o.MAX_CUBE_MAP_TEXTURE_SIZE),m=o.getParameter(o.MAX_VERTEX_ATTRIBS),w=o.getParameter(o.MAX_VERTEX_UNIFORM_VECTORS),b=o.getParameter(o.MAX_VARYING_VECTORS),x=o.getParameter(o.MAX_FRAGMENT_UNIFORM_VECTORS),I=g>0,E=o.getParameter(o.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:r,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:d,reverseDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:w,maxVaryings:b,maxFragmentUniforms:x,vertexTextures:I,maxSamples:E}}function Lp(o){const t=this;let e=null,n=0,i=!1,s=!1;const r=new Xn,a=new Ot,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||n!==0||i;return i=u,n=d.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){const g=d.clippingPlanes,v=d.clipIntersection,p=d.clipShadows,m=o.get(d);if(!i||g===null||g.length===0||s&&!p)s?h(null):l();else{const w=s?0:n,b=w*4;let x=m.clippingState||null;c.value=x,x=h(g,u,b,f);for(let I=0;I!==b;++I)x[I]=e[I];m.clippingState=x,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=w}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,f,g){const v=d!==null?d.length:0;let p=null;if(v!==0){if(p=c.value,g!==!0||p===null){const m=f+v*4,w=u.matrixWorldInverse;a.getNormalMatrix(w),(p===null||p.length<m)&&(p=new Float32Array(m));for(let b=0,x=f;b!==v;++b,x+=4)r.copy(d[b]).applyMatrix4(w,a),r.normal.toArray(p,x),p[x+3]=r.constant}c.value=p,c.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,p}}function Dp(o){let t=new WeakMap;function e(r,a){return a===Er?r.mapping=Wi:a===Tr&&(r.mapping=Xi),r}function n(r){if(r&&r.isTexture){const a=r.mapping;if(a===Er||a===Tr)if(t.has(r)){const c=t.get(r).texture;return e(c,r.mapping)}else{const c=r.image;if(c&&c.height>0){const l=new Td(c.height);return l.fromEquirectangularTexture(o,r),t.set(r,l),r.addEventListener("dispose",i),e(l.texture,r.mapping)}else return null}}return r}function i(r){const a=r.target;a.removeEventListener("dispose",i);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}const Bi=4,Rc=[.125,.215,.35,.446,.526,.582],ci=20,or=new Fl,Ic=new rt;let rr=null,ar=0,cr=0,lr=!1;const ri=(1+Math.sqrt(5))/2,ki=1/ri,Pc=[new D(-ri,ki,0),new D(ri,ki,0),new D(-ki,0,ri),new D(ki,0,ri),new D(0,ri,-ki),new D(0,ri,ki),new D(-1,1,-1),new D(1,1,-1),new D(-1,1,1),new D(1,1,1)],kp=new D;class Lc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100,s={}){const{size:r=256,position:a=kp}=s;rr=this._renderer.getRenderTarget(),ar=this._renderer.getActiveCubeFace(),cr=this._renderer.getActiveMipmapLevel(),lr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(r);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,i,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Uc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=kc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(rr,ar,cr),this._renderer.xr.enabled=lr,t.scissorTest=!1,Zs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Wi||t.mapping===Xi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),rr=this._renderer.getRenderTarget(),ar=this._renderer.getActiveCubeFace(),cr=this._renderer.getActiveMipmapLevel(),lr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:an,minFilter:an,generateMipmaps:!1,type:ys,format:cn,colorSpace:Yi,depthBuffer:!1},i=Dc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Dc(t,e,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Up(s)),this._blurMaterial=Np(s,t,e)}return i}_compileMaterial(t){const e=new T(this._lodPlanes[0],t);this._renderer.compile(e,or)}_sceneToCubeUV(t,e,n,i,s){const c=new Je(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(Ic),d.toneMapping=Yn,d.autoClear=!1;const g=new Yt({name:"PMREM.Background",side:Xe,depthWrite:!1,depthTest:!1}),v=new T(new J,g);let p=!1;const m=t.background;m?m.isColor&&(g.color.copy(m),t.background=null,p=!0):(g.color.copy(Ic),p=!0);for(let w=0;w<6;w++){const b=w%3;b===0?(c.up.set(0,l[w],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+h[w],s.y,s.z)):b===1?(c.up.set(0,0,l[w]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+h[w],s.z)):(c.up.set(0,l[w],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+h[w]));const x=this._cubeSize;Zs(i,b*x,w>2?x:0,x,x),d.setRenderTarget(i),p&&d.render(v,c),d.render(t,c)}v.geometry.dispose(),v.material.dispose(),d.toneMapping=f,d.autoClear=u,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===Wi||t.mapping===Xi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Uc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=kc());const s=i?this._cubemapMaterial:this._equirectMaterial,r=new T(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;const c=this._cubeSize;Zs(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(r,or)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Pc[(i-s-1)%Pc.length];this._blur(t,s-1,s,r,a)}e.autoClear=n}_blur(t,e,n,i,s){const r=this._pingPongRenderTarget;this._halfBlur(t,r,e,n,i,"latitudinal",s),this._halfBlur(r,t,n,n,i,"longitudinal",s)}_halfBlur(t,e,n,i,s,r,a){const c=this._renderer,l=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new T(this._lodPlanes[i],l),u=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*ci-1),v=s/g,p=isFinite(s)?1+Math.floor(h*v):ci;p>ci&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${ci}`);const m=[];let w=0;for(let A=0;A<ci;++A){const R=A/v,y=Math.exp(-R*R/2);m.push(y),A===0?w+=y:A<p&&(w+=2*y)}for(let A=0;A<m.length;A++)m[A]=m[A]/w;u.envMap.value=t.texture,u.samples.value=p,u.weights.value=m,u.latitudinal.value=r==="latitudinal",a&&(u.poleAxis.value=a);const{_lodMax:b}=this;u.dTheta.value=g,u.mipInt.value=b-n;const x=this._sizeLods[i],I=3*x*(i>b-Bi?i-b+Bi:0),E=4*(this._cubeSize-x);Zs(e,I,E,3*x,2*x),c.setRenderTarget(e),c.render(d,or)}}function Up(o){const t=[],e=[],n=[];let i=o;const s=o-Bi+1+Rc.length;for(let r=0;r<s;r++){const a=Math.pow(2,i);e.push(a);let c=1/a;r>o-Bi?c=Rc[r-o+Bi-1]:r===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,d=1+l,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,g=6,v=3,p=2,m=1,w=new Float32Array(v*g*f),b=new Float32Array(p*g*f),x=new Float32Array(m*g*f);for(let E=0;E<f;E++){const A=E%3*2/3-1,R=E>2?0:-1,y=[A,R,0,A+2/3,R,0,A+2/3,R+1,0,A,R,0,A+2/3,R+1,0,A,R+1,0];w.set(y,v*g*E),b.set(u,p*g*E);const _=[E,E,E,E,E,E];x.set(_,m*g*E)}const I=new we;I.setAttribute("position",new Pe(w,v)),I.setAttribute("uv",new Pe(b,p)),I.setAttribute("faceIndex",new Pe(x,m)),t.push(I),i>Bi&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Dc(o,t,e){const n=new ui(o,t,e);return n.texture.mapping=xo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Zs(o,t,e,n,i){o.viewport.set(t,e,n,i),o.scissor.set(t,e,n,i)}function Np(o,t,e){const n=new Float32Array(ci),i=new D(0,1,0);return new En({name:"SphericalGaussianBlur",defines:{n:ci,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${o}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Ra(),fragmentShader:`

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
		`,blending:$n,depthTest:!1,depthWrite:!1})}function kc(){return new En({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ra(),fragmentShader:`

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
		`,blending:$n,depthTest:!1,depthWrite:!1})}function Uc(){return new En({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ra(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:$n,depthTest:!1,depthWrite:!1})}function Ra(){return`

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
	`}function Bp(o){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===Er||c===Tr,h=c===Wi||c===Xi;if(l||h){let d=t.get(a);const u=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==u)return e===null&&(e=new Lc(o)),d=l?e.fromEquirectangular(a,d):e.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),d.texture;if(d!==void 0)return d.texture;{const f=a.image;return l&&f&&f.height>0||h&&f&&i(f)?(e===null&&(e=new Lc(o)),d=l?e.fromEquirectangular(a):e.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),a.addEventListener("dispose",s),d.texture):null}}}return a}function i(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function s(a){const c=a.target;c.removeEventListener("dispose",s);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function r(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:r}}function Fp(o){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=o.getExtension("WEBGL_depth_texture")||o.getExtension("MOZ_WEBGL_depth_texture")||o.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=o.getExtension("EXT_texture_filter_anisotropic")||o.getExtension("MOZ_EXT_texture_filter_anisotropic")||o.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=o.getExtension("WEBGL_compressed_texture_s3tc")||o.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||o.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=o.getExtension("WEBGL_compressed_texture_pvrtc")||o.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=o.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&oi("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Op(o,t,e,n){const i={},s=new WeakMap;function r(d){const u=d.target;u.index!==null&&t.remove(u.index);for(const g in u.attributes)t.remove(u.attributes[g]);u.removeEventListener("dispose",r),delete i[u.id];const f=s.get(u);f&&(t.remove(f),s.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function a(d,u){return i[u.id]===!0||(u.addEventListener("dispose",r),i[u.id]=!0,e.memory.geometries++),u}function c(d){const u=d.attributes;for(const f in u)t.update(u[f],o.ARRAY_BUFFER)}function l(d){const u=[],f=d.index,g=d.attributes.position;let v=0;if(f!==null){const w=f.array;v=f.version;for(let b=0,x=w.length;b<x;b+=3){const I=w[b+0],E=w[b+1],A=w[b+2];u.push(I,E,E,A,A,I)}}else if(g!==void 0){const w=g.array;v=g.version;for(let b=0,x=w.length/3-1;b<x;b+=3){const I=b+0,E=b+1,A=b+2;u.push(I,E,E,A,A,I)}}else return;const p=new(bl(u)?Al:Tl)(u,1);p.version=v;const m=s.get(d);m&&t.remove(m),s.set(d,p)}function h(d){const u=s.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&l(d)}else l(d);return s.get(d)}return{get:a,update:c,getWireframeAttribute:h}}function zp(o,t,e){let n;function i(u){n=u}let s,r;function a(u){s=u.type,r=u.bytesPerElement}function c(u,f){o.drawElements(n,f,s,u*r),e.update(f,n,1)}function l(u,f,g){g!==0&&(o.drawElementsInstanced(n,f,s,u*r,g),e.update(f,n,g))}function h(u,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,u,0,g);let p=0;for(let m=0;m<g;m++)p+=f[m];e.update(p,n,1)}function d(u,f,g,v){if(g===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<u.length;m++)l(u[m]/r,f[m],v[m]);else{p.multiDrawElementsInstancedWEBGL(n,f,0,s,u,0,v,0,g);let m=0;for(let w=0;w<g;w++)m+=f[w]*v[w];e.update(m,n,1)}}this.setMode=i,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function Hp(o){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,r,a){switch(e.calls++,r){case o.TRIANGLES:e.triangles+=a*(s/3);break;case o.LINES:e.lines+=a*(s/2);break;case o.LINE_STRIP:e.lines+=a*(s-1);break;case o.LINE_LOOP:e.lines+=a*s;break;case o.POINTS:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function Gp(o,t,e){const n=new WeakMap,i=new he;function s(r,a,c){const l=r.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0;let u=n.get(a);if(u===void 0||u.count!==d){let _=function(){R.dispose(),n.delete(a),a.removeEventListener("dispose",_)};var f=_;u!==void 0&&u.texture.dispose();const g=a.morphAttributes.position!==void 0,v=a.morphAttributes.normal!==void 0,p=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],w=a.morphAttributes.normal||[],b=a.morphAttributes.color||[];let x=0;g===!0&&(x=1),v===!0&&(x=2),p===!0&&(x=3);let I=a.attributes.position.count*x,E=1;I>t.maxTextureSize&&(E=Math.ceil(I/t.maxTextureSize),I=t.maxTextureSize);const A=new Float32Array(I*E*4*d),R=new Sl(A,I,E,d);R.type=Mn,R.needsUpdate=!0;const y=x*4;for(let P=0;P<d;P++){const U=m[P],L=w[P],z=b[P],V=I*E*4*P;for(let B=0;B<U.count;B++){const q=B*y;g===!0&&(i.fromBufferAttribute(U,B),A[V+q+0]=i.x,A[V+q+1]=i.y,A[V+q+2]=i.z,A[V+q+3]=0),v===!0&&(i.fromBufferAttribute(L,B),A[V+q+4]=i.x,A[V+q+5]=i.y,A[V+q+6]=i.z,A[V+q+7]=0),p===!0&&(i.fromBufferAttribute(z,B),A[V+q+8]=i.x,A[V+q+9]=i.y,A[V+q+10]=i.z,A[V+q+11]=z.itemSize===4?i.w:1)}}u={count:d,texture:R,size:new Dt(I,E)},n.set(a,u),a.addEventListener("dispose",_)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)c.getUniforms().setValue(o,"morphTexture",r.morphTexture,e);else{let g=0;for(let p=0;p<l.length;p++)g+=l[p];const v=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(o,"morphTargetBaseInfluence",v),c.getUniforms().setValue(o,"morphTargetInfluences",l)}c.getUniforms().setValue(o,"morphTargetsTexture",u.texture,e),c.getUniforms().setValue(o,"morphTargetsTextureSize",u.size)}return{update:s}}function Vp(o,t,e,n){let i=new WeakMap;function s(c){const l=n.render.frame,h=c.geometry,d=t.get(c,h);if(i.get(d)!==l&&(t.update(d),i.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),i.get(c)!==l&&(e.update(c.instanceMatrix,o.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,o.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){const u=c.skeleton;i.get(u)!==l&&(u.update(),i.set(u,l))}return d}function r(){i=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:s,dispose:r}}const zl=new Oe,Nc=new Ul(1,1),Hl=new Sl,Gl=new ld,Vl=new Il,Bc=[],Fc=[],Oc=new Float32Array(16),zc=new Float32Array(9),Hc=new Float32Array(4);function Zi(o,t,e){const n=o[0];if(n<=0||n>0)return o;const i=t*e;let s=Bc[i];if(s===void 0&&(s=new Float32Array(i),Bc[i]=s),t!==0){n.toArray(s,0);for(let r=1,a=0;r!==t;++r)a+=e,o[r].toArray(s,a)}return s}function Ce(o,t){if(o.length!==t.length)return!1;for(let e=0,n=o.length;e<n;e++)if(o[e]!==t[e])return!1;return!0}function Re(o,t){for(let e=0,n=t.length;e<n;e++)o[e]=t[e]}function To(o,t){let e=Fc[t];e===void 0&&(e=new Int32Array(t),Fc[t]=e);for(let n=0;n!==t;++n)e[n]=o.allocateTextureUnit();return e}function Wp(o,t){const e=this.cache;e[0]!==t&&(o.uniform1f(this.addr,t),e[0]=t)}function Xp(o,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(o.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;o.uniform2fv(this.addr,t),Re(e,t)}}function qp(o,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(o.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(o.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ce(e,t))return;o.uniform3fv(this.addr,t),Re(e,t)}}function $p(o,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(o.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;o.uniform4fv(this.addr,t),Re(e,t)}}function Yp(o,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ce(e,t))return;o.uniformMatrix2fv(this.addr,!1,t),Re(e,t)}else{if(Ce(e,n))return;Hc.set(n),o.uniformMatrix2fv(this.addr,!1,Hc),Re(e,n)}}function Kp(o,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ce(e,t))return;o.uniformMatrix3fv(this.addr,!1,t),Re(e,t)}else{if(Ce(e,n))return;zc.set(n),o.uniformMatrix3fv(this.addr,!1,zc),Re(e,n)}}function jp(o,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ce(e,t))return;o.uniformMatrix4fv(this.addr,!1,t),Re(e,t)}else{if(Ce(e,n))return;Oc.set(n),o.uniformMatrix4fv(this.addr,!1,Oc),Re(e,n)}}function Zp(o,t){const e=this.cache;e[0]!==t&&(o.uniform1i(this.addr,t),e[0]=t)}function Jp(o,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(o.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;o.uniform2iv(this.addr,t),Re(e,t)}}function Qp(o,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(o.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ce(e,t))return;o.uniform3iv(this.addr,t),Re(e,t)}}function tm(o,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(o.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;o.uniform4iv(this.addr,t),Re(e,t)}}function em(o,t){const e=this.cache;e[0]!==t&&(o.uniform1ui(this.addr,t),e[0]=t)}function nm(o,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(o.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;o.uniform2uiv(this.addr,t),Re(e,t)}}function im(o,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(o.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ce(e,t))return;o.uniform3uiv(this.addr,t),Re(e,t)}}function sm(o,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(o.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;o.uniform4uiv(this.addr,t),Re(e,t)}}function om(o,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(o.uniform1i(this.addr,i),n[0]=i);let s;this.type===o.SAMPLER_2D_SHADOW?(Nc.compareFunction=Ml,s=Nc):s=zl,e.setTexture2D(t||s,i)}function rm(o,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(o.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||Gl,i)}function am(o,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(o.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||Vl,i)}function cm(o,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(o.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||Hl,i)}function lm(o){switch(o){case 5126:return Wp;case 35664:return Xp;case 35665:return qp;case 35666:return $p;case 35674:return Yp;case 35675:return Kp;case 35676:return jp;case 5124:case 35670:return Zp;case 35667:case 35671:return Jp;case 35668:case 35672:return Qp;case 35669:case 35673:return tm;case 5125:return em;case 36294:return nm;case 36295:return im;case 36296:return sm;case 35678:case 36198:case 36298:case 36306:case 35682:return om;case 35679:case 36299:case 36307:return rm;case 35680:case 36300:case 36308:case 36293:return am;case 36289:case 36303:case 36311:case 36292:return cm}}function hm(o,t){o.uniform1fv(this.addr,t)}function dm(o,t){const e=Zi(t,this.size,2);o.uniform2fv(this.addr,e)}function um(o,t){const e=Zi(t,this.size,3);o.uniform3fv(this.addr,e)}function fm(o,t){const e=Zi(t,this.size,4);o.uniform4fv(this.addr,e)}function pm(o,t){const e=Zi(t,this.size,4);o.uniformMatrix2fv(this.addr,!1,e)}function mm(o,t){const e=Zi(t,this.size,9);o.uniformMatrix3fv(this.addr,!1,e)}function gm(o,t){const e=Zi(t,this.size,16);o.uniformMatrix4fv(this.addr,!1,e)}function vm(o,t){o.uniform1iv(this.addr,t)}function _m(o,t){o.uniform2iv(this.addr,t)}function ym(o,t){o.uniform3iv(this.addr,t)}function xm(o,t){o.uniform4iv(this.addr,t)}function wm(o,t){o.uniform1uiv(this.addr,t)}function Mm(o,t){o.uniform2uiv(this.addr,t)}function bm(o,t){o.uniform3uiv(this.addr,t)}function Sm(o,t){o.uniform4uiv(this.addr,t)}function Em(o,t,e){const n=this.cache,i=t.length,s=To(e,i);Ce(n,s)||(o.uniform1iv(this.addr,s),Re(n,s));for(let r=0;r!==i;++r)e.setTexture2D(t[r]||zl,s[r])}function Tm(o,t,e){const n=this.cache,i=t.length,s=To(e,i);Ce(n,s)||(o.uniform1iv(this.addr,s),Re(n,s));for(let r=0;r!==i;++r)e.setTexture3D(t[r]||Gl,s[r])}function Am(o,t,e){const n=this.cache,i=t.length,s=To(e,i);Ce(n,s)||(o.uniform1iv(this.addr,s),Re(n,s));for(let r=0;r!==i;++r)e.setTextureCube(t[r]||Vl,s[r])}function Cm(o,t,e){const n=this.cache,i=t.length,s=To(e,i);Ce(n,s)||(o.uniform1iv(this.addr,s),Re(n,s));for(let r=0;r!==i;++r)e.setTexture2DArray(t[r]||Hl,s[r])}function Rm(o){switch(o){case 5126:return hm;case 35664:return dm;case 35665:return um;case 35666:return fm;case 35674:return pm;case 35675:return mm;case 35676:return gm;case 5124:case 35670:return vm;case 35667:case 35671:return _m;case 35668:case 35672:return ym;case 35669:case 35673:return xm;case 5125:return wm;case 36294:return Mm;case 36295:return bm;case 36296:return Sm;case 35678:case 36198:case 36298:case 36306:case 35682:return Em;case 35679:case 36299:case 36307:return Tm;case 35680:case 36300:case 36308:case 36293:return Am;case 36289:case 36303:case 36311:case 36292:return Cm}}class Im{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=lm(e.type)}}class Pm{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Rm(e.type)}}class Lm{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let s=0,r=i.length;s!==r;++s){const a=i[s];a.setValue(t,e[a.id],n)}}}const hr=/(\w+)(\])?(\[|\.)?/g;function Gc(o,t){o.seq.push(t),o.map[t.id]=t}function Dm(o,t,e){const n=o.name,i=n.length;for(hr.lastIndex=0;;){const s=hr.exec(n),r=hr.lastIndex;let a=s[1];const c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&r+2===i){Gc(e,l===void 0?new Im(a,o,t):new Pm(a,o,t));break}else{let d=e.map[a];d===void 0&&(d=new Lm(a),Gc(e,d)),e=d}}}class ro{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=t.getActiveUniform(e,i),r=t.getUniformLocation(e,s.name);Dm(s,r,this)}}setValue(t,e,n,i){const s=this.map[e];s!==void 0&&s.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let s=0,r=e.length;s!==r;++s){const a=e[s],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,s=t.length;i!==s;++i){const r=t[i];r.id in e&&n.push(r)}return n}}function Vc(o,t,e){const n=o.createShader(t);return o.shaderSource(n,e),o.compileShader(n),n}const km=37297;let Um=0;function Nm(o,t){const e=o.split(`
`),n=[],i=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let r=i;r<s;r++){const a=r+1;n.push(`${a===t?">":" "} ${a}: ${e[r]}`)}return n.join(`
`)}const Wc=new Ot;function Bm(o){Qt._getMatrix(Wc,Qt.workingColorSpace,o);const t=`mat3( ${Wc.elements.map(e=>e.toFixed(4))} )`;switch(Qt.getTransfer(o)){case fo:return[t,"LinearTransferOETF"];case ce:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",o),[t,"LinearTransferOETF"]}}function Xc(o,t,e){const n=o.getShaderParameter(t,o.COMPILE_STATUS),i=o.getShaderInfoLog(t).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const r=parseInt(s[1]);return e.toUpperCase()+`

`+i+`

`+Nm(o.getShaderSource(t),r)}else return i}function Fm(o,t){const e=Bm(t);return[`vec4 ${o}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Om(o,t){let e;switch(t){case Nh:e="Linear";break;case Bh:e="Reinhard";break;case Fh:e="Cineon";break;case dl:e="ACESFilmic";break;case zh:e="AgX";break;case Hh:e="Neutral";break;case Oh:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+o+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Js=new D;function zm(){Qt.getLuminanceCoefficients(Js);const o=Js.x.toFixed(4),t=Js.y.toFixed(4),e=Js.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${o}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Hm(o){return[o.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",o.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ps).join(`
`)}function Gm(o){const t=[];for(const e in o){const n=o[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Vm(o,t){const e={},n=o.getProgramParameter(t,o.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=o.getActiveAttrib(t,i),r=s.name;let a=1;s.type===o.FLOAT_MAT2&&(a=2),s.type===o.FLOAT_MAT3&&(a=3),s.type===o.FLOAT_MAT4&&(a=4),e[r]={type:s.type,location:o.getAttribLocation(t,r),locationSize:a}}return e}function ps(o){return o!==""}function qc(o,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return o.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function $c(o,t){return o.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Wm=/^[ \t]*#include +<([\w\d./]+)>/gm;function sa(o){return o.replace(Wm,qm)}const Xm=new Map;function qm(o,t){let e=Ht[t];if(e===void 0){const n=Xm.get(t);if(n!==void 0)e=Ht[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return sa(e)}const $m=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Yc(o){return o.replace($m,Ym)}function Ym(o,t,e,n){let i="";for(let s=parseInt(t);s<parseInt(e);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Kc(o){let t=`precision ${o.precision} float;
	precision ${o.precision} int;
	precision ${o.precision} sampler2D;
	precision ${o.precision} samplerCube;
	precision ${o.precision} sampler3D;
	precision ${o.precision} sampler2DArray;
	precision ${o.precision} sampler2DShadow;
	precision ${o.precision} samplerCubeShadow;
	precision ${o.precision} sampler2DArrayShadow;
	precision ${o.precision} isampler2D;
	precision ${o.precision} isampler3D;
	precision ${o.precision} isamplerCube;
	precision ${o.precision} isampler2DArray;
	precision ${o.precision} usampler2D;
	precision ${o.precision} usampler3D;
	precision ${o.precision} usamplerCube;
	precision ${o.precision} usampler2DArray;
	`;return o.precision==="highp"?t+=`
#define HIGH_PRECISION`:o.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:o.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Km(o){let t="SHADOWMAP_TYPE_BASIC";return o.shadowMapType===ll?t="SHADOWMAP_TYPE_PCF":o.shadowMapType===hl?t="SHADOWMAP_TYPE_PCF_SOFT":o.shadowMapType===Dn&&(t="SHADOWMAP_TYPE_VSM"),t}function jm(o){let t="ENVMAP_TYPE_CUBE";if(o.envMap)switch(o.envMapMode){case Wi:case Xi:t="ENVMAP_TYPE_CUBE";break;case xo:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Zm(o){let t="ENVMAP_MODE_REFLECTION";if(o.envMap)switch(o.envMapMode){case Xi:t="ENVMAP_MODE_REFRACTION";break}return t}function Jm(o){let t="ENVMAP_BLENDING_NONE";if(o.envMap)switch(o.combine){case ua:t="ENVMAP_BLENDING_MULTIPLY";break;case kh:t="ENVMAP_BLENDING_MIX";break;case Uh:t="ENVMAP_BLENDING_ADD";break}return t}function Qm(o){const t=o.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function t0(o,t,e,n){const i=o.getContext(),s=e.defines;let r=e.vertexShader,a=e.fragmentShader;const c=Km(e),l=jm(e),h=Zm(e),d=Jm(e),u=Qm(e),f=Hm(e),g=Gm(s),v=i.createProgram();let p,m,w=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ps).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ps).join(`
`),m.length>0&&(m+=`
`)):(p=[Kc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ps).join(`
`),m=[Kc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Yn?"#define TONE_MAPPING":"",e.toneMapping!==Yn?Ht.tonemapping_pars_fragment:"",e.toneMapping!==Yn?Om("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ht.colorspace_pars_fragment,Fm("linearToOutputTexel",e.outputColorSpace),zm(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ps).join(`
`)),r=sa(r),r=qc(r,e),r=$c(r,e),a=sa(a),a=qc(a,e),a=$c(a,e),r=Yc(r),a=Yc(a),e.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",e.glslVersion===$a?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===$a?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const b=w+p+r,x=w+m+a,I=Vc(i,i.VERTEX_SHADER,b),E=Vc(i,i.FRAGMENT_SHADER,x);i.attachShader(v,I),i.attachShader(v,E),e.index0AttributeName!==void 0?i.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(v,0,"position"),i.linkProgram(v);function A(P){if(o.debug.checkShaderErrors){const U=i.getProgramInfoLog(v).trim(),L=i.getShaderInfoLog(I).trim(),z=i.getShaderInfoLog(E).trim();let V=!0,B=!0;if(i.getProgramParameter(v,i.LINK_STATUS)===!1)if(V=!1,typeof o.debug.onShaderError=="function")o.debug.onShaderError(i,v,I,E);else{const q=Xc(i,I,"vertex"),H=Xc(i,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(v,i.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+U+`
`+q+`
`+H)}else U!==""?console.warn("THREE.WebGLProgram: Program Info Log:",U):(L===""||z==="")&&(B=!1);B&&(P.diagnostics={runnable:V,programLog:U,vertexShader:{log:L,prefix:p},fragmentShader:{log:z,prefix:m}})}i.deleteShader(I),i.deleteShader(E),R=new ro(i,v),y=Vm(i,v)}let R;this.getUniforms=function(){return R===void 0&&A(this),R};let y;this.getAttributes=function(){return y===void 0&&A(this),y};let _=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return _===!1&&(_=i.getProgramParameter(v,km)),_},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Um++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=I,this.fragmentShader=E,this}let e0=0;class n0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),s=this._getShaderStage(n),r=this._getShaderCacheForMaterial(t);return r.has(i)===!1&&(r.add(i),i.usedTimes++),r.has(s)===!1&&(r.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new i0(t),e.set(t,n)),n}}class i0{constructor(t){this.id=e0++,this.code=t,this.usedTimes=0}}function s0(o,t,e,n,i,s,r){const a=new Ma,c=new n0,l=new Set,h=[],d=i.logarithmicDepthBuffer,u=i.vertexTextures;let f=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(y){return l.add(y),y===0?"uv":`uv${y}`}function p(y,_,P,U,L){const z=U.fog,V=L.geometry,B=y.isMeshStandardMaterial?U.environment:null,q=(y.isMeshStandardMaterial?e:t).get(y.envMap||B),H=q&&q.mapping===xo?q.image.height:null,nt=g[y.type];y.precision!==null&&(f=i.getMaxPrecision(y.precision),f!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",f,"instead."));const st=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,at=st!==void 0?st.length:0;let bt=0;V.morphAttributes.position!==void 0&&(bt=1),V.morphAttributes.normal!==void 0&&(bt=2),V.morphAttributes.color!==void 0&&(bt=3);let Zt,K,ot,wt;if(nt){const ae=xn[nt];Zt=ae.vertexShader,K=ae.fragmentShader}else Zt=y.vertexShader,K=y.fragmentShader,c.update(y),ot=c.getVertexShaderID(y),wt=c.getFragmentShaderID(y);const dt=o.getRenderTarget(),Rt=o.state.buffers.depth.getReversed(),te=L.isInstancedMesh===!0,Lt=L.isBatchedMesh===!0,ye=!!y.map,ge=!!y.matcap,Wt=!!q,k=!!y.aoMap,tn=!!y.lightMap,Xt=!!y.bumpMap,qt=!!y.normalMap,Tt=!!y.displacementMap,pe=!!y.emissiveMap,St=!!y.metalnessMap,C=!!y.roughnessMap,M=y.anisotropy>0,G=y.clearcoat>0,j=y.dispersion>0,tt=y.iridescence>0,Y=y.sheen>0,Mt=y.transmission>0,ut=M&&!!y.anisotropyMap,vt=G&&!!y.clearcoatMap,Kt=G&&!!y.clearcoatNormalMap,it=G&&!!y.clearcoatRoughnessMap,_t=tt&&!!y.iridescenceMap,It=tt&&!!y.iridescenceThicknessMap,kt=Y&&!!y.sheenColorMap,yt=Y&&!!y.sheenRoughnessMap,$t=!!y.specularMap,zt=!!y.specularColorMap,fe=!!y.specularIntensityMap,N=Mt&&!!y.transmissionMap,lt=Mt&&!!y.thicknessMap,$=!!y.gradientMap,Z=!!y.alphaMap,pt=y.alphaTest>0,ft=!!y.alphaHash,Ft=!!y.extensions;let ve=Yn;y.toneMapped&&(dt===null||dt.isXRRenderTarget===!0)&&(ve=o.toneMapping);const Ne={shaderID:nt,shaderType:y.type,shaderName:y.name,vertexShader:Zt,fragmentShader:K,defines:y.defines,customVertexShaderID:ot,customFragmentShaderID:wt,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:f,batching:Lt,batchingColor:Lt&&L._colorsTexture!==null,instancing:te,instancingColor:te&&L.instanceColor!==null,instancingMorph:te&&L.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:dt===null?o.outputColorSpace:dt.isXRRenderTarget===!0?dt.texture.colorSpace:Yi,alphaToCoverage:!!y.alphaToCoverage,map:ye,matcap:ge,envMap:Wt,envMapMode:Wt&&q.mapping,envMapCubeUVHeight:H,aoMap:k,lightMap:tn,bumpMap:Xt,normalMap:qt,displacementMap:u&&Tt,emissiveMap:pe,normalMapObjectSpace:qt&&y.normalMapType===Xh,normalMapTangentSpace:qt&&y.normalMapType===xa,metalnessMap:St,roughnessMap:C,anisotropy:M,anisotropyMap:ut,clearcoat:G,clearcoatMap:vt,clearcoatNormalMap:Kt,clearcoatRoughnessMap:it,dispersion:j,iridescence:tt,iridescenceMap:_t,iridescenceThicknessMap:It,sheen:Y,sheenColorMap:kt,sheenRoughnessMap:yt,specularMap:$t,specularColorMap:zt,specularIntensityMap:fe,transmission:Mt,transmissionMap:N,thicknessMap:lt,gradientMap:$,opaque:y.transparent===!1&&y.blending===Oi&&y.alphaToCoverage===!1,alphaMap:Z,alphaTest:pt,alphaHash:ft,combine:y.combine,mapUv:ye&&v(y.map.channel),aoMapUv:k&&v(y.aoMap.channel),lightMapUv:tn&&v(y.lightMap.channel),bumpMapUv:Xt&&v(y.bumpMap.channel),normalMapUv:qt&&v(y.normalMap.channel),displacementMapUv:Tt&&v(y.displacementMap.channel),emissiveMapUv:pe&&v(y.emissiveMap.channel),metalnessMapUv:St&&v(y.metalnessMap.channel),roughnessMapUv:C&&v(y.roughnessMap.channel),anisotropyMapUv:ut&&v(y.anisotropyMap.channel),clearcoatMapUv:vt&&v(y.clearcoatMap.channel),clearcoatNormalMapUv:Kt&&v(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:it&&v(y.clearcoatRoughnessMap.channel),iridescenceMapUv:_t&&v(y.iridescenceMap.channel),iridescenceThicknessMapUv:It&&v(y.iridescenceThicknessMap.channel),sheenColorMapUv:kt&&v(y.sheenColorMap.channel),sheenRoughnessMapUv:yt&&v(y.sheenRoughnessMap.channel),specularMapUv:$t&&v(y.specularMap.channel),specularColorMapUv:zt&&v(y.specularColorMap.channel),specularIntensityMapUv:fe&&v(y.specularIntensityMap.channel),transmissionMapUv:N&&v(y.transmissionMap.channel),thicknessMapUv:lt&&v(y.thicknessMap.channel),alphaMapUv:Z&&v(y.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(qt||M),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!V.attributes.uv&&(ye||Z),fog:!!z,useFog:y.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:Rt,skinning:L.isSkinnedMesh===!0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:at,morphTextureStride:bt,numDirLights:_.directional.length,numPointLights:_.point.length,numSpotLights:_.spot.length,numSpotLightMaps:_.spotLightMap.length,numRectAreaLights:_.rectArea.length,numHemiLights:_.hemi.length,numDirLightShadows:_.directionalShadowMap.length,numPointLightShadows:_.pointShadowMap.length,numSpotLightShadows:_.spotShadowMap.length,numSpotLightShadowsWithMaps:_.numSpotLightShadowsWithMaps,numLightProbes:_.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:y.dithering,shadowMapEnabled:o.shadowMap.enabled&&P.length>0,shadowMapType:o.shadowMap.type,toneMapping:ve,decodeVideoTexture:ye&&y.map.isVideoTexture===!0&&Qt.getTransfer(y.map.colorSpace)===ce,decodeVideoTextureEmissive:pe&&y.emissiveMap.isVideoTexture===!0&&Qt.getTransfer(y.emissiveMap.colorSpace)===ce,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===de,flipSided:y.side===Xe,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Ft&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ft&&y.extensions.multiDraw===!0||Lt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Ne.vertexUv1s=l.has(1),Ne.vertexUv2s=l.has(2),Ne.vertexUv3s=l.has(3),l.clear(),Ne}function m(y){const _=[];if(y.shaderID?_.push(y.shaderID):(_.push(y.customVertexShaderID),_.push(y.customFragmentShaderID)),y.defines!==void 0)for(const P in y.defines)_.push(P),_.push(y.defines[P]);return y.isRawShaderMaterial===!1&&(w(_,y),b(_,y),_.push(o.outputColorSpace)),_.push(y.customProgramCacheKey),_.join()}function w(y,_){y.push(_.precision),y.push(_.outputColorSpace),y.push(_.envMapMode),y.push(_.envMapCubeUVHeight),y.push(_.mapUv),y.push(_.alphaMapUv),y.push(_.lightMapUv),y.push(_.aoMapUv),y.push(_.bumpMapUv),y.push(_.normalMapUv),y.push(_.displacementMapUv),y.push(_.emissiveMapUv),y.push(_.metalnessMapUv),y.push(_.roughnessMapUv),y.push(_.anisotropyMapUv),y.push(_.clearcoatMapUv),y.push(_.clearcoatNormalMapUv),y.push(_.clearcoatRoughnessMapUv),y.push(_.iridescenceMapUv),y.push(_.iridescenceThicknessMapUv),y.push(_.sheenColorMapUv),y.push(_.sheenRoughnessMapUv),y.push(_.specularMapUv),y.push(_.specularColorMapUv),y.push(_.specularIntensityMapUv),y.push(_.transmissionMapUv),y.push(_.thicknessMapUv),y.push(_.combine),y.push(_.fogExp2),y.push(_.sizeAttenuation),y.push(_.morphTargetsCount),y.push(_.morphAttributeCount),y.push(_.numDirLights),y.push(_.numPointLights),y.push(_.numSpotLights),y.push(_.numSpotLightMaps),y.push(_.numHemiLights),y.push(_.numRectAreaLights),y.push(_.numDirLightShadows),y.push(_.numPointLightShadows),y.push(_.numSpotLightShadows),y.push(_.numSpotLightShadowsWithMaps),y.push(_.numLightProbes),y.push(_.shadowMapType),y.push(_.toneMapping),y.push(_.numClippingPlanes),y.push(_.numClipIntersection),y.push(_.depthPacking)}function b(y,_){a.disableAll(),_.supportsVertexTextures&&a.enable(0),_.instancing&&a.enable(1),_.instancingColor&&a.enable(2),_.instancingMorph&&a.enable(3),_.matcap&&a.enable(4),_.envMap&&a.enable(5),_.normalMapObjectSpace&&a.enable(6),_.normalMapTangentSpace&&a.enable(7),_.clearcoat&&a.enable(8),_.iridescence&&a.enable(9),_.alphaTest&&a.enable(10),_.vertexColors&&a.enable(11),_.vertexAlphas&&a.enable(12),_.vertexUv1s&&a.enable(13),_.vertexUv2s&&a.enable(14),_.vertexUv3s&&a.enable(15),_.vertexTangents&&a.enable(16),_.anisotropy&&a.enable(17),_.alphaHash&&a.enable(18),_.batching&&a.enable(19),_.dispersion&&a.enable(20),_.batchingColor&&a.enable(21),y.push(a.mask),a.disableAll(),_.fog&&a.enable(0),_.useFog&&a.enable(1),_.flatShading&&a.enable(2),_.logarithmicDepthBuffer&&a.enable(3),_.reverseDepthBuffer&&a.enable(4),_.skinning&&a.enable(5),_.morphTargets&&a.enable(6),_.morphNormals&&a.enable(7),_.morphColors&&a.enable(8),_.premultipliedAlpha&&a.enable(9),_.shadowMapEnabled&&a.enable(10),_.doubleSided&&a.enable(11),_.flipSided&&a.enable(12),_.useDepthPacking&&a.enable(13),_.dithering&&a.enable(14),_.transmission&&a.enable(15),_.sheen&&a.enable(16),_.opaque&&a.enable(17),_.pointsUvs&&a.enable(18),_.decodeVideoTexture&&a.enable(19),_.decodeVideoTextureEmissive&&a.enable(20),_.alphaToCoverage&&a.enable(21),y.push(a.mask)}function x(y){const _=g[y.type];let P;if(_){const U=xn[_];P=Md.clone(U.uniforms)}else P=y.uniforms;return P}function I(y,_){let P;for(let U=0,L=h.length;U<L;U++){const z=h[U];if(z.cacheKey===_){P=z,++P.usedTimes;break}}return P===void 0&&(P=new t0(o,_,y,s),h.push(P)),P}function E(y){if(--y.usedTimes===0){const _=h.indexOf(y);h[_]=h[h.length-1],h.pop(),y.destroy()}}function A(y){c.remove(y)}function R(){c.dispose()}return{getParameters:p,getProgramCacheKey:m,getUniforms:x,acquireProgram:I,releaseProgram:E,releaseShaderCache:A,programs:h,dispose:R}}function o0(){let o=new WeakMap;function t(r){return o.has(r)}function e(r){let a=o.get(r);return a===void 0&&(a={},o.set(r,a)),a}function n(r){o.delete(r)}function i(r,a,c){o.get(r)[a]=c}function s(){o=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:s}}function r0(o,t){return o.groupOrder!==t.groupOrder?o.groupOrder-t.groupOrder:o.renderOrder!==t.renderOrder?o.renderOrder-t.renderOrder:o.material.id!==t.material.id?o.material.id-t.material.id:o.z!==t.z?o.z-t.z:o.id-t.id}function jc(o,t){return o.groupOrder!==t.groupOrder?o.groupOrder-t.groupOrder:o.renderOrder!==t.renderOrder?o.renderOrder-t.renderOrder:o.z!==t.z?t.z-o.z:o.id-t.id}function Zc(){const o=[];let t=0;const e=[],n=[],i=[];function s(){t=0,e.length=0,n.length=0,i.length=0}function r(d,u,f,g,v,p){let m=o[t];return m===void 0?(m={id:d.id,object:d,geometry:u,material:f,groupOrder:g,renderOrder:d.renderOrder,z:v,group:p},o[t]=m):(m.id=d.id,m.object=d,m.geometry=u,m.material=f,m.groupOrder=g,m.renderOrder=d.renderOrder,m.z=v,m.group=p),t++,m}function a(d,u,f,g,v,p){const m=r(d,u,f,g,v,p);f.transmission>0?n.push(m):f.transparent===!0?i.push(m):e.push(m)}function c(d,u,f,g,v,p){const m=r(d,u,f,g,v,p);f.transmission>0?n.unshift(m):f.transparent===!0?i.unshift(m):e.unshift(m)}function l(d,u){e.length>1&&e.sort(d||r0),n.length>1&&n.sort(u||jc),i.length>1&&i.sort(u||jc)}function h(){for(let d=t,u=o.length;d<u;d++){const f=o[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:i,init:s,push:a,unshift:c,finish:h,sort:l}}function a0(){let o=new WeakMap;function t(n,i){const s=o.get(n);let r;return s===void 0?(r=new Zc,o.set(n,[r])):i>=s.length?(r=new Zc,s.push(r)):r=s[i],r}function e(){o=new WeakMap}return{get:t,dispose:e}}function c0(){const o={};return{get:function(t){if(o[t.id]!==void 0)return o[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new D,color:new rt};break;case"SpotLight":e={position:new D,direction:new D,color:new rt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new D,color:new rt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new D,skyColor:new rt,groundColor:new rt};break;case"RectAreaLight":e={color:new rt,position:new D,halfWidth:new D,halfHeight:new D};break}return o[t.id]=e,e}}}function l0(){const o={};return{get:function(t){if(o[t.id]!==void 0)return o[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt,shadowCameraNear:1,shadowCameraFar:1e3};break}return o[t.id]=e,e}}}let h0=0;function d0(o,t){return(t.castShadow?2:0)-(o.castShadow?2:0)+(t.map?1:0)-(o.map?1:0)}function u0(o){const t=new c0,e=l0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new D);const i=new D,s=new re,r=new re;function a(l){let h=0,d=0,u=0;for(let y=0;y<9;y++)n.probe[y].set(0,0,0);let f=0,g=0,v=0,p=0,m=0,w=0,b=0,x=0,I=0,E=0,A=0;l.sort(d0);for(let y=0,_=l.length;y<_;y++){const P=l[y],U=P.color,L=P.intensity,z=P.distance,V=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)h+=U.r*L,d+=U.g*L,u+=U.b*L;else if(P.isLightProbe){for(let B=0;B<9;B++)n.probe[B].addScaledVector(P.sh.coefficients[B],L);A++}else if(P.isDirectionalLight){const B=t.get(P);if(B.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const q=P.shadow,H=e.get(P);H.shadowIntensity=q.intensity,H.shadowBias=q.bias,H.shadowNormalBias=q.normalBias,H.shadowRadius=q.radius,H.shadowMapSize=q.mapSize,n.directionalShadow[f]=H,n.directionalShadowMap[f]=V,n.directionalShadowMatrix[f]=P.shadow.matrix,w++}n.directional[f]=B,f++}else if(P.isSpotLight){const B=t.get(P);B.position.setFromMatrixPosition(P.matrixWorld),B.color.copy(U).multiplyScalar(L),B.distance=z,B.coneCos=Math.cos(P.angle),B.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),B.decay=P.decay,n.spot[v]=B;const q=P.shadow;if(P.map&&(n.spotLightMap[I]=P.map,I++,q.updateMatrices(P),P.castShadow&&E++),n.spotLightMatrix[v]=q.matrix,P.castShadow){const H=e.get(P);H.shadowIntensity=q.intensity,H.shadowBias=q.bias,H.shadowNormalBias=q.normalBias,H.shadowRadius=q.radius,H.shadowMapSize=q.mapSize,n.spotShadow[v]=H,n.spotShadowMap[v]=V,x++}v++}else if(P.isRectAreaLight){const B=t.get(P);B.color.copy(U).multiplyScalar(L),B.halfWidth.set(P.width*.5,0,0),B.halfHeight.set(0,P.height*.5,0),n.rectArea[p]=B,p++}else if(P.isPointLight){const B=t.get(P);if(B.color.copy(P.color).multiplyScalar(P.intensity),B.distance=P.distance,B.decay=P.decay,P.castShadow){const q=P.shadow,H=e.get(P);H.shadowIntensity=q.intensity,H.shadowBias=q.bias,H.shadowNormalBias=q.normalBias,H.shadowRadius=q.radius,H.shadowMapSize=q.mapSize,H.shadowCameraNear=q.camera.near,H.shadowCameraFar=q.camera.far,n.pointShadow[g]=H,n.pointShadowMap[g]=V,n.pointShadowMatrix[g]=P.shadow.matrix,b++}n.point[g]=B,g++}else if(P.isHemisphereLight){const B=t.get(P);B.skyColor.copy(P.color).multiplyScalar(L),B.groundColor.copy(P.groundColor).multiplyScalar(L),n.hemi[m]=B,m++}}p>0&&(o.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ct.LTC_FLOAT_1,n.rectAreaLTC2=ct.LTC_FLOAT_2):(n.rectAreaLTC1=ct.LTC_HALF_1,n.rectAreaLTC2=ct.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;const R=n.hash;(R.directionalLength!==f||R.pointLength!==g||R.spotLength!==v||R.rectAreaLength!==p||R.hemiLength!==m||R.numDirectionalShadows!==w||R.numPointShadows!==b||R.numSpotShadows!==x||R.numSpotMaps!==I||R.numLightProbes!==A)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=p,n.point.length=g,n.hemi.length=m,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=w,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=x+I-E,n.spotLightMap.length=I,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=A,R.directionalLength=f,R.pointLength=g,R.spotLength=v,R.rectAreaLength=p,R.hemiLength=m,R.numDirectionalShadows=w,R.numPointShadows=b,R.numSpotShadows=x,R.numSpotMaps=I,R.numLightProbes=A,n.version=h0++)}function c(l,h){let d=0,u=0,f=0,g=0,v=0;const p=h.matrixWorldInverse;for(let m=0,w=l.length;m<w;m++){const b=l[m];if(b.isDirectionalLight){const x=n.directional[d];x.direction.setFromMatrixPosition(b.matrixWorld),i.setFromMatrixPosition(b.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(p),d++}else if(b.isSpotLight){const x=n.spot[f];x.position.setFromMatrixPosition(b.matrixWorld),x.position.applyMatrix4(p),x.direction.setFromMatrixPosition(b.matrixWorld),i.setFromMatrixPosition(b.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(p),f++}else if(b.isRectAreaLight){const x=n.rectArea[g];x.position.setFromMatrixPosition(b.matrixWorld),x.position.applyMatrix4(p),r.identity(),s.copy(b.matrixWorld),s.premultiply(p),r.extractRotation(s),x.halfWidth.set(b.width*.5,0,0),x.halfHeight.set(0,b.height*.5,0),x.halfWidth.applyMatrix4(r),x.halfHeight.applyMatrix4(r),g++}else if(b.isPointLight){const x=n.point[u];x.position.setFromMatrixPosition(b.matrixWorld),x.position.applyMatrix4(p),u++}else if(b.isHemisphereLight){const x=n.hemi[v];x.direction.setFromMatrixPosition(b.matrixWorld),x.direction.transformDirection(p),v++}}}return{setup:a,setupView:c,state:n}}function Jc(o){const t=new u0(o),e=[],n=[];function i(h){l.camera=h,e.length=0,n.length=0}function s(h){e.push(h)}function r(h){n.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:a,setupLightsView:c,pushLight:s,pushShadow:r}}function f0(o){let t=new WeakMap;function e(i,s=0){const r=t.get(i);let a;return r===void 0?(a=new Jc(o),t.set(i,[a])):s>=r.length?(a=new Jc(o),r.push(a)):a=r[s],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const p0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,m0=`uniform sampler2D shadow_pass;
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
}`;function g0(o,t,e){let n=new Sa;const i=new Dt,s=new Dt,r=new he,a=new Nd({depthPacking:Wh}),c=new Bd,l={},h=e.maxTextureSize,d={[jn]:Xe,[Xe]:jn,[de]:de},u=new En({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Dt},radius:{value:4}},vertexShader:p0,fragmentShader:m0}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const g=new we;g.setAttribute("position",new Pe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new T(g,u),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ll;let m=this.type;this.render=function(E,A,R){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||E.length===0)return;const y=o.getRenderTarget(),_=o.getActiveCubeFace(),P=o.getActiveMipmapLevel(),U=o.state;U.setBlending($n),U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const L=m!==Dn&&this.type===Dn,z=m===Dn&&this.type!==Dn;for(let V=0,B=E.length;V<B;V++){const q=E[V],H=q.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",q,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;i.copy(H.mapSize);const nt=H.getFrameExtents();if(i.multiply(nt),s.copy(H.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/nt.x),i.x=s.x*nt.x,H.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/nt.y),i.y=s.y*nt.y,H.mapSize.y=s.y)),H.map===null||L===!0||z===!0){const at=this.type!==Dn?{minFilter:Qe,magFilter:Qe}:{};H.map!==null&&H.map.dispose(),H.map=new ui(i.x,i.y,at),H.map.texture.name=q.name+".shadowMap",H.camera.updateProjectionMatrix()}o.setRenderTarget(H.map),o.clear();const st=H.getViewportCount();for(let at=0;at<st;at++){const bt=H.getViewport(at);r.set(s.x*bt.x,s.y*bt.y,s.x*bt.z,s.y*bt.w),U.viewport(r),H.updateMatrices(q,at),n=H.getFrustum(),x(A,R,H.camera,q,this.type)}H.isPointLightShadow!==!0&&this.type===Dn&&w(H,R),H.needsUpdate=!1}m=this.type,p.needsUpdate=!1,o.setRenderTarget(y,_,P)};function w(E,A){const R=t.update(v);u.defines.VSM_SAMPLES!==E.blurSamples&&(u.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new ui(i.x,i.y)),u.uniforms.shadow_pass.value=E.map.texture,u.uniforms.resolution.value=E.mapSize,u.uniforms.radius.value=E.radius,o.setRenderTarget(E.mapPass),o.clear(),o.renderBufferDirect(A,null,R,u,v,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,o.setRenderTarget(E.map),o.clear(),o.renderBufferDirect(A,null,R,f,v,null)}function b(E,A,R,y){let _=null;const P=R.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(P!==void 0)_=P;else if(_=R.isPointLight===!0?c:a,o.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const U=_.uuid,L=A.uuid;let z=l[U];z===void 0&&(z={},l[U]=z);let V=z[L];V===void 0&&(V=_.clone(),z[L]=V,A.addEventListener("dispose",I)),_=V}if(_.visible=A.visible,_.wireframe=A.wireframe,y===Dn?_.side=A.shadowSide!==null?A.shadowSide:A.side:_.side=A.shadowSide!==null?A.shadowSide:d[A.side],_.alphaMap=A.alphaMap,_.alphaTest=A.alphaTest,_.map=A.map,_.clipShadows=A.clipShadows,_.clippingPlanes=A.clippingPlanes,_.clipIntersection=A.clipIntersection,_.displacementMap=A.displacementMap,_.displacementScale=A.displacementScale,_.displacementBias=A.displacementBias,_.wireframeLinewidth=A.wireframeLinewidth,_.linewidth=A.linewidth,R.isPointLight===!0&&_.isMeshDistanceMaterial===!0){const U=o.properties.get(_);U.light=R}return _}function x(E,A,R,y,_){if(E.visible===!1)return;if(E.layers.test(A.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&_===Dn)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,E.matrixWorld);const L=t.update(E),z=E.material;if(Array.isArray(z)){const V=L.groups;for(let B=0,q=V.length;B<q;B++){const H=V[B],nt=z[H.materialIndex];if(nt&&nt.visible){const st=b(E,nt,y,_);E.onBeforeShadow(o,E,A,R,L,st,H),o.renderBufferDirect(R,null,L,st,E,H),E.onAfterShadow(o,E,A,R,L,st,H)}}}else if(z.visible){const V=b(E,z,y,_);E.onBeforeShadow(o,E,A,R,L,V,null),o.renderBufferDirect(R,null,L,V,E,null),E.onAfterShadow(o,E,A,R,L,V,null)}}const U=E.children;for(let L=0,z=U.length;L<z;L++)x(U[L],A,R,y,_)}function I(E){E.target.removeEventListener("dispose",I);for(const R in l){const y=l[R],_=E.target.uuid;_ in y&&(y[_].dispose(),delete y[_])}}}const v0={[_r]:yr,[xr]:br,[wr]:Sr,[Vi]:Mr,[yr]:_r,[br]:xr,[Sr]:wr,[Mr]:Vi};function _0(o,t){function e(){let N=!1;const lt=new he;let $=null;const Z=new he(0,0,0,0);return{setMask:function(pt){$!==pt&&!N&&(o.colorMask(pt,pt,pt,pt),$=pt)},setLocked:function(pt){N=pt},setClear:function(pt,ft,Ft,ve,Ne){Ne===!0&&(pt*=ve,ft*=ve,Ft*=ve),lt.set(pt,ft,Ft,ve),Z.equals(lt)===!1&&(o.clearColor(pt,ft,Ft,ve),Z.copy(lt))},reset:function(){N=!1,$=null,Z.set(-1,0,0,0)}}}function n(){let N=!1,lt=!1,$=null,Z=null,pt=null;return{setReversed:function(ft){if(lt!==ft){const Ft=t.get("EXT_clip_control");lt?Ft.clipControlEXT(Ft.LOWER_LEFT_EXT,Ft.ZERO_TO_ONE_EXT):Ft.clipControlEXT(Ft.LOWER_LEFT_EXT,Ft.NEGATIVE_ONE_TO_ONE_EXT);const ve=pt;pt=null,this.setClear(ve)}lt=ft},getReversed:function(){return lt},setTest:function(ft){ft?dt(o.DEPTH_TEST):Rt(o.DEPTH_TEST)},setMask:function(ft){$!==ft&&!N&&(o.depthMask(ft),$=ft)},setFunc:function(ft){if(lt&&(ft=v0[ft]),Z!==ft){switch(ft){case _r:o.depthFunc(o.NEVER);break;case yr:o.depthFunc(o.ALWAYS);break;case xr:o.depthFunc(o.LESS);break;case Vi:o.depthFunc(o.LEQUAL);break;case wr:o.depthFunc(o.EQUAL);break;case Mr:o.depthFunc(o.GEQUAL);break;case br:o.depthFunc(o.GREATER);break;case Sr:o.depthFunc(o.NOTEQUAL);break;default:o.depthFunc(o.LEQUAL)}Z=ft}},setLocked:function(ft){N=ft},setClear:function(ft){pt!==ft&&(lt&&(ft=1-ft),o.clearDepth(ft),pt=ft)},reset:function(){N=!1,$=null,Z=null,pt=null,lt=!1}}}function i(){let N=!1,lt=null,$=null,Z=null,pt=null,ft=null,Ft=null,ve=null,Ne=null;return{setTest:function(ae){N||(ae?dt(o.STENCIL_TEST):Rt(o.STENCIL_TEST))},setMask:function(ae){lt!==ae&&!N&&(o.stencilMask(ae),lt=ae)},setFunc:function(ae,dn,An){($!==ae||Z!==dn||pt!==An)&&(o.stencilFunc(ae,dn,An),$=ae,Z=dn,pt=An)},setOp:function(ae,dn,An){(ft!==ae||Ft!==dn||ve!==An)&&(o.stencilOp(ae,dn,An),ft=ae,Ft=dn,ve=An)},setLocked:function(ae){N=ae},setClear:function(ae){Ne!==ae&&(o.clearStencil(ae),Ne=ae)},reset:function(){N=!1,lt=null,$=null,Z=null,pt=null,ft=null,Ft=null,ve=null,Ne=null}}}const s=new e,r=new n,a=new i,c=new WeakMap,l=new WeakMap;let h={},d={},u=new WeakMap,f=[],g=null,v=!1,p=null,m=null,w=null,b=null,x=null,I=null,E=null,A=new rt(0,0,0),R=0,y=!1,_=null,P=null,U=null,L=null,z=null;const V=o.getParameter(o.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let B=!1,q=0;const H=o.getParameter(o.VERSION);H.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec(H)[1]),B=q>=1):H.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),B=q>=2);let nt=null,st={};const at=o.getParameter(o.SCISSOR_BOX),bt=o.getParameter(o.VIEWPORT),Zt=new he().fromArray(at),K=new he().fromArray(bt);function ot(N,lt,$,Z){const pt=new Uint8Array(4),ft=o.createTexture();o.bindTexture(N,ft),o.texParameteri(N,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(N,o.TEXTURE_MAG_FILTER,o.NEAREST);for(let Ft=0;Ft<$;Ft++)N===o.TEXTURE_3D||N===o.TEXTURE_2D_ARRAY?o.texImage3D(lt,0,o.RGBA,1,1,Z,0,o.RGBA,o.UNSIGNED_BYTE,pt):o.texImage2D(lt+Ft,0,o.RGBA,1,1,0,o.RGBA,o.UNSIGNED_BYTE,pt);return ft}const wt={};wt[o.TEXTURE_2D]=ot(o.TEXTURE_2D,o.TEXTURE_2D,1),wt[o.TEXTURE_CUBE_MAP]=ot(o.TEXTURE_CUBE_MAP,o.TEXTURE_CUBE_MAP_POSITIVE_X,6),wt[o.TEXTURE_2D_ARRAY]=ot(o.TEXTURE_2D_ARRAY,o.TEXTURE_2D_ARRAY,1,1),wt[o.TEXTURE_3D]=ot(o.TEXTURE_3D,o.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),a.setClear(0),dt(o.DEPTH_TEST),r.setFunc(Vi),Xt(!1),qt(Va),dt(o.CULL_FACE),k($n);function dt(N){h[N]!==!0&&(o.enable(N),h[N]=!0)}function Rt(N){h[N]!==!1&&(o.disable(N),h[N]=!1)}function te(N,lt){return d[N]!==lt?(o.bindFramebuffer(N,lt),d[N]=lt,N===o.DRAW_FRAMEBUFFER&&(d[o.FRAMEBUFFER]=lt),N===o.FRAMEBUFFER&&(d[o.DRAW_FRAMEBUFFER]=lt),!0):!1}function Lt(N,lt){let $=f,Z=!1;if(N){$=u.get(lt),$===void 0&&($=[],u.set(lt,$));const pt=N.textures;if($.length!==pt.length||$[0]!==o.COLOR_ATTACHMENT0){for(let ft=0,Ft=pt.length;ft<Ft;ft++)$[ft]=o.COLOR_ATTACHMENT0+ft;$.length=pt.length,Z=!0}}else $[0]!==o.BACK&&($[0]=o.BACK,Z=!0);Z&&o.drawBuffers($)}function ye(N){return g!==N?(o.useProgram(N),g=N,!0):!1}const ge={[ai]:o.FUNC_ADD,[vh]:o.FUNC_SUBTRACT,[_h]:o.FUNC_REVERSE_SUBTRACT};ge[yh]=o.MIN,ge[xh]=o.MAX;const Wt={[wh]:o.ZERO,[Mh]:o.ONE,[bh]:o.SRC_COLOR,[gr]:o.SRC_ALPHA,[Rh]:o.SRC_ALPHA_SATURATE,[Ah]:o.DST_COLOR,[Eh]:o.DST_ALPHA,[Sh]:o.ONE_MINUS_SRC_COLOR,[vr]:o.ONE_MINUS_SRC_ALPHA,[Ch]:o.ONE_MINUS_DST_COLOR,[Th]:o.ONE_MINUS_DST_ALPHA,[Ih]:o.CONSTANT_COLOR,[Ph]:o.ONE_MINUS_CONSTANT_COLOR,[Lh]:o.CONSTANT_ALPHA,[Dh]:o.ONE_MINUS_CONSTANT_ALPHA};function k(N,lt,$,Z,pt,ft,Ft,ve,Ne,ae){if(N===$n){v===!0&&(Rt(o.BLEND),v=!1);return}if(v===!1&&(dt(o.BLEND),v=!0),N!==gh){if(N!==p||ae!==y){if((m!==ai||x!==ai)&&(o.blendEquation(o.FUNC_ADD),m=ai,x=ai),ae)switch(N){case Oi:o.blendFuncSeparate(o.ONE,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case Gi:o.blendFunc(o.ONE,o.ONE);break;case Wa:o.blendFuncSeparate(o.ZERO,o.ONE_MINUS_SRC_COLOR,o.ZERO,o.ONE);break;case Xa:o.blendFuncSeparate(o.ZERO,o.SRC_COLOR,o.ZERO,o.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case Oi:o.blendFuncSeparate(o.SRC_ALPHA,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case Gi:o.blendFunc(o.SRC_ALPHA,o.ONE);break;case Wa:o.blendFuncSeparate(o.ZERO,o.ONE_MINUS_SRC_COLOR,o.ZERO,o.ONE);break;case Xa:o.blendFunc(o.ZERO,o.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}w=null,b=null,I=null,E=null,A.set(0,0,0),R=0,p=N,y=ae}return}pt=pt||lt,ft=ft||$,Ft=Ft||Z,(lt!==m||pt!==x)&&(o.blendEquationSeparate(ge[lt],ge[pt]),m=lt,x=pt),($!==w||Z!==b||ft!==I||Ft!==E)&&(o.blendFuncSeparate(Wt[$],Wt[Z],Wt[ft],Wt[Ft]),w=$,b=Z,I=ft,E=Ft),(ve.equals(A)===!1||Ne!==R)&&(o.blendColor(ve.r,ve.g,ve.b,Ne),A.copy(ve),R=Ne),p=N,y=!1}function tn(N,lt){N.side===de?Rt(o.CULL_FACE):dt(o.CULL_FACE);let $=N.side===Xe;lt&&($=!$),Xt($),N.blending===Oi&&N.transparent===!1?k($n):k(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),r.setFunc(N.depthFunc),r.setTest(N.depthTest),r.setMask(N.depthWrite),s.setMask(N.colorWrite);const Z=N.stencilWrite;a.setTest(Z),Z&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),pe(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?dt(o.SAMPLE_ALPHA_TO_COVERAGE):Rt(o.SAMPLE_ALPHA_TO_COVERAGE)}function Xt(N){_!==N&&(N?o.frontFace(o.CW):o.frontFace(o.CCW),_=N)}function qt(N){N!==ph?(dt(o.CULL_FACE),N!==P&&(N===Va?o.cullFace(o.BACK):N===mh?o.cullFace(o.FRONT):o.cullFace(o.FRONT_AND_BACK))):Rt(o.CULL_FACE),P=N}function Tt(N){N!==U&&(B&&o.lineWidth(N),U=N)}function pe(N,lt,$){N?(dt(o.POLYGON_OFFSET_FILL),(L!==lt||z!==$)&&(o.polygonOffset(lt,$),L=lt,z=$)):Rt(o.POLYGON_OFFSET_FILL)}function St(N){N?dt(o.SCISSOR_TEST):Rt(o.SCISSOR_TEST)}function C(N){N===void 0&&(N=o.TEXTURE0+V-1),nt!==N&&(o.activeTexture(N),nt=N)}function M(N,lt,$){$===void 0&&(nt===null?$=o.TEXTURE0+V-1:$=nt);let Z=st[$];Z===void 0&&(Z={type:void 0,texture:void 0},st[$]=Z),(Z.type!==N||Z.texture!==lt)&&(nt!==$&&(o.activeTexture($),nt=$),o.bindTexture(N,lt||wt[N]),Z.type=N,Z.texture=lt)}function G(){const N=st[nt];N!==void 0&&N.type!==void 0&&(o.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function j(){try{o.compressedTexImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function tt(){try{o.compressedTexImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Y(){try{o.texSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Mt(){try{o.texSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ut(){try{o.compressedTexSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function vt(){try{o.compressedTexSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Kt(){try{o.texStorage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function it(){try{o.texStorage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function _t(){try{o.texImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function It(){try{o.texImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function kt(N){Zt.equals(N)===!1&&(o.scissor(N.x,N.y,N.z,N.w),Zt.copy(N))}function yt(N){K.equals(N)===!1&&(o.viewport(N.x,N.y,N.z,N.w),K.copy(N))}function $t(N,lt){let $=l.get(lt);$===void 0&&($=new WeakMap,l.set(lt,$));let Z=$.get(N);Z===void 0&&(Z=o.getUniformBlockIndex(lt,N.name),$.set(N,Z))}function zt(N,lt){const Z=l.get(lt).get(N);c.get(lt)!==Z&&(o.uniformBlockBinding(lt,Z,N.__bindingPointIndex),c.set(lt,Z))}function fe(){o.disable(o.BLEND),o.disable(o.CULL_FACE),o.disable(o.DEPTH_TEST),o.disable(o.POLYGON_OFFSET_FILL),o.disable(o.SCISSOR_TEST),o.disable(o.STENCIL_TEST),o.disable(o.SAMPLE_ALPHA_TO_COVERAGE),o.blendEquation(o.FUNC_ADD),o.blendFunc(o.ONE,o.ZERO),o.blendFuncSeparate(o.ONE,o.ZERO,o.ONE,o.ZERO),o.blendColor(0,0,0,0),o.colorMask(!0,!0,!0,!0),o.clearColor(0,0,0,0),o.depthMask(!0),o.depthFunc(o.LESS),r.setReversed(!1),o.clearDepth(1),o.stencilMask(4294967295),o.stencilFunc(o.ALWAYS,0,4294967295),o.stencilOp(o.KEEP,o.KEEP,o.KEEP),o.clearStencil(0),o.cullFace(o.BACK),o.frontFace(o.CCW),o.polygonOffset(0,0),o.activeTexture(o.TEXTURE0),o.bindFramebuffer(o.FRAMEBUFFER,null),o.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),o.bindFramebuffer(o.READ_FRAMEBUFFER,null),o.useProgram(null),o.lineWidth(1),o.scissor(0,0,o.canvas.width,o.canvas.height),o.viewport(0,0,o.canvas.width,o.canvas.height),h={},nt=null,st={},d={},u=new WeakMap,f=[],g=null,v=!1,p=null,m=null,w=null,b=null,x=null,I=null,E=null,A=new rt(0,0,0),R=0,y=!1,_=null,P=null,U=null,L=null,z=null,Zt.set(0,0,o.canvas.width,o.canvas.height),K.set(0,0,o.canvas.width,o.canvas.height),s.reset(),r.reset(),a.reset()}return{buffers:{color:s,depth:r,stencil:a},enable:dt,disable:Rt,bindFramebuffer:te,drawBuffers:Lt,useProgram:ye,setBlending:k,setMaterial:tn,setFlipSided:Xt,setCullFace:qt,setLineWidth:Tt,setPolygonOffset:pe,setScissorTest:St,activeTexture:C,bindTexture:M,unbindTexture:G,compressedTexImage2D:j,compressedTexImage3D:tt,texImage2D:_t,texImage3D:It,updateUBOMapping:$t,uniformBlockBinding:zt,texStorage2D:Kt,texStorage3D:it,texSubImage2D:Y,texSubImage3D:Mt,compressedTexSubImage2D:ut,compressedTexSubImage3D:vt,scissor:kt,viewport:yt,reset:fe}}function y0(o,t,e,n,i,s,r){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Dt,h=new WeakMap;let d;const u=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(C,M){return f?new OffscreenCanvas(C,M):mo("canvas")}function v(C,M,G){let j=1;const tt=St(C);if((tt.width>G||tt.height>G)&&(j=G/Math.max(tt.width,tt.height)),j<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const Y=Math.floor(j*tt.width),Mt=Math.floor(j*tt.height);d===void 0&&(d=g(Y,Mt));const ut=M?g(Y,Mt):d;return ut.width=Y,ut.height=Mt,ut.getContext("2d").drawImage(C,0,0,Y,Mt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+tt.width+"x"+tt.height+") to ("+Y+"x"+Mt+")."),ut}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+tt.width+"x"+tt.height+")."),C;return C}function p(C){return C.generateMipmaps}function m(C){o.generateMipmap(C)}function w(C){return C.isWebGLCubeRenderTarget?o.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?o.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?o.TEXTURE_2D_ARRAY:o.TEXTURE_2D}function b(C,M,G,j,tt=!1){if(C!==null){if(o[C]!==void 0)return o[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let Y=M;if(M===o.RED&&(G===o.FLOAT&&(Y=o.R32F),G===o.HALF_FLOAT&&(Y=o.R16F),G===o.UNSIGNED_BYTE&&(Y=o.R8)),M===o.RED_INTEGER&&(G===o.UNSIGNED_BYTE&&(Y=o.R8UI),G===o.UNSIGNED_SHORT&&(Y=o.R16UI),G===o.UNSIGNED_INT&&(Y=o.R32UI),G===o.BYTE&&(Y=o.R8I),G===o.SHORT&&(Y=o.R16I),G===o.INT&&(Y=o.R32I)),M===o.RG&&(G===o.FLOAT&&(Y=o.RG32F),G===o.HALF_FLOAT&&(Y=o.RG16F),G===o.UNSIGNED_BYTE&&(Y=o.RG8)),M===o.RG_INTEGER&&(G===o.UNSIGNED_BYTE&&(Y=o.RG8UI),G===o.UNSIGNED_SHORT&&(Y=o.RG16UI),G===o.UNSIGNED_INT&&(Y=o.RG32UI),G===o.BYTE&&(Y=o.RG8I),G===o.SHORT&&(Y=o.RG16I),G===o.INT&&(Y=o.RG32I)),M===o.RGB_INTEGER&&(G===o.UNSIGNED_BYTE&&(Y=o.RGB8UI),G===o.UNSIGNED_SHORT&&(Y=o.RGB16UI),G===o.UNSIGNED_INT&&(Y=o.RGB32UI),G===o.BYTE&&(Y=o.RGB8I),G===o.SHORT&&(Y=o.RGB16I),G===o.INT&&(Y=o.RGB32I)),M===o.RGBA_INTEGER&&(G===o.UNSIGNED_BYTE&&(Y=o.RGBA8UI),G===o.UNSIGNED_SHORT&&(Y=o.RGBA16UI),G===o.UNSIGNED_INT&&(Y=o.RGBA32UI),G===o.BYTE&&(Y=o.RGBA8I),G===o.SHORT&&(Y=o.RGBA16I),G===o.INT&&(Y=o.RGBA32I)),M===o.RGB&&G===o.UNSIGNED_INT_5_9_9_9_REV&&(Y=o.RGB9_E5),M===o.RGBA){const Mt=tt?fo:Qt.getTransfer(j);G===o.FLOAT&&(Y=o.RGBA32F),G===o.HALF_FLOAT&&(Y=o.RGBA16F),G===o.UNSIGNED_BYTE&&(Y=Mt===ce?o.SRGB8_ALPHA8:o.RGBA8),G===o.UNSIGNED_SHORT_4_4_4_4&&(Y=o.RGBA4),G===o.UNSIGNED_SHORT_5_5_5_1&&(Y=o.RGB5_A1)}return(Y===o.R16F||Y===o.R32F||Y===o.RG16F||Y===o.RG32F||Y===o.RGBA16F||Y===o.RGBA32F)&&t.get("EXT_color_buffer_float"),Y}function x(C,M){let G;return C?M===null||M===di||M===qi?G=o.DEPTH24_STENCIL8:M===Mn?G=o.DEPTH32F_STENCIL8:M===_s&&(G=o.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===di||M===qi?G=o.DEPTH_COMPONENT24:M===Mn?G=o.DEPTH_COMPONENT32F:M===_s&&(G=o.DEPTH_COMPONENT16),G}function I(C,M){return p(C)===!0||C.isFramebufferTexture&&C.minFilter!==Qe&&C.minFilter!==an?Math.log2(Math.max(M.width,M.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?M.mipmaps.length:1}function E(C){const M=C.target;M.removeEventListener("dispose",E),R(M),M.isVideoTexture&&h.delete(M)}function A(C){const M=C.target;M.removeEventListener("dispose",A),_(M)}function R(C){const M=n.get(C);if(M.__webglInit===void 0)return;const G=C.source,j=u.get(G);if(j){const tt=j[M.__cacheKey];tt.usedTimes--,tt.usedTimes===0&&y(C),Object.keys(j).length===0&&u.delete(G)}n.remove(C)}function y(C){const M=n.get(C);o.deleteTexture(M.__webglTexture);const G=C.source,j=u.get(G);delete j[M.__cacheKey],r.memory.textures--}function _(C){const M=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(M.__webglFramebuffer[j]))for(let tt=0;tt<M.__webglFramebuffer[j].length;tt++)o.deleteFramebuffer(M.__webglFramebuffer[j][tt]);else o.deleteFramebuffer(M.__webglFramebuffer[j]);M.__webglDepthbuffer&&o.deleteRenderbuffer(M.__webglDepthbuffer[j])}else{if(Array.isArray(M.__webglFramebuffer))for(let j=0;j<M.__webglFramebuffer.length;j++)o.deleteFramebuffer(M.__webglFramebuffer[j]);else o.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&o.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&o.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let j=0;j<M.__webglColorRenderbuffer.length;j++)M.__webglColorRenderbuffer[j]&&o.deleteRenderbuffer(M.__webglColorRenderbuffer[j]);M.__webglDepthRenderbuffer&&o.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const G=C.textures;for(let j=0,tt=G.length;j<tt;j++){const Y=n.get(G[j]);Y.__webglTexture&&(o.deleteTexture(Y.__webglTexture),r.memory.textures--),n.remove(G[j])}n.remove(C)}let P=0;function U(){P=0}function L(){const C=P;return C>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+i.maxTextures),P+=1,C}function z(C){const M=[];return M.push(C.wrapS),M.push(C.wrapT),M.push(C.wrapR||0),M.push(C.magFilter),M.push(C.minFilter),M.push(C.anisotropy),M.push(C.internalFormat),M.push(C.format),M.push(C.type),M.push(C.generateMipmaps),M.push(C.premultiplyAlpha),M.push(C.flipY),M.push(C.unpackAlignment),M.push(C.colorSpace),M.join()}function V(C,M){const G=n.get(C);if(C.isVideoTexture&&Tt(C),C.isRenderTargetTexture===!1&&C.version>0&&G.__version!==C.version){const j=C.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{K(G,C,M);return}}e.bindTexture(o.TEXTURE_2D,G.__webglTexture,o.TEXTURE0+M)}function B(C,M){const G=n.get(C);if(C.version>0&&G.__version!==C.version){K(G,C,M);return}e.bindTexture(o.TEXTURE_2D_ARRAY,G.__webglTexture,o.TEXTURE0+M)}function q(C,M){const G=n.get(C);if(C.version>0&&G.__version!==C.version){K(G,C,M);return}e.bindTexture(o.TEXTURE_3D,G.__webglTexture,o.TEXTURE0+M)}function H(C,M){const G=n.get(C);if(C.version>0&&G.__version!==C.version){ot(G,C,M);return}e.bindTexture(o.TEXTURE_CUBE_MAP,G.__webglTexture,o.TEXTURE0+M)}const nt={[vs]:o.REPEAT,[kn]:o.CLAMP_TO_EDGE,[Ar]:o.MIRRORED_REPEAT},st={[Qe]:o.NEAREST,[Gh]:o.NEAREST_MIPMAP_NEAREST,[Ss]:o.NEAREST_MIPMAP_LINEAR,[an]:o.LINEAR,[Po]:o.LINEAR_MIPMAP_NEAREST,[li]:o.LINEAR_MIPMAP_LINEAR},at={[qh]:o.NEVER,[Jh]:o.ALWAYS,[$h]:o.LESS,[Ml]:o.LEQUAL,[Yh]:o.EQUAL,[Zh]:o.GEQUAL,[Kh]:o.GREATER,[jh]:o.NOTEQUAL};function bt(C,M){if(M.type===Mn&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===an||M.magFilter===Po||M.magFilter===Ss||M.magFilter===li||M.minFilter===an||M.minFilter===Po||M.minFilter===Ss||M.minFilter===li)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),o.texParameteri(C,o.TEXTURE_WRAP_S,nt[M.wrapS]),o.texParameteri(C,o.TEXTURE_WRAP_T,nt[M.wrapT]),(C===o.TEXTURE_3D||C===o.TEXTURE_2D_ARRAY)&&o.texParameteri(C,o.TEXTURE_WRAP_R,nt[M.wrapR]),o.texParameteri(C,o.TEXTURE_MAG_FILTER,st[M.magFilter]),o.texParameteri(C,o.TEXTURE_MIN_FILTER,st[M.minFilter]),M.compareFunction&&(o.texParameteri(C,o.TEXTURE_COMPARE_MODE,o.COMPARE_REF_TO_TEXTURE),o.texParameteri(C,o.TEXTURE_COMPARE_FUNC,at[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Qe||M.minFilter!==Ss&&M.minFilter!==li||M.type===Mn&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){const G=t.get("EXT_texture_filter_anisotropic");o.texParameterf(C,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,i.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function Zt(C,M){let G=!1;C.__webglInit===void 0&&(C.__webglInit=!0,M.addEventListener("dispose",E));const j=M.source;let tt=u.get(j);tt===void 0&&(tt={},u.set(j,tt));const Y=z(M);if(Y!==C.__cacheKey){tt[Y]===void 0&&(tt[Y]={texture:o.createTexture(),usedTimes:0},r.memory.textures++,G=!0),tt[Y].usedTimes++;const Mt=tt[C.__cacheKey];Mt!==void 0&&(tt[C.__cacheKey].usedTimes--,Mt.usedTimes===0&&y(M)),C.__cacheKey=Y,C.__webglTexture=tt[Y].texture}return G}function K(C,M,G){let j=o.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(j=o.TEXTURE_2D_ARRAY),M.isData3DTexture&&(j=o.TEXTURE_3D);const tt=Zt(C,M),Y=M.source;e.bindTexture(j,C.__webglTexture,o.TEXTURE0+G);const Mt=n.get(Y);if(Y.version!==Mt.__version||tt===!0){e.activeTexture(o.TEXTURE0+G);const ut=Qt.getPrimaries(Qt.workingColorSpace),vt=M.colorSpace===qn?null:Qt.getPrimaries(M.colorSpace),Kt=M.colorSpace===qn||ut===vt?o.NONE:o.BROWSER_DEFAULT_WEBGL;o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,M.flipY),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),o.pixelStorei(o.UNPACK_ALIGNMENT,M.unpackAlignment),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,Kt);let it=v(M.image,!1,i.maxTextureSize);it=pe(M,it);const _t=s.convert(M.format,M.colorSpace),It=s.convert(M.type);let kt=b(M.internalFormat,_t,It,M.colorSpace,M.isVideoTexture);bt(j,M);let yt;const $t=M.mipmaps,zt=M.isVideoTexture!==!0,fe=Mt.__version===void 0||tt===!0,N=Y.dataReady,lt=I(M,it);if(M.isDepthTexture)kt=x(M.format===$i,M.type),fe&&(zt?e.texStorage2D(o.TEXTURE_2D,1,kt,it.width,it.height):e.texImage2D(o.TEXTURE_2D,0,kt,it.width,it.height,0,_t,It,null));else if(M.isDataTexture)if($t.length>0){zt&&fe&&e.texStorage2D(o.TEXTURE_2D,lt,kt,$t[0].width,$t[0].height);for(let $=0,Z=$t.length;$<Z;$++)yt=$t[$],zt?N&&e.texSubImage2D(o.TEXTURE_2D,$,0,0,yt.width,yt.height,_t,It,yt.data):e.texImage2D(o.TEXTURE_2D,$,kt,yt.width,yt.height,0,_t,It,yt.data);M.generateMipmaps=!1}else zt?(fe&&e.texStorage2D(o.TEXTURE_2D,lt,kt,it.width,it.height),N&&e.texSubImage2D(o.TEXTURE_2D,0,0,0,it.width,it.height,_t,It,it.data)):e.texImage2D(o.TEXTURE_2D,0,kt,it.width,it.height,0,_t,It,it.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){zt&&fe&&e.texStorage3D(o.TEXTURE_2D_ARRAY,lt,kt,$t[0].width,$t[0].height,it.depth);for(let $=0,Z=$t.length;$<Z;$++)if(yt=$t[$],M.format!==cn)if(_t!==null)if(zt){if(N)if(M.layerUpdates.size>0){const pt=Cc(yt.width,yt.height,M.format,M.type);for(const ft of M.layerUpdates){const Ft=yt.data.subarray(ft*pt/yt.data.BYTES_PER_ELEMENT,(ft+1)*pt/yt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,$,0,0,ft,yt.width,yt.height,1,_t,Ft)}M.clearLayerUpdates()}else e.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,$,0,0,0,yt.width,yt.height,it.depth,_t,yt.data)}else e.compressedTexImage3D(o.TEXTURE_2D_ARRAY,$,kt,yt.width,yt.height,it.depth,0,yt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else zt?N&&e.texSubImage3D(o.TEXTURE_2D_ARRAY,$,0,0,0,yt.width,yt.height,it.depth,_t,It,yt.data):e.texImage3D(o.TEXTURE_2D_ARRAY,$,kt,yt.width,yt.height,it.depth,0,_t,It,yt.data)}else{zt&&fe&&e.texStorage2D(o.TEXTURE_2D,lt,kt,$t[0].width,$t[0].height);for(let $=0,Z=$t.length;$<Z;$++)yt=$t[$],M.format!==cn?_t!==null?zt?N&&e.compressedTexSubImage2D(o.TEXTURE_2D,$,0,0,yt.width,yt.height,_t,yt.data):e.compressedTexImage2D(o.TEXTURE_2D,$,kt,yt.width,yt.height,0,yt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):zt?N&&e.texSubImage2D(o.TEXTURE_2D,$,0,0,yt.width,yt.height,_t,It,yt.data):e.texImage2D(o.TEXTURE_2D,$,kt,yt.width,yt.height,0,_t,It,yt.data)}else if(M.isDataArrayTexture)if(zt){if(fe&&e.texStorage3D(o.TEXTURE_2D_ARRAY,lt,kt,it.width,it.height,it.depth),N)if(M.layerUpdates.size>0){const $=Cc(it.width,it.height,M.format,M.type);for(const Z of M.layerUpdates){const pt=it.data.subarray(Z*$/it.data.BYTES_PER_ELEMENT,(Z+1)*$/it.data.BYTES_PER_ELEMENT);e.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,Z,it.width,it.height,1,_t,It,pt)}M.clearLayerUpdates()}else e.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,0,it.width,it.height,it.depth,_t,It,it.data)}else e.texImage3D(o.TEXTURE_2D_ARRAY,0,kt,it.width,it.height,it.depth,0,_t,It,it.data);else if(M.isData3DTexture)zt?(fe&&e.texStorage3D(o.TEXTURE_3D,lt,kt,it.width,it.height,it.depth),N&&e.texSubImage3D(o.TEXTURE_3D,0,0,0,0,it.width,it.height,it.depth,_t,It,it.data)):e.texImage3D(o.TEXTURE_3D,0,kt,it.width,it.height,it.depth,0,_t,It,it.data);else if(M.isFramebufferTexture){if(fe)if(zt)e.texStorage2D(o.TEXTURE_2D,lt,kt,it.width,it.height);else{let $=it.width,Z=it.height;for(let pt=0;pt<lt;pt++)e.texImage2D(o.TEXTURE_2D,pt,kt,$,Z,0,_t,It,null),$>>=1,Z>>=1}}else if($t.length>0){if(zt&&fe){const $=St($t[0]);e.texStorage2D(o.TEXTURE_2D,lt,kt,$.width,$.height)}for(let $=0,Z=$t.length;$<Z;$++)yt=$t[$],zt?N&&e.texSubImage2D(o.TEXTURE_2D,$,0,0,_t,It,yt):e.texImage2D(o.TEXTURE_2D,$,kt,_t,It,yt);M.generateMipmaps=!1}else if(zt){if(fe){const $=St(it);e.texStorage2D(o.TEXTURE_2D,lt,kt,$.width,$.height)}N&&e.texSubImage2D(o.TEXTURE_2D,0,0,0,_t,It,it)}else e.texImage2D(o.TEXTURE_2D,0,kt,_t,It,it);p(M)&&m(j),Mt.__version=Y.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function ot(C,M,G){if(M.image.length!==6)return;const j=Zt(C,M),tt=M.source;e.bindTexture(o.TEXTURE_CUBE_MAP,C.__webglTexture,o.TEXTURE0+G);const Y=n.get(tt);if(tt.version!==Y.__version||j===!0){e.activeTexture(o.TEXTURE0+G);const Mt=Qt.getPrimaries(Qt.workingColorSpace),ut=M.colorSpace===qn?null:Qt.getPrimaries(M.colorSpace),vt=M.colorSpace===qn||Mt===ut?o.NONE:o.BROWSER_DEFAULT_WEBGL;o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,M.flipY),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),o.pixelStorei(o.UNPACK_ALIGNMENT,M.unpackAlignment),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,vt);const Kt=M.isCompressedTexture||M.image[0].isCompressedTexture,it=M.image[0]&&M.image[0].isDataTexture,_t=[];for(let Z=0;Z<6;Z++)!Kt&&!it?_t[Z]=v(M.image[Z],!0,i.maxCubemapSize):_t[Z]=it?M.image[Z].image:M.image[Z],_t[Z]=pe(M,_t[Z]);const It=_t[0],kt=s.convert(M.format,M.colorSpace),yt=s.convert(M.type),$t=b(M.internalFormat,kt,yt,M.colorSpace),zt=M.isVideoTexture!==!0,fe=Y.__version===void 0||j===!0,N=tt.dataReady;let lt=I(M,It);bt(o.TEXTURE_CUBE_MAP,M);let $;if(Kt){zt&&fe&&e.texStorage2D(o.TEXTURE_CUBE_MAP,lt,$t,It.width,It.height);for(let Z=0;Z<6;Z++){$=_t[Z].mipmaps;for(let pt=0;pt<$.length;pt++){const ft=$[pt];M.format!==cn?kt!==null?zt?N&&e.compressedTexSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Z,pt,0,0,ft.width,ft.height,kt,ft.data):e.compressedTexImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Z,pt,$t,ft.width,ft.height,0,ft.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):zt?N&&e.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Z,pt,0,0,ft.width,ft.height,kt,yt,ft.data):e.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Z,pt,$t,ft.width,ft.height,0,kt,yt,ft.data)}}}else{if($=M.mipmaps,zt&&fe){$.length>0&&lt++;const Z=St(_t[0]);e.texStorage2D(o.TEXTURE_CUBE_MAP,lt,$t,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(it){zt?N&&e.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,_t[Z].width,_t[Z].height,kt,yt,_t[Z].data):e.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,$t,_t[Z].width,_t[Z].height,0,kt,yt,_t[Z].data);for(let pt=0;pt<$.length;pt++){const Ft=$[pt].image[Z].image;zt?N&&e.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Z,pt+1,0,0,Ft.width,Ft.height,kt,yt,Ft.data):e.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Z,pt+1,$t,Ft.width,Ft.height,0,kt,yt,Ft.data)}}else{zt?N&&e.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,kt,yt,_t[Z]):e.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,$t,kt,yt,_t[Z]);for(let pt=0;pt<$.length;pt++){const ft=$[pt];zt?N&&e.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Z,pt+1,0,0,kt,yt,ft.image[Z]):e.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Z,pt+1,$t,kt,yt,ft.image[Z])}}}p(M)&&m(o.TEXTURE_CUBE_MAP),Y.__version=tt.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function wt(C,M,G,j,tt,Y){const Mt=s.convert(G.format,G.colorSpace),ut=s.convert(G.type),vt=b(G.internalFormat,Mt,ut,G.colorSpace),Kt=n.get(M),it=n.get(G);if(it.__renderTarget=M,!Kt.__hasExternalTextures){const _t=Math.max(1,M.width>>Y),It=Math.max(1,M.height>>Y);tt===o.TEXTURE_3D||tt===o.TEXTURE_2D_ARRAY?e.texImage3D(tt,Y,vt,_t,It,M.depth,0,Mt,ut,null):e.texImage2D(tt,Y,vt,_t,It,0,Mt,ut,null)}e.bindFramebuffer(o.FRAMEBUFFER,C),qt(M)?a.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,j,tt,it.__webglTexture,0,Xt(M)):(tt===o.TEXTURE_2D||tt>=o.TEXTURE_CUBE_MAP_POSITIVE_X&&tt<=o.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&o.framebufferTexture2D(o.FRAMEBUFFER,j,tt,it.__webglTexture,Y),e.bindFramebuffer(o.FRAMEBUFFER,null)}function dt(C,M,G){if(o.bindRenderbuffer(o.RENDERBUFFER,C),M.depthBuffer){const j=M.depthTexture,tt=j&&j.isDepthTexture?j.type:null,Y=x(M.stencilBuffer,tt),Mt=M.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,ut=Xt(M);qt(M)?a.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,ut,Y,M.width,M.height):G?o.renderbufferStorageMultisample(o.RENDERBUFFER,ut,Y,M.width,M.height):o.renderbufferStorage(o.RENDERBUFFER,Y,M.width,M.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,Mt,o.RENDERBUFFER,C)}else{const j=M.textures;for(let tt=0;tt<j.length;tt++){const Y=j[tt],Mt=s.convert(Y.format,Y.colorSpace),ut=s.convert(Y.type),vt=b(Y.internalFormat,Mt,ut,Y.colorSpace),Kt=Xt(M);G&&qt(M)===!1?o.renderbufferStorageMultisample(o.RENDERBUFFER,Kt,vt,M.width,M.height):qt(M)?a.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,Kt,vt,M.width,M.height):o.renderbufferStorage(o.RENDERBUFFER,vt,M.width,M.height)}}o.bindRenderbuffer(o.RENDERBUFFER,null)}function Rt(C,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(o.FRAMEBUFFER,C),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const j=n.get(M.depthTexture);j.__renderTarget=M,(!j.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),V(M.depthTexture,0);const tt=j.__webglTexture,Y=Xt(M);if(M.depthTexture.format===zi)qt(M)?a.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,o.DEPTH_ATTACHMENT,o.TEXTURE_2D,tt,0,Y):o.framebufferTexture2D(o.FRAMEBUFFER,o.DEPTH_ATTACHMENT,o.TEXTURE_2D,tt,0);else if(M.depthTexture.format===$i)qt(M)?a.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,o.DEPTH_STENCIL_ATTACHMENT,o.TEXTURE_2D,tt,0,Y):o.framebufferTexture2D(o.FRAMEBUFFER,o.DEPTH_STENCIL_ATTACHMENT,o.TEXTURE_2D,tt,0);else throw new Error("Unknown depthTexture format")}function te(C){const M=n.get(C),G=C.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==C.depthTexture){const j=C.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),j){const tt=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,j.removeEventListener("dispose",tt)};j.addEventListener("dispose",tt),M.__depthDisposeCallback=tt}M.__boundDepthTexture=j}if(C.depthTexture&&!M.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");Rt(M.__webglFramebuffer,C)}else if(G){M.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(e.bindFramebuffer(o.FRAMEBUFFER,M.__webglFramebuffer[j]),M.__webglDepthbuffer[j]===void 0)M.__webglDepthbuffer[j]=o.createRenderbuffer(),dt(M.__webglDepthbuffer[j],C,!1);else{const tt=C.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,Y=M.__webglDepthbuffer[j];o.bindRenderbuffer(o.RENDERBUFFER,Y),o.framebufferRenderbuffer(o.FRAMEBUFFER,tt,o.RENDERBUFFER,Y)}}else if(e.bindFramebuffer(o.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=o.createRenderbuffer(),dt(M.__webglDepthbuffer,C,!1);else{const j=C.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,tt=M.__webglDepthbuffer;o.bindRenderbuffer(o.RENDERBUFFER,tt),o.framebufferRenderbuffer(o.FRAMEBUFFER,j,o.RENDERBUFFER,tt)}e.bindFramebuffer(o.FRAMEBUFFER,null)}function Lt(C,M,G){const j=n.get(C);M!==void 0&&wt(j.__webglFramebuffer,C,C.texture,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,0),G!==void 0&&te(C)}function ye(C){const M=C.texture,G=n.get(C),j=n.get(M);C.addEventListener("dispose",A);const tt=C.textures,Y=C.isWebGLCubeRenderTarget===!0,Mt=tt.length>1;if(Mt||(j.__webglTexture===void 0&&(j.__webglTexture=o.createTexture()),j.__version=M.version,r.memory.textures++),Y){G.__webglFramebuffer=[];for(let ut=0;ut<6;ut++)if(M.mipmaps&&M.mipmaps.length>0){G.__webglFramebuffer[ut]=[];for(let vt=0;vt<M.mipmaps.length;vt++)G.__webglFramebuffer[ut][vt]=o.createFramebuffer()}else G.__webglFramebuffer[ut]=o.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){G.__webglFramebuffer=[];for(let ut=0;ut<M.mipmaps.length;ut++)G.__webglFramebuffer[ut]=o.createFramebuffer()}else G.__webglFramebuffer=o.createFramebuffer();if(Mt)for(let ut=0,vt=tt.length;ut<vt;ut++){const Kt=n.get(tt[ut]);Kt.__webglTexture===void 0&&(Kt.__webglTexture=o.createTexture(),r.memory.textures++)}if(C.samples>0&&qt(C)===!1){G.__webglMultisampledFramebuffer=o.createFramebuffer(),G.__webglColorRenderbuffer=[],e.bindFramebuffer(o.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let ut=0;ut<tt.length;ut++){const vt=tt[ut];G.__webglColorRenderbuffer[ut]=o.createRenderbuffer(),o.bindRenderbuffer(o.RENDERBUFFER,G.__webglColorRenderbuffer[ut]);const Kt=s.convert(vt.format,vt.colorSpace),it=s.convert(vt.type),_t=b(vt.internalFormat,Kt,it,vt.colorSpace,C.isXRRenderTarget===!0),It=Xt(C);o.renderbufferStorageMultisample(o.RENDERBUFFER,It,_t,C.width,C.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+ut,o.RENDERBUFFER,G.__webglColorRenderbuffer[ut])}o.bindRenderbuffer(o.RENDERBUFFER,null),C.depthBuffer&&(G.__webglDepthRenderbuffer=o.createRenderbuffer(),dt(G.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(o.FRAMEBUFFER,null)}}if(Y){e.bindTexture(o.TEXTURE_CUBE_MAP,j.__webglTexture),bt(o.TEXTURE_CUBE_MAP,M);for(let ut=0;ut<6;ut++)if(M.mipmaps&&M.mipmaps.length>0)for(let vt=0;vt<M.mipmaps.length;vt++)wt(G.__webglFramebuffer[ut][vt],C,M,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+ut,vt);else wt(G.__webglFramebuffer[ut],C,M,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0);p(M)&&m(o.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Mt){for(let ut=0,vt=tt.length;ut<vt;ut++){const Kt=tt[ut],it=n.get(Kt);e.bindTexture(o.TEXTURE_2D,it.__webglTexture),bt(o.TEXTURE_2D,Kt),wt(G.__webglFramebuffer,C,Kt,o.COLOR_ATTACHMENT0+ut,o.TEXTURE_2D,0),p(Kt)&&m(o.TEXTURE_2D)}e.unbindTexture()}else{let ut=o.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ut=C.isWebGL3DRenderTarget?o.TEXTURE_3D:o.TEXTURE_2D_ARRAY),e.bindTexture(ut,j.__webglTexture),bt(ut,M),M.mipmaps&&M.mipmaps.length>0)for(let vt=0;vt<M.mipmaps.length;vt++)wt(G.__webglFramebuffer[vt],C,M,o.COLOR_ATTACHMENT0,ut,vt);else wt(G.__webglFramebuffer,C,M,o.COLOR_ATTACHMENT0,ut,0);p(M)&&m(ut),e.unbindTexture()}C.depthBuffer&&te(C)}function ge(C){const M=C.textures;for(let G=0,j=M.length;G<j;G++){const tt=M[G];if(p(tt)){const Y=w(C),Mt=n.get(tt).__webglTexture;e.bindTexture(Y,Mt),m(Y),e.unbindTexture()}}}const Wt=[],k=[];function tn(C){if(C.samples>0){if(qt(C)===!1){const M=C.textures,G=C.width,j=C.height;let tt=o.COLOR_BUFFER_BIT;const Y=C.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,Mt=n.get(C),ut=M.length>1;if(ut)for(let vt=0;vt<M.length;vt++)e.bindFramebuffer(o.FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+vt,o.RENDERBUFFER,null),e.bindFramebuffer(o.FRAMEBUFFER,Mt.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+vt,o.TEXTURE_2D,null,0);e.bindFramebuffer(o.READ_FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),e.bindFramebuffer(o.DRAW_FRAMEBUFFER,Mt.__webglFramebuffer);for(let vt=0;vt<M.length;vt++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(tt|=o.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(tt|=o.STENCIL_BUFFER_BIT)),ut){o.framebufferRenderbuffer(o.READ_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.RENDERBUFFER,Mt.__webglColorRenderbuffer[vt]);const Kt=n.get(M[vt]).__webglTexture;o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,Kt,0)}o.blitFramebuffer(0,0,G,j,0,0,G,j,tt,o.NEAREST),c===!0&&(Wt.length=0,k.length=0,Wt.push(o.COLOR_ATTACHMENT0+vt),C.depthBuffer&&C.resolveDepthBuffer===!1&&(Wt.push(Y),k.push(Y),o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,k)),o.invalidateFramebuffer(o.READ_FRAMEBUFFER,Wt))}if(e.bindFramebuffer(o.READ_FRAMEBUFFER,null),e.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),ut)for(let vt=0;vt<M.length;vt++){e.bindFramebuffer(o.FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+vt,o.RENDERBUFFER,Mt.__webglColorRenderbuffer[vt]);const Kt=n.get(M[vt]).__webglTexture;e.bindFramebuffer(o.FRAMEBUFFER,Mt.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+vt,o.TEXTURE_2D,Kt,0)}e.bindFramebuffer(o.DRAW_FRAMEBUFFER,Mt.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&c){const M=C.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT;o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,[M])}}}function Xt(C){return Math.min(i.maxSamples,C.samples)}function qt(C){const M=n.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function Tt(C){const M=r.render.frame;h.get(C)!==M&&(h.set(C,M),C.update())}function pe(C,M){const G=C.colorSpace,j=C.format,tt=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||G!==Yi&&G!==qn&&(Qt.getTransfer(G)===ce?(j!==cn||tt!==Bn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),M}function St(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=L,this.resetTextureUnits=U,this.setTexture2D=V,this.setTexture2DArray=B,this.setTexture3D=q,this.setTextureCube=H,this.rebindTextures=Lt,this.setupRenderTarget=ye,this.updateRenderTargetMipmap=ge,this.updateMultisampleRenderTarget=tn,this.setupDepthRenderbuffer=te,this.setupFrameBufferTexture=wt,this.useMultisampledRTT=qt}function x0(o,t){function e(n,i=qn){let s;const r=Qt.getTransfer(i);if(n===Bn)return o.UNSIGNED_BYTE;if(n===pa)return o.UNSIGNED_SHORT_4_4_4_4;if(n===ma)return o.UNSIGNED_SHORT_5_5_5_1;if(n===ml)return o.UNSIGNED_INT_5_9_9_9_REV;if(n===fl)return o.BYTE;if(n===pl)return o.SHORT;if(n===_s)return o.UNSIGNED_SHORT;if(n===fa)return o.INT;if(n===di)return o.UNSIGNED_INT;if(n===Mn)return o.FLOAT;if(n===ys)return o.HALF_FLOAT;if(n===gl)return o.ALPHA;if(n===vl)return o.RGB;if(n===cn)return o.RGBA;if(n===_l)return o.LUMINANCE;if(n===yl)return o.LUMINANCE_ALPHA;if(n===zi)return o.DEPTH_COMPONENT;if(n===$i)return o.DEPTH_STENCIL;if(n===ga)return o.RED;if(n===va)return o.RED_INTEGER;if(n===xl)return o.RG;if(n===_a)return o.RG_INTEGER;if(n===ya)return o.RGBA_INTEGER;if(n===eo||n===no||n===io||n===so)if(r===ce)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===eo)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===no)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===io)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===so)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===eo)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===no)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===io)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===so)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Cr||n===Rr||n===Ir||n===Pr)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Cr)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Rr)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ir)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Pr)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Lr||n===Dr||n===kr)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Lr||n===Dr)return r===ce?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===kr)return r===ce?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ur||n===Nr||n===Br||n===Fr||n===Or||n===zr||n===Hr||n===Gr||n===Vr||n===Wr||n===Xr||n===qr||n===$r||n===Yr)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Ur)return r===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Nr)return r===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Br)return r===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Fr)return r===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Or)return r===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===zr)return r===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Hr)return r===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Gr)return r===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Vr)return r===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Wr)return r===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Xr)return r===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===qr)return r===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===$r)return r===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Yr)return r===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===oo||n===Kr||n===jr)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===oo)return r===ce?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Kr)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===jr)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===wl||n===Zr||n===Jr||n===Qr)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===oo)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Zr)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Jr)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Qr)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===qi?o.UNSIGNED_INT_24_8:o[n]!==void 0?o[n]:null}return{convert:e}}const w0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,M0=`
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

}`;class b0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new Oe,s=t.properties.get(i);s.__webglTexture=e.texture,(e.depthNear!==n.depthNear||e.depthFar!==n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new En({vertexShader:w0,fragmentShader:M0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new T(new Ae(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class S0 extends ji{constructor(t,e){super();const n=this;let i=null,s=1,r=null,a="local-floor",c=1,l=null,h=null,d=null,u=null,f=null,g=null;const v=new b0,p=e.getContextAttributes();let m=null,w=null;const b=[],x=[],I=new Dt;let E=null;const A=new Je;A.viewport=new he;const R=new Je;R.viewport=new he;const y=[A,R],_=new Gd;let P=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let ot=b[K];return ot===void 0&&(ot=new Qo,b[K]=ot),ot.getTargetRaySpace()},this.getControllerGrip=function(K){let ot=b[K];return ot===void 0&&(ot=new Qo,b[K]=ot),ot.getGripSpace()},this.getHand=function(K){let ot=b[K];return ot===void 0&&(ot=new Qo,b[K]=ot),ot.getHandSpace()};function L(K){const ot=x.indexOf(K.inputSource);if(ot===-1)return;const wt=b[ot];wt!==void 0&&(wt.update(K.inputSource,K.frame,l||r),wt.dispatchEvent({type:K.type,data:K.inputSource}))}function z(){i.removeEventListener("select",L),i.removeEventListener("selectstart",L),i.removeEventListener("selectend",L),i.removeEventListener("squeeze",L),i.removeEventListener("squeezestart",L),i.removeEventListener("squeezeend",L),i.removeEventListener("end",z),i.removeEventListener("inputsourceschange",V);for(let K=0;K<b.length;K++){const ot=x[K];ot!==null&&(x[K]=null,b[K].disconnect(ot))}P=null,U=null,v.reset(),t.setRenderTarget(m),f=null,u=null,d=null,i=null,w=null,Zt.stop(),n.isPresenting=!1,t.setPixelRatio(E),t.setSize(I.width,I.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){s=K,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){a=K,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||r},this.setReferenceSpace=function(K){l=K},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(K){if(i=K,i!==null){if(m=t.getRenderTarget(),i.addEventListener("select",L),i.addEventListener("selectstart",L),i.addEventListener("selectend",L),i.addEventListener("squeeze",L),i.addEventListener("squeezestart",L),i.addEventListener("squeezeend",L),i.addEventListener("end",z),i.addEventListener("inputsourceschange",V),p.xrCompatible!==!0&&await e.makeXRCompatible(),E=t.getPixelRatio(),t.getSize(I),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let wt=null,dt=null,Rt=null;p.depth&&(Rt=p.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,wt=p.stencil?$i:zi,dt=p.stencil?qi:di);const te={colorFormat:e.RGBA8,depthFormat:Rt,scaleFactor:s};d=new XRWebGLBinding(i,e),u=d.createProjectionLayer(te),i.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),w=new ui(u.textureWidth,u.textureHeight,{format:cn,type:Bn,depthTexture:new Ul(u.textureWidth,u.textureHeight,dt,void 0,void 0,void 0,void 0,void 0,void 0,wt),stencilBuffer:p.stencil,colorSpace:t.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const wt={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,e,wt),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),w=new ui(f.framebufferWidth,f.framebufferHeight,{format:cn,type:Bn,colorSpace:t.outputColorSpace,stencilBuffer:p.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}w.isXRRenderTarget=!0,this.setFoveation(c),l=null,r=await i.requestReferenceSpace(a),Zt.setContext(i),Zt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function V(K){for(let ot=0;ot<K.removed.length;ot++){const wt=K.removed[ot],dt=x.indexOf(wt);dt>=0&&(x[dt]=null,b[dt].disconnect(wt))}for(let ot=0;ot<K.added.length;ot++){const wt=K.added[ot];let dt=x.indexOf(wt);if(dt===-1){for(let te=0;te<b.length;te++)if(te>=x.length){x.push(wt),dt=te;break}else if(x[te]===null){x[te]=wt,dt=te;break}if(dt===-1)break}const Rt=b[dt];Rt&&Rt.connect(wt)}}const B=new D,q=new D;function H(K,ot,wt){B.setFromMatrixPosition(ot.matrixWorld),q.setFromMatrixPosition(wt.matrixWorld);const dt=B.distanceTo(q),Rt=ot.projectionMatrix.elements,te=wt.projectionMatrix.elements,Lt=Rt[14]/(Rt[10]-1),ye=Rt[14]/(Rt[10]+1),ge=(Rt[9]+1)/Rt[5],Wt=(Rt[9]-1)/Rt[5],k=(Rt[8]-1)/Rt[0],tn=(te[8]+1)/te[0],Xt=Lt*k,qt=Lt*tn,Tt=dt/(-k+tn),pe=Tt*-k;if(ot.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(pe),K.translateZ(Tt),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),Rt[10]===-1)K.projectionMatrix.copy(ot.projectionMatrix),K.projectionMatrixInverse.copy(ot.projectionMatrixInverse);else{const St=Lt+Tt,C=ye+Tt,M=Xt-pe,G=qt+(dt-pe),j=ge*ye/C*St,tt=Wt*ye/C*St;K.projectionMatrix.makePerspective(M,G,j,tt,St,C),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function nt(K,ot){ot===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(ot.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(i===null)return;let ot=K.near,wt=K.far;v.texture!==null&&(v.depthNear>0&&(ot=v.depthNear),v.depthFar>0&&(wt=v.depthFar)),_.near=R.near=A.near=ot,_.far=R.far=A.far=wt,(P!==_.near||U!==_.far)&&(i.updateRenderState({depthNear:_.near,depthFar:_.far}),P=_.near,U=_.far),A.layers.mask=K.layers.mask|2,R.layers.mask=K.layers.mask|4,_.layers.mask=A.layers.mask|R.layers.mask;const dt=K.parent,Rt=_.cameras;nt(_,dt);for(let te=0;te<Rt.length;te++)nt(Rt[te],dt);Rt.length===2?H(_,A,R):_.projectionMatrix.copy(A.projectionMatrix),st(K,_,dt)};function st(K,ot,wt){wt===null?K.matrix.copy(ot.matrixWorld):(K.matrix.copy(wt.matrixWorld),K.matrix.invert(),K.matrix.multiply(ot.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(ot.projectionMatrix),K.projectionMatrixInverse.copy(ot.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=ea*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return _},this.getFoveation=function(){if(!(u===null&&f===null))return c},this.setFoveation=function(K){c=K,u!==null&&(u.fixedFoveation=K),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=K)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(_)};let at=null;function bt(K,ot){if(h=ot.getViewerPose(l||r),g=ot,h!==null){const wt=h.views;f!==null&&(t.setRenderTargetFramebuffer(w,f.framebuffer),t.setRenderTarget(w));let dt=!1;wt.length!==_.cameras.length&&(_.cameras.length=0,dt=!0);for(let Lt=0;Lt<wt.length;Lt++){const ye=wt[Lt];let ge=null;if(f!==null)ge=f.getViewport(ye);else{const k=d.getViewSubImage(u,ye);ge=k.viewport,Lt===0&&(t.setRenderTargetTextures(w,k.colorTexture,u.ignoreDepthValues?void 0:k.depthStencilTexture),t.setRenderTarget(w))}let Wt=y[Lt];Wt===void 0&&(Wt=new Je,Wt.layers.enable(Lt),Wt.viewport=new he,y[Lt]=Wt),Wt.matrix.fromArray(ye.transform.matrix),Wt.matrix.decompose(Wt.position,Wt.quaternion,Wt.scale),Wt.projectionMatrix.fromArray(ye.projectionMatrix),Wt.projectionMatrixInverse.copy(Wt.projectionMatrix).invert(),Wt.viewport.set(ge.x,ge.y,ge.width,ge.height),Lt===0&&(_.matrix.copy(Wt.matrix),_.matrix.decompose(_.position,_.quaternion,_.scale)),dt===!0&&_.cameras.push(Wt)}const Rt=i.enabledFeatures;if(Rt&&Rt.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&d){const Lt=d.getDepthInformation(wt[0]);Lt&&Lt.isValid&&Lt.texture&&v.init(t,Lt,i.renderState)}}for(let wt=0;wt<b.length;wt++){const dt=x[wt],Rt=b[wt];dt!==null&&Rt!==void 0&&Rt.update(dt,ot,l||r)}at&&at(K,ot),ot.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ot}),g=null}const Zt=new Ol;Zt.setAnimationLoop(bt),this.setAnimationLoop=function(K){at=K},this.dispose=function(){}}}const si=new hn,E0=new re;function T0(o,t){function e(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,Cl(o)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function i(p,m,w,b,x){m.isMeshBasicMaterial||m.isMeshLambertMaterial?s(p,m):m.isMeshToonMaterial?(s(p,m),d(p,m)):m.isMeshPhongMaterial?(s(p,m),h(p,m)):m.isMeshStandardMaterial?(s(p,m),u(p,m),m.isMeshPhysicalMaterial&&f(p,m,x)):m.isMeshMatcapMaterial?(s(p,m),g(p,m)):m.isMeshDepthMaterial?s(p,m):m.isMeshDistanceMaterial?(s(p,m),v(p,m)):m.isMeshNormalMaterial?s(p,m):m.isLineBasicMaterial?(r(p,m),m.isLineDashedMaterial&&a(p,m)):m.isPointsMaterial?c(p,m,w,b):m.isSpriteMaterial?l(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,e(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===Xe&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,e(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===Xe&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,e(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,e(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const w=t.get(m),b=w.envMap,x=w.envMapRotation;b&&(p.envMap.value=b,si.copy(x),si.x*=-1,si.y*=-1,si.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(si.y*=-1,si.z*=-1),p.envMapRotation.value.setFromMatrix4(E0.makeRotationFromEuler(si)),p.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,p.aoMapTransform))}function r(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform))}function a(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function c(p,m,w,b){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*w,p.scale.value=b*.5,m.map&&(p.map.value=m.map,e(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function l(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function h(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function d(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function u(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,w){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Xe&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=w.texture,p.transmissionSamplerSize.value.set(w.width,w.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function v(p,m){const w=t.get(m).light;p.referencePosition.value.setFromMatrixPosition(w.matrixWorld),p.nearDistance.value=w.shadow.camera.near,p.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function A0(o,t,e,n){let i={},s={},r=[];const a=o.getParameter(o.MAX_UNIFORM_BUFFER_BINDINGS);function c(w,b){const x=b.program;n.uniformBlockBinding(w,x)}function l(w,b){let x=i[w.id];x===void 0&&(g(w),x=h(w),i[w.id]=x,w.addEventListener("dispose",p));const I=b.program;n.updateUBOMapping(w,I);const E=t.render.frame;s[w.id]!==E&&(u(w),s[w.id]=E)}function h(w){const b=d();w.__bindingPointIndex=b;const x=o.createBuffer(),I=w.__size,E=w.usage;return o.bindBuffer(o.UNIFORM_BUFFER,x),o.bufferData(o.UNIFORM_BUFFER,I,E),o.bindBuffer(o.UNIFORM_BUFFER,null),o.bindBufferBase(o.UNIFORM_BUFFER,b,x),x}function d(){for(let w=0;w<a;w++)if(r.indexOf(w)===-1)return r.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(w){const b=i[w.id],x=w.uniforms,I=w.__cache;o.bindBuffer(o.UNIFORM_BUFFER,b);for(let E=0,A=x.length;E<A;E++){const R=Array.isArray(x[E])?x[E]:[x[E]];for(let y=0,_=R.length;y<_;y++){const P=R[y];if(f(P,E,y,I)===!0){const U=P.__offset,L=Array.isArray(P.value)?P.value:[P.value];let z=0;for(let V=0;V<L.length;V++){const B=L[V],q=v(B);typeof B=="number"||typeof B=="boolean"?(P.__data[0]=B,o.bufferSubData(o.UNIFORM_BUFFER,U+z,P.__data)):B.isMatrix3?(P.__data[0]=B.elements[0],P.__data[1]=B.elements[1],P.__data[2]=B.elements[2],P.__data[3]=0,P.__data[4]=B.elements[3],P.__data[5]=B.elements[4],P.__data[6]=B.elements[5],P.__data[7]=0,P.__data[8]=B.elements[6],P.__data[9]=B.elements[7],P.__data[10]=B.elements[8],P.__data[11]=0):(B.toArray(P.__data,z),z+=q.storage/Float32Array.BYTES_PER_ELEMENT)}o.bufferSubData(o.UNIFORM_BUFFER,U,P.__data)}}}o.bindBuffer(o.UNIFORM_BUFFER,null)}function f(w,b,x,I){const E=w.value,A=b+"_"+x;if(I[A]===void 0)return typeof E=="number"||typeof E=="boolean"?I[A]=E:I[A]=E.clone(),!0;{const R=I[A];if(typeof E=="number"||typeof E=="boolean"){if(R!==E)return I[A]=E,!0}else if(R.equals(E)===!1)return R.copy(E),!0}return!1}function g(w){const b=w.uniforms;let x=0;const I=16;for(let A=0,R=b.length;A<R;A++){const y=Array.isArray(b[A])?b[A]:[b[A]];for(let _=0,P=y.length;_<P;_++){const U=y[_],L=Array.isArray(U.value)?U.value:[U.value];for(let z=0,V=L.length;z<V;z++){const B=L[z],q=v(B),H=x%I,nt=H%q.boundary,st=H+nt;x+=nt,st!==0&&I-st<q.storage&&(x+=I-st),U.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=x,x+=q.storage}}}const E=x%I;return E>0&&(x+=I-E),w.__size=x,w.__cache={},this}function v(w){const b={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(b.boundary=4,b.storage=4):w.isVector2?(b.boundary=8,b.storage=8):w.isVector3||w.isColor?(b.boundary=16,b.storage=12):w.isVector4?(b.boundary=16,b.storage=16):w.isMatrix3?(b.boundary=48,b.storage=48):w.isMatrix4?(b.boundary=64,b.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),b}function p(w){const b=w.target;b.removeEventListener("dispose",p);const x=r.indexOf(b.__bindingPointIndex);r.splice(x,1),o.deleteBuffer(i[b.id]),delete i[b.id],delete s[b.id]}function m(){for(const w in i)o.deleteBuffer(i[w]);r=[],i={},s={}}return{bind:c,update:l,dispose:m}}class C0{constructor(t={}){const{canvas:e=td(),context:n=null,depth:i=!0,stencil:s=!1,alpha:r=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:u=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=r;const g=new Uint32Array(4),v=new Int32Array(4);let p=null,m=null;const w=[],b=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=$e,this.toneMapping=Yn,this.toneMappingExposure=1;const x=this;let I=!1,E=0,A=0,R=null,y=-1,_=null;const P=new he,U=new he;let L=null;const z=new rt(0);let V=0,B=e.width,q=e.height,H=1,nt=null,st=null;const at=new he(0,0,B,q),bt=new he(0,0,B,q);let Zt=!1;const K=new Sa;let ot=!1,wt=!1;this.transmissionResolutionScale=1;const dt=new re,Rt=new re,te=new D,Lt=new he,ye={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ge=!1;function Wt(){return R===null?H:1}let k=n;function tn(S,F){return e.getContext(S,F)}try{const S={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${da}`),e.addEventListener("webglcontextlost",Z,!1),e.addEventListener("webglcontextrestored",pt,!1),e.addEventListener("webglcontextcreationerror",ft,!1),k===null){const F="webgl2";if(k=tn(F,S),k===null)throw tn(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let Xt,qt,Tt,pe,St,C,M,G,j,tt,Y,Mt,ut,vt,Kt,it,_t,It,kt,yt,$t,zt,fe,N;function lt(){Xt=new Fp(k),Xt.init(),zt=new x0(k,Xt),qt=new Pp(k,Xt,t,zt),Tt=new _0(k,Xt),qt.reverseDepthBuffer&&u&&Tt.buffers.depth.setReversed(!0),pe=new Hp(k),St=new o0,C=new y0(k,Xt,Tt,St,qt,zt,pe),M=new Dp(x),G=new Bp(x),j=new qd(k),fe=new Rp(k,j),tt=new Op(k,j,pe,fe),Y=new Vp(k,tt,j,pe),kt=new Gp(k,qt,C),it=new Lp(St),Mt=new s0(x,M,G,Xt,qt,fe,it),ut=new T0(x,St),vt=new a0,Kt=new f0(Xt),It=new Cp(x,M,G,Tt,Y,f,c),_t=new g0(x,Y,qt),N=new A0(k,pe,qt,Tt),yt=new Ip(k,Xt,pe),$t=new zp(k,Xt,pe),pe.programs=Mt.programs,x.capabilities=qt,x.extensions=Xt,x.properties=St,x.renderLists=vt,x.shadowMap=_t,x.state=Tt,x.info=pe}lt();const $=new S0(x,k);this.xr=$,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){const S=Xt.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=Xt.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(S){S!==void 0&&(H=S,this.setSize(B,q,!1))},this.getSize=function(S){return S.set(B,q)},this.setSize=function(S,F,W=!0){if($.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}B=S,q=F,e.width=Math.floor(S*H),e.height=Math.floor(F*H),W===!0&&(e.style.width=S+"px",e.style.height=F+"px"),this.setViewport(0,0,S,F)},this.getDrawingBufferSize=function(S){return S.set(B*H,q*H).floor()},this.setDrawingBufferSize=function(S,F,W){B=S,q=F,H=W,e.width=Math.floor(S*W),e.height=Math.floor(F*W),this.setViewport(0,0,S,F)},this.getCurrentViewport=function(S){return S.copy(P)},this.getViewport=function(S){return S.copy(at)},this.setViewport=function(S,F,W,X){S.isVector4?at.set(S.x,S.y,S.z,S.w):at.set(S,F,W,X),Tt.viewport(P.copy(at).multiplyScalar(H).round())},this.getScissor=function(S){return S.copy(bt)},this.setScissor=function(S,F,W,X){S.isVector4?bt.set(S.x,S.y,S.z,S.w):bt.set(S,F,W,X),Tt.scissor(U.copy(bt).multiplyScalar(H).round())},this.getScissorTest=function(){return Zt},this.setScissorTest=function(S){Tt.setScissorTest(Zt=S)},this.setOpaqueSort=function(S){nt=S},this.setTransparentSort=function(S){st=S},this.getClearColor=function(S){return S.copy(It.getClearColor())},this.setClearColor=function(){It.setClearColor(...arguments)},this.getClearAlpha=function(){return It.getClearAlpha()},this.setClearAlpha=function(){It.setClearAlpha(...arguments)},this.clear=function(S=!0,F=!0,W=!0){let X=0;if(S){let O=!1;if(R!==null){const et=R.texture.format;O=et===ya||et===_a||et===va}if(O){const et=R.texture.type,ht=et===Bn||et===di||et===_s||et===qi||et===pa||et===ma,mt=It.getClearColor(),xt=It.getClearAlpha(),Ut=mt.r,Nt=mt.g,At=mt.b;ht?(g[0]=Ut,g[1]=Nt,g[2]=At,g[3]=xt,k.clearBufferuiv(k.COLOR,0,g)):(v[0]=Ut,v[1]=Nt,v[2]=At,v[3]=xt,k.clearBufferiv(k.COLOR,0,v))}else X|=k.COLOR_BUFFER_BIT}F&&(X|=k.DEPTH_BUFFER_BIT),W&&(X|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Z,!1),e.removeEventListener("webglcontextrestored",pt,!1),e.removeEventListener("webglcontextcreationerror",ft,!1),It.dispose(),vt.dispose(),Kt.dispose(),St.dispose(),M.dispose(),G.dispose(),Y.dispose(),fe.dispose(),N.dispose(),Mt.dispose(),$.dispose(),$.removeEventListener("sessionstart",Na),$.removeEventListener("sessionend",Ba),Zn.stop()};function Z(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),I=!0}function pt(){console.log("THREE.WebGLRenderer: Context Restored."),I=!1;const S=pe.autoReset,F=_t.enabled,W=_t.autoUpdate,X=_t.needsUpdate,O=_t.type;lt(),pe.autoReset=S,_t.enabled=F,_t.autoUpdate=W,_t.needsUpdate=X,_t.type=O}function ft(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Ft(S){const F=S.target;F.removeEventListener("dispose",Ft),ve(F)}function ve(S){Ne(S),St.remove(S)}function Ne(S){const F=St.get(S).programs;F!==void 0&&(F.forEach(function(W){Mt.releaseProgram(W)}),S.isShaderMaterial&&Mt.releaseShaderCache(S))}this.renderBufferDirect=function(S,F,W,X,O,et){F===null&&(F=ye);const ht=O.isMesh&&O.matrixWorld.determinant()<0,mt=ch(S,F,W,X,O);Tt.setMaterial(X,ht);let xt=W.index,Ut=1;if(X.wireframe===!0){if(xt=tt.getWireframeAttribute(W),xt===void 0)return;Ut=2}const Nt=W.drawRange,At=W.attributes.position;let jt=Nt.start*Ut,ne=(Nt.start+Nt.count)*Ut;et!==null&&(jt=Math.max(jt,et.start*Ut),ne=Math.min(ne,(et.start+et.count)*Ut)),xt!==null?(jt=Math.max(jt,0),ne=Math.min(ne,xt.count)):At!=null&&(jt=Math.max(jt,0),ne=Math.min(ne,At.count));const Me=ne-jt;if(Me<0||Me===1/0)return;fe.setup(O,X,mt,W,xt);let _e,Jt=yt;if(xt!==null&&(_e=j.get(xt),Jt=$t,Jt.setIndex(_e)),O.isMesh)X.wireframe===!0?(Tt.setLineWidth(X.wireframeLinewidth*Wt()),Jt.setMode(k.LINES)):Jt.setMode(k.TRIANGLES);else if(O.isLine){let Ct=X.linewidth;Ct===void 0&&(Ct=1),Tt.setLineWidth(Ct*Wt()),O.isLineSegments?Jt.setMode(k.LINES):O.isLineLoop?Jt.setMode(k.LINE_LOOP):Jt.setMode(k.LINE_STRIP)}else O.isPoints?Jt.setMode(k.POINTS):O.isSprite&&Jt.setMode(k.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)oi("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Jt.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(Xt.get("WEBGL_multi_draw"))Jt.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const Ct=O._multiDrawStarts,Le=O._multiDrawCounts,ie=O._multiDrawCount,un=xt?j.get(xt).bytesPerElement:1,mi=St.get(X).currentProgram.getUniforms();for(let Ke=0;Ke<ie;Ke++)mi.setValue(k,"_gl_DrawID",Ke),Jt.render(Ct[Ke]/un,Le[Ke])}else if(O.isInstancedMesh)Jt.renderInstances(jt,Me,O.count);else if(W.isInstancedBufferGeometry){const Ct=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,Le=Math.min(W.instanceCount,Ct);Jt.renderInstances(jt,Me,Le)}else Jt.render(jt,Me)};function ae(S,F,W){S.transparent===!0&&S.side===de&&S.forceSinglePass===!1?(S.side=Xe,S.needsUpdate=!0,bs(S,F,W),S.side=jn,S.needsUpdate=!0,bs(S,F,W),S.side=de):bs(S,F,W)}this.compile=function(S,F,W=null){W===null&&(W=S),m=Kt.get(W),m.init(F),b.push(m),W.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(m.pushLight(O),O.castShadow&&m.pushShadow(O))}),S!==W&&S.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(m.pushLight(O),O.castShadow&&m.pushShadow(O))}),m.setupLights();const X=new Set;return S.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const et=O.material;if(et)if(Array.isArray(et))for(let ht=0;ht<et.length;ht++){const mt=et[ht];ae(mt,W,O),X.add(mt)}else ae(et,W,O),X.add(et)}),m=b.pop(),X},this.compileAsync=function(S,F,W=null){const X=this.compile(S,F,W);return new Promise(O=>{function et(){if(X.forEach(function(ht){St.get(ht).currentProgram.isReady()&&X.delete(ht)}),X.size===0){O(S);return}setTimeout(et,10)}Xt.get("KHR_parallel_shader_compile")!==null?et():setTimeout(et,10)})};let dn=null;function An(S){dn&&dn(S)}function Na(){Zn.stop()}function Ba(){Zn.start()}const Zn=new Ol;Zn.setAnimationLoop(An),typeof self<"u"&&Zn.setContext(self),this.setAnimationLoop=function(S){dn=S,$.setAnimationLoop(S),S===null?Zn.stop():Zn.start()},$.addEventListener("sessionstart",Na),$.addEventListener("sessionend",Ba),this.render=function(S,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),$.enabled===!0&&$.isPresenting===!0&&($.cameraAutoUpdate===!0&&$.updateCamera(F),F=$.getCamera()),S.isScene===!0&&S.onBeforeRender(x,S,F,R),m=Kt.get(S,b.length),m.init(F),b.push(m),Rt.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),K.setFromProjectionMatrix(Rt),wt=this.localClippingEnabled,ot=it.init(this.clippingPlanes,wt),p=vt.get(S,w.length),p.init(),w.push(p),$.enabled===!0&&$.isPresenting===!0){const et=x.xr.getDepthSensingMesh();et!==null&&Ro(et,F,-1/0,x.sortObjects)}Ro(S,F,0,x.sortObjects),p.finish(),x.sortObjects===!0&&p.sort(nt,st),ge=$.enabled===!1||$.isPresenting===!1||$.hasDepthSensing()===!1,ge&&It.addToRenderList(p,S),this.info.render.frame++,ot===!0&&it.beginShadows();const W=m.state.shadowsArray;_t.render(W,S,F),ot===!0&&it.endShadows(),this.info.autoReset===!0&&this.info.reset();const X=p.opaque,O=p.transmissive;if(m.setupLights(),F.isArrayCamera){const et=F.cameras;if(O.length>0)for(let ht=0,mt=et.length;ht<mt;ht++){const xt=et[ht];Oa(X,O,S,xt)}ge&&It.render(S);for(let ht=0,mt=et.length;ht<mt;ht++){const xt=et[ht];Fa(p,S,xt,xt.viewport)}}else O.length>0&&Oa(X,O,S,F),ge&&It.render(S),Fa(p,S,F);R!==null&&A===0&&(C.updateMultisampleRenderTarget(R),C.updateRenderTargetMipmap(R)),S.isScene===!0&&S.onAfterRender(x,S,F),fe.resetDefaultState(),y=-1,_=null,b.pop(),b.length>0?(m=b[b.length-1],ot===!0&&it.setGlobalState(x.clippingPlanes,m.state.camera)):m=null,w.pop(),w.length>0?p=w[w.length-1]:p=null};function Ro(S,F,W,X){if(S.visible===!1)return;if(S.layers.test(F.layers)){if(S.isGroup)W=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(F);else if(S.isLight)m.pushLight(S),S.castShadow&&m.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||K.intersectsSprite(S)){X&&Lt.setFromMatrixPosition(S.matrixWorld).applyMatrix4(Rt);const ht=Y.update(S),mt=S.material;mt.visible&&p.push(S,ht,mt,W,Lt.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||K.intersectsObject(S))){const ht=Y.update(S),mt=S.material;if(X&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Lt.copy(S.boundingSphere.center)):(ht.boundingSphere===null&&ht.computeBoundingSphere(),Lt.copy(ht.boundingSphere.center)),Lt.applyMatrix4(S.matrixWorld).applyMatrix4(Rt)),Array.isArray(mt)){const xt=ht.groups;for(let Ut=0,Nt=xt.length;Ut<Nt;Ut++){const At=xt[Ut],jt=mt[At.materialIndex];jt&&jt.visible&&p.push(S,ht,jt,W,Lt.z,At)}}else mt.visible&&p.push(S,ht,mt,W,Lt.z,null)}}const et=S.children;for(let ht=0,mt=et.length;ht<mt;ht++)Ro(et[ht],F,W,X)}function Fa(S,F,W,X){const O=S.opaque,et=S.transmissive,ht=S.transparent;m.setupLightsView(W),ot===!0&&it.setGlobalState(x.clippingPlanes,W),X&&Tt.viewport(P.copy(X)),O.length>0&&Ms(O,F,W),et.length>0&&Ms(et,F,W),ht.length>0&&Ms(ht,F,W),Tt.buffers.depth.setTest(!0),Tt.buffers.depth.setMask(!0),Tt.buffers.color.setMask(!0),Tt.setPolygonOffset(!1)}function Oa(S,F,W,X){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[X.id]===void 0&&(m.state.transmissionRenderTarget[X.id]=new ui(1,1,{generateMipmaps:!0,type:Xt.has("EXT_color_buffer_half_float")||Xt.has("EXT_color_buffer_float")?ys:Bn,minFilter:li,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Qt.workingColorSpace}));const et=m.state.transmissionRenderTarget[X.id],ht=X.viewport||P;et.setSize(ht.z*x.transmissionResolutionScale,ht.w*x.transmissionResolutionScale);const mt=x.getRenderTarget();x.setRenderTarget(et),x.getClearColor(z),V=x.getClearAlpha(),V<1&&x.setClearColor(16777215,.5),x.clear(),ge&&It.render(W);const xt=x.toneMapping;x.toneMapping=Yn;const Ut=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),m.setupLightsView(X),ot===!0&&it.setGlobalState(x.clippingPlanes,X),Ms(S,W,X),C.updateMultisampleRenderTarget(et),C.updateRenderTargetMipmap(et),Xt.has("WEBGL_multisampled_render_to_texture")===!1){let Nt=!1;for(let At=0,jt=F.length;At<jt;At++){const ne=F[At],Me=ne.object,_e=ne.geometry,Jt=ne.material,Ct=ne.group;if(Jt.side===de&&Me.layers.test(X.layers)){const Le=Jt.side;Jt.side=Xe,Jt.needsUpdate=!0,za(Me,W,X,_e,Jt,Ct),Jt.side=Le,Jt.needsUpdate=!0,Nt=!0}}Nt===!0&&(C.updateMultisampleRenderTarget(et),C.updateRenderTargetMipmap(et))}x.setRenderTarget(mt),x.setClearColor(z,V),Ut!==void 0&&(X.viewport=Ut),x.toneMapping=xt}function Ms(S,F,W){const X=F.isScene===!0?F.overrideMaterial:null;for(let O=0,et=S.length;O<et;O++){const ht=S[O],mt=ht.object,xt=ht.geometry,Ut=X===null?ht.material:X,Nt=ht.group;mt.layers.test(W.layers)&&za(mt,F,W,xt,Ut,Nt)}}function za(S,F,W,X,O,et){S.onBeforeRender(x,F,W,X,O,et),S.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),O.onBeforeRender(x,F,W,X,S,et),O.transparent===!0&&O.side===de&&O.forceSinglePass===!1?(O.side=Xe,O.needsUpdate=!0,x.renderBufferDirect(W,F,X,O,S,et),O.side=jn,O.needsUpdate=!0,x.renderBufferDirect(W,F,X,O,S,et),O.side=de):x.renderBufferDirect(W,F,X,O,S,et),S.onAfterRender(x,F,W,X,O,et)}function bs(S,F,W){F.isScene!==!0&&(F=ye);const X=St.get(S),O=m.state.lights,et=m.state.shadowsArray,ht=O.state.version,mt=Mt.getParameters(S,O.state,et,F,W),xt=Mt.getProgramCacheKey(mt);let Ut=X.programs;X.environment=S.isMeshStandardMaterial?F.environment:null,X.fog=F.fog,X.envMap=(S.isMeshStandardMaterial?G:M).get(S.envMap||X.environment),X.envMapRotation=X.environment!==null&&S.envMap===null?F.environmentRotation:S.envMapRotation,Ut===void 0&&(S.addEventListener("dispose",Ft),Ut=new Map,X.programs=Ut);let Nt=Ut.get(xt);if(Nt!==void 0){if(X.currentProgram===Nt&&X.lightsStateVersion===ht)return Ga(S,mt),Nt}else mt.uniforms=Mt.getUniforms(S),S.onBeforeCompile(mt,x),Nt=Mt.acquireProgram(mt,xt),Ut.set(xt,Nt),X.uniforms=mt.uniforms;const At=X.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(At.clippingPlanes=it.uniform),Ga(S,mt),X.needsLights=hh(S),X.lightsStateVersion=ht,X.needsLights&&(At.ambientLightColor.value=O.state.ambient,At.lightProbe.value=O.state.probe,At.directionalLights.value=O.state.directional,At.directionalLightShadows.value=O.state.directionalShadow,At.spotLights.value=O.state.spot,At.spotLightShadows.value=O.state.spotShadow,At.rectAreaLights.value=O.state.rectArea,At.ltc_1.value=O.state.rectAreaLTC1,At.ltc_2.value=O.state.rectAreaLTC2,At.pointLights.value=O.state.point,At.pointLightShadows.value=O.state.pointShadow,At.hemisphereLights.value=O.state.hemi,At.directionalShadowMap.value=O.state.directionalShadowMap,At.directionalShadowMatrix.value=O.state.directionalShadowMatrix,At.spotShadowMap.value=O.state.spotShadowMap,At.spotLightMatrix.value=O.state.spotLightMatrix,At.spotLightMap.value=O.state.spotLightMap,At.pointShadowMap.value=O.state.pointShadowMap,At.pointShadowMatrix.value=O.state.pointShadowMatrix),X.currentProgram=Nt,X.uniformsList=null,Nt}function Ha(S){if(S.uniformsList===null){const F=S.currentProgram.getUniforms();S.uniformsList=ro.seqWithValue(F.seq,S.uniforms)}return S.uniformsList}function Ga(S,F){const W=St.get(S);W.outputColorSpace=F.outputColorSpace,W.batching=F.batching,W.batchingColor=F.batchingColor,W.instancing=F.instancing,W.instancingColor=F.instancingColor,W.instancingMorph=F.instancingMorph,W.skinning=F.skinning,W.morphTargets=F.morphTargets,W.morphNormals=F.morphNormals,W.morphColors=F.morphColors,W.morphTargetsCount=F.morphTargetsCount,W.numClippingPlanes=F.numClippingPlanes,W.numIntersection=F.numClipIntersection,W.vertexAlphas=F.vertexAlphas,W.vertexTangents=F.vertexTangents,W.toneMapping=F.toneMapping}function ch(S,F,W,X,O){F.isScene!==!0&&(F=ye),C.resetTextureUnits();const et=F.fog,ht=X.isMeshStandardMaterial?F.environment:null,mt=R===null?x.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:Yi,xt=(X.isMeshStandardMaterial?G:M).get(X.envMap||ht),Ut=X.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Nt=!!W.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),At=!!W.morphAttributes.position,jt=!!W.morphAttributes.normal,ne=!!W.morphAttributes.color;let Me=Yn;X.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(Me=x.toneMapping);const _e=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,Jt=_e!==void 0?_e.length:0,Ct=St.get(X),Le=m.state.lights;if(ot===!0&&(wt===!0||S!==_)){const ze=S===_&&X.id===y;it.setState(X,S,ze)}let ie=!1;X.version===Ct.__version?(Ct.needsLights&&Ct.lightsStateVersion!==Le.state.version||Ct.outputColorSpace!==mt||O.isBatchedMesh&&Ct.batching===!1||!O.isBatchedMesh&&Ct.batching===!0||O.isBatchedMesh&&Ct.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&Ct.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&Ct.instancing===!1||!O.isInstancedMesh&&Ct.instancing===!0||O.isSkinnedMesh&&Ct.skinning===!1||!O.isSkinnedMesh&&Ct.skinning===!0||O.isInstancedMesh&&Ct.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Ct.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Ct.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Ct.instancingMorph===!1&&O.morphTexture!==null||Ct.envMap!==xt||X.fog===!0&&Ct.fog!==et||Ct.numClippingPlanes!==void 0&&(Ct.numClippingPlanes!==it.numPlanes||Ct.numIntersection!==it.numIntersection)||Ct.vertexAlphas!==Ut||Ct.vertexTangents!==Nt||Ct.morphTargets!==At||Ct.morphNormals!==jt||Ct.morphColors!==ne||Ct.toneMapping!==Me||Ct.morphTargetsCount!==Jt)&&(ie=!0):(ie=!0,Ct.__version=X.version);let un=Ct.currentProgram;ie===!0&&(un=bs(X,F,O));let mi=!1,Ke=!1,Qi=!1;const me=un.getUniforms(),en=Ct.uniforms;if(Tt.useProgram(un.program)&&(mi=!0,Ke=!0,Qi=!0),X.id!==y&&(y=X.id,Ke=!0),mi||_!==S){Tt.buffers.depth.getReversed()?(dt.copy(S.projectionMatrix),nd(dt),id(dt),me.setValue(k,"projectionMatrix",dt)):me.setValue(k,"projectionMatrix",S.projectionMatrix),me.setValue(k,"viewMatrix",S.matrixWorldInverse);const qe=me.map.cameraPosition;qe!==void 0&&qe.setValue(k,te.setFromMatrixPosition(S.matrixWorld)),qt.logarithmicDepthBuffer&&me.setValue(k,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&me.setValue(k,"isOrthographic",S.isOrthographicCamera===!0),_!==S&&(_=S,Ke=!0,Qi=!0)}if(O.isSkinnedMesh){me.setOptional(k,O,"bindMatrix"),me.setOptional(k,O,"bindMatrixInverse");const ze=O.skeleton;ze&&(ze.boneTexture===null&&ze.computeBoneTexture(),me.setValue(k,"boneTexture",ze.boneTexture,C))}O.isBatchedMesh&&(me.setOptional(k,O,"batchingTexture"),me.setValue(k,"batchingTexture",O._matricesTexture,C),me.setOptional(k,O,"batchingIdTexture"),me.setValue(k,"batchingIdTexture",O._indirectTexture,C),me.setOptional(k,O,"batchingColorTexture"),O._colorsTexture!==null&&me.setValue(k,"batchingColorTexture",O._colorsTexture,C));const nn=W.morphAttributes;if((nn.position!==void 0||nn.normal!==void 0||nn.color!==void 0)&&kt.update(O,W,un),(Ke||Ct.receiveShadow!==O.receiveShadow)&&(Ct.receiveShadow=O.receiveShadow,me.setValue(k,"receiveShadow",O.receiveShadow)),X.isMeshGouraudMaterial&&X.envMap!==null&&(en.envMap.value=xt,en.flipEnvMap.value=xt.isCubeTexture&&xt.isRenderTargetTexture===!1?-1:1),X.isMeshStandardMaterial&&X.envMap===null&&F.environment!==null&&(en.envMapIntensity.value=F.environmentIntensity),Ke&&(me.setValue(k,"toneMappingExposure",x.toneMappingExposure),Ct.needsLights&&lh(en,Qi),et&&X.fog===!0&&ut.refreshFogUniforms(en,et),ut.refreshMaterialUniforms(en,X,H,q,m.state.transmissionRenderTarget[S.id]),ro.upload(k,Ha(Ct),en,C)),X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(ro.upload(k,Ha(Ct),en,C),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&me.setValue(k,"center",O.center),me.setValue(k,"modelViewMatrix",O.modelViewMatrix),me.setValue(k,"normalMatrix",O.normalMatrix),me.setValue(k,"modelMatrix",O.matrixWorld),X.isShaderMaterial||X.isRawShaderMaterial){const ze=X.uniformsGroups;for(let qe=0,Io=ze.length;qe<Io;qe++){const Jn=ze[qe];N.update(Jn,un),N.bind(Jn,un)}}return un}function lh(S,F){S.ambientLightColor.needsUpdate=F,S.lightProbe.needsUpdate=F,S.directionalLights.needsUpdate=F,S.directionalLightShadows.needsUpdate=F,S.pointLights.needsUpdate=F,S.pointLightShadows.needsUpdate=F,S.spotLights.needsUpdate=F,S.spotLightShadows.needsUpdate=F,S.rectAreaLights.needsUpdate=F,S.hemisphereLights.needsUpdate=F}function hh(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(S,F,W){St.get(S.texture).__webglTexture=F,St.get(S.depthTexture).__webglTexture=W;const X=St.get(S);X.__hasExternalTextures=!0,X.__autoAllocateDepthBuffer=W===void 0,X.__autoAllocateDepthBuffer||Xt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),X.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(S,F){const W=St.get(S);W.__webglFramebuffer=F,W.__useDefaultFramebuffer=F===void 0};const dh=k.createFramebuffer();this.setRenderTarget=function(S,F=0,W=0){R=S,E=F,A=W;let X=!0,O=null,et=!1,ht=!1;if(S){const xt=St.get(S);if(xt.__useDefaultFramebuffer!==void 0)Tt.bindFramebuffer(k.FRAMEBUFFER,null),X=!1;else if(xt.__webglFramebuffer===void 0)C.setupRenderTarget(S);else if(xt.__hasExternalTextures)C.rebindTextures(S,St.get(S.texture).__webglTexture,St.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const At=S.depthTexture;if(xt.__boundDepthTexture!==At){if(At!==null&&St.has(At)&&(S.width!==At.image.width||S.height!==At.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");C.setupDepthRenderbuffer(S)}}const Ut=S.texture;(Ut.isData3DTexture||Ut.isDataArrayTexture||Ut.isCompressedArrayTexture)&&(ht=!0);const Nt=St.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Nt[F])?O=Nt[F][W]:O=Nt[F],et=!0):S.samples>0&&C.useMultisampledRTT(S)===!1?O=St.get(S).__webglMultisampledFramebuffer:Array.isArray(Nt)?O=Nt[W]:O=Nt,P.copy(S.viewport),U.copy(S.scissor),L=S.scissorTest}else P.copy(at).multiplyScalar(H).floor(),U.copy(bt).multiplyScalar(H).floor(),L=Zt;if(W!==0&&(O=dh),Tt.bindFramebuffer(k.FRAMEBUFFER,O)&&X&&Tt.drawBuffers(S,O),Tt.viewport(P),Tt.scissor(U),Tt.setScissorTest(L),et){const xt=St.get(S.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+F,xt.__webglTexture,W)}else if(ht){const xt=St.get(S.texture),Ut=F;k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,xt.__webglTexture,W,Ut)}else if(S!==null&&W!==0){const xt=St.get(S.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,xt.__webglTexture,W)}y=-1},this.readRenderTargetPixels=function(S,F,W,X,O,et,ht){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let mt=St.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ht!==void 0&&(mt=mt[ht]),mt){Tt.bindFramebuffer(k.FRAMEBUFFER,mt);try{const xt=S.texture,Ut=xt.format,Nt=xt.type;if(!qt.textureFormatReadable(Ut)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!qt.textureTypeReadable(Nt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=S.width-X&&W>=0&&W<=S.height-O&&k.readPixels(F,W,X,O,zt.convert(Ut),zt.convert(Nt),et)}finally{const xt=R!==null?St.get(R).__webglFramebuffer:null;Tt.bindFramebuffer(k.FRAMEBUFFER,xt)}}},this.readRenderTargetPixelsAsync=async function(S,F,W,X,O,et,ht){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let mt=St.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ht!==void 0&&(mt=mt[ht]),mt){const xt=S.texture,Ut=xt.format,Nt=xt.type;if(!qt.textureFormatReadable(Ut))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!qt.textureTypeReadable(Nt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(F>=0&&F<=S.width-X&&W>=0&&W<=S.height-O){Tt.bindFramebuffer(k.FRAMEBUFFER,mt);const At=k.createBuffer();k.bindBuffer(k.PIXEL_PACK_BUFFER,At),k.bufferData(k.PIXEL_PACK_BUFFER,et.byteLength,k.STREAM_READ),k.readPixels(F,W,X,O,zt.convert(Ut),zt.convert(Nt),0);const jt=R!==null?St.get(R).__webglFramebuffer:null;Tt.bindFramebuffer(k.FRAMEBUFFER,jt);const ne=k.fenceSync(k.SYNC_GPU_COMMANDS_COMPLETE,0);return k.flush(),await ed(k,ne,4),k.bindBuffer(k.PIXEL_PACK_BUFFER,At),k.getBufferSubData(k.PIXEL_PACK_BUFFER,0,et),k.deleteBuffer(At),k.deleteSync(ne),et}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(S,F=null,W=0){S.isTexture!==!0&&(oi("WebGLRenderer: copyFramebufferToTexture function signature has changed."),F=arguments[0]||null,S=arguments[1]);const X=Math.pow(2,-W),O=Math.floor(S.image.width*X),et=Math.floor(S.image.height*X),ht=F!==null?F.x:0,mt=F!==null?F.y:0;C.setTexture2D(S,0),k.copyTexSubImage2D(k.TEXTURE_2D,W,0,0,ht,mt,O,et),Tt.unbindTexture()};const uh=k.createFramebuffer(),fh=k.createFramebuffer();this.copyTextureToTexture=function(S,F,W=null,X=null,O=0,et=null){S.isTexture!==!0&&(oi("WebGLRenderer: copyTextureToTexture function signature has changed."),X=arguments[0]||null,S=arguments[1],F=arguments[2],et=arguments[3]||0,W=null),et===null&&(O!==0?(oi("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),et=O,O=0):et=0);let ht,mt,xt,Ut,Nt,At,jt,ne,Me;const _e=S.isCompressedTexture?S.mipmaps[et]:S.image;if(W!==null)ht=W.max.x-W.min.x,mt=W.max.y-W.min.y,xt=W.isBox3?W.max.z-W.min.z:1,Ut=W.min.x,Nt=W.min.y,At=W.isBox3?W.min.z:0;else{const nn=Math.pow(2,-O);ht=Math.floor(_e.width*nn),mt=Math.floor(_e.height*nn),S.isDataArrayTexture?xt=_e.depth:S.isData3DTexture?xt=Math.floor(_e.depth*nn):xt=1,Ut=0,Nt=0,At=0}X!==null?(jt=X.x,ne=X.y,Me=X.z):(jt=0,ne=0,Me=0);const Jt=zt.convert(F.format),Ct=zt.convert(F.type);let Le;F.isData3DTexture?(C.setTexture3D(F,0),Le=k.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(C.setTexture2DArray(F,0),Le=k.TEXTURE_2D_ARRAY):(C.setTexture2D(F,0),Le=k.TEXTURE_2D),k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,F.flipY),k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),k.pixelStorei(k.UNPACK_ALIGNMENT,F.unpackAlignment);const ie=k.getParameter(k.UNPACK_ROW_LENGTH),un=k.getParameter(k.UNPACK_IMAGE_HEIGHT),mi=k.getParameter(k.UNPACK_SKIP_PIXELS),Ke=k.getParameter(k.UNPACK_SKIP_ROWS),Qi=k.getParameter(k.UNPACK_SKIP_IMAGES);k.pixelStorei(k.UNPACK_ROW_LENGTH,_e.width),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,_e.height),k.pixelStorei(k.UNPACK_SKIP_PIXELS,Ut),k.pixelStorei(k.UNPACK_SKIP_ROWS,Nt),k.pixelStorei(k.UNPACK_SKIP_IMAGES,At);const me=S.isDataArrayTexture||S.isData3DTexture,en=F.isDataArrayTexture||F.isData3DTexture;if(S.isDepthTexture){const nn=St.get(S),ze=St.get(F),qe=St.get(nn.__renderTarget),Io=St.get(ze.__renderTarget);Tt.bindFramebuffer(k.READ_FRAMEBUFFER,qe.__webglFramebuffer),Tt.bindFramebuffer(k.DRAW_FRAMEBUFFER,Io.__webglFramebuffer);for(let Jn=0;Jn<xt;Jn++)me&&(k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,St.get(S).__webglTexture,O,At+Jn),k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,St.get(F).__webglTexture,et,Me+Jn)),k.blitFramebuffer(Ut,Nt,ht,mt,jt,ne,ht,mt,k.DEPTH_BUFFER_BIT,k.NEAREST);Tt.bindFramebuffer(k.READ_FRAMEBUFFER,null),Tt.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else if(O!==0||S.isRenderTargetTexture||St.has(S)){const nn=St.get(S),ze=St.get(F);Tt.bindFramebuffer(k.READ_FRAMEBUFFER,uh),Tt.bindFramebuffer(k.DRAW_FRAMEBUFFER,fh);for(let qe=0;qe<xt;qe++)me?k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,nn.__webglTexture,O,At+qe):k.framebufferTexture2D(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,nn.__webglTexture,O),en?k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,ze.__webglTexture,et,Me+qe):k.framebufferTexture2D(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,ze.__webglTexture,et),O!==0?k.blitFramebuffer(Ut,Nt,ht,mt,jt,ne,ht,mt,k.COLOR_BUFFER_BIT,k.NEAREST):en?k.copyTexSubImage3D(Le,et,jt,ne,Me+qe,Ut,Nt,ht,mt):k.copyTexSubImage2D(Le,et,jt,ne,Ut,Nt,ht,mt);Tt.bindFramebuffer(k.READ_FRAMEBUFFER,null),Tt.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else en?S.isDataTexture||S.isData3DTexture?k.texSubImage3D(Le,et,jt,ne,Me,ht,mt,xt,Jt,Ct,_e.data):F.isCompressedArrayTexture?k.compressedTexSubImage3D(Le,et,jt,ne,Me,ht,mt,xt,Jt,_e.data):k.texSubImage3D(Le,et,jt,ne,Me,ht,mt,xt,Jt,Ct,_e):S.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,et,jt,ne,ht,mt,Jt,Ct,_e.data):S.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,et,jt,ne,_e.width,_e.height,Jt,_e.data):k.texSubImage2D(k.TEXTURE_2D,et,jt,ne,ht,mt,Jt,Ct,_e);k.pixelStorei(k.UNPACK_ROW_LENGTH,ie),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,un),k.pixelStorei(k.UNPACK_SKIP_PIXELS,mi),k.pixelStorei(k.UNPACK_SKIP_ROWS,Ke),k.pixelStorei(k.UNPACK_SKIP_IMAGES,Qi),et===0&&F.generateMipmaps&&k.generateMipmap(Le),Tt.unbindTexture()},this.copyTextureToTexture3D=function(S,F,W=null,X=null,O=0){return S.isTexture!==!0&&(oi("WebGLRenderer: copyTextureToTexture3D function signature has changed."),W=arguments[0]||null,X=arguments[1]||null,S=arguments[2],F=arguments[3],O=arguments[4]||0),oi('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(S,F,W,X,O)},this.initRenderTarget=function(S){St.get(S).__webglFramebuffer===void 0&&C.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?C.setTextureCube(S,0):S.isData3DTexture?C.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?C.setTexture2DArray(S,0):C.setTexture2D(S,0),Tt.unbindTexture()},this.resetState=function(){E=0,A=0,R=null,Tt.reset(),fe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Un}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=Qt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Qt._getUnpackColorSpace()}}function Ia(o){let t=o>>>0;return()=>{t|=0,t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Bt(o,t,e){return o<t?t:o>e?e:o}function gn(o,t,e){return o+(t-o)*e}function Te(o,t,e){const n=Bt((e-o)/(t-o),0,1);return n*n*(3-2*n)}const R0=.5*(Math.sqrt(3)-1),ds=(3-Math.sqrt(3))/6,dr=[[1,1],[-1,1],[1,-1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1]];class us{perm;permMod8;constructor(t){const e=Ia(t),n=new Uint8Array(256);for(let i=0;i<256;i++)n[i]=i;for(let i=255;i>0;i--){const s=Math.floor(e()*(i+1)),r=n[i];n[i]=n[s],n[s]=r}this.perm=new Uint8Array(512),this.permMod8=new Uint8Array(512);for(let i=0;i<512;i++)this.perm[i]=n[i&255],this.permMod8[i]=this.perm[i]&7}noise2D(t,e){let n=0,i=0,s=0;const r=(t+e)*R0,a=Math.floor(t+r),c=Math.floor(e+r),l=(a+c)*ds,h=a-l,d=c-l,u=t-h,f=e-d;let g,v;u>f?(g=1,v=0):(g=0,v=1);const p=u-g+ds,m=f-v+ds,w=u-1+2*ds,b=f-1+2*ds,x=a&255,I=c&255,E=this.permMod8[x+this.perm[I]],A=this.permMod8[x+g+this.perm[I+v]],R=this.permMod8[x+1+this.perm[I+1]];let y=.5-u*u-f*f;if(y>=0){y*=y;const U=dr[E];n=y*y*(U[0]*u+U[1]*f)}let _=.5-p*p-m*m;if(_>=0){_*=_;const U=dr[A];i=_*_*(U[0]*p+U[1]*m)}let P=.5-w*w-b*b;if(P>=0){P*=P;const U=dr[R];s=P*P*(U[0]*w+U[1]*b)}return 70*(n+i+s)}fbm(t,e,n=4,i=2,s=.5){let r=0,a=.5,c=1,l=0;for(let h=0;h<n;h++)r+=a*this.noise2D(t*c,e*c),l+=a,c*=i,a*=s;return r/l}ridged(t,e,n=4){let i=0,s=.5,r=1,a=0;for(let c=0;c<n;c++){const l=1-Math.abs(this.noise2D(t*r,e*r));i+=s*l*l,a+=s,r*=2.05,s*=.5}return i/a}}const bn=440,Fi=bn/2,Pt=0,I0=-.65,oa={pine_tree:{kind:"pine_tree",maxHp:90,minToolTier:0,preferredTool:"axe",drops:[{itemId:"wood",min:5,max:8},{itemId:"resin",min:1,max:2,chance:.6}],respawnSec:210,radius:.85},oak_tree:{kind:"oak_tree",maxHp:110,minToolTier:0,preferredTool:"axe",drops:[{itemId:"wood",min:6,max:10},{itemId:"fiber",min:1,max:3,chance:.5}],respawnSec:240,radius:.95},birch_tree:{kind:"birch_tree",maxHp:75,minToolTier:0,preferredTool:"axe",drops:[{itemId:"wood",min:4,max:7},{itemId:"fiber",min:1,max:2,chance:.65}],respawnSec:180,radius:.72},palm_tree:{kind:"palm_tree",maxHp:70,minToolTier:0,preferredTool:"axe",drops:[{itemId:"wood",min:4,max:6},{itemId:"coconut",min:1,max:2,chance:.85}],respawnSec:180,radius:.7},marsh_tree:{kind:"marsh_tree",maxHp:95,minToolTier:0,preferredTool:"axe",drops:[{itemId:"wood",min:5,max:7},{itemId:"resin",min:1,max:3,chance:.75}],respawnSec:220,radius:.9},stone_boulder:{kind:"stone_boulder",maxHp:100,minToolTier:0,preferredTool:"pickaxe",drops:[{itemId:"stone",min:5,max:8},{itemId:"flint",min:1,max:3,chance:.75}],respawnSec:200,radius:1.15},copper_vein:{kind:"copper_vein",maxHp:135,minToolTier:1,preferredTool:"pickaxe",drops:[{itemId:"copper_ore",min:3,max:5},{itemId:"stone",min:2,max:4}],respawnSec:260,radius:1.2},iron_vein:{kind:"iron_vein",maxHp:180,minToolTier:1,preferredTool:"pickaxe",drops:[{itemId:"iron_ore",min:3,max:5},{itemId:"stone",min:2,max:3},{itemId:"coal",min:1,max:2,chance:.6}],respawnSec:300,radius:1.25},obsidian_vein:{kind:"obsidian_vein",maxHp:240,minToolTier:2,preferredTool:"pickaxe",drops:[{itemId:"obsidian",min:2,max:4},{itemId:"coal",min:2,max:3}],respawnSec:360,radius:1.3},ancient_crystal:{kind:"ancient_crystal",maxHp:210,minToolTier:2,preferredTool:"pickaxe",drops:[{itemId:"ancient_shard",min:2,max:3},{itemId:"flint",min:1,max:2}],respawnSec:420,radius:1},berry_bush:{kind:"berry_bush",maxHp:25,minToolTier:0,preferredTool:"hand",drops:[{itemId:"berries",min:3,max:5},{itemId:"fiber",min:1,max:2,chance:.7}],respawnSec:120,radius:.7},fiber_reed:{kind:"fiber_reed",maxHp:20,minToolTier:0,preferredTool:"hand",drops:[{itemId:"fiber",min:3,max:6}],respawnSec:100,radius:.6},mushroom_cluster:{kind:"mushroom_cluster",maxHp:18,minToolTier:0,preferredTool:"hand",drops:[{itemId:"mushroom",min:2,max:4}],respawnSec:130,radius:.55},driftwood:{kind:"driftwood",maxHp:35,minToolTier:0,preferredTool:"hand",drops:[{itemId:"wood",min:3,max:5},{itemId:"fiber",min:1,max:2,chance:.5}],respawnSec:150,radius:.85},supply_crate:{kind:"supply_crate",maxHp:45,minToolTier:0,preferredTool:"axe",drops:[{itemId:"wood",min:3,max:6},{itemId:"iron_ingot",min:1,max:2,chance:.55},{itemId:"bandage",min:1,max:2,chance:.7},{itemId:"cooked_meat",min:1,max:2,chance:.65},{itemId:"rope",min:1,max:2,chance:.8}],respawnSec:320,radius:.85},coral_reef_node:{kind:"coral_reef_node",maxHp:55,minToolTier:0,preferredTool:"pickaxe",drops:[{itemId:"sea_pearl",min:1,max:2},{itemId:"flint",min:1,max:2,chance:.65}],respawnSec:210,radius:.85},sunbloom_flower:{kind:"sunbloom_flower",maxHp:22,minToolTier:0,preferredTool:"hand",drops:[{itemId:"sunbloom",min:2,max:4},{itemId:"fiber",min:1,max:2,chance:.5}],respawnSec:140,radius:.55},sunken_wreck_chest:{kind:"sunken_wreck_chest",maxHp:65,minToolTier:0,preferredTool:"axe",drops:[{itemId:"gold_coin",min:3,max:8},{itemId:"iron_ingot",min:1,max:3,chance:.85},{itemId:"sea_pearl",min:1,max:2,chance:.75},{itemId:"rope",min:2,max:3,chance:.8},{itemId:"seafarer_chowder",min:1,max:1,chance:.55}],respawnSec:380,radius:.95}};class Wl{seed;elevationNoise;detailNoise;ridgeNoise;moistureNoise;shapeNoise;landmarks;constructor(t){this.seed=t,this.elevationNoise=new us(t+101),this.detailNoise=new us(t+202),this.ridgeNoise=new us(t+303),this.moistureNoise=new us(t+404),this.shapeNoise=new us(t+505),this.landmarks=[{id:"lm_sanctuary",name:"Runestone Sanctuary",kind:"sanctuary",x:-10,z:18,radius:13},{id:"lm_spring",name:"Crystal Spring",kind:"spring",x:16,z:8,radius:11},{id:"lm_shipwreck",name:"Wreck of the Dawnbreaker",kind:"shipwreck",x:-14,z:112,radius:16},{id:"lm_watchtower",name:"Northern Watchtower",kind:"watchtower",x:-44,z:-62,radius:12},{id:"lm_peak",name:"Obsidian Spire",kind:"peak",x:62,z:-68,radius:26},{id:"lm_ruins",name:"Sunken Bog Arches",kind:"ruins",x:84,z:36,radius:18},{id:"lm_jetty",name:"South Harbor Jetty",kind:"jetty",x:20,z:106,radius:14},{id:"lm_atoll",name:"Shipwreck Coral Atoll",kind:"atoll",x:-148,z:136,radius:32},{id:"lm_volcano",name:"Volcanic Obsidian Isle",kind:"volcano",x:152,z:-136,radius:34},{id:"lm_sea_arch",name:"Sea-Arch Sanctuary",kind:"sea_arch",x:-146,z:-134,radius:30}]}getHeight(t,e){const n=t/138,i=e/138,s=Math.sqrt(n*n+i*i),r=Math.atan2(i,n),a=this.shapeNoise.fbm(Math.cos(r)*1.45,Math.sin(r)*1.45,3)*.24+this.shapeNoise.noise2D(t*.011,e*.011)*.14,c=s+a,l=1-Te(.56,1.06,c),h=gn(-7.2,.2,Te(1.18,.72,c)),d=()=>{let _=-7.2+this.detailNoise.noise2D(t*.03,e*.03)*.35;const P=Math.hypot(t+148,e-136);if(P<46){const z=this.shapeNoise.noise2D(t*.04,e*.04)*5.5,V=1-Te(11,36,P+z);if(V>0){const B=.6+V*3.8+this.detailNoise.noise2D(t*.05,e*.05)*.65;_=Math.max(_,gn(-6.5,B,V))}}const U=Math.hypot(t-152,e+136);if(U<48){const z=this.shapeNoise.noise2D(t*.035,e*.035)*4.5,V=1-Te(10,38,U+z);if(V>0){const B=this.ridgeNoise.ridged(t*.03,e*.03,3),q=2+V*(14.5+B*7.5);_=Math.max(_,gn(-6.8,q,V))}}const L=Math.hypot(t+146,e+134);if(L<45){const z=this.shapeNoise.noise2D(t*.038,e*.038)*5,V=1-Te(10,35,L+z);if(V>0){const B=1.6+V*8.4+this.detailNoise.fbm(t*.04,e*.04,2)*1.1;_=Math.max(_,gn(-6.6,B,V))}}return _};if(l<=.001)return Math.max(h+this.detailNoise.noise2D(t*.03,e*.03)*.35,d());const u=this.elevationNoise.fbm(t*.0085,e*.0085,4),f=this.detailNoise.fbm(t*.032,e*.032,3)*1.1;let g=2.4+(u*.5+.5)*6.5+f;const v=Math.hypot(t-62,e+68),p=1-Te(10,74,v);if(p>0){const _=this.ridgeNoise.ridged(t*.018,e*.018,4);g+=p*p*(11.5+_*13.5)}const m=Math.hypot(t+44,e+62),w=1-Te(16,78,m);if(w>0){const _=this.ridgeNoise.ridged(t*.014,e*.014,3);g+=w*(5.2+_*4.5)}const b=Math.hypot(t-84,e-36),x=1-Te(10,52,b);x>0&&(g=gn(g,.55+this.detailNoise.noise2D(t*.04,e*.04)*.5,x*.85));const I=Math.hypot(t+14,e-102),E=1-Te(12,42,I);E>0&&(g=gn(g,1.35,E*.65)),g=gn(h,g,l);const A=Math.hypot(t+10,e-18);if(A<17){const _=1-Te(7,17,A);g=gn(g,4.2,_*.85)}const R=Math.hypot(t-16,e-8);if(R<14){const _=1-Te(3.5,13.5,R);g=gn(g,-.75,_*.92)}const y=Math.hypot(t+44,e+62);if(y<11){const _=1-Te(4.5,11,y);g=gn(g,11.2,_*.75)}return g}getSlope(t,e){const i=this.getHeight(t-1,e),s=this.getHeight(t+1,e),r=this.getHeight(t,e-1),a=this.getHeight(t,e+1),c=(s-i)/2,l=(a-r)/2;return Math.sqrt(c*c+l*l)}getNormal(t,e){const i=this.getHeight(t-.8,e),s=this.getHeight(t+.8,e),r=this.getHeight(t,e-.8),a=this.getHeight(t,e+.8),c=i-s,l=2*.8,h=r-a,d=Math.hypot(c,l,h)||1;return{x:c/d,y:l/d,z:h/d}}isNearFreshWater(t,e){return Math.hypot(t-16,e-8)<12.5}sample(t,e){const n=this.getHeight(t,e),i=this.getSlope(t,e),s=Bt(.5+this.moistureNoise.fbm(t*.011,e*.011,3)*.7,0,1),r=Bt(.65-Math.max(0,n)*.025+e/300*.25,0,1);let a;const c=Math.hypot(t-84,e-36),l=Math.hypot(t-62,e+68),h=Math.hypot(t-152,e+136),d=Math.hypot(t+148,e-136);return n<Pt-.12?a="ocean":h<36&&n>2.2?a="volcanic":d<35&&n<3.6?a="beach":c<42&&n<2.6?a="marsh":n<1.55?a="beach":l<54&&n>12.2?a="volcanic":n>10.2||i>.72?a="highland":e<-12||n>6.4||s<.42?a="pine":a="meadow",{height:n,biome:a,moisture:s,temperature:r,slope:i}}getSpawnPoint(){return{x:-10,y:this.getHeight(-10,25),z:25}}getStarterBoatSpot(){for(let e=96;e<=184;e+=2)if(this.getHeight(20,e)<-1.1&&this.getHeight(20+4.5,e+2)<-1.1)return{x:20+4.5,z:e+2,yaw:Math.PI};return{x:24.5,z:172,yaw:Math.PI}}getHarborJettySpot(){for(let e=82;e<=176;e+=1.5)if(this.getHeight(20,e)<.15)return{x:20,z:e};return{x:20,z:158}}generateResourceNodes(){const t=Ia(this.seed+7777),e=[],n=[],i=(l,h,d)=>{if(Math.hypot(l+10,h-18)<9.5||Math.hypot(l-16,h-8)<9.5||Math.hypot(l+44,h+62)<6.5)return!1;for(let u=0;u<n.length;u++){const f=n[u],g=l-f.x,v=h-f.z,p=f.r+d;if(g*g+v*v<p*p)return!1}return!0},s=(l,h,d,u=.85,f=1.28)=>{const g=oa[l],v=this.getHeight(h,d),p=`node_${e.length}`,m=gn(u,f,t());e.push({id:p,kind:l,x:Math.round(h*100)/100,y:Math.round(v*100)/100,z:Math.round(d*100)/100,rotY:Math.round(t()*Math.PI*2*100)/100,scale:Math.round(m*100)/100,hp:g.maxHp,maxHp:g.maxHp,depleted:!1,respawnAt:0}),n.push({x:h,z:d,r:g.radius*m+1.3})},r=[["driftwood",-19,26],["driftwood",-2,29],["stone_boulder",-21,16],["stone_boulder",2,21],["berry_bush",-15,31],["berry_bush",-3,14],["fiber_reed",6,13],["fiber_reed",12,17],["birch_tree",-23,21],["oak_tree",-17,7],["pine_tree",-27,12],["copper_vein",-31,4],["sunbloom_flower",-6,12],["sunbloom_flower",6,23]];for(const[l,h,d]of r)this.getHeight(h,d)>.3&&s(l,h,d,.95,1.1);const a=[["supply_crate",-18,108],["supply_crate",-10,109],["supply_crate",-15,117],["supply_crate",-6,113],["supply_crate",-22,113],["supply_crate",-40,-56],["supply_crate",-48,-66],["supply_crate",81,32],["supply_crate",89,39],["sunken_wreck_chest",-144,134],["sunken_wreck_chest",-154,140],["sunken_wreck_chest",-147,128],["sunken_wreck_chest",-146,-131],["sunbloom_flower",-141,-137],["sunbloom_flower",-151,-135],["sunbloom_flower",-145,-142],["obsidian_vein",148,-132],["obsidian_vein",156,-140],["ancient_crystal",151,-135],["iron_vein",144,-139],["iron_vein",158,-130]];for(const[l,h,d]of a)this.getHeight(h,d)>.1&&s(l,h,d,.95,1.12);const c=4400;for(let l=0;l<c&&e.length<740;l++){const h=(t()*2-1)*195,d=(t()*2-1)*195,u=this.sample(h,d);if(u.biome==="ocean"){u.height>-1.35&&u.height<-.25&&t()<.065&&i(h,d,3.5)&&s("coral_reef_node",h,d,.85,1.3);continue}if(u.slope>.92)continue;let f=null;const g=t();if(u.biome==="beach"){if(u.height<.3)continue;g<.42?f="palm_tree":g<.7?f="driftwood":g<.88?f="stone_boulder":f="fiber_reed"}else u.biome==="meadow"?g<.26?f="oak_tree":g<.46?f="birch_tree":g<.6?f="berry_bush":g<.7?f="sunbloom_flower":g<.82?f="stone_boulder":g<.92?f="fiber_reed":f="copper_vein":u.biome==="pine"?g<.5?f="pine_tree":g<.66?f="stone_boulder":g<.79?f="copper_vein":g<.89?f="iron_vein":f="mushroom_cluster":u.biome==="highland"?g<.26?f="pine_tree":g<.48?f="stone_boulder":g<.68?f="iron_vein":g<.82?f="copper_vein":g<.92?f="ancient_crystal":f="sunbloom_flower":u.biome==="volcanic"?g<.36?f="obsidian_vein":g<.62?f="iron_vein":g<.84?f="ancient_crystal":f="stone_boulder":u.biome==="marsh"&&(g<.36?f="marsh_tree":g<.64?f="fiber_reed":g<.86?f="mushroom_cluster":f="ancient_crystal");if(!f)continue;const v=oa[f],p=f.endsWith("tree")?3.2:2.1;i(h,d,Math.max(v.radius,p))&&s(f,h,d)}return e}}const We={wood:{id:"wood",name:"Timber Wood",category:"material",description:"Sturdy timber felled from island trees. Essential for tools, fire, and shelters.",maxStack:50,accentColor:"#a66b3a"},stone:{id:"stone",name:"Rough Stone",category:"material",description:"Dense island rock chipped from boulders and cliffs.",maxStack:50,accentColor:"#8d959e"},flint:{id:"flint",name:"Sharp Flint",category:"material",description:"Razor-edged mineral ideal for arrowheads and early blades.",maxStack:40,accentColor:"#5c6670"},fiber:{id:"fiber",name:"Plant Fiber",category:"material",description:"Pliable reeds and stalks woven into rope, bandages, and bindings.",maxStack:50,accentColor:"#76a84c"},rope:{id:"rope",name:"Braided Rope",category:"material",description:"Strong woven cordage required for bows, stations, and reinforced builds.",maxStack:30,accentColor:"#c7a46a"},resin:{id:"resin",name:"Amber Resin",category:"material",description:"Flammable tree sap used for torches, waterproofing, and lanterns.",maxStack:40,accentColor:"#e2942a"},hide:{id:"hide",name:"Animal Hide",category:"material",description:"Supple pelt harvested from deer, boars, and wolves.",maxStack:30,accentColor:"#9c6644"},fang:{id:"fang",name:"Wolf Fang",category:"material",description:"Sharp predator fang used for high-tier weapons.",maxStack:30,accentColor:"#ece4d8"},coal:{id:"coal",name:"Charcoal",category:"material",description:"High-heat smelting fuel produced in campfires or mined from ridges.",maxStack:50,accentColor:"#36393f"},copper_ore:{id:"copper_ore",name:"Copper Ore",category:"material",description:"Green-veined ore ready to be smelted in a Stone Furnace.",maxStack:40,accentColor:"#c87344"},copper_ingot:{id:"copper_ingot",name:"Copper Ingot",category:"material",description:"Refined bronze-hued copper bar for durable mid-tier gear.",maxStack:30,accentColor:"#df854e"},iron_ore:{id:"iron_ore",name:"Iron Ore",category:"material",description:"Heavy highland ore requiring a furnace to smelt.",maxStack:40,accentColor:"#7f8996"},iron_ingot:{id:"iron_ingot",name:"Iron Ingot",category:"material",description:"Forged iron bar for steel-grade tools, armor, and fortifications.",maxStack:30,accentColor:"#b7c4d4"},obsidian:{id:"obsidian",name:"Volcanic Obsidian",category:"material",description:"Razor-sharp volcanic glass mined atop Obsidian Spire.",maxStack:30,accentColor:"#4b3b66"},ancient_shard:{id:"ancient_shard",name:"Ancient Shard",category:"material",description:"Humming runic crystal pulsing with primordial island energy.",maxStack:25,accentColor:"#49e5d8"},shadow_essence:{id:"shadow_essence",name:"Shadow Essence",category:"material",description:"Condensed night-mist dropped by defeated Shadow Stalkers.",maxStack:25,accentColor:"#a855f7"},berries:{id:"berries",name:"Wild Berries",category:"consumable",description:"Sweet coastal berries that ease both hunger and thirst.",maxStack:30,hungerRestore:14,thirstRestore:10,heal:4,accentColor:"#d94862"},coconut:{id:"coconut",name:"Fresh Coconut",category:"consumable",description:"Cool palm water and rich meat. Great for hydration.",maxStack:20,hungerRestore:15,thirstRestore:32,heal:5,accentColor:"#8d5b34"},mushroom:{id:"mushroom",name:"Forest Mushroom",category:"consumable",description:"Earthy woodland cap. Best simmered into hearty stew.",maxStack:30,hungerRestore:12,thirstRestore:4,heal:3,accentColor:"#c78c56"},raw_meat:{id:"raw_meat",name:"Raw Venison",category:"consumable",description:"Uncooked game meat. Roast over a campfire for huge nourishment.",maxStack:20,hungerRestore:14,heal:-4,accentColor:"#b84242"},cooked_meat:{id:"cooked_meat",name:"Seared Steak",category:"consumable",description:"Savory fire-roasted venison that restores health, warmth, and hunger.",maxStack:20,hungerRestore:46,heal:24,warmthRestore:15,accentColor:"#9c4c24"},hearty_stew:{id:"hearty_stew",name:"Wildreach Stew",category:"consumable",description:"Rich meat, mushroom, and berry stew. Restores all vitals.",maxStack:15,hungerRestore:62,thirstRestore:36,heal:40,warmthRestore:28,accentColor:"#e07a32"},bandage:{id:"bandage",name:"Herbal Bandage",category:"consumable",description:"Woven fiber dressing that quickly mends wounds.",maxStack:15,heal:36,accentColor:"#e8e2d0"},vitality_elixir:{id:"vitality_elixir",name:"Runic Elixir",category:"consumable",description:"Luminous tonic distilled from Ancient Shards. Full battle recovery.",maxStack:10,heal:85,thirstRestore:45,warmthRestore:20,accentColor:"#38f2dc"},torch:{id:"torch",name:"Resin Torch",category:"light",description:"Casts warm flickering light, staves off chill, and wards off Night Stalkers.",maxStack:1,maxDurability:120,damage:11,attackCooldown:.55,range:2.8,emitsLight:!0,accentColor:"#ff9b30"},build_hammer:{id:"build_hammer",name:"Builder Hammer",category:"tool",description:"Equip or press [B] to construct and repair modular shelters and stations.",maxStack:1,maxDurability:200,toolKind:"hammer",damage:12,attackCooldown:.55,range:2.8,accentColor:"#c48f52"},stone_axe:{id:"stone_axe",name:"Stone Hatchet",category:"tool",description:"Fells trees briskly and doubles as a rugged survival cleaver.",maxStack:1,maxDurability:90,tier:1,toolKind:"axe",gatherPower:28,damage:18,attackCooldown:.55,range:3.1,accentColor:"#949ca6"},stone_pickaxe:{id:"stone_pickaxe",name:"Stone Pickaxe",category:"tool",description:"Breaks boulders and unlocks Copper & Iron mining.",maxStack:1,maxDurability:90,tier:1,toolKind:"pickaxe",gatherPower:28,damage:16,attackCooldown:.6,range:3.1,accentColor:"#818c99"},iron_axe:{id:"iron_axe",name:"Forged Iron Axe",category:"tool",description:"Heavy honed iron blade that drops giant pines in a few clean strikes.",maxStack:1,maxDurability:200,tier:2,toolKind:"axe",gatherPower:52,damage:30,attackCooldown:.5,range:3.3,accentColor:"#c3d2e3"},iron_pickaxe:{id:"iron_pickaxe",name:"Forged Iron Pickaxe",category:"tool",description:"Shatters Obsidian veins and Ancient Crystals with ease.",maxStack:1,maxDurability:200,tier:2,toolKind:"pickaxe",gatherPower:52,damage:25,attackCooldown:.55,range:3.3,accentColor:"#b0c2d6"},wood_spear:{id:"wood_spear",name:"Flint-Tipped Spear",category:"weapon",description:"Long-reach thrusting spear for keeping boars and wolves at bay.",maxStack:1,maxDurability:100,tier:1,damage:26,attackCooldown:.52,range:3.9,accentColor:"#ba8c56"},hunting_bow:{id:"hunting_bow",name:"Hunting Bow",category:"weapon",description:"Draw and release high-velocity Flint Arrows to hunt at range.",maxStack:1,maxDurability:130,tier:1,damage:38,attackCooldown:.65,range:45,isRanged:!0,ammoItemId:"flint_arrow",accentColor:"#a8703b"},flint_arrow:{id:"flint_arrow",name:"Flint Arrow",category:"ammo",description:"Fletched timber arrow tipped with chipped flint.",maxStack:50,accentColor:"#d0c8b8"},iron_sword:{id:"iron_sword",name:"Iron Broadsword",category:"weapon",description:"Balanced steel-tempered sword with sweeping melee cleave.",maxStack:1,maxDurability:220,tier:2,damage:44,attackCooldown:.45,range:3.6,accentColor:"#d5e0ec"},shadow_blade:{id:"shadow_blade",name:"Shadowsteel Greatsword",category:"weapon",description:"Obsidian-edged runic blade infused with Shadow Essence.",maxStack:1,maxDurability:350,tier:3,damage:68,attackCooldown:.44,range:4,emitsLight:!0,accentColor:"#a855f7"},starlight_bow:{id:"starlight_bow",name:"Starlight Recurve",category:"weapon",description:"Runic bow firing blazing astral bolts without losing momentum.",maxStack:1,maxDurability:300,tier:3,damage:64,attackCooldown:.52,range:60,isRanged:!0,ammoItemId:"flint_arrow",emitsLight:!0,accentColor:"#38f2dc"},leather_armor:{id:"leather_armor",name:"Ranger Hide Tunic",category:"armor",description:"Layered hide vest reducing incoming damage by 25% and adding warmth.",maxStack:1,maxDurability:150,armorRating:25,accentColor:"#8d5936"},iron_armor:{id:"iron_armor",name:"Highland Iron Plate",category:"armor",description:"Heavy forged plates reducing incoming damage by 48%.",maxStack:1,maxDurability:280,armorRating:48,accentColor:"#98a7b8"},runic_armor:{id:"runic_armor",name:"Aegis of the Spire",category:"armor",description:"Obsidian & crystal ward armor reducing damage by 65%.",maxStack:1,maxDurability:420,armorRating:65,accentColor:"#5eead4"},kit_campfire:{id:"kit_campfire",name:"Campfire Kit",category:"structure",description:"Place to cook food, stay warm, and repel Night Stalkers.",maxStack:5,structureKind:"campfire",accentColor:"#ff7b29"},kit_workbench:{id:"kit_workbench",name:"Workbench Kit",category:"structure",description:"Unlocks Tier 1 tools, bows, armor, and base building.",maxStack:3,structureKind:"workbench",accentColor:"#b57b42"},kit_bedroll:{id:"kit_bedroll",name:"Camp Bedroll",category:"structure",description:"Sets your personal respawn point on the island.",maxStack:2,structureKind:"bedroll",accentColor:"#c95c4b"},fishing_rod:{id:"fishing_rod",name:"Bamboo Fishing Rod",category:"tool",description:"Cast into ocean waves or springs (on shore or from a boat!) to catch fish & pearls.",maxStack:1,maxDurability:140,tier:1,damage:8,attackCooldown:.6,range:4,accentColor:"#d9a45b"},spyglass:{id:"spyglass",name:"Brass Spyglass",category:"tool",description:"Hold Left-Click / ACT to zoom 3x across the sea and scout distant islands.",maxStack:1,maxDurability:200,tier:1,damage:6,attackCooldown:.5,range:3,accentColor:"#eab308"},iron_cutlass:{id:"iron_cutlass",name:"Corsair Cutlass",category:"weapon",description:"Swift curved seafarer sabre with rapid strikes and crisp naval balance.",maxStack:1,maxDurability:240,tier:2,damage:42,attackCooldown:.34,range:3.5,accentColor:"#e2e8f0"},abyssal_harpoon:{id:"abyssal_harpoon",name:"Abyssal Harpoon",category:"weapon",description:"Barbed deep-sea spear forged with Sea Pearls & Iron. Devastates Sea Serpents & Golems.",maxStack:1,maxDurability:310,tier:3,damage:62,attackCooldown:.46,range:4.6,emitsLight:!0,accentColor:"#2dd4bf"},captains_coat:{id:"captains_coat",name:"Captain's Greatcoat",category:"armor",description:"Waxed leather naval coat with brass trim. 36% armor & keeps you warm at sea.",maxStack:1,maxDurability:220,armorRating:36,accentColor:"#1d4ed8"},serpent_scale_mail:{id:"serpent_scale_mail",name:"Serpent Scale Mail",category:"armor",description:"Iridescent ocean-forged scales providing 58% damage reduction.",maxStack:1,maxDurability:360,armorRating:58,accentColor:"#06b6d4"},raw_fish:{id:"raw_fish",name:"Silver Trout",category:"consumable",description:"Freshly caught coastal fish. Grill over a campfire for a hearty meal.",maxStack:20,heal:4,hungerRestore:14,thirstRestore:4,accentColor:"#7dd3fc"},golden_snapper:{id:"golden_snapper",name:"Golden Snapper",category:"consumable",description:"Prized deep-water reef fish. Cooks into legendary Seafarer Chowder.",maxStack:15,heal:10,hungerRestore:20,thirstRestore:6,accentColor:"#fbbf24"},grilled_fish:{id:"grilled_fish",name:"Grilled Trout",category:"consumable",description:"Smoky fire-roasted fish restoring Health, Hunger, and Warmth.",maxStack:20,heal:22,hungerRestore:40,warmthRestore:12,accentColor:"#f59e0b"},crab_meat:{id:"crab_meat",name:"Coral Crab Claw",category:"consumable",description:"Sweet coastal shellfish harvested from beach crabs. Better when roasted!",maxStack:20,heal:4,hungerRestore:15,accentColor:"#fb7185"},cooked_crab:{id:"cooked_crab",name:"Butter-Roasted Crab",category:"consumable",description:"Savory roasted crab claws packed with protein and warmth.",maxStack:20,heal:26,hungerRestore:46,warmthRestore:15,accentColor:"#f97316"},serpent_meat:{id:"serpent_meat",name:"Sea Serpent Steak",category:"consumable",description:"Rare marbled sea-monster cut. Roast over embers for immense vitality.",maxStack:15,heal:8,hungerRestore:18,accentColor:"#38bdf8"},roasted_serpent:{id:"roasted_serpent",name:"Roast Serpent Feast",category:"consumable",description:"Legendary naval delicacy restoring huge Health, Hunger, and Warmth.",maxStack:15,heal:48,hungerRestore:75,warmthRestore:24,accentColor:"#22d3ee"},seafarer_chowder:{id:"seafarer_chowder",name:"Seafarer's Chowder",category:"consumable",description:"Steaming cauldron stew of Snapper, Crab & Sunbloom. Restores all vitals!",maxStack:10,heal:55,hungerRestore:65,thirstRestore:45,warmthRestore:35,accentColor:"#fbbf24"},sea_pearl:{id:"sea_pearl",name:"Luminous Sea Pearl",category:"material",description:"Iridescent pearl harvested from shallow coral reefs or deep-sea fishing.",maxStack:30,accentColor:"#f0f9ff"},serpent_scale:{id:"serpent_scale",name:"Serpent Scale",category:"material",description:"Impervious iridescent scale dropped by Ocean Sea Serpents.",maxStack:30,accentColor:"#0ea5e9"},sunbloom:{id:"sunbloom",name:"Sunbloom Petal",category:"material",description:"Radiant golden blossom harvested on outer islands or grown in Planter Boxes.",maxStack:40,accentColor:"#fde047"},gold_coin:{id:"gold_coin",name:"Sunken Doubloon",category:"material",description:"Ancient stamped gold coin recovered from shipwrecks and elite guardians.",maxStack:99,accentColor:"#facc15"},sea_wind_tonic:{id:"sea_wind_tonic",name:"Sea-Wind Tonic",category:"consumable",description:"Alchemical mint-and-pearl draught restoring huge Thirst and Health.",maxStack:10,heal:35,thirstRestore:65,warmthRestore:10,accentColor:"#2dd4bf"},sunfire_elixir:{id:"sunfire_elixir",name:"Sunfire Elixir",category:"consumable",description:"Liquid golden warmth brewed from Sunblooms. Banishes chill and heals rapidly.",maxStack:10,heal:60,thirstRestore:30,warmthRestore:55,accentColor:"#fb923c"}};function Ue(o){return o?We[o]??null:null}const Xl=[{id:"rcp_rope",outputItemId:"rope",outputCount:1,station:"hand",category:"materials",ingredients:[{itemId:"fiber",count:4}],xpReward:5},{id:"rcp_torch",outputItemId:"torch",outputCount:1,station:"hand",category:"survival",ingredients:[{itemId:"wood",count:2},{itemId:"fiber",count:2}],xpReward:8},{id:"rcp_stone_axe",outputItemId:"stone_axe",outputCount:1,station:"hand",category:"tools",ingredients:[{itemId:"wood",count:4},{itemId:"stone",count:3},{itemId:"fiber",count:2}],xpReward:15},{id:"rcp_stone_pickaxe",outputItemId:"stone_pickaxe",outputCount:1,station:"hand",category:"tools",ingredients:[{itemId:"wood",count:4},{itemId:"stone",count:4},{itemId:"fiber",count:2}],xpReward:15},{id:"rcp_build_hammer",outputItemId:"build_hammer",outputCount:1,station:"hand",category:"tools",ingredients:[{itemId:"wood",count:4},{itemId:"stone",count:2}],xpReward:12},{id:"rcp_wood_spear",outputItemId:"wood_spear",outputCount:1,station:"hand",category:"weapons",ingredients:[{itemId:"wood",count:5},{itemId:"flint",count:2},{itemId:"fiber",count:2}],xpReward:18},{id:"rcp_bandage",outputItemId:"bandage",outputCount:2,station:"hand",category:"survival",ingredients:[{itemId:"fiber",count:4},{itemId:"berries",count:2}],xpReward:10},{id:"rcp_kit_campfire",outputItemId:"kit_campfire",outputCount:1,station:"hand",category:"stations",ingredients:[{itemId:"wood",count:6},{itemId:"stone",count:5}],xpReward:20},{id:"rcp_kit_workbench",outputItemId:"kit_workbench",outputCount:1,station:"hand",category:"stations",ingredients:[{itemId:"wood",count:12},{itemId:"stone",count:4},{itemId:"rope",count:1}],xpReward:28},{id:"rcp_kit_bedroll",outputItemId:"kit_bedroll",outputCount:1,station:"hand",category:"stations",ingredients:[{itemId:"fiber",count:8},{itemId:"hide",count:2}],xpReward:20},{id:"rcp_cooked_meat",outputItemId:"cooked_meat",outputCount:1,station:"campfire",category:"survival",ingredients:[{itemId:"raw_meat",count:1}],xpReward:14},{id:"rcp_hearty_stew",outputItemId:"hearty_stew",outputCount:1,station:"campfire",category:"survival",ingredients:[{itemId:"raw_meat",count:1},{itemId:"mushroom",count:2},{itemId:"berries",count:2}],xpReward:25},{id:"rcp_charcoal",outputItemId:"coal",outputCount:2,station:"campfire",category:"materials",ingredients:[{itemId:"wood",count:3}],xpReward:8},{id:"rcp_hunting_bow",outputItemId:"hunting_bow",outputCount:1,station:"workbench",category:"weapons",ingredients:[{itemId:"wood",count:8},{itemId:"rope",count:2}],xpReward:30},{id:"rcp_flint_arrow",outputItemId:"flint_arrow",outputCount:8,station:"workbench",category:"weapons",ingredients:[{itemId:"wood",count:3},{itemId:"flint",count:2},{itemId:"fiber",count:2}],xpReward:12},{id:"rcp_leather_armor",outputItemId:"leather_armor",outputCount:1,station:"workbench",category:"armor",ingredients:[{itemId:"hide",count:6},{itemId:"rope",count:2}],xpReward:35},{id:"rcp_copper_ingot",outputItemId:"copper_ingot",outputCount:1,station:"furnace",category:"materials",ingredients:[{itemId:"copper_ore",count:2},{itemId:"coal",count:1}],xpReward:16},{id:"rcp_iron_ingot",outputItemId:"iron_ingot",outputCount:1,station:"furnace",category:"materials",ingredients:[{itemId:"iron_ore",count:2},{itemId:"coal",count:1}],xpReward:22},{id:"rcp_iron_axe",outputItemId:"iron_axe",outputCount:1,station:"furnace",category:"tools",ingredients:[{itemId:"iron_ingot",count:3},{itemId:"wood",count:4},{itemId:"rope",count:1}],xpReward:42},{id:"rcp_iron_pickaxe",outputItemId:"iron_pickaxe",outputCount:1,station:"furnace",category:"tools",ingredients:[{itemId:"iron_ingot",count:3},{itemId:"wood",count:4},{itemId:"rope",count:1}],xpReward:42},{id:"rcp_iron_sword",outputItemId:"iron_sword",outputCount:1,station:"furnace",category:"weapons",ingredients:[{itemId:"iron_ingot",count:4},{itemId:"copper_ingot",count:1},{itemId:"hide",count:2}],xpReward:50},{id:"rcp_iron_armor",outputItemId:"iron_armor",outputCount:1,station:"furnace",category:"armor",ingredients:[{itemId:"iron_ingot",count:6},{itemId:"hide",count:4}],xpReward:60},{id:"rcp_vitality_elixir",outputItemId:"vitality_elixir",outputCount:2,station:"runic_forge",category:"survival",ingredients:[{itemId:"ancient_shard",count:1},{itemId:"berries",count:4},{itemId:"mushroom",count:2}],xpReward:38},{id:"rcp_shadow_blade",outputItemId:"shadow_blade",outputCount:1,station:"runic_forge",category:"weapons",ingredients:[{itemId:"obsidian",count:4},{itemId:"shadow_essence",count:3},{itemId:"iron_ingot",count:3}],xpReward:95},{id:"rcp_starlight_bow",outputItemId:"starlight_bow",outputCount:1,station:"runic_forge",category:"weapons",ingredients:[{itemId:"ancient_shard",count:4},{itemId:"wood",count:8},{itemId:"fang",count:3}],xpReward:90},{id:"rcp_runic_armor",outputItemId:"runic_armor",outputCount:1,station:"runic_forge",category:"armor",ingredients:[{itemId:"obsidian",count:5},{itemId:"ancient_shard",count:4},{itemId:"iron_ingot",count:4}],xpReward:110},{id:"rcp_fishing_rod",outputItemId:"fishing_rod",outputCount:1,station:"hand",category:"tools",ingredients:[{itemId:"wood",count:4},{itemId:"fiber",count:4},{itemId:"flint",count:1}],xpReward:18},{id:"rcp_spyglass",outputItemId:"spyglass",outputCount:1,station:"workbench",category:"tools",ingredients:[{itemId:"copper_ingot",count:2},{itemId:"sea_pearl",count:1},{itemId:"wood",count:2}],xpReward:32},{id:"rcp_grilled_fish",outputItemId:"grilled_fish",outputCount:1,station:"campfire",category:"food",ingredients:[{itemId:"raw_fish",count:1}],xpReward:12},{id:"rcp_cooked_crab",outputItemId:"cooked_crab",outputCount:1,station:"campfire",category:"food",ingredients:[{itemId:"crab_meat",count:1}],xpReward:14},{id:"rcp_roasted_serpent",outputItemId:"roasted_serpent",outputCount:1,station:"campfire",category:"food",ingredients:[{itemId:"serpent_meat",count:1}],xpReward:26},{id:"rcp_iron_cutlass",outputItemId:"iron_cutlass",outputCount:1,station:"furnace",category:"weapons",ingredients:[{itemId:"iron_ingot",count:3},{itemId:"copper_ingot",count:2},{itemId:"rope",count:1}],xpReward:52},{id:"rcp_captains_coat",outputItemId:"captains_coat",outputCount:1,station:"workbench",category:"armor",ingredients:[{itemId:"hide",count:6},{itemId:"copper_ingot",count:2},{itemId:"resin",count:3}],xpReward:48},{id:"rcp_abyssal_harpoon",outputItemId:"abyssal_harpoon",outputCount:1,station:"runic_forge",category:"weapons",ingredients:[{itemId:"iron_ingot",count:4},{itemId:"sea_pearl",count:3},{itemId:"serpent_scale",count:2}],xpReward:95},{id:"rcp_serpent_scale_mail",outputItemId:"serpent_scale_mail",outputCount:1,station:"furnace",category:"armor",ingredients:[{itemId:"serpent_scale",count:5},{itemId:"iron_ingot",count:4},{itemId:"hide",count:4}],xpReward:88},{id:"rcp_seafarer_chowder",outputItemId:"seafarer_chowder",outputCount:2,station:"cauldron",category:"food",ingredients:[{itemId:"golden_snapper",count:1},{itemId:"crab_meat",count:1},{itemId:"sunbloom",count:1}],xpReward:42},{id:"rcp_sea_wind_tonic",outputItemId:"sea_wind_tonic",outputCount:2,station:"cauldron",category:"survival",ingredients:[{itemId:"sea_pearl",count:1},{itemId:"berries",count:3}],xpReward:34},{id:"rcp_sunfire_elixir",outputItemId:"sunfire_elixir",outputCount:2,station:"cauldron",category:"survival",ingredients:[{itemId:"sunbloom",count:2},{itemId:"resin",count:2},{itemId:"mushroom",count:1}],xpReward:38}];function P0(o){return Xl.find(t=>t.id===o)??null}const ee=3.2,De=2.8,hi={campfire:{kind:"campfire",name:"Campfire",description:"Cooks food, radiates cozy warmth, and scares off Shadow Stalkers.",category:"stations",maxHp:120,costs:[{itemId:"wood",count:6},{itemId:"stone",count:5}],snapGroup:"free",width:1.4,height:.6,depth:1.4,solidCollision:!1,warmthRadius:9.5,stationRadius:5.5},workbench:{kind:"workbench",name:"Workbench",description:"Crafting station unlocking bows, armor, and modular building.",category:"stations",maxHp:220,costs:[{itemId:"wood",count:12},{itemId:"stone",count:4}],snapGroup:"free",width:1.9,height:1.1,depth:1.1,solidCollision:!0,stationRadius:16},furnace:{kind:"furnace",name:"Stone Furnace",description:"Smelts Copper & Iron ores and forges Tier 2 iron equipment.",category:"stations",maxHp:380,costs:[{itemId:"stone",count:16},{itemId:"coal",count:4},{itemId:"wood",count:6}],requiresWorkbench:!0,snapGroup:"free",width:1.8,height:2.3,depth:1.8,solidCollision:!0,warmthRadius:8,stationRadius:9},runic_forge:{kind:"runic_forge",name:"Runic Forge",description:"Channels Ancient Shards to craft endgame Shadowsteel & Starlight gear.",category:"stations",maxHp:520,costs:[{itemId:"iron_ingot",count:4},{itemId:"obsidian",count:3},{itemId:"ancient_shard",count:2}],requiresWorkbench:!0,snapGroup:"free",width:2,height:2,depth:2,solidCollision:!0,warmthRadius:7,stationRadius:9},wood_foundation:{kind:"wood_foundation",name:"Timber Foundation",description:"Elevated log platform. Snaps seamlessly to neighboring foundations.",category:"structure",maxHp:320,costs:[{itemId:"wood",count:6}],snapGroup:"foundation",width:ee,height:.55,depth:ee,solidCollision:!1},wood_wall:{kind:"wood_wall",name:"Timber Wall",description:"Solid plank fortification. Snaps cleanly to foundation edges.",category:"structure",maxHp:280,costs:[{itemId:"wood",count:5}],snapGroup:"wall",width:ee,height:De,depth:.35,solidCollision:!0,providesShelter:!0},wood_doorway:{kind:"wood_doorway",name:"Timber Doorway",description:"Framed cabin door you can swing open and shut with [E].",category:"structure",maxHp:250,costs:[{itemId:"wood",count:6},{itemId:"fiber",count:2}],snapGroup:"wall",width:ee,height:De,depth:.35,solidCollision:!0,providesShelter:!0},wood_roof:{kind:"wood_roof",name:"Timber Roof",description:"Shingled shelter roof protecting against chilling rainstorms.",category:"structure",maxHp:240,costs:[{itemId:"wood",count:5}],snapGroup:"roof",width:ee+.3,height:.45,depth:ee+.3,solidCollision:!1,providesShelter:!0},wood_stairs:{kind:"wood_stairs",name:"Timber Steps",description:"Walkable wooden steps up onto elevated foundations.",category:"structure",maxHp:200,costs:[{itemId:"wood",count:5}],snapGroup:"foundation",width:ee*.85,height:1.2,depth:ee*.85,solidCollision:!1},stone_wall:{kind:"stone_wall",name:"Stone Battlement",description:"Heavy masonry wall capable of halting packs of wolves and stalkers.",category:"defense",maxHp:680,costs:[{itemId:"stone",count:10},{itemId:"wood",count:2}],requiresWorkbench:!0,snapGroup:"wall",width:ee,height:De,depth:.55,solidCollision:!0,providesShelter:!0},spike_barricade:{kind:"spike_barricade",name:"Spike Palisade",description:"Sharpened wooden stakes that injure hostile creatures on contact.",category:"defense",maxHp:260,costs:[{itemId:"wood",count:7},{itemId:"flint",count:2}],snapGroup:"free",width:2.6,height:1.6,depth:.9,solidCollision:!0},storage_chest:{kind:"storage_chest",name:"Shared Chest",description:"12-slot sturdy chest to store and share gear with teammates.",category:"utility",maxHp:240,costs:[{itemId:"wood",count:8},{itemId:"fiber",count:4}],snapGroup:"free",width:1.25,height:.85,depth:.8,solidCollision:!0},bedroll:{kind:"bedroll",name:"Camp Bedroll",description:"Sets your respawn point so you wake safely back at base.",category:"utility",maxHp:120,costs:[{itemId:"fiber",count:8},{itemId:"hide",count:2}],snapGroup:"free",width:1.2,height:.3,depth:2.1,solidCollision:!1},rain_collector:{kind:"rain_collector",name:"Dew & Rain Collector",description:"Gathers clean freshwater over time; press [E] to drink.",category:"utility",maxHp:180,costs:[{itemId:"wood",count:6},{itemId:"hide",count:3},{itemId:"rope",count:1}],snapGroup:"free",width:1.5,height:1.6,depth:1.5,solidCollision:!0},lantern_post:{kind:"lantern_post",name:"Resin Lantern Post",description:"Tall glowing beacon illuminating paths and camp perimeters.",category:"utility",maxHp:160,costs:[{itemId:"wood",count:4},{itemId:"resin",count:3},{itemId:"stone",count:2}],snapGroup:"free",width:.6,height:3.2,depth:.6,solidCollision:!0,warmthRadius:5.5},watchtower_beacon:{kind:"watchtower_beacon",name:"Starlight Beacon",description:"Towering runic brazier visible across the island. Repels night threats.",category:"defense",maxHp:900,costs:[{itemId:"stone",count:16},{itemId:"iron_ingot",count:4},{itemId:"ancient_shard",count:3}],requiresWorkbench:!0,snapGroup:"free",width:2.2,height:5.4,depth:2.2,solidCollision:!0,warmthRadius:18},alchemy_cauldron:{kind:"alchemy_cauldron",name:"Alchemy Cauldron",description:"Bubbling iron pot for brewing Sunfire Elixirs, Sea-Wind Tonics & Seafarer Chowder.",category:"stations",maxHp:260,costs:[{itemId:"stone",count:8},{itemId:"copper_ingot",count:2},{itemId:"wood",count:6}],requiresWorkbench:!0,snapGroup:"free",width:1.5,height:1.2,depth:1.5,solidCollision:!0,warmthRadius:6,stationRadius:8},dock_pier:{kind:"dock_pier",name:"Harbor Dock Pier",description:"Sturdy timber pilings & decking that can be built directly over shallow coastal water!",category:"structure",maxHp:380,costs:[{itemId:"wood",count:8},{itemId:"rope",count:1}],snapGroup:"foundation",width:ee,height:1.2,depth:ee,solidCollision:!1},lighthouse_beacon:{kind:"lighthouse_beacon",name:"Harbor Lighthouse",description:"Sweeping golden rotating beam visible across the entire archipelago at night!",category:"utility",maxHp:950,costs:[{itemId:"stone",count:22},{itemId:"wood",count:12},{itemId:"copper_ingot",count:3},{itemId:"resin",count:6}],requiresWorkbench:!0,snapGroup:"free",width:2.8,height:9.2,depth:2.8,solidCollision:!0,warmthRadius:14},planter_box:{kind:"planter_box",name:"Garden Planter Box",description:"Cultivates ripe Sunberries & golden Sunblooms right at camp! Press [E] to harvest.",category:"utility",maxHp:180,costs:[{itemId:"wood",count:8},{itemId:"fiber",count:6},{itemId:"berries",count:2}],snapGroup:"free",width:1.8,height:.75,depth:1.2,solidCollision:!1},windmill:{kind:"windmill",name:"Coastal Windmill",description:"Tall timber tower with rotating canvas sails that align with the live archipelago wind.",category:"utility",maxHp:620,costs:[{itemId:"wood",count:20},{itemId:"stone",count:10},{itemId:"fiber",count:12}],requiresWorkbench:!0,snapGroup:"free",width:2.6,height:7.4,depth:2.6,solidCollision:!0},camp_banner:{kind:"camp_banner",name:"Voyager Banner",description:"Fluttering coastal cloth banner marking your harbor, camp, or conquered island.",category:"utility",maxHp:160,costs:[{itemId:"wood",count:4},{itemId:"fiber",count:6}],snapGroup:"free",width:.8,height:4.2,depth:.8,solidCollision:!1},tiki_brazier:{kind:"tiki_brazier",name:"Harbor Brazier",description:"Blazing iron fire bowl that illuminates docks, beaches, and keeps sea chill away.",category:"utility",maxHp:240,costs:[{itemId:"stone",count:6},{itemId:"wood",count:4},{itemId:"resin",count:3}],snapGroup:"free",width:1,height:1.7,depth:1,solidCollision:!0,warmthRadius:10.5}},L0=["campfire","workbench","alchemy_cauldron","dock_pier","wood_foundation","wood_wall","wood_doorway","wood_roof","wood_stairs","planter_box","storage_chest","bedroll","rain_collector","lantern_post","tiki_brazier","camp_banner","windmill","lighthouse_beacon","spike_barricade","stone_wall","furnace","runic_forge","watchtower_beacon"];function ql(o,t,e,n,i){const s=hi[o];let r=t.x,a=i(t.x,t.z),c=t.z,l=e,h=!1;if(s.snapGroup==="free"){for(const u of n)if(u.kind==="wood_foundation"||u.kind==="dock_pier"){const f=Math.abs(t.x-u.x),g=Math.abs(t.z-u.z);f<ee*.5&&g<ee*.5&&(a=Math.max(a,u.y+.52))}return{x:r,y:a,z:c,rotY:l,snapped:!1}}let d=2.4;if(s.snapGroup==="foundation"){for(const u of n){if(u.kind!=="wood_foundation"&&u.kind!=="dock_pier")continue;const f=Math.cos(u.rotY),g=Math.sin(u.rotY),v=[[ee,0],[-ee,0],[0,ee],[0,-ee]];for(const[p,m]of v){const w=u.x+p*f-m*g,b=u.z+p*g+m*f,x=Math.hypot(t.x-w,t.z-b);x<d&&(d=x,r=w,a=u.y,c=b,l=u.rotY,h=!0)}}if(!h){const u=i(t.x,t.z);a=o==="dock_pier"?Math.max(.55,u+.35):u+.25}}else if(s.snapGroup==="wall")for(const u of n){if(u.kind!=="wood_foundation"&&u.kind!=="dock_pier")continue;const f=Math.cos(u.rotY),g=Math.sin(u.rotY),v=ee*.5,p=[[0,-v,u.rotY],[0,v,u.rotY+Math.PI],[v,0,u.rotY+Math.PI/2],[-v,0,u.rotY-Math.PI/2]];for(const[m,w,b]of p){const x=u.x+m*f-w*g,I=u.z+m*g+w*f,E=Math.hypot(t.x-x,t.z-I);E<d&&(d=E,r=x,a=u.y+.5,c=I,l=b,h=!0)}}else if(s.snapGroup==="roof"){for(const u of n){if(u.kind!=="wood_foundation")continue;const f=Math.hypot(t.x-u.x,t.z-u.z);f<d+.6&&(d=f,r=u.x,a=u.y+.5+De,c=u.z,l=u.rotY,h=!0)}h||(a=i(t.x,t.z)+De)}return{x:Math.round(r*100)/100,y:Math.round(a*100)/100,z:Math.round(c*100)/100,rotY:Math.round(l*1e3)/1e3,snapped:h}}const Qc=[{dirX:.86,dirZ:.51,freq:.145,speed:1.45,amp:.16},{dirX:-.42,dirZ:.91,freq:.195,speed:1.25,amp:.12},{dirX:.71,dirZ:-.7,freq:.31,speed:2.05,amp:.055},{dirX:-.92,dirZ:-.39,freq:.44,speed:2.55,amp:.03}];function ms(o,t,e,n=1,i=-4){const s=Math.max(0,Pt-i),r=Math.min(1,Math.max(0,s/2.2)),a=e*(.82+n*.34),c=(.78+n*.32)*r;let l=0;for(let h=0;h<Qc.length;h++){const d=Qc[h],u=(o*d.dirX+t*d.dirZ)*d.freq+a*d.speed;l+=Math.sin(u)*d.amp}return Pt+l*c}function D0(o,t,e,n,i,s,r,a){const c=-Math.sin(e),l=-Math.cos(e),h=Math.cos(e),d=-Math.sin(e),u=o+c*n,f=t+l*n,g=o-c*n,v=t-l*n,p=o-h*i,m=t-d*i,w=o+h*i,b=t+d*i,x=ms(u,f,s,r,a(u,f)),I=ms(g,v,s,r,a(g,v)),E=ms(p,m,s,r,a(p,m)),A=ms(w,b,s,r,a(w,b)),R=(x+I+E+A)*.25,y=Math.atan2(x-I,Math.max(1,n*2)),_=Math.atan2(E-A,Math.max(1,i*2));return{heave:R,pitch:y,roll:_}}const ln={raft:{kind:"raft",name:"Timber Raft",description:"Hand-lashed cedar raft with patchwork sail. Quick to craft for coastal crossings.",maxHp:320,costs:[{itemId:"wood",count:16},{itemId:"fiber",count:6},{itemId:"resin",count:2}],paddleSpeed:2.8,halfSailSpeed:4.3,fullSailSpeed:5.8,reverseSpeed:1.8,turnRate:1.55,length:3.8,beam:2.5,cargoSlots:0,ramDamage:18,cameraDist:7.4,cameraHeight:3.1,helmOffsetZ:1.05,deckY:.28},skiff:{kind:"skiff",name:"Outrigger Skiff",description:"Agile copper-bound sailboat with brass lantern & 6-slot hold. Built to reach outer islands!",maxHp:580,costs:[{itemId:"wood",count:24},{itemId:"hide",count:5},{itemId:"copper_ingot",count:4},{itemId:"resin",count:4}],requiresWorkbench:!0,paddleSpeed:3.8,halfSailSpeed:6.4,fullSailSpeed:9,reverseSpeed:2.4,turnRate:1.82,length:5.6,beam:2.4,cargoSlots:6,ramDamage:32,cameraDist:9.2,cameraHeight:3.8,helmOffsetZ:1.55,deckY:.42},longship:{kind:"longship",name:"Dragon Longship",description:"Ironbound Viking warship with dragon prow, painted shields, twin lanterns & 12-slot hold.",maxHp:1150,costs:[{itemId:"wood",count:36},{itemId:"iron_ingot",count:8},{itemId:"hide",count:8},{itemId:"resin",count:5}],requiresWorkbench:!0,paddleSpeed:4.5,halfSailSpeed:8.6,fullSailSpeed:12.6,reverseSpeed:2.8,turnRate:1.28,length:8.8,beam:3.1,cargoSlots:12,ramDamage:56,cameraDist:12.2,cameraHeight:4.9,helmOffsetZ:2.55,deckY:.56}};function k0(o,t,e){const n=-Math.sin(o),i=-Math.cos(o),s=Math.hypot(t,e)||1,r=(n*t+i*e)/s;return r>=-.15?.78+(r+.15)*.32:Math.max(.24,.78+(r+.15)*.65)}const U0=420,N0=27,$l=9,tl=12;function vn(o){const t=document.createElement("canvas");t.width=o,t.height=o;const e=t.getContext("2d");return[t,e]}function _n(o,t=1,e=1,n=!0){const i=new Aa(o);return i.wrapS=vs,i.wrapT=vs,i.repeat.set(t,e),n&&(i.colorSpace=$e),i.anisotropy=4,i.needsUpdate=!0,i}function se(o,t,e){let n=Math.imul(o,374761393)+Math.imul(t,668265263)+Math.imul(e,1442695041);return n=(n^n>>>13)*1274126177,((n^n>>>16)>>>0)/4294967295}function B0(){const[o,t]=vn(256),[e,n]=vn(256),i=t.createImageData(256,256),s=n.createImageData(256,256);for(let L=0;L<256;L++)for(let z=0;z<256;z++){const V=se(z>>2,L>>2,11),B=se(z>>1,L>>1,23),q=se(z,L,37),H=V*.45+B*.35+q*.2,nt=Math.floor(208+(H-.5)*68),st=Math.floor(H*255),at=(L*256+z)*4;i.data[at]=nt,i.data[at+1]=nt,i.data[at+2]=Math.min(255,nt-3),i.data[at+3]=255,s.data[at]=st,s.data[at+1]=st,s.data[at+2]=st,s.data[at+3]=255}t.putImageData(i,0,0),n.putImageData(s,0,0);const[r,a]=vn(256);a.fillStyle="#533b2a",a.fillRect(0,0,256,256);for(let L=0;L<420;L++){const z=se(L,1,5)*256,V=se(L,2,5)*256,B=2+se(L,3,5)*6,q=24+se(L,4,5)*70,H=se(L,5,5)>.45;a.fillStyle=H?"rgba(34, 22, 14, 0.42)":"rgba(116, 86, 61, 0.32)",a.fillRect(z,V,B,q),a.fillRect(z,V-256,B,q)}for(let L=0;L<24;L++){const z=se(L,7,9)*256,V=se(L,8,9)*256;a.fillStyle="rgba(72, 102, 54, 0.24)",a.beginPath(),a.arc(z,V,6+se(L,9,9)*14,0,Math.PI*2),a.fill()}const[c,l]=vn(256);l.fillStyle="#e7dfd3",l.fillRect(0,0,256,256);for(let L=0;L<160;L++){const z=se(L,1,19)*256,V=se(L,2,19)*256,B=10+se(L,3,19)*32,q=1.5+se(L,4,19)*3.5;l.fillStyle=se(L,5,19)>.3?"rgba(54, 46, 42, 0.72)":"rgba(165, 150, 134, 0.45)",l.fillRect(z,V,B,q)}const[h,d]=vn(256),[u,f]=vn(256);d.fillStyle="#8b5d38",d.fillRect(0,0,256,256),f.fillStyle="#888888",f.fillRect(0,0,256,256);const g=6,v=256/g;for(let L=0;L<g;L++){const z=L*v,V=(se(L,1,31)-.5)*22;d.fillStyle=`rgb(${Math.round(138+V)}, ${Math.round(92+V*.7)}, ${Math.round(54+V*.5)})`,d.fillRect(0,z+2,256,v-3);for(let q=0;q<38;q++){const H=z+3+se(L,q,41)*(v-6);d.fillStyle=se(L,q,42)>.5?"rgba(65,38,18,0.22)":"rgba(195,146,96,0.16)",d.fillRect(0,H,256,1.5)}d.fillStyle="rgba(28, 16, 8, 0.78)",d.fillRect(0,z,256,2.5),f.fillStyle="#181818",f.fillRect(0,z,256,3);const B=(se(L,9,43)*180+36)%256;d.fillRect(B,z,2,v),d.fillStyle="#2d2d30",d.beginPath(),d.arc(B+7,z+v*.5,2.2,0,Math.PI*2),d.arc(B-7,z+v*.5,2.2,0,Math.PI*2),d.fill()}const[p,m]=vn(256),[w,b]=vn(256);m.fillStyle="#4f555c",m.fillRect(0,0,256,256),b.fillStyle="#222222",b.fillRect(0,0,256,256);const x=6,I=256/x;for(let L=0;L<x;L++){let V=-(L%2*32),B=0;for(;V<256;){const q=46+Math.floor(se(L,B,55)*34),H=112+Math.floor((se(L,B,56)-.5)*36);m.fillStyle=`rgb(${H}, ${H+2}, ${H+5})`,m.fillRect(V+2,L*I+2,q-4,I-4),b.fillStyle=`rgb(${150+Math.floor(se(L,B,57)*70)},150,150)`,b.fillRect(V+3,L*I+3,q-6,I-6),se(L,B,58)>.72&&(m.fillStyle="rgba(84, 114, 62, 0.35)",m.fillRect(V+4,L*I+2,q*.5,6)),V+=q,B++}}const[E,A]=vn(256);A.fillStyle="#624229",A.fillRect(0,0,256,256);for(let L=0;L<8;L++){const z=L*32,V=L%2*16;for(let B=-1;B<9;B++){const q=B*32+V,H=Math.floor((se(L,B,77)-.5)*24);A.fillStyle=`rgb(${108+H}, ${72+Math.floor(H*.7)}, ${44+Math.floor(H*.5)})`,A.fillRect(q+1,z+1,30,30),A.fillStyle="rgba(24, 14, 7, 0.55)",A.fillRect(q,z+29,32,3)}}const[R,y]=vn(64),_=y.createRadialGradient(32,32,2,32,32,30);_.addColorStop(0,"rgba(255, 255, 255, 1)"),_.addColorStop(.35,"rgba(255, 255, 255, 0.7)"),_.addColorStop(.75,"rgba(255, 255, 255, 0.18)"),_.addColorStop(1,"rgba(255, 255, 255, 0)"),y.fillStyle=_,y.fillRect(0,0,64,64);const[P,U]=vn(128);U.fillStyle="#3c6e37",U.fillRect(0,0,128,128);for(let L=0;L<240;L++){const z=se(L,1,91)*128,V=se(L,2,91)*128,B=4+se(L,3,91)*8,q=se(L,4,91);U.fillStyle=q>.68?"rgba(122, 178, 76, 0.55)":q>.32?"rgba(62, 118, 52, 0.55)":"rgba(30, 66, 32, 0.55)",U.beginPath(),U.ellipse(z,V,B,B*.6,se(L,5,91)*Math.PI,0,Math.PI*2),U.fill()}return{terrainDetail:_n(o,46,46,!0),terrainBump:_n(e,46,46,!1),barkDark:_n(r,1,2,!0),barkBirch:_n(c,1,2,!0),woodPlank:_n(h,1,1,!0),woodPlankBump:_n(u,1,1,!1),stoneMasonry:_n(p,1,1,!0),stoneMasonryBump:_n(w,1,1,!1),roofShingle:_n(E,2,2,!0),softParticle:_n(R,1,1,!0),leafCluster:_n(P,2,2,!0)}}const F0=`
  varying vec3 vWorldDir;
  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldDir = normalize(position);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`,O0=`
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
`;class z0{skyMesh;sunLight;hemiLight;fog;sunDirection=new D(.4,.8,.3);horizonColor=new rt("#c8dff0");skyMat;starPoints;starMat;moonMesh;cloudGroup;cloudMaterials=[];lightningFlash=0;constructor(t){this.skyMat=new En({vertexShader:F0,fragmentShader:O0,side:Xe,depthWrite:!1,uniforms:{uTopColor:{value:new rt("#2768b5")},uHorizonColor:{value:new rt("#bfdcf2")},uGroundColor:{value:new rt("#1d3549")},uSunDir:{value:new D(.5,.7,.3)},uSunColor:{value:new rt("#fff2cc")},uNightFactor:{value:0},uTime:{value:0},uStormFactor:{value:0}}}),this.skyMesh=new T(new Se(420,32,20),this.skyMat),this.skyMesh.frustumCulled=!1,t.add(this.skyMesh);const e=1100,n=new Float32Array(e*3),i=new Float32Array(e*3);for(let c=0;c<e;c++){const l=Math.random()*Math.PI*2,h=Math.acos(.08+Math.random()*.92),d=385;n[c*3]=d*Math.sin(h)*Math.cos(l),n[c*3+1]=d*Math.cos(h),n[c*3+2]=d*Math.sin(h)*Math.sin(l);const u=Math.random();i[c*3]=u>.7?1:.85,i[c*3+1]=u>.4?.94:.88,i[c*3+2]=1}const s=new we;s.setAttribute("position",new Pe(n,3)),s.setAttribute("color",new Pe(i,3)),this.starMat=new Mo({size:2.2,vertexColors:!0,transparent:!0,opacity:0,depthWrite:!1,fog:!1}),this.starPoints=new Ta(s,this.starMat),t.add(this.starPoints),this.moonMesh=new T(new Se(11,16,16),new Yt({color:"#eef4ff",fog:!1})),t.add(this.moonMesh),this.cloudGroup=new Et;const r=new Ve(1,1);for(let c=0;c<28;c++){const l=new Et,h=new Nl({color:"#ffffff",transparent:!0,opacity:.84,fog:!0});this.cloudMaterials.push(h);const d=4+Math.floor(Math.random()*4);for(let g=0;g<d;g++){const v=new T(r,h);v.position.set((Math.random()-.5)*16,(Math.random()-.5)*2.4,(Math.random()-.5)*11);const p=5.5+Math.random()*7.5;v.scale.set(p,2.2+Math.random()*2,p*.78),l.add(v)}const u=c/28*Math.PI*2+Math.random()*.4,f=45+Math.random()*210;l.position.set(Math.cos(u)*f,74+Math.random()*26,Math.sin(u)*f),l.userData.speed=1.4+Math.random()*1.4,this.cloudGroup.add(l)}t.add(this.cloudGroup),this.sunLight=new Hd("#fff3dc",2.2),this.sunLight.castShadow=!0,this.sunLight.shadow.mapSize.set(2048,2048),this.sunLight.shadow.camera.near=10,this.sunLight.shadow.camera.far=260;const a=64;this.sunLight.shadow.camera.left=-a,this.sunLight.shadow.camera.right=a,this.sunLight.shadow.camera.top=a,this.sunLight.shadow.camera.bottom=-a,this.sunLight.shadow.bias=-5e-4,this.sunLight.shadow.normalBias=.04,t.add(this.sunLight),t.add(this.sunLight.target),this.hemiLight=new Fd("#a9d4ff","#4b5b3b",.85),t.add(this.hemiLight),this.fog=new ba("#bddaf0",.0038),t.fog=this.fog}setShadowQuality(t){const e=t==="high"?2048:t==="medium"?1024:512;this.sunLight.shadow.mapSize.set(e,e),this.sunLight.shadow.map&&(this.sunLight.shadow.map.dispose(),this.sunLight.shadow.map=null)}triggerLightning(){this.lightningFlash=1}update(t,e,n,i){this.lightningFlash>0&&(this.lightningFlash=Math.max(0,this.lightningFlash-t*3.8));const s=(n.timeOfDay-.25)*Math.PI*2,r=Math.sin(s),a=Math.cos(s);this.sunDirection.set(a,r,-.32).normalize();const l=Bt((r+.14)/.42,0,1),h=1-l,d=Bt(1-Math.abs(r)*4.2,0,1),u=n.weather==="storm"?n.weatherIntensity:n.weather==="rain"?n.weatherIntensity*.6:0,f=n.weather==="fog"?n.weatherIntensity:0,g=new rt("#2566b8"),v=new rt("#2d3363"),p=new rt("#060c1b"),m=new rt("#c2e0f5"),w=new rt("#f48c57"),b=new rt("#0f1d36"),x=p.clone().lerp(g,l).lerp(v,d*.75),I=b.clone().lerp(m,l).lerp(w,d*.88);u>.05&&I.lerp(new rt("#3b4859").multiplyScalar(.35+l*.65),u*.65),this.lightningFlash>.05&&(I.lerp(new rt("#e2f0ff"),this.lightningFlash*.7),x.lerp(new rt("#c7e2ff"),this.lightningFlash*.5)),this.horizonColor.copy(I),this.skyMat.uniforms.uTopColor.value.copy(x),this.skyMat.uniforms.uHorizonColor.value.copy(I),this.skyMat.uniforms.uSunDir.value.copy(this.sunDirection),this.skyMat.uniforms.uSunColor.value.set("#fff3d1").lerp(new rt("#ff8e47"),d*.85),this.skyMat.uniforms.uNightFactor.value=h,this.skyMat.uniforms.uTime.value=e,this.skyMat.uniforms.uStormFactor.value=u,this.starMat.opacity=Bt((h-.2)*1.25*(1-u*.85),0,.92),this.starPoints.rotation.y=e*.002,this.starPoints.position.copy(i),this.skyMesh.position.copy(i);const E=this.sunDirection.clone().negate();this.moonMesh.position.copy(i).addScaledVector(E,330),this.moonMesh.visible=E.y>-.1;const A=r>=-.05?this.sunDirection:E,R=1.5,y=Math.round(i.x/R)*R,_=Math.round(i.z/R)*R;if(this.sunLight.target.position.set(y,i.y,_),this.sunLight.position.set(y+A.x*110,i.y+Math.max(18,A.y*110),_+A.z*110),r>=-.05){const U=(.35+Bt(r,0,1)*2.1)*(1-u*.55)+this.lightningFlash*2.4;this.sunLight.intensity=U,this.sunLight.color.set("#fff4dc").lerp(new rt("#ff9a59"),d*.78)}else this.sunLight.intensity=.42*(1-u*.4)+this.lightningFlash*2.6,this.sunLight.color.set("#7ea8e8");this.hemiLight.color.copy(new rt("#284166").lerp(new rt("#a8d8ff"),l)),this.hemiLight.groundColor.copy(new rt("#141c24").lerp(new rt("#4c5c3a"),l)),this.hemiLight.intensity=(.32+l*.62)*(1-u*.25)+this.lightningFlash*.6,this.fog.color.copy(I),this.fog.density=.0034+u*.0042+f*.0075+h*.0016;const P=new rt("#253145").lerp(new rt("#ffffff"),l).lerp(new rt("#ffb587"),d*.72).lerp(new rt("#4a5666"),u*.7);for(const U of this.cloudMaterials)U.color.copy(P),U.opacity=.45+l*.35+u*.18;for(const U of this.cloudGroup.children)U.position.x+=n.windDirX*n.windSpeed*U.userData.speed*t,U.position.z+=n.windDirZ*n.windSpeed*U.userData.speed*t,U.position.x>250&&(U.position.x=-250),U.position.x<-250&&(U.position.x=250),U.position.z>250&&(U.position.z=-250),U.position.z<-250&&(U.position.z=250)}}function H0(o,t){const n=new Ae(bn,bn,256,256);n.rotateX(-Math.PI/2);const i=n.attributes.position,s=new Float32Array(i.count*3),r=new rt("#7f7254"),a=new rt("#a48a62"),c=new rt("#dec590"),l=new rt("#5a8f41"),h=new rt("#3f7634"),d=new rt("#3d5d38"),u=new rt("#475c3a"),f=new rt("#696b6e"),g=new rt("#3d3840"),v=new rt("#e6eef5"),p=new rt;for(let E=0;E<i.count;E++){const A=i.getX(E),R=i.getZ(E),y=o.sample(A,R);i.setY(E,y.height);const _=y.height,P=y.slope;if(_<Pt-.15){const z=Te(-5.5,-.15,_);p.copy(r).lerp(a,z)}else if(_<1.65){const z=Te(0,1.25,_);p.copy(a).lerp(c,z),y.biome==="marsh"&&p.lerp(u,Te(.25,1.3,_)*.8)}else if(y.biome==="marsh"?p.copy(u):y.biome==="pine"?p.copy(d).lerp(h,y.moisture*.35):y.biome==="volcanic"?p.copy(g):y.biome==="highland"?p.copy(d).lerp(f,.55):p.copy(l).lerp(h,y.moisture*.6),_<2.55){const z=1-Te(1.5,2.55,_);p.lerp(c,z*.85)}const U=Te(.42,.92,P);if(U>.01&&p.lerp(y.biome==="volcanic"?g:f,U*.9),_>17.5){const z=Te(17.5,22.8,_)*(1-Te(.65,1.15,P)*.7);p.lerp(v,Bt(z,0,.95))}const L=(Math.sin(A*.17)*Math.cos(R*.19)+Math.sin((A+R)*.08))*.035;s[E*3]=Bt(p.r+L,0,1),s[E*3+1]=Bt(p.g+L,0,1),s[E*3+2]=Bt(p.b+L*.6,0,1)}n.setAttribute("color",new Pe(s,3)),n.computeVertexNormals();const m=new Q({vertexColors:!0,map:t.terrainDetail,bumpMap:t.terrainBump,bumpScale:.24,roughness:.9,metalness:.03}),w=new T(n,m);w.receiveShadow=!0,w.castShadow=!0,w.name="terrain";const b=256,x=new Uint8Array(b*b*4);for(let E=0;E<b;E++){const A=E/(b-1)*bn-Fi;for(let R=0;R<b;R++){const y=R/(b-1)*bn-Fi,_=o.getHeight(y,A),P=Math.round(Bt((_+10)/38,0,1)*255),U=(E*b+R)*4;x[U]=P,x[U+1]=P,x[U+2]=P,x[U+3]=255}}const I=new Dl(x,b,b,cn);return I.minFilter=an,I.magFilter=an,I.wrapS=kn,I.wrapT=kn,I.needsUpdate=!0,{mesh:w,heightTexture:I}}const G0=`
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

  // Exact match to shared/src/waves.ts OCEAN_WAVES so boats ride the exact drawn swells!
  float sampleWaveDisp(vec2 xz, float depth) {
    float damp = clamp(depth / 2.2, 0.0, 1.0);
    float t = uTime * (0.82 + uWindSpeed * 0.34);
    float ampScale = (0.78 + uWindSpeed * 0.32) * damp;
    float y = 0.0;
    y += sin((xz.x * 0.86 + xz.y * 0.51) * 0.145 + t * 1.45) * 0.16;
    y += sin((xz.x * -0.42 + xz.y * 0.91) * 0.195 + t * 1.25) * 0.12;
    y += sin((xz.x * 0.71 + xz.y * -0.70) * 0.31 + t * 2.05) * 0.055;
    y += sin((xz.x * -0.92 + xz.y * -0.39) * 0.44 + t * 2.55) * 0.03;
    return y * ampScale;
  }

  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    float terrainH = sampleTerrainHeight(wp.xz);
    float depth = max(0.0, -terrainH);
    float disp = sampleWaveDisp(wp.xz, depth);

    wp.y += disp;
    vWorldPos = wp.xyz;
    vDepth = depth;
    vWaveCrest = disp;

    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`,V0=`
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
    float dist = length(cameraPosition - vWorldPos);
    float detailFade = exp(-dist * 0.0065);

    // Three-cascade scrolling normal ripples (coarse swell + capillary shimmer)
    vec2 p1 = vWorldPos.xz * 0.36 + vec2(uTime * 0.34, uTime * 0.22);
    vec2 p2 = vWorldPos.xz * 0.82 - vec2(uTime * 0.27, -uTime * 0.31);
    vec2 p3 = vWorldPos.xz * 1.85 + vec2(-uTime * 0.42, uTime * 0.38);
    float nx = waveNoise(p1) * 0.13 + (waveNoise(p2) * 0.08 + waveNoise(p3) * 0.04) * detailFade;
    float nz = waveNoise(p1 + vec2(4.2, 1.9)) * 0.13 + (waveNoise(p2 + vec2(2.7, 5.1)) * 0.08 + waveNoise(p3 + vec2(1.4, 3.3)) * 0.04) * detailFade;
    vec3 N = normalize(vec3(nx, 1.0, nz));

    vec3 V = normalize(cameraPosition - vWorldPos);
    vec3 L = normalize(uSunDir);

    // Beer-Lambert depth absorption: vibrant tropical turquoise shallows -> deep oceanic sapphire
    vec3 shallowCol = mix(vec3(0.09, 0.72, 0.70), vec3(0.04, 0.24, 0.34), uNightFactor);
    vec3 midCol = mix(vec3(0.04, 0.39, 0.56), vec3(0.02, 0.12, 0.22), uNightFactor);
    vec3 deepCol = mix(vec3(0.02, 0.15, 0.33), vec3(0.01, 0.05, 0.12), uNightFactor);

    float d1 = 1.0 - exp(-depth * 0.62);
    float d2 = 1.0 - exp(-depth * 0.19);
    vec3 waterCol = mix(shallowCol, midCol, d1);
    waterCol = mix(waterCol, deepCol, d2);

    // Subsurface turquoise glow through sunlit wave crests!
    float sss = pow(max(0.0, dot(V, -L + N * 0.55)), 3.2) * smoothstep(-0.04, 0.24, vWaveCrest);
    waterCol += vec3(0.08, 0.44, 0.42) * sss * (1.0 - uNightFactor * 0.85) * 0.75;

    // Animated golden-cyan seabed caustics in shallow lagoons & coral reefs
    if (depth < 3.4) {
      float c1 = sin(p1.x * 3.1 + sin(p2.y * 2.4));
      float c2 = cos(p2.x * 2.9 - cos(p1.y * 3.3));
      float caustic = pow(max(0.0, (c1 * c2) * 0.65 + 0.45), 3.2);
      float shallowMask = (1.0 - smoothstep(0.12, 3.4, depth)) * (1.0 - uNightFactor * 0.82);
      waterCol += vec3(0.28, 0.58, 0.54) * caustic * shallowMask * 0.55;
    }

    // Schlick Fresnel sky reflection
    float ndv = max(dot(N, V), 0.0);
    float fresnel = 0.03 + 0.97 * pow(1.0 - ndv, 4.0);
    vec3 col = mix(waterCol, uSkyHorizon * (0.98 - uNightFactor * 0.22), fresnel * 0.74);

    // Crisp GGX-style sun/moon glints
    vec3 H = normalize(L + V);
    float spec = pow(max(dot(N, H), 0.0), 210.0) * 2.2 + pow(max(dot(N, H), 0.0), 36.0) * 0.28;
    col += uSunColor * spec * (1.0 - uNightFactor * 0.62);

    // Lapping shoreline foam + offshore breaking crest whitecaps
    float shoreBand = 1.0 - smoothstep(0.0, 1.08, depth);
    float rippleLine = sin(depth * 13.0 - uTime * 3.2 + waveNoise(vWorldPos.xz * 0.52) * 2.4);
    float foamMask = smoothstep(0.30, 0.72, shoreBand + rippleLine * 0.24 * shoreBand);
    float edgeFoam = 1.0 - smoothstep(0.0, 0.24, depth);
    float crestNoise = waveNoise(vWorldPos.xz * 0.65 + uTime * 0.4);
    float crestFoam = smoothstep(0.16, 0.28, vWaveCrest + crestNoise * 0.04) * 0.46;
    float foam = clamp(max(foamMask * 0.84, edgeFoam) + crestFoam, 0.0, 1.0);
    vec3 foamColor = mix(vec3(0.94, 0.98, 1.0), vec3(0.36, 0.46, 0.60), uNightFactor * 0.84);
    col = mix(col, foamColor, foam);

    // Crystal clear shallows -> rich translucent deep sea
    float alpha = clamp(0.46 + (1.0 - exp(-depth * 0.82)) * 0.50 + foam * 0.38, 0.44, 0.97);

    // Atmospheric distance fog
    float fogFactor = 1.0 - exp(-pow(dist * uFogDensity, 2.0));
    col = mix(col, uFogColor, clamp(fogFactor, 0.0, 1.0));

    gl_FragColor = vec4(col, alpha);
  }
`;class W0{mesh;mat;constructor(t){const e=new Ae(760,760,176,176);e.rotateX(-Math.PI/2),this.mat=new En({vertexShader:G0,fragmentShader:V0,transparent:!0,depthWrite:!1,uniforms:{uTime:{value:0},uWindSpeed:{value:1},uSunDir:{value:new D(.4,.8,.3)},uSunColor:{value:new rt("#fff2d2")},uSkyHorizon:{value:new rt("#c2e0f5")},uFogColor:{value:new rt("#c2e0f5")},uFogDensity:{value:.0029},uNightFactor:{value:0},uHeightMap:{value:t},uWorldSize:{value:bn}}}),this.mesh=new T(e,this.mat),this.mesh.position.y=Pt,this.mesh.renderOrder=2}update(t,e,n,i,s,r,a,c){this.mat.uniforms.uTime.value=t,this.mat.uniforms.uWindSpeed.value=e.windSpeed,this.mat.uniforms.uSunDir.value.copy(n),this.mat.uniforms.uSunColor.value.copy(i),this.mat.uniforms.uSkyHorizon.value.copy(s),this.mat.uniforms.uFogColor.value.copy(r),this.mat.uniforms.uFogDensity.value=a,this.mat.uniforms.uNightFactor.value=c}dispose(){this.mesh.geometry.dispose(),this.mat.dispose()}}class X0{root=new Et;nodeGroup=new Et;nodeVisuals=new Map;grassUniforms={uTime:{value:0},uWindSpeed:{value:1}};runeGlowMeshes=[];sharedMats={};constructor(t,e,n,i=7500){this.initSharedMaterials(n),this.buildLandmarks(e,n),this.buildInstancedGrass(e,i),this.root.add(this.nodeGroup),t.add(this.root)}initSharedMaterials(t){this.sharedMats={barkDark:new Q({map:t.barkDark,roughness:.92}),barkBirch:new Q({map:t.barkBirch,roughness:.85}),barkPalm:new Q({color:"#8f6c47",map:t.barkDark,roughness:.9}),pineNeedle:new Q({color:"#2d5a36",map:t.leafCluster,roughness:.82}),pineNeedleLight:new Q({color:"#3b6e3f",map:t.leafCluster,roughness:.82}),oakLeaf:new Q({color:"#4c8037",map:t.leafCluster,roughness:.78}),birchLeaf:new Q({color:"#86a93f",map:t.leafCluster,roughness:.76}),palmLeaf:new Q({color:"#538c38",roughness:.75,side:de}),marshLeaf:new Q({color:"#465e3b",map:t.leafCluster,roughness:.85}),stone:new Q({color:"#7c828a",map:t.stoneMasonry,bumpMap:t.stoneMasonryBump,bumpScale:.14,roughness:.88}),stoneDark:new Q({color:"#494e56",roughness:.85}),copper:new Q({color:"#d47c44",metalness:.62,roughness:.35}),iron:new Q({color:"#a7b5c4",metalness:.72,roughness:.32}),obsidian:new Q({color:"#2c1f3f",emissive:"#1e1036",metalness:.4,roughness:.18}),crystal:new Q({color:"#49f2e1",emissive:"#18b8ad",emissiveIntensity:.75,roughness:.15,metalness:.25}),berryLeaf:new Q({color:"#366b32",roughness:.82}),berry:new Q({color:"#e63956",emissive:"#380912",roughness:.35}),reed:new Q({color:"#6da345",roughness:.8,side:de}),mushroomCap:new Q({color:"#c9783e",roughness:.65}),mushroomStem:new Q({color:"#e8dec8",roughness:.78}),crateWood:new Q({map:t.woodPlank,bumpMap:t.woodPlankBump,bumpScale:.12,roughness:.82}),ironBand:new Q({color:"#383d45",metalness:.75,roughness:.42})}}buildLandmarks(t,e){const n=new Q({map:e.stoneMasonry,bumpMap:e.stoneMasonryBump,bumpScale:.2,color:"#9aa0a6",roughness:.9}),i=new Q({color:"#5cf2e6",emissive:"#22d3ee",emissiveIntensity:1.4,roughness:.2}),s=-10,r=18,a=t.getHeight(s,r),c=new Et;c.position.set(s,a,r);const l=new T(new gt(5.6,6.2,.38,12),n);l.position.y=.12,l.receiveShadow=!0,c.add(l);for(let B=0;B<6;B++){const q=B/6*Math.PI*2+.25,H=new Et,nt=4.2+B%2*1.1,st=new T(new J(1.15,nt,.72),n);st.position.y=nt*.5,st.castShadow=!0,st.receiveShadow=!0,H.add(st);const at=new T(new oe(.82,.95,4),n);at.position.y=nt+.45,at.rotation.y=Math.PI/4,at.castShadow=!0,H.add(at);const bt=new T(new J(.18,nt*.52,.08),i);bt.position.set(0,nt*.52,.37),H.add(bt),this.runeGlowMeshes.push(bt),H.position.set(Math.cos(q)*6.8,-.1,Math.sin(q)*6.8),H.lookAt(s,a+2,r),H.rotation.z=(B%2===0?1:-1)*.05,c.add(H)}const h=new ke("#38f2dc",2.4,18,1.5);h.position.set(0,3.4,0),c.add(h);const d=new T(new Ye(.65,0),i);d.position.set(0,2.75,0),c.add(d),this.runeGlowMeshes.push(d),this.root.add(c);const u=new Et,f=new Q({color:"#3b8c42",roughness:.72,side:de}),g=new Q({color:"#f9a8d4",emissive:"#9d174d",emissiveIntensity:.25,roughness:.5});for(let B=0;B<14;B++){const q=B/14*Math.PI*2+.15,H=7.4+B%3*1.4,nt=16+Math.cos(q)*H,st=8+Math.sin(q)*H,at=t.getHeight(nt,st),bt=new T(new Ve(.65+B%3*.28,0),n);bt.position.set(nt,at+.15,st),bt.scale.set(1.25,.72,1.05),bt.rotation.set(B*.4,B*1.1,0),bt.castShadow=!0,bt.receiveShadow=!0,u.add(bt)}for(let B=0;B<10;B++){const q=B/10*Math.PI*2,H=2+B%4*1.3,nt=16+Math.cos(q)*H,st=8+Math.sin(q)*H,at=new T(new gt(.45+B%2*.18,.45,.04,9),f);if(at.position.set(nt,Pt+.04,st),u.add(at),B%2===0){const bt=new T(new Ye(.14,0),g);bt.position.set(nt,Pt+.14,st),u.add(bt)}}this.root.add(u);const v=-14,p=112,m=t.getHeight(v,p),w=new Et;w.position.set(v,m+.4,p),w.rotation.set(.16,.62,-.22);const b=new Q({map:e.woodPlank,color:"#6b4a2f",roughness:.92}),x=new T(new J(5.2,2.8,14.5),b);x.castShadow=!0,x.receiveShadow=!0,w.add(x);const I=new T(new oe(3.5,5.2,4),b);I.rotation.x=Math.PI/2,I.rotation.y=Math.PI/4,I.position.set(0,.2,9.2),I.castShadow=!0,w.add(I);const E=new T(new gt(.22,.32,9.5,8),b);E.position.set(0,5.2,.6),E.rotation.z=.14,E.castShadow=!0,w.add(E);const A=new T(new gt(.14,.14,6.8,7),b);A.rotation.z=Math.PI/2+.12,A.position.set(.4,7.6,.8),w.add(A);const R=new Q({color:"#ddd3be",roughness:.95,side:de}),y=new T(new Ae(5.6,3.6),R);y.position.set(.4,5.8,1.05),y.rotation.y=.08,w.add(y),this.root.add(w);const _=-44,P=-62,U=t.getHeight(_,P),L=new Et;L.position.set(_,U,P);const z=new T(new gt(3.4,3.8,7.5,8,1,!0),n);z.position.y=3.5,z.castShadow=!0,z.receiveShadow=!0,L.add(z);for(let B=0;B<6;B++){const q=B/6*Math.PI*2,H=new T(new J(1.1,1.3+B%2*.7,.7),n);H.position.set(Math.cos(q)*3.3,7.6,Math.sin(q)*3.3),H.lookAt(_,U+7.6,P),H.castShadow=!0,L.add(H)}this.root.add(L);const V=new Et;for(let B=0;B<3;B++){const q=78+B*7.5,H=32+B*3.8,nt=t.getHeight(q,H),st=new Et;st.position.set(q,nt,H),st.rotation.y=.48;const at=new T(new J(1.1,5.2,1.1),n);at.position.set(-2.3,2.4,0),at.castShadow=!0;const bt=new T(new J(1.1,4.8,1.1),n);bt.position.set(2.3,2.2,0),bt.castShadow=!0;const Zt=new T(new J(6,1,1.25),n);Zt.position.set(0,5,0),Zt.rotation.z=B===2?-.14:.03,Zt.castShadow=!0,st.add(at,bt,Zt),V.add(st)}this.root.add(V)}buildInstancedGrass(t,e){const n=new Ae(.42,.72,1,2);n.translate(0,.36,0);const i=n.attributes.position;for(let v=0;v<i.count;v++){const p=i.getY(v);p>.5?(i.setZ(v,.14),i.setX(v,i.getX(v)*.25)):p>.2&&i.setZ(v,.04)}n.computeVertexNormals();const s=new Nl({color:"#ffffff",side:de});s.onBeforeCompile=v=>{v.uniforms.uTime=this.grassUniforms.uTime,v.uniforms.uWindSpeed=this.grassUniforms.uWindSpeed,v.vertexShader=`uniform float uTime;
uniform float uWindSpeed;
`+v.vertexShader,v.vertexShader=v.vertexShader.replace("#include <begin_vertex>",`
        #include <begin_vertex>
        vec4 instWorld = instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
        float sway = sin(uTime * (1.8 + uWindSpeed * 0.7) + instWorld.x * 0.28 + instWorld.z * 0.22) * 0.18 * uWindSpeed;
        float sway2 = cos(uTime * 1.1 + instWorld.z * 0.45) * 0.09;
        float tipMask = clamp(position.y / 0.72, 0.0, 1.0);
        transformed.x += (sway + sway2) * tipMask * tipMask;
        transformed.z += sway * 0.5 * tipMask * tipMask;
        `)};const r=Ia(t.seed+9191),a=[],c=[],l=new xe,h=["#5d9c3f","#6eb044","#4d8739","#7bb34b"],d=["#3f6c38","#4b7a3d","#355c33"],u=["#f4d35e","#f7f4ea","#ec7d8d","#9dc6f7"];let f=0;for(;a.length<e&&f<e*3;){f++;const v=(r()*2-1)*140,p=(r()*2-1)*140,m=t.sample(v,p);if(m.height<1.75||m.height>12.2||m.slope>.52||m.biome==="volcanic"||m.biome==="beach"||m.biome==="ocean")continue;const w=.65+r()*.95;l.position.set(v,m.height-.04,p),l.rotation.set(0,r()*Math.PI*2,(r()-.5)*.15),l.scale.set(w,w*(.8+r()*.55),w),l.updateMatrix(),a.push(l.matrix.clone());let b;m.biome==="meadow"&&r()<.085?b=u[Math.floor(r()*u.length)]:m.biome==="meadow"?b=h[Math.floor(r()*h.length)]:b=d[Math.floor(r()*d.length)],c.push(new rt(b))}const g=new Ld(n,s,a.length);for(let v=0;v<a.length;v++)g.setMatrixAt(v,a[v]),g.setColorAt(v,c[v]);g.instanceMatrix.needsUpdate=!0,g.instanceColor&&(g.instanceColor.needsUpdate=!0),g.receiveShadow=!0,this.root.add(g)}syncNodes(t){for(const e of t)this.upsertNode(e)}upsertNode(t){let e=this.nodeVisuals.get(t.id);if(e)!t.depleted&&e.group.visible&&t.hp<t.maxHp&&(e.shakeTime=.24);else{const n=this.createNodeMesh(t.kind);n.position.set(t.x,t.y,t.z),n.rotation.y=t.rotY,n.scale.setScalar(t.scale),n.traverse(i=>{i.userData.nodeId=t.id,i.userData.nodeKind=t.kind}),this.nodeGroup.add(n),e={group:n,baseX:t.x,baseY:t.y,baseZ:t.z,baseRotY:t.rotY,shakeTime:0,kind:t.kind},this.nodeVisuals.set(t.id,e)}e.group.visible=!t.depleted}getNodeVisualClone(t){const e=this.nodeVisuals.get(t);if(!e)return null;const n=e.group.clone();return n.visible=!0,n}createNodeMesh(t){const e=new Et;if(t==="pine_tree"){const n=new T(new gt(.18,.42,3.6,7),this.sharedMats.barkDark);n.position.y=1.75,n.castShadow=!0,n.receiveShadow=!0,e.add(n),[{y:3.1,r:2.15,h:2.4},{y:4.5,r:1.75,h:2.2},{y:5.8,r:1.32,h:2},{y:6.9,r:.82,h:1.6}].forEach((s,r)=>{const a=new T(new oe(s.r,s.h,7),r%2===0?this.sharedMats.pineNeedle:this.sharedMats.pineNeedleLight);a.position.y=s.y,a.rotation.y=r*.65,a.castShadow=!0,a.receiveShadow=!0,e.add(a)})}else if(t==="oak_tree"){const n=new T(new gt(.28,.52,3.2,7),this.sharedMats.barkDark);n.position.y=1.55,n.castShadow=!0,e.add(n);const i=[[0,4.1,0,1.85],[1.1,3.6,.5,1.35],[-1,3.7,-.6,1.4],[.3,4.9,-.4,1.25]];for(const[s,r,a,c]of i){const l=new T(new Ve(c,1),this.sharedMats.oakLeaf);l.position.set(s,r,a),l.scale.set(1.05,.85,1.05),l.castShadow=!0,l.receiveShadow=!0,e.add(l)}}else if(t==="birch_tree"){const n=new T(new gt(.14,.28,4.2,7),this.sharedMats.barkBirch);n.position.y=2.05,n.castShadow=!0,e.add(n);const i=[[0,4.5,0,1.45],[.75,4,.4,1.05],[-.7,4.2,-.35,1.1]];for(const[s,r,a,c]of i){const l=new T(new Ve(c,1),this.sharedMats.birchLeaf);l.position.set(s,r,a),l.castShadow=!0,e.add(l)}}else if(t==="palm_tree"){let n=0,i=0;for(let s=0;s<5;s++){const r=new T(new gt(.18-s*.015,.24-s*.015,1.15,7),this.sharedMats.barkPalm);r.position.set(i,n+.52,0),r.rotation.z=-s*.08,r.castShadow=!0,e.add(r),n+=1.05,i+=s*.12}for(let s=0;s<7;s++){const r=s/7*Math.PI*2,a=new Ae(.75,2.8,1,3),c=a.attributes.position;for(let h=0;h<c.count;h++){const d=c.getY(h)+1.4;c.setY(h,d),c.setZ(h,-d*d*.16)}a.computeVertexNormals();const l=new T(a,this.sharedMats.palmLeaf);l.position.set(i,n,0),l.rotation.y=r,l.rotation.x=1.08,l.castShadow=!0,e.add(l)}for(let s=0;s<3;s++){const r=s/3*Math.PI*2,a=new T(new Se(.19,6,6),this.sharedMats.barkDark);a.position.set(i+Math.cos(r)*.28,n-.15,Math.sin(r)*.28),e.add(a)}}else if(t==="marsh_tree"){const n=new T(new gt(.24,.55,3,6),this.sharedMats.barkDark);n.position.y=1.45,n.rotation.z=.12,n.castShadow=!0,e.add(n);const i=new T(new Ve(1.9,1),this.sharedMats.marshLeaf);i.position.set(.3,3.5,0),i.scale.set(1.25,.72,1.25),i.castShadow=!0,e.add(i)}else if(t==="stone_boulder"||t==="copper_vein"||t==="iron_vein"||t==="obsidian_vein"){const n=t==="obsidian_vein"?this.sharedMats.obsidian:this.sharedMats.stone,i=new T(new Ve(1.15,0),n);i.scale.set(1.18,.82,1),i.position.y=.62,i.castShadow=!0,i.receiveShadow=!0,e.add(i);const s=new T(new Ve(.68,0),this.sharedMats.stoneDark);if(s.position.set(.75,.42,.45),s.castShadow=!0,e.add(s),t!=="stone_boulder"){const r=t==="copper_vein"?this.sharedMats.copper:t==="iron_vein"?this.sharedMats.iron:this.sharedMats.crystal;for(let a=0;a<5;a++){const c=a/5*Math.PI*2,l=new T(new Ye(.28+a%2*.1,0),r);l.position.set(Math.cos(c)*.72,.65+a%3*.22,Math.sin(c)*.66),l.rotation.set(a,a*1.4,.4),e.add(l)}}}else if(t==="ancient_crystal"){const n=new T(new Ve(.85,0),this.sharedMats.stoneDark);n.scale.set(1.2,.55,1.2),n.position.y=.3,e.add(n);for(let i=0;i<4;i++){const s=i/4*Math.PI*2,r=i===0?1.9:1.2+i%2*.35,a=new T(new oe(.26,r,5),this.sharedMats.crystal);a.position.set(Math.cos(s)*(i===0?0:.38),r*.5+.15,Math.sin(s)*(i===0?0:.38)),a.rotation.z=i===0?.05:Math.cos(s)*.28,a.rotation.x=i===0?0:Math.sin(s)*.28,a.castShadow=!0,e.add(a)}}else if(t==="berry_bush"){const n=new T(new Ve(.75,1),this.sharedMats.berryLeaf);n.scale.set(1.15,.82,1.15),n.position.y=.52,n.castShadow=!0,e.add(n);for(let i=0;i<10;i++){const s=i/10*Math.PI*2,r=new T(new Se(.085,5,5),this.sharedMats.berry);r.position.set(Math.cos(s)*.62,.42+i%3*.18,Math.sin(s)*.62),e.add(r)}}else if(t==="fiber_reed")for(let n=0;n<6;n++){const i=n/6*Math.PI*2,s=new T(new Ae(.22,1.15),this.sharedMats.reed);s.position.set(Math.cos(i)*.22,.55,Math.sin(i)*.22),s.rotation.y=i,s.rotation.x=.14,e.add(s)}else if(t==="mushroom_cluster")for(let n=0;n<4;n++){const i=n/4*Math.PI*2,s=.7+n%2*.4,r=new T(new gt(.07*s,.1*s,.36*s,6),this.sharedMats.mushroomStem);r.position.set(Math.cos(i)*.25,.18*s,Math.sin(i)*.25);const a=new T(new oe(.26*s,.2*s,7),this.sharedMats.mushroomCap);a.position.set(r.position.x,.4*s,r.position.z),e.add(r,a)}else if(t==="driftwood"){const n=new T(new gt(.2,.26,2.2,7),this.sharedMats.barkPalm);n.rotation.z=Math.PI/2,n.position.y=.22,n.castShadow=!0,e.add(n)}else if(t==="supply_crate"){const n=new T(new J(1.05,.95,1.05),this.sharedMats.crateWood);n.position.y=.48,n.castShadow=!0,n.receiveShadow=!0,e.add(n);const i=new T(new J(1.09,.16,1.09),this.sharedMats.ironBand);i.position.y=.48,e.add(i)}else if(t==="coral_reef_node"){const n=new Q({color:"#f472b6",emissive:"#ec4899",emissiveIntensity:.38,roughness:.55});for(let s=0;s<4;s++){const r=s/4*Math.PI*2,a=new T(new oe(.24,.85,6),n);a.position.set(Math.cos(r)*.28,.42,Math.sin(r)*.28),a.rotation.z=Math.cos(r)*.35,a.rotation.x=Math.sin(r)*.35,e.add(a)}const i=new T(new Se(.18,10,10),new Q({color:"#f0f9ff",emissive:"#38bdf8",emissiveIntensity:.65,roughness:.15,metalness:.3}));i.position.set(0,.52,0),e.add(i)}else if(t==="sunbloom_flower"){const n=new Q({color:"#4d7c0f",roughness:.8}),i=new Q({color:"#fde047",emissive:"#f59e0b",emissiveIntensity:.55,roughness:.4});for(let s=0;s<3;s++){const r=s/3*Math.PI*2,a=Math.cos(r)*.24,c=Math.sin(r)*.24,l=new T(new gt(.035,.05,.68,5),n);l.position.set(a,.34,c);const h=new T(new Ye(.22,0),i);h.position.set(a,.72,c),e.add(l,h)}}else if(t==="sunken_wreck_chest"){const n=new T(new J(1.18,.72,.78),this.sharedMats.crateWood);n.position.y=.36,n.castShadow=!0;const i=new T(new gt(.39,.39,1.18,8,1,!1,0,Math.PI),this.sharedMats.crateWood);i.rotation.z=Math.PI/2,i.position.y=.72;const s=new T(new J(1.22,.14,.82),new Q({color:"#facc15",emissive:"#d97706",emissiveIntensity:.35,metalness:.75,roughness:.28}));s.position.y=.68,e.add(n,i,s)}return e}update(t,e,n){this.grassUniforms.uTime.value=e,this.grassUniforms.uWindSpeed.value=n;for(let i=0;i<this.runeGlowMeshes.length;i++){const s=this.runeGlowMeshes[i],r=s.material;r.emissiveIntensity=1+Math.sin(e*2.1+i)*.45,i===this.runeGlowMeshes.length-1&&(s.rotation.y=e*.9,s.position.y=2.75+Math.sin(e*1.8)*.22)}for(const i of this.nodeVisuals.values())if(i.shakeTime>0){i.shakeTime=Math.max(0,i.shakeTime-t);const s=i.shakeTime*.55;i.group.rotation.z=Math.sin(e*55)*s,i.group.rotation.x=Math.cos(e*48)*s*.6,i.shakeTime===0&&(i.group.rotation.z=0,i.group.rotation.x=0)}}}class q0{group=new Et;visuals=new Map;mats;ghostGroup=null;ghostKind=null;ghostValidMat;ghostInvalidMat;constructor(t,e){this.mats={wood:new Q({map:e.woodPlank,bumpMap:e.woodPlankBump,bumpScale:.14,roughness:.82}),woodDark:new Q({map:e.barkDark,color:"#6b472b",roughness:.88}),roof:new Q({map:e.roofShingle,roughness:.85}),stone:new Q({map:e.stoneMasonry,bumpMap:e.stoneMasonryBump,bumpScale:.2,roughness:.88}),iron:new Q({color:"#3f4650",metalness:.72,roughness:.35}),cloth:new Q({color:"#b84c3e",roughness:.92}),hide:new Q({color:"#a37146",roughness:.88}),flameOuter:new Yt({color:"#ff6a1a",transparent:!0,opacity:.9}),flameInner:new Yt({color:"#ffe573"}),ember:new Q({color:"#ff4500",emissive:"#ff5500",emissiveIntensity:1.6}),crystal:new Q({color:"#5cf2e6",emissive:"#22d3ee",emissiveIntensity:1.4,roughness:.15}),water:new Q({color:"#2fb8d9",roughness:.15,metalness:.1,transparent:!0,opacity:.85})},this.ghostValidMat=new Yt({color:"#38f2dc",transparent:!0,opacity:.42,wireframe:!1,depthWrite:!1}),this.ghostInvalidMat=new Yt({color:"#f87171",transparent:!0,opacity:.45,depthWrite:!1}),t.add(this.group)}syncAll(t){const e=new Set;for(const n of t)e.add(n.id),this.upsert(n);for(const n of Array.from(this.visuals.keys()))e.has(n)||this.remove(n)}upsert(t){let e=this.visuals.get(t.id);e||(e=this.buildVisual(t),e.group.traverse(n=>{n.userData.structureId=t.id,n.userData.structureKind=t.kind}),this.group.add(e.group),this.visuals.set(t.id,e)),e.state=t,e.group.position.set(t.x,t.y,t.z),e.group.rotation.y=t.rotY,e.flame&&(e.flame.visible=!!t.lit),e.light&&(e.light.visible=!!t.lit)}remove(t){const e=this.visuals.get(t);e&&(this.group.remove(e.group),this.visuals.delete(t))}getLitCampfirePositions(){const t=[];for(const e of this.visuals.values())(e.state.kind==="campfire"||e.state.kind==="furnace")&&e.state.lit&&t.push(e.group.position);return t}updateGhost(t,e,n,i,s,r){if(!t){this.ghostGroup&&(this.group.remove(this.ghostGroup),this.ghostGroup=null,this.ghostKind=null);return}if(this.ghostKind!==t||!this.ghostGroup){this.ghostGroup&&this.group.remove(this.ghostGroup);const c={id:"ghost",kind:t,ownerId:"",ownerName:"",x:e,y:n,z:i,rotY:s,hp:100,maxHp:100,lit:!1};this.ghostGroup=this.buildVisual(c,!0).group,this.ghostKind=t,this.group.add(this.ghostGroup)}this.ghostGroup.position.set(e,n,i),this.ghostGroup.rotation.y=s;const a=r?this.ghostValidMat:this.ghostInvalidMat;this.ghostGroup.traverse(c=>{c.isMesh&&(c.material=a,c.castShadow=!1,c.receiveShadow=!1)})}buildVisual(t,e=!1){const n=new Et,i={group:n,state:t};switch(t.kind){case"campfire":{for(let r=0;r<8;r++){const a=r/8*Math.PI*2,c=new T(new Ve(.24,0),this.mats.stone);c.position.set(Math.cos(a)*.62,.14,Math.sin(a)*.62),c.castShadow=!0,n.add(c)}for(let r=0;r<3;r++){const a=new T(new gt(.09,.1,1.05,6),this.mats.woodDark);a.rotation.z=Math.PI/2,a.rotation.y=r/3*Math.PI,a.position.y=.14,n.add(a)}const s=new T(new gt(.42,.48,.1,8),this.mats.ember);if(s.position.y=.08,n.add(s),!e){const r=new Et,a=new T(new oe(.32,.92,6),this.mats.flameOuter);a.position.y=.5;const c=new T(new oe(.18,.62,6),this.mats.flameInner);c.position.y=.38,r.add(a,c),n.add(r),i.flame=r;const l=new ke("#ff8a33",5.5,16,1.6);l.position.set(0,1.25,0),n.add(l),i.light=l}break}case"workbench":{const s=new T(new J(1.9,.16,1.05),this.mats.wood);s.position.y=.95,s.castShadow=!0,s.receiveShadow=!0,n.add(s);const r=[[-.8,-.4],[.8,-.4],[-.8,.4],[.8,.4]];for(const[l,h]of r){const d=new T(new J(.16,.95,.16),this.mats.woodDark);d.position.set(l,.47,h),d.castShadow=!0,n.add(d)}const a=new T(new J(1.7,.52,.1),this.mats.woodDark);a.position.set(0,1.25,-.46),n.add(a);const c=new T(new J(.34,.2,.22),this.mats.iron);c.position.set(.55,1.12,.1),n.add(c);break}case"furnace":{const s=new T(new gt(.92,1.1,1.5,8),this.mats.stone);s.position.y=.75,s.castShadow=!0,s.receiveShadow=!0,n.add(s);const r=new T(new gt(.45,.72,1.25,8),this.mats.stone);r.position.y=2.05,r.castShadow=!0,n.add(r);const a=new T(new J(.62,.56,.35),this.mats.ember);if(a.position.set(0,.52,.84),n.add(a),!e){const c=new ke("#ff6b22",4.4,13,1.6);c.position.set(0,.8,1.25),n.add(c),i.light=c}break}case"runic_forge":{const s=new T(new gt(.95,1.15,.95,6),this.mats.stone);s.position.y=.48,s.castShadow=!0,n.add(s);const r=new T(new Ye(.46,0),this.mats.crystal);if(r.position.y=1.68,n.add(r),i.crystal=r,!e){const a=new ke("#38f2dc",5,15,1.5);a.position.set(0,1.8,0),n.add(a),i.light=a}break}case"wood_foundation":{const s=new T(new J(ee,.32,ee),this.mats.wood);s.position.y=.36,s.castShadow=!0,s.receiveShadow=!0,n.add(s);const r=ee*.44;for(const[a,c]of[[-r,-r],[r,-r],[-r,r],[r,r]]){const l=new T(new gt(.15,.17,1.8,6),this.mats.woodDark);l.position.set(a,-.5,c),l.castShadow=!0,n.add(l)}break}case"wood_wall":{const s=new T(new J(ee,De,.28),this.mats.wood);s.position.y=De*.5,s.castShadow=!0,s.receiveShadow=!0,n.add(s);for(const r of[-ee*.48,ee*.48]){const a=new T(new J(.24,De+.08,.36),this.mats.woodDark);a.position.set(r,De*.5,0),n.add(a)}break}case"wood_doorway":{const s=(ee-1.25)*.5,r=new T(new J(s,De,.28),this.mats.wood);r.position.set(-1.1125,De*.5,0),r.castShadow=!0,r.receiveShadow=!0;const a=r.clone();a.position.x=-r.position.x;const c=new T(new J(1.3,.62,.3),this.mats.woodDark);c.position.set(0,De-.31,0),n.add(r,a,c);const l=new Et;l.position.set(-.6,0,0);const h=new T(new J(1.18,De-.64,.14),this.mats.woodDark);h.position.set(.59,(De-.64)*.5,0),h.castShadow=!0;const d=new T(new Se(.08,6,6),this.mats.iron);d.position.set(1.02,1.15,.1),l.add(h,d),n.add(l),i.doorPivot=l;break}case"wood_roof":{const s=new T(new J(ee+.35,.28,ee+.35),this.mats.roof);s.position.y=.14,s.castShadow=!0,s.receiveShadow=!0,n.add(s);break}case"wood_stairs":{for(let s=0;s<5;s++){const r=new T(new J(2.4,.22,.58),this.mats.wood);r.position.set(0,.12+s*.24,-1+s*.5),r.castShadow=!0,r.receiveShadow=!0,n.add(r)}break}case"stone_wall":{const s=new T(new J(ee,De,.52),this.mats.stone);s.position.y=De*.5,s.castShadow=!0,s.receiveShadow=!0,n.add(s);for(const r of[-1.05,0,1.05]){const a=new T(new J(.62,.42,.56),this.mats.stone);a.position.set(r,De+.21,0),a.castShadow=!0,n.add(a)}break}case"spike_barricade":{const s=new T(new J(2.5,.22,.25),this.mats.woodDark);s.position.y=.65,n.add(s);for(let r=-2;r<=2;r++){const a=new T(new oe(.14,1.9,6),this.mats.wood);a.position.set(r*.52,.85,0),a.rotation.x=.42,a.castShadow=!0,n.add(a)}break}case"storage_chest":{const s=new T(new J(1.22,.72,.78),this.mats.wood);s.position.y=.36,s.castShadow=!0,s.receiveShadow=!0,n.add(s);const r=new T(new J(1.26,.2,.82),this.mats.woodDark);r.position.y=.78,r.castShadow=!0,n.add(r);const a=new T(new J(.18,.24,.1),this.mats.iron);a.position.set(0,.68,.42),n.add(a);break}case"bedroll":{const s=new T(new J(1.15,.16,2.05),this.mats.cloth);s.position.y=.09,s.receiveShadow=!0;const r=new T(new J(.86,.22,.42),this.mats.hide);r.position.set(0,.2,-.72),n.add(s,r);break}case"rain_collector":{const s=new T(new gt(.75,.62,.9,10),this.mats.wood);s.position.y=.45,s.castShadow=!0,n.add(s);const r=new T(new gt(.68,.64,.12,10),this.mats.water);r.position.y=.4,n.add(r),i.waterMesh=r;for(let a=0;a<4;a++){const c=a/4*Math.PI*2,l=new T(new gt(.05,.06,1.55,5),this.mats.woodDark);l.position.set(Math.cos(c)*.68,.8,Math.sin(c)*.68),n.add(l)}break}case"lantern_post":{const s=new T(new gt(.09,.13,3.1,6),this.mats.woodDark);s.position.y=1.55,s.castShadow=!0;const r=new T(new J(.75,.1,.1),this.mats.woodDark);r.position.set(.35,2.95,0);const a=new T(new Ye(.24,0),this.mats.flameInner);if(a.position.set(.68,2.68,0),n.add(s,r,a),!e){const c=new ke("#ffbd59",5.2,18,1.5);c.position.set(.68,2.6,0),n.add(c),i.light=c}break}case"watchtower_beacon":{const s=new T(new gt(1.1,1.5,4.4,8),this.mats.stone);s.position.y=2.2,s.castShadow=!0;const r=new T(new gt(1.25,.75,.65,8),this.mats.iron);r.position.y=4.6;const a=new T(new Ye(.62,1),this.mats.crystal);if(a.position.y=5.4,n.add(s,r,a),i.crystal=a,!e){const c=new ke("#38f2dc",9,32,1.3);c.position.set(0,5.6,0),n.add(c),i.light=c}break}case"dock_pier":{const s=new T(new J(ee,.24,ee),this.mats.wood);s.position.y=.36,s.castShadow=!0,s.receiveShadow=!0,n.add(s);const r=ee*.44;for(const[c,l]of[[-r,-r],[r,-r],[-r,r],[r,r]]){const h=new T(new gt(.14,.17,5.2,7),this.mats.woodDark);h.position.set(c,-1.7,l),h.castShadow=!0,n.add(h)}const a=new T(new gt(.13,.16,.65,8),this.mats.woodDark);a.position.set(r*.85,.72,r*.85),n.add(a);break}case"lighthouse_beacon":{const s=new T(new gt(1.05,1.65,7.6,12),new Q({color:"#e2e8f0",roughness:.75}));s.position.y=3.8,s.castShadow=!0,s.receiveShadow=!0;const r=new T(new gt(1.25,1.42,1.8,12),new Q({color:"#dc2626",roughness:.72}));r.position.y=4.2;const a=new T(new gt(1.45,1.3,.35,12),this.mats.iron);a.position.y=7.65;const c=new T(new oe(1.25,1.2,12),new Q({color:"#b91c1c",roughness:.65}));c.position.y=9.2;const l=new T(new Se(.55,12,12),new Yt({color:"#fef08a"}));l.position.y=8.25,n.add(s,r,a,c,l);const h=new Et;h.position.y=8.25;const d=new Yt({color:"#fde68a",transparent:!0,opacity:.17,blending:Gi,side:de,depthWrite:!1});for(const u of[-1,1]){const f=new T(new oe(4.2,34,14,1,!0),d);f.rotation.z=u*Math.PI/2,f.position.x=u*17,h.add(f)}if(n.add(h),i.spinner=h,!e){const u=new ke("#fde047",11,45,1.2);u.position.y=8.3,n.add(u),i.light=u}break}case"planter_box":{const s=new T(new J(1.85,.55,1.25),this.mats.wood);s.position.y=.28,s.castShadow=!0;const r=new T(new J(1.65,.14,1.05),new Q({color:"#3f2818",roughness:.96}));r.position.y=.52,n.add(s,r);const a=new Et,c=new Q({color:"#22c55e",roughness:.7}),l=new Q({color:"#fde047",emissive:"#f59e0b",emissiveIntensity:.55});for(let h=-1;h<=1;h++){const d=new T(new Ve(.24,0),c);d.position.set(h*.48,.72,0);const u=new T(new Ye(.14,0),l);u.position.set(h*.48,.96,0),a.add(d,u)}n.add(a),i.cropGroup=a;break}case"alchemy_cauldron":{const s=new T(new Se(.68,12,10,0,Math.PI*2,Math.PI*.3,Math.PI*.7),this.mats.iron);s.position.y=.85,s.castShadow=!0;const r=new T(new ws(.56,12),new Yt({color:"#2dd4bf"}));r.rotation.x=-Math.PI/2,r.position.y=1.02,n.add(s,r);for(let a=0;a<3;a++){const c=a/3*Math.PI*2,l=new T(new gt(.06,.08,1.55,6),this.mats.woodDark);l.position.set(Math.cos(c)*.58,.75,Math.sin(c)*.58),l.rotation.z=Math.cos(c)*.25,l.rotation.x=-Math.sin(c)*.25,n.add(l)}if(!e){const a=new ke("#2dd4bf",4.2,12,1.6);a.position.y=1.25,n.add(a),i.light=a}break}case"windmill":{const s=new T(new gt(1.15,1.65,5.8,8),this.mats.stone);s.position.y=2.9,s.castShadow=!0;const r=new T(new oe(1.4,1.7,8),this.mats.woodDark);r.position.y=6.55,n.add(s,r);const a=new Et;a.position.set(0,5.3,1.25);const c=new Q({color:"#f5ead6",roughness:.85,side:de});for(let l=0;l<4;l++){const h=new Et;h.rotation.z=l*Math.PI/2;const d=new T(new J(.12,3.2,.1),this.mats.woodDark);d.position.y=1.6;const u=new T(new J(.75,2.55,.04),c);u.position.set(.36,1.85,.04),h.add(d,u),a.add(h)}n.add(a),i.spinner=a;break}case"camp_banner":{const s=new T(new gt(.06,.08,4.2,6),this.mats.woodDark);s.position.y=2.1,s.castShadow=!0;const r=new T(new Ae(1.45,.9),new Q({color:"#0d9488",emissive:"#115e59",emissiveIntensity:.25,side:de}));r.position.set(.76,3.55,0),n.add(s,r),i.spinner=r;break}case"tiki_brazier":{const s=new T(new gt(.42,.56,1.25,7),this.mats.stone);s.position.y=.62,s.castShadow=!0;const r=new T(new gt(.62,.35,.42,8),this.mats.iron);r.position.y=1.38,n.add(s,r);const a=new Et,c=new T(new oe(.42,.95,6),this.mats.flameOuter);c.position.y=1.85;const l=new T(new oe(.24,.6,5),this.mats.flameInner);if(l.position.y=1.75,a.add(c,l),n.add(a),i.flame=a,!e){const h=new ke("#ff9436",6.2,18,1.5);h.position.y=2,n.add(h),i.light=h}break}}return i}update(t,e){for(const n of this.visuals.values()){if(n.flame&&n.state.lit){const i=.88+Math.sin(e*16+n.state.x)*.14+Math.cos(e*23)*.08;n.flame.scale.set(i,.9+Math.sin(e*19+n.state.z)*.22,i),n.flame.rotation.y=e*2.5}if(n.light&&n.state.lit&&n.state.kind==="campfire"&&(n.light.intensity=5.2+Math.sin(e*14+n.state.x)*1.1),n.doorPivot){const i=n.state.isOpen?-Math.PI*.56:0;n.doorPivot.rotation.y+=(i-n.doorPivot.rotation.y)*Math.min(1,t*8)}if(n.crystal&&(n.crystal.rotation.y=e*1.4,n.crystal.position.y=(n.state.kind==="watchtower_beacon"?5.45:1.68)+Math.sin(e*2.5)*.14),n.waterMesh){const i=(n.state.waterLevel??0)/100;n.waterMesh.position.y=.15+i*.68,n.waterMesh.visible=i>.04}if(n.spinner&&(n.state.kind==="lighthouse_beacon"?n.spinner.rotation.y=e*.72:n.state.kind==="windmill"?n.spinner.rotation.z=-e*1.15:n.state.kind==="camp_banner"&&(n.spinner.rotation.y=Math.sin(e*4.5+n.state.x)*.24)),n.cropGroup){const s=.35+(n.state.cropProgress??30)/100*.75;n.cropGroup.scale.set(s,s,s)}}}}class $0{group=new Et;scene;world;tex;boats=new Map;wakeParticles=[];foamGeo=new ws(.45,8);sprayGeo=new Se(.11,5,5);ghostGroup=null;ghostKind=null;constructor(t,e,n){this.scene=t,this.world=e,this.tex=n,this.scene.add(this.group),this.foamGeo.rotateX(-Math.PI/2)}syncAll(t){const e=new Set;for(const n of t){e.add(n.id);const i=this.boats.get(n.id);i?i.state=n:this.addBoat(n)}for(const n of Array.from(this.boats.keys()))e.has(n)||this.removeBoat(n)}addBoat(t){if(this.boats.has(t.id)){this.boats.get(t.id).state=t;return}const e=this.createBoatMesh(t.kind);e.root.position.set(t.x,Pt,t.z),e.root.rotation.y=t.yaw,e.root.traverse(n=>{n.userData.boatId=t.id}),this.group.add(e.root),this.boats.set(t.id,{state:t,root:e.root,hullGroup:e.hullGroup,sailMesh:e.sailMesh,rudderPivot:e.rudderPivot,lanternLights:e.lanternLights,curX:t.x,curZ:t.z,curYaw:t.yaw,curHeave:Pt,curPitch:0,curRoll:0,wakeAccum:0})}updateBoatState(t){const e=this.boats.get(t.id);e?e.state=t:this.addBoat(t)}removeBoat(t){const e=this.boats.get(t);e&&(this.group.remove(e.root),this.boats.delete(t))}getHelmWorldPos(t){const e=this.boats.get(t);if(!e)return null;const n=ln[e.state.kind],i=Math.cos(e.curYaw),s=Math.sin(e.curYaw);return new D(e.curX+s*n.helmOffsetZ,e.curHeave+n.deckY,e.curZ+i*n.helmOffsetZ)}getAll(){return Array.from(this.boats.values()).map(t=>t.state)}getById(t){return this.boats.get(t)?.state??null}getVisualPose(t){const e=this.boats.get(t);return e?{x:e.curX,y:e.curHeave,z:e.curZ,yaw:e.curYaw}:null}findNearestBoat(t,e,n=7.2){let i=null,s=n;for(const r of this.boats.values()){const a=Math.hypot(r.curX-t,r.curZ-e);a<s&&(s=a,i=r.state)}return i}updateGhost(t,e,n,i,s){if(!t){this.ghostGroup&&(this.ghostGroup.visible=!1);return}if(!this.ghostGroup||this.ghostKind!==t){this.ghostGroup&&this.scene.remove(this.ghostGroup);const r=this.createBoatMesh(t);r.root.traverse(a=>{a instanceof T&&(a.castShadow=!1,a.receiveShadow=!1,a.material=new Yt({color:s?"#2dd4bf":"#f87171",transparent:!0,opacity:.45,wireframe:!1})),a instanceof Eo&&(a.visible=!1)}),this.ghostGroup=r.root,this.ghostKind=t,this.scene.add(this.ghostGroup)}this.ghostGroup.visible=!0,this.ghostGroup.position.set(e,Pt+.15,n),this.ghostGroup.rotation.y=i,this.ghostGroup.traverse(r=>{r instanceof T&&r.material instanceof Yt&&r.material.color.set(s?"#2dd4bf":"#f87171")})}update(t,e,n,i){for(const s of this.boats.values()){const r=s.state,a=ln[r.kind],c=Math.min(1,t*11);s.curX+=(r.x-s.curX)*c,s.curZ+=(r.z-s.curZ)*c;let l=r.yaw-s.curYaw;for(;l>Math.PI;)l-=Math.PI*2;for(;l<-Math.PI;)l+=Math.PI*2;s.curYaw+=l*c;const h=D0(s.curX,s.curZ,s.curYaw,a.length*.46,a.beam*.46,e,n.windSpeed,(m,w)=>this.world.getHeight(m,w)),d=-r.rudder*Math.min(1,Math.abs(r.speed)/7)*.16,u=Math.min(1,t*6.5);s.curHeave+=(h.heave-s.curHeave)*u,s.curPitch+=(h.pitch-s.curPitch)*u,s.curRoll+=(h.roll+d-s.curRoll)*u,s.root.position.set(s.curX,s.curHeave,s.curZ),s.root.rotation.y=s.curYaw,s.hullGroup.rotation.set(s.curPitch,0,s.curRoll);const g=r.throttle>=3?1:r.throttle===2?.62:.14;s.sailMesh.scale.y+=(g-s.sailMesh.scale.y)*Math.min(1,t*5);const v=r.throttle>=2?1.15+Math.sin(e*5.2+s.curX)*.12*n.windSpeed:.35;s.sailMesh.scale.z+=(v-s.sailMesh.scale.z)*Math.min(1,t*5),s.rudderPivot.rotation.y=r.rudder*.55;for(const m of s.lanternLights)m.intensity=(.4+i*2.4)*(.94+Math.sin(e*7.5+s.curZ)*.06);const p=Math.abs(r.speed);if(p>.7)for(s.wakeAccum+=t*(4+p*2.2);s.wakeAccum>=1;)s.wakeAccum-=1,this.spawnWake(s.curX,s.curHeave,s.curZ,s.curYaw,a.length,a.beam,p)}for(let s=this.wakeParticles.length-1;s>=0;s--){const r=this.wakeParticles[s];if(r.age+=t,r.age>=r.maxAge){this.scene.remove(r.mesh),r.mesh.material.dispose(),this.wakeParticles.splice(s,1);continue}const a=r.age/r.maxAge;r.mesh.position.x+=r.vx*t,r.mesh.position.z+=r.vz*t,r.isSpray?(r.vy-=9.8*t,r.mesh.position.y+=r.vy*t):r.mesh.scale.setScalar(1+a*2.6);const c=r.mesh.material;c.opacity=(1-a)*(r.isSpray?.85:.55)}}spawnWake(t,e,n,i,s,r,a){if(this.wakeParticles.length>140)return;const c=-Math.sin(i),l=-Math.cos(i),h=Math.cos(i),d=-Math.sin(i),u=t-c*(s*.48)+(Math.random()-.5)*r*.5,f=n-l*(s*.48)+(Math.random()-.5)*r*.5,g=new Yt({color:"#e0f7fa",transparent:!0,opacity:.52,depthWrite:!1}),v=new T(this.foamGeo,g);if(v.position.set(u,e+.08,f),this.scene.add(v),this.wakeParticles.push({mesh:v,vx:(Math.random()-.5)*.6,vy:0,vz:(Math.random()-.5)*.6,age:0,maxAge:1.4+Math.random()*.7,isSpray:!1}),a>3.5&&Math.random()<.65){const p=Math.random()<.5?-1:1,m=t+c*(s*.45)+h*p*(r*.28),w=n+l*(s*.45)+d*p*(r*.28),b=new Yt({color:"#f0fdff",transparent:!0,opacity:.85}),x=new T(this.sprayGeo,b);x.position.set(m,e+.25,w),this.scene.add(x),this.wakeParticles.push({mesh:x,vx:h*p*(1.2+Math.random()*1.4),vy:1.9+Math.random()*1.6,vz:d*p*(1.2+Math.random()*1.4),age:0,maxAge:.55+Math.random()*.25,isSpray:!0})}}createBoatMesh(t){const e=new Et,n=new Et;e.add(n);const i=new Q({map:this.tex.woodPlank,roughness:.82,color:t==="longship"?"#6d4528":t==="skiff"?"#8c5a34":"#9b7248"}),s=new Q({map:this.tex.barkDark,roughness:.88,color:"#4e311d"}),r=new Q({color:"#c8a97e",roughness:.95}),a=new Q({color:"#d4a64a",metalness:.72,roughness:.3}),c=[],l=new Et;let h;if(t==="raft"){for(let p=-3;p<=3;p++){const m=new T(new gt(.18,.19,3.8,8),s);m.rotation.x=Math.PI/2,m.position.set(p*.35,.05,0),m.castShadow=!0,m.receiveShadow=!0,n.add(m)}for(const p of[-1.25,0,1.25]){const m=new T(new J(2.55,.12,.24),i);m.position.set(0,.22,p),n.add(m);const w=new T(new J(2.6,.16,.08),r);w.position.set(0,.22,p),n.add(w)}const d=new T(new gt(.08,.11,3.6,8),s);d.position.set(0,1.95,-.3),d.castShadow=!0,n.add(d);const u=new T(new gt(.05,.05,2.2,6),s);u.rotation.z=Math.PI/2,u.position.set(0,3.2,-.35),n.add(u);const f=new Ae(2.05,2.15,6,6),g=f.attributes.position;for(let p=0;p<g.count;p++){const m=g.getX(p)/1.05,w=g.getY(p)/1.1;g.setZ(p,-Math.max(0,(1-m*m)*(1-w*w))*.42)}f.computeVertexNormals(),h=new T(f,new Q({color:"#f3e5c8",roughness:.9,side:de})),h.position.set(0,2.15,-.4),h.castShadow=!0,n.add(h),l.position.set(0,.35,1.75);const v=new T(new J(.1,.1,1.8),s);v.position.set(0,-.18,.65),v.rotation.x=.28,l.add(v),n.add(l)}else if(t==="skiff"){const d=new T(new J(2.1,.72,4.6),i);d.position.set(0,.12,0),d.castShadow=!0,d.receiveShadow=!0,n.add(d);const u=new T(new oe(1.18,1.65,4),i);u.rotation.x=-Math.PI/2,u.rotation.y=Math.PI/4,u.scale.set(.88,1,.56),u.position.set(0,.2,-3),u.castShadow=!0,n.add(u);for(const R of[-1.02,1.02]){const y=new T(new J(.14,.34,4.6),s);y.position.set(R,.55,0),n.add(y)}const f=new T(new gt(.18,.14,4.1,8),s);f.rotation.x=Math.PI/2,f.position.set(1.95,.02,0),n.add(f);for(const R of[-.95,.95]){const y=new T(new gt(.06,.06,1.9,6),r);y.rotation.z=Math.PI/2,y.position.set(1.05,.32,R),n.add(y)}const g=new T(new J(1.05,.62,.75),s);g.position.set(0,.58,.55),n.add(g);const v=new T(new J(.24,.14,.8),a);v.position.set(0,.68,.55),n.add(v);const p=new T(new gt(.09,.13,5.2,8),s);p.position.set(0,2.7,-.55),p.castShadow=!0,n.add(p);const m=new T(new gt(.06,.06,3.1,6),s);m.rotation.z=Math.PI/2,m.position.set(0,4.55,-.62),n.add(m);const w=new Ae(2.9,3.1,8,8),b=w.attributes.position;for(let R=0;R<b.count;R++){const y=b.getX(R)/1.5,_=b.getY(R)/1.6;b.setZ(R,-Math.max(0,(1-y*y)*(1-_*_))*.62)}w.computeVertexNormals(),h=new T(w,new Q({map:this.createStripedSailTex("#1e3a8a","#fbbf24"),roughness:.85,side:de})),h.position.set(0,3,-.68),h.castShadow=!0,n.add(h);const x=new T(new gt(.04,.05,1,6),a);x.position.set(0,.95,-2.5),n.add(x);const I=new T(new Se(.15,8,8),new Yt({color:"#fde68a"}));I.position.set(0,1.45,-2.5),n.add(I);const E=new ke("#ffb74d",1.4,15,1.8);E.position.set(0,1.5,-2.5),n.add(E),c.push(E),l.position.set(0,.35,2.35);const A=new T(new J(.12,1.05,.55),s);A.position.set(0,-.4,.25),l.add(A),n.add(l)}else{const d=new T(new J(2.85,.95,6.8),i);d.position.set(0,.2,0),d.castShadow=!0,d.receiveShadow=!0,n.add(d);const u=new T(new oe(1.55,2.5,4),i);u.rotation.x=-Math.PI/2,u.rotation.y=Math.PI/4,u.scale.set(.92,1,.62),u.position.set(0,.35,-4.5),n.add(u);const f=new T(new oe(1.45,2.1,4),i);f.rotation.x=Math.PI/2,f.rotation.y=Math.PI/4,f.scale.set(.92,1,.6),f.position.set(0,.35,4.35),n.add(f);const g=new T(new gt(.18,.28,2.3,8),s);g.position.set(0,1.55,-5.2),g.rotation.x=.28,n.add(g);const v=new T(new J(.45,.42,.92),s);v.position.set(0,2.65,-5.6),n.add(v);const p=new T(new oe(.18,.65,5),a);p.position.set(0,3.05,-5.35),p.rotation.x=-.5,n.add(p);const m=["#b91c1c","#1d4ed8","#d97706","#0f766e"];for(let R=0;R<4;R++){const y=-2.1+R*1.4;for(const _ of[-1.52,1.52]){const P=new T(new gt(.46,.46,.08,12),new Q({color:m[(R+(_>0?1:0))%m.length],roughness:.7}));P.rotation.z=Math.PI/2,P.position.set(_,.78,y),n.add(P);const U=new T(new Se(.12,8,8),a);U.position.set(_+Math.sign(_)*.05,.78,y),n.add(U)}}for(const R of[.85,1.75]){const y=new T(new J(1.25,.68,.72),s);y.position.set(0,.78,R),n.add(y)}const w=new T(new gt(.14,.19,7.6,10),s);w.position.set(0,4,-.55),w.castShadow=!0,n.add(w);const b=new T(new gt(.08,.08,5.2,8),s);b.rotation.z=Math.PI/2,b.position.set(0,6.65,-.68),n.add(b);const x=new T(new J(.05,.35,1.25),new Q({color:"#dc2626",roughness:.85}));x.position.set(0,7.65,.05),n.add(x);const I=new Ae(4.8,4.4,10,8),E=I.attributes.position;for(let R=0;R<E.count;R++){const y=E.getX(R)/2.4,_=E.getY(R)/2.2;E.setZ(R,-Math.max(0,(1-y*y)*(1-_*_))*.95)}I.computeVertexNormals(),h=new T(I,new Q({map:this.createStripedSailTex("#991b1b","#fef3c7"),roughness:.82,side:de})),h.position.set(0,4.45,-.75),h.castShadow=!0,n.add(h);for(const R of[-4.6,3.9]){const y=new T(new Se(.18,8,8),new Yt({color:"#fde68a"}));y.position.set(0,1.85,R),n.add(y);const _=new ke("#ffa726",1.6,20,1.7);_.position.set(0,1.9,R),n.add(_),c.push(_)}l.position.set(1.25,.45,3.3);const A=new T(new J(.14,1.5,.72),s);A.position.set(0,-.55,.25),l.add(A),n.add(l)}return{root:e,hullGroup:n,sailMesh:h,rudderPivot:l,lanternLights:c}}createStripedSailTex(t,e){const n=document.createElement("canvas");n.width=256,n.height=256;const i=n.getContext("2d"),s=6,r=n.width/s;for(let c=0;c<s;c++)i.fillStyle=c%2===0?t:e,i.fillRect(c*r,0,r+1,n.height);i.fillStyle="rgba(0,0,0,0.06)";for(let c=0;c<n.height;c+=8)i.fillRect(0,c,n.width,2);const a=new Aa(n);return a.colorSpace=$e,a}}class Y0{group=new Et;scene;world;tex;gulls=[];fireflies;fireflyMat;godRays=[];jettyLantern=null;volcanoLight=null;bobberGroup;lineMesh;fishingActive=!1;bobberPos=new D;biteDip=0;constructor(t,e,n){this.scene=t,this.world=e,this.tex=n,this.scene.add(this.group),this.buildSouthHarborJetty(),this.buildShipwreckAtollWreck(),this.buildSeaArchLandmark(),this.buildVolcanicCaldera(),this.buildCoralReefDecor(),this.buildSeagulls(),this.buildFireflies(),this.buildGodRays(),this.bobberGroup=new Et;const i=new T(new Se(.13,10,8,0,Math.PI*2,0,Math.PI*.55),new Q({color:"#ef4444",roughness:.3})),s=new T(new Se(.13,10,8,0,Math.PI*2,Math.PI*.5,Math.PI*.5),new Q({color:"#f8fafc",roughness:.3})),r=new T(new So(.24,.32,16),new Yt({color:"#e0f2fe",transparent:!0,opacity:.65,side:de}));r.rotation.x=-Math.PI/2,this.bobberGroup.add(i,s,r),this.bobberGroup.visible=!1,this.scene.add(this.bobberGroup);const a=new we().setFromPoints([new D,new D,new D]);this.lineMesh=new kl(a,new Ea({color:"#e2e8f0",transparent:!0,opacity:.72})),this.lineMesh.visible=!1,this.scene.add(this.lineMesh)}setFishingBobber(t,e,n,i,s){if(this.fishingActive=t,this.bobberGroup.visible=t,this.lineMesh.visible=t,!t)return;this.bobberPos.set(n,Pt,i),this.biteDip=s?1:0;const r=e.clone().lerp(this.bobberGroup.position,.5);r.y+=s?.15:.65;const a=[e,r,this.bobberGroup.position.clone()];this.lineMesh.geometry.setFromPoints(a)}update(t,e,n,i){for(const c of this.gulls){const l=e*c.speed+c.phase,h=c.centerX+Math.cos(l)*c.radius,d=c.centerZ+Math.sin(l)*c.radius,u=c.altitude+Math.sin(e*.9+c.phase)*1.8;c.group.position.set(h,u,d),c.group.rotation.y=-l;const f=Math.sin(e*6.4+c.phase*3)*.55;c.leftWing.rotation.z=f,c.rightWing.rotation.z=-f}const s=this.fireflies.geometry.attributes.position;for(let c=0;c<s.count;c++){const l=s.getY(c),h=Math.sin(e*.9+c*1.7)*.008;s.setY(c,l+h)}s.needsUpdate=!0;const r=Math.max(0,1-Math.abs(n.timeOfDay-.74)*11)+Math.max(0,1-Math.abs(n.timeOfDay-.27)*11);this.fireflyMat.opacity=Math.min(.95,i*.85+r*.55+.12),this.fireflyMat.color.set(i>.35?"#d9f99d":"#fef08a");const a=Math.max(0,(1-i)*(.045+r*.09)*(1-n.weatherIntensity*.7));for(let c=0;c<this.godRays.length;c++){const l=this.godRays[c];l.material.opacity=a*(.85+Math.sin(e*.6+c)*.15)}if(this.jettyLantern&&(this.jettyLantern.intensity=(.7+i*2.5)*(.93+Math.sin(e*8)*.07)),this.volcanoLight&&(this.volcanoLight.intensity=2.4+Math.sin(e*3.1)*.6),this.fishingActive){const c=ms(this.bobberPos.x,this.bobberPos.z,e,n.windSpeed,this.world.getHeight(this.bobberPos.x,this.bobberPos.z)),l=this.biteDip>0?Math.sin(e*22)*.16-.14:Math.sin(e*3)*.03;this.bobberGroup.position.set(this.bobberPos.x,c+l,this.bobberPos.z);const h=this.bobberGroup.children[2];if(h){const d=this.biteDip>0?1.2+Math.sin(e*16)*.55:1+Math.sin(e*3)*.15;h.scale.setScalar(d)}}}buildSouthHarborJetty(){const t=this.world.getHarborJettySpot(),e=new Et,n=new Q({map:this.tex.woodPlank,roughness:.85,color:"#9c7850"}),i=new Q({map:this.tex.barkDark,roughness:.92,color:"#5c3f28"});for(let h=0;h<4;h++){const d=t.z-4+h*3.1,u=new T(new J(3.2,.24,3.05),n);u.position.set(t.x,Pt+.78,d),u.castShadow=!0,u.receiveShadow=!0,e.add(u);for(const f of[-1.45,1.45]){const g=new T(new gt(.13,.16,4.4,8),i);g.position.set(t.x+f,Pt-.65,d+1.2),g.castShadow=!0,e.add(g)}}const s=t.z+6.4,r=new T(new gt(.08,.1,3.2,8),i);r.position.set(t.x-1.35,Pt+2.3,s),e.add(r);const a=new T(new J(.9,.08,.08),i);a.position.set(t.x-.95,Pt+3.7,s),e.add(a);const c=new T(new Se(.18,10,10),new Yt({color:"#fde68a"}));c.position.set(t.x-.55,Pt+3.45,s),e.add(c);const l=new ke("#ffb74d",1.8,22,1.7);l.position.set(t.x-.55,Pt+3.4,s),e.add(l),this.jettyLantern=l,this.scene.add(e)}buildShipwreckAtollWreck(){const n=Math.max(.5,this.world.getHeight(-148,136)),i=new Et;i.position.set(-146,n-.2,134),i.rotation.set(.14,.55,-.22);const s=new Q({map:this.tex.barkDark,roughness:.92,color:"#583b26"}),r=new T(new J(4.2,2.2,11.5),s);r.position.y=.9,r.castShadow=!0,i.add(r);for(let l=-4;l<=4;l++)for(const h of[-2.15,2.15]){const d=new T(new J(.22,2.8,.3),s);d.position.set(h,2,l*1.2),d.rotation.z=h>0?.18:-.18,i.add(d)}const a=new T(new gt(.18,.24,9.5,8),s);a.position.set(0,5.2,-1.2),a.rotation.z=.22,i.add(a);const c=new T(new Ae(4.2,3.6),new Q({color:"#d6c7ae",roughness:.95,side:de}));c.position.set(.7,6.2,-1.2),c.rotation.y=.4,i.add(c),this.scene.add(i)}buildSeaArchLandmark(){const n=new Q({map:this.tex.stoneMasonry,roughness:.92,color:"#6b757e"}),i=new Et;i.position.set(-124,Pt,-114),i.rotation.y=Math.PI*.25;for(const a of[-8.5,8.5]){const c=new T(new gt(2.6,3.8,16,8),n);c.position.set(a,5.5,0),c.castShadow=!0,c.receiveShadow=!0,i.add(c)}const s=new T(new J(20.5,3.4,4.6),n);s.position.set(0,13.5,0),s.castShadow=!0,i.add(s);const r=new T(new Ye(1.1,0),new Yt({color:"#38f2dc"}));r.position.set(0,16.4,0),i.add(r),this.scene.add(i)}buildVolcanicCaldera(){const n=Math.max(4,this.world.getHeight(152,-136)),i=new Et;i.position.set(152,n,-136);const s=new Yt({color:"#ff5722"}),r=new T(new ws(4.5,16),s);r.rotation.x=-Math.PI/2,r.position.y=.22,i.add(r);const a=new T(new oe(1.4,7.5,5),new Q({color:"#1e1b24",roughness:.45,metalness:.4}));a.position.set(3.8,3.5,-2.2),a.castShadow=!0,i.add(a);const c=new ke("#ff6d00",2.6,32,1.5);c.position.set(0,3.2,0),i.add(c),this.volcanoLight=c,this.scene.add(i)}buildCoralReefDecor(){const t=["#ff6b9d","#2dd4bf","#fb923c","#a855f7","#facc15"],e=new Et,n=[[-136,128],[-152,122],[-160,144],[-134,148],[12,114],[30,112],[-22,118],[52,92],[-132,-128],[134,-124]];for(let i=0;i<n.length;i++){const[s,r]=n[i];for(let a=0;a<5;a++){const c=s+Math.cos(a*1.4+i)*(2.5+a*.9),l=r+Math.sin(a*1.9+i)*(2.5+a*.9),h=this.world.getHeight(c,l);if(h>-.25||h<-2.4)continue;const d=t[(i+a)%t.length],u=new T(new Ve(.45+a%3*.16,0),new Q({color:d,emissive:d,emissiveIntensity:.32,roughness:.6}));u.position.set(c,h+.3,l),u.scale.set(1.1,.75+a%2*.4,1.1),e.add(u)}}this.scene.add(e)}buildSeagulls(){const t=new Q({color:"#f8fafc",roughness:.6}),e=new Q({color:"#e2e8f0",roughness:.65}),n=[[18,108,28],[-14,112,26],[-148,136,30],[152,-136,34],[-146,-134,30],[0,10,42]];for(let i=0;i<18;i++){const[s,r,a]=n[i%n.length],c=new Et,l=new T(new oe(.11,.55,5),t);l.rotation.x=Math.PI/2,c.add(l);const h=new T(new J(.75,.04,.2),e);h.position.set(-.36,0,0);const d=new T(new J(.75,.04,.2),e);d.position.set(.36,0,0),c.add(h,d),this.scene.add(c),this.gulls.push({group:c,leftWing:h,rightWing:d,centerX:s,centerZ:r,radius:a+i%5*6.5,altitude:16+i%6*4.2,speed:(.14+i%4*.035)*(i%2===0?1:-1),phase:i*1.15})}}buildFireflies(){const e=new Float32Array(540);for(let i=0;i<180;i++){const s=i*2.39996,r=8+Math.sqrt(i/180)*115,a=Math.cos(s)*r,c=Math.sin(s)*r,l=Math.max(Pt+.5,this.world.getHeight(a,c));e[i*3]=a,e[i*3+1]=l+.9+i%7*.45,e[i*3+2]=c}const n=new we;n.setAttribute("position",new Pe(e,3)),this.fireflyMat=new Mo({color:"#fef08a",size:.34,transparent:!0,opacity:.5,blending:Gi,depthWrite:!1}),this.fireflies=new Ta(n,this.fireflyMat),this.scene.add(this.fireflies)}buildGodRays(){const t=[[-10,18],[16,8],[-146,-134]];for(const[e,n]of t){const i=Math.max(0,this.world.getHeight(e,n)),s=new T(new oe(7.5,36,14,1,!0),new Yt({color:"#fde68a",transparent:!0,opacity:.06,blending:Gi,side:de,depthWrite:!1}));s.position.set(e+4,i+16,n-2),s.rotation.z=.24,this.scene.add(s),this.godRays.push(s)}}}const el={ranger:{tunic:"#3b6b4c",cloak:"#2c4a38",pants:"#4f3f31",hair:"#4a3121"},nomad:{tunic:"#b56738",cloak:"#7a3f22",pants:"#453b34",hair:"#241b16"},warden:{tunic:"#3b5678",cloak:"#26384f",pants:"#353a42",hair:"#d4b47c"},alchemist:{tunic:"#5d4375",cloak:"#3b2b4d",pants:"#342f3d",hair:"#9e4736"},mariner:{tunic:"#2d7a78",cloak:"#1e5250",pants:"#3e4a52",hair:"#524034"}};class nl{group=new Et;bodyGroup=new Et;headGroup=new Et;leftArm=new Et;rightArm=new Et;leftLeg=new Et;rightLeg=new Et;heldItemAnchor=new Et;armorMesh;torchLight=null;nameplateSprite=null;nameplateCanvas=null;lastLabelKey="";currentItemId=null;currentArmorId=null;animClock=0;constructor(t,e){const n=el[t]||el.ranger,i=new Q({color:"#e5b893",roughness:.78}),s=new Q({color:n.tunic,roughness:.84}),r=new Q({color:n.cloak,roughness:.88}),a=new Q({color:n.pants,roughness:.86}),c=new Q({color:"#2b2019",roughness:.9}),l=new Q({color:n.hair,roughness:.85}),h=new Q({color:"#7d5333",roughness:.88}),d=new T(new J(.58,.72,.34),s);d.position.y=1.08,d.castShadow=!0,this.bodyGroup.add(d);const u=new T(new J(.68,.18,.4),r);u.position.y=1.38,u.castShadow=!0,this.bodyGroup.add(u);const f=new T(new J(.61,.11,.37),c);f.position.y=.76,this.bodyGroup.add(f);const g=new T(new J(.42,.52,.24),h);g.position.set(0,1.12,-.26),g.castShadow=!0,this.bodyGroup.add(g);const v=new T(new gt(.09,.09,.48,8),new Q({color:"#b85343",roughness:.9}));v.rotation.z=Math.PI/2,v.position.set(0,1.43,-.27),this.bodyGroup.add(v),this.armorMesh=new T(new J(.64,.56,.4),new Q({color:"#8d5936",roughness:.55,metalness:.3})),this.armorMesh.position.y=1.12,this.armorMesh.visible=!1,this.bodyGroup.add(this.armorMesh),this.headGroup.position.set(0,1.48,0);const p=new T(new J(.4,.42,.4),i);p.position.y=.22,p.castShadow=!0;const m=new T(new J(.43,.22,.43),l);m.position.set(0,.36,-.02);const w=new Yt({color:"#1b1d24"}),b=new T(new J(.06,.06,.04),w);b.position.set(-.09,.23,.2);const x=b.clone();x.position.x=.09,this.headGroup.add(p,m,b,x),this.bodyGroup.add(this.headGroup),this.leftArm.position.set(-.39,1.36,0);const I=new J(.18,.58,.18),E=new T(I,s);E.position.y=-.24,E.castShadow=!0;const A=new T(new J(.15,.14,.15),i);A.position.y=-.56,this.leftArm.add(E,A),this.rightArm.position.set(.39,1.36,0);const R=new T(I,s);R.position.y=-.24,R.castShadow=!0;const y=new T(new J(.15,.14,.15),i);y.position.y=-.56,this.heldItemAnchor.position.set(0,-.56,.08),this.rightArm.add(R,y,this.heldItemAnchor),this.bodyGroup.add(this.leftArm,this.rightArm),this.leftLeg.position.set(-.16,.72,0);const _=new J(.21,.52,.22),P=new T(_,a);P.position.y=-.26,P.castShadow=!0;const U=new T(new J(.22,.22,.28),c);U.position.set(0,-.6,.03),this.leftLeg.add(P,U),this.rightLeg.position.set(.16,.72,0);const L=new T(_,a);L.position.y=-.26,L.castShadow=!0;const z=U.clone();if(this.rightLeg.add(L,z),this.bodyGroup.add(this.leftLeg,this.rightLeg),this.group.add(this.bodyGroup),e){this.nameplateCanvas=document.createElement("canvas"),this.nameplateCanvas.width=256,this.nameplateCanvas.height=64;const V=new Aa(this.nameplateCanvas),B=new Pl({map:V,transparent:!0,depthTest:!1});this.nameplateSprite=new Id(B),this.nameplateSprite.position.set(0,2.35,0),this.nameplateSprite.scale.set(2.1,.52,1),this.group.add(this.nameplateSprite)}}setHeldItem(t){if(this.currentItemId===t)return;for(this.currentItemId=t;this.heldItemAnchor.children.length>0;)this.heldItemAnchor.remove(this.heldItemAnchor.children[0]);if(this.torchLight=null,!t)return;const e=new Q({color:"#7d5230",roughness:.85}),n=new Q({color:"#8f98a3",roughness:.75}),i=new Q({color:"#cbd6e2",metalness:.78,roughness:.28});if(t==="torch"){const s=new T(new gt(.04,.035,.65,6),e);s.rotation.x=Math.PI*.42,s.position.set(0,.05,.24);const r=new T(new oe(.11,.28,6),new Yt({color:"#ffae38"}));r.position.set(0,.24,.54);const a=new ke("#ff9436",4.6,15,1.6);a.position.set(0,.35,.58),this.torchLight=a,this.heldItemAnchor.add(s,r,a)}else if(t==="stone_axe"||t==="iron_axe"){const s=new T(new gt(.035,.035,.82,6),e);s.rotation.x=Math.PI*.46,s.position.set(0,.05,.32);const r=new T(new J(.08,.28,.24),t==="iron_axe"?i:n);r.position.set(0,.14,.68),this.heldItemAnchor.add(s,r)}else if(t==="stone_pickaxe"||t==="iron_pickaxe"){const s=new T(new gt(.035,.035,.85,6),e);s.rotation.x=Math.PI*.46,s.position.set(0,.04,.34);const r=new T(new J(.09,.54,.1),t==="iron_pickaxe"?i:n);r.position.set(0,.08,.72),this.heldItemAnchor.add(s,r)}else if(t==="wood_spear"){const s=new T(new gt(.03,.035,1.75,6),e);s.rotation.x=Math.PI*.48,s.position.set(0,.04,.55);const r=new T(new oe(.08,.3,5),n);r.rotation.x=Math.PI*.48,r.position.set(0,.08,1.48),this.heldItemAnchor.add(s,r)}else if(t==="iron_sword"||t==="shadow_blade"){const s=t==="shadow_blade",r=s?new Q({color:"#4c2673",emissive:"#9333ea",emissiveIntensity:.9,metalness:.6,roughness:.2}):i,a=new T(new J(.06,.12,s?1.15:.95),r);a.position.set(0,.04,.62);const c=new T(new J(.32,.07,.07),i);c.position.set(0,.04,.14),this.heldItemAnchor.add(a,c)}else if(t==="hunting_bow"||t==="starlight_bow"){const s=t==="starlight_bow"?new Q({color:"#38f2dc",emissive:"#14b8a6",emissiveIntensity:.85}):e,r=new T(new Ca(.45,.032,6,14,Math.PI),s);r.rotation.y=Math.PI/2,r.rotation.z=-Math.PI/2,r.position.set(0,.06,.22),this.heldItemAnchor.add(r)}else if(t==="build_hammer"){const s=new T(new gt(.035,.035,.62,6),e);s.rotation.x=Math.PI*.45,s.position.set(0,.04,.25);const r=new T(new J(.16,.16,.3),n);r.position.set(0,.1,.56),this.heldItemAnchor.add(s,r)}}setArmor(t){if(this.currentArmorId===t)return;if(this.currentArmorId=t,!t){this.armorMesh.visible=!1;return}this.armorMesh.visible=!0;const e=this.armorMesh.material;t==="leather_armor"?(e.color.set("#8d5936"),e.metalness=.08,e.emissive.set("#000000")):t==="iron_armor"?(e.color.set("#9eadbd"),e.metalness=.72,e.emissive.set("#000000")):(e.color.set("#2b2140"),e.metalness=.5,e.emissive.set("#22d3ee"),e.emissiveIntensity=.4)}updateNameplate(t){if(!this.nameplateCanvas||!this.nameplateSprite)return;const e=Math.round(t.vitals.hp/Math.max(1,t.vitals.maxHp)*100),n=`${t.name}|${e}|${t.pvpEnabled}|${t.emote??""}`;if(n===this.lastLabelKey)return;this.lastLabelKey=n;const i=this.nameplateCanvas.getContext("2d");i.clearRect(0,0,256,64),i.fillStyle="rgba(12, 18, 28, 0.72)",i.beginPath(),i.roundRect(18,8,220,46,12),i.fill(),i.font="bold 20px Inter, system-ui, sans-serif",i.textAlign="center",i.fillStyle=t.isBot?"#7dd3fc":t.pvpEnabled?"#fca5a5":"#f8fafc";const s=t.emote==="wave"?" 👋":t.emote==="cheer"?" 🔥":t.emote==="help"?" ⚠️":t.emote==="camp"?" ⛺":"";i.fillText(`${t.name}${s}`,128,32),i.fillStyle="rgba(255,255,255,0.18)",i.fillRect(46,40,164,7),i.fillStyle=e>45?"#4ade80":"#f87171",i.fillRect(46,40,164*e/100,7);const r=this.nameplateSprite.material.map;r.needsUpdate=!0}animate(t,e,n){if(this.setHeldItem(e.equippedItemId),this.setArmor(e.armorItemId),this.updateNameplate(e),this.torchLight&&(this.torchLight.intensity=4.4+Math.sin(n*18)*.75),!e.alive||e.anim==="dead"){this.bodyGroup.rotation.x=Math.PI/2,this.bodyGroup.position.y=.25;return}this.bodyGroup.rotation.x=0,this.bodyGroup.position.y=0;const i=Math.hypot(e.vx,e.vz),s=e.anim==="walk"||e.anim==="run"||i>.4,r=e.anim==="run"?11.5:7.5;if(this.animClock+=t*(s?r:2.2),e.anim==="swim"){this.bodyGroup.rotation.x=.65,this.bodyGroup.position.y=-.3;const a=Math.sin(n*6.5);this.leftArm.rotation.x=-1.3+a*.8,this.rightArm.rotation.x=-1.3-a*.8,this.leftLeg.rotation.x=a*.45,this.rightLeg.rotation.x=-a*.45}else if(e.anim==="dodge")this.bodyGroup.rotation.x=n*14%(Math.PI*2);else if(s){const a=e.anim==="run"?.75:.48,c=Math.sin(this.animClock);this.leftLeg.rotation.x=c*a,this.rightLeg.rotation.x=-c*a,this.leftArm.rotation.x=-c*a*.85,this.rightArm.rotation.x=c*a*.85,this.bodyGroup.position.y=Math.abs(Math.cos(this.animClock))*.06}else{const a=Math.sin(n*2.2)*.03;this.leftLeg.rotation.x*=.82,this.rightLeg.rotation.x*=.82,this.leftArm.rotation.x=a,this.rightArm.rotation.x=-a,this.bodyGroup.position.y=a*.5}if(e.equippedItemId==="torch"&&(this.rightArm.rotation.x=-.78),e.swingTime>0){const a=1-e.swingTime/.38;this.rightArm.rotation.x=-1.9+Math.sin(a*Math.PI)*2.15,this.rightArm.rotation.y=-.3+Math.sin(a*Math.PI)*.6}else this.rightArm.rotation.y=0}}class K0{group=new Et;visuals=new Map;constructor(t){t.add(this.group)}sync(t){const e=new Set;for(const n of t){e.add(n.id);let i=this.visuals.get(n.id);i||(i=this.createVisual(n),i.group.position.set(n.x,n.y,n.z),i.group.rotation.y=n.yaw,i.group.traverse(r=>{r.userData.wildlifeId=n.id,r.userData.wildlifeKind=n.kind}),this.group.add(i.group),this.visuals.set(n.id,i)),i.targetPos.set(n.x,n.y,n.z),i.targetYaw=n.yaw,i.state=n;const s=Math.max(.01,n.hp/Math.max(1,n.maxHp));i.hpBarGroup.visible=n.hp<n.maxHp,i.hpBarFill.scale.x=s,i.hpBarFill.position.x=-(1-s)*.55}for(const[n,i]of Array.from(this.visuals.entries()))e.has(n)||(this.group.remove(i.group),this.visuals.delete(n))}createVisual(t){const e=new Et,n=[],i=new Et;if(t.kind==="deer"){const c=new Q({color:"#9e6b40",roughness:.86}),l=new Q({color:"#e6d6be",roughness:.9}),h=new Q({color:"#d8ccb8",roughness:.78}),d=new T(new J(.62,.58,1.38),c);d.position.y=1.05,d.castShadow=!0,e.add(d);const u=new T(new J(.18,.22,.16),l);u.position.set(0,1.18,-.74),e.add(u),i.position.set(0,1.32,.58);const f=new T(new J(.24,.56,.28),c);f.position.set(0,.24,.1),f.rotation.x=.24;const g=new T(new J(.26,.24,.46),c);g.position.set(0,.52,.3);for(const p of[-1,1]){const m=new T(new gt(.025,.035,.48,5),h);m.position.set(p*.15,.78,.16),m.rotation.z=-p*.42;const w=new T(new gt(.02,.025,.28,5),h);w.position.set(p*.28,.9,.22),w.rotation.x=.5,i.add(m,w)}i.add(f,g),e.add(i);const v=[[-.2,.46],[.2,.46],[-.2,-.46],[.2,-.46]];for(const[p,m]of v){const w=new T(new J(.13,.85,.13),c);w.position.set(p,.42,m),w.castShadow=!0,e.add(w),n.push(w)}}else if(t.kind==="boar"){const c=new Q({color:"#4d3a2f",roughness:.92}),l=new Q({color:"#f2e8d5",roughness:.55}),h=new T(new J(.68,.58,1.15),c);h.position.y=.64,h.castShadow=!0,e.add(h),i.position.set(0,.68,.58);const d=new T(new J(.42,.34,.45),c);d.position.set(0,-.02,.18);for(const u of[-1,1]){const f=new T(new oe(.045,.26,5),l);f.position.set(u*.18,-.04,.4),f.rotation.x=.8,f.rotation.z=-u*.35,i.add(f)}i.add(d),e.add(i);for(const[u,f]of[[-.22,.36],[.22,.36],[-.22,-.36],[.22,-.36]]){const g=new T(new J(.14,.44,.14),c);g.position.set(u,.22,f),g.castShadow=!0,e.add(g),n.push(g)}}else if(t.kind==="wolf"){const c=new Q({color:"#6b727d",roughness:.86}),l=new Q({color:"#393e46",roughness:.9}),h=new Yt({color:"#fbbf24"}),d=new T(new J(.52,.48,1.24),c);d.position.y=.78,d.castShadow=!0,e.add(d);const u=new T(new J(.14,.16,.55),l);u.position.set(0,.82,-.82),u.rotation.x=-.35,e.add(u),i.position.set(0,.94,.62);const f=new T(new J(.36,.32,.48),l);f.position.set(0,.04,.15);for(const g of[-1,1]){const v=new T(new oe(.07,.18,4),l);v.position.set(g*.12,.26,.05);const p=new T(new J(.05,.05,.04),h);p.position.set(g*.1,.08,.38),i.add(v,p)}i.add(f),e.add(i);for(const[g,v]of[[-.17,.42],[.17,.42],[-.17,-.42],[.17,-.42]]){const p=new T(new J(.12,.58,.12),l);p.position.set(g,.29,v),p.castShadow=!0,e.add(p),n.push(p)}}else if(t.kind==="stalker"){const c=new Q({color:"#171124",emissive:"#3b1566",emissiveIntensity:.75,roughness:.45}),l=new Yt({color:"#c084fc"}),h=new T(new oe(.62,2.05,7),c);h.position.y=1.25,h.castShadow=!0,e.add(h),i.position.set(0,2.2,.12);const d=new T(new Ye(.32,0),c);for(const f of[-1,1]){const g=new T(new oe(.07,.55,5),c);g.position.set(f*.2,.35,-.05),g.rotation.z=-f*.4;const v=new T(new Se(.065,6,6),l);v.position.set(f*.11,.04,.26),i.add(g,v)}i.add(d),e.add(i);const u=new ke("#a855f7",2.8,9,1.8);u.position.set(0,1.8,0),e.add(u)}else if(t.kind==="crab"){const c=new Q({color:"#e11d48",roughness:.45}),l=new Q({color:"#fb7185",roughness:.5}),h=new T(new J(.92,.34,.72),c);h.position.y=.32,h.castShadow=!0,e.add(h);for(const d of[-.52,.52]){const u=new T(new J(.28,.22,.45),l);u.position.set(d,.36,.48),e.add(u);for(let f=-1;f<=1;f++){const g=new T(new gt(.04,.03,.45,5),c);g.position.set(d*1.05,.2,f*.22),g.rotation.z=d>0?-.7:.7,e.add(g),n.push(g)}}i.position.set(0,.52,.25),e.add(i)}else if(t.kind==="serpent"){const c=new Q({color:"#0e7490",emissive:"#0891b2",emissiveIntensity:.35,roughness:.32}),l=new Yt({color:"#22d3ee"});for(let d=0;d<6;d++){const u=Math.max(.24,.68-d*.08),f=new T(new Se(u,9,8),c);f.position.set(0,.45+d%2*.38,-d*1.15),f.castShadow=!0;const g=new T(new oe(.14,.65,4),l);g.position.set(0,u+.22,0),f.add(g),e.add(f),n.push(f)}i.position.set(0,1.35,1.05);const h=new T(new J(.85,.62,1.35),c);i.add(h);for(const d of[-.3,.3]){const u=new T(new Se(.12,6,6),new Yt({color:"#fde047"}));u.position.set(d,.14,.52),i.add(u)}e.add(i)}else if(t.kind==="cinder_golem"){const c=new Q({color:"#1c1917",roughness:.65,metalness:.3}),l=new Yt({color:"#f97316"}),h=new T(new Ve(1.25,0),c);h.position.y=2.15,h.castShadow=!0;const d=new T(new Ye(.55,0),l);d.position.set(0,2.15,.72),e.add(h,d);for(const v of[-1.25,1.25]){const p=new T(new J(.65,1.85,.65),c);p.position.set(v,1.75,.2),p.castShadow=!0,e.add(p),n.push(p)}for(const v of[-.58,.58]){const p=new T(new J(.58,1.25,.62),c);p.position.set(v,.62,0),e.add(p),n.push(p)}i.position.set(0,3.45,.15);const u=new T(new J(.92,.78,.85),c),f=new T(new J(.65,.18,.45),l);f.position.set(0,.05,.32),i.add(u,f),e.add(i);const g=new ke("#ff6d00",4.5,16,1.6);g.position.y=2.4,e.add(g)}const s=new Et;s.position.set(0,t.kind==="cinder_golem"?4.4:t.kind==="stalker"?2.95:t.kind==="serpent"?2.6:1.95,0);const r=new T(new Ae(1.16,.14),new Yt({color:"#0f172a",side:de})),a=new T(new Ae(1.1,.09),new Yt({color:"#ef4444",side:de}));return a.position.z=.01,s.add(r,a),s.visible=!1,e.add(s),{group:e,kind:t.kind,legs:n,head:i,hpBarFill:a,hpBarGroup:s,targetPos:new D(t.x,t.y,t.z),targetYaw:t.yaw,state:t}}update(t,e,n){const i=Math.min(1,t*11);for(const s of this.visuals.values()){s.group.position.lerp(s.targetPos,i);let r=s.targetYaw-s.group.rotation.y;for(;r>Math.PI;)r-=Math.PI*2;for(;r<-Math.PI;)r+=Math.PI*2;if(s.group.rotation.y+=r*i,s.hpBarGroup.visible&&s.hpBarGroup.lookAt(n.position),s.kind==="stalker")s.group.position.y+=Math.sin(e*4+s.targetPos.x)*.14,s.head.rotation.x=s.state.attackTime>0?.5:Math.sin(e*3)*.1;else if(s.kind==="serpent"){for(let a=0;a<s.legs.length;a++)s.legs[a].position.x=Math.sin(e*4.2-a*.85)*.65,s.legs[a].position.y=.38+Math.cos(e*3.2-a*.9)*.32;s.head.position.x=Math.sin(e*4.2+.6)*.45}else if(s.state.speed>.3){const a=Math.sin(e*(s.state.speed*2.1));for(let c=0;c<s.legs.length;c++)s.legs[c].rotation.x=(c%2===0?a:-a)*.65}else for(const a of s.legs)a.rotation.x*=.85}}}class j0{group=new Et;lootGroup=new Et;particles=[];fallingTrees=[];lootMeshes=new Map;projMeshes=new Map;rainLines;rainMat;fireflies;fireflyMat;seagulls=[];chipGeo=new J(.14,.14,.14);campfireSmokeTimer=0;constructor(t,e){this.group.add(this.lootGroup);const n=650,i=new Float32Array(n*6);for(let h=0;h<n;h++){const d=(Math.random()-.5)*65,u=Math.random()*28,f=(Math.random()-.5)*65;i[h*6]=d,i[h*6+1]=u,i[h*6+2]=f,i[h*6+3]=d-.18,i[h*6+4]=u-1.15,i[h*6+5]=f-.1}const s=new we;s.setAttribute("position",new Pe(i,3)),this.rainMat=new Ea({color:"#bdd8f2",transparent:!0,opacity:0}),this.rainLines=new Ud(s,this.rainMat),this.rainLines.frustumCulled=!1,this.group.add(this.rainLines);const r=90,a=new Float32Array(r*3);for(let h=0;h<r;h++)a[h*3]=(Math.random()-.5)*55,a[h*3+1]=.8+Math.random()*4.5,a[h*3+2]=(Math.random()-.5)*55;const c=new we;c.setAttribute("position",new Pe(a,3)),this.fireflyMat=new Mo({map:e.softParticle,color:"#b8ff6b",size:.45,transparent:!0,opacity:0,depthWrite:!1,blending:Gi}),this.fireflies=new Ta(c,this.fireflyMat),this.fireflies.frustumCulled=!1,this.group.add(this.fireflies);const l=new Yt({color:"#f8fafc",side:de});for(let h=0;h<9;h++){const d=new Et,u=new T(new Ae(.9,.25),l);u.position.x=-.45,u.rotation.x=Math.PI/2;const f=new T(new Ae(.9,.25),l);f.position.x=.45,f.rotation.x=Math.PI/2,d.add(u,f),d.userData={angle:h/9*Math.PI*2,radius:36+h%3*26,height:24+h%4*5,speed:.14+h%3*.04,lWing:u,rWing:f},this.seagulls.push(d),this.group.add(d)}t.add(this.group)}spawnBurst(t,e,n,i,s=10,r=4.2,a=12){const c=new Yt({color:i});for(let l=0;l<s;l++){const h=new T(this.chipGeo,c);h.position.set(t,e,n);const d=.55+Math.random()*.9;h.scale.setScalar(d),this.group.add(h),this.particles.push({mesh:h,vx:(Math.random()-.5)*r*1.4,vy:1.5+Math.random()*r,vz:(Math.random()-.5)*r*1.4,life:.45+Math.random()*.45,maxLife:.9,gravity:a})}}spawnFallingTree(t,e,n){const i=new D(-n,0,e).normalize();this.group.add(t),this.fallingTrees.push({obj:t,axis:i,angle:0,speed:.35,life:1.65})}syncLootAll(t){for(const e of t)this.addLoot(e)}addLoot(t){if(this.lootMeshes.has(t.id))return;const n=Ue(t.itemId)?.accentColor??"#fbbf24",i=new Et,s=new T(new Ye(.28,0),new Q({color:n,emissive:n,emissiveIntensity:.45,roughness:.35})),r=new T(new So(.24,.34,14),new Yt({color:n,side:de,transparent:!0,opacity:.65}));r.rotation.x=-Math.PI/2,r.position.y=-.22,i.add(s,r),i.position.set(t.x,t.y+.3,t.z),i.traverse(a=>{a.userData.lootId=t.id,a.userData.lootItemId=t.itemId,a.userData.lootCount=t.count}),this.lootGroup.add(i),this.lootMeshes.set(t.id,{mesh:i,baseY:t.y+.32})}removeLoot(t){const e=this.lootMeshes.get(t);e&&(this.lootGroup.remove(e.mesh),this.lootMeshes.delete(t))}syncProjectiles(t){const e=new Set;for(const n of t){e.add(n.id);let i=this.projMeshes.get(n.id);if(!i){i=new Et;const s=n.kind==="starlight_bolt",r=new T(new gt(.025,.025,1.05,5),new Yt({color:s?"#38f2dc":"#e6d5b8"}));if(r.rotation.x=Math.PI/2,i.add(r),s){const a=new ke("#38f2dc",2.2,7,2);i.add(a)}this.group.add(i),this.projMeshes.set(n.id,i)}i.position.set(n.x,n.y,n.z),i.lookAt(n.x+n.vx,n.y+n.vy,n.z+n.vz)}for(const[n,i]of Array.from(this.projMeshes.entries()))e.has(n)||(this.group.remove(i),this.projMeshes.delete(n))}update(t,e,n,i,s){for(let l=this.particles.length-1;l>=0;l--){const h=this.particles[l];if(h.life-=t,h.life<=0){this.group.remove(h.mesh),this.particles.splice(l,1);continue}h.vy-=h.gravity*t,h.mesh.position.x+=h.vx*t,h.mesh.position.y+=h.vy*t,h.mesh.position.z+=h.vz*t,h.mesh.rotation.x+=t*7,h.mesh.rotation.y+=t*5,h.mesh.scale.setScalar(Math.max(.05,h.life/h.maxLife))}if(this.campfireSmokeTimer-=t,this.campfireSmokeTimer<=0){this.campfireSmokeTimer=.18;for(const l of s)l.distanceTo(i)<42&&this.spawnBurst(l.x,l.y+.7,l.z,Math.random()>.4?"#ff9b30":"#94a3b8",1,.9,-1.8)}for(let l=this.fallingTrees.length-1;l>=0;l--){const h=this.fallingTrees[l];h.life-=t,h.speed+=t*2.8;const d=Math.min(Math.PI*.48-h.angle,h.speed*t);d>0&&(h.obj.rotateOnWorldAxis(h.axis,d),h.angle+=d),h.life<=0&&(this.spawnBurst(h.obj.position.x,h.obj.position.y+1.2,h.obj.position.z,"#5a8f41",12,5.2,9),this.group.remove(h.obj),this.fallingTrees.splice(l,1))}for(const l of this.lootMeshes.values())l.mesh.rotation.y=e*2.1,l.mesh.position.y=l.baseY+Math.sin(e*3.2+l.mesh.position.x)*.14;const r=n.weather==="storm"?.55*n.weatherIntensity:n.weather==="rain"?.36*n.weatherIntensity:0;if(this.rainMat.opacity=r,r>.02){this.rainLines.position.set(i.x,i.y,i.z);const l=this.rainLines.geometry.attributes.position;for(let h=0;h<l.count;h+=2){let d=l.getY(h)-t*26;d<-4&&(d=24),l.setY(h,d),l.setY(h+1,d-1.15)}l.needsUpdate=!0}const c=(n.timeOfDay<.24||n.timeOfDay>.76)&&r<.1?.85:0;this.fireflyMat.opacity+=(c-this.fireflyMat.opacity)*Math.min(1,t*1.5),this.fireflyMat.opacity>.02&&(this.fireflies.position.set(i.x,Math.max(1,i.y),i.z),this.fireflies.rotation.y=e*.08);for(const l of this.seagulls){const h=l.userData;h.angle+=h.speed*t,l.position.set(Math.cos(h.angle)*h.radius,h.height+Math.sin(e*1.5+h.radius)*1.4,Math.sin(h.angle)*h.radius),l.rotation.y=-h.angle;const d=Math.sin(e*7.5+h.radius)*.42;h.lWing.rotation.z=d,h.rWing.rotation.z=-d}}}class Z0{ctx=null;master=null;windGain=null;oceanGain=null;rainGain=null;fireGain=null;noiseBuffer=null;birdTimer=2.5;cricketTimer=.6;muted=!1;volume=.55;unlock(){if(this.ctx){this.ctx.state==="suspended"&&this.ctx.resume();return}const t=window.AudioContext||window.webkitAudioContext;if(!t)return;this.ctx=new t,this.master=this.ctx.createGain(),this.master.gain.value=this.muted?0:this.volume,this.master.connect(this.ctx.destination);const e=this.ctx.sampleRate*3;this.noiseBuffer=this.ctx.createBuffer(1,e,this.ctx.sampleRate);const n=this.noiseBuffer.getChannelData(0);let i=0,s=0,r=0;for(let a=0;a<e;a++){const c=Math.random()*2-1;i=.997*i+c*.029,s=.985*s+c*.032,r=.95*r+c*.048,n[a]=(i+s+r+c*.06)*1.8}this.windGain=this.createAmbientLoop("bandpass",420,.8,.04),this.oceanGain=this.createAmbientLoop("lowpass",320,.5,.02),this.rainGain=this.createAmbientLoop("bandpass",1650,.5,0),this.fireGain=this.createAmbientLoop("bandpass",920,1.4,0)}createAmbientLoop(t,e,n,i){if(!this.ctx||!this.master||!this.noiseBuffer)return null;const s=this.ctx.createBufferSource();s.buffer=this.noiseBuffer,s.loop=!0;const r=this.ctx.createBiquadFilter();r.type=t,r.frequency.value=e,r.Q.value=n;const a=this.ctx.createGain();return a.gain.value=i,s.connect(r),r.connect(a),a.connect(this.master),s.start(),a}setVolume(t){this.volume=Math.max(0,Math.min(1,t)),this.master&&this.ctx&&this.master.gain.setTargetAtTime(this.muted?0:this.volume,this.ctx.currentTime,.05)}setMuted(t){this.muted=t,this.master&&this.ctx&&this.master.gain.setTargetAtTime(this.muted?0:this.volume,this.ctx.currentTime,.05)}updateAmbient(t,e,n,i,s){if(!this.ctx||this.ctx.state!=="running")return;const r=this.ctx.currentTime;if(this.windGain){const l=.035+e.windSpeed*.032;this.windGain.gain.setTargetAtTime(l,r,.35)}if(this.oceanGain){const l=.72+Math.sin(r*.55)*.28,h=Math.max(.015,(1-Math.min(1,s/75))*.14)*l;this.oceanGain.gain.setTargetAtTime(h,r,.25)}if(this.rainGain){const l=e.weather==="storm"?.18*e.weatherIntensity:e.weather==="rain"?.11*e.weatherIntensity:0;this.rainGain.gain.setTargetAtTime(l,r,.4)}if(this.fireGain){const l=i<12?(1-i/12)*.11:0;this.fireGain.gain.setTargetAtTime(l,r,.2)}const a=e.timeOfDay<.23||e.timeOfDay>.78,c=e.weather==="storm"||e.weather==="rain";!a&&!c&&(n==="meadow"||n==="pine"||n==="marsh")&&(this.birdTimer-=t,this.birdTimer<=0&&(this.birdTimer=3.5+Math.random()*6.5,this.playBirdChirp())),a&&!c&&(this.cricketTimer-=t,this.cricketTimer<=0&&(this.cricketTimer=1.6+Math.random()*2.5,this.playCricket()))}playBirdChirp(){if(!this.ctx||!this.master)return;const t=this.ctx.currentTime,e=this.ctx.createOscillator(),n=this.ctx.createGain();e.type="sine";const i=2200+Math.random()*1400;e.frequency.setValueAtTime(i,t),e.frequency.exponentialRampToValueAtTime(i*1.35,t+.08),e.frequency.exponentialRampToValueAtTime(i*.9,t+.17),n.gain.setValueAtTime(1e-4,t),n.gain.linearRampToValueAtTime(.032,t+.03),n.gain.exponentialRampToValueAtTime(1e-4,t+.19),e.connect(n),n.connect(this.master),e.start(t),e.stop(t+.2)}playCricket(){if(!this.ctx||!this.master)return;const t=this.ctx.currentTime;for(let e=0;e<3;e++){const n=t+e*.075,i=this.ctx.createOscillator(),s=this.ctx.createGain();i.type="triangle",i.frequency.value=4150+e%2*120,s.gain.setValueAtTime(1e-4,n),s.gain.linearRampToValueAtTime(.014,n+.015),s.gain.exponentialRampToValueAtTime(1e-4,n+.055),i.connect(s),s.connect(this.master),i.start(n),i.stop(n+.06)}}playFootstep(t){if(!this.ctx||!this.master||!this.noiseBuffer)return;const e=this.ctx.currentTime,n=this.ctx.createBufferSource();n.buffer=this.noiseBuffer;const i=this.ctx.createBiquadFilter();i.type="bandpass",i.frequency.value=t==="stone"?1150:t==="water"?680:t==="sand"?920:520;const s=this.ctx.createGain();s.gain.setValueAtTime(t==="water"?.09:.055,e),s.gain.exponentialRampToValueAtTime(.001,e+(t==="water"?.18:.09)),n.connect(i),i.connect(s),s.connect(this.master),n.start(e,Math.random()*1.5,.2)}playSfx(t){if(!this.ctx||!this.master)return;const e=this.ctx.currentTime;t==="chop"?(this.tone("triangle",155,62,.12,.22),this.noiseBurst(750,.09,.14)):t==="mine"?(this.tone("sine",1480,920,.18,.15),this.tone("triangle",620,310,.11,.12),this.noiseBurst(2200,.08,.12)):t==="hit"?(this.tone("sawtooth",190,55,.14,.22),this.noiseBurst(450,.1,.16)):t==="arrow"?(this.tone("triangle",520,180,.15,.16),this.noiseBurst(1600,.14,.1)):t==="build"?(this.tone("triangle",260,140,.1,.18),setTimeout(()=>this.tone("sine",520,380,.12,.12),70)):t==="eat"?(this.noiseBurst(1100,.07,.12),setTimeout(()=>this.noiseBurst(950,.07,.11),95)):t==="drink"?(this.tone("sine",380,620,.12,.12),setTimeout(()=>this.tone("sine",420,690,.12,.11),130)):t==="thunder"?(this.noiseBurst(95,2.2,.45),this.tone("sawtooth",62,28,1.4,.18)):t==="levelup"?[440,554.37,659.25,880].forEach((i,s)=>{const r=this.ctx.createOscillator(),a=this.ctx.createGain();r.type="triangle",r.frequency.value=i;const c=e+s*.09;a.gain.setValueAtTime(.001,c),a.gain.linearRampToValueAtTime(.14,c+.02),a.gain.exponentialRampToValueAtTime(.001,c+.45),r.connect(a),a.connect(this.master),r.start(c),r.stop(c+.46)}):t==="ui"&&this.tone("sine",680,820,.045,.07)}tone(t,e,n,i,s){if(!this.ctx||!this.master)return;const r=this.ctx.currentTime,a=this.ctx.createOscillator(),c=this.ctx.createGain();a.type=t,a.frequency.setValueAtTime(e,r),a.frequency.exponentialRampToValueAtTime(Math.max(20,n),r+i),c.gain.setValueAtTime(s,r),c.gain.exponentialRampToValueAtTime(.001,r+i),a.connect(c),c.connect(this.master),a.start(r),a.stop(r+i+.02)}noiseBurst(t,e,n){if(!this.ctx||!this.master||!this.noiseBuffer)return;const i=this.ctx.currentTime,s=this.ctx.createBufferSource();s.buffer=this.noiseBuffer;const r=this.ctx.createBiquadFilter();r.type="lowpass",r.frequency.value=t;const a=this.ctx.createGain();a.gain.setValueAtTime(n,i),a.gain.exponentialRampToValueAtTime(.001,i+e),s.connect(r),r.connect(a),a.connect(this.master),s.start(i,Math.random()*1,e+.05)}}const Tn=Object.create(null);Tn.open="0";Tn.close="1";Tn.ping="2";Tn.pong="3";Tn.message="4";Tn.upgrade="5";Tn.noop="6";const ao=Object.create(null);Object.keys(Tn).forEach(o=>{ao[Tn[o]]=o});const ra={type:"error",data:"parser error"},Yl=typeof Blob=="function"||typeof Blob<"u"&&Object.prototype.toString.call(Blob)==="[object BlobConstructor]",Kl=typeof ArrayBuffer=="function",jl=o=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(o):o&&o.buffer instanceof ArrayBuffer,Pa=({type:o,data:t},e,n)=>Yl&&t instanceof Blob?e?n(t):il(t,n):Kl&&(t instanceof ArrayBuffer||jl(t))?e?n(t):il(new Blob([t]),n):n(Tn[o]+(t||"")),il=(o,t)=>{const e=new FileReader;return e.onload=function(){const n=e.result.split(",")[1];t("b"+(n||""))},e.readAsDataURL(o)};function sl(o){return o instanceof Uint8Array?o:o instanceof ArrayBuffer?new Uint8Array(o):new Uint8Array(o.buffer,o.byteOffset,o.byteLength)}let ur;function J0(o,t){if(Yl&&o.data instanceof Blob)return o.data.arrayBuffer().then(sl).then(t);if(Kl&&(o.data instanceof ArrayBuffer||jl(o.data)))return t(sl(o.data));Pa(o,!1,e=>{ur||(ur=new TextEncoder),t(ur.encode(e))})}const ol="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",gs=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(let o=0;o<ol.length;o++)gs[ol.charCodeAt(o)]=o;const Q0=o=>{let t=o.length*.75,e=o.length,n,i=0,s,r,a,c;o[o.length-1]==="="&&(t--,o[o.length-2]==="="&&t--);const l=new ArrayBuffer(t),h=new Uint8Array(l);for(n=0;n<e;n+=4)s=gs[o.charCodeAt(n)],r=gs[o.charCodeAt(n+1)],a=gs[o.charCodeAt(n+2)],c=gs[o.charCodeAt(n+3)],h[i++]=s<<2|r>>4,h[i++]=(r&15)<<4|a>>2,h[i++]=(a&3)<<6|c&63;return l},tg=typeof ArrayBuffer=="function",La=(o,t)=>{if(typeof o!="string")return{type:"message",data:Zl(o,t)};const e=o.charAt(0);return e==="b"?{type:"message",data:eg(o.substring(1),t)}:ao[e]?o.length>1?{type:ao[e],data:o.substring(1)}:{type:ao[e]}:ra},eg=(o,t)=>{if(tg){const e=Q0(o);return Zl(e,t)}else return{base64:!0,data:o}},Zl=(o,t)=>{switch(t){case"blob":return o instanceof Blob?o:new Blob([o]);case"arraybuffer":default:return o instanceof ArrayBuffer?o:o.buffer}},Jl="",ng=(o,t)=>{const e=o.length,n=new Array(e);let i=0;o.forEach((s,r)=>{Pa(s,!1,a=>{n[r]=a,++i===e&&t(n.join(Jl))})})},ig=(o,t)=>{const e=o.split(Jl),n=[];for(let i=0;i<e.length;i++){const s=La(e[i],t);if(n.push(s),s.type==="error")break}return n};function sg(){return new TransformStream({transform(o,t){J0(o,e=>{const n=e.length;let i;if(n<126)i=new Uint8Array(1),new DataView(i.buffer).setUint8(0,n);else if(n<65536){i=new Uint8Array(3);const s=new DataView(i.buffer);s.setUint8(0,126),s.setUint16(1,n)}else{i=new Uint8Array(9);const s=new DataView(i.buffer);s.setUint8(0,127),s.setBigUint64(1,BigInt(n))}o.data&&typeof o.data!="string"&&(i[0]|=128),t.enqueue(i),t.enqueue(e)})}})}let fr;function Qs(o){return o.reduce((t,e)=>t+e.length,0)}function to(o,t){if(o[0].length===t)return o.shift();const e=new Uint8Array(t);let n=0;for(let i=0;i<t;i++)e[i]=o[0][n++],n===o[0].length&&(o.shift(),n=0);return o.length&&n<o[0].length&&(o[0]=o[0].slice(n)),e}function og(o,t){fr||(fr=new TextDecoder);const e=[];let n=0,i=-1,s=!1;return new TransformStream({transform(r,a){for(e.push(r);;){if(n===0){if(Qs(e)<1)break;const c=to(e,1);s=(c[0]&128)===128,i=c[0]&127,i<126?n=3:i===126?n=1:n=2}else if(n===1){if(Qs(e)<2)break;const c=to(e,2);i=new DataView(c.buffer,c.byteOffset,c.length).getUint16(0),n=3}else if(n===2){if(Qs(e)<8)break;const c=to(e,8),l=new DataView(c.buffer,c.byteOffset,c.length),h=l.getUint32(0);if(h>Math.pow(2,21)-1){a.enqueue(ra);break}i=h*Math.pow(2,32)+l.getUint32(4),n=3}else{if(Qs(e)<i)break;const c=to(e,i);a.enqueue(La(s?c:fr.decode(c),t)),n=0}if(i===0||i>o){a.enqueue(ra);break}}}})}const Ql=4;function Ee(o){if(o)return rg(o)}function rg(o){for(var t in Ee.prototype)o[t]=Ee.prototype[t];return o}Ee.prototype.on=Ee.prototype.addEventListener=function(o,t){return this._callbacks=this._callbacks||{},(this._callbacks["$"+o]=this._callbacks["$"+o]||[]).push(t),this};Ee.prototype.once=function(o,t){function e(){this.off(o,e),t.apply(this,arguments)}return e.fn=t,this.on(o,e),this};Ee.prototype.off=Ee.prototype.removeListener=Ee.prototype.removeAllListeners=Ee.prototype.removeEventListener=function(o,t){if(this._callbacks=this._callbacks||{},arguments.length==0)return this._callbacks={},this;var e=this._callbacks["$"+o];if(!e)return this;if(arguments.length==1)return delete this._callbacks["$"+o],this;for(var n,i=0;i<e.length;i++)if(n=e[i],n===t||n.fn===t){e.splice(i,1);break}return e.length===0&&delete this._callbacks["$"+o],this};Ee.prototype.emit=function(o){this._callbacks=this._callbacks||{};for(var t=new Array(arguments.length-1),e=this._callbacks["$"+o],n=1;n<arguments.length;n++)t[n-1]=arguments[n];if(e){e=e.slice(0);for(var n=0,i=e.length;n<i;++n)e[n].apply(this,t)}return this};Ee.prototype.emitReserved=Ee.prototype.emit;Ee.prototype.listeners=function(o){return this._callbacks=this._callbacks||{},this._callbacks["$"+o]||[]};Ee.prototype.hasListeners=function(o){return!!this.listeners(o).length};const Ao=typeof Promise=="function"&&typeof Promise.resolve=="function"?t=>Promise.resolve().then(t):(t,e)=>e(t,0),on=typeof self<"u"?self:typeof window<"u"?window:Function("return this")(),ag="arraybuffer";function th(o,...t){return t.reduce((e,n)=>(o.hasOwnProperty(n)&&(e[n]=o[n]),e),{})}const cg=on.setTimeout,lg=on.clearTimeout;function Co(o,t){t.useNativeTimers?(o.setTimeoutFn=cg.bind(on),o.clearTimeoutFn=lg.bind(on)):(o.setTimeoutFn=on.setTimeout.bind(on),o.clearTimeoutFn=on.clearTimeout.bind(on))}const hg=1.33;function dg(o){return typeof o=="string"?ug(o):Math.ceil((o.byteLength||o.size)*hg)}function ug(o){let t=0,e=0;for(let n=0,i=o.length;n<i;n++)t=o.charCodeAt(n),t<128?e+=1:t<2048?e+=2:t<55296||t>=57344?e+=3:(n++,e+=4);return e}function eh(){return Date.now().toString(36).substring(3)+Math.random().toString(36).substring(2,5)}function fg(o){let t="";for(let e in o)o.hasOwnProperty(e)&&(t.length&&(t+="&"),t+=encodeURIComponent(e)+"="+encodeURIComponent(o[e]));return t}function pg(o){let t={},e=o.split("&");for(let n=0,i=e.length;n<i;n++){let s=e[n].split("=");t[decodeURIComponent(s[0])]=decodeURIComponent(s.slice(1).join("="))}return t}class mg extends Error{constructor(t,e,n){super(t),this.description=e,this.context=n,this.type="TransportError"}}class Da extends Ee{constructor(t){super(),this.writable=!1,Co(this,t),this.opts=t,this.query=t.query,this.socket=t.socket,this.supportsBinary=!t.forceBase64}onError(t,e,n){return super.emitReserved("error",new mg(t,e,n)),this}open(){return this.readyState="opening",this.doOpen(),this}close(){return(this.readyState==="opening"||this.readyState==="open")&&(this.doClose(),this.onClose()),this}send(t){this.readyState==="open"&&this.write(t)}onOpen(){this.readyState="open",this.writable=!0,super.emitReserved("open")}onData(t){const e=La(t,this.socket.binaryType);this.onPacket(e)}onPacket(t){super.emitReserved("packet",t)}onClose(t){this.readyState="closed",super.emitReserved("close",t)}pause(t){}createUri(t,e={}){return t+"://"+this._hostname()+this._port()+this.opts.path+this._query(e)}_hostname(){const t=this.opts.hostname;return t.indexOf(":")===-1?t:"["+t+"]"}_port(){return this.opts.port&&(this.opts.secure&&Number(this.opts.port)!==443||!this.opts.secure&&Number(this.opts.port)!==80)?":"+this.opts.port:""}_query(t){const e=fg(t);return e.length?"?"+e:""}}class gg extends Da{constructor(){super(...arguments),this._polling=!1}get name(){return"polling"}doOpen(){this._poll()}pause(t){this.readyState="pausing";const e=()=>{this.readyState="paused",t()};if(this._polling||!this.writable){let n=0;this._polling&&(n++,this.once("pollComplete",function(){--n||e()})),this.writable||(n++,this.once("drain",function(){--n||e()}))}else e()}_poll(){this._polling=!0,this.doPoll(),this.emitReserved("poll")}onData(t){const e=n=>{if(this.readyState==="opening"&&n.type==="open"&&this.onOpen(),n.type==="close")return this.onClose({description:"transport closed by the server"}),!1;this.onPacket(n)};ig(t,this.socket.binaryType).forEach(e),this.readyState!=="closed"&&(this._polling=!1,this.emitReserved("pollComplete"),this.readyState==="open"&&this._poll())}doClose(){const t=()=>{this.write([{type:"close"}])};this.readyState==="open"?t():this.once("open",t)}write(t){this.writable=!1,ng(t,e=>{this.doWrite(e,()=>{this.writable=!0,this.emitReserved("drain")})})}uri(){const t=this.opts.secure?"https":"http",e=this.query||{};return this.opts.timestampRequests!==!1&&(e[this.opts.timestampParam]=eh()),!this.supportsBinary&&!e.sid&&(e.b64=1),this.createUri(t,e)}}let nh=!1;try{nh=typeof XMLHttpRequest<"u"&&"withCredentials"in new XMLHttpRequest}catch{}const vg=nh;function _g(){}class yg extends gg{constructor(t){if(super(t),typeof location<"u"){const e=location.protocol==="https:";let n=location.port;n||(n=e?"443":"80"),this.xd=typeof location<"u"&&t.hostname!==location.hostname||n!==t.port}}doWrite(t,e){const n=this.request({method:"POST",data:t});n.on("success",e),n.on("error",(i,s)=>{this.onError("xhr post error",i,s)})}doPoll(){const t=this.request();t.on("data",this.onData.bind(this)),t.on("error",(e,n)=>{this.onError("xhr poll error",e,n)}),this.pollXhr=t}}class Sn extends Ee{constructor(t,e,n){super(),this.createRequest=t,Co(this,n),this._opts=n,this._method=n.method||"GET",this._uri=e,this._data=n.data!==void 0?n.data:null,this._create()}_create(){var t;const e=th(this._opts,"agent","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","autoUnref");e.xdomain=!!this._opts.xd;const n=this._xhr=this.createRequest(e);try{n.open(this._method,this._uri,!0);try{if(this._opts.extraHeaders){n.setDisableHeaderCheck&&n.setDisableHeaderCheck(!0);for(let i in this._opts.extraHeaders)this._opts.extraHeaders.hasOwnProperty(i)&&n.setRequestHeader(i,this._opts.extraHeaders[i])}}catch{}if(this._method==="POST")try{n.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch{}try{n.setRequestHeader("Accept","*/*")}catch{}(t=this._opts.cookieJar)===null||t===void 0||t.addCookies(n),"withCredentials"in n&&(n.withCredentials=this._opts.withCredentials),this._opts.requestTimeout&&(n.timeout=this._opts.requestTimeout),n.onreadystatechange=()=>{var i;n.readyState===3&&((i=this._opts.cookieJar)===null||i===void 0||i.parseCookies(n.getResponseHeader("set-cookie"))),n.readyState===4&&(n.status===200||n.status===1223?this._onLoad():this.setTimeoutFn(()=>{this._onError(typeof n.status=="number"?n.status:0)},0))},n.send(this._data)}catch(i){this.setTimeoutFn(()=>{this._onError(i)},0);return}typeof document<"u"&&(this._index=Sn.requestsCount++,Sn.requests[this._index]=this)}_onError(t){this.emitReserved("error",t,this._xhr),this._cleanup(!0)}_cleanup(t){if(!(typeof this._xhr>"u"||this._xhr===null)){if(this._xhr.onreadystatechange=_g,t)try{this._xhr.abort()}catch{}typeof document<"u"&&delete Sn.requests[this._index],this._xhr=null}}_onLoad(){const t=this._xhr.responseText;t!==null&&(this.emitReserved("data",t),this.emitReserved("success"),this._cleanup())}abort(){this._cleanup()}}Sn.requestsCount=0;Sn.requests={};if(typeof document<"u"){if(typeof attachEvent=="function")attachEvent("onunload",rl);else if(typeof addEventListener=="function"){const o="onpagehide"in on?"pagehide":"unload";addEventListener(o,rl,!1)}}function rl(){for(let o in Sn.requests)Sn.requests.hasOwnProperty(o)&&Sn.requests[o].abort()}const xg=(function(){const o=ih({xdomain:!1});return o&&o.responseType!==null})();class wg extends yg{constructor(t){super(t);const e=t&&t.forceBase64;this.supportsBinary=xg&&!e}request(t={}){return Object.assign(t,{xd:this.xd},this.opts),new Sn(ih,this.uri(),t)}}function ih(o){const t=o.xdomain;try{if(typeof XMLHttpRequest<"u"&&(!t||vg))return new XMLHttpRequest}catch{}if(!t)try{return new on[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP")}catch{}}const sh=typeof navigator<"u"&&typeof navigator.product=="string"&&navigator.product.toLowerCase()==="reactnative";class Mg extends Da{get name(){return"websocket"}doOpen(){const t=this.uri(),e=this.opts.protocols,n=sh?{}:th(this.opts,"agent","perMessageDeflate","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","localAddress","protocolVersion","origin","maxPayload","family","checkServerIdentity");this.opts.extraHeaders&&(n.headers=this.opts.extraHeaders);try{this.ws=this.createSocket(t,e,n)}catch(i){return this.emitReserved("error",i)}this.ws.binaryType=this.socket.binaryType,this.addEventListeners()}addEventListeners(){this.ws.onopen=()=>{this.opts.autoUnref&&this.ws._socket.unref(),this.onOpen()},this.ws.onclose=t=>this.onClose({description:"websocket connection closed",context:t}),this.ws.onmessage=t=>this.onData(t.data),this.ws.onerror=t=>this.onError("websocket error",t)}write(t){this.writable=!1;for(let e=0;e<t.length;e++){const n=t[e],i=e===t.length-1;Pa(n,this.supportsBinary,s=>{try{this.doWrite(n,s)}catch{}i&&Ao(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){typeof this.ws<"u"&&(this.ws.onerror=()=>{},this.ws.close(),this.ws=null)}uri(){const t=this.opts.secure?"wss":"ws",e=this.query||{};return this.opts.timestampRequests&&(e[this.opts.timestampParam]=eh()),this.supportsBinary||(e.b64=1),this.createUri(t,e)}}const pr=on.WebSocket||on.MozWebSocket;class bg extends Mg{createSocket(t,e,n){return sh?new pr(t,e,n):e?new pr(t,e):new pr(t)}doWrite(t,e){this.ws.send(e)}}class Sg extends Da{get name(){return"webtransport"}doOpen(){try{this._transport=new WebTransport(this.createUri("https"),this.opts.transportOptions[this.name])}catch(t){return this.emitReserved("error",t)}this._transport.closed.then(()=>{this.onClose()}).catch(t=>{this.onError("webtransport error",t)}),this._transport.ready.then(()=>{this._transport.createBidirectionalStream().then(t=>{const e=og(Number.MAX_SAFE_INTEGER,this.socket.binaryType),n=t.readable.pipeThrough(e).getReader(),i=sg();i.readable.pipeTo(t.writable),this._writer=i.writable.getWriter();const s=()=>{n.read().then(({done:a,value:c})=>{a||(this.onPacket(c),s())}).catch(a=>{})};s();const r={type:"open"};this.query.sid&&(r.data=`{"sid":"${this.query.sid}"}`),this._writer.write(r).then(()=>this.onOpen())})})}write(t){this.writable=!1;for(let e=0;e<t.length;e++){const n=t[e],i=e===t.length-1;this._writer.write(n).then(()=>{i&&Ao(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){var t;(t=this._transport)===null||t===void 0||t.close()}}const Eg={websocket:bg,webtransport:Sg,polling:wg},Tg=/^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,Ag=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];function aa(o){if(o.length>8e3)throw"URI too long";const t=o,e=o.indexOf("["),n=o.indexOf("]");e!=-1&&n!=-1&&(o=o.substring(0,e)+o.substring(e,n).replace(/:/g,";")+o.substring(n,o.length));let i=Tg.exec(o||""),s={},r=14;for(;r--;)s[Ag[r]]=i[r]||"";return e!=-1&&n!=-1&&(s.source=t,s.host=s.host.substring(1,s.host.length-1).replace(/;/g,":"),s.authority=s.authority.replace("[","").replace("]","").replace(/;/g,":"),s.ipv6uri=!0),s.pathNames=Cg(s,s.path),s.queryKey=Rg(s,s.query),s}function Cg(o,t){const e=/\/{2,9}/g,n=t.replace(e,"/").split("/");return(t.slice(0,1)=="/"||t.length===0)&&n.splice(0,1),t.slice(-1)=="/"&&n.splice(n.length-1,1),n}function Rg(o,t){const e={};return t.replace(/(?:^|&)([^&=]*)=?([^&]*)/g,function(n,i,s){i&&(e[i]=s)}),e}const ca=typeof addEventListener=="function"&&typeof removeEventListener=="function",co=[];ca&&addEventListener("offline",()=>{co.forEach(o=>o())},!1);let oh=class Ni extends Ee{constructor(t,e={}){var n,i;if(super(),this.binaryType=ag,this.writeBuffer=[],this._prevBufferLen=0,this._upgrades=[],this._pingInterval=-1,this._pingTimeout=-1,this._maxPayload=-1,this._pingTimeoutTime=1/0,t&&typeof t=="object"&&(e=t,t=null),t){const s=aa(t);e.hostname=s.host,e.secure=s.protocol==="https"||s.protocol==="wss",e.port=s.port,s.query&&(e.query=s.query)}else e.host&&(e.hostname=aa(e.host).host);if(Co(this,e),this.secure=e.secure!=null?e.secure:typeof location<"u"&&location.protocol==="https:",e.hostname&&!e.port&&(e.port=this.secure?"443":"80"),this.hostname=e.hostname||(typeof location<"u"?location.hostname:"localhost"),this.port=e.port||(typeof location<"u"&&location.port?location.port:this.secure?"443":"80"),e.transportImplementations&&e.transports)throw new Error("specifying both 'transportImplementations' and 'transports' options is not supported");e.transportImplementations||!((n=e.transports)===null||n===void 0)&&n.length&&typeof e.transports[0]=="function"?(this.transports=[],this._transportsByName=Object.create(null),((i=e.transportImplementations)!==null&&i!==void 0?i:e.transports).forEach(s=>{const r=s.prototype.name;this.transports.push(r),this._transportsByName[r]=s})):(this.transports=e.transports?[...e.transports]:["polling","websocket","webtransport"],this._transportsByName=Eg),this.opts=Object.assign({path:"/engine.io",agent:!1,withCredentials:!1,upgrade:!0,timestampParam:"t",rememberUpgrade:!1,addTrailingSlash:!0,rejectUnauthorized:!0,perMessageDeflate:{threshold:1024},transportOptions:{},closeOnBeforeunload:!1},e),this.opts.path=this.opts.path.replace(/\/$/,"")+(this.opts.addTrailingSlash?"/":""),typeof this.opts.query=="string"&&(this.opts.query=pg(this.opts.query)),ca&&(this.opts.closeOnBeforeunload&&(this._beforeunloadEventListener=()=>{this.transport&&(this.transport.removeAllListeners(),this.transport.close())},addEventListener("beforeunload",this._beforeunloadEventListener,!1)),this.hostname!=="localhost"&&(this._offlineEventListener=()=>{this._onClose("transport close",{description:"network connection lost"})},co.push(this._offlineEventListener))),this.opts.withCredentials&&(this._cookieJar=void 0),this._open()}createTransport(t){const e=Object.assign({},this.opts.query);e.EIO=Ql,e.transport=t,this.id&&(e.sid=this.id);const n=Object.assign({},this.opts,{query:e,socket:this,hostname:this.hostname,secure:this.secure,port:this.port},this.opts.transportOptions[t]);return new this._transportsByName[t](n)}_open(){if(this.transports.length===0){this.setTimeoutFn(()=>{this.emitReserved("error","No transports available")},0);return}const t=this.opts.rememberUpgrade&&Ni.priorWebsocketSuccess&&this.transports.indexOf("websocket")!==-1?"websocket":this.transports[0];this.readyState="opening";const e=this.createTransport(t);e.open(),this.setTransport(e)}setTransport(t){this.transport&&this.transport.removeAllListeners(),this.transport=t,t.on("drain",this._onDrain.bind(this)).on("packet",this._onPacket.bind(this)).on("error",this._onError.bind(this)).on("close",e=>this._onClose("transport close",e))}_probe(t){let e=this.createTransport(t),n=!1;Ni.priorWebsocketSuccess=!1;const i=()=>{n||(e.send([{type:"ping",data:"probe"}]),e.once("packet",d=>{if(!n)if(d.type==="pong"&&d.data==="probe"){if(this.upgrading=!0,this.emitReserved("upgrading",e),!e)return;Ni.priorWebsocketSuccess=e.name==="websocket",this.transport.pause(()=>{n||this.readyState!=="closed"&&(h(),this.setTransport(e),e.send([{type:"upgrade"}]),this.emitReserved("upgrade",e),e=null,this.upgrading=!1,this.flush())})}else{const u=new Error("probe error");u.transport=e.name,this.emitReserved("upgradeError",u)}}))};function s(){n||(n=!0,h(),e.close(),e=null)}const r=d=>{const u=new Error("probe error: "+d);u.transport=e.name,s(),this.emitReserved("upgradeError",u)};function a(){r("transport closed")}function c(){r("socket closed")}function l(d){e&&d.name!==e.name&&s()}const h=()=>{e.removeListener("open",i),e.removeListener("error",r),e.removeListener("close",a),this.off("close",c),this.off("upgrading",l)};e.once("open",i),e.once("error",r),e.once("close",a),this.once("close",c),this.once("upgrading",l),this._upgrades.indexOf("webtransport")!==-1&&t!=="webtransport"?this.setTimeoutFn(()=>{n||e.open()},200):e.open()}onOpen(){if(this.readyState="open",Ni.priorWebsocketSuccess=this.transport.name==="websocket",this.emitReserved("open"),this.flush(),this.readyState==="open"&&this.opts.upgrade)for(let t=0;t<this._upgrades.length;t++)this._probe(this._upgrades[t])}_onPacket(t){if(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing")switch(this.emitReserved("packet",t),this.emitReserved("heartbeat"),t.type){case"open":this.onHandshake(JSON.parse(t.data));break;case"ping":this._sendPacket("pong"),this.emitReserved("ping"),this.emitReserved("pong"),this._resetPingTimeout();break;case"error":const e=new Error("server error");e.code=t.data,this._onError(e);break;case"message":this.emitReserved("data",t.data),this.emitReserved("message",t.data);break}}onHandshake(t){this.emitReserved("handshake",t),this.id=t.sid,this.transport.query.sid=t.sid,this._upgrades=this._filterUpgrades(t.upgrades),this._pingInterval=t.pingInterval,this._pingTimeout=t.pingTimeout,this._maxPayload=t.maxPayload,this.onOpen(),this.readyState!=="closed"&&this._resetPingTimeout()}_resetPingTimeout(){this.clearTimeoutFn(this._pingTimeoutTimer);const t=this._pingInterval+this._pingTimeout;this._pingTimeoutTime=Date.now()+t,this._pingTimeoutTimer=this.setTimeoutFn(()=>{this._onClose("ping timeout")},t),this.opts.autoUnref&&this._pingTimeoutTimer.unref()}_onDrain(){this.writeBuffer.splice(0,this._prevBufferLen),this._prevBufferLen=0,this.writeBuffer.length===0?this.emitReserved("drain"):this.flush()}flush(){if(this.readyState!=="closed"&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length){const t=this._getWritablePackets();this.transport.send(t),this._prevBufferLen=t.length,this.emitReserved("flush")}}_getWritablePackets(){if(!(this._maxPayload&&this.transport.name==="polling"&&this.writeBuffer.length>1))return this.writeBuffer;let e=1;for(let n=0;n<this.writeBuffer.length;n++){const i=this.writeBuffer[n].data;if(i&&(e+=dg(i)),n>0&&e>this._maxPayload)return this.writeBuffer.slice(0,n);e+=2}return this.writeBuffer}_hasPingExpired(){if(!this._pingTimeoutTime)return!0;const t=Date.now()>this._pingTimeoutTime;return t&&(this._pingTimeoutTime=0,Ao(()=>{this._onClose("ping timeout")},this.setTimeoutFn)),t}write(t,e,n){return this._sendPacket("message",t,e,n),this}send(t,e,n){return this._sendPacket("message",t,e,n),this}_sendPacket(t,e,n,i){if(typeof e=="function"&&(i=e,e=void 0),typeof n=="function"&&(i=n,n=null),this.readyState==="closing"||this.readyState==="closed")return;n=n||{},n.compress=n.compress!==!1;const s={type:t,data:e,options:n};this.emitReserved("packetCreate",s),this.writeBuffer.push(s),i&&this.once("flush",i),this.flush()}close(){const t=()=>{this._onClose("forced close"),this.transport.close()},e=()=>{this.off("upgrade",e),this.off("upgradeError",e),t()},n=()=>{this.once("upgrade",e),this.once("upgradeError",e)};return(this.readyState==="opening"||this.readyState==="open")&&(this.readyState="closing",this.writeBuffer.length?this.once("drain",()=>{this.upgrading?n():t()}):this.upgrading?n():t()),this}_onError(t){if(Ni.priorWebsocketSuccess=!1,this.opts.tryAllTransports&&this.transports.length>1&&this.readyState==="opening")return this.transports.shift(),this._open();this.emitReserved("error",t),this._onClose("transport error",t)}_onClose(t,e){if(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing"){if(this.clearTimeoutFn(this._pingTimeoutTimer),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),ca&&(this._beforeunloadEventListener&&removeEventListener("beforeunload",this._beforeunloadEventListener,!1),this._offlineEventListener)){const n=co.indexOf(this._offlineEventListener);n!==-1&&co.splice(n,1)}this.readyState="closed",this.id=null,this.emitReserved("close",t,e),this.writeBuffer=[],this._prevBufferLen=0}}_filterUpgrades(t){const e=[];for(let n=0;n<t.length;n++)~this.transports.indexOf(t[n])&&e.push(t[n]);return e}};oh.protocol=Ql;function Ig(o,t="",e){let n=o;e=e||typeof location<"u"&&location,o==null&&(o=e.protocol+"//"+e.host),typeof o=="string"&&(o.charAt(0)==="/"&&(o.charAt(1)==="/"?o=e.protocol+o:o=e.host+o),/^(https?|wss?):\/\//.test(o)||(typeof e<"u"?o=e.protocol+"//"+o:o="https://"+o),n=aa(o)),n.port||(/^(http|ws)$/.test(n.protocol)?n.port="80":/^(http|ws)s$/.test(n.protocol)&&(n.port="443")),n.path=n.path||"/";const s=n.host.indexOf(":")!==-1?"["+n.host+"]":n.host;return n.id=n.protocol+"://"+s+":"+n.port+t,n.href=n.protocol+"://"+s+(e&&e.port===n.port?"":":"+n.port),n}const Pg=typeof ArrayBuffer=="function",Lg=o=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(o):o.buffer instanceof ArrayBuffer,rh=Object.prototype.toString,Dg=typeof Blob=="function"||typeof Blob<"u"&&rh.call(Blob)==="[object BlobConstructor]",kg=typeof File=="function"||typeof File<"u"&&rh.call(File)==="[object FileConstructor]";function ka(o){return Pg&&(o instanceof ArrayBuffer||Lg(o))||Dg&&o instanceof Blob||kg&&o instanceof File}function lo(o,t){if(!o||typeof o!="object")return!1;if(Array.isArray(o)){for(let e=0,n=o.length;e<n;e++)if(lo(o[e]))return!0;return!1}if(ka(o))return!0;if(o.toJSON&&typeof o.toJSON=="function"&&arguments.length===1)return lo(o.toJSON(),!0);for(const e in o)if(Object.prototype.hasOwnProperty.call(o,e)&&lo(o[e]))return!0;return!1}function Ug(o){const t=[],e=o.data,n=o;return n.data=ho(e,t),n.attachments=t.length,{packet:n,buffers:t}}function ho(o,t,e){if(!o)return o;if(ka(o)){const n={_placeholder:!0,num:t.length};return t.push(o),n}else if(Array.isArray(o)){const n=new Array(o.length);for(let i=0;i<o.length;i++)n[i]=ho(o[i],t);return n}else if(typeof o=="object"&&!(o instanceof Date)){if(o.toJSON&&typeof o.toJSON=="function"&&!e)return ho(o.toJSON(),t,!0);const n={};for(const i in o)Object.prototype.hasOwnProperty.call(o,i)&&(n[i]=ho(o[i],t));return n}return o}function Ng(o,t){return o.data=la(o.data,t),delete o.attachments,o}function la(o,t){if(!o)return o;if(o&&o._placeholder===!0){if(typeof o.num=="number"&&o.num>=0&&o.num<t.length)return t[o.num];throw new Error("illegal attachments")}else if(Array.isArray(o))for(let e=0;e<o.length;e++)o[e]=la(o[e],t);else if(typeof o=="object")for(const e in o)Object.prototype.hasOwnProperty.call(o,e)&&(o[e]=la(o[e],t));return o}const Bg=["connect","connect_error","disconnect","disconnecting","newListener","removeListener"];var Gt;(function(o){o[o.CONNECT=0]="CONNECT",o[o.DISCONNECT=1]="DISCONNECT",o[o.EVENT=2]="EVENT",o[o.ACK=3]="ACK",o[o.CONNECT_ERROR=4]="CONNECT_ERROR",o[o.BINARY_EVENT=5]="BINARY_EVENT",o[o.BINARY_ACK=6]="BINARY_ACK"})(Gt||(Gt={}));class Fg{constructor(t){this.replacer=t}encode(t){return(t.type===Gt.EVENT||t.type===Gt.ACK)&&lo(t)?this.encodeAsBinary({type:t.type===Gt.EVENT?Gt.BINARY_EVENT:Gt.BINARY_ACK,nsp:t.nsp,data:t.data,id:t.id}):[this.encodeAsString(t)]}encodeAsString(t){let e=""+t.type;return(t.type===Gt.BINARY_EVENT||t.type===Gt.BINARY_ACK)&&(e+=t.attachments+"-"),t.nsp&&t.nsp!=="/"&&(e+=t.nsp+","),t.id!=null&&(e+=t.id),t.data!=null&&(e+=JSON.stringify(t.data,this.replacer)),e}encodeAsBinary(t){const e=Ug(t),n=this.encodeAsString(e.packet),i=e.buffers;return i.unshift(n),i}}class Ua extends Ee{constructor(t){super(),this.opts=Object.assign({reviver:void 0,maxAttachments:10},typeof t=="function"?{reviver:t}:t)}add(t){let e;if(typeof t=="string"){if(this.reconstructor)throw new Error("got plaintext data when reconstructing a packet");e=this.decodeString(t);const n=e.type===Gt.BINARY_EVENT;n||e.type===Gt.BINARY_ACK?(e.type=n?Gt.EVENT:Gt.ACK,this.reconstructor=new Og(e)):super.emitReserved("decoded",e)}else if(ka(t)||t.base64)if(this.reconstructor)e=this.reconstructor.takeBinaryData(t),e&&(this.reconstructor=null,super.emitReserved("decoded",e));else throw new Error("got binary data when not reconstructing a packet");else throw new Error("Unknown type: "+t)}decodeString(t){let e=0;const n={type:Number(t.charAt(0))};if(Gt[n.type]===void 0)throw new Error("unknown packet type "+n.type);if(n.type===Gt.BINARY_EVENT||n.type===Gt.BINARY_ACK){const s=e+1;for(;t.charAt(++e)!=="-"&&e!=t.length;);const r=t.substring(s,e);if(r!=Number(r)||t.charAt(e)!=="-")throw new Error("Illegal attachments");const a=Number(r);if(!zg(a)||a<1)throw new Error("Illegal attachments");if(a>this.opts.maxAttachments)throw new Error("too many attachments");n.attachments=a}if(t.charAt(e+1)==="/"){const s=e+1;for(;++e&&!(t.charAt(e)===","||e===t.length););n.nsp=t.substring(s,e)}else n.nsp="/";const i=t.charAt(e+1);if(i!==""&&Number(i)==i){const s=e+1;for(;++e;){const r=t.charAt(e);if(r==null||Number(r)!=r){--e;break}if(e===t.length)break}n.id=Number(t.substring(s,e+1))}if(t.charAt(++e)){const s=this.tryParse(t.substr(e));if(Ua.isPayloadValid(n.type,s))n.data=s;else throw new Error("invalid payload")}return n}tryParse(t){try{return JSON.parse(t,this.opts.reviver)}catch{return!1}}static isPayloadValid(t,e){switch(t){case Gt.CONNECT:return al(e);case Gt.DISCONNECT:return e===void 0;case Gt.CONNECT_ERROR:return typeof e=="string"||al(e);case Gt.EVENT:case Gt.BINARY_EVENT:return Array.isArray(e)&&(typeof e[0]=="number"||typeof e[0]=="string"&&Bg.indexOf(e[0])===-1);case Gt.ACK:case Gt.BINARY_ACK:return Array.isArray(e)}}destroy(){this.reconstructor&&(this.reconstructor.finishedReconstruction(),this.reconstructor=null)}}class Og{constructor(t){this.packet=t,this.buffers=[],this.reconPack=t}takeBinaryData(t){if(this.buffers.push(t),this.buffers.length===this.reconPack.attachments){const e=Ng(this.reconPack,this.buffers);return this.finishedReconstruction(),e}return null}finishedReconstruction(){this.reconPack=null,this.buffers=[]}}const zg=Number.isInteger||function(o){return typeof o=="number"&&isFinite(o)&&Math.floor(o)===o};function al(o){return Object.prototype.toString.call(o)==="[object Object]"}const Hg=Object.freeze(Object.defineProperty({__proto__:null,Decoder:Ua,Encoder:Fg,get PacketType(){return Gt}},Symbol.toStringTag,{value:"Module"}));function yn(o,t,e){return o.on(t,e),function(){o.off(t,e)}}const Gg=Object.freeze({connect:1,connect_error:1,disconnect:1,disconnecting:1,newListener:1,removeListener:1});class ah extends Ee{constructor(t,e,n){super(),this.connected=!1,this.recovered=!1,this.receiveBuffer=[],this.sendBuffer=[],this._queue=[],this._queueSeq=0,this.ids=0,this.acks={},this.flags={},this.io=t,this.nsp=e,n&&n.auth&&(this.auth=n.auth),this._opts=Object.assign({},n),this.io._autoConnect&&this.open()}get disconnected(){return!this.connected}subEvents(){if(this.subs)return;const t=this.io;this.subs=[yn(t,"open",this.onopen.bind(this)),yn(t,"packet",this.onpacket.bind(this)),yn(t,"error",this.onerror.bind(this)),yn(t,"close",this.onclose.bind(this))]}get active(){return!!this.subs}connect(){return this.connected?this:(this.subEvents(),this.io._reconnecting||this.io.open(),this.io._readyState==="open"&&this.onopen(),this)}open(){return this.connect()}send(...t){return t.unshift("message"),this.emit.apply(this,t),this}emit(t,...e){var n,i,s;if(Gg.hasOwnProperty(t))throw new Error('"'+t.toString()+'" is a reserved event name');if(e.unshift(t),this._opts.retries&&!this.flags.fromQueue&&!this.flags.volatile)return this._addToQueue(e),this;const r={type:Gt.EVENT,data:e};if(r.options={},r.options.compress=this.flags.compress!==!1,typeof e[e.length-1]=="function"){const h=this.ids++,d=e.pop();this._registerAckCallback(h,d),r.id=h}const a=(i=(n=this.io.engine)===null||n===void 0?void 0:n.transport)===null||i===void 0?void 0:i.writable,c=this.connected&&!(!((s=this.io.engine)===null||s===void 0)&&s._hasPingExpired());return this.flags.volatile&&!a||(c?(this.notifyOutgoingListeners(r),this.packet(r)):this.sendBuffer.push(r)),this.flags={},this}_registerAckCallback(t,e){var n;const i=(n=this.flags.timeout)!==null&&n!==void 0?n:this._opts.ackTimeout;if(i===void 0){this.acks[t]=e;return}const s=this.io.setTimeoutFn(()=>{delete this.acks[t];for(let a=0;a<this.sendBuffer.length;a++)this.sendBuffer[a].id===t&&this.sendBuffer.splice(a,1);e.call(this,new Error("operation has timed out"))},i),r=(...a)=>{this.io.clearTimeoutFn(s),e.apply(this,a)};r.withError=!0,this.acks[t]=r}emitWithAck(t,...e){return new Promise((n,i)=>{const s=(r,a)=>r?i(r):n(a);s.withError=!0,e.push(s),this.emit(t,...e)})}_addToQueue(t){let e;typeof t[t.length-1]=="function"&&(e=t.pop());const n={id:this._queueSeq++,tryCount:0,pending:!1,args:t,flags:Object.assign({fromQueue:!0},this.flags)};t.push((i,...s)=>(this._queue[0],i!==null?n.tryCount>this._opts.retries&&(this._queue.shift(),e&&e(i)):(this._queue.shift(),e&&e(null,...s)),n.pending=!1,this._drainQueue())),this._queue.push(n),this._drainQueue()}_drainQueue(t=!1){if(!this.connected||this._queue.length===0)return;const e=this._queue[0];e.pending&&!t||(e.pending=!0,e.tryCount++,this.flags=e.flags,this.emit.apply(this,e.args))}packet(t){t.nsp=this.nsp,this.io._packet(t)}onopen(){typeof this.auth=="function"?this.auth(t=>{this._sendConnectPacket(t)}):this._sendConnectPacket(this.auth)}_sendConnectPacket(t){this.packet({type:Gt.CONNECT,data:this._pid?Object.assign({pid:this._pid,offset:this._lastOffset},t):t})}onerror(t){this.connected||this.emitReserved("connect_error",t)}onclose(t,e){this.connected=!1,delete this.id,this.emitReserved("disconnect",t,e),this._clearAcks()}_clearAcks(){Object.keys(this.acks).forEach(t=>{if(!this.sendBuffer.some(n=>String(n.id)===t)){const n=this.acks[t];delete this.acks[t],n.withError&&n.call(this,new Error("socket has been disconnected"))}})}onpacket(t){if(t.nsp===this.nsp)switch(t.type){case Gt.CONNECT:t.data&&t.data.sid?this.onconnect(t.data.sid,t.data.pid):this.emitReserved("connect_error",new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));break;case Gt.EVENT:case Gt.BINARY_EVENT:this.onevent(t);break;case Gt.ACK:case Gt.BINARY_ACK:this.onack(t);break;case Gt.DISCONNECT:this.ondisconnect();break;case Gt.CONNECT_ERROR:this.destroy();const n=new Error(t.data.message);n.data=t.data.data,this.emitReserved("connect_error",n);break}}onevent(t){const e=t.data||[];t.id!=null&&e.push(this.ack(t.id)),this.connected?this.emitEvent(e):this.receiveBuffer.push(Object.freeze(e))}emitEvent(t){if(this._anyListeners&&this._anyListeners.length){const e=this._anyListeners.slice();for(const n of e)n.apply(this,t)}super.emit.apply(this,t),this._pid&&t.length&&typeof t[t.length-1]=="string"&&(this._lastOffset=t[t.length-1])}ack(t){const e=this;let n=!1;return function(...i){n||(n=!0,e.packet({type:Gt.ACK,id:t,data:i}))}}onack(t){const e=this.acks[t.id];typeof e=="function"&&(delete this.acks[t.id],e.withError&&t.data.unshift(null),e.apply(this,t.data))}onconnect(t,e){this.id=t,this.recovered=e&&this._pid===e,this._pid=e,this.connected=!0,this.emitBuffered(),this._drainQueue(!0),this.emitReserved("connect")}emitBuffered(){this.receiveBuffer.forEach(t=>this.emitEvent(t)),this.receiveBuffer=[],this.sendBuffer.forEach(t=>{this.notifyOutgoingListeners(t),this.packet(t)}),this.sendBuffer=[]}ondisconnect(){this.destroy(),this.onclose("io server disconnect")}destroy(){this.subs&&(this.subs.forEach(t=>t()),this.subs=void 0),this.io._destroy(this)}disconnect(){return this.connected&&this.packet({type:Gt.DISCONNECT}),this.destroy(),this.connected&&this.onclose("io client disconnect"),this}close(){return this.disconnect()}compress(t){return this.flags.compress=t,this}get volatile(){return this.flags.volatile=!0,this}timeout(t){return this.flags.timeout=t,this}onAny(t){return this._anyListeners=this._anyListeners||[],this._anyListeners.push(t),this}prependAny(t){return this._anyListeners=this._anyListeners||[],this._anyListeners.unshift(t),this}offAny(t){if(!this._anyListeners)return this;if(t){const e=this._anyListeners;for(let n=0;n<e.length;n++)if(t===e[n])return e.splice(n,1),this}else this._anyListeners=[];return this}listenersAny(){return this._anyListeners||[]}onAnyOutgoing(t){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.push(t),this}prependAnyOutgoing(t){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.unshift(t),this}offAnyOutgoing(t){if(!this._anyOutgoingListeners)return this;if(t){const e=this._anyOutgoingListeners;for(let n=0;n<e.length;n++)if(t===e[n])return e.splice(n,1),this}else this._anyOutgoingListeners=[];return this}listenersAnyOutgoing(){return this._anyOutgoingListeners||[]}notifyOutgoingListeners(t){if(this._anyOutgoingListeners&&this._anyOutgoingListeners.length){const e=this._anyOutgoingListeners.slice();for(const n of e)n.apply(this,t.data)}}}function Ji(o){o=o||{},this.ms=o.min||100,this.max=o.max||1e4,this.factor=o.factor||2,this.jitter=o.jitter>0&&o.jitter<=1?o.jitter:0,this.attempts=0}Ji.prototype.duration=function(){var o=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var t=Math.random(),e=Math.floor(t*this.jitter*o);o=(Math.floor(t*10)&1)==0?o-e:o+e}return Math.min(o,this.max)|0};Ji.prototype.reset=function(){this.attempts=0};Ji.prototype.setMin=function(o){this.ms=o};Ji.prototype.setMax=function(o){this.max=o};Ji.prototype.setJitter=function(o){this.jitter=o};class ha extends Ee{constructor(t,e){var n;super(),this.nsps={},this.subs=[],t&&typeof t=="object"&&(e=t,t=void 0),e=e||{},e.path=e.path||"/socket.io",this.opts=e,Co(this,e),this.reconnection(e.reconnection!==!1),this.reconnectionAttempts(e.reconnectionAttempts||1/0),this.reconnectionDelay(e.reconnectionDelay||1e3),this.reconnectionDelayMax(e.reconnectionDelayMax||5e3),this.randomizationFactor((n=e.randomizationFactor)!==null&&n!==void 0?n:.5),this.backoff=new Ji({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()}),this.timeout(e.timeout==null?2e4:e.timeout),this._readyState="closed",this.uri=t;const i=e.parser||Hg;this.encoder=new i.Encoder,this.decoder=new i.Decoder,this._autoConnect=e.autoConnect!==!1,this._autoConnect&&this.open()}reconnection(t){return arguments.length?(this._reconnection=!!t,t||(this.skipReconnect=!0),this):this._reconnection}reconnectionAttempts(t){return t===void 0?this._reconnectionAttempts:(this._reconnectionAttempts=t,this)}reconnectionDelay(t){var e;return t===void 0?this._reconnectionDelay:(this._reconnectionDelay=t,(e=this.backoff)===null||e===void 0||e.setMin(t),this)}randomizationFactor(t){var e;return t===void 0?this._randomizationFactor:(this._randomizationFactor=t,(e=this.backoff)===null||e===void 0||e.setJitter(t),this)}reconnectionDelayMax(t){var e;return t===void 0?this._reconnectionDelayMax:(this._reconnectionDelayMax=t,(e=this.backoff)===null||e===void 0||e.setMax(t),this)}timeout(t){return arguments.length?(this._timeout=t,this):this._timeout}maybeReconnectOnOpen(){!this._reconnecting&&this._reconnection&&this.backoff.attempts===0&&this.reconnect()}open(t){if(~this._readyState.indexOf("open"))return this;this.engine=new oh(this.uri,this.opts);const e=this.engine,n=this;this._readyState="opening",this.skipReconnect=!1;const i=yn(e,"open",function(){n.onopen(),t&&t()}),s=a=>{this.cleanup(),this._readyState="closed",this.emitReserved("error",a),t?t(a):this.maybeReconnectOnOpen()},r=yn(e,"error",s);if(this._timeout!==!1){const a=this._timeout,c=this.setTimeoutFn(()=>{i(),s(new Error("timeout")),e.close()},a);this.opts.autoUnref&&c.unref(),this.subs.push(()=>{this.clearTimeoutFn(c)})}return this.subs.push(i),this.subs.push(r),this}connect(t){return this.open(t)}onopen(){this.cleanup(),this._readyState="open",this.emitReserved("open");const t=this.engine;this.subs.push(yn(t,"ping",this.onping.bind(this)),yn(t,"data",this.ondata.bind(this)),yn(t,"error",this.onerror.bind(this)),yn(t,"close",this.onclose.bind(this)),yn(this.decoder,"decoded",this.ondecoded.bind(this)))}onping(){this.emitReserved("ping")}ondata(t){try{this.decoder.add(t)}catch(e){this.onclose("parse error",e)}}ondecoded(t){Ao(()=>{this.emitReserved("packet",t)},this.setTimeoutFn)}onerror(t){this.emitReserved("error",t)}socket(t,e){let n=this.nsps[t];return n?this._autoConnect&&!n.active&&n.connect():(n=new ah(this,t,e),this.nsps[t]=n),n}_destroy(t){const e=Object.keys(this.nsps);for(const n of e)if(this.nsps[n].active)return;this._close()}_packet(t){const e=this.encoder.encode(t);for(let n=0;n<e.length;n++)this.engine.write(e[n],t.options)}cleanup(){this.subs.forEach(t=>t()),this.subs.length=0,this.decoder.destroy()}_close(){this.skipReconnect=!0,this._reconnecting=!1,this.onclose("forced close")}disconnect(){return this._close()}onclose(t,e){var n;this.cleanup(),(n=this.engine)===null||n===void 0||n.close(),this.backoff.reset(),this._readyState="closed",this.emitReserved("close",t,e),this._reconnection&&!this.skipReconnect&&this.reconnect()}reconnect(){if(this._reconnecting||this.skipReconnect)return this;const t=this;if(this.backoff.attempts>=this._reconnectionAttempts)this.backoff.reset(),this.emitReserved("reconnect_failed"),this._reconnecting=!1;else{const e=this.backoff.duration();this._reconnecting=!0;const n=this.setTimeoutFn(()=>{t.skipReconnect||(this.emitReserved("reconnect_attempt",t.backoff.attempts),!t.skipReconnect&&t.open(i=>{i?(t._reconnecting=!1,t.reconnect(),this.emitReserved("reconnect_error",i)):t.onreconnect()}))},e);this.opts.autoUnref&&n.unref(),this.subs.push(()=>{this.clearTimeoutFn(n)})}}onreconnect(){const t=this.backoff.attempts;this._reconnecting=!1,this.backoff.reset(),this.emitReserved("reconnect",t)}}const fs={};function uo(o,t){typeof o=="object"&&(t=o,o=void 0),t=t||{};const e=Ig(o,t.path||"/socket.io"),n=e.source,i=e.id,s=e.path,r=fs[i]&&s in fs[i].nsps,a=t.forceNew||t["force new connection"]||t.multiplex===!1||r;let c;return a?c=new ha(n,t):(fs[i]||(fs[i]=new ha(n,t)),c=fs[i]),e.query&&!t.query&&(t.query=e.queryKey),c.socket(e.path,t)}Object.assign(uo,{Manager:ha,Socket:ah,io:uo,connect:uo});const mr={deer:{maxHp:65,walk:2.3,run:7.2,dmg:0,hostile:!1,xp:24,drops:[["raw_meat",2,3],["hide",2,3]]},boar:{maxHp:95,walk:2.4,run:6,dmg:14,hostile:!0,xp:35,drops:[["raw_meat",2,4],["hide",1,3]]},wolf:{maxHp:115,walk:3,run:7.1,dmg:20,hostile:!0,xp:48,drops:[["raw_meat",1,3],["hide",2,3],["fang",1,2]]},stalker:{maxHp:185,walk:3.4,run:7.6,dmg:26,hostile:!0,xp:95,drops:[["shadow_essence",1,3],["ancient_shard",1,2]]},crab:{maxHp:55,walk:2.2,run:4.4,dmg:9,hostile:!0,xp:22,drops:[["crab_meat",1,3],["sea_pearl",1,1]]},serpent:{maxHp:260,walk:4.5,run:8.5,dmg:26,hostile:!0,xp:120,drops:[["serpent_scale",2,4],["serpent_meat",2,4]]},cinder_golem:{maxHp:420,walk:2.4,run:5.2,dmg:36,hostile:!0,xp:180,drops:[["obsidian",3,5],["iron_ingot",2,4],["ancient_shard",2,3],["gold_coin",5,10]]}};class cl{handlers;world;roomId="emerald-archipelago";roomName="Emerald Archipelago (Offline / GitHub Pages)";seed=42077;localPlayer;bots=[];priv;nodes=new Map;structures=new Map;boats=new Map;boatSteer=0;wildlife=new Map;loot=new Map;projectiles=new Map;time={day:1,timeOfDay:.31,weather:"clear",weatherIntensity:0,windDirX:.78,windDirZ:.62,windSpeed:1};weatherTimer=90;thunderTimer=14;wasNight=!1;seq=1;lastAction=0;lastDodge=0;timer=null;lastTick=performance.now();saveTimer=0;constructor(t){this.handlers=t}startSession(t){this.stop(),this.roomId=(t.roomId||"emerald-archipelago").toLowerCase().replace(/[^a-z0-9-_]/g,"")||"emerald-archipelago",this.roomName=`${t.roomName||this.roomId} (Local World)`,this.seed=typeof t.seed=="number"&&Number.isFinite(t.seed)?Math.abs(Math.floor(t.seed))%999999:42077,this.world=new Wl(this.seed),this.nodes.clear();for(const s of this.world.generateResourceNodes())this.nodes.set(s.id,s);this.structures.clear(),this.boats.clear(),this.loot.clear(),this.projectiles.clear(),this.bots=[],this.loadLocalSave()||this.seedStarterCamp(),this.ensureStarterBoat();const e=this.world.getSpawnPoint(),n=Array.from({length:N0},()=>null);n[0]={itemId:"stone_axe",count:1,durability:We.stone_axe.maxDurability},n[1]={itemId:"torch",count:1,durability:We.torch.maxDurability},n[2]={itemId:"build_hammer",count:1,durability:We.build_hammer.maxDurability},n[3]={itemId:"berries",count:6},n[4]={itemId:"bandage",count:2},this.localPlayer={id:"local_player",name:(t.playerName||"Survivor").trim().slice(0,18)||"Survivor",isBot:!1,outfit:t.outfit||"ranger",x:e.x,y:e.y,z:e.z,vx:0,vy:0,vz:0,yaw:Math.PI,pitch:0,anim:"idle",swingTime:0,equippedSlot:0,equippedItemId:"stone_axe",armorItemId:null,armorRating:0,vitals:{hp:100,maxHp:100,stamina:100,maxStamina:100,hunger:92,thirst:92,warmth:58},status:{sheltered:!1,warm:!0,wellFed:!0,wet:!1,chilled:!1,nearCampfire:!1,nearWorkbench:!1,nearFurnace:!1,nearRunicForge:!1,nearCauldron:!1,nearFreshWater:!1},alive:!0,respawnAt:0,bedPos:null,pvpEnabled:!1,level:1,xp:0,kills:0,daysSurvived:1,emote:null,emoteUntil:0,boatId:null},this.priv={inventory:n,armorSlot:null,objectives:{gather_resources:!1,craft_tool:!1,build_shelter:!1,cook_food:!1,hunt_wildlife:!1,smelt_iron:!1}},t.spawnAiCompanions&&this.spawnBot(),this.spawnInitialWildlife(),this.lastTick=performance.now(),this.timer=globalThis.setInterval(()=>{const s=performance.now(),r=Math.min(.1,(s-this.lastTick)/1e3);this.lastTick=s,this.tick(r,Date.now())},50);const i={id:"sys_welcome",senderId:"system",senderName:"Wildreach",text:"Running in Local World Mode (auto-saved in browser). Add a server URL in the lobby for online co-op!",kind:"system",timestamp:Date.now()};return{playerId:this.localPlayer.id,room:{id:this.roomId,name:this.roomName,seed:this.seed,playerCount:1,maxPlayers:1,day:this.time.day,weather:this.time.weather,pvpEnabled:!1},landmarks:this.world.landmarks,time:{...this.time},players:[this.localPlayer,...this.bots],privateState:this.priv,nodes:Array.from(this.nodes.values()),structures:Array.from(this.structures.values()),boats:Array.from(this.boats.values()),wildlife:this.getWildlifeSnap(),loot:Array.from(this.loot.values()),chatHistory:[i]}}ensureStarterBoat(){if(this.boats.size>0)return;const t=this.world.getStarterBoatSpot(),e=ln.raft;this.boats.set("boat_starter_raft",{id:"boat_starter_raft",kind:"raft",ownerId:"world",ownerName:"Harbor",x:t.x,y:Pt,z:t.z,yaw:t.yaw,vx:0,vz:0,speed:0,throttle:0,rudder:0,hp:e.maxHp,maxHp:e.maxHp,pilotId:null})}stop(){this.timer!==null&&(globalThis.clearInterval(this.timer),this.timer=null)}seedStarterCamp(){this.structures.set("st_sanctuary_fire",{id:"st_sanctuary_fire",kind:"campfire",ownerId:"world",ownerName:"Sanctuary",x:-7.5,y:this.world.getHeight(-7.5,20.5),z:20.5,rotY:0,hp:120,maxHp:120,lit:!0,fuel:95});const n=-13.2,i=20.8,s=Array.from({length:tl},()=>null);s[0]={itemId:"wood",count:12},s[1]={itemId:"stone",count:10},s[2]={itemId:"berries",count:8},s[3]={itemId:"cooked_meat",count:3},s[4]={itemId:"flint_arrow",count:12},this.structures.set("st_sanctuary_chest",{id:"st_sanctuary_chest",kind:"storage_chest",ownerId:"world",ownerName:"Sanctuary",x:n,y:this.world.getHeight(n,i),z:i,rotY:.45,hp:240,maxHp:240,chestSlots:s})}loadLocalSave(){try{const t=localStorage.getItem(`wildreach_save_${this.roomId}_${this.seed}`);if(!t)return!1;const e=JSON.parse(t);this.time.day=e.day||1,this.time.timeOfDay=typeof e.timeOfDay=="number"?e.timeOfDay:.31;for(const n of e.structures||[])this.structures.set(n.id,n);for(const n of e.boats||[])this.boats.set(n.id,{...n,pilotId:null,speed:0,vx:0,vz:0,throttle:0});return this.structures.size>0}catch{return!1}}saveLocal(){try{localStorage.setItem(`wildreach_save_${this.roomId}_${this.seed}`,JSON.stringify({day:this.time.day,timeOfDay:this.time.timeOfDay,structures:Array.from(this.structures.values()),boats:Array.from(this.boats.values()).map(t=>({...t,pilotId:null}))}))}catch{}}spawnInitialWildlife(){this.wildlife.clear();const t=(e,n,i)=>{let s=0,r=0;for(;s<n&&r<500;){r++;const a=(Math.random()*2-1)*126,c=(Math.random()*2-1)*126;if(e!=="deer"&&Math.hypot(a+10,c-18)<34)continue;const l=this.world.sample(a,c);l.height<.8||l.slope>.75||!i.includes(l.biome)||(this.addWildlife(e,a,c),s++)}};t("deer",12,["meadow","beach"]),t("boar",7,["meadow","pine","marsh"]),t("wolf",6,["pine","highland","volcanic"]),t("crab",7,["beach"]);for(const[e,n]of[[-145,132],[-153,141]])this.world.getHeight(e,n)>.25&&this.addWildlife("crab",e,n);for(const[e,n]of[[-92,134],[96,128],[112,-96],[-104,-108]])this.world.getHeight(e,n)<-1.8&&this.addWildlife("serpent",e,n);this.world.getHeight(152,-136)>1&&this.addWildlife("cinder_golem",152,-136)}addWildlife(t,e,n){const i=mr[t],s=`lmob_${t}_${this.seq++}`;this.wildlife.set(s,{id:s,kind:t,x:e,y:t==="serpent"?Pt-.15:this.world.getHeight(e,n),z:n,yaw:Math.random()*Math.PI*2,hp:i.maxHp,maxHp:i.maxHp,state:"idle",speed:0,attackTime:0,homeX:e,homeZ:n,targetX:e,targetZ:n,thinkTimer:1+Math.random()*3,attackCooldown:0,aggroUntil:0,respawnAt:0})}getWildlifeSnap(){return Array.from(this.wildlife.values()).filter(t=>t.state!=="dead")}spawnBot(){if(this.bots.length>=3)return;const t=[["Kael [AI]","ranger"],["Lyra [AI]","warden"],["Rowan [AI]","nomad"]],[e,n]=t[this.bots.length%t.length],i=this.world.getSpawnPoint(),s=i.x+3.5+this.bots.length*2,r=i.z-2.5;this.bots.push({id:`lbot_${this.seq++}`,name:e,isBot:!0,outfit:n,x:s,y:this.world.getHeight(s,r),z:r,vx:0,vy:0,vz:0,yaw:0,pitch:0,anim:"idle",swingTime:0,equippedSlot:0,equippedItemId:"stone_axe",armorItemId:"leather_armor",armorRating:25,vitals:{hp:100,maxHp:100,stamina:100,maxStamina:100,hunger:90,thirst:90,warmth:60},status:{sheltered:!1,warm:!0,wellFed:!0,wet:!1,chilled:!1,nearCampfire:!1,nearWorkbench:!1,nearFurnace:!1,nearRunicForge:!1,nearCauldron:!1,nearFreshWater:!1},alive:!0,respawnAt:0,bedPos:null,pvpEnabled:!1,level:2,xp:0,kills:0,daysSurvived:1,emote:null,emoteUntil:0,boatId:null,homeX:i.x,homeZ:i.z,goalX:s,goalZ:r,timer:2,cd:0}),this.handlers.onChatMessage({id:`sys_${this.seq++}`,senderId:"system",senderName:"Wildreach",text:`${e} joined your camp to gather & defend.`,kind:"system",timestamp:Date.now()})}handleInput(t){const e=this.localPlayer;if(!(!e||!e.alive)){if(e.boatId){e.pitch=t.pitch;return}e.x=Bt(t.x,-212,212),e.y=t.y,e.z=Bt(t.z,-212,212),e.vx=t.vx,e.vy=t.vy,e.vz=t.vz,e.yaw=t.yaw,e.pitch=t.pitch,e.anim=t.anim,t.sprinting&&Math.hypot(e.vx,e.vz)>1.5&&(e.vitals.stamina=Math.max(0,e.vitals.stamina-.55))}}handleEquip(t){t<0||t>=$l||(this.localPlayer.equippedSlot=t,this.localPlayer.equippedItemId=this.priv.inventory[t]?.itemId??null)}handleDodge(t){const e=Date.now();if(e-this.lastDodge<850||this.localPlayer.vitals.stamina<18)return;this.lastDodge=e,this.localPlayer.vitals.stamina-=18;const n=Math.hypot(t.x,t.z)||1;this.localPlayer.x=Bt(this.localPlayer.x+t.x/n*3.2,-170,170),this.localPlayer.z=Bt(this.localPlayer.z+t.z/n*3.2,-170,170)}handleAction(t){const e=this.localPlayer;if(!e.alive)return;const n=Date.now(),i=Ue(e.equippedItemId);if(n-this.lastAction<(i?.attackCooldown??.5)*850||(this.lastAction=n,e.vitals.stamina<6))return;if(e.vitals.stamina=Math.max(0,e.vitals.stamina-7),e.swingTime=.36,i?.isRanged){if(!this.consumeMats([{itemId:i.ammoItemId||"flint_arrow",count:1}])){this.handlers.onToast({text:"Out of Flint Arrows! Craft more at a Workbench.",tone:"warn"});return}const r=Bt(t.charge??.85,.3,1),a=26+r*22,c=Math.hypot(t.dirX,t.dirY,t.dirZ)||1,l=`lpr_${this.seq++}`;this.projectiles.set(l,{id:l,ownerId:e.id,kind:i.id==="starlight_bow"?"starlight_bolt":"arrow",x:e.x+t.dirX/c*.9,y:e.y+1.55,z:e.z+t.dirZ/c*.9,vx:t.dirX/c*a,vy:t.dirY/c*a+2.2,vz:t.dirZ/c*a,damage:Math.round((i.damage??34)*(.65+r*.55)),bornAt:n}),this.syncPrivate();return}if(i?.toolKind==="hammer"&&t.targetStructureId){const r=this.structures.get(t.targetStructureId);if(r&&r.hp<r.maxHp){r.hp=Math.min(r.maxHp,r.hp+45),this.handlers.onStructureUpdate(r),this.handlers.onFxEvent({kind:"build",x:r.x,y:r.y+1,z:r.z});return}}if(t.targetWildlifeId){const r=this.wildlife.get(t.targetWildlifeId);if(r&&r.state!=="dead"&&Math.hypot(r.x-e.x,r.z-e.z)<(i?.range??3.2)+2){this.damageWildlife(r,i?.damage??12,e.x,e.z);return}}let s=t.targetNodeId?this.nodes.get(t.targetNodeId):void 0;if(!s||s.depleted){let r=4.6;for(const a of this.nodes.values()){if(a.depleted)continue;const c=a.x-e.x,l=a.z-e.z,h=Math.hypot(c,l);h<r&&(c*t.dirX+l*t.dirZ)/(h||1)>.5&&(r=h,s=a)}}s&&!s.depleted&&this.hitNode(s,i)}hitNode(t,e){const n=oa[t.kind];if((e?.tier??0)<n.minToolTier){this.handlers.onToast({text:`Requires ${n.minToolTier===1?"Stone Pickaxe":"Forged Iron Pickaxe"}!`,tone:"warn"});return}const i=n.preferredTool==="hand"?26:e?.toolKind===n.preferredTool?Math.round((e?.gatherPower??16)*1.25):Math.max(10,Math.round((e?.gatherPower??14)*.6));if(t.hp=Math.max(0,t.hp-i),this.handlers.onFxEvent({kind:t.kind.endsWith("tree")||t.kind==="driftwood"?"chop":"mine",x:t.x,y:t.y+1.1,z:t.z}),this.handlers.onCombatEvent({id:`ce_${this.seq++}`,x:t.x,y:t.y+1.8,z:t.z,text:`-${i}`,color:"#f8fafc",kind:"damage"}),t.hp<=0){t.depleted=!0,t.respawnAt=Date.now()+n.respawnSec*1e3;const s=t.x-this.localPlayer.x,r=t.z-this.localPlayer.z,a=Math.hypot(s,r)||1;t.kind.endsWith("tree")&&this.handlers.onNodeFell({id:t.id,dirX:s/a,dirZ:r/a});for(const c of n.drops){if(c.chance!==void 0&&Math.random()>c.chance)continue;const l=c.min+Math.floor(Math.random()*(c.max-c.min+1));this.addItem(c.itemId,l)}this.priv.objectives.gather_resources=!0,this.grantXp(12),this.syncPrivate()}this.handlers.onNodeUpdate(t)}damageWildlife(t,e,n,i){t.hp=Math.max(0,t.hp-e),this.handlers.onFxEvent({kind:"hit",x:t.x,y:t.y+1,z:t.z}),this.handlers.onCombatEvent({id:`ce_${this.seq++}`,x:t.x,y:t.y+1.9,z:t.z,text:`-${e}`,color:"#fbbf24",kind:"damage"});const s=mr[t.kind];if(t.hp<=0){t.state="dead",t.respawnAt=Date.now()+85e3;for(const[r,a,c]of s.drops){const l=a+Math.floor(Math.random()*(c-a+1)),h=`lloot_${this.seq++}`,d={id:h,itemId:r,count:l,x:t.x+(Math.random()-.5),y:t.y+.4,z:t.z+(Math.random()-.5)};this.loot.set(h,d),this.handlers.onLootAdd(d)}this.localPlayer.kills+=1,this.priv.objectives.hunt_wildlife=!0,this.grantXp(s.xp),this.syncPrivate()}else if(s.hostile)t.state="chase",t.aggroUntil=Date.now()+14e3;else{t.state="flee";const r=t.x-n,a=t.z-i,c=Math.hypot(r,a)||1;t.targetX=Bt(t.x+r/c*24,-135,135),t.targetZ=Bt(t.z+a/c*24,-135,135),t.thinkTimer=4}}handleInteract(t){const e=this.localPlayer;if(t.drinkWater&&this.world.isNearFreshWater(e.x,e.z)){e.vitals.thirst=Math.min(100,e.vitals.thirst+45),this.handlers.onFxEvent({kind:"drink",x:e.x,y:e.y+1.2,z:e.z}),this.handlers.onToast({text:"Drank fresh Crystal Spring water (+45 Thirst)",tone:"good"});return}if(t.lootId){const n=this.loot.get(t.lootId);n&&(this.addItem(n.itemId,n.count),this.loot.delete(n.id),this.handlers.onLootRemove(n.id),this.handlers.onToast({text:`Picked up ${n.count}× ${We[n.itemId]?.name??n.itemId}`,tone:"good"}),this.syncPrivate());return}if(t.structureId){const n=this.structures.get(t.structureId);if(!n)return;if(n.kind==="wood_doorway")n.isOpen=!n.isOpen,this.handlers.onStructureUpdate(n);else if(n.kind==="bedroll")e.bedPos={x:n.x,y:n.y+.3,z:n.z},this.handlers.onToast({text:"Respawn point bound to Bedroll!",tone:"good"});else if(n.kind==="planter_box")(n.cropProgress??0)>=100?(n.cropProgress=0,this.addItem("berries",4),this.addItem("sunbloom",2),this.handlers.onStructureUpdate(n),this.handlers.onToast({text:"Harvested +4 Sunberries & +2 Sunblooms!",tone:"good"}),this.syncPrivate()):this.handlers.onToast({text:`Crops growing (${Math.round(n.cropProgress??0)}%)...`,tone:"info"});else if(n.kind==="campfire")this.consumeMats([{itemId:"wood",count:2}])?(n.lit=!0,n.fuel=Math.min(100,(n.fuel??0)+45),this.handlers.onStructureUpdate(n),this.syncPrivate(),this.handlers.onToast({text:"Stoked campfire with 2 Timber Wood.",tone:"good"})):this.handlers.onToast({text:"Open Crafting [C] near campfire to cook!",tone:"info"});else if(n.kind==="rain_collector"&&(n.waterLevel??0)>=20){const i=Math.min(45,n.waterLevel??0);n.waterLevel=(n.waterLevel??0)-i,e.vitals.thirst=Math.min(100,e.vitals.thirst+i),this.handlers.onStructureUpdate(n),this.handlers.onFxEvent({kind:"drink",x:e.x,y:e.y+1,z:e.z})}}}handleConsume(t){const e=this.priv.inventory[t],n=Ue(e?.itemId);!e||!n||n.category!=="consumable"||(e.count--,e.count<=0&&(this.priv.inventory[t]=null),n.heal&&(this.localPlayer.vitals.hp=Bt(this.localPlayer.vitals.hp+n.heal,1,this.localPlayer.vitals.maxHp)),n.hungerRestore&&(this.localPlayer.vitals.hunger=Bt(this.localPlayer.vitals.hunger+n.hungerRestore,0,100)),n.thirstRestore&&(this.localPlayer.vitals.thirst=Bt(this.localPlayer.vitals.thirst+n.thirstRestore,0,100)),n.warmthRestore&&(this.localPlayer.vitals.warmth=Bt(this.localPlayer.vitals.warmth+n.warmthRestore,0,100)),this.handlers.onFxEvent({kind:"eat",x:this.localPlayer.x,y:this.localPlayer.y+1,z:this.localPlayer.z}),this.syncPrivate())}handleEquipArmor(t){const e=this.priv.inventory[t],n=Ue(e?.itemId);if(!e||!n||n.category!=="armor")return;const i=this.priv.armorSlot;this.priv.armorSlot=e,this.priv.inventory[t]=i,this.localPlayer.armorItemId=e.itemId,this.localPlayer.armorRating=n.armorRating??0,this.syncPrivate()}handleSwapSlots(t,e){const n=this.priv.inventory,i=n[t];n[t]=n[e],n[e]=i,this.localPlayer.equippedItemId=n[this.localPlayer.equippedSlot]?.itemId??null,this.syncPrivate()}handleDropSlot(t){const e=this.priv.inventory[t];if(!e)return;this.priv.inventory[t]=null;const n=`lloot_${this.seq++}`,i={id:n,itemId:e.itemId,count:e.count,x:this.localPlayer.x+Math.sin(this.localPlayer.yaw)*1.4,y:this.localPlayer.y+.35,z:this.localPlayer.z+Math.cos(this.localPlayer.yaw)*1.4};this.loot.set(n,i),this.handlers.onLootAdd(i),this.syncPrivate()}handleCraft(t){const e=P0(t);if(e){if(e.station==="cauldron"&&!this.localPlayer.status.nearCauldron){this.handlers.onToast({text:"Brew this elixir near an Alchemy Cauldron!",tone:"warn"});return}if(!this.consumeMats(e.ingredients)){this.handlers.onToast({text:"Missing crafting materials!",tone:"warn"});return}this.addItem(e.outputItemId,e.outputCount),(We[e.outputItemId]?.category==="tool"||We[e.outputItemId]?.category==="weapon")&&(this.priv.objectives.craft_tool=!0),e.station==="campfire"&&(this.priv.objectives.cook_food=!0),e.outputItemId.endsWith("_ingot")&&(this.priv.objectives.smelt_iron=!0),this.grantXp(e.xpReward),this.handlers.onFxEvent({kind:"build",x:this.localPlayer.x,y:this.localPlayer.y+1,z:this.localPlayer.z}),this.handlers.onToast({text:`Crafted ${e.outputCount}× ${We[e.outputItemId]?.name}!`,tone:"good"}),this.syncPrivate()}}handleBuild(t){const e=hi[t.kind];if(!e)return;let n=!1;if(t.fromItemSlot!==void 0){const r=this.priv.inventory[t.fromItemSlot];r&&Ue(r.itemId)?.structureKind===t.kind&&(r.count--,r.count<=0&&(this.priv.inventory[t.fromItemSlot]=null),n=!0)}if(!n&&!this.consumeMats(e.costs)){this.handlers.onToast({text:`Missing materials for ${e.name}.`,tone:"warn"});return}const i=ql(t.kind,{x:t.x,y:t.y,z:t.z},t.rotY,Array.from(this.structures.values()),(r,a)=>this.world.getHeight(r,a)),s={id:`lst_${this.seq++}_${Date.now().toString(36)}`,kind:t.kind,ownerId:this.localPlayer.id,ownerName:this.localPlayer.name,x:i.x,y:i.y,z:i.z,rotY:i.rotY,hp:e.maxHp,maxHp:e.maxHp,isOpen:t.kind==="wood_doorway"?!1:void 0,lit:t.kind==="campfire"||t.kind==="furnace"||t.kind==="lantern_post"||t.kind==="watchtower_beacon"?!0:void 0,fuel:t.kind==="campfire"?80:void 0,waterLevel:t.kind==="rain_collector"?30:void 0,chestSlots:t.kind==="storage_chest"?Array.from({length:tl},()=>null):void 0};this.structures.set(s.id,s),this.priv.objectives.build_shelter=!0,this.grantXp(18),this.handlers.onStructureAdd(s),this.handlers.onFxEvent({kind:"build",x:s.x,y:s.y+.8,z:s.z}),this.syncPrivate(),this.saveLocal()}handleBuildBoat(t){const e=ln[t.kind];if(!e)return;if(this.world.getHeight(t.x,t.z)>Pt-.25){this.handlers.onToast({text:"Launch vessels directly onto coastal water!",tone:"warn"});return}if(e.requiresWorkbench&&!this.localPlayer.status.nearWorkbench){this.handlers.onToast({text:`${e.name} requires a nearby Workbench!`,tone:"warn"});return}if(!this.consumeMats(e.costs)){this.handlers.onToast({text:`Not enough materials for ${e.name}.`,tone:"warn"});return}const n={id:`lboat_${this.seq++}_${Date.now().toString(36)}`,kind:t.kind,ownerId:this.localPlayer.id,ownerName:this.localPlayer.name,x:Math.round(t.x*100)/100,y:Pt,z:Math.round(t.z*100)/100,yaw:t.rotY,vx:0,vz:0,speed:0,throttle:0,rudder:0,hp:e.maxHp,maxHp:e.maxHp,pilotId:null,chestSlots:e.cargoSlots>0?Array.from({length:e.cargoSlots},()=>null):void 0};this.boats.set(n.id,n),this.grantXp(t.kind==="longship"?95:t.kind==="skiff"?55:28),this.handlers.onBoatAdd(n),this.handlers.onFxEvent({kind:"build",x:n.x,y:Pt+.8,z:n.z}),this.handlers.onToast({text:`Launched ${e.name}! Approach & press [E] to sail!`,tone:"good"}),this.syncPrivate(),this.saveLocal()}handleBoardBoat(t){const e=this.localPlayer;if(e.boatId){const i=this.boats.get(e.boatId);if(i){i.pilotId=null,i.throttle=0;const s=Math.cos(i.yaw)*1.9,r=-Math.sin(i.yaw)*1.9;e.x=Bt(i.x+s,-212,212),e.z=Bt(i.z+r,-212,212),e.y=Math.max(Pt+.25,this.world.getHeight(e.x,e.z)+.15)}e.boatId=null,this.boatSteer=0,this.handlers.onToast({text:"Stepped off the helm.",tone:"info"});return}if(!t)return;const n=this.boats.get(t);!n||Math.hypot(n.x-e.x,n.z-e.z)>7.5||(n.pilotId=e.id,e.boatId=n.id,this.handlers.onToast({text:`Sailing ${ln[n.kind].name}! [W/S] Sails • [A/D] Steer • [E] Disembark`,tone:"good"}))}handleBoatControl(t){const e=this.localPlayer;if(!e.boatId)return;const n=this.boats.get(e.boatId);n&&(typeof t.throttle=="number"?n.throttle=Bt(Math.round(t.throttle),-1,3):typeof t.throttleDelta=="number"&&t.throttleDelta!==0&&(n.throttle=Bt(n.throttle+Math.sign(t.throttleDelta),-1,3)),this.boatSteer=Bt(t.steer,-1,1))}handleBoatChestTransfer(t){const e=this.boats.get(t.boatId);if(!(!e||!e.chestSlots)){if(t.from==="inventory"){const n=this.priv.inventory[t.fromIndex];if(!n)return;const i=e.chestSlots.findIndex(s=>s===null);i>=0&&(e.chestSlots[i]=n,this.priv.inventory[t.fromIndex]=null)}else{const n=e.chestSlots[t.fromIndex];if(!n)return;this.addItem(n.itemId,n.count,n.durability),e.chestSlots[t.fromIndex]=null}this.handlers.onBoatUpdate(e),this.syncPrivate(),this.saveLocal()}}handleFishCatch(t){const e=Math.random();let n="raw_fish",i=1,s=18;t.deepWater?e<.15?(n="sea_pearl",s=42):e<.26?(n="gold_coin",i=2+Math.floor(Math.random()*3),s=36):e<.7&&(n="golden_snapper",s=30):e<.08?(n="sea_pearl",s=34):e<.34&&(n="golden_snapper",s=24),this.addItem(n,i);const r=We[n]?.name??n;this.grantXp(s),this.handlers.onCombatEvent({id:`f_${this.seq++}`,x:this.localPlayer.x,y:this.localPlayer.y+2.2,z:this.localPlayer.z,text:`Caught ${i}× ${r}!`,color:"#38bdf8",kind:"gather"}),this.handlers.onToast({text:`Reeled in ${i}× ${r}!`,tone:"good"}),this.syncPrivate()}handleDemolish(t){const e=this.structures.get(t);if(!(!e||e.ownerId==="world")){for(const n of hi[e.kind].costs)this.addItem(n.itemId,Math.max(1,Math.floor(n.count*.5)));this.structures.delete(t),this.handlers.onStructureRemove(t),this.syncPrivate(),this.saveLocal()}}handleChestTransfer(t){const e=this.structures.get(t.structureId);if(!(!e||!e.chestSlots)){if(t.from==="inventory"){const n=this.priv.inventory[t.fromIndex];if(!n)return;const i=e.chestSlots.findIndex(s=>s===null);i>=0&&(e.chestSlots[i]=n,this.priv.inventory[t.fromIndex]=null)}else{const n=e.chestSlots[t.fromIndex];if(!n)return;this.addItem(n.itemId,n.count,n.durability),e.chestSlots[t.fromIndex]=null}this.handlers.onStructureUpdate(e),this.syncPrivate(),this.saveLocal()}}handleRespawn(){const t=this.localPlayer.bedPos??this.world.getSpawnPoint();this.localPlayer.x=t.x,this.localPlayer.y=t.y,this.localPlayer.z=t.z,this.localPlayer.alive=!0,this.localPlayer.vitals.hp=this.localPlayer.vitals.maxHp,this.localPlayer.vitals.hunger=78,this.localPlayer.vitals.thirst=78}handleChat(t){const e=t.trim();if(e==="/time day"){this.time.timeOfDay=.36,this.handlers.onToast({text:"Time shifted to bright midday.",tone:"info"});return}if(e==="/time dusk"){this.time.timeOfDay=.74,this.handlers.onToast({text:"Time shifted to golden dusk.",tone:"info"});return}if(e==="/weather rain"){this.time.weather="storm",this.time.weatherIntensity=.9,this.handlers.onToast({text:"A coastal storm rolls across the archipelago.",tone:"warn"});return}if(e==="/weather clear"){this.time.weather="clear",this.time.weatherIntensity=0,this.handlers.onToast({text:"Skies clear over Wildreach.",tone:"good"});return}this.handlers.onChatMessage({id:`lchat_${this.seq++}`,senderId:this.localPlayer.id,senderName:this.localPlayer.name,text:e,kind:"chat",timestamp:Date.now()})}addItem(t,e,n){const i=Ue(t);if(!i)return;let s=e;if(i.maxStack>1){for(const r of this.priv.inventory)if(r&&r.itemId===t&&r.count<i.maxStack){const a=Math.min(i.maxStack-r.count,s);r.count+=a,s-=a}}for(let r=0;r<this.priv.inventory.length&&s>0;r++)if(!this.priv.inventory[r]){const a=Math.min(i.maxStack,s);this.priv.inventory[r]={itemId:t,count:a,durability:n??i.maxDurability},s-=a}}consumeMats(t){for(const e of t){let n=0;for(const i of this.priv.inventory)i?.itemId===e.itemId&&(n+=i.count);if(n<e.count)return!1}for(const e of t){let n=e.count;for(let i=0;i<this.priv.inventory.length&&n>0;i++){const s=this.priv.inventory[i];if(!s||s.itemId!==e.itemId)continue;const r=Math.min(s.count,n);s.count-=r,n-=r,s.count<=0&&(this.priv.inventory[i]=null)}}return!0}grantXp(t){this.localPlayer.xp+=t;const e=this.localPlayer.level*120;this.localPlayer.xp>=e&&(this.localPlayer.xp-=e,this.localPlayer.level+=1,this.localPlayer.vitals.maxHp+=10,this.localPlayer.vitals.hp=this.localPlayer.vitals.maxHp,this.handlers.onFxEvent({kind:"levelup",x:this.localPlayer.x,y:this.localPlayer.y+1.5,z:this.localPlayer.z}),this.handlers.onToast({text:`Level Up! Reached Level ${this.localPlayer.level}!`,tone:"good"}))}syncPrivate(){this.localPlayer.equippedItemId=this.priv.inventory[this.localPlayer.equippedSlot]?.itemId??null,this.handlers.onPrivateState({...this.priv})}tick(t,e){this.time.timeOfDay+=t/U0,this.time.timeOfDay>=1&&(this.time.timeOfDay-=1,this.time.day+=1);const n=this.time.timeOfDay<.22||this.time.timeOfDay>.79;if(n&&!this.wasNight&&this.handlers.onToast({text:"Night falls — stay near campfires!",tone:"warn"}),this.wasNight=n,this.weatherTimer-=t,this.weatherTimer<=0){this.weatherTimer=70+Math.random()*80;const r=Math.random(),a=r<.5?"clear":r<.72?"breezy":r<.85?"fog":r<.94?"rain":"storm";this.time.weather=a}const i=this.time.weather==="storm"?1:this.time.weather==="rain"?.65:this.time.weather==="fog"?.5:0;this.time.weatherIntensity+=(i-this.time.weatherIntensity)*Math.min(1,t*.4),this.time.windSpeed=this.time.weather==="storm"?2.3:this.time.weather==="breezy"?1.55:.95,this.time.weather==="storm"&&(this.thunderTimer-=t,this.thunderTimer<=0&&(this.thunderTimer=14+Math.random()*16,this.handlers.onFxEvent({kind:"thunder",x:0,y:40,z:0})));const s=this.localPlayer;if(s.swingTime>0&&(s.swingTime=Math.max(0,s.swingTime-t)),s.alive){let r=!1,a=!1,c=!1,l=!1,h=!1,d=0,u=0;for(const p of this.structures.values()){const m=Math.hypot(p.x-s.x,p.z-s.z);if(p.kind==="campfire"&&p.lit&&m<9.5&&(r=!0),p.kind==="workbench"&&m<16&&(a=!0),p.kind==="furnace"&&m<9.5&&(c=!0),p.kind==="runic_forge"&&m<9.5&&(l=!0),p.kind==="alchemy_cauldron"&&m<8.5&&(h=!0),p.kind==="wood_roof"&&m<3.4&&d++,(p.kind==="wood_wall"||p.kind==="wood_doorway"||p.kind==="stone_wall")&&m<4.5&&u++,p.kind==="planter_box"){const w=p.cropProgress??0;p.cropProgress=Math.min(100,w+t*2.2),w<100&&p.cropProgress>=100&&this.handlers.onStructureUpdate(p)}}const f=d>=1&&u>=2,g=s.y<Pt-.1||(this.time.weather==="rain"||this.time.weather==="storm")&&!f,v=(n?28:58)-(g?16:0)+(r?32:0)+(s.equippedItemId==="torch"?16:0)+(f?15:0);s.vitals.warmth+=(Bt(v,8,95)-s.vitals.warmth)*Math.min(1,t*.25),s.vitals.hunger=Math.max(0,s.vitals.hunger-t*.09),s.vitals.thirst=Math.max(0,s.vitals.thirst-t*.12),s.vitals.stamina=Math.min(s.vitals.maxStamina,s.vitals.stamina+t*15),s.vitals.hunger>55&&s.vitals.thirst>50&&s.vitals.warmth>25&&(s.vitals.hp=Math.min(s.vitals.maxHp,s.vitals.hp+t*(f||r?2:.9))),s.status={sheltered:f,warm:s.vitals.warmth>=55&&(r||f||s.equippedItemId==="torch"),wellFed:s.vitals.hunger>=60&&s.vitals.thirst>=55,wet:g,chilled:s.vitals.warmth<25,nearCampfire:r,nearWorkbench:a,nearFurnace:c,nearRunicForge:l,nearCauldron:h,nearFreshWater:this.world.isNearFreshWater(s.x,s.z)}}for(const r of this.boats.values()){const a=ln[r.kind],c=r.pilotId===s.id?this.boatSteer:0;r.rudder+=(c-r.rudder)*Math.min(1,t*6);let l=0;if(r.pilotId===s.id){const p=k0(r.yaw,this.time.windDirX,this.time.windDirZ);r.throttle===-1?l=-a.reverseSpeed:r.throttle===1?l=a.paddleSpeed:r.throttle===2?l=a.halfSailSpeed*p:r.throttle===3&&(l=a.fullSailSpeed*p)}else r.throttle=0;if(r.speed+=(l-r.speed)*Math.min(1,t*(r.pilotId?2.4:1.4)),Math.abs(r.speed)<.04&&l===0&&(r.speed=0),Math.abs(r.rudder)>.02){const p=.55+Math.min(1,Math.abs(r.speed)/4)*.65;r.yaw-=r.rudder*a.turnRate*p*(r.speed<-.3?-1:1)*t}const h=-Math.sin(r.yaw),d=-Math.cos(r.yaw),u=Bt(r.x+h*r.speed*t,-208,208),f=Bt(r.z+d*r.speed*t,-208,208),g=u+h*(a.length*.44),v=f+d*(a.length*.44);this.world.getHeight(u,f)<Pt-.3&&this.world.getHeight(g,v)<Pt-.15?(r.x=u,r.z=f,r.vx=h*r.speed,r.vz=d*r.speed):(r.speed*=-.18,r.vx=0,r.vz=0),r.y=Pt,r.pilotId===s.id&&s.alive&&(s.x=r.x-h*a.helmOffsetZ,s.z=r.z-d*a.helmOffsetZ,s.y=Pt+a.deckY,s.yaw=r.yaw,s.vx=r.vx,s.vz=r.vz,s.status.wet=!1)}for(const r of this.wildlife.values()){if(r.state==="dead"){e>=r.respawnAt&&(r.hp=r.maxHp,r.x=r.homeX,r.z=r.homeZ,r.y=this.world.getHeight(r.x,r.z),r.state="idle");continue}const a=mr[r.kind];r.attackCooldown>0&&(r.attackCooldown-=t),r.thinkTimer-=t;const c=Math.hypot(s.x-r.x,s.z-r.z);if(!a.hostile&&c<12){const l=Math.atan2(r.z-s.z,r.x-s.x);r.targetX=Bt(r.x+Math.cos(l)*18,-135,135),r.targetZ=Bt(r.z+Math.sin(l)*18,-135,135),r.state="flee",r.thinkTimer=2.5}else if(a.hostile&&s.alive&&(c<12||e<r.aggroUntil)){if(c<2.2){if(r.speed=0,r.attackCooldown<=0){r.attackCooldown=1.4;const l=Math.max(2,Math.round(a.dmg*(1-s.armorRating/100)));s.vitals.hp=Math.max(0,s.vitals.hp-l),this.handlers.onFxEvent({kind:"hit",x:s.x,y:s.y+1.2,z:s.z}),s.vitals.hp<=0&&(s.alive=!1)}continue}r.targetX=s.x,r.targetZ=s.z,r.state="chase"}if(r.state==="wander"||r.state==="flee"||r.state==="chase"){const l=r.targetX-r.x,h=r.targetZ-r.z,d=Math.hypot(l,h);if(d<.8||r.state!=="chase"&&r.thinkTimer<=0)r.state="idle",r.speed=0,r.thinkTimer=3+Math.random()*4;else{const u=r.state==="wander"?a.walk:a.run,f=r.x+l/d*Math.min(d,u*t),g=r.z+h/d*Math.min(d,u*t),v=this.world.getHeight(f,g);(r.kind==="serpent"?v<Pt-.9:v>Pt+.25)?(r.x=f,r.z=g,r.y=r.kind==="serpent"?Pt-.15:v,r.yaw=Math.atan2(l,h),r.speed=u):r.state="idle"}}else if(r.thinkTimer<=0){const l=Math.random()*Math.PI*2;r.targetX=Bt(r.homeX+Math.cos(l)*14,-135,135),r.targetZ=Bt(r.homeZ+Math.sin(l)*14,-135,135),r.state="wander",r.thinkTimer=5}}for(const r of this.bots){r.timer-=t;const a=r.goalX-r.x,c=r.goalZ-r.z,l=Math.hypot(a,c);if(l<1.2||r.timer<=0){const h=Math.random()*Math.PI*2;r.goalX=r.homeX+Math.cos(h)*(5+Math.random()*14),r.goalZ=r.homeZ+Math.sin(h)*(5+Math.random()*14),r.timer=4+Math.random()*5,r.anim="idle"}else{const h=Math.min(l,3.6*t);r.x+=a/l*h,r.z+=c/l*h,r.y=this.world.getHeight(r.x,r.z),r.yaw=Math.atan2(a,c),r.anim="walk"}}for(const[r,a]of this.projectiles.entries()){if(a.vy-=14.5*t,a.x+=a.vx*t,a.y+=a.vy*t,a.z+=a.vz*t,e-a.bornAt>4e3||a.y<=this.world.getHeight(a.x,a.z)){this.projectiles.delete(r);continue}for(const c of this.wildlife.values())if(c.state!=="dead"&&Math.hypot(c.x-a.x,c.z-a.z)<1.25&&Math.abs(c.y+1-a.y)<1.35){this.damageWildlife(c,a.damage,a.x,a.z),this.projectiles.delete(r);break}}this.handlers.onSnapshot({t:e,time:{...this.time},players:[this.localPlayer,...this.bots],boats:Array.from(this.boats.values()),wildlife:this.getWildlifeSnap(),projectiles:Array.from(this.projectiles.values())}),this.saveTimer+=t,this.saveTimer>=20&&(this.saveTimer=0,this.saveLocal())}}class Vg{socket=null;localEngine=null;pingTimer=null;serverUrl="";staticHostDetected=null;pingMs=0;isOfflineMode=!1;constructor(){const e=new URLSearchParams(window.location.search).get("server");e&&(this.serverUrl=e.trim().replace(/\/+$/,""))}getServerUrl(){return this.serverUrl}setServerUrl(t){const e=t.trim().replace(/\/+$/,"");e!==this.serverUrl&&(this.serverUrl=e,this.staticHostDetected=null,this.socket&&(this.socket.disconnect(),this.socket=null))}isStaticHost(){if(this.serverUrl)return!1;if(this.staticHostDetected===!0)return!0;const t=window.location.hostname;return window.location.protocol==="file:"||t.endsWith(".github.io")||t.endsWith("raw.githack.com")||t.endsWith("htmlpreview.github.io")}async fetchRooms(){if(this.isStaticHost())return this.staticHostDetected=!0,{rooms:[],serverReachable:!1};try{const t=this.serverUrl||"",e=new AbortController,n=window.setTimeout(()=>e.abort(),2200),i=await fetch(`${t}/api/rooms`,{signal:e.signal});window.clearTimeout(n);const s=i.headers.get("content-type")||"";if(!i.ok||!s.includes("application/json"))return this.serverUrl||(this.staticHostDetected=!0),{rooms:[],serverReachable:!1};const r=await i.json();return this.staticHostDetected=!1,{rooms:r.rooms??[],serverReachable:!0}}catch{return this.serverUrl||(this.staticHostDetected=!0),{rooms:[],serverReachable:!1}}}connect(t){return this.isStaticHost()?(this.isOfflineMode=!0,this.localEngine=new cl(t),Promise.resolve({online:!1})):this.socket?.connected?(this.isOfflineMode=!1,Promise.resolve({online:!0})):new Promise(e=>{const n=this.serverUrl||void 0,i=uo(n,{path:"/socket.io",transports:["websocket","polling"],reconnection:!0,reconnectionAttempts:2,reconnectionDelay:800,timeout:2600});this.socket=i;let s=!1;const r=()=>{s||(s=!0,i.disconnect(),this.socket=null,this.isOfflineMode=!0,this.localEngine=new cl(t),e({online:!1}))},a=window.setTimeout(r,2800);i.on("connect",()=>{s||(s=!0,window.clearTimeout(a),this.isOfflineMode=!1,this.localEngine?.stop(),this.localEngine=null,t.onConnectionChange(!0),this.startPingLoop(),e({online:!0}))}),i.on("connect_error",()=>{s||(window.clearTimeout(a),r())}),i.on("disconnect",()=>{this.isOfflineMode||t.onConnectionChange(!1)}),i.on("world:snapshot",t.onSnapshot),i.on("player:private",t.onPrivateState),i.on("node:update",t.onNodeUpdate),i.on("node:fell",t.onNodeFell),i.on("structure:add",t.onStructureAdd),i.on("structure:update",t.onStructureUpdate),i.on("structure:remove",t.onStructureRemove),i.on("boat:add",t.onBoatAdd),i.on("boat:update",t.onBoatUpdate),i.on("boat:remove",t.onBoatRemove),i.on("loot:add",t.onLootAdd),i.on("loot:remove",t.onLootRemove),i.on("combat:event",t.onCombatEvent),i.on("fx:event",t.onFxEvent),i.on("chat:message",t.onChatMessage),i.on("toast:notify",t.onToast)})}startPingLoop(){this.pingTimer&&window.clearInterval(this.pingTimer),this.pingTimer=window.setInterval(()=>{if(!this.socket?.connected)return;const t=performance.now();this.socket.emit("net:ping",Date.now(),()=>{this.pingMs=Math.round(performance.now()-t)})},3e3)}joinRoom(t){return this.isOfflineMode&&this.localEngine?Promise.resolve(this.localEngine.startSession(t)):new Promise((e,n)=>{if(!this.socket)return n(new Error("Not connected"));this.socket.emit("room:join",t,i=>{i.ok&&i.init?e(i.init):n(new Error(i.error||"Failed to join world"))})})}sendInput(t){this.isOfflineMode?this.localEngine?.handleInput(t):this.socket?.emit("player:input",t)}sendEquip(t){this.isOfflineMode?this.localEngine?.handleEquip(t):this.socket?.emit("player:equip",t)}sendAction(t){this.isOfflineMode?this.localEngine?.handleAction(t):this.socket?.emit("player:action",t)}sendDodge(t){this.isOfflineMode?this.localEngine?.handleDodge(t):this.socket?.emit("player:dodge",t)}sendInteract(t){this.isOfflineMode?this.localEngine?.handleInteract(t):this.socket?.emit("player:interact",t)}sendConsume(t){this.isOfflineMode?this.localEngine?.handleConsume(t):this.socket?.emit("player:consume",t)}sendEquipArmor(t){this.isOfflineMode?this.localEngine?.handleEquipArmor(t):this.socket?.emit("player:equipArmor",t)}sendSwapSlots(t,e){this.isOfflineMode?this.localEngine?.handleSwapSlots(t,e):this.socket?.emit("player:swapSlots",{from:t,to:e})}sendDropSlot(t,e){this.isOfflineMode?this.localEngine?.handleDropSlot(t):this.socket?.emit("player:dropSlot",{slotIndex:t,count:e})}sendCraft(t){this.isOfflineMode?this.localEngine?.handleCraft(t):this.socket?.emit("player:craft",t)}sendBuild(t){this.isOfflineMode?this.localEngine?.handleBuild(t):this.socket?.emit("player:build",t)}sendDemolish(t){this.isOfflineMode?this.localEngine?.handleDemolish(t):this.socket?.emit("player:demolish",t)}sendChestTransfer(t){this.isOfflineMode?this.localEngine?.handleChestTransfer(t):this.socket?.emit("player:chestTransfer",t)}sendBuildBoat(t){this.isOfflineMode?this.localEngine?.handleBuildBoat(t):this.socket?.emit("boat:build",t)}sendBoardBoat(t){this.isOfflineMode?this.localEngine?.handleBoardBoat(t):this.socket?.emit("boat:board",t)}sendBoatControl(t){this.isOfflineMode?this.localEngine?.handleBoatControl(t):this.socket?.emit("boat:control",t)}sendBoatChestTransfer(t){this.isOfflineMode?this.localEngine?.handleBoatChestTransfer(t):this.socket?.emit("boat:chestTransfer",t)}sendFishCatch(t){this.isOfflineMode?this.localEngine?.handleFishCatch({deepWater:t}):this.socket?.emit("player:fishCatch",{deepWater:t})}sendRespawn(){this.isOfflineMode?this.localEngine?.handleRespawn():this.socket?.emit("player:respawn")}sendTogglePvp(){this.isOfflineMode||this.socket?.emit("player:togglePvp")}sendEmote(t){this.isOfflineMode||this.socket?.emit("player:emote",t)}sendSpawnBot(){this.isOfflineMode?this.localEngine?.spawnBot():this.socket?.emit("player:spawnBot")}sendChat(t){this.isOfflineMode?this.localEngine?.handleChat(t):this.socket?.emit("chat:send",t)}}class Wg{keys=new Set;pointerLocked=!1;pointerLockBlocked=!1;mouseLeftDown=!1;yaw=Math.PI;pitch=.24;uiOpen=!1;chatOpen=!1;sensitivity=.0022;canvas;cb;wheelDelta=0;dragLookActive=!1;dragButton=-1;dragStartX=0;dragStartY=0;dragLastX=0;dragLastY=0;dragMoved=!1;constructor(t,e){this.canvas=t,this.cb=e,window.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp),window.addEventListener("mousemove",this.onMouseMove),t.addEventListener("mousedown",this.onMouseDown),window.addEventListener("mouseup",this.onMouseUp),window.addEventListener("wheel",this.onWheel,{passive:!0}),t.addEventListener("contextmenu",n=>n.preventDefault()),document.addEventListener("pointerlockchange",()=>{this.pointerLocked=document.pointerLockElement===this.canvas,this.pointerLocked?(this.pointerLockBlocked=!1,this.dragLookActive=!1):this.mouseLeftDown=!1}),document.addEventListener("pointerlockerror",()=>{this.pointerLockBlocked=!0})}requestPointerLock(){if(!(this.pointerLockBlocked||this.uiOpen||this.chatOpen||document.pointerLockElement===this.canvas||typeof this.canvas.requestPointerLock!="function"))try{const t=this.canvas.requestPointerLock();t&&typeof t.catch=="function"&&t.catch(()=>{this.pointerLockBlocked=!0})}catch{this.pointerLockBlocked=!0}}exitPointerLock(){if(document.pointerLockElement)try{document.exitPointerLock()}catch{}}consumeWheel(){const t=this.wheelDelta;return this.wheelDelta=0,t}onKeyDown=t=>{const e=document.activeElement?.tagName;if(e==="INPUT"||e==="TEXTAREA"||e==="SELECT"){t.key==="Escape"&&document.activeElement.blur();return}const n=t.code;if(this.keys.add(n),n==="Enter"){t.preventDefault(),this.cb.onToggleChat();return}if(n==="Escape"){this.cb.onTogglePause();return}if(n==="Tab"||n==="KeyI"){t.preventDefault(),this.cb.onToggleInventory();return}if(n==="KeyC"){this.cb.onToggleCrafting();return}if(n==="KeyB"){this.cb.onToggleBuild();return}if(n==="KeyM"){this.cb.onToggleMap();return}if(!(this.uiOpen||this.chatOpen))if(n.startsWith("Digit")){const i=Number(n.slice(5))-1;i>=0&&i<=8&&this.cb.onHotbarSelect(i)}else n==="KeyE"?this.cb.onInteract():n==="KeyV"?this.cb.onToggleCamera():n==="KeyR"?this.cb.onRotateBuild():n==="KeyQ"||n==="ControlLeft"?this.cb.onDodge():n==="F1"?(t.preventDefault(),this.cb.onEmote("wave")):n==="F2"?(t.preventDefault(),this.cb.onEmote("cheer")):n==="F3"?(t.preventDefault(),this.cb.onEmote("help")):n==="F4"&&(t.preventDefault(),this.cb.onEmote("camp"))};onKeyUp=t=>{this.keys.delete(t.code)};onMouseMove=t=>{if(!(this.uiOpen||this.chatOpen)){if(this.pointerLocked)this.yaw-=t.movementX*this.sensitivity,this.pitch=Math.max(-.95,Math.min(1.22,this.pitch+t.movementY*this.sensitivity));else if(this.dragLookActive){const e=t.clientX-this.dragLastX,n=t.clientY-this.dragLastY;this.dragLastX=t.clientX,this.dragLastY=t.clientY,Math.hypot(t.clientX-this.dragStartX,t.clientY-this.dragStartY)>6&&(this.dragMoved=!0),this.yaw-=e*this.sensitivity*1.45,this.pitch=Math.max(-.95,Math.min(1.22,this.pitch+n*this.sensitivity*1.45))}}};onMouseDown=t=>{if(!(this.uiOpen||this.chatOpen)){if(!this.pointerLocked){this.dragLookActive=!0,this.dragButton=t.button,this.dragStartX=t.clientX,this.dragStartY=t.clientY,this.dragLastX=t.clientX,this.dragLastY=t.clientY,this.dragMoved=!1,t.button===0&&!this.pointerLockBlocked&&this.requestPointerLock();return}t.button===0?(this.mouseLeftDown=!0,this.cb.onPrimaryDown()):t.button===2&&this.cb.onSecondaryDown()}};onMouseUp=t=>{if(this.dragLookActive&&t.button===this.dragButton){const e=!this.dragMoved&&!this.pointerLocked;this.dragLookActive=!1,this.dragButton=-1,e&&!this.uiOpen&&!this.chatOpen&&(t.button===0?(this.cb.onPrimaryDown(),this.cb.onPrimaryUp()):t.button===2&&this.cb.onSecondaryDown());return}t.button===0&&this.mouseLeftDown&&(this.mouseLeftDown=!1,this.cb.onPrimaryUp())};onWheel=t=>{this.uiOpen||this.chatOpen||(this.wheelDelta+=Math.sign(t.deltaY))}}class yo{moveX=0;moveY=0;sprinting=!1;jumping=!1;enabled=!1;mode="auto";rootEl;joyZone;joyBase;joyKnob;interactBtn;buildControlsEl;joyPointerId=null;joyOriginX=0;joyOriginY=0;joyRadius=48;lookPointerId=null;lookLastX=0;lookLastY=0;lookDeltaX=0;lookDeltaY=0;constructor(t,e){this.rootEl=document.getElementById("touch-controls"),this.joyZone=document.getElementById("touch-joy-zone"),this.joyBase=document.getElementById("touch-joy-base"),this.joyKnob=document.getElementById("touch-joy-knob"),this.interactBtn=document.getElementById("tbtn-interact"),this.buildControlsEl=document.getElementById("touch-build-actions"),this.detectAndApplyMode(),window.addEventListener("resize",()=>this.detectAndApplyMode()),this.joyZone.addEventListener("pointerdown",l=>{if(this.joyPointerId!==null)return;l.preventDefault(),this.joyPointerId=l.pointerId,this.joyZone.setPointerCapture(l.pointerId);const h=this.joyBase.getBoundingClientRect();this.joyOriginX=h.left+h.width/2,this.joyOriginY=h.top+h.height/2,this.updateJoystick(l.clientX,l.clientY)}),this.joyZone.addEventListener("pointermove",l=>{l.pointerId===this.joyPointerId&&(l.preventDefault(),this.updateJoystick(l.clientX,l.clientY))});const n=l=>{l.pointerId===this.joyPointerId&&(this.joyPointerId=null,this.moveX=0,this.moveY=0,this.sprinting=!1,this.joyKnob.style.transform="translate(0px, 0px)",this.joyBase.classList.remove("sprinting"))};this.joyZone.addEventListener("pointerup",n),this.joyZone.addEventListener("pointercancel",n),t.addEventListener("pointerdown",l=>{l.pointerType!=="mouse"&&this.lookPointerId===null&&(this.lookPointerId=l.pointerId,this.lookLastX=l.clientX,this.lookLastY=l.clientY)}),t.addEventListener("pointermove",l=>{if(l.pointerId!==this.lookPointerId)return;const h=l.clientX-this.lookLastX,d=l.clientY-this.lookLastY;this.lookLastX=l.clientX,this.lookLastY=l.clientY,Math.abs(h)<120&&Math.abs(d)<120&&(this.lookDeltaX+=h,this.lookDeltaY+=d)});const i=l=>{l.pointerId===this.lookPointerId&&(this.lookPointerId=null)};t.addEventListener("pointerup",i),t.addEventListener("pointercancel",i);const s=document.getElementById("tbtn-action");s.addEventListener("pointerdown",l=>{l.preventDefault(),s.classList.add("pressed"),e.onPrimaryDown()});const r=()=>{s.classList.contains("pressed")&&(s.classList.remove("pressed"),e.onPrimaryUp())};s.addEventListener("pointerup",r),s.addEventListener("pointercancel",r),this.interactBtn.addEventListener("pointerdown",l=>{l.preventDefault(),e.onInteract()});const a=document.getElementById("tbtn-jump");a.addEventListener("pointerdown",l=>{l.preventDefault(),this.jumping=!0,a.classList.add("pressed")});const c=()=>{this.jumping=!1,a.classList.remove("pressed")};a.addEventListener("pointerup",c),a.addEventListener("pointercancel",c),document.getElementById("tbtn-dodge")?.addEventListener("pointerdown",l=>{l.preventDefault(),e.onDodge()}),document.getElementById("tbtn-rotate")?.addEventListener("pointerdown",l=>{l.preventDefault(),e.onRotateBuild()}),document.getElementById("tbtn-cancel-build")?.addEventListener("pointerdown",l=>{l.preventDefault(),e.onCancelBuild()}),document.getElementById("qbtn-pack")?.addEventListener("click",e.onOpenInventory),document.getElementById("qbtn-craft")?.addEventListener("click",e.onOpenCrafting),document.getElementById("qbtn-build")?.addEventListener("click",e.onOpenBuild),document.getElementById("qbtn-cam")?.addEventListener("click",e.onToggleCamera),document.getElementById("qbtn-map")?.addEventListener("click",e.onOpenMap),document.getElementById("qbtn-chat")?.addEventListener("click",e.onToggleChat),document.getElementById("qbtn-menu")?.addEventListener("click",e.onOpenPause)}static isTouchDevice(){return window.matchMedia("(pointer: coarse)").matches||"ontouchstart"in window||navigator.maxTouchPoints>0}setMode(t){this.mode=t,this.detectAndApplyMode()}detectAndApplyMode(){const t=this.mode==="on"||this.mode==="auto"&&yo.isTouchDevice();this.enabled=t,this.rootEl.classList.toggle("hidden",!t)}setContextualState(t,e,n){this.enabled&&(this.rootEl.classList.toggle("hidden",!n),this.interactBtn.classList.toggle("highlight",t),this.buildControlsEl.classList.toggle("hidden",!e))}consumeLookDelta(){const t=this.lookDeltaX,e=this.lookDeltaY;return this.lookDeltaX=0,this.lookDeltaY=0,{dx:t,dy:e}}updateJoystick(t,e){let n=t-this.joyOriginX,i=e-this.joyOriginY;const s=Math.hypot(n,i);s>this.joyRadius&&(n=n/s*this.joyRadius,i=i/s*this.joyRadius),this.joyKnob.style.transform=`translate(${n.toFixed(1)}px, ${i.toFixed(1)}px)`,this.moveX=n/this.joyRadius,this.moveY=-i/this.joyRadius,this.sprinting=s>=this.joyRadius*.82,this.joyBase.classList.toggle("sprinting",this.sprinting)}}class Xg{baseMap;hudCanvas;fullCanvas;mapSize=256;constructor(t,e,n){this.hudCanvas=e,this.fullCanvas=n,this.baseMap=document.createElement("canvas"),this.baseMap.width=this.mapSize,this.baseMap.height=this.mapSize,this.bakeTerrainMap(t)}bakeTerrainMap(t){const e=this.baseMap.getContext("2d"),n=e.createImageData(this.mapSize,this.mapSize);for(let i=0;i<this.mapSize;i++){const s=i/(this.mapSize-1)*bn-Fi;for(let r=0;r<this.mapSize;r++){const a=r/(this.mapSize-1)*bn-Fi,c=t.sample(a,s);let l=20,h=60,d=104;if(c.biome==="ocean"){const f=Math.min(1,Math.max(0,-c.height/6.5));l=Math.round(28-f*18),h=Math.round(122-f*78),d=Math.round(148-f*64)}else c.biome==="beach"?(l=219,h=194,d=138):c.biome==="meadow"?(l=96,h=154,d=72):c.biome==="pine"?(l=56,h=98,d=60):c.biome==="marsh"?(l=74,h=104,d=66):c.biome==="highland"?(l=112,h=116,d=122):c.biome==="volcanic"&&(l=c.height>18?228:74,h=c.height>18?236:64,d=c.height>18?244:84);c.height>.2&&Math.abs(c.height%4-.15)<.15&&(l=Math.max(0,l-18),h=Math.max(0,h-18),d=Math.max(0,d-18));const u=(i*this.mapSize+r)*4;n.data[u]=l,n.data[u+1]=h,n.data[u+2]=d,n.data[u+3]=255}}e.putImageData(n,0,0)}worldToMap(t,e,n){const i=(t+Fi)/bn,s=(e+Fi)/bn;return[i*n,s*n]}renderHud(t,e,n,i,s,r,a,c=[]){const l=this.hudCanvas.getContext("2d");if(!l)return;const h=this.hudCanvas.width,d=this.hudCanvas.height;l.clearRect(0,0,h,d),l.save(),l.beginPath(),l.arc(h/2,d/2,h/2-2,0,Math.PI*2),l.clip();const u=2.05,[f,g]=this.worldToMap(t,e,this.mapSize);l.drawImage(this.baseMap,h/2-f*u,d/2-g*u,this.mapSize*u,this.mapSize*u);const v=(p,m)=>{const[w,b]=this.worldToMap(p,m,this.mapSize);return[h/2+(w-f)*u,d/2+(b-g)*u]};for(const p of a){const[m,w]=v(p.x,p.z);l.fillStyle=p.kind==="spring"?"#38bdf8":p.kind==="sanctuary"?"#2dd4bf":"#fbbf24",l.beginPath(),l.arc(m,w,3.2,0,Math.PI*2),l.fill()}for(const p of r){const[m,w]=v(p.x,p.z);l.fillStyle=p.kind==="campfire"?"#fb923c":p.kind==="lighthouse_beacon"||p.kind==="watchtower_beacon"?"#fde047":"#e2e8f0",l.fillRect(m-2,w-2,4,4)}for(const p of c){const[m,w]=v(p.x,p.z);l.save(),l.translate(m,w),l.rotate(-p.yaw+Math.PI),l.fillStyle="#38bdf8",l.strokeStyle="#0f172a",l.lineWidth=1.2,l.beginPath(),l.moveTo(0,-5.5),l.lineTo(4.2,4.5),l.lineTo(-4.2,4.5),l.closePath(),l.fill(),l.stroke(),l.restore()}for(const p of s){if(p.id===i||!p.alive)continue;const[m,w]=v(p.x,p.z);l.fillStyle=p.isBot?"#7dd3fc":"#4ade80",l.strokeStyle="#0f172a",l.lineWidth=1.5,l.beginPath(),l.arc(m,w,4.2,0,Math.PI*2),l.fill(),l.stroke()}l.translate(h/2,d/2),l.rotate(-n+Math.PI),l.fillStyle="#ffffff",l.strokeStyle="#0f172a",l.lineWidth=1.8,l.beginPath(),l.moveTo(0,-7),l.lineTo(5.5,6),l.lineTo(0,3),l.lineTo(-5.5,6),l.closePath(),l.fill(),l.stroke(),l.restore()}renderFullMap(t,e,n,i,s,r,a=[]){const c=this.fullCanvas.getContext("2d");if(!c)return;const l=this.fullCanvas.width;c.clearRect(0,0,l,l),c.drawImage(this.baseMap,0,0,l,l),c.strokeStyle="rgba(255,255,255,0.09)",c.lineWidth=1;for(let h=1;h<6;h++){const d=h/6*l;c.beginPath(),c.moveTo(d,0),c.lineTo(d,l),c.moveTo(0,d),c.lineTo(l,d),c.stroke()}c.font="600 11px Inter, system-ui, sans-serif",c.textAlign="center";for(const h of r){const[d,u]=this.worldToMap(h.x,h.z,l);c.fillStyle=h.kind==="spring"?"#38bdf8":h.kind==="sanctuary"?"#2dd4bf":"#fbbf24",c.beginPath(),c.arc(d,u,5,0,Math.PI*2),c.fill(),c.fillStyle="rgba(10,16,24,0.82)";const f=c.measureText(h.name).width+10;c.fillRect(d-f/2,u+7,f,16),c.fillStyle="#f8fafc",c.fillText(h.name,d,u+19)}for(const h of s){const[d,u]=this.worldToMap(h.x,h.z,l);c.fillStyle=h.kind==="campfire"?"#f97316":h.kind==="lighthouse_beacon"?"#fde047":"#f8fafc",c.fillRect(d-2.5,u-2.5,5,5)}for(const h of a){const[d,u]=this.worldToMap(h.x,h.z,l);c.save(),c.translate(d,u),c.rotate(-h.yaw+Math.PI),c.fillStyle="#38bdf8",c.strokeStyle="#0f172a",c.lineWidth=1.6,c.beginPath(),c.moveTo(0,-7),c.lineTo(5.5,5.5),c.lineTo(-5.5,5.5),c.closePath(),c.fill(),c.stroke(),c.restore()}for(const h of i){if(!h.alive)continue;const[d,u]=this.worldToMap(h.x,h.z,l),f=h.id===n;c.fillStyle=f?"#ffffff":h.isBot?"#7dd3fc":"#4ade80",c.strokeStyle="#0f172a",c.lineWidth=2,c.beginPath(),c.arc(d,u,f?6.5:5,0,Math.PI*2),c.fill(),c.stroke(),c.fillStyle="#ffffff",c.fillText(h.name,d,u-9)}}}function Ui(o){const t=We[o]?.accentColor??"#cbd5e1";switch(o){case"wood":return'<svg viewBox="0 0 32 32"><rect x="4" y="11" width="24" height="10" rx="4" fill="#9c6234" stroke="#4a2b13" stroke-width="2"/><ellipse cx="7" cy="16" rx="2.5" ry="4.5" fill="#d9a574"/><line x1="12" y1="14" x2="23" y2="14" stroke="#6b3e1b" stroke-width="1.5"/></svg>';case"stone":return'<svg viewBox="0 0 32 32"><polygon points="6,23 9,10 19,7 27,14 25,24 14,26" fill="#8b949e" stroke="#3e464f" stroke-width="2"/><polygon points="10,12 18,9 22,15 13,17" fill="#b4bdc7" opacity="0.65"/></svg>';case"flint":return'<svg viewBox="0 0 32 32"><polygon points="16,4 25,18 18,28 8,21 10,10" fill="#525c68" stroke="#1f252b" stroke-width="2"/><polygon points="16,6 21,16 15,21 12,13" fill="#8fa0b2" opacity="0.6"/></svg>';case"fiber":return'<svg viewBox="0 0 32 32"><path d="M9 26 C10 18, 12 11, 8 6 M16 26 C16 17, 17 10, 16 5 M23 26 C22 18, 20 12, 24 7" stroke="#75b548" stroke-width="2.8" fill="none" stroke-linecap="round"/><path d="M8 20 Q16 18 24 20" stroke="#c8a86b" stroke-width="2.2" fill="none"/></svg>';case"rope":return'<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="9.5" fill="none" stroke="#cfa968" stroke-width="4.5"/><circle cx="16" cy="16" r="5" fill="none" stroke="#8f6c36" stroke-width="2"/></svg>';case"resin":return'<svg viewBox="0 0 32 32"><path d="M16 4 C22 12, 25 18, 23 23 C21 27, 11 27, 9 23 C7 18, 10 12, 16 4Z" fill="#f59e0b" stroke="#78350f" stroke-width="2"/><ellipse cx="13.5" cy="17" rx="2.2" ry="4" fill="#fde68a" opacity="0.7"/></svg>';case"hide":return'<svg viewBox="0 0 32 32"><path d="M7 8 L12 10 L16 6 L20 10 L25 8 L23 16 L26 24 L19 23 L16 27 L13 23 L6 24 L9 16 Z" fill="#a66a42" stroke="#4f2d18" stroke-width="2"/></svg>';case"fang":return'<svg viewBox="0 0 32 32"><path d="M11 6 C18 7, 23 14, 21 27 C16 21, 14 14, 9 10 Z" fill="#f1ece1" stroke="#6b6356" stroke-width="2"/></svg>';case"coal":return'<svg viewBox="0 0 32 32"><polygon points="8,22 7,12 15,7 24,11 25,21 16,26" fill="#2b2e34" stroke="#0f1114" stroke-width="2"/><polygon points="11,13 16,10 20,14 14,17" fill="#525866" opacity="0.6"/></svg>';case"copper_ore":return'<svg viewBox="0 0 32 32"><polygon points="6,23 9,10 19,7 26,14 24,25 13,26" fill="#68707a" stroke="#2d333b" stroke-width="2"/><circle cx="14" cy="14" r="3" fill="#e07a3f"/><circle cx="20" cy="19" r="2.6" fill="#34d399"/><circle cx="12" cy="21" r="2.2" fill="#e07a3f"/></svg>';case"iron_ore":return'<svg viewBox="0 0 32 32"><polygon points="6,23 9,10 19,7 26,14 24,25 13,26" fill="#58606b" stroke="#232830" stroke-width="2"/><polygon points="11,12 17,11 16,17 11,16" fill="#cbd5e1"/><polygon points="18,17 23,16 22,22 17,21" fill="#94a3b8"/></svg>';case"copper_ingot":case"iron_ingot":return`<svg viewBox="0 0 32 32"><polygon points="6,21 11,10 23,10 27,21" fill="${t}" stroke="#27272a" stroke-width="2"/><polygon points="11,10 23,10 21,15 9,15" fill="#ffffff" opacity="0.35"/></svg>`;case"obsidian":return'<svg viewBox="0 0 32 32"><polygon points="16,4 25,13 21,27 10,26 7,14" fill="#3b265e" stroke="#140c24" stroke-width="2"/><polygon points="16,6 22,14 16,22 11,15" fill="#7c3aed" opacity="0.5"/></svg>';case"ancient_shard":return'<svg viewBox="0 0 32 32"><polygon points="16,3 23,13 18,29 10,15" fill="#2dd4bf" stroke="#0f766e" stroke-width="2"/><polygon points="16,6 20,14 16,24 13,14" fill="#ccfbf1" opacity="0.7"/></svg>';case"shadow_essence":return'<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="10" fill="#581c87" opacity="0.55"/><circle cx="16" cy="16" r="6" fill="#c084fc"/><circle cx="14" cy="14" r="2" fill="#ffffff"/></svg>';case"berries":return'<svg viewBox="0 0 32 32"><path d="M16 10 Q21 5 24 9 Q19 12 16 10Z" fill="#4ade80"/><circle cx="13" cy="17" r="4.5" fill="#e11d48" stroke="#881337" stroke-width="1.5"/><circle cx="20" cy="18" r="4.5" fill="#f43f5e" stroke="#881337" stroke-width="1.5"/><circle cx="16" cy="23" r="4.2" fill="#be123c" stroke="#881337" stroke-width="1.5"/></svg>';case"coconut":return'<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="10" fill="#7c4a26" stroke="#3f2310" stroke-width="2"/><circle cx="13" cy="13" r="1.4" fill="#2d180a"/><circle cx="18" cy="13" r="1.4" fill="#2d180a"/><circle cx="15.5" cy="17" r="1.4" fill="#2d180a"/></svg>';case"mushroom":return'<svg viewBox="0 0 32 32"><rect x="13" y="16" width="6" height="10" rx="2" fill="#efe6d5" stroke="#7c6b54" stroke-width="1.8"/><path d="M5 17 C6 7, 26 7, 27 17 Z" fill="#c87038" stroke="#663213" stroke-width="2"/><circle cx="12" cy="12" r="1.5" fill="#fde68a"/><circle cx="19" cy="11" r="1.8" fill="#fde68a"/></svg>';case"raw_meat":case"cooked_meat":return`<svg viewBox="0 0 32 32"><path d="M7 18 C7 10, 15 7, 23 11 C27 14, 26 23, 18 25 C11 26, 7 23, 7 18Z" fill="${t}" stroke="#4a1c12" stroke-width="2"/><circle cx="13" cy="16" r="3" fill="#f5ead6" stroke="#b09b7c" stroke-width="1.5"/></svg>`;case"hearty_stew":return'<svg viewBox="0 0 32 32"><path d="M5 15 H27 C26 24, 22 27, 16 27 C10 27, 6 24, 5 15Z" fill="#7c5334" stroke="#3b2312" stroke-width="2"/><ellipse cx="16" cy="15" rx="10" ry="3.5" fill="#ea782b"/><path d="M12 10 Q13 7 12 5 M19 10 Q20 7 19 5" stroke="#e2e8f0" stroke-width="1.8" fill="none" stroke-linecap="round"/></svg>';case"bandage":return'<svg viewBox="0 0 32 32"><rect x="6" y="11" width="20" height="10" rx="4" transform="rotate(-35 16 16)" fill="#f1ead8" stroke="#8c7f68" stroke-width="2"/><path d="M16 12 V20 M12 16 H20" stroke="#ef4444" stroke-width="2.4" stroke-linecap="round"/></svg>';case"vitality_elixir":return'<svg viewBox="0 0 32 32"><rect x="13" y="5" width="6" height="5" fill="#cbd5e1"/><path d="M13 10 L7 22 C6 25, 9 27, 16 27 C23 27, 26 25, 25 22 L19 10 Z" fill="#2dd4bf" stroke="#0f766e" stroke-width="2"/><circle cx="14" cy="20" r="2" fill="#ffffff" opacity="0.7"/></svg>';case"torch":return'<svg viewBox="0 0 32 32"><line x1="8" y1="27" x2="19" y2="14" stroke="#85522c" stroke-width="4" stroke-linecap="round"/><path d="M21 5 C26 9, 26 15, 20 17 C16 15, 16 9, 21 5Z" fill="#f97316"/><path d="M21 9 C23 11, 23 14, 20 15 C18 14, 18 11, 21 9Z" fill="#fde047"/></svg>';case"build_hammer":return'<svg viewBox="0 0 32 32"><line x1="7" y1="26" x2="21" y2="12" stroke="#8c5830" stroke-width="3.6" stroke-linecap="round"/><rect x="15" y="5" width="12" height="7" rx="1.5" transform="rotate(45 21 8.5)" fill="#94a3b8" stroke="#334155" stroke-width="1.8"/></svg>';case"stone_axe":case"iron_axe":return`<svg viewBox="0 0 32 32"><line x1="7" y1="26" x2="22" y2="10" stroke="#85522c" stroke-width="3.5" stroke-linecap="round"/><path d="M16 8 L25 6 C27 11, 25 16, 20 18 L17 13 Z" fill="${t}" stroke="#1e293b" stroke-width="1.8"/></svg>`;case"stone_pickaxe":case"iron_pickaxe":return`<svg viewBox="0 0 32 32"><line x1="7" y1="26" x2="22" y2="11" stroke="#85522c" stroke-width="3.4" stroke-linecap="round"/><path d="M11 7 Q20 7 26 19 L23 21 Q18 12 10 11 Z" fill="${t}" stroke="#1e293b" stroke-width="1.8"/></svg>`;case"wood_spear":return'<svg viewBox="0 0 32 32"><line x1="5" y1="27" x2="23" y2="9" stroke="#996438" stroke-width="3" stroke-linecap="round"/><polygon points="27,5 24,13 19,8" fill="#cbd5e1" stroke="#334155" stroke-width="1.5"/></svg>';case"iron_sword":case"shadow_blade":return`<svg viewBox="0 0 32 32"><line x1="6" y1="26" x2="12" y2="20" stroke="#6b4226" stroke-width="3.2" stroke-linecap="round"/><line x1="10" y1="16" x2="16" y2="22" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/><polygon points="13,19 26,6 27,7 14,20" fill="${t}" stroke="${t}" stroke-width="2.5"/></svg>`;case"hunting_bow":case"starlight_bow":return`<svg viewBox="0 0 32 32"><path d="M9 6 C23 8, 25 22, 9 26" fill="none" stroke="${t}" stroke-width="3.2" stroke-linecap="round"/><line x1="9" y1="6" x2="9" y2="26" stroke="#e2e8f0" stroke-width="1.4"/><line x1="7" y1="16" x2="26" y2="16" stroke="#f8fafc" stroke-width="1.8"/></svg>`;case"flint_arrow":return'<svg viewBox="0 0 32 32"><line x1="6" y1="26" x2="24" y2="8" stroke="#c8a878" stroke-width="2.5"/><polygon points="27,5 24,12 20,8" fill="#94a3b8"/><path d="M5 24 L9 25 L8 29" fill="none" stroke="#f43f5e" stroke-width="2"/></svg>';case"leather_armor":case"iron_armor":case"runic_armor":case"sea_scale_armor":return`<svg viewBox="0 0 32 32"><path d="M9 6 L13 9 L19 9 L23 6 L27 11 L24 15 L23 26 L9 26 L8 15 L5 11 Z" fill="${t}" stroke="#1e293b" stroke-width="2"/></svg>`;case"sailcloth":return'<svg viewBox="0 0 32 32"><path d="M8 5 C19 8, 24 16, 22 26 L8 24 Z" fill="#f5ead6" stroke="#8c7a5b" stroke-width="2"/><line x1="8" y1="4" x2="8" y2="28" stroke="#6b4423" stroke-width="2.5"/></svg>';case"fishing_rod":return'<svg viewBox="0 0 32 32"><path d="M5 27 Q16 14 26 5" fill="none" stroke="#c89b55" stroke-width="2.8" stroke-linecap="round"/><path d="M26 5 Q27 16 24 23" fill="none" stroke="#e2e8f0" stroke-width="1.3"/><circle cx="24" cy="24" r="3" fill="#ef4444" stroke="#ffffff" stroke-width="1.2"/></svg>';case"spyglass":return'<svg viewBox="0 0 32 32"><line x1="6" y1="25" x2="25" y2="7" stroke="#d97706" stroke-width="5.5" stroke-linecap="round"/><line x1="12" y1="19" x2="21" y2="11" stroke="#f59e0b" stroke-width="3.5"/><circle cx="25" cy="7" r="3" fill="#38bdf8" stroke="#92400e" stroke-width="1.5"/></svg>';case"harpoon_spear":case"volcanic_greataxe":return`<svg viewBox="0 0 32 32"><line x1="5" y1="27" x2="24" y2="8" stroke="#6b4423" stroke-width="3.2" stroke-linecap="round"/><polygon points="27,5 25,14 21,11 18,7" fill="${t}" stroke="#1e293b" stroke-width="1.6"/></svg>`;case"raw_fish":case"grilled_fish":case"golden_snapper":case"seafarer_chowder":return`<svg viewBox="0 0 32 32"><path d="M6 16 C11 9, 21 9, 25 16 C21 23, 11 23, 6 16Z" fill="${t}" stroke="#1e293b" stroke-width="1.8"/><polygon points="24,16 30,11 29,21" fill="${t}"/><circle cx="11" cy="14.5" r="1.5" fill="#0f172a"/></svg>`;case"sea_pearl":return'<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="9.5" fill="#e0f2fe" stroke="#38bdf8" stroke-width="2"/><circle cx="13" cy="12" r="3" fill="#ffffff" opacity="0.9"/></svg>';case"coral_shard":return'<svg viewBox="0 0 32 32"><path d="M16 27 V12 M16 18 L9 10 M16 16 L23 9 M12 13 L11 7 M20 12 L22 6" stroke="#f472b6" stroke-width="3.2" stroke-linecap="round"/></svg>';case"sunbloom":return'<svg viewBox="0 0 32 32"><circle cx="16" cy="14" r="7" fill="#fde047" stroke="#d97706" stroke-width="2"/><circle cx="16" cy="14" r="3" fill="#f97316"/><line x1="16" y1="21" x2="16" y2="28" stroke="#4d7c0f" stroke-width="2.6"/></svg>';case"sunken_gold":return'<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="10" fill="#facc15" stroke="#b45309" stroke-width="2"/><circle cx="16" cy="16" r="6" fill="none" stroke="#fef08a" stroke-width="1.4"/></svg>';case"crab_claw":return'<svg viewBox="0 0 32 32"><path d="M8 24 C8 14, 16 7, 25 9 C22 14, 21 16, 25 19 C19 24, 14 26, 8 24Z" fill="#e11d48" stroke="#881337" stroke-width="2"/></svg>';case"serpent_scale":return'<svg viewBox="0 0 32 32"><polygon points="16,4 26,15 16,28 6,15" fill="#06b6d4" stroke="#164e63" stroke-width="2"/><polygon points="16,8 22,15 16,23 10,15" fill="#67e8f9" opacity="0.65"/></svg>';case"volcanic_core":return'<svg viewBox="0 0 32 32"><polygon points="16,3 25,11 22,26 10,26 7,11" fill="#f97316" stroke="#7c2d12" stroke-width="2"/><circle cx="16" cy="15" r="4" fill="#fef08a"/></svg>';case"swift_tonic":case"frost_brew":case"berserk_elixir":return`<svg viewBox="0 0 32 32"><rect x="13" y="4" width="6" height="5" fill="#cbd5e1"/><path d="M13 9 L7 22 C6 25, 9 27, 16 27 C23 27, 26 25, 25 22 L19 9 Z" fill="${t}" stroke="#1e293b" stroke-width="2"/><circle cx="14" cy="19" r="2.2" fill="#ffffff" opacity="0.75"/></svg>`;case"berry_seeds":return'<svg viewBox="0 0 32 32"><ellipse cx="11" cy="17" rx="3" ry="5" fill="#84cc16" stroke="#365314" stroke-width="1.5"/><ellipse cx="18" cy="13" rx="3" ry="5" fill="#a3e635" stroke="#365314" stroke-width="1.5"/><ellipse cx="21" cy="21" rx="3" ry="5" fill="#65a30d" stroke="#365314" stroke-width="1.5"/></svg>';default:return`<svg viewBox="0 0 32 32"><rect x="6" y="8" width="20" height="16" rx="3" fill="${t}" stroke="#1e293b" stroke-width="2"/><circle cx="16" cy="16" r="3.5" fill="#ffffff" opacity="0.6"/></svg>`}}class qg{activePanel="none";openChestId=null;openBoatCargoId=null;chatOpen=!1;selectedBuildKind="wood_foundation";selectedBoatKind=null;actions;selectedInvSlot=null;craftStationFilter="all";lastPrivate=null;lastSelf=null;touchMode="auto";activeRoomId="emerald-archipelago";activeSeed=42077;activeServerUrl="";titleOverlay;hudRoot;hotbarEl;promptEl;toastContainer;chatLogEl;chatInputWrap;chatInputEl;panelContainer;deathOverlay;floatingLayer;constructor(t){this.actions=t,this.titleOverlay=document.getElementById("title-overlay"),this.hudRoot=document.getElementById("hud-root"),this.hotbarEl=document.getElementById("hotbar"),this.promptEl=document.getElementById("interact-prompt"),this.toastContainer=document.getElementById("toast-container"),this.chatLogEl=document.getElementById("chat-log"),this.chatInputWrap=document.getElementById("chat-input-wrap"),this.chatInputEl=document.getElementById("chat-input"),this.panelContainer=document.getElementById("panel-container"),this.deathOverlay=document.getElementById("death-overlay"),this.floatingLayer=document.getElementById("floating-text-layer"),this.initTitleScreen(),this.initChat(),this.initResponsiveHudChrome(),document.getElementById("btn-respawn")?.addEventListener("click",()=>this.actions.onRespawn())}initResponsiveHudChrome(){const t=document.getElementById("objectives-card");t&&window.innerWidth<=768&&t.classList.add("collapsed"),document.getElementById("btn-toggle-obj")?.addEventListener("click",()=>{t?.classList.toggle("collapsed")}),document.getElementById("btn-hide-obj")?.addEventListener("click",()=>{t?.classList.add("collapsed")}),document.getElementById("btn-minimap-open")?.addEventListener("click",()=>{this.actions.onOpenMap()}),document.getElementById("btn-map-close")?.addEventListener("click",()=>{this.setPanel("none"),this.actions.onResumeGame()})}buildInviteLink(t,e,n){const i=new URL(window.location.href);return i.searchParams.set("room",t||"emerald-archipelago"),e?i.searchParams.set("seed",String(e)):i.searchParams.delete("seed"),n?i.searchParams.set("server",n):i.searchParams.delete("server"),i.toString()}async copyInvite(t,e,n){const i=this.buildInviteLink(t,e,n);try{await navigator.clipboard.writeText(i),this.showToast("Invite link copied to clipboard!","good")}catch{window.prompt("Copy your Wildreach invite link:",i)}}initTitleScreen(){const t=document.getElementById("inp-name"),e=document.getElementById("inp-room"),n=document.getElementById("inp-seed"),i=document.getElementById("inp-server"),s=document.getElementById("chk-ai"),r=document.getElementById("btn-enter-world"),a=document.getElementById("btn-copy-invite"),c=document.querySelectorAll(".outfit-pill"),l=new URLSearchParams(window.location.search);l.get("room")&&(e.value=l.get("room")),l.get("seed")&&(n.value=l.get("seed")),l.get("server")&&(i.value=l.get("server"));let h="ranger";c.forEach(u=>{u.addEventListener("click",()=>{c.forEach(f=>f.classList.remove("active")),u.classList.add("active"),h=u.dataset.outfit||"ranger"})});const d=["Ash","Rowan","Freya","Bram","Kira","Soren","Nora","Talia"];t.value||(t.value=d[Math.floor(Math.random()*d.length)]),a.addEventListener("click",()=>{const u=n.value.trim()?Number(n.value.trim()):void 0;this.copyInvite(e.value.trim(),Number.isFinite(u)?u:void 0,i.value.trim())}),r.addEventListener("click",()=>{const u=n.value.trim()?Number(n.value.trim()):void 0;this.activeRoomId=e.value.trim()||"emerald-archipelago",this.activeSeed=Number.isFinite(u)?u:42077,this.activeServerUrl=i.value.trim(),this.actions.onJoinGame({playerName:t.value.trim()||"Survivor",outfit:h,roomId:this.activeRoomId,roomName:this.activeRoomId,seed:Number.isFinite(u)?u:void 0,serverUrl:this.activeServerUrl||void 0,spawnAiCompanions:s.checked})}),this.refreshRoomList()}async refreshRoomList(){const t=document.getElementById("room-list"),e=document.getElementById("lobby-mode-badge");if(!t)return;const{rooms:n,serverReachable:i}=await this.actions.onRefreshRooms();if(e&&(i?(e.textContent="● Live Multiplayer Server",e.classList.remove("offline")):(e.textContent="◆ Local World (Static / GitHub Pages)",e.classList.add("offline"))),!i){t.innerHTML='<div class="room-empty"><strong>Static / Offline Ready!</strong> No backend server detected on this host, so Wildreach will launch a full browser-simulated island (with AI allies & auto-save). Paste a Socket.IO server URL on the left to play online co-op!</div>';return}if(n.length===0){t.innerHTML='<div class="room-empty">Public world ready — click Enter Wildreach!</div>';return}t.innerHTML=n.map(s=>`
        <button class="room-row" data-room-id="${s.id}">
          <div>
            <div class="room-title">${this.esc(s.name)}</div>
            <div class="room-meta">Day ${s.day} • ${s.weather} • Seed ${s.seed}</div>
          </div>
          <span class="room-badge">${s.playerCount}/${s.maxPlayers} Online</span>
        </button>`).join(""),t.querySelectorAll(".room-row").forEach(s=>{s.addEventListener("click",()=>{const r=document.getElementById("inp-room");r&&s.dataset.roomId&&(r.value=s.dataset.roomId)})})}hideTitleScreen(){this.titleOverlay.classList.add("hidden"),this.hudRoot.classList.remove("hidden")}initChat(){document.querySelectorAll("#sailing-hud .gear-btn").forEach(t=>{t.addEventListener("click",()=>{const e=Number(t.dataset.gear);this.actions.onSetSailGear(e)})}),document.getElementById("btn-sail-disembark")?.addEventListener("click",()=>{this.actions.onDisembarkBoat()}),document.getElementById("btn-sail-cargo")?.addEventListener("click",()=>{this.actions.onOpenBoatCargo()}),this.chatInputEl.addEventListener("keydown",t=>{if(t.key==="Enter"){t.preventDefault();const e=this.chatInputEl.value.trim();e&&this.actions.onSendChat(e),this.chatInputEl.value="",this.setChatOpen(!1)}else t.key==="Escape"&&this.setChatOpen(!1)})}setChatOpen(t){this.chatOpen=t,this.chatInputWrap.classList.toggle("hidden",!t),t?this.chatInputEl.focus():this.chatInputEl.blur()}appendChat(t){const e=document.createElement("div");for(e.className=`chat-line chat-${t.kind}`,t.kind==="system"?e.innerHTML=`<span class="chat-sys">◆ ${this.esc(t.text)}</span>`:t.kind==="emote"?e.innerHTML=`<span class="chat-name">${this.esc(t.senderName)}</span> <em>${this.esc(t.text)}</em>`:e.innerHTML=`<span class="chat-name">${this.esc(t.senderName)}:</span> ${this.esc(t.text)}`,this.chatLogEl.appendChild(e);this.chatLogEl.children.length>36;)this.chatLogEl.removeChild(this.chatLogEl.firstChild);this.chatLogEl.scrollTop=this.chatLogEl.scrollHeight}showToast(t,e="info"){const n=document.createElement("div");n.className=`toast toast-${e}`,n.textContent=t,this.toastContainer.appendChild(n),setTimeout(()=>n.classList.add("fade-out"),3200),setTimeout(()=>n.remove(),3800)}spawnFloatingText(t,e,n,i){const s=document.createElement("div");s.className="floating-dmg",s.textContent=n,s.style.left=`${Math.round(t)}px`,s.style.top=`${Math.round(e)}px`,s.style.color=i,this.floatingLayer.appendChild(s),setTimeout(()=>s.remove(),1100)}setInteractPrompt(t,e,n){if(!t){this.promptEl.classList.add("hidden");return}this.promptEl.classList.remove("hidden");const i=n!==void 0?`<div class="prompt-bar"><div style="width:${Math.max(0,Math.min(100,Math.round(n)))}%"></div></div>`:"";this.promptEl.innerHTML=`<div class="prompt-main">${this.esc(t)}</div>${e?`<div class="prompt-sub">${this.esc(e)}</div>`:""}${i}`}setScreenVignette(t){const e=document.getElementById("screen-vignette");e&&(t.underwater?(e.style.background="rgba(14, 116, 144, 0.24)",e.style.boxShadow="inset 0 0 110px rgba(8, 51, 68, 0.72)"):t.hitFlash>.05?(e.style.background=`rgba(220, 38, 38, ${(t.hitFlash*.25).toFixed(2)})`,e.style.boxShadow=`inset 0 0 120px rgba(220, 38, 38, ${(t.hitFlash*.75).toFixed(2)})`):t.lowHp?(e.style.background="transparent",e.style.boxShadow="inset 0 0 120px rgba(185, 28, 28, 0.52)"):t.chilled?(e.style.background="transparent",e.style.boxShadow="inset 0 0 110px rgba(56, 189, 248, 0.36)"):t.warmFire?(e.style.background="transparent",e.style.boxShadow="inset 0 0 90px rgba(249, 115, 22, 0.16)"):(e.style.background="transparent",e.style.boxShadow="inset 0 0 70px rgba(0, 0, 0, 0.22)"))}setBowCharge(t){const e=document.getElementById("bow-charge-bar"),n=document.getElementById("bow-charge-fill");!e||!n||(t<=.01?e.classList.add("hidden"):(e.classList.remove("hidden"),n.style.width=`${Math.round(t*100)}%`))}updateHud(t,e,n,i,s,r,a,c,l=!1,h=!1,d=!1){this.lastSelf=t,this.lastPrivate=e,this.deathOverlay.classList.toggle("hidden",t.alive);const u=document.getElementById("lock-hint");u&&u.classList.toggle("hidden",l||d||c||this.activePanel!=="none"||this.chatOpen||!t.alive);const f=(-a*180/Math.PI%360+360)%360,v=["N","NE","E","SE","S","SW","W","NW"][Math.round(f/45)%8],p=document.getElementById("hud-compass");p&&(p.textContent=`${v} ${Math.round(f).toString().padStart(3,"0")}° • ${i}`);const m=Math.floor(n.timeOfDay*24),w=Math.floor((n.timeOfDay*24-m)*60),b=`${m.toString().padStart(2,"0")}:${w.toString().padStart(2,"0")}`,x=document.getElementById("hud-clock");if(x){const y=n.timeOfDay<.23||n.timeOfDay>.78?"☾":"☀";x.textContent=`${y} Day ${n.day} • ${b} • ${n.weather.toUpperCase()}`}const I=document.getElementById("hud-net");I&&(I.textContent=h?`Local World • Lv.${t.level}`:`${s} Online • ${r}ms • Lv.${t.level}`),this.setBar("bar-hp",t.vitals.hp/t.vitals.maxHp*100,`${Math.ceil(t.vitals.hp)}/${t.vitals.maxHp}`),this.setBar("bar-stamina",t.vitals.stamina/t.vitals.maxStamina*100),this.setBar("bar-hunger",t.vitals.hunger),this.setBar("bar-thirst",t.vitals.thirst),this.setBar("bar-warmth",t.vitals.warmth);const E=[];t.status.sheltered&&E.push('<span class="pill pill-good">⌂ Sheltered</span>'),t.status.warm&&E.push('<span class="pill pill-warm">🔥 Warm</span>'),t.status.wellFed&&E.push('<span class="pill pill-good">★ Well-Fed</span>'),t.status.wet&&E.push('<span class="pill pill-wet">💧 Wet</span>'),t.status.chilled&&E.push('<span class="pill pill-danger">❄ Chilled</span>'),t.armorRating>0&&E.push(`<span class="pill pill-info">🛡 Armor ${t.armorRating}%</span>`),t.pvpEnabled&&E.push('<span class="pill pill-danger">⚔ PvP Active</span>');const A=document.getElementById("status-pills");A&&(A.innerHTML=E.join(""));const R=document.getElementById("objectives-list");if(R){const y=[["gather_resources","Gather Wood & Stone [LMB]"],["craft_tool","Craft a Tool or Weapon [C]"],["build_shelter","Build a Campfire or Shelter [B]"],["cook_food","Roast Meat by a Campfire [C]"],["hunt_wildlife","Hunt Wildlife or Stalkers"],["smelt_iron","Smelt Ingots in a Furnace"]];R.innerHTML=y.map(([_,P])=>{const U=!!e.objectives[_];return`<div class="obj-item ${U?"done":""}">${U?"✓":"○"} ${P}</div>`}).join("")}this.renderHotbar(e.inventory,t.equippedSlot)}setBar(t,e,n){const i=document.getElementById(t);if(i&&(i.style.width=`${Math.max(0,Math.min(100,e))}%`),n){const s=document.getElementById(`${t}-val`);s&&(s.textContent=n)}}renderHotbar(t,e){let n="";for(let s=0;s<$l;s++){const r=t[s],a=Ue(r?.itemId),c=r&&a?.maxDurability&&r.durability!==void 0?Math.max(0,Math.min(100,r.durability/a.maxDurability*100)):null;n+=`
        <button class="hb-slot ${s===e?"active":""}" data-slot="${s}" title="${a?this.esc(a.name):"Empty"}">
          <span class="hb-key">${s+1}</span>
          ${r?`<div class="slot-icon">${Ui(r.itemId)}</div>`:""}
          ${r&&r.count>1?`<span class="slot-count">${r.count}</span>`:""}
          ${c!==null?`<div class="dur-bar"><div style="width:${c}%"></div></div>`:""}
        </button>`}this.hotbarEl.dataset.cache!==n&&(this.hotbarEl.dataset.cache=n,this.hotbarEl.innerHTML=n,this.hotbarEl.querySelectorAll(".hb-slot").forEach(s=>{s.addEventListener("click",()=>{this.actions.onSelectHotbar(Number(s.dataset.slot))})}));const i=document.getElementById("equipped-label");if(i){const s=Ue(t[e]?.itemId);i.textContent=s?s.name:"Bare Hands"}}setSpyglassActive(t){document.getElementById("spyglass-overlay")?.classList.toggle("hidden",!t)}updateSailingHud(t,e,n){const i=document.getElementById("sailing-hud");if(!i)return;if(!t){i.classList.add("hidden");return}i.classList.remove("hidden");const s=ln[t.kind],r=document.getElementById("sail-vessel-name");r&&(r.textContent=`⛵ ${s.name}`);const a=document.getElementById("sail-speed");a&&(a.textContent=`${(Math.abs(t.speed)*1.15).toFixed(1)} kt`);const c=-Math.sin(t.yaw),l=-Math.cos(t.yaw),h=c*e+l*n,d=document.getElementById("sail-wind");d&&(h>.35?(d.textContent="⛵ Tailwind +Boost",d.className="sail-wind good"):h<-.35?(d.textContent="⚠ Headwind (Row!)",d.className="sail-wind warn"):(d.textContent="🌬 Crosswind +OK",d.className="sail-wind"));const u=document.getElementById("sail-hp-fill");u&&(u.style.width=`${Math.max(0,Math.min(100,t.hp/t.maxHp*100))}%`);const f=document.getElementById("sail-hp-val");f&&(f.textContent=`${Math.ceil(t.hp)}/${t.maxHp}`),i.querySelectorAll(".gear-btn").forEach(v=>{v.classList.toggle("active",Number(v.dataset.gear)===t.throttle)});const g=document.getElementById("btn-sail-cargo");g&&g.classList.toggle("hidden",s.cargoSlots<=0)}setPanel(t,e,n){if(this.activePanel=t,this.openChestId=t==="chest"&&e?e.id:null,this.openBoatCargoId=t==="boat_cargo"&&n?n.id:null,this.selectedInvSlot=null,document.getElementById("map-modal").classList.toggle("hidden",t!=="map"),t==="none"||t==="map"){this.panelContainer.classList.add("hidden"),this.panelContainer.innerHTML="";return}this.panelContainer.classList.remove("hidden"),this.renderActivePanel(e,n)}refreshPanelIfOpen(t,e){(this.activePanel==="inventory"||this.activePanel==="crafting"||this.activePanel==="build"||this.activePanel==="chest"||this.activePanel==="boat_cargo")&&this.renderActivePanel(t,e)}renderActivePanel(t,e){const n=this.lastPrivate,i=this.lastSelf;if(!(!n||!i)){if(this.activePanel==="inventory"){const s=n.inventory.map((c,l)=>{const h=Ue(c?.itemId);return`
            <button class="inv-slot ${this.selectedInvSlot===l?"selected":""} ${l<9?"hotbar-mark":""}" data-idx="${l}" title="${h?`${this.esc(h.name)}: ${this.esc(h.description)}`:"Empty slot"}">
              ${l<9?`<span class="hb-key">${l+1}</span>`:""}
              ${c?`<div class="slot-icon">${Ui(c.itemId)}</div>`:""}
              ${c&&c.count>1?`<span class="slot-count">${c.count}</span>`:""}
            </button>`}).join(""),r=this.selectedInvSlot!==null?n.inventory[this.selectedInvSlot]:null,a=Ue(r?.itemId);this.panelContainer.innerHTML=`
        <div class="modal-card">
          <div class="modal-header">
            <h2>Survivor Pack & Equipment</h2>
            <button class="btn-close" id="btn-panel-close">✕</button>
          </div>
          <div class="inv-top-row">
            <div class="armor-box">
              <span class="label-sm">Equipped Armor (${i.armorRating}% DEF)</span>
              <div class="armor-slot">${n.armorSlot?Ui(n.armorSlot.itemId):"<span>None</span>"}</div>
              <div class="label-xs">${n.armorSlot?We[n.armorSlot.itemId]?.name:"Craft Leather or Iron Armor"}</div>
            </div>
            <div class="inv-detail">
              ${a?`<div class="detail-title">${this.esc(a.name)}</div>
                     <p class="detail-desc">${this.esc(a.description)}</p>
                     <div class="detail-actions">
                       ${a.category==="consumable"?'<button class="btn-primary" id="btn-use-item">Consume</button>':""}
                       ${a.category==="armor"?'<button class="btn-primary" id="btn-equip-armor">Equip Armor</button>':""}
                       <button class="btn-ghost" id="btn-drop-item">Drop Stack</button>
                     </div>`:'<div class="detail-empty">Click any slot to inspect or swap items. Click another slot to move/stack.</div>'}
            </div>
          </div>
          <div class="inv-grid">${s}</div>
        </div>`,this.panelContainer.querySelector("#btn-panel-close")?.addEventListener("click",()=>{this.setPanel("none"),this.actions.onResumeGame()}),this.panelContainer.querySelectorAll(".inv-slot").forEach(c=>{c.addEventListener("click",()=>{const l=Number(c.dataset.idx);this.selectedInvSlot===null?(this.selectedInvSlot=l,this.renderActivePanel()):this.selectedInvSlot===l?(this.selectedInvSlot=null,this.renderActivePanel()):(this.actions.onSwapSlots(this.selectedInvSlot,l),this.selectedInvSlot=null)})}),this.panelContainer.querySelector("#btn-use-item")?.addEventListener("click",()=>{this.selectedInvSlot!==null&&this.actions.onConsumeSlot(this.selectedInvSlot)}),this.panelContainer.querySelector("#btn-equip-armor")?.addEventListener("click",()=>{this.selectedInvSlot!==null&&this.actions.onEquipArmor(this.selectedInvSlot)}),this.panelContainer.querySelector("#btn-drop-item")?.addEventListener("click",()=>{this.selectedInvSlot!==null&&(this.actions.onDropSlot(this.selectedInvSlot),this.selectedInvSlot=null)})}else if(this.activePanel==="crafting"){const s=this.countInventory(n.inventory),r={hand:!0,campfire:i.status.nearCampfire,workbench:i.status.nearWorkbench,furnace:i.status.nearFurnace,cauldron:i.status.nearCauldron,runic_forge:i.status.nearRunicForge},c=Xl.filter(h=>this.craftStationFilter==="all"||h.station===this.craftStationFilter).map(h=>{const d=We[h.outputItemId],u=r[h.station],f=h.ingredients.every(p=>(s[p.itemId]??0)>=p.count),g=u&&f,v=h.ingredients.map(p=>{const m=s[p.itemId]??0;return`<span class="ing-chip ${m>=p.count?"ok":"miss"}">${We[p.itemId]?.name??p.itemId} ${m}/${p.count}</span>`}).join("");return`
            <div class="recipe-row ${g?"ready":""}">
              <div class="recipe-icon">${Ui(h.outputItemId)}</div>
              <div class="recipe-info">
                <div class="recipe-title">${this.esc(d?.name??h.outputItemId)} ${h.outputCount>1?`×${h.outputCount}`:""}
                  <span class="station-tag ${u?"active":""}">${h.station.replace("_"," ")}</span>
                </div>
                <div class="recipe-ings">${v}</div>
              </div>
              <button class="btn-craft" data-recipe="${h.id}" ${g?"":"disabled"}>Craft</button>
            </div>`}).join(""),l=["all","hand","campfire","workbench","furnace","cauldron","runic_forge"];this.panelContainer.innerHTML=`
        <div class="modal-card modal-wide">
          <div class="modal-header">
            <h2>Crafting & Cooking</h2>
            <button class="btn-close" id="btn-panel-close">✕</button>
          </div>
          <div class="tab-bar">
            ${l.map(h=>`<button class="tab-btn ${this.craftStationFilter===h?"active":""}" data-st="${h}">${h==="all"?"All":h.replace("_"," ")}${h!=="all"&&r[h]?" ●":""}</button>`).join("")}
          </div>
          <div class="recipe-list">${c}</div>
        </div>`,this.panelContainer.querySelector("#btn-panel-close")?.addEventListener("click",()=>{this.setPanel("none"),this.actions.onResumeGame()}),this.panelContainer.querySelectorAll(".tab-btn").forEach(h=>{h.addEventListener("click",()=>{this.craftStationFilter=h.dataset.st||"all",this.renderActivePanel()})}),this.panelContainer.querySelectorAll(".btn-craft").forEach(h=>{h.addEventListener("click",()=>{h.dataset.recipe&&this.actions.onCraft(h.dataset.recipe)})})}else if(this.activePanel==="build"){const s=this.countInventory(n.inventory),a=["raft","skiff","longship"].map(l=>{const h=ln[l],d=!h.requiresWorkbench||i.status.nearWorkbench,u=h.costs.every(g=>(s[g.itemId]??0)>=g.count),f=h.costs.map(g=>{const v=s[g.itemId]??0;return`<span class="ing-chip ${v>=g.count?"ok":"miss"}">${We[g.itemId]?.name} ${v}/${g.count}</span>`}).join("");return`
          <button class="build-card boat-card ${this.selectedBoatKind===l?"active":""} ${d&&u?"ready":""}" data-boat="${l}">
            <div class="build-title">⛵ ${this.esc(h.name)} <span class="boat-stat-pill">${h.fullSailSpeed} kt${h.cargoSlots>0?` · ${h.cargoSlots} Cargo`:""}</span></div>
            <div class="build-desc">${this.esc(h.description)}</div>
            <div class="recipe-ings">${f}</div>
            ${h.requiresWorkbench?`<div class="wb-req ${d?"ok":""}">Requires Workbench</div>`:""}
          </button>`}).join(""),c=L0.map(l=>{const h=hi[l],d=!h.requiresWorkbench||i.status.nearWorkbench,u=h.costs.every(g=>(s[g.itemId]??0)>=g.count),f=h.costs.map(g=>{const v=s[g.itemId]??0;return`<span class="ing-chip ${v>=g.count?"ok":"miss"}">${We[g.itemId]?.name} ${v}/${g.count}</span>`}).join("");return`
          <button class="build-card ${this.selectedBuildKind===l&&!this.selectedBoatKind?"active":""} ${d&&u?"ready":""}" data-kind="${l}">
            <div class="build-title">${this.esc(h.name)}</div>
            <div class="build-desc">${this.esc(h.description)}</div>
            <div class="recipe-ings">${f}</div>
            ${h.requiresWorkbench?`<div class="wb-req ${d?"ok":""}">Requires Workbench</div>`:""}
          </button>`}).join("");this.panelContainer.innerHTML=`
        <div class="modal-card modal-wide">
          <div class="modal-header">
            <h2>Shipyard & Modular Base Building</h2>
            <button class="btn-close" id="btn-panel-close">✕</button>
          </div>
          <p class="build-hint">Pick a <strong>Boat</strong> to launch into coastal water, or a <strong>Structure</strong> to snap onto land/piers. Press <strong>[R]</strong> to rotate or <strong>Right-Click</strong> to cancel.</p>
          <div class="build-section-hdr">⛵ Vessels & Ships (Place in Water)</div>
          <div class="build-grid">${a}</div>
          <div class="build-section-hdr">🏗 Structures, Docks, Farming & Alchemy</div>
          <div class="build-grid">${c}</div>
        </div>`,this.panelContainer.querySelector("#btn-panel-close")?.addEventListener("click",()=>{this.setPanel("none"),this.actions.onResumeGame()}),this.panelContainer.querySelectorAll(".boat-card").forEach(l=>{l.addEventListener("click",()=>{const h=l.dataset.boat;this.selectedBoatKind=h,this.actions.onSelectBuildKind(null),this.actions.onSelectBoatKind(h),this.setPanel("none"),this.actions.onResumeGame()})}),this.panelContainer.querySelectorAll(".build-card[data-kind]").forEach(l=>{l.addEventListener("click",()=>{const h=l.dataset.kind;this.selectedBoatKind=null,this.selectedBuildKind=h,this.actions.onSelectBoatKind(null),this.actions.onSelectBuildKind(h),this.setPanel("none"),this.actions.onResumeGame()})})}else if(this.activePanel==="boat_cargo"&&e){const s=e.chestSlots??[],r=(a,c)=>a.map((l,h)=>{const d=Ue(l?.itemId);return`<button class="inv-slot" data-side="${c}" data-idx="${h}" title="${d?this.esc(d.name):"Empty"}">
              ${l?`<div class="slot-icon">${Ui(l.itemId)}</div>`:""}
              ${l&&l.count>1?`<span class="slot-count">${l.count}</span>`:""}
            </button>`}).join("");this.panelContainer.innerHTML=`
        <div class="modal-card modal-wide">
          <div class="modal-header">
            <h2>⛵ ${this.esc(ln[e.kind].name)} Cargo Hold</h2>
            <button class="btn-close" id="btn-panel-close">✕</button>
          </div>
          <p class="build-hint">Click any item to move cargo between your Backpack and your vessel's hold.</p>
          <div class="chest-split">
            <div>
              <h3>Ship Cargo Hold (${s.length} Slots)</h3>
              <div class="inv-grid cols-4">${r(s,"chest")}</div>
            </div>
            <div>
              <h3>Your Backpack</h3>
              <div class="inv-grid cols-6">${r(n.inventory,"inventory")}</div>
            </div>
          </div>
        </div>`,this.panelContainer.querySelector("#btn-panel-close")?.addEventListener("click",()=>{this.setPanel("none"),this.actions.onResumeGame()}),this.panelContainer.querySelectorAll(".inv-slot").forEach(a=>{a.addEventListener("click",()=>{const c=a.dataset.side,l=Number(a.dataset.idx);this.actions.onBoatChestTransfer(e.id,c,l)})})}else if(this.activePanel==="chest"&&t){const s=t.chestSlots??[],r=(a,c)=>a.map((l,h)=>{const d=Ue(l?.itemId);return`<button class="inv-slot" data-side="${c}" data-idx="${h}" title="${d?this.esc(d.name):"Empty"}">
              ${l?`<div class="slot-icon">${Ui(l.itemId)}</div>`:""}
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
              <div class="inv-grid cols-4">${r(s,"chest")}</div>
            </div>
            <div>
              <h3>Your Backpack</h3>
              <div class="inv-grid cols-6">${r(n.inventory,"inventory")}</div>
            </div>
          </div>
        </div>`,this.panelContainer.querySelector("#btn-panel-close")?.addEventListener("click",()=>{this.setPanel("none"),this.actions.onResumeGame()}),this.panelContainer.querySelectorAll(".inv-slot").forEach(a=>{a.addEventListener("click",()=>{const c=a.dataset.side,l=Number(a.dataset.idx);this.actions.onChestTransfer(t.id,c,l)})})}else if(this.activePanel==="pause"){this.panelContainer.innerHTML=`
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
              <button class="btn-ghost" id="btn-pvp">${i.pvpEnabled?"⚔ PvP ON (Disable)":"🛡 Co-op Safe (Enable PvP)"}</button>
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
        </div>`;const s=()=>{this.setPanel("none"),this.actions.onResumeGame()};this.panelContainer.querySelector("#btn-panel-close")?.addEventListener("click",s),this.panelContainer.querySelector("#btn-resume")?.addEventListener("click",s),this.panelContainer.querySelector("#btn-pvp")?.addEventListener("click",()=>{this.actions.onTogglePvp(),s()}),this.panelContainer.querySelector("#btn-add-bot")?.addEventListener("click",()=>{this.actions.onSpawnBot(),s()}),this.panelContainer.querySelectorAll(".seg-btn[data-q]").forEach(r=>{r.addEventListener("click",()=>{this.panelContainer.querySelectorAll(".seg-btn[data-q]").forEach(a=>a.classList.remove("active")),r.classList.add("active"),this.actions.onSetQuality(r.dataset.q||"high")})}),this.panelContainer.querySelectorAll(".touch-seg").forEach(r=>{r.addEventListener("click",()=>{this.panelContainer.querySelectorAll(".touch-seg").forEach(c=>c.classList.remove("active")),r.classList.add("active");const a=r.dataset.tm||"auto";this.touchMode=a,this.actions.onSetTouchMode(a)})}),this.panelContainer.querySelector("#btn-pause-invite")?.addEventListener("click",()=>{this.copyInvite(this.activeRoomId,this.activeSeed,this.activeServerUrl||void 0)}),this.panelContainer.querySelector("#rng-vol")?.addEventListener("input",r=>{this.actions.onSetVolume(Number(r.target.value)/100)})}}}countInventory(t){const e={};for(const n of t)n&&(e[n.itemId]=(e[n.itemId]??0)+n.count);return e}esc(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}}class $g{renderer;scene;camera;textures;sky;audio=new Z0;net=new Vg;input;touch;ui;isTouchDevice=yo.isTouchDevice();world;terrainMesh=null;water=null;env=null;structures=null;boats=null;livingFX=null;wildlife=null;effects=null;minimap=null;currentSeed=-1;inGame=!1;localId="";localVisual=null;remotePlayers=new Map;allPlayers=[];privateState=null;nodeMap=new Map;structureMap=new Map;boatMap=new Map;landmarks=[];worldTime={day:1,timeOfDay:.33,weather:"clear",weatherIntensity:0,windDirX:.78,windDirZ:.62,windSpeed:1};pos=new D(-10,4.4,25);vel=new D;grounded=!0;firstPerson=!1;inputSeq=0;netSendTimer=0;footstepTimer=0;bowCharge=0;chargingBow=!1;screenShake=0;hitFlash=0;localSwingTime=0;activeBuildKind=null;activeBuildFromSlot=void 0;activeBoatKind=null;buildRotY=0;ghostPlacement=null;boatGhostPos=null;sailGear=0;sailGearCooldown=0;boatCtrlTimer=0;spyglassActive=!1;fishing={active:!1,bobberX:0,bobberZ:0,timer:0,biteWindow:0,deepWater:!1};raycaster=new Wd;centerNDC=new Dt(0,0);aimNodeId;aimWildlifeId;aimStructureId;aimBoatId;aimLootId;aimPlayerId;clock=new Vd;elapsed=0;constructor(){const t=document.getElementById("game-canvas");this.renderer=new C0({canvas:t,antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,this.isTouchDevice?1.5:2)),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=hl,this.renderer.toneMapping=dl,this.renderer.toneMappingExposure=1.08,this.scene=new Cd,this.camera=new Je(this.computeResponsiveFov(window.innerWidth,window.innerHeight),window.innerWidth/window.innerHeight,.15,820),this.textures=B0(),this.sky=new z0(this.scene),this.isTouchDevice&&this.sky.setShadowQuality("medium"),this.buildWorldScene(42077),this.ui=new qg({onJoinGame:e=>void this.joinGame(e),onRefreshRooms:()=>this.net.fetchRooms(),onSelectHotbar:e=>this.selectHotbar(e),onConsumeSlot:e=>this.net.sendConsume(e),onEquipArmor:e=>this.net.sendEquipArmor(e),onSwapSlots:(e,n)=>this.net.sendSwapSlots(e,n),onDropSlot:e=>this.net.sendDropSlot(e),onCraft:e=>{this.audio.playSfx("ui"),this.net.sendCraft(e)},onSelectBuildKind:e=>{this.activeBuildKind=e,this.activeBuildFromSlot=void 0,e&&(this.activeBoatKind=null,this.boats?.updateGhost(null,0,0,0,!1))},onSelectBoatKind:e=>{this.activeBoatKind=e,e?(this.activeBuildKind=null,this.activeBuildFromSlot=void 0,this.structures?.updateGhost(null,0,0,0,0,!1)):this.boats?.updateGhost(null,0,0,0,!1)},onSetSailGear:e=>{this.sailGear=e,this.net.sendBoatControl({steer:0,throttle:e}),this.audio.playSfx("ui")},onDisembarkBoat:()=>{this.getLocalPlayerState()?.boatId&&(this.sailGear=0,this.net.sendBoardBoat(null))},onOpenBoatCargo:()=>this.openActiveBoatCargo(),onChestTransfer:(e,n,i)=>this.net.sendChestTransfer({structureId:e,from:n,fromIndex:i}),onBoatChestTransfer:(e,n,i)=>this.net.sendBoatChestTransfer({boatId:e,from:n,fromIndex:i}),onSendChat:e=>this.net.sendChat(e),onRespawn:()=>this.net.sendRespawn(),onTogglePvp:()=>this.net.sendTogglePvp(),onSpawnBot:()=>this.net.sendSpawnBot(),onSetQuality:e=>this.applyQuality(e),onSetVolume:e=>this.audio.setVolume(e),onSetTouchMode:e=>this.touch.setMode(e),onOpenMap:()=>this.togglePanel("map"),onResumeGame:()=>{this.syncInputFlags(),this.touch.enabled||this.input.requestPointerLock()}}),this.touch=new yo(t,{onPrimaryDown:()=>this.onPrimaryDown(),onPrimaryUp:()=>this.onPrimaryUp(),onInteract:()=>this.onInteract(),onDodge:()=>this.onDodge(),onRotateBuild:()=>{this.buildRotY=(this.buildRotY+Math.PI/4)%(Math.PI*2),this.audio.playSfx("ui")},onCancelBuild:()=>{this.activeBuildKind=null,this.activeBuildFromSlot=void 0,this.activeBoatKind=null,this.structures?.updateGhost(null,0,0,0,0,!1),this.boats?.updateGhost(null,0,0,0,!1)},onOpenInventory:()=>this.togglePanel("inventory"),onOpenCrafting:()=>this.togglePanel("crafting"),onOpenBuild:()=>this.togglePanel("build"),onOpenMap:()=>this.togglePanel("map"),onToggleCamera:()=>{this.firstPerson=!this.firstPerson,this.localVisual&&(this.localVisual.group.visible=!this.firstPerson),this.ui.showToast(this.firstPerson?"First-Person Camera":"Third-Person Camera","info")},onToggleChat:()=>this.toggleChat(),onOpenPause:()=>this.togglePanel("pause")}),this.input=new Wg(t,{onHotbarSelect:e=>this.selectHotbar(e),onPrimaryDown:()=>this.onPrimaryDown(),onPrimaryUp:()=>this.onPrimaryUp(),onSecondaryDown:()=>this.onSecondaryDown(),onInteract:()=>this.onInteract(),onDodge:()=>this.onDodge(),onToggleCamera:()=>{this.firstPerson=!this.firstPerson,this.localVisual&&(this.localVisual.group.visible=!this.firstPerson),this.ui.showToast(this.firstPerson?"First-Person Camera":"Third-Person Camera","info")},onToggleBuild:()=>this.togglePanel("build"),onRotateBuild:()=>{this.buildRotY=(this.buildRotY+Math.PI/4)%(Math.PI*2),this.audio.playSfx("ui")},onToggleInventory:()=>this.togglePanel("inventory"),onToggleCrafting:()=>this.togglePanel("crafting"),onToggleMap:()=>this.togglePanel("map"),onToggleChat:()=>this.toggleChat(),onTogglePause:()=>{this.ui.chatOpen?(this.ui.setChatOpen(!1),this.syncInputFlags()):this.ui.activePanel!=="none"?(this.ui.setPanel("none"),this.syncInputFlags(),this.input.requestPointerLock()):this.activeBuildKind||this.activeBoatKind?(this.activeBuildKind=null,this.activeBoatKind=null,this.structures?.updateGhost(null,0,0,0,0,!1),this.boats?.updateGhost(null,0,0,0,!1)):this.inGame&&this.togglePanel("pause")},onEmote:e=>{this.inGame&&this.net.sendEmote(e)}}),window.addEventListener("keydown",e=>{e.code==="KeyF"&&this.inGame&&this.ui.activePanel==="none"&&!this.ui.chatOpen&&this.openActiveBoatCargo()}),window.addEventListener("resize",()=>{const e=window.innerWidth,n=window.innerHeight;this.camera.aspect=e/n,this.camera.fov=this.computeResponsiveFov(e,n),this.camera.updateProjectionMatrix(),this.renderer.setSize(e,n)}),this.animate()}computeResponsiveFov(t,e){const n=t/Math.max(1,e);return n<1?Bt(68+(1-n)*34,68,92):68}buildWorldScene(t){if(this.currentSeed===t)return;this.currentSeed=t,this.terrainMesh&&this.scene.remove(this.terrainMesh),this.water&&this.scene.remove(this.water.mesh),this.env&&this.scene.remove(this.env.root),this.structures&&this.scene.remove(this.structures.group),this.boats&&this.scene.remove(this.boats.group),this.livingFX&&this.scene.remove(this.livingFX.group),this.wildlife&&this.scene.remove(this.wildlife.group),this.effects&&this.scene.remove(this.effects.group),this.world=new Wl(t);const{mesh:e,heightTexture:n}=H0(this.world,this.textures);this.terrainMesh=e,this.scene.add(e),this.water=new W0(n),this.scene.add(this.water.mesh),this.env=new X0(this.scene,this.world,this.textures,this.isTouchDevice?3600:7500),this.env.syncNodes(this.world.generateResourceNodes()),this.structures=new q0(this.scene,this.textures),this.boats=new $0(this.scene,this.world,this.textures),this.livingFX=new Y0(this.scene,this.world,this.textures),this.wildlife=new K0(this.scene),this.effects=new j0(this.scene,this.textures);const i=document.getElementById("minimap-canvas"),s=document.getElementById("fullmap-canvas");this.minimap=new Xg(this.world,i,s)}applyQuality(t){this.renderer.setPixelRatio(t==="high"?Math.min(window.devicePixelRatio,2):t==="medium"?1.25:.85),this.sky.setShadowQuality(t),this.ui.showToast(`Graphics Quality set to ${t.toUpperCase()}`,"info")}async joinGame(t){this.audio.unlock(),t.serverUrl!==void 0&&this.net.setServerUrl(t.serverUrl);try{await this.net.connect({onSnapshot:i=>this.handleSnapshot(i),onPrivateState:i=>{this.privateState=i,this.ui.refreshPanelIfOpen(this.ui.openChestId?this.structureMap.get(this.ui.openChestId):void 0,this.ui.openBoatCargoId?this.boatMap.get(this.ui.openBoatCargoId):void 0)},onNodeUpdate:i=>{this.nodeMap.set(i.id,i),this.env?.upsertNode(i)},onNodeFell:({id:i,dirX:s,dirZ:r})=>{const a=this.env?.getNodeVisualClone(i);a&&this.effects?.spawnFallingTree(a,s,r)},onStructureAdd:i=>{this.structureMap.set(i.id,i),this.structures?.upsert(i)},onStructureUpdate:i=>{this.structureMap.set(i.id,i),this.structures?.upsert(i),this.ui.openChestId===i.id&&this.ui.refreshPanelIfOpen(i)},onStructureRemove:i=>{this.structureMap.delete(i),this.structures?.remove(i),this.ui.openChestId===i&&(this.ui.setPanel("none"),this.syncInputFlags())},onBoatAdd:i=>{this.boatMap.set(i.id,i),this.boats?.addBoat(i)},onBoatUpdate:i=>{this.boatMap.set(i.id,i),this.boats?.updateBoatState(i),this.ui.openBoatCargoId===i.id&&this.ui.refreshPanelIfOpen(void 0,i)},onBoatRemove:i=>{this.boatMap.delete(i),this.boats?.removeBoat(i),this.ui.openBoatCargoId===i&&(this.ui.setPanel("none"),this.syncInputFlags())},onLootAdd:i=>this.effects?.addLoot(i),onLootRemove:i=>this.effects?.removeLoot(i),onCombatEvent:i=>this.projectFloatingText(i.x,i.y,i.z,i.text,i.color),onFxEvent:i=>this.handleFxEvent(i),onChatMessage:i=>this.ui.appendChat(i),onToast:({text:i,tone:s})=>this.ui.showToast(i,s),onConnectionChange:i=>{!i&&this.inGame&&this.ui.showToast("Connection interrupted — attempting to reconnect...","danger")}});const e=await this.net.joinRoom({roomId:t.roomId,roomName:t.roomName,seed:t.seed,playerName:t.playerName,outfit:t.outfit,spawnAiCompanions:t.spawnAiCompanions});this.buildWorldScene(e.room.seed),this.localId=e.playerId,this.landmarks=e.landmarks,this.worldTime=e.time,this.privateState=e.privateState,this.allPlayers=e.players,this.nodeMap.clear();for(const i of e.nodes)this.nodeMap.set(i.id,i);this.env?.syncNodes(e.nodes),this.structureMap.clear();for(const i of e.structures)this.structureMap.set(i.id,i);this.structures?.syncAll(e.structures),this.boatMap.clear();for(const i of e.boats)this.boatMap.set(i.id,i);this.boats?.syncAll(e.boats),this.wildlife?.sync(e.wildlife),this.effects?.syncLootAll(e.loot);for(const i of e.chatHistory)this.ui.appendChat(i);const n=e.players.find(i=>i.id===this.localId);n&&(this.pos.set(n.x,n.y,n.z),this.input.yaw=n.yaw,this.localVisual&&this.scene.remove(this.localVisual.group),this.localVisual=new nl(n.outfit,!1),this.localVisual.group.position.copy(this.pos),this.scene.add(this.localVisual.group)),this.inGame=!0,this.ui.hideTitleScreen(),this.syncInputFlags(),this.touch.enabled||this.input.requestPointerLock(),this.ui.showToast(this.net.isOfflineMode?`Entered ${e.room.name} (Offline / GitHub Pages Mode)`:`Entered ${e.room.name} (Seed ${e.room.seed})`,"good")}catch(e){this.ui.showToast(e instanceof Error?e.message:"Unable to connect to server","danger")}}handleSnapshot(t){if(this.worldTime=t.time,this.allPlayers=t.players,this.wildlife?.sync(t.wildlife),this.effects?.syncProjectiles(t.projectiles),t.boats){this.boatMap.clear();for(const n of t.boats)this.boatMap.set(n.id,n);this.boats?.syncAll(t.boats)}const e=new Set;for(const n of t.players){if(n.id===this.localId){(!n.alive||this.pos.distanceTo(new D(n.x,n.y,n.z))>7.5)&&this.pos.set(n.x,n.y,n.z);continue}e.add(n.id);let i=this.remotePlayers.get(n.id);if(!i){const s=new nl(n.outfit,!0);s.group.position.set(n.x,n.y,n.z),s.group.traverse(r=>{r.userData.playerId=n.id}),this.scene.add(s.group),i={visual:s,targetPos:new D(n.x,n.y,n.z),targetYaw:n.yaw,state:n},this.remotePlayers.set(n.id,i)}i.targetPos.set(n.x,n.y,n.z),i.targetYaw=n.yaw,i.state=n}for(const[n,i]of Array.from(this.remotePlayers.entries()))e.has(n)||(this.scene.remove(i.visual.group),this.remotePlayers.delete(n))}handleFxEvent(t){if(t.kind==="thunder"){this.sky.triggerLightning(),this.audio.playSfx("thunder");return}const e=Math.hypot(t.x-this.pos.x,t.z-this.pos.z);e<42&&(t.kind==="chop"?(this.audio.playSfx("chop"),this.effects?.spawnBurst(t.x,t.y,t.z,"#a66b3a",9,4.4)):t.kind==="mine"?(this.audio.playSfx("mine"),this.effects?.spawnBurst(t.x,t.y,t.z,"#fbbf24",10,5)):t.kind==="hit"||t.kind==="arrow_hit"?(this.audio.playSfx("hit"),this.effects?.spawnBurst(t.x,t.y,t.z,t.color||"#f87171",10,4.8),e<2.2&&(this.screenShake=.24,this.hitFlash=1)):t.kind==="build"?(this.audio.playSfx("build"),this.effects?.spawnBurst(t.x,t.y,t.z,"#d6c3a5",12,3.6)):t.kind==="eat"?this.audio.playSfx("eat"):t.kind==="drink"?this.audio.playSfx("drink"):t.kind==="levelup"&&(this.audio.playSfx("levelup"),this.effects?.spawnBurst(t.x,t.y,t.z,"#38f2dc",20,6.2,4)))}projectFloatingText(t,e,n,i,s){const r=new D(t,e,n).project(this.camera);if(r.z>1)return;const a=(r.x*.5+.5)*window.innerWidth,c=(-r.y*.5+.5)*window.innerHeight;this.ui.spawnFloatingText(a,c,i,s)}selectHotbar(t){if(!this.inGame)return;this.net.sendEquip(t),this.audio.playSfx("ui");const e=this.privateState?.inventory[t],n=Ue(e?.itemId);n?.structureKind?(this.activeBuildKind=n.structureKind,this.activeBuildFromSlot=t):n?.toolKind!=="hammer"&&(this.activeBuildKind=null,this.activeBuildFromSlot=void 0,this.structures?.updateGhost(null,0,0,0,0,!1))}togglePanel(t){this.inGame&&(this.ui.activePanel===t?(this.ui.setPanel("none"),this.syncInputFlags(),this.input.requestPointerLock()):(this.ui.setChatOpen(!1),this.ui.setPanel(t),this.syncInputFlags(),this.input.exitPointerLock(),t==="map"&&this.minimap?.renderFullMap(this.pos.x,this.pos.z,this.localId,this.allPlayers,Array.from(this.structureMap.values()),this.landmarks,Array.from(this.boatMap.values()))))}toggleChat(){if(!this.inGame||this.ui.activePanel!=="none")return;const t=!this.ui.chatOpen;this.ui.setChatOpen(t),this.syncInputFlags(),t?this.input.exitPointerLock():this.input.requestPointerLock()}syncInputFlags(){this.input.uiOpen=this.ui.activePanel!=="none",this.input.chatOpen=this.ui.chatOpen}getLocalPlayerState(){return this.allPlayers.find(t=>t.id===this.localId)}openActiveBoatCargo(){const t=this.getLocalPlayerState();if(!t?.boatId)return;const e=this.boatMap.get(t.boatId);if(!e||ln[e.kind].cargoSlots<=0){this.ui.showToast("This vessel has no cargo hold. Craft a Skiff or Longship!","info");return}this.ui.setPanel("boat_cargo",void 0,e),this.syncInputFlags(),this.input.exitPointerLock()}onPrimaryDown(){const t=this.getLocalPlayerState();if(!t||!t.alive)return;if(this.activeBoatKind&&this.boatGhostPos){if(!this.boatGhostPos.valid){this.ui.showToast("Aim at deeper coastal water to launch this boat!","warn");return}this.net.sendBuildBoat({kind:this.activeBoatKind,x:this.boatGhostPos.x,z:this.boatGhostPos.z,rotY:this.boatGhostPos.rotY}),this.activeBoatKind=null,this.boatGhostPos=null,this.boats?.updateGhost(null,0,0,0,!1);return}if(this.activeBuildKind&&this.ghostPlacement){if(!this.ghostPlacement.valid){this.ui.showToast("Cannot place structure here!","warn");return}this.net.sendBuild({kind:this.activeBuildKind,x:this.ghostPlacement.x,y:this.ghostPlacement.y,z:this.ghostPlacement.z,rotY:this.ghostPlacement.rotY,fromItemSlot:this.activeBuildFromSlot}),this.activeBuildFromSlot!==void 0&&(this.activeBuildKind=null,this.activeBuildFromSlot=void 0,this.structures?.updateGhost(null,0,0,0,0,!1));return}const e=Ue(t.equippedItemId);if(e?.id==="spyglass"){this.spyglassActive=!0,this.ui.setSpyglassActive(!0),this.audio.playSfx("ui");return}if(e?.id==="fishing_rod"){if(this.fishing.active){this.fishing.biteWindow>0?(this.net.sendFishCatch(this.fishing.deepWater),this.audio.playSfx("drink"),this.effects?.spawnBurst(this.fishing.bobberX,Pt+.3,this.fishing.bobberZ,"#7dd3fc",12,4.5)):this.ui.showToast("Reeled in early — wait for the fish bite splash!","info"),this.fishing.active=!1,this.livingFX?.setFishingBobber(!1,this.pos,0,0,!1);return}const n=new D(0,0,-1).applyQuaternion(this.camera.quaternion),i=this.pos.x+n.x*11,s=this.pos.z+n.z*11,r=this.world.getHeight(i,s);if(!(r<Pt-.15||t.status.nearFreshWater||!!t.boatId)){this.ui.showToast("Face ocean water, a dock, or Crystal Spring to cast your line!","warn");return}this.fishing={active:!0,bobberX:i,bobberZ:s,timer:2.4+Math.random()*2.8,biteWindow:0,deepWater:r<-2.6},this.audio.playSfx("arrow"),this.ui.showToast(this.fishing.deepWater?"🎣 Cast into Deep Sea! Watch for a Golden Snapper bite...":"🎣 Line cast! Wait for the bobber to dip...","info");return}if(e?.category==="consumable"){this.net.sendConsume(t.equippedSlot);return}if(e?.isRanged){this.chargingBow=!0,this.bowCharge=.25;return}this.localSwingTime=.36,this.firePrimaryAction(0)}onPrimaryUp(){this.spyglassActive&&(this.spyglassActive=!1,this.ui.setSpyglassActive(!1)),this.chargingBow&&(this.chargingBow=!1,this.audio.playSfx("arrow"),this.firePrimaryAction(this.bowCharge),this.bowCharge=0,this.ui.setBowCharge(0))}onSecondaryDown(){if(this.activeBoatKind){this.activeBoatKind=null,this.boatGhostPos=null,this.boats?.updateGhost(null,0,0,0,!1),this.ui.showToast("Exited Vessel Placement","info");return}if(this.activeBuildKind){this.activeBuildKind=null,this.activeBuildFromSlot=void 0,this.structures?.updateGhost(null,0,0,0,0,!1),this.ui.showToast("Exited Build Preview","info");return}const t=this.getLocalPlayerState();if(!t||!t.alive)return;const e=Ue(t.equippedItemId);e?.toolKind==="hammer"&&this.aimStructureId?this.net.sendDemolish(this.aimStructureId):e?.toolKind==="hammer"&&this.togglePanel("build")}onInteract(){const t=this.getLocalPlayerState();if(!(!t||!t.alive)){if(t.boatId){this.sailGear=0,this.net.sendBoardBoat(null);return}if(this.aimBoatId){this.sailGear=0,this.net.sendBoardBoat(this.aimBoatId);return}for(const e of this.boatMap.values())if(Math.hypot(e.x-this.pos.x,e.z-this.pos.z)<4.5&&!e.pilotId){this.sailGear=0,this.net.sendBoardBoat(e.id);return}if(this.aimStructureId){const e=this.structureMap.get(this.aimStructureId);if(e?.kind==="storage_chest"){this.ui.setPanel("chest",e),this.syncInputFlags(),this.input.exitPointerLock();return}if(e){this.net.sendInteract({structureId:e.id});return}}if(this.aimLootId){this.net.sendInteract({lootId:this.aimLootId});return}if(t.status.nearFreshWater){this.net.sendInteract({drinkWater:!0});return}this.aimNodeId&&this.firePrimaryAction(0)}}onDodge(){const t=this.computeMoveInputDir();t.lengthSq()<.01&&t.set(-Math.sin(this.input.yaw),0,-Math.cos(this.input.yaw)),this.net.sendDodge({x:t.x,z:t.z}),this.pos.x=Bt(this.pos.x+t.x*3.1,-212,212),this.pos.z=Bt(this.pos.z+t.z*3.1,-212,212)}firePrimaryAction(t){const e=new D(0,0,-1).applyQuaternion(this.camera.quaternion).normalize();this.net.sendAction({aimX:this.pos.x+e.x*4,aimY:this.pos.y+1.4+e.y*4,aimZ:this.pos.z+e.z*4,dirX:e.x,dirY:e.y,dirZ:e.z,charge:t,targetNodeId:this.aimNodeId,targetWildlifeId:this.aimWildlifeId,targetPlayerId:this.aimPlayerId,targetStructureId:this.aimStructureId})}computeMoveInputDir(){const t=new D(-Math.sin(this.input.yaw),0,-Math.cos(this.input.yaw)),e=new D(Math.cos(this.input.yaw),0,-Math.sin(this.input.yaw)),n=new D;return(this.input.keys.has("KeyW")||this.input.keys.has("ArrowUp"))&&n.add(t),(this.input.keys.has("KeyS")||this.input.keys.has("ArrowDown"))&&n.sub(t),(this.input.keys.has("KeyD")||this.input.keys.has("ArrowRight"))&&n.add(e),(this.input.keys.has("KeyA")||this.input.keys.has("ArrowLeft"))&&n.sub(e),(Math.abs(this.touch.moveX)>.08||Math.abs(this.touch.moveY)>.08)&&(n.addScaledVector(t,this.touch.moveY),n.addScaledVector(e,this.touch.moveX)),n.lengthSq()>1&&n.normalize(),n}getSupportHeight(t,e){let n=this.world.getHeight(t,e);if(this.livingFX){const i=this.world.getHarborJettySpot();Math.abs(t-i.x)<2.25&&e>=i.z-2&&e<=i.z+18&&(n=Math.max(n,Pt+.65))}for(const i of this.structureMap.values())(i.kind==="wood_foundation"||i.kind==="dock_pier")&&Math.abs(t-i.x)<1.72&&Math.abs(e-i.z)<1.72&&(n=Math.max(n,i.y+(i.kind==="dock_pier"?.52:.53)));return n}updateLocalPlayer(t){const e=this.getLocalPlayerState();if(!e)return;const n=this.input.consumeWheel();if(n!==0){const f=(e.equippedSlot+(n>0?1:-1)+9)%9;this.selectHotbar(f)}this.chargingBow&&(this.bowCharge=Math.min(1,this.bowCharge+t*.95),this.ui.setBowCharge(this.bowCharge));const i=this.computeResponsiveFov(window.innerWidth,window.innerHeight),s=this.spyglassActive?21:this.chargingBow?i-8:i;if(Math.abs(this.camera.fov-s)>.1&&(this.camera.fov+=(s-this.camera.fov)*Math.min(1,t*11),this.camera.updateProjectionMatrix()),this.fishing.active){if(e.equippedItemId!=="fishing_rod")this.fishing.active=!1,this.livingFX?.setFishingBobber(!1,this.pos,0,0,!1);else if(this.fishing.biteWindow>0?(this.fishing.biteWindow-=t,this.fishing.biteWindow<=0&&(this.ui.showToast("The fish slipped off the hook! Cast again.","warn"),this.fishing.active=!1,this.livingFX?.setFishingBobber(!1,this.pos,0,0,!1))):(this.fishing.timer-=t,this.fishing.timer<=0&&(this.fishing.biteWindow=2.6,this.audio.playFootstep("water"),this.effects?.spawnBurst(this.fishing.bobberX,Pt+.25,this.fishing.bobberZ,"#e0f2fe",10,3.6),this.ui.showToast("🐟 BITE! Click / Tap ACT now to reel it in!","good"))),this.fishing.active){const f=this.pos.clone().add(new D(0,1.85,0));this.livingFX?.setFishingBobber(!0,f,this.fishing.bobberX,this.fishing.bobberZ,this.fishing.biteWindow>0)}}let r="idle",a=!1,c=!1;const l=e.boatId?this.boatMap.get(e.boatId)??null:null;if(l&&e.alive&&!this.input.uiOpen&&!this.input.chatOpen){const f=this.touch.consumeLookDelta();(f.dx!==0||f.dy!==0)&&(this.input.yaw-=f.dx*.0052,this.input.pitch=Bt(this.input.pitch+f.dy*.0044,-.75,1.15)),this.sailGearCooldown=Math.max(0,this.sailGearCooldown-t);const g=this.input.keys.has("KeyW")||this.input.keys.has("ArrowUp"),v=this.input.keys.has("KeyS")||this.input.keys.has("ArrowDown");g&&this.sailGearCooldown<=0&&this.sailGear<3?(this.sailGear=this.sailGear+1,this.sailGearCooldown=.24):v&&this.sailGearCooldown<=0&&this.sailGear>-1&&(this.sailGear=this.sailGear-1,this.sailGearCooldown=.24),Math.abs(this.touch.moveY)>.2&&(this.touch.moveY>.72?this.sailGear=3:this.touch.moveY>.38?this.sailGear=2:this.touch.moveY>.15?this.sailGear=1:this.touch.moveY<-.35&&(this.sailGear=-1));let p=0;(this.input.keys.has("KeyA")||this.input.keys.has("ArrowLeft"))&&(p+=1),(this.input.keys.has("KeyD")||this.input.keys.has("ArrowRight"))&&(p-=1),Math.abs(this.touch.moveX)>.12&&(p=Bt(-this.touch.moveX,-1,1)),this.boatCtrlTimer+=t,this.boatCtrlTimer>=.06&&(this.boatCtrlTimer=0,this.net.sendBoatControl({steer:p,throttle:this.sailGear}));const m=this.boats?.getHelmWorldPos(l.id);m?this.pos.lerp(m,Math.min(1,t*16)):this.pos.set(l.x,l.y+.55,l.z),this.vel.set(0,0,0),r="idle"}else if(e.alive&&!this.input.uiOpen&&!this.input.chatOpen){const f=this.touch.consumeLookDelta();(f.dx!==0||f.dy!==0)&&(this.input.yaw-=f.dx*.0052,this.input.pitch=Bt(this.input.pitch+f.dy*.0044,-.95,1.22));const g=this.computeMoveInputDir(),v=(this.input.keys.has("ShiftLeft")||this.input.keys.has("ShiftRight")||this.touch.sprinting)&&e.vitals.stamina>6;c=this.getSupportHeight(this.pos.x,this.pos.z)<I0&&this.pos.y<=Pt-.15;const m=c?3.9:v&&g.lengthSq()>.04?8.2:5.1;a=v&&!c&&g.lengthSq()>.04;const w=g.x*m,b=g.z*m,x=this.grounded||c?14:5;if(this.vel.x+=(w-this.vel.x)*Math.min(1,t*x),this.vel.z+=(b-this.vel.z)*Math.min(1,t*x),(this.input.keys.has("Space")||this.touch.jumping)&&(c?this.vel.y=2.6:this.grounded&&(this.vel.y=7.4,this.grounded=!1)),c){const y=Pt-.55;this.vel.y+=(y-this.pos.y)*9*t,this.vel.y*=.88}else this.vel.y-=20.5*t;const I=Bt(this.pos.x+this.vel.x*t,-212,212),E=Bt(this.pos.z+this.vel.z*t,-212,212);this.collidesWithSolidStructure(I,E,this.pos.y)?(this.vel.x=0,this.vel.z=0):(this.pos.x=I,this.pos.z=E),this.pos.y+=this.vel.y*t;const A=this.getSupportHeight(this.pos.x,this.pos.z);!c&&this.pos.y<=A?(this.pos.y=A,this.vel.y=0,this.grounded=!0):c&&this.pos.y<A&&(this.pos.y=A);const R=Math.hypot(this.vel.x,this.vel.z);if(c?r="swim":this.grounded?R>6.2?r="run":R>.55&&(r="walk"):r="jump",R>1.2&&(this.grounded||c)&&(this.footstepTimer-=t*(a?1.45:1),this.footstepTimer<=0)){this.footstepTimer=.42;const y=this.world.sample(this.pos.x,this.pos.z),_=this.pos.y<Pt+.15?"water":y.biome==="beach"?"sand":y.biome==="volcanic"||y.biome==="highland"?"stone":"grass";this.audio.playFootstep(_)}}else this.vel.set(0,0,0),r=e.alive?"idle":"dead";this.localSwingTime>0&&(this.localSwingTime=Math.max(0,this.localSwingTime-t)),this.hitFlash>0&&(this.hitFlash=Math.max(0,this.hitFlash-t*2.8)),this.localVisual&&(this.localVisual.group.position.copy(this.pos),this.localVisual.group.rotation.y=this.input.yaw+Math.PI,this.localVisual.group.visible=!this.firstPerson,this.localVisual.animate(t,{...e,vx:this.vel.x,vz:this.vel.z,anim:r,swingTime:Math.max(e.swingTime,this.localSwingTime)},this.elapsed));const h=this.pos.y+1.62,d=new hn(-this.input.pitch,this.input.yaw,0,"YXZ"),u=new D(0,0,-1).applyEuler(d);if(this.firstPerson)this.camera.position.set(this.pos.x,h,this.pos.z),this.camera.lookAt(this.pos.x+u.x*10,h+u.y*10,this.pos.z+u.z*10);else{const f=l?.kind==="longship"?12.8:l?.kind==="skiff"?9.2:l?7.8:4.8,g=this.chargingBow?3.1:f,v=new D(Math.cos(this.input.yaw),0,-Math.sin(this.input.yaw)),p=new D(this.pos.x,h+(l?1.85:.35),this.pos.z).addScaledVector(u,-g).addScaledVector(v,l?0:.55),m=Math.max(this.world.getHeight(p.x,p.z),Pt)+.55;p.y<m&&(p.y=m),this.screenShake>0&&(this.screenShake=Math.max(0,this.screenShake-t),p.x+=(Math.random()-.5)*this.screenShake*.6,p.y+=(Math.random()-.5)*this.screenShake*.6),this.camera.position.copy(p),this.camera.lookAt(this.pos.x+u.x*16+v.x*.25,h+u.y*16,this.pos.z+u.z*16+v.z*.25)}this.netSendTimer+=t,this.netSendTimer>=.05&&(this.netSendTimer=0,this.net.sendInput({x:Math.round(this.pos.x*100)/100,y:Math.round(this.pos.y*100)/100,z:Math.round(this.pos.z*100)/100,vx:Math.round(this.vel.x*100)/100,vy:Math.round(this.vel.y*100)/100,vz:Math.round(this.vel.z*100)/100,yaw:Math.round((this.input.yaw+Math.PI)*1e3)/1e3,pitch:Math.round(this.input.pitch*1e3)/1e3,anim:r,sprinting:a,swimming:c,seq:++this.inputSeq}))}collidesWithSolidStructure(t,e,n){for(const i of this.structureMap.values()){const s=hi[i.kind];if(!s.solidCollision||i.kind==="wood_doorway"&&i.isOpen||n>i.y+s.height-.2)continue;const r=t-i.x,a=e-i.z,c=Math.cos(-i.rotY),l=Math.sin(-i.rotY),h=r*c-a*l,d=r*l+a*c;if(Math.abs(h)<s.width*.48+.35&&Math.abs(d)<s.depth*.48+.35)return!0}return!1}updateTargetingAndBuildGhost(){this.aimNodeId=void 0,this.aimWildlifeId=void 0,this.aimStructureId=void 0,this.aimBoatId=void 0,this.aimLootId=void 0,this.aimPlayerId=void 0;const t=this.getLocalPlayerState();if(!t||!t.alive||this.ui.activePanel!=="none"){this.ui.setInteractPrompt(null),this.structures?.updateGhost(null,0,0,0,0,!1),this.boats?.updateGhost(null,0,0,0,!1);return}if(this.raycaster.setFromCamera(this.centerNDC,this.camera),this.activeBoatKind){const a=new Xn(new D(0,1,0),-Pt),c=new D;if(!this.raycaster.ray.intersectPlane(a,c)||c.distanceTo(this.pos)>22){const v=new D(0,0,-1).applyQuaternion(this.camera.quaternion);c.set(this.pos.x+v.x*8.5,Pt,this.pos.z+v.z*8.5)}const h=Math.hypot(c.x-this.pos.x,c.z-this.pos.z)<=18,u=this.world.getHeight(c.x,c.z)<Pt-.35,f=h&&u;this.boatGhostPos={x:c.x,z:c.z,rotY:this.buildRotY,valid:f},this.boats?.updateGhost(this.activeBoatKind,c.x,c.z,this.buildRotY,f);const g=ln[this.activeBoatKind];this.ui.setInteractPrompt(f?`[LMB] Launch ${g.name} into Sea`:`Aim at deeper water to launch ${g.name}`,"[R] Rotate Hull • [RMB] Cancel • [B] Shipyard");return}else this.boatGhostPos=null,this.boats?.updateGhost(null,0,0,0,!1);if(this.activeBuildKind&&this.terrainMesh){const a=this.raycaster.intersectObject(this.terrainMesh,!1);let c;if(a.length>0&&a[0].distance<18)c=a[0].point;else{const v=new D(0,0,-1).applyQuaternion(this.camera.quaternion);c=this.pos.clone().addScaledVector(v,5.5)}const l=ql(this.activeBuildKind,{x:c.x,y:c.y,z:c.z},this.buildRotY,Array.from(this.structureMap.values()),(v,p)=>this.world.getHeight(v,p)),h=Math.hypot(l.x-this.pos.x,l.z-this.pos.z)<=12.5,u=this.activeBuildKind==="dock_pier"?this.world.getHeight(l.x,l.z)<=Pt+1.8:this.world.getHeight(l.x,l.z)>=Pt-.1,f=h&&u;this.ghostPlacement={...l,valid:f},this.structures?.updateGhost(this.activeBuildKind,l.x,l.y,l.z,l.rotY,f);const g=hi[this.activeBuildKind];this.ui.setInteractPrompt(`[LMB] Place ${g.name}${l.snapped?" (Snapped)":""}`,"[R] Rotate • [RMB] Cancel • [B] Blueprints");return}else this.ghostPlacement=null,this.structures?.updateGhost(null,0,0,0,0,!1);const e=[];this.boats&&!t.boatId&&e.push(this.boats.group),this.effects&&e.push(this.effects.lootGroup),this.wildlife&&e.push(this.wildlife.group),this.structures&&e.push(this.structures.group),this.env&&e.push(this.env.nodeGroup);for(const a of this.remotePlayers.values())e.push(a.visual.group);const n=this.raycaster.intersectObjects(e,!0);let i=null,s,r;for(const a of n){if(a.distance>11.5)break;const c=a.object.userData;if(!(a.point.distanceTo(this.pos)>6.8)){if(c.boatId&&!t.boatId){const h=this.boatMap.get(c.boatId);if(h){this.aimBoatId=h.id;const d=ln[h.kind];i=h.pilotId?`${d.name} (Piloted)`:`[E] Board & Sail ${d.name}`,s=d.cargoSlots>0?`W/S Sail Gears • A/D Rudder • [F] ${d.cargoSlots}-Slot Cargo`:"W/S Sail Gears • A/D Rudder • [E] Disembark",r=h.hp/h.maxHp*100;break}}if(c.lootId){this.aimLootId=c.lootId;const h=Ue(c.lootItemId);i=`[E] Pick up ${c.lootCount}× ${h?.name??c.lootItemId}`;break}if(c.wildlifeId){this.aimWildlifeId=c.wildlifeId,i=`[LMB] Hunt ${c.wildlifeKind.toUpperCase()}`;break}if(c.playerId&&t.pvpEnabled){this.aimPlayerId=c.playerId,i="[LMB] Duel Survivor";break}if(c.structureId){const h=this.structureMap.get(c.structureId);if(h){this.aimStructureId=h.id;const d=hi[h.kind];if(h.kind==="storage_chest")i="[E] Open Shared Chest";else if(h.kind==="wood_doorway")i=`[E] ${h.isOpen?"Close":"Open"} Timber Door`;else if(h.kind==="campfire")i=`[E] Refuel Campfire (Fuel ${Math.round(h.fuel??0)}%)`,s="Press [C] to roast meat & stew",r=h.fuel??0;else if(h.kind==="rain_collector")i=`[E] Drink Rainwater (${Math.round(h.waterLevel??0)}%)`,r=h.waterLevel??0;else if(h.kind==="planter_box"){const u=Math.round(h.cropProgress??0);i=u>=100?"[E] Harvest Sunbloom & Berries!":`Planter Box Growing (${u}%)`,r=u}else h.kind==="alchemy_cauldron"?(i="Alchemy Cauldron — Press [C] to Brew Elixirs",r=h.hp/h.maxHp*100):h.kind==="bedroll"?i="[E] Set Respawn Point":(i=`${d.name} (${h.hp}/${h.maxHp} HP)`,r=h.hp/h.maxHp*100);Ue(t.equippedItemId)?.toolKind==="hammer"&&h.ownerId!=="world"&&(s="[LMB] Repair • [RMB] Dismantle");break}}if(c.nodeId){const h=this.nodeMap.get(c.nodeId);if(h&&!h.depleted){this.aimNodeId=h.id;const d=Math.round(h.hp/h.maxHp*100);i=`[LMB] Harvest ${h.kind.replace(/_/g," ").replace(/\b\w/g,f=>f.toUpperCase())}`,r=d;break}}}}!i&&t.status.nearFreshWater&&(i="[E] Drink Crystal Spring Water",s="Restores +45 Thirst"),this.ui.setInteractPrompt(i,s,r)}animate=()=>{requestAnimationFrame(this.animate);const t=Math.min(.08,this.clock.getDelta());if(this.elapsed+=t,this.inGame){this.updateLocalPlayer(t),this.updateTargetingAndBuildGhost(),this.sky.update(t,this.elapsed,this.worldTime,this.pos);const n=Math.min(1,t*12);for(const s of this.remotePlayers.values()){s.visual.group.position.lerp(s.targetPos,n);let r=s.targetYaw-s.visual.group.rotation.y;for(;r>Math.PI;)r-=Math.PI*2;for(;r<-Math.PI;)r+=Math.PI*2;s.visual.group.rotation.y+=r*n,s.visual.animate(t,s.state,this.elapsed)}const i=this.getLocalPlayerState();if(i&&this.privateState){const s=this.world.sample(this.pos.x,this.pos.z),r={ocean:"Coastal Sea",beach:"Golden Shores",meadow:"Emerald Meadows",pine:"Whispering Pines",highland:"Granite Highlands",volcanic:"Obsidian Spire",marsh:"Misty Bog"};this.ui.updateHud(i,this.privateState,this.worldTime,r[s.biome]??"Wildreach",this.allPlayers.length,this.net.pingMs,this.input.yaw,this.input.pointerLocked,this.touch.enabled,this.net.isOfflineMode,this.input.pointerLockBlocked);const a=!!(this.aimBoatId||i.boatId||this.aimLootId||this.aimStructureId||i.status.nearFreshWater||this.aimNodeId);this.touch.setContextualState(a,!!(this.activeBuildKind||this.activeBoatKind),this.ui.activePanel==="none"&&!this.ui.chatOpen&&i.alive);const c=i.boatId?this.boatMap.get(i.boatId)??null:null;this.ui.updateSailingHud(c,this.worldTime.windDirX,this.worldTime.windDirZ);const l=Array.from(this.structureMap.values()),h=Array.from(this.boatMap.values());this.minimap?.renderHud(this.pos.x,this.pos.z,this.input.yaw,this.localId,this.allPlayers,l,this.landmarks,h);let d=99;for(const f of this.structures?.getLitCampfirePositions()??[])d=Math.min(d,f.distanceTo(this.pos));const u=Math.max(0,125-Math.hypot(this.pos.x,this.pos.z));this.audio.updateAmbient(t,this.worldTime,s.biome,d,u),this.ui.setScreenVignette({hitFlash:this.hitFlash,lowHp:i.vitals.hp<i.vitals.maxHp*.3,chilled:i.status.chilled,underwater:this.camera.position.y<Pt+.08,warmFire:i.status.nearCampfire&&(this.worldTime.timeOfDay<.25||this.worldTime.timeOfDay>.74)})}}else{const n=this.elapsed*.085,i=54,s=-10+Math.cos(n)*i,r=18+Math.sin(n)*i;this.camera.position.set(s,24+Math.sin(this.elapsed*.25)*3.5,r),this.camera.lookAt(-6,5.5,16),this.sky.update(t,this.elapsed,this.worldTime,this.camera.position)}const e=Bt(1-(this.sky.sunDirection.y+.08)*3.5,0,1);this.water?.update(this.elapsed,this.worldTime,this.sky.sunDirection,this.sky.sunLight.color,this.sky.horizonColor,this.sky.fog.color,this.sky.fog.density,e),this.env?.update(t,this.elapsed,this.worldTime.windSpeed),this.structures?.update(t,this.elapsed),this.boats?.update(t,this.elapsed,this.worldTime,e),this.livingFX?.update(t,this.elapsed,this.worldTime,e),this.wildlife?.update(t,this.elapsed,this.camera),this.effects?.update(t,this.elapsed,this.worldTime,this.inGame?this.pos:this.camera.position,this.structures?.getLitCampfirePositions()??[]),this.renderer.render(this.scene,this.camera)}}new $g;
