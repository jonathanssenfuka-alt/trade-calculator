function calculate() {
    // Get input values
    let symbol = document.getElementById("symbol").value;
    let side = document.getElementById("side").value;
    let entry = parseFloat(document.getElementById("entry").value);
    let stop = parseFloat(document.getElementById("stop").value);
    let tp = parseFloat(document.getElementById("tp").value);
    let lot = parseFloat(document.getElementById("lot").value);
    let balance = parseFloat(document.getElementById("balance").value);

    // Validate
    if (!symbol || !entry || !stop || !tp || !lot || !balance) {
        document.getElementById("output").innerText = "Please fill all fields!";
        return;
    }

    // Pip differences
    let pipRisk = side === "buy" ? entry - stop : stop - entry;
    let pipReward = side === "buy" ? tp - entry : entry - tp;

    // Money values (simplified: 1 lot = 100)
    let riskValue = lot * pipRisk * 100;
    let rewardValue = lot * pipReward * 100;

    // Percent relative to account
    let riskPercent = (Math.abs(riskValue)/balance)*100;
    let rewardPercent = (Math.abs(rewardValue)/balance)*100;

    // R:R
    let rr = (Math.abs(rewardValue)/Math.abs(riskValue)).toFixed(2);

    // Comments
    let comment = "";
    if (riskPercent > 5) comment += "⚠️ Very High Risk! ";
    else if (riskPercent > 3) comment += "⚠️ High Risk. ";
    else if (riskPercent < 1) comment += "💡 Low Risk. ";
    if (rr < 1) comment += "⚠️ Low Reward Ratio! ";
    if (!comment) comment = "✅ Standard Trade.";

    // Display output
    document.getElementById("output").innerText = `
Symbol: ${symbol}
Side: ${side.toUpperCase()}
Entry: ${entry}
Stop Loss: ${stop}
Take Profit: ${tp}
Lot Size: ${lot}
Account Balance: $${balance.toFixed(2)}

Risk: $${riskValue.toFixed(2)} (${riskPercent.toFixed(2)}%)
Reward: $${rewardValue.toFixed(2)} (${rewardPercent.toFixed(2)}%)
R:R = ${rr}

Comment: ${comment}
`;
}