// ── Seeded RNG ──
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;}}
const rng = mulberry32(42);
function randNormal(mu,sigma){let u=0,v=0;while(u===0)u=rng();while(v===0)v=rng();return mu+sigma*Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v);}
function clip(x,lo,hi){return Math.max(lo,Math.min(hi,x));}
function randInt(lo,hi){return Math.floor(rng()*(hi-lo))+lo;}
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function choice(arr){return arr[Math.floor(rng()*arr.length)];}

// ── Data generators ──
function makeCancer(){
    const n=200,labels=shuffle([...Array(20).fill(1),...Array(180).fill(0)]);
    const scores=labels.map(l=>clip(l===1?randNormal(0.72,0.18):randNormal(0.30,0.20),0,1));
    return {data:labels.map((l,i)=>({id:`Patient-${String(i+1).padStart(3,'0')}`,actual:l,score:Math.round(scores[i]*1000)/1000})),pos:'Cancer',neg:'Healthy'};
}
function makeFraud(){
    const n=300,labels=shuffle([...Array(30).fill(1),...Array(270).fill(0)]);
    const scores=labels.map(l=>clip(l===1?randNormal(0.68,0.20):randNormal(0.25,0.18),0,1));
    return {data:labels.map((l,i)=>({id:`TXN-${String(i+1).padStart(4,'0')}`,actual:l,score:Math.round(scores[i]*1000)/1000})),pos:'Fraud',neg:'Legitimate'};
}
function makeSpam(){
    const n=250,labels=shuffle([...Array(75).fill(1),...Array(175).fill(0)]);
    const scores=labels.map(l=>clip(l===1?randNormal(0.75,0.15):randNormal(0.28,0.18),0,1));
    return {data:labels.map((l,i)=>({id:`Email-${String(i+1).padStart(3,'0')}`,actual:l,score:Math.round(scores[i]*1000)/1000})),pos:'Spam',neg:'Important'};
}

const scenarios={
    cancer:{gen:makeCancer,optimal:'Recall',why:'Missing cancer (False Negative) can be fatal. We prioritise <strong>Recall</strong> — catch every cancer case.',fnCost:'Patient goes untreated — potentially fatal',fpCost:'Extra tests needed — acceptable cost'},
    fraud:{gen:makeFraud,optimal:'F1-Score',why:'Both errors are costly: missing fraud loses money, blocking legitimate transactions annoys customers. We use <strong>F1-Score</strong> to balance both.',fnCost:'Fraud succeeds — money lost',fpCost:'Legitimate transaction blocked — angry customer'},
    spam:{gen:makeSpam,optimal:'Precision',why:'Marking an important email as spam (False Positive) is worse than letting spam through. We prioritise <strong>Precision</strong> — when we say it\'s spam, we\'d better be right.',fnCost:'Spam in inbox — minor annoyance',fpCost:'Important email missed — serious problem'},
};

const plotLayout={paper_bgcolor:'rgba(0,0,0,0)',plot_bgcolor:'rgba(0,0,0,0)',font:{family:'Inter, sans-serif',color:'white'},margin:{l:50,r:20,t:30,b:40}};
const gridStyle={gridcolor:'rgba(255,255,255,0.1)'};

let dataset,posLabel,negLabel,scenarioKey;

function pct(v){return (v*100).toFixed(1)+'%';}
function f4(v){return v.toFixed(4);}

// ── Metrics helpers ──
function confusionMatrix(yTrue,yPred){
    let tp=0,tn=0,fp=0,fn=0;
    for(let i=0;i<yTrue.length;i++){
        if(yTrue[i]===1&&yPred[i]===1)tp++;
        else if(yTrue[i]===0&&yPred[i]===0)tn++;
        else if(yTrue[i]===0&&yPred[i]===1)fp++;
        else fn++;
    }
    return {tp,tn,fp,fn};
}
function accuracy(cm){return (cm.tp+cm.tn)/(cm.tp+cm.tn+cm.fp+cm.fn)||0;}
function precision(cm){return cm.tp/(cm.tp+cm.fp)||0;}
function recall(cm){return cm.tp/(cm.tp+cm.fn)||0;}
function f1score(cm){const p=precision(cm),r=recall(cm);return p+r>0?2*p*r/(p+r):0;}
function specificity(cm){return cm.tn/(cm.tn+cm.fp)||0;}

function rocCurve(yTrue,yScores){
    const thresholds=[...new Set(yScores)].sort((a,b)=>b-a);
    thresholds.unshift(thresholds[0]+0.01);thresholds.push(0);
    const fpr=[],tpr=[];
    const nPos=yTrue.filter(y=>y===1).length,nNeg=yTrue.length-nPos;
    for(const t of thresholds){
        let tp=0,fp=0;
        for(let i=0;i<yTrue.length;i++){
            if(yScores[i]>=t){if(yTrue[i]===1)tp++;else fp++;}
        }
        tpr.push(nPos>0?tp/nPos:0);fpr.push(nNeg>0?fp/nNeg:0);
    }
    return {fpr,tpr,thresholds};
}
function aucTrapezoidal(x,y){
    let a=0;for(let i=1;i<x.length;i++)a+=Math.abs(x[i]-x[i-1])*(y[i]+y[i-1])/2;return a;
}
function prCurve(yTrue,yScores){
    const thresholds=[...new Set(yScores)].sort((a,b)=>b-a);
    thresholds.push(0);
    const precArr=[],recArr=[];
    const nPos=yTrue.filter(y=>y===1).length;
    for(const t of thresholds){
        let tp=0,fp=0;
        for(let i=0;i<yTrue.length;i++){
            if(yScores[i]>=t){if(yTrue[i]===1)tp++;else fp++;}
        }
        precArr.push(tp+fp>0?tp/(tp+fp):1);
        recArr.push(nPos>0?tp/nPos:0);
    }
    return {precArr,recArr};
}
