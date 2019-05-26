export function calculateTwoPhaseSkin(g, δ1, δ2, p1, p2, υ1, υ2, μ1, μ2, Ge) {
    const yLength = δ1 + δ2
    υ1 = υ1 / Math.pow(10, 6)
    υ2 = υ2 / Math.pow(10, 6)
    μ1 = μ1 / Math.pow(10, 6)
    μ2 = μ2 / Math.pow(10, 6)
    //g – прискорення вільного падіння
    //p – густина рідини; 
    //υ i μ - кінематичний та динамічний коефіцієнти в’язкості;
    //Ge поток газа
    //δ ширина пленки
    //y-напруга тертя
    let speedArray = []
    let W1, W2;
    for (let y = 0; y < Number(yLength) + 1; y = y + 0.1) {
        W1 = (g / υ1) * (-(Math.pow(y, 2) / 2) + (δ1 + ((p2 * δ2 / p1) * (1 - Ge))) * y).toFixed(2)
        W2 = ((g / υ2) * (-(Math.pow(y, 2) / 2) + (δ1 + δ2 * (1 - Ge) * y + (δ1 * δ1 / 2) * ((υ2 / υ1) - 1) + δ1 * δ2 * ((μ2 / μ1) - 1) * (1 - Ge)))).toFixed(2)
        if (W1 < 0 || W2 < 0)
            break
        speedArray.push({ y, W1: parseFloat(W1) / Math.pow(10, 6), W2: parseFloat(W2) / Math.pow(10, 6) })
    }
    //оптімальна дія на робочу плівку
    let q = (δ1 * μ2) / (δ2 * μ1)
    let r = (1 / 2) * (υ1 / υ2) * (δ1 / δ2) * (δ1 / δ2)
    let GeOpt = Math.sqrt((2 + 6 * (q + r) + Math.sqrt(1 + 12 * q * q + 6 * (1 + 6 * r) * (q + r))) / (3 + 6 * q))
    //максимальне та середнє значення швидкості
    let υ = υ2 / υ1
    let δ = δ2 / δ1
    let p = p2 / p1
    let Wsr = (1 / 3) - (Ge / 2) + ((υ * Math.pow(δ, 2)) / 2) + (δ * υ * p * (1 - Ge));
    let Wmax = ((1 / 2) * Math.pow((1 - Ge), 2)) + ((υ * Math.pow(δ, 2)) / 2) + (δ * υ * p * (1 - Ge));
    let calculatedInfo = {
        speedArray, GeOpt, Wsr, Wmax
    }
    return calculatedInfo
}
export function calculateTwoPhaseSkinHard(g, δ1, δ2, p1, p2, μ1, μ2, K1, K2, t3, n2, n1) {
    const y = δ1 + δ2
    let δ = δ1 / δ2
    let μ = μ2 / μ1
    let a1 = (p1 * g * δ1) / K1
    let a2 = (p2 * g * δ2) / K2
    let t = Math.pow((-(t3 / μ2)), n2)
    let W1, W2, W2_1, W2_2, W2_3;
    W1 = -1 * ((δ1 / a1) * (n1 / (n1 + 1)) * Math.pow((a1 + Math.pow(μ1, n1) * Math.pow((t + a2), (n1 / n2)) - (a1 / δ1) * y)), ((1 + n1) / n1)) + ((δ1 / a1) * (n1 / (n1 + 1)) * Math.pow((a1 + Math.pow(μ1, n1) * Math.pow((t + a2), (n1 / n2))), ((1 + n1) / n1)))
    W2_1 = -1 * (δ2 / a2) * (n2 / (n2 + 1)) * Math.pow((t + a2 * (1 + δ) - a2 * y / δ2), ((1 + n2) / n2));
    W2_2 = ((δ1 / a1) * (n1 / (n1 + 1)) * (Math.pow((a1 + Math.pow(μ, n1) * Math.pow((t + a2), (n1 / n2))), ((1 + n2) / n2)) - Math.pow(μ, (n1 + 1)) * Math.pow((t + a2), ((1 + n1) / n1))))
    W2_3 = ((δ2 / a2) * (n2 / (n2 + 1)) * Math.pow((t + a2 * δ), ((1 / n2) + 1)))
    W2 = W2_1 + W2_2 + W2_3
}