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

// ── Stratified K-Fold ──
function stratifiedKFold(yTrue, k) {
    const posIdx = [], negIdx = [];
    yTrue.forEach((y, i) => y === 1 ? posIdx.push(i) : negIdx.push(i));
    const folds = Array.from({length: k}, () => []);
    posIdx.forEach((idx, i) => folds[i % k].push(idx));
    negIdx.forEach((idx, i) => folds[i % k].push(idx));
    return folds;
}

// ── Main render ──
function render() {
    const sc = scenarios[scenarioKey];
    const threshold = parseFloat(document.getElementById('threshold').value);
    const nFolds = parseInt(document.getElementById('nfolds').value);
    document.getElementById('thresholdVal').textContent = threshold.toFixed(2);
    document.getElementById('foldsVal').textContent = nFolds;

    const yTrue = dataset.map(d => d.actual);
    const yScores = dataset.map(d => d.score);
    const yPred = yScores.map(s => s >= threshold ? 1 : 0);
    const cm = confusionMatrix(yTrue, yPred);
    const {tp, tn, fp, fn} = cm;
    const acc = accuracy(cm), prec = precision(cm), rec = recall(cm), f1 = f1score(cm), spec = specificity(cm);
    const nPos = yTrue.filter(y => y === 1).length, nNeg = yTrue.length - nPos;
    const naiveAcc = Math.max(nPos, nNeg) / yTrue.length;
    const majority = nPos > nNeg ? posLabel : negLabel;

    // Step 1
    let missMsg = '';
    if (nPos < nNeg) missMsg = `<br><br>It would miss <strong>every single ${posLabel.toLowerCase()} case</strong>. In ${scenarioKey} detection, that could be catastrophic.`;
    document.getElementById('step1-warn').innerHTML = `<strong>Why accuracy alone is dangerous:</strong><br>Your dataset has <strong>${nPos}</strong> ${posLabel} and <strong>${nNeg}</strong> ${negLabel} samples. A naive model that <em>always</em> predicts "${majority}" would get <strong>${pct(naiveAcc)} accuracy</strong> — without learning anything at all.${missMsg}`;

    Plotly.newPlot('chart-dist', [{
        labels: [posLabel, negLabel], values: [nPos, nNeg], type: 'pie',
        marker: {colors: ['#e74c3c', '#27ae60']}, hole: 0.4,
        textinfo: 'label+percent', textfont: {size: 14, color: 'white'}
    }], {...plotLayout, height: 260, showlegend: false}, {responsive: true});

    document.getElementById('step1-explain').innerHTML = `<strong>Key lesson from B07:</strong> When classes are imbalanced, accuracy is misleading.<br><br>A model predicting all "${majority}" gets <strong>${pct(naiveAcc)}</strong> accuracy but <strong>0% recall</strong> on the minority class.<br><br>This is why we need <strong>Precision</strong>, <strong>Recall</strong>, <strong>F1-Score</strong>, and <strong>ROC-AUC</strong> — metrics that reveal what accuracy hides.`;

    // Step 2
    document.getElementById('step2-explain').innerHTML = `The <strong>Model Score</strong> is the model's confidence that a sample is <strong>${posLabel}</strong> (0 = definitely ${negLabel}, 1 = definitely ${posLabel}). The <strong>threshold</strong> is set above: if score ≥ threshold, predict ${posLabel}.`;
    const correct = yTrue.reduce((s, y, i) => s + (y === yPred[i] ? 1 : 0), 0);
    document.getElementById('step2-summary').innerHTML = `Correct: <strong>${correct}</strong> | Wrong: <strong>${yTrue.length - correct}</strong> | Total: <strong>${yTrue.length}</strong>`;

    let tableHTML = '<thead><tr><th>ID</th><th>Actual</th><th>Score</th><th>Predicted</th><th>Correct?</th></tr></thead><tbody>';
    dataset.forEach((d, i) => {
        const pred = yPred[i] === 1 ? posLabel : negLabel;
        const ok = d.actual === yPred[i];
        tableHTML += `<tr><td>${d.id}</td><td>${d.actual === 1 ? posLabel : negLabel}</td><td>${d.score.toFixed(3)}</td><td>${pred}</td><td style="color:${ok ? '#27ae60' : '#e74c3c'}">${ok ? '✓' : '✗'}</td></tr>`;
    });
    tableHTML += '</tbody>';
    document.getElementById('data-table').innerHTML = tableHTML;

    // Step 3
    document.getElementById('step3-explain').innerHTML = `The confusion matrix groups every prediction into 4 categories. <strong>Green = correct</strong>, <strong>Red = errors</strong>.<br><br>For <strong>${scenarioKey === 'cancer' ? 'Cancer Detection' : scenarioKey === 'fraud' ? 'Fraud Detection' : 'Spam Filter'}</strong>: FN cost = <em>${sc.fnCost}</em> | FP cost = <em>${sc.fpCost}</em>`;

    const cmTraces = [];
    const cmData = [[tn, fp], [fn, tp]];
    const cmColors = [['#27ae60', '#c0392b'], ['#e74c3c', '#2ecc71']];
    const cmLabels = [['TN', 'FP'], ['FN', 'TP']];
    const shapes = [];
    for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) {
        cmTraces.push({x: [j], y: [1 - i], mode: 'text', text: [`<b>${cmLabels[i][j]}</b><br>${cmData[i][j]}`], textfont: {size: 22, color: 'white'}, showlegend: false, hoverinfo: 'skip'});
        shapes.push({type: 'rect', x0: j - 0.48, x1: j + 0.48, y0: (1 - i) - 0.48, y1: (1 - i) + 0.48, fillcolor: cmColors[i][j], line: {width: 2, color: 'rgba(255,255,255,0.2)'}, layer: 'below'});
    }
    Plotly.newPlot('chart-cm', cmTraces, {...plotLayout, height: 340, shapes, xaxis: {tickvals: [0, 1], ticktext: [`Pred ${negLabel}`, `Pred ${posLabel}`], showgrid: false}, yaxis: {tickvals: [0, 1], ticktext: [`Actual ${posLabel}`, `Actual ${negLabel}`], showgrid: false}}, {responsive: true});

    let cmDetail = `<p><strong>True Positive (TP) = ${tp}</strong><br>Model said "${posLabel}" — correct.</p><p><strong>True Negative (TN) = ${tn}</strong><br>Model said "${negLabel}" — correct.</p><p><strong>False Positive (FP) = ${fp}</strong> — Type I Error<br>Model said "${posLabel}" but was actually ${negLabel}.<br>Cost: <em>${sc.fpCost}</em></p><p><strong>False Negative (FN) = ${fn}</strong> — Type II Error<br>Model said "${negLabel}" but was actually ${posLabel}.<br>Cost: <em>${sc.fnCost}</em></p>`;
    if (sc.optimal === 'Recall') cmDetail += `<div class="warn-box"><strong>For this scenario:</strong> FN is the dangerous error. We need high <strong>Recall</strong> to minimise FN = ${fn}.</div>`;
    else if (sc.optimal === 'Precision') cmDetail += `<div class="warn-box"><strong>For this scenario:</strong> FP is the dangerous error. We need high <strong>Precision</strong> to minimise FP = ${fp}.</div>`;
    else cmDetail += `<div class="warn-box"><strong>For this scenario:</strong> Both FP and FN are costly. We use <strong>F1-Score</strong> to balance both.</div>`;
    document.getElementById('step3-detail').innerHTML = cmDetail;

    // Step 4
    document.getElementById('step4-explain').innerHTML = `Each metric answers a different question. For this scenario, the most important metric is <strong>${sc.optimal}</strong> (highlighted in blue).<br><br><strong>Why?</strong> ${sc.why}`;
    const metricsData = [
        {name: 'Accuracy', val: acc, formula: '(TP+TN)/Total', calc: `(${tp}+${tn})/${tp+tn+fp+fn}`},
        {name: 'Precision', val: prec, formula: 'TP/(TP+FP)', calc: `${tp}/(${tp}+${fp})`},
        {name: 'Recall', val: rec, formula: 'TP/(TP+FN)', calc: `${tp}/(${tp}+${fn})`},
        {name: 'F1-Score', val: f1, formula: '2(P×R)/(P+R)', calc: `2(${prec.toFixed(2)}×${rec.toFixed(2)})/(${prec.toFixed(2)}+${rec.toFixed(2)})`},
    ];
    document.getElementById('metrics-grid').innerHTML = metricsData.map(m => `<div class="metric-card ${sc.optimal === m.name ? 'highlight' : ''}"><h3>${m.name}</h3><div class="value">${pct(m.val)}</div><div class="formula">${m.formula}<br>${m.calc}</div></div>`).join('');

    const trapName = rec < 0.6 ? 'Recall' : 'Precision';
    const trapVal = rec < 0.6 ? rec : prec;
    document.getElementById('step4-trap').innerHTML = acc > 0.85 && (rec < 0.6 || prec < 0.6) ? `<div class="warn-box"><strong>Accuracy Trap detected:</strong> Accuracy is ${pct(acc)} but ${trapName} is only ${pct(trapVal)}. The model may just be predicting the majority class.</div>` : '';

    document.getElementById('step4-table').innerHTML = `<table><tr><th>Metric</th><th>Question</th><th>When to prioritise</th></tr><tr><td>Accuracy</td><td>Overall, how often correct?</td><td>Balanced classes only</td></tr><tr><td>Precision</td><td>When model says ${posLabel}, how often right?</td><td>When FP is costly</td></tr><tr><td>Recall</td><td>Of all actual ${posLabel}, how many caught?</td><td>When FN is costly</td></tr><tr><td>F1-Score</td><td>Balance between P and R</td><td>When both matter</td></tr><tr><td>Specificity</td><td>Of all actual ${negLabel}, how many correct?</td><td>Value = ${f4(spec)}</td></tr></table>`;

    // Step 5 - ROC
    const roc = rocCurve(yTrue, yScores);
    const aucVal = aucTrapezoidal(roc.fpr, roc.tpr);
    const curTPR = tp / (tp + fn) || 0, curFPR = fp / (fp + tn) || 0;
    Plotly.newPlot('chart-roc', [
        {x: roc.fpr, y: roc.tpr, mode: 'lines', name: `Model (AUC = ${aucVal.toFixed(3)})`, line: {color: '#4da6ff', width: 3}, fill: 'tozeroy', fillcolor: 'rgba(77,166,255,0.1)'},
        {x: [0, 1], y: [0, 1], mode: 'lines', name: 'Random (AUC = 0.500)', line: {color: 'rgba(255,255,255,0.3)', width: 2, dash: 'dash'}},
        {x: [curFPR], y: [curTPR], mode: 'markers+text', name: `Threshold = ${threshold.toFixed(2)}`, marker: {color: '#e74c3c', size: 14}, text: [`t=${threshold.toFixed(2)}`], textposition: 'top right', textfont: {size: 12, color: '#e74c3c'}}
    ], {...plotLayout, height: 420, xaxis: {title: 'False Positive Rate (FPR)', ...gridStyle}, yaxis: {title: 'True Positive Rate (Recall)', ...gridStyle}, legend: {x: 0.5, y: 0.05}}, {responsive: true});

    let interp, aucColor;
    if (aucVal >= 0.9) { interp = 'Excellent'; aucColor = '#27ae60'; }
    else if (aucVal >= 0.8) { interp = 'Good'; aucColor = '#2ecc71'; }
    else if (aucVal >= 0.7) { interp = 'Fair'; aucColor = '#f39c12'; }
    else { interp = 'Poor'; aucColor = '#e74c3c'; }
    const aucDetail = aucVal >= 0.8 ? 'The model separates classes well.' : 'Consider improving the model or features.';
    document.getElementById('step5-auc').innerHTML = `<div class="success-box" style="border-left-color:${aucColor}"><strong>AUC = ${aucVal.toFixed(3)}</strong> — ${interp} model performance. ${aucDetail}</div>`;

    // Step 6 - PR
    const pr = prCurve(yTrue, yScores);
    const baseline = nPos / yTrue.length;
    // Compute AP (average precision) via trapezoidal
    const ap = aucTrapezoidal(pr.recArr, pr.precArr);
    document.getElementById('step6-explain').innerHTML = `For <strong>imbalanced data</strong>, the PR curve is more informative than ROC. It focuses on the positive class (<strong>${posLabel}</strong>) and shows the precision-recall trade-off at every threshold.<br><br><strong>AP (Average Precision)</strong> summarises the curve. Higher = better.`;

    Plotly.newPlot('chart-pr', [
        {x: pr.recArr, y: pr.precArr, mode: 'lines', name: `Model (AP = ${ap.toFixed(3)})`, line: {color: '#4da6ff', width: 3}, fill: 'tozeroy', fillcolor: 'rgba(77,166,255,0.1)'},
        {x: [0, 1], y: [baseline, baseline], mode: 'lines', name: `Random (baseline = ${baseline.toFixed(3)})`, line: {color: 'rgba(255,255,255,0.3)', width: 2, dash: 'dash'}},
        {x: [rec], y: [prec], mode: 'markers+text', name: `Threshold = ${threshold.toFixed(2)}`, marker: {color: '#e74c3c', size: 14}, text: [`t=${threshold.toFixed(2)}`], textposition: 'top left', textfont: {size: 12, color: '#e74c3c'}}
    ], {...plotLayout, height: 400, xaxis: {title: 'Recall', ...gridStyle}, yaxis: {title: 'Precision', ...gridStyle}, legend: {x: 0.05, y: 0.05}}, {responsive: true});

    const prNote = baseline < 0.3 ? 'PR curve is more informative here' : 'both curves are useful';
    document.getElementById('step6-left').innerHTML = `<strong>ROC vs PR Curve:</strong><br>• ROC can look overly optimistic on imbalanced data<br>• PR curve gives a realistic picture when positives are rare<br>• Your data: <strong>${pct(baseline)}</strong> positive rate — ${prNote}`;
    document.getElementById('step6-right').innerHTML = `<strong>Reading the curve:</strong><br>• Top-right corner = ideal (high precision AND recall)<br>• Steep drop = model struggles to maintain precision<br>• AP = <strong>${ap.toFixed(3)}</strong> (random baseline = ${baseline.toFixed(3)})`;

    // Step 7 - Threshold sweep
    const sweepT = [], sAcc = [], sPrec = [], sRec = [], sF1 = [];
    for (let t = 0.01; t <= 0.99; t += 0.01) {
        sweepT.push(Math.round(t * 100) / 100);
        const yp = yScores.map(s => s >= t ? 1 : 0);
        const c = confusionMatrix(yTrue, yp);
        sAcc.push(accuracy(c)); sPrec.push(precision(c)); sRec.push(recall(c)); sF1.push(f1score(c));
    }
    const bestF1Idx = sF1.indexOf(Math.max(...sF1));
    const bestRecIdx = sRec.findIndex(v => v >= 0.95);
    const bestPrecIdx = sPrec.slice().reverse().findIndex(v => v >= 0.95);
    const bestPrecIdxReal = bestPrecIdx >= 0 ? sPrec.length - 1 - bestPrecIdx : bestF1Idx;
    const bestRecIdxReal = bestRecIdx >= 0 ? bestRecIdx : bestF1Idx;

    Plotly.newPlot('chart-sweep', [
        {x: sweepT, y: sAcc, mode: 'lines', name: 'Accuracy', line: {color: '#3498db', width: 2.5}},
        {x: sweepT, y: sPrec, mode: 'lines', name: 'Precision', line: {color: '#2ecc71', width: 2.5}},
        {x: sweepT, y: sRec, mode: 'lines', name: 'Recall', line: {color: '#e74c3c', width: 2.5}},
        {x: sweepT, y: sF1, mode: 'lines', name: 'F1-Score', line: {color: '#f39c12', width: 2.5}},
    ], {...plotLayout, height: 400, xaxis: {title: 'Threshold', ...gridStyle}, yaxis: {title: 'Metric Value', ...gridStyle}, legend: {x: 0.01, y: 0.01},
        shapes: [
            {type: 'line', x0: sweepT[bestF1Idx], x1: sweepT[bestF1Idx], y0: 0, y1: 1, line: {dash: 'dash', color: '#f39c12', width: 1.5}},
            {type: 'line', x0: threshold, x1: threshold, y0: 0, y1: 1, line: {dash: 'dot', color: '#4da6ff', width: 1.5}}
        ],
        annotations: [
            {x: sweepT[bestF1Idx], y: 1.05, text: `Best F1 = ${sweepT[bestF1Idx].toFixed(2)}`, showarrow: false, font: {color: '#f39c12', size: 11}},
            {x: threshold, y: 1.1, text: `Current = ${threshold.toFixed(2)}`, showarrow: false, font: {color: '#4da6ff', size: 11}}
        ]
    }, {responsive: true});

    document.getElementById('step7-left').innerHTML = `<strong>Optimal thresholds found:</strong><table><tr><th>Goal</th><th>Threshold</th><th>Value</th></tr><tr><td>Best F1-Score</td><td><strong>${sweepT[bestF1Idx].toFixed(2)}</strong></td><td>${f4(sF1[bestF1Idx])}</td></tr><tr><td>Recall ≥ 95%</td><td><strong>${sweepT[bestRecIdxReal].toFixed(2)}</strong></td><td>Recall = ${f4(sRec[bestRecIdxReal])}</td></tr><tr><td>Precision ≥ 95%</td><td><strong>${sweepT[bestPrecIdxReal].toFixed(2)}</strong></td><td>Precision = ${f4(sPrec[bestPrecIdxReal])}</td></tr></table>`;

    let advice;
    if (sc.optimal === 'Recall') advice = 'Lower the threshold to catch more positives (higher recall).';
    else if (sc.optimal === 'Precision') advice = 'Raise the threshold to be more confident in positive predictions.';
    else advice = 'Use the Best F1 threshold to balance both errors.';
    const optMap = {'Recall': rec, 'Precision': prec, 'F1-Score': f1};
    document.getElementById('step7-right').innerHTML = `<strong>Recommendation:</strong><br>The key metric is <strong>${sc.optimal}</strong>. ${advice}<br><br>Current threshold <strong>${threshold.toFixed(2)}</strong> gives ${sc.optimal} = <strong>${f4(optMap[sc.optimal])}</strong>`;

    // Step 8 - Cross-Validation
    const folds = stratifiedKFold(yTrue, nFolds);
    const foldMetrics = folds.map((testIdx, fi) => {
        const yTest = testIdx.map(i => yTrue[i]);
        const yPredFold = testIdx.map(i => yScores[i] >= threshold ? 1 : 0);
        const c = confusionMatrix(yTest, yPredFold);
        return {fold: fi + 1, samples: testIdx.length, positives: yTest.filter(y => y === 1).length, acc: accuracy(c), prec: precision(c), rec: recall(c), f1: f1score(c)};
    });
    const bestFoldIdx = foldMetrics.reduce((bi, m, i) => m.f1 > foldMetrics[bi].f1 ? i : bi, 0);
    const meanF1 = foldMetrics.reduce((s, m) => s + m.f1, 0) / nFolds;
    const barColors = foldMetrics.map((_, i) => i === bestFoldIdx ? '#4da6ff' : '#1a5276');

    Plotly.newPlot('chart-cv', [{
        x: foldMetrics.map(m => `Fold ${m.fold}`), y: foldMetrics.map(m => m.f1),
        type: 'bar', marker: {color: barColors},
        text: foldMetrics.map(m => m.f1.toFixed(3)), textposition: 'outside', textfont: {color: 'white'}
    }], {...plotLayout, height: 350, yaxis: {title: 'F1-Score', ...gridStyle}, xaxis: {...gridStyle},
        shapes: [{type: 'line', x0: -0.5, x1: nFolds - 0.5, y0: meanF1, y1: meanF1, line: {dash: 'dash', color: '#e74c3c', width: 1.5}}],
        annotations: [{x: nFolds - 1, y: meanF1, text: `Mean = ${meanF1.toFixed(3)}`, showarrow: false, yshift: 15, font: {color: '#e74c3c'}}]
    }, {responsive: true});

    let cvTableHTML = '<table><thead><tr><th>Fold</th><th>Samples</th><th>Pos</th><th>Acc</th><th>Prec</th><th>Rec</th><th>F1</th></tr></thead><tbody>';
    foldMetrics.forEach(m => { cvTableHTML += `<tr><td>${m.fold}</td><td>${m.samples}</td><td>${m.positives}</td><td>${f4(m.acc)}</td><td>${f4(m.prec)}</td><td>${f4(m.rec)}</td><td>${f4(m.f1)}</td></tr>`; });
    cvTableHTML += '</tbody></table>';
    document.getElementById('step8-table').innerHTML = cvTableHTML;

    const mean = (arr) => arr.reduce((s, v) => s + v, 0) / arr.length;
    const std = (arr) => { const m = mean(arr); return Math.sqrt(arr.reduce((s, v) => s + (v - m) ** 2, 0) / arr.length); };
    const cvAcc = foldMetrics.map(m => m.acc), cvPrec = foldMetrics.map(m => m.prec), cvRec = foldMetrics.map(m => m.rec), cvF1 = foldMetrics.map(m => m.f1);
    document.getElementById('step8-summary').innerHTML = `<br><strong>${nFolds}-Fold CV Summary:</strong><table><tr><th>Metric</th><th>Mean ± Std</th></tr><tr><td>Accuracy</td><td>${f4(mean(cvAcc))} ± ${f4(std(cvAcc))}</td></tr><tr><td>Precision</td><td>${f4(mean(cvPrec))} ± ${f4(std(cvPrec))}</td></tr><tr><td>Recall</td><td>${f4(mean(cvRec))} ± ${f4(std(cvRec))}</td></tr><tr><td>F1-Score</td><td>${f4(mean(cvF1))} ± ${f4(std(cvF1))}</td></tr></table>`;

    const f1Std = std(cvF1);
    document.getElementById('step8-verdict').innerHTML = f1Std > 0.1
        ? `<div class="warn-box"><strong>High variance across folds.</strong> Performance varies a lot depending on which data the model sees. This could mean the dataset is too small or the model is unstable.</div>`
        : `<div class="success-box"><strong>Stable performance.</strong> Low variance across folds (std = ${f4(f1Std)}) suggests the model generalises consistently.</div>`;

    // Step 9 - Exam reference
    document.getElementById('step9-left').innerHTML = `<strong>Calculations from your data (threshold = ${threshold.toFixed(2)}):</strong><table><tr><th>Metric</th><th>Formula</th><th>Value</th></tr><tr><td>Accuracy</td><td>(TP+TN)/Total = (${tp}+${tn})/${tp+tn+fp+fn}</td><td><strong>${f4(acc)}</strong></td></tr><tr><td>Precision</td><td>TP/(TP+FP) = ${tp}/(${tp}+${fp})</td><td><strong>${f4(prec)}</strong></td></tr><tr><td>Recall</td><td>TP/(TP+FN) = ${tp}/(${tp}+${fn})</td><td><strong>${f4(rec)}</strong></td></tr><tr><td>F1-Score</td><td>2(P×R)/(P+R)</td><td><strong>${f4(f1)}</strong></td></tr><tr><td>Specificity</td><td>TN/(TN+FP) = ${tn}/(${tn}+${fp})</td><td><strong>${f4(spec)}</strong></td></tr><tr><td>AUC</td><td>Area under ROC</td><td><strong>${f4(aucVal)}</strong></td></tr></table>`;

    document.getElementById('step9-right').innerHTML = `<strong>When to use which metric:</strong><table><tr><th>Problem</th><th>Best Metric</th><th>Why</th></tr><tr><td>Medical diagnosis</td><td>Recall</td><td>Missing disease = fatal</td></tr><tr><td>Spam filter</td><td>Precision</td><td>Blocking good email = serious</td></tr><tr><td>Fraud detection</td><td>F1-Score</td><td>Both errors are costly</td></tr><tr><td>Imbalanced data</td><td>F1 or AUC</td><td>Accuracy is misleading</td></tr><tr><td>Ranking / probability</td><td>ROC-AUC</td><td>Threshold-independent</td></tr></table><br><strong>Key terms:</strong><br>• Type I Error = False Positive (FP)<br>• Type II Error = False Negative (FN)<br>• Sensitivity = Recall = TPR<br>• Specificity = TNR = TN/(TN+FP)`;
}

function loadScenario() {
    scenarioKey = document.getElementById('scenario').value;
    const sc = scenarios[scenarioKey];
    const result = sc.gen();
    dataset = result.data; posLabel = result.pos; negLabel = result.neg;
    render();
}

document.getElementById('scenario').addEventListener('change', loadScenario);
document.getElementById('threshold').addEventListener('input', render);
document.getElementById('nfolds').addEventListener('input', render);

loadScenario();
