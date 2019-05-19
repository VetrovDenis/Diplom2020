export function calculateTwoPhaseSkin(g, δ1, δ2, p1, p2, υ1, υ2, μ1, μ2, Ge, yLength) {
    //g – прискорення вільного падіння
    //p – густина рідини; 
    //υ i μ - кінематичний та динамічний коефіцієнти в’язкості;
    //Ge поток газа
    //δ ширина пленки
    //y-напруга тертя
    let speedArray = []
    let W1, W2;
    for (let y = 1; y < Number(yLength) + 1; y = y + 0.2) {
        W1 = ((g / υ1) * (-(y * y / 2) + (δ1 + (p2 * δ1 / p1) * (1 - Ge)) * y)).toFixed(2)
        W2 = ((g / υ2) * (-(y * y / 2) + (δ1 + δ2 * (1 - Ge) * y + (δ1 * δ1 / 2) * ((υ2 / υ1) - 1) + δ1 * δ2 * ((μ2 / μ1) - 1) * (1 - Ge)))).toFixed(2)
        if (W1 < 0 || W2 < 0)
            break
        speedArray.push({ y, W1: parseFloat(W1), W2: parseFloat(W2) })
    }
    //оптімальна дія на робочу плівку
    let q = (δ1 * μ2) / (δ2 * μ1)
    let r = (1 / 2) * (υ1 / υ2) * (δ1 / δ2) * (δ1 / δ2)
    let GeOpt = (2 + 6 * (q + r) + Math.sqrt(1 + 12 * q * q + 6 * (1 + 6 * r) * (q + r))) / (3 + 6 * q)
    //максимальне та середнє значення швидкості
    let υ = υ2 / υ1
    let δ = δ2 / δ1
    let p = p2 / p1
    let Wsr = 1 / 3 - Ge / 2 + (υ * δ * δ) / 2 + δ * υ * p * (1 - Ge);
    let Wmax = (1 / 2) * (1 - Ge) * (1 - Ge) + (υ * δ * δ) / 2 + δ * υ * p * (1 - Ge);
    let calculatedInfo = {
        speedArray, GeOpt, Wsr, Wmax
    }
    return calculatedInfo
}