// Tip math, kept separate from the page so it can be unit tested.
// Works in the browser (as window.TipCalc) and in Node (via require).
(function (root) {
  /**
   * Calculate the tip and total for a bill.
   * @param {number|string} bill    Bill amount, e.g. 48.6 or "48.60"
   * @param {number}        percent Tip percentage, e.g. 15
   * @returns {{tip: number, total: number}} Both rounded to the cent.
   *          Invalid input (empty, not a number, negative) gives 0 and 0.
   */
  function calculateTip(bill, percent) {
    const amount = typeof bill === 'string' ? parseFloat(bill) : bill;
    const pct = Number(percent);

    if (!Number.isFinite(amount) || amount < 0 || !Number.isFinite(pct) || pct < 0) {
      return { tip: 0, total: 0 };
    }

    const tip = Math.round(amount * pct) / 100;
    const total = Math.round((amount + tip) * 100) / 100;
    return { tip, total };
  }

  const api = { calculateTip };

  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  } else {
    root.TipCalc = api;
  }
})(this);
