/*

Multitarget assembler (C) 2013 Martin Maly, http://www.maly.cz, http://www.webscript.cz

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

 Parser is based on ndef.parser, by Raphael Graf(r@undefined.ch)
 http://www.undefined.ch/mparser/index.html

 Ported to JavaScript and modified by Matthew Crumley (email@matthewcrumley.com, http://silentmatt.com/)

 You are free to use and modify this code in anyway you find useful. Please leave this comment in the code
 to acknowledge its original source. If you feel like it, I enjoy hearing about projects that use my code,
 but don't feel like you have to let me know or ask permission.
*/

/* jshint browser:true, jquery:true */
/*global define, Uint8Array*/
/* eslint-disable no-empty */

var ASM = {};
  var Parser = require("./parser.js").Parser;
!function(e,o){"undefined"!=typeof module?(module.exports=o(),ASM=module.exports):"function"==typeof define&&"object"==typeof define.amd?define(o):this.ASM=o()}(0,function(){"use strict";var e=null,o=null,n={},r=!1,a=function(e){return e.map(function(e){var o=e.line;for(o=(o=o.replace("&lt;","<")).replace("&gt;",">");" "==o[o.length-1];)o=o.substr(0,o.length-1);if(e.line=o," "!=o[0])return e;for(;" "==o[0];)o=o.substr(1);return e.line=" "+o,e})},t=function(e){return e.filter(function(e){for(var o=e.line;" "==o[0];)o=o.substr(1);return!!o.length})},l=function(e){return e.map(function(e){for(var o=e.line,n={addr:0,line:";;;EMPTYLINE",numline:e.numline};" "==o[0];)o=o.substr(1);return o.length?e:n})},s=function(e){var o=1;return e.map(function(e){return{line:e,numline:o++,addr:null,bytes:0}})},i=function(e){return e.replace(/^\s+|\s+$/g,"")},p=function(o,n,r,a){var t=o.line,l=t.match(/^\s*(\@{0,1}[a-zA-Z0-9-_]+):\s*(.*)/);l&&(o.label=l[1].toUpperCase(),t=l[2]);var s=t.match(/^\s*(\=)\s*(.*)/);if(s?(o.opcode=s[1].toUpperCase(),t=s[2]):(s=t.match(/^\s*([\.a-zA-Z0-9-_]+)\s*(.*)/))&&(o.opcode=s[1].toUpperCase(),t=s[2]),t){for(;t.match(/"(.*?);(.*?)"/g);)t=t.replace(/"(.*?);(.*?)"/g,'"$1§$2"');var c=t.match(/^\s*([^;]*)(.*)/);if(c&&c[1].length){o.paramstring=c[1];for(var f=c[1];f.match(/"(.*?),(.*?)"/g);)f=f.replace(/"(.*?),(.*?)"/g,'"$1€$2"');for(;f.match(/'(.*?),(.*?)'/g);)f=f.replace(/'(.*?),(.*?)'/g,'"$1€$2"');var d=f.match(/([0-9]+)\s*DUP\s*\((.*)\)/i);if(d){for(var u=parseInt(d[1]),h="",m=0;m<u;m++)h+=d[2]+",";f=h.substring(0,h.length-1)}var g=f.split(/\s*,\s*/);o.params=g.map(function(e){return i(e.replace(/€/g,",").replace(/§/g,";"))}),t=c[2].replace(/§/g,";")}}if(t){var v=t.match(/^\s*;*(.*)/);v&&(o.remark=v[1],o.remark||(o.remark=" "),t="")}if(o.notparsed=t,"ORG"===o.opcode&&(o.opcode=".ORG"),".ERROR"===o.opcode)throw{msg:o.paramstring,s:o};if(".EQU"===o.opcode&&(o.opcode="EQU"),".ORG"===o.opcode)try{return o}catch(e){throw{msg:e.message,s:o}}if("DEFB"===o.opcode)return o.opcode="DB",o;if(".BYTE"===o.opcode)return o.opcode="DB",o;if(".DB"===o.opcode)return o.opcode="DB",o;if(".WORD"===o.opcode)return o.opcode="DW",o;if(".DW"===o.opcode)return o.opcode="DW",o;if("DEFW"===o.opcode)return o.opcode="DW",o;if("DEFS"===o.opcode)return o.opcode="DS",o;if(".RES"===o.opcode)return o.opcode="DS",o;if("DEFM"===o.opcode)return o.opcode="DS",o;if(".ALIGN"===o.opcode)return o.opcode="ALIGN",o;if(".IF"===o.opcode)return o.opcode="IF",o;if(".ELSE"===o.opcode)return o.opcode="ELSE",o;if(".ENDIF"===o.opcode)return o.opcode="ENDIF",o;if("EQU"===o.opcode||"="===o.opcode||"IF"===o.opcode||"IFN"===o.opcode||"ELSE"===o.opcode||"ENDIF"===o.opcode||".INCLUDE"===o.opcode||".INCBIN"===o.opcode||".MACRO"===o.opcode||".ENDM"===o.opcode||".BLOCK"===o.opcode||".ENDBLOCK"===o.opcode||".REPT"===o.opcode||".CPU"===o.opcode||".ENT"===o.opcode||".BINFROM"===o.opcode||".BINTO"===o.opcode||".ENGINE"===o.opcode||".PRAGMA"===o.opcode||"END"===o.opcode||".END"===o.opcode||"BSZ"===o.opcode||"FCB"===o.opcode||"FCC"===o.opcode||"FDB"===o.opcode||"FILL"===o.opcode||"RMB"===o.opcode||"ZMB"===o.opcode||".M8"===o.opcode||".X8"===o.opcode||".M16"===o.opcode||".X16"===o.opcode||".PHASE"===o.opcode||".DEPHASE"===o.opcode||"ALIGN"===o.opcode||".CSTR"===o.opcode||".ISTR"===o.opcode||".PSTR"===o.opcode||".CSEG"===o.opcode||".DSEG"===o.opcode||".ESEG"===o.opcode||".BSSEG"===o.opcode||"DB"===o.opcode||"DS"===o.opcode||"DW"===o.opcode)return o;if(".DEBUGINFO"===o.opcode||".MACPACK"===o.opcode||".FEATURE"===o.opcode||".ZEROPAGE"===o.opcode||".SEGMENT"===o.opcode||".SETCPU"===o.opcode)return o.opcode="",o;if(!o.opcode&&o.label)return o;try{var E=e.parseOpcode(o)}catch(e){throw{msg:e,s:o}}if(null!==E)return E;if(n[o.opcode])return o.macro=o.opcode,o;if(!o.label&&!r){var M={line:o.line,numline:o.numline,addr:null,bytes:0};if(o.remark&&!o.opcode)return o;if(!o.params)throw{msg:"Unrecognized instruction "+o.opcode,s:o};if(!o.opcode)throw{msg:"Unrecognized instruction "+o.opcode,s:o};0===o.params[0].indexOf(":=")&&(o.params[0]=o.params[0].substr(1)),M.line=o.opcode+": "+o.params.join();var S=p(M,n,!0,o);if(!S.opcode)throw{msg:"Unrecognized instruction "+o.opcode,s:o};return S}if(r)throw{msg:"Unrecognized instruction "+a.opcode,s:o};throw{msg:"Unrecognized instruction "+o.opcode,s:o}},c=function(e,r){var l,p,f=null;r=r||{};for(var d={},u=null,h=null,m=[],g=0,v=e.length;g<v;g++)if(l=e[g].line,p=l.match(/\s*(\.[^\s]+)(.*)/)){var E=p[1].toUpperCase(),M=p[2].match(/^\s*([^;]*)(.*)/);if(M&&M[1].length?(M[1],f=M[1].split(/\s*,\s*/).map(i)):f=null,".INCLUDE"!==E||!r.noinclude)if(".INCLUDE"!==E)if(".ENDM"!==E)if(".MACRO"!==E)if(".REPT"!==E)m.push(e[g]);else{if(!f[0])throw{msg:"No repeat count given",s:e[g]};if(!(h=Parser.evaluate(f[0])))throw{msg:"Bad repeat count given",s:e[g]};if(u="*REPT"+e[g].numline,d[u])throw{msg:"Macro redefinition at line "+e[g].numline,s:e[g]};d[u]=[]}else{if(!f[0])throw{msg:"Bad macro name at line "+e[g].numline,s:e[g]};if(u=f[0].toUpperCase(),d[u])throw{msg:"Macro redefinition at line "+e[g].numline,s:e[g]};d[u]=[]}else{if(!u)throw{msg:"ENDM without MACRO at line "+e[g].numline,s:e[g]};if(h){m.push({numline:e[g].numline,line:";rept unroll",addr:null,bytes:0,remark:"REPT unroll"});for(var S=0;S<h;S++)for(var A=0;A<d[u].length;A++){var b=d[u][A].line;m.push({numline:e[S].numline,line:b,addr:null,bytes:0})}}u=null,h=null}else{if(!f||!f[0])throw{msg:"No file name given",s:e[g]};if(n[f[0].replace(/\"/g,"")])throw{msg:"File "+f[0].replace(/\"/g,"")+" is already included elsewhere - maybe recursion",s:e[g]};var N=o(f[0].replace(/\"/g,""));if(!N)throw{msg:"File "+f[0]+" not found",s:e[g]};var y=s(N.split(/\n/));y=t(y),y=a(y);for(var C=c(y),I=0;I<C[0].length;I++)C[0][I].includedFile=f[0].replace(/\"/g,""),m.push(C[0][I]);for(I in C[1])d[I]=C[1][I];n[f[0].replace(/\"/g,"")]=N}}else{if(u){d[u].push(e[g]);continue}m.push(e[g])}if(u)throw{msg:"MACRO "+u+" has no appropriate ENDM",s:e[g]};return[m,d]},f=function(e,o){var n={line:e.line,addr:e.addr,macro:e.macro,numline:e.numline};o=o||[];for(var r=0;r<o.length;r++)n.line=n.line.replace("%%"+(r+1),o[r]);return n},d=function(e,o){for(var n=[],r=0;r<e.length;r++){var a=e[r];if(a.macro)for(var t=o[a.macro],l=0;l<t.length;l++){var s=p(f(t[l],a.params),o);a.label&&(s.label=a.label),a.label="",s.remark=a.remark,s.macro=a.macro,a.macro=null,a.remark="",n.push(s)}else n.push(a)}return n},u={},h=function(e,o){for(var n=e.toString(16);n.length<o;)n="0"+n;return n.toUpperCase()},m=function(e){return h(255&e,2)},g=function(e){return h(e,4)},v=function(e){return h(e,6)},E=function(e){if(ASM.PRAGMAS.RELAX)return"string"==typeof e?255&e.charCodeAt(0):255&e;if("string"==typeof e){if(1!=e.length)throw"String parameter too long ("+e+")";return 255&e.charCodeAt(0)}if(e>255)throw"Param out of bound ("+e+")";if(e<-128)throw"Param out of bound ("+e+")";return 255&e},M=function(e,o){var n=":",r=o.length,a=0;n+=m(r),n+=g(e),n+="00",a=r+Math.floor(e/256)+Math.floor(e%256);for(var t=0;t<o.length;t++)n+=m(o[t]),a+=o[t];return n+=m(256-a%256)},S=function(e,o,n){var r=0,a=[],t=16;n>1&&(t=n);for(var l="",s=0;s<o.length;s++)a.push(o[s]),++r===t&&(l+=M(e,a)+"\n",a=[],r=0,e+=t);return a.length&&(l+=M(e,a)+"\n"),l},A=function(e,o){var n="S1",r=o.length,a=0;n+=m(r+3),n+=g(e),a=r+3+Math.floor(e/256)+Math.floor(e%256);for(var t=0;t<o.length;t++)n+=m(o[t]),a+=o[t];return n+=m(256-a%256)},b=function(e,o){for(var n=0,r=[],a="",t=0;t<o.length;t++)r.push(o[t]),16==++n&&(a+=A(e,r)+"\n",r=[],n=0,e+=16);return r.length&&(a+=A(e,r)+"\n"),a},N=function(e,o){var n="S2",r=o.length,a=0;n+=m(r+4),n+=v(e),a=r+4+Math.floor(e/65536)+Math.floor(e/256)%256+Math.floor(e%256);for(var t=0;t<o.length;t++)n+=m(o[t]),a+=o[t];return n+=m(255-a%256)},y=function(e,o){for(var n=0,r=[],a="",t=0;t<o.length;t++)r.push(o[t]),16==++n&&(a+=N(e,r)+"\n",r=[],n=0,e+=16);return r.length&&(a+=N(e,r)+"\n"),a};return{parse:function(o,l){e=l,l.endian&&(r=l.endian),n={};var i=s(o.split(/\n/));i=t(i),i=a(i);var f=c(i);return i=f[0].map(function(e){return p(e,f[1])}),i=d(i,f[1])},pass1:function(n,r){var a="CSEG",t=function(){if("BSSEG"===a)throw f.opcode+" is not allowed in BSSEG"},l={},s=0,i={};r&&(i=r);for(var p,c,f=null,d=0,h=0,m=[],g=0,v=0,E=n.length;v<E;v++)if(f=n[v],ASM.WLINE=n[v],f.pass=1,f.segment=a,f.addr=s,i._PC=s,0!==g&&(f.phase=g),"ENDIF"!==f.opcode)if("ELSE"!==f.opcode)if(d)f.ifskip=!0;else if("IF"!==f.opcode)if("IFN"!==f.opcode)if(".BLOCK"!==f.opcode)if(".ENDBLOCK"!==f.opcode){if(f.label){var M=f.label,S=!1;if("@"===M[0]&&(S=!0,M=M.substr(1),f.label=M,f.beGlobal=!0),f.beGlobal&&(S=!0),m.length>0&&(M=m.join("/")+"/"+M,i["__"+m.join("/")].push(f.label)),!r&&(i[M+"$"]||S&&void 0!==i[f.label]))throw{msg:"Redefine label "+f.label+" at line "+f.numline,s:f};i[f.label]?i[M]=i[f.label]:S&&(i[M]=s),u[f.label]={defined:{line:f.numline,file:f.includedFile||"*main*"},value:s},i[M+"$"]=s,i[f.label]=s,S&&(i[M]=s)}try{if(".ORG"===f.opcode){s=Parser.evaluate(f.params[0],i),f.addr=s,l[a]=s;continue}if(".CSEG"===f.opcode&&(l[a]=s,a="CSEG",f.segment=a,s=l[a]||0,f.addr=s),".DSEG"===f.opcode&&(l[a]=s,a="DSEG",f.segment=a,s=l[a]||0,f.addr=s),".ESEG"===f.opcode&&(l[a]=s,a="ESEG",f.segment=a,s=l[a]||0,f.addr=s),".BSSEG"===f.opcode&&(l[a]=s,a="BSSEG",f.segment=a,s=l[a]||0,f.addr=s),".PHASE"===f.opcode){if(g)throw{message:"PHASE cannot be nested"};var A=Parser.evaluate(f.params[0],i);f.addr=s,g=A-s,s=A;continue}if(".DEPHASE"===f.opcode){f.addr=s,s-=g,g=0;continue}if("EQU"===f.opcode){try{i[f.label]=Parser.evaluate(f.params[0],i)}catch(e){i[f.label]=null}u[f.label]={defined:{line:f.numline,file:f.includedFile||"*main*"},value:i[f.label]};continue}if("="===f.opcode||":="===f.opcode){i[f.label]=Parser.evaluate(f.params[0],i),u[f.label]={defined:{line:f.numline,file:f.includedFile||"*main*"},value:i[f.label]};continue}}catch(e){throw{msg:e.message,s:f}}if("DB"===f.opcode||"FCB"===f.opcode)for(t(),f.bytes=0,c=0;c<f.params.length;c++)try{if("number"==typeof(p=Parser.evaluate(f.params[c],i))){f.bytes++;continue}if("string"==typeof p){f.bytes+=p.length;continue}}catch(e){f.bytes++}if(".CSTR"===f.opcode||".PSTR"===f.opcode||".ISTR"===f.opcode){for(t(),f.bytes=0,c=0;c<f.params.length;c++)try{if("number"==typeof(p=Parser.evaluate(f.params[c],i))){f.bytes++;continue}if("string"==typeof p){f.bytes+=p.length;continue}}catch(e){f.bytes++}".CSTR"!==f.opcode&&".PSTR"!==f.opcode||f.bytes++}if("DS"!==f.opcode&&"RMB"!==f.opcode)if("ALIGN"!==f.opcode)if("FILL"!==f.opcode)if("BSZ"!==f.opcode&&"ZMB"!==f.opcode){if("DW"===f.opcode||"FDB"===f.opcode)for(t(),f.bytes=0,c=0;c<f.params.length;c++)try{if("number"==typeof(p=Parser.evaluate(f.params[c],i))){f.bytes+=2;continue}}catch(e){f.bytes+=2}if(".INCBIN"!==f.opcode)if(".M16"!==f.opcode)if(".M8"!==f.opcode)if(".X16"!==f.opcode)if(".X8"!==f.opcode){var b=e.parseOpcode(n[v],i);b&&(t(),f=b),void 0===f.bytes&&(f.bytes=0),s+=f.bytes}else i.__MX=8;else i.__MX=16;else i.__AX=8;else i.__AX=16;else{if(t(),!f.params[0])throw{msg:"No file name given at line "+f.numline,s:f};var N=o(f.params[0],!0);if(!N)throw{msg:"Cannot find file "+f.params[0]+" for incbin",s:f};for(f.bytes=0,f.lens=[],P=0;P<N.length;P++){var y=N.charCodeAt(P);y>255&&(f.lens[f.bytes++]=y>>8),f.lens[f.bytes++]=y%256}s+=f.bytes}}else{for(t(),I=Parser.evaluate(f.params[0],i),f.bytes=I,f.lens=[],P=0;P<I;P++)f.lens[P]=0;s+=I}else{for(t(),I=Parser.evaluate(f.params[1],i),"string"==typeof(p=Parser.evaluate(f.params[0],i))&&(p=p.charCodeAt(0)),f.bytes=I,f.lens=[],P=0;P<I;P++)f.lens[P]=p;s+=I}else{var C=Parser.evaluate(f.params[0],i);s+=s%C>0?C-s%C:0}else{var I=Parser.evaluate(f.params[0],i);if(2==f.params.length){"string"==typeof(p=Parser.evaluate(f.params[1],i))&&(p=p.charCodeAt(0)),f.bytes=I,f.lens=[];for(var P=0;P<I;P++)f.lens[P]=p}s+=I}}else{for(var D=i["__"+m.join("/")],R=0;R<D.length;R++)i[D[R]]=i[m.join("/")+"/"+D[R]],i[m.join("/")+"/"+D[R]]=null;m.pop(),i.__blocks=JSON.stringify(m)}else{m.push(f.numline);var F=m.join("/");i["__"+F]=[]}else{if(h)throw{msg:"Nested IFs are not supported",s:f};try{Parser.evaluate(f.params[0],i)&&(d=1),h=1}catch(e){throw{msg:"IF condition canot be determined",s:f}}}else{if(h)throw{msg:"Nested IFs are not supported",s:f};try{Parser.evaluate(f.params[0],i)||(d=1),h=1}catch(e){throw{msg:"IF condition canot be determined",s:f}}}else{if(!h)throw{msg:"ELSE without IF",s:f};d=d?0:1}else{if(!h)throw{msg:"ENDIF without IF",s:f};d=0,h=0}return[n,i]},pass2:function(e){for(var o,n,a,t=e[0],l=e[1],s=null,i=null,p=[],c=0,f=0,d=t.length;f<d;f++)try{if(s=t[f],s.pass=2,"ENDIF"===s.opcode){c=0;continue}if("ELSE"===s.opcode){c=c?0:1;continue}if(c)continue;if("IF"===s.opcode){Parser.evaluate(s.params[0],l);try{Parser.evaluate(s.params[0],l)||(c=1)}catch(e){throw{message:"IF condition mismatched"}}continue}if("IFN"===s.opcode){try{Parser.evaluate(s.params[0],l)&&(c=1)}catch(e){throw{message:"IF condition mismatched"}}continue}l._PC=s.addr;try{for(var h=Parser.usage(s.params[0].toUpperCase(),l),m=0;m<h.length;m++)u[h[m]].usage||(u[h[m]].usage=[]),u[h[m]].usage.push({line:s.numline,file:s.includedFile||"*main*"})}catch(e){}try{for(var h=Parser.usage(s.params[1].toUpperCase(),l),m=0;m<h.length;m++)u[h[m]].usage||(u[h[m]].usage=[]),u[h[m]].usage.push({line:s.numline,file:s.includedFile||"*main*"})}catch(e){}if(".BLOCK"===s.opcode){p.push(s.numline);for(var g=l["__"+p.join("/")],v=0;v<g.length;v++)l[p.join("/")+"/"+g[v]]=l[g[v]],l[g[v]]=l[p.join("/")+"/"+g[v]+"$"];continue}if(".ENDBLOCK"===s.opcode){for(var g=l["__"+p.join("/")],v=0;v<g.length;v++)l[g[v]]=l[p.join("/")+"/"+g[v]],void 0===l[g[v]]&&delete l[g[v]],l[p.join("/")+"/"+g[v]]=null;p.pop();continue}if(".ENT"===s.opcode){ASM.ENT=Parser.evaluate(s.params[0],l);continue}if(".BINFROM"===s.opcode){ASM.BINFROM=Parser.evaluate(s.params[0],l);continue}if(".BINTO"===s.opcode){ASM.BINTO=Parser.evaluate(s.params[0],l);continue}if(".ENGINE"===s.opcode){ASM.ENGINE=s.params[0];continue}if(".PRAGMA"===s.opcode){ASM.PRAGMAS=ASM.PRAGMAS||[],ASM.PRAGMAS.push(s.params[0].toUpperCase());continue}if("EQU"===s.opcode){l[s.label]=Parser.evaluate(s.params[0],l);continue}if("DB"===s.opcode||"FCB"===s.opcode){for(n=0,s.lens=[],a=0;a<s.params.length;a++)if("number"!=typeof(o=Parser.evaluate(s.params[a],l)))if("string"!=typeof o);else for(M=0;M<o.length;M++)s.lens[n++]=o.charCodeAt(M);else s.lens[n++]=Math.floor(o%256);continue}if(".CSTR"===s.opcode){for(n=0,s.lens=[],a=0;a<s.params.length;a++)if("number"!=typeof(o=Parser.evaluate(s.params[a],l)))if("string"!=typeof o);else for(M=0;M<o.length;M++)s.lens[n++]=o.charCodeAt(M);else s.lens[n++]=Math.floor(o%256);s.lens[n++]=0;continue}if(".PSTR"===s.opcode){for(n=1,s.lens=[],a=0;a<s.params.length;a++)if("number"!=typeof(o=Parser.evaluate(s.params[a],l)))if("string"!=typeof o);else for(M=0;M<o.length;M++)s.lens[n++]=o.charCodeAt(M);else s.lens[n++]=Math.floor(o%256);s.lens[0]=n-1;continue}if(".ISTR"===s.opcode){for(n=0,s.lens=[],a=0;a<s.params.length;a++)if("number"!=typeof(o=Parser.evaluate(s.params[a],l)))if("string"!=typeof o);else for(var M=0;M<o.length;M++)s.lens[n++]=127&o.charCodeAt(M);else s.lens[n++]=Math.floor(o%128);s.lens[n-1]=128|s.lens[n-1];continue}if("DW"===s.opcode||"FDB"===s.opcode){for(n=0,s.lens=[],a=0;a<s.params.length;a++)"number"!=typeof(o=Parser.evaluate(s.params[a],l))||(r?(s.lens[n++]=Math.floor(o/256),s.lens[n++]=Math.floor(o%256)):(s.lens[n++]=Math.floor(o%256),s.lens[n++]=Math.floor(o/256)));continue}if(s.lens&&s.lens[1]&&"function"==typeof s.lens[1]&&("addr24"===s.lens[2]?(i=s.lens[1](l),r?(s.lens[3]=Math.floor(i%256),s.lens[2]=Math.floor((i>>8)%256),s.lens[1]=Math.floor(i>>16&255)):(s.lens[1]=Math.floor(i%256),s.lens[2]=Math.floor((i>>8)%256),s.lens[3]=Math.floor(i>>16&255))):null===s.lens[2]?"string"==typeof(i=s.lens[1](l))?r?(s.lens[1]=255&i.charCodeAt(0),s.lens[2]=255&i.charCodeAt(1)):(s.lens[2]=255&i.charCodeAt(0),s.lens[1]=255&i.charCodeAt(1)):r?(s.lens[2]=Math.floor(i%256),s.lens[1]=Math.floor(i/256)):(s.lens[1]=Math.floor(i%256),s.lens[2]=Math.floor(i/256)):(i=s.lens[1](l),s.lens[1]=E(i))),s.lens&&s.lens.length>2&&"function"==typeof s.lens[2]&&(i=s.lens[2](l),null===s.lens[3]?"string"==typeof(i=s.lens[2](l))?r?(s.lens[2]=255&i.charCodeAt(0),s.lens[3]=255&i.charCodeAt(1)):(s.lens[3]=255&i.charCodeAt(0),s.lens[2]=255&i.charCodeAt(1)):r?(s.lens[3]=255&i,s.lens[2]=i>>8):(s.lens[2]=255&i,s.lens[3]=i>>8):s.lens[2]=E(i)),s.lens&&s.lens.length>3&&"function"==typeof s.lens[3]&&(i=s.lens[3](l),null===s.lens[4]?"string"==typeof(i=s.lens[3](l))?r?(s.lens[3]=255&i.charCodeAt(0),s.lens[4]=255&i.charCodeAt(1)):(s.lens[4]=255&i.charCodeAt(0),s.lens[3]=255&i.charCodeAt(1)):r?(s.lens[4]=255&i,s.lens[3]=i>>8):(s.lens[3]=255&i,s.lens[4]=i>>8):s.lens[3]=E(i)),s.lens&&s.lens.length>1){if("string"==typeof s.lens[1]&&(s.lens[1]=s.lens[1].charCodeAt(0)),isNaN(s.lens[1]))throw console.log(1201,s),{message:"param out of bounds, NaN"};if((s.lens[1]>255||s.lens[1]<-128)&&2==s.lens.length)throw{message:"param out of bounds - "+s.lens[1]};s.lens[1]<0&&(s.lens[1]=256+s.lens[1])}}catch(e){throw{msg:e.message,s:s,e:e}}return[t,l]},parseLine:p,ENT:null,WLINE:null,compile:function(e,o){try{ASM.ENT=null,ASM.BINFROM=null,ASM.BINTO=null,ASM.ENGINE=null,ASM.PRAGMAS=[];var n=ASM.parse(e,o);u={};var r=ASM.pass1(n);return r=ASM.pass1(r[0],r[1]),r=ASM.pass1(r[0],r[1]),r=ASM.pass1(r[0],r[1]),r=ASM.pass1(r[0],r[1]),r=ASM.pass1(r[0],r[1]),r=ASM.pass1(r[0],r[1]),r=ASM.pass2(r),[null,r,u]}catch(e){var a=e.s||"Internal error";return e.e&&(e="object"==typeof e.e?e.e:{msg:e.e,s:e.s}),!e.msg&&e.message&&(e.msg=e.message),e.msg?(e.s||(e.s=a),[e,null]):["Cannot evaluate line "+ASM.WLINE.numline+", there is some unspecified error (e.g. reserved world as label etc.)",null]}},compileAsync:function(e,o,n){try{var r=ASM.parse(e,o),a=ASM.pass1(r);a=ASM.pass2(a),n(null,a)}catch(e){n(e,null)}},lst:function(e,o,n,r,a){var t,l,s="";void 0===r&&(r=!1);for(var i=0,p=e.length;i<p;i++)if(l=e[i],t="",!l.ifskip){if(l.macro&&!n&&(t+="        **MACRO UNROLL - "+l.macro+"\n"),void 0!==l.addr&&(t+=g(l.addr),l.phase&&(t+=" @"+g(l.addr-l.phase)),t+=r?" ":"   "),l.lens)for(var c=0;c<l.lens.length;c++)t+=m(l.lens[c])+" ";if(!r)for(;t.length<20;)t+=" ";if(r)for(;t.length<15;)t+=" ";if(l.label&&(t+=l.label+":   "),!r)for(;t.length<30;)t+=" ";if(r)for(;t.length<22;)t+=" ";l.opcode&&(t+=l.opcode+(r?" ":"   ")),l.params&&(t+=l.params+(r?" ":"   ")),l.remark&&(t+=";"+l.remark),s+=t+"\n"}if(n)return s;s+="\n\n";for(var f in u)if(null!==u[f]&&("_"!=f[0]||"_"!=f[1])&&"$"!==f[f.length-1]){for(t="",t+=f+": ";t.length<20;)t+=" ";if(t+=g(u[f].value),t+=" DEFINED AT LINE "+u[f].defined.line,"*main*"!=u[f].defined.file&&(t+=" IN "+u[f].defined.file),s+=t+"\n",u[f].usage)for(p=0;p<u[f].usage.length;p++)s+="                    > USED AT LINE "+u[f].usage[p].line,"*main*"!=u[f].usage[p].file&&(s+=" IN "+u[f].usage[p].file),s+="\n"}return s},html:function(e,o,n,r){var a,t,l="<html><head><meta charset=utf-8><body><table>";void 0===r&&(r=!1);for(var s=0,i=e.length;s<i;s++){if(t=e[s],a='<tr id="ln'+t.numline+'">',t.macro&&!n&&(a+="        **MACRO UNROLL - "+t.macro+"\n"),void 0!==t.addr?(a+='<td><a name="ADDR'+g(t.addr)+'">'+g(t.addr)+"</a>",t.phase?a+="</td><td>"+g(t.addr-t.phase):a+="</td><td>",a+="</td>"):a+="<td></td><td></td>",t.lens){a+="<td>";for(var p=0;p<t.lens.length;p++)a+=m(t.lens[p])+" ";a+="</td>"}else a+="<td></td>";t.label?a+='<td><a name="LBL'+t.label+'">'+t.label+"</a></td>":a+="<td></td>",t.opcode?a+="<td>"+t.opcode+"</td>":a+="<td></td>",t.params?a+="<td>"+t.params.map(function(e){e+="";for(var n in o)if(null!==o[n]&&("_"!=n[0]||"_"!=n[1])&&"$"!==n[n.length-1]){var r=new RegExp("^"+n+"$","i");if(e.match(r))return'<a href="#LBL'+n+'">'+e+"</a>"}return e})+"</td>":a+="<td></td>",t.remark?a+="<td>;"+t.remark+"</td>":a+="<td></td>",l+=a+"</tr>\n"}return l+="</table>"},hex:function(e,o){for(var n,r=null,a=0,t=[],l="",s=!1,i=16,p=0,c=e.length;p<c;p++)if(".PRAGMA"===(n=e[p]).opcode&&(2==n.params.length&&"HEXLEN"==n.params[0].toUpperCase()&&((i=parseInt(n.params[1]))<1||i>64)&&(i=16),1==n.params.length&&"SEGMENT"==n.params[0].toUpperCase()&&(s=!0)),!(n.ifskip||s&&(o||(o="CSEG"),n.segment!=o))){var f=n.addr;if(n.phase&&(f-=n.phase),void 0!==f&&0===a&&(r=f),f!=r+a&&(a&&(l+=S(r,t,i)),r=f,a=0,t=[]),n.lens){for(var d=0;d<n.lens.length;d++)t.push(n.lens[d]);a+=n.lens.length}}return t.length&&(l+=S(r,t,i)),l+=":00000001FF"},srec:function(e,o){for(var n,r=null,a=0,t=!1,l=[],s="",i=0,p=e.length;i<p;i++)if(".PRAGMA"===(n=e[i]).opcode&&1==n.params.length&&"SEGMENT"==n.params[0].toUpperCase()&&(t=!0),!(n.ifskip||t&&(o||(o="CSEG"),n.segment!=o))){var c=n.addr;if(n.phase&&(c-=n.phase),void 0!==c&&0===a&&(r=c),c!=r+a&&(a&&(s+=b(r,l)),r=c,a=0,l=[]),n.lens){for(var f=0;f<n.lens.length;f++)l.push(n.lens[f]);a+=n.lens.length}}l.length&&(s+=b(r,l));var d=ASM.ENT||0,u=3+Math.floor(d/256)+Math.floor(d%256);return s+="S903"+g(d)+m(255-u%256)},srec28:function(e,o){for(var n,r=null,a=0,t=!1,l=[],s="",i=0,p=e.length;i<p;i++)if(".PRAGMA"===(n=e[i]).opcode&&1==n.params.length&&"SEGMENT"==n.params[0].toUpperCase()&&(t=!0),!t||(o||(o="CSEG"),n.segment==o)){var c=n.addr;if(n.phase&&(c-=n.phase),void 0!==c&&0===a&&(r=c),c!=r+a&&(a&&(s+=y(r,l)),r=c,a=0,l=[]),n.lens){for(var f=0;f<n.lens.length;f++)l.push(n.lens[f]);a+=n.lens.length}}l.length&&(s+=y(r,l));var d=ASM.ENT||0,u=3+Math.floor(d/256)+Math.floor(d%256);return s+="S804"+v(d)+m(255-u%256)+"\n"},linemap:function(e){for(var o,n=[],r=0,a=e.length;r<a;r++)if((o=e[r]).lens)for(var t=0;t<o.lens.length;t++)n[o.addr+t]=r+1;return n},beautify:function(o,n){e=n;var r=s(o.split(/\n/));r=l(r),r=t(r),r=a(r);var i=c(r,{noinclude:!0});r=r.map(function(e){return p(e,i[1])});for(var f,d,u="",h=0;h<r.length;h++)if(f=r[h],d="","EMPTYLINE"!=f.remark)if(f.label||f.opcode||!f.remark){for(f.label&&(d+=f.label,"EQU"!=f.opcode&&"="!=f.opcode&&(d+=":"),d+=" ");d.length<12;)d+=" ";for(f.opcode&&(d+=f.opcode+" ");d.length<20;)d+=" ";f.params&&(d+=f.params+" "),f.remark&&(d+=";"+f.remark),u+=d+"\n"}else u+=";"+f.remark+"\n";else u+="\n";return u},buff:function(e){for(var o,n,r=new Uint8Array(65536),a=0,t=e.length;a<t;a++)if(o=e[a],n=o.addr,o.lens)for(var l=0;l<o.lens.length;l++)r[n++]=o.lens[l];return r},fileGet:function(e){o=e}}});