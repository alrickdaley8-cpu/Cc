import React from 'react';

// Original little sprites for the toolbox: no platform emoji or external image assets required.
export default function PixelIcon({type}) {
 const people={human:['#edc39c','#b97c4e','#edf2e2'],elf:['#f4d8ad','#b3dc85','#7fb45e'],dwarf:['#e6b386','#b76d44','#cc9165'],orc:['#9dc574','#4f744a','#c8826c']};
 const person=people[type];
 let art;
 if(person){art=<><path fill="#263d31" d="M8 28V17h3v-3H8V7h3V4h10v3h3v7h-3v3h3v11z"/><path fill={person[0]} d="M10 8h12v9H10z"/><path fill={person[1]} d="M10 5h12v4H10z"/><path fill={person[2]} d="M8 19h16v9H8z"/><path fill="#27392d" d="M12 11h2v2h-2zm6 0h2v2h-2z"/>{type==='dwarf'&&<path fill="#9f653e" d="M11 15h10v5h-3v2h-4v-2h-3z"/>}{type==='elf'&&<path fill="#f4d8ad" d="M6 9h4v5H8zm16 0h4v5h-2z"/>}</>}
 else switch(type){
  case 'soil': art=<><path fill="#765538" d="M3 15h26v13H3z"/><path fill="#aa7e4c" d="M3 19h26v3H3z"/><path fill="#67aa55" d="M3 12h26v6H3z"/><path fill="#a8d878" d="M7 9h5v4H7zm10 1h4v3h-4zm6-3h2v6h-2z"/></>;break;
  case 'water':case 'deep': art=<><path fill={type==='deep'?'#1c667c':'#48a5a6'} d="M3 5h26v23H3z"/><path fill={type==='deep'?'#3990a0':'#8dd6c3'} d="M5 10h8v2H5zm13 0h7v2h-7zM10 17h10v2H10zm13 3h4v2h-4zM5 24h6v2H5z"/></>;break;
  case 'sand':case 'desert': art=<><path fill="#d6b36d" d="M3 14h26v14H3z"/><path fill="#f2d599" d="M3 12h26v4H3zM7 21h3v2H7zm14 3h4v2h-4z"/>{type==='desert'&&<path fill="#58905c" d="M16 5h4v13h-4zm-4 4h3v5h2v3h-5zm8 2h3V8h3v6h-6z"/>}</>;break;
  case 'forest':case 'tree': art=<><path fill="#7a5535" d="M14 20h5v9h-5z"/><path fill="#2c6742" d="M5 20h22v4H5zm3-6h16v7H8zm3-6h10v7H11zm3-4h4v5h-4z"/><path fill="#7ebc68" d="M14 6h4v3h-4zm-4 7h5v2h-5zm9 4h5v2h-5z"/></>;break;
  case 'mountain': art=<><path fill="#718779" d="M2 28 12 8h4l4 8 3-5 7 17z"/><path fill="#bacbb5" d="m7 18 5-10h4l4 8-4-1-2 2-3-2z"/><path fill="#4f6b5c" d="M3 26h26v3H3z"/></>;break;
  case 'snow': art=<><path fill="#c9e8e5" d="M14 3h4v26h-4zM3 14h26v4H3zM7 6l19 19-3 3L4 9zm17 0 3 3L8 28l-3-3z"/><path fill="#f3ffff" d="M13 13h6v6h-6z"/></>;break;
  case 'flower':art=<><path fill="#4f9a59" d="M15 15h3v14h-3zm-5 7h5v3h-5zm8-4h5v3h-5z"/><path fill="#f6d59a" d="M12 4h8v4h4v8h-4v4h-8v-4H8V8h4z"/><path fill="#e8a848" d="M13 9h6v6h-6z"/></>;break;
  case 'rain':art=<><path fill="#a8cbd0" d="M6 9h4V6h11v3h4v3h3v6H4v-6h2z"/><path fill="#7ed4e0" d="M8 20h3v6H8zm7 2h3v6h-3zm7-2h3v6h-3z"/></>;break;
  case 'heal':art=<><path fill="#f3d77d" d="M14 3h4v8h6v4h-6v8h-4v-8H8v-4h6zM5 20h3v3h3v3H8v3H5v-3H2v-3h3zm20-16h2v3h3v2h-3v3h-2V9h-3V7h3z"/></>;break;
  case 'sheep': art=<><path fill="#f0e9d1" d="M5 10h4V7h12v3h4v12h-4v3H9v-3H5z"/><path fill="#927e66" d="M21 14h6v7h-6zM9 23h3v5H9zm10 0h3v5h-3z"/><path fill="#353c34" d="M24 16h2v2h-2z"/></>;break;
  case 'wolf':art=<><path fill="#8d9e91" d="M6 11h3V6h4v4h7V6h4v5h3v12h-4v4H10v-4H6z"/><path fill="#c7cdbb" d="M11 19h12v5H11z"/><path fill="#2a3b32" d="M10 14h3v3h-3zm10 0h3v3h-3zm-5 7h4v2h-4z"/></>;break;
  case 'enchanted':case 'corrupted':case 'infernal': art=<><path fill={type==='enchanted'?'#80b99e':type==='corrupted'?'#715774':'#9a513c'} d="M3 12h26v16H3z"/><path fill={type==='enchanted'?'#d9a6d3':type==='corrupted'?'#b28ba9':'#f4aa58'} d="M7 8h5v5H7zm12 0h4v4h-4zm-5 9h5v4h-5z"/><path fill="#e9dfb6" d="M9 6h2v2H9zm12 0h2v2h-2z"/></>;break;
  case 'stone':case 'iron':case 'gold': art=<><path fill="#556a5f" d="M4 24 8 12h4l3-5h6l7 17-3 4H7z"/><path fill={type==='gold'?'#eac86e':type==='iron'?'#b8c9cf':'#bcbcab'} d="M8 21l4-9h4l3-3h3l4 12-3 4H10z"/><path fill="#f0ecd4" d="M12 14h4v3h-4zm8 4h3v2h-3z"/></>;break;
  case 'zombie':case 'skeleton': art=<><path fill={type==='zombie'?'#8db66b':'#eee6cd'} d="M8 5h16v15H8z"/><path fill={type==='zombie'?'#57754b':'#9b9e8a'} d="M8 20h16v8H8z"/><path fill="#344438" d="M11 11h3v3h-3zm7 0h3v3h-3zm-4 6h5v2h-5z"/></>;break;
  case 'dragon':art=<><path fill="#a94d3b" d="M4 11h7l3-5h8l5 5v11h-4v4H10v-4H6z"/><path fill="#e39a63" d="M9 11h13v9H9z"/><path fill="#643b36" d="M3 6h5v7H3zm21 0h5v7h-5zM12 14h3v3h-3zm7 0h3v3h-3z"/></>;break;
  case 'immortal':case 'strong':case 'immune':case 'curse':case 'resetTraits':art=<><path fill={type==='curse'?'#aa7ab4':type==='immune'?'#8ccbb3':type==='strong'?'#df976a':'#e4c97e'} d="M6 5h20v16l-10 8L6 21z"/><path fill="#3b5143" d={type==='strong'?'M10 12h12v4H10zm4-4h4v12h-4z':type==='curse'?'M10 9h3v3h-3zm9 0h3v3h-3zm-6 7h6v3h-6z':type==='resetTraits'?'M10 10h12v3H10zm0 5h12v3H10z':'M14 8h4v11h-4zm-4 4h12v3H10z'}/></>;break;
  case 'fire':art=<><path fill="#d85139" d="M8 26 5 21l3-8 4 3 5-13 4 8-1 4 4-2 3 8-4 7H10z"/><path fill="#f5a84f" d="m11 25-1-5 4-5 2 3 3-6 3 8-2 6z"/><path fill="#f7dd82" d="m14 25 2-6 3 6z"/></>;break;
  case 'lightning':art=<path fill="#f7dc7a" d="M16 3 8 17h6l-2 12 12-17h-7l3-9z"/>;break;
  case 'meteor':art=<><path fill="#ee9f50" d="M24 3h5v4h-3v4h-4v4h-4l-3-3 4-4h4z"/><path fill="#d95740" d="M5 19h3v-4h9v3h4v7h-3v3H8v-3H5z"/><path fill="#f4bf72" d="M9 18h7v5H9z"/></>;break;
  case 'bomb':art=<><path fill="#cbb58a" d="M18 5h3v5h-3z"/><path fill="#f1cd68" d="M22 3h3v3h-3z"/><path fill="#25363a" d="M9 12h4V9h8v3h3v3h3v10h-3v3H8v-3H5V15h4z"/><path fill="#6c8983" d="M9 15h4v3H9z"/></>;break;
  case 'plague':art=<><path fill="#9a74bd" d="M13 3h5v4h4v3h4v5h3v4h-4v4h-3v4h-5v3h-4v-4H9v-3H6v-4H3v-5h4v-4h3V7h3z"/><path fill="#d0a4e8" d="M11 11h4v4h-4zm8 7h3v3h-3z"/></>;break;
  case 'tornado':art=<path fill="#c5d4ca" d="M3 6h26v4H3zm3 6h20v4H6zm3 6h14v3H9zm3 5h9v3h-9zm3 4h4v3h-4z"/>;break;
  case 'inspect':art=<><path fill="#e5d59d" d="M8 5h12v3h3v11h-3v3H8v-3H5V8h3zm2 3v3H8v6h2v2h8v-2h2v-6h-2V8z"/><path fill="#c1a36d" d="M20 20h3v3h3v3h3v3h-5v-3h-3v-3h-3z"/></>;break;
  case 'war':art=<><path fill="#d8dfcf" d="m4 4 5 2 11 12-3 3L6 9zm24 0-5 2-11 12 3 3L26 9z"/><path fill="#ae7c4c" d="m5 20 7 7 2-2-2-2 3-3-2-2-3 3-3-3zm22 0-7 7-2-2 2-2-3-3 2-2 3 3 3-3z"/></>;break;
  case 'inspire':art=<><path fill="#d7bf76" d="M5 24h22v4H5zm3-3h16v3H8zm3-9h10v9H11zm2-5h6v5h-6z"/><path fill="#fff0b8" d="M15 3h2v5h-2zm-5 5h2v2h-2zm10 0h2v2h-2zm-4 7h2v4h-2z"/></>;break;
  case 'demolish':art=<><path fill="#dec28d" d="M5 24h22v4H5zm2-7h18v7H7zm3-7h12v7H10z"/><path fill="#7b493d" d="m5 9 7-4 2 3-7 4zm8 2 7-4 6 7-3 3-4-4-5 3z"/><path fill="#d99b64" d="M14 17h3v6h-3z"/></>;break;
  case 'rebellion':art=<><path fill="#d5c291" d="M8 4h3v24H8z"/><path fill="#dd815f" d="M11 5h15l-4 6 4 6H11z"/><path fill="#f3e2bc" d="M16 8h3v6h-3zm-2 2h7v2h-7z"/></>;break;
  case 'peace':art=<><path fill="#e9ead9" d="M5 13h8V7h5v4h5v3h5v4h-4v4h-4v3h-9v-3H8v-3H5z"/><path fill="#9fc189" d="M4 24h9v2H4zm4-4h3v4H8z"/><path fill="#39493e" d="M21 13h2v2h-2z"/></>;break;
  case 'erase':art=<><path fill="#be8864" d="m4 20 12-13h6l7 7-12 13H9z"/><path fill="#edd8be" d="m9 23 9-10 6 6-9 8H9z"/></>;break;
  default:art=<path fill="#e4d091" d="M14 4h4v24h-4zM4 14h24v4H4z"/>;
 }
 return <svg viewBox="0 0 32 32" width="32" height="32" shapeRendering="crispEdges" aria-hidden="true">{art}</svg>;
}
