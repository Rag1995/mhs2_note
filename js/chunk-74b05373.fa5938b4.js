(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-74b05373"],{"4ec9":function(t,e,n){"use strict";var o=n("6d61"),u=n("6566");t.exports=o("Map",(function(t){return function(){return t(this,arguments.length?arguments[0]:void 0)}}),u)},"8c3e":function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("bingoResultContainer",{attrs:{size:t.size}},[t._l(t.listWithSlotName,(function(e){var o=e.slotName,u=e.list;return n("template",{slot:o},t._l(u,(function(t,e){return n("bingoResultIcon",{key:o+"-"+e,attrs:{value:t}})})),1)}))],2)},u=[],r=n("2909"),i=(n("a9e3"),n("d81d"),n("cb29"),n("d3b7"),n("3ca3"),n("ddb0"),n("4ec9"),{props:{size:{type:Number},list:{type:Array,default:function(){return[]}}},computed:{listWithSlotName:function(){var t=this,e=4*(this.size+1),n=new Array(e).fill(null).map((function(e,n){return{slotName:t.getSlotName(n),value:t.list[n]||null}}));return this.groupBy(n,"slotName")}},components:{bingoResultContainer:function(){return n.e("chunk-2d215caf").then(n.bind(null,"c05a"))},bingoResultIcon:function(){return n.e("chunk-2d20f758").then(n.bind(null,"b45e"))}},methods:{getSlotName:function(t){var e=this.size+1,n=0,o=e,u=2*e,r=3*e;return t===n?"top-right":t===o?"right-bottom":t===u?"bottom-left":t===r?"left-top":n<t&&t<o?"right":o<t&&t<u?"bottom":u<t&&t<r?"left":r<t?"top":void 0},groupBy:function(t){return Object(r["a"])(t.reduce((function(t,e){var n=e.slotName,o=e.value,u=t.get(n)||{slotName:n,list:[]};return u.list.push(o),t.set(n,u)}),new Map).values())}}}),l=i,s=n("0c7c"),a=Object(s["a"])(l,o,u,!1,null,null,null);e["default"]=a.exports}}]);
//# sourceMappingURL=chunk-74b05373.fa5938b4.js.map